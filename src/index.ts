/**
 * SPDX-License-Identifier: Apache-2.0
 *
 * @copyright (c) 2023 Cognifyr
 * @author Zeptar <thezeptar@gmail.com>
 * @license Apache License 2.0
 */

import CognifyError from './utils/error';

if (parseInt(process.versions.node, 10) < 14) throw new CognifyError('NodeVersion', 'Node.js 14.0.0 or higher is required');

export * from './classes/image';
export * from './classes/bot';
export * from './functions/tools/error';
export * from './functions/tools/hash';
export { version } from '../package.json';
