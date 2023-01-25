using Network.Abstract;
using UnityEngine;

namespace Network.Requests
{
    public class StartSessionRequest : PostParameterlessRequest<StandardApiResponse>
    {
        public StartSessionRequest(MonoBehaviour coroutineHost) : base(coroutineHost)
        {
        }

        protected override string SubUrl => "/start_session";
    }
}