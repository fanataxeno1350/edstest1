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

  const logo1Link = block.querySelector('[data-aue-prop="logo1Link"]');
  const logo1Img = block.querySelector('[data-aue-prop="logo1"]');

  if (logo1Link && logo1Img) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.href = logo1Link.href;
    logo1Anchor.target = '_blank';
    logo1Anchor.classList.add('footer-brand-footer__logo', 'footer-d-inline-block', 'footer-analytics_cta_click');
    logo1Anchor.setAttribute('data-cta-region', 'Footer');
    logo1Anchor.setAttribute('aria-label', logo1Img.alt);
    logo1Anchor.append(createOptimizedPicture(logo1Img.src, logo1Img.alt));
    moveInstrumentation(logo1Link, logo1Anchor);
    moveInstrumentation(logo1Img, logo1Anchor);
    leftSection.append(logo1Anchor);
  }

  const logo2Img = block.querySelector('[data-aue-prop="logo2"]');
  if (logo2Img) {
    const logo2Div = document.createElement('div');
    logo2Div.classList.add('footer-brand-footer__secondary--logo', 'footer-d-inline-block');
    logo2Div.append(createOptimizedPicture(logo2Img.src, logo2Img.alt));
    moveInstrumentation(logo2Img, logo2Div);
    leftSection.append(logo2Div);
  }

  const rightSection = document.createElement('section');
  rightSection.classList.add('footer-brand-footer__right');
  primaryContent.append(rightSection);

  const nav = document.createElement('nav');
  nav.classList.add('footer-brand-footer__navbar', 'footer-d-grid', 'footer-d-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');
  rightSection.append(nav);

  const navLeftDiv = document.createElement('div');
  navLeftDiv.classList.add('footer-brand-footer__navbar--left', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row');
  nav.append(navLeftDiv);

  const navRightDiv = document.createElement('div');
  navRightDiv.classList.add('footer-brand-footer__navbar--right', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row');
  nav.append(navRightDiv);

  const navLists = block.querySelectorAll('[data-aue-model="footerNavList"]');
  navLists.forEach((navList, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footer-footerList-footer');

    const ul = document.createElement('ul');
    ul.classList.add('footer-list-footer', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-align-items-md-start', 'footer-flex-column');
    footerListDiv.append(ul);

    const links = navList.querySelectorAll('[data-aue-prop="link"]');
    links.forEach((link) => {
      const li = document.createElement('li');
      li.classList.add('footer-list-footer__item');

      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent;
      a.classList.add('footer-list-footer__item--link', 'footer-cta-analytics', 'footer-analytics_cta_click', 'footer-d-inline-block');
      a.setAttribute('data-link-region', 'Footer List');
      if (link.target) {
        a.target = link.target;
      }
      li.append(a);
      ul.append(li);
      moveInstrumentation(link, a);
    });
    moveInstrumentation(navList, footerListDiv);

    if (index < 2) {
      navLeftDiv.append(footerListDiv);
    } else {
      navRightDiv.append(footerListDiv);
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

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('footer-social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.classList.add('footer-brand-footer__right--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-px-10', 'footer-flex-wrap');
  socialMediaSection.append(socialMediaList);

  const socialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  socialLinks.forEach((socialLinkItem) => {
    const socialLink = socialLinkItem.querySelector('[data-aue-prop="socialLink"]');
    const socialIcon = socialLinkItem.querySelector('[data-aue-prop="icon"]');

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

      a.append(createOptimizedPicture(socialIcon.src, socialIcon.alt));
      li.append(a);
      socialMediaList.append(li);
      moveInstrumentation(socialLink, a);
      moveInstrumentation(socialIcon, a);
      moveInstrumentation(socialLinkItem, li);
    }
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
    li.classList.add('footer-brand-footer__left--item', 'footer-foot_link');

    const a = document.createElement('a');
    a.href = itcPortalLink.href;
    a.textContent = itcPortalLink.textContent;
    a.target = '_blank';
    a.classList.add('footer-brand-footer__left--link', 'footer-analytics_cta_click');
    a.setAttribute('data-cta-region', 'Footer');
    li.append(a);
    copyrightList.append(li);
    moveInstrumentation(itcPortalLink, a);
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand-footer__left--copyright', 'footer-text-center');

  const copyrightTextSpan = document.createElement('span');
  copyrightTextSpan.classList.add('footer-brand-footer__left--text', 'footer-text-white');

  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    copyrightTextSpan.innerHTML = copyrightText.innerHTML;
    moveInstrumentation(copyrightText, copyrightTextSpan);
  } else {
    copyrightTextSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  }

  copyrightDiv.append(copyrightTextSpan);
  copyrightSection.append(copyrightDiv);

  const rootDiv = document.createElement('div');
  rootDiv.classList.add('footer-brand-footer', 'footer-w-100', 'footer-bg-boing-neutral-gray-600');
  rootDiv.setAttribute('data-isdoodlevariation', 'false');
  rootDiv.append(primarySection, secondarySection);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
