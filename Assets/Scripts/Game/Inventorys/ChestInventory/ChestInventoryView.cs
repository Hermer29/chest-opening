using UnityEngine;

namespace ChestGame.Game.View
{
    public class ChestInventoryView : MonoBehaviour, IView
    {
        [SerializeField] internal GameObject Grid;
        [SerializeField] internal Sprite SlotsBackground;
        [SerializeField] internal GameObject CardPositions;
        [SerializeField] internal ChestOpenView ChestOpenView;
        [SerializeField] internal PrizeFundView CombinationView;
        [SerializeField] internal StatisticView StatisticView;
        [SerializeField] internal BonusCombinationsView BonusCombinationView;

        internal GameObject CurrentCard;
        internal bool ScreenIsShow = false;
    }
}

