import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-wrapper');

  const nav = document.createElement('nav');
  nav.classList.add('nav');

  const navBrand = document.createElement('div');
  navBrand.classList.add('nav-brand');
  nav.append(navBrand);

  const navSections = document.createElement('div');
  navSections.classList.add('nav-sections');
  nav.append(navSections);

  const navTools = document.createElement('div');
  navTools.classList.add('nav-tools');
  nav.append(navTools);

  // Extract logo and CTA from the first row (main header content)
  const [logoAndCtaRow, ...menuRows] = block.children;
  
  // Process Logo and CTA
  if (logoAndCtaRow) {
    moveInstrumentation(logoAndCtaRow, navBrand);

    const logoLink = logoAndCtaRow.querySelector('a[aria-label="Qiddiya - Go to homepage"]');
    if (logoLink) {
      const newLogoLink = document.createElement('a');
      newLogoLink.href = logoLink.href;
      newLogoLink.setAttribute('aria-label', logoLink.getAttribute('aria-label'));
      const logoIcon = logoLink.querySelector('.header-qd-icon--logo');
      if (logoIcon) {
        newLogoLink.append(logoIcon.cloneNode(true));
      }
      navBrand.append(newLogoLink);
    }

    const ctaLink = logoAndCtaRow.querySelector('a.header-cmp-navigation--content__cta');
    if (ctaLink) {
      const newCtaLink = document.createElement('a');
      newCtaLink.href = ctaLink.href;
      newCtaLink.classList.add('button', 'primary');
      newCtaLink.setAttribute('aria-label', ctaLink.getAttribute('aria-label'));
      newCtaLink.textContent = ctaLink.querySelector('.header-cta__label').textContent;
      navTools.append(newCtaLink);
    }
  }

  // Process menu items and language selector
  const ul = document.createElement('ul');
  navSections.append(ul);

  menuRows.forEach((row) => {
    const titleCell = row.children[0];
    const linkCell = row.children[1];
    const submenuCell = row.children[2];

    // Check if it's a menu item
    if (titleCell && linkCell && submenuCell) {
      const li = document.createElement('li');
      moveInstrumentation(row, li);

      const menuLink = document.createElement('a');
      menuLink.href = linkCell.querySelector('a')?.href || '#';
      menuLink.textContent = titleCell.textContent;
      li.append(menuLink);

      const submenuLinks = submenuCell.querySelectorAll('li a');
      if (submenuLinks.length > 0) {
        const subUl = document.createElement('ul');
        submenuLinks.forEach((subLink) => {
          const subLi = document.createElement('li');
          const newSubLink = document.createElement('a');
          newSubLink.href = subLink.href;
          newSubLink.textContent = subLink.textContent;
          subLi.append(newSubLink);
          subUl.append(subLi);
        });
        li.append(subUl);
      }
      ul.append(li);
    } else if (titleCell && linkCell && !submenuCell) {
      // This might be a language item if only two cells are present
      const langSelector = document.createElement('div');
      langSelector.classList.add('language-selector');
      moveInstrumentation(row, langSelector);

      const langUl = document.createElement('ul');
      const langLi = document.createElement('li');
      const langLink = document.createElement('a');
      langLink.href = linkCell.querySelector('a')?.href || '#';
      langLink.textContent = titleCell.textContent;
      langLi.append(langLink);
      langUl.append(langLi);
      langSelector.append(langUl);
      navTools.append(langSelector);
    }
  });

  headerWrapper.append(nav);
  block.textContent = '';
  block.append(headerWrapper);
}