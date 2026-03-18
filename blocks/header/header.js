import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const headerLogo = block.querySelector('[data-aue-prop="headerLogo"]');
  const headerLogoLink = block.querySelector('[data-aue-prop="headerLogoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const menuItems = block.querySelectorAll('[data-aue-model="menuItem"]');
  const footerLogoITC = block.querySelector('[data-aue-prop="footerLogoITC"]');
  const footerLogoFSSI = block.querySelector('[data-aue-prop="footerLogoFSSI"]');
  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');

  const rootDiv = document.createElement('div');
  rootDiv.classList.add('header-position-relative', 'header-mb-15');

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.classList.add('header-d-none', 'header-app-name');
    appNameSpan.dataset.appName = appName.textContent.trim();
    moveInstrumentation(appName, appNameSpan);
    appNameSpan.textContent = appName.textContent.trim();
    rootDiv.append(appNameSpan);
  }

  const headerEl = document.createElement('header');
  headerEl.classList.add('header-boing-container', 'header-header', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center', 'header-h-15', 'header-px-5', 'header-py-2', 'header-fixed-top', 'header-w-100', 'header-bg-white');

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.classList.add('header-d-flex', 'header-w-25');
  headerEl.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.classList.add('header-d-flex', 'header-justify-content-center', 'header-w-25');
  if (headerLogoLink) {
    const logoLink = document.createElement('a');
    logoLink.href = headerLogoLink.href;
    logoLink.classList.add('header-analytics_cta_click');
    logoLink.dataset.ct = '';
    logoLink.setAttribute('aria-label', 'header-logo-boing');
    moveInstrumentation(headerLogoLink, logoLink);

    const logoDiv = document.createElement('div');
    logoDiv.classList.add('header__logo', 'header-d-flex', 'header-align-items-center');
    if (headerLogo) {
      const picture = createOptimizedPicture(headerLogo.src, headerLogo.alt);
      picture.querySelector('img').classList.add('header__logo-img');
      picture.querySelector('img').setAttribute('fetchpriority', 'high');
      picture.querySelector('img').setAttribute('loading', 'eager');
      moveInstrumentation(headerLogo, picture);
      logoDiv.append(picture);
    }
    logoLink.append(logoDiv);
    headerCenterDiv.append(logoLink);
  }
  headerEl.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.classList.add('header-d-flex', 'header-w-25', 'header-justify-content-end');
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href;
    loginAnchor.classList.add('header__login-btn-wrapper', 'header-analytics_cta_click');
    loginAnchor.style.display = 'inline';
    moveInstrumentation(loginLink, loginAnchor);

    const loginButton = document.createElement('button');
    loginButton.classList.add('header__login-btn', 'header-btn', 'header-text-boing-primary', 'header-bg-transparent', 'header-fw-semibold', 'header-rounded-4', 'header-btn-sm', 'header-py-3', 'header-px-4');
    loginButton.textContent = loginLink.textContent.trim();
    loginAnchor.append(loginButton);
    headerRightDiv.append(loginAnchor);
  }
  headerEl.append(headerRightDiv);
  rootDiv.append(headerEl);

  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('header-submenu-container', 'header-position-fixed', 'header-top-0', 'header-start-0', 'header-end-0', 'header-m-auto', 'header-overflow-hidden');

  const aside = document.createElement('aside');
  aside.classList.add('header-sidebar', 'header-start-0', 'header-bg-white', 'header-position-absolute');

  const menuList = document.createElement('ul');
  menuList.classList.add('header-sidebar__menu', 'header-list-unstyled', 'header-px-4');

  menuItems.forEach((itemNode) => {
    const linkEl = itemNode.querySelector('[data-aue-prop="link"]');
    const iconEl = itemNode.querySelector('[data-aue-prop="icon"]');
    const labelEl = itemNode.querySelector('[data-aue-prop="label"]');

    const listItem = document.createElement('li');
    listItem.classList.add('header-sidebar__menu-item', 'header-py-6', 'header-border-bottom', 'header-border-boing-neutral-gray-200');

    const anchor = document.createElement('a');
    anchor.classList.add('header-sidebar__menu-link', 'header-d-flex', 'header-align-items-center', 'header-text-decoration-none', 'header-px-6', 'header-fw-medium', 'header-analytics_cta_click');
    if (linkEl) {
      anchor.href = linkEl.href;
      anchor.dataset.consent = 'false'; // Default value, adjust if needed
      anchor.dataset.link = linkEl.href.replace('.html', ''); // Adjust path as needed
      moveInstrumentation(linkEl, anchor);
    }

    if (iconEl) {
      const iconImg = createOptimizedPicture(iconEl.src, iconEl.alt);
      iconImg.querySelector('img').classList.add('header-sidebar__menu-icon', 'header-me-4');
      iconImg.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(iconEl, iconImg);
      anchor.append(iconImg);
    }
    if (labelEl) {
      anchor.append(labelEl.textContent.trim());
      moveInstrumentation(labelEl, anchor);
    }

    listItem.append(anchor);
    moveInstrumentation(itemNode, listItem);
    menuList.append(listItem);
  });

  // Add the logout item manually as it's a static element in the sample HTML
  const logoutListItem = document.createElement('li');
  logoutListItem.classList.add('header-sidebar__menu-item', 'header-sidebar__menu-item--logout', 'header-py-6', 'header-border-bottom', 'header-border-boing-neutral-gray-200');
  logoutListItem.style.display = 'none';
  const logoutAnchor = document.createElement('a');
  logoutAnchor.href = '/';
  logoutAnchor.classList.add('header-sidebar__menu-link', 'header-sidebar__menu-item--logout-btn', 'header-d-flex', 'header-align-items-center', 'header-text-decoration-none', 'header-px-6', 'header-fw-medium', 'header-analytics_cta_click');
  logoutAnchor.dataset.consent = 'false';
  logoutAnchor.dataset.link = '/content/boing/in/en/home';
  const logoutImg = createOptimizedPicture('/content/dam/aemigrate/uploaded-folder/image/logout-3-fmt-webp-alpha.webp', 'Logout');
  logoutImg.querySelector('img').classList.add('header-sidebar__menu-icon', 'header-me-4');
  logoutImg.querySelector('img').setAttribute('loading', 'lazy');
  logoutAnchor.append(logoutImg);
  logoutAnchor.append('Logout');
  logoutListItem.append(logoutAnchor);
  menuList.append(logoutListItem);

  aside.append(menuList);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar__curve');
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('header-footer-brand', 'header-w-100', 'header-bg-boing-neutral-gray-600');
  footerBrand.dataset.isdoodlevariation = 'false';

  const footerPrimary = document.createElement('section');
  footerPrimary.classList.add('header-footer-brand__primary');
  footerPrimary.style.backgroundColor = '';

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('header-container');

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.classList.add('header-footer-brand__primary--content', 'header-d-flex', 'header-flex-column', 'header-flex-md-row', 'header-justify-content-md-between', 'header-align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('header-footer-brand__left', 'header-d-flex', 'header-gap-16', 'header-px-10', 'header-align-items-center', 'header-justify-content-center');

  if (footerLogoITC) {
    const itcLink = document.createElement('a');
    itcLink.href = 'https://www.itcportal.com/';
    itcLink.target = '_blank';
    itcLink.classList.add('header-footer-brand__logo', 'header-d-inline-block', 'header-analytics_cta_click');
    itcLink.dataset.ctaRegion = 'Footer';
    itcLink.setAttribute('aria-label', 'ITC Logo');
    moveInstrumentation(footerLogoITC, itcLink);

    const itcPicture = createOptimizedPicture(footerLogoITC.src, footerLogoITC.alt);
    itcPicture.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
    itcPicture.querySelector('img').setAttribute('loading', 'lazy');
    itcLink.append(itcPicture);
    footerBrandLeft.append(itcLink);
  }

  if (footerLogoFSSI) {
    const fssiDiv = document.createElement('div');
    fssiDiv.classList.add('header-footer-brand__secondary--logo', 'header-d-inline-block');
    const fssiPicture = createOptimizedPicture(footerLogoFSSI.src, footerLogoFSSI.alt);
    fssiPicture.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-no-rendition');
    fssiPicture.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(footerLogoFSSI, fssiPicture);
    fssiDiv.append(fssiPicture);
    footerBrandLeft.append(fssiDiv);
  }
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('header-footer-brand__right');

  const footerNav = document.createElement('nav');
  footerNav.classList.add('header-footer-brand__navbar', 'header-d-grid', 'header-d-md-flex');
  footerNav.setAttribute('aria-label', 'footer navbar');

  const footerNavLeft = document.createElement('div');
  footerNavLeft.classList.add('header-footer-brand__navbar--left', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');

  // Group footer links into 4 columns as per the authored HTML
  const footerLinkGroups = [[], [], [], []];
  footerLinks.forEach((itemNode, index) => {
    footerLinkGroups[index % 4].push(itemNode);
  });

  footerLinkGroups.forEach((group) => {
    if (group.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.classList.add('header-footerList');
      const footerListUl = document.createElement('ul');
      footerListUl.classList.add('header-footer-list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-align-items-md-start', 'header-flex-column');

      group.forEach((itemNode) => {
        const linkEl = itemNode.querySelector('[data-aue-prop="link"]');
        const labelEl = itemNode.querySelector('[data-aue-prop="label"]');

        const listItem = document.createElement('li');
        listItem.classList.add('header-footer-list__item');
        if (linkEl) {
          const anchor = document.createElement('a');
          anchor.href = linkEl.href;
          anchor.classList.add('header-cta-analytics', 'header-analytics_cta_click', 'header-footer-list__item--link', 'header-d-inline-block');
          anchor.dataset.linkRegion = 'Footer List';
          if (linkEl.target) {
            anchor.target = linkEl.target;
          }
          if (labelEl) {
            anchor.textContent = labelEl.textContent.trim();
            moveInstrumentation(labelEl, anchor);
          }
          moveInstrumentation(linkEl, anchor);
          listItem.append(anchor);
        }
        moveInstrumentation(itemNode, listItem);
        footerListUl.append(listItem);
      });
      footerListDiv.append(footerListUl);
      footerNavLeft.append(footerListDiv);
    }
  });
  footerNav.append(footerNavLeft);

  // The original HTML had two right divs, but the structure implies 4 columns total.
  // This recreates the two divs for the right side, assuming the remaining links go there.
  const footerNavRight = document.createElement('div');
  footerNavRight.classList.add('header-footer-brand__navbar--right', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');

  footerBrandRight.append(footerNav);
  footerPrimaryContent.append(footerBrandRight);
  footerContainer.append(footerPrimaryContent);
  footerPrimary.append(footerContainer);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.classList.add('header-footer-brand__secondary');
  footerSecondary.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.classList.add('header-container');

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.classList.add('header-footer-brand__secondary--content', 'header-d-flex', 'header-flex-column', 'header-justify-content-md-between', 'header-align-items-center');

  const footerSecondaryRight = document.createElement('section');
  footerSecondaryRight.classList.add('header-footer-brand__right', 'header-d-flex', 'header-flex-column', 'header-pb-5');

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('header-social_media--title');
  socialTitle.textContent = 'Follow Us On';
  footerSecondaryRight.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('header-footer-brand__right--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-px-10', 'header-flex-wrap');

  socialLinks.forEach((itemNode) => {
    const linkEl = itemNode.querySelector('[data-aue-prop="link"]');
    const iconEl = itemNode.querySelector('[data-aue-prop="icon"]');

    const listItem = document.createElement('li');
    listItem.classList.add('header-footer-brand__right--item', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');

    if (linkEl) {
      const anchor = document.createElement('a');
      anchor.href = linkEl.href;
      anchor.classList.add('header-footer-brand__right--link', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center', 'header-analytics_cta_click');
      anchor.dataset.ctaRegion = 'Footer';
      anchor.dataset.ctaLabel = `footer-${linkEl.href.includes('facebook') ? 'facebook' : linkEl.href.includes('instagram') ? 'instagram' : 'youtube'}`;
      anchor.target = '_blank';
      anchor.dataset.platformName = linkEl.href.includes('facebook') ? 'facebook' : linkEl.href.includes('instagram') ? 'instagram' : 'youtube';
      anchor.dataset.socialLinktype = 'follow';
      moveInstrumentation(linkEl, anchor);

      if (iconEl) {
        const iconImg = createOptimizedPicture(iconEl.src, iconEl.alt || linkEl.href);
        iconImg.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
        iconImg.querySelector('img').setAttribute('loading', 'lazy');
        moveInstrumentation(iconEl, iconImg);
        anchor.append(iconImg);
      }
      listItem.append(anchor);
    }
    moveInstrumentation(itemNode, listItem);
    socialList.append(listItem);
  });
  footerSecondaryRight.append(socialList);
  footerSecondaryContent.append(footerSecondaryRight);

  const footerSecondaryLeft = document.createElement('section');
  footerSecondaryLeft.classList.add('header-footer-brand__left', 'header-py-5', 'header-d-flex', 'header-flex-column', 'header-gap-3');

  const footerSecondaryLeftList = document.createElement('ul');
  footerSecondaryLeftList.classList.add('header-footer-brand__left--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-flex-wrap');

  if (itcPortalLink) {
    const listItem = document.createElement('li');
    listItem.classList.add('header-footer-brand__left--item', 'header-foot_link');
    const anchor = document.createElement('a');
    anchor.href = itcPortalLink.href;
    anchor.target = '_blank';
    anchor.classList.add('header-footer-brand__left--link', 'header-analytics_cta_click');
    anchor.dataset.ctaRegion = 'Footer';
    anchor.textContent = itcPortalLink.textContent.trim();
    moveInstrumentation(itcPortalLink, anchor);
    listItem.append(anchor);
    footerSecondaryLeftList.append(listItem);
  }
  footerSecondaryLeft.append(footerSecondaryLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('header-footer-brand__left--copyright', 'header-text-center');
  if (copyrightText) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('header-footer-brand__left--text', 'header-text-white');
    copyrightSpan.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, copyrightSpan);
    copyrightDiv.append(copyrightSpan);
  }
  footerSecondaryLeft.append(copyrightDiv);
  footerSecondaryContent.append(footerSecondaryLeft);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerSecondary);
  aside.append(footerBrand);

  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.classList.add('header-overlay', 'header-position-absolute', 'header-top-0', 'header-start-0', 'header-w-100', 'header-h-100', 'header-bg-black', 'header-opacity-25');
  submenuContainer.append(overlay);

  rootDiv.append(submenuContainer);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
