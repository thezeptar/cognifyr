import { validateEmpty } from '../utils/validate';
import { randomBytes } from 'node:crypto';
import CognifyError from '../utils/error';

interface ChatResult {
    result?: string;
    error?: string;
    statusCode: number;
}

export class CognifyBot {
    private _botID: string | number;

    public constructor(botID: string | number = randomBytes(16).toString('hex')) {
        this._botID = botID;
    }

    public get getBotID() {
        return this._botID;
    }

    public set setBotID(id: string | number) {
        this._botID = id;
    }

    public async chat(message: string): Promise<ChatResult> {
        if (!message) throw new CognifyError('MissingParameter', 'Parameter for message is missing');

        validateEmpty(message);

        const fetched = await fetch(`https://cognifyr-api.vercel.app/api/chat?botID=${this._botID}&message=${message}`);
        const text = await fetched.text();

        return text ? JSON.parse(text) : {
            error: 'Failed while fetching the API',
            statusCode: 500,
        };
    }
}
