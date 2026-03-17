import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100', 'bg-boing-neutral-gray-600');

  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand__primary');
  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container');
  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const leftSection = document.createElement('section');
  leftSection.classList.add('footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  const logoItems = block.querySelectorAll('[data-aue-model="footerBrandLogo"]');
  logoItems.forEach((logoItem) => {
    const linkElement = logoItem.querySelector('a');
    const imgElement = logoItem.querySelector('img');

    if (linkElement && imgElement) {
      const logoLink = document.createElement('a');
      logoLink.href = linkElement.href;
      logoLink.target = linkElement.target;
      logoLink.classList.add('footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
      logoLink.setAttribute('data-cta-region', 'Footer');
      logoLink.setAttribute('aria-label', imgElement.alt);

      const picture = createOptimizedPicture(imgElement.src, imgElement.alt);
      picture.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      logoLink.append(picture);
      moveInstrumentation(imgElement, picture.querySelector('img'));
      moveInstrumentation(linkElement, logoLink);

      const logoWrapper = document.createElement('div');
      logoWrapper.classList.add('footer-brand__secondary--logo', 'd-inline-block');
      logoWrapper.append(logoLink);
      leftSection.append(logoWrapper);
    } else if (imgElement) {
      const logoWrapper = document.createElement('div');
      logoWrapper.classList.add('footer-brand__secondary--logo', 'd-inline-block');
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt);
      picture.querySelector('img').classList.add('object-fit-contain', 'w-100', 'no-rendition');
      logoWrapper.append(picture);
      moveInstrumentation(imgElement, picture.querySelector('img'));
      leftSection.append(logoWrapper);
    }
    moveInstrumentation(logoItem, leftSection);
  });

  const rightSection = document.createElement('section');
  rightSection.classList.add('footer-brand__right');
  const nav = document.createElement('nav');
  nav.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');

  const navLists = block.querySelectorAll('[data-aue-model="footerBrandNavList"]');
  navLists.forEach((navList, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

    ['link1', 'link2', 'link3'].forEach((prop) => {
      const linkElement = navList.querySelector(`[data-aue-prop="${prop}"]`);
      if (linkElement) {
        const li = document.createElement('li');
        li.classList.add('footer-list__item');
        const a = document.createElement('a');
        a.href = linkElement.href;
        if (linkElement.target) a.target = linkElement.target;
        a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
        a.setAttribute('data-link-region', 'Footer List');
        a.textContent = linkElement.textContent;
        li.append(a);
        ul.append(li);
        moveInstrumentation(linkElement, a);
      }
    });
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

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand__secondary');
  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');
  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('footer-brand__right', 'd-flex', 'flex-column', 'pb-5');
  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('social_media--title');
  socialTitle.textContent = 'Follow Us On';
  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  const socialLinks = block.querySelectorAll('[data-aue-model="footerBrandSocialLink"]');
  socialLinks.forEach((socialLinkItem) => {
    const linkElement = socialLinkItem.querySelector('[data-aue-prop="link"]');
    const iconElement = socialLinkItem.querySelector('[data-aue-prop="icon"]');

    if (linkElement && iconElement) {
      const li = document.createElement('li');
      li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');
      const a = document.createElement('a');
      a.href = linkElement.href;
      a.target = linkElement.target;
      a.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
      a.setAttribute('data-cta-region', 'Footer');
      a.setAttribute('data-cta-label', `footer-${iconElement.alt.toLowerCase()}`);
      a.setAttribute('data-platform-name', iconElement.alt.toLowerCase());
      a.setAttribute('data-social-linktype', 'follow');

      const picture = createOptimizedPicture(iconElement.src, iconElement.alt);
      picture.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      a.append(picture);
      li.append(a);
      socialList.append(li);
      moveInstrumentation(iconElement, picture.querySelector('img'));
      moveInstrumentation(linkElement, a);
    }
    moveInstrumentation(socialLinkItem, socialList);
  });

  socialMediaSection.append(socialTitle, socialList);

  const footerLeftSection = document.createElement('section');
  footerLeftSection.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  const footerLeftList = document.createElement('ul');
  footerLeftList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  const leftLinks = block.querySelectorAll('[data-aue-model="footerBrandLeftLink"]');
  leftLinks.forEach((leftLinkItem) => {
    const linkElement = leftLinkItem.querySelector('[data-aue-prop="link"]');
    if (linkElement) {
      const li = document.createElement('li');
      li.classList.add('footer-brand__left--item', 'foot_link');
      const a = document.createElement('a');
      a.href = linkElement.href;
      if (linkElement.target) a.target = linkElement.target;
      a.classList.add('footer-brand__left--link', 'analytics_cta_click');
      a.setAttribute('data-cta-region', 'Footer');
      a.textContent = linkElement.textContent;
      li.append(a);
      footerLeftList.append(li);
      moveInstrumentation(linkElement, a);
    }
    moveInstrumentation(leftLinkItem, footerLeftList);
  });

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand__left--copyright', 'text-center');
  const copyrightTextSpan = document.createElement('span');
  copyrightTextSpan.classList.add('footer-brand__left--text', 'text-white');
  const copyrightTextElement = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightTextElement) {
    copyrightTextSpan.textContent = copyrightTextElement.textContent;
    moveInstrumentation(copyrightTextElement, copyrightTextSpan);
  }
  copyrightDiv.append(copyrightTextSpan);

  footerLeftSection.append(footerLeftList, copyrightDiv);

  secondaryContent.append(socialMediaSection, footerLeftSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  footerBrand.append(primarySection, secondarySection);

  block.textContent = '';
  block.append(footerBrand);
  block.className = 'footer-brand block';
  block.dataset.blockStatus = 'loaded';
}