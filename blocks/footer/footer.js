import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.classList.add('footer-footer__wrapper');

  // Footer Navigation Section
  const footerNavigation = document.createElement('div');
  footerNavigation.classList.add('footer-navigation', 'footer-nav-css-from-wrapper');

  const footerNavigationWrapper = document.createElement('div');
  footerNavigationWrapper.classList.add('footer-navigation__wrapper');

  const footerNavigationLogo = document.createElement('div');
  footerNavigationLogo.classList.add('footer-navigation__logo');
  const logoLink = document.createElement('a');
  logoLink.setAttribute('target', '_self');
  logoLink.classList.add('footer-qd-icon', 'footer-qd-icon--logo', 'footer-qd-logo-footer');
  // Assuming the first cell of the first row contains the logo link and aria-label
  const logoCell = block.children[0]?.children[0];
  if (logoCell) {
    const logoAnchor = logoCell.querySelector('a');
    if (logoAnchor) {
      logoLink.href = logoAnchor.href;
      logoLink.setAttribute('aria-label', logoAnchor.getAttribute('aria-label') || '');
      // Recreate the span structure for the logo icon
      for (let i = 1; i <= 25; i += 1) {
        const span = document.createElement('span');
        span.classList.add(`footer-path${i}`);
        logoLink.append(span);
      }
      moveInstrumentation(logoAnchor, logoLink);
    }
  }
  footerNavigationLogo.append(logoLink);
  footerNavigationWrapper.append(footerNavigationLogo);

  const footerNavigationContent = document.createElement('div');
  footerNavigationContent.classList.add('footer-navigation__content');

  // Social Links
  const socialLinksDiv = document.createElement('div');
  socialLinksDiv.classList.add('footer-socialLinks', 'footer-social-links', 'footer-social-css-from-wrapper');
  const socialLinksList = document.createElement('ul');
  socialLinksList.classList.add('footer-social-links__list');

  // Assuming social links are in the second cell of the first row
  const socialLinksCell = block.children[0]?.children[1];
  if (socialLinksCell) {
    const socialAnchors = socialLinksCell.querySelectorAll('a');
    socialAnchors.forEach((anchor) => {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-social-links__item');
      const newAnchor = document.createElement('a');
      newAnchor.classList.add('footer-social-links__icon', 'footer-qd-icon');
      newAnchor.href = anchor.href;
      newAnchor.setAttribute('target', '_blank');
      newAnchor.setAttribute('aria-label', anchor.getAttribute('aria-label') || '');

      // Determine icon class based on aria-label or href
      const ariaLabel = anchor.getAttribute('aria-label')?.toLowerCase();
      if (ariaLabel === 'x') {
        newAnchor.classList.add('footer-qd-icon--x');
      } else if (ariaLabel === 'instagram') {
        newAnchor.classList.add('footer-qd-icon--instagram');
      } else if (ariaLabel === 'youtube') {
        newAnchor.classList.add('footer-qd-icon--youtube');
      } else if (ariaLabel === 'tiktok') {
        newAnchor.classList.add('footer-qd-icon--tiktok');
      } else if (ariaLabel === 'linkedin') {
        newAnchor.classList.add('footer-qd-icon--linkedin');
      }
      moveInstrumentation(anchor, newAnchor);
      listItem.append(newAnchor);
      socialLinksList.append(listItem);
    });
  }
  socialLinksDiv.append(socialLinksList);
  footerNavigationContent.append(socialLinksDiv);

  // Navigation Links
  const navLinksList = document.createElement('ul');
  navLinksList.classList.add('footer-navigation__links');

  // Assuming navigation links are in the third cell of the first row
  const navLinksCell = block.children[0]?.children[2];
  if (navLinksCell) {
    const navAnchors = navLinksCell.querySelectorAll('a');
    navAnchors.forEach((anchor) => {
      const listItem = document.createElement('li');
      const newAnchor = document.createElement('a');
      newAnchor.classList.add('footer-navigation__link-item');
      newAnchor.setAttribute('tabindex', '0');
      newAnchor.setAttribute('target', '_self');
      newAnchor.title = anchor.title || '';
      newAnchor.href = anchor.href;
      newAnchor.textContent = anchor.textContent;
      moveInstrumentation(anchor, newAnchor);
      listItem.append(newAnchor);
      navLinksList.append(listItem);
    });
  }
  footerNavigationContent.append(navLinksList);

  footerNavigationWrapper.append(footerNavigationContent);
  footerNavigation.append(footerNavigationWrapper);
  footerWrapper.append(footerNavigation);

  // Divider
  const divider = document.createElement('div');
  divider.classList.add('footer-footer__divider');
  footerWrapper.append(divider);

  // Bottom Section
  const footerBottom = document.createElement('div');
  footerBottom.classList.add('footer-footer__bottom');

  // Language Selector
  const languageSelector = document.createElement('div');
  languageSelector.classList.add('footer-language-selector', 'footer-lang-css-from-wrapper');
  const languageList = document.createElement('ul');
  languageList.classList.add('footer-language-selector__list');

  // Assuming language links are in the first cell of the second row
  const langLinksCell = block.children[1]?.children[0];
  if (langLinksCell) {
    const langAnchors = langLinksCell.querySelectorAll('a');
    langAnchors.forEach((anchor) => {
      const listItem = document.createElement('li');
      if (anchor.classList.contains('footer-active')) {
        listItem.classList.add('footer-active');
      }
      const newAnchor = document.createElement('a');
      newAnchor.href = anchor.href;
      newAnchor.setAttribute('aria-label', anchor.getAttribute('aria-label') || '');
      newAnchor.classList.add('footer-language-selector__link');
      newAnchor.setAttribute('data-lang', anchor.getAttribute('data-lang') || '');
      newAnchor.textContent = anchor.textContent;
      moveInstrumentation(anchor, newAnchor);
      listItem.append(newAnchor);
      languageList.append(listItem);
    });
  }
  languageSelector.append(languageList);
  footerBottom.append(languageSelector);

  // Policy Links
  const policyLinksDiv = document.createElement('div');
  policyLinksDiv.classList.add('footer-policy-links', 'footer-policy-css-from-wrapper');
  const policyLinksWrapper = document.createElement('div');
  policyLinksWrapper.classList.add('footer-policy-links__wrapper');
  const policyLinksContent = document.createElement('div');
  policyLinksContent.classList.add('footer-policy-links__content');

  // Assuming policy links are in the second cell of the second row
  const policyLinksCell = block.children[1]?.children[1];
  if (policyLinksCell) {
    const policyAnchors = policyLinksCell.querySelectorAll('a');
    policyAnchors.forEach((anchor) => {
      const newAnchor = document.createElement('a');
      newAnchor.setAttribute('tabindex', '0');
      newAnchor.classList.add('footer-policy-links__item');
      newAnchor.title = anchor.title || '';
      newAnchor.href = anchor.href;
      newAnchor.setAttribute('target', '_self');
      newAnchor.textContent = anchor.textContent;
      moveInstrumentation(anchor, newAnchor);
      policyLinksContent.append(newAnchor);
    });

    // Copyright text is the last <p> tag in the same cell
    const copyrightP = policyLinksCell.querySelector('p');
    if (copyrightP) {
      const newCopyrightP = document.createElement('p');
      newCopyrightP.classList.add('footer-policy-links__copyright');
      newCopyrightP.textContent = copyrightP.textContent;
      moveInstrumentation(copyrightP, newCopyrightP);
      policyLinksWrapper.append(policyLinksContent, newCopyrightP);
    } else {
      policyLinksWrapper.append(policyLinksContent);
    }
  }
  policyLinksDiv.append(policyLinksWrapper);
  footerBottom.append(policyLinksDiv);

  footerWrapper.append(footerBottom);

  block.textContent = '';
  block.append(footerWrapper);
}
