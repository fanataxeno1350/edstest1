import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandContainerHd = document.createElement('section');
  footerBrandContainerHd.className = 'footer-brand-container-hd p-0';

  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.className = 'footer-brand-wrapper w-100 bg-boing-neutral-gray-600';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'footer-brand-primary';
  footerBrandPrimary.style.backgroundColor = '';

  const footerBrandContainerPrimary = document.createElement('div');
  footerBrandContainerPrimary.className = 'footer-brand-container';

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'footer-brand-primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeftPrimary = document.createElement('section');
  footerBrandLeftPrimary.className = 'footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';

  const primaryLogoLink = block.querySelector('[data-aue-prop="primaryLogo"]');
  if (primaryLogoLink) {
    const primaryLogoWrapper = document.createElement('a');
    primaryLogoWrapper.href = primaryLogoLink.href;
    primaryLogoWrapper.target = '_blank';
    primaryLogoWrapper.className = 'footer-brand-logo d-inline-block analytics_cta_click';
    primaryLogoWrapper.setAttribute('data-cta-region', 'Footer');
    primaryLogoWrapper.setAttribute('aria-label', 'ITC Logo');
    const primaryLogoImg = primaryLogoLink.querySelector('img');
    if (primaryLogoImg) {
      primaryLogoWrapper.append(createOptimizedPicture(primaryLogoImg.src, primaryLogoImg.alt, false, [{ width: '100' }]));
      primaryLogoWrapper.querySelector('img').className = 'object-fit-contain w-100 h-100';
    } else {
      const imgFallback = primaryLogoLink.querySelector('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".webp"]');
      if (imgFallback) {
        primaryLogoWrapper.append(createOptimizedPicture(imgFallback.href, 'ITC Logo', false, [{ width: '100' }]));
        primaryLogoWrapper.querySelector('img').className = 'object-fit-contain w-100 h-100';
      }
    }
    footerBrandLeftPrimary.append(primaryLogoWrapper);
    moveInstrumentation(primaryLogoLink, primaryLogoWrapper);
  }

  const secondaryLogo = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogo) {
    const secondaryLogoWrapper = document.createElement('div');
    secondaryLogoWrapper.className = 'footer-brand-secondary--logo d-inline-block';
    const secondaryLogoImg = secondaryLogo.querySelector('img');
    if (secondaryLogoImg) {
      secondaryLogoWrapper.append(createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt, false, [{ width: '100' }]));
      secondaryLogoWrapper.querySelector('img').className = 'object-fit-contain w-100';
    } else {
      const imgFallback = secondaryLogo.querySelector('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".webp"]');
      if (imgFallback) {
        secondaryLogoWrapper.append(createOptimizedPicture(imgFallback.href, 'FSSI Logo', false, [{ width: '100' }]));
        secondaryLogoWrapper.querySelector('img').className = 'object-fit-contain w-100';
      }
    }
    footerBrandLeftPrimary.append(secondaryLogoWrapper);
    moveInstrumentation(secondaryLogo, secondaryLogoWrapper);
  }

  const footerBrandRightPrimary = document.createElement('section');
  footerBrandRightPrimary.className = 'footer-brand-right';

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.className = 'footer-brand-navbar d-grid d-md-flex';
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.className = 'footer-brand-navbar--left d-flex flex-column flex-md-row ';

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.className = 'footer-brand-navbar--right d-flex flex-column flex-md-row';

  const footerLinksContainer = block.querySelector('[data-aue-prop="footerLinks"]');
  if (footerLinksContainer) {
    const footerLinks = Array.from(footerLinksContainer.querySelectorAll('[data-aue-model="footerLink"]'));
    const numLinksPerColumn = Math.ceil(footerLinks.length / 4);

    for (let i = 0; i < 4; i += 1) {
      const footerListComponent = document.createElement('div');
      footerListComponent.className = 'footer-list-component';
      const footerList = document.createElement('ul');
      footerList.className = 'footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

      const startIndex = i * numLinksPerColumn;
      const endIndex = Math.min(startIndex + numLinksPerColumn, footerLinks.length);
      const currentColumnLinks = footerLinks.slice(startIndex, endIndex);

      currentColumnLinks.forEach((linkNode) => {
        const listItem = document.createElement('li');
        listItem.className = 'footer-list-item';

        const linkElement = linkNode.querySelector('[data-aue-prop="url"]');
        const labelElement = linkNode.querySelector('[data-aue-prop="label"]');

        if (linkElement && labelElement) {
          const anchor = document.createElement('a');
          anchor.href = linkElement.textContent.trim();
          anchor.textContent = labelElement.textContent.trim();
          anchor.className = 'cta-analytics analytics_cta_click footer-list-item--link d-inline-block';
          anchor.setAttribute('data-link-region', 'Footer List');
          listItem.append(anchor);
          moveInstrumentation(linkNode, listItem);
        }
        footerList.append(listItem);
      });

      if (currentColumnLinks.length > 0) {
        footerListComponent.append(footerList);
        if (i < 2) {
          footerBrandNavbarLeft.append(footerListComponent);
        } else {
          footerBrandNavbarRight.append(footerListComponent);
        }
      }
    }
  }

  footerBrandNavbar.append(footerBrandNavbarLeft, footerBrandNavbarRight);
  footerBrandRightPrimary.append(footerBrandNavbar);
  footerBrandPrimaryContent.append(footerBrandLeftPrimary, footerBrandRightPrimary);
  footerBrandContainerPrimary.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandContainerPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'footer-brand-secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const footerBrandContainerSecondary = document.createElement('div');
  footerBrandContainerSecondary.className = 'footer-brand-container';

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'footer-brand-secondary--content d-flex flex-column  justify-content-md-between align-items-center';

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.className = 'footer-brand-right d-flex flex-column pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'footer-social-media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  footerBrandRightSecondary.append(socialMediaTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'footer-brand-right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const footerSocialsContainer = block.querySelector('[data-aue-prop="footerSocials"]');
  if (footerSocialsContainer) {
    const footerSocials = Array.from(footerSocialsContainer.querySelectorAll('[data-aue-model="footerSocial"]'));
    footerSocials.forEach((socialNode) => {
      const listItem = document.createElement('li');
      listItem.className = 'footer-brand-right--item d-flex justify-content-center align-items-center';

      const urlElement = socialNode.querySelector('[data-aue-prop="url"]');
      const iconElement = socialNode.querySelector('[data-aue-prop="icon"]');

      if (urlElement && iconElement) {
        const anchor = document.createElement('a');
        anchor.href = urlElement.textContent.trim();
        anchor.target = '_blank';
        anchor.className = 'footer-brand-right--link d-flex justify-content-center align-items-center analytics_cta_click';
        anchor.setAttribute('data-cta-region', 'Footer');

        const platformName = new URL(anchor.href).hostname.split('.')[0];
        anchor.setAttribute('data-cta-label', `footer-${platformName}`);
        anchor.setAttribute('data-platform-name', platformName);
        anchor.setAttribute('data-social-linktype', 'follow');

        const iconImg = iconElement.querySelector('img');
        if (iconImg) {
          anchor.append(createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '100' }]));
          anchor.querySelector('img').className = 'object-fit-contain w-100 h-100';
          anchor.querySelector('img').setAttribute('aria-label', platformName);
        } else {
          const imgFallback = iconElement.querySelector('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".webp"]');
          if (imgFallback) {
            anchor.append(createOptimizedPicture(imgFallback.href, platformName, false, [{ width: '100' }]));
            anchor.querySelector('img').className = 'object-fit-contain w-100 h-100';
            anchor.querySelector('img').setAttribute('aria-label', platformName);
          }
        }
        listItem.append(anchor);
        moveInstrumentation(socialNode, listItem);
      }
      socialList.append(listItem);
    });
  }
  footerBrandRightSecondary.append(socialList);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.className = 'footer-brand-left py-5 d-flex flex-column gap-3';

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.className = 'footer-brand-left--list d-flex align-items-center justify-content-center flex-wrap';

  const itcPortalLinkElement = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLinkElement) {
    const itcListItem = document.createElement('li');
    itcListItem.className = 'footer-brand-left--item footer-foot_link';
    const itcAnchor = document.createElement('a');
    itcAnchor.href = itcPortalLinkElement.textContent.trim();
    itcAnchor.target = '_blank';
    itcAnchor.className = 'footer-brand-left--link analytics_cta_click';
    itcAnchor.setAttribute('data-cta-region', 'Footer');
    itcAnchor.textContent = 'ITC portal';
    itcListItem.append(itcAnchor);
    footerBrandLeftList.append(itcListItem);
    moveInstrumentation(itcPortalLinkElement, itcListItem);
  }
  footerBrandLeftSecondary.append(footerBrandLeftList);

  const copyrightTextElement = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightTextElement) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'footer-brand-left--copyright text-center ';
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'footer-brand-left--text text-white';
    copyrightSpan.textContent = copyrightTextElement.textContent.trim();
    copyrightDiv.append(copyrightSpan);
    footerBrandLeftSecondary.append(copyrightDiv);
    moveInstrumentation(copyrightTextElement, copyrightDiv);
  }

  footerBrandSecondaryContent.append(footerBrandRightSecondary, footerBrandLeftSecondary);
  footerBrandContainerSecondary.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerBrandContainerSecondary);

  footerBrandWrapper.append(footerBrandPrimary, footerBrandSecondary);
  footerBrandContainerHd.append(footerBrandWrapper);

  block.textContent = '';
  block.append(footerBrandContainerHd);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
