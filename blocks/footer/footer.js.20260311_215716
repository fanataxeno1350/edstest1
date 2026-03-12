import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const primarySection = document.createElement('section');
  primarySection.classList.add('brand-footer__primary');

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container');
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('brand-footer__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');
  primaryContainer.append(primaryContent);

  const leftSection = document.createElement('section');
  leftSection.classList.add('brand-footer__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');
  primaryContent.append(leftSection);

  const logoLink = block.querySelector('[data-aue-prop="logo"]');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.classList.add('brand-footer__logo', 'd-inline-block', 'analytics_cta_click');
    logoAnchor.href = logoLink.href;
    logoAnchor.target = logoLink.target;
    logoAnchor.setAttribute('aria-label', 'ITC Logo');

    const logoImg = logoLink.querySelector('img');
    if (logoImg) {
      const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
      logoAnchor.append(picture);
      moveInstrumentation(logoImg, picture);
    }
    leftSection.append(logoAnchor);
    moveInstrumentation(logoLink, logoAnchor);
  }

  const secondaryLogoDiv = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogoDiv) {
    const secondaryLogoWrapper = document.createElement('div');
    secondaryLogoWrapper.classList.add('brand-footer__secondary--logo', 'd-inline-block');

    const secondaryLogoImg = secondaryLogoDiv.querySelector('img');
    if (secondaryLogoImg) {
      const picture = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
      secondaryLogoWrapper.append(picture);
      moveInstrumentation(secondaryLogoImg, picture);
    }
    leftSection.append(secondaryLogoWrapper);
    moveInstrumentation(secondaryLogoDiv, secondaryLogoWrapper);
  }

  const rightSection = document.createElement('section');
  rightSection.classList.add('brand-footer__right');
  primaryContent.append(rightSection);

  const nav = document.createElement('nav');
  nav.classList.add('brand-footer__navbar', 'd-grid', 'd-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');
  rightSection.append(nav);

  const navLeft = document.createElement('div');
  navLeft.classList.add('brand-footer__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  nav.append(navLeft);

  const navRight = document.createElement('div');
  navRight.classList.add('brand-footer__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  nav.append(navRight);

  const footerLinkLists = block.querySelectorAll('[data-aue-model="footerLinkList"]');
  footerLinkLists.forEach((listNode, index) => {
    const listWrapper = document.createElement('div');
    listWrapper.classList.add('footerList-footer');

    const ul = document.createElement('ul');
    ul.classList.add('list-footer', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
    listWrapper.append(ul);

    const links = listNode.querySelectorAll('[data-aue-model="footerLink"]');
    links.forEach((linkNode) => {
      const li = document.createElement('li');
      li.classList.add('list-footer__item');

      const link = document.createElement('a');
      link.classList.add('cta-analytics', 'analytics_cta_click', 'list-footer__item--link', 'd-inline-block');
      link.setAttribute('data-link-region', 'Footer List');

      const url = linkNode.querySelector('[data-aue-prop="url"]');
      if (url) {
        link.href = url.href;
        if (url.target) link.target = url.target;
        moveInstrumentation(url, link);
      }

      const text = linkNode.querySelector('[data-aue-prop="text"]');
      if (text) {
        link.textContent = text.textContent;
        moveInstrumentation(text, link);
      } else if (url) {
        link.textContent = url.textContent;
      }

      li.append(link);
      ul.append(li);
      moveInstrumentation(linkNode, li);
    });

    if (index < 2) {
      navLeft.append(listWrapper);
    } else {
      navRight.append(listWrapper);
    }
    moveInstrumentation(listNode, listWrapper);
  });

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('brand-footer__secondary');

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('brand-footer__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');
  secondaryContainer.append(secondaryContent);

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('brand-footer__right', 'd-flex', 'flex-column', 'pb-5');
  secondaryContent.append(socialMediaSection);

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('social_media-footer--title');
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('brand-footer__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');
  socialMediaSection.append(socialList);

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((socialLinkNode) => {
    const li = document.createElement('li');
    li.classList.add('brand-footer__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const anchor = document.createElement('a');
    anchor.classList.add('brand-footer__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
    anchor.setAttribute('data-cta-region', 'Footer');

    const url = socialLinkNode.querySelector('[data-aue-prop="url"]');
    if (url) {
      anchor.href = url.href;
      if (url.target) anchor.target = url.target;
      moveInstrumentation(url, anchor);
    }

    const icon = socialLinkNode.querySelector('[data-aue-prop="icon"]');
    if (icon && icon.tagName === 'IMG') {
      const picture = createOptimizedPicture(icon.src, icon.alt || '');
      anchor.append(picture);
      moveInstrumentation(icon, picture);
    }

    li.append(anchor);
    socialList.append(li);
    moveInstrumentation(socialLinkNode, li);
  });

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('brand-footer__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  secondaryContent.append(copyrightSection);

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('brand-footer__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  copyrightSection.append(copyrightList);

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.classList.add('brand-footer__left--item', 'foot_link-footer');
    const anchor = document.createElement('a');
    anchor.classList.add('brand-footer__left--link', 'analytics_cta_click');
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.href = itcPortalLink.href;
    if (itcPortalLink.target) anchor.target = itcPortalLink.target;
    anchor.textContent = itcPortalLink.textContent;
    li.append(anchor);
    copyrightList.append(li);
    moveInstrumentation(itcPortalLink, li);
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('brand-footer__left--copyright', 'text-center');
  copyrightSection.append(copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('brand-footer__left--text', 'text-white');
  const copyrightText = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightText) {
    copyrightSpan.innerHTML = copyrightText.innerHTML;
    moveInstrumentation(copyrightText, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);

  const rootDiv = document.createElement('div');
  rootDiv.classList.add('brand-footer', 'w-100', 'bg-boing-neutral-gray-600');
  rootDiv.append(primarySection, secondarySection);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
