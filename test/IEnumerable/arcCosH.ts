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
    'Testing numbers (floats)...',
    (ctx) => {
        for (let i = 0; i <= MAX_ARRAY_SIZE; i++) {
            const ARR: number[] = [];
            const EXPECTED: number[] = [];
            for (let j = 1; j <= i; j++) {
                ARR.push( j );
                EXPECTED.push( Math.acosh(j) );
            }

            const SEQ = Enumerable.from(ARR)
                                  .arcCosH();

            const ACTUAL: number[] = [];
            for (let item of SEQ) {
                ACTUAL.push(item);
            }

            Assert.equal( ACTUAL.length, EXPECTED.length );
            Assert.strictEqual( ACTUAL.length, EXPECTED.length );
            Assert.equal( '' + ACTUAL.length, EXPECTED.length );
            Assert.equal( ACTUAL.length, '' + EXPECTED.length );
            Assert.equal( '' + ACTUAL.length, '' + EXPECTED.length );
            Assert.strictEqual( '' + ACTUAL.length, '' + EXPECTED.length );

            for (let k = 0; k < EXPECTED.length; k++) {
                const A = ACTUAL[k];
                const E = EXPECTED[k];

                Assert.equal( A, E );
                Assert.strictEqual( A, E );
                Assert.equal( '' + A, E );
                Assert.equal( A, '' + E );
                Assert.equal( '' + A, '' + E );
                Assert.strictEqual( '' + A, '' + E );
            }
        }
    });

Helpers.execute(
    'Testing strings (floats)...',
    (ctx) => {
        for (let i = 0; i <= MAX_ARRAY_SIZE; i++) {
            const ARR: string[] = [];
            const EXPECTED: number[] = [];
            for (let j = 1; j <= i; j++) {
                ARR.push( '' + j );
                EXPECTED.push( Math.acosh(j) );
            }

            const SEQ = Enumerable.from(ARR)
                                  .arcCosH();

            const ACTUAL: number[] = [];
            for (let item of SEQ) {
                ACTUAL.push(item);
            }

            Assert.equal( ACTUAL.length, EXPECTED.length );
            Assert.strictEqual( ACTUAL.length, EXPECTED.length );
            Assert.equal( '' + ACTUAL.length, EXPECTED.length );
            Assert.equal( ACTUAL.length, '' + EXPECTED.length );
            Assert.equal( '' + ACTUAL.length, '' + EXPECTED.length );
            Assert.strictEqual( '' + ACTUAL.length, '' + EXPECTED.length );

            for (let k = 0; k < EXPECTED.length; k++) {
                const A = ACTUAL[k];
                const E = EXPECTED[k];

                Assert.equal( A, E );
                Assert.strictEqual( A, E );
                Assert.equal( '' + A, E );
                Assert.equal( A, '' + E );
                Assert.equal( '' + A, '' + E );
                Assert.strictEqual( '' + A, '' + E );
            }
        }
    });
