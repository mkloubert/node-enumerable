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

Helpers.execute(
    'Testing with predicate...',
    (ctx) => {
        let arr = [0, parseInt('1'), undefined, parseFloat('2.0'), null, '', parseInt('3.0')];
        let expected = [ undefined, null, '' ];

        let e = Enumerable.from(arr)
                          .not(x => 'number' === typeof x);

        let actual: any[] = [];
        for (let item of e) {
            actual.push( item );
        }

        Assert.equal(expected.length, actual.length);
        Assert.strictEqual(expected.length, actual.length);
        Assert.equal('' + expected.length, actual.length);
        Assert.equal(expected.length, '' + actual.length);
        Assert.equal('' + expected.length, '' + actual.length);
        Assert.strictEqual('' + expected.length, '' + actual.length);

        for (let i = 0; i < expected.length; i++) {
            const A = actual[i];
            const E = expected[i];

            Assert.equal(A, E);
            Assert.strictEqual(A, E);
        }
    });

Helpers.execute(
    'Testing without predicate...',
    (ctx) => {
        let arr = [0, parseInt('1'), undefined, parseFloat('2.0'), null, '', parseInt('3.0')];
        let expected = [ 0, undefined, null, '' ];

        let e = Enumerable.from(arr)
                          .not();

        let actual: any[] = [];
        for (let item of e) {
            actual.push( item );
        }

        Assert.equal(expected.length, actual.length);
        Assert.strictEqual(expected.length, actual.length);
        Assert.equal('' + expected.length, actual.length);
        Assert.equal(expected.length, '' + actual.length);
        Assert.equal('' + expected.length, '' + actual.length);
        Assert.strictEqual('' + expected.length, '' + actual.length);

        for (let i = 0; i < expected.length; i++) {
            const A = actual[i];
            const E = expected[i];

            Assert.equal(A, E);
            Assert.strictEqual(A, E);
        }
    });
