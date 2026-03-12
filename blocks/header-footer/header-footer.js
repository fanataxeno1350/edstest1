import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-app-name]').textContent;

  const headerPositionRelative = document.createElement('section');
  headerPositionRelative.className = 'header-position-relative header-mb-15';

  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const headerDiv1 = document.createElement('div');
  headerDiv1.className = 'header-d-flex header-w-25';

  const headerDiv2 = document.createElement('div');
  headerDiv2.className = 'header-d-flex header-justify-content-center header-w-25';

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href;
    logoAnchor.className = 'header-analytics_cta_click';
    logoAnchor.setAttribute('data-ct', '');
    logoAnchor.setAttribute('a-label', 'header-logo-boing');

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';

    const logoImg = block.querySelector('[data-aue-prop="logo"]');
    if (logoImg) {
      const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
      picture.querySelector('img').className = 'header-header__logo-img';
      picture.querySelector('img').setAttribute('fetchpriority', 'high');
      picture.querySelector('img').setAttribute('loading', 'eager');
      logoDiv.append(picture);
      moveInstrumentation(logoImg, picture);
    }

    logoAnchor.append(logoDiv);
    headerDiv2.append(logoAnchor);
    moveInstrumentation(logoLink, logoAnchor);
  }

  const headerDiv3 = document.createElement('div');
  headerDiv3.className = 'header-d-flex header-w-25 header-justify-content-end';

  const loginLink = block.querySelector('.header-header__login-btn-wrapper a');
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href;
    loginAnchor.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
    loginAnchor.style.display = 'inline';

    const loginButton = document.createElement('button');
    loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = loginLink.textContent.trim();

    loginAnchor.append(loginButton);
    headerDiv3.append(loginAnchor);
    moveInstrumentation(loginLink, loginAnchor);
  }

  header.append(headerDiv1, headerDiv2, headerDiv3);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    const text = itemNode.querySelector('[data-aue-prop="text"]');

    if (link && icon && text) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      anchor.setAttribute('data-consent', link.getAttribute('data-consent') || 'false');
      anchor.setAttribute('data-link', link.getAttribute('data-link') || '');

      const picture = createOptimizedPicture(icon.src, icon.alt);
      picture.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      picture.querySelector('img').setAttribute('loading', 'lazy');
      anchor.append(picture);
      moveInstrumentation(icon, picture);

      anchor.append(text.textContent.trim());
      listItem.append(anchor);
      moveInstrumentation(link, anchor);
      moveInstrumentation(text, anchor);
    }
    sidebarMenu.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  const logoutItem = block.querySelector('.header-sidebar__menu-item--logout');
  if (logoutItem) {
    const logoutListItem = document.createElement('li');
    logoutListItem.className = 'header-sidebar__menu-item header-sidebar__menu-item--logout header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    logoutListItem.style.display = 'none';

    const logoutLink = logoutItem.querySelector('a');
    if (logoutLink) {
      const logoutAnchor = document.createElement('a');
      logoutAnchor.href = logoutLink.href;
      logoutAnchor.className = 'header-sidebar__menu-link header-sidebar__menu-item--logout-btn header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      logoutAnchor.setAttribute('data-consent', logoutLink.getAttribute('data-consent') || 'false');
      logoutAnchor.setAttribute('data-link', logoutLink.getAttribute('data-link') || '');

      const logoutImg = logoutLink.querySelector('img');
      if (logoutImg) {
        const picture = createOptimizedPicture(logoutImg.src, logoutImg.alt);
        picture.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
        picture.querySelector('img').setAttribute('loading', 'lazy');
        logoutAnchor.append(picture);
        moveInstrumentation(logoutImg, picture);
      }
      logoutAnchor.append(logoutLink.textContent.trim());
      logoutListItem.append(logoutAnchor);
      moveInstrumentation(logoutLink, logoutAnchor);
    }
    sidebarMenu.append(logoutListItem);
    moveInstrumentation(logoutItem, logoutListItem);
  }

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand__primary';
  footerBrandPrimary.style.backgroundColor = '';

  const container = document.createElement('div');
  container.className = 'header-container';

  const primaryContent = document.createElement('div');
  primaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const itcLogoLink = block.querySelector('[data-aue-prop="itcLogo"]');
  if (itcLogoLink) {
    const itcAnchor = document.createElement('a');
    itcAnchor.href = itcLogoLink.src;
    itcAnchor.target = '_blank';
    itcAnchor.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    itcAnchor.setAttribute('data-cta-region', 'Footer');
    itcAnchor.setAttribute('aria-label', 'ITC Logo');

    const itcPicture = createOptimizedPicture(itcLogoLink.src, itcLogoLink.alt);
    itcPicture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    itcPicture.querySelector('img').setAttribute('loading', 'lazy');
    itcAnchor.append(itcPicture);
    footerBrandLeft.append(itcAnchor);
    moveInstrumentation(itcLogoLink, itcAnchor);
  }

  const fssiLogo = block.querySelector('[data-aue-prop="fssiLogo"]');
  if (fssiLogo) {
    const fssiDiv = document.createElement('div');
    fssiDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';

    const fssiPicture = createOptimizedPicture(fssiLogo.src, fssiLogo.alt);
    fssiPicture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
    fssiPicture.querySelector('img').setAttribute('loading', 'lazy');
    fssiDiv.append(fssiPicture);
    footerBrandLeft.append(fssiDiv);
    moveInstrumentation(fssiLogo, fssiDiv);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const footerLists = [[], [], [], []]; // Group links into 4 lists based on authored structure
  footerLinks.forEach((linkNode, index) => {
    const link = linkNode.querySelector('[data-aue-prop="link"]');
    const text = linkNode.querySelector('[data-aue-prop="text"]');
    if (link && text) {
      footerLists[index % 4].push({ link, text, linkNode });
    }
  });

  footerLists.forEach((list, listIndex) => {
    if (list.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'header-footerList';

      const ul = document.createElement('ul');
      ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

      list.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'header-footer-list__item';

        const anchor = document.createElement('a');
        anchor.href = item.link.href;
        anchor.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        anchor.setAttribute('data-link-region', 'Footer List');
        if (item.link.target) {
          anchor.target = item.link.target;
        }
        anchor.textContent = item.text.textContent.trim();
        li.append(anchor);
        ul.append(li);
        moveInstrumentation(item.link, anchor);
        moveInstrumentation(item.text, anchor);
        moveInstrumentation(item.linkNode, li);
      });

      footerListDiv.append(ul);
      if (listIndex < 2) {
        footerNavbarLeft.append(footerListDiv);
      } else {
        footerNavbarRight.append(footerListDiv);
      }
    }
  });

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';

  footerNavbar.append(footerNavbarLeft, footerNavbarRight);
  footerBrandRight.append(footerNavbar);

  primaryContent.append(footerBrandLeft, footerBrandRight);
  container.append(primaryContent);
  footerBrandPrimary.append(container);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand__secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'header-container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((socialNode) => {
    const link = socialNode.querySelector('[data-aue-prop="link"]');
    const icon = socialNode.querySelector('[data-aue-prop="icon"]');

    if (link && icon) {
      const listItem = document.createElement('li');
      listItem.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
      anchor.target = '_blank';
      anchor.setAttribute('data-platform-name', icon.alt.toLowerCase());
      anchor.setAttribute('data-social-linktype', 'follow');

      const picture = createOptimizedPicture(icon.src, icon.alt);
      picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      picture.querySelector('img').setAttribute('aria-label', icon.alt.toLowerCase());
      picture.querySelector('img').setAttribute('loading', 'lazy');
      anchor.append(picture);
      listItem.append(anchor);
      socialList.append(listItem);
      moveInstrumentation(link, anchor);
      moveInstrumentation(icon, picture);
      moveInstrumentation(socialNode, listItem);
    }
  });

  socialMediaSection.append(socialList);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const footerLeftList = document.createElement('ul');
  footerLeftList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  const itcPortalLink = block.querySelector('.header-foot_link a');
  if (itcPortalLink) {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-brand__left--item header-foot_link';

    const anchor = document.createElement('a');
    anchor.href = itcPortalLink.href;
    anchor.target = '_blank';
    anchor.className = 'header-footer-brand__left--link header-analytics_cta_click';
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.textContent = itcPortalLink.textContent.trim();
    listItem.append(anchor);
    footerLeftList.append(listItem);
    moveInstrumentation(itcPortalLink, anchor);
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';

  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);

  footerBrandLeftSecondary.append(footerLeftList, copyrightDiv);

  secondaryContent.append(socialMediaSection, footerBrandLeftSecondary);
  secondaryContainer.append(secondaryContent);
  footerBrandSecondary.append(secondaryContainer);

  footerBrand.append(footerBrandPrimary, footerBrandSecondary);

  sidebar.append(sidebarMenu, sidebarCurve, footerBrand);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';

  submenuContainer.append(sidebar, overlay);

  headerPositionRelative.append(header, submenuContainer);

  block.textContent = '';
  block.append(headerPositionRelative);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
