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

  const logos = block.querySelectorAll('[data-aue-model="footerLogo"]');
  logos.forEach((logoNode) => {
    const link = logoNode.querySelector('a');
    const img = logoNode.querySelector('img');
    if (link && img) {
      const logoWrapper = document.createElement('a');
      logoWrapper.href = link.href;
      if (link.target) {
        logoWrapper.target = link.target;
      }
      logoWrapper.classList.add('footer-brand-footer__logo', 'footer-d-inline-block', 'footer-analytics_cta_click');
      logoWrapper.setAttribute('data-cta-region', 'Footer');
      logoWrapper.setAttribute('aria-label', img.alt);

      const picture = createOptimizedPicture(img.src, img.alt);
      logoWrapper.append(picture);
      moveInstrumentation(img, picture);
      moveInstrumentation(link, logoWrapper);
      leftSection.append(logoWrapper);
      moveInstrumentation(logoNode, logoWrapper);
    }
  });

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

  const navGroups = block.querySelectorAll('[data-aue-model="footerNavGroup"]');
  navGroups.forEach((groupNode, index) => {
    const listDiv = document.createElement('div');
    listDiv.classList.add('footer-footerList-footer');

    const ul = document.createElement('ul');
    ul.classList.add('footer-list-footer', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-align-items-md-start', 'footer-flex-column');
    listDiv.append(ul);

    const links = groupNode.querySelectorAll('[data-aue-model="footerNavLink"]');
    links.forEach((linkNode) => {
      const li = document.createElement('li');
      li.classList.add('footer-list-footer__item');

      const a = linkNode.querySelector('a');
      if (a) {
        const linkElement = document.createElement('a');
        linkElement.href = a.href;
        linkElement.textContent = a.textContent;
        linkElement.classList.add('footer-cta-analytics', 'footer-analytics_cta_click', 'footer-list-footer__item--link', 'footer-d-inline-block');
        linkElement.setAttribute('data-link-region', 'Footer List');
        if (a.target) {
          linkElement.target = a.target;
        }
        li.append(linkElement);
        moveInstrumentation(a, linkElement);
      }
      ul.append(li);
      moveInstrumentation(linkNode, li);
    });
    if (index < 2) {
      navLeft.append(listDiv);
    } else {
      navRight.append(listDiv);
    }
    moveInstrumentation(groupNode, listDiv);
  });

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand-footer__secondary');

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('footer-container');
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand-footer__secondary--content', 'footer-d-flex', 'footer-flex-column', 'footer-justify-content-md-between', 'footer-align-items-center');
  secondaryContainer.append(secondaryContent);

  const socialRightSection = document.createElement('section');
  socialRightSection.classList.add('footer-brand-footer__right', 'footer-d-flex', 'footer-flex-column', 'footer-pb-5');
  secondaryContent.append(socialRightSection);

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('footer-social_media--title');
  socialTitle.textContent = 'Follow Us On';
  socialRightSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-footer__right--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-px-10', 'footer-flex-wrap');
  socialRightSection.append(socialList);

  const socialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  socialLinks.forEach((socialNode) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand-footer__right--item', 'footer-d-flex', 'footer-justify-content-center', 'footer-align-items-center');

    const link = socialNode.querySelector('a');
    const icon = socialNode.querySelector('img');
    if (link && icon) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      if (link.target) {
        linkElement.target = link.target;
      }
      linkElement.classList.add('footer-brand-footer__right--link', 'footer-d-flex', 'footer-justify-content-center', 'footer-align-items-center', 'footer-analytics_cta_click');
      linkElement.setAttribute('data-cta-region', 'Footer');
      linkElement.setAttribute('data-cta-label', `footer-${icon.alt}`);
      linkElement.setAttribute('data-platform-name', icon.alt);
      linkElement.setAttribute('data-social-linktype', 'follow');

      const picture = createOptimizedPicture(icon.src, icon.alt);
      linkElement.append(picture);
      moveInstrumentation(icon, picture);
      moveInstrumentation(link, linkElement);
      li.append(linkElement);
    }
    socialList.append(li);
    moveInstrumentation(socialNode, li);
  });

  const copyrightLeftSection = document.createElement('section');
  copyrightLeftSection.classList.add('footer-brand-footer__left', 'footer-py-5', 'footer-d-flex', 'footer-flex-column', 'footer-gap-3');
  secondaryContent.append(copyrightLeftSection);

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand-footer__left--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-flex-wrap');
  copyrightLeftSection.append(copyrightList);

  const footerLinks = block.querySelectorAll('[data-aue-prop="footerLinks"] [data-aue-model="footerNavLink"]');
  footerLinks.forEach((linkNode) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand-footer__left--item', 'footer-foot_link');

    const a = linkNode.querySelector('a');
    if (a) {
      const linkElement = document.createElement('a');
      linkElement.href = a.href;
      linkElement.textContent = a.textContent;
      linkElement.classList.add('footer-brand-footer__left--link', 'footer-analytics_cta_click');
      linkElement.setAttribute('data-cta-region', 'Footer');
      if (a.target) {
        linkElement.target = a.target;
      }
      li.append(linkElement);
      moveInstrumentation(a, linkElement);
    }
    copyrightList.append(li);
    moveInstrumentation(linkNode, li);
  });

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand-footer__left--copyright', 'footer-text-center');
  copyrightLeftSection.append(copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand-footer__left--text', 'footer-text-white');
  const copyrightText = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  }
  copyrightDiv.append(copyrightSpan);

  const rootDiv = document.createElement('div');
  rootDiv.classList.add('footer-brand-footer', 'footer-w-100', 'footer-bg-boing-neutral-gray-600');
  rootDiv.setAttribute('data-isdoodlevariation', 'false');

  rootDiv.append(primarySection);
  rootDiv.append(secondarySection);

  block.textContent = '';
  block.append(rootDiv);
  block.classList.add('footer');
  block.dataset.blockStatus = 'loaded';
}
