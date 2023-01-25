using System;
using System.Runtime.Serialization;

namespace Network.Exceptions
{

    [Serializable]
    public class NotSuccessfulOperationException : Exception
    {

        public NotSuccessfulOperationException()
        {
        }

        public NotSuccessfulOperationException(string message) : base(message)
        {
        }

        public NotSuccessfulOperationException(string message, Exception inner) : base(message, inner)
        {
        }

        protected NotSuccessfulOperationException(
            SerializationInfo info,
            StreamingContext context) : base(info, context)
        {
        }
    }
}