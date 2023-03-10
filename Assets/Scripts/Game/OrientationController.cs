using UnityEngine;
using System.Runtime.InteropServices;
using UnityEngine.UI;

namespace ChestGame.Game.Module.MonoModule
{
    public class OrientationController : MonoBehaviour
    {
        [SerializeField] private Button _fulscreen;

        [DllImport("__Internal")] private static extern bool IsMobile();

        private void Start()
        {
            _fulscreen.onClick.RemoveAllListeners();
            _fulscreen.onClick.AddListener(EnableFulscreen);
#if !UNITY_EDITOR
            if (IsMobile())
            {
                _fulscreen.gameObject.SetActive(true);
            }
            else
                _fulscreen.gameObject.SetActive(false);
#endif
        }

        private void EnableFulscreen()
        {
            Screen.fullScreen = !Screen.fullScreen;
        }
    }
}


