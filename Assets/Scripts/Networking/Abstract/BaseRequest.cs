using System.Text;
using Newtonsoft.Json;
using UnityEngine.Networking;

namespace Networking.Utility
{
    public abstract class BaseRequest
    {
        private const string Url = "185.182.111.191:8080/v2";

        protected TResponse DecodeAndDeserializeResponse<TResponse>(UnityWebRequest response)
        {
            var raw = response.downloadHandler.data;
            var text = Encoding.UTF8.GetString(raw);
            return JsonConvert.DeserializeObject<TResponse>(text, new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.All
            });
        }

        protected string GetUri(string subUrl)
        {
            return Url + subUrl;
        }
    }
}