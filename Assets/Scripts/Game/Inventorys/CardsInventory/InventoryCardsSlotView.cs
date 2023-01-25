using ChestGame.Game.Module.ScriptableModule;
using UnityEngine;
using UnityEngine.UI;

namespace ChestGame.Game.View
{
    public class InventoryCardsSlotView : MonoBehaviour
    {
        [SerializeField] internal Image Preview;
        [SerializeField] internal Button Button;

        internal CardInfo Card;
    }
}

