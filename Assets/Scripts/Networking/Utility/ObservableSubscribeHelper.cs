using System;

namespace Network.Utility
{
    public class ObservableSubscribeHelper<T> : IObserver<T>, IDisposable
    {
        private readonly Action<T> _onNext;
        private readonly Action _onCompleted;
        private readonly Action<Exception> _onError;
        private IDisposable _sourceSubscription;
        
        public ObservableSubscribeHelper(IObservable<T> source, Action<T> onNext = null, 
            Action onCompleted = null, Action<Exception> onError = null)
        {
            _onNext = onNext;
            _onCompleted = onCompleted;
            _onError = onError;
            _sourceSubscription = source.Subscribe(this);
        }
        
        public void OnCompleted()
        {
            _onCompleted?.Invoke();
        }

        public void OnError(Exception error)
        {
            _onError?.Invoke(error);
        }

        public void OnNext(T value)
        {
            _onNext?.Invoke(value);
        }

        public void Dispose()
        {
            _sourceSubscription.Dispose();
        }
    }
}