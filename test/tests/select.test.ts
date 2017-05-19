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

import * as Enumerable from '../../lib';
import * as Tests from '../tests';


function test1() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 1000; j++) {
            let itemCount = i * j;
            
            let items = [];
            for (let k = 0; k < itemCount; k++) {
                items.push(k);
            }

            let l = -1;
            let seq = Enumerable.from(items)
                                .select(x => '' + x);

            for (let seqItem of seq) {
                let curItem = items[++l];
                let strItem = '' + curItem;

                if (strItem !== seqItem) {
                    throw "ERROR";
                }
            }
        }

        console.log(`  select(test1.${i}): [OK]`);
    }
}

export function test() {
    test1();
}
