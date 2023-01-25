using Network.Abstract;
using Network.Requests.RequestData;
using Networking.Abstract;
using UnityEngine;

namespace Network.Requests
{
    public class DrawCardsRequest : PostParametrizedRequest<DataWithAddress, DrawCardsResponse>
    {
        public DrawCardsRequest(MonoBehaviour coroutineHost) : base(coroutineHost)
        {
        }

        protected override string SubUrl => "/draw";
    }
}