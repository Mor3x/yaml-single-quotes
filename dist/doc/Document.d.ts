import type { YAMLError, YAMLWarning } from '../errors.js';
import { Alias } from '../nodes/Alias.js';
import { Node, NODE_TYPE, ParsedNode, Range } from '../nodes/Node.js';
import { Pair } from '../nodes/Pair.js';
import type { Scalar } from '../nodes/Scalar.js';
import type { YAMLMap } from '../nodes/YAMLMap.js';
import type { YAMLSeq } from '../nodes/YAMLSeq.js';
import { CreateNodeOptions, DocumentOptions, ParseOptions, SchemaOptions, ToJSOptions, ToStringOptions } from '../options.js';
import { Schema } from '../schema/Schema.js';
import { Directives } from './directives.js';
export declare type Replacer = any[] | ((key: any, value: any) => unknown);
export declare namespace Document {
    interface Parsed<T extends ParsedNode = ParsedNode> extends Document<T> {
        range: Range;
    }
}
export declare class Document<T = unknown> {
    readonly [NODE_TYPE]: symbol;
    /** A comment before this Document */
    commentBefore: string | null;
    /** A comment immediately after this Document */
    comment: string | null;
    /** The document contents. */
    contents: T | null;
    directives: Directives;
    /** Errors encountered during parsing. */
    errors: YAMLError[];
    options: Required<Omit<ParseOptions & DocumentOptions, 'lineCounter' | 'directives' | 'version'>>;
    /**
     * The `[start, value-end, node-end]` character offsets for the part of the
     * source parsed into this document (undefined if not parsed). The `value-end`
     * and `node-end` positions are themselves not included in their respective
     * ranges.
     */
    range?: Range;
    /** The schema used with the document. Use `setSchema()` to change. */
    schema: Schema;
    /** Warnings encountered during parsing. */
    warnings: YAMLWarning[];
    /**
     * @param value - The initial value for the document, which will be wrapped
     *   in a Node container.
     */
    constructor(value?: any, options?: DocumentOptions & SchemaOptions & ParseOptions & CreateNodeOptions);
    constructor(value: any, replacer: null | Replacer, options?: DocumentOptions & SchemaOptions & ParseOptions & CreateNodeOptions);
    /** Adds a value to the document. */
    add(value: any): void;
    /** Adds a value to the document. */
    addIn(path: Iterable<unknown>, value: unknown): void;
    /**
     * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
     *
     * If `node` already has an anchor, `name` is ignored.
     * Otherwise, the `node.anchor` value will be set to `name`,
     * or if an anchor with that name is already present in the document,
     * `name` will be used as a prefix for a new unique anchor.
     * If `name` is undefined, the generated anchor will use 'a' as a prefix.
     */
    createAlias(node: Scalar | YAMLMap | YAMLSeq, name?: string): Alias;
    /**
     * Convert any value into a `Node` using the current schema, recursively
     * turning objects into collections.
     */
    createNode(value: unknown, options?: CreateNodeOptions): Node;
    createNode(value: unknown, replacer: Replacer | CreateNodeOptions | null, options?: CreateNodeOptions): Node;
    /**
     * Convert a key and a value into a `Pair` using the current schema,
     * recursively wrapping all values as `Scalar` or `Collection` nodes.
     */
    createPair<K extends Node = Node, V extends Node = Node>(key: unknown, value: unknown, options?: CreateNodeOptions): Pair<K, V>;
    /**
     * Removes a value from the document.
     * @returns `true` if the item was found and removed.
     */
    delete(key: any): boolean;
    /**
     * Removes a value from the document.
     * @returns `true` if the item was found and removed.
     */
    deleteIn(path: Iterable<unknown>): boolean;
    /**
     * Returns item at `key`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    get(key: unknown, keepScalar?: boolean): unknown;
    /**
     * Returns item at `path`, or `undefined` if not found. By default unwraps
     * scalar values from their surrounding node; to disable set `keepScalar` to
     * `true` (collections are always returned intact).
     */
    getIn(path: Iterable<unknown>, keepScalar?: boolean): unknown;
    /**
     * Checks if the document includes a value with the key `key`.
     */
    has(key: unknown): boolean;
    /**
     * Checks if the document includes a value at `path`.
     */
    hasIn(path: Iterable<unknown>): boolean;
    /**
     * Sets a value in this document. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    set(key: any, value: unknown): void;
    /**
     * Sets a value in this document. For `!!set`, `value` needs to be a
     * boolean to add/remove the item from the set.
     */
    setIn(path: Iterable<unknown>, value: unknown): void;
    /**
     * Change the YAML version and schema used by the document.
     *
     * Overrides all previously set schema options
     */
    setSchema(version: '1.1' | '1.2', options?: SchemaOptions): void;
    /** A plain JavaScript representation of the document `contents`. */
    toJS(opt?: ToJSOptions & {
        [ignored: string]: unknown;
    }): any;
    /**
     * A JSON representation of the document `contents`.
     *
     * @param jsonArg Used by `JSON.stringify` to indicate the array index or
     *   property name.
     */
    toJSON(jsonArg?: string | null, onAnchor?: ToJSOptions['onAnchor']): any;
    /** A YAML representation of the document. */
    toString(options?: ToStringOptions): string;
}
