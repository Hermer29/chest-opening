using System;
using System.Collections.Generic;
using UnityEngine;

namespace ChestGame.Game.Module.ScriptableModule
{
    [Serializable]
    public class Combination
    {
        [SerializeField] private CardInfo _firstCard;
        [SerializeField] private CardInfo _secondCard;
        [SerializeField] private CardInfo _thirdCard;

        public IEnumerable<CardInfo> AllCards 
        { 
            get
            {
                yield return _firstCard;
                yield return _secondCard;
                yield return _thirdCard;
            } 
        }

        public CardInfo FirstCard { get => _firstCard; set => _firstCard = value; }
        public CardInfo SecondCard { get => _secondCard; set => _secondCard = value; }
        public CardInfo ThirdCard { get => _thirdCard; set => _thirdCard = value; }
    }
}