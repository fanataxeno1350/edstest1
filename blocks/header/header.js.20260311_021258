import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = document.createElement('span');
  appName.className = 'header-d-none header-app-name';
  appName.dataset.appName = 'boing';
  appName.textContent = 'boing';

  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-d-flex header-justify-content-center header-w-25';

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]') || block.querySelector('a[href^="/"]');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]') || block.querySelector('.header-header__logo-img');

  if (logoLink && logoImage) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href || '/';
    logoAnchor.className = 'header-analytics_cta_click';
    logoAnchor.setAttribute('data-ct', '');
    logoAnchor.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(logoLink, logoAnchor);

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';

    const picture = createOptimizedPicture(logoImage.src, logoImage.alt, true, [{ width: '750' }]);
    picture.querySelector('img').className = 'header-header__logo-img';
    moveInstrumentation(logoImage, picture.querySelector('img'));

    logoDiv.append(picture);
    logoAnchor.append(logoDiv);
    headerCenterDiv.append(logoAnchor);
  }

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';

  const loginLink = block.querySelector('[data-aue-prop="loginLink"]') || block.querySelector('a[href*="login.html"]');
  const loginText = block.querySelector('[data-aue-prop="loginText"]') || block.querySelector('.header-header__login-btn');

  if (loginLink && loginText) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href || '/login.html';
    loginAnchor.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
    loginAnchor.style.display = 'inline';
    moveInstrumentation(loginLink, loginAnchor);

    const loginButton = document.createElement('button');
    loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = loginText.textContent.trim();
    moveInstrumentation(loginText, loginButton);
    loginAnchor.append(loginButton);
    headerRightDiv.append(loginAnchor);
  }

  headerContainer.append(headerLeftDiv, headerCenterDiv, headerRightDiv);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const menuList = document.createElement('ul');
  menuList.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  const menuItems = block.querySelectorAll('[data-aue-model="headerMenuItem"]');
  menuItems.forEach((itemNode) => {
    const link = itemNode.querySelector('[data-aue-prop="link"]') || itemNode.querySelector('a');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]') || itemNode.querySelector('img');
    const title = itemNode.querySelector('[data-aue-prop="title"]') || itemNode.querySelector('a');

    if (link && icon && title) {
      const listItem = document.createElement('li');
      listItem.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
      if (itemNode.classList.contains('header-sidebar__menu-item--logout')) {
        listItem.classList.add('header-sidebar__menu-item--logout');
        listItem.style.display = 'none';
      }

      const anchor = document.createElement('a');
      anchor.href = link.href || '#';
      anchor.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      anchor.setAttribute('data-consent', 'false');
      anchor.setAttribute('data-link', link.getAttribute('data-link') || '');
      if (itemNode.classList.contains('header-sidebar__menu-item--logout')) {
        anchor.classList.add('header-sidebar__menu-item--logout-btn');
      }
      moveInstrumentation(link, anchor);

      const picture = createOptimizedPicture(icon.src, icon.alt);
      picture.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      moveInstrumentation(icon, picture.querySelector('img'));

      anchor.append(picture);
      const titleSpan = document.createElement('span');
      titleSpan.textContent = title.textContent.trim();
      moveInstrumentation(title, titleSpan);
      anchor.append(titleSpan);

      listItem.append(anchor);
      menuList.append(listItem);
      moveInstrumentation(itemNode, listItem);
    }
  });

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerPrimary = document.createElement('section');
  footerPrimary.className = 'header-footer-brand__primary';
  footerPrimary.style.backgroundColor = '';

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const itcLogo = block.querySelector('[data-aue-prop="itcLogo"]') || block.querySelector('a[href*="itcportal.com"] img');
  if (itcLogo) {
    const itcAnchor = document.createElement('a');
    itcAnchor.href = itcLogo.closest('a')?.href || 'https://www.itcportal.com/';
    itcAnchor.target = '_blank';
    itcAnchor.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    itcAnchor.setAttribute('data-cta-region', 'Footer');
    itcAnchor.setAttribute('aria-label', 'ITC Logo');
    moveInstrumentation(itcLogo.closest('a'), itcAnchor);

    const picture = createOptimizedPicture(itcLogo.src, itcLogo.alt);
    picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    moveInstrumentation(itcLogo, picture.querySelector('img'));
    itcAnchor.append(picture);
    footerBrandLeft.append(itcAnchor);
  }

  const fssiLogo = block.querySelector('[data-aue-prop="fssiLogo"]') || block.querySelector('img[alt="FSSI Logo"]');
  if (fssiLogo) {
    const fssiDiv = document.createElement('div');
    fssiDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';

    const picture = createOptimizedPicture(fssiLogo.src, fssiLogo.alt);
    picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
    moveInstrumentation(fssiLogo, picture.querySelector('img'));
    fssiDiv.append(picture);
    footerBrandLeft.append(fssiDiv);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const footerLinkGroups = [[], [], [], []]; // Max 4 groups based on HTML
  footerLinks.forEach((linkNode, index) => {
    const groupIndex = index % 4;
    footerLinkGroups[groupIndex].push(linkNode);
  });

  footerLinkGroups.forEach((group, groupIndex) => {
    if (group.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'header-footerList';

      const ul = document.createElement('ul');
      ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

      group.forEach((linkNode) => {
        const link = linkNode.querySelector('[data-aue-prop="link"]') || linkNode.querySelector('a');
        const title = linkNode.querySelector('[data-aue-prop="title"]') || linkNode.querySelector('a');

        if (link && title) {
          const li = document.createElement('li');
          li.className = 'header-footer-list__item';

          const anchor = document.createElement('a');
          anchor.href = link.href || '#';
          anchor.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
          anchor.setAttribute('data-link-region', 'Footer List');
          if (link.target) anchor.target = link.target;
          anchor.textContent = title.textContent.trim();
          moveInstrumentation(link, anchor);
          moveInstrumentation(title, anchor);

          li.append(anchor);
          ul.append(li);
          moveInstrumentation(linkNode, li);
        }
      });
      footerListDiv.append(ul);
      if (groupIndex < 2) {
        footerNavbarLeft.append(footerListDiv);
      } else {
        if (!footerNavbarRight.children.length) {
          footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
        }
        footerNavbarRight.append(footerListDiv);
      }
    }
  });

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';

  footerNavbar.append(footerNavbarLeft, footerNavbarRight);
  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandLeft, footerBrandRight);
  footerContainer.append(footerPrimaryContent);
  footerPrimary.append(footerContainer);

  const footerSecondary = document.createElement('section');
  footerSecondary.className = 'header-footer-brand__secondary';
  footerSecondary.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const footerBrandRightSocial = document.createElement('section');
  footerBrandRightSocial.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((itemNode) => {
    const link = itemNode.querySelector('[data-aue-prop="link"]') || itemNode.querySelector('a');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]') || itemNode.querySelector('img');

    if (link && icon) {
      const listItem = document.createElement('li');
      listItem.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

      const anchor = document.createElement('a');
      anchor.href = link.href || '#';
      anchor.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${icon.alt?.toLowerCase() || 'social'}`);
      anchor.target = '_blank';
      anchor.setAttribute('data-platform-name', icon.alt?.toLowerCase() || '');
      anchor.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(link, anchor);

      const picture = createOptimizedPicture(icon.src, icon.alt);
      picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      picture.querySelector('img').setAttribute('aria-label', icon.alt?.toLowerCase() || '');
      moveInstrumentation(icon, picture.querySelector('img'));

      anchor.append(picture);
      listItem.append(anchor);
      socialList.append(listItem);
      moveInstrumentation(itemNode, listItem);
    }
  });

  footerBrandRightSocial.append(socialTitle, socialList);

  const footerBrandLeftCopyright = document.createElement('section');
  footerBrandLeftCopyright.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const itcPortalList = document.createElement('ul');
  itcPortalList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  const itcPortalListItem = document.createElement('li');
  itcPortalListItem.className = 'header-footer-brand__left--item header-foot_link';

  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  itcPortalListItem.append(itcPortalLink);
  itcPortalList.append(itcPortalListItem);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';

  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  const copyrightText = block.querySelector('[data-aue-prop="copyright"]') || block.querySelector('.header-footer-brand__left--copyright span');
  copyrightSpan.textContent = copyrightText ? copyrightText.textContent.trim() : '© 2026 Bingo! All Rights Reserved.';
  if (copyrightText) moveInstrumentation(copyrightText, copyrightSpan);
  copyrightDiv.append(copyrightSpan);

  footerBrandLeftCopyright.append(itcPortalList, copyrightDiv);

  footerSecondaryContent.append(footerBrandRightSocial, footerBrandLeftCopyright);
  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondary.append(footerSecondaryContainer);

  footerBrand.append(footerPrimary, footerSecondary);
  aside.append(menuList, sidebarCurve, footerBrand);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';

  submenuContainer.append(aside, overlay);

  const section = document.createElement('section');
  section.className = 'header-position-relative header-mb-15';
  section.append(appName, headerContainer, submenuContainer);

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
