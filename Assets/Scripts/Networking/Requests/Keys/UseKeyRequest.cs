using Network.Abstract;
using Network.Requests.RequestData;
using Networking.Abstract;
using UnityEngine;

namespace Network.Requests
{
    public class UseKeyRequest : PostParametrizedRequest<DataWithAddress, StandardApiResponse>
    {
        public UseKeyRequest(MonoBehaviour coroutineHost) : base(coroutineHost)
        {
        }

        protected override string SubUrl => "/use_key";
    }
}