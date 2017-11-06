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


// this is a script target for
// vs-deploy VSCode extension
// 
// s. https://github.com/mkloubert/vs-deploy
// for more information

const FS = require('fs');
const Path = require('path');

const LINE_SPLITTER = "\n";

exports.deployFile = function(args) {
    // lines of NodeJS '/index.js' file
    let index_js = FS.readFileSync(args.file)
                     .toString('utf8')
                     .split(LINE_SPLITTER);

    // make browser compatible
    var enumerable_js = [];
    for (let line of index_js) {
        let lineToAdd = line;
        if ('module.exports = Enumerable;' === lineToAdd.trim()) {
            lineToAdd = '';
        }
        else if ('//# sourceMappingURL=index.js.map' === lineToAdd.trim()) {
            lineToAdd = '//# sourceMappingURL=enumerable.js.map';
        }

        enumerable_js.push(
            lineToAdd
        );
    }

    // the content to write
    var content = new Buffer(
        enumerable_js.join(LINE_SPLITTER),
        'utf8'
    );

    var listOfOutputFiles = [
        Path.join( __dirname, '../js/enumerable.js' ),
        Path.join( __dirname, '../demo/js/enumerable.js' ),
    ];

    for (let outFile of listOfOutputFiles) {
        FS.writeFileSync(
            Path.resolve(outFile),
            content,
        );
    }
}
