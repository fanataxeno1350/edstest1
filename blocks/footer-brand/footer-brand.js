import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const primaryLogoEl = block.querySelector('[data-aue-prop="primaryLogo"]');
  const primaryLogoLinkEl = block.querySelector('[data-aue-prop="primaryLogoLink"]');
  const secondaryLogoEl = block.querySelector('[data-aue-prop="secondaryLogo"]');
  const footerLinksEls = block.querySelectorAll('[data-aue-model="footerLink"]');
  const footerSocialsEls = block.querySelectorAll('[data-aue-model="footerSocial"]');
  const copyrightLinkEl = block.querySelector('[data-aue-prop="copyrightLink"]');
  const copyrightTextEl = block.querySelector('[data-aue-prop="copyrightText"]');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'footer-brand-primary';
  footerBrandPrimary.style.backgroundColor = 'transparent';

  const footerContainerPrimary = document.createElement('div');
  footerContainerPrimary.className = 'footer-container';

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'footer-brand-primary-content';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'footer-brand-left';

  if (primaryLogoEl) {
    const primaryLogoWrapper = document.createElement('a');
    primaryLogoWrapper.className = 'footer-brand-logo analytics_cta_click';
    primaryLogoWrapper.setAttribute('data-cta-region', 'Footer');
    primaryLogoWrapper.setAttribute('aria-label', primaryLogoEl.alt || 'Logo');
    if (primaryLogoLinkEl && primaryLogoLinkEl.href) {
      primaryLogoWrapper.href = primaryLogoLinkEl.href;
      primaryLogoWrapper.target = '_blank';
    } else if (primaryLogoEl.closest('a')) {
      const originalLink = primaryLogoEl.closest('a');
      primaryLogoWrapper.href = originalLink.href;
      primaryLogoWrapper.target = originalLink.target;
      originalLink.replaceWith(primaryLogoWrapper);
    }

    const picture = createOptimizedPicture(primaryLogoEl.src, primaryLogoEl.alt, false, [{ width: '100vw' }]);
    picture.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
    picture.querySelector('img').loading = 'lazy';
    primaryLogoWrapper.append(picture);
    footerBrandLeft.append(primaryLogoWrapper);
    moveInstrumentation(primaryLogoEl, primaryLogoWrapper);
    if (primaryLogoLinkEl) {
      moveInstrumentation(primaryLogoLinkEl, primaryLogoWrapper);
    }
  }

  if (secondaryLogoEl) {
    const secondaryLogoWrapper = document.createElement('div');
    secondaryLogoWrapper.className = 'footer-brand-secondary-logo';
    const picture = createOptimizedPicture(secondaryLogoEl.src, secondaryLogoEl.alt, false, [{ width: '100vw' }]);
    picture.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-no-rendition';
    picture.querySelector('img').loading = 'lazy';
    secondaryLogoWrapper.append(picture);
    footerBrandLeft.append(secondaryLogoWrapper);
    moveInstrumentation(secondaryLogoEl, secondaryLogoWrapper);
  }

  footerBrandPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'footer-brand-right';

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.className = 'footer-brand-navbar';
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.className = 'footer-brand-navbar-left';

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.className = 'footer-brand-navbar-right';

  const linkGroups = [[], [], [], []];
  footerLinksEls.forEach((linkEl, index) => {
    const link = linkEl.querySelector('[data-aue-prop="link"]');
    const label = linkEl.querySelector('[data-aue-prop="label"]');
    if (link && label) {
      const listItem = document.createElement('li');
      listItem.className = 'footer-list-item';

      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = label.textContent;
      anchor.className = 'footer-cta-analytics analytics_cta_click footer-list-item-link';
      anchor.setAttribute('data-link-region', 'Footer List');
      if (link.target) {
        anchor.target = link.target;
      }
      listItem.append(anchor);
      moveInstrumentation(link, anchor);
      moveInstrumentation(label, anchor);
      linkGroups[index % 4].push(listItem);
      moveInstrumentation(linkEl, listItem);
    }
  });

  linkGroups.forEach((group, groupIndex) => {
    if (group.length > 0) {
      const listWrapper = document.createElement('div');
      listWrapper.className = 'footer-list-wrapper';
      const ul = document.createElement('ul');
      ul.className = 'footer-list';
      group.forEach(item => ul.append(item));
      listWrapper.append(ul);
      if (groupIndex < 2) {
        footerBrandNavbarLeft.append(listWrapper);
      } else {
        footerBrandNavbarRight.append(listWrapper);
      }
    }
  });

  footerBrandNavbar.append(footerBrandNavbarLeft, footerBrandNavbarRight);
  footerBrandRight.append(footerBrandNavbar);
  footerBrandPrimaryContent.append(footerBrandRight);
  footerContainerPrimary.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerContainerPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'footer-brand-secondary';
  footerBrandSecondary.style.backgroundColor = 'transparent';

  const footerContainerSecondary = document.createElement('div');
  footerContainerSecondary.className = 'footer-container';

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'footer-brand-secondary-content';

  const footerBrandRightSocial = document.createElement('section');
  footerBrandRightSocial.className = 'footer-brand-right-social';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'footer-social-media-title';
  socialTitle.textContent = 'Follow Us On';
  footerBrandRightSocial.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'footer-brand-right-list';

  footerSocialsEls.forEach(socialEl => {
    const socialLink = socialEl.querySelector('[data-aue-prop="socialLink"]');
    const icon = socialEl.querySelector('[data-aue-prop="icon"]');

    if (socialLink && icon) {
      const listItem = document.createElement('li');
      listItem.className = 'footer-brand-right-item';

      const anchor = document.createElement('a');
      anchor.href = socialLink.href;
      anchor.className = 'footer-brand-right-link analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
      anchor.target = '_blank';
      anchor.setAttribute('data-platform-name', icon.alt.toLowerCase());
      anchor.setAttribute('data-social-linktype', 'follow');

      const picture = createOptimizedPicture(icon.src, icon.alt, false, [{ width: '100vw' }]);
      picture.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
      picture.querySelector('img').loading = 'lazy';
      picture.querySelector('img').setAttribute('aria-label', icon.alt);
      anchor.append(picture);
      listItem.append(anchor);
      socialList.append(listItem);
      moveInstrumentation(socialLink, anchor);
      moveInstrumentation(icon, anchor);
      moveInstrumentation(socialEl, listItem);
    }
  });

  footerBrandRightSocial.append(socialList);
  footerBrandSecondaryContent.append(footerBrandRightSocial);

  const footerBrandLeftCopyright = document.createElement('section');
  footerBrandLeftCopyright.className = 'footer-brand-left-copyright';

  if (copyrightLinkEl) {
    const copyrightList = document.createElement('ul');
    copyrightList.className = 'footer-brand-left-list';
    const copyrightListItem = document.createElement('li');
    copyrightListItem.className = 'footer-brand-left-item footer-foot-link';
    const copyrightAnchor = document.createElement('a');
    copyrightAnchor.href = copyrightLinkEl.href;
    copyrightAnchor.target = '_blank';
    copyrightAnchor.className = 'footer-brand-left-link analytics_cta_click';
    copyrightAnchor.setAttribute('data-cta-region', 'Footer');
    copyrightAnchor.textContent = copyrightLinkEl.textContent;
    copyrightListItem.append(copyrightAnchor);
    copyrightList.append(copyrightListItem);
    footerBrandLeftCopyright.append(copyrightList);
    moveInstrumentation(copyrightLinkEl, copyrightAnchor);
  }

  if (copyrightTextEl) {
    const copyrightTextWrapper = document.createElement('div');
    copyrightTextWrapper.className = 'footer-brand-left-copyright-text';
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'footer-brand-left-text footer-text-white';
    copyrightSpan.textContent = copyrightTextEl.textContent;
    copyrightTextWrapper.append(copyrightSpan);
    footerBrandLeftCopyright.append(copyrightTextWrapper);
    moveInstrumentation(copyrightTextEl, copyrightSpan);
  }

  footerBrandSecondaryContent.append(footerBrandLeftCopyright);
  footerContainerSecondary.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerContainerSecondary);

  block.textContent = '';
  block.append(footerBrandPrimary, footerBrandSecondary);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}