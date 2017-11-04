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
const MAX_CHUNK_SIZE = 10;

Helpers.execute(
    'Testing numbers...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            for (let j = 0; j <= MAX_CHUNK_SIZE; j++) {
                const ARR: number[] = [];
                for (let k = 0; k < i; k++) {
                    ARR.push( k );
                }

                let chunkSeq: Enumerable.IEnumerable< Enumerable.IEnumerable<number> >;
                let expectedChunkCount: number;
                if (j > 0) {
                    chunkSeq = Enumerable.from(ARR).chunk(j);
                    expectedChunkCount = Math.ceil( ARR.length / j );
                }
                else {
                    // no size means: 1 item per chunk
                    //                and one chunk per array item

                    chunkSeq = Enumerable.from(ARR).chunk();
                    expectedChunkCount = ARR.length;
                }

                let chunks: Enumerable.IEnumerable<number>[] = [];
                for (let c of chunkSeq) {
                    chunks.push(c);
                }

                Assert.equal( chunks.length, expectedChunkCount );
                Assert.strictEqual( chunks.length, expectedChunkCount );
                Assert.equal( '' + chunks.length, expectedChunkCount );
                Assert.equal( chunks.length, '' + expectedChunkCount );
                Assert.equal( '' + chunks.length, '' + expectedChunkCount );
                Assert.strictEqual( '' + chunks.length, '' + expectedChunkCount );

                const EXPECTED: number[] = [];
                for (let c of chunks) {
                    for (let item of c) {
                        EXPECTED.push(item);
                    }
                }

                Assert.equal( ARR.length, EXPECTED.length );
                Assert.strictEqual( ARR.length, EXPECTED.length );
                Assert.equal( '' + ARR.length, EXPECTED.length );
                Assert.equal( ARR.length, '' + EXPECTED.length );
                Assert.equal( '' + ARR.length, '' + EXPECTED.length );
                Assert.strictEqual( '' + ARR.length, '' + EXPECTED.length );

                for (let k = 0; k < EXPECTED.length; k++) {
                    const A = ARR[k];
                    const E = EXPECTED[k];

                    Assert.equal( A, E );
                    Assert.strictEqual( A, E );
                    Assert.equal( '' + A, E );
                    Assert.equal( A, '' + E );
                    Assert.equal( '' + A, '' + E );
                    Assert.strictEqual( '' + A, '' + E );
                }
            }
        }
    });

Helpers.execute(
    'Testing strings...',
    (ctx) => {
        for (let i = 0; i < MAX_ARRAY_SIZE; i++) {
            if (0 === i % 10) {
                ctx.log(`Testing with ${i} elements...`);
            }

            for (let j = 0; j <= MAX_CHUNK_SIZE; j++) {
                const ARR: string[] = [];
                for (let k = 0; k < i; k++) {
                    ARR.push( 'MK+TM=' + k );
                }

                let chunkSeq: Enumerable.IEnumerable< Enumerable.IEnumerable<string> >;
                let expectedChunkCount: number;
                if (j > 0) {
                    chunkSeq = Enumerable.from(ARR).chunk(j);
                    expectedChunkCount = Math.ceil( ARR.length / j );
                }
                else {
                    // no size means: 1 item per chunk
                    //                and one chunk per array item

                    chunkSeq = Enumerable.from(ARR).chunk();
                    expectedChunkCount = ARR.length;
                }

                let chunks: Enumerable.IEnumerable<string>[] = [];
                for (let c of chunkSeq) {
                    chunks.push(c);
                }

                Assert.equal( chunks.length, expectedChunkCount );
                Assert.strictEqual( chunks.length, expectedChunkCount );
                Assert.equal( '' + chunks.length, expectedChunkCount );
                Assert.equal( chunks.length, '' + expectedChunkCount );
                Assert.equal( '' + chunks.length, '' + expectedChunkCount );
                Assert.strictEqual( '' + chunks.length, '' + expectedChunkCount );

                const EXPECTED: string[] = [];
                for (let c of chunks) {
                    for (let item of c) {
                        EXPECTED.push(item);
                    }
                }

                Assert.equal( ARR.length, EXPECTED.length );
                Assert.strictEqual( ARR.length, EXPECTED.length );
                Assert.equal( '' + ARR.length, EXPECTED.length );
                Assert.equal( ARR.length, '' + EXPECTED.length );
                Assert.equal( '' + ARR.length, '' + EXPECTED.length );
                Assert.strictEqual( '' + ARR.length, '' + EXPECTED.length );

                for (let k = 0; k < EXPECTED.length; k++) {
                    const A = ARR[k];
                    const E = EXPECTED[k];

                    Assert.equal( A, E );
                    Assert.strictEqual( A, E );
                    Assert.equal( '' + A, E );
                    Assert.equal( A, '' + E );
                    Assert.equal( '' + A, '' + E );
                    Assert.strictEqual( '' + A, '' + E );
                }
            }
        }
    });