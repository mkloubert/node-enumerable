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
 * Compares to values.
 * 
 * @param {T} x The "left" value.
 * @param {U} y The "right" value.
 * 
 * @return {number} The "sort" value.
 */
export type Comparer<T, U = T> = (x: T, y: U) => number;
/**
 * Checks if two values are equal.
 * 
 * @param {T} x The "left" value.
 * @param {U} y The "right" value.
 * 
 * @return {boolean} Are equal or not.
 */
export type EqualityComparer<T, U = T> = (x: T, y: U) => boolean;
/**
 * A predicate / condition.
 * 
 * @param {T} The item to check.
 * 
 * @return {boolean} Item satisfies the condition or not.
 */
export type Predicate<T> = (item: T) => boolean;
/**
 * A selector.
 * 
 * @param {T} item The source item.
 * 
 * @return {U} The new item.
 */
export type Selector<T, U> = (item: T) => U;
/**
 * Possible sequence types.
 */
export type Sequence<T> = ArrayLike<T> | Iterable<T> | Iterator<T> | IArguments;


/**
 * Indicates that something is empty.
 */
export const IS_EMPTY = Symbol('IS_EMPTY');
/**
 * Indicates if something was not found.
 */
export const NOT_FOUND = Symbol('NOT_FOUND');

/**
 * A sequence.
 */
export interface IEnumerable<T> extends Iterable<T>, Iterator<T> {
    /**
     * Applies an accumulator function over that sequence.
     * If specified 'seed' is used as the initial accumulator value,
     * and (if specified) the 'resultSelector' is used to select the result value.
     * 
     * @template TAccumulate The type of the accumulator value.
     * @template TResult The result type.
     * 
     * @param {(acc: TAccumulate, item: T) => TAccumulate} func An accumulator function to be invoked on each element.
     * @param {TAccumulate} [seed] The initial accumulator value.
     * @param {(acc: TAccumulate) => TResult} [resultSelector] A function to transform the final accumulator value
     *                                                         into the result value.
     * 
     * @returns {TResult} The final value.
     */
    aggregate<TAccumulate = T, TResult = T>(func: (accumulator: TAccumulate, item: T) => TAccumulate,
                                            seed?: TAccumulate,
                                            resultSelector?: (accumulator: TAccumulate) => TResult): TResult;

    /**
     * Checks if all elements of that sequence
     * satisfy a condition or not.
     * 
     * @param {Predicate<T>} predicate The condition.
     *  
     * @returns {boolean} All elements satisfy the condition or not.
     */
    all(predicate: Predicate<T>): boolean;

    /**
     * Checks if at least one element of that sequence
     * satisfies a condition or not.
     * 
     * @param {Predicate<T>} predicate The condition.
     *  
     * @returns {boolean} One element satisfies the condition or not.
     */
    any(predicate?: Predicate<T>): boolean;

    /**
     * Calculates the average of the items of that sequence.
     * 
     * @param {Selector<T, number>} [selector] The custom selector to use.
     * 
     * @returns {number|Symbol} The average or IS_EMPTY if sequence is empty.
     */
    average(selector?: Selector<T, number>): number | Symbol;

    /**
     * Gets if that sequence can be resetted or not.
     */
    readonly canReset: boolean;

    /**
     * Returns a "casted" version of that sequence.
     * 
     * @template U The target type.
     * 
     * @returns {IEnumerable<U>} The "casted" sequence.
     */
    cast<U>(): IEnumerable<U>;

    /**
     * Concats the items of that sequences with other ones
     * to a new sequence.
     * 
     * @param {...Sequence<T>[]} args The other sequences.
     * 
     * @memberof IEnumerable<T> The concated sequence.
     */
    concat(...args: Sequence<T>[]): IEnumerable<T>;

    /**
     * Concats the items of that sequences with other ones
     * to a new sequence.
     * 
     * @param {...Sequence<T>[]} sequences The other sequences.
     * 
     * @memberof IEnumerable<T> The concated sequence.
     */
    concatArray(sequences: ArrayLike<Sequence<T>>): IEnumerable<T>;

    /**
     * Checks if that sequence contains an item.
     * 
     * @template U Type of the item to search for.
     * 
     * @param {U} item The item to search for.
     * @param {(EqualityComparer<T, U>|true)} [comparer] The custom equality comparer to use.
     *                                                               (true) indicates to do a === check.
     * 
     * @returns {boolean} Sequence contains item or not.
     */
    contains<U>(item: U,
                comparer?: EqualityComparer<T, U> | true): boolean;

    /**
     * Counts the elements of that sequence.
     * 
     * @param {Predicate<T>} [predicate] The optional predicate to use.
     * 
     * @returns {number} The number of (matching) items.
     */
    count(predicate?: Predicate<T>): number;

    /**
     * Returns the items of that sequence or a default item list
     * if that sequence is empty.
     * 
     * @param {...T[]} defaultItems The default items.
     * 
     * @returns {IEnumerable<T>} The (new) sequence.
     */
    defaultIfEmpty(...defaultItems: T[]): IEnumerable<T>;

    /**
     * Returns the items of that sequence or a default item list
     * if that sequence is empty.
     * 
     * @param {Sequence<T>} defaultSequence The default items.
     * 
     * @returns {IEnumerable<T>} The (new) sequence.
     */
    defaultSequenceIfEmpty(defaultSequence: Sequence<T>): IEnumerable<T>;

    /**
     * Removes duplicate entries from that sequence.
     * 
     * @param {EqualityComparer<T>} [comparer] The custom equality comparer to use.
     * 
     * @returns {IEnumerable<T>} The new sequence.
     */
    distinct(comparer?: EqualityComparer<T> | true): IEnumerable<T>;

    /**
     * Alias for forEach()
     */
    each<TResult = any>(func: (item: T, index: number) => TResult,
                        seed?: TResult): TResult | Symbol;

    /**
     * Returns an element at a specific index.
     * 
     * @param {number} index The zero based index.
     * 
     * @returns {T} The element.
     * 
     * @throws Element not found.
     */
    elementAt(index: number): T;

    /**
     * Returns an element at a specific index.
     * 
     * @template U Type of the default value.
     * 
     * @param {number} index The zero based index
     * @param {U} [defaultValue] The default value. Default: NOT_FOUND
     * 
     * @returns {T|U} The element.
     * 
     * @throws Element not found.
     */
    elementAtOrDefault<U = Symbol>(index: number,
                                   defaultValue?: U): T | U;

    //TODO: except()

    /**
     * Invokes a function for each element of that sequence.
     * 
     * @template TResult Type of the result.
     * 
     * @param {(item: T, index: number) => TResult} func The function to invoke.
     * @param {TResult} [seed] The seed value for the result. Default: IS_EMPTY
     * 
     * @returns {(TResult|Symbol)} The result of the last action.
     */
    forEach<TResult = any>(func: (item: T, index: number) => TResult,
                           seed?: TResult): TResult | Symbol;

    //TODO: first()
    //TODO: firstOrDefault()
    //TODO: groupBy()
    //TODO: groupJoin()

    /**
     * Returns the zero based index of the first occurrence of an item.
     * 
     * @template U Type of the item to search for.
     * 
     * @param {U} item The item to search for.
     * @param {(EqualityComparer<T, U>|true)} [comparer] The custom equality comparer to use.
     *                                                               (true) indicates to do a === check.
     * 
     * @returns {number} The index or -1 if not found.
     */
    indexOf<U>(item: U,
               comparer?: EqualityComparer<T, U> | true): number;

    //TODO: intersect()
    //TODO: join()

    /**
     * Returns the zero based index of the last occurrence of an item.
     * 
     * @template U Type of the item to search for.
     * 
     * @param {U} item The item to search for.
     * @param {(EqualityComparer<T, U>|true)} [comparer] The custom equality comparer to use.
     *                                                               (true) indicates to do a === check.
     * 
     * @returns {number} The index or -1 if not found.
     */
    lastIndexOf<U>(item: U,
                   comparer?: EqualityComparer<T, U> | true): number;

    //TODO: last()
    //TODO: lastOrDefault()

    /**
     * Returns a resettable version of that sequence.
     * 
     * @returns {IEnumerable<T>} The resettable version of that sequence.
     */
    makeResettable(): IEnumerable<T>;

    /**
     * Returns the maximum item of that sequence.
     * 
     * @param {Comparer<T>} [comparer] The custom comparer to use.
     * 
     * @returns {T|Symbol} The item or IS_EMPTY if that sequence is empty.
     */
    max(comparer?: Comparer<T>): T | Symbol;

    /**
     * Returns the minimum item of that sequence.
     * 
     * @param {Comparer<T>} [comparer] The custom comparer to use.
     * 
     * @returns {T|Symbol} The item or IS_EMPTY if that sequence is empty.
     */
    min(comparer?: Comparer<T>): T | Symbol;

    /**
     * Removes empty items.
     * 
     * @returns {IEnumerable<T>} The filtered sequence.
     */
    notEmpty(): IEnumerable<T>;

    /**
     * Filters items of specific type.
     * 
     * @template U The type of the target sequence.
     * 
     * @param {string} type The type.
     * 
     * @returns {IEnumerable<U>} The filtered sequence.
     */
    ofType<U = any>(type: string): IEnumerable<U>;

    /**
     * Calculates the product of that sequence.
     * 
     * @returns {(T | Symbol)} The product or IS_EMPTY if that sequence is empty.
     */
    product(seed?: T): T | Symbol;

    //TODO: orderBy()
    //TODO: orderByDescending()

    /**
     * Returns that sequence.
     * 
     * @returns {this} 
     * 
     * @throws Not supported
     */
    reset(): this;

    //TODO: reverse()

    /**
     * Projects the items of that sequence to new values / objects.
     * 
     * @template U The type of the new items.
     * 
     * @param {Selector<T, U>} selector 
     * 
     * @returns {IEnumerable<U>} The new sequence.
     */
    select<U>(selector: Selector<T, U>): IEnumerable<U>;

    /**
     * Projects the items of that sequence to new sequences
     * that are flatten to a single sequence.
     * 
     * @template U Type of the items of the result sequences.
     * 
     * @param {Selector<T, Sequence<U>>} selector The selector.
     * 
     * @returns {IEnumerable<U>} The new, flatten sequence.
     */
    selectMany<U>(selector: Selector<T, Sequence<U>>): IEnumerable<U>;

    //TODO: sequenceEqual()
    //TODO: single()
    //TODO: singleOrDefault()
    
    /**
     * Skips a maximum number of items.
     * 
     * @param {number} [count] The number of items to skip. Default: 1
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    skip(count?: number): IEnumerable<T>;

    /**
     * Skips items while a condition satisfies.
     * 
     * @param {Predicate<T>} [predicate] The predicate to use.
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    skipWhile(predicate: Predicate<T>): IEnumerable<T>;

    /**
     * Calculates the sum of that sequence.
     * 
     * @returns {(T | Symbol)} The sum or IS_EMPTY if that sequence is empty.
     */
    sum(seed?: T): T | Symbol;

    /**
     * Takes a maximum number of items.
     * 
     * @param {number} [count] The maximum number of items. Default: 1
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    take(count?: number): IEnumerable<T>;

    /**
     * Takes items while a condition satisfies.
     * 
     * @param {Predicate<T>} [predicate] The predicate to use.
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    takeWhile(predicate: Predicate<T>): IEnumerable<T>;

    /**
     * Creates a new array of the sequence of that items.
     * 
     * @returns {T[]} The sequence as array.
     */
    toArray(): T[];

    //TODO: toList()
    //TODO: toDictionary()
    //TODO: toLookup()

    /**
     * Produces the union of that sequence and another.
     * 
     * @param {Sequence<T>} second The other sequence.
     * @param {EqualityComparer<T>} [comparer] The optional equality comparer to use.
     * 
     * @returns {IEnumerable<T>} The new sequence.
     */
    union(second: Sequence<T>,
          comparer?: EqualityComparer<T>): IEnumerable<T>;

    /**
     * Filters the items of that sequence.
     * 
     * @param {Predicate<T>} predicate The predicate to use.
     * 
     * @return {IEnumerable<T>} The filtered sequence.
     */
    where(predicate: Predicate<T>): IEnumerable<T>;

    /**
     * Applies a specified function to the corresponding elements of that sequence
     * and another, producing a sequence of the results.
     * 
     * @template U Type of the other sequence.
     * @template TResult The result type.
     * 
     * @param {Sequence<U>} second The other sequence.
     * @param {(x: T, y: U, index: number) => TResult} resultSelector The selector for the result item.
     * 
     * @returns {IEnumerable<TResult>} The "zipped" sequence.
     */
    zip<U, TResult>(second: Sequence<U>,
                    resultSelector: (x: T, y: U, index: number) => TResult): IEnumerable<TResult>;
}

/**
 * A basic sequence.
 */
export abstract class EnumerableBase<T> implements IEnumerable<T> {
    /**
     * Stores the current index.
     */
    protected _index = -1;
    
    /** @inheritdoc */
    public [Symbol.iterator](): Iterator<T> {
        return this;
    }

    /** @inheritdoc */
    public aggregate<TAccumulate = T, TResult = T>(func: (accumulator: TAccumulate, item: T) => TAccumulate,
                                                   seed?: TAccumulate,
                                                   resultSelector?: (accumulator: TAccumulate) => TResult): TResult {
        if (!func) {
            func = (acc, item) => <any>acc + <any>item;
        }

        if (!resultSelector) {
            resultSelector = (acc) => <any>acc;
        }

        let acc = seed;
        for (let item of this) {
            acc = func(acc, item);
        }

        return resultSelector(acc);
    }

    /** @inheritdoc */
    public all(predicate: Predicate<T>): boolean {
        predicate = toPredicateSafe(predicate);

        for (let item of this) {
            if (!predicate(item)) {
                return false;
            }
        }

        return true;
    }

    /** @inheritdoc */
    public any(predicate?: Predicate<T>): boolean {
        predicate = toPredicateSafe(predicate);

        for (let item of this) {
            if (predicate(item)) {
                return true;
            }
        }

        return false;
    }

    /** @inheritdoc */
    public average(selector?: Selector<T, number>): number | Symbol {
        if (!selector) {
            selector = (i) => <any>i;
        }

        let count = 0;
        let sum = 0.0;
        for (let n of this.select(selector)) {
            if (!isNullOrUndefined(n)) {
                if ('number' !== typeof n) {
                    n = parseFloat( toStringSafe(n).trim() );
                }
            }

            ++count;
            sum += n;
        }

        return count > 0 ? (sum / count)
                         : IS_EMPTY;
    }

    /** @inheritdoc */
    public get canReset(): boolean {
        return true;
    }

    /** @inheritdoc */
    public cast<U>(): IEnumerable<U> {
        return this.select(x => <U><any>x);
    }

    /** @inheritdoc */
    public concat(...args: Sequence<T>[]): IEnumerable<T> {
        return this.concatArray(args);
    }

    /** @inheritdoc */
    public contains<U>(item: U,
                       comparer?: EqualityComparer<T, U> | true): boolean {
        return this.indexOf<U>(item, comparer) > -1;
    }

    /** @inheritdoc */
    public concatArray(sequences: ArrayLike<Sequence<T>>): IEnumerable<T> {
        return from(this.concatArrayInner(sequences));
    }

    /**
     * @see concatArray()
     */
    protected *concatArrayInner(sequences: ArrayLike<Sequence<T>>): IterableIterator<T> {
        for (let item of this) {
            yield item;
        }

        if (sequences) {
            for (let i = 0; i < sequences.length; i++) {
                let seq = sequences[i];

                for (let item of from(seq)) {
                    yield item;
                }
            }
        }
    }

    /** @inheritdoc */
    public count(predicate?: Predicate<T>): number {
        predicate = toPredicateSafe(predicate);
        
        let cnt = 0;
        for (let item of this) {
            if (predicate(item)) {
                ++cnt;
            }
        }

        return cnt;
    }

    /** @inheritdoc */
    public defaultIfEmpty(...defaultItems: T[]): IEnumerable<T> {
        return from(this.defaultIfEmptyInner(defaultItems));
    }

    /**
     * @see defaultIfEmpty()
     */
    protected *defaultIfEmptyInner(defaultItems: T[]) {
        let hasItems = false;
        for (let item of this) {
            hasItems = true;
            yield item;
        }

        if (!hasItems && defaultItems) {
            for (let item of defaultItems) {
                yield item;
            }
        }
    }

    /** @inheritdoc */
    public defaultSequenceIfEmpty(defaultSequence: Sequence<T>): IEnumerable<T> {
        return from(this.defaultSequenceIfEmptyInner(defaultSequence));
    }

    /**
     * @see defaultIfEmpty()
     */
    protected *defaultSequenceIfEmptyInner(defaultSequence: Sequence<T>) {
        let hasItems = false;
        for (let item of this) {
            hasItems = true;
            yield item;
        }

        if (!hasItems) {
            for (let item of from(defaultSequence)) {
                yield item;
            }
        }
    }

    /** @inheritdoc */
    public distinct(comparer?: EqualityComparer<T> | true): IEnumerable<T> {
        comparer = toEqualityComparerSafe(comparer);

        return from(this.distinctInner(comparer));
    }

    /**
     * @see distinct()
     */
    protected *distinctInner(comparer: EqualityComparer<T>) {
        let temp: T[] = [];
        
        for (let item of this) {
            let found = false;
            for (let t of temp) {
                if (comparer(item, t)) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                temp.push(item);
                yield item;
            }
        }
    }

    /** @inheritdoc */
    public each<TResult = any>(func: (item: T, index: number) => TResult,
                               seed?: TResult): TResult | Symbol {
        return this.forEach
                   .apply(this, arguments);
    }

    /** @inheritdoc */
    public elementAt(index: number): T {
        const ELEMENT_NOT_FOUND = Symbol('ELEMENT_NOT_FOUND');

        let item = this.elementAtOrDefault(index,
                                           ELEMENT_NOT_FOUND);

        if (ELEMENT_NOT_FOUND === item) {
            throw "Element not found";
        }

        return <T>item;
    }

    /** @inheritdoc */
    public elementAtOrDefault<U = Symbol>(index: number,
                                          defaultValue?: U): T | Symbol {
        index = parseInt(toStringSafe(index).trim());

        if (arguments.length < 2) {
            defaultValue = <any>NOT_FOUND;
        }
        
        let i = -1;
        for (let item of this) {
            if (++i === index) {
                return item;
            }
        }
        
        return <any>defaultValue;
    }

    /** @inheritdoc */
    public forEach<TResult = any>(func: (item: T, index: number) => TResult,
                                  seed?: TResult): TResult | Symbol {
        let result: TResult | Symbol = IS_EMPTY;
        if (arguments.length > 1) {
            result = seed;
        }

        let i = -1;
        for (let item of this) {
            ++i;
            
            let funcResult: TResult;
            if (func) {
                funcResult = func(item, i);
            }
        }

        return result;
    }

    /** @inheritdoc */
    public indexOf<U>(item: U,
                      comparer?: EqualityComparer<T, U> | true): number {
        let index = -1;

        comparer = toEqualityComparerSafe(comparer);
        for (let thisItem of this) {
            ++index;

            if (comparer(thisItem, item)) {
                return index;
            }
        }

        return -1;
    }

    /** @inheritdoc */
    public lastIndexOf<U>(item: U,
                          comparer?: EqualityComparer<T, U> | true): number {
        let index = -1;
        let lastIndex = -1;

        comparer = toEqualityComparerSafe(comparer);
        for (let thisItem of this) {
            ++index;

            if (comparer(thisItem, item)) {
                lastIndex = index;
            }
        }

        return lastIndex;
    }

    /** @inheritdoc */
    public makeResettable(): IEnumerable<T> {
        if (this.canReset) {
            return this;
        }

        return from(this.toArray());
    }

    /** @inheritdoc */
    public max(comparer?: Comparer<T>): T | Symbol {
        comparer = toComparerSafe(comparer);

        const IS_FIRST = Symbol('IS_FIRST');
        let result: any = IS_EMPTY;

        for (let item of this) {
            if (result !== IS_FIRST) {
                if (comparer(item, result) > 0) {
                    result = item;
                }
            }
            else {
                result = item;
            }
        }

        return result;
    }

    /** @inheritdoc */
    public min(comparer?: Comparer<T>): T | Symbol {
        comparer = toComparerSafe(comparer);
        
        const IS_FIRST = Symbol('IS_FIRST');
        let result: any = IS_EMPTY;

        for (let item of this) {
            if (result !== IS_FIRST) {
                if (comparer(item, result) < 0) {
                    result = item;
                }
            }
            else {
                result = item;
            }
        }

        return result;
    }

    /** @inheritdoc */
    public abstract next(value?: any): IteratorResult<T>;

    /** @inheritdoc */
    public notEmpty(): IEnumerable<T> {
        return this.where(x => !!x);
    }

    /** @inheritdoc */
    public ofType<U = any>(type: string): IEnumerable<U> {
        type = toStringSafe(type).trim();

        return this.where(x => {
            return type.toLowerCase() === typeof x ||
                   '' === type;
        }).select(x => <any>x);
    }

    /** @inheritdoc */
    public product(): T | Symbol {
        return this.aggregate((acc, x) => IS_EMPTY !== acc ? (acc * <any>x) : x,
                              <any>IS_EMPTY);
    }

    /** @inheritdoc */
    public reset(): this {
        throw 'Not supported';
    }

    /** @inheritdoc */
    public select<U>(selector: Selector<T, U>): IEnumerable<U> {
        if (!selector) {
            selector = (x) => <any>x;
        }

        return this.selectMany(x => {
            return [ selector(x) ];
        });
    }

    /** @inheritdoc */
    public selectMany<U>(selector: Selector<T, Sequence<U>>): IEnumerable<U> {
        return from(this.selectManyInner(selector));
    }

    /**
     * @see selectMany()
     */
    protected *selectManyInner<U>(selector: Selector<T, Sequence<U>>): IterableIterator<U> {
        if (!selector) {
            selector = (x) => [ <any>x ];
        }

        for (let s of this) {
            let seq = from(selector(s));

            for (let item of seq) {
                yield item;
            }
        }
    }

    /** @inheritdoc */
    public skip(count?: number): IEnumerable<T> {
        count = parseInt(toStringSafe(count).trim());
        if (isNaN(count)) {
            count = 1;
        }

        return this.skipWhile(() => {
            return count-- > 0;
        });
    }

    /** @inheritdoc */
    public skipWhile(predicate: Predicate<T>): IEnumerable<T> {
        return from(this.skipWhileInner(predicate));
    }

    /**
     * @see takeWhile()
     */
    protected *skipWhileInner(predicate: Predicate<T>) {
        predicate = toPredicateSafe(predicate);

        let returnItem = false;
        for (let item of this) {
            if (!returnItem && !predicate(item)) {
                returnItem = true;
            }
            
            if (returnItem) {
                yield item;
            }
        }
    }

    /** @inheritdoc */
    public sum(): T | Symbol {
        return this.aggregate((acc, x) => IS_EMPTY !== acc ? (acc + x) : x,
                              <any>IS_EMPTY);
    }

    /** @inheritdoc */
    public take(count?: number): IEnumerable<T> {
        count = parseInt(toStringSafe(count).trim());
        if (isNaN(count)) {
            count = 1;
        }

        return this.takeWhile(() => {
            return count-- > 0;
        });
    }

    /** @inheritdoc */
    public takeWhile(predicate: Predicate<T>): IEnumerable<T> {
        return from(this.takeWhileInner(predicate));
    }

    /**
     * @see takeWhile()
     */
    protected *takeWhileInner(predicate: Predicate<T>) {
        predicate = toPredicateSafe(predicate);

        for (let item of this) {
            if (predicate(item)) {
                yield item;
            }
            else {
                break;
            }
        }
    }

    /** @inheritdoc */
    public toArray(): T[] {
        let arr: T[] = [];
        for (let i of this) {
            arr.push(i);
        }

        return arr;
    }

    /** @inheritdoc */
    public union(second: Sequence<T>,
                 comparer?: EqualityComparer<T>): IEnumerable<T> {
        return this.concat(second)
                   .distinct(comparer);
    }

    /** @inheritdoc */
    public where(predicate: Predicate<T>): IEnumerable<T> {
        return from(this.whereInner(predicate));
    }

    /**
     * @see where()
     */
    protected *whereInner(predicate: Predicate<T>): IterableIterator<T> {
        predicate = toPredicateSafe(predicate);

        for (let item of this) {
            if (predicate(item)) {
                yield item;
            }
        }
    }

    /** @inheritdoc */
    public zip<U, TResult>(second: Sequence<U>,
                           resultSelector: (x: T, y: U) => TResult): IEnumerable<TResult> {
        return from(this.zipInner(from(second),
                                  resultSelector));
    }

    /**
     * @see zip()
     */
    protected *zipInner<U, TResult>(second: Iterator<U>,
                                    resultSelector: (x: T, y: U, index: number) => TResult) {
        if (!resultSelector) {
            resultSelector = (x: any, y: any) => x + y;
        }

        let i = -1;
        do
        {
            let itemThis = this.next();
            if (!itemThis || itemThis.done) {
                break;
            }

            let itemSecond = second.next();
            if (!itemSecond || itemSecond.done) {
                break;
            }

            yield resultSelector(itemThis.value, itemSecond.value,
                                 ++i);
        }
        while (true);
    }
}

/**
 * A sequence based on an Iterator<T>.
 */
export class IteratorEnumerable<T> extends EnumerableBase<T> {
    /**
     * Stores the inner iterator.
     */
    protected _iterator: Iterator<T>;
    
    /**
     * Initializes a new instance of that class.
     * 
     * @param {Iterator<T>} [iterator] The underlying iterator.
     */
    constructor(iterator?: Iterator<T>) {
        super();

        this._iterator = iterator;
        if (isNullOrUndefined(this._iterator)) {
            this._iterator = emptyIterator();
        }
    }

    /** @inheritdoc */
    public next(value?: any): IteratorResult<T> {
        let result = this._iterator.next(value);
        if (!result) {
            result = {
                value: undefined,
                done: true,
            };
        }

        if (!result.done) {
            ++this._index;
        }

        return result;
    }
}

/**
 * A sequence based on an array.
 */
export class ArrayEnumerable<T> extends EnumerableBase<T> {
    /**
     * Stores the underlying array.
     */
    protected _array: ArrayLike<T>;
    
    /**
     * Initializes a new instance of that class.
     * 
     * @param {ArrayLike<T>} [arr] The underlying array.
     */
    constructor(arr?: ArrayLike<T>) {
        super();

        this._array = arr;
        if (isNullOrUndefined(this._array)) {
            this._array = [];
        }
    }

    /** @inheritdoc */
    public get canReset(): boolean {
        return true;
    }

    /** @inheritdoc */
    public next(): IteratorResult<T> {
        let nextIndex = this._index + 1;
        if (nextIndex >= this._array.length) {
            return {
                done: true,
                value: undefined,
            };
        }

        this._index = nextIndex;
        return {
            value: this._array[nextIndex],
            done: false,
        };
    }

    /** @inheritdoc */
    public reset(): this {
        if (this.canReset) {
            this._index = -1;
        }
        else {
            return super.reset();
        }

        return this;
    }
}

/**
 * Creates a new sequence from a list of items.
 * 
 * @template T Type of the items.
 * 
 * @param {...T[]} items The items for the sequence. 
 * 
 * @returns {IEnumerable<T>} The new sequence.
 */
export function create<T = any>(...items: T[]): IEnumerable<T> {
    return from(items);
}

/**
 * Creates an empty sequence.
 * 
 * @template T The type of the sequence.
 * 
 * @returns {IEnumerable<T>} The new, empty sequence.
 */
export function empty<T = any>(): IEnumerable<T> {
    return from(emptyIterator());
}

/**
 * Creates a new sequence.
 * 
 * @param {Sequence<T>} seq The input data.
 * 
 * @return {IEnumerable<T>} The new sequence.
 */
export function from<T>(seq?: Sequence<T>): IEnumerable<T> {
    if (isNullOrUndefined(seq)) {
        seq = [];
    }

    if (Array.isArray(seq)) {
        return new ArrayEnumerable<T>(seq);
    }

    if ('string' === typeof seq) {
        return <any>fromString(seq);
    }

    return new IteratorEnumerable<T>(<Iterator<T>>seq);
}

/**
 * Creates a new sequence from the string representation of a value.
 * 
 * @param {any} val The value.
 * 
 * @return {IEnumerable<string>} The new sequence.
 */
export function fromString(val: any): IEnumerable<string> {
    if (isNullOrUndefined(val)) {
        val = '';
    }
    val = '' + val;

    return new ArrayEnumerable<string>(val.split(''));
}

export function range(start: number, count?: number): IEnumerable<number> {
    start = parseFloat(toStringSafe(start).trim());
    if (isNaN(start)) {
        start = 0;
    }

    count = parseInt(toStringSafe(count).trim());

    return from( rangeInner(start, count) );
}

function *rangeInner(start: number, count: number) {
    let current = start;
    while (true) {
        if (!isNaN(count)) {
            if (count < 1) {
                break;
            }
            else {
                --count;
            }
        }

        yield current++;
    }
}


function asArray<T>(arr: ArrayLike<T>): T[] {
    if (!arr) {
        return <any>arr;
    }

    if (Array.isArray(arr)) {
        return arr;
    }

    let newArray: T[] = [];
    for (let i = 0; i < arr.length; i++) {
        newArray.push(arr[i]);
    }

    return newArray;
}

function *emptyIterator() {
    while (<any>false) {
        yield <any>undefined;
    }
}

function isNullOrUndefined(val: any): boolean {
    return null === val ||
           'undefined' === typeof val;
}

function toComparerSafe<T, U>(comparer: Comparer<T, U>): Comparer<T, U> {
    if (!comparer) {
        comparer = (x: any, y: any) => {
            if (x === y) {
                return 0;
            }

            if (x < y) {
                return -1;
            }

            if (x > y) {
                return 1;
            }
            
            return 0;
        };
    }

    return comparer;
}

function toEqualityComparerSafe<T, U>(comparer: EqualityComparer<T, U> | true): EqualityComparer<T, U> {
    if (!comparer) {
        comparer = (x: any, y: any) => x == y; 
    }
    else if (true === comparer) {
        comparer = (x: any, y: any) => x === y;
    }

    return comparer;
}

function toPredicateSafe<T>(predicate: Predicate<T> | boolean, defaultValue = true): Predicate<T> {
    if (isNullOrUndefined(predicate)) {
        predicate = () => !!defaultValue;
    }

    if ('function' !== typeof predicate) {
        let result = !!predicate;
        
        predicate = () => result;
    }

    return predicate;
}

function toStringSafe(val: any): string {
    if (isNullOrUndefined(val)) {
        val = '';
    }

    return '' + val;
}
