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

Helpers.execute(
    'Testing strings...',
    (ctx) => {
        let arr1: any[] = ['Marcel', 'Bill', 'Albert'];
        let arr2: any[] = ['Kloubert', 'Gates', 'Einstein', 'Adenauer'];

        let expected: any[] = ["Marcel Kloubert", "Bill Gates", "Albert Einstein"];

        let seq = Enumerable.from(arr1)
                            .zip(arr2, (firstname, lastname) => {
                                           return firstname + ' ' + lastname; 
                                       });

        while (seq.moveNext()) {
            let item = seq.current;
            let index = seq.itemKey;

            Assert.strictEqual(item, expected[index]);
            Assert.equal(item, expected[index]);
        }
    });

Helpers.execute(
    'Testing numbers...',
    (ctx) => {
        let arr1: any[] = [23, 9, 1979];
        let arr2: any[] = [5, 9, 19, 79];

        let expected: any[] = [115, 81, 37601];

        let seq = Enumerable.from(arr1)
                            .zip(arr2, (x, y) => {
                                           return x * y; 
                                       });

        while (seq.moveNext()) {
            let item = seq.current;
            let index = seq.itemKey;

            Assert.strictEqual(item, expected[index]);
            Assert.notStrictEqual('' + item, expected[index]);
            Assert.notStrictEqual(item, '' + expected[index]);
            Assert.equal('' + item, expected[index]);
            Assert.equal(item, '' + expected[index]);
            Assert.strictEqual('' + item, '' + expected[index]);
            Assert.equal(item, expected[index]);
        }
    });