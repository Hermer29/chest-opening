using Newtonsoft.Json;

namespace Network.Abstract
{
    public class NftHolderResponse
    {
        [JsonProperty("ok")] private bool _ok;
        [JsonProperty("id")] private int[] _id;
        [JsonProperty("jsonrpc")] private string _rpcVersion;
        [JsonProperty("result")] private int _result;
        
        public bool Ok => _ok;
        public int[] ID => _id;
        public string RPCVersion => _rpcVersion;
        public int Result => _result;
    }
}