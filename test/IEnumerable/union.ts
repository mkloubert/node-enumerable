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

interface Group {
    key: any;
    values: any[];
}

Helpers.execute(
    'Testing...',
    (ctx) => {
        Helpers.executeForSequences([5, 3, 9, 7, 5, 9, 3, 7], (seq1) => {
            seq1 = seq1.makeResettable();

            Helpers.executeForSequences([8, 3, 6, 4, 4, 9, 1, 0], (seq2) => {
                seq1.reset();

                let expected = [5, 3, 9, 7, 8, 6, 4, 1, 0];
                
                // let union = seq1.union(seq2);

                let union = seq1.union(seq2);

                let actual = [];
                for (let item of union) {
                    actual.push(item);
                }

                Assert.equal(actual.length, expected.length);
                Assert.strictEqual(actual.length, expected.length);
                Assert.equal('' + actual.length, expected.length);
                Assert.equal(actual.length, '' + expected.length);
                Assert.equal('' + actual.length, '' + expected.length);
                Assert.strictEqual('' + actual.length, '' + expected.length);

                for (let i = 0; i < actual.length; i++) {
                    let x: number = actual[i];
                    let y: number = expected[i];

                    Assert.equal(x, y);
                    Assert.strictEqual(x, y);
                    Assert.equal('' + x, y);
                    Assert.equal(x, '' + y);
                    Assert.equal(x, '' + y);
                    Assert.equal('' + x, '' + y);
                    Assert.strictEqual('' + x, '' + y);
                }
            });
        });
    });
