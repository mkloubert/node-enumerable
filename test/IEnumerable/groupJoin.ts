/// <reference path="../../node.d.ts" />

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
import Enumerable = require('../../lib');
import Helpers = require('../helpers');

class Person {
    constructor(name: string) {
        this.name = name;
    }

    public name: string;
}

class Pet {
    constructor(name: string, owner: Person) {
        this.name = name;
        this.owner = owner;
    }

    public name: string;
    public owner: Person;
}

Helpers.execute(
    'Testing numbers...',
    (ctx) => {
        let persons: Person[] = [
            new Person("Tanja"),
            new Person("Marcel"),
            new Person("Yvonne"),
            new Person("Josefine"),
        ];

        let pets: Pet[] = [
            new Pet("Gina", persons[1]),
            new Pet("Schnuffi", persons[1]),
            new Pet("Schnuffel", persons[2]),
            new Pet("WauWau", persons[0]),
            new Pet("Lulu", persons[3]),
            new Pet("Asta", persons[1]),
        ];

        let expected: string[] = [
            'Owner: Tanja; Pets: WauWau',
            'Owner: Marcel; Pets: Gina, Schnuffi, Asta',
            'Owner: Yvonne; Pets: Schnuffel',
            'Owner: Josefine; Pets: Lulu',
        ];

        let seq = Enumerable.from(persons)
                            .groupJoin(pets,
                                       person => person.name,
                                       pet => pet.owner.name,
                                       (person, pets) => `Owner: ${person.name}; Pets: ${pets.select(x => x.name).joinToString(', ')}`);

        let actual: string[] = [];
        while (seq.moveNext()) {
            actual.push(seq.current);
        }

        Assert.strictEqual(actual.length, expected.length);
        Assert.notStrictEqual('' + actual.length, expected.length);
        Assert.notStrictEqual(actual.length, '' + expected.length);
        Assert.equal('' + actual.length, expected.length);
        Assert.equal(actual.length, '' + expected.length);
        Assert.equal(actual.length, expected.length);

        for (let i = 0; i < actual.length; i++) {
            let a = actual[i];
            let e = expected[i];

            Assert.strictEqual(a, e);
            Assert.strictEqual('' + a, e);
            Assert.strictEqual(a, '' + e);
            Assert.strictEqual('' + a, '' + e);
            Assert.equal(a, e);
            Assert.equal('' + a, e);
            Assert.equal(a, '' + e);
            Assert.equal('' + a, '' + e);
        }
    });
