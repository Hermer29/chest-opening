using System.Collections.Generic;
using System.Linq;
using ChestGame.Game.Module.ScriptableModule;
using Newtonsoft.Json;

namespace ChestGame.Data
{
    public class PlayerData
    {
        private CardsDataBase _data;
        private IPersistenceSaver _saver;
        [JsonProperty] private List<string> _ownedCardsGuids;
        [JsonProperty] private List<string> _ownedCombinationBonusGuids;
        [JsonProperty] private List<string> _ownedChestsGuids;

        [JsonConstructor] public PlayerData() { }
        
        [JsonProperty] public int Token { get; set; }
        [JsonProperty] public int Diamond { get; set; }
        [JsonProperty] public int Keys { get; set; }
        [JsonProperty] public int MasterKeys { get; set; } = 5;

        [JsonIgnore]
        public IEnumerable<ChestInfo> ChestInventory
        {
            get
            {
                CreateListsIfNull();
                return _ownedChestsGuids.Select(x => _data.Chests.First(chest => chest.Guid == x));
            }
        }

        [JsonIgnore]
        public IEnumerable<CardInfo> CardInventory
        {
            get
            {
                CreateListsIfNull();
                return _ownedCardsGuids.Select(x => _data.AllCards.First(chest => chest.Guid == x));
            }
        }

        [JsonIgnore]
        public IEnumerable<BonusCombinationInfo> BonusCombinationInventory
        {
            get
            {
                CreateListsIfNull();
                return _ownedCombinationBonusGuids.Select(x => _data.BonusCombinations.First(chest => chest.Guid == x));
            }
        }

        public void SetDatabase(CardsDataBase data)
        {
            _data = data;
        }

        public void SetSaver(IPersistenceSaver saver)
        {
            _saver = saver;
        }
        
        public void AddChest(ChestInfo chestInfo)
        {
            CreateListsIfNull();
            _ownedChestsGuids.Add(chestInfo.Guid);
            _saver.Save();
        }
        
        private void CreateListsIfNull()
        {
            _ownedChestsGuids ??= new List<string>();
            _ownedCardsGuids ??= new List<string>();
            _ownedCombinationBonusGuids ??= new List<string>();
        }

        public void RemoveChest(ChestInfo chestInfo)
        {
            CreateListsIfNull();
            _ownedChestsGuids.Remove(chestInfo.Guid);
            _saver.Save();
        }

        public void AddCard(CardInfo cardInfo)
        {
            CreateListsIfNull();
            _ownedCardsGuids.Add(cardInfo.Guid);
            _saver.Save();
        }

        public void AddBonusCombination(BonusCombinationInfo combinationInfo)
        {
            CreateListsIfNull();
            _ownedCombinationBonusGuids.Add(combinationInfo.Guid);
            _saver.Save();
        }
    }
}

