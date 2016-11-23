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

import Helpers = require('./helpers');


/**
 * Describes a function that aggregates items to one value.
 * 
 * @param {any} result The current result value.
 * @param {T} item The current item.
 * @param {IItemContext<T>} ctx The item context.
 * 
 * @return {U} The new aggregated value.
 */
export type Aggregator<T, U> = (result: any, item: T, ctx: IItemContext<T>) => U;
/**
 * Describes an action.
 * 
 * @param {T} item The underlying item.
 * @param {IItemContext<T>} ctx The context.
 */
export type Action<T> = (item: T, ctx: IItemContext<T>) => void;
/**
 * Describes a function for sorting elements.
 * 
 * @param {T} x The current / left item.
 * @param {any} y The other / right item.
 * 
 * @return {number} The sort value.
 */
export type Comparer<T> = (x: T, y: any) => number;
/**
 * Describes a predicate that checks for the equality of two items.
 * 
 * @param {T} x The current / left item.
 * @param {any} y The other / right item.
 * 
 * @return {boolean} Are equal or not.
 */
export type EqualityComparer<T> = (x: T, y: any) => boolean;
/**
 * Describes a key selector.
 * 
 * @param {K} k The original key.
 * @param {T} item The current item.
 * @param {IItemContext<T>} ctx The item context.
 * 
 * @return {U} The "new" key.
 */
export type KeySelector<K, T, U> = (key: K, item: T, ctx: IItemContext<T>) => U;
/**
 * Describes a selector that projects items to a list of new items.
 * 
 * @param {T} item The underlying item.
 * @param {IItemContext<T>} ctx The context.
 * 
 * @return {Sequence<U>} The new items.
 */
export type ManySelector<T, U> = (item: T, ctx: IItemContext<T>) => Sequence<U>;
/**
 * Describes a predicate.
 * 
 * @param {T} item The underlying item.
 * @param {IItemContext<T>} ctx The context.
 * 
 * @return {boolean} Item does match conditions or not.
 */
export type Predciate<T> = (item: T, ctx: IItemContext<T>) => boolean;
/**
 * Describes a selector.
 * 
 * @param {T} item The underlying item.
 * @param {IItemContext<T>} ctx The context.
 * 
 * @return {U} The new item.
 */
export type Selector<T, U> = (item: T, ctx: IItemContext<T>) => U;
/**
 * A sequence.
 */
export type Sequence<T> = ArrayLike<T> | Iterator<T> | Iterable<T> | IterableIterator<T>;
/**
 * Describes a function that "zips" two elements.
 * 
 * @param {T} item1 The first item.
 * @param {U} item2 The second item.
 * @param {IItemContext<T>} ctx1 The context of item1.
 * @param {IItemContext<U>} ctx2 The context of item2.
 * 
 * @return {V} The zipped value.
 */
export type Zipper<T, U, V> = (item1: T, item2: U,
                               ctx1: IItemContext<T>, ctx2: IItemContext<U>) => V;

/**
 * Describes a sequence.
 */
export interface IEnumerable<T> extends Iterable<T> {
    /**
     * Aggregates all itms of the sequence to one item.
     * 
     * @param {Aggregator<T, TResult>) => TResult | string} The aggregator.
     * @param {TDefault} [defaultValue] The value to return if sequence is empty.
     * 
     * @return {TResult | TDefault} The aggregated value or the default value.
     */
    aggregate<TResult, TDefault>(aggregator: Aggregator<T, TResult> | string,
                                 defaultValue?: TDefault): TResult | TDefault;

    /**
     * Checks if ALL items do match a condition.
     * 
     * @param {Predciate<T> | string} predicate The predicate to use.
     * 
     * @return {boolean} All do match or not.
     */
    all(predicate: Predciate<T> | string): boolean;

    /**
     * Checks if ANY items do match a condition.
     * 
     * @param {Predciate<T> | string} [predicate] The predicate to use.
     *                                            If not defined, the method checks if that sequence contains at least one item.
     * 
     * @return {boolean} At least one does match or not.
     */
    any(predicate?: Predciate<T> | string): boolean;

    /**
     * Computes the average of that sequence.
     * 
     * @param {TDefault} [defaultValue] The custom value that is returned if sequence has no items.
     * 
     * @return {number | TDefault} The average of the sequence or the default value.
     */
    average<TDefault>(defaultValue?: TDefault): number | TDefault;

    /**
     * Casts the items of that sequence to a new type.
     * 
     * @return {IEnumerable<TTarget>} The new sequence.
     */
    cast<TTarget>(): IEnumerable<TTarget>;

    /**
     * Concats the items of that sequence with another.
     * 
     * @param {Sequence<T>} other The other sequence.
     * 
     * @return {IEnumerable<U>} The new sequence.
     */
    concat(other: Sequence<T>): IEnumerable<T>;

    /**
     * Joins the elements of that sequence to one string.
     * 
     * @param {string} [defaultValue] The value to return if sequence is empty. Default: ''
     * 
     * @return {string} The string.
     */
    concatToString(defaultValue?: string): string;

    /**
     * Checks if that sequence contains an item.
     * 
     * @param {any} item The item to search for.
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     * 
     * @return {boolean} Does contain item or not.
     */
    contains(item: any, comparer?: EqualityComparer<T> | string | true): boolean;

    /**
     * Counts the elements of that sequence.
     * 
     * @param {Predciate<T> | string} [predicate] The custom predicate to use.
     * 
     * @return {Number} The number of elements.
     */
    count(predicate?: Predciate<T> | string): number;

    /**
     * Returns the elements of the sequence or a sequence with default values if the current sequence is empty.
     * 
     * @param {T} ...args One or more element for a "default sequence",
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    defaultIfEmpty(...args: T[]): IEnumerable<T>;

    /**
     * Removes duplicates.
     * 
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    distinct(comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;

    /**
     * Iterates over the tems.
     * 
     * @param {Action<T>} The action to invoke.
     */
    each(action: Action<T>): void;

    /**
     * Returns an element at a specific position.
     * 
     * @param {number} index The zero based index.
     * 
     * @return {T} The item.
     * 
     * @throws Sequence has no matching item.
     */
    elementAt(index: number): T;

    /**
     * Tries to return an element at a specific position.
     * 
     * @param {number} index The zero based index.
     * @param {TDefault} [defaultValue] The value to return if no element has been found.
     * 
     * @return {T | TDefault} The item or the default value.
     * 
     * @throws Index is out of range.
     */
    elementAtOrDefault<TDefault>(index: number, defaultValue?: TDefault): T | TDefault;

    /**
     * Produces the difference between that sequence and another.
     * 
     * @param {Sequence<T>} other The items to except.
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     * 
     * {IEnumerable<T>} The new sequence.
     */
    except(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;

    /**
     * Returns the first item of the sequence.
     * 
     * @param {Predciate<T> | string} [predicate] The custom predicate to use.
     * 
     * @return {T} The item.
     * 
     * @throws Sequence has no matching item.
     */
    first(predicate?: Predciate<T> | string): T;

    /**
     * Tries to return the first item of the sequence.
     * 
     * @param {Predciate<T> | string | TDefault} [predicateOrDefaultValue] The custom predicate to use.
     *                                                                     If there are less than 2 arguments and the first argument is NOT a function,
     *                                                                     it is used as default value.
     * 
     * @return {T | TDefault} The item or the default value.
     */
    firstOrDefault<TDefault>(predicateOrDefaultValue?: Predciate<T> | string | TDefault,
                             defaultValue?: TDefault): T | TDefault;

    /**
     * Alias for 'each()' method.
     */
    forEach(action: Action<T>): void;

    /**
     * Gets the enumerator for iteration.
     * 
     * @return {IEnumerator<T>} The enumerator.
     */
    getEnumerator(): IEnumerator<T>;

    /**
     * Groups the elements of the sequence.
     * 
     * @param {Selector<T, TKey> | string} keySelector The function that provides the key for an element.
     * @param {EqualityComparer<TKey> | string} [keyEqualityComparer] The optional equality comparer for the keys.
     * 
     * @return {IEnumerable<IGrouping<T, TKey>>} The list of groupings.
     */
    groupBy<TKey>(keySelector: Selector<T, TKey> | string,
                  keyEqualityComparer?: EqualityComparer<TKey> | string): IEnumerable<IGrouping<T, TKey>>;

    /**
     * Correlates the elements of that sequence and another based on matching keys and groups them.
     * 
     * @param {Sequence<TInner>} inner The other sequence.
     * @param {Selector<T, TKey> | string} outerKeySelector The key selector for the items of that sequence.
     * @param {Selector<TInner, TKey> | string} innerKeySelector The key selector for the items of the other sequence.
     * @param {Zipper<T, IEnumerable<TInner>, TResult> | string} resultSelector 	The function that provides the result value for two matching elements.
     * @param {EqualityComparer<TKey> | string} [comparer] The custom key comparer.
     * 
     * @return {IEnumerable<TResult>} The sequence with the joined items.
     */
    groupJoin<TInner, TKey, TResult>(inner: Sequence<TInner>,
                                     outerKeySelector: Selector<T, TKey> | string, innerKeySelector: Selector<TInner, TKey> | string,
                                     resultSelector: Zipper<T, IEnumerable<TInner>, TResult> | string,
                                     comparer?: EqualityComparer<TKey> | string): IEnumerable<TResult>;

    /**
     * Produces the set intersection of that sequence and another.
     * 
     * @param {Sequence<T>} other The other sequence.
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     * 
     * {IEnumerable<T>} The new sequence.
     */
    intersect(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;

    /** @inheritdoc */
    [Symbol.iterator](): IEnumerator<T>;

    /**
     * Correlates the elements of that sequence and another based on matching keys.
     * 
     * @param {Sequence<TInner>} inner The other sequence.
     * @param {Selector<T, TKey> | string} outerKeySelector The key selector for the items of that sequence.
     * @param {Selector<TInner, TKey> | string} innerKeySelector The key selector for the items of the other sequence.
     * @param {Zipper<T, TInner, TResult> | string} resultSelector 	The function that provides the result value for two matching elements.
     * @param {EqualityComparer<TKey> | string} [comparer] The custom key comparer.
     * 
     * @return {IEnumerable<TResult>} The sequence with the joined items.
     */
    join<TInner, TKey, TResult>(inner: Sequence<TInner>,
                                outerKeySelector: Selector<T, TKey> | string, innerKeySelector: Selector<TInner, TKey> | string,
                                resultSelector: Zipper<T, TInner, TResult> | string,
                                comparer?: EqualityComparer<TKey> | string): IEnumerable<TResult>;

    /**
     * Joins the elements of that sequence to one string.
     * 
     * @param {string} separator The separator to use. Default: ''
     * @param {string} [defaultValue] The value to return if sequence is empty. Default: ''
     * 
     * @return {string} The string.
     */
    joinToString(separator: string, defaultValue?: string): string;

    /**
     * Returns the last item of the sequence.
     * 
     * @param {Predciate<T> | string} [predicate] The custom predicate to use.
     * 
     * @return {T} The item.
     * 
     * @throws Sequence has no matching item.
     */
    last(predicate?: Predciate<T> | string): T;

    /**
     * Tries to return the last item of the sequence.
     * 
     * @param {Predciate<T> | string | TDefault} [predicateOrDefaultValue] The custom predicate to use.
     *                                                                     If there are less than 2 arguments and the first argument is NOT a function,
     *                                                                     it is used as default value.
     * 
     * @return {T | TDefault} The item or the default value.
     */
    lastOrDefault<TDefault>(predicateOrDefaultValue?: Predciate<T> | string | TDefault,
                            defaultValue?: TDefault): T | TDefault;

    /**
     * Returns the "biggest" item of that sequence.
     * 
     * @param {TDefault} [defaultValue] The value to return if sequence is empty.
     * 
     * @return {T | TDefault} The "biggest" value or the default value.
     */
    max<TDefault>(defaultValue?: TDefault): T | TDefault;

    /**
     * Returns the "smallest" item of that sequence.
     * 
     * @param {TDefault} [defaultValue] The value to return if sequence is empty.
     * 
     * @return {T | TDefault} The "smallest" value or the default value.
     */
    min<TDefault>(defaultValue?: TDefault): T | TDefault;

    /**
     * Removes all non-empty items.
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    notEmpty(): IEnumerable<T>;

    /**
     * Filters the items of a specific type.
     * 
     * @param {string} type The name of the target type.
     * 
     * @return {IEnumerable<TTarget>} The new sequence.
     */
    ofType<TTarget>(type: string): IEnumerable<TTarget>;

    /**
     * Sorts the elements of that sequence in ascending order by using the values itself as keys.
     * 
     * @param {Comparer<T> | string} [comparer] The custom key comparer to use.
     * 
     * @throws The comparer is invalid.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    order(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;

    /**
     * Sorts the elements of that sequence in ascending order.
     * 
     * @param {Selector<T, TKey> | string} selector The key selector.
     * @param {Comparer<TKey> | string} [comparer] The custom key comparer to use.
     * 
     * @throws At least one argument is invalid.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    orderBy<TKey>(selector: Selector<T, TKey> | string,
                  comparer?: Comparer<TKey> | string): IOrderedEnumerable<T>;

    /**
     * Sorts the elements of that sequence in descending order.
     * 
     * @param {Selector<T, TKey> | string} selector The key selector.
     * @param {Comparer<TKey> | string} [comparer] The custom key comparer to use.
     * 
     * @throws At least one argument is invalid.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    orderByDescending<TKey>(selector: Selector<T, TKey> | string,
                            comparer?: Comparer<TKey> | string): IOrderedEnumerable<T>;

    /**
     * Sorts the elements of that sequence in descending order by using the values as keys.
     * 
     * @param {Comparer<T> | string} [comparer] The custom key comparer to use.
     * 
     * @throws The comparer is invalid.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    orderDescending(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;

    /**
     * Adds all elements of that sequence to an array.
     * 
     * @param {ArrayLike<T>} arr The target array.
     * 
     * @chainable.
     */
    pushToArray(arr: T[]): IEnumerable<T>;

    /**
     * Reverses the order of the sequence.
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    reverse(): IOrderedEnumerable<T>;

    /**
     * Projects the items of that sequence to new items.
     * 
     * @param {Selector<T, TTarget> | string} The selector to use.
     * 
     * @return {IEnumerable<TTarget>} The new sequence.
     */
    select<TTarget>(selector: Selector<T, TTarget> | string): IEnumerable<TTarget>;

    /**
     * Projects each item to a list of new items and flattens them to a new sequence.
     * 
     * @param {ManySelector<T, TTarget> | string} The selector to use.
     * 
     * @return {IEnumerable<TTarget>} The new sequence.
     */
    selectMany<TTarget>(selector: ManySelector<T, TTarget> | string): IEnumerable<TTarget>;
    
    /**
     * Checks if that sequence has the same items as onther sequence.
     * 
     * @param {Sequence<T>} other The other sequence.
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     * @param {EqualityComparer<any> | string | true} [keyComparer] The custom key comparer to use.
     *                                                              If (true), the methods also checks for matching data type (=== operator).
     * 
     * @return {boolean} Both sequences are the same or not.
     */
    sequenceEqual(other: Sequence<T>,
                  comparer?: EqualityComparer<T> | string | true, keyComparer?: EqualityComparer<any> | string | true): boolean;

    /**
     * Returns the one and only item of the sequence.
     * 
     * @param {Predciate<T> | string} [predicate] The custom predicate to use.
     * 
     * @return {T} The item.
     * 
     * @throws No item found or sequence contains more than one machting element.
     */
    single(predicate?: Predciate<T> | string): T;

    /**
     * Tries to return the one and only item of the sequence.
     * 
     * @param {Predciate<T> | string | TDefault} [predicateOrDefaultValue] The custom predicate to use.
     *                                                                     If there are less than 2 arguments and the first argument is NOT a function,
     *                                                                     it is used as default value.
     * 
     * @return {T | TDefault} The item or the default value.
     * 
     * @throws Sequence contains more than one machting element.
     */
    singleOrDefault<TDefault>(predicateOrDefaultValue?: Predciate<T> | string | TDefault,
                              defaultValue?: TDefault): T | TDefault;

    /**
     * Skips a number of items.
     * 
     * @param {number} cnt The number of items to skip.
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    skip(cnt: number): IEnumerable<T>;

    /**
     * Takes all items BUT the last one.
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    skipLast(): IEnumerable<T>;

    /**
     * Skips items while a condition matches.
     * 
     * @param {Predciate<T> | string} predicate The predicate to use.
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    skipWhile(predicate: Predciate<T> | string): IEnumerable<T>;

    /**
     * Calculates the sum of all items.
     * 
     * @param {TTarget} [defaultValue] The custom value that is returned if sequence has no items.
     * 
     * @return {number | TTarget} The sum or the default value.
     */
    sum<TTarget>(defaultValue?: TTarget): number | TTarget;

    /**
     * Takes a number of items.
     * 
     * @param {number} cnt The number of items to take.
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    take(cnt: number): IEnumerable<T>;

    /**
     * Takes items while a condition matches.
     * 
     * @param {Predciate<T> | string} predicate The predicate to use.
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    takeWhile(predicate: Predciate<T> | string): IEnumerable<T>;

    /**
     * Converts the items of that sequence to a new array.
     * 
     * @param {KeySelector<any, T, number> | string} [keySelector] The custom index / key selector.
     *                                                             If (true), the value from 'key' property is used as index.
     * 
     * @return {ArrayLike<T>} The new array.
     */
    toArray(keySelector?: KeySelector<any, T, number> | string | true): T[];

    /**
     * Creates a new list from that sequence.
     * 
     * @param {boolean} [isReadOnly] The new should be readonly or not. Default: (false).
     * @param {EqualityComparer<T> | string} [comparer] The comparer for the items.
     * 
     * @return {IList<T>} The new list.
     */
    toList(isReadOnly?: boolean, comparer?: EqualityComparer<T> | string): IList<T>;

    /**
     * Converts the items of that sequence to a new "lookup" object.
     * 
     * @param {KeySelector<any, T, number> | string} [keySelector] The custom index / key selector.
     *                                                             If (true), the value from 'key' property is used as index.
     * 
     * @return {ArrayLike<T>} The new array.
     */
    toLookup<TKey extends PropertyKey>(keySelector: Selector<T, TKey> | string,
                                       keyEqualityComparer?: EqualityComparer<TKey> | string): ILookup<T, TKey>;

    /**
     * Creates a new set collection from that sequence.
     * 
     * @param {EqualityComparer<T> | string} [comparer] The comparer for the items.
     * 
     * @return {IList<T>} The new set.
     */
    toSet(comparer?: EqualityComparer<T> | string): ISet<T>;

    /**
     * Produces the set union of that sequence and another.
     * 
     * @param {Sequence<T>} other The other sequence.
     * @param {EqualityComparer<T> | string | true} [comparer] The custom equality comparer to use.
     *                                                         If (true), the methods also checks for matching data type (=== operator).
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    union(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T>;

    /**
     * Filters the items of that sequence.
     * 
     * @param {Predciate<T> | string} predicate The predicate to use.
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    where(predicate: Predciate<T> | string): IEnumerable<T>;

    /**
     * Applies a specified function to the corresponding elements of that sequence and another,
     * producing a sequence of the results.
     * 
     * @param {Sequence<T>} other The other sequence.
     * @param {Zipper<T, TTarget> | string} zipper The selector for the combined result items of the elements of the two sequences.
     * 
     * @return IEnumerable<TTarget> The new sequence.
     */
    zip<TTarget>(other: Sequence<T>, zipper: Zipper<T, T, TTarget> | string): IEnumerable<TTarget>;
}

/**
 * Describes an enumerator.
 */
export interface IEnumerator<T> extends Iterator<T> {
    /**
     * Gets if the enumerator can be resetted or not.
     */
    readonly canReset: boolean;

    /**
     * Gets the current element.
     */
    readonly current: T;

    /**
     * Gets if the 'moveNext()' can be called or not.
     */
    readonly isValid: boolean;
    
    /**
     * Gets the current key.
     */
    readonly key: number;

    /**
     * Moves to the next element.
     * 
     * @return New element is available or not.
     */
    moveNext(): boolean;

    /**
     * Resets the enumerator.
     * 
     * @chainable
     * 
     * @throws Cannot be resetted.
     */
    reset(): IEnumerator<T>;
}

/**
 * An enumerator that is based on an iterator.
 */
export class IteratorEnumerator<T> implements IEnumerator<T> {
    /**
     * The current result.
     */
    protected _current: IteratorResult<T>;
    /**
     * The current zero based index.
     */
    protected _index = -1;
    /**
     * The underlying iterator.
     */
    protected _iterator: Iterator<T>;

    /**
     * Initializes a new instance of that class.
     * 
     * @param {Iterator<T>} [iterator] The underlying iterator.
     */
    constructor(iterator?: Iterator<T>) {
        this._iterator = iterator || makeIterable<T>();
    }

    /** @inheritdoc */
    public get canReset(): boolean {
        return false;
    }

    /** @inheritdoc */
    public get current(): T {
        if (this._current) {
            return this._current.value;
        }
    }

    /** @inheritdoc */
    public get isValid(): boolean {
        return !this._current ||
               !this._current.done;
    }

    /** @inheritdoc */
    public get key(): number {
        return this._index;
    }

    /** @inheritdoc */
    public moveNext(): boolean {
        if (this._current && this._current.done) {
            return false;
        }

        ++this._index;
        this._current = this._iterator.next();
        return this._current && !this._current.done;
    }

    /** @inheritdoc */
    public next(): IteratorResult<T> {
        this.moveNext();
        return this._current;
    }

    /** @inheritdoc */
    public reset(): IEnumerator<T> {
        throw "Reset operation is NOT supported here!";
    }
}

/**
 * An enumerator that is based on an array.
 */
export class ArrayEnumerator<T> extends IteratorEnumerator<T> {
    /**
     * The underlying array.
     */
    protected _arr: ArrayLike<T>;
    
    /**
     * Initializes a new instance of that class.
     * 
     * @param {ArrayLike<T>} [arr] The underlying array.
     */
    constructor(arr?: ArrayLike<T>) {
        super();

        this._arr = arr || [];
        this.reset();
    }

    /** @inheritdoc */
    public get canReset(): boolean {
        return true;
    }

    /** @inheritdoc */
    public reset(): IEnumerator<T> {
        this._index = -1;
        this._current = null;
        this._iterator = makeIterable<T>(this._arr);

        return this;
    }
}

/**
 * A grouping of items.
 */
export interface IGrouping<T, TKey> extends IEnumerable<T> {
    /**
     * Gets the value that represents the key / group.
     */
    readonly key: TKey;
}

/**
 * Describes the context of an item.
 */
export interface IItemContext<T> {
    /**
     * Cancel operation or not.
     */
    cancel: boolean;

    /**
     * Gets the underlying enumerator.
     */
    readonly enumerator: IEnumerator<T>;

    /**
     * Gets the current zero-based index.
     */
    readonly index: number;

    /**
     * Gets if the that item is the first one or not.
     */
    readonly isFirst: boolean;

    /**
     * Gets the item.
     */
    readonly item: T;

    /**
     * Gets or sets the value for the next item.
     */
    nextValue: any;
    
    /**
     * Gets the value of the previous item.
     */
    readonly previousValue: any;

    /**
     * Gets or sets the value for the current item and the upcoming ones.
     */
    value: any;
}

/**
 * Describes an ordered sequence.
 */
export interface IOrderedEnumerable<T> extends IEnumerable<T> {
    /**
     * Performs a subsequent ordering of the elements in that sequence in ascending order,
     * using the values itself as keys.
     * 
     * @param {Comparer<T> | string} [comparer] The custom key comparer to use.
     * 
     * @throws The comparer is invalid.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    then(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;

    /**
     * Performs a subsequent ordering of the elements in that sequence in ascending order, according to a key.
     * 
     * @param {Selector<T, TKey> | string} selector The key selector.
     * @param {Comparer<TKey> | string} [comparer] The custom comparer to use.
     * 
     * @throws At least one argument is invalid.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    thenBy<TKey>(selector: Selector<T, TKey> | string,
                 comparer?: Comparer<TKey> | string): IOrderedEnumerable<T>;

    /**
     * Performs a subsequent ordering of the elements in that sequence in descending order, according to a key.
     * 
     * @param {Selector<T, TKey> | string} selector The key selector.
     * @param {Comparer<TKey> | string} [comparer] The custom comparer to use.
     * 
     * @throws At least one argument is invalid.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    thenByDescending<TKey>(selector: Selector<T, TKey> | string,
                           comparer?: Comparer<TKey> | string): IOrderedEnumerable<T>;

    /**
     * Performs a subsequent ordering of the elements in that sequence in descending order,
     * using the values as keys.
     * 
     * @param {Comparer<T> | string} [comparer] The custom key comparer to use.
     * 
     * @throws The comparer is invalid.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    thenDescending(comparer?: Comparer<T> | string): IOrderedEnumerable<T>;
}

/**
 * Describes a lookup object.
 */
export interface ILookup<T, TKey extends PropertyKey> extends IEnumerable<IGrouping<T, TKey>>, Object {
}

/**
 * Describes a collection.
 */
export interface ICollection<T> extends IEnumerable<T> {
    /**
     * Adds an item.
     * 
     * @param {T} item The item to add.
     */
    add(item: T): void;

    /**
     * Adds a list of items.
     * 
     * @param {T} ...items The items to add.
     */
    addRange(...items: T[]): void;

    /**
     * Clears the collection.
     */
    clear(item: T): void;

    /**
     * Checks if the collection contains an item.
     * 
     * @param {T} item The item to search for.
     * 
     * @return {boolean} Contains item or not.
     */
    containsItem(item: T): boolean;

    /**
     * Gets if the collection is readonly or not.
     */
    readonly isReadonly: boolean;

    /**
     * Gets the number of items of the collection.
     */
    readonly length: number;

    /**
     * Alias for 'addRange'().
     * 
     * @param {T} ...items The items to add.
     * 
     * @return {number} The new length of the collection.
     */
    push(...items: T[]): number;

    /**
     * Removes the first occurrence of an item.
     * 
     * @param {T} item The item to remove.
     * 
     * @return {boolean} Item has been removed or not or not.
     */
    remove(item: T): boolean;

    /**
     * Removes the all items that match a condition.
     * 
     * @param {Predciate<T> | string} predicate The predicate to use.
     * 
     * @return {number} The number of removed items.
     */
    removeAll(predicate: Predciate<T> | string): number;
}

/**
 * Describes a set of items.
 */
export interface ISet<T> extends ICollection<T> {
    /**
     * Adds an item.
     * 
     * @param {T} item The item to add.
     * 
     * @return {boolean} Item was added or not.
     */
    add(item: T): boolean;

    /**
     * Modifies the current set so that it contains only elements that are also in a specified sequence.
     * 
     * @param {Sequence<T>} The other sequence.
     * 
     * @chainable
     */
    intersectWith(other: Sequence<T>): ISet<T>;

    /**
     * Determines whether the current set is a proper (strict) subset of a specified sequence.
     * 
     * @param {Sequence<T>} The other sequence.
     * 
     * @return {boolean} Is a proper (strict) subset or not.
     */
    isProperSubsetOf(other: Sequence<T>): boolean;

    /**
     * Determines whether the current set is a proper (strict) superset of a specified sequence.
     * 
     * @param {Sequence<T>} The other sequence.
     * 
     * @return {boolean} Is a proper (strict) superset or not.
     */
    isProperSupersetOf(other: Sequence<T>): boolean;

    /**
     * Determines whether a set is a subset of a specified sequence.
     * 
     * @param {Sequence<T>} The other sequence.
     * 
     * @return {boolean} Is a subset or not.
     */
    isSubsetOf(other: Sequence<T>): boolean;

    /**
     * Determines whether the current set is a superset of a specified sequence.
     * 
     * @param {Sequence<T>} The other sequence.
     * 
     * @return {boolean} Is a superset or not.
     */
    isSupersetOf(other: Sequence<T>): boolean;

    /**
     * Determines whether the current set overlaps with the specified sequence.
     * 
     * @param {Sequence<T>} The other sequence.
     * 
     * @return {boolean} Do overlap or not.
     */
    overlaps(other: Sequence<T>): boolean;

    /**
     * Determines whether the current set and the specified sequence contain the same elements.
     * 
     * @param {Sequence<T>} The other sequence.
     * 
     * @return {boolean} Do overlap or not.
     */
    setEquals(other: Sequence<T>): boolean;

    /**
     * Modifies the current set so that it contains only elements that are present either in the current set or in the
     * specified sequence, but not both.
     * 
     * @param {Sequence<T>} The other sequence.
     * 
     * @chainable
     */
    symmetricExceptWith(other: Sequence<T>): ISet<T>;

    /**
     * Modifies the current set so that it contains all elements that are present in the current set, in the
     * specified sequence, or in both.
     * 
     * @param {Sequence<T>} The other sequence.
     * 
     * @chainable
     */
    unionWith(other: Sequence<T>): ISet<T>;
}

/**
 * Describes a list.
 */
export interface IList<T> extends ICollection<T> {
    /**
     * Returns an item at a specific position.
     * 
     * @param {number} index The zero based index.
     * 
     * @return {T} The item.
     */
    getItem(index: number): T;

    /**
     * Returns the index of the first occurrence of an item.
     * 
     * @param {T} item The item to search for.
     * 
     * @return {number} The zero based index or -1 if NOT found.
     */
    indexOf(item: T): number;

    /**
     * Inserts an item at a specific position.
     * 
     * @param {number} index The zero based index.
     * @param {T} item The item to insert.
     */
    insert(index: number, item: T): void;

    /**
     * Removes an item at a specific position.
     * 
     * @param {number} index The zero based index.
     * 
     * @return {boolean} Item has been remove or not.
     */
    removeAt(index: number): boolean;

    /**
     * Sets an item at a specific position.
     * 
     * @param {number} index The zero based index.
     * @param {T} item The item to set,
     * 
     * @chainable
     */
    setItem(index: number, item: T): IList<T>;
}

class ItemContext<T> implements IItemContext<T> {
    protected _enumerator: IEnumerator<T>;
    protected _index: number;
    protected _previousValue: any;

    constructor(e: IEnumerator<T>, index: number, previousValue?: any) {
        this._enumerator = e;
        this._index = index;
        this._previousValue = previousValue;
    }

    public cancel: boolean = false;

    public get enumerator(): IEnumerator<T> {
        return this._enumerator;
    }

    public get index(): number {
        return this._index;
    }

    public get isFirst(): boolean {
        return 0 === this._index;
    }

    public get item(): T {
        return this._enumerator.current;
    }

    public get previousValue(): any {
        return this._previousValue;
    }

    public nextValue: any;

    public value: any;
}

function isArrayLike(val: any): boolean {
    return Array.isArray(val) || 
           (!!val &&
            typeof val === "object" &&
            val.hasOwnProperty("length") && 
            typeof val.length === "number");
}

function* makeIterable<T>(val?: any): Iterator<T> {
    if (val) {
        if (isArrayLike(val)) {
            let arr: ArrayLike<any> = val;
            for (let i = 0; i < arr.length; i++) {
                yield arr[i];
            }
        }
        else {
            return <Iterator<T>>val;
        }
    }
}

function toNumber(val: any): number {
    if ('number' === typeof val) {
        return val;
    }

    if (val) {
        return parseFloat(('' + val).trim());
    }

    return 0;
};

/**
 * A basic sequence.
 */
export class Enumerable<T> implements IEnumerable<T> {
    /**
     * The underyling iterator.
     */
    protected _enumerator: IEnumerator<T>;

    /**
     * Initializes a new instance of that class.
     * 
     * @param {Iterator<T>} [iterator] The underyling iterator.
     */
    constructor(iterator?: Iterator<T>) {
        this._enumerator = new IteratorEnumerator<T>(iterator || makeIterable<T>());
    }

    /** @inheritdoc */
    public aggregate<TResult, TDefault>(aggregator: Aggregator<T, TResult> | string,
                                        defaultValue?: TDefault): TResult | TDefault {
        
        let a = <Aggregator<T, TResult>>Helpers.asFunc(aggregator);
        if (!a) {
            a = (result, item) => result + item;
        }

        let result: TResult | TDefault = defaultValue;

        let e = this.getEnumerator();
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            let currentResult: any;
            if (0 !== index) {
                currentResult = a(result,
                                  ctx.item, ctx);
            }
            else {
                currentResult = <any>ctx.item;
            }

            if (ctx.cancel) {
                break;
            }

            result = currentResult;

            prevVal = ctx.nextValue;
            value = ctx.value;
        }

        return result;
    }

    /** @inheritdoc */
    public all(predicate: Predciate<T> | string): boolean {
        let p = Helpers.toPredicateSafe(predicate, this);

        let e = this.getEnumerator();
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            let doesMatch = p(ctx.item, ctx);

            if (ctx.cancel) {
                break;
            }

            if (!doesMatch) {
                return false;  // at least one does NOT match
            }

            prevVal = ctx.nextValue;
            value = ctx.value;
        }

        return true;
    }

    /** @inheritdoc */
    public any(predicate?: Predciate<T> | string): boolean {
        let p = Helpers.toPredicateSafe(predicate, this);

        let e = this.getEnumerator()
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            let doesMatch = p(ctx.item, ctx);

            if (ctx.cancel) {
                break;
            }

            if (doesMatch) {
                return true;  // at least one does NOT match
            }

            prevVal = ctx.nextValue;
            value = ctx.value;
        }

        return false;
    }

    /** @inheritdoc */
    public average<TDefault>(defaultValue?: TDefault): number | TDefault {
        let cnt = 1;
        let sum = this.aggregate<number, boolean>((result, item, ctx) => {
            let x = toNumber(result);
            let y = toNumber(item);

            cnt = ctx.index + 1;
            return x + y;
        }, false);

        if (false !== sum) {
            return <number>sum / cnt;
        }

        return defaultValue;
    }

    /** @inheritdoc */
    public cast<TTarget>(): IEnumerable<TTarget> {
        return this.select(x => <any>x);
    }

    /** @inheritdoc */
    public concat(other: Sequence<T>): IEnumerable<T> {
        let i = makeIterable<T>(other);

        return from(this.concatInner(i));
    }

    /**
     * The logic for the 'concat()' method.
     * 
     * @param {Iterator<T>} other The other sequence.
     * 
     * @return {Iterator<T>} The iterator.
     */  
    protected* concatInner(other: Iterator<T>): Iterator<T> {
        let e = this.getEnumerator();

        // first the items of THAT sequence
        while (e.moveNext()) {
            yield e.current;
        }

        // now the other ones
        let result: IteratorResult<T>;
        do
        {
            result = other.next();
            if (!result || result.done) {
                break;
            }

            yield result.value;
        }
        while (true);
    }

    /** @inheritdoc */
    public concatToString(defaultValue?: string): string {
        if (arguments.length < 1) {
            return this.joinToString('');
        }

        return this.joinToString('', defaultValue);
    }

    /** @inheritdoc */
    public contains(item: any, comparer?: EqualityComparer<T> | string | true): boolean {
        let equalityComparer = Helpers.toEqualityComparerSafe<T>(comparer, this);

        return this.any(x => equalityComparer(x, item));
    }

    /** @inheritdoc */
    public count(predicate?: Predciate<T> | string): number {
        let p = Helpers.toPredicateSafe(predicate, this);

        let e = this.getEnumerator();
        let cnt = 0;
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            let doesMatch = p(ctx.item, ctx);

            if (ctx.cancel) {
                break;
            }

            if (doesMatch) {
                ++cnt;
            }

            prevVal = ctx.nextValue;
            value = ctx.value;
        }

        return cnt;
    }

    /** @inheritdoc */
    public defaultIfEmpty(...args: T[]): IEnumerable<T> {
        return from(this.defaultIfEmptyInner(args));
    }

    /**
     * The logic for the 'defaultIfEmpty()' method.
     * 
     * @param {T[]} args The arguments for the "default" sequence.
     * 
     * @return {Iterator<T>} The iterator.
     */  
    protected* defaultIfEmptyInner(args: T[]): Iterator<T> {
        let e = this.getEnumerator();

        if (e.moveNext()) {
            do {
                yield e.current;
            }
            while (e.moveNext());
        }
        else {
            if (args) {
                for (let i = 0; i < args.length; i++) {
                    yield args[i];
                }
            }
        }
    }

    /** @inheritdoc */
    public distinct(comparer?: EqualityComparer<T> | string | true): IEnumerable<T> {
        let ec = Helpers.toEqualityComparerSafe(comparer, this);

        return from(this.distinctInner(ec));
    }

    /**
     * The logic for the 'distinct()' method.
     * 
     * @param {EqualityComparer<T>} comparer The equality comparer.
     * 
     * @return {Iterator<T>} The iterator.
     */  
    protected* distinctInner(comparer: EqualityComparer<T>): Iterator<T> {
        let temp: T[] = [];

        let e = this.getEnumerator();
        let index = -1;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index);

            // check for duplicate
            let alreadyExists = false;
            for (let i = 0; i < temp.length; i++) {
                let existingItem = temp[i];
                if (comparer(ctx.item, existingItem)) {
                    // does already exist
                    alreadyExists = true;
                    break;
                }
            }

            if (!alreadyExists) {
                temp.push(ctx.item);
                yield ctx.item;
            }
        }
    }

    /** @inheritdoc */
    public each(action: Action<T>): void {
        if (!action) {
            action = () => { };
        }

        let e = this.getEnumerator();
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            action(ctx.item, ctx);

            if (ctx.cancel) {
                break;
            }

            prevVal = ctx.nextValue;
            value = ctx.value;
        }
    }

    /** @inheritdoc */
    public elementAt(index: number): T {
        index = toNumber(index);
        if (index < 0) {
            throw `Index out of range: ${index}`;
        }

        return this.first((item, ctx) => 0 === index--);
    }

    /** @inheritdoc */
    public elementAtOrDefault<TDefault>(index: number, defaultValue?: TDefault): T | TDefault {
        index = toNumber(index);
        if (index < 0) {
            throw `Index out of range: ${index}`;
        }

        return this.firstOrDefault<TDefault>((item, ctx) => 0 === index--,
                                             defaultValue);
    }

    /** @inheritdoc */
    public except(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T> {
        let equalityComparer = Helpers.toEqualityComparerSafe(comparer, this);
        let itemsToExcept = from(makeIterable<T>(other)).distinct()
                                                        .toArray();

        return from(this.exceptInner(itemsToExcept, equalityComparer));
    }

    /**
     * The logic for the 'except()' method.
     * 
     * @param {ArrayLike<T>} itemsToExcept The items to except.
     * @param {EqualityComparer<T>} equalityComparer The equality comparer.
     * 
     * @return {Iterator<T>} The iterator.
     */
    protected* exceptInner(itemsToExcept: ArrayLike<T>, equalityComparer: EqualityComparer<T>): Iterator<T> {
        let e = this.getEnumerator();

        while (e.moveNext()) {
            let item = e.current;
            
            // check if item has to be excepted
            let found = false;
            for (let i = 0; i < itemsToExcept.length; i++) {
                if (equalityComparer(item, itemsToExcept[i])) {
                    found = true;  // yepp
                    break;
                }
            }

            if (!found) {
                yield item;
            }
        }
    }

    /** @inheritdoc */
    public first(predicate?: Predciate<T> | string): T {
        let p = Helpers.toPredicateSafe(predicate, this);

        let e = this.getEnumerator();
        let result: T;
        let found = false;
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            let doesMatch = p(ctx.item, ctx);

            if (ctx.cancel) {
                break;
            }

            if (doesMatch) {
                found = true;
                result = ctx.item;

                break;
            }

            prevVal = ctx.nextValue;
            value = ctx.value;
        }

        if (!found) {
            throw "No matching element found!";
        }

        return result;
    }

    /** @inheritdoc */
    public firstOrDefault<TDefault>(predicateOrDefaultValue?: Predciate<T> | string | TDefault,
                                    defaultValue?: TDefault): T | TDefault {
        
        let args = Helpers.toOrDefaultArgs<T, TDefault>(predicateOrDefaultValue, defaultValue,
                                                        arguments.length);

        let e = this.getEnumerator();
        let result: T | TDefault;
        let found = false;
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            let doesMatch = args.predicate(ctx.item, ctx);

            if (ctx.cancel) {
                break;
            }

            if (doesMatch) {
                found = true;
                result = ctx.item;

                break;
            }

            prevVal = ctx.nextValue;
            value = ctx.value;
        }

        if (!found) {
            result = args.defaultValue;
        }

        return result;
    }

    /** @inheritdoc */
    public forEach(action: Action<T>): void {
        this.each(action);
    }

    /** @inheritdoc */
    public getEnumerator(): IEnumerator<T> {
        return this[Symbol.iterator]();
    }

    /** @inheritdoc */
    public groupBy<TKey>(keySelector: Selector<T, TKey> | string,
                         keyEqualityComparer?: EqualityComparer<TKey> | string): IEnumerable<IGrouping<T, TKey>> {

        let ks = Helpers.toSelectorSafe<T, TKey>(keySelector, this);
        let ksec = Helpers.toEqualityComparerSafe<TKey>(keyEqualityComparer, this);

        let e = this.getEnumerator();
        let groupings: { key: TKey, items: T[] }[] = [];
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            let key = ks(ctx.item, ctx);

            if (ctx.cancel) {
                break;
            }
            
            // find existing group
            let grp: { key: TKey, items: T[] };
            for (let i = 0; i < groupings.length; i++) {
                let g = groupings[i];

                if (ksec(key, g.key)) {
                    grp = g;  // found
                    break;
                }
            }

            if (!grp) {
                grp = {
                    key: key,
                    items: []
                };

                groupings.push(grp);
            }

            grp.items.push(ctx.item);

            prevVal = ctx.nextValue;
            value = ctx.value;
        }

        return from(groupings).select(x => new Grouping<T, TKey>(x.key,
                                                                 from(x.items)));
    }

    /** @inheritdoc */
    public groupJoin<TInner, TKey, TResult>(inner: Sequence<TInner>,
                                            outerKeySelector: Selector<T, TKey> | string, innerKeySelector: Selector<TInner, TKey> | string,
                                            resultSelector: Zipper<T, IEnumerable<TInner>, TResult> | string,
                                            comparer?: EqualityComparer<TKey> | string): IEnumerable<TResult> {

        let i = from(inner);
        let oks = Helpers.toSelectorSafe<T, TKey>(outerKeySelector, this);
        let iks = Helpers.toSelectorSafe<TInner, TKey>(innerKeySelector, this);
        let rs = Helpers.toZipperSafe<T, IEnumerable<TInner>, TResult>(resultSelector);
        let c = Helpers.toEqualityComparerSafe<TKey>(comparer, this);

        return from(this.groupJoinInner<TInner, TKey, TResult>(i,
                                                               oks, iks,
                                                               rs,
                                                               c));
    }

    /**
     * The logic for the 'groupJoin()' method.
     * 
     * @param {Sequence<TInner>} inner The other sequence.
     * @param {Selector<T, TKey>} outerKeySelector The key selector for the items of that sequence.
     * @param {Selector<TInner, TKey>} innerKeySelector The key selector for the items of the other sequence.
     * @param {Zipper<T, IEnumerable<TInner>, TResult>} resultSelector 	The function that provides the result value for two matching elements.
     * @param {EqualityComparer<TKey>} [comparer] The custom key comparer.
     * 
     * @return {Iterator<T>} The iterator.
     */  
    protected* groupJoinInner<TInner, TKey, TResult>(inner: IEnumerable<TInner>,
                                                     outerKeySelector: Selector<T, TKey>, innerKeySelector: Selector<TInner, TKey>,
                                                     resultSelector: Zipper<T, IEnumerable<TInner>, TResult>,
                                                     keyEqualityComparer?: EqualityComparer<TKey>): Iterator<TResult> {
        
        let createGroupsForSequence = function<U>(seq: IEnumerable<U>, keySelector: Selector<U, TKey>) {
            return from(seq.groupBy(keySelector)
                           .select(x => {
                                       return {
                                           key: x.key,
                                           values: from(x.toArray()),
                                       };
                                   })
                           .toArray());
        };

        let outerGroups = createGroupsForSequence(this, outerKeySelector).getEnumerator();
        let innerGroups = createGroupsForSequence(inner, innerKeySelector);

        let ogIndex = -1;
        let prevValIG: any;
        let prevValOG: any;
        let valueIG: any;
        let valueOG: any;
        while (outerGroups.moveNext()) {
            let og = outerGroups.current;

            let ogValues = og.values.getEnumerator();
            ogValues.reset();

            let matchingInnerGroups = innerGroups.where(ig => keyEqualityComparer(og.key, ig.key))
                                                 .select(ig => new Grouping<TInner, TKey>(ig.key, ig.values))
                                                 .getEnumerator();
            
            while (ogValues.moveNext()) {
                ++ogIndex;

                let igIndex = -1;
                while (matchingInnerGroups.moveNext()) {
                    ++igIndex;

                    let ctxOG = new ItemContext<T>(ogValues, ogIndex, prevValOG);
                    ctxOG.value = valueOG;

                    let ctxIG = new ItemContext(matchingInnerGroups, igIndex, prevValIG);
                    ctxIG.value = valueIG;

                    let joinedItem = resultSelector(ctxOG.item, ctxIG.item,
                                                    ctxOG, ctxIG);

                    if (ctxOG.cancel || ctxIG.cancel) {
                        return;
                    }

                    yield joinedItem;

                    prevValIG = ctxIG.nextValue;
                    prevValOG = ctxOG.nextValue;

                    valueIG = ctxIG.value;
                    valueOG = ctxOG.value;
                }    
            }
        }
    }

    /** @inheritdoc */
    public intersect(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T> {
        let equalityComparer = Helpers.toEqualityComparerSafe(comparer, this);
        let o = from(makeIterable<T>(other)).distinct();

        return from(this.intersectInner(o, equalityComparer));
    }

    /**
     * The logic for the 'intersect()' method.
     * 
     * @param {T[]} other The other items.
     * @param {IEnumerable<T>} equalityComparer The equality comparer.
     * 
     * @return {Iterator<T>} The iterator.
     */
    protected* intersectInner(other: IEnumerable<T>, equalityComparer: EqualityComparer<T>): Iterator<T> {
        let o: T[] = [];
        other.forEach(x => o.push(x));

        let e = this.getEnumerator();
        while (e.moveNext()) {
            let item = e.current;

            // search for machting item...
            for (let i = 0; i < o.length; i++) {
                let otherItem = o[i];

                if (equalityComparer(item, otherItem)) {
                    // found
                    o.splice(i, 1);
                    yield item;

                    break;
                }
            }
        }
    }

    /** @inheritdoc */
    public [Symbol.iterator](): IEnumerator<T> {
        return this._enumerator;
    }

    /** @inheritdoc */
    public join<TInner, TKey, TResult>(inner: Sequence<TInner>,
                                       outerKeySelector: Selector<T, TKey> | string, innerKeySelector: Selector<TInner, TKey> | string,
                                       resultSelector: Zipper<T, TInner, TResult> | string,
                                       comparer?: EqualityComparer<TKey> | string): IEnumerable<TResult> {

        let i = from(inner);
        let oks = Helpers.toSelectorSafe<T, TKey>(outerKeySelector, this);
        let iks = Helpers.toSelectorSafe<TInner, TKey>(innerKeySelector, this);
        let rs = Helpers.toZipperSafe<T, TInner, TResult>(resultSelector);
        let c = Helpers.toEqualityComparerSafe<TKey>(comparer, this);

        return from(this.joinInner<TInner, TKey, TResult>(i,
                                                          oks, iks,
                                                          rs,
                                                          c));
    }

    /**
     * The logic for the 'join()' method.
     * 
     * @param {Sequence<TInner>} inner The other sequence.
     * @param {Selector<T, TKey>} outerKeySelector The key selector for the items of that sequence.
     * @param {Selector<TInner, TKey>} innerKeySelector The key selector for the items of the other sequence.
     * @param {Zipper<T, TInner, TResult>} resultSelector 	The function that provides the result value for two matching elements.
     * @param {EqualityComparer<TKey>} [comparer] The custom key comparer.
     * 
     * @return {Iterator<T>} The iterator.
     */  
    protected* joinInner<TInner, TKey, TResult>(inner: IEnumerable<TInner>,
                                                outerKeySelector: Selector<T, TKey>, innerKeySelector: Selector<TInner, TKey>,
                                                resultSelector: Zipper<T, TInner, TResult>,
                                                keyEqualityComparer?: EqualityComparer<TKey>): Iterator<TResult> {
        
        let createGroupsForSequence = function<U>(seq: IEnumerable<U>, keySelector: Selector<U, TKey>) {
            return from(seq.groupBy(keySelector)
                           .select(x => {
                                       return {
                                           key: x.key,
                                           values: x.toArray(),
                                       };
                                   })
                           .toArray());
        };

        let outerGroups = createGroupsForSequence(this, outerKeySelector).getEnumerator();
        let innerGroups = createGroupsForSequence(inner, innerKeySelector);

        let index = -1;
        let prevValIG: any;
        let prevValOG: any;
        let valueIG: any;
        let valueOG: any;
        while (outerGroups.moveNext()) {
            let og = outerGroups.current;
            let ogValues = from(og.values).getEnumerator();

            let matchingInnerGroups = innerGroups.where(ig => keyEqualityComparer(og.key, ig.key))
                                                 .getEnumerator();
            while (matchingInnerGroups.moveNext()) {
                let ig = matchingInnerGroups.current;
                let igValues = from(ig.values).getEnumerator();

                ogValues.reset();
                while(ogValues.moveNext()) {
                    igValues.reset();

                    while(igValues.moveNext()) {
                        ++index;

                        let ctxOG = new ItemContext<T>(ogValues, index, prevValOG);
                        ctxOG.value = valueOG;

                        let ctxIG = new ItemContext<TInner>(igValues, index, prevValIG);
                        ctxIG.value = valueIG;

                        let joinedItem = resultSelector(ctxOG.item, ctxIG.item,
                                                        ctxOG, ctxIG);

                        if (ctxOG.cancel || ctxIG.cancel) {
                            return;
                        }

                        yield joinedItem;

                        prevValIG = ctxIG.nextValue;
                        prevValOG = ctxOG.nextValue;

                        valueIG = ctxIG.value;
                        valueOG = ctxOG.value;
                    }
                }
            }
        }
    }

    /** @inheritdoc */
    public joinToString(separator: string, defaultValue?: string): string {
        if (arguments.length < 2) {
            defaultValue = '';
        }

        let result = defaultValue;

        let e = this.getEnumerator();
        let index = -1;
        while (e.moveNext()) {
            ++index;
            let item = e.current;

            if (0 !== index) {
                result += separator + item;
            }
            else {
                result = '' + item;
            }
        }

        return result;
    }

    /** @inheritdoc */
    public last(predicate?: Predciate<T> | string): T {
        let p = Helpers.toPredicateSafe(predicate, this);

        let e = this.getEnumerator();
        let result: T;
        let found = false;
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            let doesMatch = p(ctx.item, ctx);

            if (ctx.cancel) {
                break;
            }

            if (doesMatch) {
                found = true;
                result = ctx.item;
            }

            prevVal = ctx.nextValue;
            value = ctx.value;
        }

        if (!found) {
            throw "No matching element found!";
        }

        return result;
    }

    /** @inheritdoc */
    public lastOrDefault<TDefault>(predicateOrDefaultValue?: Predciate<T> | string | TDefault, defaultValue?: TDefault): T | TDefault {
        let args = Helpers.toOrDefaultArgs<T, TDefault>(predicateOrDefaultValue, defaultValue,
                                                        arguments.length);

        let e = this.getEnumerator();
        let result: T | TDefault;
        let found = false;
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            let doesMatch = args.predicate(ctx.item, ctx);

            if (ctx.cancel) {
                break;
            }

            if (doesMatch) {
                found = true;
                result = ctx.item;
            }

            prevVal = ctx.nextValue;
            value = ctx.value;
        }

        if (!found) {
            result = args.defaultValue;
        }

        return result;
    }

    /** @inheritdoc */
    public max<TDefault>(defaultValue?: TDefault): T | TDefault {
        return this.aggregate<T, TDefault>((result, item) => {
            if (item > result) {
                result = item;
            }

            return result;
        }, defaultValue);
    }

    /** @inheritdoc */
    public min<TDefault>(defaultValue?: TDefault): T | TDefault {
        return this.aggregate<T, TDefault>((result: T, item: T) => {
            if (item < result) {
                result = item;
            }

            return result;
        }, defaultValue);
    }

    /** @inheritdoc */
    public notEmpty(): IEnumerable<T> {
        return this.where(x => !!x);
    }

    /** @inheritdoc */
    public ofType<TTarget>(type: string): IEnumerable<TTarget> {
        if (!type) {
            type = '';
        }
        type = ('' + type).trim();

        let doesClassExist = false;
        if (type) {
            try {
                doesClassExist = eval('typeof ' + type + ' !== "undefined"');
            }
            catch (e) {
                doesClassExist = false;
            }
        }

        let evalExpr = 'false';
        if (doesClassExist) {
            evalExpr = 'x instanceof ' + type;
        }

        return <any>this.where(x => {
            return typeof x === type ||
                   !type ||
                   eval(evalExpr);
        });
    }

    /** @inheritdoc */
    public order(comparer?: Comparer<T> | string): IOrderedEnumerable<T> {
        return this.orderBy<T>(x => x, comparer);
    }

    /** @inheritdoc */
    public orderBy<TKey>(selector: Selector<T, TKey> | string, comparer?: Comparer<TKey> | string): IOrderedEnumerable<T> {
        return new OrderedEnumerable<T, TKey>(this, selector, comparer);
    }

    /** @inheritdoc */
    public orderByDescending<TKey>(selector: Selector<T, TKey> | string, comparer?: Comparer<T> | string): IOrderedEnumerable<T> {
        let c = Helpers.toComparerSafe(comparer, this);
    
        return this.orderBy<TKey>(selector,
                                  (x, y) => c(y, x));
    }

    /** @inheritdoc */
    public orderDescending(comparer?: Comparer<T> | string): IOrderedEnumerable<T> {
        return this.orderByDescending<T>(x => x, comparer);
    }

    /** @inheritdoc */
    public pushToArray(arr: T[]): IEnumerable<T> {
        let e = this.getEnumerator();
        while (e.moveNext()) {
            if (arr) {
                arr.push(e.current);
            }
        }

        return this;
    }

    /** @inheritdoc */
    public reverse(): IOrderedEnumerable<T> {
        return this.order((x, y) => {
            if (x > y) {
                return -1;
            }

            if (x < y) {
                return 1;
            }

            return 0;
        });
    }

    /** @inheritdoc */
    public select<TTarget>(selector: Selector<T, TTarget> | string): IEnumerable<TTarget> {
        let s = Helpers.toSelectorSafe<T, TTarget>(selector, this);

        return from(this.selectInner<TTarget>(s));
    }

    /**
     * The logic for the 'select()' method.
     * 
     * @param {Selector<T, TTarget>} selector The selector.
     * 
     * @return {Iterator<T>} The iterator.
     */  
    protected* selectInner<TTarget>(selector: Selector<T, TTarget>): Iterator<TTarget> {
        let e = this.getEnumerator();
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            let newItem = selector(ctx.item, ctx);

            if (ctx.cancel) {
                break;
            }

            yield newItem;

            prevVal = ctx.nextValue;
            value = ctx.value;
        }
    }

    /** @inheritdoc */
    public selectMany<TTarget>(selector: ManySelector<T, TTarget> | string): IEnumerable<TTarget> {
        let s = Helpers.toManySelectorSafe<T, TTarget>(selector, this);

        return from(this.selectManyInner(s));
    }

    /**
     * The logic for the 'selectMany()' method.
     * 
     * @param {ManySelector<T, TTarget>} selector The selector.
     * 
     * @return {Iterator<T>} The iterator.
     */  
    protected* selectManyInner<TTarget>(selector: ManySelector<T, TTarget>): Iterator<TTarget> {
        let e = this.getEnumerator();
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            let iterator = makeIterable<TTarget>(selector(ctx.item, ctx));

            if (ctx.cancel) {
                break;
            }

            let lastResult: IteratorResult<TTarget>;
            do
            {
                lastResult = iterator.next();
                if (!lastResult || lastResult.done) {
                    break;
                }

                yield lastResult.value;
            }
            while (true);

            prevVal = ctx.nextValue;
            value = ctx.value;
        }
    }

    /** @inheritdoc */
    public sequenceEqual(other: Sequence<T>,
                         comparer?: EqualityComparer<T> | string | true, keyComparer?: EqualityComparer<any> | string | true): boolean {
        
        let ec = Helpers.toEqualityComparerSafe(comparer, this);
        let kc = Helpers.toEqualityComparerSafe(keyComparer, this);

        let enumOther = from(makeIterable<T>(other)).getEnumerator();
        let enumThis = this.getEnumerator();

        while (enumThis.moveNext()) {
            let x = enumThis.current;

            if (!enumOther.moveNext()) {
                // that sequence has more items
                return false;
            }

            let y = enumOther.current;

            if (!ec(x, y)) {
                // different values
                return false;
            }

            if (!kc(enumThis.key, enumOther.key)) {
                // different keys
                return false;
            }
        }

        if (enumOther.moveNext()) {
            // other has more items
            return false;
        }

        return true;
    }

    /** @inheritdoc */
    public single(predicate?: Predciate<T> | string): T {
        let p = Helpers.toPredicateSafe(predicate, this);

        let e = this.getEnumerator();
        let result: T;
        let found = false;
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            let doesMatch = p(ctx.item, ctx);

            if (ctx.cancel) {
                break;
            }

            if (doesMatch) {
                if (!found) {
                    found = true;
                    result = ctx.item;
                }
                else {
                    throw "Sequence contains more than one matching element!";
                }
            }

            prevVal = ctx.nextValue;
            value = ctx.value;
        }

        if (!found) {
            throw "No matching element found!";
        }

        return result;
    }

    /** @inheritdoc */
    public singleOrDefault<U>(predicateOrDefaultValue?: Predciate<T> | string | U, defaultValue?: U): T | U {
        let args = Helpers.toOrDefaultArgs(predicateOrDefaultValue, defaultValue,
                                           arguments.length);

        let e = this.getEnumerator();
        let result: T | U;
        let found = false;
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            let doesMatch = args.predicate(ctx.item, ctx);

            if (ctx.cancel) {
                break;
            }

            if (doesMatch) {
                if (!found) {
                    found = true;
                    result = ctx.item;
                }
                else {
                    throw "Sequence contains more than one matching element!";
                }
            }

            prevVal = ctx.nextValue;
            value = ctx.value;
        }

        if (!found) {
            result = args.defaultValue;
        }

        return result;
    }

    /** @inheritdoc */
    public skip(cnt: number): IEnumerable<T> {
        return this.skipWhile((item, ctx) => ctx.index < cnt);
    }

    /** @inheritdoc */
    public skipLast(): IEnumerable<T> {
        return from(this.skipLastInner());
    }

    /**
     * The logic for the 'skipLast()' method.
     * 
     * @return {Iterator<T>} The iterator.
     */ 
    protected* skipLastInner(): Iterator<T> {
        let e = this.getEnumerator();
        let hasRemainingItems: boolean;
        let isFirst = true;
        let item: T;

        do
        {
            hasRemainingItems = e.moveNext();
            if (!hasRemainingItems) {
                continue;
            }

            if (!isFirst) {
                yield item;
            }
            else {
                isFirst = false;
            }

            item = e.current;
        }
        while (hasRemainingItems);
    }

    /** @inheritdoc */
    public skipWhile(predicate: Predciate<T> | string): IEnumerable<T> {
        let p = Helpers.toPredicateSafe(predicate, this);

        return from(this.skipWhileInner(p));
    }

    /**
     * The logic for the 'skipWhile()' method.
     * 
     * @param {Predciate<T>} predicate The predicate.
     * 
     * @return {Iterator<T>} The iterator.
     */   
    protected* skipWhileInner(predicate: Predciate<T>): Iterator<T> {
        let e = this.getEnumerator();
        let index = -1;
        let prevVal: any;
        let value: any;
        let skipItems = true;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            if (skipItems) {
                skipItems = predicate(ctx.item, ctx);
            }

            if (ctx.cancel) {
                skipItems = false;
            }

            if (!skipItems) {
                yield ctx.item;
            }

            prevVal = ctx.nextValue;
            value = ctx.value;
        }
    }

    /** @inheritdoc */
    public sum<U>(defaultValue?: U): number | U {
        return this.aggregate<number, U>((result, item) => {
            let x = toNumber(result);
            let y = toNumber(item);

            return x + y;
        }, defaultValue);
    }

    /** @inheritdoc */
    public take(cnt: number): IEnumerable<T> {
        return this.takeWhile((item, ctx) => ctx.index < cnt);
    }

    /** @inheritdoc */
    public takeWhile(predicate: Predciate<T> | string): IEnumerable<T> {
        let p = Helpers.toPredicateSafe(predicate, this);

        return from(this.takeWhileInner(p));
    }

    /**
     * The logic for the 'skipWhile()' method.
     * 
     * @param {Predciate<T>} predicate The predicate.
     * 
     * @return {Iterator<T>} The iterator.
     */   
    protected* takeWhileInner(predicate: Predciate<T>): Iterator<T> {
        let e = this.getEnumerator();
        let alwaysMatches = false;
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            let doesMatch = predicate(ctx.item, ctx) || alwaysMatches;

            if (ctx.cancel) {
                alwaysMatches = true;
            }

            if (!doesMatch) {
                break;
            }
            
            yield ctx.item;

            prevVal = ctx.nextValue;
            value = ctx.value;
        }

        return this;
    }

    /** @inheritdoc */
    public toArray(keySelector?: KeySelector<number, T, number> | string | true): T[] {
        if (true === keySelector) {
            keySelector = (key) => parseInt(('' + key).trim());
        }

        let ks = <KeySelector<number, T, number>>Helpers.asFunc(keySelector);
        
        let arr: T[] = [];

        let e = this.getEnumerator();
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            let action: () => void;

            if (!ks) {
                action = () => arr.push(ctx.item);
            }
            else {
                action = () => {
                    let k = ks(e.key,
                               ctx.item, ctx);

                    arr[k];
                };
            }

            if (ctx.cancel) {
                break;
            }

            action();

            prevVal = ctx.nextValue;
            value = ctx.value;
        }

        return arr;
    }

    /** @inheritdoc */
    public toList(isReadOnly?: boolean, comparer?: EqualityComparer<T> | string): IList<T> {
        if (isReadOnly) {
            return new ReadOnlyCollection<T>(this, comparer);
        }

        return new List<T>(this, comparer);
    }

    /** @inheritdoc */
    public toLookup<TKey extends PropertyKey>(keySelector: Selector<T, TKey> | string,
                                              keyEqualityComparer?: EqualityComparer<TKey> | string): ILookup<T, TKey> {
        
        return new Lookup<T, TKey>(this.groupBy(keySelector, keyEqualityComparer));
    }

    /** @inheritdoc */
    public toSet(comparer?: EqualityComparer<T> | string): ISet<T> {
        return new HashSet<T>(this, comparer);
    }

    /** @inheritdoc */
    public union(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T> {
        return this.concat(other)
                   .distinct(comparer);
    }

    /** @inheritdoc */
    public where(predicate: Predciate<T> | string): IEnumerable<T> {
        return from(this.whereInner(Helpers.toPredicateSafe(predicate, this)));
    }

    /**
     * The logic for the 'where()' method.
     * 
     * @param {Predciate<T>} predicate The predicate.
     * 
     * @return {Iterator<T>} The iterator.
     */    
    protected* whereInner(predicate: Predciate<T>): Iterator<T> {
        let e = this.getEnumerator();
        let index = -1;
        let prevVal: any;
        let value: any;
        while (e.moveNext()) {
            let ctx = new ItemContext(e, ++index, prevVal);
            ctx.value = value;

            let doesMatch = predicate(ctx.item, ctx);

            if (ctx.cancel) {
                break;
            }

            if (doesMatch) {
                yield ctx.item;
            }

            prevVal = ctx.nextValue;
            value = ctx.value;
        }
    }

    /** @inheritdoc */
    public zip<TTarget>(other: Sequence<T>, zipper: Zipper<T, T, TTarget> | string): IEnumerable<TTarget> {
        let e = from(makeIterable<T>(other)).getEnumerator();
        let z = Helpers.toZipperSafe<T, T, TTarget>(zipper, this);

        return from(this.zipInner(e, z));
    }

    /**
     * The logic for the 'zip()' method.
     * 
     * @param {Iterator<T>} other The other sequence.
     * @param {Zipper<T, U>} zipper The "zipper".
     * 
     * @return {Iterator<U>} The iterator.
     */ 
    protected* zipInner<TTarget>(other: IEnumerator<T>, zipper: Zipper<T, T, TTarget>): Iterator<TTarget> {
        let e = this.getEnumerator();
        let index = -1;
        let prevVal1: any;
        let prevVal2: any;
        let value1: any;
        let value2: any;
        while (e.moveNext() && other.moveNext()) {
            ++index;

            let ctx1 = new ItemContext(e, index, prevVal1);
            ctx1.value = value1;

            let ctx2 = new ItemContext(other, index, prevVal2);
            ctx2.value = value2;

            let zipped = zipper(ctx1.item, ctx2.item,
                                ctx1, ctx2);

            if (ctx1.cancel || ctx2.cancel) {
                break;
            }

            yield zipped;

            prevVal1 = ctx1.nextValue;
            prevVal2 = ctx2.nextValue;
            value1 = ctx1.value;
            value2 = ctx2.value;
        }
    }
}

/**
 * A wrapper for another sequence.
 */
export class WrappedEnumerable<T> extends Enumerable<T> {
    /**
     * Stores the wrapped sequence.
     */
    protected _seq: IEnumerable<T>;

    /**
     * Initializes a new instance of that class.
     * 
     * @param {IEnumerable<T>} [seq] The sequence to wrap.
     */
    constructor(seq?: IEnumerable<T>) {
        let i: Iterator<T>;
        if (seq) {
            i = seq.getEnumerator();
        }

        super(i);

        this._seq = seq;
    }

    /** @inheritdoc */
    public [Symbol.iterator](): IEnumerator<T> {
        return this._seq.getEnumerator();
    }

    /**
     * Gets the wrapped sequence.
     */
    public get sequence(): IEnumerable<T> {
        return this._seq;
    }
}

/**
 * A sequence based on an "array like" object.
 */
export class ArrayEnumerable<T> extends Enumerable<T> {
    /**
     * The underlying "array".
     */
    protected _arr: ArrayLike<T>;

    /**
     * Initializes a new instance of that class.
     * 
     * @param {ArrayLike<T>} [arr] The underlying "array".
     */
    constructor(arr?: ArrayLike<T>) {
        super();

        this._arr = arr || [];
        this._enumerator = this.getEnumerator();
    }

    /** @inheritdoc */
    public [Symbol.iterator](): IEnumerator<T> {
        return new ArrayEnumerator<T>(this._arr);
    }
}

/**
 * A grouping of elements.
 */
export class Grouping<T, TKey> extends WrappedEnumerable<T> implements IGrouping<T, TKey> {
    /**
     * Stores the "key"/"group" value.
     */
    protected _key: TKey;

    /**
     * Initializes a new instance of that class.
     * 
     * @param {TKey} key The value that represents the group.
     * @param {IEnumerable<T>} seq The sequence with the elements.
     */
    constructor(key: TKey, seq: IEnumerable<T>) {
        super(seq);

        this._key = key;
    }

    /** @inheritdoc */
    public get key(): TKey {
        return this._key;
    }
}

/**
 * A lookup object.
 */
export class Lookup<T, TKey extends PropertyKey> extends WrappedEnumerable<IGrouping<T, TKey>>
                                                 implements ILookup<T, TKey> {
    /**
     * Initializes a new instance of that class.
     * 
     * @param {IEnumerable<IGrouping<T, U>>} [seq] The sequence with the elements.
     */
    constructor(seq?: IEnumerable<IGrouping<T, TKey>>) {
        super();

        let me: any = this;

        let groupings: IGrouping<T, TKey>[] = [];
        if (seq) {
            let e = seq.getEnumerator();
            while (e.moveNext()) {
                let g = e.current;

                me[<any>g.key] = g;
                groupings.push(g);
            }
        }

        this._seq = from(groupings);
    }
}

/**
 * A collection.
 */
export class Collection<T> extends ArrayEnumerable<T> implements ICollection<T> {
    /**
     * Stores the equality comparer for the items.
     */
    protected _comparer: EqualityComparer<T>;
    /**
     * Stores the if the collection has changed while the last iteration.
     */
    protected _hasChanged: boolean;
    
    /**
     * Initializes a new instance of that class.
     * 
     * @param {Sequence<T>} [seq] The initial data.
     * @param {EqualityComparer<T> | string} [comparer] The equality comparer for the items.
     */
    constructor(seq?: Sequence<T>, comparer?: EqualityComparer<T> | string) {
        super();

        this._arr = from(seq).toArray();
        this._comparer = Helpers.toEqualityComparerSafe<T>(comparer, this);
        this._hasChanged = false;
    }

    /** @inheritdoc */
    public add(item: T): void {
        this.throwIfReadOnly();

        this.markAsChanged(x => {
            let a = <T[]>x._arr;
            a.push(item);
        });
    }

    /** @inheritdoc */
    public addRange(...items: T[]): void {
        if (items) {
            for (let i = 0; i < items.length; i++) {
                this.add(items[i]);
            }
        }
    }

    /** @inheritdoc */
    public clear(): void {
        this.throwIfReadOnly();

        this.markAsChanged(x => {
            x._arr = [];
        });
    }

    /** @inheritdoc */
    public containsItem(item: T): boolean {
        for (let i = 0; i < this._arr.length; i++) {
            let x = this._arr[i];
            if (this._comparer(x, item)) {
                return true;
            }
        }

        return false;
    }

    /** @inheritdoc */
    public getItem(index: number): T {
        return this._arr[index];
    }

    /** @inheritdoc */
    public get isReadonly(): boolean {
        return false;
    }

    /** @inheritdoc */
    public get length(): number {
        return this._arr.length;
    }

    /**
     * Invokes a function and marks the collection as changed since last iteration.
     * 
     * @param {(coll: Collection<T>) => TResult} [func] The optional function to invoke.
     * 
     * @return {TResult} The result of the function.
     */
    protected markAsChanged<TResult>(func?: (coll: Collection<T>) => TResult): TResult {
        let result: TResult;
        if (func) {
            result = func(this);
        }

        this._hasChanged = true;

        return result;
    }

    /** @inheritdoc */
    public push(...items: T[]): number {
        this.throwIfReadOnly();

        this.addRange
            .apply(this, arguments);

        return this._arr.length;
    }

    /** @inheritdoc */
    public remove(item: T): boolean {
        let me = this;

        let itemRemoved = false;
        return this.removeAll((x, ctx) => {
            if (itemRemoved) {
                ctx.cancel = true;
                return;
            }

            return itemRemoved = me._comparer(x, item);
        }) > 0;
    }

    /** @inheritdoc */
    public removeAll(predicate: Predciate<T> | string): number {
        this.throwIfReadOnly();

        let p = Helpers.toPredicateSafe(predicate, this);

        let e = this.getEnumerator();
        let prevVal: any;
        let value: any;
        let removedItems = 0;
        for (let i = 0; i < this._arr.length; i++) {
            let item = this._arr[i];

            let ctx = new ItemContext(e, i, prevVal);

            let doRemove = p(item, ctx);

            if (ctx.cancel) {
                break;
            }

            if (doRemove) {
                this.markAsChanged(x => {
                    let a = <T[]>x._arr;
                    a.splice(i, 1);

                    ++removedItems;
                });
            }
        }

        return removedItems;
    }

    /** @inheritdoc */
    public setItem(index: number, item: T): IList<T> {
        this.throwIfReadOnly();

        return this.markAsChanged((x: List<T>) => {
            let a = <T[]>x._arr;
            a[index] = item;
            
            return x;
        });
    }

    /**
     * Throws if collection is read-only.
     * 
     * @throws "Collection is read-only!"
     */
    protected throwIfReadOnly(): void {
        if (this.isReadonly) {
            throw "Collection is read-only!";
        }
    }
}

/**
 * A set of items.
 */
export class HashSet<T> extends Collection<T> implements ISet<T> {
    /**
     * Initializes a new instance of that class.
     * 
     * @param {Sequence<T>} [seq] The initial data.
     * @param {EqualityComparer<T> | string} [comparer] The equality comparer for the items.
     */
    constructor(seq?: Sequence<T>, comparer?: EqualityComparer<T> | string) {
        super(seq, comparer);

        this._arr = from(this._arr).distinct(this._comparer)
                                   .toArray();
        this._hasChanged = false;
    }

    /** @inheritdoc */
    public add(item: T): boolean {
        return this.addIfNotPresent(item);
    }

    /**
     * Adds an item if not in collection yet.
     * 
     * @param {T} item The item to add.
     * 
     * @return {boolean} Item was added or not.
     */
    protected addIfNotPresent(item: T): boolean {
        let a = <T[]>this._arr;
        
        for (let i = 0; i < a.length; i++) {
            let t = a[i];
            if (this._comparer(t, item)) {
                return false;  // already in collection
            }
        }
        
        super.add(item);
        return true;
    }

    /** @inheritdoc */
    public intersectWith(other: Sequence<T>): ISet<T> {
        this.throwIfReadOnly();

        return this.markAsChanged((ht: HashSet<T>) => {
            ht._arr = from(ht._arr).intersect(other, ht._comparer)
                                   .toArray();

            return ht;
        });
    }

    /** @inheritdoc */
    public isProperSubsetOf(other: Sequence<T>): boolean {
        let otherHS = from(other).toSet(this._comparer);
        
        if (this.length < 1) {
            return otherHS.length > 0;
        }

        if (this.length < otherHS.length) {
            for (let i = 0; i < this._arr.length; i++) {
                let t = this._arr[i];

                if (!otherHS.containsItem(t)) {
                    return false;
                }
            }
            
            return true;
        }

        return false;
    }

    /** @inheritdoc */
    public isProperSupersetOf(other: Sequence<T>): boolean {
        if (this.length < 1) {
            return false;
        }

        let otherHS = from(other).toSet(this._comparer);

        if (otherHS.length < 1) {
            return true;
        }

        let otherHSEnumerator = this.getEnumerator();
        while (otherHSEnumerator.moveNext()) {
            let o = otherHSEnumerator.current;

            if (!this.containsItem(o)) {
                return false;
            }
        }

        return true;
    }

    /** @inheritdoc */
    public isSubsetOf(other: Sequence<T>): boolean {
        if (this.length < 1) {
            return true;
        }

        let otherHS = from(other).toSet(this._comparer);

        for (let i = 0; i < this._arr.length; i++) {
            let t = this._arr[i];

            if (!otherHS.containsItem(t)) {
                return false;
            }
        }
        
        return true;
    }

    /** @inheritdoc */
    public isSupersetOf(other: Sequence<T>): boolean {
        if (this.length < 1) {
            return true;
        }

        let otherHS = from(other).toSet(this._comparer);
        if (otherHS.length < 1) {
            return true;
        }

        let otherHSEnumerator = this.getEnumerator();
        while (otherHSEnumerator.moveNext()) {
            let o = otherHSEnumerator.current;

            if (!this.containsItem(o)) {
                return false;
            }
        }
        
        return true;
    }

    /** @inheritdoc */
    public overlaps(other: Sequence<T>): boolean {
        return from(this._arr).intersect(other, this._comparer)
                              .any();
    }

    /** @inheritdoc */
    public setEquals(other: Sequence<T>): boolean {
        let otherHS = from(other).toSet(this._comparer);
        if (this.length === otherHS.length) {
            let otherHSEnumerator = this.getEnumerator();
            while (otherHSEnumerator.moveNext()) {
                let o = otherHSEnumerator.current;

                if (!this.containsItem(o)) {
                    return false;
                }
            }

            return true;
        }

        return false;
    }

    /** @inheritdoc */
    public symmetricExceptWith(other: Sequence<T>): ISet<T> {
        this.throwIfReadOnly();

        return this.markAsChanged((ht: HashSet<T>) => {
            if (ht.length < 1) {
                ht.unionWith(other);
            }
            else {
                let e = from(other).getEnumerator();
                while (e.moveNext()) {
                    let o = e.current;

                    if (!ht.remove(o)) {
                        ht.addIfNotPresent(o);
                    }
                }
            }

            return ht;
        });
    }

    /** @inheritdoc */
    public unionWith(other: Sequence<T>): ISet<T> {
        this.throwIfReadOnly();

        return this.markAsChanged((ht: HashSet<T>) => {
            ht._arr = from(ht._arr).union(other, ht._comparer)
                                   .toArray();

            return ht;
        });
    }
}

/**
 * A list.
 */
export class List<T> extends Collection<T> implements IList<T> {
    /** @inheritdoc */
    public indexOf(item: T): number {
        for (let i = 0; i < this._arr.length; i++) {
            if (this._comparer(this._arr[i], item)) {
                return i;  // found
            }
        }

        return -1;
    }

    /** @inheritdoc */
    public insert(index: number, item: T): void {
        let me = this;
        me.throwIfReadOnly();
        
        this.markAsChanged((list: List<T>) => {
            let a = <T[]>list._arr;
            a.splice(index, 0, item);
        });
    }

    /** @inheritdoc */
    public removeAt(index: number): boolean {
        this.throwIfReadOnly();

        if (index >= 0 && index < this._arr.length) {
            return this.markAsChanged((x: List<T>) => {
                let a = <T[]>x._arr;
                a.splice(index, 1);

                return true;
            });
        }

        return false;
    }
}

/**
 * A readonly collection / list.
 */
export class ReadOnlyCollection<T> extends List<T> {
    /** @inheritdoc */
    public get isReadonly(): boolean {
        return true;
    }
}

/**
 * An ordered sequence.
 */
export class OrderedEnumerable<T, U> extends Enumerable<T> implements IOrderedEnumerable<T> {
    /**
     * Stores the comparer for the sort operation.
     */
    protected _orderComparer: Comparer<U>;
    /**
     * Stores the array of items in original order.
     */
    protected _originalItems: T[];
    /**
     * Stores the sort value selector.
     */
    protected _orderSelector: Selector<T, U>;

    /**
     * Initializes a new instance of that class.
     * 
     * @param {IEnumerable<T>} seq The source sequence.
     * @param {Selector<T, U> | string} selector The selector for the sort values.
     * @param {Comparer<U> | string} comparer The comparer to use.
     */
    constructor(seq: IEnumerable<T>,
                selector: Selector<T, U> | string, comparer: Comparer<U> | string) {

        super();

        let me = this;

        this._orderComparer = Helpers.toComparerSafe<U>(comparer, this);
        this._orderSelector = Helpers.toSelectorSafe<T, U>(selector, this);

        this._originalItems = seq.toArray();

        let oi = new ArrayEnumerator<T>(this._originalItems);
        
        let prevValue: any;
        let value: any;
        this._enumerator = new ArrayEnumerator<T>(this._originalItems.map((x, index) => {
            if (!oi.moveNext()) {
                return null;
            }

            let ctx = new ItemContext<T>(oi, index, prevValue);
            ctx.value = value;

            let sortValue = {
                sortBy: me.selector(x, ctx),
                value: x,
            };

            prevValue = ctx.nextValue;
            value = ctx.value;

            return sortValue;
        }).filter(x => !!x)
          .sort((x, y) => me.comparer(x.sortBy, y.sortBy))
          .map(x => x.value));
    }

    /**
     * Gets the comparer.
     */
    public get comparer(): Comparer<U> {
        return this._orderComparer;
    }

    /**
     * Gets the selector.
     */
    public get selector(): Selector<T, U> {
        return this._orderSelector;
    }

    /** @inheritdoc */
    public then(comparer?: Comparer<T> | string): IOrderedEnumerable<T> {
        return this.thenBy<T>(x => x, comparer);
    }

    /** @inheritdoc */
    public thenBy<TKey>(selector: Selector<T, TKey> | string,
                        comparer?: Comparer<TKey> | string): IOrderedEnumerable<T> {
        let me = this;

        let c = Helpers.toComparerSafe<TKey>(comparer, this);
        let s = Helpers.toSelectorSafe<T, TKey>(selector, this);

        return from(this._originalItems)
            .orderBy((x, ctx) => {
                        return {
                            level_0: me.selector(x, ctx),
                            level_1: s(x, ctx),
                        };
                    },
                    (x, y) => {
                        let compLevel0 = me.comparer(x.level_0, y.level_0);
                        if (0 !== compLevel0) {
                            return compLevel0;
                        }

                        return c(x.level_1, y.level_1);
                    });
    }

    /** @inheritdoc */
    public thenByDescending<TKey>(selector: Selector<T, TKey> | string,
                                  comparer?: Comparer<TKey> | string): IOrderedEnumerable<T> {
        let c = Helpers.toComparerSafe<TKey>(comparer);
    
        return this.thenBy(selector,
                           (x, y) => c(y, x));
    }

    /** @inheritdoc */
    public thenDescending(comparer?: Comparer<T> | string): IOrderedEnumerable<T> {
        return this.thenByDescending<T>(x => x, comparer);
    }
}


/**
 * Creates a new enumerable from a list of items.
 * 
 * @param {T} [...sequences] One or more items to add.
 * 
 * @return {IEnumerable<T>} The new enumerable.
 */
export function create<T>(...items: T[]): IEnumerable<T> {
    return from(items);
}

/**
 * Creates a new enumerable.
 * 
 * @param {ArrayLike<T> | Iterator} [...sequences] One or more sequence with items.
 * 
 * @return {IEnumerable<T>} The new enumerable.
 */
export function from<T>(...sequences: Sequence<T>[]): IEnumerable<T> {
    if (!sequences || sequences.length < 1) {
        sequences = [ [] ];
    }

    let result: IEnumerable<T>;

    for (let i = 0; i < sequences.length; i++) {
        let seq: any = sequences[i];
        if (!seq) {
            seq = [];
        }

        let seqToConcat: IEnumerable<T>;
        if (isArrayLike(seq)) {
            seqToConcat = new ArrayEnumerable<T>(seq);
        }
        else {
            if (typeof seq[Symbol.iterator] !== "undefined") {
                seq = seq[Symbol.iterator]();  // Iterable<T>
            }

            seqToConcat = new Enumerable<T>(seq);
        }

        if (i > 0) {
            result = result.concat(seqToConcat);
        }
        else {
            result = seqToConcat;
        }
    }

    return result;
}
