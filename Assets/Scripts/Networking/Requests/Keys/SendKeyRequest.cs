using Network.Abstract;
using Network.Requests.RequestData;
using Networking.Abstract;
using UnityEngine;

namespace Network.Requests
{
    public class SendKeyRequest : PostParametrizedRequest<DataWithAddress, StandardApiResponse>
    {
        public SendKeyRequest(MonoBehaviour coroutineHost) : base(coroutineHost)
        {
        }

        protected override string SubUrl => "/send_key";
    }
}