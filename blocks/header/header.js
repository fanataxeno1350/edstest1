import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const headerLogo = block.querySelector('[data-aue-prop="headerLogo"]');
  const headerLogoLink = block.querySelector('[data-aue-prop="headerLogoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const menuItems = block.querySelectorAll('[data-aue-model="menuItem"]');
  const footerPrimaryLogo = block.querySelector('[data-aue-prop="footerPrimaryLogo"]');
  const footerSecondaryLogo = block.querySelector('[data-aue-prop="footerSecondaryLogo"]');
  const footerListItems = block.querySelectorAll('[data-aue-model="footerListItem"]');
  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  const copyright = block.querySelector('[data-aue-prop="copyright"]');

  block.textContent = '';

  const headerSection = document.createElement('section');
  headerSection.className = 'header-section header-position-relative header-mb-15';

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'header-section-app-name header-d-none';
    appNameSpan.setAttribute('data-app-name', appName.textContent);
    moveInstrumentation(appName, appNameSpan);
    appNameSpan.textContent = appName.textContent;
    headerSection.append(appNameSpan);
  }

  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-section-boing-container header header-boing-container header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const headerFlexLeft = document.createElement('div');
  headerFlexLeft.className = 'header-section-d-flex header-d-flex header-w-25';
  headerContainer.append(headerFlexLeft);

  const headerFlexCenter = document.createElement('div');
  headerFlexCenter.className = 'header-section-d-flex header-d-flex header-justify-content-center header-w-25';
  if (headerLogoLink) {
    const logoLink = document.createElement('a');
    logoLink.href = headerLogoLink.href;
    logoLink.className = 'header-section-analytics_cta_click header-analytics_cta_click';
    logoLink.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(headerLogoLink, logoLink);

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';

    if (headerLogo) {
      const picture = createOptimizedPicture(headerLogo.src, headerLogo.alt);
      picture.querySelector('img').className = 'header-header__logo-img';
      picture.querySelector('img').setAttribute('fetchpriority', 'high');
      picture.querySelector('img').setAttribute('loading', 'eager');
      moveInstrumentation(headerLogo, picture);
      logoDiv.append(picture);
    }
    logoLink.append(logoDiv);
    headerFlexCenter.append(logoLink);
  }
  headerContainer.append(headerFlexCenter);

  const headerFlexRight = document.createElement('div');
  headerFlexRight.className = 'header-section-d-flex header-d-flex header-w-25 header-justify-content-end';
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href;
    loginAnchor.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
    loginAnchor.style.display = 'inline';
    moveInstrumentation(loginLink, loginAnchor);

    const loginButton = document.createElement('button');
    loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = loginLink.textContent.trim();
    loginAnchor.append(loginButton);
    headerFlexRight.append(loginAnchor);
  }
  headerContainer.append(headerFlexRight);
  headerSection.append(headerContainer);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-section-submenu-container header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-section-sidebar header-sidebar header-start-0 header-bg-white header-position-absolute';

  const menuList = document.createElement('ul');
  menuList.className = 'header-section-sidebar__menu header-sidebar__menu header-list-unstyled header-px-4';

  menuItems.forEach((itemNode) => {
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const label = itemNode.querySelector('[data-aue-prop="label"]');

    const menuItemLi = document.createElement('li');
    menuItemLi.className = 'header-section-sidebar__menu-item header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    if (itemNode.classList.contains('header-sidebar__menu-item--logout')) {
      menuItemLi.classList.add('header-sidebar__menu-item--logout');
      menuItemLi.style.display = 'none';
    }

    if (link) {
      const menuLink = document.createElement('a');
      menuLink.href = link.href;
      menuLink.className = 'header-section-sidebar__menu-link header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      menuLink.setAttribute('data-consent', link.getAttribute('data-consent') || 'false');
      menuLink.setAttribute('data-link', link.getAttribute('data-link') || '');
      moveInstrumentation(link, menuLink);

      if (icon) {
        const picture = createOptimizedPicture(icon.src, icon.alt);
        picture.querySelector('img').className = 'header-section-sidebar__menu-icon header-sidebar__menu-icon header-me-4';
        picture.querySelector('img').setAttribute('loading', 'lazy');
        moveInstrumentation(icon, picture);
        menuLink.append(picture);
      }
      if (label) {
        menuLink.append(label.textContent.trim());
        moveInstrumentation(label, menuLink);
      } else if (link.textContent) {
        menuLink.append(link.textContent.trim());
      }
      if (itemNode.classList.contains('header-sidebar__menu-item--logout')) {
        menuLink.classList.add('header-sidebar__menu-item--logout-btn');
      }
      menuItemLi.append(menuLink);
    }
    menuList.append(menuItemLi);
    moveInstrumentation(itemNode, menuItemLi);
  });
  sidebar.append(menuList);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-section-sidebar__curve header-sidebar__curve';
  sidebar.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-section-footer-brand header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.className = 'header-section-footer-brand__primary header-footer-brand__primary';
  footerPrimarySection.style.backgroundColor = '';

  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.className = 'header-section-container header-container';

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-section-footer-brand__primary--content header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-section-footer-brand__left header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  if (footerPrimaryLogo) {
    const primaryLogoLink = document.createElement('a');
    primaryLogoLink.href = 'https://www.itcportal.com/';
    primaryLogoLink.target = '_blank';
    primaryLogoLink.className = 'header-section-footer-brand__logo header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    primaryLogoLink.setAttribute('data-cta-region', 'Footer');
    primaryLogoLink.setAttribute('aria-label', 'ITC Logo');

    const primaryPicture = createOptimizedPicture(footerPrimaryLogo.src, footerPrimaryLogo.alt);
    primaryPicture.querySelector('img').className = 'header-section-object-fit-contain header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    primaryPicture.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(footerPrimaryLogo, primaryPicture);
    primaryLogoLink.append(primaryPicture);
    footerBrandLeft.append(primaryLogoLink);
  }

  if (footerSecondaryLogo) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.className = 'header-section-footer-brand__secondary--logo header-footer-brand__secondary--logo header-d-inline-block';

    const secondaryPicture = createOptimizedPicture(footerSecondaryLogo.src, footerSecondaryLogo.alt);
    secondaryPicture.querySelector('img').className = 'header-section-object-fit-contain header-object-fit-contain header-w-100 header-no-rendition';
    secondaryPicture.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(footerSecondaryLogo, secondaryPicture);
    secondaryLogoDiv.append(secondaryPicture);
    footerBrandLeft.append(secondaryLogoDiv);
  }
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-section-footer-brand__right header-footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-section-footer-brand__navbar header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-section-footer-brand__navbar--left header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';

  const footerLists = [[], [], [], []]; // Group into 4 lists

  footerListItems.forEach((itemNode, index) => {
    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const label = itemNode.querySelector('[data-aue-prop="label"]');

    const listItem = document.createElement('li');
    listItem.className = 'header-section-footer-list__item header-footer-list__item';

    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-section-cta-analytics header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      anchor.setAttribute('data-link-region', 'Footer List');
      if (link.target) anchor.target = link.target;
      anchor.textContent = label ? label.textContent.trim() : link.textContent.trim();
      moveInstrumentation(link, anchor);
      if (label) moveInstrumentation(label, anchor);
      listItem.append(anchor);
    }
    moveInstrumentation(itemNode, listItem);
    footerLists[index % 4].push(listItem);
  });

  footerLists.forEach((listItems, listIndex) => {
    if (listItems.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'header-section-footerList header-footerList';

      const ul = document.createElement('ul');
      ul.className = 'header-section-footer-list header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
      listItems.forEach(item => ul.append(item));

      footerListDiv.append(ul);
      if (listIndex < 2) {
        footerNavbarLeft.append(footerListDiv);
      } else {
        if (!footerNavbar.querySelector('.header-section-footer-brand__navbar--right')) {
          const footerNavbarRight = document.createElement('div');
          footerNavbarRight.className = 'header-section-footer-brand__navbar--right header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
          footerNavbar.append(footerNavbarRight);
        }
        footerNavbar.querySelector('.header-section-footer-brand__navbar--right').append(footerListDiv);
      }
    }
  });

  footerNavbar.prepend(footerNavbarLeft);
  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerPrimaryContainer.append(footerPrimaryContent);
  footerPrimarySection.append(footerPrimaryContainer);
  footerBrand.append(footerPrimarySection);

  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.className = 'header-section-footer-brand__secondary header-footer-brand__secondary';
  footerSecondarySection.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-section-container header-container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-section-footer-brand__secondary--content header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaRight = document.createElement('section');
  socialMediaRight.className = 'header-section-footer-brand__right header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-section-social_media--title header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaRight.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-section-footer-brand__right--list header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  socialLinks.forEach((itemNode) => {
    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    const socialLi = document.createElement('li');
    socialLi.className = 'header-section-footer-brand__right--item header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    if (link) {
      const socialAnchor = document.createElement('a');
      socialAnchor.href = link.href;
      socialAnchor.className = 'header-section-footer-brand__right--link header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      socialAnchor.setAttribute('data-cta-region', 'Footer');
      socialAnchor.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
      socialAnchor.target = '_blank';
      socialAnchor.setAttribute('data-platform-name', icon.alt.toLowerCase());
      socialAnchor.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(link, socialAnchor);

      if (icon) {
        const picture = createOptimizedPicture(icon.src, icon.alt);
        picture.querySelector('img').setAttribute('aria-label', icon.alt.toLowerCase());
        picture.querySelector('img').className = 'header-section-object-fit-contain header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
        picture.querySelector('img').setAttribute('loading', 'lazy');
        moveInstrumentation(icon, picture);
        socialAnchor.append(picture);
      }
      socialLi.append(socialAnchor);
    }
    socialList.append(socialLi);
    moveInstrumentation(itemNode, socialLi);
  });
  socialMediaRight.append(socialList);
  footerSecondaryContent.append(socialMediaRight);

  const footerBottomLeft = document.createElement('section');
  footerBottomLeft.className = 'header-section-footer-brand__left header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const footerBottomList = document.createElement('ul');
  footerBottomList.className = 'header-section-footer-brand__left--list header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  if (itcPortalLink) {
    const itcLi = document.createElement('li');
    itcLi.className = 'header-section-footer-brand__left--item header-footer-brand__left--item header-foot_link';
    const itcAnchor = document.createElement('a');
    itcAnchor.href = itcPortalLink.href;
    itcAnchor.target = '_blank';
    itcAnchor.className = 'header-section-footer-brand__left--link header-footer-brand__left--link header-analytics_cta_click';
    itcAnchor.setAttribute('data-cta-region', 'Footer');
    itcAnchor.textContent = itcPortalLink.textContent.trim();
    moveInstrumentation(itcPortalLink, itcAnchor);
    itcLi.append(itcAnchor);
    footerBottomList.append(itcLi);
  }
  footerBottomLeft.append(footerBottomList);

  if (copyright) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'header-section-footer-brand__left--copyright header-footer-brand__left--copyright header-text-center';
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'header-section-footer-brand__left--text header-footer-brand__left--text header-text-white';
    copyrightSpan.textContent = copyright.textContent.trim();
    moveInstrumentation(copyright, copyrightSpan);
    copyrightDiv.append(copyrightSpan);
    footerBottomLeft.append(copyrightDiv);
  }

  footerSecondaryContent.append(footerBottomLeft);
  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondarySection.append(footerSecondaryContainer);
  footerBrand.append(footerSecondarySection);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.className = 'header-section-overlay header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  headerSection.append(submenuContainer);
  block.append(headerSection);

  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
