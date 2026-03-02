import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main container div
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('bannercta-banner-cta-text-center');

  // Extract data from the block's children (authored content)
  const row = block.children[0]; // Assuming a single row for all properties
  if (row) {
    moveInstrumentation(row, mainDiv); // Transfer instrumentation from the row to the new mainDiv

    const ctaTextCell = row.children[0];
    const ctaHrefCell = row.children[1];
    const ctaNewTabCell = row.children[2];
    const popupMessageCell = row.children[3];
    const proceedButtonLabelCell = row.children[4];
    const cancelButtonLabelCell = row.children[5];
    const backgroundColorCell = row.children[6];

    // Create the anchor element
    const anchor = document.createElement('a');
    anchor.id = 'cta-5b69d7d699'; // Static ID from HTML
    anchor.classList.add(
      'bannercta-banner-cta-cmp-button',
      'bannercta-banner-cta-analytics_cta_click',
      'bannercta-banner-cta-text-center',
      'bannercta-banner-cta-cta-layout'
    );
    anchor.setAttribute('data-link-region', 'CTA');
    anchor.setAttribute('data-is-internal', 'true');
    anchor.setAttribute('data-enable-gating', 'false');

    if (ctaHrefCell) {
      const ctaHref = ctaHrefCell.textContent.trim();
      if (ctaHref) {
        anchor.href = ctaHref;
      }
    }

    if (ctaNewTabCell && ctaNewTabCell.textContent.trim().toLowerCase() === 'true') {
      anchor.target = '_blank';
    }

    // Create the span element for CTA text
    const span = document.createElement('span');
    span.classList.add(
      'bannercta-banner-cta-cmp-button__text',
      'bannercta-banner-cta-primary-btn',
      'bannercta-banner-cta-w-75',
      'bannercta-banner-cta-p-5',
      'bannercta-banner-cta-rounded-pill',
      'bannercta-banner-cta-d-inline-flex',
      'bannercta-banner-cta-justify-content-center',
      'bannercta-banner-cta-align-items-center',
      'bannercta-banner-cta-famlf-cta-btn'
    );

    if (ctaTextCell) {
      span.textContent = ctaTextCell.textContent.trim();
    } else {
      span.textContent = 'Know More'; // Default text if not provided
    }

    anchor.append(span);
    mainDiv.append(anchor);

    // Create the pop-up div
    const popupDiv = document.createElement('div');
    popupDiv.classList.add('bannercta-banner-cta-pop-up', 'bannercta-banner-cta-d-none');

    // Create hidden inputs for pop-up properties
    const popupMessageInput = document.createElement('input');
    popupMessageInput.type = 'hidden';
    popupMessageInput.classList.add('bannercta-banner-cta-popup-message');
    if (popupMessageCell) {
      popupMessageInput.value = popupMessageCell.textContent.trim();
    }
    popupDiv.append(popupMessageInput);

    const proceedButtonLabelInput = document.createElement('input');
    proceedButtonLabelInput.type = 'hidden';
    proceedButtonLabelInput.classList.add('bannercta-banner-cta-proceed-button-label');
    if (proceedButtonLabelCell) {
      proceedButtonLabelInput.value = proceedButtonLabelCell.textContent.trim();
    }
    popupDiv.append(proceedButtonLabelInput);

    const cancelButtonLabelInput = document.createElement('input');
    cancelButtonLabelInput.type = 'hidden';
    cancelButtonLabelInput.classList.add('bannercta-banner-cta-cancel-button-label');
    if (cancelButtonLabelCell) {
      cancelButtonLabelInput.value = cancelButtonLabelCell.textContent.trim();
    }
    popupDiv.append(cancelButtonLabelInput);

    const backgroundColorInput = document.createElement('input');
    backgroundColorInput.type = 'hidden';
    backgroundColorInput.classList.add('bannercta-banner-cta-background-color');
    if (backgroundColorCell) {
      backgroundColorInput.value = backgroundColorCell.textContent.trim();
    }
    popupDiv.append(backgroundColorInput);

    mainDiv.append(popupDiv);
  }

  // Clear the block's original content and append the new structure
  block.textContent = '';
  block.append(mainDiv);
}
