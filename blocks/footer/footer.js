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

  // Logo
  const logoLink = block.querySelector('[data-aue-prop="logo"]');
  if (logoLink) {
    const logoWrapper = document.createElement('a');
    logoWrapper.href = logoLink.href;
    logoWrapper.target = logoLink.target;
    logoWrapper.classList.add('brand-footer__logo', 'd-inline-block', 'analytics_cta_click');
    logoWrapper.setAttribute('data-cta-region', 'Footer');
    logoWrapper.setAttribute('aria-label', logoLink.getAttribute('aria-label'));

    const logoImg = logoLink.querySelector('img');
    if (logoImg) {
      const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
      picture.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      logoWrapper.append(picture);
      moveInstrumentation(logoImg, picture);
    }
    leftSection.append(logoWrapper);
    moveInstrumentation(logoLink, logoWrapper);
  }

  // Secondary Logo
  const secondaryLogoLink = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogoLink) {
    const secondaryLogoWrapper = document.createElement('div');
    secondaryLogoWrapper.classList.add('brand-footer__secondary--logo', 'd-inline-block');

    const secondaryLogoImg = secondaryLogoLink.querySelector('img');
    if (secondaryLogoImg) {
      const picture = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
      picture.querySelector('img').classList.add('object-fit-contain', 'w-100', 'no-rendition');
      secondaryLogoWrapper.append(picture);
      moveInstrumentation(secondaryLogoImg, picture);
    }
    leftSection.append(secondaryLogoWrapper);
    moveInstrumentation(secondaryLogoLink, secondaryLogoWrapper);
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

  // Footer Link Groups
  const footerLinkGroups = block.querySelectorAll('[data-aue-model="footerLinkGroup"]');
  footerLinkGroups.forEach((groupNode, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList-footer');

    const ul = document.createElement('ul');
    ul.classList.add('list-footer', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
    footerListDiv.append(ul);

    const links = groupNode.querySelectorAll('[data-aue-model="footerLink"]');
    links.forEach((linkNode) => {
      const li = document.createElement('li');
      li.classList.add('list-footer__item');

      const link = linkNode.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        newLink.target = link.target;
        newLink.classList.add('list-footer__item--link', 'cta-analytics', 'analytics_cta_click', 'd-inline-block');
        newLink.setAttribute('data-link-region', 'Footer List');
        li.append(newLink);
        moveInstrumentation(link, newLink);
      }
      ul.append(li);
      moveInstrumentation(linkNode, li);
    });

    if (index < 2) {
      navLeft.append(footerListDiv);
    } else {
      navRight.append(footerListDiv);
    }
    moveInstrumentation(groupNode, footerListDiv);
  });

  // Secondary Section
  const secondarySection = document.createElement('section');
  secondarySection.classList.add('brand-footer__secondary');

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('brand-footer__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');
  secondaryContainer.append(secondaryContent);

  const socialMediaRight = document.createElement('section');
  socialMediaRight.classList.add('brand-footer__right', 'd-flex', 'flex-column', 'pb-5');
  secondaryContent.append(socialMediaRight);

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('social_media--title');
  socialTitle.textContent = 'Follow Us On'; // Assuming static text or extracting from a specific element if available
  socialMediaRight.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('brand-footer__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');
  socialMediaRight.append(socialList);

  // Social Links
  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((socialLinkNode) => {
    const li = document.createElement('li');
    li.classList.add('brand-footer__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const link = socialLinkNode.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = link.target;
      newLink.classList.add('brand-footer__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));
      newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name'));
      newLink.setAttribute('data-social-linktype', link.getAttribute('data-social-linktype'));

      const img = socialLinkNode.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
        picture.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label'));
        newLink.append(picture);
        moveInstrumentation(img, picture);
      }
      li.append(newLink);
      moveInstrumentation(link, newLink);
    }
    socialList.append(li);
    moveInstrumentation(socialLinkNode, li);
  });

  const copyrightLeft = document.createElement('section');
  copyrightLeft.classList.add('brand-footer__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  secondaryContent.append(copyrightLeft);

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('brand-footer__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  copyrightLeft.append(copyrightList);

  // ITC Portal Link
  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.classList.add('brand-footer__left--item', 'foot_link');

    const link = itcPortalLink.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      newLink.target = link.target;
      newLink.classList.add('brand-footer__left--link', 'analytics_cta_click');
      newLink.setAttribute('data-cta-region', 'Footer');
      li.append(newLink);
      moveInstrumentation(link, newLink);
    }
    copyrightList.append(li);
    moveInstrumentation(itcPortalLink, li);
  }

  // Copyright Text
  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('brand-footer__left--copyright', 'text-center');

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('brand-footer__left--text', 'text-white');

  const copyrightText = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent;
    moveInstrumentation(copyrightText, copyrightSpan);
  } else {
    // Fallback if copyright text is not found via AUE prop
    const fallbackCopyright = block.querySelector('.footer-brand-footer__left--copyright .footer-brand-footer__left--text');
    if (fallbackCopyright) {
      copyrightSpan.textContent = fallbackCopyright.textContent;
      moveInstrumentation(fallbackCopyright, copyrightSpan);
    }
  }
  copyrightDiv.append(copyrightSpan);
  copyrightLeft.append(copyrightDiv);

  const rootDiv = document.createElement('div');
  rootDiv.classList.add('brand-footer', 'w-100', 'bg-boing-neutral-gray-600');
  rootDiv.setAttribute('data-isdoodlevariation', 'false');
  rootDiv.append(primarySection, secondarySection);

  block.textContent = '';
  block.append(rootDiv);
  block.classList.add('footer');
  block.dataset.blockStatus = 'loaded';
}