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

const MAX_ARRAY_SIZE = 100;

Helpers.execute(
    'Testing numbers...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            // fill test array
            let arr: any[] = [];
            for (let j = 0; j <= i; j++) {
                arr.push(j);
            }

            // WITHOUT equality comparer
            for (let j = 0; j < arr.length; j++) {
                let doesContain = Enumerable.from(arr)
                                            .contains(j);

                Assert.strictEqual(doesContain, true);
                Assert.notStrictEqual(doesContain, 1);
                
                Assert.equal(doesContain, true);
                Assert.equal(doesContain, 1);
            }

            // with equality comparer
            for (let j = 0; j < arr.length; j++) {
                let doesContain1a = Enumerable.from(arr)
                                            .contains(j, true);
                let doesContain1b = Enumerable.from(arr)
                                            .contains('' + j, true);

                let doesContain2a = Enumerable.from(arr)
                                            .contains(j, 'x, y => x === y');
                let doesContain2b = Enumerable.from(arr)
                                            .contains('' + j, 'x, y => x === y');

                let doesContain3a = Enumerable.from(arr)
                                            .contains(j, (x, y) => x === y);
                let doesContain3b = Enumerable.from(arr)
                                            .contains('' + j, (x, y) => x === y);
                
                Assert.strictEqual(doesContain1a, true);
                Assert.notStrictEqual(doesContain1a, 1);
                Assert.equal(doesContain1a, 1);

                Assert.strictEqual(doesContain1b, false);
                Assert.notStrictEqual(doesContain1b, 0);
                Assert.notStrictEqual(doesContain1b, null);
                Assert.equal(doesContain1b, 0);

                Assert.strictEqual(doesContain2a, true);
                Assert.notStrictEqual(doesContain2a, 1);
                Assert.equal(doesContain2a, 1);

                Assert.strictEqual(doesContain2b, false);
                Assert.notStrictEqual(doesContain2b, 0);
                Assert.notStrictEqual(doesContain2b, null);
                Assert.equal(doesContain2b, 0);

                Assert.strictEqual(doesContain3a, true);
                Assert.notStrictEqual(doesContain3a, 1);
                Assert.equal(doesContain3a, 1);

                Assert.strictEqual(doesContain3b, false);
                Assert.notStrictEqual(doesContain3b, 0);
                Assert.notStrictEqual(doesContain3b, null);
                Assert.equal(doesContain3b, 0);
            }
        }
    });
