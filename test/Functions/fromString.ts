// The MIT License (MIT)
// 
// node-enumerable (https://github.com/mkloubert/node-enumerable)
// Copyright (c) Marcel Joachim Kloubert <marcel.kloubert@gmx.net>
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

import Assert = require('assert');
import Enumerable = require('../../');
import Helpers = require('../helpers');

const MAX_ARRAY_SIZE = 100;


Helpers.execute(
    'Testing numbers...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy0123456789';

            for (let j = 0; j < chars.length; j++) {
                let c = chars[j];

                let str = '';
                for (let k = 0; k < i; k++) {
                    str += c;
                }

                let seq = Enumerable.fromString(str);

                let str2 = '';
                for (let item of seq) {
                    str2 += item;
                }

                Assert.equal(str.length, str2.length);
                Assert.strictEqual(str.length, str2.length);
                Assert.equal('' + str.length, str2.length);
                Assert.equal(str.length, '' + str2.length);
                Assert.equal('' + str.length, '' + str2.length);
                Assert.strictEqual('' + str.length, '' + str2.length);

                Assert.equal(str, str2);
                Assert.strictEqual(str, str2);
                Assert.equal('' + str, str2);
                Assert.equal(str, '' + str2);
                Assert.equal('' + str, '' + str2);
                Assert.strictEqual('' + str, '' + str2);
            }
        }
    });
