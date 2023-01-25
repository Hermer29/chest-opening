using System.Collections;
using System.Collections.Generic;

namespace Network.Requests.RequestData
{
    public abstract class BaseRequestData : IEnumerable<(string, string)>
    {
        public abstract IEnumerator<(string, string)> GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }
}