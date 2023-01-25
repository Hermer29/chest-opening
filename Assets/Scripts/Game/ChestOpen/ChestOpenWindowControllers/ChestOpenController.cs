using System.Runtime.InteropServices;
using System.Threading.Tasks;
using UnityEngine;
using Cysharp.Threading.Tasks;
using UnityEngine.UI;
using ChestGame.Game.Animations;
using ChestGame.Game.View;
using ChestGame.Game.Models;
using ChestGame.Game.Module.ScriptableModule;
using ChestGame.Data;

namespace ChestGame.Game.Controllers
{
    public class ChestOpenController<T, U> : Controller<T, U> where T : ChestOpenView where U : ChestOpenModel
    {
        private readonly ShareButton _sharing;
        private bool _buttonAnimation = false;
        internal InventoryChestSlotView ChestOpenSlotView;

        public ChestOpenController(T view, U model, ShareButton sharing) : base(view, model)
        {
            _sharing = sharing;
        }

        protected override void Init()
        {
            base.Init();
             ShowOpenScreen();
        }

        public async UniTask ShowOpenScreen()
        {
            FillOpenScreenData();
            ChestOpenSlotView = _view.InstantiateSlotCopy(_model.SlotView);
            ChestOpenSlotView.SetChestData(_model.CurrentChest);
            ChestOpenSlotView.transform.SetSiblingIndex(0);
            _model.SlotView.DisableClicks();
            ChestOpenSlotView.DefaultPosition = _model.SlotView.transform.position;
            _model.DefaultButtonPosition = _view.Buttons.transform.position;
            _view.gameObject.SetActive(true);
            UIAnimations.SlideToPointAnimation(Vector3.zero, ChestOpenSlotView.transform);
            UIAnimations.FadeColorToDark(_view.GetComponent<Image>());
            _view.OpenChestAudio.Play();
            await UIAnimations.ScaleZoom(ChestOpenSlotView.transform);
            UIAnimations.SlideToPointAnimation(new Vector3(0, _view.Buttons.transform.position.y, 0), _view.Buttons.transform);
            await ChestOpenSlotView.SlideToZoomPosition();
            _view.CloseButton.gameObject.SetActive(true);
        }

        private void UpgradeButtonCheckSwitch()
        {
            if (_model.CurrentChest.ChestName != _model.DefaultChest.ChestName || CheckChestContain(_model.UpgradeChest))
                _view.UpgradeButton.gameObject.SetActive(false);
            else
                _view.UpgradeButton.gameObject.SetActive(true);

            if (_model.CurrentChest.ChestName != _model.DefaultChest.ChestName)
                _view.HackButton.gameObject.SetActive(false);
            else
                _view.HackButton.gameObject.SetActive(true);
        }

        public async UniTask CloseOpenScreen()
        {
            _view.OpenChestAudio.Play();
            _view.CloseButton.gameObject.SetActive(false);

            UIAnimations.SlideToPointAnimation(ChestOpenSlotView.DefaultPosition, ChestOpenSlotView.transform);
            UIAnimations.FadeColorToWhite(_view.GetComponent<Image>());
            UIAnimations.SlideToPointAnimation(new Vector3(_model.DefaultButtonPosition.x, _model.DefaultButtonPosition.y, 0), _view.Buttons.transform);
            await UIAnimations.ScaleMinimaze(ChestOpenSlotView.transform);
            await ChestOpenSlotView.SlideToDefaultPreviewPosition();

            _model.Data.SystemData.ReloadInventory();

            _view.gameObject.SetActive(false);
            _model.SlotView.EnableClicks();
            _view.DestroySlotCopy(ChestOpenSlotView);
        }

        public async UniTask MinimizeOpenScreen()
        {
            _view.CloseButton.gameObject.SetActive(false);

            ChestOpenSlotView.SlideToDefaultPosition();
            UIAnimations.SlideToPointAnimation(new Vector3(_model.DefaultButtonPosition.x, 0, 0), _view.Buttons.transform);
            await UIAnimations.ScaleMinimaze(ChestOpenSlotView.transform);
            await ChestOpenSlotView.SlideToDefaultPreviewPosition();
            ChestOpenSlotView.gameObject.SetActive(false);
            _model.SlotView.EnableClicks();
        }

        public void FillOpenScreenData()
        {
            _view.CloseButton.onClick.RemoveAllListeners();
            _view.OpenButton.onClick.RemoveAllListeners();
            _view.HackButton.onClick.RemoveAllListeners();
            _view.UpgradeButton.onClick.RemoveAllListeners();

            _view.Preview.sprite = _model.CurrentChest.ChestSprite;
            _view.CloseButton.onClick.AddListener(delegate { CloseOpenScreen(); });
            _view.OpenButton.onClick.AddListener(delegate { OpenStart(false); });
            _view.HackButton.onClick.AddListener(delegate { OpenStart(true); });
            _view.UpgradeButton.onClick.AddListener(delegate { ChestUpgrade(); });
            UpgradeButtonCheckSwitch();
        }

        private async UniTask OpenStart(bool isHack)
        {
            _view.ButtonAudio.Play();
            if (!isHack)
            {
                const int ChestPriceInTons = 1;
                if (_model.Data.PlayerData.Token < ChestPriceInTons && _buttonAnimation!)
                {
                    await ShakeButton();
                    return;
                }

                if (_buttonAnimation)
                {
                    return;
                }
#if !UNITY_EDITOR && UNITY_WEBGL
                ShopView.buyKey();
#else
                Debug.LogWarning($"[{nameof(ShopView)}] Can't buy key while application is not deployed as webgl build");
#endif
                await ShowCards(false);
            }
            else
            {
                if (_model.Data.PlayerData.MasterKeys > 0)
                {
                    _model.Data.DebitingMasterKey(1);
                    await ShowCards(true);
                }
                else if (!_buttonAnimation)
                {
                    await ShakeButton();
                }
            }
        }

        private async Task ShakeButton()
        {
            _buttonAnimation = true;
            await UIAnimations.TransformShakeOnX(_view.HackButton.transform);
            _buttonAnimation = false;
        }

        private async UniTask ShowCards(bool isCrack)
        {
            _view.CardShowView.gameObject.SetActive(true);
            _view.OpenSound.Play();
            var cardShowController = GetCardShowController();

            _view.OpenChestEffect.SetActive(true);
            await MinimizeOpenScreen();
            _model.Data.Statistic.ChestOpenNumber++;

            if (_model.CurrentChest.ChestName == _model.UpgradeChest.ChestName)
            {
                _view.MisteryBoxAudio.Play();
                await cardShowController.StartMisteryBoxShow();
                _model.Data.PlayerData.RemoveChest(_model.UpgradeChest);
            }
            else
            {
                await cardShowController.StartDefaultBoxShow(isCrack);
            }

            _model.Data.SystemData.ReloadInventory();
            await CloseOpenScreen();
            _view.OpenChestEffect.SetActive(false);
            _view.CardShowView.gameObject.SetActive(false);
        }

        public async UniTask ChestUpgrade()
        {
            _view.ButtonAudio.Play();
            if (!CheckChestContain(_model.UpgradeChest) && _model.Data.PlayerData.Token >= 10)
            {
                _model.Data.DebitingToken(10);
                _model.Data.PlayerData.AddChest(_model.UpgradeChest);
                _view.UpgradeButton.gameObject.SetActive(false);
                CloseOpenScreen();
                _model.Data.SystemData.ReloadInventory();
            }
            else
            {
                await UIAnimations.TransformShakeOnX(_view.UpgradeButton.transform);
            }
        }

        private bool CheckChestContain(ChestInfo chest)
        {
            foreach (var inventoryChest in _model.Data.PlayerData.ChestInventory)
            {
                if (inventoryChest.ChestName == chest.ChestName)
                    return true;
            }
            return false;
        }

        private CardsShowController<CardsShowView, CardShowModel> GetCardShowController()
        {
            var cardShowModel = new CardShowModel
            {
                CardsData = Resources.Load<CardsDataBase>("CardsDataBase"),
                Data = _model.Data,
                CurrentChest = _model.CurrentChest,
                Sharing = _sharing
            };
            var cardShowView = _view.CardShowView;
            var controller = new CardsShowController<CardsShowView, CardShowModel>(cardShowView, cardShowModel);
            return controller;
        }
    }
}
