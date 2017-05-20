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
    'Testing numbers...',
    (ctx) => {
        let arr: any[] = [ 1, 2, 1, 3, 5, 4, 5 ];
        let expected: any[] = [ 1, 2, 3, 5, 4 ];

        let e = Enumerable.from(arr).distinct();

        let cnt = 0;
        while (!e.next().done) {
            ++cnt;

            let item = e.current.value;
            let index = e.index;

            Assert.strictEqual(item, expected[index]);
            Assert.notStrictEqual('' + item, expected[index]);
            Assert.notStrictEqual(item, '' + expected[index]);
            Assert.equal(item, expected[index]);
            Assert.strictEqual('' + item, '' + expected[index]);
            Assert.equal('' + item, '' + expected[index]);
        }

        Assert.strictEqual(cnt, expected.length);
        Assert.notStrictEqual('' + cnt, expected.length);
        Assert.notStrictEqual(cnt, '' + expected.length);
        Assert.equal(cnt, expected.length);
        Assert.strictEqual('' + cnt, '' + expected.length);
        Assert.equal('' + cnt, '' + expected.length);
    });

Helpers.execute(
    'Testing numbers (with equality comparer)...',
    (ctx) => {
        let arr: any[] = [ '111', 111, 222, 333, 222, 444, 555 ];
        let expected: any[] = [ '111', 111, 222, 333, 444, 555 ];

        let equalityComparers = [ (x: number, y: number) => x === y, true ];
        equalityComparers.forEach((ec: any) => {
            let e = Enumerable.from(arr).distinct(ec);

            let cnt = 0;
            while (!e.next().done) {
                ++cnt;

                let item = e.current.value;
                let index = e.index;

                Assert.strictEqual(item, expected[index]);
                Assert.equal(item, expected[index]);
                Assert.strictEqual('' + item, '' + expected[index]);
                Assert.equal('' + item, '' + expected[index]);
            }

            Assert.strictEqual(cnt, expected.length);
            Assert.equal(cnt, expected.length);
            Assert.strictEqual('' + cnt, '' + expected.length);
            Assert.equal('' + cnt, '' + expected.length);
        });
    });
