(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
"use strict";
class ItemContext {
    constructor(seq, index, previousValue) {
        this.cancel = false;
        this._sequence = seq;
        this._index = index;
        this._previousValue = previousValue;
    }
    get index() {
        return this._index;
    }
    get isFirst() {
        return 0 === this._index;
    }
    get item() {
        return this._sequence.current;
    }
    get key() {
        return this._sequence.itemKey;
    }
    get previousValue() {
        return this._previousValue;
    }
    get sequence() {
        return this._sequence;
    }
}
function isArrayLike(val) {
    return Array.isArray(val) ||
        (!!val &&
            typeof val === "object" &&
            val.hasOwnProperty("length") &&
            typeof val.length === "number");
}
function* makeIterable(val) {
    if (val) {
        if (isArrayLike(val)) {
            let arr = val;
            for (let i = 0; i < arr.length; i++) {
                yield arr[i];
            }
        }
        else {
            return val;
        }
    }
}
function toNumber(val) {
    if ('number' === typeof val) {
        return val;
    }
    if (val) {
        return parseFloat(('' + val).trim());
    }
    return 0;
}
;
/**
 * A basic sequence.
 */
class Enumerable {
    /**
     * Initializes a new instance of that class.
     *
     * @param {Iterator<T>} [iterator] The underyling iterator.
     */
    constructor(iterator) {
        /**
         * The current zero based index.
         */
        this._index = -1;
        this._iterator = iterator || makeIterable();
    }
    /** @inheritdoc */
    aggregate(aggregator, defaultValue) {
        let a = asFunc(aggregator);
        if (!a) {
            a = (result, item) => result = result + item;
        }
        let result = defaultValue;
        let index = -1;
        let prevVal;
        let value;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
            ctx.value = value;
            let currentResult;
            if (0 !== index) {
                currentResult = a(result, ctx.item, ctx);
            }
            else {
                currentResult = ctx.item;
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
    all(predicate) {
        let p = toPredicateSafe(predicate);
        let index = -1;
        let prevVal;
        let value;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
            ctx.value = value;
            let doesMatch = p(ctx.item, ctx);
            if (ctx.cancel) {
                break;
            }
            if (!doesMatch) {
                return false; // at least one does NOT match
            }
            prevVal = ctx.nextValue;
            value = ctx.value;
        }
        return true;
    }
    /** @inheritdoc */
    any(predicate) {
        let p = toPredicateSafe(predicate);
        let index = -1;
        let prevVal;
        let value;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
            ctx.value = value;
            let doesMatch = p(ctx.item, ctx);
            if (ctx.cancel) {
                break;
            }
            if (doesMatch) {
                return true; // at least one does NOT match
            }
            prevVal = ctx.nextValue;
            value = ctx.value;
        }
        return false;
    }
    /** @inheritdoc */
    asResettable() {
        return from(this.toArray());
    }
    /** @inheritdoc */
    average(defaultValue) {
        let cnt = 1;
        let sum = this.aggregate((result, item, ctx) => {
            let x = toNumber(result);
            let y = toNumber(item);
            cnt = ctx.index + 1;
            return x + y;
        }, false);
        if (false !== sum) {
            return sum / cnt;
        }
        return defaultValue;
    }
    /** @inheritdoc */
    get canReset() {
        return false;
    }
    /** @inheritdoc */
    cast() {
        return this.select(x => x);
    }
    /** @inheritdoc */
    concat(other) {
        let i = makeIterable(other);
        return from(this.concatInner(i));
    }
    /**
     * The logic for the 'concat()' method.
     *
     * @param {Iterator<T>} other The other sequence.
     *
     * @return {Iterator<T>} The iterator.
     */
    *concatInner(other) {
        // first the items of THAT sequence
        while (this.moveNext()) {
            yield this.current;
        }
        // now the other ones
        let result;
        do {
            result = other.next();
            if (!result || result.done) {
                break;
            }
            yield result.value;
        } while (true);
    }
    /** @inheritdoc */
    concatToString(defaultValue) {
        if (arguments.length < 1) {
            return this.joinToString('');
        }
        return this.joinToString('', defaultValue);
    }
    /** @inheritdoc */
    contains(item, comparer) {
        let equalityComparer = toEqualityComparerSafe(comparer);
        return this.any(x => equalityComparer(x, item));
    }
    /** @inheritdoc */
    count(predicate) {
        let p = toPredicateSafe(predicate);
        let cnt = 0;
        let index = -1;
        let prevVal;
        let value;
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
    get current() {
        return this._current.value;
    }
    /** @inheritdoc */
    defaultIfEmpty(...args) {
        return from(this.defaultIfEmptyInner(args));
    }
    /**
     * The logic for the 'defaultIfEmpty()' method.
     *
     * @param {T[]} args The arguments for the "default" sequence.
     *
     * @return {Iterator<T>} The iterator.
     */
    *defaultIfEmptyInner(args) {
        if (this.moveNext()) {
            do {
                yield this.current;
            } while (this.moveNext());
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
    distinct(comparer) {
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
    *distinctInner(comparer) {
        let ec = toEqualityComparerSafe(comparer);
        let temp = [];
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
    each(action) {
        if (!action) {
            action = () => { };
        }
        let index = -1;
        let prevVal;
        let value;
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
    elementAt(index) {
        index = toNumber(index);
        if (index < 0) {
            throw `Index out of range: ${index}`;
        }
        return this.first((item, ctx) => {
            return 0 === index--;
        });
    }
    /** @inheritdoc */
    elementAtOrDefault(index, defaultValue) {
        index = toNumber(index);
        if (index < 0) {
            throw `Index out of range: ${index}`;
        }
        return this.firstOrDefault((item, ctx) => {
            return 0 === index--;
        }, defaultValue);
    }
    /** @inheritdoc */
    except(other, comparer) {
        let equalityComparer = toEqualityComparerSafe(comparer);
        let itemsToExcept = from(makeIterable(other)).distinct()
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
    *exceptInner(itemsToExcept, equalityComparer) {
        while (this.moveNext()) {
            let item = this.current;
            // check if item has to be excepted
            let found = false;
            for (let i = 0; i < itemsToExcept.length; i++) {
                if (equalityComparer(item, itemsToExcept[i])) {
                    found = true; // yepp
                    break;
                }
            }
            if (!found) {
                yield item;
            }
        }
    }
    /** @inheritdoc */
    first(predicate) {
        let p = toPredicateSafe(predicate);
        let result;
        let found = false;
        let index = -1;
        let prevVal;
        let value;
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
    firstOrDefault(predicateOrDefaultValue, defaultValue) {
        let args = toOrDefaultArgs(predicateOrDefaultValue, defaultValue, arguments.length);
        let result;
        let found = false;
        let index = -1;
        let prevVal;
        let value;
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
    forEach(action) {
        this.each(action);
    }
    /** @inheritdoc */
    groupBy(keySelector, keyEqualityComparer) {
        let ks = toSelectorSafe(keySelector);
        let ksec = toEqualityComparerSafe(keyEqualityComparer);
        let groupings = [];
        let index = -1;
        let prevVal;
        let value;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
            ctx.value = value;
            let key = ks(ctx.item, ctx);
            if (ctx.cancel) {
                break;
            }
            // find existing group
            let grp;
            for (let i = 0; i < groupings.length; i++) {
                let g = groupings[i];
                if (ksec(key, g.key)) {
                    grp = g; // found
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
        return from(groupings).select(x => new Grouping(x.key, from(x.items)));
    }
    /** @inheritdoc */
    groupJoin(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        let i = from(inner);
        let oks = toSelectorSafe(outerKeySelector);
        let iks = toSelectorSafe(innerKeySelector);
        let rs = asFunc(resultSelector);
        let c = toEqualityComparerSafe(comparer);
        return from(this.groupJoinInner(i, oks, iks, rs, c));
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
    *groupJoinInner(inner, outerKeySelector, innerKeySelector, resultSelector, keyEqualityComparer) {
        let createGroupsForSequence = function (seq, keySelector) {
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
        let prevValIG;
        let prevValOG;
        let valueIG;
        let valueOG;
        while (outerGroups.moveNext()) {
            let og = outerGroups.current;
            let ogValues = og.values;
            ogValues.reset();
            innerGroups.reset();
            let matchingInnerGroups = innerGroups.where(ig => keyEqualityComparer(og.key, ig.key))
                .select(ig => new Grouping(ig.key, ig.values));
            while (ogValues.moveNext()) {
                ++ogIndex;
                let igIndex = -1;
                while (matchingInnerGroups.moveNext()) {
                    ++igIndex;
                    let ctxOG = new ItemContext(ogValues, ogIndex, prevValOG);
                    ctxOG.value = valueOG;
                    let ctxIG = new ItemContext(matchingInnerGroups, igIndex, prevValIG);
                    ctxIG.item.reset();
                    ctxIG.value = valueIG;
                    let joinedItem = resultSelector(ctxOG.item, ctxIG.item, ctxOG, ctxIG);
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
    intersect(other, comparer) {
        let equalityComparer = toEqualityComparerSafe(comparer);
        let o = from(makeIterable(other)).distinct();
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
    *intersectInner(other, equalityComparer) {
        let o = [];
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
    get isValid() {
        return !this._current ||
            !this._current.done;
    }
    /** @inheritdoc */
    get itemKey() {
        return this._index;
    }
    /** @inheritdoc */
    [Symbol.iterator]() {
        return this;
    }
    /** @inheritdoc */
    join(inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        let i = from(inner);
        let oks = toSelectorSafe(outerKeySelector);
        let iks = toSelectorSafe(innerKeySelector);
        let rs = asFunc(resultSelector);
        let c = toEqualityComparerSafe(comparer);
        return from(this.joinInner(i, oks, iks, rs, c));
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
    *joinInner(inner, outerKeySelector, innerKeySelector, resultSelector, keyEqualityComparer) {
        let createGroupsForSequence = function (seq, keySelector) {
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
        let prevValIG;
        let prevValOG;
        let valueIG;
        let valueOG;
        while (outerGroups.moveNext()) {
            let og = outerGroups.current;
            let ogValues = from(og.values);
            innerGroups.reset();
            let matchingInnerGroups = innerGroups.where(ig => keyEqualityComparer(og.key, ig.key));
            while (matchingInnerGroups.moveNext()) {
                let ig = matchingInnerGroups.current;
                let igValues = from(ig.values);
                ogValues.reset();
                while (ogValues.moveNext()) {
                    igValues.reset();
                    while (igValues.moveNext()) {
                        ++index;
                        let ctxOG = new ItemContext(ogValues, index, prevValOG);
                        ctxOG.value = valueOG;
                        let ctxIG = new ItemContext(igValues, index, prevValIG);
                        ctxIG.value = valueIG;
                        let joinedItem = resultSelector(ctxOG.item, ctxIG.item, ctxOG, ctxIG);
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
    joinToString(separator, defaultValue) {
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
    last(predicate) {
        let p = toPredicateSafe(predicate);
        let result;
        let found = false;
        let index = -1;
        let prevVal;
        let value;
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
    lastOrDefault(predicateOrDefaultValue, defaultValue) {
        let args = toOrDefaultArgs(predicateOrDefaultValue, defaultValue, arguments.length);
        let result;
        let found = false;
        let index = -1;
        let prevVal;
        let value;
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
    max(defaultValue) {
        return this.aggregate((result, item) => {
            if (item > result) {
                result = item;
            }
            return result;
        }, defaultValue);
    }
    /** @inheritdoc */
    min(defaultValue) {
        return this.aggregate((result, item) => {
            if (item < result) {
                result = item;
            }
            return result;
        }, defaultValue);
    }
    /** @inheritdoc */
    moveNext() {
        if (this._current && this._current.done) {
            return false;
        }
        ++this._index;
        this._current = this._iterator.next();
        return this._current && !this._current.done;
    }
    /** @inheritdoc */
    next() {
        return this._iterator.next();
    }
    /** @inheritdoc */
    notEmpty() {
        return this.where(x => !!x);
    }
    /** @inheritdoc */
    ofType(type) {
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
        return this.where(x => {
            return typeof x === type ||
                !type ||
                eval(evalExpr);
        });
    }
    /** @inheritdoc */
    order(comparer) {
        return this.orderBy(x => x, comparer);
    }
    /** @inheritdoc */
    orderBy(selector, comparer) {
        return new OrderedEnumerable(this, selector, comparer);
    }
    /** @inheritdoc */
    orderByDescending(selector, comparer) {
        let c = toComparerSafe(comparer);
        return this.orderBy(selector, (x, y) => c(y, x));
    }
    /** @inheritdoc */
    orderDescending(comparer) {
        return this.orderByDescending(x => x, comparer);
    }
    /** @inheritdoc */
    pushToArray(arr) {
        while (this.moveNext()) {
            if (arr) {
                arr.push(this.current);
            }
        }
        return this;
    }
    /** @inheritdoc */
    reset() {
        throw "Not supported!";
    }
    /** @inheritdoc */
    reverse() {
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
    select(selector) {
        let s = toSelectorSafe(selector);
        return from(this.selectInner(s));
    }
    /**
     * The logic for the 'select()' method.
     *
     * @param {Selector<T, U>} selector The selector.
     *
     * @return {Iterator<T>} The iterator.
     */
    *selectInner(selector) {
        let index = -1;
        let prevVal;
        let value;
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
    selectMany(selector) {
        let s = toManySelectorSafe(selector);
        return from(this.selectManyInner(s));
    }
    /**
     * The logic for the 'selectMany()' method.
     *
     * @param {ManySelector<T, U>} selector The selector.
     *
     * @return {Iterator<T>} The iterator.
     */
    *selectManyInner(selector) {
        let index = -1;
        let prevVal;
        let value;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
            ctx.value = value;
            let iterator = makeIterable(selector(ctx.item, ctx));
            if (ctx.cancel) {
                break;
            }
            let lastResult;
            do {
                lastResult = iterator.next();
                if (!lastResult || lastResult.done) {
                    break;
                }
                yield lastResult.value;
            } while (true);
            prevVal = ctx.nextValue;
            value = ctx.value;
        }
    }
    /** @inheritdoc */
    sequenceEqual(other, comparer, keyComparer) {
        let ec = toEqualityComparerSafe(comparer);
        let kc = toEqualityComparerSafe(keyComparer);
        let seq = from(makeIterable(other));
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
    single(predicate) {
        let p = toPredicateSafe(predicate);
        let result;
        let found = false;
        let index = -1;
        let prevVal;
        let value;
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
    singleOrDefault(predicateOrDefaultValue, defaultValue) {
        let args = toOrDefaultArgs(predicateOrDefaultValue, defaultValue, arguments.length);
        let result;
        let found = false;
        let index = -1;
        let prevVal;
        let value;
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
    skip(cnt) {
        return this.skipWhile((item, ctx) => ctx.index < cnt);
    }
    /** @inheritdoc */
    skipLast() {
        return from(this.skipLastInner());
    }
    /**
     * The logic for the 'skipLast()' method.
     *
     * @return {Iterator<T>} The iterator.
     */
    *skipLastInner() {
        let hasRemainingItems;
        let isFirst = true;
        let item;
        do {
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
        } while (hasRemainingItems);
    }
    /** @inheritdoc */
    skipWhile(predicate) {
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
    *skipWhileInner(predicate) {
        let index = -1;
        let prevVal;
        let value;
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
    sum(defaultValue) {
        return this.aggregate((result, item) => {
            let x = toNumber(result);
            let y = toNumber(item);
            return x + y;
        }, defaultValue);
    }
    /** @inheritdoc */
    take(cnt) {
        return this.takeWhile((item, ctx) => ctx.index < cnt);
    }
    /** @inheritdoc */
    takeWhile(predicate) {
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
    *takeWhileInner(predicate) {
        let alwaysMatches = false;
        let index = -1;
        let prevVal;
        let value;
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
    toArray(keySelector) {
        if (true === keySelector) {
            keySelector = (key) => parseInt(('' + key).trim());
        }
        let ks = asFunc(keySelector);
        let arr = [];
        let index = -1;
        let prevVal;
        let value;
        while (this.moveNext()) {
            let ctx = new ItemContext(this, ++index, prevVal);
            ctx.value = value;
            let action;
            if (!ks) {
                action = () => arr.push(ctx.item);
            }
            else {
                action = () => {
                    let k = ks(ctx.key, ctx.item, ctx);
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
    toList(isReadOnly, comparer) {
        if (isReadOnly) {
            return new ReadOnlyCollection(this, comparer);
        }
        return new List(this, comparer);
    }
    /** @inheritdoc */
    toLookup(keySelector, keyEqualityComparer) {
        return new Lookup(this.groupBy(keySelector, keyEqualityComparer));
    }
    /** @inheritdoc */
    toSet(comparer) {
        return new HashSet(this, comparer);
    }
    /** @inheritdoc */
    union(other, comparer) {
        return this.concat(other)
            .distinct(comparer);
    }
    /** @inheritdoc */
    where(predicate) {
        return from(this.whereInner(toPredicateSafe(predicate)));
    }
    /**
     * The logic for the 'where()' method.
     *
     * @param {Predciate<T>} predicate The predicate.
     *
     * @return {Iterator<T>} The iterator.
     */
    *whereInner(predicate) {
        let index = -1;
        let prevVal;
        let value;
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
    zip(other, zipper) {
        let seq = from(makeIterable(other));
        let z = toZipperSafe(zipper);
        return from(this.zipInner(seq, z));
    }
    /**
     * The logic for the 'zip()' method.
     *
     * @param {Iterator<T>} other The other sequence.
     * @param {Zipper<T, U>} zipper The "zipper".
     *
     * @return {Iterator<U>} The iterator.
     */
    *zipInner(other, zipper) {
        let index = -1;
        let prevVal1;
        let prevVal2;
        let value1;
        let value2;
        while (this.moveNext() && other.moveNext()) {
            ++index;
            let ctx1 = new ItemContext(this, index, prevVal1);
            ctx1.value = value1;
            let ctx2 = new ItemContext(other, index, prevVal2);
            ctx2.value = value2;
            let zipped = zipper(ctx1.item, ctx2.item, ctx1, ctx2);
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
exports.Enumerable = Enumerable;
/**
 * A wrapper for another sequence.
 */
class WrappedEnumerable extends Enumerable {
    /**
     * Initializes a new instance of that class.
     *
     * @param {IEnumerable<T>} seq The sequence to wrap.
     */
    constructor(seq) {
        super(seq);
    }
    /** @inheritdoc */
    asResettable() {
        if (this.canReset) {
            return this;
        }
        return new WrappedEnumerable(this.sequence.asResettable());
    }
    /** @inheritdoc */
    get canReset() {
        return this.sequence.canReset;
    }
    /** @inheritdoc */
    get current() {
        return this.sequence.current;
    }
    /** @inheritdoc */
    get isValid() {
        return this.sequence.isValid;
    }
    /** @inheritdoc */
    get itemKey() {
        return this.sequence.itemKey;
    }
    /** @inheritdoc */
    moveNext() {
        return this.sequence.moveNext();
    }
    /** @inheritdoc */
    next() {
        return this.sequence.next();
    }
    /** @inheritdoc */
    reset() {
        return this.sequence.reset();
    }
    /**
     * Gets the wrapped sequence.
     */
    get sequence() {
        return this._iterator;
    }
}
exports.WrappedEnumerable = WrappedEnumerable;
/**
 * A sequence based on an "array like" object.
 */
class ArrayEnumerable extends Enumerable {
    /**
     * Initializes a new instance of that class.
     *
     * @param {ArrayLike<T>} [arr] The underlying "array".
     */
    constructor(arr) {
        super(makeIterable(arr));
        this._arr = arr || [];
    }
    /** @inheritdoc */
    asResettable() {
        return this;
    }
    /** @inheritdoc */
    get canReset() {
        return true;
    }
    /** @inheritdoc */
    reset() {
        this._index = -1;
        this._current = null;
        this._iterator = makeIterable(this._arr);
        return this;
    }
}
exports.ArrayEnumerable = ArrayEnumerable;
/**
 * A collection.
 */
class Collection extends ArrayEnumerable {
    /**
     * Initializes a new instance of that class.
     *
     * @param {Sequence<T>} [seq] The initial data.
     * @param {EqualityComparer<T> | string} [comparer] The equality comparer for the items.
     */
    constructor(seq, comparer) {
        let arr = [];
        from(seq).forEach(x => arr.push(x));
        super(arr);
        this._comparer = toEqualityComparerSafe(comparer);
        this._hasChanged = false;
    }
    /** @inheritdoc */
    add(item) {
        this.throwIfReadOnly();
        this.markAsChanged(x => {
            let a = x._arr;
            a.push(item);
        });
    }
    /** @inheritdoc */
    addRange(...items) {
        if (items) {
            for (let i = 0; i < items.length; i++) {
                this.add(items[i]);
            }
        }
    }
    /** @inheritdoc */
    clear() {
        this.throwIfReadOnly();
        this.markAsChanged(x => {
            x._arr = [];
        });
    }
    /** @inheritdoc */
    containsItem(item) {
        for (let i = 0; i < this._arr.length; i++) {
            let x = this._arr[i];
            if (this._comparer(x, item)) {
                return true;
            }
        }
        return false;
    }
    /** @inheritdoc */
    getItem(index) {
        return this._arr[index];
    }
    /** @inheritdoc */
    get isReadonly() {
        return false;
    }
    /** @inheritdoc */
    get length() {
        return this._arr.length;
    }
    /**
     * Invokes a function and marks the collection as changed since last iteration.
     *
     * @param {(coll: Collection<T>) => TResult} [func] The optional function to invoke.
     *
     * @return {TResult} The result of the function.
     */
    markAsChanged(func) {
        let result;
        if (func) {
            result = func(this);
        }
        this._hasChanged = true;
        return result;
    }
    /** @inheritdoc */
    moveNext() {
        if (this._index > -1 && this._hasChanged) {
            throw "Cannot move because collection has changed!";
        }
        return super.moveNext();
    }
    /** @inheritdoc */
    push(...items) {
        this.throwIfReadOnly();
        this.addRange
            .apply(this, arguments);
        return this._arr.length;
    }
    /** @inheritdoc */
    remove(item) {
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
    removeAll(predicate) {
        this.throwIfReadOnly();
        let p = toPredicateSafe(predicate);
        let prevVal;
        let value;
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
                    let a = x._arr;
                    a.splice(i, 1);
                    ++removedItems;
                });
            }
        }
        return removedItems;
    }
    /** @inheritdoc */
    reset() {
        let result = super.reset();
        this._hasChanged = false;
        return result;
    }
    /** @inheritdoc */
    setItem(index, item) {
        this.throwIfReadOnly();
        return this.markAsChanged((x) => {
            let a = x._arr;
            a[index] = item;
            return x;
        });
    }
    /**
     * Throws if collection is read-only.
     *
     * @throws "Collection is read-only!"
     */
    throwIfReadOnly() {
        throw "Collection is read-only!";
    }
}
exports.Collection = Collection;
/**
 * A set of items.
 */
class HashSet extends Collection {
    /**
     * Initializes a new instance of that class.
     *
     * @param {Sequence<T>} [seq] The initial data.
     * @param {EqualityComparer<T> | string} [comparer] The equality comparer for the items.
     */
    constructor(seq, comparer) {
        super(seq, comparer);
        this._arr = from(this._arr).distinct(this._comparer)
            .toArray();
        this._hasChanged = false;
    }
    /** @inheritdoc */
    add(item) {
        return this.addIfNotPresent(item);
    }
    /**
     * Adds an item if not in collection yet.
     *
     * @param {T} item The item to add.
     *
     * @return {boolean} Item was added or not.
     */
    addIfNotPresent(item) {
        let a = this._arr;
        for (let i = 0; i < a.length; i++) {
            let t = a[i];
            if (this._comparer(t, item)) {
                return false; // already in collection
            }
        }
        super.add(item);
        return true;
    }
    /** @inheritdoc */
    intersectWith(other) {
        this.throwIfReadOnly();
        return this.markAsChanged((ht) => {
            ht._arr = from(ht._arr).intersect(other, ht._comparer)
                .toArray();
            return ht;
        });
    }
    /** @inheritdoc */
    isProperSubsetOf(other) {
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
    isProperSupersetOf(other) {
        if (this.length < 1) {
            return false;
        }
        let otherHS = from(other).toSet(this._comparer);
        if (otherHS.length < 1) {
            return true;
        }
        while (otherHS.moveNext()) {
            let o = otherHS.current;
            if (!this.containsItem(o)) {
                return false;
            }
        }
        return true;
    }
    /** @inheritdoc */
    isSubsetOf(other) {
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
    isSupersetOf(other) {
        if (this.length < 1) {
            return true;
        }
        let otherHS = from(other).toSet(this._comparer);
        if (otherHS.length < 1) {
            return true;
        }
        while (otherHS.moveNext()) {
            let o = otherHS.current;
            if (!this.containsItem(o)) {
                return false;
            }
        }
        return true;
    }
    /** @inheritdoc */
    overlaps(other) {
        return from(this._arr).intersect(other, this._comparer)
            .any();
    }
    /** @inheritdoc */
    setEquals(other) {
        let otherHS = from(other).toSet(this._comparer);
        if (this.length === otherHS.length) {
            while (otherHS.moveNext()) {
                let o = otherHS.current;
                if (!this.containsItem(o)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }
    /** @inheritdoc */
    symmetricExceptWith(other) {
        this.throwIfReadOnly();
        return this.markAsChanged((ht) => {
            if (ht.length < 1) {
                ht.unionWith(other);
            }
            else {
                let seq = from(other);
                while (seq.moveNext()) {
                    let o = seq.current;
                    if (!ht.remove(o)) {
                        ht.addIfNotPresent(o);
                    }
                }
            }
            return ht;
        });
    }
    /** @inheritdoc */
    unionWith(other) {
        this.throwIfReadOnly();
        return this.markAsChanged((ht) => {
            ht._arr = from(ht._arr).union(other, ht._comparer)
                .toArray();
            return ht;
        });
    }
}
exports.HashSet = HashSet;
/**
 * A list.
 */
class List extends Collection {
    /** @inheritdoc */
    indexOf(item) {
        for (let i = 0; i < this._arr.length; i++) {
            if (this._comparer(this._arr[i], item)) {
                return i; // found
            }
        }
        return -1;
    }
    /** @inheritdoc */
    insert(index, item) {
        let me = this;
        me.throwIfReadOnly();
        this.markAsChanged((list) => {
            let a = list._arr;
            a.splice(index, 0, item);
        });
    }
    /** @inheritdoc */
    removeAt(index) {
        this.throwIfReadOnly();
        if (index >= 0 && index < this._arr.length) {
            return this.markAsChanged((x) => {
                let a = x._arr;
                a.splice(index, 1);
                return true;
            });
        }
        return false;
    }
}
exports.List = List;
/**
 * A readonly collection / list.
 */
class ReadOnlyCollection extends List {
    /**
     * Initializes a new instance of that class.
     *
     * @param {Sequence<T>} [seq] The initial data.
     * @param {EqualityComparer<T> | string} [comparer] The equality comparer for the items.
     */
    constructor(arr, comparer) {
        super(from(arr).toArray(), comparer);
    }
    /** @inheritdoc */
    get isReadonly() {
        return true;
    }
}
exports.ReadOnlyCollection = ReadOnlyCollection;
/**
 * An ordered sequence.
 */
class OrderedEnumerable extends Enumerable {
    /**
     * Initializes a new instance of that class.
     *
     * @param {IEnumerable<T>} seq The source sequence.
     * @param {Selector<T, U> | string} selector The selector for the sort values.
     * @param {Comparer<U> | string} comparer The comparer to use.
     */
    constructor(seq, selector, comparer) {
        super();
        let me = this;
        this._orderComparer = toComparerSafe(comparer);
        this._orderSelector = toSelectorSafe(selector);
        this._originalItems = [];
        seq.forEach(x => me._originalItems.push(x));
        let prevValue;
        let value;
        this._iterator = from(this._originalItems.map((x, index) => {
            let ctx = new ItemContext(seq, index, prevValue);
            ctx.value = value;
            let sortValue = {
                sortBy: me.selector(x, ctx),
                value: x,
            };
            prevValue = ctx.nextValue;
            value = ctx.value;
            return sortValue;
        }).sort((x, y) => me.comparer(x.sortBy, y.sortBy))
            .map(x => x.value));
    }
    /**
     * Gets the comparer.
     */
    get comparer() {
        return this._orderComparer;
    }
    /**
     * Gets the selector.
     */
    get selector() {
        return this._orderSelector;
    }
    /** @inheritdoc */
    then(comparer) {
        return this.thenBy(x => x, comparer);
    }
    /** @inheritdoc */
    thenBy(selector, comparer) {
        let me = this;
        let c = toComparerSafe(comparer);
        let s = toSelectorSafe(selector);
        return from(this._originalItems)
            .orderBy((x, ctx) => {
            return {
                level_0: me.selector(x, ctx),
                level_1: s(x, ctx),
            };
        }, (x, y) => {
            let compLevel0 = me.comparer(x.level_0, y.level_0);
            if (0 !== compLevel0) {
                return compLevel0;
            }
            return c(x.level_1, y.level_1);
        });
    }
    /** @inheritdoc */
    thenByDescending(selector, comparer) {
        let c = toComparerSafe(comparer);
        return this.thenBy(selector, (x, y) => c(y, x));
    }
    /** @inheritdoc */
    thenDescending(comparer) {
        return this.thenByDescending(x => x, comparer);
    }
}
exports.OrderedEnumerable = OrderedEnumerable;
/**
 * A grouping of elements.
 */
class Grouping extends WrappedEnumerable {
    /**
     * Initializes a new instance of that class.
     *
     * @param {TKey} key The value that represents the group.
     * @param {IEnumerable<T>} seq The sequence with the elements.
     */
    constructor(key, seq) {
        super(seq);
        this._key = key;
    }
    /** @inheritdoc */
    get key() {
        return this._key;
    }
}
exports.Grouping = Grouping;
/**
 * A lookup object.
 */
class Lookup extends WrappedEnumerable {
    /**
     * Initializes a new instance of that class.
     *
     * @param {IEnumerable<IGrouping<T, U>>} seq The sequence with the elements.
     */
    constructor(seq) {
        super(seq);
        let me = this;
        let groupings = [];
        if (seq) {
            while (seq.moveNext()) {
                let g = seq.current;
                me[g.key] = g;
                groupings.push(g);
            }
        }
        this._iterator = from(groupings);
    }
}
exports.Lookup = Lookup;
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
function asFunc(v, throwException = true) {
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
            .replace(/^[\s|{|}]+|[\s|{|}]+$/g, ''); // trim
        if ("" !== lambdaBody) {
            if (';' !== lambdaBody.substr(-1)) {
                lambdaBody = 'return ' + lambdaBody + ';';
            }
        }
        let func;
        eval('func = function(' + matches[3] + ') { ' + lambdaBody + ' };');
        return func;
    }
    if (throwException) {
        throw "'" + v + "' is NO valid lambda expression!";
    }
    return false;
}
exports.asFunc = asFunc;
/**
 * Returns a value as "comparer".
 *
 * @param {any} [val] The input value.
 *
 * @return {Comparer<T>} The output value.
 *
 * @throws val is invalid.
 */
function toComparerSafe(val) {
    let comparer = asFunc(val);
    if (comparer) {
        return function () {
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
    return function (x, y) {
        if (x < y) {
            return -1;
        }
        if (x > y) {
            return 1;
        }
        return 0;
    };
}
exports.toComparerSafe = toComparerSafe;
/**
 * Returns a value as "equality comparer".
 *
 * @param {any} [val] The input value.
 *
 * @return {EqualityComparer<T>} The output value.
 *
 * @throws val is invalid.
 */
function toEqualityComparerSafe(val) {
    if (true === val) {
        return (x, y) => x === y;
    }
    let equalityComparer = asFunc(val);
    if (equalityComparer) {
        return function () {
            return equalityComparer.apply(null, arguments) ? true : false;
        };
    }
    return (x, y) => x == y;
}
exports.toEqualityComparerSafe = toEqualityComparerSafe;
/**
 * Returns a value as "many item selector".
 *
 * @param {any} [val] The input value.
 *
 * @return {ManySelector<T, U>} The output value.
 *
 * @throws val is invalid.
 */
function toManySelectorSafe(val) {
    let selector = asFunc(val);
    if (selector) {
        let func = selector;
        return function () {
            return func.apply(null, arguments);
        };
    }
    return (x) => [x];
}
exports.toManySelectorSafe = toManySelectorSafe;
function toOrDefaultArgs(predicateOrDefaultValue, defaultValue, argCount) {
    let predicate = predicateOrDefaultValue;
    let defVal = defaultValue;
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
 * @throws val is invalid.
 */
function toPredicateSafe(val) {
    let predicate = asFunc(val);
    if (predicate) {
        let func = predicate;
        return function () {
            return func.apply(null, arguments) ? true : false;
        };
    }
    return () => true;
}
exports.toPredicateSafe = toPredicateSafe;
/**
 * Returns a value as "item selector".
 *
 * @param {any} [val] The input value.
 *
 * @return {Selector<T, U>} The output value.
 *
 * @throws val is invalid.
 */
function toSelectorSafe(val) {
    let selector = asFunc(val);
    if (selector) {
        let func = selector;
        return function () {
            return func.apply(null, arguments);
        };
    }
    return (x) => x;
}
exports.toSelectorSafe = toSelectorSafe;
/**
 * Returns a value as "zippper".
 *
 * @param {any} [val] The input value.
 *
 * @return {Zipper<T, U, V>} The output value.
 *
 * @throws val is invalid.
 */
function toZipperSafe(val) {
    let selector = asFunc(val);
    if (selector) {
        let func = selector;
        return function () {
            return func.apply(null, arguments);
        };
    }
    return (item1, item2) => item1 + item2;
}
exports.toZipperSafe = toZipperSafe;
/**
 * Creates a new sequence.
 *
 * @param {ArrayLike<T> | Iterator} [items] The underlying items.
 *
 * @return {IEnumerable<T>} The new sequence.
 */
function from(items) {
    items = items || [];
    if (isArrayLike(items)) {
        return new ArrayEnumerable(items);
    }
    return new Enumerable(items);
}
exports.from = from;

},{}]},{},[1]);
