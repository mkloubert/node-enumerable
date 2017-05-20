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

            // fill test array
            let arr: any[] = [];
            for (let j = 0; j < i; j++) {
                arr.push(j);
            }

            let e = Enumerable.from(arr)
                              .defaultSequenceIfEmpty([ 'MK', 'TM', 'JS', 'YS' ]);

            let testArr: any[] = [];
            while (!e.next().done) {
                testArr.push(e.current.value);
            }

            let expected: any[];
            if (arr.length > 0) {
                expected = arr;
            }
            else {
                expected = ['MK', 'TM', 'JS', 'YS'];
            }

            Assert.strictEqual(testArr.length, expected.length);
            Assert.equal(testArr.length, expected.length);
            Assert.equal('' + testArr.length, expected.length);
            Assert.equal(testArr.length, '' + expected.length);
            Assert.equal('' + testArr.length, '' + expected.length);
            Assert.strictEqual('' + testArr.length, '' + expected.length);

            for (let j = 0; j < testArr.length; j++) {
                Assert.strictEqual(testArr[j], expected[j]);
                Assert.equal(testArr[j], expected[j]);
                Assert.equal('' + testArr[j], expected[j]);
                Assert.equal(testArr[j], '' + expected[j]);
                Assert.equal('' + testArr[j], '' + expected[j]);
                Assert.strictEqual('' + testArr[j], '' + expected[j]);
            }
        }
    });
