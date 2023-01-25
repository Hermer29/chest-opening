using ChestGame.Data;
using ChestGame.Game.Controllers;
using ChestGame.Game.Models;
using ChestGame.Game.View;
using UnityEngine;

namespace ChestGame.Game.Applications
{
    public class ChestInventoryApplication : MonoBehaviour, IApplication
    {
        [SerializeField] private ChestInventoryView _view;
        [SerializeField] private ChestInventoryModel _model;

        private ChestInventoryController<ChestInventoryView, ChestInventoryModel> _chestInventoryController;

        public ChestInventoryController<ChestInventoryView, ChestInventoryModel> Construct(PlayerDataController data, ShareButton button)
        {
            _model.Data = data;
            _chestInventoryController = new ChestInventoryController<ChestInventoryView, ChestInventoryModel>(_view, _model, button);
            return _chestInventoryController;
        }
    }
}

