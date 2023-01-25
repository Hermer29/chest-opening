using Network.Abstract;
using Network.Requests.RequestData;
using Networking.Abstract;
using UnityEngine;

namespace Network.Requests
{
    public class GetNftHolderRequest : PostParametrizedRequest<DataWithAddress, NftHolderResponse>
    {
        public GetNftHolderRequest(MonoBehaviour coroutineHost) : base(coroutineHost)
        {
        }

        protected override string SubUrl => "/get_nft_holder";
    }
}