import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUpDiv = document.createElement('div');
  popUpDiv.id = 'sticky-navigation-pop-up';
  block.append(popUpDiv);

  const transPopUpDiv = document.createElement('div');
  transPopUpDiv.classList.add('stickynavigation-sticky-navigation-trans-pop-up');
  block.append(transPopUpDiv);

  const section = document.createElement('section');
  section.classList.add(
    'stickynavigation-sticky-navigation-bottom-nav',
    'stickynavigation-sticky-navigation-position-fixed',
    'stickynavigation-sticky-navigation-bottom-0',
    'stickynavigation-sticky-navigation-p-3',
    'stickynavigation-sticky-navigation-d-flex',
    'stickynavigation-sticky-navigation-align-items-center',
    'stickynavigation-sticky-navigation-boing-container',
    'stickynavigation-sticky-navigation-bg-boing-primary'
  );

  const ul = document.createElement('ul');
  ul.classList.add(
    'stickynavigation-sticky-navigation-bottom-nav__list',
    'stickynavigation-sticky-navigation-d-flex',
    'stickynavigation-sticky-navigation-justify-content-around',
    'stickynavigation-sticky-navigation-align-items-center',
    'stickynavigation-sticky-navigation-flex-grow-1'
  );

  [...block.children].forEach((row) => {
    if (row.children.length === 0) return;

    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.classList.add(
      'stickynavigation-sticky-navigation-bottom-nav__item',
      'stickynavigation-sticky-navigation-position-relative'
    );

    const linkCell = row.children[0]; // Assuming the first cell contains the link and its content
    const link = linkCell.querySelector('a');

    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.classList.add(
        'stickynavigation-sticky-navigation-bottom-nav__link',
        'stickynavigation-sticky-navigation-d-flex',
        'stickynavigation-sticky-navigation-flex-column',
        'stickynavigation-sticky-navigation-align-items-center',
        'stickynavigation-sticky-navigation-gap-1',
        'stickynavigation-analytics_cta_click'
      );
      newLink.setAttribute('data-consent', link.getAttribute('data-consent'));
      newLink.setAttribute('data-link', link.getAttribute('data-link'));

      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [
          { width: '750' },
        ]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('stickynavigation-sticky-navigation-bottom-nav__icon');
        newLink.append(optimizedPic);
      }

      const span = link.querySelector('span');
      if (span) {
        const newSpan = document.createElement('span');
        newSpan.classList.add('stickynavigation-sticky-navigation-bottom-nav__label');
        newSpan.textContent = span.textContent;
        newLink.append(newSpan);
      }
      li.append(newLink);
    }
    ul.append(li);
  });

  section.append(ul);
  block.textContent = '';
  block.append(popUpDiv, transPopUpDiv, section);
}
