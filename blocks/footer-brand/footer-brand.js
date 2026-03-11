import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand-primary');
  footerBrandPrimary.style.backgroundColor = 'transparent';

  const footerContainerPrimary = document.createElement('div');
  footerContainerPrimary.classList.add('footer-container');
  footerBrandPrimary.append(footerContainerPrimary);

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.classList.add('footer-brand-primary-content');
  footerContainerPrimary.append(footerBrandPrimaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand-left');
  footerBrandPrimaryContent.append(footerBrandLeft);

  const primaryLogoA = block.querySelector('[data-aue-prop="primaryLogo"] a');
  if (primaryLogoA) {
    const primaryLogoImg = primaryLogoA.querySelector('img');
    const picture = createOptimizedPicture(primaryLogoImg.src, primaryLogoImg.alt);
    primaryLogoA.innerHTML = '';
    primaryLogoA.append(picture);
    primaryLogoA.classList.add('footer-brand-logo', 'analytics_cta_click');
    primaryLogoA.setAttribute('data-cta-region', 'Footer');
    primaryLogoA.setAttribute('aria-label', 'ITC Logo');
    footerBrandLeft.append(primaryLogoA);
    moveInstrumentation(block.querySelector('[data-aue-prop="primaryLogo"]'), primaryLogoA);
  }

  const footerBrandSecondaryLogo = document.createElement('div');
  footerBrandSecondaryLogo.classList.add('footer-brand-secondary-logo');
  footerBrandLeft.append(footerBrandSecondaryLogo);

  const secondaryLogo = block.querySelector('[data-aue-prop="secondaryLogo"] img');
  if (secondaryLogo) {
    const picture = createOptimizedPicture(secondaryLogo.src, secondaryLogo.alt);
    picture.classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-no-rendition');
    footerBrandSecondaryLogo.append(picture);
    moveInstrumentation(block.querySelector('[data-aue-prop="secondaryLogo"]'), footerBrandSecondaryLogo);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand-right');
  footerBrandPrimaryContent.append(footerBrandRight);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand-navbar');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar-left');
  footerBrandNavbar.append(footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar-right');
  footerBrandNavbar.append(footerBrandNavbarRight);

  const footerLinksContainer = block.querySelector('[data-aue-prop="footerLinks"]');
  if (footerLinksContainer) {
    const footerLinks = footerLinksContainer.querySelectorAll('[data-aue-model="footerLink"]');
    const numColumns = 2; // Assuming 2 columns for left and right navbars
    const linksPerColumn = Math.ceil(footerLinks.length / numColumns);

    footerLinks.forEach((linkNode, index) => {
      const linkWrapper = document.createElement('div');
      linkWrapper.classList.add('footer-list-wrapper');
      const ul = document.createElement('ul');
      ul.classList.add('footer-list');
      linkWrapper.append(ul);

      const li = document.createElement('li');
      li.classList.add('footer-list-item');
      ul.append(li);

      const link = linkNode.querySelector('[data-aue-prop="link"] a');
      if (link) {
        link.classList.add('footer-cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
        link.setAttribute('data-link-region', 'Footer List');
        li.append(link);
      }

      if (index < linksPerColumn) {
        footerBrandNavbarLeft.append(linkWrapper);
      } else {
        footerBrandNavbarRight.append(linkWrapper);
      }
      moveInstrumentation(linkNode, linkWrapper);
    });
  }

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand-secondary');
  footerBrandSecondary.style.backgroundColor = 'transparent';

  const footerContainerSecondary = document.createElement('div');
  footerContainerSecondary.classList.add('footer-container');
  footerBrandSecondary.append(footerContainerSecondary);

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.classList.add('footer-brand-secondary-content');
  footerContainerSecondary.append(footerBrandSecondaryContent);

  const footerBrandRightSocial = document.createElement('section');
  footerBrandRightSocial.classList.add('footer-brand-right-social');
  footerBrandSecondaryContent.append(footerBrandRightSocial);

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('footer-social-media-title');
  socialMediaTitle.textContent = 'Follow Us On';
  footerBrandRightSocial.append(socialMediaTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-right-list');
  footerBrandRightSocial.append(socialList);

  const footerSocialLinksContainer = block.querySelector('[data-aue-prop="footerSocialLinks"]');
  if (footerSocialLinksContainer) {
    const footerSocialLinks = footerSocialLinksContainer.querySelectorAll('[data-aue-model="footerSocialLink"]');
    footerSocialLinks.forEach((socialLinkNode) => {
      const li = document.createElement('li');
      li.classList.add('footer-brand-right-item');
      socialList.append(li);

      const socialLinkA = socialLinkNode.querySelector('[data-aue-prop="socialLink"] a');
      if (socialLinkA) {
        socialLinkA.classList.add('footer-brand-right-link', 'analytics_cta_click');
        socialLinkA.setAttribute('data-cta-region', 'Footer');
        socialLinkA.setAttribute('data-social-linktype', 'follow');
        socialLinkA.setAttribute('target', '_blank');

        const iconImg = socialLinkNode.querySelector('[data-aue-prop="icon"] img');
        if (iconImg) {
          const picture = createOptimizedPicture(iconImg.src, iconImg.alt);
          picture.classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
          socialLinkA.append(picture);
          socialLinkA.setAttribute('aria-label', iconImg.alt);
          socialLinkA.setAttribute('data-cta-label', `footer-${iconImg.alt.toLowerCase()}`);
          socialLinkA.setAttribute('data-platform-name', iconImg.alt.toLowerCase());
        }
        li.append(socialLinkA);
      }
      moveInstrumentation(socialLinkNode, li);
    });
  }

  const footerBrandLeftCopyright = document.createElement('section');
  footerBrandLeftCopyright.classList.add('footer-brand-left-copyright');
  footerBrandSecondaryContent.append(footerBrandLeftCopyright);

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand-left-list');
  footerBrandLeftCopyright.append(copyrightList);

  const copyrightListItem = document.createElement('li');
  copyrightListItem.classList.add('footer-brand-left-item', 'footer-foot-link');
  copyrightList.append(copyrightListItem);

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"] a');
  if (itcPortalLink) {
    itcPortalLink.classList.add('footer-brand-left-link', 'analytics_cta_click');
    itcPortalLink.setAttribute('data-cta-region', 'Footer');
    itcPortalLink.setAttribute('target', '_blank');
    copyrightListItem.append(itcPortalLink);
    moveInstrumentation(block.querySelector('[data-aue-prop="itcPortalLink"]'), copyrightListItem);
  }

  const copyrightTextDiv = document.createElement('div');
  copyrightTextDiv.classList.add('footer-brand-left-copyright-text');
  footerBrandLeftCopyright.append(copyrightTextDiv);

  const copyrightTextSpan = document.createElement('span');
  copyrightTextSpan.classList.add('footer-brand-left-text', 'footer-text-white');

  const copyrightTextElement = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightTextElement) {
    copyrightTextSpan.textContent = copyrightTextElement.textContent.trim();
    copyrightTextDiv.append(copyrightTextSpan);
    moveInstrumentation(copyrightTextElement, copyrightTextDiv);
  }

  block.textContent = '';
  block.append(footerBrandPrimary, footerBrandSecondary);
  block.className = 'footer-brand block';
  block.dataset.blockStatus = 'loaded';
}