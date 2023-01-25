using System.Linq;
using ChestGame.Data;
using ChestGame.Game.Module.ScriptableModule;
using NUnit.Framework;
using UnityEditor;
using UnityEngine;

namespace Tests
{
    public class PlayerDataTest
    {

        [NUnit.Framework.Test]
        public void AddChest()
        {
            var link = new PlayerData();
            var database = (CardsDataBase) ScriptableObject.CreateInstance(typeof(CardsDataBase));
            var chest = (ChestInfo) ScriptableObject.CreateInstance(typeof(ChestInfo));
            database.Chests.Add(chest);
            link.SetDatabase(database);
            link.AddChest(chest);
            Assert.AreEqual(chest, link.ChestInventory.FirstOrDefault());
        }
    }
}