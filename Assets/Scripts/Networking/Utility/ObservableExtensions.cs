using System;
using Networking.Utility;

namespace Network.Utility
{
    public static class ObservableExtensions
    {
        public static IDisposable Subscribe<T>(this IObservable<T> source, Action<T> onNext)
        {
            return new ObservableSubscribeHelper<T>(source, onNext);
        }
        
        public static IDisposable Subscribe<T>(this IObservable<T> source, Action<T> onNext, 
            Action onCompleted)
        {
            return new ObservableSubscribeHelper<T>(source, onNext, onCompleted);
        }
        
        public static IDisposable Subscribe<T>(this IObservable<T> source, Action<T> onNext, 
            Action onCompleted, Action<Exception> onError)
        {
            return new ObservableSubscribeHelper<T>(source, onNext, onCompleted, onError);
        }

        public static IObservable<TOut> Select<TIn, TOut>(this IObservable<TIn> source, Func<TIn, TOut> selector)
        {
            return new ObservableSelectHelper<TIn, TOut>(source, selector);
        }

        public static IObservable<T> AssertThat<T>(this IObservable<T> source, Predicate<T> predicate, 
            Func<Exception> errorFactory)
        {
            return new ObservableAssertValueHelper<T>(source, predicate, errorFactory);
        }
    }
}