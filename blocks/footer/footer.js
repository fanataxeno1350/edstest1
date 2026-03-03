import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerWrapper = document.createElement('div');
  footerWrapper.className = 'footer-cmp-footer__wrapper';
  moveInstrumentation(block, footerWrapper);

  // Navigation Section
  const navSection = document.createElement('div');
  navSection.className = 'footer-navigation footer-nav-css-from-wrapper';

  const navWrapper = document.createElement('div');
  navWrapper.className = 'footer-cmp-navigation__wrapper';

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.className = 'footer-cmp-navigation__logo';
  const logoLink = block.children[0]?.children[0]?.querySelector('a');
  if (logoLink) {
    const newLogoLink = document.createElement('a');
    newLogoLink.href = logoLink.href;
    newLogoLink.target = logoLink.target;
    newLogoLink.setAttribute('aria-label', logoLink.getAttribute('aria-label'));
    newLogoLink.innerHTML = logoLink.innerHTML;
    moveInstrumentation(logoLink, newLogoLink);
    logoDiv.append(newLogoLink);
  }
  navWrapper.append(logoDiv);

  // Navigation Content (Social Links & Nav Links)
  const navContentDiv = document.createElement('div');
  navContentDiv.className = 'footer-cmp-navigation__content';

  // Social Links
  const socialLinksDiv = document.createElement('div');
  socialLinksDiv.className = 'footer-socialLinks footer-social-links footer-social-css-from-wrapper';
  const socialLinksList = document.createElement('ul');
  socialLinksList.className = 'footer-cmp-social-links__list';

  // Assuming social links are in the second cell of the first row
  const socialLinksContainer = block.children[0]?.children[1];
  if (socialLinksContainer) {
    [...socialLinksContainer.children].forEach((row) => {
      const link = row.querySelector('a');
      const iconClass = row.querySelector('span:first-child')?.className;
      const label = link?.getAttribute('aria-label');

      if (link && iconClass && label) {
        const li = document.createElement('li');
        li.className = 'footer-cmp-social-links__item';
        moveInstrumentation(row, li);

        const newLink = document.createElement('a');
        newLink.className = `footer-cmp-social-links__icon ${iconClass}`;
        newLink.target = '_blank';
        newLink.href = link.href;
        newLink.setAttribute('aria-label', label);
        moveInstrumentation(link, newLink);
        li.append(newLink);
        socialLinksList.append(li);
      }
    });
  }
  socialLinksDiv.append(socialLinksList);
  navContentDiv.append(socialLinksDiv);

  // Navigation Links
  const navLinksList = document.createElement('ul');
  navLinksList.className = 'footer-cmp-navigation__links';

  // Assuming navigation links are in the third cell of the first row
  const navLinksContainer = block.children[0]?.children[2];
  if (navLinksContainer) {
    [...navLinksContainer.children].forEach((row) => {
      const link = row.querySelector('a');
      if (link) {
        const li = document.createElement('li');
        moveInstrumentation(row, li);

        const newLink = document.createElement('a');
        newLink.className = 'footer-cmp-navigation__link-item';
        newLink.tabIndex = 0;
        newLink.target = link.target;
        newLink.title = link.title;
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        moveInstrumentation(link, newLink);
        li.append(newLink);
        navLinksList.append(li);
      }
    });
  }
  navContentDiv.append(navLinksList);
  navWrapper.append(navContentDiv);
  navSection.append(navWrapper);
  footerWrapper.append(navSection);

  // Divider
  const divider = document.createElement('div');
  divider.className = 'footer-cmp-footer__divider';
  footerWrapper.append(divider);

  // Bottom Section (Language Selector & Policy Links)
  const bottomSection = document.createElement('div');
  bottomSection.className = 'footer-cmp-footer__bottom';

  // Language Selector
  const langSelectorDiv = document.createElement('div');
  langSelectorDiv.className = 'footer-language-selector footer-lang-css-from-wrapper';
  const langList = document.createElement('ul');
  langList.className = 'footer-cmp-language-selector';

  // Assuming languages are in the first cell of the second row
  const langContainer = block.children[1]?.children[0];
  if (langContainer) {
    [...langContainer.children].forEach((row) => {
      const link = row.querySelector('a');
      if (link) {
        const li = document.createElement('li');
        if (row.classList.contains('active')) {
          li.classList.add('footer-active');
        }
        moveInstrumentation(row, li);

        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.setAttribute('aria-label', link.getAttribute('aria-label'));
        newLink.className = 'footer-cmp-language-selector__link';
        newLink.setAttribute('data-lang', link.getAttribute('data-lang'));
        newLink.textContent = link.textContent;
        moveInstrumentation(link, newLink);
        li.append(newLink);
        langList.append(li);
      }
    });
  }
  langSelectorDiv.append(langList);
  bottomSection.append(langSelectorDiv);

  // Policy Links
  const policyLinksDiv = document.createElement('div');
  policyLinksDiv.className = 'footer-policy-links footer-policy-css-from-wrapper';
  const policyLinksWrapper = document.createElement('div');
  policyLinksWrapper.className = 'footer-cmp-policy-links__wrapper';
  const policyLinksContent = document.createElement('div');
  policyLinksContent.className = 'footer-cmp-policy-links__content';

  // Assuming policy links are in the second cell of the second row
  const policyContainer = block.children[1]?.children[1];
  if (policyContainer) {
    [...policyContainer.children].forEach((row) => {
      const link = row.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.tabIndex = 0;
        newLink.className = 'footer-cmp-policy-links__item';
        newLink.title = link.title;
        newLink.href = link.href;
        newLink.target = link.target;
        newLink.textContent = link.textContent;
        moveInstrumentation(link, newLink);
        policyLinksContent.append(newLink);
      }
    });

    const copyrightP = policyContainer.querySelector('p');
    if (copyrightP) {
      const newCopyrightP = document.createElement('p');
      newCopyrightP.className = 'footer-cmp-policy-links__copyright';
      newCopyrightP.textContent = copyrightP.textContent;
      moveInstrumentation(copyrightP, newCopyrightP);
      policyLinksWrapper.append(policyLinksContent, newCopyrightP);
    } else {
      policyLinksWrapper.append(policyLinksContent);
    }
  }
  policyLinksDiv.append(policyLinksWrapper);
  bottomSection.append(policyLinksDiv);

  footerWrapper.append(bottomSection);

  block.textContent = '';
  block.append(footerWrapper);
}
