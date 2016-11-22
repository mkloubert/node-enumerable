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

interface Group {
    key: any;
    values: any[];
}

Helpers.execute(
    'Testing...',
    (ctx) => {
        let seq = Enumerable.from([true, 5979, '', 'TM', false, undefined, '23979', 'MK', null]);

        let lu = seq.toLookup(x => typeof x);
        let le = lu.getEnumerator();

        let expected: Group[] = [
            {
                key: 'boolean',
                values: [true, false],
            },
            {
                key: 'number',
                values: [5979],
            },
            {
                key: 'string',
                values: ['', 'TM', '23979', 'MK'],
            },
            {
                key: 'undefined',
                values: [undefined],
            },
            {
                key: 'object',
                values: [null],
            },
        ];

        let actual: Group[] = [];
        while (le.moveNext()) {
            let grouping = le.current.getEnumerator();

            let g: Group = {
                key: grouping.key,
                values: [],
            };

            while (grouping.moveNext()) {
                g.values
                 .push(grouping.current);
            }

            actual.push(g);
        }

        Assert.strictEqual(actual.length, expected.length);
        Assert.notStrictEqual('' + actual.length, expected.length);
        Assert.notStrictEqual(actual.length, '' + expected.length);
        Assert.equal('' + actual.length, expected.length);
        Assert.equal(actual.length, '' + expected.length);
        Assert.equal(actual.length, expected.length);

        for (let i = 0; i < actual.length; i++) {
            let a = actual[i];
            let e = expected[i];

            Assert.strictEqual(a.values.length, e.values.length);
            Assert.notStrictEqual('' + a.values.length, e.values.length);
            Assert.notStrictEqual(a.values.length, '' + e.values.length);
            Assert.equal('' + a.values.length, e.values.length);
            Assert.equal(a.values.length, '' + e.values.length);
            Assert.equal(a.values.length, e.values.length);

            for (let j = 0; j < a.values.length; j++) {
                let aValue = a.values[j];
                let eValue = e.values[j];

                Assert.strictEqual(aValue, eValue);
                Assert.equal(aValue, eValue);
            }
        }

        let l: any = lu;
        for (let i = 0; i < expected.length; i++) {
            let e = expected[i];
            let a = l[e.key];

            Assert.notStrictEqual(a, undefined);
            Assert.notEqual(a, undefined);

            let actual2: any[] = [];

            let en = a.getEnumerator();

            en.reset();
            while (en.moveNext()) {
                let item = en.current;

                actual2.push(item);
            }

            Assert.strictEqual(actual2.length, e.values.length);
            Assert.notStrictEqual('' + actual2.length, e.values.length);
            Assert.notStrictEqual(actual2.length, '' + e.values.length);
            Assert.equal('' + actual2.length, e.values.length);
            Assert.equal(actual2.length, '' + e.values.length);
            Assert.strictEqual('' + actual2.length, '' + e.values.length);
            Assert.equal(actual2.length, e.values.length);
        }
    });
