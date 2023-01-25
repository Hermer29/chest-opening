using System;
using System.Collections.Generic;
using Network.Exceptions;
using Network.Requests;
using Network.Requests.RequestData;
using Network.Utility;
using Networking.Utility;
using UnityEngine;

namespace Networking
{
    public class ApiMethodsGateway : MonoBehaviour
    {
        private string _token;
        
        public IObservable<Null> StartSession()
        {
            var startSessionRequest = new StartSessionRequest(this);
            return startSessionRequest.Execute()
                .AssertThat(x => x.Result == true, 
                    () => new NotSuccessfulOperationException("Session can't be started"))
                .Select(x => new Null());
        }

        public IObservable<bool> IsSessionEnded()
        {
            var getSessionRequest = new GetSessionRequest(this);
            return getSessionRequest.Execute()
                .Select(x => x.Result == false);
        }

        public IObservable<bool> IsUserHaveKey(string walletId)
        {
            var request = new HasKeyRequest(this);
            return request.Execute(new DataWithAddress(walletId))
                .Select(x => x.Result);
        }

        public IObservable<IEnumerable<int>> GetNftHolder(string walletId)
        {
            var request = new GetNftHolderRequest(this);
            return request.Execute(new DataWithAddress(walletId))
                .Select(x => x.ID);
        }

        public IObservable<Null> SendKey(string walletId)
        {
            var request = new SendKeyRequest(this);
            return request.Execute(new DataWithAddress(walletId))
                .Select(x => new Null());
        }

        public IObservable<Null> UseKey(string walletId)
        {
            var request = new UseKeyRequest(this);
            return request.Execute(new DataWithAddress(walletId))
                .Select(x => new Null());
        }

        public IObservable<(IEnumerable<int> cards, int sum)> DrawCards(string walletId)
        {
            var request = new DrawCardsRequest(this);
            return request.Execute(new DataWithAddress(walletId))
                .Select(x => ((IEnumerable<int>)x.Id, x.Sum));
        }
    }
}