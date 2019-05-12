This module offers a an interface between some cipher methods of nodes built-in crypto library and nativescript. To use this module, please make sure to install https://github.com/EddyVerbruggen/nativescript-nodeify and include this plugin using `require("nativescript-nodeify");` before using any method of the crypto-module package.  

# See it in action 
```
require("nativescript-nodeify");
var crypto_module = require('crypto-module');
Object.keys(crypto_module.ivLength).forEach(function(algorithm) {
    console.log(algorithm); 
    var encrypted = crypto_module.encryptMessage('hallo 👄', 'secret', algorithm); 
    console.log(crypto_module.decryptMessage(encrypted, 'secret', algorithm)); 
    console.log("-----------------------")
});

 ```
