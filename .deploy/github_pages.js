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

const Path = require('path');
const vscode = require('vscode');

exports.execute = function(args) {
    const FSExtra = args.require('fs-extra');

    // workspace folder
    const WORKSPACE = Path.resolve(
        Path.join(__dirname, '../')
    );

    // GitHub pages
    const GITHUB_PAGES = Path.resolve(
        Path.join(__dirname, '../mkloubert.github.io')
    );

    // copy demo and playground page
    {
        const DEMO = Path.resolve(
            Path.join(WORKSPACE, 'demo')
        );

        const GITHUB_PAGES_DEMOS = Path.resolve(
            Path.join(GITHUB_PAGES, 'demos/node-enumerable')
        );

        if (FSExtra.existsSync(GITHUB_PAGES_DEMOS)) {
            FSExtra.removeSync(GITHUB_PAGES_DEMOS);
        }
        FSExtra.mkdirsSync(GITHUB_PAGES_DEMOS);

        FSExtra.copySync(DEMO, GITHUB_PAGES_DEMOS);
    }

    // copy documentation
    {
        const DOCS = Path.resolve(
            Path.join(WORKSPACE, 'docs')
        );

        const GITHUB_PAGES_DOCS = Path.resolve(
            Path.join(GITHUB_PAGES, 'node-enumerable')
        );

        if (FSExtra.existsSync(GITHUB_PAGES_DOCS)) {
            FSExtra.removeSync(GITHUB_PAGES_DOCS);
        }
        FSExtra.mkdirsSync(GITHUB_PAGES_DOCS);

        FSExtra.copySync(DOCS, GITHUB_PAGES_DOCS);
    }
}
