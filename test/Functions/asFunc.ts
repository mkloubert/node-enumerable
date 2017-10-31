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
    'Testing (false) result...',
    (ctx) => {
        const VALUES = [
            function(a: number, b: number) {
                return a + b;
            },
            (a: number, b: number) => a + b,
            'x,y => x + y',
            '(x,y) => x + y',
            null,
            undefined,
        ];

        for (const ITEM of VALUES) {
            const FUNC: any = Enumerable.asFunc(ITEM, false);

            const PREDICATE = () => {
                if ('undefined' === typeof ITEM || null === ITEM) {
                    return FUNC === ITEM;
                }

                return 'function' === typeof FUNC;
            };

            Assert.equal(PREDICATE(), true);
            Assert.strictEqual(PREDICATE(), true);
            Assert.equal('' + PREDICATE(), '' + true);
            Assert.strictEqual('' + PREDICATE(), '' + true);
        }
    });

Helpers.execute(
    'Testing exceptions...',
    (ctx) => {
        const VALUES = [
            23979,
            '5979',
            'Marcel K.',
            'Tanja M.',
        ];

        for (const ITEM of VALUES) {
            let func: Function | false;
            try {
                func = Enumerable.asFunc(ITEM, false);
            }
            catch (e) {
                func = false;
            }

            Assert.equal(func, false);
            Assert.strictEqual(func, false);
            Assert.equal('' + func, '' + false);
            Assert.strictEqual('' + func, '' + false);
        }
    });
