import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { ec as EC } from 'elliptic';

@Injectable({
    providedIn: 'root'
})
export class KeyService {
    private ec: EC;
    private keyPair: EC.KeyPair;

    constructor() {
        this.ec = new EC('secp256k1');
        this.keyPair = this.ec.genKeyPair();
    }

    // Get the public key to share with the other user
    public getPublicKey(): string {
        return this.keyPair.getPublic('hex');
    }

    public getPrivateKey(): string {
        return this.keyPair.getPrivate('hex');
    }

    // Compute shared secret key from another user's public key
    public getSharedSecret(otherUserPublicKey: string): string {
        const otherKey: EC.KeyPair = this.ec.keyFromPublic(otherUserPublicKey, 'hex');
        return this.keyPair.derive(otherKey.getPublic()).toString(16);  // ECDH shared secret
    }
}