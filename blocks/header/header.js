import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerElement = document.createElement('header');
  headerElement.className = 'header-seconds header-sticky-head';

  const headContainer = document.createElement('div');
  headContainer.className = 'header-head-container';

  const logoLinkWrapper = document.createElement('a');
  logoLinkWrapper.className = 'header-logo';
  logoLinkWrapper.title = 'Home';
  logoLinkWrapper.rel = 'home';

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    logoLinkWrapper.href = logoLink.textContent.trim();
    moveInstrumentation(logoLink, logoLinkWrapper);
  }

  const logoImage = block.querySelector('[data-aue-prop="logo"]');
  if (logoImage) {
    const img = logoImage.querySelector('img');
    if (img) {
      const optimizedPicture = createOptimizedPicture(img.src, img.alt);
      const logoImg = optimizedPicture.querySelector('img');
      if (logoImg) {
        logoImg.className = 'header-logo-img';
        logoImg.alt = img.alt || 'Home';
      }
      logoLinkWrapper.append(optimizedPicture);
      moveInstrumentation(logoImage, logoLinkWrapper);
    } else {
      // Fallback if img tag is not directly inside data-aue-prop="logo"
      const fallbackImg = logoImage.querySelector('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]');
      if (fallbackImg) {
        const optimizedPicture = createOptimizedPicture(fallbackImg.href, 'Home');
        const logoImg = optimizedPicture.querySelector('img');
        if (logoImg) {
          logoImg.className = 'header-logo-img';
          logoImg.alt = 'Home';
        }
        logoLinkWrapper.append(optimizedPicture);
        moveInstrumentation(fallbackImg, logoLinkWrapper);
      }
    }
  }

  headContainer.append(logoLinkWrapper);

  const nav = document.createElement('nav');
  nav.id = 'header-cssmenu';

  const mobileDiv = document.createElement('div');
  mobileDiv.id = 'header-head-mobile';
  nav.append(mobileDiv);

  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'header-button';
  nav.append(buttonDiv);

  const ul = document.createElement('ul');
  ul.className = 'header-pull-rights';

  const navItems = block.querySelectorAll('[data-aue-model="navItem"]');
  navItems.forEach((navItemNode) => {
    const li = document.createElement('li');

    const navLink = navItemNode.querySelector('[data-aue-prop="link"]');
    const navLabel = navItemNode.querySelector('[data-aue-prop="label"]');

    const a = document.createElement('a');
    if (navLink) {
      a.href = navLink.textContent.trim();
      moveInstrumentation(navLink, a);
    } else {
      a.href = '#'; // Default if no link is provided
    }
    if (navLabel) {
      a.textContent = navLabel.textContent.trim();
      a.title = navLabel.textContent.trim();
      moveInstrumentation(navLabel, a);
    } else if (navLink) {
      a.textContent = navLink.textContent.trim(); // Fallback to link text if no explicit label
      a.title = navLink.textContent.trim();
    }
    li.append(a);

    const subNavItems = navItemNode.querySelectorAll('[data-aue-model="subNavItem"]');
    if (subNavItems.length > 0) {
      li.classList.add('header-has-sub');
      const span = document.createElement('span');
      span.className = 'header-submenu-button';
      li.prepend(span);

      const subUl = document.createElement('ul');
      subNavItems.forEach((subNavItemNode) => {
        const subLi = document.createElement('li');
        const subNavLink = subNavItemNode.querySelector('[data-aue-prop="link"]');
        const subNavLabel = subNavItemNode.querySelector('[data-aue-prop="label"]');

        const subA = document.createElement('a');
        if (subNavLink) {
          subA.href = subNavLink.textContent.trim();
          moveInstrumentation(subNavLink, subA);
        } else {
          subA.href = '#';
        }
        if (subNavLabel) {
          subA.textContent = subNavLabel.textContent.trim();
          moveInstrumentation(subNavLabel, subA);
        } else if (subNavLink) {
          subA.textContent = subNavLink.textContent.trim();
        }
        subLi.append(subA);
        moveInstrumentation(subNavItemNode, subLi);
        subUl.append(subLi);
      });
      li.append(subUl);
    }
    moveInstrumentation(navItemNode, li);
    ul.append(li);
  });

  nav.append(ul);
  headContainer.append(nav);
  headerElement.append(headContainer);

  block.textContent = '';
  block.append(headerElement);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}