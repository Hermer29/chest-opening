using ChestGame.Data;
using ChestGame.Game.Module.ScriptableModule;
using System.Collections.Generic;

namespace ChestGame.Game.Module.ScriptModule
{
    public class CardRandomizerModule
    {
        private System.Random _random = new System.Random();
        private CardsDataBase _cardsData;
        private List<CardInfo> _cards;

        internal WinCombinationInfo CurrentWinCombination;
        internal BonusCombinationInfo CurrentBonusCombination;

        public CardRandomizerModule(CardsDataBase cardData)
        {
            _cardsData = cardData;
            _cards = cardData.AllCards;
            var bonusCombinations = cardData.BonusCombinations;
            var winCombinations = cardData.WinCombinations;
            var random = new System.Random();
            var bonusIndex = random.Next(0, bonusCombinations.Count);
            var winIndex = random.Next(0, winCombinations.Count);
            CurrentBonusCombination = bonusCombinations[bonusIndex];
            CurrentWinCombination = winCombinations[winIndex];
        }

        public CardInfo GetRandomCard()
        {
            var cardIndex = _random.Next(0, _cards.Count);
            return _cards[cardIndex];
        }

        public List<CardInfo> GetRandomCombination()
        {
            var combination = new List<CardInfo>();
            for (int i = 0; i < 3; i++)
            {
                combination.Add(GetRandomCard());
            }
            return combination;
        }

        public CardInfo GetRandomMisteryCard()
        {
            var cardIndex = _random.Next(0, _cardsData.MisteryCards.Count);
            return _cardsData.MisteryCards[cardIndex];
        }
    }
}