using ChestGame.Data;
using ChestGame.Game.Controllers;
using ChestGame.Game.Models;
using ChestGame.Game.View;
using UnityEngine;

namespace ChestGame.Game.Applications
{
    public class HoldersInventoryApplication : MonoBehaviour, IApplication
    {
        [SerializeField] private HoldersInventoryView _view;
        [SerializeField] private HoldersModel _model;

        private HoldersInventoryController<HoldersInventoryView, HoldersModel> _holdersInventoryController;

        public HoldersInventoryController<HoldersInventoryView, HoldersModel> Construct(PlayerDataController data)
        {
            _model.Data = data;
            _holdersInventoryController = new HoldersInventoryController<HoldersInventoryView, HoldersModel>(_view, _model);
            return _holdersInventoryController;
        }
    }
}

