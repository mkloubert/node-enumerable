# node-enumerable

[ES6](https://en.wikipedia.org/wiki/ECMAScript#6th_Edition_-_ECMAScript_2015) ready [LINQ](https://en.wikipedia.org/wiki/Language_Integrated_Query) library written in [TypeScript](https://www.typescriptlang.org/).

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=9BX9ZJCAJHQ8U) [![](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?fid=o62pkd&url=https%3A%2F%2Fgithub.com%2Fmkloubert%2Fnode-enumerable)

## License

[MIT license](https://raw.githubusercontent.com/mkloubert/node-enumerable/master/LICENSE)

## Installation

Run

```bash
npm install node-enumerable --save
```

inside project folder to install the module.

## Documentation

The API documentation can be found [here](https://mkloubert.github.io/node-enumerable/).

## Usage

### Create a sequence

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

// range of numbers: 2, 3, 4, 5, 6
let seq4 = Enumerable.range(2, 5);

// 5979 'TM' strings
let seq5 = Enumerable.repeat('TM', 5979);

// build using factory function
let seq6 = Enumerable.build((cancel, index) => {
    if (index < 5) {
        return 'item_' + (index + 1);
    }
    else {
        cancel();  // we tell that we
                   // want to cancel here
    }
});

// create empty sequence
let seq7 = Enumerable.empty();
```

### Work with them

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

#### Async operations

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
}).catch(() => {
    console.log('One action failed: ' + err);
});
```

Most methods are chainable as in [.NET](https://en.wikipedia.org/wiki/.NET_Framework) context.

## Examples

```javascript
// distinct()
// 1, 2, 4, 3
Enumerable.create(1, 2, 4, 2, 3)
          .distinct();
 
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

### Sort elements

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
```

### Take / skip elements

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

### Get one element

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

### Accumulators

```typescript
// aggregate()
// "Marcel Joachim Kloubert"
Enumerable.create('Marcel', 'Joachim', 'Kloubert')
          .aggregate((accumulator, item) => {
                         return accumulator += ' ' + x;
                     }, '');

// average()
// 2.5
Enumerable.create(1, 2, 3, 4)
          .average();

// "M., Tanja"
Enumerable.create('M.', 'Tanja')
          .joinToString(', ');

// product()
// 24
Enumerable.create(1, 2, 3, 4)
          .product();

// sum()
// 10
Enumerable.create(1, 2, 3, 4)
          .sum();
```

### Minimum / maximum values

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

### Joins

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

### Groupings

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

### Projection

```javascript
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

### Checks / conditions

```javascript
// all()
// (false)
Enumerable.create(1, 2, '3', 4)
          .all((x) => typeof x !== "string");
          
// contains()
// (true)
Enumerable.create(1, 2, '3')
          .contains(3);

// any()
// (true)
Enumerable.create(1, 2, '3', 4)
          .any((x) => typeof x === "string");
 
// sequenceEqual()
// (false)         
Enumerable.create(1, 2, 3)
          .sequenceEqual([1, 3, 2]);
```

### Conversions

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

### Count

```javascript
// 3
Enumerable.create(0, 1, 2)
          .count();
          
// 2
Enumerable.create(0, 1, 2)
          .count((x) => x > 0);
```

### More

#### concat

```javascript
// 0, 1, 2, 'PZ', 'TM', 'MK'
Enumerable.create(0, 1, 2)
          .concat(['PZ', 'TM', 'MK']);
```

#### defaultIfEmpty

```javascript
// 0, 1, 2
Enumerable.create(0, 1, 2)
          .defaultIfEmpty('PZ', 'TM', 'MK');
          
// 'PZ', 'TM', 'MK'
Enumerable.create()
          .defaultIfEmpty('PZ', 'TM', 'MK');
```

#### reset

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

## Tests

Go to the module folder and run

```bash
npm test
```

to start unit tests from `test/` subfolder.
