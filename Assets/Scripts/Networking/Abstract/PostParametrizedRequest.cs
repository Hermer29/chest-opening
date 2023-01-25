using System;
using System.Collections;
using Network.Abstract;
using Network.Requests.RequestData;
using UnityEngine;
using UnityEngine.Networking;

namespace Networking.Abstract
{
    public abstract class PostParametrizedRequest<TRequestData, TResponse> : RequestEndpoint<TRequestData, TResponse>
        where TRequestData: BaseRequestData
    {
        private readonly MonoBehaviour _coroutineHost;

        protected PostParametrizedRequest(MonoBehaviour coroutineHost)
        {
            _coroutineHost = coroutineHost;
        }
        
        protected abstract string SubUrl { get; }
        
        public override IObservable<TResponse> Execute(TRequestData data)
        {
            var observable = new ApiRequestObservable<TResponse>();
            _coroutineHost.StartCoroutine(ExecuteRequest(observable, data));
            return observable;
        }

        private IEnumerator ExecuteRequest(ApiRequestObservable<TResponse> observable, TRequestData data)
        {
            var form = new WWWForm();
            FillFormWithParameters(form, data);
            var request = UnityWebRequest.Post(GetUri(SubUrl), form);
            var process = request.SendWebRequest();
            
            while (true)
            {
                yield return process;
                var result = DecodeAndDeserializeResponse<TResponse>(process.webRequest);
                observable.OnNext(result);
                observable.OnCompleted();
                break;
            }
        }

        private void FillFormWithParameters(WWWForm form, TRequestData data)
        {
            foreach (var (key, value) in data)
            {
                form.AddField(key, value);
            }
        }
    }
}