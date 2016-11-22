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

function* createIterator(cnt: number): Iterator<any> {
    for (let i = 0; i < cnt; i++) {
        yield i;
    }
}

Helpers.execute(
    'Testing array...',
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

            let e = Enumerable.from(arr).getEnumerator();

            let cnt1 = 0;
            while (e.moveNext()) {
                ++cnt1;
            }

            let cnt2: number;
            Assert.doesNotThrow(() => {
                e.reset();

                cnt2 = 0;
                while (e.moveNext()) {
                    ++cnt2;
                }
            });

            Assert.strictEqual(cnt1, arr.length);
            Assert.notStrictEqual(cnt1, '' + arr.length);
            Assert.notStrictEqual('' + cnt1, arr.length);
            Assert.equal(cnt1, '' + arr.length);
            Assert.equal('' + cnt1, arr.length);
            Assert.strictEqual('' + cnt1, '' + arr.length);

            Assert.strictEqual(cnt2, arr.length);
            Assert.notStrictEqual(cnt2, '' + arr.length);
            Assert.notStrictEqual('' + cnt2, arr.length);
            Assert.equal(cnt2, '' + arr.length);
            Assert.equal('' + cnt2, arr.length);
            Assert.strictEqual('' + cnt2, '' + arr.length);

            Assert.strictEqual(cnt2, cnt1);
            Assert.notStrictEqual(cnt2, '' + cnt1);
            Assert.notStrictEqual('' + cnt2, cnt1);
            Assert.equal(cnt2, '' + cnt1);
            Assert.equal('' + cnt2, cnt1);
            Assert.strictEqual('' + cnt2, '' + cnt1);
        }
    });

Helpers.execute(
    'Testing iterator...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            let iterator = createIterator(i);
            let e = Enumerable.from(iterator)
                              .getEnumerator();

            let cnt1 = 0;
            while (e.moveNext()) {
                ++cnt1;
            }

            let cnt2: number = undefined;
            Assert.throws(() => {
                e.reset();

                cnt2 = 0;
                while (e.moveNext()) {
                    ++cnt2;
                }
            });

            Assert.strictEqual(cnt1, i);
            Assert.notStrictEqual(cnt1, '' + i);
            Assert.notStrictEqual('' + cnt1, i);
            Assert.equal(cnt1, '' + i);
            Assert.equal('' + cnt1, i);
            Assert.strictEqual('' + cnt1, '' + i);

            Assert.strictEqual(cnt2, undefined);

            Assert.notStrictEqual(cnt2, cnt1);
        }
    });
