import { validateDigit } from '../utils/validate';

import CognifyError from '../utils/error';
import decode from '../utils/image/decode';
import encode from '../utils/image/encode';
import format from '../utils/format';

import blur from '../functions/image/blur';
import grayscale from '../functions/image/grayscale';
import invert from '../functions/image/invert';
import median from '../functions/image/median';
import pixelate from '../functions/image/pixelate';

export class CognifyImage {
    public file: Buffer;

    public image: {
        width: number;
        height: number;
        data: Buffer | Uint8Array;
    };

    public constructor(file: Buffer) {
        if (format(file) === 'unknown') throw new CognifyError('ImageFormat', 'Unknown image file format');

        const { width, height, data } = decode(file);

        this.file = file;
        this.image = { width, height, data };
    }

    public blur(depth = 10) {
        validateDigit(depth, 1, 100);

        const pixels = blur(this.image, depth);
        this.image.data = pixels;

        return this;
    }

    public grayscale() {
        const pixels = grayscale(this.image);
        this.image.data = pixels;

        return this;
    }

    public invert() {
        const pixels = invert(this.image);
        this.image.data = pixels;

        return this;
    }

    public median(depth = 50) {
        validateDigit(depth, 1, 100);

        const pixels = median(this.image, depth);
        this.image.data = pixels;

        return this;
    }

    public pixelate(depth = 50) {
        validateDigit(depth, 1, 100);

        const pixels = pixelate(this.image, depth);
        this.image.data = pixels;

        return this;
    }

    public save() {
        return encode(this.image, this.file);
    }
}
