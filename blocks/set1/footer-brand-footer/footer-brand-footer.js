import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand-footer__primary');
  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container');
  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand-footer__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const leftSection = document.createElement('section');
  leftSection.classList.add('footer-brand-footer__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  const logoImageWrapper = document.querySelector('[data-aue-prop="logoImage"]');
  if (logoImageWrapper) {
    const logoLink = logoImageWrapper.querySelector('a');
    if (logoLink) {
      const logoImg = logoLink.querySelector('img');
      if (logoImg) {
        const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
        const logoDiv = document.createElement('a');
        logoDiv.classList.add('footer-brand-footer__logo', 'd-inline-block', 'analytics_cta_click');
        logoDiv.href = logoLink.href;
        if (logoLink.target) logoDiv.target = logoLink.target;
        if (logoLink.getAttribute('aria-label')) logoDiv.setAttribute('aria-label', logoLink.getAttribute('aria-label'));
        logoDiv.append(picture);
        moveInstrumentation(logoImageWrapper, logoDiv);
        leftSection.append(logoDiv);
      }
    }
  }

  const secondaryLogoImageWrapper = document.querySelector('[data-aue-prop="secondaryLogoImage"]');
  if (secondaryLogoImageWrapper) {
    const secondaryLogoImg = secondaryLogoImageWrapper.querySelector('img');
    if (secondaryLogoImg) {
      const picture = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
      const secondaryLogoDiv = document.createElement('div');
      secondaryLogoDiv.classList.add('footer-brand-footer__secondary--logo', 'd-inline-block');
      secondaryLogoDiv.append(picture);
      moveInstrumentation(secondaryLogoImageWrapper, secondaryLogoDiv);
      leftSection.append(secondaryLogoDiv);
    }
  }

  const rightSection = document.createElement('section');
  rightSection.classList.add('footer-brand-footer__right');
  const nav = document.createElement('nav');
  nav.classList.add('footer-brand-footer__navbar', 'd-grid', 'd-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand-footer__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand-footer__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');

  const navLists = block.querySelectorAll('[data-aue-model="footerNavList"]');
  navLists.forEach((navList, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList-footer');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list-footer', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

    const link1 = navList.querySelector('[data-aue-prop="link1"]');
    if (link1) {
      const li = document.createElement('li');
      li.classList.add('footer-list-footer__item');
      const a = document.createElement('a');
      a.href = link1.href;
      a.textContent = link1.textContent;
      a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-footer__item--link', 'd-inline-block');
      a.setAttribute('data-link-region', 'Footer List');
      if (link1.target) a.target = link1.target;
      li.append(a);
      moveInstrumentation(link1, li);
      ul.append(li);
    }

    const link2 = navList.querySelector('[data-aue-prop="link2"]');
    if (link2) {
      const li = document.createElement('li');
      li.classList.add('footer-list-footer__item');
      const a = document.createElement('a');
      a.href = link2.href;
      a.textContent = link2.textContent;
      a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-footer__item--link', 'd-inline-block');
      a.setAttribute('data-link-region', 'Footer List');
      if (link2.target) a.target = link2.target;
      li.append(a);
      moveInstrumentation(link2, li);
      ul.append(li);
    }

    const link3 = navList.querySelector('[data-aue-prop="link3"]');
    if (link3) {
      const li = document.createElement('li');
      li.classList.add('footer-list-footer__item');
      const a = document.createElement('a');
      a.href = link3.href;
      a.textContent = link3.textContent;
      a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-footer__item--link', 'd-inline-block');
      a.setAttribute('data-link-region', 'Footer List');
      if (link3.target) a.target = link3.target;
      li.append(a);
      moveInstrumentation(link3, li);
      ul.append(li);
    }
    footerListDiv.append(ul);
    moveInstrumentation(navList, footerListDiv);

    if (index < 2) {
      navLeft.append(footerListDiv);
    } else {
      navRight.append(footerListDiv);
    }
  });

  nav.append(navLeft, navRight);
  rightSection.append(nav);
  primaryContent.append(leftSection, rightSection);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  // Secondary section (social links and copyright)
  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand-footer__secondary');
  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');
  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand-footer__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const socialRightSection = document.createElement('section');
  socialRightSection.classList.add('footer-brand-footer__right', 'd-flex', 'flex-column', 'pb-5');
  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('social_media--title');
  socialTitle.textContent = 'Follow Us On';
  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-footer__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  const socialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  socialLinks.forEach((socialLinkNode) => {
    const socialUrl = socialLinkNode.querySelector('[data-aue-prop="socialUrl"]');
    const iconImage = socialLinkNode.querySelector('[data-aue-prop="iconImage"]');

    if (socialUrl && iconImage) {
      const li = document.createElement('li');
      li.classList.add('footer-brand-footer__right--item', 'd-flex', 'justify-content-center', 'align-items-center');
      const a = document.createElement('a');
      a.classList.add('footer-brand-footer__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
      a.href = socialUrl.href;
      if (socialUrl.target) a.target = socialUrl.target;
      a.setAttribute('data-cta-region', 'Footer');
      a.setAttribute('data-cta-label', `footer-${iconImage.alt.toLowerCase()}`);
      a.setAttribute('data-platform-name', iconImage.alt.toLowerCase());
      a.setAttribute('data-social-linktype', 'follow');

      const img = iconImage.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').setAttribute('aria-label', img.alt.toLowerCase());
        a.append(picture);
      }
      li.append(a);
      moveInstrumentation(socialLinkNode, li);
      socialList.append(li);
    }
  });

  socialRightSection.append(socialTitle, socialList);

  const copyrightLeftSection = document.createElement('section');
  copyrightLeftSection.classList.add('footer-brand-footer__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand-footer__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.classList.add('footer-brand-footer__left--item', 'foot_link');
    const a = document.createElement('a');
    a.href = itcPortalLink.href;
    a.textContent = itcPortalLink.textContent;
    a.classList.add('footer-brand-footer__left--link', 'analytics_cta_click');
    a.setAttribute('data-cta-region', 'Footer');
    if (itcPortalLink.target) a.target = itcPortalLink.target;
    li.append(a);
    moveInstrumentation(itcPortalLink, li);
    copyrightList.append(li);
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand-footer__left--copyright', 'text-center');
  const copyrightTextSpan = document.createElement('span');
  copyrightTextSpan.classList.add('footer-brand-footer__left--text', 'text-white');

  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    copyrightTextSpan.innerHTML = copyrightText.innerHTML;
    moveInstrumentation(copyrightText, copyrightTextSpan);
  } else {
    copyrightTextSpan.textContent = '© 2026 Bingo! All Rights Reserved.'; // Fallback
  }
  copyrightDiv.append(copyrightTextSpan);

  copyrightLeftSection.append(copyrightList, copyrightDiv);
  secondaryContent.append(socialRightSection, copyrightLeftSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  block.textContent = '';
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('footer-brand-footer', 'w-100', 'bg-boing-neutral-gray-600');
  wrapperDiv.append(primarySection, secondarySection);
  block.append(wrapperDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
