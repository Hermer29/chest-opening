using System;
using System.Collections.Generic;
using Network.Utility;

namespace Network.Abstract
{
    public class ApiRequestObservable<TResponse> : IObservable<TResponse>, IObserver<TResponse>
    {
        private List<IObserver<TResponse>> _observers = new List<IObserver<TResponse>>();

        public IDisposable Subscribe(IObserver<TResponse> observer)
        {
            _observers.Add(observer);
            return new DisposableHelper(() => _observers.Remove(observer));
        }

        public void OnCompleted()
        {
            foreach (var observer in _observers)
            {
                observer.OnCompleted();
            }
        }

        public void OnError(Exception error)
        {
            foreach (var observer in _observers)
            {
                observer.OnError(error);
            }
        }

        public void OnNext(TResponse value)
        {
            foreach (var observer in _observers)
            {
                observer.OnNext(value);
            }
        }
    }
}