import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('footer-cmp-footer__wrapper');
  moveInstrumentation(block, wrapper);

  // Footer Navigation
  const navigationWrapper = document.createElement('div');
  navigationWrapper.classList.add('footer-cmp-navigation', 'footer-navigation', 'footer-nav-css-from-wrapper');
  const innerNavigationWrapper = document.createElement('div');
  innerNavigationWrapper.classList.add('footer-cmp-navigation__wrapper', 'footer-cmp-navigation__wrapper');

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('footer-cmp-navigation__logo', 'footer-cmp-navigation__logo');
  const logoLink = block.children[0]?.children[0]?.querySelector('a');
  if (logoLink) {
    const newLogoLink = document.createElement('a');
    newLogoLink.href = logoLink.href;
    newLogoLink.target = '_self';
    newLogoLink.setAttribute('aria-label', logoLink.getAttribute('aria-label'));
    const logoSpan = document.createElement('span');
    logoSpan.classList.add('footer-qd-icon', 'footer-qd-icon', 'footer-qd-icon--logo', 'footer-qd-logo-footer');
    // Recreate all path spans for the logo icon
    for (let i = 1; i <= 25; i += 1) {
      const pathSpan = document.createElement('span');
      pathSpan.classList.add(`footer-path${i}`, `footer-path${i}`);
      logoSpan.append(pathSpan);
    }
    newLogoLink.append(logoSpan);
    logoDiv.append(newLogoLink);
  }
  innerNavigationWrapper.append(logoDiv);

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('footer-cmp-navigation__content', 'footer-cmp-navigation__content');

  // Social Links
  const socialLinksDiv = document.createElement('div');
  socialLinksDiv.classList.add('footer-cmp-social-links', 'footer-socialLinks', 'footer-social-links', 'footer-social-css-from-wrapper');
  const socialLinksList = document.createElement('ul');
  socialLinksList.classList.add('footer-cmp-social-links__list', 'footer-cmp-social-links__list');

  // Assuming social links are in the second cell of the first row
  const socialLinksCell = block.children[0]?.children[1];
  if (socialLinksCell) {
    const existingSocialLinks = socialLinksCell.querySelectorAll('a');
    existingSocialLinks.forEach((link) => {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-cmp-social-links__item', 'footer-cmp-social-links__item');
      const newLink = document.createElement('a');
      newLink.classList.add('footer-cmp-social-links__icon', 'footer-cmp-social-links__icon');
      newLink.target = '_blank';
      newLink.href = link.href;
      newLink.setAttribute('aria-label', link.getAttribute('aria-label'));
      // Extract icon class from the existing link's classList
      const iconClass = Array.from(link.classList).find((cls) => cls.startsWith('footer-qd-icon--'));
      if (iconClass) {
        newLink.classList.add('footer-qd-icon', iconClass);
      }
      listItem.append(newLink);
      socialLinksList.append(listItem);
    });
  }
  socialLinksDiv.append(socialLinksList);
  contentDiv.append(socialLinksDiv);

  // Navigation Links
  const navLinksList = document.createElement('ul');
  navLinksList.classList.add('footer-cmp-navigation__links', 'footer-cmp-navigation__links');

  // Assuming navigation links are in the third cell of the first row
  const navLinksCell = block.children[0]?.children[2];
  if (navLinksCell) {
    const existingNavLinks = navLinksCell.querySelectorAll('a');
    existingNavLinks.forEach((link) => {
      const listItem = document.createElement('li');
      const newLink = document.createElement('a');
      newLink.classList.add('footer-cmp-navigation__link-item', 'footer-cmp-navigation__link-item');
      newLink.tabIndex = 0;
      newLink.target = '_self';
      newLink.title = link.title;
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      listItem.append(newLink);
      navLinksList.append(listItem);
    });
  }
  contentDiv.append(navLinksList);
  innerNavigationWrapper.append(contentDiv);
  navigationWrapper.append(innerNavigationWrapper);
  wrapper.append(navigationWrapper);

  // Divider
  const divider = document.createElement('div');
  divider.classList.add('footer-cmp-footer__divider', 'footer-cmp-footer__divider');
  wrapper.append(divider);

  // Bottom Section
  const bottomDiv = document.createElement('div');
  bottomDiv.classList.add('footer-cmp-footer__bottom', 'footer-cmp-footer__bottom');

  // Language Selector
  const langSelectorDiv = document.createElement('div');
  langSelectorDiv.classList.add('footer-cmp-language-selector', 'footer-language-selector', 'footer-lang-css-from-wrapper');
  const langSelectorList = document.createElement('ul');
  langSelectorList.classList.add('footer-cmp-language-selector__list', 'footer-cmp-language-selector');

  // Assuming language links are in the first cell of the second row
  const langLinksCell = block.children[1]?.children[0];
  if (langLinksCell) {
    const existingLangLinks = langLinksCell.querySelectorAll('a');
    existingLangLinks.forEach((link) => {
      const listItem = document.createElement('li');
      if (link.parentElement.classList.contains('footer-active')) {
        listItem.classList.add('footer-active', 'footer-active');
      }
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.setAttribute('aria-label', link.getAttribute('aria-label'));
      newLink.classList.add('footer-cmp-language-selector__link', 'footer-cmp-language-selector__link');
      newLink.setAttribute('data-lang', link.getAttribute('data-lang'));
      newLink.textContent = link.textContent;
      listItem.append(newLink);
      langSelectorList.append(listItem);
    });
  }
  langSelectorDiv.append(langSelectorList);
  bottomDiv.append(langSelectorDiv);

  // Policy Links
  const policyLinksDiv = document.createElement('div');
  policyLinksDiv.classList.add('footer-cmp-policy-links', 'footer-policy-links', 'footer-policy-css-from-wrapper');
  const policyLinksInnerWrapper = document.createElement('div');
  policyLinksInnerWrapper.classList.add('footer-cmp-policy-links__wrapper', 'footer-cmp-policy-links__wrapper');
  const policyLinksContent = document.createElement('div');
  policyLinksContent.classList.add('footer-cmp-policy-links__content', 'footer-cmp-policy-links__content');

  // Assuming policy links are in the second cell of the second row
  const policyLinksCell = block.children[1]?.children[1];
  if (policyLinksCell) {
    const existingPolicyLinks = policyLinksCell.querySelectorAll('a');
    existingPolicyLinks.forEach((link) => {
      const newLink = document.createElement('a');
      newLink.tabIndex = 0;
      newLink.classList.add('footer-cmp-policy-links__item', 'footer-cmp-policy-links__item');
      newLink.title = link.title;
      newLink.href = link.href;
      newLink.target = '_self';
      newLink.textContent = link.textContent;
      policyLinksContent.append(newLink);
    });

    const copyrightP = policyLinksCell.querySelector('p');
    if (copyrightP) {
      const newCopyrightP = document.createElement('p');
      newCopyrightP.classList.add('footer-cmp-policy-links__copyright', 'footer-cmp-policy-links__copyright');
      newCopyrightP.textContent = copyrightP.textContent;
      policyLinksInnerWrapper.append(policyLinksContent, newCopyrightP);
    } else {
      policyLinksInnerWrapper.append(policyLinksContent);
    }
  }
  policyLinksDiv.append(policyLinksInnerWrapper);
  bottomDiv.append(policyLinksDiv);

  wrapper.append(bottomDiv);

  block.textContent = '';
  block.append(wrapper);
}