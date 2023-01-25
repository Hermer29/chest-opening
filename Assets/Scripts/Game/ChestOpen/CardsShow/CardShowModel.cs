using ChestGame.Data;
using ChestGame.Game.Module.ScriptableModule;
using ChestGame.Game.Module.ScriptModule;
using UnityEngine.UI;

namespace ChestGame.Game.Models
{
    public class CardShowModel : IModel
    {
        internal CardRandomizerModule CardRandomizer;
        internal PlayerDataController Data;
        internal ChestInfo CurrentChest;
        internal CardsDataBase CardsData;
        internal ShareButton Sharing;
    }
}

