import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Space-Adder block does not have any content fields, it's purely for spacing.
  // Therefore, we just need to ensure the block element itself is properly instrumented
  // if there were any authoring rows. Since there are no content cells, we just
  // clear the block and let its CSS handle the spacing.
  
  // If there were any rows (even empty ones) from authoring, transfer instrumentation.
  // In this specific case, the block JSON indicates no fields, so there won't be rows
  // with content, but it's good practice to handle potential empty rows if they existed.
  if (block.children.length > 0) {
    const firstRow = block.children[0];
    // Move instrumentation from the first (and likely only) row to the block itself
    // or to a conceptual container if the block needed one.
    // Given it's a 'Space-Adder', the block itself is the container.
    moveInstrumentation(firstRow, block);
  }

  // Clear any existing content within the block, as it's just a spacer.
  block.textContent = '';

  // No new elements are created as the block itself serves the purpose.
  // The styling for spacing will be applied via CSS to the 'spaceadder-spaceAdder-spaceAdder' class.
}
