import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.className = 'footer-brand-wrapper bg-boing-neutral-gray-600';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'footer-brand-primary';
  footerBrandWrapper.append(footerBrandPrimary);

  const footerContainerPrimary = document.createElement('div');
  footerContainerPrimary.className = 'footer-container';
  footerBrandPrimary.append(footerContainerPrimary);

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'footer-brand-primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';
  footerContainerPrimary.append(footerBrandPrimaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'footer-brand-left d-flex footer-gap-16 px-10 align-items-center justify-content-center';
  footerBrandPrimaryContent.append(footerBrandLeft);

  const primaryLogoA = block.querySelector('[data-aue-prop="primaryLogo"]');
  if (primaryLogoA) {
    const footerBrandLogo = document.createElement('a');
    footerBrandLogo.className = 'footer-brand-logo d-inline-block analytics_cta_click';
    footerBrandLogo.href = primaryLogoA.href;
    footerBrandLogo.target = '_blank';
    footerBrandLogo.setAttribute('data-cta-region', 'Footer');
    footerBrandLogo.setAttribute('aria-label', 'ITC Logo');

    const img = primaryLogoA.querySelector('img');
    if (img) {
      footerBrandLogo.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '100vw' }]));
      footerBrandLogo.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
    }
    footerBrandLeft.append(footerBrandLogo);
    moveInstrumentation(primaryLogoA, footerBrandLogo);
  }

  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.className = 'footer-brand-secondary--logo d-inline-block';
  const secondaryLogoImg = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogoImg) {
    const img = secondaryLogoImg.querySelector('img');
    if (img) {
      secondaryLogoDiv.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '100vw' }]));
      secondaryLogoDiv.querySelector('img').className = 'object-fit-contain w-100 no-rendition';
    }
    footerBrandLeft.append(secondaryLogoDiv);
    moveInstrumentation(secondaryLogoImg, secondaryLogoDiv);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'footer-brand-right';
  footerBrandPrimaryContent.append(footerBrandRight);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.className = 'footer-brand-navbar d-grid d-md-flex';
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.className = 'footer-brand-navbar--left d-flex flex-column flex-md-row ';
  footerBrandNavbar.append(footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.className = 'footer-brand-navbar--right d-flex flex-column flex-md-row';
  footerBrandNavbar.append(footerBrandNavbarRight);

  const footerLinksContainer = block.querySelector('[data-aue-prop="footerLinks"]');
  if (footerLinksContainer) {
    const footerLinks = Array.from(footerLinksContainer.querySelectorAll('[data-aue-model="footerLink"]'));
    const numColumns = 4;
    const linksPerColumn = Math.ceil(footerLinks.length / numColumns);

    for (let i = 0; i < numColumns; i += 1) {
      const footerListWrapper = document.createElement('div');
      footerListWrapper.className = 'footer-list-wrapper';
      const footerList = document.createElement('ul');
      footerList.className = 'footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
      footerListWrapper.append(footerList);

      const startIndex = i * linksPerColumn;
      const endIndex = Math.min(startIndex + linksPerColumn, footerLinks.length);

      for (let j = startIndex; j < endIndex; j += 1) {
        const footerLinkNode = footerLinks[j];
        const link = footerLinkNode.querySelector('[data-aue-prop="link"]');
        const label = footerLinkNode.querySelector('[data-aue-prop="label"]');

        if (link && label) {
          const footerListItem = document.createElement('li');
          footerListItem.className = 'footer-list-item';

          const linkElement = document.createElement('a');
          linkElement.className = 'cta-analytics analytics_cta_click footer-list-item--link d-inline-block';
          linkElement.href = link.href;
          linkElement.setAttribute('data-link-region', 'Footer List');
          linkElement.textContent = label.textContent;

          footerListItem.append(linkElement);
          footerList.append(footerListItem);
          moveInstrumentation(footerLinkNode, footerListItem);
        }
      }
      if (i < 2) {
        footerBrandNavbarLeft.append(footerListWrapper);
      } else {
        footerBrandNavbarRight.append(footerListWrapper);
      }
    }
    moveInstrumentation(footerLinksContainer, footerBrandNavbar);
  }

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'footer-brand-secondary';
  footerBrandWrapper.append(footerBrandSecondary);

  const footerContainerSecondary = document.createElement('div');
  footerContainerSecondary.className = 'footer-container';
  footerBrandSecondary.append(footerContainerSecondary);

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'footer-brand-secondary--content d-flex flex-column justify-content-md-between align-items-center';
  footerContainerSecondary.append(footerBrandSecondaryContent);

  const footerBrandRightSocial = document.createElement('section');
  footerBrandRightSocial.className = 'footer-brand-right d-flex flex-column pb-5';
  footerBrandSecondaryContent.append(footerBrandRightSocial);

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'footer-social-media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  footerBrandRightSocial.append(socialMediaTitle);

  const footerBrandRightList = document.createElement('ul');
  footerBrandRightList.className = 'footer-brand-right--list d-flex align-items-center justify-content-center px-10 flex-wrap';
  footerBrandRightSocial.append(footerBrandRightList);

  const footerSocialsContainer = block.querySelector('[data-aue-prop="footerSocials"]');
  if (footerSocialsContainer) {
    Array.from(footerSocialsContainer.querySelectorAll('[data-aue-model="footerSocial"]')).forEach((socialNode) => {
      const socialLink = socialNode.querySelector('[data-aue-prop="socialLink"]');
      const icon = socialNode.querySelector('[data-aue-prop="icon"]');

      if (socialLink && icon) {
        const footerBrandRightItem = document.createElement('li');
        footerBrandRightItem.className = 'footer-brand-right--item d-flex justify-content-center align-items-center';

        const linkElement = document.createElement('a');
        linkElement.className = 'footer-brand-right--link d-flex justify-content-center align-items-center analytics_cta_click';
        linkElement.href = socialLink.href;
        linkElement.target = '_blank';
        linkElement.setAttribute('data-cta-region', 'Footer');
        linkElement.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
        linkElement.setAttribute('data-platform-name', icon.alt.toLowerCase());
        linkElement.setAttribute('data-social-linktype', 'follow');

        const img = icon.querySelector('img');
        if (img) {
          linkElement.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '100vw' }]));
          linkElement.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
          linkElement.querySelector('img').setAttribute('aria-label', img.alt.toLowerCase());
        }

        footerBrandRightItem.append(linkElement);
        footerBrandRightList.append(footerBrandRightItem);
        moveInstrumentation(socialNode, footerBrandRightItem);
      }
    });
    moveInstrumentation(footerSocialsContainer, footerBrandRightList);
  }

  const footerBrandLeftCopyright = document.createElement('section');
  footerBrandLeftCopyright.className = 'footer-brand-left py-5 d-flex flex-column footer-gap-3';
  footerBrandSecondaryContent.append(footerBrandLeftCopyright);

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.className = 'footer-brand-left--list d-flex align-items-center justify-content-center flex-wrap';
  footerBrandLeftCopyright.append(footerBrandLeftList);

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const footerBrandLeftItem = document.createElement('li');
    footerBrandLeftItem.className = 'footer-brand-left--item footer-link';

    const linkElement = document.createElement('a');
    linkElement.className = 'footer-brand-left--link analytics_cta_click';
    linkElement.href = itcPortalLink.href;
    linkElement.target = '_blank';
    linkElement.setAttribute('data-cta-region', 'Footer');
    linkElement.textContent = itcPortalLink.textContent;

    footerBrandLeftItem.append(linkElement);
    footerBrandLeftList.append(footerBrandLeftItem);
    moveInstrumentation(itcPortalLink, footerBrandLeftItem);
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand-left--copyright text-center ';
  footerBrandLeftCopyright.append(copyrightDiv);

  const copyrightTextSpan = document.createElement('span');
  copyrightTextSpan.className = 'footer-brand-left--text text-white';
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    copyrightTextSpan.textContent = copyrightText.textContent;
    copyrightDiv.append(copyrightTextSpan);
    moveInstrumentation(copyrightText, copyrightTextSpan);
  }

  block.textContent = '';
  block.append(footerBrandWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
