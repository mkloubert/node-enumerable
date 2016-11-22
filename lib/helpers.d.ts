import Enumerable = require('./index');
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
export declare function toComparerSafe<T>(val?: any, obj?: any): Enumerable.Comparer<T>;
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
export declare function asFunc(v: any, throwException?: boolean): Function | boolean;
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
export declare function toEqualityComparerSafe<T>(val?: any, obj?: any): Enumerable.EqualityComparer<T>;
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
export declare function toManySelectorSafe<T, U>(val?: any, obj?: any): Enumerable.ManySelector<T, U>;
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
export declare function toPredicateSafe<T>(val?: any, obj?: any): Enumerable.Predciate<T>;
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
export declare function toSelectorSafe<T, U>(val?: any, obj?: any): Enumerable.Selector<T, U>;
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
export declare function toZipperSafe<T, U, V>(val?: any, obj?: any): Enumerable.Zipper<T, U, V>;
