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
    'Testing number...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            // fill test array
            let arr1: any[] = [];
            let arr2: any[] = [];
            for (let j = 0; j < i; j++) {
                arr1.push(j);
                arr2.push('' + j);
            }

            let expected1: boolean = true;
            let expected2: boolean = true;
            let expected3a: boolean = false;
            let expected3b: boolean = false;
            let expected3c: boolean = false;
            let expected4a: boolean = true;
            let expected4b: boolean = true;
            let expected4c: boolean = true;
            if (i < 1) {
                expected3a = true;
                expected3b = true;
                expected3c = true;
            }

            let actual1 = Enumerable.from(arr1).sequenceEqual(arr1);
            let actual2 = Enumerable.from(arr1).sequenceEqual(arr2);
            let actual3a = Enumerable.from(arr1).sequenceEqual(arr2, (x, y) => x === y);
            let actual3c = Enumerable.from(arr1).sequenceEqual(arr2, true);
            let actual4a = Enumerable.from(arr1).sequenceEqual(arr1, (x, y) => x === y);
            let actual4c = Enumerable.from(arr1).sequenceEqual(arr1, true);

            Assert.strictEqual(actual1, expected1);
            Assert.equal(actual1, expected1);

            Assert.strictEqual(actual2, expected2);
            Assert.equal(actual2, expected2);

            Assert.strictEqual(actual3a, expected3a);
            Assert.equal(actual3a, expected3a);
            Assert.strictEqual(actual3c, expected3c);
            Assert.equal(actual3c, expected3c);

            Assert.strictEqual(actual4a, expected4a);
            Assert.equal(actual4a, expected4a);
            Assert.strictEqual(actual4c, expected4c);
            Assert.equal(actual4c, expected4c);
        }
    });
