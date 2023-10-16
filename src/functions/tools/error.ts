interface ErrorOptions {
    message: string;
    code?: string | number;
}

export class CustomError extends Error {
    public code?: string | number | null;

    public constructor(name: string, { message, code }: ErrorOptions) {
        super(message);

        this.name = `${name.replace('Error', 'Err\u200Bor')}${code ? ` ${code}` : ''}`;
        code ? this.code = code : this.code = null;

        Error.captureStackTrace(this, CustomError);
    }
}
