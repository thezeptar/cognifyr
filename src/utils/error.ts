import { CustomError } from '../functions/tools/error';

export default class CognifyError {
    constructor(code: string, message: string) {
        return new CustomError('CognifyError', { code: `[${code}]`, message });
    }
}

export function error(code: string, message: string) {
    throw new CognifyError(code, message);
}
