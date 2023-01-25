using ChestGame.Data;
using UnityEngine;

namespace ChestGame.Game.Models
{
    [CreateAssetMenu(fileName = "ChestInventoryModel")]
    public class ChestInventoryModel : ScriptableObject, IModel
    {
        internal PlayerDataController Data;
    }
}

