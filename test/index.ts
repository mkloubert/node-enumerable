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

import * as FS from 'fs';
import * as Path from 'path';


interface TestModule {
    test(): any;
}

let testDir = Path.join(__dirname, './tests');

FS.readdir(testDir, (err, files) => {
    if (err) {
        throw err;
    }

    files = files.filter(x => x.endsWith('.test.js'))
                    .map(x => Path.join(testDir, x));

    let nextFile = () => {
        if (files.length < 1) {
            process.exit(0);
            return;
        }

        let f = files.shift();

        FS.lstat(f, (err, stats) => {
            if (err) {
                throw err;
            }

            if (stats.isFile()) {
               let testModule: TestModule = require(f);
               if (testModule && testModule.test) {
                   console.log(`Test '${Path.basename(f)}'...`);
                   
                   let completed = (err: any) => {
                       if (err) {
                           console.log(`    [ERROR: ${err}]`);
                       }
                       else {
                           console.log('    [OK]');
                       }
                   };

                   try {
                       Promise.resolve( testModule.test() ).then(() => {
                           completed(null);
                       }, (err) => {
                           completed(err);
                       });
                   }
                   catch (e) {
                        completed(e);
                   }
               }
            }
            else {
                nextFile();
            }
        });
    };

    nextFile();
});
