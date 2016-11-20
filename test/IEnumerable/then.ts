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

let compareItems = (x: any, y: any): number => {
    if (x > y) {
        return 1;
    }

    if (x < y) {
        return -1;
    }

    return 0;
}

Helpers.execute(
    'Testing strings...',
    (ctx) => {
        let arr: string[] = ["grape", "passionfruit", "banana", "mango", 
                             "orange", "raspberry", "apple", "blueberry"];

        let expected = arr.sort((x, y) => {
            let comp0 = compareItems(x.length, y.length);
            if (0 !== comp0) {
                return comp0;
            } 

            return compareItems(x, y);
        });

        let seq = Enumerable.from(arr)
                            .orderBy(x => x.length)
                            .then();

        let actual: string[] = [];
        while (seq.moveNext()) {
            actual.push(seq.current);
        }

        Assert.strictEqual(actual.length, expected.length);
        Assert.equal(actual.length, expected.length);
        Assert.notStrictEqual(actual.length, '' + expected.length);
        Assert.notStrictEqual('' + actual.length, expected.length);
        Assert.equal(actual.length, '' + expected.length);
        Assert.equal('' + actual.length, expected.length);
        Assert.equal('' + actual.length, '' + expected.length);
        Assert.strictEqual('' + actual.length, '' + expected.length);
    });
