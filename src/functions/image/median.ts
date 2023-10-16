import { Data } from '../../utils/data';

function quickselect(arr: number[], k: number) {
    if (arr.length === 1) return arr[0];

    const pivot = arr[Math.floor(Math.random() * arr.length)];
    const smaller = arr.filter((val) => val < pivot);
    const equal = arr.filter((val) => val === pivot);
    const larger = arr.filter((val) => val > pivot);

    if (k < smaller.length) return quickselect(smaller, k);
    else if (k < smaller.length + equal.length) return equal[0];

    return quickselect(larger, k - smaller.length - equal.length);
}

export default function median(image: Data, depth: number) {
    const { width, height, data } = image;
    const pixels = new Uint8Array(data.length);

    const windowArea = (2 * depth + 1) ** 2;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const r = [];
            const g = [];
            const b = [];

            for (let offsetY = -depth; offsetY <= depth; offsetY++) {
                for (let offsetX = -depth; offsetX <= depth; offsetX++) {
                    const neighborX = Math.min(Math.max(x + offsetX, 0), width - 1);
                    const neighborY = Math.min(Math.max(y + offsetY, 0), height - 1);
                    const index = (neighborY * width + neighborX) * 4;

                    r.push(data[index]);
                    g.push(data[index + 1]);
                    b.push(data[index + 2]);
                }
            }

            const medianR = quickselect(r, Math.floor(windowArea / 2));
            const medianG = quickselect(g, Math.floor(windowArea / 2));
            const medianB = quickselect(b, Math.floor(windowArea / 2));

            const index = (y * width + x) * 4;
            pixels[index] = medianR;
            pixels[index + 1] = medianG;
            pixels[index + 2] = medianB;
            pixels[index + 3] = data[index + 3];
        }
    }

    return pixels;
}
