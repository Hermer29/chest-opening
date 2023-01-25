using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.SceneManagement;

public class LoginScript : MonoBehaviour
{

    [DllImport("__Internal")]
    private static extern void TonConnect();

    [DllImport("__Internal")]
    private static extern bool isConnected();

    [SerializeField] private string _newSceneName;


    public async void ChangeScene()
    {
        TonConnect();
        SceneManager.LoadScene(_newSceneName);
        
    }
}
