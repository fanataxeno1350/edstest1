import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerMainHeader = document.createElement('header');
  headerMainHeader.classList.add('header-main-header', 'header-seconds', 'sticky-head');

  const headerMainHeaderContainer = document.createElement('div');
  headerMainHeaderContainer.classList.add('header-main-header-container');

  const logoWrapper = document.createElement('a');
  logoWrapper.id = 'header-logo';
  logoWrapper.classList.add('header-logo');

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    logoWrapper.href = logoLink.href;
    logoWrapper.title = 'Home'; // Default title
    logoWrapper.rel = 'home';
    moveInstrumentation(logoLink, logoWrapper);
  }

  const logoImage = block.querySelector('[data-aue-prop="logo"] img');
  if (logoImage) {
    const optimizedPicture = createOptimizedPicture(logoImage.src, logoImage.alt || 'Home', false, [{
      width: '100px'
    }]);
    const img = optimizedPicture.querySelector('img');
    img.classList.add('header-logo-image');
    logoWrapper.append(optimizedPicture);
    moveInstrumentation(logoImage, optimizedPicture);
  }

  const nav = document.createElement('nav');
  nav.id = 'header-cssmenu';

  const headMobile = document.createElement('div');
  headMobile.id = 'header-head-mobile';
  nav.append(headMobile);

  const button = document.createElement('div');
  button.classList.add('header-button');
  nav.append(button);

  const ul = document.createElement('ul');
  ul.classList.add('header-pull-rights');

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((navItem) => {
    const li = document.createElement('li');
    const label = navItem.querySelector('[data-aue-prop="label"]');
    const link = navItem.querySelector('[data-aue-prop="link"]');

    if (label && link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = label.textContent;
      a.title = label.textContent;
      li.append(a);
      moveInstrumentation(label, a);
      moveInstrumentation(link, a);
    } else if (label) {
      const a = document.createElement('a');
      a.textContent = label.textContent;
      a.title = label.textContent;
      a.href = '#'; // Fallback for missing link
      li.append(a);
      moveInstrumentation(label, a);
    } else if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.href;
      a.title = link.href;
      li.append(a);
      moveInstrumentation(link, a);
    }

    const subNavItems = navItem.querySelectorAll('[data-aue-model="subNavItem"]');
    if (subNavItems.length > 0) {
      li.classList.add('header-has-sub');
      const span = document.createElement('span');
      span.classList.add('header-submenu-button');
      li.prepend(span);

      const subUl = document.createElement('ul');
      subNavItems.forEach((subNavItem) => {
        const subLi = document.createElement('li');
        const subLabel = subNavItem.querySelector('[data-aue-prop="label"]');
        const subLink = subNavItem.querySelector('[data-aue-prop="link"]');

        if (subLabel && subLink) {
          const subA = document.createElement('a');
          subA.href = subLink.href;
          subA.textContent = subLabel.textContent;
          subLi.append(subA);
          moveInstrumentation(subLabel, subA);
          moveInstrumentation(subLink, subA);
        } else if (subLabel) {
          const subA = document.createElement('a');
          subA.textContent = subLabel.textContent;
          subA.href = '#';
          subLi.append(subA);
          moveInstrumentation(subLabel, subA);
        } else if (subLink) {
          const subA = document.createElement('a');
          subA.href = subLink.href;
          subA.textContent = subLink.href;
          subLi.append(subA);
          moveInstrumentation(subLink, subA);
        }
        subUl.append(subLi);
        moveInstrumentation(subNavItem, subLi);
      });
      li.append(subUl);
    }
    ul.append(li);
    moveInstrumentation(navItem, li);
  });

  nav.append(ul);

  headerMainHeaderContainer.append(logoWrapper, nav);
  headerMainHeader.append(headerMainHeaderContainer);

  block.textContent = '';
  block.append(headerMainHeader);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
