import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const modalDiv = document.createElement('div');
  moveInstrumentation(block, modalDiv);
  modalDiv.className = 'countryselectormodal-modal countryselectormodal-fade countryselectormodal-itc-country-selector countryselectormodal-show';
  modalDiv.id = 'countryModal';
  modalDiv.setAttribute('tabindex', '-1');
  modalDiv.setAttribute('role', 'dialog');
  modalDiv.setAttribute('aria-labelledby', 'countryModalLabel');
  modalDiv.setAttribute('aria-modal', 'true');
  modalDiv.style.display = 'block';

  const modalDialogDiv = document.createElement('div');
  modalDialogDiv.className = 'countryselectormodal-modal-dialog countryselectormodal-modal-dialog-centered';
  modalDialogDiv.setAttribute('role', 'document');
  modalDiv.append(modalDialogDiv);

  const modalContentDiv = document.createElement('div');
  modalContentDiv.className = 'countryselectormodal-modal-content countryselectormodal-modal-content';
  modalDialogDiv.append(modalContentDiv);

  const modalHeaderDiv = document.createElement('div');
  modalHeaderDiv.className = 'countryselectormodal-modal-header countryselectormodal-modal-header countryselectormodal-border-0 countryselectormodal-text-center';
  modalContentDiv.append(modalHeaderDiv);

  const headerWrapperDiv = document.createElement('div');
  headerWrapperDiv.className = 'countryselectormodal-w-100 countryselectormodal-w-100';
  modalHeaderDiv.append(headerWrapperDiv);

  const titleH2 = document.createElement('h2');
  titleH2.className = 'countryselectormodal-modal-title countryselectormodal-modal-title';
  const experienceP = document.createElement('p');
  experienceP.className = 'countryselectormodal-experience-text';

  const modalBodyDiv = document.createElement('div');
  modalBodyDiv.className = 'countryselectormodal-modal-body countryselectormodal-modal-body';
  modalContentDiv.append(modalBodyDiv);

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.className = 'countryselectormodal-country-options countryselectormodal-country-options countryselectormodal-d-flex countryselectormodal-justify-content-center countryselectormodal-align-items-center';
  modalBodyDiv.append(countryOptionsDiv);

  [...block.children].forEach((row, index) => {
    if (index === 0) {
      // This is the first row for title and experienceText
      const titleCell = row.children[0];
      const experienceCell = row.children[1];

      if (titleCell) {
        titleH2.innerHTML = titleCell.innerHTML;
        moveInstrumentation(titleCell, titleH2);
      }
      if (experienceCell) {
        experienceP.innerHTML = experienceCell.innerHTML;
        moveInstrumentation(experienceCell, experienceP);
      }
      headerWrapperDiv.append(titleH2, experienceP);
    } else {
      // Subsequent rows are country options
      const countryOptionDiv = document.createElement('div');
      moveInstrumentation(row, countryOptionDiv);
      countryOptionDiv.className = 'countryselectormodal-country-option countryselectormodal-country-option countryselectormodal-mx-3 countryselectormodal-d-flex countryselectormodal-flex-column countryselectormodal-align-items-center';
      if (index === 1) { // Assuming the first country option is selected by default
        countryOptionDiv.classList.add('countryselectormodal-selected');
      }

      const flagCell = row.children[0];
      const nameCell = row.children[1];
      const countryCodeCell = row.children[2];
      const urlCell = row.children[3];

      if (countryCodeCell) {
        countryOptionDiv.setAttribute('data-country', countryCodeCell.textContent.trim());
        moveInstrumentation(countryCodeCell, countryOptionDiv, 'data-country');
      }
      if (urlCell) {
        countryOptionDiv.setAttribute('data-url', urlCell.textContent.trim());
        moveInstrumentation(urlCell, countryOptionDiv, 'data-url');
      }

      if (flagCell) {
        const img = flagCell.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          const newImg = optimizedPic.querySelector('img');
          newImg.classList.add('countryselectormodal-country-flag', 'countryselectormodal-country-flag');
          // Add specific flag class based on country code or alt text if available
          if (countryOptionDiv.dataset.country) {
            newImg.classList.add(`countryselectormodal-${countryOptionDiv.dataset.country}-flag`);
          } else if (img.alt) {
            newImg.classList.add(`countryselectormodal-${img.alt.toLowerCase().replace(/\s/g, '-')}-flag`);
          }
          moveInstrumentation(img, newImg);
          countryOptionDiv.append(optimizedPic);
        }
      }

      if (nameCell) {
        const p = document.createElement('p');
        p.className = 'countryselectormodal-country-name';
        p.textContent = nameCell.textContent.trim();
        moveInstrumentation(nameCell, p);
        countryOptionDiv.append(p);
      }
      countryOptionsDiv.append(countryOptionDiv);
    }
  });

  block.textContent = '';
  block.append(modalDiv);
}
