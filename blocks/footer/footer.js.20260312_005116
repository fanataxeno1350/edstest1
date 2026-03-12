import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand-footer__primary');

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('footer-container');

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand-footer__primary--content', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row', 'footer-justify-content-md-between', 'footer-align-items-center');

  const leftSection = document.createElement('section');
  leftSection.classList.add('footer-brand-footer__left', 'footer-d-flex', 'footer-gap-16', 'footer-px-10', 'footer-align-items-center', 'footer-justify-content-center');

  const logo1A = block.querySelector('[data-aue-prop="logo1"]');
  if (logo1A) {
    const logo1Wrapper = document.createElement('a');
    logo1Wrapper.classList.add('footer-brand-footer__logo', 'footer-d-inline-block', 'footer-analytics_cta_click');
    logo1Wrapper.href = logo1A.href;
    logo1Wrapper.target = '_blank';
    logo1Wrapper.setAttribute('aria-label', logo1A.querySelector('img').alt);
    const img1 = logo1A.querySelector('img');
    const picture1 = createOptimizedPicture(img1.src, img1.alt);
    logo1Wrapper.append(picture1);
    moveInstrumentation(logo1A, logo1Wrapper);
    leftSection.append(logo1Wrapper);
  }

  const logo2Div = block.querySelector('[data-aue-prop="logo2"]');
  if (logo2Div) {
    const logo2Wrapper = document.createElement('div');
    logo2Wrapper.classList.add('footer-brand-footer__secondary--logo', 'footer-d-inline-block');
    const img2 = logo2Div.querySelector('img');
    const picture2 = createOptimizedPicture(img2.src, img2.alt);
    logo2Wrapper.append(picture2);
    moveInstrumentation(logo2Div, logo2Wrapper);
    leftSection.append(logo2Wrapper);
  }

  const rightSection = document.createElement('section');
  rightSection.classList.add('footer-brand-footer__right');

  const nav = document.createElement('nav');
  nav.classList.add('footer-brand-footer__navbar', 'footer-d-grid', 'footer-d-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand-footer__navbar--left', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row');

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand-footer__navbar--right', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row');

  const footerLists = block.querySelectorAll('[data-aue-model="footerList"]');
  footerLists.forEach((listNode, index) => {
    const listWrapper = document.createElement('div');
    listWrapper.classList.add('footer-footerList-footer');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list-footer', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-align-items-md-start', 'footer-flex-column');

    ['link1', 'link2', 'link3'].forEach((linkProp) => {
      const linkA = listNode.querySelector(`[data-aue-prop="${linkProp}"]`);
      if (linkA) {
        const li = document.createElement('li');
        li.classList.add('footer-list-footer__item');
        const a = document.createElement('a');
        a.href = linkA.href;
        a.textContent = linkA.textContent;
        a.classList.add('footer-cta-analytics', 'footer-analytics_cta_click', 'footer-list-footer__item--link', 'footer-d-inline-block');
        if (linkA.target) a.target = linkA.target;
        li.append(a);
        moveInstrumentation(linkA, a);
        ul.append(li);
      }
    });
    listWrapper.append(ul);
    moveInstrumentation(listNode, listWrapper);
    if (index < 2) {
      navLeft.append(listWrapper);
    } else {
      navRight.append(listWrapper);
    }
  });

  nav.append(navLeft, navRight);
  rightSection.append(nav);
  primaryContent.append(leftSection, rightSection);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  // Secondary section
  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand-footer__secondary');

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('footer-container');

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand-footer__secondary--content', 'footer-d-flex', 'footer-flex-column', 'footer-justify-content-md-between', 'footer-align-items-center');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('footer-brand-footer__right', 'footer-d-flex', 'footer-flex-column', 'footer-pb-5');

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('footer-social_media-footer--title');
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-footer__right--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-px-10', 'footer-flex-wrap');

  const footerSocials = block.querySelectorAll('[data-aue-model="footerSocial"]');
  footerSocials.forEach((socialNode) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand-footer__right--item', 'footer-d-flex', 'footer-justify-content-center', 'footer-align-items-center');

    const socialLink = socialNode.querySelector('[data-aue-prop="socialLink"]');
    const socialIcon = socialNode.querySelector('[data-aue-prop="socialIcon"]');

    if (socialLink && socialIcon) {
      const a = document.createElement('a');
      a.href = socialLink.href;
      a.classList.add('footer-brand-footer__right--link', 'footer-d-flex', 'footer-justify-content-center', 'footer-align-items-center', 'footer-analytics_cta_click');
      a.target = '_blank';
      a.setAttribute('data-cta-region', 'Footer');
      a.setAttribute('data-cta-label', `footer-${socialLink.textContent.toLowerCase()}`);
      a.setAttribute('data-platform-name', socialLink.textContent.toLowerCase());
      a.setAttribute('data-social-linktype', 'follow');

      const img = socialIcon.querySelector('img');
      const picture = createOptimizedPicture(img.src, img.alt);
      picture.querySelector('img').setAttribute('aria-label', socialLink.textContent.toLowerCase());
      picture.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');

      a.append(picture);
      li.append(a);
      moveInstrumentation(socialLink, a);
      moveInstrumentation(socialIcon, a);
    }
    moveInstrumentation(socialNode, li);
    socialList.append(li);
  });
  socialMediaSection.append(socialList);

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('footer-brand-footer__left', 'footer-py-5', 'footer-d-flex', 'footer-flex-column', 'footer-gap-3');

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand-footer__left--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-flex-wrap');

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
    moveInstrumentation(itcPortalLink, a);
    copyrightList.append(li);
  }
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand-footer__left--copyright', 'footer-text-center');

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand-footer__left--text', 'footer-text-white');
  const copyrightText = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent;
    moveInstrumentation(copyrightText, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.'; // Fallback
  }
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);

  secondaryContent.append(socialMediaSection, copyrightSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  block.textContent = '';
  block.append(primarySection, secondarySection);
  block.classList.add('footer-brand-footer', 'footer-w-100', 'footer-bg-boing-neutral-gray-600');
  block.dataset.blockStatus = 'loaded';
}
