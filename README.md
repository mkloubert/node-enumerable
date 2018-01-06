[![npm](https://img.shields.io/npm/v/node-enumerable.svg)](https://www.npmjs.com/package/node-enumerable)
[![npm](https://img.shields.io/npm/dt/node-enumerable.svg?label=npm%20downloads)](https://www.npmjs.com/package/node-enumerable)

# node-enumerable

[ES6](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015) ready [LINQ](https://en.wikipedia.org/wiki/Language_Integrated_Query) library written in [TypeScript](https://www.typescriptlang.org/).

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=9BX9ZJCAJHQ8U) [![](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?fid=o62pkd&url=https%3A%2F%2Fgithub.com%2Fmkloubert%2Fnode-enumerable)

## Table of contents

1. [Requirements](#requirements-)
2. [Installation](#installation-)
   * [NodeJS](#nodejs-)
   * [Browser](#browser-)
3. [Usage](#usage-)
   * [Create a sequence](#create-a-sequence-)
   * [Work with them](#work-with-them-)
     * [Async operations](#async-operations-)
4. [Playground / demos](#playground--demos-)
5. [Examples](#examples-)
   * [Filters](#filters-)
   * [Sort elements](#sort-elements-)
   * [Take / skip elements](#take--skip-elements-)
   * [Get one element](#get-one-element-)
   * [Accumulators](#accumulators-)
   * [Minimum / maximum values](#minimum--maximum-values-)
   * [Joins](#joins-)
   * [Groupings](#groupings-)
   * [Projection](#projection-)
   * [Checks / conditions](#checks--conditions-)
   * [Conversions](#conversions-)
   * [Count](#count-)
   * [Math](#math-)
   * [More](#more-)
     * [assert](#assert-)
     * [chunk](#chunk-)
     * [clone](#clone-)
     * [concat / concatArray](#concat--concatarray-)
     * [consume](#consume-)
     * [defaultIfEmpty / defaultArrayIfEmpty](#defaultifempty--defaultarrayifempty-)
     * [forAll](#forall-)
     * [intersperse / intersperseArray](#intersperse--interspersearray-)
     * [pipe](#pipe-)
     * [popFrom / shiftFrom](#popfrom--shiftfrom-)
     * [prepend / prependArray](#prepend--prependarray-)
     * [pushTo](#pushto-)
     * [random](#random-)
     * [reset](#reset-)
     * [trace](#trace-)
6. [Documentation](#documentation-)
7. [License](#license-)
8. [Tests](#tests-)

## Requirements [[&uarr;](#table-of-contents)]

* an [ES6](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015) compatible environment like [modern browsers](https://en.wikipedia.org/wiki/ECMAScript#Implementations) or [NodeJS](https://nodejs.org/en/)
* [TypeScript](https://www.typescriptlang.org/) 2.3 or later (ONLY when using [defintion files](https://github.com/mkloubert/node-enumerable/blob/master/index.d.ts))

## Installation [[&uarr;](#table-of-contents)]

### NodeJS [[&uarr;](#installation-)]

Run

```bash
npm install node-enumerable --save
```

inside project folder to install the module.

### Browser [[&uarr;](#installation-)]

Download the latest version from [here](https://github.com/mkloubert/node-enumerable/releases).

```html
<html>
  <head>
    <!-- node-enumerable -->
    <script type="text/javascript" src="js/enumerable.js"></script>
  </head>

  <body>
    <script type="text/javascript">
    
        // test code

        let seq = Enumerable.create(1, 2, 3);

        for (let item of seq) {
            alert(item);
        }
    
    </script>
  </body>
</html>
```

## Usage [[&uarr;](#table-of-contents)]

### Create a sequence [[&uarr;](#usage-)]

```javascript
const Enumerable = require('node-enumerable');

function *testGenerator() {
    yield 111;
    yield 222;
    yield 333;
}

// from a list of values / objects with variable length
let seq1 = Enumerable.create(1, 'MK', true, null, {});

// from an array
let seq2 = Enumerable.from([11, 22, 33, 44]);
// from a generator
let seq3 = Enumerable.from( testGenerator() );
// from a string
// 
// 'A', 'j', 'n', 'a', 't'
let seq4 = Enumerable.from('Ajnat');  // alt: Enumerable.fromString('Ajnat');

// range of numbers: 2, 3, 4, 5, 6
let seq5 = Enumerable.range(2, 5);

// 5979 'TM' strings
let seq6 = Enumerable.repeat('TM', 5979);

// build, using factory function
// 
// 'item_1', 'item_2', 'item_3'
let seq7 = Enumerable.build((cancel, index) => {
    if (index < 3) {
        return 'item_' + (index + 1);
    }
    else {
        cancel();  // we tell that we
                   // want to cancel here
    }
});

// build, using factory function
// by building a flatten list
// 
// 1, 10, 100, 2, 20, 200, 3, 30, 300
let seq8 = Enumerable.buildMany((cancel, index) => {
    let n = index + 1;

    return [ n, n * 10, n * 100 ];
}, 3);  // create 3 elements
        // 
        // the 'build()' function has
        // a same argument

// create empty sequence
let seq9 = Enumerable.empty();
```

### Work with them [[&uarr;](#usage-)]

```javascript
let seq = Enumerable.create(5979, 23979, null, '23979', 1781, 241279);

let newSeq = seq.where((x) => x !== null)  // remove all elements that are (null)
                .skip(1)  // skip one element (5979)
                .take(3)  // take next remaining 3 elements (23979, 23979, 1781)
                .distinct()  // remove duplicates
                .select((x) => "" + x)  // convert to strings
                .order();  // order by element ascending

// you also can use the
// 'each' and 'forEach' methods
// of the sequence to do the
// following job
for (let item of newSeq) {
    // [0] 1781
    // [1] 23979
    console.log(item);
}
```

Most methods are chainable as in [.NET](https://en.wikipedia.org/wiki/.NET_Framework) context.

#### Async operations [[&uarr;](#work-with-them-)]

```javascript
const FS = require('fs');
const Path = require('path');

let seq = Enumerable.create('file1.txt', 'file2.txt', 'file3.txt', 'file4.txt');

seq.async((context) => {
    if (context.isFirst) {
        context.result = 0;  // initialize a counter
                             // value for the result
                             // s. 'counter' parameter
                             // of then() method below
    }

    // [0] file1.txt
    // [1] file2.txt
    // [2] file3.txt
    // [3] file4.txt
    let fileName = context.item;

    let fullPath = Path.join(__dirname, fileName);

    if (context.index < 2) {
        FS.readFile(fullPath, (err, data) => {
            if (err) {
                context.reject(err);  // has to be called if action
                                      // FAILED with the error object
                                      // or value as argument
            }
            else {
                ++context.result;  // update counter value
                                   // for the result
                                   // s. 'counter' of then()
                                   // method below

                context.resolve();  // has to be invoked if
                                    // invocation was SUCCESSFUL
            }
        });
    }
    else {
        context.cancel();  // cancel at 3rd element
    }
}).then((counter) => {
    // OK

    console.log('Number of loaded files: ' + counter);  // 2
}).catch((err) => {
    console.log('One action failed: ' + err);
});
```

The `context` argument of the `async()` method uses the [AsyncActionContext](https://mkloubert.github.io/node-enumerable/interfaces/_index_.enumerable.asyncactioncontext.html) interface.

## Playground / demos [[&uarr;](#table-of-contents)]

You can test all features in [your browser](https://mkloubert.github.io/demos/node-enumerable/).

## Examples [[&uarr;](#table-of-contents)]

### Filters [[&uarr;](#examples-)]

```javascript
// distinct()
// 1, 2, 4, 3
Enumerable.create(1, 2, 4, 2, 3)
          .distinct();
// distinctBy()
// "grape", "passionfruit", "banana", "raspberry"
Enumerable.create("grape", "passionfruit", "banana", "mango", 
                  "orange", "raspberry", "apple", "blueberry")
          .distinctBy(x => x.length);
 
// except()
// 2.0, 2.1, 2.3, 2.4, 2.5
Enumerable.create(2.0, 2.1, 2.2, 2.3, 2.4, 2.5)
          .except([2.2]); 
 
// intersect()
// 26, 30
Enumerable.create(44, 26, 92, 30, 71, 38)
          .intersect([30, 59, 83, 47, 26, 4, 3]);
       
// ofType()
// '5979', 'Tanja'
Enumerable.create(1, '5979', 2, 'Tanja', 3)
          .ofType('string');  // typeof x === 'string'
          
// union()
// 5, 3, 9, 7, 8, 6, 4, 1, 0
Enumerable.create(5, 3, 9, 7, 5, 9, 3, 7)
          .union([8, 3, 6, 4, 4, 9, 1, 0]);
          
// where()
// 1, 2, 3
Enumerable.create(1, 2, 3, 4)
          .where((x) => x < 4);
```

### Sort elements [[&uarr;](#examples-)]

```javascript
// orderBy(), thenBy()
//
// "apple", "grape", "mango", "banana",
// "orange", "blueberry", "raspberry", "passionfruit"
Enumerable.create("grape", "passionfruit", "banana", "mango", 
                  "orange", "raspberry", "apple", "blueberry")
          .orderBy((x) => x.length)  // complement: orderByDescending()
          .thenBy((x) => x);  // complement: thenByDescending()
                              // shorter: then()

// reverse()
// 4, 3, 2, 1
Enumerable.create(1, 2, 3, 4)
          .reverse();

// rand()
// e.g.: 2, 5, 7, 8, 0, 4, 6, 9, 3, 1
Enumerable.range(0, 10)
          .rand();  // alt: shuffle()
```

### Take / skip elements [[&uarr;](#examples-)]

```javascript
// skip()
// 3, 4
Enumerable.create(0, 1, 2, 3, 4)
          .skip(3);

// skipLast()
// 0, 1, 2, 3
Enumerable.create(0, 1, 2, 3, 4)
          .skipLast();

// skipWhile()
// 55, 666, 77
Enumerable.create(22, 33, 44, 55, 666, 77)
          .skipWhile((x) => x < 50);
          
// take()
// 0, 1, 2
Enumerable.create(0, 1, 2, 3, 4)
          .take(3);

// takeWhile()
// 22, 33, 44
Enumerable.create(22, 33, 44, 55)
          .takeWhile((x) => x < 50);
```

### Get one element [[&uarr;](#examples-)]

```javascript
// elementAt()
// 33
Enumerable.create(11, 22, 33, 44)
          .elementAt(2);
          
// elementAtOrDefault()
// 'TM'
Enumerable.create(11, 22, 33, 44)
          .elementAtOrDefault(4, 'TM');  // out of range
          
// first()
// 11
Enumerable.create(11, 22, 33, 44)
          .first();
          
// firstOrDefault()
// 'MK'
Enumerable.create()
          .firstOrDefault('MK');
          
// last()
// 44
Enumerable.create(11, 22, 33, 44)
          .last();
          
// lastOrDefault()
// 'PZ'
Enumerable.create()
          .lastOrDefault('PZ');

// single()
// EXCEPTION, because we have more than one element
Enumerable.create(11, 22, 33, 44)
          .single();
          
// singleOrDefault()
// 11
Enumerable.create(11)
          .singleOrDefault('YS');
```

All methods with NO `OrDefault` suffix will throw exceptions if no element was found.

You also can use a function as first argument for all of these methods that works as filter / condition:

```javascript
// first()
// 22
Enumerable.create(11, 22, 33, 44)
          .first((x) => x >= 20);
```

### Accumulators [[&uarr;](#examples-)]

```typescript
// aggregate()
// " Marcel Joachim Kloubert"
Enumerable.create('Marcel', 'Joachim', 'Kloubert')
          .aggregate((accumulator, item) => {
                         return accumulator += ' ' + item;
                     }, '');

// average()
// 2.5
Enumerable.create(1, 2, 3, 4)
          .average();

// "M., Tanja"
Enumerable.create('M.', 'Tanja')
          .joinToString(', ');
```

### Minimum / maximum values [[&uarr;](#examples-)]

```typescript
// max()
// 3
Enumerable.create(1, 3, 2)
          .max(); 
          
// min()
// 1
Enumerable.create(2, 3, 1, 2)
          .min();
```

### Joins [[&uarr;](#examples-)]

```typescript
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

let persons = [
    new Person("Tanja"),
    new Person("Marcel"),
    new Person("Yvonne"),
    new Person("Josefine")
];

let pets = [
    new Pet("Gina", persons[1]),
    new Pet("Schnuffi", persons[1]),
    new Pet("Schnuffel", persons[2]),
    new Pet("WauWau", persons[0]),
    new Pet("Lulu", persons[3]),
    new Pet("Asta", persons[1]),
];

// groupJoin()
// 
// [0] 'Owner: Tanja; Pets: WauWau, Sparky'
// [1] 'Owner: Marcel; Pets: Gina, Schnuffi, Asta'
// [2] 'Owner: Yvonne; Pets: Schnuffel'
// [3] 'Owner: Josefine; Pets: Lulu'
Enumerable.from(persons)
          .groupJoin(pets,
                     (person) => person.name,
                     (pet) => pet.owner.name,
                     (person, petsOfPerson) => {
                         let petList = petsOfPerson
                             .select(pet => pet.name)
                             .joinToString(', ');
                     
                         return 'Owner: ' + person.name + '; Pets: ' + petList;
                     });

// join()
// 
// [0] 'Owner: Tanja; Pet: WauWau'
// [1] 'Owner: Marcel; Pet: Gina'
// [2] 'Owner: Marcel; Pet: Schnuffi'
// [3] 'Owner: Marcel; Pet: Asta'
// [4] 'Owner: Yvonne; Pet: Schnuffel'
// [5] 'Owner: Josefine; Pet: Lulu'
Enumerable.from(persons)
          .join(pets,
                (person) => person.name,
                (pet) => pet.owner.name,
                (person, pet) => {
                    return 'Owner: ' + person.name + '; Pet: ' + pet.name;
                });
```

### Groupings [[&uarr;](#examples-)]

```javascript
// groupBy()
Enumerable.create("grape", "passionfruit", "blueberry",
                  "apple", "banana")
          .groupBy(fruit => fruit[0].toLowerCase())
          .each((grouping) => {
                    // grouping[0].key = 'g'
                    // grouping[0][0] = 'grape'
                    
                    // grouping[1].key = 'p'
                    // grouping[1][0] = 'passionfruit'
                    
                    // grouping[2].key = 'b'
                    // grouping[2][0] = 'blueberry'
                    // grouping[2][1] = 'banana'
                    
                    // grouping[3].key = 'a'
                    // grouping[3][0] = 'apple'
                });
```

### Projection [[&uarr;](#examples-)]

```javascript
// flatten()
// 1, (false), 3, 44, '555', 66.6, (true)
Enumerable.from( [ [ 1, false, 3 ], 44, [ '555', 66.6, true ] ] )
          .flatten();

// select()
// "MARCEL", "KLOUBERT"
Enumerable.create("Marcel", "Kloubert")
          .select(x => x.toUpperCase());
          
// selectMany()
// 1, 10, 100, 2, 20, 200, 3, 30, 300
Enumerable.create(1, 2, 3)
          .selectMany(x => [ x, x * 10, x * 100 ]);

// zip()
// "Marcel Kloubert", "Bill Gates", "Albert Einstein"
Enumerable.create('Marcel', 'Bill', 'Albert')
          .zip(['Kloubert', 'Gates', 'Einstein', 'Adenauer'],
               (firstName, lastName) => {
                   return `${firstName} ${lastName}`;
               });
```

### Checks / conditions [[&uarr;](#examples-)]

```javascript
// all()
// (false)
Enumerable.create(1, 2, '3', 4)
          .all((x) => typeof x !== "string");

// any()
// (true)
Enumerable.create(1, 2, '3', 4)
          .any((x) => typeof x === "string");

// contains()
// (true)
Enumerable.create(1, 2, '3')
          .contains(3);

// not()
// 1, 2, 4
Enumerable.create(1, 2, '3', 4)
          .not((x) => typeof x === "string");
 
// sequenceEqual()
// (false)         
Enumerable.create(1, 2, 3)
          .sequenceEqual([1, 3, 2]);
```

### Conversions [[&uarr;](#examples-)]

```javascript
// toArray()
let jsArray = Enumerable.create(1, 2, 3, 4)
                        .toArray();
  
// toObject()
let obj = Enumerable.create(1, 2, 3, 4)
                    .toObject((item, index) => "item" + index);  

// toLookup()
// 
// lookup['A'][0] = 'Albert'
// lookup['B'][0] = 'Bill'
// lookup['B'][1] = 'barney'
// lookup['K'][0] = 'Konrad'
// lookup['M'][0] = 'Marcel'
let lookup = Enumerable.create('Bill', 'Marcel', 'barney', 'Albert', 'Konrad')
                       .toLookup(x => x[0].toUpperCase());
```

### Count [[&uarr;](#examples-)]

```javascript
// 3
Enumerable.create(0, 1, 2)
          .count();  // a second call will return 0
                     // if reset() method is not called
          
// 2
Enumerable.create(0, 1, 2)
          .count((x) => x > 0);

// 4
Enumerable.create(11, 22, 33, 44)
          .length();  // a second call will return
                      // the same value, because we have an array
                      // based sequence here
                      //
                      // a generator based sequence will behave as count()

// (false)
Enumerable.create(111, 222, 333)
          .isEmpty();

// all are (false)
Enumerable.isNullOrEmpty(
    Enumerable.create(1111, 2222, 3333)
);
Enumerable.isUndefinedNullOrEmpty(
    Enumerable.create(11111, 22222, 33333)
);
Enumerable.isUndefinedNullOrEmpty(
    Enumerable.create(0, true, false)
);
```

### Math [[&uarr;](#math-)]

```javascript
// abs()
// 1, 22.57, 444, NaN, -333.85, NaN
Enumerable.create(-1, 22.57, 444, true, -333.85, false)
          .abs();

// ceil()
// -1, 23, 444, NaN, -333, NaN
Enumerable.create(-1, 22.47, 444, null, -333.85, false)
          .ceil();

// cos()
// 0.004, -0.99996, -0.01
Enumerable.create(11, 22, 33)
          .cos();  // complement: arcCos()

// cosH()
// 29937.07, 1792456423.07, 107321789892958.03
Enumerable.create(11, 22, 33)
          .cosH();  // complement: arcCosH()

// exp()
// 2.72, 7.39, 20.09
Enumerable.create(1, 2, 3)
          .exp();

// floor()
// -1, 23, 444, NaN, -334, NaN
Enumerable.create(-1, 22.47, 444.0, undefined, -333.85, true)
          .floor();

// log()
// 0, 1, 2, 3, 4
Enumerable.create(1, 2, 4, 8, 16)
          .log(2);

// pow()
// 1, 4, 9, 16
Enumerable.create(1, 2, 3, 4)
          .pow(2);

// product()
// 24
Enumerable.create(1, 2, 3, 4)
          .product();

// root()
// 1, 2, 3, 4
Enumerable.create(1, 8, 27, 64)
          .root(3);

// round()
// -1, 23, 444, NaN, -334, 2, NaN
Enumerable.create(-1, 22.47, 444.0, undefined, -333.85, 1.5, true)
          .round();

// sin()
// 0.84, 0.91, 0.14
Enumerable.create(1, 2, 3)
          .sin();  // complement: arcSin()

// sinH()
// 1.18, 3.63, 10.02
Enumerable.create(1, 2, 3)
          .sinH();  // complement: arcSinH()

// sqrt()
// 1, 2, 3, 4
Enumerable.create(1, 4, 9, 16)
          .sqrt();

// sum()
// 10
Enumerable.create(1, 2, 3, 4)
          .sum();

// tan()
// 1.72, -1.76, -0.01
Enumerable.create(111, 222, 333)
          .tan();  // complement: arcTan()

// tanH()
// 0, 0.46, -0.76
Enumerable.create(0, 0.5, -1)
          .tanH();  // complement: arcTanH()
```

### More [[&uarr;](#examples-)]

#### assert [[&uarr;](#more-)]

```javascript
let seq1 = Enumerable.range(0, 10);
seq1.assert((x) => {
    return x % 2 !== 1;
});  // will throw an exception
     // at second element (1)

let seq2 = Enumerable.range(0, 10);
seq2.assertAll((x) => {
    return x % 2 !== 1;
});  // will throw an aggregated exception
     // at the end
     // for all odd values
```

#### chunk [[&uarr;](#more-)]

```javascript
let seq = Enumerable.range(0, 10);
for (let chunk of seq.chunk(3)) {
    // [0] => [0, 1, 2]
    // [1] => [3, 4, 5]
    // [2] => [6, 7, 8]
    // [3] => [9]
}
```

#### clone [[&uarr;](#more-)]

```javascript
let father = Enumerable.create(0, 1, 2);

// create 3 clones of 'father'
for (let child of father.clone(3)) {
    //TODO
}

// alt: father.clone().take(3)
```

#### concat / concatArray [[&uarr;](#more-)]

```javascript
// 0, 1, 2, 'PZ', 'TM', 'MK'
Enumerable.create(0, 1, 2)
          .concat(['PZ'], ['TM', 'MK']);  // alt: append()

// 0, 111, 222, 'pz', 'tm', 'mk'
Enumerable.create(0, 111, 222)
          .concatArray([ [ 'pz', 'tm' ], [ 'mk' ] ]);  // alt: appendArray()
```

#### consume [[&uarr;](#more-)]

```javascript
function createIteratorAndStorage(size) {
    let storage = [];

    return {
        iterator: makeIterator(size, storage),
        storage: storage,
    };
}

function *makeIterator(size, storage) {
    for (let i = 0; i < size; i++) {
        yield i;

        storage.push(i);
    }
}

const OBJ = createIteratorAndStorage(100);

const SEQ = Enumerable.from(OBJ.iterator);
SEQ.consume();  // enumerates the 'iterator' in OBJ
                // and fills the 'storage' in OBJ
```

#### defaultIfEmpty / defaultArrayIfEmpty [[&uarr;](#more-)]

```javascript
// 0, 1, 2
Enumerable.create(0, 1, 2)
          .defaultIfEmpty('PZ', 'TM', 'MK');
          
// 'PZ', 'TM', 'MK'
Enumerable.empty()
          .defaultIfEmpty('PZ', 'TM', 'MK');

// 0, 11, 22
Enumerable.create(0, 11, 22)
          .defaultArrayIfEmpty(['pz', 'tm', 'mk']);
// alt: defaultSequenceIfEmpty()

// 'pz', 'tm', 'mk'
Enumerable.empty()
          .defaultArrayIfEmpty(['pz', 'tm', 'mk']);
```

#### forAll [[&uarr;](#more-)]

```javascript
let arr = [];

try {
    // alt: eachAll()
    Enumerable.range(0, 5).forAll(x => {
        if (x % 2 === 0) {
            throw 'Error in value ' + x;
        }

        arr.push(x);
    });
}
catch (e) {
    // access the list of errors by
    // 'e.errors'

    // e.errors[0] = 'Error in value 0';
    // e.errors[1] = 'Error in value 2';
    // e.errors[2] = 'Error in value 3';
}

// arr[0] === 1
// arr[1] === 3
// arr[2] === 5
```

#### intersperse / intersperseArray [[&uarr;](#more-)]

```javascript
// 0, '-', 1, '-', 2
Enumerable.range(0, 3)
          .intersperse('-');

// -- or --
Enumerable.range(0, 3)
          .intersperseArray( ['-'] );
```

#### pipe [[&uarr;](#more-)]

```javascript
let arr1 = [];
let arr2 = [];

let seq = Enumerable.create(1, 2, 3).pipe((x) => {
    arr1.push(x * 10);
});
for (let item of seq) {
    arr2.push(item);
}

// arr1 = [10, 20, 30]
// arr2 = [1, 2, 3]
```

#### popFrom / shiftFrom [[&uarr;](#more-)]

```javascript
let arr1 = [ 11, 22, 33 ];
for (let item of Enumerable.popFrom(arr1)) {
    // [0] 33
    // [1] 22
    // [2] 11
}
// arr1 is empty now

let arr2 = [ 111, 222, 333 ];
for (let item of Enumerable.shiftFrom(arr2)) {
    // [0] 111
    // [1] 222
    // [2] 333
}
// arr2 is empty now
```

#### prepend / prependArray [[&uarr;](#more-)]

```javascript
// 'PZ', 'TM', 'MK', 0, 1, 2
Enumerable.create(0, 1, 2)
          .prepend(['PZ'], ['TM', 'MK']);

// 'pz', 'tm', 'mk', 0, 111, 222
Enumerable.create(0, 111, 222)
          .prependArray([ [ 'pz', 'tm' ], [ 'mk' ] ]);
```

#### pushTo [[&uarr;](#more-)]

```javascript
let arr = [];
Enumerable.create(0, 1, 2)
          .pushTo(arr);

// arr: [0, 1, 2]
```

#### random [[&uarr;](#more-)]

```javascript
for (let value of Enumerable.random(10)) {
    // 10 random numbers
    // between 0 and 1
}

for (let value of Enumerable.random(23979,
                                    v => v * 5979)) {
    // 23979 random numbers
    // between 0 and 5979
}
```

#### reset [[&uarr;](#more-)]

```javascript
let seq = Enumerable.create(0, 1, 2);

seq.each(x => {
             console.log(x);
         });

seq.reset()
   .each(x => {
             console.log(x * 2);
         });
```

#### trace [[&uarr;](#more-)]

```javascript
// write items via 'console.trace()'
Enumerable.create(0, 1, 2)
          .trace();

// with formatter
Enumerable.create(1.2, 2.3, 3.45)
          .trace(x => 'Item: ' + x);
```

## Documentation [[&uarr;](#table-of-contents)]

The API documentation can be found [here](https://mkloubert.github.io/node-enumerable/interfaces/_index_.enumerable.ienumerable.html).

## License [[&uarr;](#table-of-contents)]

[MIT license](https://raw.githubusercontent.com/mkloubert/node-enumerable/master/LICENSE)

## Tests [[&uarr;](#table-of-contents)]

Go to the module folder and run

```bash
tsc
npm test
```

to start unit tests from `test/` subfolder.
