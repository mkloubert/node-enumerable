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

import Enumerable = require('./index');


/**
 * Stores the "real" arguments for a *OrDefault() method.
 */
export interface IOrDefaultArgs<T, TDefault> {
    /**
     * The default value to use.
     */
    defaultValue?: TDefault;

    /**
     * The predicate to use.
     */
    predicate: Enumerable.Predciate<T>;
}


/**
 * Returns a value as function.
 * 
 * @param any v The value to convert. Can be a function or a string that is handled as lambda expression.
 * @param {Boolean} [throwException] Throw an exception if value is no valid function or not.
 * 
 * @throws Value is no valid function / lambda expression.
 * 
 * @return {Function} Value as function or (false) if value is invalid.
 * 
 * @throws Input value is invalid.
 */
export function asFunc(v: any, throwException: boolean = true): Function | boolean {
    if (typeof v === "function") {
        return v;
    }

    if (!v) {
        return v;
    }
    
    // now handle as lambda...

    let lambda = "" + v;
    
    let matches = lambda.match(/^(\s*)([\(]?)([^\)]*)([\)]?)(\s*)(=>)/m);
    if (matches) {
        if ((("" === matches[2]) && ("" !== matches[4])) ||
            (("" !== matches[2]) && ("" === matches[4]))) {
            
            if (throwException) {
                throw "Syntax error in '" + lambda + "' expression!";
            }
            
            return null;
        }
        
        let lambdaBody = lambda.substr(matches[0].length)
                               .replace(/^[\s|{|}]+|[\s|{|}]+$/g, '');  // trim
        
        if ("" !== lambdaBody) {
            if (';' !== lambdaBody.substr(-1)) {
                lambdaBody = 'return ' + lambdaBody + ';';
            }
        }
        
        let func: any;
        eval('func = function(' + matches[3] + ') { ' + lambdaBody + ' };');

        return func;
    }
    
    if (throwException) {
        throw "'" + v + "' is NO valid lambda expression!";
    }

    return false;
}

/**
 * Returns a value as "comparer".
 * 
 * @param {any} [val] The input value.
 * @param {any} [obj] The underlying object.
 * 
 * @return {Comparer<T>} The output value.
 * 
 * @throws val is invalid.
 */
export function toComparerSafe<T>(val?: any, obj?: any): Enumerable.Comparer<T> {
    let comparer = <Function>asFunc(val);
    if (comparer) {
        return function() {
            let sortValue = comparer.apply(obj, arguments);

            if (sortValue > 0) {
                return 1;
            }
            if (sortValue < 0) {
                return -1;
            }

            return 0;
        };
    }
    
    return function(x, y) {
        if (x < y) {
            return -1;
        }
        
        if (x > y) {
            return 1;
        }
        
        return 0;
    };
}

/**
 * Collects the "real" arguments for a *OrDefault() method.
 * 
 * @param {any} predicateOrDefaultValue The first argument of the method.
 * @param {TDefault} defaultValue The first argument of the method.
 * @param {number} argCount The number of submitted method arguments.
 * 
 * @return {IOrDefaultArgs<T, TDefault>} The collected data.
 */
export function toOrDefaultArgs<T, TDefault>(predicateOrDefaultValue: any, defaultValue: TDefault,
                                             argCount: number): IOrDefaultArgs<T, TDefault> {
    let predicate: any = predicateOrDefaultValue;
    let defVal: any = defaultValue;
    
    let func = asFunc(predicate, false);
    if (false === func) {
        if (1 === argCount) {
            defVal = predicate;
            predicate = null;
        }
    }

    return {
        predicate: toPredicateSafe(predicate, this),
        defaultValue: defVal,
    };
}

/**
 * Returns a value as "equality comparer".
 * 
 * @param {any} [val] The input value.
 * @param {any} [obj] The underlying object.
 * 
 * @return {EqualityComparer<T>} The output value.
 * 
 * @throws val is invalid.
 */
export function toEqualityComparerSafe<T>(val?: any, obj?: any): Enumerable.EqualityComparer<T> {
    if (true === val) {
        return (x, y) => x === y;
    }

    let func = <Function>asFunc(val);
    if (func) {
        return function() {
            return func.apply(obj, arguments) ? true : false;
        };
    }
    
    return (x, y) => x == y;
}

/**
 * Returns a value as "many item selector".
 * 
 * @param {any} [val] The input value.
 * @param {any} [obj] The underlying object.
 * 
 * @return {ManySelector<T, U>} The output value.
 * 
 * @throws val is invalid.
 */
export function toManySelectorSafe<T, U>(val?: any, obj?: any): Enumerable.ManySelector<T, U> {
    let selector = <Function>asFunc(val);
    if (selector) {
        let func = <Function>selector;

        return function() {
            return func.apply(obj, arguments);
        };
    }
    
    return (x: any) => [ x ];
}

/**
 * Returns a value as "predicate".
 * 
 * @param {any} [val] The input value.
 * @param {any} [obj] The underlying object.
 * 
 * @return {Predciate<T>} The output value.
 * 
 * @throws val is invalid.
 */
export function toPredicateSafe<T>(val?: any, obj?: any): Enumerable.Predciate<T> {
    let predicate = <Function>asFunc(val);
    if (predicate) {
        let func = <Function>predicate;

        return function() {
            return func.apply(obj, arguments) ? true : false;
        };
    }
    
    return () => true;
}

/**
 * Returns a value as "item selector".
 * 
 * @param {any} [val] The input value.
 * @param {any} [obj] The underlying object.
 * 
 * @return {Selector<T, U>} The output value.
 * 
 * @throws val is invalid.
 */
export function toSelectorSafe<T, U>(val?: any, obj?: any): Enumerable.Selector<T, U> {
    let selector = <Function>asFunc(val);
    if (selector) {
        let func = <Function>selector;

        return function() {
            return func.apply(obj, arguments);
        };
    }
    
    return (x: any) => x;
}

/**
 * Returns a value as "zippper".
 * 
 * @param {any} [val] The input value.
 * @param {any} [obj] The underlying object.
 * 
 * @return {Zipper<T, U, V>} The output value.
 * 
 * @throws val is invalid.
 */
export function toZipperSafe<T, U, V>(val?: any, obj?: any): Enumerable.Zipper<T, U, V> {
    let selector = <Function>asFunc(val);
    if (selector) {
        let func = <Function>selector;

        return function() {
            return func.apply(obj, arguments);
        };
    }
    
    return (item1: any, item2: any) => item1 + item2;
}
