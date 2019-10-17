/**
 * Referring to the node documentation --> https://nodejs.org/api/crypto.html#crypto_class_cipher
 */
var crypto = require('crypto');
var cryptico = require('cryptico');
var r = require('jsrsasign');
//var forge = require('node-forge');
var caesar = require('./caesar');
const scryptsy = require('scryptsy');
const CipherJS = require('cipherjs');
const Vigenere = CipherJS.Vigenere;
const Blowfish = require('egoroof-blowfish');
// iv length has to be equal to block size of certain algorithm
var ivLength = {
  'BLOWFISH-32-ECB': 8, 
  'BLOWFISH-32-CBC': 8,
  'BLOWFISH-64-ECB': 8, 
  'BLOWFISH-64-CBC': 8,
  'BLOWFISH-128-ECB': 8, 
  'BLOWFISH-128-CBC': 8,
  'BLOWFISH-256-ECB': 8, 
  'BLOWFISH-256-CBC': 8,
  'BLOWFISH-448-ECB': 8, 
  'BLOWFISH-448-CBC': 8,
  /*'idea': 8,
  'idea-cbc': 8,
  'idea-cfb': 8,
  'idea-ofb': 8,
  'bf': 8,
  'bf-cbc': 8,
  'bf-cfb': 8,
  'bf-ofb': 8,
  'blowfish': 8,*/
  'des': 8,
  'des-cbc': 8,
  'des-cfb': 8,
  'des-cfb1': 8,
  'des-cfb8': 8,
  'des-ofb': 8,
  'des3': 8,
  'aes-128-cbc': 16,
  'aes-128-cbc-hmac-sha1': 16,
  'aes-128-cfb': 16,
  'aes-128-cfb1': 16,
  'aes-128-cfb8': 16,
  'aes-128-ctr': 16,
  'aes-128-ofb': 16,
  'aes-192-cbc': 16,
  'aes-192-cfb': 16,
  'aes-192-cfb1': 16,
  'aes-192-cfb8': 16,
  'aes-192-ctr': 16,
  'aes-192-ofb': 16,
  'aes-256-cbc': 16,
  'aes-256-cbc-hmac-sha1': 16,
  'aes-256-cfb': 16,
  'aes-256-cfb1': 16,
  'aes-256-cfb8': 16,
  'aes-256-ctr': 16,
  'aes-256-ofb': 16,
  'aes128': 16,
  'aes192': 16,
  'aes256': 16,
  /*'camellia-128-cbc': 16,
  'camellia-128-cfb': 16,
  'camellia-128-cfb1': 16,
  'camellia-128-cfb8': 16,
  'camellia-128-ofb': 16,
  'camellia-192-cbc': 16,
  'camellia-192-cfb': 16,
  'camellia-192-cfb1': 16,
  'camellia-192-cfb8': 16,
  'camellia-192-ofb': 16,
  'camellia-256-cbc': 16,
  'camellia-256-cfb': 16,
  'camellia-256-cfb1': 16,
  'camellia-256-cfb8': 16,
  'camellia-256-ofb': 16,
  'camellia128': 16,
  'camellia192': 16,
  'camellia256': 16,*/
  /*'AES-ECB-128': 16,
  'AES-CBC-128': 16,
  'AES-CFB-128': 16,
  'AES-OFB-128': 16,
  'AES-CTR-128': 16,*/
  /*'AES-GCM-128': 16,*/
  /*'AES-ECB-192': 24,
  'AES-CBC-192': 24,
  'AES-CFB-192': 24,
  'AES-OFB-192': 24,
  'AES-CTR-192': 24,
  /*'AES-GCM-192': 24,*/
  /*'AES-ECB-256': 32,
  'AES-CBC-256': 32,
  'AES-CFB-256': 32,
  'AES-OFB-256': 32,
  'AES-CTR-256': 32,
  /*'AES-GCM-256': 32,*/
  /*'3DES-ECB': 
  '3DES-CBC'
  'DES-ECB',
  'DES-CBC'*/
  'caesar': -1,
  'vigenere': -1
}

// Key length of different algorithms
var keyLength = {
  'idea': 16,
  'idea-cbc': 16,
  'idea-cfb': 16,
  'idea-ofb': 16,
  'bf': 56,
  'bf-cbc': 56,
  'bf-cfb': 56,
  'bf-ofb': 56,
  'blowfish': 56,
  'des': 8,
  'des-cbc': 8,
  'des-cfb': 8,
  'des-cfb1': 8,
  'des-cfb8': 8,
  'des-ofb': 8,
  'des3': 24,
  'aes-128-cbc': 16,
  'aes-128-cbc-hmac-sha1': 16,
  'aes-128-cfb': 16,
  'aes-128-cfb1': 16,
  'aes-128-cfb8': 16,
  'aes-128-ctr': 16,
  'aes-128-ofb': 16,
  'aes-192-cbc': 24,
  'aes-192-cfb': 24,
  'aes-192-cfb1': 24,
  'aes-192-cfb8': 24,
  'aes-192-ctr': 24,
  'aes-192-ofb': 24,
  'aes-256-cbc': 32,
  'aes-256-cbc-hmac-sha1': 32,
  'aes-256-cfb': 32,
  'aes-256-cfb1': 32,
  'aes-256-cfb8': 32,
  'aes-256-ctr': 32,
  'aes-256-ofb': 32,
  'aes128': 16,
  'aes192': 24,
  'aes256': 32,
  'camellia-128-cbc': 16,
  'camellia-128-cfb': 16,
  'camellia-128-cfb1': 16,
  'camellia-128-cfb8': 16,
  'camellia-128-ofb': 16,
  'camellia-192-cbc': 24,
  'camellia-192-cfb': 24,
  'camellia-192-cfb1': 24,
  'camellia-192-cfb8': 24,
  'camellia-192-ofb': 24,
  'camellia-256-cbc': 32,
  'camellia-256-cfb': 32,
  'camellia-256-cfb1': 32,
  'camellia-256-cfb8': 32,
  'camellia-256-ofb': 32,
  'camellia128': 16,
  'camellia192': 24,
  'camellia256': 32,
  'BLOWFISH-32-ECB': 4, 
  'BLOWFISH-32-CBC': 4,
  'BLOWFISH-64-ECB': 8, 
  'BLOWFISH-64-CBC': 8,
  'BLOWFISH-128-ECB': 16, 
  'BLOWFISH-128-CBC': 16,
  'BLOWFISH-256-ECB': 32, 
  'BLOWFISH-256-CBC': 32,
  'BLOWFISH-448-ECB': 56, 
  'BLOWFISH-448-CBC': 56,
}
exports.ivLength = ivLength; 
exports.keyLength = keyLength; 
exports.crypto = crypto; 
exports.toHexString = function(byteArray) {
  return byteArray.reduce((output, elem) => 
    (output + ('0' + elem.toString(16)).slice(-2)),
    '');
},
exports.encryptMessage = function(text, password, algorithm) {
  if(Object.keys(ivLength).includes(algorithm)){
    if(algorithm == 'caesar'){
      if(isNaN(password)){
        return text;
      } else{
        let encrypted = caesar.caesarShift(text, password);
        return encrypted;
      }
    } else if(algorithm == 'vigenere'){
      let cipherText = Vigenere.encrypt(text, password);
      return cipherText;

    } else if(algorithm.includes('AES')){
      /*var salt = forge.random.getBytes(8);  
      var key = forge.pkcs5.pbkdf2(password, salt, 1000, ivLength[algorithm]);  
      var iv = forge.random.getBytes(ivLength[algorithm]);
      var input = forge.util.createBuffer(text, 'utf8');
      algorithm = algorithm.split('-');
      algorithm.pop();
      algorithm = algorithm.join('-');
      var cipher = forge.cipher.createCipher(algorithm, key);
      cipher.start({iv: iv});
      cipher.update(input);
      cipher.finish();
      var encryptionObject = {
        message: cipher.output.toHex(),
        iv: forge.util.bytesToHex(iv), 
        salt: forge.util.bytesToHex(salt)
      };      
      return JSON.stringify(encryptionObject);*/
    } else if(algorithm.includes('BLOWFISH')){
      var mode = Blowfish.MODE.ECB; 
      if(algorithm.includes('CBC')){
        mode = Blowfish.MODE.CBC;
      }
      const salt = crypto.randomBytes(8);
      const key = scryptsy(password, salt, 1024, 8, 1, keyLength[algorithm]);
      const bf = new Blowfish(key, mode, Blowfish.PADDING.NULL);
      const iv = crypto.randomBytes(ivLength[algorithm]);
      bf.setIv(iv); // optional for ECB mode; bytes length should be equal 8

      const encoded = bf.encode(text);
      var encryptionObject = {
        message: this.bytesToHex(encoded),
        iv: this.bytesToHex(iv),
        salt: this.bytesToHex(salt)
      };  
      return JSON.stringify(encryptionObject);
    } else{
      const salt = crypto.randomBytes(8);
      const key = scryptsy(password, salt, 1024, 8, 1, keyLength[algorithm]);
      const iv = crypto.randomBytes(ivLength[algorithm]);

      const cipher = crypto.createCipheriv(algorithm, key, iv);

      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');

      var encryptionObject = {
        message: encrypted,
        iv: this.bytesToHex(iv), 
        salt: this.bytesToHex(salt)
      };   
      return JSON.stringify(encryptionObject);
    }
    
  }
}

exports.decryptMessage = function(encryptedText, password, algorithm) {
  if(Object.keys(ivLength).includes(algorithm)){
    if(algorithm == 'caesar'){
      if(isNaN(password)){
        return text;
      } else{
        return caesar.caesarShift(encryptedText, -parseInt(password));
      }
    } else if(algorithm == 'vigenere'){
      let plainText = Vigenere.decrypt(encryptedText, password);
      return plainText;

    } else if(algorithm.includes('AES')){
      /*
      encryptedText = JSON.parse(encryptedText);
      var key = forge.pkcs5.pbkdf2(password, forge.util.hexToBytes(encryptedText.salt), 1000, ivLength[algorithm]);  
      var input = forge.util.createBuffer(forge.util.hexToBytes(encryptedText.message));
      algorithm = algorithm.split('-');
      algorithm.pop();
      algorithm = algorithm.join('-');
      var decipher = forge.cipher.createDecipher(algorithm, key);
      decipher.start({iv: forge.util.hexToBytes(encryptedText.iv)});
      decipher.update(input);
      decipher.finish();
      return decipher.output.toString('utf-8');*/
    } else if(algorithm.includes('BLOWFISH')){
      encryptedText = JSON.parse(encryptedText);
      var mode = Blowfish.MODE.ECB; 
      if(algorithm.includes('CBC')){
        mode = Blowfish.MODE.CBC;
      }
      const salt = this.hexToBytes(encryptedText.salt); 
      const key = scryptsy(password, salt, 1024, 8, 1, keyLength[algorithm]);
      const bf = new Blowfish(key, mode, Blowfish.PADDING.NULL);
      const iv = this.hexToBytes(encryptedText.iv);
      bf.setIv(iv);
      const decoded = bf.decode(Buffer.from(this.hexToBytes(encryptedText.message)));
      return decoded;
    } else{
      encryptedText = JSON.parse(encryptedText);
      const salt = this.hexToBytes(encryptedText.salt);
      const key = scryptsy(password, salt, 1024, 8, 1, keyLength[algorithm]);
      const iv = this.hexToBytes(encryptedText.iv);
      const decipher = crypto.createDecipheriv(algorithm, key, iv);
      let decrypted = decipher.update(encryptedText.message, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    }
  } else{
    throw NotImplementedException; 
  }
}

exports.generateKeyFromPEM = function(PEMString){
  return r.KEYUTIL.getKeyFromPlainPrivatePKCS8PEM(PEMString);
}

exports.genereatePublicPrivateKeyPair = function(password, bytes) {

  var privateKey = cryptico.generateRSAKey(password, bytes*8);
  var publicKey =cryptico.publicKeyString(privateKey);

  /*
    
  
  var PlainText = "Matt, I need you to help me with my Starcraft strategy.";
  
  var EncryptionResult = cryptico.encrypt(PlainText, publicKey);
  var DecryptionResult = cryptico.decrypt(EncryptionResult.cipher, privateKey);
  console.log(DecryptionResult.plaintext);
  */
  
  var key = new r.RSAKey();
  var {n, e, d, p, q, dmp1, dmq1, coeff} = privateKey; 
  key.n = n; 
  key.e = e; 
  key.d = d; 
  key.p = p; 
  key.q = q; 
  key.dmp1 = dmp1; 
  key.dmq1 = dmq1; 
  key.coeff = coeff; 
  key.isPrivate = true;
  privateKey = r.KEYUTIL.getPEM(key, "PKCS1PRV");
  
  publicKey =  cryptico.publicKeyFromString(publicKey);
  var public = new r.RSAKey();
  var {n, e} = publicKey; 
  public.n = n; 
  public.e = e;
  public.isPublic = true;

  publicKey = r.KEYUTIL.getPEM(public);
  return JSON.stringify({
    publicKey: publicKey, 
    privateKey: privateKey
  });

  
  /* key sizes
  512 /  128
// 1024 /  256
// 2048 /  512
// 4096 / 1024*/
}

exports.bytesToHex = function(byteArray) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}
  exports.hexToBytes = function(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
    return Buffer.from(bytes);
}