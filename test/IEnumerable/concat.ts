/// <reference path="../../node.d.ts" />

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
import Enumerable = require('../../lib');
import Helpers = require('../helpers');

const MAX_ARRAY_SIZE_1 = 100;
const MAX_ARRAY_SIZE_2 = 100;

Helpers.execute(
    'Testing numbers...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE_1; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            let arr1: any[] = [];
            for (let j = 0; j < i; j++) {
                arr1.push(j);
            }

            for (let j = 0; j < MAX_ARRAY_SIZE_2; j++) {
                let arr2: any[] = [];
                for (let k = 0; k < j; k++) {
                    arr2.push(k);
                }

                let fullArray: any[] = [];
                for (let k = 0; k < arr1.length; k++) {
                    fullArray.push(arr1[k]);
                }
                for (let k = 0; k < arr2.length; k++) {
                    fullArray.push(arr2[k]);
                }

                let seq = Enumerable.from(arr1)
                                    .concat(arr2);

                let k = -1;
                while (seq.moveNext()) {
                    ++k;

                    Assert.strictEqual(seq.key, k);
                    Assert.notStrictEqual('' + seq.key, k);
                    Assert.notStrictEqual(seq.key, '' + k);
                    Assert.equal('' + seq.key, k);
                    Assert.equal(seq.key, '' + k);
                    Assert.strictEqual('' + seq.key, '' + k);
                    Assert.equal('' + seq.key, '' + k);

                    Assert.strictEqual(seq.current, fullArray[k]);
                    Assert.notStrictEqual('' + seq.current, fullArray[k]);
                    Assert.notStrictEqual(seq.current, '' + fullArray[k]);
                    Assert.equal('' + seq.current, fullArray[k]);
                    Assert.equal(seq.current, '' + fullArray[k]);
                    Assert.strictEqual('' + seq.current, '' + fullArray[k]);
                    Assert.equal('' + seq.current, '' + fullArray[k]);
                }

                let size = k + 1;

                Assert.strictEqual(fullArray.length, size);
                Assert.notStrictEqual('' + fullArray.length, size);
                Assert.notStrictEqual(fullArray.length, '' + size);
                Assert.equal('' + fullArray.length, size);
                Assert.equal(fullArray.length, '' + size);
                Assert.strictEqual('' + fullArray.length, '' + size);
                Assert.equal('' + fullArray.length, '' + size);
            }
        }
    });
