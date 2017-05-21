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

const DEFAULT_VALUE = 'XUSANILUAP';
const MAX_ARRAY_SIZE = 100;

Helpers.execute(
    'Testing numbers (iterator)...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            // fill test array
            let arr: any[] = [];
            for (let j = 0; j < i; j++) {
                arr.push(j + 1);
            }

            let iterator = Helpers.toIterator(arr);

            let seq1 = Enumerable.from(iterator);

            Assert.equal(seq1.canReset, false);
            Assert.strictEqual(seq1.canReset, false);
            Assert.notEqual(seq1.canReset, true);
            Assert.notStrictEqual(seq1.canReset, true);

            let seq2 = seq1.makeResettable();

            Assert.equal(seq1 === seq2, false);
            Assert.strictEqual(seq1 === seq2, false);
            Assert.notEqual(seq1 === seq2, true);
            Assert.notStrictEqual(seq1 === seq2, true);

            Assert.notEqual(seq1 !== seq2, false);
            Assert.notStrictEqual(seq1 !== seq2, false);
            Assert.equal(seq1 !== seq2, true);
            Assert.strictEqual(seq1 !== seq2, true);

            Assert.equal(seq2.canReset, true);
            Assert.strictEqual(seq2.canReset, true);
            Assert.notEqual(seq2.canReset, false);
            Assert.notStrictEqual(seq2.canReset, false);
        }
    });

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
                arr.push(j + 1);
            }

            let iterator = Helpers.toIterator(arr);

            let seq1 = Enumerable.from(arr);

            Assert.equal(seq1.canReset, true);
            Assert.strictEqual(seq1.canReset, true);
            Assert.notEqual(seq1.canReset, false);
            Assert.notStrictEqual(seq1.canReset, false);

            let seq2 = seq1.makeResettable();

            Assert.equal(seq1 === seq2, true);
            Assert.strictEqual(seq1 === seq2, true);
            Assert.notEqual(seq1 === seq2, false);
            Assert.notStrictEqual(seq1 === seq2, false);

            Assert.notEqual(seq1 !== seq2, true);
            Assert.notStrictEqual(seq1 !== seq2, true);
            Assert.equal(seq1 !== seq2, false);
            Assert.strictEqual(seq1 !== seq2, false);

            Assert.equal(seq2.canReset, true);
            Assert.strictEqual(seq2.canReset, true);
            Assert.notEqual(seq2.canReset, false);
            Assert.notStrictEqual(seq2.canReset, false);
        }
    });
