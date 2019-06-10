This module offers an interface between several cryptographic block cipher libraries, as well as an interface to an RSA library. You can use it with nativescript.

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
