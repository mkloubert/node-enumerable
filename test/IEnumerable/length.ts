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

interface ExpectedAndActual {
    actual: number;
    expected: number;
}

Helpers.execute(
    'Testing numbers (array)...',
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

            let cnt1 = Enumerable.from(arr)
                                 .length();

            Assert.strictEqual(cnt1, arr.length);
            Assert.notStrictEqual('' + cnt1, arr.length);
            Assert.notStrictEqual(cnt1, '' + arr.length);
            Assert.strictEqual('' + cnt1, '' + arr.length);
        }
    });

Helpers.execute(
    'Testing numbers for same sequence (array)...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            // fill test array
            const ARR: any[] = [];
            for (let j = 0; j < i; j++) {
                ARR.push(j);
            }

            const SEQ = Enumerable.from( ARR );

            const VALUES_TO_CHECK: ExpectedAndActual[] = [];

            VALUES_TO_CHECK.push({
                expected: ARR.length,
                actual: SEQ.length(),
            });

            VALUES_TO_CHECK.push({
                expected: ARR.length,
                actual: SEQ.length(),
            });

            SEQ.reset();
            VALUES_TO_CHECK.push({
                expected: ARR.length,
                actual: SEQ.length(),
            });

            for (let vtc of VALUES_TO_CHECK) {
                Assert.equal( vtc.actual, vtc.expected );
                Assert.strictEqual( vtc.actual, vtc.expected );
                Assert.equal( '' + vtc.actual, vtc.expected );
                Assert.equal( vtc.actual, '' + vtc.expected );
                Assert.equal( '' + vtc.actual, '' + vtc.expected );
                Assert.strictEqual( '' + vtc.actual, '' + vtc.expected );
            }
        }
    });

Helpers.execute(
    'Testing strings for same sequence...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            let str = '';
            for (let j = 0; j < i; j++) {
                str += 'TM+MK';
            }

            const SEQ = Enumerable.from( str );

            const VALUES_TO_CHECK: ExpectedAndActual[] = [];

            VALUES_TO_CHECK.push({
                expected: str.length,
                actual: SEQ.length(),
            });

            VALUES_TO_CHECK.push({
                expected: str.length,
                actual: SEQ.length(),
            });

            SEQ.reset();
            VALUES_TO_CHECK.push({
                expected: str.length,
                actual: SEQ.length(),
            });

            for (let vtc of VALUES_TO_CHECK) {
                Assert.equal( vtc.actual, vtc.expected );
                Assert.strictEqual( vtc.actual, vtc.expected );
                Assert.equal( '' + vtc.actual, vtc.expected );
                Assert.equal( vtc.actual, '' + vtc.expected );
                Assert.equal( '' + vtc.actual, '' + vtc.expected );
                Assert.strictEqual( '' + vtc.actual, '' + vtc.expected );
            }
        }
    });
