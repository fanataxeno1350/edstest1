import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // The SpaceAdder block is essentially an empty div in the final HTML.
  // It doesn't have any children or content to transform.
  // Therefore, the decorate function for this block will be empty as well,
  // as there's no DOM manipulation or content extraction required.
  // The block itself serves as a spacer.

  // If there were any instrumentation to transfer from a potential row
  // (which is not the case for this block as it's typically a single element
  // without authored rows), it would look something like this:
  // if (block.children.length > 0) {
  //   const firstRow = block.children[0];
  //   moveInstrumentation(firstRow, block);
  //   block.textContent = '';
  // }

  // In this specific case, the block is already an empty div and serves its purpose as is.
  // No further decoration is needed.
}
