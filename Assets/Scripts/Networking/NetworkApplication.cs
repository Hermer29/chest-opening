using System;
using System.Collections.Generic;
using ChestGame.Data;
using ChestGame.Game.Module.ScriptableModule;
using UnityEngine;

namespace Networking
{
    public class NetworkApplication : MonoBehaviour
    {
        [SerializeField] private CardIdPair[] _cardNetworkIdOpposition;
        [SerializeField] private ApiMethodsGateway _gateway;
        
        public void Initialize()
        {
            _gateway.StartSession();
        }
    }

    [Serializable]
    public class CardIdPair
    {
        [SerializeField] private int _id;
        [SerializeField] private CardInfo _card;
    }
}