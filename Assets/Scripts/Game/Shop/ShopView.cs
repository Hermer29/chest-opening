using UnityEngine;
using UnityEngine.UI;
using System.Runtime.InteropServices;
using ChestGame.Game.Models;

namespace ChestGame.Game.View
{
    public class ShopView : MonoBehaviour, IView
    {
        [DllImport("__Internal")]
        public static extern void buyKey();

        [DllImport("__Internal")]
        public static extern void buyMistery();

        [DllImport("__Internal")]
        public static extern int balanceTonWallet();

        [DllImport("__Internal")]
        private static extern string accountTonWallet();

        [DllImport("__Internal")]
        public static extern bool isBought();

        public void ShowWalletId()
        {
#if !UNITY_EDITOR && UNITY_WEBGL
            _walletField.text = accountTonWallet();
#else
            Debug.LogWarning($"[{nameof(ShopView)}] Can't show wallet id while application is not deployed as webgl build");
            _walletField.text = "WALLET_ID_PLACEHOLDER";
#endif
        }

        public void BuyKey()
        {
#if !UNITY_EDITOR && UNITY_WEBGL
            buyKey();
#else
            Debug.LogWarning($"[{nameof(ShopView)}] Can't buy key while application is not deployed as webgl build");
#endif
        }

        public void SetTonBalance(ShopModel shopModel)
        {
#if !UNITY_EDITOR && UNITY_WEBGL
            shopModel.Data.DepositToken(balanceTonWallet());
#else
            shopModel.Data.DepositToken(999);
            Debug.LogWarning($"[{nameof(ShopView)}] Can't read ton balance while application is not deployed as webgl build");
#endif
        }

        [SerializeField] internal Text _walletField;
        [SerializeField] internal CanvasGroup Group;
        [SerializeField] internal Button CloseButton;
        [SerializeField] internal GameObject Grid;
        [SerializeField] internal CanvasGroup Effect;
        [SerializeField] internal AudioSource ButtonSound;
    }
}

