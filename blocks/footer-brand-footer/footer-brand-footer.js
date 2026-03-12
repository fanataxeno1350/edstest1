import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand-footer__primary');

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('footer-container');
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand-footer__primary--content', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row', 'footer-justify-content-md-between', 'footer-align-items-center');
  primaryContainer.append(primaryContent);

  const leftSection = document.createElement('section');
  leftSection.classList.add('footer-brand-footer__left', 'footer-d-flex', 'footer-gap-16', 'footer-px-10', 'footer-align-items-center', 'footer-justify-content-center');
  primaryContent.append(leftSection);

  const logoLink = block.querySelector('[data-aue-prop="logo"]');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href;
    logoAnchor.target = '_blank';
    logoAnchor.classList.add('footer-brand-footer__logo', 'footer-d-inline-block', 'footer-analytics_cta_click');
    logoAnchor.setAttribute('data-cta-region', 'Footer');
    logoAnchor.setAttribute('aria-label', 'ITC Logo');

    const logoImg = logoLink.querySelector('img');
    if (logoImg) {
      const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
      picture.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
      logoAnchor.append(picture);
      moveInstrumentation(logoImg, picture.querySelector('img'));
    }
    leftSection.append(logoAnchor);
    moveInstrumentation(logoLink, logoAnchor);
  }

  const secondaryLogoWrapper = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogoWrapper) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('footer-brand-footer__secondary--logo', 'footer-d-inline-block');
    const secondaryLogoImg = secondaryLogoWrapper.querySelector('img');
    if (secondaryLogoImg) {
      const picture = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
      picture.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-no-rendition');
      secondaryLogoDiv.append(picture);
      moveInstrumentation(secondaryLogoImg, picture.querySelector('img'));
    }
    leftSection.append(secondaryLogoDiv);
    moveInstrumentation(secondaryLogoWrapper, secondaryLogoDiv);
  }

  const rightSection = document.createElement('section');
  rightSection.classList.add('footer-brand-footer__right');
  primaryContent.append(rightSection);

  const nav = document.createElement('nav');
  nav.classList.add('footer-brand-footer__navbar', 'footer-d-grid', 'footer-d-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');
  rightSection.append(nav);

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand-footer__navbar--left', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row');
  nav.append(navLeft);

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand-footer__navbar--right', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row');
  nav.append(navRight);

  const linkLists = block.querySelectorAll('[data-aue-model="footerLinkList"]');
  linkLists.forEach((listNode, index) => {
    const ul = document.createElement('ul');
    ul.classList.add('footer-list-footer', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-align-items-md-start', 'footer-flex-column');

    const link = listNode.querySelector('[data-aue-prop="link"]');
    const label = listNode.querySelector('[data-aue-prop="label"]');

    if (link && label) {
      const li = document.createElement('li');
      li.classList.add('footer-list-footer__item');

      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = label.textContent;
      a.classList.add('footer-cta-analytics', 'footer-analytics_cta_click', 'footer-list-footer__item--link', 'footer-d-inline-block');
      a.setAttribute('data-link-region', 'Footer List');
      if (link.target) {
        a.target = link.target;
      }
      li.append(a);
      ul.append(li);
      moveInstrumentation(link, a);
      moveInstrumentation(label, a);
    }

    const listWrapper = document.createElement('div');
    listWrapper.classList.add('footer-footerList-footer');
    listWrapper.append(ul);
    moveInstrumentation(listNode, listWrapper);

    // Distribute link lists to navLeft and navRight
    if (index < 2) {
      navLeft.append(listWrapper);
    } else {
      navRight.append(listWrapper);
    }
  });

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand-footer__secondary');

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('footer-container');
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand-footer__secondary--content', 'footer-d-flex', 'footer-flex-column', 'footer-justify-content-md-between', 'footer-align-items-center');
  secondaryContainer.append(secondaryContent);

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('footer-brand-footer__right', 'footer-d-flex', 'footer-flex-column', 'footer-pb-5');
  secondaryContent.append(socialMediaSection);

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('footer-social_media-footer--title');
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-footer__right--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-px-10', 'footer-flex-wrap');
  socialMediaSection.append(socialList);

  const socialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  socialLinks.forEach((socialNode) => {
    const socialLink = socialNode.querySelector('[data-aue-prop="socialLink"]');
    const socialIcon = socialNode.querySelector('[data-aue-prop="icon"]');

    if (socialLink && socialIcon) {
      const li = document.createElement('li');
      li.classList.add('footer-brand-footer__right--item', 'footer-d-flex', 'footer-justify-content-center', 'footer-align-items-center');

      const a = document.createElement('a');
      a.href = socialLink.href;
      a.target = '_blank';
      a.classList.add('footer-brand-footer__right--link', 'footer-d-flex', 'footer-justify-content-center', 'footer-align-items-center', 'footer-analytics_cta_click');
      a.setAttribute('data-cta-region', 'Footer');
      a.setAttribute('data-cta-label', `footer-${socialIcon.alt.toLowerCase()}`);
      a.setAttribute('data-platform-name', socialIcon.alt.toLowerCase());
      a.setAttribute('data-social-linktype', 'follow');

      const iconImg = socialIcon.querySelector('img');
      if (iconImg) {
        const picture = createOptimizedPicture(iconImg.src, iconImg.alt);
        picture.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
        picture.querySelector('img').setAttribute('aria-label', iconImg.alt);
        a.append(picture);
        moveInstrumentation(iconImg, picture.querySelector('img'));
      }
      li.append(a);
      socialList.append(li);
      moveInstrumentation(socialLink, a);
      moveInstrumentation(socialIcon, a);
    }
    moveInstrumentation(socialNode, socialList);
  });

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('footer-brand-footer__left', 'footer-py-5', 'footer-d-flex', 'footer-flex-column', 'footer-gap-3');
  secondaryContent.append(copyrightSection);

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand-footer__left--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-flex-wrap');
  copyrightSection.append(copyrightList);

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.classList.add('footer-brand-footer__left--item', 'footer-foot_link-footer');

    const a = document.createElement('a');
    a.href = itcPortalLink.href;
    a.target = '_blank';
    a.classList.add('footer-brand-footer__left--link', 'footer-analytics_cta_click');
    a.setAttribute('data-cta-region', 'Footer');
    a.textContent = itcPortalLink.textContent;
    li.append(a);
    copyrightList.append(li);
    moveInstrumentation(itcPortalLink, a);
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand-footer__left--copyright', 'footer-text-center');
  copyrightSection.append(copyrightDiv);

  const copyrightTextSpan = document.createElement('span');
  copyrightTextSpan.classList.add('footer-brand-footer__left--text', 'footer-text-white');
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    copyrightTextSpan.innerHTML = copyrightText.innerHTML;
    moveInstrumentation(copyrightText, copyrightTextSpan);
  } else {
    copyrightTextSpan.textContent = '© 2026 Bingo! All Rights Reserved.'; // Fallback
  }
  copyrightDiv.append(copyrightTextSpan);

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('footer-brand-footer', 'footer-w-100', 'footer-bg-boing-neutral-gray-600');
  wrapperDiv.setAttribute('data-isdoodlevariation', 'false');

  wrapperDiv.append(primarySection);
  wrapperDiv.append(secondarySection);

  block.textContent = '';
  block.append(wrapperDiv);
  block.className = 'footer-brand-footer-container footer-p-0 block';
  block.dataset.blockStatus = 'loaded';
}
