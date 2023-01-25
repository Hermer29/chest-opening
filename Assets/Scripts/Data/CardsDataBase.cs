using ChestGame.Game.Models;
using ChestGame.Game.Module.ScriptableModule;
using System.Collections.Generic;
using UnityEngine;

namespace ChestGame.Data
{
    [CreateAssetMenu(fileName = "CardsShowModel")]
    public class CardsDataBase : ScriptableObject, IModel
    {
        [SerializeField] internal GameObject CardPref;

        [SerializeField] public List<CardInfo> AllCards;
        [SerializeField] public List<CardInfo> MisteryCards;
        [SerializeField] public List<BonusCombinationInfo> BonusCombinations;
        [SerializeField] public List<WinCombinationInfo> WinCombinations;
        [SerializeField] public List<ChestInfo> Chests;
    }
}

