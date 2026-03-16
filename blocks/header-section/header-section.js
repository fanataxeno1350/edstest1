import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const leftImage = block.querySelector('[data-aue-prop="leftImage"]');
  const centerLogoLink = block.querySelector('[data-aue-prop="centerLogoLink"]');
  const centerLogo = block.querySelector('[data-aue-prop="centerLogo"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const loginText = block.querySelector('[data-aue-prop="loginText"]');
  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  const footerPrimaryLogo = block.querySelector('[data-aue-prop="footerPrimaryLogo"]');
  const footerSecondaryLogo = block.querySelector('[data-aue-prop="footerSecondaryLogo"]');
  const footerListItems = block.querySelectorAll('[data-aue-model="footerListItem"]');
  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  const footerLeftLink = block.querySelector('[data-aue-prop="footerLeftLink"]');
  const footerLeftLinkText = block.querySelector('[data-aue-prop="footerLeftLinkText"]');
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');

  block.textContent = '';

  const headerSection = document.createElement('section');
  headerSection.className = 'header-section position-relative mb-15';

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'header-section-app-name d-none';
    appNameSpan.textContent = appName.textContent;
    moveInstrumentation(appName, appNameSpan);
    headerSection.append(appNameSpan);
  }

  const header = document.createElement('header');
  header.className = 'header-section-boing-container boing-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-section-d-flex d-flex w-25';
  if (leftImage) {
    headerLeftDiv.append(leftImage);
  }
  moveInstrumentation(block.querySelector('.header-section-d-flex.d-flex.w-25:first-child'), headerLeftDiv);
  header.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-section-d-flex d-flex justify-content-center w-25';
  if (centerLogoLink) {
    const centerLogoAnchor = document.createElement('a');
    centerLogoAnchor.href = centerLogoLink.href || '#';
    centerLogoAnchor.className = 'header-section-analytics_cta_click analytics_cta_click';
    centerLogoAnchor.setAttribute('data-ct', '');
    centerLogoAnchor.setAttribute('a-label', 'header-logo-boing');

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header__logo d-flex align-items-center';
    if (centerLogo) {
      const picture = createOptimizedPicture(centerLogo.src, centerLogo.alt, true, [{ width: '200' }]);
      logoDiv.append(picture);
      moveInstrumentation(centerLogo, picture);
    }
    centerLogoAnchor.append(logoDiv);
    moveInstrumentation(centerLogoLink, centerLogoAnchor);
    headerCenterDiv.append(centerLogoAnchor);
  }
  moveInstrumentation(block.querySelector('.header-section-d-flex.d-flex.justify-content-center.w-25'), headerCenterDiv);
  header.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-section-d-flex d-flex w-25 justify-content-end';
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href || '#';
    loginAnchor.className = 'header__login-btn-wrapper analytics_cta_click';
    loginAnchor.style.display = 'inline';

    const loginButton = document.createElement('button');
    loginButton.className = 'header__login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
    if (loginText) {
      loginButton.textContent = loginText.textContent;
      moveInstrumentation(loginText, loginButton);
    } else {
      loginButton.textContent = 'Login';
    }
    loginAnchor.append(loginButton);
    moveInstrumentation(loginLink, loginAnchor);
    headerRightDiv.append(loginAnchor);
  }
  moveInstrumentation(block.querySelector('.header-section-d-flex.d-flex.w-25.justify-content-end'), headerRightDiv);
  header.append(headerRightDiv);

  headerSection.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-section-submenu-container submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-section-sidebar sidebar start-0 bg-white position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-section-sidebar__menu sidebar__menu list-unstyled px-4';

  sidebarMenuItems.forEach((itemNode) => {
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const text = itemNode.querySelector('[data-aue-prop="text"]');

    const listItem = document.createElement('li');
    listItem.className = 'header-section-sidebar__menu-item sidebar__menu-item py-6 border-bottom border-boing-neutral-gray-200';
    if (text && text.textContent.toLowerCase() === 'logout') {
      listItem.classList.add('sidebar__menu-item--logout');
      listItem.style.display = 'none';
    }

    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href || '#';
      anchor.className = 'header-section-sidebar__menu-link sidebar__menu-link d-flex align-items-center text-decoration-none px-6 fw-medium analytics_cta_click';
      if (text && text.textContent.toLowerCase() === 'logout') {
        anchor.classList.add('sidebar__menu-item--logout-btn');
      }
      anchor.setAttribute('data-consent', link.getAttribute('data-consent') || 'false');
      anchor.setAttribute('data-link', link.getAttribute('data-link') || '');

      if (icon) {
        const picture = createOptimizedPicture(icon.src, icon.alt);
        picture.classList.add('header-section-sidebar__menu-icon', 'sidebar__menu-icon', 'me-4');
        anchor.append(picture);
        moveInstrumentation(icon, picture);
      }
      if (text) {
        anchor.append(text.textContent);
        moveInstrumentation(text, anchor);
      }
      listItem.append(anchor);
      moveInstrumentation(link, anchor);
    }
    sidebarMenu.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });
  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-section-sidebar__curve sidebar__curve';
  sidebar.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-section-footer-brand footer-brand w-100 bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerPrimary = document.createElement('section');
  footerPrimary.className = 'header-section-footer-brand__primary footer-brand__primary';
  footerPrimary.style.backgroundColor = '';

  const containerPrimary = document.createElement('div');
  containerPrimary.className = 'header-section-container container';

  const contentPrimary = document.createElement('div');
  contentPrimary.className = 'header-section-footer-brand__primary--content footer-brand__primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-section-footer-brand__left footer-brand__left d-flex gap-16 px-10 align-items-center justify-content-center';

  if (footerPrimaryLogo) {
    const primaryLogoLink = document.createElement('a');
    primaryLogoLink.href = footerPrimaryLogo.closest('a')?.href || '#';
    primaryLogoLink.target = '_blank';
    primaryLogoLink.className = 'header-section-footer-brand__logo footer-brand__logo d-inline-block analytics_cta_click';
    primaryLogoLink.setAttribute('data-cta-region', 'Footer');
    primaryLogoLink.setAttribute('aria-label', footerPrimaryLogo.alt || 'ITC Logo');

    const picture = createOptimizedPicture(footerPrimaryLogo.src, footerPrimaryLogo.alt);
    picture.classList.add('header-section-object-fit-contain', 'object-fit-contain', 'w-100', 'h-100', 'no-rendition');
    primaryLogoLink.append(picture);
    moveInstrumentation(footerPrimaryLogo, picture);
    footerBrandLeft.append(primaryLogoLink);
  }

  if (footerSecondaryLogo) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.className = 'header-section-footer-brand__secondary--logo footer-brand__secondary--logo d-inline-block';

    const picture = createOptimizedPicture(footerSecondaryLogo.src, footerSecondaryLogo.alt);
    picture.classList.add('header-section-object-fit-contain', 'object-fit-contain', 'w-100', 'no-rendition');
    secondaryLogoDiv.append(picture);
    moveInstrumentation(footerSecondaryLogo, picture);
    footerBrandLeft.append(secondaryLogoDiv);
  }
  contentPrimary.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-section-footer-brand__right footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-section-footer-brand__navbar footer-brand__navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-section-footer-brand__navbar--left footer-brand__navbar--left d-flex flex-column flex-md-row';

  const footerListContainers = [];
  // Group footerListItems into 4 lists, 2 for left, 2 for right
  for (let i = 0; i < 4; i += 1) {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-section-footerList footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-section-footer-list footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
    footerListDiv.append(ul);
    footerListContainers.push(ul);
  }

  footerListItems.forEach((itemNode, index) => {
    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const text = itemNode.querySelector('[data-aue-prop="text"]');

    const listItem = document.createElement('li');
    listItem.className = 'header-section-footer-list__item footer-list__item';

    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href || '#';
      anchor.className = 'header-section-cta-analytics cta-analytics analytics_cta_click footer-list__item--link d-inline-block';
      anchor.setAttribute('data-link-region', 'Footer List');
      if (link.target) {
        anchor.target = link.target;
      }
      if (text) {
        anchor.textContent = text.textContent;
        moveInstrumentation(text, anchor);
      } else {
        anchor.textContent = link.textContent;
      }
      listItem.append(anchor);
      moveInstrumentation(link, anchor);
    }
    const listIndex = Math.floor(index / 3); // Distribute items across 4 lists
    if (footerListContainers[listIndex]) {
      footerListContainers[listIndex].append(listItem);
    }
    moveInstrumentation(itemNode, listItem);
  });

  footerNavbarLeft.append(footerListContainers[0].closest('.header-section-footerList'));
  footerNavbarLeft.append(footerListContainers[1].closest('.header-section-footerList'));
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-section-footer-brand__navbar--right footer-brand__navbar--right d-flex flex-column flex-md-row';
  footerNavbarRight.append(footerListContainers[2].closest('.header-section-footerList'));
  footerNavbarRight.append(footerListContainers[3].closest('.header-section-footerList'));
  footerNavbar.append(footerNavbarRight);

  footerBrandRight.append(footerNavbar);
  contentPrimary.append(footerBrandRight);
  containerPrimary.append(contentPrimary);
  footerPrimary.append(containerPrimary);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.className = 'header-section-footer-brand__secondary footer-brand__secondary';
  footerSecondary.style.backgroundColor = '';

  const containerSecondary = document.createElement('div');
  containerSecondary.className = 'header-section-container container';

  const contentSecondary = document.createElement('div');
  contentSecondary.className = 'header-section-footer-brand__secondary--content footer-brand__secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.className = 'header-section-footer-brand__right footer-brand__right d-flex flex-column pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-section-social_media--title social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  footerBrandRightSecondary.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-section-footer-brand__right--list footer-brand__right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  footerSocialLinks.forEach((itemNode) => {
    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    const listItem = document.createElement('li');
    listItem.className = 'header-section-footer-brand__right--item footer-brand__right--item d-flex justify-content-center align-items-center';

    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href || '#';
      anchor.target = '_blank';
      anchor.className = 'header-section-footer-brand__right--link footer-brand__right--link d-flex justify-content-center align-items-center analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      // Extract platform name from href for data-cta-label and data-platform-name
      const url = new URL(link.href);
      const platformName = url.hostname.split('.')[1] || 'social';
      anchor.setAttribute('data-cta-label', `footer-${platformName}`);
      anchor.setAttribute('data-platform-name', platformName);
      anchor.setAttribute('data-social-linktype', 'follow');

      if (icon) {
        const picture = createOptimizedPicture(icon.src, icon.alt);
        picture.classList.add('header-section-object-fit-contain', 'object-fit-contain', 'w-100', 'h-100', 'no-rendition');
        picture.setAttribute('aria-label', platformName);
        anchor.append(picture);
        moveInstrumentation(icon, picture);
      }
      listItem.append(anchor);
      moveInstrumentation(link, anchor);
    }
    socialMediaList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });
  footerBrandRightSecondary.append(socialMediaList);
  contentSecondary.append(footerBrandRightSecondary);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.className = 'header-section-footer-brand__left footer-brand__left py-5 d-flex flex-column gap-3';

  const footerLeftList = document.createElement('ul');
  footerLeftList.className = 'header-section-footer-brand__left--list footer-brand__left--list d-flex align-items-center justify-content-center flex-wrap';

  if (footerLeftLink) {
    const listItem = document.createElement('li');
    listItem.className = 'header-section-footer-brand__left--item footer-brand__left--item foot_link';

    const anchor = document.createElement('a');
    anchor.href = footerLeftLink.href || '#';
    if (footerLeftLink.target) {
      anchor.target = footerLeftLink.target;
    }
    anchor.className = 'header-section-footer-brand__left--link footer-brand__left--link analytics_cta_click';
    anchor.setAttribute('data-cta-region', 'Footer');
    if (footerLeftLinkText) {
      anchor.textContent = footerLeftLinkText.textContent;
      moveInstrumentation(footerLeftLinkText, anchor);
    } else {
      anchor.textContent = footerLeftLink.textContent;
    }
    listItem.append(anchor);
    moveInstrumentation(footerLeftLink, anchor);
    footerLeftList.append(listItem);
  }
  footerBrandLeftSecondary.append(footerLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-section-footer-brand__left--copyright footer-brand__left--copyright text-center';

  if (copyrightText) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'header-section-footer-brand__left--text footer-brand__left--text text-white';
    copyrightSpan.textContent = copyrightText.textContent;
    moveInstrumentation(copyrightText, copyrightSpan);
    copyrightDiv.append(copyrightSpan);
  }
  footerBrandLeftSecondary.append(copyrightDiv);
  contentSecondary.append(footerBrandLeftSecondary);
  containerSecondary.append(contentSecondary);
  footerSecondary.append(containerSecondary);
  footerBrand.append(footerSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.className = 'header-section-overlay overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  submenuContainer.append(overlay);

  headerSection.append(submenuContainer);

  block.append(headerSection);
  block.className = 'header-section block';
  block.dataset.blockStatus = 'loaded';
}