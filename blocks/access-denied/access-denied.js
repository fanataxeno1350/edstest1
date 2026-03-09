import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const accessDeniedBody = document.createElement('div');
  accessDeniedBody.classList.add('access-denied-body');

  const [headingRow, messageRow, referenceRow, errorUrlRow] = [...block.children];

  // Heading
  if (headingRow) {
    const h1 = document.createElement('h1');
    h1.innerHTML = headingRow.children[0].innerHTML;
    moveInstrumentation(headingRow, h1);
    accessDeniedBody.append(h1);
  }

  // Message
  if (messageRow) {
    const messageContent = messageRow.children[0].innerHTML;
    // The message can contain a mix of text and possibly a <p> tag.
    // We need to extract the text content before the first <p> tag if it exists.
    const firstPIndex = messageContent.indexOf('<p');
    const messageText = firstPIndex !== -1 ? messageContent.substring(0, firstPIndex) : messageContent;
    
    const messageNode = document.createElement('div'); // Use a div to hold the message text
    messageNode.innerHTML = messageText.trim(); // Trim to remove potential leading/trailing whitespace
    moveInstrumentation(messageRow, messageNode);
    accessDeniedBody.append(messageNode);
  }

  // Reference Number
  if (referenceRow) {
    const pRef = document.createElement('p');
    pRef.classList.add('access-denied-p');
    pRef.textContent = referenceRow.children[0].textContent;
    moveInstrumentation(referenceRow, pRef);
    accessDeniedBody.append(pRef);
  }

  // Error URL
  if (errorUrlRow) {
    const pErrorUrl = document.createElement('p');
    pErrorUrl.classList.add('access-denied-p');
    pErrorUrl.textContent = errorUrlRow.children[0].textContent;
    moveInstrumentation(errorUrlRow, pErrorUrl);
    accessDeniedBody.append(pErrorUrl);
  }

  block.textContent = '';
  block.append(accessDeniedBody);
}
