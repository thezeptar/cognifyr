import decode from './bmp/decode';
import encode from './bmp/encode';

function scan(image, startX, startY, width, height, pixelFunction) {
    startX = Math.round(startX);
    startY = Math.round(startY);
    width = Math.round(width);
    height = Math.round(height);

    for (let y = startY; y < startY + height; y++) {
        for (let x = startX; x < startX + width; x++) {
            const pixelIndex = image.bitmap.width * y + x << 2;
            pixelFunction.call(image, x, y, pixelIndex);
        }
    }

    return image;
}

function toAGBR(image) {
    return scan(image, 0, 0, image.bitmap.width, image.bitmap.height, function (_, __, index) {
        const red = this.bitmap.data[index + 0];
        const green = this.bitmap.data[index + 1];
        const blue = this.bitmap.data[index + 2];
        const alpha = this.bitmap.data[index + 3];

        this.bitmap.data[index + 0] = alpha;
        this.bitmap.data[index + 1] = blue;
        this.bitmap.data[index + 2] = green;
        this.bitmap.data[index + 3] = red;
    }).bitmap;
}

function fromAGBR(bitmap) {
    return scan({ bitmap }, 0, 0, bitmap.width, bitmap.height, function (_, __, index) {
        const alpha = bitmap.data[index + 0];
        const blue = bitmap.data[index + 1];
        const green = bitmap.data[index + 2];
        const red = bitmap.data[index + 3];

        bitmap.data[index + 0] = red;
        bitmap.data[index + 1] = green;
        bitmap.data[index + 2] = blue;
        bitmap.data[index + 3] = bitmap.isWithAlpha ? alpha : 0xff;
    }).bitmap;
}

export function decodeBMP(data) {
    return fromAGBR(decode(data));
}

export function encodeBMP(image) {
    return encode(toAGBR(image));
}
