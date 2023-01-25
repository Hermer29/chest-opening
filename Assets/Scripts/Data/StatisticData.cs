using System;
using Newtonsoft.Json;

namespace ChestGame.Data
{
    public class StatisticData
    {
        [JsonProperty] private int _chestOpenNumber;
        [JsonProperty] private int _tokenCollectedNumber;
        [JsonProperty] private int _keycollectedNumber;
        [JsonProperty] private int _winNumber;
        [JsonProperty] private int _bonusNumber;
        
        [JsonIgnore] public Action ChangeStatistic;
        [JsonIgnore] public int ChestOpenNumber
        {
            get { return _chestOpenNumber; }
            set
            {
                _chestOpenNumber = value;
                ChangeStatistic?.Invoke();
            }
        }

        [JsonIgnore] public int TokenCollectedNumber
        {
            get { return _tokenCollectedNumber; }
            set
            {
                _tokenCollectedNumber = value;
                ChangeStatistic?.Invoke();
            }
        }

        [JsonIgnore] public int KeyCollectedNumber
        {
            get { return _keycollectedNumber; }
            set
            {
                _keycollectedNumber = value;
                ChangeStatistic?.Invoke();
            }
        }

        [JsonIgnore] public int WinNumber
        {
            get { return _winNumber; }
            set
            {
                _winNumber = value;
                ChangeStatistic?.Invoke();
            }
        }

        [JsonIgnore] public int BonusNumber
        {
            get { return _bonusNumber; }
            set
            {
                _bonusNumber = value;
                ChangeStatistic?.Invoke();
            }
        }

    }
}

