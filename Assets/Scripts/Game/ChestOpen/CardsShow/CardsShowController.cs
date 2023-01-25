using UnityEngine;
using Cysharp.Threading.Tasks;
using ChestGame.Game.Animations;
using ChestGame.Game.Module.ScriptableModule;
using ChestGame.Game.View;
using ChestGame.Game.Module.ScriptModule;
using ChestGame.Game.Models;
using System.Collections.Generic;

namespace ChestGame.Game.Controllers
{
    public class CardsShowController<T, U> : Controller<T, U> where T : CardsShowView where U : CardShowModel
    {
        public CardsShowController(T view, U model) : base(view, model) { }

        protected override void Init()
        {
            base.Init();
            _model.CardRandomizer = new CardRandomizerModule(_model.CardsData);
        }

        private void EnableGoldenBorderInCards()
        {
            foreach (var card in _view.CurrentCardsCombination)
                card.GetComponent<CardView>().Background.gameObject.SetActive(true);
        }

        public async UniTask StartMisteryBoxShow()
        {
            _model.Sharing.Hide();
            WWWForm form = new WWWForm();
            form.AddField("user_address", "some_Address");
            #if !UNITY_EDITOR && UNITY_WEBGL
            ShopView.buyMistery();
            #endif
            
            var combination = await RequestApplication.SendMessage("draw", form);
            foreach(var i in combination.id)
            {

            }

            _view.ShowCardEffect.SetActive(true);
            var card = _model.CardRandomizer.GetRandomMisteryCard();
            await StartCardShowWithSprite(card, 1);
            _view.DestroyCurrentCardCombination();
            _model.Data.PlayerData.AddCard(card);

            var randomIndex = new System.Random().Next(0, 100);
            
            if(randomIndex < _model.CurrentChest.TokenBonusChanceInPercent)
            {
                await StartCardShow(_view.TokenBonusPref, 1);
                _model.Data.DepositToken(10);
                _model.Data.SystemData.PrizeFund -= 10;
                _model.Data.SystemData.ReloadPrizeFund();
            }

            await ShowCardWithRandomType();

            await UniTask.Delay(3000);

            _view.DestroyCurrentCardCombination();
            _view.ShowCardEffect.SetActive(false);
        }

        public async UniTask StartDefaultBoxShow(bool isCrack)
        {
            _model.Sharing.Hide();
            
            _view.ShowCardEffect.SetActive(true);
            await UniTask.Delay(1000);

            await ShowCardWithRandomType();

            if (isCrack)
                EnableCracks();

            await UniTask.Delay(1000);

            _view.DestroyCurrentCardCombination();
            _view.ShowCardEffect.SetActive(false);
        }

        private async UniTask ShowCardWithRandomType()
        {
            var randomIndex = new System.Random().Next(0, 100);

            if (randomIndex < _model.CurrentChest.WinChanceInProcent)
            {
                _view.WimAnimationParticles.SetActive(true);
                _model.Data.Statistic.WinNumber++;
                _view.WinCombinationAudio.Play();
                _model.Data.SystemData.PrizeFund -= (int)_model.CardRandomizer.CurrentWinCombination.Price;
                _model.Data.SystemData.ReloadPrizeFund();
                await StartCombinationShow(_model.CardRandomizer.CurrentWinCombination.Combination.AllCards);
                _model.Data.DepositToken((int)_model.CardRandomizer.CurrentWinCombination.Price);
                _model.Sharing.MakeTitleForWinCombination();
                _model.Sharing.Show();
            }
            else if (randomIndex < _model.CurrentChest.BonusChanceInProcaent)
            {
                _view.WimAnimationParticles.SetActive(true);
                _view.BonusCombinationSound.Play();
                _model.Data.Statistic.BonusNumber++;
                await StartCombinationShow(_model.CardRandomizer.CurrentBonusCombination.Combination.AllCards);
                EnableGoldenBorderInCards();
                _model.Data.PlayerData.AddBonusCombination(_model.CardRandomizer.CurrentBonusCombination);
                _model.Sharing.MakeTitleForBonusCombination();
                _model.Sharing.Show();
            }
            else
            {
                await StartCombinationShow(_model.CardRandomizer.GetRandomCombination());
                _view.LoseCombinationSound.Play();
            }
            _view.WimAnimationParticles.SetActive(false);
        }

        private async UniTask StartCombinationShow(IEnumerable<CardInfo> combination)
        {
            var count = 0;
            foreach (var card in combination)
            {
                Debug.Log(card);
                await StartCardShowWithSprite(card, count);
                count++;
            }
        }

        private async UniTask StartCardShow(GameObject cardPrefab, int positionIndex)
        {
            _view.InstantiateNewCard(cardPrefab);
            await StartCardsShowAnimationContinuity(positionIndex);
        }

        private async UniTask StartCardShowWithSprite(CardInfo card, int positionIndex)
        {
            _view.InstantiateNewCard(_model.CardsData.CardPref);
            _view.CurrentCard.GetComponent<CardView>().Preview.sprite = card.CardSprite;
            await StartCardsShowAnimationContinuity(positionIndex);
        }

        private void EnableCracks()
        {
            foreach (var card in _view.CurrentCardsCombination)
                if(card.GetComponent<CardView>().Cracks != null)
                    card.GetComponent<CardView>().Cracks.gameObject.SetActive(true);
        }

        public async UniTask StartCardsShowAnimationContinuity(int cardIndex)
        {
            await UIAnimations.SlideUpAnimation(_view.CurrentCard);
            await UniTask.Delay(500);

            var position = _view.CardPositions.transform.GetChild(cardIndex).gameObject;
            await UIAnimations.SlideToPointAnimation(position.transform.position, _view.CurrentCard.transform);
            await UniTask.Delay(1000);
        }
    }

}
