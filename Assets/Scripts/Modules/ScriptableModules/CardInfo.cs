using UnityEngine;
using Utility;

namespace ChestGame.Game.Module.ScriptableModule
{
    [CreateAssetMenu(fileName = "CardInfo")]
    public class CardInfo : ScriptableObjectWithGuid
    {
        [SerializeField] private Sprite _cardSprite;
        public Sprite CardSprite => _cardSprite;
    }
}

