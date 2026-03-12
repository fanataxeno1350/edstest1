import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.className = 'footer-brand-wrapper bg-boing-neutral-gray-600';
  footerBrandWrapper.setAttribute('data-isdoodlevariation', 'false');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'footer-brand-primary';
  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'container';
  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand-primary-content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeftPrimary = document.createElement('section');
  footerBrandLeftPrimary.className = 'footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';

  const logo1Field = block.querySelector('[data-aue-prop="logo1"]');
  if (logo1Field) {
    const logo1Link = document.createElement('a');
    logo1Link.className = 'footer-brand-logo d-inline-block footer-analytics-cta';
    logo1Link.setAttribute('data-cta-region', 'Footer');
    logo1Link.setAttribute('aria-label', 'ITC Logo');
    const logo1Img = logo1Field.querySelector('img');
    if (logo1Img) {
      logo1Link.href = logo1Img.parentElement.href || '#';
      logo1Link.target = '_blank';
      logo1Link.append(createOptimizedPicture(logo1Img.src, logo1Img.alt, false, [{ width: '100vw' }]));
      logo1Link.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      moveInstrumentation(logo1Field, logo1Link);
    }
    footerBrandLeftPrimary.append(logo1Link);
  }

  const logo2Field = block.querySelector('[data-aue-prop="logo2"]');
  if (logo2Field) {
    const logo2Div = document.createElement('div');
    logo2Div.className = 'footer-brand-secondary-logo d-inline-block';
    const logo2Img = logo2Field.querySelector('img');
    if (logo2Img) {
      logo2Div.append(createOptimizedPicture(logo2Img.src, logo2Img.alt, false, [{ width: '100vw' }]));
      logo2Div.querySelector('img').className = 'object-fit-contain w-100 no-rendition';
      moveInstrumentation(logo2Field, logo2Div);
    }
    footerBrandLeftPrimary.append(logo2Div);
  }
  primaryContent.append(footerBrandLeftPrimary);

  const footerBrandRightPrimary = document.createElement('section');
  footerBrandRightPrimary.className = 'footer-brand-right';
  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.className = 'footer-brand-navbar d-grid d-md-flex';
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.className = 'footer-brand-navbar-left d-flex flex-column flex-md-row ';

  const footerLinksField = block.querySelector('[data-aue-prop="footerLinks"]');
  if (footerLinksField) {
    const footerLinkItems = footerLinksField.querySelectorAll('[data-aue-model="footerLink"]');
    const numColumns = Math.ceil(footerLinkItems.length / 4); // Distribute into 4 columns

    for (let i = 0; i < numColumns; i++) {
      const footerListWrapper = document.createElement('div');
      footerListWrapper.className = 'footer-list-wrapper';
      const footerList = document.createElement('ul');
      footerList.className = 'footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

      const startIndex = i * Math.ceil(footerLinkItems.length / numColumns);
      const endIndex = Math.min(startIndex + Math.ceil(footerLinkItems.length / numColumns), footerLinkItems.length);

      for (let j = startIndex; j < endIndex; j++) {
        const itemNode = footerLinkItems[j];
        const footerListItem = document.createElement('li');
        footerListItem.className = 'footer-list-item';

        const linkText = itemNode.querySelector('[data-aue-prop="text"]');
        const linkUrl = itemNode.querySelector('[data-aue-prop="url"]');

        if (linkText && linkUrl) {
          const linkElement = document.createElement('a');
          linkElement.href = linkUrl.textContent.trim();
          linkElement.className = 'footer-analytics-cta footer-list-item-link d-inline-block';
          linkElement.setAttribute('data-link-region', 'Footer List');
          linkElement.textContent = linkText.textContent.trim();
          footerListItem.append(linkElement);
          moveInstrumentation(itemNode, footerListItem);
        }
        footerList.append(footerListItem);
      }
      footerListWrapper.append(footerList);
      if (i < 2) {
        footerBrandNavbarLeft.append(footerListWrapper);
      } else {
        if (!footerBrandNavbar.querySelector('.footer-brand-navbar-right')) {
          const footerBrandNavbarRight = document.createElement('div');
          footerBrandNavbarRight.className = 'footer-brand-navbar-right d-flex flex-column flex-md-row';
          footerBrandNavbar.append(footerBrandNavbarRight);
        }
        footerBrandNavbar.querySelector('.footer-brand-navbar-right').append(footerListWrapper);
      }
    }
  }
  footerBrandNavbar.append(footerBrandNavbarLeft);
  footerBrandRightPrimary.append(footerBrandNavbar);
  primaryContent.append(footerBrandRightPrimary);

  primaryContainer.append(primaryContent);
  footerBrandPrimary.append(primaryContainer);
  footerBrandWrapper.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'footer-brand-secondary';
  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'container';
  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand-secondary-content d-flex flex-column  justify-content-md-between align-items-center';

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.className = 'footer-brand-right d-flex flex-column pb-5';
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'footer-social-media-title';
  socialMediaTitle.textContent = 'Follow Us On';
  footerBrandRightSecondary.append(socialMediaTitle);

  const footerBrandRightList = document.createElement('ul');
  footerBrandRightList.className = 'footer-brand-right-list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const footerSocialsField = block.querySelector('[data-aue-prop="footerSocials"]');
  if (footerSocialsField) {
    const footerSocialItems = footerSocialsField.querySelectorAll('[data-aue-model="footerSocial"]');
    footerSocialItems.forEach((itemNode) => {
      const footerBrandRightItem = document.createElement('li');
      footerBrandRightItem.className = 'footer-brand-right-item d-flex justify-content-center align-items-center';

      const iconField = itemNode.querySelector('[data-aue-prop="icon"]');
      const urlField = itemNode.querySelector('[data-aue-prop="url"]');

      if (iconField && urlField) {
        const socialLink = document.createElement('a');
        socialLink.href = urlField.textContent.trim();
        socialLink.target = '_blank';
        socialLink.className = 'footer-brand-right-link d-flex justify-content-center align-items-center footer-analytics-cta';
        socialLink.setAttribute('data-cta-region', 'Footer');
        socialLink.setAttribute('data-cta-label', `footer-${iconField.textContent.trim().toLowerCase()}`);
        socialLink.setAttribute('data-platform-name', iconField.textContent.trim().toLowerCase());
        socialLink.setAttribute('data-social-linktype', 'follow');

        const iconImg = iconField.querySelector('img');
        if (iconImg) {
          socialLink.append(createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '100vw' }]));
          socialLink.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
          socialLink.querySelector('img').setAttribute('aria-label', iconImg.alt || iconField.textContent.trim().toLowerCase());
        }
        footerBrandRightItem.append(socialLink);
        moveInstrumentation(itemNode, footerBrandRightItem);
      }
      footerBrandRightList.append(footerBrandRightItem);
    });
  }
  footerBrandRightSecondary.append(footerBrandRightList);
  secondaryContent.append(footerBrandRightSecondary);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.className = 'footer-brand-left py-5 d-flex flex-column gap-3';

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.className = 'footer-brand-left-list d-flex align-items-center justify-content-center flex-wrap';

  const itcPortalLinkField = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLinkField) {
    const itcPortalListItem = document.createElement('li');
    itcPortalListItem.className = 'footer-brand-left-item footer-foot-link';
    const itcPortalLink = document.createElement('a');
    itcPortalLink.href = itcPortalLinkField.textContent.trim();
    itcPortalLink.target = '_blank';
    itcPortalLink.className = 'footer-brand-left-link footer-analytics-cta';
    itcPortalLink.setAttribute('data-cta-region', 'Footer');
    itcPortalLink.textContent = 'ITC portal';
    itcPortalListItem.append(itcPortalLink);
    footerBrandLeftList.append(itcPortalListItem);
    moveInstrumentation(itcPortalLinkField, itcPortalListItem);
  }
  footerBrandLeftSecondary.append(footerBrandLeftList);

  const copyrightField = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightField) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'footer-brand-left-copyright text-center ';
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'footer-brand-left-text text-white';
    copyrightSpan.innerHTML = copyrightField.innerHTML;
    copyrightDiv.append(copyrightSpan);
    footerBrandLeftSecondary.append(copyrightDiv);
    moveInstrumentation(copyrightField, copyrightDiv);
  }
  secondaryContent.append(footerBrandLeftSecondary);

  secondaryContainer.append(secondaryContent);
  footerBrandSecondary.append(secondaryContainer);
  footerBrandWrapper.append(footerBrandSecondary);

  block.textContent = '';
  block.append(footerBrandWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
