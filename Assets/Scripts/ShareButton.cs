using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.UI;

[RequireComponent(typeof(Button))]   
public class ShareButton : MonoBehaviour
{
    private bool _isWinCombination;
    
    private void Start()
    {
        gameObject.SetActive(false);
        GetComponent<Button>().onClick.AddListener(OpenModalWindow);
    }

    private void OpenModalWindow()
    {
#if !UNITY_EDITOR && UNITY_WEBGL
        ShowModal(_isWinCombination);
#else
        Debug.Log("[ShareButton] Sharing requested, but popup will be show up only in web gl build");
#endif
    }
    
    [DllImport("__Internal")]
    private static extern void ShowModal(bool title);

    public void MakeTitleForWinCombination()
    {
        _isWinCombination = true;
    }

    public void MakeTitleForBonusCombination()
    {
        _isWinCombination = false;
    }

    public void Hide()
    {
        gameObject.SetActive(false);
    }

    public void Show()
    {
        gameObject.SetActive(true);
    }
}