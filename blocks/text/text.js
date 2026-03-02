import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const row = block.children[0];
  if (row) {
    const textCell = row.children[0];
    if (textCell) {
      // The block directly contains the rich text content
      // No need to create new elements, just transfer instrumentation
      // and ensure the content is directly appended to the block if it's not already.
      const content = textCell.innerHTML;
      block.textContent = ''; // Clear existing table structure
      block.innerHTML = content; // Append the rich text content directly
      moveInstrumentation(textCell, block); // Transfer instrumentation to the block itself
    }
  }
}
