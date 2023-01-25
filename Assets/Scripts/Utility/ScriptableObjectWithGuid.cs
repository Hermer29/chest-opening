using NaughtyAttributes;
using Newtonsoft.Json;
using UnityEditor;
using UnityEngine;

namespace Utility
{
    public class ScriptableObjectWithGuid : ScriptableObject
    {
        [SerializeField, JsonProperty] private string _guid;

        public string Guid => _guid;

        private void OnValidate()
        {
#if UNITY_EDITOR
            if (string.IsNullOrEmpty(_guid) || _guid == "")
                ResetGuid();
#endif
        }

        [Button]
        private void ResetGuid()
        {
#if UNITY_EDITOR
            _guid = System.Guid.NewGuid().ToString();
            EditorUtility.SetDirty(this);
#endif
        }
    }
}