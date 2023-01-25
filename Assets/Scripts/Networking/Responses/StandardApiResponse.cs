using Newtonsoft.Json;

namespace Network.Abstract
{
    public class StandardApiResponse
    {
        [JsonProperty("ok")] private bool _ok;
        [JsonProperty("id")] private int _id;
        [JsonProperty("jsonrpc")] private string _jsonRpcVersion;
        [JsonProperty("result")] private bool _result;

        public bool Ok => _ok;
        public int Id => _id;
        public string JsonRpcVersion => _jsonRpcVersion;
        public bool Result => _result;
    }
}