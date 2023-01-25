using System;
using Newtonsoft.Json;

namespace ChestGame.Data
{
    public class SystemData
    {
        [JsonIgnore] public Action ReloadInventory = default;
        [JsonIgnore] public Action ReloadPrizeFund = default;

        public int PrizeFund { get; set; } = 500;
    }
}

