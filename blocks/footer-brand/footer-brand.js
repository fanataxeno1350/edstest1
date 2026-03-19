import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrand = document.createElement('div');
  footerBrand.className = 'footer-brand w-100 bg-boing-neutral-gray-600';

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand__primary';
  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'container';
  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand__primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const leftSection = document.createElement('section');
  leftSection.className = 'footer-brand__left d-flex gap-16 px-10 align-items-center justify-content-center';

  const itcLogoLink = block.querySelector('[data-aue-prop="itcLogo"]');
  if (itcLogoLink) {
    const itcLogoImg = itcLogoLink.querySelector('img');
    if (itcLogoImg) {
      const picture = createOptimizedPicture(itcLogoImg.src, itcLogoImg.alt);
      const itcLogoWrapper = document.createElement('a');
      itcLogoWrapper.href = itcLogoLink.href;
      itcLogoWrapper.target = '_blank';
      itcLogoWrapper.className = 'footer-brand__logo d-inline-block analytics_cta_click';
      itcLogoWrapper.setAttribute('data-cta-region', 'Footer');
      itcLogoWrapper.setAttribute('aria-label', 'ITC Logo');
      itcLogoWrapper.append(picture);
      leftSection.append(itcLogoWrapper);
      moveInstrumentation(itcLogoLink, itcLogoWrapper);
    }
  }

  const fssiLogoDiv = block.querySelector('[data-aue-prop="fssiLogo"]');
  if (fssiLogoDiv) {
    const fssiLogoImg = fssiLogoDiv.querySelector('img');
    if (fssiLogoImg) {
      const picture = createOptimizedPicture(fssiLogoImg.src, fssiLogoImg.alt);
      const fssiLogoWrapper = document.createElement('div');
      fssiLogoWrapper.className = 'footer-brand__secondary--logo d-inline-block';
      fssiLogoWrapper.append(picture);
      leftSection.append(fssiLogoWrapper);
      moveInstrumentation(fssiLogoDiv, fssiLogoWrapper);
    }
  }

  const rightSection = document.createElement('section');
  rightSection.className = 'footer-brand__right';
  const nav = document.createElement('nav');
  nav.className = 'footer-brand__navbar d-grid d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');
  const navLeft = document.createElement('div');
  navLeft.className = 'footer-brand__navbar--left d-flex flex-column flex-md-row ';
  const navRight = document.createElement('div');
  navRight.className = 'footer-brand__navbar--right d-flex flex-column flex-md-row';

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const linkColumns = [[], [], [], []]; // Group links into 4 columns
  footerLinks.forEach((linkNode, index) => {
    const link = linkNode.querySelector('a');
    if (link) {
      const listItem = document.createElement('li');
      listItem.className = 'footer-list__item';
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent;
      linkElement.className = 'cta-analytics analytics_cta_click footer-list__item--link d-inline-block';
      linkElement.setAttribute('data-link-region', 'Footer List');
      if (link.target) {
        linkElement.target = link.target;
      }
      listItem.append(linkElement);
      moveInstrumentation(linkNode, listItem);
      linkColumns[index % 4].push(listItem);
    }
  });

  linkColumns.forEach((column, colIndex) => {
    if (column.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'footerList';
      const ul = document.createElement('ul');
      ul.className = 'footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
      column.forEach(item => ul.append(item));
      footerListDiv.append(ul);
      if (colIndex < 2) {
        navLeft.append(footerListDiv);
      } else {
        navRight.append(footerListDiv);
      }
    }
  });

  nav.append(navLeft, navRight);
  rightSection.append(nav);
  primaryContent.append(leftSection, rightSection);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand__secondary';
  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'container';
  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand__secondary--content d-flex flex-column  justify-content-md-between align-items-center';

  const socialMediaRightSection = document.createElement('section');
  socialMediaRightSection.className = 'footer-brand__right d-flex flex-column pb-5';
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'footer-brand__right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((socialLinkNode) => {
    const link = socialLinkNode.querySelector('a');
    const iconImg = socialLinkNode.querySelector('img');
    if (link && iconImg) {
      const listItem = document.createElement('li');
      listItem.className = 'footer-brand__right--item d-flex justify-content-center align-items-center';
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.target = '_blank';
      linkElement.className = 'footer-brand__right--link d-flex justify-content-center align-items-center analytics_cta_click';
      linkElement.setAttribute('data-cta-region', 'Footer');
      linkElement.setAttribute('data-cta-label', `footer-${iconImg.alt.toLowerCase()}`);
      linkElement.setAttribute('data-platform-name', iconImg.alt.toLowerCase());
      linkElement.setAttribute('data-social-linktype', 'follow');
      const picture = createOptimizedPicture(iconImg.src, iconImg.alt);
      linkElement.append(picture);
      listItem.append(linkElement);
      socialMediaList.append(listItem);
      moveInstrumentation(socialLinkNode, listItem);
    }
  });

  socialMediaRightSection.append(socialMediaTitle, socialMediaList);

  const copyrightLeftSection = document.createElement('section');
  copyrightLeftSection.className = 'footer-brand__left py-5 d-flex flex-column gap-3';
  const copyrightList = document.createElement('ul');
  copyrightList.className = 'footer-brand__left--list d-flex align-items-center justify-content-center flex-wrap';

  const itcPortalLinkNode = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLinkNode) {
    const link = itcPortalLinkNode.querySelector('a');
    if (link) {
      const listItem = document.createElement('li');
      listItem.className = 'footer-brand__left--item foot_link';
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.target = '_blank';
      linkElement.className = 'footer-brand__left--link analytics_cta_click';
      linkElement.setAttribute('data-cta-region', 'Footer');
      linkElement.textContent = link.textContent;
      listItem.append(linkElement);
      copyrightList.append(listItem);
      moveInstrumentation(itcPortalLinkNode, listItem);
    }
  }

  const copyrightTextDiv = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightTextDiv) {
    const copyrightTextSpan = document.createElement('span');
    copyrightTextSpan.className = 'footer-brand__left--text text-white';
    copyrightTextSpan.textContent = copyrightTextDiv.textContent.trim();
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'footer-brand__left--copyright text-center ';
    copyrightDiv.append(copyrightTextSpan);
    copyrightLeftSection.append(copyrightList, copyrightDiv);
    moveInstrumentation(copyrightTextDiv, copyrightDiv);
  }

  secondaryContent.append(socialMediaRightSection, copyrightLeftSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  footerBrand.append(primarySection, secondarySection);

  block.textContent = '';
  block.append(footerBrand);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
