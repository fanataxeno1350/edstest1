import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const primarySection = document.createElement('section');
  primarySection.classList.add('brand-footer__primary');

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container');
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('brand-footer__primary--content');
  primaryContainer.append(primaryContent);

  const leftSection = document.createElement('section');
  leftSection.classList.add('brand-footer__left');
  primaryContent.append(leftSection);

  const logo1Wrapper = document.querySelector('[data-aue-prop="logo1"]');
  if (logo1Wrapper) {
    const link = logo1Wrapper.querySelector('a');
    const img = logo1Wrapper.querySelector('img');
    if (link && img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      const logoLink = document.createElement('a');
      logoLink.href = link.href;
      if (link.target) logoLink.target = link.target;
      if (link.getAttribute('aria-label')) logoLink.setAttribute('aria-label', link.getAttribute('aria-label'));
      logoLink.classList.add('brand-footer__logo');
      logoLink.append(picture);
      leftSection.append(logoLink);
      moveInstrumentation(logo1Wrapper, logoLink);
    }
  }

  const logo2Wrapper = document.querySelector('[data-aue-prop="logo2"]');
  if (logo2Wrapper) {
    const img = logo2Wrapper.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      const logoDiv = document.createElement('div');
      logoDiv.classList.add('brand-footer__secondary--logo');
      logoDiv.append(picture);
      leftSection.append(logoDiv);
      moveInstrumentation(logo2Wrapper, logoDiv);
    }
  }

  const rightSection = document.createElement('section');
  rightSection.classList.add('brand-footer__right');
  primaryContent.append(rightSection);

  const nav = document.createElement('nav');
  nav.classList.add('brand-footer__navbar');
  nav.setAttribute('aria-label', 'footer navbar');
  rightSection.append(nav);

  const navLeft = document.createElement('div');
  navLeft.classList.add('brand-footer__navbar--left');
  nav.append(navLeft);

  const navRight = document.createElement('div');
  navRight.classList.add('brand-footer__navbar--right');
  nav.append(navRight);

  const navigationColumns = block.querySelectorAll('[data-aue-model="footerNavColumn"]');
  navigationColumns.forEach((columnNode, index) => {
    const listDiv = document.createElement('div');
    listDiv.classList.add('footerList-footer');
    const ul = document.createElement('ul');
    ul.classList.add('list-footer');
    listDiv.append(ul);

    const links = columnNode.querySelectorAll('[data-aue-model="footerNavLink"]');
    links.forEach((linkNode) => {
      const li = document.createElement('li');
      li.classList.add('list-footer__item');
      const a = linkNode.querySelector('a');
      if (a) {
        const link = document.createElement('a');
        link.href = a.href;
        if (a.target) link.target = a.target;
        link.textContent = a.textContent.trim();
        link.classList.add('list-footer__item--link');
        li.append(link);
      }
      ul.append(li);
      moveInstrumentation(linkNode, li);
    });
    if (index < 2) {
      navLeft.append(listDiv);
    } else {
      navRight.append(listDiv);
    }
    moveInstrumentation(columnNode, listDiv);
  });

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('brand-footer__secondary');

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('brand-footer__secondary--content');
  secondaryContainer.append(secondaryContent);

  const socialRightSection = document.createElement('section');
  socialRightSection.classList.add('brand-footer__right');
  secondaryContent.append(socialRightSection);

  const socialTitle = document.createElement('h3');
  socialTitle.textContent = 'Follow Us On';
  socialTitle.classList.add('social_media-footer--title');
  socialRightSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('brand-footer__right--list');
  socialRightSection.append(socialList);

  const socialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  socialLinks.forEach((socialLinkNode) => {
    const li = document.createElement('li');
    li.classList.add('brand-footer__right--item');

    const a = socialLinkNode.querySelector('a');
    const img = socialLinkNode.querySelector('img');

    if (a && img) {
      const link = document.createElement('a');
      link.href = a.href;
      if (a.target) link.target = a.target;
      if (a.getAttribute('aria-label')) link.setAttribute('aria-label', a.getAttribute('aria-label'));
      link.classList.add('brand-footer__right--link');

      const picture = createOptimizedPicture(img.src, img.alt);
      link.append(picture);
      li.append(link);
    }
    socialList.append(li);
    moveInstrumentation(socialLinkNode, li);
  });

  const copyrightLeftSection = document.createElement('section');
  copyrightLeftSection.classList.add('brand-footer__left');
  secondaryContent.append(copyrightLeftSection);

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('brand-footer__left--list');
  copyrightLeftSection.append(copyrightList);

  const itcPortalLinkWrapper = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLinkWrapper) {
    const a = itcPortalLinkWrapper.querySelector('a');
    if (a) {
      const li = document.createElement('li');
      li.classList.add('brand-footer__left--item', 'foot_link-footer');
      const link = document.createElement('a');
      link.href = a.href;
      if (a.target) link.target = a.target;
      link.textContent = a.textContent.trim();
      link.classList.add('brand-footer__left--link');
      li.append(link);
      copyrightList.append(li);
      moveInstrumentation(itcPortalLinkWrapper, li);
    }
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('brand-footer__left--copyright');
  copyrightLeftSection.append(copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('brand-footer__left--text');
  const copyrightText = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  }
  copyrightDiv.append(copyrightSpan);

  block.textContent = '';
  block.append(primarySection, secondarySection);
  block.classList.add('footer-brand');
  block.dataset.blockStatus = 'loaded';
}
