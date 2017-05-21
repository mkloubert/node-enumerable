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
 * An async action.
 * 
 * @template T Type of the underlying items.
 * 
 * @param {AsyncActionContext<T>} context The underlying context.
 */
export type AsyncAction<T> = (context: AsyncActionContext<T>) => void;

/**
 * A context for an async action.
 * 
 * @template T Type of the underlying item.
 */
export interface AsyncActionContext<T> {
    /**
     * Cancels the whole operation.
     * 
     * @param {any} [result] The optional result for the callback.
     */
    cancel(result?: any): void;
    /**
     * The zero based index.
     */
    readonly index: number;
    /**
     * Indicates if this is the first action or not.
     */
    readonly isFirst: boolean;
    /**
     * The zero based index.
     */
    readonly item: T;
    /**
     * The value from the previous operation.
     */
    readonly previousValue: any;
    /**
     * Finishes the action as failed and cancels the whole operation.
     * 
     * @param {any} reason The reason why the action has failed.
     * @param {any} [result] Optional result value / object for the callback.
     */
    reject(reason: any, result?: any): void;
    /**
     * Finishes the action as succeeded.
     * 
     * @param {any} [nextValue] The value for the 'previousValue' property
     *                          of the next operation.
     */
    resolve(nextValue?: any): void;
    /**
     * Gets or sets the result value for the callback.
     */
    result: any;
    /**
     * Gets the underlying sequence.
     */
    readonly sequence: IEnumerable<T>;
    /**
     * Gets or sets the value for this action and the upcoming ones.
     */
    value: any;
}  // AsyncActionContext<T>

/**
 * A factory function that can be cancelled.
 * 
 * @template TResult The type of the result.
 * 
 * @param {((cancel: (flag?: boolean) => void)} cancel The callback to cancel the building.
 * @param {number} index The zero based index of that invocation.
 * 
 * @return {TResult} The result.
 */
export type CancelableFactory<TResult> = (cancel: (flag?: boolean) => void, index: number) => TResult;

/**
 * Compares to values.
 * 
 * @template T Type of the "left" value.
 * @template U Type of the "right" value.
 * 
 * @param {T} x The "left" value.
 * @param {U} y The "right" value.
 * 
 * @return {number} The "sort" value.
 */
export type Comparer<T, U = T> = (x: T, y: U) => number;

/**
 * A forEach function.
 * 
 * @template T Type of the items.
 * @template TResult Type of the result(s).
 * 
 * @param {T} item The current item.
 * @param {number} index The zero based index of the current item.
 * @param {TResult} result The current result value.
 */
export type EachFunc<T, TResult> = (item: T, index: number, result: TResult) => TResult;

/**
 * Checks if two values are equal.
 * 
 * @template T Type of the "left" value.
 * @template U Type of the "right" value.
 * 
 * @param {T} x The "left" value.
 * @param {U} y The "right" value.
 * 
 * @return {boolean} Are equal or not.
 */
export type EqualityComparer<T, U = T> = (x: T, y: U) => boolean;

/**
 * Saves joined values.
 * 
 * @template TOuter Type of the outer value.
 * @template TInner Type of the inner value.
 */
export interface JoinedItems<TOuter, TInner> {
    /**
     * The inner value.
     */
    inner: TInner;
    /**
     * The outer value.
     */
    outer: TOuter;
}  // JoinedItems<TOuter, TInner>

/**
 * A predicate / condition.
 * 
 * @template T Type of the item to check.
 * 
 * @param {T} The item to check.
 * 
 * @return {boolean} Item satisfies the condition or not.
 */
export type Predicate<T> = (item: T) => boolean;

/**
 * A selector.
 * 
 * @template T Type of the source item.
 * @template U Type of the new item.
 * 
 * @param {T} item The source item.
 * 
 * @return {U} The new item.
 */
export type Selector<T, U> = (item: T) => U;

/**
 * Possible sequence types.
 * 
 * @template T Type of the items.
 */
export type Sequence<T> = ArrayLike<T> | Iterable<T> | Iterator<T> | IArguments;

/**
 * A stack.
 * 
 * @template T The type of the items.
 */
export interface Stack<T> {
    /**
     * Pushes one or more item to the stack.
     * 
     * @param {...T[]} items The items to push.
     * 
     * @returns {number} The new length of the stack.
     */
    push(...items: T[]): number;
}  // interface Stack<T>


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
 * 
 * @template T Type of the items.
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
     * Runs an async action for each item of that sequence.
     * 
     * @param AsyncAction<T> action The action to invoke.
     * @param AsyncCallback [callback] The callback.
     * @param {any} [previousValue] The value for the 'previousValue' of the first action.
     * 
     * @returns {Promise<any>} The promise.
     */
    async(action: AsyncAction<T>,
          previousValue?: any): Promise<any>;
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
     * Clones that sequence multiply times.
     * 
     * @template U The type of the target sequences.
     * 
     * @param {number} [count] The maximum number of sequences.
     * @param {Selector<T, U>} [itemSelector] The selector for the items.
     * 
     * @returns {IEnumerable<IEnumerable<U>>} The sequence of sequences.
     */
    clone<U = T>(count?: number,
                 itemSelector?: Selector<T, U>): IEnumerable<IEnumerable<U>>;
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
     *                                                   (true) indicates to do a === check.
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
     * Gets the current iterator result.
     */
    readonly current: IteratorResult<T>;
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
     *                                         (true) indicates to do a === check.
     * 
     * @returns {IEnumerable<T>} The new sequence.
     */
    distinct(comparer?: EqualityComparer<T> | true): IEnumerable<T>;
    /**
     * Alias for forEach()
     */
    each<TResult>(func: EachFunc<T, TResult>,
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
    /**
     * Returns the items of that sequence except a list of specific ones.
     * 
     * @param {Sequence<T>} second The second sequence.
     * @param {EqualityComparer<T>|true} [equalityComparer] The custom equality comparer to use.
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    except(second: Sequence<T>,
           comparer?: EqualityComparer<T> | true): IEnumerable<T>;
    /**
     * Invokes a function for each element of that sequence.
     * 
     * @template TResult Type of the result.
     * 
     * @param {(item: T, index: number, lastResult: TResult) => TResult} func The function to invoke.
     * @param {TResult} [seed] The seed value for the result. Default: IS_EMPTY
     * 
     * @returns {(TResult|Symbol)} The result of the last action.
     */
    forEach<TResult>(func: EachFunc<T, TResult>,
                     seed?: TResult): TResult | Symbol;
    /**
     * Returns the first element of that sequence.
     * 
     * @param {Predicate<T>} [predicate] The optional predicate to use.
     * 
     * @returns {T} The first element. 
     * 
     * @throws ELement not found.
     */
    first(predicate?: Predicate<T>): T;
    /**
     * Tries to return the first element.
     * 
     * @template U Type of the default value.
     * 
     * @param {(Predicate<T>|T)} [predicateOrDefaultValue] The predicate or default value.
     * @param {U} [defaultValue] The default value. Default: NOT_FOUND
     *                                      If definded: predicateOrDefaultValue MUST be a function in this case!
     * 
     * @returns {T|U} The item or the default value.
     */
    firstOrDefault<U = Symbol>(predicateOrDefaultValue?: Predicate<T> | T,
                               defaultValue?: U): T | U;
    /**
     * Groups the items of that sequence by a key.
     * 
     * @template TKey Type of the keys.
     * 
     * @param {Selector<T, TKey>} keySelector The key selector.
     * @param {EqualityComparer<TKey>} [keyEqualityComparer] The custom equality comparer for the keys.
     * 
     * @returns {IEnumerable<IGrouping<TKey, T>>} The grouped items.
     */
    groupBy<TKey>(keySelector: Selector<T, TKey>,
                  keyEqualityComparer?: EqualityComparer<TKey>): IEnumerable<IGrouping<TKey, T>>;
    /**
     * Correlates the elements of that sequence and another based on matching keys and groups them.
     * 
     * @param {Sequence<TInner>} inner The other sequence.
     * @param {Selector<T, TOuterKey>} [outerKeySelector] The key selector for the items of that sequence.
     * @param {Selector<TInner, TInnerKey} [innerKeySelector] The key selector for the items of the other sequence.
     * @param {((outer: T, inner: IEnumerable<TInner>) => TResult)} [resultSelector] The function that provides the result value for two matching elements.
     * @param {EqualityComparer<TOuterKey, TInnerKey>|true} [keyEqualityComparer] The custom equality comparer for the keys to use.
     *                                                                            (true) indicates to do a === check.
     * 
     * @return {IEnumerable<TResult>} The new sequence.
     */
    groupJoin<TInner = T, TOuterKey = T | TInnerKey, TInnerKey = TOuterKey, TResult = JoinedItems<T, IEnumerable<TInner>>>(
        inner: Sequence<TInner>,
        outerKeySelector?: Selector<T, TOuterKey>,
        innerKeySelector?: Selector<TInner, TInnerKey>,
        resultSelector?: (outer: T, inner: IEnumerable<TInner>) => TResult,
        keyEqualityComparer?: EqualityComparer<TOuterKey, TInnerKey> | true
    ): IEnumerable<TResult>;
    /**
     * Gets the current zero based index.
     */
    readonly index: number;
    /**
     * Returns the zero based index of the first occurrence of an item.
     * 
     * @template U Type of the item to search for.
     * 
     * @param {U} item The item to search for.
     * @param {(EqualityComparer<T, U>|true)} [comparer] The custom equality comparer to use.
     *                                                   (true) indicates to do a === check.
     * 
     * @returns {number} The index or -1 if not found.
     */
    indexOf<U>(item: U,
               comparer?: EqualityComparer<T, U> | true): number;
    /**
     * Returns the intersection between this and a second sequence.
     * 
     * @param {Sequence<T>} second The second sequence.
     * @param {EqualityComparer<T>|true} [equalityComparer] The custom equality comparer to use.
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    intersect(second: Sequence<T>,
              comparer?: EqualityComparer<T> | true): IEnumerable<T>;
    /**
     * Correlates the elements of that sequence and another based on matching keys.
     * 
     * @param {Sequence<TInner>} inner The other sequence.
     * @param {Selector<T, TOuterKey>} [outerKeySelector] The key selector for the items of that sequence.
     * @param {Selector<TInner, TInnerKey} [innerKeySelector] The key selector for the items of the other sequence.
     * @param {((outer: T, inner: IEnumerable<TInner>) => TResult)} [resultSelector] The function that provides the result value for two matching elements.
     * @param {EqualityComparer<TOuterKey, TInnerKey>|true} [keyEqualityComparer] The custom equality comparer for the keys to use.
     *                                                                            (true) indicates to do a === check. 
     * 
     * @return {IEnumerable<TResult>} The new sequence.
     */
    join<TInner = T, TOuterKey = T | TInnerKey, TInnerKey = TOuterKey, TResult = JoinedItems<T, TInner>>(
        inner: Sequence<TInner>,
        outerKeySelector?: Selector<T, TOuterKey>,
        innerKeySelector?: Selector<TInner, TInnerKey>,
        resultSelector?: (outer: T, inner: TInner) => TResult,
        keyEqualityComparer?: EqualityComparer<TOuterKey, TInnerKey> | true
    ): IEnumerable<TResult>;
    /**
     * Joins the items of that sequence to one string.
     * 
     * @param {any} [separator] The optional separator to use.
     * 
     * @returns {string} The items as string.
     */
    joinToString(separator?: any): string;
    /**
     * Returns the last element of that sequence.
     * 
     * @param {Predicate<T>} [predicate] The optional predicate to use.
     * 
     * @returns {T} The last element. 
     * 
     * @throws ELement not found.
     */
    last(predicate?: Predicate<T>): T;
    /**
     * Returns the zero based index of the last occurrence of an item.
     * 
     * @template U Type of the item to search for.
     * 
     * @param {U} item The item to search for.
     * @param {(EqualityComparer<T, U>|true)} [comparer] The custom equality comparer to use.
     *                                                   (true) indicates to do a === check.
     * 
     * @returns {number} The index or -1 if not found.
     */
    lastIndexOf<U>(item: U,
                   comparer?: EqualityComparer<T, U> | true): number;
    /**
     * Tries to return the last element.
     * 
     * @template U Type of the default value.
     * 
     * @param {(Predicate<T>|T)} [predicateOrDefaultValue] The predicate or default value.
     * @param {(T | Symbol)} [defaultValue] The default value. Default: NOT_FOUND
     *                                      If definded: predicateOrDefaultValue MUST be a function in this case!
     * 
     * @returns {T|U} The item or the default value.
     */
    lastOrDefault<U = Symbol>(predicateOrDefaultValue?: Predicate<T> | T,
                              defaultValue?: U): T | U;
    /**
     * Returns a resettable version of that sequence.
     * 
     * @returns {IEnumerable<T>} The resettable version of that sequence.
     */
    makeResettable(): IEnumerable<T>;
    /**
     * Returns the maximum item of that sequence.
     * 
     * @param {Comparer<U>} [comparer] The custom comparer to use.
     * 
     * @returns {T|Symbol} The item or IS_EMPTY if that sequence is empty.
     */
    max<U = T>(valueSelector?: Selector<T, U>,
               comparer?: Comparer<U>): T | Symbol;
    /**
     * Returns the minimum item of that sequence.
     * 
     * @param {Comparer<U>} [comparer] The custom comparer to use.
     * 
     * @returns {T|Symbol} The item or IS_EMPTY if that sequence is empty.
     */
    min<U = T>(valueSelector?: Selector<T, U>,
               comparer?: Comparer<U>): T | Symbol;
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
     * Sorts the elements of that sequence in ascending order by using the values itself as keys.
     * 
     * @param Comparer<T> [comparer] The custom key comparer to use.
     * 
     * @return {IOrderedEnumerable} The new sequence.
     */
    order(comparer?: Comparer<T>): IOrderedEnumerable<T>;
    /**
     * Sorts the elements of that sequence in ascending order.
     * 
     * @param {Selector<T,U>} selector The key selector.
     * @param {Comparer<U>} [comparer] The custom key comparer to use.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    orderBy<U>(selector: Selector<T, U>,
               comparer?: Comparer<U>): IOrderedEnumerable<T>;
    /**
     * Sorts the elements of that sequence in descending order.
     * 
     * @param {Selector<T,U>} selector The key selector.
     * @param {Comparer<U>} [comparer] The custom key comparer to use.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    orderByDescending<U>(selector: Selector<T, U>,
                         comparer?: Comparer<U>): IOrderedEnumerable<T>;
    /**
     * Sorts the elements of that sequence in descending order by using the values as keys.
     * 
     * @param {Comparer<T>} [comparer] The custom key comparer to use.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    orderDescending(comparer?: Comparer<T>): IOrderedEnumerable<T>;
    /**
     * Calculates the product of that sequence.
     * 
     * @returns {(T | Symbol)} The product or IS_EMPTY if that sequence is empty.
     */
    product(seed?: T): T | Symbol;
    /**
     * Pushes the elements of that sequence to an array or stack-like object.
     * 
     * @param {Stack<T>} stack The array or stack.
     * 
     * @returns {this} 
     */
    pushTo(stack: Stack<T>): this;
    /**
     * Returns that sequence.
     * 
     * @returns {this} 
     * 
     * @throws Not supported
     */
    reset(): this;
    /**
     * Reverses the order of that sequence by using optional keys.
     * 
     * @param {Selector<T,U>} The selector for the keys.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    reverse<U = T>(selector?: Selector<T, U>): IOrderedEnumerable<T>;
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
    /**
     * Checks if that sequence is equal to another.
     * 
     * @template U Type of the items of the other sequence.
     * 
     * @param {Sequence<U>} other The other sequence.
     * @param {(EqualityComparer<T, U> | true)} [equalityComparer] The custom equality comparer to use.
     * 
     * @returns {boolean} Both are equal or not.
     */
    sequenceEqual<U>(other: Sequence<U>,
                     equalityComparer?: EqualityComparer<T, U> | true): boolean;
    /**
     * Returns the one and only element of that sequence.
     * 
     * @param {Predicate<T>} [predicate] The optional predicate to use.
     * 
     * @returns {T} The single element. 
     * 
     * @throws ELement not found or sequence contains for than one (matching) element.
     */
    single(predicate?: Predicate<T>): T;
    /**
     * Tries to return the one and only element.
     * 
     * @template U Type of the default value.
     * 
     * @param {(Predicate<T>|T)} [predicateOrDefaultValue] The predicate or default value.
     * @param {(T | Symbol)} [defaultValue] The default value. Default: NOT_FOUND
     *                                      If definded: predicateOrDefaultValue MUST be a function in this case!
     * 
     * @returns {T|U} The item or the default value.
     * 
     * @throws Sequence contains for than one (matching) element.
     */
    singleOrDefault<U = Symbol>(predicateOrDefaultValue?: Predicate<T> | T,
                                defaultValue?: U): T | U;
    /**
     * Skips a maximum number of items.
     * 
     * @param {number} [count] The number of items to skip. Default: 1
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    skip(count?: number): IEnumerable<T>;
    /**
     * Takes all elements but the last one.
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    skipLast(): IEnumerable<T>;
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
     * Creates a new array from the items of that sequence.
     * 
     * @returns {T[]} The sequence as array.
     */
    toArray(): T[];
    /**
     * Converts that sequence to a "buffered" sequence.
     * 
     * @param {number} [chunkSize] The chunk size. Default: 1
     * 
     * @returns {IEnumerable<T>} The new sequence.
     */
    toBuffer(chunkSize?: number): IEnumerable<T>;
    /**
     * Converts that sequence to a lookup object.
     * 
     * @template TKey Type of the keys.
     * @template U Type of the result object.
     * 
     * @param {Selector<T, TKey>} keySelector The key selector.
     * @param {EqualityComparer<TKey>} [keyEqualityComparer] The custom equality comparer for the keys.
     * 
     * @returns U The lookup object
     */
    toLookup<TKey extends PropertyKey, U = any>(keySelector: Selector<T, TKey>,
                                                keyEqualityComparer?: EqualityComparer<TKey>): U;
    /**
     * Wraps the items of that sequence to an object.
     * 
     * @template TResult Type of the result.
     * @template TKey Type of the keys.
     * 
     * @param {(item: T, index: number) => TKey} [keySelector] The selector for the keys.
     * 
     * @returns TResult The new object.
     */
    toObject<TResult = any, TKey extends PropertyKey = number>(keySelector?: (item: T, index: number) => TKey): TResult;
    /**
     * Produces the union of that sequence and another.
     * 
     * @param {Sequence<T>} second The other sequence.
     * @param {EqualityComparer<T>|true} [comparer] The optional equality comparer to use.
     * 
     * @returns {IEnumerable<T>} The new sequence.
     */
    union(second: Sequence<T>,
          comparer?: EqualityComparer<T> | true): IEnumerable<T>;
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
}  // IEnumerable<T>

/**
 * Describes a grouping.
 * 
 * @template T Type of the items.
 * @template TKey Type of the key.
 */
export interface IGrouping<TKey, T> extends IEnumerable<T> {
    /**
     * Gets the key.
     */
    readonly key: TKey;
}  // IGrouping<TKey, T>

/**
 * Describes an ordered sequence.
 */
export interface IOrderedEnumerable<T> extends IEnumerable<T> {
    /**
     * Performs a subsequent ordering of the elements in that sequence in ascending order,
     * using the values itself as keys.
     * 
     * @param {Comparer<T>} [comparer] The custom key comparer to use.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    then(comparer?: Comparer<T>): IOrderedEnumerable<T>;
    /**
     * Performs a subsequent ordering of the elements in that sequence in ascending order, according to a key.
     * 
     * @template U Type of the keys.
     * 
     * @param any selector The key selector.
     * @param {Comparer<U>} [comparer] The custom key comparer to use.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    thenBy<U>(selector: Selector<T, U>,
              comparer?: Comparer<U>): IOrderedEnumerable<T>;
    /**
     * Performs a subsequent ordering of the elements in that sequence in descending order, according to a key.
     * 
     * @template U Type of the keys.
     * 
     * @param any selector The key selector.
     * @param {Comparer<U>} [comparer] The custom key comparer to use.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    thenByDescending<U>(selector: Selector<T, U>,
                        comparer?: Comparer<U>): IOrderedEnumerable<T>;
    /**
     * Performs a subsequent ordering of the elements in that sequence in descending order,
     * using the values as keys.
     * 
     * @param {Comparer<T>} [comparer] The custom key comparer to use.
     * 
     * @return {IOrderedEnumerable<T>} The new sequence.
     */
    thenDescending(comparer?: Comparer<T>): IOrderedEnumerable<T>;
}  // IOrderedEnumerable<T>


/**
 * A basic sequence.
 */
export abstract class EnumerableBase<T> implements IEnumerable<T> {
    /**
     * Stores the current iterator result.
     */
    protected _current: IteratorResult<T>;
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
    public async(action: AsyncAction<T>, previousValue?: any): Promise<any> {
        let me = this;

        return new Promise<any>((resolve, reject) => {
            let asyncResult: any;
            let asyncCompleted = (err: any) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(asyncResult);
                }
            };

            try {
                let i = -1;
                let prevVal = previousValue;
                let val: any;
                let nextItem = () => {
                    ++i;
                    
                    let item = this.next();
                    if (!item || item.done) {
                        asyncCompleted(null);
                        return;
                    }

                    let ctx: AsyncActionContext<T> = {
                        cancel: function(result?: any) {
                            if (arguments.length > 0) {
                                asyncResult = result;
                            }

                            asyncCompleted(null);
                        },
                        index: i,
                        isFirst: 0 === i,
                        item: item.value,
                        previousValue: prevVal,
                        reject: function(reason: any, result?: any) {
                            if (arguments.length > 1) {
                                asyncResult = result;
                            }

                            asyncCompleted(reason);
                        },
                        resolve: function(nextValue?: any) {
                            prevVal = nextValue;

                            nextItem();
                        },
                        result: undefined,
                        sequence: me,
                        value: undefined,
                    };

                    // ctx.result
                    Object.defineProperty(ctx, 'result', {
                        get: () => { return asyncResult; },
                        set: (newValue) => { asyncResult = newValue; },

                        enumerable: true,
                    });

                    // ctx.value
                    Object.defineProperty(ctx, 'value', {
                        get: () => { return val; },
                        set: (newValue) => { val = newValue; },

                        enumerable: true,
                    });

                    try {
                        if (action) {
                            action(ctx);
                        }
                        else {
                            ctx.resolve();
                        }
                    }
                    catch (e) {
                        ctx.reject(e);
                    }
                };

                nextItem();
            }
            catch (e) {
                asyncCompleted(e);
            }
        });
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
        return false;
    }
    /** @inheritdoc */
    public cast<U>(): IEnumerable<U> {
        return this.select(x => <U><any>x);
    }
    /** @inheritdoc */
    public clone<U = T>(count?: number,
                        itemSelector?: Selector<T, U>): IEnumerable<IEnumerable<U>> {
        count = parseInt(toStringSafe(count).trim());

        return from(this.cloneInner(count, itemSelector));
    }
    /**
     * @see concatArray()
     */
    protected *cloneInner<U>(count: number,
                             itemSelector: Selector<T, U>) {
        let items = this.toArray();

        while (true) {
            if (!isNaN(count)) {
                if (count-- < 1) {
                    break;
                }
            }

            let seq: any = from(items);
            if (itemSelector) {
                seq = seq.select(itemSelector);
            }
            
            yield seq;
        }
    }
    /** @inheritdoc */
    public concat(...args: Sequence<T>[]): IEnumerable<T> {
        return this.concatArray(args);
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
    public contains<U>(item: U,
                       comparer?: EqualityComparer<T, U> | true): boolean {
        return this.indexOf<U>(item, comparer) > -1;
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
    public get current(): IteratorResult<T> {
        return this._current;
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
    public each<TResult>(func: EachFunc<T, TResult>,
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
                                          defaultValue?: U): T | U {
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
    public except(second: Sequence<T>,
                     comparer?: EqualityComparer<T> | true): IEnumerable<T> {
        return from(this.exceptInner(from(second).distinct()
                                                 .toArray(),
                                     toEqualityComparerSafe(comparer)));
    }
    /**
     * @see except()
     */
    protected *exceptInner(second: T[], comparer: EqualityComparer<T>) {
        for (let item of this) {
            let found = false;

            for (let secondItem of second) {
                if (comparer(item, secondItem)) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                yield item;
            }
        }
    }
    /** @inheritdoc */
    public first(predicate?: Predicate<T>): T {
        predicate = toPredicateSafe(predicate);

        const ELEMENT_NOT_FOUND = Symbol('ELEMENT_NOT_FOUND');

        let result = this.firstOrDefault(predicate,
                                         ELEMENT_NOT_FOUND);
        
        if (ELEMENT_NOT_FOUND === result) {
            throw 'Element not found';
        }

        return <any>result;
    }
    /** @inheritdoc */
    public firstOrDefault<U = Symbol>(predicateOrDefaultValue?: Predicate<T> | T,
                                      defaultValue?: U): T | U {
        let args = getOrDefaultArguments(predicateOrDefaultValue, defaultValue,
                                         arguments.length);

        for (let item of this) {
            if (args.predicate(item)) {
                return item;
            }
        }

        return args.defaultValue;
    }
    /** @inheritdoc */
    public forEach<TResult>(func: EachFunc<T, TResult>,
                            seed?: TResult): TResult | Symbol {
        let result: any = IS_EMPTY;
        if (arguments.length > 1) {
            result = seed;
        }

        let i = -1;
        for (let item of this) {
            ++i;
            
            let funcResult: TResult;
            if (func) {
                funcResult = func(item, i, result);
            }

            result = funcResult;
        }

        return result;
    }
    /** @inheritdoc */
    public groupBy<TKey>(keySelector: Selector<T, TKey>,
                         keyEqualityComparer?: EqualityComparer<TKey>): IEnumerable<IGrouping<TKey, T>> {
        if (!keySelector) {
            keySelector = (i) => <any>i;
        }

        keyEqualityComparer = toEqualityComparerSafe(keyEqualityComparer);

        return from(this.groupByInner(keySelector, keyEqualityComparer));
    }
    /**
     * @see groupBy()
     */
    protected *groupByInner<TKey>(keySelector: Selector<T, TKey>,
                                  keyEqualityComparer: EqualityComparer<TKey>) {
        interface GroupItem {
            key: TKey,
            values: T[],
        };

        let groupList: GroupItem[] = [];

        for (let item of this) {
            let key = keySelector(item);

            let grp: GroupItem;
            for (let g of groupList) {
                if (keyEqualityComparer(key, g.key)) {
                    grp = g;
                    break;
                }
            }

            if (!grp) {
                grp = {
                    key: key,
                    values: [],
                };

                groupList.push(grp);
            }

            grp.values
               .push(item);
        }

        for (let grp of groupList) {
            yield new Grouping(grp.key, from(grp.values));
        }
    }
    /** @inheritdoc */
    public groupJoin<TInner = T, TOuterKey = T | TInnerKey, TInnerKey = TOuterKey, TResult = JoinedItems<T, IEnumerable<TInner>>>(
        inner: Sequence<TInner>,
        outerKeySelector?: Selector<T, TOuterKey>,
        innerKeySelector?: Selector<TInner, TInnerKey>,
        resultSelector?: (outer: T, inner: IEnumerable<TInner>) => TResult,
        keyEqualityComparer?: EqualityComparer<TOuterKey, TInnerKey> | true
    ): IEnumerable<TResult> {
        if (!outerKeySelector && !innerKeySelector) {
            outerKeySelector = (i) => <any>i;
            innerKeySelector = <any>outerKeySelector;
        }
        else {
            if (!outerKeySelector) {
                outerKeySelector = <any>innerKeySelector;
            }
            else if (!innerKeySelector) {
                innerKeySelector = <any>outerKeySelector;
            }
        }

        if (!resultSelector) {
            resultSelector = (outer, inner) => {
                // JoinedItems<T, IEnumerable<TInner>>
                return <any>{
                    inner: inner,
                    outer: outer,
                };
            };
        }
        
        keyEqualityComparer = toEqualityComparerSafe(keyEqualityComparer);

        return from(this.groupJoinInner(from(inner),
                                        outerKeySelector, innerKeySelector,
                                        resultSelector,
                                        keyEqualityComparer));
    }
    /**
     * @see groupJoin()
     */
    protected *groupJoinInner<TInner, TOuterKey, TInnerKey, TResult>(
        inner: IEnumerable<TInner>,
        outerKeySelector: Selector<T, TOuterKey>,
        innerKeySelector: Selector<TInner, TInnerKey>,
        resultSelector: (outer: T, inner: IEnumerable<TInner>) => TResult,
        keyEqualityComparer: EqualityComparer<TOuterKey, TInnerKey>
    )
    {
        let outerGroups = createGroupArrayForSequence(this, outerKeySelector);
        let innerGroups = createGroupArrayForSequence(inner, innerKeySelector);

        while (outerGroups.length > 0) {
            let outerGrp = outerGroups.shift();

            for (let i = 0; i < innerGroups.length; i++) {
                let innerGrp = innerGroups[i];

                if (!keyEqualityComparer(outerGrp.key, innerGrp.key)) {
                    continue;
                }

                for (let j = 0; j < outerGrp.values.length; j++) {
                    yield resultSelector(outerGrp.values[j],
                                         from(innerGrp.values));
                }
            }
        }
    }
    /** @inheritdoc */
    public get index(): number {
        return this._index;
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
    public intersect(second: Sequence<T>,
                     comparer?: EqualityComparer<T> | true): IEnumerable<T> {
        return from(this.intersectInner(from(second).distinct()
                                                    .toArray(),
                                        toEqualityComparerSafe(comparer)));
    }
    /**
     * @see intersect()
     */
    protected *intersectInner(second: T[], comparer: EqualityComparer<T>) {
        for (let item of this) {
            for (let secondItem of second) {
                if (comparer(item, secondItem)) {
                    yield item;
                    break;
                }
            }
        }
    }
    /** @inheritdoc */
    public join<TInner = T, TOuterKey = T | TInnerKey, TInnerKey = TOuterKey, TResult = JoinedItems<T, TInner>>(
        inner: Sequence<TInner>,
        outerKeySelector?: Selector<T, TOuterKey>,
        innerKeySelector?: Selector<TInner, TInnerKey>,
        resultSelector?: (outer: T, inner: TInner) => TResult,
        keyEqualityComparer?: EqualityComparer<TOuterKey, TInnerKey> | true
    ): IEnumerable<TResult> {
        if (!outerKeySelector && !innerKeySelector) {
            outerKeySelector = (i) => <any>i;
            innerKeySelector = <any>outerKeySelector;
        }
        else {
            if (!outerKeySelector) {
                outerKeySelector = <any>innerKeySelector;
            }
            else if (!innerKeySelector) {
                innerKeySelector = <any>outerKeySelector;
            }
        }

        if (!resultSelector) {
            resultSelector = (outer, inner) => {
                // JoinedItems<T, TInner>
                return <any>{
                    inner: inner,
                    outer: outer,
                };
            };
        }
        
        keyEqualityComparer = toEqualityComparerSafe(keyEqualityComparer);

        return from(this.joinInner(from(inner),
                                   outerKeySelector, innerKeySelector,
                                   resultSelector,
                                   keyEqualityComparer));
    }
    /**
     * @see join()
     */
    protected *joinInner<TInner, TOuterKey, TInnerKey, TResult>(
        inner: IEnumerable<TInner>,
        outerKeySelector: Selector<T, TOuterKey>,
        innerKeySelector: Selector<TInner, TInnerKey>,
        resultSelector: (outer: T, inner: TInner) => TResult,
        keyEqualityComparer: EqualityComparer<TOuterKey, TInnerKey>
    ) {
        let outerGroups = createGroupArrayForSequence(this, outerKeySelector);
        let innerGroups = createGroupArrayForSequence(inner, innerKeySelector);

        while (outerGroups.length > 0) {
            let outerGrp = outerGroups.shift();

            for (let i = 0; i < innerGroups.length; i++) {
                let innerGrp = innerGroups[i];

                if (!keyEqualityComparer(outerGrp.key, innerGrp.key)) {
                    continue;
                }

                for (let j = 0; j < outerGrp.values.length; j++) {
                    for (let k = 0; k < innerGrp.values.length; k++) {
                        yield resultSelector(outerGrp.values[j],
                                             innerGrp.values[k]);
                    }
                }
            }
        }
    }
    /** @inheritdoc */
    public joinToString(separator?: any): string {
        return this.toArray()
                   .join(toStringSafe(separator));
    }
    /** @inheritdoc */
    public last(predicate?: Predicate<T>): T {
        predicate = toPredicateSafe(predicate);

        const ELEMENT_NOT_FOUND = Symbol('ELEMENT_NOT_FOUND');

        let result = this.lastOrDefault(predicate, ELEMENT_NOT_FOUND);
        if (ELEMENT_NOT_FOUND === result) {
            throw 'Element not found';
        }

        return <any>result;
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
    public lastOrDefault<U = Symbol>(predicateOrDefaultValue?: Predicate<T> | T,
                                     defaultValue?: U): T | U {
        let args = getOrDefaultArguments(predicateOrDefaultValue, defaultValue,
                                         arguments.length);

        const ELEMENT_NOT_FOUND = Symbol('ELEMENT_NOT_FOUND');

        let result: any = ELEMENT_NOT_FOUND;

        for (let item of this) {
            if (args.predicate(item)) {
                result = item;
            }
        }

        if (ELEMENT_NOT_FOUND !== result) {
            return result;
        }

        return args.defaultValue;
    }
    /** @inheritdoc */
    public makeResettable(): IEnumerable<T> {
        if (this.canReset) {
            return this;
        }

        return from(this.toArray());
    }
    /** @inheritdoc */
    public max<U = T>(valueSelector?: Selector<T, U>,
                      comparer?: Comparer<U>): T | Symbol {
        if (!valueSelector) {
            valueSelector = (i) => <any>i;
        }
        
        comparer = toComparerSafe(comparer);

        let result: any = IS_EMPTY;
        let maxValue: U;

        let isFirst = true;
        for (let item of this) {
            let value = valueSelector(item);

            let updateResult = () => {
                result = item;
                maxValue = value;
            };

            if (!isFirst) {
                if (comparer(value, maxValue) > 0) {
                    updateResult();
                }
            }
            else {
                isFirst = false;

                updateResult();
            }
        }

        return result;
    }
    /** @inheritdoc */
    public min<U = T>(valueSelector?: Selector<T, U>,
                      comparer?: Comparer<U>): T | Symbol {
        if (!valueSelector) {
            valueSelector = (i) => <any>i;
        }
        
        comparer = toComparerSafe(comparer);

        let result: any = IS_EMPTY;
        let minValue: U;

        let isFirst = true;
        for (let item of this) {
            let value = valueSelector(item);

            let updateResult = () => {
                result = item;
                minValue = value;
            };

            if (!isFirst) {
                if (comparer(value, minValue) < 0) {
                    updateResult();
                }
            }
            else {
                isFirst = false;

                updateResult();
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

        return <any>this.where(x => {
            return type.toLowerCase() === typeof x ||
                   '' === type;
        });
    }

    /** @inheritdoc */
    public order(comparer?: Comparer<T>): IOrderedEnumerable<T> {
        return this.orderBy(x => x,
                            comparer);
    }
    /** @inheritdoc */
    public orderBy<U>(selector: Selector<T, U>,
                      comparer?: Comparer<U>): IOrderedEnumerable<T> {
        return new OrderedEnumerable(this,
                                     selector, comparer);
    }
    /** @inheritdoc */
    public orderByDescending<U>(selector: Selector<T, U>,
                                comparer?: Comparer<U>): IOrderedEnumerable<T> {
        comparer = toComparerSafe(comparer);

        return this.orderBy(selector, (x, y) => {
            return comparer(y, x);
        });
    }
    /** @inheritdoc */
    public orderDescending(comparer?: Comparer<T>): IOrderedEnumerable<T> {
        return this.orderByDescending(x => x,
                                      comparer);
    }
    /** @inheritdoc */
    public product(): T | Symbol {
        return this.aggregate((acc, x) => IS_EMPTY !== acc ? (acc * <any>x) : x,
                              <any>IS_EMPTY);
    }
    /** @inheritdoc */
    public pushTo(stack: Stack<T>): this {
        if (stack) {
            stack.push
                 .apply(stack, this.toArray());
        }
        
        return this;
    }
    /** @inheritdoc */
    public reset(): this {
        throw 'Not supported';
    }
    /** @inheritdoc */
    public reverse<U = T>(selector?: Selector<T, U>): IOrderedEnumerable<T> {
        if (!selector) {
            return this.orderDescending();
        }

        return this.orderByDescending(selector);
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
    public sequenceEqual<U>(other: Sequence<U>,
                            equalityComparer?: EqualityComparer<T, U> | true): boolean {
        let otherSeq = from(other);
        equalityComparer = toEqualityComparerSafe(equalityComparer);

        do {
            let x = getNextIteratorResultSafe(this);
            if (x.done) {
                break;
            }

            let y = getNextIteratorResultSafe(otherSeq);
            if (y.done) {
                return false;
            }

            if (!equalityComparer(x.value, y.value)) {
                return false;
            }
        }
        while (true);

        if (!getNextIteratorResultSafe(otherSeq).done) {
            return false;
        }
        
        return true;
    }
    /** @inheritdoc */
    public single(predicate?: Predicate<T>): T {
        predicate = toPredicateSafe(predicate);

        const ELEMENT_NOT_FOUND = Symbol('ELEMENT_NOT_FOUND');

        let item = this.singleOrDefault(predicate,
                                        ELEMENT_NOT_FOUND);

        if (ELEMENT_NOT_FOUND === item) {
            throw 'Element not found';
        }

        return <any>item;
    }
    /** @inheritdoc */
    public singleOrDefault<U = Symbol>(predicateOrDefaultValue?: Predicate<T> | T,
                                       defaultValue?: U): T | U {
        let args = getOrDefaultArguments(predicateOrDefaultValue, defaultValue,
                                         arguments.length);

        const ELEMENT_NOT_FOUND = Symbol('ELEMENT_NOT_FOUND');

        let result: any = ELEMENT_NOT_FOUND;

        for (let item of this) {
            if (!args.predicate(item)) {
                continue;
            }

            if (ELEMENT_NOT_FOUND !== result) {
                throw 'Sequence contains more that one matching element';    
            }

            result = item;
        }

        if (ELEMENT_NOT_FOUND !== result) {
            return result;
        }

        return args.defaultValue;
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
    public skipLast(): IEnumerable<T> {
        return from(this.skipLastInner());
    }
    /**
     * @see skipLast()
     */
    protected *skipLastInner() {
        let hasRemainingItems;
        let isFirst = true;
        let item: T;

        do
        {
            let iteratorItem = this.next();

            hasRemainingItems = iteratorItem && !iteratorItem.done;
            if (!hasRemainingItems) {
                continue;
            }

            if (!isFirst) {
                yield item;
            }
            else {
                isFirst = false;
            }

            item = iteratorItem.value;
        }
        while (hasRemainingItems);
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
    public toBuffer(chunkSize?: number): IEnumerable<T> {
        chunkSize = parseInt(toStringSafe(chunkSize).trim());
        if (isNaN(chunkSize)) {
            chunkSize = 1;
        }

        return from(this.toBufferInner(chunkSize));
    }
    /**
     * @see toBuffer()
     */
    protected *toBufferInner(chunkSize: number) {
        let me = this;
            
        do
        {
            let arr = me.take(chunkSize).toArray();
            if (arr.length < 1) {
                break;
            }

            for (let item of arr) {
                yield item;
            }
        }
        while (true);
    }
    /** @inheritdoc */
    public toLookup<TKey extends PropertyKey, U = any>(keySelector: Selector<T, TKey>,
                                                       keyEqualityComparer?: EqualityComparer<TKey>): U {
        let lookup: any = {};

        for (let grp of this.groupBy(keySelector, keyEqualityComparer)) {
            let key: any = grp.key;

            lookup[key] = grp;
        }

        return lookup;
    }
    /** @inheritdoc */
    public toObject<TResult = any, TKey extends PropertyKey = number>(keySelector?: (item: T, index: number) => TKey): TResult {
        if (!keySelector) {
            keySelector = (item, index) => <any>index;
        }
        
        let obj: any = {};
        
        let i = -1;
        for (let item of this) {
            ++i;

            let key = keySelector(item, i);
            obj[key] = item;
        }

        return obj;
    }
    /** @inheritdoc */
    public union(second: Sequence<T>,
                 comparer?: EqualityComparer<T> | true): IEnumerable<T> {
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
}  // EnumerableBase<T>

/**
 * Wraps a sequence.
 * 
 * @template T Type of the items.
 */
export class EnumerableWrapper<T> extends EnumerableBase<T> {
    /**
     * The wrapped sequence.
     */
    protected _sequence: IEnumerable<T>;

    /**
     * Intializes a new instance of that class.
     * 
     * @param {IEnumerable<T>} [seq] The sequence to wrap.
     */
    constructor(seq?: IEnumerable<T>) {
        super();

        this._sequence = seq;
    }

    /** @inheritdoc */
    public get canReset() {
        return this._sequence.canReset;
    }
    /** @inheritdoc */
    public get current() {
        return this._sequence.current;
    }
    /** @inheritdoc */
    public next() {
        return this._sequence.next();
    }
    /** @inheritdoc */
    public reset() {
        this._sequence.reset();
        return this;
    }
}  // EnumerableWrapper<T>

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

        this._current = result;

        if (!result.done) {
            ++this._index;
        }

        return result;
    }
}  // IteratorEnumerable<T>

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
        let result: IteratorResult<T>;

        let nextIndex = this._index + 1;
        if (nextIndex >= this._array.length) {
            result = {
                done: true,
                value: undefined,
            };
        }
        else {
            this._index = nextIndex;
            
            result = {
                done: false,
                value: this._array[nextIndex],
            };
        }

        this._current = result;
        return result;
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
}  // ArrayEnumerable<T>

/**
 * A grouping.
 * 
 * @template T Type of the items.
 * @template TKey Type of the key.
 */
export class Grouping<TKey, T> extends EnumerableWrapper<T> implements IGrouping<TKey, T> {
    /**
     * Stores the key.
     */
    protected _key: TKey;
    
    /**
     * Initializes a new instance of that class.
     * 
     * @param {TKey} key The key.
     * @param {IEnumerable} seq The items of the grouping.
     */
    constructor(key: TKey, seq: IEnumerable<T>) {
        super(seq);

        this._key = key;
    }

    /** @inheritdoc */
    public get key(): TKey {
        return this._key;
    }
}  // Grouping<TKey, T>

/**
 * An ordered sequence.
 * 
 * @template T Type of the items.
 * @template U Type of the sort keys.
 */
export class OrderedEnumerable<T, U = T> extends EnumerableWrapper<T> implements IOrderedEnumerable<T> {
    /**
     * Stores the items in the original order.
     */
    protected _originalItems: T[];
    /**
     * Stores the comparer for the sort keys.
     */
    protected _orderComparer: Comparer<U, U>;
    /**
     * Stores the selector for the keys.
     */
    protected _orderSelector: Selector<T, U>;

    /**
     * Initializes a new instance of that class.
     * 
     * @param {IEnumerable<T>} seq The source sequence.
     * @param {Selector<T,U>} selector The selector for the sort values.
     * @param {Comparer<U,U>} comparer The comparer to use.
     */
    constructor(seq: IEnumerable<T>,
                selector: Selector<T, U>, comparer: Comparer<U, U>) {
        super(seq);

        let me = this;

        this._orderComparer = toComparerSafe(comparer);
        
        if (!selector) {
            selector = (i) => <any>i;
        }
        this._orderSelector = selector;

        this._originalItems = seq.toArray();

        this._sequence = from(this._originalItems.map(function(x: T) {
            return {
                sortBy: me.selector(x),
                value: x
            };
        }).sort(function(x: { sortBy: any, value: T },
                         y: { sortBy: any, value: T }) {
            
            return me.comparer(x.sortBy, y.sortBy);
        }).map(function(x: { sortBy: any, value: T }) {
            return x.value;
        }));
    }

    /**
     * Gets the comparer.
     */
    public get comparer(): Comparer<U, U> {
        return this._orderComparer;
    }
    /**
     * Gets the selector.
     */
    public get selector(): (x: T) => any {
        return this._orderSelector;
    }
    /** @inheritdoc */
    public then(comparer?: Comparer<T>): IOrderedEnumerable<T> {
        return this.thenBy(x => x,
                           comparer);
    }
    /** @inheritdoc */
    public thenBy<U>(selector: Selector<T, U>,
                     comparer?: Comparer<U, U>): IOrderedEnumerable<T> {
        if (!selector) {
            selector = (i) => <any>i;
        }
        
        comparer = toComparerSafe(comparer);
    
        let thisSelector = this._orderSelector;
        let thisComparer = this._orderComparer;
    
        return from(this._originalItems)
            .orderBy(x => {
                        return {
                            level_0: thisSelector(x),
                            level_1: selector(x),
                        };
                    },
                    (x, y) => {
                        let comp0 = thisComparer(x.level_0, y.level_0);
                        if (0 != comp0) {
                            return comp0;
                        }
                        
                        let comp1 = comparer(x.level_1, y.level_1);
                        if (0 != comp1) {
                            return comp1;
                        }
                        
                        return 0;
                    });
    }
    /** @inheritdoc */
    public thenByDescending<U>(selector: Selector<T, U>,
                               comparer?: Comparer<U, U>): IOrderedEnumerable<T> {
        if (!selector) {
            selector = (i) => <any>i;
        }
        
        comparer = toComparerSafe(comparer);
    
        return this.thenBy(selector,
                           (x, y) => {
                               return comparer(y, x);
                           });
    }
    /** @inheritdoc */
    public thenDescending(comparer?: Comparer<T>): IOrderedEnumerable<T> {
        return this.thenByDescending(x => x,
                                     comparer);
    }
}  // OrderedEnumerable<T, U = T>


/**
 * Builds a sequence.
 * 
 * @template T Type of the items. 
 * 
 * @param {CancelableFactory<T>} factory The factory function. 
 * @param {number} [count] The maximum number of items.
 * 
 * @returns {IEnumerable<T>} 
 */
export function build<T>(factory: CancelableFactory<T>,
                         count?: number): IEnumerable<T> {
    count = parseInt(toStringSafe(count).trim());

    return from(buildInner(factory, count));
}  // build<T>()

function *buildInner<T>(factory: CancelableFactory<T>,
                        count: number) {
    let i = -1;
    let run = true;
    while (run) {
        ++i;

        if (!isNaN(count)) {
            if (i >= count) {
                run = false;
                continue;
            }
        }

        let cancel = function(flag?: boolean) {
            if (arguments.length < 1) {
                flag = true;
            }

            run = !flag;
        };

        let newItem = factory(cancel, i);
        if (run) {
            yield newItem;
        }
    }
}

/**
 * Builds a flatten sequence of sequences.
 * 
 * @template T Type of the items.
 * @param {CancelableFactory<Sequence<T>>} factory The factory.
 * @param {number} [count] The maximum number of invocations.
 * 
 * @returns {IEnumerable<T>} The flatten list of items. 
 */
export function buildMany<T>(factory: CancelableFactory<Sequence<T>>,
                             count?: number): IEnumerable<T> {
    count = parseInt(toStringSafe(count).trim());

    return from(buildManyInner(factory, count));
}  // buildMany<T>()

function *buildManyInner<T>(factory: CancelableFactory<Sequence<T>>,
                            count: number) {
    let i = -1;
    let run = true;
    while (run) {
        ++i;

        if (!isNaN(count)) {
            if (i >= count) {
                run = false;
                continue;
            }
        }

        let cancel = function(flag?: boolean) {
            if (arguments.length < 1) {
                flag = true;
            }

            run = !flag;
        };

        let seq: any = factory(cancel, i);
        if (run) {
            if (!isNullOrUndefined(seq)) {
                for (let item of seq) {
                    yield item;
                }
            }
        }
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
}  // create<T = any>()

/**
 * Creates an empty sequence.
 * 
 * @template T The type of the sequence.
 * 
 * @returns {IEnumerable<T>} The new, empty sequence.
 */
export function empty<T = any>(): IEnumerable<T> {
    return from(emptyIterator());
}  // empty<T = any>()

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
}  // from<T>()

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
}  // fromString()

/**
 * Checks if a value represents the IS_EMPTY symbol.
 * 
 * @param {any} val The value to check.
 * 
 * @returns {boolean} Is IS_EMPTY symbol or not.
 */
export function isEmpty(val: any): boolean {
    return val === IS_EMPTY;
}  // isEmpty()

/**
 * Checks if a value represents the NOT_FOUND symbol.
 * 
 * @param {any} val The value to check.
 * 
 * @returns {boolean} Is NOT_FOUND symbol or not.
 */
export function notFound(val: any): boolean {
    return val === NOT_FOUND;
}  // notFound()

/**
 * Creates a range of numbers.
 * 
 * @param {number} start The start value. 
 * @param {number} [count] The meximum number of values.
 * 
 * @returns {IEnumerable<number>} The new sequence.
 */
export function range(start: number, count?: number): IEnumerable<number> {
    start = parseFloat(toStringSafe(start).trim());
    if (isNaN(start)) {
        start = 0;
    }

    count = parseInt(toStringSafe(count).trim());

    return from(rangeInner(start, count));
}  // range()

function *rangeInner(start: number, count: number) {
    let current = start;
    while (true) {
        if (!isNaN(count)) {
            if (count-- < 1) {
                break;
            }
        }

        yield current++;
    }
}

/**
 * Creates a range of numbers.
 * 
 * @param {T} item The item to repeat. 
 * @param {number} [count] The maximum number of items.
 * 
 * @returns {IEnumerable<number>} The new sequence.
 */
export function repeat<T>(item: T, count?: number): IEnumerable<T> {
    count = parseInt(toStringSafe(count).trim());

    return from(repeatInner(item, count));
}  // repeat<T>()

function *repeatInner<T>(item: T, count: number) {
    while (true) {
        if (!isNaN(count)) {
            if (count-- < 1) {
                break;
            }
        }

        yield item;
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

function createGroupArrayForSequence<T, TKey>(seq: IEnumerable<T>,
                                              keySelector: Selector<T, TKey>) {
    return seq.groupBy(keySelector).select(grp => {
        return {
            key: grp.key,
            values: grp.toArray(),
        };
    }).toArray();
}

function *emptyIterator() {
    while (<any>false) {
        yield <any>undefined;
    }
}

function getOrDefaultArguments<T, U>(predicateOrDefaultValue: Predicate<T> | T, defaultValue: U,
                                     paramCount: number) {
    let predicate: Predicate<T>;
    let defVal: any;

    if (paramCount < 1) {
        defVal = NOT_FOUND;
    }
    else if (paramCount < 2) {
        if ('function' === typeof predicateOrDefaultValue) {
            predicate = predicateOrDefaultValue;
            defVal = NOT_FOUND;
        }
        else {
            defVal = predicateOrDefaultValue;
        }
    }
    else {
        predicate = <any>predicateOrDefaultValue;
        defVal = defaultValue;
    }
    
    return {
        defaultValue: defVal,
        predicate: toPredicateSafe(predicate),
    };
}

function getNextIteratorResultSafe<T>(iterator: Iterator<T>, defaultValue?: any): IteratorResult<T> {
    let result = iterator.next();
    if (!result) {
        result = {
            done: true,
            value: defaultValue,
        };
    }

    return result;
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
