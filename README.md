# Ultra OTP: Two-Factor Authenticator
**Conveniently and securely access one-time password tokens from any device.**  
[View Screenshots](https://github.com/tggir1/ultraotp/blob/master/SCREENSHOTS.md)
<br/><br/>
## Ultra Flexible
Ultra OTP is capable of generating both HMAC-based (HOTP) and time-based (TOTP) one-time passwords and includes configuration options for advanced users.
- Access from any mobile or desktop browser
- Install on your smartphone as a standalone Progressive Web App
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/ultra-otp/) and [Chrome](https://chrome.google.com/webstore/detail/ultra-otp/hckclmddjnfcbcmoebpmlhhjafdgjnbe) extensions available
<br/><br/>
## Ultra Secure
Zero sensitive information ever leaves your device before being encrypted.
The [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) is utilized by your computer/phone to encrypt your data before it is sent to the server.

### Saving Tokens
When you store a new OTP token, Ultra OTP derives a 256-bit AES encryption key from your master password using the PBKDF2 key derivation function. This key is used to encrypt OTP token data (issuer, account, secret); the encrypted data is finally sent from your device over a secure TLS connection to a cloud database for storage.

### Accessing Tokens
When you log in to Ultra OTP your tokens are transmitted from the database to your device, then decrypted with your master password.

### Logging In
You may notice that your master password is used for both logging in and encryption. In theory I, or an attacker, could secretly log your password when it is sent to the server and use it to decrypt your data.

To prevent again such an attack, Ultra OTP salts and hashes your master password with your username on your device before it is transmitted to the server. Once the server receives the hashed password, it is salted again with a cryptographically secure random value, hashed again, and stored in a secure database. This process is repeated and hashes are compared every time you log in. The hashing functions that are used are one way hashes--they cannot be reverse engineered to reveal your true master password.

### Is anything *not* encrypted?
Yes. A handful of fields are not encrypted for functionality and/or performance purposes:
- Username
- The following OTP token fields (with potential values listed):
  - Algorithm: SHA1, SHA256, SHA512
  - Digits: 6, 8
  - Time period: 30, 60
  - Type: HOTP, TOTP
<br/>

*Client-side cryptography functions can be found in here: [client/src/crypto](https://github.com/tggir1/ultraotp/tree/master/client/src/crypto)*
<br/><br/>
## Ultra Private
Ultra OTP is built from the ground up to ensure user privacy and security.
- No personal information is needed to create an account
- Zero client-side analytics or tracking tools are in place
- WhO dOeSn'T lOvE CoOkIeS? Me! Zero 3rd party cookies
