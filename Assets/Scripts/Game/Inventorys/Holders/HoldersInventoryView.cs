using ChestGame.Game.Module.MonoModule;
using UnityEngine;
using UnityEngine.UI;

namespace ChestGame.Game.View
{
    public class HoldersInventoryView : MonoBehaviour, IView
    {
        [SerializeField] internal Button CloseButton;
        [SerializeField] internal GameObject Grid;
        [SerializeField] internal CardsPresenterModule CardPresenterModule;
        [SerializeField] internal GameObject CardPositions;
        internal bool ScreenIsShow = false;

    }
}

