/// <reference types="node" />

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
        let arr1: any[] = [1, 2, 3, '4', 5];
        let arr2: any[] = [4.0, 1, 4];

        let expected: any[] = [1, '4'];

        let seq = Enumerable.from(arr1).intersect(arr2);

        let cnt = 0;
        while (seq.moveNext()) {
            ++cnt;

            let x = seq.current;
            let index = seq.key;

            Assert.strictEqual(x, expected[index]);
            Assert.equal(x, expected[index]);
            Assert.equal('' + x, expected[index]);
            Assert.equal(x, '' + expected[index]);
            Assert.strictEqual('' + x, '' + expected[index]);
        }

        Assert.strictEqual(cnt, expected.length);
        Assert.notStrictEqual('' + cnt, expected.length);
        Assert.notStrictEqual(cnt, '' + expected.length);
        Assert.strictEqual('' + cnt, '' + expected.length);
        Assert.equal(cnt, expected.length);
    });

Helpers.execute(
    'Testing numbers (with equality comparer)...',
    (ctx) => {
        let arr1: any[] = [1, 2, 3, '4', 5];
        let arr2: any[] = [4.0, 1, 4];

        let expected: any[] = [ 1 ];

        let equalityComparers = [ 'x,y => x === y', (x: number, y: number) => x === y, true ];
        equalityComparers.forEach((ec: any) => {
            let seq = Enumerable.from(arr1).intersect(arr2, ec);

            let cnt = 0;
            while (seq.moveNext()) {
                ++cnt;

                let x = seq.current;
                let index = seq.key;

                Assert.strictEqual(x, expected[index]);
                Assert.equal(x, expected[index]);
                Assert.equal('' + x, expected[index]);
                Assert.equal(x, '' + expected[index]);
                Assert.strictEqual('' + x, '' + expected[index]);
            }

            Assert.strictEqual(cnt, expected.length);
            Assert.notStrictEqual('' + cnt, expected.length);
            Assert.notStrictEqual(cnt, '' + expected.length);
            Assert.strictEqual('' + cnt, '' + expected.length);
            Assert.equal(cnt, expected.length);
        });
    });
