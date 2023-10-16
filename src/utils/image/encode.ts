import { PNG } from 'pngjs';
import { encodeBMP } from './bmp';
import JPEG from './jpeg/encode';
import TIFF from './tiff';

import { Data } from '../data';
import format from '../format';

export default function encode(buffer: Data, file: Buffer) {
    return encode[format(file)](buffer);
}

encode.jpeg = function write(buffer: Data) {
    return JPEG(buffer);
};

encode.png = function write(buffer: PNG | Data) {
    return {
        width: buffer.width,
        height: buffer.height,
        data: PNG.sync.write(buffer as PNG),
    };
};

encode.bmp = function write(buffer: Data) {
    return encodeBMP({ bitmap: buffer });
};

encode.tiff = function write(buffer: Data) {
    const ifds = TIFF.encodeImage(buffer.data, buffer.width, buffer.height);

    return {
        width: buffer.width,
        height: buffer.height,
        data: Buffer.from(ifds),
    };
};

encode.unknown = function write() {
    return {
        data: Buffer.from([]),
        height: 0,
        width: 0,
    };
};
