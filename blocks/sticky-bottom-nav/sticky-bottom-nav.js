import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const popUp = document.createElement('div');
  popUp.id = 'pop-up';

  const transPopUp = document.createElement('div');
  transPopUp.classList.add('stickyNavigation-trans-pop-up');

  const section = document.createElement('section');
  section.classList.add(
    'stickyNavigation-sticky-bottom-nav',
    'position-fixed',
    'bottom-0',
    'p-3',
    'd-flex',
    'align-items-center',
    'boing-container',
    'bg-boing-primary',
  );

  const ul = document.createElement('ul');
  ul.classList.add(
    'stickyNavigation-sticky-bottom-nav__list',
    'd-flex',
    'justify-content-around',
    'align-items-center',
    'flex-grow-1',
  );

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.classList.add('stickyNavigation-sticky-bottom-nav__item', 'position-relative');

    const linkElement = itemNode.querySelector('[data-aue-prop="link"] a');
    const labelElement = itemNode.querySelector('[data-aue-prop="label"]');
    const iconElement = itemNode.querySelector('[data-aue-prop="icon"] img');
    const altElement = itemNode.querySelector('[data-aue-prop="alt"]');

    if (linkElement && labelElement && iconElement && altElement) {
      const a = document.createElement('a');
      a.classList.add(
        'stickyNavigation-sticky-bottom-nav__link',
        'd-flex',
        'flex-column',
        'align-items-center',
        'gap-1',
        'analytics_cta_click',
      );
      a.href = linkElement.href;
      a.setAttribute('data-consent', linkElement.dataset.consent || 'false');
      a.setAttribute('data-link', linkElement.dataset.link || '');

      const iconWrapper = document.createElement('div'); // Create a wrapper for the icon
      const optimizedPicture = createOptimizedPicture(iconElement.src, altElement.textContent, false, [{
        width: '40',
      }]);
      const img = optimizedPicture.querySelector('img');
      img.classList.add('stickyNavigation-sticky-bottom-nav__icon');
      iconWrapper.append(optimizedPicture);

      const span = document.createElement('span');
      span.classList.add('stickyNavigation-sticky-bottom-nav__label');
      span.textContent = labelElement.textContent;

      a.append(img, span);
      li.append(a);
      ul.append(li);

      moveInstrumentation(linkElement, a);
      moveInstrumentation(labelElement, span);
      moveInstrumentation(iconElement, img);
      moveInstrumentation(altElement, img);
      moveInstrumentation(itemNode, li);
    }
  });

  section.append(ul);

  block.textContent = '';
  block.append(popUp, transPopUp, section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
