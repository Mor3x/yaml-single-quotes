import type { Schema } from '../schema/Schema.js';
import type { StringifyContext } from '../stringify/stringify.js';
import { Collection } from './Collection.js';
import { ParsedNode, Range } from './Node.js';
import { Pair } from './Pair.js';
import type { ToJSContext } from './toJS.js';
export declare function findPair<K = unknown, V = unknown>(items: Iterable<Pair<K, V>>, key: unknown): Pair<K, V> | undefined;
export declare namespace YAMLMap {
    interface Parsed<K extends ParsedNode = ParsedNode, V extends ParsedNode | null = ParsedNode | null> extends YAMLMap<K, V> {
        items: Pair<K, V>[];
        range: Range;
    }
}
export declare class YAMLMap<K = unknown, V = unknown> extends Collection {
    static get tagName(): 'tag:yaml.org,2002:map';
    items: Pair<K, V>[];
    constructor(schema?: Schema);
    /**
     * Adds a value to the collection.
     *
     * @param overwrite - If not set `true`, using a key that is already in the
     *   collection will throw. Otherwise, overwrites the previous value.
     */
    add(pair: Pair<K, V> | {
        key: K;
        value: V;
    }, overwrite?: boolean): void;
    delete(key: K): boolean;
    get(key: K, keepScalar?: boolean): unknown;
    has(key: K): boolean;
    set(key: K, value: V): void;
    /**
     * @param ctx - Conversion context, originally set in Document#toJS()
     * @param {Class} Type - If set, forces the returned collection type
     * @returns Instance of Type, Map, or Object
     */
    toJSON(_?: unknown, ctx?: ToJSContext, Type?: any): any;
    toString(ctx?: StringifyContext, onComment?: () => void, onChompKeep?: () => void): string;
}
