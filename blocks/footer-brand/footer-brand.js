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

  const primaryLogoLink = block.querySelector('[data-aue-prop="primaryLogo"]');
  if (primaryLogoLink) {
    const primaryLogoWrapper = document.createElement('a');
    primaryLogoWrapper.href = primaryLogoLink.href;
    primaryLogoWrapper.target = '_blank';
    primaryLogoWrapper.classList.add('footer-brand-logo', 'analytics_cta_click');
    primaryLogoWrapper.dataset.ctaRegion = 'Footer';
    primaryLogoWrapper.ariaLabel = primaryLogoLink.querySelector('img')?.alt || 'Logo';

    const primaryLogoImg = primaryLogoLink.querySelector('img');
    if (primaryLogoImg) {
      const picture = createOptimizedPicture(primaryLogoImg.src, primaryLogoImg.alt);
      picture.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
      primaryLogoWrapper.append(picture);
    }
    footerBrandLeft.append(primaryLogoWrapper);
    moveInstrumentation(primaryLogoLink, primaryLogoWrapper);
  }

  const secondaryLogoWrapper = document.createElement('div');
  secondaryLogoWrapper.classList.add('footer-brand-secondary-logo');
  footerBrandLeft.append(secondaryLogoWrapper);

  const secondaryLogo = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogo) {
    const secondaryLogoImg = secondaryLogo.querySelector('img');
    if (secondaryLogoImg) {
      const picture = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
      picture.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-no-rendition');
      secondaryLogoWrapper.append(picture);
    }
    moveInstrumentation(secondaryLogo, secondaryLogoWrapper);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand-right');
  footerBrandPrimaryContent.append(footerBrandRight);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand-navbar');
  footerBrandNavbar.ariaLabel = 'footer navbar';
  footerBrandRight.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar-left');
  footerBrandNavbar.append(footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar-right');
  footerBrandNavbar.append(footerBrandNavbarRight);

  const footerLinkGroups = block.querySelectorAll('[data-aue-model="footerLinkGroup"]');
  footerLinkGroups.forEach((groupNode, index) => {
    const footerListWrapper = document.createElement('div');
    footerListWrapper.classList.add('footer-list-wrapper');

    const footerList = document.createElement('ul');
    footerList.classList.add('footer-list');
    footerListWrapper.append(footerList);

    const footerLinks = groupNode.querySelectorAll('[data-aue-model="footerLink"]');
    footerLinks.forEach((linkNode) => {
      const footerListItem = document.createElement('li');
      footerListItem.classList.add('footer-list-item');

      const link = linkNode.querySelector('[data-aue-prop="link"]');
      const text = linkNode.querySelector('[data-aue-prop="text"]');

      if (link && text) {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = text.textContent;
        anchor.classList.add('footer-cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
        anchor.dataset.linkRegion = 'Footer List';
        if (link.target) {
          anchor.target = link.target;
        }
        footerListItem.append(anchor);
        moveInstrumentation(link, anchor);
        moveInstrumentation(text, anchor);
      }
      footerList.append(footerListItem);
      moveInstrumentation(linkNode, footerListItem);
    });

    if (index % 2 === 0) {
      footerBrandNavbarLeft.append(footerListWrapper);
    } else {
      footerBrandNavbarRight.append(footerListWrapper);
    }
    moveInstrumentation(groupNode, footerListWrapper);
  });

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

  const socialLinksList = document.createElement('ul');
  socialLinksList.classList.add('footer-brand-right-list');
  footerBrandRightSocial.append(socialLinksList);

  const socialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  socialLinks.forEach((socialLinkNode) => {
    const socialListItem = document.createElement('li');
    socialListItem.classList.add('footer-brand-right-item');

    const socialLink = socialLinkNode.querySelector('[data-aue-prop="socialLink"]');
    const icon = socialLinkNode.querySelector('[data-aue-prop="icon"]');

    if (socialLink && icon) {
      const anchor = document.createElement('a');
      anchor.href = socialLink.href;
      anchor.classList.add('footer-brand-right-link', 'analytics_cta_click');
      anchor.dataset.ctaRegion = 'Footer';
      anchor.dataset.ctaLabel = `footer-${socialLink.href.includes('facebook') ? 'facebook' : socialLink.href.includes('instagram') ? 'instagram' : socialLink.href.includes('youtube') ? 'youtube' : 'social'}`;
      anchor.target = '_blank';
      anchor.dataset.platformName = socialLink.href.includes('facebook') ? 'facebook' : socialLink.href.includes('instagram') ? 'instagram' : socialLink.href.includes('youtube') ? 'youtube' : '';
      anchor.dataset.socialLinktype = 'follow';

      const iconImg = icon.querySelector('img');
      if (iconImg) {
        const picture = createOptimizedPicture(iconImg.src, iconImg.alt || socialLink.href);
        picture.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
        picture.querySelector('img').ariaLabel = anchor.dataset.platformName;
        anchor.append(picture);
      }
      socialListItem.append(anchor);
      moveInstrumentation(socialLink, anchor);
      moveInstrumentation(icon, anchor);
    }
    socialLinksList.append(socialListItem);
    moveInstrumentation(socialLinkNode, socialListItem);
  });

  const footerBrandLeftCopyright = document.createElement('section');
  footerBrandLeftCopyright.classList.add('footer-brand-left-copyright');
  footerBrandSecondaryContent.append(footerBrandLeftCopyright);

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand-left-list');
  footerBrandLeftCopyright.append(copyrightList);

  const itcPortalLinkNode = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLinkNode) {
    const itcListItem = document.createElement('li');
    itcListItem.classList.add('footer-brand-left-item', 'footer-foot-link');

    const itcAnchor = document.createElement('a');
    itcAnchor.href = itcPortalLinkNode.href;
    itcAnchor.target = '_blank';
    itcAnchor.classList.add('footer-brand-left-link', 'analytics_cta_click');
    itcAnchor.dataset.ctaRegion = 'Footer';
    itcAnchor.textContent = itcPortalLinkNode.textContent;
    itcListItem.append(itcAnchor);
    copyrightList.append(itcListItem);
    moveInstrumentation(itcPortalLinkNode, itcAnchor);
  }

  const copyrightTextDiv = document.createElement('div');
  copyrightTextDiv.classList.add('footer-brand-left-copyright-text');
  footerBrandLeftCopyright.append(copyrightTextDiv);

  const copyrightTextSpan = document.createElement('span');
  copyrightTextSpan.classList.add('footer-brand-left-text', 'footer-text-white');
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    copyrightTextSpan.textContent = copyrightText.textContent;
    copyrightTextDiv.append(copyrightTextSpan);
    moveInstrumentation(copyrightText, copyrightTextSpan);
  }

  block.textContent = '';
  block.append(footerBrandPrimary, footerBrandSecondary);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
