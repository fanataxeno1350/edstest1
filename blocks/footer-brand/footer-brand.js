import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.className = 'footer-brand-wrapper footer-w-100 footer-brand-bg-boing-neutral-gray-600';
  footerBrandWrapper.setAttribute('data-isdoodlevariation', 'false');
  moveInstrumentation(block.children[0], footerBrandWrapper);

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand-primary';
  footerBrandWrapper.append(primarySection);

  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'footer-container';
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand-primary-content footer-d-flex footer-flex-column footer-flex-md-row footer-justify-content-md-between footer-align-items-center';
  primaryContainer.append(primaryContent);

  const brandLeft = document.createElement('section');
  brandLeft.className = 'footer-brand-left footer-d-flex footer-brand-gap-16 footer-px-10 footer-align-items-center footer-justify-content-center';
  primaryContent.append(brandLeft);

  // Primary Logo
  const primaryLogoLink = block.querySelector('.footer-brand-logo');
  if (primaryLogoLink) {
    const newPrimaryLogoLink = document.createElement('a');
    newPrimaryLogoLink.href = primaryLogoLink.href;
    newPrimaryLogoLink.target = primaryLogoLink.target;
    newPrimaryLogoLink.className = 'footer-brand-logo footer-d-inline-block footer-analytics_cta_click';
    newPrimaryLogoLink.setAttribute('data-cta-region', 'Footer');
    newPrimaryLogoLink.setAttribute('aria-label', 'ITC Logo');
    const primaryLogoImg = primaryLogoLink.querySelector('img');
    if (primaryLogoImg) {
      const optimizedPrimaryPic = createOptimizedPicture(primaryLogoImg.src, primaryLogoImg.alt);
      optimizedPrimaryPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-w-100 footer-h-100 footer-brand-no-rendition';
      optimizedPrimaryPic.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(primaryLogoImg, optimizedPrimaryPic.querySelector('img'));
      newPrimaryLogoLink.append(optimizedPrimaryPic);
    }
    brandLeft.append(newPrimaryLogoLink);
  }

  // Secondary Logo
  const secondaryLogoDiv = block.querySelector('.footer-brand-secondary-logo');
  if (secondaryLogoDiv) {
    const newSecondaryLogoDiv = document.createElement('div');
    newSecondaryLogoDiv.className = 'footer-brand-secondary-logo footer-d-inline-block';
    const secondaryLogoImg = secondaryLogoDiv.querySelector('img');
    if (secondaryLogoImg) {
      const optimizedSecondaryPic = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
      optimizedSecondaryPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-w-100 footer-brand-no-rendition';
      optimizedSecondaryPic.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(secondaryLogoImg, optimizedSecondaryPic.querySelector('img'));
      newSecondaryLogoDiv.append(optimizedSecondaryPic);
    }
    brandLeft.append(newSecondaryLogoDiv);
  }

  const brandRight = document.createElement('section');
  brandRight.className = 'footer-brand-right';
  primaryContent.append(brandRight);

  const navbar = document.createElement('nav');
  navbar.className = 'footer-brand-navbar footer-d-grid footer-d-md-flex';
  navbar.setAttribute('aria-label', 'footer navbar');
  brandRight.append(navbar);

  const navbarLeft = document.createElement('div');
  navbarLeft.className = 'footer-brand-navbar-left footer-d-flex footer-flex-column footer-flex-md-row';
  navbar.append(navbarLeft);

  // Footer Link Columns (Left)
  const footerLinkColumnsLeft = block.querySelectorAll('.footer-brand-navbar-left .footer-list-wrapper');
  footerLinkColumnsLeft.forEach((col) => {
    const newColWrapper = document.createElement('div');
    newColWrapper.className = 'footer-list-wrapper';
    const ul = document.createElement('ul');
    ul.className = 'footer-list footer-d-flex footer-align-items-center footer-justify-content-center footer-align-items-md-start footer-flex-column';
    [...col.querySelectorAll('.footer-list-item')].forEach((item) => {
      const li = document.createElement('li');
      li.className = 'footer-list-item';
      const link = item.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        newLink.className = 'footer-cta-analytics footer-analytics_cta_click footer-list-item-link footer-d-inline-block';
        newLink.setAttribute('data-link-region', 'Footer List');
        if (link.target) newLink.target = link.target;
        moveInstrumentation(link, newLink);
        li.append(newLink);
      }
      ul.append(li);
    });
    newColWrapper.append(ul);
    navbarLeft.append(newColWrapper);
  });

  const navbarRight = document.createElement('div');
  navbarRight.className = 'footer-brand-navbar-right footer-d-flex footer-flex-column footer-flex-md-row';
  navbar.append(navbarRight);

  // Footer Link Columns (Right)
  const footerLinkColumnsRight = block.querySelectorAll('.footer-brand-navbar-right .footer-list-wrapper');
  footerLinkColumnsRight.forEach((col) => {
    const newColWrapper = document.createElement('div');
    newColWrapper.className = 'footer-list-wrapper';
    const ul = document.createElement('ul');
    ul.className = 'footer-list footer-d-flex footer-align-items-center footer-justify-content-center footer-align-items-md-start footer-flex-column';
    [...col.querySelectorAll('.footer-list-item')].forEach((item) => {
      const li = document.createElement('li');
      li.className = 'footer-list-item';
      const link = item.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        newLink.className = 'footer-cta-analytics footer-analytics_cta_click footer-list-item-link footer-d-inline-block';
        newLink.setAttribute('data-link-region', 'Footer List');
        if (link.target) newLink.target = link.target;
        moveInstrumentation(link, newLink);
        li.append(newLink);
      }
      ul.append(li);
    });
    newColWrapper.append(ul);
    navbarRight.append(newColWrapper);
  });

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand-secondary';
  footerBrandWrapper.append(secondarySection);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'footer-container';
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand-secondary-content footer-d-flex footer-flex-column footer-justify-content-md-between footer-align-items-center';
  secondaryContainer.append(secondaryContent);

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'footer-brand-right footer-d-flex footer-flex-column footer-pb-5';
  secondaryContent.append(socialMediaSection);

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'footer-social-media-title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'footer-brand-right-list footer-d-flex footer-align-items-center footer-justify-content-center footer-px-10 footer-flex-wrap';
  socialMediaSection.append(socialMediaList);

  // Social Links
  const socialLinks = block.querySelectorAll('.footer-brand-right-item');
  socialLinks.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'footer-brand-right-item footer-d-flex footer-justify-content-center footer-align-items-center';
    const link = item.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = link.target;
      newLink.className = 'footer-brand-right-link footer-d-flex footer-justify-content-center footer-align-items-center footer-analytics_cta_click';
      newLink.setAttribute('data-cta-region', link.getAttribute('data-cta-region'));
      newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));
      newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name'));
      newLink.setAttribute('data-social-linktype', link.getAttribute('data-social-linktype'));
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-w-100 footer-h-100 footer-brand-no-rendition';
        optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
        optimizedPic.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label'));
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        newLink.append(optimizedPic);
      }
      moveInstrumentation(link, newLink);
      li.append(newLink);
    }
    socialMediaList.append(li);
  });

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'footer-brand-left footer-py-5 footer-d-flex footer-flex-column footer-brand-gap-3';
  secondaryContent.append(copyrightSection);

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'footer-brand-left-list footer-d-flex footer-align-items-center footer-justify-content-center footer-flex-wrap';
  copyrightSection.append(copyrightList);

  // Footer Left Link
  const footerLeftLinkItem = block.querySelector('.footer-brand-left-item.footer-foot-link');
  if (footerLeftLinkItem) {
    const li = document.createElement('li');
    li.className = 'footer-brand-left-item footer-foot-link';
    const link = footerLeftLinkItem.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = link.target;
      newLink.textContent = link.textContent.trim();
      newLink.className = 'footer-brand-left-link footer-analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      moveInstrumentation(link, newLink);
      li.append(newLink);
    }
    copyrightList.append(li);
  }

  // Copyright Text
  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand-left-copyright footer-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'footer-brand-left-text footer-text-white';
  const copyrightText = block.querySelector('.footer-brand-left-copyright .footer-brand-left-text');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);

  block.textContent = '';
  block.append(footerBrandWrapper);
}
