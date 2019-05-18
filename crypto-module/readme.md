This module offers a an interface between some cipher methods of nodes built-in crypto library and nativescript. To use this module, please make sure to io use `require("nativescript-nodeify");` before using any method of the crypto-module package which are using nodes crypto methods.

This module offers the same interface for some simple other ciphers, e.g. caesar cipher.

# See it in action 
```
var crypto_module = require('crypto-module');
Object.keys(crypto_module.ivLength).forEach(function(algorithm) {
    console.log(algorithm); 
    var encrypted = "";
    var decrypted = "";
    var key = "";
    if(algorithm == 'caesar'){
        key = 28; 
    } else{
        key = "secret";
    }

    encrypted = crypto_module.encryptMessage('hallo 👄', key, algorithm); 
    console.log(encrypted);
    decrypted = crypto_module.decryptMessage(encrypted, key, algorithm);
    console.log(decrypted); 
    console.log("-----------------------")
});
 ```
