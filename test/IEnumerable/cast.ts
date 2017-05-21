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

const MAX_ARRAY_SIZE = 100;

Helpers.execute(
    'Testing numbers (to string)...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            // fill test array
            let arr: any[] = [];
            for (let j = 0; j < i; j++) {
                arr.push(j);
            }

            let seq = Enumerable.from(arr).cast<string>('string');

            let arr2: string[] = [];
            for (let item of seq) {
                arr2.push(item);
            }

            Assert.equal(arr.length, arr2.length);
            Assert.strictEqual(arr.length, arr2.length);
            Assert.equal('' + arr.length, arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.strictEqual('' + arr.length, '' + arr2.length);

            for (let item of arr2) {
                Assert.equal(typeof item, 'string');
                Assert.strictEqual(typeof item, 'string');
            }
        }
    });

Helpers.execute(
    'Testing numbers (to number)...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            // fill test array
            let arr: any[] = [];
            for (let j = 0; j < i; j++) {
                arr.push('' + j);
            }

            let seq = Enumerable.from(arr).cast<number>('number');

            let arr2: number[] = [];
            for (let item of seq) {
                arr2.push(item);
            }

            Assert.equal(arr.length, arr2.length);
            Assert.strictEqual(arr.length, arr2.length);
            Assert.equal('' + arr.length, arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.strictEqual('' + arr.length, '' + arr2.length);

            for (let item of arr2) {
                Assert.equal('number' == typeof item, true);
                Assert.notEqual('number' == typeof item, false);
                Assert.strictEqual('number' == typeof item, true);
                Assert.notStrictEqual('number' == typeof item, false);
                Assert.equal('number' === typeof item, true);
                Assert.notEqual('number' === typeof item, false);
                Assert.strictEqual('number' === typeof item, true);
                Assert.notStrictEqual('number' === typeof item, false);
                Assert.equal(typeof item, 'number');
                Assert.strictEqual(typeof item, 'number');

                Assert.equal(isNaN(item), false);
            }
        }
    });

Helpers.execute(
    'Testing numbers (to function)...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            // fill test array
            let arr: any[] = [];
            for (let j = 0; j < i; j++) {
                arr.push(j);
            }

            let seq = Enumerable.from(arr).cast<Function>('function');

            let arr2: Function[] = [];
            for (let item of seq) {
                arr2.push(item);
            }

            Assert.equal(arr.length, arr2.length);
            Assert.strictEqual(arr.length, arr2.length);
            Assert.equal('' + arr.length, arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.strictEqual('' + arr.length, '' + arr2.length);

            for (let j = 0; j < arr2.length; j++) {
                let item = arr2[j];
                let funcRes = item();

                Assert.equal('function' == typeof item, true);
                Assert.notEqual('function' == typeof item, false);
                Assert.strictEqual('function' == typeof item, true);
                Assert.notStrictEqual('function' == typeof item, false);
                Assert.equal('function' === typeof item, true);
                Assert.notEqual('function' === typeof item, false);
                Assert.strictEqual('function' === typeof item, true);
                Assert.notStrictEqual('function' === typeof item, false);
                Assert.equal(typeof item, 'function');
                Assert.strictEqual(typeof item, 'function');
                
                Assert.equal(funcRes, arr[j]);
                Assert.strictEqual(funcRes, arr[j]);
                Assert.equal('' + funcRes, arr[j]);
                Assert.equal(funcRes, '' + arr[j]);
                Assert.equal('' + funcRes, '' + arr[j]);
                Assert.strictEqual('' + funcRes, '' + arr[j]);
            }
        }
    });

Helpers.execute(
    'Testing numbers (to null)...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            // fill test array
            let arr: any[] = [];
            for (let j = 0; j < i; j++) {
                arr.push(j);
            }

            let seq = Enumerable.from(arr).cast('null');

            let arr2: Function[] = [];
            for (let item of seq) {
                arr2.push(item);
            }

            Assert.equal(arr.length, arr2.length);
            Assert.strictEqual(arr.length, arr2.length);
            Assert.equal('' + arr.length, arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.strictEqual('' + arr.length, '' + arr2.length);

            for (let j = 0; j < arr2.length; j++) {
                Assert.equal(arr2[j], null);
                Assert.equal(arr2[j], undefined);
                Assert.strictEqual(arr2[j], null);
                Assert.notStrictEqual(arr2[j], undefined);
            }
        }
    });

Helpers.execute(
    'Testing numbers (to undefined)...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            // fill test array
            let arr: any[] = [];
            for (let j = 0; j < i; j++) {
                arr.push(j);
            }

            let seq = Enumerable.from(arr).cast('undefined');

            let arr2: Function[] = [];
            for (let item of seq) {
                arr2.push(item);
            }

            Assert.equal(arr.length, arr2.length);
            Assert.strictEqual(arr.length, arr2.length);
            Assert.equal('' + arr.length, arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.strictEqual('' + arr.length, '' + arr2.length);

            for (let j = 0; j < arr2.length; j++) {
                Assert.equal(arr2[j], undefined);
                Assert.equal(arr2[j], null);
                Assert.strictEqual(arr2[j], undefined);
                Assert.notStrictEqual(arr2[j], null);
            }
        }
    });

Helpers.execute(
    'Testing numbers (to objects)...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            interface TestObject {
                value: any;
            }

            // fill test array
            let arr: TestObject[] = [];
            for (let j = 0; j < i; j++) {
                arr.push({
                    value: j,
                });
            }

            let seq = Enumerable.from(arr).cast('object');

            let arr2: Function[] = [];
            for (let item of seq) {
                arr2.push(item);
            }

            Assert.equal(arr.length, arr2.length);
            Assert.strictEqual(arr.length, arr2.length);
            Assert.equal('' + arr.length, arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.strictEqual('' + arr.length, '' + arr2.length);

            for (let item of arr2) {
                Assert.equal('object' == typeof item, true);
                Assert.notEqual('object' == typeof item, false);
                Assert.strictEqual('object' == typeof item, true);
                Assert.notStrictEqual('object' == typeof item, false);
                Assert.equal('object' === typeof item, true);
                Assert.notEqual('object' === typeof item, false);
                Assert.strictEqual('object' === typeof item, true);
                Assert.notStrictEqual('object' === typeof item, false);
                Assert.equal(typeof item, 'object');
                Assert.strictEqual(typeof item, 'object');
            }
        }
    });

Helpers.execute(
    'Testing numbers (to float)...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            // fill test array
            let arr: any[] = [];
            for (let j = 0; j < i; j++) {
                arr.push('' + j);
            }

            let seq = Enumerable.from(arr).cast<number>('float');

            let arr2: number[] = [];
            for (let item of seq) {
                arr2.push(1.0 + item / 10.0);
            }

            Assert.equal(arr.length, arr2.length);
            Assert.strictEqual(arr.length, arr2.length);
            Assert.equal('' + arr.length, arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.strictEqual('' + arr.length, '' + arr2.length);

            for (let item of arr2) {
                Assert.equal('number' == typeof item, true);
                Assert.notEqual('number' == typeof item, false);
                Assert.strictEqual('number' == typeof item, true);
                Assert.notStrictEqual('number' == typeof item, false);
                Assert.equal('number' === typeof item, true);
                Assert.notEqual('number' === typeof item, false);
                Assert.strictEqual('number' === typeof item, true);
                Assert.notStrictEqual('number' === typeof item, false);
                Assert.equal(typeof item, 'number');
                Assert.strictEqual(typeof item, 'number');

                Assert.equal(isNaN(item), false);
            }
        }
    });

Helpers.execute(
    'Testing numbers (to integer)...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            // fill test array
            let arr: any[] = [];
            for (let j = 0; j < i; j++) {
                arr.push('' + j);
            }

            let seq = Enumerable.from(arr).cast<number>('int');

            let arr2: number[] = [];
            for (let item of seq) {
                arr2.push(1.0 + item / 10.0);
            }

            Assert.equal(arr.length, arr2.length);
            Assert.strictEqual(arr.length, arr2.length);
            Assert.equal('' + arr.length, arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.strictEqual('' + arr.length, '' + arr2.length);

            for (let item of arr2) {
                Assert.equal('number' == typeof item, true);
                Assert.notEqual('number' == typeof item, false);
                Assert.strictEqual('number' == typeof item, true);
                Assert.notStrictEqual('number' == typeof item, false);
                Assert.equal('number' === typeof item, true);
                Assert.notEqual('number' === typeof item, false);
                Assert.strictEqual('number' === typeof item, true);
                Assert.notStrictEqual('number' === typeof item, false);
                Assert.equal(typeof item, 'number');
                Assert.strictEqual(typeof item, 'number');

                Assert.equal(isNaN(item), false);
            }
        }
    });

Helpers.execute(
    'Testing numbers (to boolean)...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            // fill test array
            let arr: any[] = [];
            for (let j = 0; j < i; j++) {
                arr.push('' + j);
            }

            let seq = Enumerable.from(arr).cast<boolean>('boolean');

            let arr2: boolean[] = [];
            for (let item of seq) {
                arr2.push(item ? true : false);
            }

            Assert.equal(arr.length, arr2.length);
            Assert.strictEqual(arr.length, arr2.length);
            Assert.equal('' + arr.length, arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.equal('' + arr.length, '' + arr2.length);
            Assert.strictEqual('' + arr.length, '' + arr2.length);

            for (let item of arr2) {
                Assert.equal('boolean' == typeof item, true);
                Assert.notEqual('boolean' == typeof item, false);
                Assert.strictEqual('boolean' == typeof item, true);
                Assert.notStrictEqual('boolean' == typeof item, false);
                Assert.equal('boolean' === typeof item, true);
                Assert.notEqual('boolean' === typeof item, false);
                Assert.strictEqual('boolean' === typeof item, true);
                Assert.notStrictEqual('boolean' === typeof item, false);
                Assert.equal(typeof item, 'boolean');
                Assert.strictEqual(typeof item, 'boolean');
            }
        }
    });
