import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrand = block.querySelector('.footer-brand');

  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand__primary');
  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container');
  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const leftSection = document.createElement('section');
  leftSection.classList.add('footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  const logoImage1Link = footerBrand.querySelector('[data-aue-prop="logoImage1"]');
  if (logoImage1Link) {
    const logo1 = logoImage1Link.querySelector('img');
    if (logo1) {
      const picture1 = createOptimizedPicture(logo1.src, logo1.alt);
      const logoLinkWrapper = document.createElement('a');
      logoLinkWrapper.href = logoImage1Link.href;
      logoLinkWrapper.target = logoImage1Link.target;
      logoLinkWrapper.classList.add('footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
      logoLinkWrapper.setAttribute('data-cta-region', 'Footer');
      logoLinkWrapper.setAttribute('aria-label', logo1.alt);
      logoLinkWrapper.append(picture1);
      moveInstrumentation(logoImage1Link, logoLinkWrapper);
      leftSection.append(logoLinkWrapper);
    }
  }

  const logoImage2Div = footerBrand.querySelector('[data-aue-prop="logoImage2"]');
  if (logoImage2Div) {
    const logo2 = logoImage2Div.querySelector('img');
    if (logo2) {
      const picture2 = createOptimizedPicture(logo2.src, logo2.alt);
      const logo2Wrapper = document.createElement('div');
      logo2Wrapper.classList.add('footer-brand__secondary--logo', 'd-inline-block');
      logo2Wrapper.append(picture2);
      moveInstrumentation(logoImage2Div, logo2Wrapper);
      leftSection.append(logo2Wrapper);
    }
  }

  const rightSection = document.createElement('section');
  rightSection.classList.add('footer-brand__right');
  const nav = document.createElement('nav');
  nav.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const footerLinkLists = [];
  let currentList = null;

  footerLinks.forEach((linkNode, index) => {
    if (index % 3 === 0) {
      currentList = document.createElement('ul');
      currentList.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
      footerLinkLists.push(currentList);
    }

    const li = document.createElement('li');
    li.classList.add('footer-list__item');
    const link = linkNode.querySelector('[data-aue-prop="link"]');
    const label = linkNode.querySelector('[data-aue-prop="label"]');

    if (link && label) {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = label.textContent;
      a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
      a.setAttribute('data-link-region', 'Footer List');
      if (link.target) {
        a.target = link.target;
      }
      li.append(a);
      moveInstrumentation(linkNode, li);
      currentList.append(li);
    }
  });

  footerLinkLists.forEach((list, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    footerListDiv.append(list);
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

  const socialRightSection = document.createElement('section');
  socialRightSection.classList.add('footer-brand__right', 'd-flex', 'flex-column', 'pb-5');
  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('social_media--title');
  socialTitle.textContent = 'Follow Us On';
  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((socialLinkNode) => {
    const socialUrl = socialLinkNode.querySelector('[data-aue-prop="socialUrl"]');
    const icon = socialLinkNode.querySelector('[data-aue-prop="icon"]');

    if (socialUrl && icon) {
      const li = document.createElement('li');
      li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');
      const a = document.createElement('a');
      a.href = socialUrl.href;
      a.target = '_blank';
      a.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
      a.setAttribute('data-cta-region', 'Footer');
      a.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
      a.setAttribute('data-platform-name', icon.alt.toLowerCase());
      a.setAttribute('data-social-linktype', 'follow');

      const picture = createOptimizedPicture(icon.src, icon.alt);
      picture.querySelector('img').setAttribute('aria-label', icon.alt.toLowerCase());
      a.append(picture);
      li.append(a);
      moveInstrumentation(socialLinkNode, li);
      socialList.append(li);
    }
  });

  socialRightSection.append(socialTitle, socialList);

  const secondaryLeftSection = document.createElement('section');
  secondaryLeftSection.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  const secondaryLeftList = document.createElement('ul');
  secondaryLeftList.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  const itcPortalLink = footerBrand.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item', 'foot_link');
    const a = document.createElement('a');
    a.href = itcPortalLink.href;
    a.textContent = itcPortalLink.textContent;
    a.target = itcPortalLink.target;
    a.classList.add('footer-brand__left--link', 'analytics_cta_click');
    a.setAttribute('data-cta-region', 'Footer');
    li.append(a);
    moveInstrumentation(itcPortalLink, li);
    secondaryLeftList.append(li);
  }

  const copyrightTextDiv = document.createElement('div');
  copyrightTextDiv.classList.add('footer-brand__left--copyright', 'text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text', 'text-white');
  const copyrightContent = footerBrand.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightContent) {
    copyrightSpan.innerHTML = copyrightContent.innerHTML;
    moveInstrumentation(copyrightContent, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  }
  copyrightTextDiv.append(copyrightSpan);

  secondaryLeftSection.append(secondaryLeftList, copyrightTextDiv);

  secondaryContent.append(socialRightSection, secondaryLeftSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  const rootDiv = document.createElement('div');
  rootDiv.classList.add('footer-brand', 'w-100', 'bg-boing-neutral-gray-600');
  rootDiv.setAttribute('data-isdoodlevariation', 'false');
  rootDiv.append(primarySection, secondarySection);

  block.textContent = '';
  block.append(rootDiv);
  block.className = 'footer-brand block';
  block.dataset.blockStatus = 'loaded';
}
