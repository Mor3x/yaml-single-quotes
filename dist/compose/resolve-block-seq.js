import { YAMLSeq } from '../nodes/YAMLSeq.js';
import { resolveProps } from './resolve-props.js';

function resolveBlockSeq({ composeNode, composeEmptyNode }, ctx, bs, onError) {
    const seq = new YAMLSeq(ctx.schema);
    let offset = bs.offset;
    for (const { start, value } of bs.items) {
        const props = resolveProps(start, {
            ctx,
            indicator: 'seq-item-ind',
            offset,
            onError,
            startOnNewline: true
        });
        offset = props.end;
        if (!props.found) {
            if (props.anchor || props.tag || value) {
                if (value && value.type === 'block-seq')
                    onError(offset, 'BAD_INDENT', 'All sequence items must start at the same column');
                else
                    onError(offset, 'MISSING_CHAR', 'Sequence item without - indicator');
            }
            else {
                // TODO: assert being at last item?
                if (props.comment)
                    seq.comment = props.comment;
                continue;
            }
        }
        const node = value
            ? composeNode(ctx, value, props, onError)
            : composeEmptyNode(ctx, offset, start, null, props, onError);
        offset = node.range[2];
        seq.items.push(node);
    }
    seq.range = [bs.offset, offset, offset];
    return seq;
}

export { resolveBlockSeq };
