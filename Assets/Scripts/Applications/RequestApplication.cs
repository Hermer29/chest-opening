using System;
using Cysharp.Threading.Tasks;
using UnityEngine;

public static class RequestApplication
{
    public static async UniTask<ResponseApi> SendMessage(string link, WWWForm form)
    {
        //var request = UnityWebRequest.Post("https://185.182.111.191:8080/v2/" + link, form);
        ResponseApi resp = null;

//      await request.SendWebRequest();
//      
//      if (request.result == UnityWebRequest.Result.Success)
//      {
//          resp = JsonUtility.FromJson<ResponseApi>(request.downloadHandler.text);
//      }
//      else
//      {
//          Debug.LogError("���-�� ����� �� ���: " + request.error + " " + request.result + " " + request.downloadHandler.text);
//      }
//      
        return resp;
    }

    [Serializable]
    public class ResponseApi
    {
        public bool ok;
        public int[] id;
        public float jsonrpc;
        public bool result;
        public int sum;
    }
}
