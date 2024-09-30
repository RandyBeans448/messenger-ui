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

    public getPublicKey(): string {
        return this.keyPair.getPublic('hex');
    }

    public getPrivateKey(): string {
        return this.keyPair.getPrivate('hex');
    }

    public async generateSharedSecret(
        privateKeyHex: string,
        publicKeyBase64: string,
    ): Promise<string> {
        // Generate the elliptic curve key from the private key
        const ecPrivateKey: EC.KeyPair = this._ec.keyFromPrivate(privateKeyHex, 'hex');

        // Decode the public key from Base64 to hex
        const publicKeyWordArray: CryptoJS.lib.WordArray = CryptoJS.enc.Base64.parse(publicKeyBase64);
        const publicKeyHex: string = CryptoJS.enc.Hex.stringify(publicKeyWordArray);

        // Generate the elliptic curve key from the public key
        const ecPublicKey: EC.KeyPair = this._ec.keyFromPublic(publicKeyHex, 'hex');

        // Derive the shared secret
        const sharedSecret = ecPrivateKey.derive(ecPublicKey.getPublic());

        // Convert the shared secret to a hexadecimal string
        const sharedSecretHex: string = sharedSecret.toString(16);
        console.log('Shared Secret:', sharedSecretHex);
        // Hash the shared secret using SHA-256
        return CryptoJS.SHA256(sharedSecretHex).toString(CryptoJS.enc.Hex);
    }

    public encryptMessage(message: string, secretKey: string): string {
        console.log('Encrypting with Secret Key:', secretKey);
        return CryptoJS.AES.encrypt(JSON.stringify({ message }), secretKey).toString();
    }

    public decryptMessage(
        cipherText: string,
        secretKey: string,
    ): string {
        const bytes: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(cipherText, secretKey);
        const decryptedData: string = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedData) {
            throw new Error('Failed to decrypt message: Empty decrypted data');
        }

        const parsedData = JSON.parse(decryptedData);
        return parsedData.message;
    }
}
