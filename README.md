<div align="center">
    <img width="620"src="https://svgshare.com/i/xY5.svg" alt="Cognifyr">

[![NPM Version](https://img.shields.io/npm/v/cognifyr)](https://www.npmjs.com/package/cognifyr)
[![NPM Downloads](https://img.shields.io/npm/dt/cognifyr)](https://www.npmjs.com/package/cognifyr)
[![Github Build](https://img.shields.io/badge/build-passing-4c1)](https://github.com/Cognifyr/cognifyr/actions/build.yml)
[![GitHub License](https://img.shields.io/github/license/Cognifyr/cognifyr)](https://github.com/cognifyr/Cognifyr/blob/main/LICENSE)
[![Socket](https://socket.dev/api/badge/npm/package/cognifyr)](https://socket.dev/npm/package/cognifyr)

[![Powered by Github](https://img.shields.io/badge/Powered%20by-GitHub-2e2e2e.svg?style=for-the-badge&logo=github)](https://github.com/Cognifyr/cognifyr)
&nbsp;
[![Powered by Cognifyr API](https://img.shields.io/badge/Powered%20by-Cognifyr%20API-32a852.svg?style=for-the-badge&logo=coil)](https://cognifyr-api.vercel.app/api)
</div>

# Overview

Cognifyr is a Node.js package that has features to perform image-based operations (blur, invert etc) and starting a conversation with AI.

Get started with Cognifyr by setting up the environment.

## Installation

You will need [Node.js](https://nodejs.org/en) `14.0.0` or newer to get started. Let's begin the installation process using your preferred package manager.

![Install](https://nodei.co/npm/cognifyr.png?mini=true)

## Importing

You can `import` or `require` Cognifyr by the name of your choice, or object destructure a specific module.

```js
// CommonJS
const cognifyr = require('cognifyr');

// ES Modules
import cognifyr from 'cognifyr';
```

## Modules

Cognifyr provides the following modules:

| Module     | Type      | Description                                     |
|------------|-----------|-------------------------------------------------|
| `CognifyImage` | class     | Create a new `CognifyImage` instance.               |
| `CognifyBot`     | class | Create a new `CognifyBot` instance. |

## CognifyImage

Cognifyr currently supports these image formats:
* png
* jpeg
* bmp
* tiff

You can perform a variety of image-based operations using Cognifyr.

```js
const cognifyr = new CognifyImage();

// Read the input file using fs
const buffer = fs.readFileSync('input.jpg');

const finalImage = new CognifyImage(buffer)
    .grayscale()
    .save();

// Write the file using fs with the encoded contents
fs.writeFileSync('output.jpg', finalImage.data);
```

In the above example, the `buffer` variable will be defined as the image file's data. It creates a new instance of `CognifyImage` with the file buffer, then grayscales the image, then save it by encoding the image. Then it writes the file using the `writeFileSync` function provided by `fs` with the grayscaled image's data.

Here are image operations you can perform with Cognifyr:

- Blur
- Grayscale
- Invert
- Median
- Pixelate

### Blur

Blurring an iamge distorts the detail of an image which makes it less clear. You can optionally specify how deep you want it to blur. The parameter ranges from 1 to 100, and defaults to 10.

Please keep in mind that the setting the depth over 10 will result in very slow operation speed.

```js
new CognifyImage(buffer)
    .blur(10) // 10 is the depth
    .save();
```

### Grayscale

To grayscale an image, you can call the function without any parameters needed.

```js
new CognifyImage(buffer)
    .grayscale()
    .save();
```

### Invert

Similarly, to invert the colors of an image, you can call the function.

```js
new CognifyImage(buffer)
    .invert()
    .save();
```

### Median

The median filter works by moving through the image pixel by pixel, replacing each value with the median value of neighbouring pixels. The pattern of neighbours is called the "window", which slides, pixel by pixel, over the entire image. The optional window size parameter (which defaults to 50) controls how big you want the window size to be:

```js
new CognifyImage(buffer)
    .median(50) // 50 is the window size
    .save();
```

### Pixelate

To pixelate an image, you can provide the pixel size parameter to specify how much you want to pixelate. Ranges from 1 to 100, and defaults to 10. Pixelating an image will result in a blocky version of the image.

```js
new CognifyImage(buffer)
    .pixelate(10) // 10 is the pixel size
    .save();
```

You can perform multiple image operations at once by calling the functions together.

```js
new CognifyImage(buffer)
    .grayscale()
    .invert()
    .save();
```

---

### Bot

We can create a Cognifyr `bot` like this:

```js
const bot = new CognifyBot();
```

We can set the `botID` object to add an extra layer to avoid conflict. By default, Cognifyr will automatically generate a unique ID for you.

```js
const bot = new CognifyBot('bot_ID');
```

*Right now, you can only chat with the `bot` function. More features will be added soon.*

Let's start a conversation with the bot, then log it into the console.

```js
(async () => {
    const message = await bot.chat('Hello!');

    console.log(message.result);
})();
```

# Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## Code of Conduct

We adhere to the [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a respectful and inclusive community. Please review it and follow the guidelines when participating in this project.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
