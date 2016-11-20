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

            let expected1 = arr.filter(x => x % 2 === 0);
            let expected2 = arr.filter(x => x % 2 !== 0);

            let actual1: any[] = [];
            let seq1 = Enumerable.from(arr).where(x => x % 2 === 0);
            while (seq1.moveNext()) {
                actual1.push(seq1.current);
            }

            let actual2: any[] = [];
            let seq2 = Enumerable.from(arr).where(x => x % 2 !== 0);
            while (seq2.moveNext()) {
                actual2.push(seq2.current);
            }

            Assert.strictEqual(actual2.length, expected2.length);
            Assert.equal(actual2.length, expected2.length);
            Assert.equal('' + actual2.length, expected2.length);
            Assert.equal(actual2.length, '' + expected2.length);
            Assert.strictEqual('' + actual2.length, '' + expected2.length);
            Assert.equal('' + actual2.length, '' + expected2.length);

            let tests = [
                {
                    actual: actual1,
                    expected: expected1,
                },
                {
                    actual: actual2,
                    expected: expected2,
                },
            ];

            for (let j = 0; j < tests.length; j++) {
                let t = tests[j];

                Assert.strictEqual(t.actual.length, t.expected.length);
                Assert.equal(t.actual.length, t.expected.length);
                Assert.equal('' + t.actual.length, t.expected.length);
                Assert.equal(t.actual.length, '' + t.expected.length);
                Assert.strictEqual('' + t.actual.length, '' + t.expected.length);
                Assert.equal('' + t.actual.length, '' + t.expected.length);

                for (let k = 0; k < t.actual.length; k++) {
                    let a = t.actual[k];
                    let e = t.expected[k];

                    Assert.strictEqual(a, e);
                    Assert.equal(a, e);
                    Assert.equal('' + a, e);
                    Assert.equal(a, '' + e);
                    Assert.strictEqual('' + a, '' + e);
                    Assert.equal(a, '' + e);
                }
            }
        }
    });
