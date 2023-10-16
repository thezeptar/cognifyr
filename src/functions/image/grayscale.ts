import { Data } from '../../utils/data';

export default function grayscale(image: Data) {
    const { data } = image;
    const pixels = Buffer.alloc(data.length);

    for (let i = 0; i < data.length; i = i + 4) {
        const gray = Math.floor(0.2989 * data[i] + 0.5870 * data[i + 1] + 0.1140 * data[i + 2]);

        pixels.fill(gray, i, i + 3);
        pixels[i + 3] = data[i + 3];
    }

    return pixels;
}
