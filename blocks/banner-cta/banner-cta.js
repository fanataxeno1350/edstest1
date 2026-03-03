import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('bannercta-text-center');

  const row = block.children[0]; // Assuming there's only one row for the CTA and pop-up data
  if (!row) return; // Exit if no content row

  moveInstrumentation(row, mainDiv); // Transfer instrumentation from the first row

  const cells = [...row.children];

  // Extracting data from the first cell (which contains the button)
  const buttonCell = cells[0];
  const link = buttonCell.querySelector('a');

  // Extracting data from the second cell (which contains the hidden pop-up inputs)
  const popupCell = cells[1];
  const popupMessageInput = popupCell.querySelector('.bannercta-popup-message');
  const proceedButtonLabelInput = popupCell.querySelector('.bannercta-proceed-button-label');
  const cancelButtonLabelInput = popupCell.querySelector('.bannercta-cancel-button-label');
  const backgroundColorInput = popupCell.querySelector('.bannercta-background-color');

  // Create the button structure
  const newLink = document.createElement('a');
  newLink.id = link?.id || '';
  newLink.classList.add('bannercta-cmp-button', 'bannercta-analytics_cta_click', 'bannercta-text-center', 'bannercta-cta-layout');
  newLink.setAttribute('data-link-region', link?.getAttribute('data-link-region') || 'CTA');
  newLink.setAttribute('data-is-internal', link?.getAttribute('data-is-internal') || 'false');
  newLink.setAttribute('data-enable-gating', link?.getAttribute('data-enable-gating') || 'false');
  newLink.href = link?.href || '#';
  newLink.target = link?.target || '_self';

  const span = document.createElement('span');
  span.classList.add('bannercta-cmp-button__text', 'bannercta-primary-btn', 'bannercta-w-75', 'bannercta-p-5', 'bannercta-rounded-pill', 'bannercta-d-inline-flex', 'bannercta-justify-content-center', 'bannercta-align-items-center', 'bannercta-famlf-cta-btn');
  span.textContent = link?.querySelector('span')?.textContent || '';

  newLink.append(span);
  mainDiv.append(newLink);

  // Create the pop-up structure
  const popupDiv = document.createElement('div');
  popupDiv.classList.add('bannercta-pop-up', 'bannercta-d-none');

  const newPopupMessageInput = document.createElement('input');
  newPopupMessageInput.type = 'hidden';
  newPopupMessageInput.classList.add('bannercta-popup-message');
  newPopupMessageInput.value = popupMessageInput?.value || '';

  const newProceedButtonLabelInput = document.createElement('input');
  newProceedButtonLabelInput.type = 'hidden';
  newProceedButtonLabelInput.classList.add('bannercta-proceed-button-label');
  newProceedButtonLabelInput.value = proceedButtonLabelInput?.value || '';

  const newCancelButtonLabelInput = document.createElement('input');
  newCancelButtonLabelInput.type = 'hidden';
  newCancelButtonLabelInput.classList.add('bannercta-cancel-button-label');
  newCancelButtonLabelInput.value = cancelButtonLabelInput?.value || '';

  const newBackgroundColorInput = document.createElement('input');
  newBackgroundColorInput.type = 'hidden';
  newBackgroundColorInput.classList.add('bannercta-background-color');
  newBackgroundColorInput.value = backgroundColorInput?.value || '';

  popupDiv.append(newPopupMessageInput, newProceedButtonLabelInput, newCancelButtonLabelInput, newBackgroundColorInput);
  mainDiv.append(popupDiv);

  block.textContent = '';
  block.append(mainDiv);
}
