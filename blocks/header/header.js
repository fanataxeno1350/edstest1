import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const header = document.createElement('header');
  header.className = 'header-headerseconds header-sticky-head';

  const headContainer = document.createElement('div');
  headContainer.className = 'header-head-container';

  const logoLinkWrapper = document.createElement('a');
  logoLinkWrapper.className = 'header-logo';

  const logo = block.querySelector('[data-aue-prop="logo"]');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');

  if (logo) {
    const img = logo.querySelector('img');
    if (img) {
      const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '150' }]);
      const logoImg = optimizedPicture.querySelector('img');
      logoImg.className = 'header-logo-img';
      logoLinkWrapper.append(logoImg);
      moveInstrumentation(logo, logoLinkWrapper);
    }
  }

  if (logoLink) {
    const linkElement = logoLink.querySelector('a');
    if (linkElement) {
      logoLinkWrapper.href = linkElement.href;
      logoLinkWrapper.title = linkElement.title || '';
      logoLinkWrapper.rel = linkElement.rel || '';
      moveInstrumentation(logoLink, logoLinkWrapper);
    }
  } else if (logoLinkWrapper.querySelector('img')) {
    // Fallback if logoLink is missing but logo exists
    logoLinkWrapper.href = '/';
    logoLinkWrapper.title = 'Home';
    logoLinkWrapper.rel = 'home';
  }

  headContainer.append(logoLinkWrapper);

  const nav = document.createElement('nav');
  nav.id = 'header-cssmenu';
  nav.className = 'header-cssmenu';

  const mobileHead = document.createElement('div');
  mobileHead.id = 'header-head-mobile';
  mobileHead.className = 'header-head-mobile';
  nav.append(mobileHead);

  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'header-button';
  nav.append(buttonDiv);

  const ul = document.createElement('ul');
  ul.className = 'header-pull-rights';

  const menuItems = block.querySelectorAll('[data-aue-model="headerMenuItem"]');
  menuItems.forEach((menuItemNode) => {
    const li = document.createElement('li');
    li.className = 'header-list-item';

    const link = menuItemNode.querySelector('[data-aue-prop="link"]');
    const label = menuItemNode.querySelector('[data-aue-prop="label"]');
    const subMenu = menuItemNode.querySelector('[data-aue-prop="subMenu"]');

    const anchor = document.createElement('a');
    anchor.className = 'header-link';

    if (link) {
      const linkElement = link.querySelector('a');
      if (linkElement) {
        anchor.href = linkElement.href;
        anchor.title = linkElement.title || '';
        moveInstrumentation(link, anchor);
      }
    }

    if (label) {
      anchor.textContent = label.textContent;
      moveInstrumentation(label, anchor);
    } else if (anchor.href) {
      // Fallback for label if missing
      const url = new URL(anchor.href);
      anchor.textContent = url.pathname.split('/').pop().replace(/-/g, ' ') || 'Link';
    }

    if (subMenu) {
      li.classList.replace('header-list-item', 'header-has-sub');
      const submenuButton = document.createElement('span');
      submenuButton.className = 'header-submenu-button';
      li.append(submenuButton);

      const subUl = document.createElement('ul');
      subUl.className = 'header-submenu';

      const subMenuItems = subMenu.querySelectorAll('[data-aue-model="headerSubMenuItem"]');
      subMenuItems.forEach((subMenuItemNode) => {
        const subLi = document.createElement('li');
        subLi.className = 'header-submenu-item';

        const subLink = subMenuItemNode.querySelector('[data-aue-prop="link"]');
        const subLabel = subMenuItemNode.querySelector('[data-aue-prop="label"]');

        const subAnchor = document.createElement('a');
        subAnchor.className = 'header-submenu-link';

        if (subLink) {
          const subLinkElement = subLink.querySelector('a');
          if (subLinkElement) {
            subAnchor.href = subLinkElement.href;
            moveInstrumentation(subLink, subAnchor);
          }
        }

        if (subLabel) {
          subAnchor.textContent = subLabel.textContent;
          moveInstrumentation(subLabel, subAnchor);
        } else if (subAnchor.href) {
          const url = new URL(subAnchor.href);
          subAnchor.textContent = url.pathname.split('/').pop().replace(/-/g, ' ') || 'Sub-link';
        }

        subLi.append(subAnchor);
        subUl.append(subLi);
        moveInstrumentation(subMenuItemNode, subLi);
      });
      li.append(anchor, subUl);
      moveInstrumentation(subMenu, subUl);
    } else {
      li.append(anchor);
    }
    ul.append(li);
    moveInstrumentation(menuItemNode, li);
  });

  nav.append(ul);
  headContainer.append(nav);
  header.append(headContainer);

  block.textContent = '';
  block.append(header);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
