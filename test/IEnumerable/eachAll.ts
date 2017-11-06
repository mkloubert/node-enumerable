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
    'Testing numbers (Error objects)...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            const ARR: number[] = [];
            for (let j = 0; j < i; j++) {
                ARR.push(j);
            }

            const EXPECTED_ERROR_COUNT = Math.floor( ARR.length / 2 );
            const EXPECTED_SUCCESS_COUNT = ARR.length - EXPECTED_ERROR_COUNT;
            const EXPECTED_HAS_THROWN = EXPECTED_ERROR_COUNT > 0;

            let errorCount = 0;
            const SUCCEEDED: number[] = [];
            let hasThrown = false;
            try {
                Enumerable.from(ARR).eachAll((item, index) => {
                    if (item % 2 === 1) {
                        throw new Error('ERROR: ' + item);
                    }

                    SUCCEEDED.push(item);
                });
            }
            catch (e) {
                hasThrown = true;

                errorCount = e.errors.length;
            }

            Assert.equal(hasThrown, EXPECTED_HAS_THROWN);
            Assert.strictEqual(hasThrown, EXPECTED_HAS_THROWN);
            Assert.equal('' + hasThrown, '' + EXPECTED_HAS_THROWN);
            Assert.strictEqual('' + hasThrown, '' + EXPECTED_HAS_THROWN);

            Assert.equal(SUCCEEDED.length, EXPECTED_SUCCESS_COUNT);
            Assert.strictEqual(SUCCEEDED.length, EXPECTED_SUCCESS_COUNT);
            Assert.equal('' + SUCCEEDED.length, EXPECTED_SUCCESS_COUNT);
            Assert.equal(SUCCEEDED.length, '' + EXPECTED_SUCCESS_COUNT);
            Assert.equal('' + SUCCEEDED.length, '' + EXPECTED_SUCCESS_COUNT);
            Assert.strictEqual('' + SUCCEEDED.length, '' + EXPECTED_SUCCESS_COUNT);

            Assert.equal(errorCount, EXPECTED_ERROR_COUNT);
            Assert.strictEqual(errorCount, EXPECTED_ERROR_COUNT);
            Assert.equal('' + errorCount, EXPECTED_ERROR_COUNT);
            Assert.equal(errorCount, '' + EXPECTED_ERROR_COUNT);
            Assert.equal('' + errorCount, '' + EXPECTED_ERROR_COUNT);
            Assert.strictEqual('' + errorCount, '' + EXPECTED_ERROR_COUNT);

            for (let j = 0; j < SUCCEEDED.length; j++) {
                const A = SUCCEEDED[j];
                const E = j * 2;

                Assert.equal(A, E);
                Assert.strictEqual(A, E);
                Assert.equal('' + A, E);
                Assert.equal(A, '' + E);
                Assert.equal('' + A, '' + E);
                Assert.strictEqual('' + A, '' + E);
            }
        }
    });

Helpers.execute(
        'Testing numbers (string errors)...',
        (ctx) => {
            for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
                if (0 === i % 10) {
                    ctx.log(`Testing with ${i} elements...`);
                }
    
                const ARR: number[] = [];
                for (let j = 0; j < i; j++) {
                    ARR.push(j);
                }
    
                const EXPECTED_ERROR_COUNT = Math.floor( ARR.length / 2 );
                const EXPECTED_SUCCESS_COUNT = ARR.length - EXPECTED_ERROR_COUNT;
                const EXPECTED_HAS_THROWN = EXPECTED_ERROR_COUNT > 0;
    
                let errorCount = 0;
                const SUCCEEDED: number[] = [];
                let hasThrown = false;
                try {
                    Enumerable.from(ARR).eachAll((item, index) => {
                        if (item % 2 === 1) {
                            throw 'ERROR: ' + item;
                        }
    
                        SUCCEEDED.push(item);
                    });
                }
                catch (e) {
                    hasThrown = true;

                    errorCount = e.errors.length;
                }

                Assert.equal(hasThrown, EXPECTED_HAS_THROWN);
                Assert.strictEqual(hasThrown, EXPECTED_HAS_THROWN);
                Assert.equal('' + hasThrown, '' + EXPECTED_HAS_THROWN);
                Assert.strictEqual('' + hasThrown, '' + EXPECTED_HAS_THROWN);
    
                Assert.equal(SUCCEEDED.length, EXPECTED_SUCCESS_COUNT);
                Assert.strictEqual(SUCCEEDED.length, EXPECTED_SUCCESS_COUNT);
                Assert.equal('' + SUCCEEDED.length, EXPECTED_SUCCESS_COUNT);
                Assert.equal(SUCCEEDED.length, '' + EXPECTED_SUCCESS_COUNT);
                Assert.equal('' + SUCCEEDED.length, '' + EXPECTED_SUCCESS_COUNT);
                Assert.strictEqual('' + SUCCEEDED.length, '' + EXPECTED_SUCCESS_COUNT);
    
                Assert.equal(errorCount, EXPECTED_ERROR_COUNT);
                Assert.strictEqual(errorCount, EXPECTED_ERROR_COUNT);
                Assert.equal('' + errorCount, EXPECTED_ERROR_COUNT);
                Assert.equal(errorCount, '' + EXPECTED_ERROR_COUNT);
                Assert.equal('' + errorCount, '' + EXPECTED_ERROR_COUNT);
                Assert.strictEqual('' + errorCount, '' + EXPECTED_ERROR_COUNT);
    
                for (let j = 0; j < SUCCEEDED.length; j++) {
                    const A = SUCCEEDED[j];
                    const E = j * 2;
    
                    Assert.equal(A, E);
                    Assert.strictEqual(A, E);
                    Assert.equal('' + A, E);
                    Assert.equal(A, '' + E);
                    Assert.equal('' + A, '' + E);
                    Assert.strictEqual('' + A, '' + E);
                }
            }
        });
