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

import Enumerable = require('../');


/**
 * A result of a "sequence execution".
 */
export interface SequenceExecutionResult<T, TResult> {
    /**
     * The zero-based index.
     */
    index: number;

    /**
     * The result value.
     */
    result: TResult;

    /**
     * The underlying sequence.
     */
    sequence: Enumerable.IEnumerable<T>;
}

/**
 * A function for execution logic for a sequence.
 * 
 * @param {Enumerable.IEnumerable<T>} seq The underlying sequence.
 * @param {number} index The zero based index.
 * 
 * @return {TResult} The result of the execution.
 */
export type SequenceFunc<T, TResult> = (seq: Enumerable.IEnumerable<T>, index: number) => TResult;

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
 * Creates a list of sequences from items.
 * 
 * @param {Enumerable.Sequence<T>} [items] The items for the sequences.
 * 
 * @return {Enumerable.IEnumerable<T>[]} The created sequences.
 */
export function createSequences<T>(items?: Enumerable.Sequence<T>): Enumerable.IEnumerable<T>[] {
    return [
        Enumerable.from(items),
        Enumerable.from(toIterator(items)),
        Enumerable.from(toArray(items)),
    ];
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

/**
 * Creates a function for sequences for items.
 * 
 * @param {Enumerable.Sequence<T>} items The Items.
 * @param {SequenceFunc<T, TResult>} func The function to to invoke.
 * 
 * @return {SequenceExecutionResult<T, TResult>[]} The result of the executions. 
 */
export function executeForSequences<T, TResult>(items: Enumerable.Sequence<T>, func: SequenceFunc<T, TResult>): SequenceExecutionResult<T, TResult>[] {
    let results: SequenceExecutionResult<T, TResult>[] = [];

    let sequences = createSequences(items);
    for (let i = 0; i < sequences.length; i++) {
        let seq = sequences[i];

        let r: TResult;
        if (func) {
            r = func(seq, i);
        }

        results.push({
            index: i,
            result: r,
            sequence: seq,
        });
    }

    return results;
}

/**
 * Creates a new array from a sequence.
 * 
 * @param {Enumerable.Sequence<T>} seq The sequence.
 * 
 * @return {T[]} The new array. 
 */
export function toArray<T>(seq: Enumerable.Sequence<T>): T[] {
    let arr: T[] = [];
    
    if (seq) {
        for (let item of <any>seq){
            arr.push(item);
        }
    }

    return arr;
}


/**
 * Creates a new iterator from a sequence.
 * 
 * @param {Enumerable.Sequence<T>} seq The sequence.
 * 
 * @return {IterableIterator<T>} The new iterator. 
 */
export function *toIterator<T>(seq: Enumerable.Sequence<T>) {
    if (seq) {
        for (let item of <any>seq){
            yield item;
        }
    }
}
