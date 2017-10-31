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


function *makeGenerator() {
    yield 5979;
    yield 23979;
}

Helpers.execute(
    'Testing values...',
    (ctx) => {
        const VALUES: any[] = [
            [1, 2, 3, 4],
            'TM+MK=L',
            makeGenerator(),
            Enumerable.create(11, 22, 33, 44),
            Enumerable.from([ 111, 222, 333, 444 ]),
            Enumerable.fromString('TM+MK=L'),
            Enumerable.from('PZSUX'),
        ];

        for (const ITEM of VALUES) {
            const SEQ: any = Enumerable.asEnumerable( ITEM );

            const PREDICATE = () => {
                return SEQ &&
                       SEQ['IS_ENUMERABLE'] === Enumerable.IS_ENUMERABLE;
            };

            Assert.equal(PREDICATE(), true);
            Assert.strictEqual(PREDICATE(), true);
            Assert.equal('' + PREDICATE(), '' + true);
            Assert.strictEqual('' + PREDICATE(), '' + true);
        }
    });
