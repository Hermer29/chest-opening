using System;
using ChestGame.Data;
using ChestGame.Game.Controllers;
using ChestGame.Game.Module.ScriptableModule;
using UnityEngine;
using Cysharp.Threading.Tasks;
using Networking;
using UnityEngine.Serialization;
using Utility;

namespace ChestGame.Game.Applications
{
    public class ApplicationsComposer : MonoBehaviour
    {
        private UIController _uiController;
        private PlayerDataController _dataController;
        private SerializedPersistentStorage _storage;

        [FormerlySerializedAs("defaultChest")] 
        [SerializeField] private ChestInfo _defaultChest;
        [SerializeField] private NetworkApplication _network;
        [SerializeField] private CardsDataBase _dataBase;
        [SerializeField] private ShareButton _share;
        
        private void Start()
        {
            _storage = new SerializedPersistentStorage();
            _uiController = GetComponent<UIApplication>().InstanceApplication();
            ComposeApplications();
            InitializeApplications();
        }

        private void ComposeApplications()
        {
            _dataController = GetComponent<DataApplication>().Construct(_uiController, _storage, _dataBase);
            GetComponent<DataApplication>().Initialize();
            if (PlayerPrefs.HasKey("BaseChestAdded") == false)
            {
                _dataController.PlayerData.AddChest(_defaultChest);
                PlayerPrefs.SetInt("BaseChestAdded", 1);
            }
            
            _uiController.Init(_dataController);
            GetComponent<MenuApplication>().Construct();
            GetComponent<ShopApplication>().Construct(_dataController);
            GetComponent<CardInventoryApplication>().Construct(_dataController);
            GetComponent<ChestInventoryApplication>().Construct(_dataController, _share);
            GetComponent<HoldersInventoryApplication>().Construct(_dataController);
        }

        private void InitializeApplications()
        {
            _network.Initialize();
        }

        private void OnDestroy()
        {
            _dataController.Save();
        }
    }
}


