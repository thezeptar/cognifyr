import { PNG } from 'pngjs';
import { decodeBMP } from './bmp';
import JPEG from './jpeg/decode';
import TIFF from './tiff';

import format from '../format';

export default function decodeAll(data: Buffer) {
    return decodeAll[format(data)](data);
}

decodeAll.jpeg = function read(data: Buffer) {
    return JPEG(data);
};

decodeAll.png = function read(data: Buffer) {
    return PNG.sync.read(data);
};

decodeAll.bmp = function read(buffer: Buffer) {
    return decodeBMP(buffer);
};

decodeAll.tiff = function read(buffer: Buffer) {
    const ifds = TIFF.decode(buffer)[0];

    TIFF.decodeImage(buffer, ifds);

    return {
        width: ifds.width,
        height: ifds.height,
        data: TIFF.toRGBA8(ifds),
    };
};

decodeAll.unknown = function read() {
    return {
        data: Buffer.from([]),
        height: 0,
        width: 0,
    };
};
