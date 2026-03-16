import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('section');
  headerSection.className = 'header-section position-relative mb-15';

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-section-app-name d-none';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  headerSection.append(appNameSpan);

  const header = document.createElement('header');
  header.className = 'header-section-boing-container boing-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const leftDiv = document.createElement('div');
  leftDiv.className = 'header-section-d-flex d-flex w-25';
  // No authored content for leftIcon, so we just create the div
  header.append(leftDiv);

  const middleDiv = document.createElement('div');
  middleDiv.className = 'header-section-d-flex d-flex justify-content-center w-25';
  const logoLink = document.querySelector('[data-aue-prop="logoLink"]');
  const logoImage = document.querySelector('[data-aue-prop="logoImage"]');
  if (logoLink && logoImage) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.getAttribute('href') || '/';
    logoAnchor.className = 'header-section-analytics_cta_click analytics_cta_click';
    logoAnchor.setAttribute('data-ct', '');
    logoAnchor.setAttribute('a-label', 'header-logo-boing');

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header__logo d-flex align-items-center';

    const picture = createOptimizedPicture(logoImage.src, logoImage.alt);
    picture.querySelector('img').className = 'header__logo-img';
    logoDiv.append(picture);
    moveInstrumentation(logoImage, picture);

    logoAnchor.append(logoDiv);
    moveInstrumentation(logoLink, logoAnchor);
    middleDiv.append(logoAnchor);
  }
  header.append(middleDiv);

  const rightDiv = document.createElement('div');
  rightDiv.className = 'header-section-d-flex d-flex w-25 justify-content-end';
  const loginLink = document.querySelector('[data-aue-prop="loginLink"]');
  const loginText = document.querySelector('[data-aue-prop="loginText"]');
  if (loginLink && loginText) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.getAttribute('href') || '#';
    loginAnchor.className = 'header__login-btn-wrapper analytics_cta_click';
    loginAnchor.style.display = 'inline';

    const loginButton = document.createElement('button');
    loginButton.className = 'header__login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
    loginButton.textContent = loginText.textContent.trim();
    moveInstrumentation(loginText, loginButton);

    loginAnchor.append(loginButton);
    moveInstrumentation(loginLink, loginAnchor);
    rightDiv.append(loginAnchor);
  }
  header.append(rightDiv);
  headerSection.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-section-submenu-container submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-section-sidebar sidebar start-0 bg-white position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-section-sidebar__menu sidebar__menu list-unstyled px-4';

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-section-sidebar__menu-item sidebar__menu-item py-6 border-bottom border-boing-neutral-gray-200';
    if (itemNode.querySelector('a[href="/"]')) {
      listItem.classList.add('sidebar__menu-item--logout');
      listItem.style.display = 'none';
    }

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    const text = itemNode.querySelector('[data-aue-prop="text"]');

    if (link && icon && text) {
      const anchor = document.createElement('a');
      anchor.href = link.getAttribute('href') || '#';
      anchor.className = 'header-section-sidebar__menu-link sidebar__menu-link d-flex align-items-center text-decoration-none px-6 fw-medium analytics_cta_click';
      anchor.setAttribute('data-consent', link.getAttribute('data-consent') || 'false');
      anchor.setAttribute('data-link', link.getAttribute('data-link') || '');
      if (listItem.classList.contains('sidebar__menu-item--logout')) {
        anchor.classList.add('sidebar__menu-item--logout-btn');
      }

      const picture = createOptimizedPicture(icon.src, icon.alt);
      picture.querySelector('img').className = 'header-section-sidebar__menu-icon sidebar__menu-icon me-4';
      anchor.append(picture);
      moveInstrumentation(icon, picture);

      const textSpan = document.createElement('span');
      textSpan.textContent = text.textContent.trim();
      anchor.append(textSpan);
      moveInstrumentation(text, textSpan);

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

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-section-footer-brand__primary footer-brand__primary';

  const container = document.createElement('div');
  container.className = 'header-section-container container';

  const primaryContent = document.createElement('div');
  primaryContent.className = 'header-section-footer-brand__primary--content footer-brand__primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-section-footer-brand__left footer-brand__left d-flex gap-16 px-10 align-items-center justify-content-center';

  const footerLogo1 = document.querySelector('[data-aue-prop="footerLogo1"]');
  if (footerLogo1) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.href = footerLogo1.closest('a')?.href || '#';
    logo1Anchor.target = '_blank';
    logo1Anchor.className = 'header-section-footer-brand__logo footer-brand__logo d-inline-block analytics_cta_click';
    logo1Anchor.setAttribute('data-cta-region', 'Footer');
    logo1Anchor.setAttribute('aria-label', 'ITC Logo');

    const picture = createOptimizedPicture(footerLogo1.src, footerLogo1.alt);
    picture.querySelector('img').className = 'header-section-object-fit-contain object-fit-contain w-100 h-100 no-rendition';
    logo1Anchor.append(picture);
    moveInstrumentation(footerLogo1, picture);
    footerBrandLeft.append(logo1Anchor);
  }

  const footerLogo2 = document.querySelector('[data-aue-prop="footerLogo2"]');
  if (footerLogo2) {
    const logo2Div = document.createElement('div');
    logo2Div.className = 'header-section-footer-brand__secondary--logo footer-brand__secondary--logo d-inline-block';

    const picture = createOptimizedPicture(footerLogo2.src, footerLogo2.alt);
    picture.querySelector('img').className = 'header-section-object-fit-contain object-fit-contain w-100 no-rendition';
    logo2Div.append(picture);
    moveInstrumentation(footerLogo2, picture);
    footerBrandLeft.append(logo2Div);
  }
  primaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-section-footer-brand__right footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-section-footer-brand__navbar footer-brand__navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-section-footer-brand__navbar--left footer-brand__navbar--left d-flex flex-column flex-md-row';
  footerNavbar.append(footerNavbarLeft);

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');

  // Group footer links into lists of 3 or fewer
  let currentList = document.createElement('ul');
  currentList.className = 'header-section-footer-list footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
  footerNavbarLeft.append(currentList);
  moveInstrumentation(currentList, currentList);

  footerLinks.forEach((itemNode, index) => {
    if (index > 0 && index % 3 === 0) {
      currentList = document.createElement('ul');
      currentList.className = 'header-section-footer-list footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
      if (index < 6) {
        footerNavbarLeft.append(currentList);
      } else {
        if (!footerNavbar.querySelector('.header-section-footer-brand__navbar--right')) {
          const footerNavbarRight = document.createElement('div');
          footerNavbarRight.className = 'header-section-footer-brand__navbar--right footer-brand__navbar--right d-flex flex-column flex-md-row';
          footerNavbar.append(footerNavbarRight);
        }
        footerNavbar.querySelector('.header-section-footer-brand__navbar--right').append(currentList);
      }
      moveInstrumentation(currentList, currentList);
    }

    const listItem = document.createElement('li');
    listItem.className = 'header-section-footer-list__item footer-list__item';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const text = itemNode.querySelector('[data-aue-prop="text"]');

    if (link && text) {
      const anchor = document.createElement('a');
      anchor.href = link.getAttribute('href') || '#';
      anchor.className = 'header-section-cta-analytics cta-analytics analytics_cta_click footer-list__item--link d-inline-block';
      anchor.setAttribute('data-link-region', 'Footer List');
      if (link.hasAttribute('target')) {
        anchor.target = link.getAttribute('target');
      }
      anchor.textContent = text.textContent.trim();
      moveInstrumentation(text, anchor);
      moveInstrumentation(link, anchor);
      listItem.append(anchor);
    }
    currentList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });
  footerBrandRight.append(footerNavbar);
  primaryContent.append(footerBrandRight);
  container.append(primaryContent);
  footerBrandPrimary.append(container);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-section-footer-brand__secondary footer-brand__secondary';

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'header-section-container container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'header-section-footer-brand__secondary--content footer-brand__secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-section-footer-brand__right footer-brand__right d-flex flex-column pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-section-social_media--title social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-section-footer-brand__right--list footer-brand__right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-section-footer-brand__right--item footer-brand__right--item d-flex justify-content-center align-items-center';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    if (link && icon) {
      const anchor = document.createElement('a');
      anchor.href = link.getAttribute('href') || '#';
      anchor.className = 'header-section-footer-brand__right--link footer-brand__right--link d-flex justify-content-center align-items-center analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
      anchor.target = '_blank';
      anchor.setAttribute('data-platform-name', icon.alt.toLowerCase());
      anchor.setAttribute('data-social-linktype', 'follow');

      const picture = createOptimizedPicture(icon.src, icon.alt);
      picture.querySelector('img').className = 'header-section-object-fit-contain object-fit-contain w-100 h-100 no-rendition';
      picture.querySelector('img').setAttribute('aria-label', icon.alt.toLowerCase());
      anchor.append(picture);
      moveInstrumentation(icon, picture);

      listItem.append(anchor);
      moveInstrumentation(link, anchor);
    }
    socialMediaList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });
  socialMediaSection.append(socialMediaList);
  secondaryContent.append(socialMediaSection);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.className = 'header-section-footer-brand__left footer-brand__left py-5 d-flex flex-column gap-3';

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.className = 'header-section-footer-brand__left--list footer-brand__left--list d-flex align-items-center justify-content-center flex-wrap';

  const itcPortalLink = document.createElement('li');
  itcPortalLink.className = 'header-section-footer-brand__left--item footer-brand__left--item foot_link';
  const itcAnchor = document.createElement('a');
  itcAnchor.href = 'https://www.itcportal.com/';
  itcAnchor.target = '_blank';
  itcAnchor.className = 'header-section-footer-brand__left--link footer-brand__left--link analytics_cta_click';
  itcAnchor.setAttribute('data-cta-region', 'Footer');
  itcAnchor.textContent = 'ITC portal';
  itcPortalLink.append(itcAnchor);
  footerBrandLeftList.append(itcPortalLink);
  footerBrandLeftSecondary.append(footerBrandLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-section-footer-brand__left--copyright footer-brand__left--copyright text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-section-footer-brand__left--text footer-brand__left--text text-white';
  const copyright = block.querySelector('[data-aue-prop="copyright"]');
  if (copyright) {
    copyrightSpan.textContent = copyright.textContent.trim();
    moveInstrumentation(copyright, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  }
  copyrightDiv.append(copyrightSpan);
  footerBrandLeftSecondary.append(copyrightDiv);
  secondaryContent.append(footerBrandLeftSecondary);

  secondaryContainer.append(secondaryContent);
  footerBrandSecondary.append(secondaryContainer);
  footerBrand.append(footerBrandSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.className = 'header-section-overlay overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  submenuContainer.append(overlay);

  headerSection.append(submenuContainer);

  block.textContent = '';
  block.append(headerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}