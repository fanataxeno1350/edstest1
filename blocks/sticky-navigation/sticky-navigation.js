import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUpDiv = document.createElement('div');
  popUpDiv.id = 'pop-up';
  block.prepend(popUpDiv);

  const transPopUpDiv = document.createElement('div');
  transPopUpDiv.classList.add('sticky-navigation-trans-pop-up');
  block.prepend(transPopUpDiv);

  const section = document.createElement('section');
  section.classList.add(
    'sticky-navigation-sticky-bottom-nav',
    'sticky-navigation-position-fixed',
    'sticky-navigation-bottom-0',
    'sticky-navigation-p-3',
    'sticky-navigation-d-flex',
    'sticky-navigation-align-items-center',
    'sticky-navigation-boing-container',
    'sticky-navigation-bg-boing-primary',
  );

  const ul = document.createElement('ul');
  ul.classList.add(
    'sticky-navigation-sticky-bottom-nav__list',
    'sticky-navigation-d-flex',
    'sticky-navigation-justify-content-around',
    'sticky-navigation-align-items-center',
    'sticky-navigation-flex-grow-1',
  );

  [...block.children].forEach((row) => {
    if (row.dataset.aueModel !== 'navigationItem') {
      return;
    }

    const li = document.createElement('li');
    li.classList.add(
      'sticky-navigation-sticky-bottom-nav__item',
      'sticky-navigation-position-relative',
    );
    moveInstrumentation(row, li);

    const linkEl = row.children[2]?.querySelector('a') || row.children[2];
    const dataLinkEl = row.children[3]?.querySelector('a') || row.children[3];
    const consentEl = row.children[4];

    const a = document.createElement('a');
    a.classList.add(
      'sticky-navigation-sticky-bottom-nav__link',
      'sticky-navigation-d-flex',
      'sticky-navigation-flex-column',
      'sticky-navigation-align-items-center',
      'sticky-navigation-gap-1',
      'sticky-navigation-analytics_cta_click',
    );

    if (linkEl) {
      a.href = linkEl.textContent.trim();
      moveInstrumentation(linkEl, a);
    }

    if (dataLinkEl) {
      a.setAttribute('data-link', dataLinkEl.textContent.trim());
      moveInstrumentation(dataLinkEl, a);
    }

    if (consentEl) {
      a.setAttribute('data-consent', consentEl.textContent.trim().toLowerCase());
      moveInstrumentation(consentEl, a);
    }

    const iconWrapper = row.children[0];
    const iconImg = iconWrapper?.querySelector('img');
    if (iconImg) {
      const pic = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '40' }]);
      pic.classList.add('sticky-navigation-sticky-bottom-nav__icon');
      a.append(pic);
      moveInstrumentation(iconImg, pic.querySelector('img'));
    } else if (iconWrapper) {
      // Fallback if img is not directly found, maybe it's a link wrapping an image
      const iconAnchor = iconWrapper.querySelector('a');
      const iconAnchorImg = iconAnchor?.querySelector('img');
      if (iconAnchorImg) {
        const pic = createOptimizedPicture(iconAnchorImg.src, iconAnchorImg.alt, false, [{ width: '40' }]);
        pic.classList.add('sticky-navigation-sticky-bottom-nav__icon');
        a.append(pic);
        moveInstrumentation(iconAnchorImg, pic.querySelector('img'));
      } else {
        // If still no image, append the raw content of the icon cell
        a.append(...iconWrapper.childNodes);
        moveInstrumentation(iconWrapper, a);
      }
    }

    const labelWrapper = row.children[1];
    if (labelWrapper) {
      const span = document.createElement('span');
      span.classList.add('sticky-navigation-sticky-bottom-nav__label');
      span.append(...labelWrapper.childNodes);
      moveInstrumentation(labelWrapper, span);
      a.append(span);
    }

    li.append(a);
    ul.append(li);
  });

  section.append(ul);

  block.textContent = '';
  block.append(popUpDiv, transPopUpDiv, section);
}
