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
    'Testing numbers...',
    (ctx) => {
        let arr1: any[] = [];
        let arr2: any[] = [1, 2, 3];
        let arr3: any[] = [4, '4'];

        let result1a = Enumerable.from(arr1)
                                 .all('x => false');
        let result1b = Enumerable.from(arr1)
                                 .all(x => false);

        Assert.strictEqual(result1a, true);
        Assert.notStrictEqual(result1a, 1);
        Assert.equal(result1a, 1);

        Assert.strictEqual(result1b, true);
        Assert.notStrictEqual(result1b, 1);
        Assert.equal(result1b, 1);

        let result2a = Enumerable.from(arr2)
                                 .all('x => x < 4');
        let result2b = Enumerable.from(arr2)
                                 .all(x => x < 4);
        let result2c = Enumerable.from(arr2)
                                 .all('x => x < 3');
        let result2d = Enumerable.from(arr2)
                                 .all(x => x < 3);

        Assert.strictEqual(result2a, true);
        Assert.notStrictEqual(result2a, 1);
        Assert.equal(result2a, 1);

        Assert.strictEqual(result2b, true);
        Assert.notStrictEqual(result2b, 1);
        Assert.equal(result2b, 1);

        Assert.strictEqual(result2c, false);
        Assert.notStrictEqual(result2c, 0);
        Assert.equal(result2c, 0);

        Assert.strictEqual(result2d, false);
        Assert.notStrictEqual(result2d, 0);
        Assert.equal(result2d, 0);

        let result3a = Enumerable.from(arr3)
                                 .all('x => "string" === typeof x');
        let result3b = Enumerable.from(arr3)
                                 .all(x => "string" === typeof x);
        let result3c = Enumerable.from(arr3)
                                 .all('x => "undefined" !== typeof x');
        let result3d = Enumerable.from(arr3)
                                 .all(x => "undefined" !== typeof x);

        Assert.strictEqual(result3a, false);
        Assert.notStrictEqual(result3a, 0);
        Assert.equal(result3a, 0);

        Assert.strictEqual(result3b, false);
        Assert.notStrictEqual(result3b, 0);
        Assert.equal(result3b, 0);

        Assert.strictEqual(result3c, true);
        Assert.notStrictEqual(result3c, 1);
        Assert.equal(result3c, 1);

        Assert.strictEqual(result3d, true);
        Assert.notStrictEqual(result3d, 1);
        Assert.equal(result3d, 1);
    });
