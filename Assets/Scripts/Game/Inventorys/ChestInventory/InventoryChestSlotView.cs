using System;
using ChestGame.Game.Animations;
using ChestGame.Game.Module.ScriptableModule;
using Cysharp.Threading.Tasks;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.UI;

namespace ChestGame.Game.View
{
    public class InventoryChestSlotView : MonoBehaviour, IView
    {
        [SerializeField] private Image Preview;
        [SerializeField] private Button Button;
        [SerializeField] public Transform DefaultPositionPreview;
        [SerializeField] public Transform ZoomPozitionPreview;

        private ChestInfo Chest;
        private Vector3? _defaultPosition;
        
        public Vector3 DefaultPosition
        {
            get => _defaultPosition.Value;

            set
            {
                if (_defaultPosition != null)
                    throw new InvalidOperationException();

                _defaultPosition = value;
            }
        }

        public event UnityAction Clicked
        {
            add => Button.onClick.AddListener(value);
            remove => Button.onClick.RemoveListener(value);
        }

        public ChestInfo CorrespondingChest => Chest;
        
        public void SetChestData(ChestInfo chest)
        {
            if (chest == null)
                throw new ArgumentNullException(nameof(chest));
            if (Chest != null)
                throw new InvalidOperationException();

            Preview.sprite = chest.ChestSprite;
            Chest = chest;
        }

        public void DisableClicks()
        {
            Button.interactable = false;
        }

        public void EnableClicks()
        {
            Button.interactable = true;
        }

        public void ClearAndSetBackground(Sprite background)
        {
            Preview.sprite = background;
            Chest = null;
            Button.onClick.RemoveAllListeners();
        }

        public async UniTask SlideToZoomPosition()
        {
            await UIAnimations.SlideToPointAnimation(ZoomPozitionPreview.position, Preview.transform);
        }

        public async UniTask SlideToDefaultPosition()
        {
            await UIAnimations.SlideToPointAnimation(DefaultPosition, transform);
        }

        public async UniTask SlideToDefaultPreviewPosition()
        {
            await UIAnimations.SlideToPointAnimation(DefaultPositionPreview.position, Preview.transform);
        }
    }
}

