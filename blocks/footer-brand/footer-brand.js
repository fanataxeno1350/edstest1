import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-container';
  moveInstrumentation(block.querySelector('.footer-container'), footerContainer);

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'footer-brand-primary-content';
  moveInstrumentation(block.querySelector('.footer-brand-primary-content'), footerBrandPrimaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'footer-brand-left';
  moveInstrumentation(block.querySelector('.footer-brand-left'), footerBrandLeft);

  const mainLogoLink = block.querySelector('[data-aue-prop="mainLogo"]');
  if (mainLogoLink) {
    const mainLogoImg = mainLogoLink.querySelector('img');
    if (mainLogoImg) {
      const picture = createOptimizedPicture(mainLogoImg.src, mainLogoImg.alt);
      mainLogoLink.innerHTML = '';
      mainLogoLink.append(picture);
      moveInstrumentation(mainLogoImg, picture);
    }
    footerBrandLeft.append(mainLogoLink);
  }

  const secondaryLogoWrapper = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogoWrapper) {
    const secondaryLogoImg = secondaryLogoWrapper.querySelector('img');
    if (secondaryLogoImg) {
      const picture = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
      secondaryLogoWrapper.innerHTML = '';
      secondaryLogoWrapper.append(picture);
      moveInstrumentation(secondaryLogoImg, picture);
    }
    footerBrandLeft.append(secondaryLogoWrapper);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'footer-brand-right';
  moveInstrumentation(block.querySelector('.footer-brand-right'), footerBrandRight);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.className = 'footer-brand-navbar';
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  moveInstrumentation(block.querySelector('.footer-brand-navbar'), footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.className = 'footer-brand-navbar-left';
  moveInstrumentation(block.querySelector('.footer-brand-navbar-left'), footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.className = 'footer-brand-navbar-right';
  moveInstrumentation(block.querySelector('.footer-brand-navbar-right'), footerBrandNavbarRight);

  const footerNavLinks = block.querySelectorAll('[data-aue-model="footerNavLink"]');
  let currentLeftListWrapper = null;
  let currentRightListWrapper = null;
  let leftCount = 0;
  let rightCount = 0;

  footerNavLinks.forEach((linkNode, index) => {
    const linkWrapper = document.createElement('div');
    linkWrapper.className = 'footer-list-wrapper';
    const ul = document.createElement('ul');
    ul.className = 'footer-list';
    const li = document.createElement('li');
    li.className = 'footer-list-item';

    const url = linkNode.querySelector('[data-aue-prop="url"]');
    const label = linkNode.querySelector('[data-aue-prop="label"]');

    if (url && label) {
      const a = document.createElement('a');
      a.href = url.textContent.trim();
      a.textContent = label.textContent.trim();
      a.className = 'footer-cta-analytics analytics_cta_click footer-list-item-link';
      a.setAttribute('data-link-region', 'Footer List');
      if (a.href.startsWith('http')) {
        a.target = '_blank';
      }
      li.append(a);
      moveInstrumentation(url, a);
      moveInstrumentation(label, a);
    }

    ul.append(li);
    linkWrapper.append(ul);
    moveInstrumentation(linkNode, li);

    // Distribute links into left and right columns, 2 wrappers each
    if (index < footerNavLinks.length / 2) {
      if (leftCount % 3 === 0) {
        currentLeftListWrapper = document.createElement('div');
        currentLeftListWrapper.className = 'footer-list-wrapper';
        footerBrandNavbarLeft.append(currentLeftListWrapper);
      }
      currentLeftListWrapper.querySelector('ul') ? currentLeftListWrapper.querySelector('ul').append(li) : currentLeftListWrapper.append(ul);
      leftCount++;
    } else {
      if (rightCount % 3 === 0) {
        currentRightListWrapper = document.createElement('div');
        currentRightListWrapper.className = 'footer-list-wrapper';
        footerBrandNavbarRight.append(currentRightListWrapper);
      }
      currentRightListWrapper.querySelector('ul') ? currentRightListWrapper.querySelector('ul').append(li) : currentRightListWrapper.append(ul);
      rightCount++;
    }
  });

  footerBrandNavbar.append(footerBrandNavbarLeft, footerBrandNavbarRight);
  footerBrandRight.append(footerBrandNavbar);
  footerBrandPrimaryContent.append(footerBrandLeft, footerBrandRight);

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'footer-brand-primary';
  footerBrandPrimary.style.backgroundColor = 'transparent';
  footerBrandPrimary.append(footerContainer);
  footerContainer.append(footerBrandPrimaryContent);
  moveInstrumentation(block.querySelector('.footer-brand-primary'), footerBrandPrimary);

  // Footer Brand Secondary
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'footer-brand-secondary';
  footerBrandSecondary.style.backgroundColor = 'transparent';
  moveInstrumentation(block.querySelector('.footer-brand-secondary'), footerBrandSecondary);

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'footer-container';
  moveInstrumentation(block.querySelector('.footer-brand-secondary .footer-container'), footerSecondaryContainer);

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'footer-brand-secondary-content';
  moveInstrumentation(block.querySelector('.footer-brand-secondary-content'), footerBrandSecondaryContent);

  const footerBrandRightSocial = document.createElement('section');
  footerBrandRightSocial.className = 'footer-brand-right-social';
  moveInstrumentation(block.querySelector('.footer-brand-right-social'), footerBrandRightSocial);

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'footer-social-media-title';
  socialTitle.textContent = 'Follow Us On';
  moveInstrumentation(block.querySelector('.footer-social-media-title'), socialTitle);
  footerBrandRightSocial.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'footer-brand-right-list';
  moveInstrumentation(block.querySelector('.footer-brand-right-list'), socialList);

  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  footerSocialLinks.forEach((socialLinkNode) => {
    const socialListItem = document.createElement('li');
    socialListItem.className = 'footer-brand-right-item';

    const url = socialLinkNode.querySelector('[data-aue-prop="url"]');
    const icon = socialLinkNode.querySelector('[data-aue-prop="icon"]');
    const platform = socialLinkNode.querySelector('[data-aue-prop="platform"]');

    if (url && icon && platform) {
      const a = document.createElement('a');
      a.href = url.textContent.trim();
      a.className = 'footer-brand-right-link analytics_cta_click';
      a.setAttribute('data-cta-region', 'Footer');
      a.setAttribute('data-cta-label', `footer-${platform.textContent.trim().toLowerCase()}`);
      a.target = '_blank';
      a.setAttribute('data-platform-name', platform.textContent.trim().toLowerCase());
      a.setAttribute('data-social-linktype', 'follow');

      const img = icon.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt || platform.textContent.trim());
        picture.querySelector('img').setAttribute('aria-label', platform.textContent.trim().toLowerCase());
        a.append(picture);
        moveInstrumentation(img, picture);
      }
      socialListItem.append(a);
      moveInstrumentation(url, a);
      moveInstrumentation(icon, a);
      moveInstrumentation(platform, a);
    }
    socialList.append(socialListItem);
    moveInstrumentation(socialLinkNode, socialListItem);
  });
  footerBrandRightSocial.append(socialList);

  const footerBrandLeftCopyright = document.createElement('section');
  footerBrandLeftCopyright.className = 'footer-brand-left-copyright';
  moveInstrumentation(block.querySelector('.footer-brand-left-copyright'), footerBrandLeftCopyright);

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'footer-brand-left-list';
  moveInstrumentation(block.querySelector('.footer-brand-left-list'), copyrightList);

  const itcPortalLinkNode = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLinkNode) {
    const itcListItem = document.createElement('li');
    itcListItem.className = 'footer-brand-left-item footer-foot-link';
    const itcLink = itcPortalLinkNode.querySelector('a');
    if (itcLink) {
      itcListItem.append(itcLink);
      moveInstrumentation(itcPortalLinkNode, itcListItem);
    }
    copyrightList.append(itcListItem);
  }

  const copyrightTextDiv = document.createElement('div');
  copyrightTextDiv.className = 'footer-brand-left-copyright-text';
  moveInstrumentation(block.querySelector('.footer-brand-left-copyright-text'), copyrightTextDiv);

  const copyrightTextSpan = document.createElement('span');
  copyrightTextSpan.className = 'footer-brand-left-text footer-text-white';
  const copyrightTextContent = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightTextContent) {
    copyrightTextSpan.textContent = copyrightTextContent.textContent.trim();
    moveInstrumentation(copyrightTextContent, copyrightTextSpan);
  } else {
    // Fallback if data-aue-prop is not found
    const authoredCopyrightSpan = block.querySelector('.footer-brand-left-copyright-text span');
    if (authoredCopyrightSpan) {
      copyrightTextSpan.textContent = authoredCopyrightSpan.textContent.trim();
      moveInstrumentation(authoredCopyrightSpan, copyrightTextSpan);
    }
  }
  copyrightTextDiv.append(copyrightTextSpan);
  copyrightList.append(copyrightTextDiv);
  footerBrandLeftCopyright.append(copyrightList, copyrightTextDiv);

  footerBrandSecondaryContent.append(footerBrandRightSocial, footerBrandLeftCopyright);
  footerSecondaryContainer.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerSecondaryContainer);

  block.textContent = '';
  block.append(footerBrandPrimary, footerBrandSecondary);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
