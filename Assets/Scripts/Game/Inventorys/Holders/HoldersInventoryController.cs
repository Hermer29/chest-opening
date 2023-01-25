using UnityEngine;
using Cysharp.Threading.Tasks;
using ChestGame.Game.Animations;
using ChestGame.Game.View;
using ChestGame.Game.Models;

namespace ChestGame.Game.Controllers
{
    public class HoldersInventoryController<T, U> : Controller<T, U> where T : HoldersInventoryView where U : HoldersModel
    {
        public HoldersInventoryController(T view, U model) : base(view, model) { }

        private HoldersSlotView _currentSlot;

        protected override void Init()
        {
            FillInventorySlots();
            _view.CloseButton.onClick.AddListener(HideScreen);
            _model.Data.SystemData.ReloadInventory += delegate { FillInventorySlots(); };
        }

        public async UniTask FillInventorySlots()
        {
            WWWForm form = new WWWForm();
            form.AddField("user_address", "some_Address");

            Debug.Log($"[{nameof(HoldersInventoryController<HoldersInventoryView, HoldersModel>)}] Holders inventory filling started");
            //TODO:var inventoryCards = await RequestApplication.SendMessage("get_nft_holder", form);

            var count = 0;
            foreach (var item in _model.Data.PlayerData.BonusCombinationInventory)
            {
                var slot = _view.Grid.transform.GetChild(count);
                var slotView = slot.GetComponent<HoldersSlotView>();
                slotView.OpenButton.onClick.RemoveAllListeners();
                slotView.OpenButton.onClick.AddListener(delegate { StartCardReview(slotView); });
                slotView.CombinationView.FirstCardPreview.sprite = item.Combination.FirstCard.CardSprite;
                slotView.CombinationView.SecondCardPreview.sprite = item.Combination.SecondCard.CardSprite;
                slotView.CombinationView.ThirdCardPreview.sprite = item.Combination.ThirdCard.CardSprite;
                slotView.TimerModule.gameObject.SetActive(true);
                if (!slotView.TimerModule.TimerIsStart)
                    slotView.TimerModule.StartTimer();
                count++;
            }
        }

        private void HideScreen()
        {
            _view.CloseButton.gameObject.SetActive(false);
            _view.CardPositions.SetActive(false);
            _view.ScreenIsShow = false;
            foreach (var card in _model.CurrentCardCombination)
                _view.CardPresenterModule.DestroyCard(card);
        }

        private async UniTask StartCardReview(HoldersSlotView holderSlot)
        {
            _view.CloseButton.gameObject.SetActive(true);
            _view.CardPositions.SetActive(true);
            if (!_view.ScreenIsShow)
            {
                _view.ScreenIsShow = true;
                _model.CurrentCard = _view.CardPresenterModule.InstantiateNewCard(_model.CardPrefab);
                _model.CurrentCard.GetComponent<CardView>().Preview.sprite = holderSlot.CombinationView.FirstCardPreview.sprite;
                _model.CurrentCardCombination.Add(_model.CurrentCard);
                await StartCardViewAnimation(0);

                _model.CurrentCard = _view.CardPresenterModule.InstantiateNewCard(_model.CardPrefab);
                _model.CurrentCard.GetComponent<CardView>().Preview.sprite = holderSlot.CombinationView.SecondCardPreview.sprite;
                _model.CurrentCardCombination.Add(_model.CurrentCard);
                await StartCardViewAnimation(1);

                _model.CurrentCard = _view.CardPresenterModule.InstantiateNewCard(_model.CardPrefab);
                _model.CurrentCard.GetComponent<CardView>().Preview.sprite = holderSlot.CombinationView.ThirdCardPreview.sprite;
                _model.CurrentCardCombination.Add(_model.CurrentCard);
                await StartCardViewAnimation(2);
            }
            _view.CardPositions.SetActive(false);
        }

        private async UniTask StartCardViewAnimation(int indexPosition)
        {
            await UIAnimations.SlideUpAnimation(_model.CurrentCard);
            UIAnimations.SlideToPointAnimation(_view.CardPositions.transform.GetChild(indexPosition).gameObject.transform.position, _model.CurrentCard.transform);
        }
    }
}

