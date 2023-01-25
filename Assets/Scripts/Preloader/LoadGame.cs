using System.Collections;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.Video;

namespace ChestGame.Preloader
{
    public class LoadGame : MonoBehaviour
    {
        [SerializeField] private float _awaitTime;
        [SerializeField] private string _newSceneName;
        private VideoPlayer player;

        void Awake()
        {
            player = GetComponent<VideoPlayer>();
            player.url = System.IO.Path.Combine(Application.streamingAssetsPath, "intro.mp4");
        }
        private IEnumerator Start()
        {
            player.Play();
            yield return new WaitForSeconds(_awaitTime);
            SceneManager.LoadScene(_newSceneName);
        }

        public void SetBalance(string balance)
        {
            Debug.Log("balance: " + balance);
            UserTonData.Balance = int.Parse(balance);
        }
    }

    public static class UserTonData
    {
        public static int Balance = 0;
    }
}

