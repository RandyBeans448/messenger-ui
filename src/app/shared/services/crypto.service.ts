import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class CryptoService {
    constructor() {}

    public encryptMessage(message: string, secretKey: string): string {
        return CryptoJS.AES.encrypt(JSON.stringify({ message }), secretKey).toString();
    }

    public decryptMessage(
        cipherText: string,
        secretKey: string,
    ) {
        const bytes: CryptoJS.lib.WordArray = CryptoJS.AES.decrypt(cipherText, secretKey);
        const decryptedData: string = bytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedData) {
            throw new Error('Failed to decrypt message: Empty decrypted data');
        }

        const parseString = JSON.parse(decryptedData);
        return parseString
    }
}