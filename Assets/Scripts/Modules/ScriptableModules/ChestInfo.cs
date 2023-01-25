using UnityEngine;
using Utility;

namespace ChestGame.Game.Module.ScriptableModule
{
    [CreateAssetMenu(fileName = "Chest")]
    public sealed class ChestInfo : ScriptableObjectWithGuid
    {
        [SerializeField] private Sprite _chestSprite;
        [SerializeField] private string _chestName;
        [SerializeField] private int _price;
        [SerializeField] internal int WinChanceInProcent;
        [SerializeField] internal int BonusChanceInProcaent;
        [SerializeField] internal int TokenBonusChanceInPercent;
        
        public Sprite ChestSprite => _chestSprite;
        public int Price => _price;
        public string ChestName => _chestName;

        private void OnValidate()
        {
            if(_chestSprite == null)
                Debug.LogWarning($"[{nameof(ChestInfo)}] Chest sprite is empty, name: {name}");
        }
    }
}

