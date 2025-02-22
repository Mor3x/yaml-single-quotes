import { Document } from '../doc/Document.js';
import { composeNode, composeEmptyNode } from './compose-node.js';
import { resolveEnd } from './resolve-end.js';
import { resolveProps } from './resolve-props.js';

function composeDoc(options, directives, { offset, start, value, end }, onError) {
    const opts = Object.assign({ directives }, options);
    const doc = new Document(undefined, opts);
    const ctx = {
        directives: doc.directives,
        options: doc.options,
        schema: doc.schema
    };
    const props = resolveProps(start, {
        ctx,
        indicator: 'doc-start',
        offset,
        onError,
        startOnNewline: true
    });
    if (props.found) {
        doc.directives.marker = true;
        if (value &&
            (value.type === 'block-map' || value.type === 'block-seq') &&
            !props.hasNewline)
            onError(props.end, 'MISSING_CHAR', 'Block collection cannot start on same line with directives-end marker');
    }
    doc.contents = value
        ? composeNode(ctx, value, props, onError)
        : composeEmptyNode(ctx, props.end, start, null, props, onError);
    const contentEnd = doc.contents.range[2];
    const re = resolveEnd(end, contentEnd, false, onError);
    if (re.comment)
        doc.comment = re.comment;
    doc.range = [offset, contentEnd, re.offset];
    return doc;
}

export { composeDoc };
