import { Data } from '../../utils/data';

export default function pixelate(image: Data, depth: number) {
    const { width, height, data } = image;

    for (let y = 0; y < height; y = y + depth) {
        for (let x = 0; x < width; x = x + depth) {
            let r = 0, g = 0, b = 0, count = 0;

            for (let j = 0; j < depth && y + j < height; j++) {
                for (let i = 0; i < depth && x + i < width; i++) {
                    const index = (y + j) * width * 4 + (x + i) * 4;
                    r = r + data[index];
                    g = g + data[index + 1];
                    b = b + data[index + 2];
                    count++;
                }
            }

            const avgR = Math.floor(r / count);
            const avgG = Math.floor(g / count);
            const avgB = Math.floor(b / count);

            for (let j = 0; j < depth && y + j < height; j++) {
                for (let i = 0; i < depth && x + i < width; i++) {
                    const index = (y + j) * width * 4 + (x + i) * 4;
                    data[index] = avgR;
                    data[index + 1] = avgG;
                    data[index + 2] = avgB;
                }
            }
        }
    }

    return data;
}
