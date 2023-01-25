using System;
using System.Collections.Generic;
using Network.Utility;

namespace Networking.Utility
{
    public class ObservableAssertValueHelper<T> : IObservable<T>, IObserver<T>
    {
        private readonly IObservable<T> _source;
        private readonly Predicate<T> _assertion;
        private readonly Func<Exception> _errorFactory;
        private List<IObserver<T>> _observers = new List<IObserver<T>>();

        public ObservableAssertValueHelper(IObservable<T> source, Predicate<T> assertion, Func<Exception> errorFactory)
        {
            _source = source;
            _assertion = assertion;
            _errorFactory = errorFactory;
        }

        public IDisposable Subscribe(IObserver<T> observer)
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

        public void OnNext(T value)
        {
            var isValid = _assertion.Invoke(value);
            if (isValid == false)
            {
                OnError(_errorFactory.Invoke());
                return;
            }
            foreach (var observer in _observers)
            {
                observer.OnNext(value);
            }
        }
    }
}