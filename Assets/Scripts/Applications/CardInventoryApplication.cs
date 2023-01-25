using ChestGame.Data;
using ChestGame.Game.Controllers;
using ChestGame.Game.Models;
using ChestGame.Game.View;
using UnityEngine;

namespace ChestGame.Game.Applications
{
    public class CardInventoryApplication : MonoBehaviour, IApplication
    {
        [SerializeField] private CardsInventoryView _view;
        [SerializeField] private CardInventoryModel _model;

        private CardInventoryController<CardsInventoryView, CardInventoryModel> _cardInventoryController;

        public CardInventoryController<CardsInventoryView, CardInventoryModel> Construct(PlayerDataController data)
        {
            _model.Data = data;
            _cardInventoryController = new CardInventoryController<CardsInventoryView, CardInventoryModel>(_view, _model);
            return _cardInventoryController;
        }
    }
}

