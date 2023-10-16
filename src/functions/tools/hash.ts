import CognifyError from '../../utils/error';
import crypto from 'node:crypto';

interface DecryptOptions {
    encrypted: string;
    secretKey: string;
}

interface EncryptOptions {
    input: string;
    secretKey: string;
}

export class CognifyCrypto {
    public encrypt({ input, secretKey }: EncryptOptions) {
        const salt = crypto.randomBytes(16);
        const key = crypto.pbkdf2Sync(Buffer.alloc(secretKey.length, secretKey), salt, 100000, 32, 'sha256');
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

        let encrypted = cipher.update(input, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const output = salt.toString('hex') + iv.toString('hex') + encrypted;

        return output;
    }

    public decrypt({ encrypted, secretKey }: DecryptOptions) {
        if (!encrypted || !secretKey) throw new CognifyError('MissingParameter', 'The encrypted or secretKey parameter is missing');
    
        const salt = Buffer.from(encrypted.slice(0, 32), 'hex');
        const iv = Buffer.from(encrypted.slice(32, 64), 'hex');

        const encryptedData = encrypted.slice(64);
        const key = crypto.pbkdf2Sync(Buffer.alloc(secretKey.length, secretKey), salt, 100000, 32, 'sha256');
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    
        try {
            return decipher.update(encryptedData, 'hex', 'utf8') + decipher.final('utf8');
        } catch (error) {
            throw new CognifyError('SecretKey', 'Invalid secret key provided');
        }
    }    
};
