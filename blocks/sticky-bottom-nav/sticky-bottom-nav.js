import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUpDiv = document.createElement('div');
  popUpDiv.id = 'pop-up';
  block.append(popUpDiv);

  const transPopUpDiv = document.createElement('div');
  transPopUpDiv.classList.add('stickyNavigation-trans-pop-up');
  block.append(transPopUpDiv);

  const section = document.createElement('section');
  section.classList.add('stickyNavigation-sticky-bottom-nav');
  
  const ul = document.createElement('ul');
  ul.classList.add('stickyNavigation-sticky-bottom-nav__list');

  [...block.children].forEach((row) => {
    // Assuming each row directly represents a navigation item
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add('stickyNavigation-sticky-bottom-nav__item');

    const link = document.createElement('a');
    link.classList.add('stickyNavigation-sticky-bottom-nav__link', 'stickyNavigation-analytics_cta_click');

    // Extracting content from the cells of the row
    const cells = [...row.children];

    // Cell 1: Icon (image)
    const iconCell = cells[0];
    const img = iconCell.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('stickyNavigation-sticky-bottom-nav__icon');
      link.append(optimizedPic);
    }

    // Cell 2: Label (text)
    const labelCell = cells[1];
    const labelSpan = document.createElement('span');
    labelSpan.classList.add('stickyNavigation-sticky-bottom-nav__label');
    labelSpan.textContent = labelCell.textContent.trim();
    link.append(labelSpan);

    // Cell 3: Link (href)
    const linkCell = cells[2];
    const linkText = linkCell.textContent.trim();
    link.href = linkText;
    link.setAttribute('data-link', linkText);

    // Cell 4: Consent (boolean)
    const consentCell = cells[3];
    const consentValue = consentCell.textContent.trim().toLowerCase() === 'true';
    link.setAttribute('data-consent', consentValue);

    li.append(link);
    ul.append(li);
  });

  section.append(ul);
  block.textContent = '';
  block.append(popUpDiv, transPopUpDiv, section);
}