using ChestGame.Data;
using ChestGame.Game.Models;
using ChestGame.Game.View;
using UnityEngine;

namespace ChestGame.Game.Controllers
{
    public class ChestInventoryController<T, U> : Controller<T, U> where T : ChestInventoryView where U : ChestInventoryModel
    {
        private readonly ShareButton _button;
        public ChestInventoryController(T view, U model, ShareButton button) : base(view, model)
        {
            _button = button;
        }

        public ChestOpenController<ChestOpenView, ChestOpenModel> ChestOpenController { get; set; }

        protected override void Init()
        {
            base.Init();
            _model.Data.Statistic.ChangeStatistic += FillStatisticScreen;
            _model.Data.SystemData.ReloadInventory += FillInventorySlots;
            var prizeModel = new PrizeFundModel();
            prizeModel.Data = _model.Data;
            var prizeFund = new PrizeFundController<PrizeFundView, PrizeFundModel>(_view.CombinationView, prizeModel);
            FillInventorySlots();
            FillStatisticScreen();
            FillPrizePanel();
        }

        public void FillInventorySlots()
        {
            Clearinventory();
            var count = 0;
            foreach (var item in _model.Data.PlayerData.ChestInventory)
            {
                var slot = _view.Grid.transform.GetChild(count);
                var slotView = slot.GetComponent<InventoryChestSlotView>();
                slotView.SetChestData(item);
                slotView.Clicked += () => StartOpenScript(slotView, _button);
                count++;
            }
        }

        public void Clearinventory()
        {
            for (int i = 0; i < _view.Grid.transform.childCount; i++)
            {
                var currentSlot = _view.Grid.transform.GetChild(i).GetComponent<InventoryChestSlotView>();
                currentSlot.ClearAndSetBackground(_view.SlotsBackground);
            }
        }

        private void StartOpenScript(InventoryChestSlotView slot, ShareButton sharing)
        {
            var model = Resources.Load<ChestOpenModel>("ChestOpenModel");
            model.SlotView = slot;
            model.CurrentChest = slot.CorrespondingChest;
            model.Data = _model.Data;
            model.Inventory = _view.Grid;

            ChestOpenController = new ChestOpenController<ChestOpenView, ChestOpenModel>(_view.ChestOpenView, model, sharing);
        }

        private void FillStatisticScreen()
        {
            _view.StatisticView.SetTextInField(_view.StatisticView.WinCount, "Number of winning combinations: " + _model.Data.Statistic.WinNumber.ToString());
            _view.StatisticView.SetTextInField(_view.StatisticView.BonusCombinationsCount, "Number of bonus combinations: " + _model.Data.Statistic.BonusNumber.ToString());
            _view.StatisticView.SetTextInField(_view.StatisticView.TokenCollectedCount, "Token collected: " + _model.Data.Statistic.TokenCollectedNumber.ToString());
            _view.StatisticView.SetTextInField(_view.StatisticView.KeyCollectedCount, "Key collected: " + _model.Data.Statistic.KeyCollectedNumber.ToString());
            _view.StatisticView.SetTextInField(_view.StatisticView.OpenChestCount, "Number of open chests: " + _model.Data.Statistic.ChestOpenNumber.ToString());
        }

        private void FillPrizePanel()
        {
            var bonusPanelModel = Resources.Load<CardsDataBase>("CardsDataBase");
            var bonusPanelView = _view.BonusCombinationView;
            var bonusCombinationController = new BonusCombinationsPanelController<BonusCombinationsView, CardsDataBase>(bonusPanelView, bonusPanelModel);
        }
    }
}

