using ChestGame.Data;
using ChestGame.Game.Controllers;
using ChestGame.Game.View;
using UnityEngine;
using UnityEngine.UI;

namespace ChestGame.Game.Models
{
    [CreateAssetMenu(fileName = "CardsInventoryModel")]
    public class CardInventoryModel : ScriptableObject, IModel
    {
        internal PlayerDataController Data;
        internal GameObject CurrentCard;
        internal ChestOpenController<ChestOpenView, ChestOpenModel> ChestOpenController;
        internal Button Sharing; 
        [SerializeField] internal GameObject CardPrefab;
    }
}

