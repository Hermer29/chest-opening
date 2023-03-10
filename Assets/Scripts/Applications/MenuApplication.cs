using ChestGame.Game.Controllers;
using ChestGame.Game.Models;
using ChestGame.Game.View;
using UnityEngine;

namespace ChestGame.Game.Applications
{
    public class MenuApplication : MonoBehaviour, IApplication
    {
        [SerializeField] private MenuView _view;
        [SerializeField] private MenuModel _model;
        internal MenuController<MenuView, MenuModel> _menuController;

        public MenuController<MenuView, MenuModel> Construct()
        {
            _menuController = new MenuController<MenuView, MenuModel>(_view, _model);
            return _menuController;
        }
    }
}

