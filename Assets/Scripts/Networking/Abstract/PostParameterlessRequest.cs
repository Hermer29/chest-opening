using System;
using System.Collections;
using Network.Abstract;
using UnityEngine;
using UnityEngine.Networking;

namespace Network.Requests
{
    public abstract class PostParameterlessRequest<TResponse> : RequestEndpoint<TResponse>
    {
        private readonly MonoBehaviour _coroutineHost;

        protected PostParameterlessRequest(MonoBehaviour coroutineHost)
        {
            _coroutineHost = coroutineHost;
        }
        
        protected abstract string SubUrl { get; }
        
        public override IObservable<TResponse> Execute()
        {
            var observable = new ApiRequestObservable<TResponse>();
            _coroutineHost.StartCoroutine(ExecuteRequest(observable));
            return observable;
        }

        private IEnumerator ExecuteRequest(ApiRequestObservable<TResponse> observable)
        {
            var form = new WWWForm();
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
    }
}