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
export type Sequence<T> = ArrayLike<T> | Iterator<T>;
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
export interface IEnumerable<T> extends Iterator<T> {
    /**
     * Aggregates all itms of the sequence to one item.
     * 
     * @param {(result: any, item: T, ctx: IItemContext<T>) => U | string} The aggregator.
     * @param {V} [defaultValue] The value to return if sequence is empty.
     * 
     * @return {U | V} The aggregated value or the default value.
     */
    aggregate<U, V>(aggregator: Aggregator<T, U> | string,
                    defaultValue?: V): U | V;

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
     * @param {U} [defaultValue] The custom value that is returned if sequence has no items.
     * 
     * @return {number | U} The average of the sequence or the default value.
     */
    average<U>(defaultValue?: U): number | U;

    /**
     * Gets if the sequence can be resetted or not.
     */
    readonly canReset: boolean;

    /**
     * Casts the items of that sequence to a new type.
     * 
     * @return {IEnumerable<U>} The new sequence.
     */
    cast<U>(): IEnumerable<U>;

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
     * Gets the current item / element.
     */
    readonly current: T;

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
     * @param {U} [defaultValue] The value to return if no element has been found.
     * 
     * @return {T | U} The item or the default value.
     * 
     * @throws Sequence has no matching item.
     */
    elementAtOrDefault<U>(index: number, defaultValue?: U): T | U;

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
     * @param {Predciate<T> | string | U} [predicateOrDefaultValue] The custom predicate to use.
     *                                                              If there are less than 2 arguments and the first argument is NOT a function,
     *                                                              it is used as default value.
     * 
     * @return {T | U} The item or the default value.
     */
    firstOrDefault<U>(predicateOrDefaultValue?: Predciate<T> | string | U, defaultValue?: U): T | U;

    /**
     * Alias for 'each()' method.
     */
    forEach(action: Action<T>): void;

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

    /**
     * Gets if the 'moveNext()' can be called or not.
     */
    readonly isValid: boolean;

    /**
     * Gets the current key.
     */
    readonly itemKey: any;

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
     * @param {Predciate<T> | string | U} [predicateOrDefaultValue] The custom predicate to use.
     *                                                              If there are less than 2 arguments and the first argument is NOT a function,
     *                                                              it is used as default value.
     * 
     * @return {T | U} The item or the default value.
     */
    lastOrDefault<U>(predicateOrDefaultValue?: Predciate<T> | string | U, defaultValue?: U): T | U;

    /**
     * Returns the "biggest" item of that sequence.
     * 
     * @param {V} [defaultValue] The value to return if sequence is empty.
     * 
     * @return {U | V} The "biggest" value or the default value.
     */
    max<U>(defaultValue?: U): T | U;

    /**
     * Returns the "smallest" item of that sequence.
     * 
     * @param {V} [defaultValue] The value to return if sequence is empty.
     * 
     * @return {U | V} The "smallest" value or the default value.
     */
    min<U>(defaultValue?: U): T | U;

    /**
     * Moves to the next element.
     * 
     * @return New element is available or not.
     */
    moveNext(): boolean;

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
     * @return {IEnumerable<U>} The new sequence.
     */
    ofType<U>(type: string): IEnumerable<U>;

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
     * @param {Selector<T, U> | string} selector The key selector.
     * @param {Comparer<U> | string} [comparer] The custom key comparer to use.
     * 
     * @throws At least one argument is invalid.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    orderBy<U>(selector: Selector<T, U> | string, comparer?: Comparer<U> | string): IOrderedEnumerable<T>;

    /**
     * Sorts the elements of that sequence in descending order.
     * 
     * @param {Selector<T, U> | string} selector The key selector.
     * @param {Comparer<U> | string} [comparer] The custom key comparer to use.
     * 
     * @throws At least one argument is invalid.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    orderByDescending<U>(selector: Selector<T, U> | string, comparer?: Comparer<U> | string): IOrderedEnumerable<T>;

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
     * Resets the sequence.
     * 
     * @chainable.
     */
    reset(): IEnumerable<T>;

    /**
     * Reverses the order of the sequence.
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    reverse(): IOrderedEnumerable<T>;

    /**
     * Projects the items of that sequence to new items.
     * 
     * @param {Selector<T, U> | string} The selector to use.
     * 
     * @return {IEnumerable<U>} The new sequence.
     */
    select<U>(selector: Selector<T, U> | string): IEnumerable<U>;

    /**
     * Projects each item to a list of new items and flattens them to a new sequence.
     * 
     * @param {ManySelector<T, U> | string} The selector to use.
     * 
     * @return {IEnumerable<U>} The new sequence.
     */
    selectMany<U>(selector: ManySelector<T, U> | string): IEnumerable<U>;
    
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
     * @param {Predciate<T> | string | U} [predicateOrDefaultValue] The custom predicate to use.
     *                                                              If there are less than 2 arguments and the first argument is NOT a function,
     *                                                              it is used as default value.
     * 
     * @return {T | U} The item or the default value.
     * 
     * @throws Sequence contains more than one machting element.
     */
    singleOrDefault<U>(predicateOrDefaultValue?: Predciate<T> | string | U, defaultValue?: U): T | U;

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
     * @param {U} [defaultValue] The custom value that is returned if sequence has no items.
     * 
     * @return {number | U} The sum or the default value.
     */
    sum<U>(defaultValue?: U): number | U;

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
    toLookup<TKey extends string | number>(keySelector: Selector<T, TKey>,
                                           keyEqualityComparer?: EqualityComparer<TKey> | string): ILookup<T, TKey>;

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
     * @param {Zipper<T, U>} zipper The selector for the combined result items of the elements of the two sequences.
     * 
     * @return IEnumerable<U> The new sequence.
     */
    zip<U>(other: Sequence<T>, zipper: Zipper<T, T, U>): IEnumerable<U>;
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
     * Gets the current key.
     */
    readonly key: any;

    /**
     * Gets or sets the value for the next item.
     */
    nextValue: any;
    
    /**
     * Gets the value of the previous item.
     */
    readonly previousValue: any;

    /**
     * Gets the underlying sequence.
     */
    readonly sequence: IEnumerable<T>;

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
     * @param {Selector<T, U> | string} selector The key selector.
     * @param {Comparer<U> | string} [comparer] The custom comparer to use.
     * 
     * @throws At least one argument is invalid.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    thenBy<U>(selector: Selector<T, U> | string, comparer?: Comparer<U> | string): IOrderedEnumerable<T>;

    /**
     * Performs a subsequent ordering of the elements in that sequence in descending order, according to a key.
     * 
     * @param {Selector<T, U> | string} selector The key selector.
     * @param {Comparer<U> | string} [comparer] The custom comparer to use.
     * 
     * @throws At least one argument is invalid.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    thenByDescending<U>(selector: Selector<T, U> | string, comparer?: Comparer<U> | string): IOrderedEnumerable<T>;

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
export interface ILookup<T, TKey extends string | number> extends IEnumerable<IGrouping<T, TKey>>, Object {
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
     * @return {number} The number of added items.
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

interface IOrDefaultArgs<T, U> {
    defaultValue?: U;
    predicate: Predciate<T>;
}

class ItemContext<T> implements IItemContext<T> {
    protected _index: number;
    protected _previousValue: any;
    protected _sequence: IEnumerable<T>;

    constructor(seq: IEnumerable<T>, index: number, previousValue?: any) {
        this._sequence = seq;
        this._index = index;
        this._previousValue = previousValue;
    }

    public cancel: boolean = false;

    public get index(): number {
        return this._index;
    }

    public get isFirst(): boolean {
        return 0 === this._index;
    }

    public get item(): T {
        return this._sequence.current;
    }

    public get key(): any {
        return this._sequence.itemKey;
    }

    public get previousValue(): any {
        return this._previousValue;
    }

    public nextValue: any;

    public get sequence(): IEnumerable<T> {
        return this._sequence;
    }

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
     * The current item
     */
    protected _current: IteratorResult<T>;
    /**
     * The current zero based index.
     */
    protected _index = -1;
    /**
     * The underyling iterator.
     */
    protected _iterator: Iterator<T>;

    /**
     * Initializes a new instance of that class.
     * 
     * @param {Iterator<T>} [iterator] The underyling iterator.
     */
    constructor(iterator?: Iterator<T>) {
        this._iterator = iterator || makeIterable<T>();
    }

    /** @inheritdoc */
    public aggregate<U, V>(aggregator: Aggregator<T, U> | string,
                           defaultValue?: V): U | V {
        
        let a = <Aggregator<T, U>>asFunc(aggregator);
        if (!a) {
            a = (result, item) => result = result + item;
        }

        let result: U | V = defaultValue;

        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
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
        let p = toPredicateSafe(predicate);

        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
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
        let p = toPredicateSafe(predicate);

        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
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
    public average<U>(defaultValue?: U): number | U {
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
    public get canReset(): boolean {
        return false;
    }

    /** @inheritdoc */
    public cast<U>(): IEnumerable<U> {
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
        // first the items of THAT sequence
        while (this.moveNext()) {
            yield this.current;
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
        let equalityComparer = toEqualityComparerSafe<T>(comparer);

        return this.any(x => equalityComparer(x, item));
    }

    /** @inheritdoc */
    public count(predicate?: Predciate<T> | string): number {
        let p = toPredicateSafe(predicate);

        let cnt = 0;
        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
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
    public get current(): T {
        return this._current.value;
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
        if (this.moveNext()) {
            do {
                yield this.current;
            }
            while (this.moveNext());
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
        let ec = toEqualityComparerSafe(comparer);

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
        let ec = toEqualityComparerSafe(comparer);

        let temp: T[] = [];

        let index = -1;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index);

            // check for duplicate
            let alreadyExists = false;
            for (let i = 0; i < temp.length; i++) {
                let existingItem = temp[i];
                if (ec(ctx.item, existingItem)) {
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

        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
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

        return this.first((item, ctx) => {
            return 0 === index--;
        });
    }

    /** @inheritdoc */
    public elementAtOrDefault<U>(index: number, defaultValue?: U): T | U {
        index = toNumber(index);
        if (index < 0) {
            throw `Index out of range: ${index}`;
        }

        return this.firstOrDefault<U>((item, ctx) => {
            return 0 === index--;
        }, defaultValue);
    }

    /** @inheritdoc */
    public except(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T> {
        let equalityComparer = toEqualityComparerSafe(comparer);
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
        while (this.moveNext()) {
            let item = this.current;
            
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
        let p = toPredicateSafe(predicate);

        let result: T;
        let found = false;
        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
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
    public firstOrDefault<U>(predicateOrDefaultValue?: Predciate<T> | string | U, defaultValue?: U): T | U {
        let args = toOrDefaultArgs<T, U>(predicateOrDefaultValue, defaultValue,
                                         arguments.length);

        let result: T | U;
        let found = false;
        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
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
    public groupBy<TKey>(keySelector: Selector<T, TKey> | string,
                         keyEqualityComparer?: EqualityComparer<TKey> | string): IEnumerable<IGrouping<T, TKey>> {

        let ks = toSelectorSafe<T, TKey>(keySelector);
        let ksec = toEqualityComparerSafe<TKey>(keyEqualityComparer);

        let groupings: { key: TKey, items: T[] }[] = [];
        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
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
        let oks = toSelectorSafe<T, TKey>(outerKeySelector);
        let iks = toSelectorSafe<TInner, TKey>(innerKeySelector);
        let rs = <Zipper<T, IEnumerable<TInner>, TResult>>asFunc(resultSelector);
        let c = toEqualityComparerSafe<TKey>(comparer);

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

        let outerGroups = createGroupsForSequence(this, outerKeySelector);
        let innerGroups = createGroupsForSequence(inner, innerKeySelector);

        let ogIndex = -1;
        let prevValIG: any;
        let prevValOG: any;
        let valueIG: any;
        let valueOG: any;
        while (outerGroups.moveNext()) {
            let og = outerGroups.current;

            let ogValues = og.values;
            ogValues.reset();

            innerGroups.reset();
            let matchingInnerGroups = innerGroups.where(ig => keyEqualityComparer(og.key, ig.key))
                                                 .select(ig => new Grouping<TInner, TKey>(ig.key, ig.values));
            
            while (ogValues.moveNext()) {
                ++ogIndex;

                let igIndex = -1;
                while (matchingInnerGroups.moveNext()) {
                    ++igIndex;

                    let ctxOG = new ItemContext<T>(ogValues, ogIndex, prevValOG);
                    ctxOG.value = valueOG;

                    let ctxIG = new ItemContext(matchingInnerGroups, igIndex, prevValIG);
                    ctxIG.item.reset();
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
        let equalityComparer = toEqualityComparerSafe(comparer);
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

        while (this.moveNext()) {
            let item = this.current;

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
    public get isValid(): boolean {
        return !this._current ||
               !this._current.done;
    }

    /** @inheritdoc */
    public get itemKey(): number {
        return this._index;
    }

    /** @inheritdoc */
    public join<TInner, TKey, TResult>(inner: Sequence<TInner>,
                                       outerKeySelector: Selector<T, TKey> | string, innerKeySelector: Selector<TInner, TKey> | string,
                                       resultSelector: Zipper<T, TInner, TResult> | string,
                                       comparer?: EqualityComparer<TKey> | string): IEnumerable<TResult> {

        let i = from(inner);
        let oks = toSelectorSafe<T, TKey>(outerKeySelector);
        let iks = toSelectorSafe<TInner, TKey>(innerKeySelector);
        let rs = <Zipper<T, TInner, TResult>>asFunc(resultSelector);
        let c = toEqualityComparerSafe<TKey>(comparer);

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

        let outerGroups = createGroupsForSequence(this, outerKeySelector);
        let innerGroups = createGroupsForSequence(inner, innerKeySelector);

        let index = -1;
        let prevValIG: any;
        let prevValOG: any;
        let valueIG: any;
        let valueOG: any;
        while (outerGroups.moveNext()) {
            let og = outerGroups.current;
            let ogValues = from(og.values);

            innerGroups.reset();

            let matchingInnerGroups = innerGroups.where(ig => keyEqualityComparer(og.key, ig.key));
            while (matchingInnerGroups.moveNext()) {
                let ig = matchingInnerGroups.current;
                let igValues = from(ig.values);

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

        let index = -1;
        while (this.moveNext()) {
            ++index;
            let item = this.current;

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
        let p = toPredicateSafe(predicate);

        let result: T;
        let found = false;
        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
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
    public lastOrDefault<U>(predicateOrDefaultValue?: Predciate<T> | string | U, defaultValue?: U): T | U {
        let args = toOrDefaultArgs<T, U>(predicateOrDefaultValue, defaultValue,
                                         arguments.length);

        let result: T | U;
        let found = false;
        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
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
    public max<U>(defaultValue?: U): T | U {
        return this.aggregate<T, U>((result, item) => {
            if (item > result) {
                result = item;
            }

            return result;
        }, defaultValue);
    }

    /** @inheritdoc */
    public min<U>(defaultValue?: U): T | U {
        return this.aggregate<T, U>((result: T, item: T) => {
            if (item < result) {
                result = item;
            }

            return result;
        }, defaultValue);
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
        return this._iterator.next();
    }

    /** @inheritdoc */
    public notEmpty(): IEnumerable<T> {
        return this.where(x => !!x);
    }

    /** @inheritdoc */
    public ofType<U>(type: string): IEnumerable<U> {
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
    public orderBy<U>(selector: Selector<T, U> | string, comparer?: Comparer<U> | string): IOrderedEnumerable<T> {
        return new OrderedEnumerable<T, U>(this, selector, comparer);
    }

    /** @inheritdoc */
    public orderByDescending<U>(selector: Selector<T, U> | string, comparer?: Comparer<T> | string): IOrderedEnumerable<T> {
        let c = toComparerSafe(comparer);
    
        return this.orderBy<U>(selector,
                               (x, y) => c(y, x));
    }

    /** @inheritdoc */
    public orderDescending(comparer?: Comparer<T> | string): IOrderedEnumerable<T> {
        return this.orderByDescending<T>(x => x, comparer);
    }

    /** @inheritdoc */
    public pushToArray(arr: T[]): IEnumerable<T> {
        while (this.moveNext()) {
            if (arr) {
                arr.push(this.current);
            }
        }

        return this;
    }

    /** @inheritdoc */
    public reset(): IEnumerable<T> {
        throw "Not supported!";
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
    public select<U>(selector: Selector<T, U> | string): IEnumerable<U> {
        let s = toSelectorSafe<T, U>(selector);

        return from<U>(this.selectInner<U>(s));
    }

    /**
     * The logic for the 'select()' method.
     * 
     * @param {Selector<T, U>} selector The selector.
     * 
     * @return {Iterator<T>} The iterator.
     */  
    protected* selectInner<U>(selector: Selector<T, U>): Iterator<U> {
        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
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
    public selectMany<U>(selector: ManySelector<T, U> | string): IEnumerable<U> {
        let s = toManySelectorSafe<T, U>(selector);

        return from(this.selectManyInner(s));
    }

    /**
     * The logic for the 'selectMany()' method.
     * 
     * @param {ManySelector<T, U>} selector The selector.
     * 
     * @return {Iterator<T>} The iterator.
     */  
    protected* selectManyInner<U>(selector: ManySelector<T, U>): Iterator<U> {
        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
            ctx.value = value;

            let iterator = makeIterable<U>(selector(ctx.item, ctx));

            if (ctx.cancel) {
                break;
            }

            let lastResult: IteratorResult<U>;
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
        
        let ec = toEqualityComparerSafe(comparer);
        let kc = toEqualityComparerSafe(keyComparer);
        let seq = from(makeIterable<T>(other));

        while (this.moveNext()) {
            let x = this.current;

            if (!seq.moveNext()) {
                // that sequence has more items
                return false;
            }

            let y = seq.current;

            if (!ec(x, y)) {
                // different values
                return false;
            }

            if (!kc(this.itemKey, seq.itemKey)) {
                // different keys
                return false;
            }
        }

        if (seq.moveNext()) {
            // other has more items
            return false;
        }

        return true;
    }

    /** @inheritdoc */
    public single(predicate?: Predciate<T> | string): T {
        let p = toPredicateSafe(predicate);

        let result: T;
        let found = false;
        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
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
        let args = toOrDefaultArgs(predicateOrDefaultValue, defaultValue,
                                   arguments.length);

        let result: T | U;
        let found = false;
        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
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
        let hasRemainingItems: boolean;
        let isFirst = true;
        let item: T;

        do
        {
            hasRemainingItems = this.moveNext();
            if (!hasRemainingItems) {
                continue;
            }

            if (!isFirst) {
                yield item;
            }
            else {
                isFirst = false;
            }

            item = this.current;
        }
        while (hasRemainingItems);
    }

    /** @inheritdoc */
    public skipWhile(predicate: Predciate<T> | string): IEnumerable<T> {
        let p = toPredicateSafe(predicate);

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
        let index = -1;
        let prevVal: any;
        let value: any;
        let skipItems = true;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
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
        let p = toPredicateSafe(predicate);

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
        let alwaysMatches = false;
        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
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

        let ks = <KeySelector<number, T, number>>asFunc(keySelector);
        
        let arr: T[] = [];

        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
            ctx.value = value;

            let action: () => void;

            if (!ks) {
                action = () => arr.push(ctx.item);
            }
            else {
                action = () => {
                    let k = ks(ctx.key,
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
        return new List<T>(this, comparer, isReadOnly);
    }

    /** @inheritdoc */
    public toLookup<TKey extends string | number>(keySelector: Selector<T, TKey>,
                                                  keyEqualityComparer?: EqualityComparer<TKey> | string): ILookup<T, TKey> {
        
        return new Lookup<T, TKey>(this.groupBy(keySelector, keyEqualityComparer));
    }

    /** @inheritdoc */
    public union(other: Sequence<T>, comparer?: EqualityComparer<T> | string | true): IEnumerable<T> {
        return this.concat(other)
                   .distinct(comparer);
    }

    /** @inheritdoc */
    public where(predicate: Predciate<T> | string): IEnumerable<T> {
        return from(this.whereInner(toPredicateSafe(predicate)));
    }

    /**
     * The logic for the 'where()' method.
     * 
     * @param {Predciate<T>} predicate The predicate.
     * 
     * @return {Iterator<T>} The iterator.
     */    
    protected* whereInner(predicate: Predciate<T>): Iterator<T> {
        let index = -1;
        let prevVal: any;
        let value: any;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
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
    public zip<U>(other: Sequence<T>, zipper: Zipper<T, T, U>): IEnumerable<U> {
        let seq = from(makeIterable<T>(other));
        
        if (!zipper) {
            zipper = (item1: any, item2: any) => item1 + item2;
        }

        return from(this.zipInner<U>(seq, zipper));
    }

    /**
     * The logic for the 'zip()' method.
     * 
     * @param {Iterator<T>} other The other sequence.
     * @param {Zipper<T, U>} zipper The "zipper".
     * 
     * @return {Iterator<U>} The iterator.
     */ 
    protected* zipInner<U>(other: IEnumerable<T>, zipper: Zipper<T, T, U>): Iterator<U> {
        let index = -1;
        let prevVal1: any;
        let prevVal2: any;
        let value1: any;
        let value2: any;
        while (this.moveNext() && other.moveNext()) {
            ++index;

            let ctx1 = new ItemContext(this, index, prevVal1);
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
     * Initializes a new instance of that class.
     * 
     * @param {IEnumerable<T>} seq The sequence to wrap.
     */
    constructor(seq: IEnumerable<T>) {
        super(seq);
    }

    /** @inheritdoc */
    public get canReset(): boolean {
        return this.sequence.canReset;
    }

    /** @inheritdoc */
    public get current(): T {
        return this.sequence.current;
    }

    /** @inheritdoc */
    public get isValid(): boolean {
        return this.sequence.isValid;
    }

    /** @inheritdoc */
    public get itemKey(): any {
        return this.sequence.itemKey;
    }

    /** @inheritdoc */
    public moveNext(): boolean {
        return this.sequence.moveNext();
    }

    /** @inheritdoc */
    public next(): IteratorResult<T> {
        return this.sequence.next();
    }

    /** @inheritdoc */
    public reset(): IEnumerable<T> {
        return this.sequence.reset();
    }

    /**
     * Gets the wrapped sequence.
     */
    public get sequence(): IEnumerable<T> {
        return <IEnumerable<T>>this._iterator;
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
        super(makeIterable<T>(arr));

        this._arr = arr || [];
    }

    /** @inheritdoc */
    public get canReset(): boolean {
        return true;
    }

    /** @inheritdoc */
    public reset(): IEnumerable<T> {
        this._index = -1;
        this._current = null;
        this._iterator = makeIterable<T>(this._arr);

        return this;
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
     * Stores if the collection is readonly or not.
     */
    protected _isReadOnly: boolean;
    
    /**
     * Initializes a new instance of that class.
     * 
     * @param {Sequence<T>} [seq] The initial data.
     * @param {EqualityComparer<T> | string} [comparer] The equality comparer for the items.
     * @param {boolean} [isReadOnly] Collection is readonly or not.
     */
    constructor(seq?: Sequence<T>, comparer?: EqualityComparer<T> | string, isReadOnly: boolean = false) {
        let arr: T[] = [];
        from(seq).forEach(x => arr.push(x));

        super(arr);

        this._comparer = toEqualityComparerSafe<T>(comparer);
        this._isReadOnly = !!isReadOnly;
        this._hasChanged = false;
    }

    /** @inheritdoc */
    public add(item: T): void {
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
        return this._isReadOnly;
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
    public moveNext(): boolean {
        if (this._index > -1 && this._hasChanged) {
            throw "Cannot move because collection has changed!";
        }

        return super.moveNext();
    }

    /** @inheritdoc */
    public push(...items: T[]): number {
        let beforeLength = this._arr.length;
        this.addRange
            .apply(this, arguments);

        return this._arr.length - beforeLength;
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
        let p = toPredicateSafe(predicate);

        let prevVal: any;
        let value: any;
        let removedItems = 0;
        for (let i = 0; i < this._arr.length; i++) {
            let item = this._arr[i];

            let ctx = new ItemContext(this, i, prevVal);

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
    public reset(): IEnumerable<T> {
        let result = super.reset();
        this._hasChanged = false;

        return result;
    }

    /** @inheritdoc */
    public setItem(index: number, item: T): IList<T> {
        return this.markAsChanged((x: List<T>) => {
            let a = <T[]>x._arr;
            a[index] = item;
            
            return x;
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
        
        this.markAsChanged((list: List<T>) => {
            let a = <T[]>list._arr;
            a.splice(index, 0, item);
        });
    }

    /** @inheritdoc */
    public removeAt(index: number): boolean {
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
export class ReadOnlyCollectio<T> extends List<T> {
    /**
     * Initializes a new instance of that class.
     * 
     * @param {Sequence<T>} [seq] The initial data.
     * @param {EqualityComparer<T> | string} [comparer] The equality comparer for the items.
     */
    constructor(arr?: Sequence<T>, comparer?: EqualityComparer<T> | string) {
        super(from(arr).toArray(), comparer, true);
    }
}

/**
 * An ordered sequence.
 */
export class OrderedEnumerable<T, U> extends Enumerable<T> implements IOrderedEnumerable<T> {
    /**
     * Stores the array of items in original order.
     */
    protected readonly _ORIGINAL_ITEMS: T[];
    /**
     * Stores the comparer for the sort operation.
     */
    protected readonly _ORDER_COMPARER: Comparer<U>;
    /**
     * Stores the sort value selector.
     */
    protected readonly _ORDER_SELECTOR: Selector<T, U>;

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

        this._ORDER_COMPARER = toComparerSafe<U>(comparer);
        this._ORDER_SELECTOR = toSelectorSafe<T, U>(selector);

        this._ORIGINAL_ITEMS = [];
        seq.forEach(x => me._ORIGINAL_ITEMS.push(x));

        let prevValue: any;
        let value: any;
        this._iterator = from(this._ORIGINAL_ITEMS.map((x, index) => {
            let ctx = new ItemContext(seq, index, prevValue);
            ctx.value = value;

            let sortValue = {
                sortBy: me._ORDER_SELECTOR(x, ctx),
                value: x,
            };

            prevValue = ctx.nextValue;
            value = ctx.value;

            return sortValue;
        }).sort((x, y) => me._ORDER_COMPARER(x.sortBy, y.sortBy))
          .map(x => x.value));
    }

    /**
     * Gets the comparer.
     */
    public get comparer(): Comparer<U> {
        return this._ORDER_COMPARER;
    }

    /**
     * Gets the selector.
     */
    public get selector(): Selector<T, U> {
        return this._ORDER_SELECTOR;
    }

    /** @inheritdoc */
    public then(comparer?: Comparer<T> | string): IOrderedEnumerable<T> {
        return this.thenBy<T>(x => x, comparer);
    }

    /** @inheritdoc */
    public thenBy<V>(selector: Selector<T, V> | string, comparer?: Comparer<V> | string): IOrderedEnumerable<T> {
        let me = this;

        let c = toComparerSafe<V>(comparer);
        let s = toSelectorSafe<T, V>(selector);

        return from(this._ORIGINAL_ITEMS)
            .orderBy((x, ctx) => {
                        return {
                            level_0: me._ORDER_SELECTOR(x, ctx),
                            level_1: s(x, ctx),
                        };
                    },
                    (x, y) => {
                        let compLevel0 = me._ORDER_COMPARER(x.level_0, y.level_0);
                        if (0 !== compLevel0) {
                            return compLevel0;
                        }

                        return c(x.level_1, y.level_1);
                    });
    }

    /** @inheritdoc */
    public thenByDescending<V>(selector: Selector<T, V> | string, comparer?: Comparer<V> | string): IOrderedEnumerable<T> {
        let c = toComparerSafe<V>(comparer);
    
        return this.thenBy(selector,
                           (x, y) => c(y, x));
    }

    /** @inheritdoc */
    public thenDescending(comparer?: Comparer<T> | string): IOrderedEnumerable<T> {
        return this.thenByDescending<T>(x => x, comparer);
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
export class Lookup<T, TKey extends string | number> extends WrappedEnumerable<IGrouping<T, TKey>> implements ILookup<T, TKey> {
    /**
     * Initializes a new instance of that class.
     * 
     * @param {IEnumerable<IGrouping<T, U>>} seq The sequence with the elements.
     */
    constructor(seq: IEnumerable<IGrouping<T, TKey>>) {
        super(seq);

        let me: any = this;

        let groupings: IGrouping<T, TKey>[] = [];
        if (seq) {
            while (seq.moveNext()) {
                let g = seq.current;

                me[<any>g.key] = g;
                groupings.push(g);
            }
        }

        this._iterator = from(groupings);
    }
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
 * 
 * @return {Comparer<T>} The output value.
 * 
 * @throw val is invalid.
 */
export function toComparerSafe<T>(val?: any): Comparer<T> {
    let comparer = <Function>asFunc(val);
    if (comparer) {
        return function() {
            let sortValue = comparer.apply(null, arguments);

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
 * Returns a value as "equality comparer".
 * 
 * @param {any} [val] The input value.
 * 
 * @return {EqualityComparer<T>} The output value.
 * 
 * @throw val is invalid.
 */
export function toEqualityComparerSafe<T>(val?: any): EqualityComparer<T> {
    if (true === val) {
        return (x, y) => x === y;
    }

    let equalityComparer = <Function>asFunc(val);
    if (equalityComparer) {
        return function() {
            return equalityComparer.apply(null, arguments) ? true : false;
        };
    }
    
    return (x, y) => x == y;
}

/**
 * Returns a value as "many item selector".
 * 
 * @param {any} [val] The input value.
 * 
 * @return {ManySelector<T, U>} The output value.
 * 
 * @throw val is invalid.
 */
export function toManySelectorSafe<T, U>(val?: any): ManySelector<T, U> {
    let selector = <Function>asFunc(val);
    if (selector) {
        let func = <Function>selector;

        return function() {
            return func.apply(null, arguments);
        };
    }
    
    return (x: T) => [ <U>(<any>x) ];
}

function toOrDefaultArgs<T, U>(predicateOrDefaultValue: any, defaultValue: U, argCount: number): IOrDefaultArgs<T, U> {
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
        predicate: toPredicateSafe(predicate),
        defaultValue: defVal,
    };
}

/**
 * Returns a value as "predicate".
 * 
 * @param {any} [val] The input value.
 * 
 * @return {Predciate<T>} The output value.
 * 
 * @throw val is invalid.
 */
export function toPredicateSafe<T>(val?: any): Predciate<T> {
    let predicate = <Function>asFunc(val);
    if (predicate) {
        let func = <Function>predicate;

        return function() {
            return func.apply(null, arguments) ? true : false;
        };
    }
    
    return () => true;
}

/**
 * Returns a value as "item selector".
 * 
 * @param {any} [val] The input value.
 * 
 * @return {Selector<T, U>} The output value.
 * 
 * @throw val is invalid.
 */
export function toSelectorSafe<T, U>(val?: any): Selector<T, U> {
    let selector = <Function>asFunc(val);
    if (selector) {
        let func = <Function>selector;

        return function() {
            return func.apply(null, arguments);
        };
    }
    
    return (x: T) => <U>(<any>x);
}

/**
 * Creates a new sequence.
 * 
 * @param {ArrayLike<T> | Iterator} [items] The underlying items.
 * 
 * @return {IEnumerable<T>} The new sequence.
 */
export function from<T>(items?: Sequence<T>): IEnumerable<T> {
    items = items || [];

    if (isArrayLike(items)) {
        return new ArrayEnumerable<T>(<ArrayLike<T>>items);
    }

    return new Enumerable<T>(<Iterator<T>>items);
}
