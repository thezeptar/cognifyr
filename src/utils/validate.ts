import CognifyError from './error';

export function validateEmpty(input: string) {
    if ((/^(?![\s\S]*$)/).test(input)) throw new CognifyError('ParameterEmpty', 'Parameter must be a non-empty string');

    return true;
}

export function validateDigit(input: number, minimum: number, max: number) {
    if (typeof input !== 'number') throw new CognifyError('ParameterType', 'Parameter must be a number');
    if (input < minimum || input > max) throw new CognifyError('ParameterDigit', `Parameter must be between ${minimum} and ${max}`);

    return true;
}
