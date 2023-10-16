import { Data } from '../../utils/data';

export default function blur(image: Data, depth: number) {
    const { width, height, data } = image;
    const pixels = Buffer.alloc(data.length);

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let [r, g, b, count] = [0, 0, 0, 0];

            for (let dx = -depth; dx <= depth; dx++) {
                for (let dy = -depth; dy <= depth; dy++) {
                    const nx = x + dx;
                    const ny = y + dy;

                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        const offset = (ny * width + nx) * 4;
                        r = r + data[offset];
                        g = g + data[offset + 1];
                        b = b + data[offset + 2];
                        count++;
                    }
                }
            }

            const offset = (y * width + x) * 4;

            pixels[offset] = Math.round(r / count);
            pixels[offset + 1] = Math.round(g / count);
            pixels[offset + 2] = Math.round(b / count);
            pixels[offset + 3] = pixels[offset + 3];
        }
    }

    return pixels;
}
