using System.Collections.Generic;

namespace Network.Requests.RequestData
{
    public class DataWithAddress : BaseRequestData
    {
        private readonly string _userAddress;

        public DataWithAddress(string userAddress)
        {
            _userAddress = userAddress;
        }
        
        public override IEnumerator<(string, string)> GetEnumerator()
        {
            yield return ("user_address", _userAddress);
        }
    }
}