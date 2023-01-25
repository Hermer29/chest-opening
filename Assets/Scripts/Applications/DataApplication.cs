using ChestGame.Data;
using ChestGame.Game.Controllers;
using UnityEngine;
using Utility;

namespace ChestGame.Game.Applications
{
    public class DataApplication : MonoBehaviour, IApplication
    {
        internal PlayerDataController dataController;

        public PlayerDataController Construct(UIController ui, SerializedPersistentStorage storage,
            CardsDataBase cardsDataBase)
        {
            dataController = new PlayerDataController(ui, storage, cardsDataBase);
            return dataController;
        }

        public void Initialize()
        {
            dataController.Initialize();
        }
    }
}

