mergeInto(LibraryManager.library, {
  TonConnect: function () {
    window.wallet.connect();	
  },
  isConnected: function () {
	return window.wallet.ans;
  },
  isBought: function () {
	return window.wallet.ans;
  },
  buyKey: function () {
    window.wallet.buyKey();
  },
  buyMistery: function () {
    window.wallet.buyMistery();
  },
  balanceTonWallet: function () {
    return window.wallet.balancesd;
  },
  accountTonWallet: function () {
	var returnStr = window.wallet.accountIdtt;
    var bufferSize = lengthBytesUTF8(returnStr) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(returnStr, buffer, bufferSize);
    return buffer;
  } 

});
