using System;

namespace Network.Utility
{
    public class DisposableHelper : IDisposable
    {
        private readonly Action _onDispose;

        public DisposableHelper(Action onDispose)
        {
            _onDispose = onDispose;
        }
        
        public void Dispose()
        {
            _onDispose.Invoke();
        }
    }
}