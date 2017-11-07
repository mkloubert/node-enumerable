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

function *makeGenerator() {
    yield 111;
    yield 222;
    yield 333;
}


Helpers.execute(
    'Testing (true)...',
    (ctx) => {
        const ARR: Enumerable.IEnumerable<any>[] = [ undefined, null, Enumerable.empty()
                                                                    , Enumerable.create()
                                                                    , Enumerable.from([]) ];

        for (let i = 0; i < ARR.length; i++) {
            const ITEM = ARR[i];

            const ACTUAL = Enumerable.isUndefinedNullOrEmpty(ITEM);
            const EXPECTED = true;

            Assert.equal(ACTUAL, EXPECTED);
            Assert.strictEqual(ACTUAL, EXPECTED);
            Assert.equal('' + ACTUAL, '' + EXPECTED);
            Assert.strictEqual('' + ACTUAL, '' + EXPECTED);
        }
    });

Helpers.execute(
    'Testing (false)...',
    (ctx) => {
        const ARR: Enumerable.IEnumerable<any>[] = [ Enumerable.create(1),
                                                     Enumerable.from([2, 3]),
                                                     Enumerable.from( makeGenerator() ) ];

        for (let i = 0; i < ARR.length; i++) {
            const ITEM = ARR[i];

            const ACTUAL = Enumerable.isUndefinedNullOrEmpty(ITEM);
            const EXPECTED = false;

            Assert.equal(ACTUAL, EXPECTED);
            Assert.strictEqual(ACTUAL, EXPECTED);
            Assert.equal('' + ACTUAL, '' + EXPECTED);
            Assert.strictEqual('' + ACTUAL, '' + EXPECTED);
        }
    });
