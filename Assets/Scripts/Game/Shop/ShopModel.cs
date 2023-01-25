using ChestGame.Data;
using ChestGame.Game.Controllers;
using ChestGame.Game.View;
using UnityEngine;

namespace ChestGame.Game.Models
{
    [CreateAssetMenu(fileName = "ShopModel")]
    public class ShopModel : ScriptableObject, IModel
    {
        internal PlayerDataController Data;
        internal ChestInventoryController<ChestInventoryView, ChestInventoryModel> ChestInventoryController;
    }
}

