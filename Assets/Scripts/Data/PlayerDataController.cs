using System.Collections.Generic;
using System.IO;
using ChestGame.Game.Controllers;
using ChestGame.Game.Module.ScriptableModule;
using ChestGame.Preloader;
using UnityEngine;
using Utility;

namespace ChestGame.Data
{
    public class PlayerDataController : IPersistenceSaver
    {
        private UIController _ui;
        private readonly SerializedPersistentStorage _storage;
        private readonly CardsDataBase _cardsDataBase;

        public PlayerDataController(UIController ui, SerializedPersistentStorage storage, CardsDataBase cardsDataBase)
        {
            _ui = ui;
            _storage = storage;
            _cardsDataBase = cardsDataBase;
        }
        
        public PlayerData PlayerData { get; set; }
        public StatisticData Statistic { get; set; }
        public SystemData SystemData { get; set; }

        public void DebitingToken(int number)
        {
            if (PlayerData.Token >= number)
                PlayerData.Token -= number;
            _ui.UpdateTokenPanel(this);
            Save();
        }

        public void DebitingKey(int number)
        {
            if (PlayerData.Keys >= number)
                PlayerData.Keys -= number;
            _ui.UpdateKeyPanel(this);
            Save();
        }

        public void DebitingMasterKey(int number)
        {
            if (PlayerData.MasterKeys >= number)
                PlayerData.MasterKeys -= number;
            _ui.UpdateMasterKeyPanel(this);
            Save();
        }

        public void DepositKey(int number)
        {
            PlayerData.Keys += number;
            _ui.UpdateKeyPanel(this);
            Save();
        }

        public void DepositToken(int number)
        {
            PlayerData.Token += number;
            _ui.UpdateTokenPanel(this);
            Save();
        }

        public void DepositMasterKey(int number)
        {
            PlayerData.MasterKeys += number;
            _ui.UpdateMasterKeyPanel(this);
            Save();
        }

        public void Initialize()
        {
            PlayerData = _storage.GetValueOrNew<PlayerData>();
            PlayerData.SetDatabase(_cardsDataBase);
            PlayerData.SetSaver(this);
            SystemData = _storage.GetValueOrNew<SystemData>();
            Statistic = _storage.GetValueOrNew<StatisticData>();
            Save();
            
            if(PlayerPrefs.HasKey("TrainingArrowShown") == false)
            {
                _ui.ArrowTrainingStart();
                PlayerPrefs.SetInt("TrainingArrowShown", 1);
                return;
            }

            PlayerData.Token = UserTonData.Balance;
            PlayerData.Diamond = UserTonData.Balance;
        }

        public void Save()
        {
            _storage.Set(PlayerData);
            _storage.Set(SystemData);
            _storage.Set(Statistic);
        }
    }
}