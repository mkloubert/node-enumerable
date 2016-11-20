/// <reference path="../node.d.ts" />

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

import FS = require('fs');
import Path = require('path');

let libs: string[] = [
    './IEnumerable',
];

console.log('Starting tests...');

for (let i = 0; i < libs.length; i++) {
    let dir = libs[i];
    if (!Path.isAbsolute(dir)) {
        dir = Path.join(__dirname, dir);
    }

    let jsFiles = FS.readdirSync(dir).filter(x => {
        if (x.length >= 3) {
            if ('.js' === x.substr(x.length - 3)) {
                return true;
            }
        }
        
        return false;
    }).map(x => {
        return Path.join(dir, x);
    }).filter(x => {
        return FS.lstatSync(x).isFile();
    });

    for (let j = 0; j < jsFiles.length; j++) {
        let jf = jsFiles[j];

        console.log('\t' + jf);
        require(jf);
    }
}

console.log('Tests finished.');
