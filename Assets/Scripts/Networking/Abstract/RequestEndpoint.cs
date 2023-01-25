using System;
using Networking.Utility;

namespace Network.Abstract
{
    public abstract class RequestEndpoint<TRequestData, TResponse> : BaseRequest
    {
        public abstract IObservable<TResponse> Execute(TRequestData data);
    }

    public abstract class RequestEndpoint<TResponse> : BaseRequest
    {
        public abstract IObservable<TResponse> Execute();
    }
}