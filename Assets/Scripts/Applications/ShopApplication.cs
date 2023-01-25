using ChestGame.Data;
using ChestGame.Game.Controllers;
using ChestGame.Game.Models;
using ChestGame.Game.View;
using UnityEngine;

namespace ChestGame.Game.Applications
{
    public class ShopApplication : ConnectionListener, IApplication
    {
        [SerializeField] private ShopView _view;
        [SerializeField] private ShopModel _model;

        private ShopController<ShopView, ShopModel> _shopController;

        public ShopController<ShopView, ShopModel> Construct(PlayerDataController data)
        {
            _model.Data = data;
            _shopController = new ShopController<ShopView, ShopModel>(_view, _model);
            StartWaitingForConnection();
            return _shopController;
        }

        protected override void OnConnectedToTon()
        {
            _view.SetTonBalance(_model);
            _view.ShowWalletId();
        }
    }
}

