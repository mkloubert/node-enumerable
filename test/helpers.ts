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


/**
 * An execution context.
 */
export interface ExecutionContext {
    /**
     * Logs a message for the context.
     * 
     * @param {any} [msg] The message to log.
     */
    log(msg?: any): ExecutionContext;
}

/**
 * Executes an action and prints the execution time.
 * 
 * @param {String} desc The description.
 * @param {Function} func The function to execution.
 * 
 * @return {T} The result of the function.
 */
export function execute<T>(desc: string, func: (ctx: ExecutionContext) => T): T {
    let ctx: ExecutionContext = {
        log: function(m) {
            if (m) {
                console.log(`\t\t\t${m}`);
            }

            return this;
        }
    };

    let startTime = new Date();
    try {
        console.log(`\t\t${desc}`);

        if (func) {
            return func(ctx);
        }
    }
    finally {
        let endTime = new Date();

        console.log(`\t\tFinished after ${(endTime.getTime() - startTime.getTime()) / 1000.0} seconds`);
    }
}
