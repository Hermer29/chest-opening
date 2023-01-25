using UnityEngine;
using UnityEngine.UI;
using ChestGame.Game.Module.MonoModule;

namespace ChestGame.Game.View
{
    public class HoldersSlotView : MonoBehaviour, IView
    {
        [SerializeField] internal CombinationView CombinationView;
        [SerializeField] internal Button OpenButton;
        [SerializeField] internal Image TimeCounterObject;
        [SerializeField] internal TimerModule TimerModule;
    }
}

