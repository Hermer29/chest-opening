using ChestGame.Game.Module.ScriptableModule;
using UnityEngine;
using UnityEngine.UI;

namespace ChestGame.Game.View
{
    public class ShopSlotView : MonoBehaviour
    { 
        [SerializeField] internal Text TextPrice;
        [SerializeField] internal Image Preview;
        [SerializeField] internal Button BuyButton;
        [SerializeField] internal ChestInfo Chest;
    }
}