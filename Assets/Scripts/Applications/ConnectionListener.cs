using System.Collections;
using System.Runtime.InteropServices;
using UnityEngine;

namespace ChestGame.Game.Applications
{
    public abstract class ConnectionListener : MonoBehaviour
    {
        protected void StartWaitingForConnection()
        {
            #if !UNITY_EDITOR && UNITY_WEBGL
            TonConnect();
            StartCoroutine(WaitingForConnection()); 
            #else
            Debug.LogWarning($"[{nameof(ConnectionListener)}] Simulated connection to Ton");
            OnConnectedToTon();
            #endif
        }
        
        private IEnumerator WaitingForConnection()
        {
            yield return new WaitUntil(isConnected);
            OnConnectedToTon();
        }
        
        protected abstract void OnConnectedToTon();

        [DllImport("__Internal")]
        public static extern bool isConnected();

        [DllImport("__Internal")]
        public static extern void TonConnect();
    }
}