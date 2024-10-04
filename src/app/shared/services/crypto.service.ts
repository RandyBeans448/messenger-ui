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