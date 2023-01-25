using System;
using System.Collections.Generic;
using Network.Utility;

namespace Networking.Utility
{
    public class ObservableSelectHelper<TIn, TOut> : IObservable<TOut>, IObserver<TIn>
    {
        private readonly IObservable<TIn> _source;
        private readonly Func<TIn, TOut> _selector;
        private readonly List<IObserver<TOut>> _observers = new List<IObserver<TOut>>();

        public ObservableSelectHelper(IObservable<TIn> source, Func<TIn, TOut> selector)
        {
            _source = source;
            _selector = selector;

            _source.Subscribe(this);
        }
        
        public IDisposable Subscribe(IObserver<TOut> observer)
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

        public void OnNext(TIn value)
        {
            var outValue = _selector.Invoke(value);
            
            foreach (var observer in _observers)
            {
                observer.OnNext(outValue);
            }
        }
    }
}