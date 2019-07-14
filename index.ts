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
 * node-enumerable (https://github.com/mkloubert/node-enumerable)
 * 
 * Copyright (c) Marcel Joachim Kloubert <marcel.kloubert@gmx.net>
 */
namespace Enumerable {
    /**
     * An async action.
     * 
     * @template T Type of the underlying items.
     * 
     * @param {AsyncActionContext<T>} context The underlying context.
     */
    export type AsyncAction<T = any> = (context: AsyncActionContext<T>) => void;

    /**
     * A context for an async action.
     * 
     * @template T Type of the underlying item.
     */
    export interface AsyncActionContext<T = any> {
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
     * @param {((cancel: (flag?: boolean) => void)} cancel The callback to cancel the operation.
     * @param {number} index The zero based index of that invocation.
     * 
     * @return {TResult} The result.
     */
    export type CancelableFactory<TResult = any> = (cancel: (flag?: boolean) => void, index: number) => TResult;

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
    export type Comparer<T = any, U = T> = (x: T, y: U) => number;

    /**
     * A forEach action.
     * 
     * @template T Type of the items.
     * 
     * @param {T} item The current item.
     * @param {number} index The zero based index of the current item.
     */
    export type EachAction<T = any> = (item: T, index: number) => void;

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
    export type EqualityComparer<T = any, U = T> = (x: T, y: U) => boolean;

    /**
     * An item message (provider).
     */
    export type ItemMessage<T = any> = string | ((item: T, index?: number) => any);

    /**
     * Saves joined values.
     * 
     * @template TOuter Type of the outer value.
     * @template TInner Type of the inner value.
     */
    export interface JoinedItems<TOuter = any, TInner = any> {
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
     * A collection that can be popped.
     */
    export interface PoppableStack<T = any> {
        /**
         * The length of the stack.
         */
        length: number;
        /**
         * Pops an element.
         * 
         * @return {T} The popped element.
         */
        pop: () => T;
    }  // PoppableStack<T>

    /**
     * A predicate / condition.
     * 
     * @template T Type of the item to check.
     * 
     * @param {T} The item to check.
     * 
     * @return {boolean} Item satisfies the condition or not.
     */
    export type Predicate<T = any> = (item: T) => boolean;

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
    export type Selector<T = any, U = any> = (item: T) => U;

    /**
     * Possible sequence types.
     * 
     * @template T Type of the items.
     */
    export type Sequence<T = any> = ArrayLike<T> | Iterable<T> | Iterator<T> | IArguments;

    /**
     * A collection that can be shifted.
     */
    export interface ShiftableStack<T = any> {
        /**
         * The length of the stack.
         */
        length: number;
        /**
         * Shifts an element.
         * 
         * @return {T} The shifted element.
         */
        shift: () => T;
    }  // ShiftableStack<T>

    /**
     * A stack.
     * 
     * @template T The type of the items.
     */
    export interface Stack<T = any> {
        /**
         * Pushes one or more item to the stack.
         * 
         * @param {...Array<T>} items The items to push.
         * 
         * @returns {number} The new length of the stack.
         */
        push(...items: Array<T>): number;
    }  // interface Stack<T>

    /**
     * Indicates that something is empty.
     */
    export const IS_EMPTY = Symbol('IS_EMPTY');
    /**
     * Indicates that something is an enumerable (sequence).
     */
    export const IS_ENUMERABLE = Symbol('IS_ENUMERABLE');
    /**
     * Indicates if something was not found.
     */
    export const NOT_FOUND = Symbol('NOT_FOUND');

    /**
     * A sequence.
     * 
     * @template T Type of the items.
     */
    export interface IEnumerable<T = any> extends Iterable<T>, Iterator<T> {
        /**
         * Handles current items as numbers and returns their absolute values.
         * 
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        abs(handleAsInt?: boolean): IEnumerable<number>;
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
         * Alias for concat()
         */
        append<U = T>(...args: Sequence<U>[]): IEnumerable<T | U>;
        /**
         * Alias for concatArray()
         */
        appendArray<U = T>(sequences: ArrayLike<Sequence<U>>): IEnumerable<T | U>;
        /**
         * Handles current items as numbers and calculates the arc cosine for each item.
         * 
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        arcCos(handleAsInt?: boolean): IEnumerable<number>;
        /**
         * Handles current items as numbers and calculates the arc hyperbolic cosine for each item.
         * 
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        arcCosH(handleAsInt?: boolean): IEnumerable<number>;
        /**
         * Handles current items as numbers and calculates the arc sine for each item.
         * 
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        arcSin(handleAsInt?: boolean): IEnumerable<number>;
        /**
         * Handles current items as numbers and calculates the arc hyperbolic sine for each item.
         * 
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        arcSinH(handleAsInt?: boolean): IEnumerable<number>;
        /**
         * Handles current items as numbers and calculates the arc tangent for each item.
         * 
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        arcTan(handleAsInt?: boolean): IEnumerable<number>;
        /**
         * Handles current items as numbers and calculates the arc hyperbolic tangent for each item.
         * 
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        arcTanH(handleAsInt?: boolean): IEnumerable<number>;
        /**
         * Asserts that all elements of that sequence meet a given condition,
         * otherwise an error is throw at first fail.
         * 
         * @param {Predicate<T>} predicate The predicate / condition.
         * @param {string|((item: T, index: number) => any)} [errMsg] The custom error message to return.
         * 
         * @chainable
         * 
         * @throws One element failed.
         */
        assert(predicate: Predicate<T>,
               errMsg?: ItemMessage<T>): this;
        /**
         * Asserts that all elements of that sequence meet a given condition,
         * otherwise an error is throw at the end.
         * 
         * @param {Predicate<T>} predicate The predicate / condition.
         * @param {string|((item: T, index: number) => any)} [errMsg] The custom error message to return.
         * 
         * @chainable
         * 
         * @throws At least one element failed.
         */
        assertAll(predicate: Predicate<T>,
                  errMsg?: ItemMessage<T>): this;
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
         * @returns {number|symbol} The average or IS_EMPTY if sequence is empty.
         */
        average(selector?: Selector<T, number>): number | symbol;
        /**
         * Gets if that sequence can be resetted or not.
         */
        readonly canReset: boolean;
        /**
         * Returns a "casted" version of that sequence.
         * 
         * @template U The target type.
         * 
         * @param {string} [type] The optional target type to converts the items to.
         *                        Possible values are: bool/boolean, float/number, func/function, object, string, int/integer,
         *                                             null, undefined,
         *                                             symbol
         * 
         * @returns {IEnumerable<U>} The "casted" sequence.
         * 
         * @throws Target type is not supported
         */
        cast<U = any>(type?: string): IEnumerable<U>;
        /**
         * Handles current items as float values and returns the smallest value greater than or equal to them.
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        ceil(): IEnumerable<number>;
        /**
         * Splits the given sequence into chunks of the given size.
         * 
         * @param {number} [size] The chunk size. Default: 1
         * 
         * @return {IEnumerable<IEnumerable<T>>} The sequence of chunks.
         */
        chunk(size?: number): IEnumerable<IEnumerable<T>>;
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
         * @param {...Sequence<U>[]} args The other sequences.
         * 
         * @memberof IEnumerable<T|U> The concated sequence.
         */
        concat<U = T>(...args: Sequence<U>[]): IEnumerable<T | U>;
        /**
         * Concats the items of that sequences with other ones
         * to a new sequence.
         * 
         * @param {...Sequence<U>[]} sequences The other sequences.
         * 
         * @memberof IEnumerable<T|U> The concated sequence.
         */
        concatArray<U = T>(sequences: ArrayLike<Sequence<U>>): IEnumerable<T | U>;
        /**
         * Completely consumes the given sequence. This method uses immediate execution,
         * and doesn't store any data during execution.
         * 
         * @chainable
         */
        consume(): this;
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
         * Handles current items as numbers and calculates the cosine for each item.
         * 
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        cos(handleAsInt?: boolean): IEnumerable<number>;
        /**
         * Handles current items as numbers and calculates the hyperbolic cosine for each item.
         * 
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        cosH(handleAsInt?: boolean): IEnumerable<number>;
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
         * Alias for defaultSequenceIfEmpty()
         */
        defaultArrayIfEmpty(defaultSequence: Sequence<T>): IEnumerable<T>;
        /**
         * Returns the items of that sequence or a default item list
         * if that sequence is empty.
         * 
         * @param {...Array<T>} defaultItems The default items.
         * 
         * @returns {IEnumerable<T>} The (new) sequence.
         */
        defaultIfEmpty(...defaultItems: Array<T>): IEnumerable<T>;
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
         * Removes duplicate entries from that sequence by using a selector.
         * 
         * @param {Selector<T,U>} selector The selector to use.
         * @param {EqualityComparer<T>} [comparer] The custom equality comparer to use.
         *                                         (true) indicates to do a === check.
         * 
         * @returns {IEnumerable<T>} The new sequence.
         */
        distinctBy<U>(selector: Selector<T, U>,
                      comparer?: EqualityComparer<U> | true): IEnumerable<T>;
        /**
         * Alias for forEach()
         */
        each(func: EachAction<T>): this;
        /**
         * Alias for forAll()
         */
        eachAll(func: EachAction<T>): this;
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
        elementAtOrDefault<U = symbol>(index: number,
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
         * Handles current items as numbers and calculates e (the base of natural logarithms) raised to each value.
         * 
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        exp(handleAsInt?: boolean): IEnumerable<number>;
        /**
         * Returns the first element of that sequence.
         * 
         * @param {Predicate<T>} [predicate] The optional predicate to use.
         * 
         * @returns {T} The first element. 
         * 
         * @throws Element not found.
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
        firstOrDefault<U = symbol>(predicateOrDefaultValue?: Predicate<T> | T,
                                   defaultValue?: U): T | U;
        /**
         * Returns a flattened sequence that contains the concatenation of all the nested sequences elements.
         * 
         * @return {IEnumerable<U>} The flatten items.
         */
        flatten<U = T>(): IEnumerable<U>;
        /**
         * Handles current items as float values and return the greatest value less than or equal to them.
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        floor(): IEnumerable<number>;
        /**
         * Invokes a function for each element of that sequence and continues
         * even if an error is thrown. All occurred errors will be thrown at the end.
         * 
         * @param {EachAction<T>} func The function to invoke.
         * 
         * @throws At least on error was thrown while the execution.
         * 
         * @chainable
         */
        forAll(func: EachAction<T>): this;
        /**
         * Invokes a function for each element of that sequence.
         * 
         * @param {EachAction<T>} func The function to invoke.
         * 
         * @chainable
         */
        forEach(func: EachAction<T>): this;
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
        groupJoin<TInner = T, TOuterKey = any, TInnerKey = any, TResult = JoinedItems<T, IEnumerable<TInner>>>(
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
         * Returns all elements of the collection separated by the given separator(s).
         * 
         * @param {U[]} [separators] One or more separator.
         * 
         * @return {IEnumerable<T|U>} The new sequence.
         */
        intersperse<U = T>(...separators: U[]): IEnumerable<T | U>;
        /**
         * Returns all elements of the collection separated by the given separator(s).
         * 
         * @param {Sequence<U>} separators The separators.
         * 
         * @return {IEnumerable<T|U>} The new sequence.
         */
        intersperseArray<U = T>(separators: Sequence<U>): IEnumerable<T | U>;
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
         * Checks if that sequence is empty or not
         * by using the length() method.
         * 
         * @return {boolean} Is Empty or not.
         */
        isEmpty(): boolean;
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
        join<TInner = T, TOuterKey = any, TInnerKey = any, TResult = JoinedItems<T, TInner>>(
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
         * @throws Element not found.
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
         * @param {(T|symbol)} [defaultValue] The default value. Default: NOT_FOUND
         *                                      If definded: predicateOrDefaultValue MUST be a function in this case!
         * 
         * @returns {T|U} The item or the default value.
         */
        lastOrDefault<U = symbol>(predicateOrDefaultValue?: Predicate<T> | T,
                                  defaultValue?: U): T | U;
        /**
         * Returns the length of the underlying collection.
         * If the underlying object does NOT contain a 'length' property, like a generator, it will
         * behave the same way as 'count' method.
         * 
         * @return {number} The length.
         */
        length(): number;
        /**
         * Handles current items as numbers and calculates the logarithm of them.
         * 
         * @param {number} [base] The custom base. Default: e
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        log(base?: number, handleAsInt?: boolean): IEnumerable<number>;
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
         * @returns {T|symbol} The item or IS_EMPTY if that sequence is empty.
         */
        max<U = T>(valueSelector?: Selector<T, U>,
                   comparer?: Comparer<U>): T | symbol;
        /**
         * Returns the minimum item of that sequence.
         * 
         * @param {Comparer<U>} [comparer] The custom comparer to use.
         * 
         * @returns {T|symbol} The item or IS_EMPTY if that sequence is empty.
         */
        min<U = T>(valueSelector?: Selector<T, U>,
                   comparer?: Comparer<U>): T | symbol;
        /**
         * Removes all values that are no valid numbers.
         * 
         * @param {boolean} [checkForInt] Check for integer and not for float. Default: (false)
         * 
         * @return {IEnumerable<T>} The filtered sequence.
         */
        noNAN(checkForInt?: boolean): IEnumerable<T>;
        /**
         * Filters the items of that sequence based on a given predicate and returns those items that do not match the predicate.
         * 
         * @param {Predicate<T>} [predicate] The optional predicate to use.
         *                                   If no predicate is defined, all values that are empty, (false), (null), (undefined), e.g., are taken.
         * 
         * @return {IEnumerable<T>} The filtered sequence.
         */
        not(predicate?: Predicate<T>): IEnumerable<T>;
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
         * Executes the given action on each element in the source sequence
         * and yields it.
         * 
         * @param {EachAction<T>} action The action to invoke.
         * 
         * @return {IEnumerable<T>} The new sequence.
         */
        pipe(action: EachAction<T>): IEnumerable<T>;
        /**
         * Handles current items as base numbers and take them to a specific power.
         * 
         * @param {number} [exponent] The exponent. Default: 2
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        pow(exponent?: number, handleAsInt?: boolean): IEnumerable<number>;
        /**
         * Prepends the itms of other sequences to the ones of that sequence.
         * 
         * @param {...Sequence<T>[]} args The other sequences.
         * 
         * @memberof IEnumerable<T|U> The concated sequence.
         */
        prepend<U = T>(...args: Sequence<T | U>[]): IEnumerable<T | U>;
        /**
         * Prepends the itms of other sequences to the ones of that sequence.
         * 
         * @param {...Sequence<T>[]} sequences The other sequences.
         * 
         * @memberof IEnumerable<T|U> The concated sequence.
         */
        prependArray<U = T>(sequences: ArrayLike<Sequence<T | U>>): IEnumerable<T | U>;
        /**
         * Calculates the product of that sequence.
         * 
         * @returns {(T|symbol)} The product or IS_EMPTY if that sequence is empty.
         */
        product(seed?: T): T | symbol;
        /**
         * Pushes the elements of that sequence to an array or stack-like object.
         * 
         * @param {Stack<T>} stack The array or stack.
         * 
         * @returns {this} 
         */
        pushTo(stack: Stack<T>): this;
        /**
         * Randomizes the order of that sequence.
         * 
         * @param {Function} sortValueProvider A custom function that provides a random sort value.
         * 
         * @return {IOrderedEnumerable<T>} The new sequence.
         */
        rand(sortValueProvider?: () => any): IOrderedEnumerable<T>;
        /**
         * Returns that sequence.
         * 
         * @returns {this} 
         * 
         * @throws Not supported
         */
        reset(): this;
        /**
         * Reverses the order of that sequence.
         * 
         * @return {IOrderedEnumerable<T>} The new sequence.
         */
        reverse(): IOrderedEnumerable<T>;
        /**
         * Handles current items as numbers and calculates the n-th root for each item.
         * 
         * @param {number} [power] The power. Default: 2
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        root(power?: number, handleAsInt?: boolean): IEnumerable<number>;
        /**
         * Handles current items as float values and return their nearest values.
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        round(): IEnumerable<number>;
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
         * Alias for rand()
         */
        shuffle(sortValueProvider?: () => any): IOrderedEnumerable<T>;
        /**
         * Handles current items as numbers and calculates the sine for each item.
         * 
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        sin(handleAsInt?: boolean): IEnumerable<number>;
        /**
         * Returns the one and only element of that sequence.
         * 
         * @param {Predicate<T>} [predicate] The optional predicate to use.
         * 
         * @returns {T} The single element. 
         * 
         * @throws Element not found or sequence contains for than one (matching) element.
         */
        single(predicate?: Predicate<T>): T;
        /**
         * Tries to return the one and only element.
         * 
         * @template U Type of the default value.
         * 
         * @param {(Predicate<T>|T)} [predicateOrDefaultValue] The predicate or default value.
         * @param {(T|symbol)} [defaultValue] The default value. Default: NOT_FOUND
         *                                      If definded: predicateOrDefaultValue MUST be a function in this case!
         * 
         * @returns {T|U} The item or the default value.
         * 
         * @throws Sequence contains for than one (matching) element.
         */
        singleOrDefault<U=symbol>(predicateOrDefaultValue?: Predicate<T> | T,
                                  defaultValue?: U): T | U;
        /**
         * Handles current items as numbers and calculates the hyperbolic sine for each item.
         * 
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        sinH(handleAsInt?: boolean): IEnumerable<number>;
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
         * Handles current items as numbers and calculates square root for each item.
         * 
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        sqrt(handleAsInt?: boolean): IEnumerable<number>;
        /**
         * Calculates the sum of that sequence.
         * 
         * @returns {(T|symbol)} The sum or IS_EMPTY if that sequence is empty.
         */
        sum(seed?: T): T | symbol;
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
         * Handles current items as numbers and calculates the tangent for each item.
         * 
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        tan(handleAsInt?: boolean): IEnumerable<number>;
        /**
         * Handles current items as numbers and calculates the hyperbolic tangent for each item.
         * 
         * @param {boolean} [handleAsInt] Handle as integer values (true) or floats (false).
         *                                Default: (false)
         * 
         * @return {IEnumerable<number>} The new sequence.
         */
        tanH(handleAsInt?: boolean): IEnumerable<number>;
        /**
         * Creates a new array from the items of that sequence.
         * 
         * @returns {Array<T>} The sequence as array.
         */
        toArray(): Array<T>;
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
         * Traces the elements of that sequence.
         * 
         * @param {Selector<T, any>} [formatter] The custom formatter to use.
         * 
         * @return {IEnumerable<T>} The new, piped sequence.
         */
        trace(formatter?: Selector<T, any>): IEnumerable<T>;
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
         * @param {ZipSelector<T,U,TResult>} resultSelector The selector for the result item.
         * 
         * @returns {IEnumerable<TResult>} The "zipped" sequence.
         */
        zip<U = T, TResult = any>(second: Sequence<U>,
                                  resultSelector: ZipSelector<T, U, TResult>): IEnumerable<TResult>;
    }  // IEnumerable<T>

    /**
     * Describes a grouping.
     * 
     * @template T Type of the items.
     * @template TKey Type of the key.
     */
    export interface IGrouping<TKey = any, T = any> extends IEnumerable<T> {
        /**
         * Gets the key.
         */
        readonly key: TKey;
    }  // IGrouping<TKey, T>

    /**
     * Describes an ordered sequence.
     */
    export interface IOrderedEnumerable<T = any> extends IEnumerable<T> {
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
     * A result selector for a 'zip' method / function.
     * 
     * @param {T} x The "left" value.
     * @param {U} y The "other" value.
     * @param {number} index The zero based index.
     * 
     * @return {TResult} The "zipped" result,
     */
    export type ZipSelector<T = any, U = T, TResult = any> = (x: T, y: U, index: number) => TResult;


    /**
     * Represents a list of errors.
     */
    export class AggregateError extends Error {
        /**
         * Stores the errors.
         */
        protected _errors: any[];

        /**
         * Initializes a new instance of that class.
         * 
         * @param {any[]} [errors] The occurred errors. 
         */
        constructor(errors?: any[]) {
            super();

            this._errors = (errors || []).filter(e => {
                return !isNullOrUndefined(e);
            });
        }

        /**
         * Gets the errors.
         */
        public get errors(): any[] {
            return this._errors;
        }

        /** @inheritdoc */
        public get stack(): string {
            return this.errors.map((e, i) => {
                const TITLE = "STACK #" + (i + 1);
                const LINE = repeat('=', TITLE.length + 5).joinToString();

                return `${TITLE}\n${LINE}\n${toStringSafe(e['stack'])}`;
            }).join("\n\n");
        }

        /** @inheritdoc */
        public toString(): string {
            return this.errors.map((e, i) => {
                const TITLE = "ERROR #" + (i + 1);
                const LINE = repeat('=', TITLE.length + 5).joinToString();

                return `${TITLE}\n${LINE}\n${e}`;
            }).join("\n\n");
        }
    }

    /**
     * A error wrapper for a function.
     */
    export class FunctionError extends Error {
        /**
         * Stores the inner error.
         */
        protected _error: any;
        /**
         * Stores the underlying function.
         */
        protected _function: Function;
        /**
         * Stores the (zero based) index.
         */
        protected _index: number;

        /**
         * Initializes a new instance of that class.
         * 
         * @param {any} [err] The underlying, inner error.
         * @param {Function} [func] The underlying function.
         * @param {number} [index] The (zero based) index.
         */
        constructor(err?: any,
                    func?: Function, index?: number) {
            super();

            this._error = err;
            this._function = func;
            this._index = index;
        }

        /**
         * Gets the (zero based) index.
         */
        public get index(): number {
            return this._index;
        }

        /**
         * Gets the inner error.
         */
        public get innerError(): any {
            return this._error;
        }

        /** @inheritdoc */
        public get stack(): string {
            if (this.innerError) {
                return this.innerError['stack'];
            }
        }

        /** @inheritdoc */
        public toString(): string {
            let title = 'ACTION ERROR';
            if (!isNaN(this.index)) {
                title += ' #' + this.index;
            }

            const LINE = repeat('=', title.length + 5).joinToString();

            let content = '';
            if (this.innerError) {
                content += this.innerError;
            }

            return `${title}\n${LINE}\n${content}`;
        }
    }

    /**
     * A basic sequence.
     */
    export abstract class EnumerableBase<T = any> implements IEnumerable<T> {
        /**
         * Stores the current iterator result.
         */
        protected _current: IteratorResult<T>;
        /**
         * Stores the current index.
         */
        protected _index = -1;

        /**
         * Indicates that that instance is an enumerable (sequence).
         */
        public readonly IS_ENUMERABLE = IS_ENUMERABLE;
        
        /** @inheritdoc */
        public [Symbol.iterator](): Iterator<T> {
            return this;
        }

        /** @inheritdoc */
        public abs(handleAsInt?: boolean): IEnumerable<number> {
            return this.select((x: any) => {
                return invokeForValidNumber(x, y => Math.abs(y),
                                            handleAsInt);
            });
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
        public append<U = T>(...args: Sequence<U>[]): IEnumerable<T | U> {
            return this.concat
                       .apply(this, arguments);
        }
        /** @inheritdoc */
        public appendArray<U = T>(sequences: ArrayLike<Sequence<U>>): IEnumerable<T | U> {
            return this.concatArray
                       .apply(this, arguments);
        }
        /** @inheritdoc */
        public arcCos(handleAsInt?: boolean): IEnumerable<number> {
            return this.select(x => invokeForValidNumber(x,
                                                         y => Math.acos(y),
                                                         handleAsInt));
        }
        /** @inheritdoc */
        public arcCosH(handleAsInt?: boolean): IEnumerable<number> {
            return this.select(x => invokeForValidNumber(x,
                                                         y => Math.acosh(y),
                                                         handleAsInt));
        }
        /** @inheritdoc */
        public arcSin(handleAsInt?: boolean): IEnumerable<number> {
            return this.select(x => invokeForValidNumber(x,
                                                         y => Math.asin(y),
                                                         handleAsInt));
        }
        /** @inheritdoc */
        public arcSinH(handleAsInt?: boolean): IEnumerable<number> {
            return this.select(x => invokeForValidNumber(x,
                                                         y => Math.asinh(y),
                                                         handleAsInt));
        }
        /** @inheritdoc */
        public arcTan(handleAsInt?: boolean): IEnumerable<number> {
            return this.select(x => invokeForValidNumber(x,
                                                         y => Math.atan(y),
                                                         handleAsInt));
        }
        /** @inheritdoc */
        public arcTanH(handleAsInt?: boolean): IEnumerable<number> {
            return this.select(x => invokeForValidNumber(x,
                                                         y => Math.atanh(y),
                                                         handleAsInt));
        }
        /** @inheritdoc */
        public assert(predicate: Predicate<T>, errMsg?: ItemMessage<T>) {
            predicate = toPredicateSafe(predicate);
            errMsg = toItemMessageSafe(errMsg);

            let i = -1;
            for (let item of this) {
                ++i;

                if (!predicate(item)) {
                    throw errMsg(item, i);
                }
            }

            return this;
        }
        /** @inheritdoc */
        public assertAll(predicate: Predicate<T>, errMsg?: ItemMessage<T>) {
            predicate = toPredicateSafe(predicate);
            errMsg = toItemMessageSafe(errMsg);

            const ERRORS: string[] = [];

            let i = -1;
            for (let item of this) {
                ++i;

                if (!predicate(item)) {
                    ERRORS.push(
                        errMsg(item, i)
                    );
                }
            }

            if (ERRORS.length > 0) {
                throw new AggregateError(
                    ERRORS
                );
            }

            return this;
        }
        /** @inheritdoc */
        public async(action: AsyncAction<T>, previousValue?: any): Promise<any> {
            const ME = this;

            return new Promise<any>((resolve, reject) => {
                let asyncResult: any;
                const ASYNC_COMPLETED = (err: any) => {
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
                    const NEXT_ITEM = () => {
                        ++i;
                        
                        const ITEM = this.next();
                        if (!ITEM || ITEM.done) {
                            ASYNC_COMPLETED(null);
                            return;
                        }

                        const CTX: AsyncActionContext<T> = {
                            cancel: function(result?: any) {
                                if (arguments.length > 0) {
                                    asyncResult = result;
                                }

                                ASYNC_COMPLETED(null);
                            },
                            index: i,
                            isFirst: 0 === i,
                            item: ITEM.value,
                            previousValue: prevVal,
                            reject: function(reason: any, result?: any) {
                                if (arguments.length > 1) {
                                    asyncResult = result;
                                }

                                ASYNC_COMPLETED(reason);
                            },
                            resolve: function(nextValue?: any) {
                                prevVal = nextValue;

                                NEXT_ITEM();
                            },
                            result: undefined,
                            sequence: ME,
                            value: undefined,
                        };

                        // ctx.result
                        Object.defineProperty(CTX, 'result', {
                            get: () => { return asyncResult; },
                            set: (newValue) => { asyncResult = newValue; },

                            enumerable: true,
                        });

                        // ctx.value
                        Object.defineProperty(CTX, 'value', {
                            get: () => { return val; },
                            set: (newValue) => { val = newValue; },

                            enumerable: true,
                        });

                        try {
                            if (action) {
                                action(CTX);
                            }
                            else {
                                CTX.resolve();
                            }
                        }
                        catch (e) {
                            CTX.reject(e);
                        }
                    };

                    NEXT_ITEM();
                }
                catch (e) {
                    ASYNC_COMPLETED(e);
                }
            });
        }
        /** @inheritdoc */
        public average(selector?: Selector<T, number>): number | symbol {
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
        public cast<U>(type?: string): IEnumerable<U> {
            type = toStringSafe(type).trim();

            return this.select((x: any) => {
                if ('' !== type) {
                    switch (type) {
                        case 'bool':
                        case 'boolean':
                            x = !!x;
                            break;
                            
                        case 'float':
                            x = parseFloat( toStringSafe(x).trim() );
                            break;

                        case 'func':
                        case 'function':
                            if ('function' !== typeof x) {
                                const FUNC_RESULT = x;
                                x = function() {
                                    return FUNC_RESULT;
                                };
                            }
                            break;

                        case 'null':
                            x = null;
                            break;

                        case 'number':
                            if ('number' !== typeof x) {
                                x = parseFloat( toStringSafe(x).trim() );
                            }
                            break;
                       
                        case 'object':
                            if (!isNullOrUndefined(x)) {
                                if ('object' !== typeof x) {
                                    x = JSON.parse( toStringSafe(x) );
                                }
                            }
                            break;

                        case 'int':
                        case 'integer':
                            x = parseInt( toStringSafe(x).trim() );
                            break;
                        
                        case 'string':
                            x = '' + x;
                            break;

                        case 'symbol':
                            if ('symbol' !== typeof x) {
                                let desc = x;
                                if (!isNullOrUndefined(desc)) {
                                    if ('number' !== typeof desc) {
                                        desc = toStringSafe(desc);
                                    }
                                }

                                x = Symbol(desc);
                            }
                            break;

                        case 'undefined':
                            x = undefined;
                            break;

                        default:
                            throw 'Not supported type ' + type;
                    }
                }

                return <U>x;
            });
        }
        /** @inheritdoc */
        public ceil(): IEnumerable<number> {
            return this.select((x: any) => {
                return invokeForValidNumber(x,
                                            y => Math.ceil(y));
            });
        }
        /** @inheritdoc */
        public chunk(size?: number): IEnumerable<IEnumerable<T>> {
            size = parseInt( toStringSafe(size).trim() );
            if (isNaN(size)) {
                size = 1;
            }

            return from( this.chunkInner(size) );
        }
        /**
         * @see chunk()
         */
        protected *chunkInner(size: number) {
            let currentChunk: T[];

            while (true)
            {
                const ARR = this.getNextChunkArray(size);
                if (ARR.length > 0) {
                    yield from(ARR);
                }
                else {
                    break;
                }
            }
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
            const ITEMS = this.toArray();

            while (true) {
                if (!isNaN(count)) {
                    if (count-- < 1) {
                        break;
                    }
                }

                let seq: any = from(ITEMS);
                if (itemSelector) {
                    seq = seq.select(itemSelector);
                }
                
                yield seq;
            }
        }
        /** @inheritdoc */
        public concat<U = T>(...args: Sequence<U>[]): IEnumerable<T | U> {
            return this.concatArray(args);
        }
        /** @inheritdoc */
        public concatArray<U = T>(sequences: ArrayLike<Sequence<U>>): IEnumerable<T | U> {
            return from(this.concatArrayInner(sequences));
        }
        /**
         * @see concatArray()
         */
        protected *concatArrayInner<U>(sequences: ArrayLike<Sequence<U>>): IterableIterator<T | U> {
            for (let item of this) {
                yield item;
            }

            if (sequences) {
                for (let i = 0; i < sequences.length; i++) {
                    const SEQ = sequences[i];

                    for (let item of from(SEQ)) {
                        yield item;
                    }
                }
            }
        }
        /** @inheritdoc */
        public consume(): this {
            for (let item of this) { }

            return this;
        }
        /** @inheritdoc */
        public contains<U>(item: U,
                           comparer?: EqualityComparer<T, U> | true): boolean {
            return this.indexOf<U>(item, comparer) > -1;
        }
        /** @inheritdoc */
        public cos(handleAsInt?: boolean): IEnumerable<number> {
            return this.select(x => invokeForValidNumber(x,
                                                         y => Math.cos(y),
                                                         handleAsInt));
        }
        /** @inheritdoc */
        public cosH(handleAsInt?: boolean): IEnumerable<number> {
            return this.select(x => invokeForValidNumber(x,
                                                         y => Math.cosh(y),
                                                         handleAsInt));
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
        public defaultArrayIfEmpty(defaultSequence: Sequence<T>): IEnumerable<T> {
            return this.defaultSequenceIfEmpty
                       .apply(this, arguments);
        }
        /** @inheritdoc */
        public defaultIfEmpty(...defaultItems: Array<T>): IEnumerable<T> {
            return from(this.defaultIfEmptyInner(defaultItems));
        }
        /**
         * @see defaultIfEmpty()
         */
        protected *defaultIfEmptyInner(defaultItems: Array<T>) {
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
            return this.distinctBy(x => x, comparer);
        }
        /** @inheritdoc */
        public distinctBy<U>(selector: Selector<T, U>,
                             comparer?: EqualityComparer<U> | true): IEnumerable<T> {
            if (!selector) {
                selector = (i) => <any>i;
            }
            
            comparer = toEqualityComparerSafe(comparer);

            return from(this.distinctByInner(selector, comparer));
        }
        /**
         * @see distinct()
         */
        protected *distinctByInner<U>(selector: Selector<T, U>,
                                      comparer: EqualityComparer<U>) {
            const TEMP: U[] = [];
            
            for (let item of this) {
                const KEY_ITEM = selector(item);
                
                let found = false;
                for (let t of TEMP) {
                    if (comparer(KEY_ITEM, t)) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    TEMP.push(KEY_ITEM);

                    yield item;
                }
            }
        }
        /** @inheritdoc */
        public each(action: EachAction<T>): this {
            return this.forEach
                       .apply(this, arguments);
        }
        /** @inheritdoc */
        public eachAll(action: EachAction<T>): this {
            return this.forAll
                       .apply(this, arguments);
        }
        /** @inheritdoc */
        public elementAt(index: number): T {
            const ELEMENT_NOT_FOUND = Symbol('ELEMENT_NOT_FOUND');

            const ITEM = this.elementAtOrDefault(index,
                                                 ELEMENT_NOT_FOUND);

            if (ELEMENT_NOT_FOUND === ITEM) {
                throw "Element not found";
            }

            return <T>ITEM;
        }
        /** @inheritdoc */
        public elementAtOrDefault<U = symbol>(index: number,
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
        protected *exceptInner(second: Array<T>, comparer: EqualityComparer<T>) {
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
        public exp(handleAsInt?: boolean): IEnumerable<number> {
            return this.select(x => invokeForValidNumber(x,
                                                         y => Math.exp(y),
                                                         handleAsInt));
        }
        /** @inheritdoc */
        public first(predicate?: Predicate<T>): T {
            predicate = toPredicateSafe(predicate);

            const ELEMENT_NOT_FOUND = Symbol('ELEMENT_NOT_FOUND');

            const RESULT = this.firstOrDefault(predicate,
                                               ELEMENT_NOT_FOUND);
            
            if (ELEMENT_NOT_FOUND === RESULT) {
                throw 'Element not found';
            }

            return <any>RESULT;
        }
        /** @inheritdoc */
        public firstOrDefault<U = symbol>(predicateOrDefaultValue?: Predicate<T> | T,
                                          defaultValue?: U): T | U {
            const ARGS = getOrDefaultArguments(predicateOrDefaultValue, defaultValue,
                                               arguments.length);

            for (let item of this) {
                if (ARGS.predicate(item)) {
                    return item;
                }
            }

            return ARGS.defaultValue;
        }
        /** @inheritdoc */
        public flatten<U = T>(): IEnumerable<U> {
            return this.selectMany((x: any) => {
                if (!isSequence(x)) {
                    x = [ x ];
                }

                return x;
            });
        }
        /** @inheritdoc */
        public floor(): IEnumerable<number> {
            return this.select((x: any) => {
                return invokeForValidNumber(x,
                                            y => Math.floor(y));
            });
        }
        /** @inheritdoc */
        public forAll(action: EachAction<T>): this {
            const ERRORS: any[] = [];

            let i = -1;
            for (let item of this) {
                ++i;

                try {
                    if (action) {
                        action(item, i);
                    }
                }
                catch (e) {
                    ERRORS.push(
                        new FunctionError(e,
                                          action, i)
                    );
                }
            }

            if (ERRORS.length > 0) {
                throw new AggregateError(ERRORS);
            }

            return this;
        }
        /** @inheritdoc */
        public forEach(action: EachAction<T>): this {
            let i = -1;
            for (let item of this) {
                ++i;

                if (action) {
                    action(item, i);
                }
            }

            return this;
        }
        /**
         * @see chunkInner()
         */
        protected getNextChunkArray(size: number): T[] {
            const ARR: T[] = [];

            for (let item of this) {
                ARR.push(item);

                if (ARR.length >= size) {
                    break;
                }
            }

            return ARR;
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
                values: Array<T>,
            };

            const GROUP_LIST: GroupItem[] = [];

            for (let item of this) {
                const KEY = keySelector(item);

                let grp: GroupItem;
                for (let g of GROUP_LIST) {
                    if (keyEqualityComparer(KEY, g.key)) {
                        grp = g;
                        break;
                    }
                }

                if (!grp) {
                    grp = {
                        key: KEY,
                        values: [],
                    };

                    GROUP_LIST.push(grp);
                }

                grp.values
                   .push(item);
            }

            for (let grp of GROUP_LIST) {
                yield new Grouping(grp.key, from(grp.values));
            }
        }
        /** @inheritdoc */
        public groupJoin<TInner = T, TOuterKey = any, TInnerKey = any, TResult = JoinedItems<T, IEnumerable<TInner>>>(
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
            const OUTER_GROUPS = createGroupArrayForSequence(this, outerKeySelector);
            const INNER_GROUPS = createGroupArrayForSequence(inner, innerKeySelector);

            while (OUTER_GROUPS.length > 0) {
                const OUTER_GRP = OUTER_GROUPS.shift();

                for (let i = 0; i < INNER_GROUPS.length; i++) {
                    const INNER_GRP = INNER_GROUPS[i];

                    if (!keyEqualityComparer(OUTER_GRP.key, INNER_GRP.key)) {
                        continue;
                    }

                    for (let j = 0; j < OUTER_GRP.values.length; j++) {
                        yield resultSelector(OUTER_GRP.values[j],
                                             from(INNER_GRP.values));
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
        public intersperse<U = T>(...separators: U[]): IEnumerable<T | U> {
            return from( this.intersperseInner(separators) );
        }
        /**
         * @see intersperseInner()
         */
        protected *intersperseInner<U>(separators: U[]): Iterator<T | U> {
            if (!separators) {
                separators = [];
            }

            let isFirst = true;
            for (let item of this) {
                // separator(s)
                if (!isFirst) {
                    for (let s of separators) {
                        yield s;
                    }
                }
                else {
                    isFirst = false;
                }

                yield item;
            }
        }
        /** @inheritdoc */
        public intersperseArray<U = T>(separators: Sequence<U>): IEnumerable<T | U> {
            return from(this.intersperseInner(
                from(separators).toArray(),
            ));
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
        protected *intersectInner(second: Array<T>, comparer: EqualityComparer<T>) {
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
        public isEmpty(): boolean {
            return this.length() < 1;
        }
        /** @inheritdoc */
        public join<TInner = T, TOuterKey = any, TInnerKey = any, TResult = JoinedItems<T, TInner>>(
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
            const OUTER_GROUPS = createGroupArrayForSequence(this, outerKeySelector);
            const INNER_GROUPS = createGroupArrayForSequence(inner, innerKeySelector);

            while (OUTER_GROUPS.length > 0) {
                const OUTER_GRP = OUTER_GROUPS.shift();

                for (let i = 0; i < INNER_GROUPS.length; i++) {
                    const INNER_GRP = INNER_GROUPS[i];

                    if (!keyEqualityComparer(OUTER_GRP.key, INNER_GRP.key)) {
                        continue;
                    }

                    for (let j = 0; j < OUTER_GRP.values.length; j++) {
                        for (let k = 0; k < INNER_GRP.values.length; k++) {
                            yield resultSelector(OUTER_GRP.values[j],
                                                 INNER_GRP.values[k]);
                        }
                    }
                }
            }
        }
        /** @inheritdoc */
        public joinToString(separator?: any): string {
            return this.toArray()
                       .join( toStringSafe(separator) );
        }
        /** @inheritdoc */
        public last(predicate?: Predicate<T>): T {
            predicate = toPredicateSafe(predicate);

            const ELEMENT_NOT_FOUND = Symbol('ELEMENT_NOT_FOUND');

            const RESULT = this.lastOrDefault(predicate, ELEMENT_NOT_FOUND);

            if (ELEMENT_NOT_FOUND === RESULT) {
                throw 'Element not found';
            }

            return <any>RESULT;
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
        public lastOrDefault<U = symbol>(predicateOrDefaultValue?: Predicate<T> | T,
                                         defaultValue?: U): T | U {
            const ARGS = getOrDefaultArguments(predicateOrDefaultValue, defaultValue,
                                               arguments.length);

            const ELEMENT_NOT_FOUND = Symbol('ELEMENT_NOT_FOUND');

            let result: any = ELEMENT_NOT_FOUND;

            for (let item of this) {
                if (ARGS.predicate(item)) {
                    result = item;
                }
            }

            if (ELEMENT_NOT_FOUND !== result) {
                return result;
            }

            return ARGS.defaultValue;
        }
        /** @inheritdoc */
        public length(): number {
            return this.count();
        }
        /** @inheritdoc */
        public log(base?: number, handleAsInt?: boolean): IEnumerable<number> {
            let logFunc: (n: number) => number;

            base = parseFloat( toStringSafe(base).trim() );
            if (isNaN(base)) {
                logFunc = a => Math.log(a);
            }
            else {
                logFunc = a => Math.log(a) / 
                               Math.log(base);
            }

            return this.select(x => {
                return invokeForValidNumber(x,
                                            y => logFunc(y),
                                            handleAsInt);
            });
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
                          comparer?: Comparer<U>): T | symbol {
            if (!valueSelector) {
                valueSelector = (i) => <any>i;
            }
            
            comparer = toComparerSafe(comparer);

            let result: any = IS_EMPTY;
            let maxValue: U;

            let isFirst = true;
            for (let item of this) {
                const VALUE = valueSelector(item);

                const UPDATE_RESULT = () => {
                    result = item;
                    maxValue = VALUE;
                };

                if (!isFirst) {
                    if (comparer(VALUE, maxValue) > 0) {
                        UPDATE_RESULT();
                    }
                }
                else {
                    isFirst = false;

                    UPDATE_RESULT();
                }
            }

            return result;
        }
        /** @inheritdoc */
        public min<U = T>(valueSelector?: Selector<T, U>,
                          comparer?: Comparer<U>): T | symbol {
            if (!valueSelector) {
                valueSelector = (i) => <any>i;
            }
            
            comparer = toComparerSafe(comparer);

            let result: any = IS_EMPTY;
            let minValue: U;

            let isFirst = true;
            for (let item of this) {
                const VALUE = valueSelector(item);

                const UPDATE_RESULT = () => {
                    result = item;
                    minValue = VALUE;
                };

                if (!isFirst) {
                    if (comparer(VALUE, minValue) < 0) {
                        UPDATE_RESULT();
                    }
                }
                else {
                    isFirst = false;

                    UPDATE_RESULT();
                }
            }

            return result;
        }
        /** @inheritdoc */
        public abstract next(value?: any): IteratorResult<T>;
        /** @inheritdoc */
        public noNAN(checkForInt?: boolean): IEnumerable<T> {
            return this.where(x => {
                const STR = toStringSafe(x).trim();

                return !isNaN(
                    !checkForInt ? parseFloat(STR) : parseInt(STR)
                );
            });
        }
        /** @inheritdoc */
        public not(predicate?: Predicate<T>): IEnumerable<T> {
            let predicateToUse: Predicate<T>;
            if (arguments.length < 1) {
                predicateToUse = (x) => !x;
            }
            else {
                predicate = toPredicateSafe(predicate);

                predicateToUse = (x) => !predicate(x);
            }

            return this.where(x => predicateToUse(x));
        }
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
        public pipe(action: EachAction<T>): IEnumerable<T> {
            return from( this.pipeInner(action) );
        }
        /**
         * @see pipe()
         */
        protected *pipeInner(action: EachAction<T>): Iterator<T> {
            let i = -1;
            for (let item of this) {
                ++i;

                if (action) {
                    action(item, i);
                }

                yield item;
            }
        }
        /** @inheritdoc */
        public pow(exponent?: number, handleAsInt?: boolean): IEnumerable<number> {
            exponent = parseFloat(
                toStringSafe(exponent).trim()
            );
            if (isNaN(exponent)) {
                exponent = 2;
            }

            return this.select((x: any) => {
                return invokeForValidNumber(x,
                                            y => Math.pow(y, exponent),
                                            handleAsInt);
            });
        }
        /** @inheritdoc */
        public prepend<U = T>(...args: Sequence<U>[]): IEnumerable<T | U> {
            return this.prependArray(args);
        }
        /** @inheritdoc */
        public prependArray<U = T>(sequences: ArrayLike<Sequence<U>>): IEnumerable<T | U> {
            return from(this.prependArrayInner(sequences));
        }
        /**
         * @see concatArray()
         */
        protected *prependArrayInner<U>(sequences: ArrayLike<Sequence<U>>): IterableIterator<T | U> {
            if (sequences) {
                for (let i = 0; i < sequences.length; i++) {
                    const SEQ = sequences[i];

                    for (let item of from(SEQ)) {
                        yield item;
                    }
                }
            }

            for (let item of this) {
                yield item;
            }
        }
        /** @inheritdoc */
        public product(): T | symbol {
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
        public rand(sortValueProvider?: () => any) {
            if (!sortValueProvider) {
                sortValueProvider = () => Math.random();
            }

            return this.orderBy(x => {
                return sortValueProvider();
            });
        }
        /** @inheritdoc */
        public reset(): this {
            throw 'Not supported';
        }
        /** @inheritdoc */
        public reverse(): IOrderedEnumerable<T> {
            let i = Number.MIN_SAFE_INTEGER;
            
            return this.orderByDescending(() => {
                return i++;
            });
        }
        /** @inheritdoc */
        public root(power?: number, handleAsInt?: boolean): IEnumerable<number> {
            power = parseFloat( toStringSafe(power).trim() );
            if (isNaN(power)) {
                power = 2;
            }

            return this.select(x => {
                return invokeForValidNumber(x,
                                            y => Math.pow(y, 1 / power),
                                            handleAsInt);
            });
        }
        /** @inheritdoc */
        public round(): IEnumerable<number> {
            return this.select((x: any) => {
                return invokeForValidNumber(x,
                                            y => Math.round(y));
            });
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
                const SEQ = from(selector(s));

                for (let item of SEQ) {
                    yield item;
                }
            }
        }
        /** @inheritdoc */
        public sequenceEqual<U>(other: Sequence<U>,
                                equalityComparer?: EqualityComparer<T, U> | true): boolean {
            const OTHER_SEQ = from(other);
            equalityComparer = toEqualityComparerSafe(equalityComparer);

            do {
                const X = getNextIteratorResultSafe(this);
                if (X.done) {
                    break;
                }

                const Y = getNextIteratorResultSafe(OTHER_SEQ);
                if (Y.done) {
                    return false;
                }

                if (!equalityComparer(X.value, Y.value)) {
                    return false;
                }
            }
            while (true);

            if (!getNextIteratorResultSafe(OTHER_SEQ).done) {
                return false;
            }
            
            return true;
        }
        /** @inheritdoc */
        public shuffle(sortValueProvider?: () => any) {
            return this.rand
                       .apply(this, arguments);
        }
        /** @inheritdoc */
        public sin(handleAsInt?: boolean): IEnumerable<number> {
            return this.select(x => invokeForValidNumber(x,
                                                         y => Math.sin(y),
                                                         handleAsInt));
        }
        /** @inheritdoc */
        public single(predicate?: Predicate<T>): T {
            predicate = toPredicateSafe(predicate);

            const ELEMENT_NOT_FOUND = Symbol('ELEMENT_NOT_FOUND');

            const ITEM = this.singleOrDefault(predicate,
                                              ELEMENT_NOT_FOUND);

            if (ELEMENT_NOT_FOUND === ITEM) {
                throw 'Element not found';
            }

            return <any>ITEM;
        }
        /** @inheritdoc */
        public singleOrDefault<U = symbol>(predicateOrDefaultValue?: Predicate<T> | T,
                                           defaultValue?: U): T | U {
            const ARGS = getOrDefaultArguments(predicateOrDefaultValue, defaultValue,
                                               arguments.length);

            const ELEMENT_NOT_FOUND = Symbol('ELEMENT_NOT_FOUND');

            let result: any = ELEMENT_NOT_FOUND;

            for (let item of this) {
                if (!ARGS.predicate(item)) {
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

            return ARGS.defaultValue;
        }
        /** @inheritdoc */
        public sinH(handleAsInt?: boolean): IEnumerable<number> {
            return this.select(x => invokeForValidNumber(x,
                                                         y => Math.sinh(y),
                                                         handleAsInt));
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
                const ITERATOR_ITEM = this.next();

                hasRemainingItems = ITERATOR_ITEM && !ITERATOR_ITEM.done;
                if (!hasRemainingItems) {
                    continue;
                }

                if (!isFirst) {
                    yield item;
                }
                else {
                    isFirst = false;
                }

                item = ITERATOR_ITEM.value;
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
        public sqrt(handleAsInt?: boolean): IEnumerable<number> {
            return this.select(x => invokeForValidNumber(x,
                                                         y => Math.sqrt(y),
                                                         handleAsInt));
        }
        /** @inheritdoc */
        public sum(): T | symbol {
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
        public tan(handleAsInt?: boolean): IEnumerable<number> {
            return this.select(x => invokeForValidNumber(x,
                                                         y => Math.tan(y),
                                                         handleAsInt));
        }
        /** @inheritdoc */
        public tanH(handleAsInt?: boolean): IEnumerable<number> {
            return this.select(x => invokeForValidNumber(x,
                                                         y => Math.tanh(y),
                                                         handleAsInt));
        }
        /** @inheritdoc */
        public toArray(): Array<T> {
            const ARR: Array<T> = [];

            for (let i of this) {
                ARR.push(i);
            }

            return ARR;
        }
        /** @inheritdoc */
        public toLookup<TKey extends PropertyKey, U = any>(keySelector: Selector<T, TKey>,
                                                           keyEqualityComparer?: EqualityComparer<TKey>): U {
            const LOOKUP: any = {};

            for (let grp of this.groupBy(keySelector, keyEqualityComparer)) {
                LOOKUP[ grp.key ] = grp;
            }

            return LOOKUP;
        }
        /** @inheritdoc */
        public toObject<TResult = any, TKey extends PropertyKey = number>(keySelector?: (item: T, index: number) => TKey): TResult {
            if (!keySelector) {
                keySelector = (item, index) => <any>index;
            }
            
            const OBJ: any = {};
            
            let i = -1;
            for (let item of this) {
                ++i;

                OBJ[ keySelector(item, i) ] = item;
            }

            return OBJ;
        }
        /** @inheritdoc */
        public trace(formatter?: Selector<T, any>): IEnumerable<T> {
            if (!formatter) {
                formatter = (item) => {
                    if (isNullOrUndefined(item)) {
                        return item;
                    }

                    return '' + item;
                };
            }

            return this.pipe(x => {
                console.trace(
                    formatter(x)
                );
            });
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
        public zip<U = T, TResult = any>(second: Sequence<U>,
                                         resultSelector: ZipSelector<T, U, TResult>): IEnumerable<TResult> {
            if (!resultSelector) {
                resultSelector = (x: any, y: any) => x + y;
            }

            return from(this.zipInner(from(second),
                                      resultSelector));
        }

        /**
         * @see zip()
         */
        protected *zipInner<U, TResult>(second: Iterator<U>,
                                        resultSelector: ZipSelector<T, U, TResult>) {
            let i = -1;
            do
            {
                const ITEM_THIS = getNextIteratorResultSafe(this);
                if (ITEM_THIS.done) {
                    break;
                }

                const ITEM_SECOND = getNextIteratorResultSafe(second);
                if (ITEM_SECOND.done) {
                    break;
                }

                yield resultSelector(ITEM_THIS.value, ITEM_SECOND.value,
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
    export class EnumerableWrapper<T = any> extends EnumerableBase<T> {
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
    export class IteratorEnumerable<T = any> extends EnumerableBase<T> {
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
    export class ArrayEnumerable<T = any> extends EnumerableBase<T> {
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
        public length(): number {
            return this._array.length;
        }
        /** @inheritdoc */
        public next(): IteratorResult<T> {
            let result: IteratorResult<T>;

            const NEXT_INDEX = this._index + 1;
            if (NEXT_INDEX >= this._array.length) {
                result = {
                    done: true,
                    value: undefined,
                };
            }
            else {
                this._index = NEXT_INDEX;
                
                result = {
                    done: false,
                    value: this._array[NEXT_INDEX],
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
    export class Grouping<TKey = any, T = any> extends EnumerableWrapper<T> implements IGrouping<TKey, T> {
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
    export class OrderedEnumerable<T = any, U = T> extends EnumerableWrapper<T> implements IOrderedEnumerable<T> {
        /**
         * Stores the items in the original order.
         */
        protected _originalItems: Array<T>;
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

            const ME = this;

            this._orderComparer = toComparerSafe(comparer);
            
            if (!selector) {
                selector = (i) => <any>i;
            }
            this._orderSelector = selector;

            this._originalItems = seq.toArray();

            this._sequence = from(this._originalItems.map(x => {
                return {
                    sortBy: ME.selector(x),
                    value: x,
                };
            }).sort(function(x, y) {
                return ME.comparer(x.sortBy, y.sortBy);
            }).map(function(x) {
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
        
            const THIS_SELECTOR = this.selector;
            const THIS_COMPARER = this.comparer;
        
            return from(this._originalItems)
                .orderBy(x => {
                            return {
                                level_0: THIS_SELECTOR(x),
                                level_1: selector(x),
                            };
                         },
                         (x, y) => {
                             const COMP_0 = THIS_COMPARER(x.level_0, y.level_0);
                             if (0 != COMP_0) {
                                 return COMP_0;
                             }
                            
                             const COMP_1 = comparer(x.level_1, y.level_1);
                             if (0 != COMP_1) {
                                 return COMP_1;
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
                               (x, y) => comparer(y, x));
        }
        /** @inheritdoc */
        public thenDescending(comparer?: Comparer<T>): IOrderedEnumerable<T> {
            return this.thenByDescending(x => x,
                                         comparer);
        }
    }  // OrderedEnumerable<T, U = T>


    /**
     * Keeps sure that a value is a sequence.
     * 
     * @param {any} val The value to cast (if needed).
     * 
     * @return {IEnumerable<T>} The value as sequence. Can return (null) or (undefined), if 'val' is one of these values.
     */
    export function asEnumerable<T = any>(val: any): IEnumerable<T> {
        if (isNullOrUndefined(val)) {
            return val;
        }

        if (isEnumerable(val)) {
            return val;
        }

        return from<T>(val);
    }

    /**
     * Returns a value as function.
     * 
     * @param {any} val The function or a value that can be converted to a lambda expression string. 
     * @param {boolean} throwException Throw an exception on parse errors or return (false).
     * 
     * @return {T} 'val' as function or (false) on error, if 'throwException' is (false).
     *             Can be (null) or (undefined) if 'val' has a same value or is an empty string (representation).
     */
    export function asFunc<T extends Function = Function>(val: any, throwException: boolean = true): T | false {
        if ('function' === typeof val) {
            return val;
        }

        if (isNullOrUndefined(val)) {
            return val;
        }

        const LAMBDA = toStringSafe(val);
        if ('' === LAMBDA.trim()) {
            return undefined;
        }

        const MATCHES = LAMBDA.match(/^(\s*)([\(]?)([^\)]*)([\)]?)(\s*)(=>)/m);
        if (MATCHES) {
            if ((("" === MATCHES[2]) && ("" !== MATCHES[4])) ||
                (("" !== MATCHES[2]) && ("" === MATCHES[4]))) {
                
                if (throwException) {
                    throw "Syntax error in '" + LAMBDA + "' expression";
                }
                
                return false;
            }
            
            let lambdaBody = LAMBDA.substr(MATCHES[0].length)
                                   .trim();
            
            if ("" !== lambdaBody) {
                if (';' !== lambdaBody.substr(-1)) {
                    lambdaBody = 'return ' + lambdaBody + ';';
                }
            }
            
            let func: T;
            eval('func = function(' + MATCHES[3] + ') { ' + lambdaBody + ' };');
    
            return func;
        }

        if (throwException) {
            throw "'" + val + "' is no valid lambda expression";
        }

        return false;
    }

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
    export function build<T = any>(factory: CancelableFactory<T>,
                             count?: number): IEnumerable<T> {
        count = parseInt(toStringSafe(count).trim());

        return from(buildInner(factory, count));
    }  // build<T>()

    function *buildInner<T = any>(factory: CancelableFactory<T>,
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

            const CANCEL = function(flag?: boolean) {
                if (arguments.length < 1) {
                    flag = true;
                }

                run = !flag;
            };

            const NEW_ITEM = factory(CANCEL, i);
            if (run) {
                yield NEW_ITEM;
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
    export function buildMany<T = any>(factory: CancelableFactory<Sequence<T>>,
                                 count?: number): IEnumerable<T> {
        count = parseInt(toStringSafe(count).trim());

        return from(buildManyInner(factory, count));
    }  // buildMany<T>()

    function *buildManyInner<T = any>(factory: CancelableFactory<Sequence<T>>,
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

            const CANCEL = function(flag?: boolean) {
                if (arguments.length < 1) {
                    flag = true;
                }

                run = !flag;
            };

            const SEQ: any = factory(CANCEL, i);
            if (run) {
                if (!isNullOrUndefined(SEQ)) {
                    for (let item of SEQ) {
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
     * @param {...Array<T>} items The items for the sequence. 
     * 
     * @returns {IEnumerable<T>} The new sequence.
     */
    export function create<T = any>(...items: Array<T>): IEnumerable<T> {
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
    export function from<T = any>(seq?: Sequence<T>): IEnumerable<T> {
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
        return new ArrayEnumerable<string>(
            toStringSafe(val).split('')
        );
    }  // fromString()

    function invokeForValidNumber(x: any, action: (n: number) => any,
                                  handleAsInt = false) {
        if ('number' !== typeof x) {
            if (!handleAsInt) {
                x = parseFloat( toStringSafe(x).trim() );
            }
            else {
                x = parseInt( toStringSafe(x).trim() );
            }
        }

        if (!isNaN(x)) {
            if (action) {
                x = action(x);
            }
        }

        return x;
    }  // invokeForNumber()

    /**
     * Checks if a value represents the IS_EMPTY symbol.
     * 
     * @param {any} val The value to check.
     * 
     * @returns {boolean} Is IS_EMPTY symbol or not.
     */
    export function isEmpty(val: any): val is symbol {
        return IS_EMPTY === val;
    }  // isEmpty()

    /**
     * Checks if a value represents an enumerable (sequence).
     * 
     * @param {any} val The value to check.
     * 
     * @returns {boolean} Is enumerable (sequence) or not.
     */
    export function isEnumerable<T = any>(val: any): val is IEnumerable<T> {
        if (!isNullOrUndefined(val)) {
            return val['IS_ENUMERABLE'] === IS_ENUMERABLE;
        }

        return false;
    }  // isEnumerable()

    /**
     * Checks if a sequence is (null) or empty.
     * 
     * @param {IEnumerable<T>} seq The sequence to check.
     * 
     * @return {boolean} Is (null) or empty.
     */
    export function isNullOrEmpty<T = any>(seq: IEnumerable<T>): seq is (null | IEnumerable<T>) {
        return null === seq ||
               ('undefined' !== typeof seq && seq.isEmpty());
    }  // isNullOrEmpty<T>()

    /**
     * Checks if a value can be used as enumerable (sequence).
     * 
     * @param {any} val The value to check.
     * 
     * @return {boolean} Is sequence or not. 
     */
    export function isSequence<T = any>(val: any): val is Sequence<T> {
        if (!isNullOrUndefined(val)) {
            if ('function' === typeof val[Symbol.iterator]) {
                // Iterator<T>
                return true;
            }

            if (Array.isArray(val)) {
                return true;
            }

            if ('string' === typeof val) {
                return true;
            }
        }

        return false;
    }  // isSequence()

    /**
     * Checks if a sequence is (undefined) / (null) or empty.
     * 
     * @param {IEnumerable<T>} seq The sequence to check.
     * 
     * @return {boolean} Is (undefined), (null) or empty.
     */
    export function isUndefinedNullOrEmpty<T = any>(seq: IEnumerable<T>): seq is (undefined | null | IEnumerable<T>) {
        return 'undefined' === typeof seq ||
               null === seq ||
               seq.isEmpty();
    }  // isUndefinedNullOrEmpty<T>()

    /**
     * Checks if a sequence is (undefined) or empty.
     * 
     * @param {IEnumerable<T>} seq The sequence to check.
     * 
     * @return {boolean} Is (undefined) or empty.
     */
    export function isUndefinedOrEmpty<T = any>(seq: IEnumerable<T>): seq is (undefined | IEnumerable<T>) {
        return 'undefined' === typeof seq ||
               (null !== seq && seq.isEmpty());
    }  // isUndefinedOrEmpty<T>()

    /**
     * Checks if a value represents the NOT_FOUND symbol.
     * 
     * @param {any} val The value to check.
     * 
     * @returns {boolean} Is NOT_FOUND symbol or not.
     */
    export function notFound(val: any): val is symbol {
        return NOT_FOUND === val;
    }  // notFound()

    /**
     * Creates a sequence from a stack by popping its elements.
     * 
     * @param {PoppableStack<T>} stack The stack from where to pop.
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    export function popFrom<T = any>(stack: PoppableStack<T>): IEnumerable<T> {
        return from(
            popFromInner(stack)
        );
    }  // popFrom()

    function *popFromInner<T = any>(stack: PoppableStack<T>) {
        if (stack) {
            while (stack.length > 0) {
                yield stack.pop();
            }
        }
    }

    /**
     * Returns a sequence of random numbers.
     * 
     * @param {number} [count] The maximum number of items.
     *                         If not defined, the sequence will become infinitely.
     * @param {(randomValue: number, index: number) => number} [valueProvider] A custom function for providing a random number.
     * 
     * @return {IEnumerable<number>} The sequence of random numbers.
     */
    export function random(count?: number,
                           valueProvider?: (randomValue: number, index: number) => number): IEnumerable<number> {
        if (!valueProvider) {
            valueProvider = (randVal) => randVal;
        }
        
        return build((cancel, index) => valueProvider(Math.random(),
                                                      index), 
                     count);
    }

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
    export function repeat<T = any>(item: T, count?: number): IEnumerable<T> {
        count = parseInt(toStringSafe(count).trim());

        return from(repeatInner(item, count));
    }  // repeat<T>()

    function *repeatInner<T = any>(item: T, count: number) {
        while (true) {
            if (!isNaN(count)) {
                if (count-- < 1) {
                    break;
                }
            }

            yield item;
        }
    }

    /**
     * Creates a sequence from a stack by shifting its elements.
     * 
     * @param {PoppableStack<T>} stack The stack from where to shift.
     * 
     * @return {IEnumerable<T>} The new sequence.
     */
    export function shiftFrom<T = any>(stack: ShiftableStack<T>): IEnumerable<T> {
        return from(
            shiftFromInner(stack)
        );
    }  // shiftFrom()

    function *shiftFromInner<T = any>(stack: ShiftableStack<T>) {
        if (stack) {
            while (stack.length > 0) {
                yield stack.shift();
            }
        }
    }

    /**
     * Returns a sorted sequence.
     * 
     * @template T Type of the items.
     * @template U Type of the keys.
     * 
     * @param {Sequence<T>} items The items to sort. 
     * @param {Selector<T,U>} [selector] The selector for the keys. 
     * @param {Comparer<U>} [comparer] The custom comparer for the keys.
     * 
     * @return {IOrderedEnumerable<T>} The sorted sequence.
     */
    export function sort<T = any, U = T>(items: Sequence<T>, selector?: Selector<T, U>, comparer?: Comparer<U>): IOrderedEnumerable<T> {
        if (!selector) {
            return from(items).order(<any>comparer);
        }

        return from(items).orderBy(selector, comparer);
    }

    /**
     * Returns a sorted sequence (descending).
     * 
     * @template T Type of the items.
     * @template U Type of the keys.
     * 
     * @param {Sequence<T>} items The items to sort. 
     * @param {Selector<T,U>} [selector] The selector for the keys. 
     * @param {Comparer<U>} [comparer] The custom comparer for the keys.
     * 
     * @return {IOrderedEnumerable<T>} The sorted sequence.
     */
    export function sortDesc<T = any, U = T>(items: Sequence<T>, selector?: Selector<T, U>, comparer?: Comparer<U>): IOrderedEnumerable<T> {
        if (!selector) {
            return from(items).orderDescending(<any>comparer);
        }

        return from(items).orderByDescending(selector, comparer);
    }


    function createGroupArrayForSequence<T = any, TKey = any>(seq: IEnumerable<T>,
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

    function getOrDefaultArguments<T = any, U = T>(predicateOrDefaultValue: Predicate<T> | T, defaultValue: U,
                                         paramCount: number) {
        let predicate: Predicate<T>;
        let defVal: any;

        if (paramCount < 1) {
            defVal = NOT_FOUND;
        }
        else if (paramCount < 2) {
            if ('function' === typeof predicateOrDefaultValue) {
                predicate = <Predicate<T>>predicateOrDefaultValue;
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

    function getNextIteratorResultSafe<T = any>(iterator: Iterator<T>, defaultValue?: any): IteratorResult<T> {
        const RESULT = iterator.next();

        return RESULT || {
            done: true,
            value: defaultValue,
        };
    }

    function isNullOrUndefined(val: any): boolean {
        return null === val ||
               'undefined' === typeof val;
    }

    function toComparerSafe<T = any, U = T>(comparer: Comparer<T, U>): Comparer<T, U> {
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

    function toEqualityComparerSafe<T = any, U = T>(comparer: EqualityComparer<T, U> | true): EqualityComparer<T, U> {
        if (!comparer) {
            comparer = (x: any, y: any) => x == y; 
        }
        else if (true === comparer) {
            comparer = (x: any, y: any) => x === y;
        }

        return comparer;
    }

    function toItemMessageSafe<T = any>(msgOrProvider: ItemMessage<T>): (item: T, index: number) => string {
        if (isNullOrUndefined(msgOrProvider)) {
            msgOrProvider = (item, index) => `Condition failed at index ${index}`;
        }

        if ('function' !== typeof msgOrProvider) {
            const MSG = msgOrProvider;

            msgOrProvider = () => MSG;
        }

        return (item, index) => {
            return toStringSafe(
                (<Function>msgOrProvider)(item, index)
            );
        };
    }

    function toPredicateSafe<T = any>(predicate: Predicate<T> | boolean, defaultValue = true): Predicate<T> {
        if (isNullOrUndefined(predicate)) {
            predicate = () => !!defaultValue;
        }

        if ('function' !== typeof predicate) {
            const RESULT = !!predicate;
            
            predicate = () => RESULT;
        }

        return predicate;
    }

    function toStringSafe(val: any): string {
        if ('string' === typeof val) {
            return val;
        }

        if (isNullOrUndefined(val)) {
            val = '';
        }

        return '' + val;
    }
}

export = Enumerable;
