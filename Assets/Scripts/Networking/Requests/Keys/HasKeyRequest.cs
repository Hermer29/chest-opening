using Network.Abstract;
using Network.Requests.RequestData;
using Networking.Abstract;
using UnityEngine;

namespace Network.Requests
{
    public class HasKeyRequest : PostParametrizedRequest<DataWithAddress, StandardApiResponse>
    {
        public HasKeyRequest(MonoBehaviour coroutineHost) : base(coroutineHost)
        {
        }

        protected override string SubUrl => "/has_key";
    }
}