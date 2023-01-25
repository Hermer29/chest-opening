using ChestGame.Data;
using Newtonsoft.Json;
using UnityEngine;

namespace Utility
{
    public class SerializedPersistentStorage 
    {
        public bool HaveValue<T>()
        {
            string key = typeof(T).ToString();
            return PlayerPrefs.HasKey(key);
        }
        
        public T Get<T>()
        {
            string key = typeof(T).ToString();
            var serialized = PlayerPrefs.GetString(key);
            return JsonConvert.DeserializeObject<T>(serialized);
        }

        public T GetValueOrNew<T>() where T : new()
        {
            if (HaveValue<T>() == false)
                return new T();
            return Get<T>();
        }

        public void Set<T>(T value)
        {
            string key = typeof(T).ToString();
            var serialized = JsonConvert.SerializeObject(value, new JsonSerializerSettings
            {
                TypeNameHandling = TypeNameHandling.All
            });
            PlayerPrefs.SetString(key, serialized);
            PlayerPrefs.Save();
        }
    }
}