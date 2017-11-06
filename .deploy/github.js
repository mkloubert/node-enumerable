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
const vscode = require('vscode');

exports.deployWorkspace = function(args) {
    const FSExtra = args.require('fs-extra');

    // workspace & 'releases' folders
    const WORKSPACE = Path.resolve(
        Path.join(__dirname, '../')
    );
    const RELEASES = Path.resolve(
        Path.join(__dirname, './releases')
    );

    // package.json
    const PACKAGE_JSON_FILE = Path.resolve(
        Path.join(WORKSPACE, 'package.json')
    );
    const PACKAGE_JSON = JSON.parse(
        FS.readFileSync(PACKAGE_JSON_FILE)
            .toString('utf8')
    );

    // module version
    const VERSION = ('' + PACKAGE_JSON.version).trim();

    // output directory
    const OUT_DIR = Path.resolve(
        Path.join(RELEASES, VERSION)
    );

    // keep sure to have a clean
    // and empty 'releases' folder 
    if (FSExtra.existsSync(RELEASES)) {
        FSExtra.removeSync( RELEASES );
    }
    FSExtra.mkdirsSync( OUT_DIR );

    // ${workspace}/js/enumerable.js
    const ENUMERABLE_JS = Path.resolve(
        Path.join(WORKSPACE, 'js/enumerable.js')
    );

    for (let i = 0; i < args.files.length; i++) {
        try {
            args.onBeforeDeployFile(i);

            const FILE = args.files[i];

            const SOURCE_FILE = Path.resolve(FILE);
            const REL_PATH = Path.relative(WORKSPACE, SOURCE_FILE);

            let targetFile;
            if (SOURCE_FILE === ENUMERABLE_JS) {
                // map 'js/enumerable.js'
                // to '/index.js' instead
                targetFile = Path.join(OUT_DIR, 'index.js');
            }
            else {
                targetFile = Path.join(OUT_DIR, REL_PATH);
            }
            targetFile = Path.resolve(targetFile);

            // target directory for current file
            const TARGET_DIR = Path.resolve(
                Path.join(Path.dirname(targetFile))
            );
            if (!FSExtra.existsSync(TARGET_DIR)) {
                FSExtra.mkdirsSync( TARGET_DIR );
            }

            // copy current file to target
            FSExtra.copySync(SOURCE_FILE, targetFile, {
                overwrite: false,
                errorOnExist: true,
                dereference: true
            });

            args.onFileCompleted(i);
        }
        catch (e) {
            args.onFileCompleted(i, e);
        }
    }
}
