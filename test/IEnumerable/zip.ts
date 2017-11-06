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
    'Testing strings...',
    (ctx) => {
        let arr1: string[] = ['Marcel', 'Bill', 'Albert'];
        let arr2: string[] = ['Kloubert', 'Gates', 'Einstein', 'Adenauer'];

        let expected: string[] = [
            arr1[0] + ' ' + arr2[0],
            arr1[1] + ' ' + arr2[1],
            arr1[2] + ' ' + arr2[2],
        ];

        Helpers.executeForSequences(arr1, (seq) => {
            let zippers = [
                (x: string, y: string) => x + ' ' + y,
            ];

            for (let i = 0; i < zippers.length; i++) {
                let z = zippers[i];

                let zipped = seq.zip(arr2, z);

                while (!zipped.next().done) {
                    let item = zipped.current.value;
                    let index = zipped.index;

                    Assert.strictEqual(item, expected[index]);
                    Assert.equal('' + item, expected[index]);
                    Assert.equal(item, '' + expected[index]);
                    Assert.strictEqual('' + item, '' + expected[index]);
                    Assert.equal(item, expected[index]);
                }

                if (!zipped.canReset) {
                    break;
                }

                zipped.reset();
            }
        });
    });

Helpers.execute(
    'Testing numbers...',
    (ctx) => {
        let arr1: number[] = [23, 9, 1979];
        let arr2: number[] = [5, 9, 19, 79];

        let expected: number[] = [
            arr1[0] * arr2[0],
            arr1[1] * arr2[1],
            arr1[2] * arr2[2],
        ];

        Helpers.executeForSequences(arr1, (seq) => {
            let zippers = [
                (x: number, y: number) => x * y,
            ];

            for (let i = 0; i < zippers.length; i++) {
                let z = zippers[i];

                let zipped = seq.zip(arr2, z);

                while (!zipped.next().done) {
                    let item = zipped.current.value;
                    let index = zipped.index;

                    Assert.strictEqual(item, expected[index]);
                    Assert.notStrictEqual('' + item, expected[index]);
                    Assert.notStrictEqual(item, '' + expected[index]);
                    Assert.equal('' + item, expected[index]);
                    Assert.equal(item, '' + expected[index]);
                    Assert.strictEqual('' + item, '' + expected[index]);
                    Assert.equal(item, expected[index]);
                }

                if (!zipped.canReset) {
                    break;
                }

                zipped.reset();
            }
        });
    });
