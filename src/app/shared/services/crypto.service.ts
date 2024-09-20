import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ec as EC } from 'elliptic';

@Injectable({
    providedIn: 'root'
})
export class CryptoService {
    private _ec: EC;
    private keyPair: EC.KeyPair;

    constructor() {
        this._ec = new EC('secp256k1');
        this.keyPair = this._ec.genKeyPair();
    }

    public async generateSharedSecret(
        publicKey: string,
        privateKey: string,
    ): Promise<string> {
        // Convert public key from string to elliptic curve key
        const ecPublicKey: EC.KeyPair = this._ec.keyFromPublic(publicKey, 'hex');
    
        // Generate the elliptic curve key from the private key (already in hexadecimal format)
        const ecPrivateKey: EC.KeyPair = this._ec.keyFromPrivate(privateKey, 'hex');
        
        // Derive the shared secret
        const sharedSecret = ecPrivateKey.derive(ecPublicKey.getPublic());
    
        // Convert the shared secret to a hexadecimal string
        const sharedSecretHex: string = sharedSecret.toString(16);
    
        // Optionally, hash the shared secret using SHA-256 for further security
        return CryptoJS.SHA256(sharedSecretHex).toString(CryptoJS.enc.Hex);
    }

    public encryptMessage(
        message: string,
        secretKey: string,
    ): string {
        return CryptoJS.AES.encrypt(JSON.stringify({message}), secretKey).toString();
    }

    // AES decryption using the shared secret
    public decryptMessage(
        cipherText: string,
        secretKey: string,
    ): string {
        console.log('decryptMessage -------------->', secretKey, 'shared secret')
        const bytes: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(cipherText, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}