using Network.Abstract;
using UnityEngine;

namespace Network.Requests
{
    public class GetSessionRequest : PostParameterlessRequest<StandardApiResponse>
    {
        public GetSessionRequest(MonoBehaviour coroutineHost) : base(coroutineHost)
        {
        }

        protected override string SubUrl => "/get_session";
    }
}