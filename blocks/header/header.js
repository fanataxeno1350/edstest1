import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('header-cmp-header');

  const showHamburger = block.querySelector('[data-aue-prop="showHamburger"]');
  if (showHamburger) {
    const hamburgerInput = document.createElement('input');
    hamburgerInput.classList.add('header-cmp-header__hamburger');
    hamburgerInput.type = 'checkbox';
    mainDiv.append(hamburgerInput);
    moveInstrumentation(showHamburger, hamburgerInput);
  }

  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-logo', 'header-image', 'header-cmp-header__logo');
  const logoContent = block.querySelector('[data-aue-prop="logo"]');
  if (logoContent) {
    const logoLink = logoContent.querySelector('a');
    if (logoLink) {
      const logoImg = logoContent.querySelector('img');
      if (logoImg) {
        const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
        logoLink.innerHTML = ''; // Clear existing content to append new picture
        logoLink.append(picture);
      }
      logoWrapper.append(logoLink);
      moveInstrumentation(logoContent, logoWrapper);
    }
  }
  mainDiv.append(logoWrapper);

  const navLinksContainer = document.createElement('div');
  navLinksContainer.classList.add('header-cmp-header__nav-links');

  const navigationDiv = document.createElement('div');
  navigationDiv.classList.add('header-navigation');

  const navElement = document.createElement('nav');
  navElement.classList.add('header-cmp-navigation');
  navElement.setAttribute('role', 'navigation');

  const navGroupUl = document.createElement('ul');
  navGroupUl.classList.add('header-cmp-navigation__group', 'header-cmp-header__nav-group');

  const navLinks = block.querySelectorAll('[data-aue-model="navLink"]');
  navLinks.forEach((navLinkItem) => {
    const li = document.createElement('li');
    li.classList.add('header-cmp-navigation__item', 'header-cmp-navigation__item--level-0', 'header-cmp-header__nav-products', 'header-cmp-header__no-items');

    const urlElement = navLinkItem.querySelector('[data-aue-prop="url"]');
    const labelElement = navLinkItem.querySelector('[data-aue-prop="label"]');

    if (urlElement && labelElement) {
      const a = document.createElement('a');
      a.href = urlElement.href;
      a.classList.add('header-cmp-navigation__item-link');
      a.textContent = labelElement.textContent;
      li.append(a);
      moveInstrumentation(urlElement, a);
      moveInstrumentation(labelElement, a);
    }

    if (li.children.length > 0) {
      navGroupUl.append(li);
      moveInstrumentation(navLinkItem, li);
    }
  });
  navElement.append(navGroupUl);

  const mobileListDiv = document.createElement('div');
  mobileListDiv.classList.add('header-cmp-header__mobile-list');

  const policyUl = document.createElement('ul');
  policyUl.classList.add('header-cmp-header__policy');

  const policyLinks = block.querySelectorAll('[data-aue-model="policyLink"]');
  policyLinks.forEach((policyLinkItem) => {
    const li = document.createElement('li');
    li.classList.add('header-cmp-header__policy-list');

    const urlElement = policyLinkItem.querySelector('[data-aue-prop="url"]');
    const labelElement = policyLinkItem.querySelector('[data-aue-prop="label"]');

    if (urlElement && labelElement) {
      const a = document.createElement('a');
      a.href = urlElement.href;
      a.target = '_blank';
      a.textContent = labelElement.textContent;
      li.append(a);
      moveInstrumentation(urlElement, a);
      moveInstrumentation(labelElement, a);
    }

    if (li.children.length > 0) {
      policyUl.append(li);
      moveInstrumentation(policyLinkItem, li);
    }
  });
  mobileListDiv.append(policyUl);

  const socialMediaDiv = document.createElement('div');
  socialMediaDiv.classList.add('header-cmp-header__social-media');

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((socialLinkItem) => {
    const urlElement = socialLinkItem.querySelector('[data-aue-prop="url"]');
    const typeElement = socialLinkItem.querySelector('[data-aue-prop="type"]');

    if (urlElement && typeElement) {
      const a = document.createElement('a');
      a.href = urlElement.href;
      a.target = '_blank';
      a.classList.add(`header-icon-${typeElement.textContent.toLowerCase()}`);
      a.setAttribute('data-social', typeElement.textContent.toLowerCase());
      socialMediaDiv.append(a);
      moveInstrumentation(urlElement, a);
      moveInstrumentation(typeElement, a);
      moveInstrumentation(socialLinkItem, a);
    }
  });
  mobileListDiv.append(socialMediaDiv);
  navElement.append(mobileListDiv);

  navigationDiv.append(navElement);
  navLinksContainer.append(navigationDiv);
  mainDiv.append(navLinksContainer);

  const navIconsDiv = document.createElement('div');
  navIconsDiv.classList.add('header-cmp-header__nav-icons');

  const accessibilityLink = block.querySelector('[data-aue-prop="accessibilityLink"]');
  if (accessibilityLink) {
    const accessibilityDiv = document.createElement('div');
    accessibilityDiv.classList.add('header-cmp-header__accessbility', 'header-cmp-header__hide-icon');
    const a = document.createElement('a');
    a.href = accessibilityLink.href;
    a.classList.add('header-cmp-header__icon-img');
    const iconDiv = document.createElement('div');
    iconDiv.classList.add('header-icon-accessibility');
    a.append(iconDiv);
    accessibilityDiv.append(a);
    navIconsDiv.append(accessibilityDiv);
    moveInstrumentation(accessibilityLink, a);
  }

  const searchLink = block.querySelector('[data-aue-prop="searchLink"]');
  if (searchLink) {
    const searchDiv = document.createElement('div');
    searchDiv.classList.add('header-cmp-header__search');
    const a = document.createElement('a');
    a.href = searchLink.href;
    a.classList.add('header-cmp-header__icon-img');
    const iconDiv = document.createElement('div');
    iconDiv.classList.add('header-icon-search');
    a.append(iconDiv);
    const textDiv = document.createElement('div');
    textDiv.classList.add('header-cmp-header__icon-text');
    textDiv.textContent = searchLink.textContent;
    a.append(textDiv);
    searchDiv.append(a);
    navIconsDiv.append(searchDiv);
    moveInstrumentation(searchLink, a);
  }

  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  if (loginLink) {
    const loginDiv = document.createElement('div');
    loginDiv.classList.add('header-cmp-header__login', 'header-cmp-header__hide-icon');
    const a = document.createElement('a');
    a.href = loginLink.href;
    a.classList.add('header-cmp-header__icon-img');
    const iconDiv = document.createElement('div');
    iconDiv.classList.add('header-icon-profile');
    a.append(iconDiv);
    loginDiv.append(a);
    navIconsDiv.append(loginDiv);
    moveInstrumentation(loginLink, a);
  }

  mainDiv.append(navIconsDiv);

  block.textContent = '';
  block.append(mainDiv);
  block.className = `header block`;
  block.dataset.blockStatus = 'loaded';
}
