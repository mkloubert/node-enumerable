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
            for (let j = 0; j < i; j++) {
                arr.push(j);
            }

            let arrOdd = arr.filter(x => x % 2 !== 0);
            let arrEven = arr.filter(x => x % 2 === 0);

            let eOdd = Enumerable.from(arr).except(arrEven)
                                           .getEnumerator();
            let eEven = Enumerable.from(arr).except(arrOdd)
                                            .getEnumerator();

            let cntEven = 0;
            while (eEven.moveNext()) {
                let item = eEven.current;
                let index = eEven.key;
                ++cntEven;

                Assert.strictEqual(item, arrEven[index]);
                Assert.notStrictEqual(item, '' + arrEven[index]);
                Assert.notStrictEqual('' + item, arrEven[index]);
                Assert.strictEqual('' + item, '' + arrEven[index]);
                Assert.equal(item, arrEven[index]);
            }

            Assert.strictEqual(cntEven, arrEven.length);
            Assert.notStrictEqual(cntEven, '' + arrEven.length);
            Assert.notStrictEqual('' + cntEven, arrEven.length);
            Assert.strictEqual('' + cntEven, '' + arrEven.length);
            Assert.equal(cntEven, arrEven.length);

            let cntOdd = 0;
            while (eOdd.moveNext()) {
                let item = eOdd.current;
                let index = eOdd.key;
                ++cntOdd;

                Assert.strictEqual(item, arrOdd[index]);
                Assert.notStrictEqual(item, '' + arrOdd[index]);
                Assert.notStrictEqual('' + item, arrOdd[index]);
                Assert.strictEqual('' + item, '' + arrOdd[index]);
                Assert.equal(item, arrOdd[index]);
            }

            Assert.strictEqual(cntOdd, arrOdd.length);
            Assert.notStrictEqual(cntOdd, '' + arrOdd.length);
            Assert.notStrictEqual('' + cntOdd, arrOdd.length);
            Assert.strictEqual('' + cntOdd, '' + arrOdd.length);
            Assert.equal(cntOdd, arrOdd.length);
        }
    });
