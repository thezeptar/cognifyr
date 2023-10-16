import { Data } from '../../utils/data';

export default function invert(image: Data) {
    const { data } = image;
    const pixels = Buffer.alloc(data.length);

    for (let i = 0; i < data.length; i++) {
        pixels[i] = 255 - data[i];
    }

    return pixels;
}
