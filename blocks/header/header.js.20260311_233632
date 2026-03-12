import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-app-name]').textContent;

  const headerContainer = document.createElement('header');
  headerContainer.className = `header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white`;

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  headerContainer.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-d-flex header-justify-content-center header-w-25';
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');

  if (logoLink && logoImage) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href || '/';
    logoAnchor.className = 'header-analytics_cta_click';
    logoAnchor.setAttribute('data-ct', '');
    logoAnchor.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(logoLink, logoAnchor);

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';

    const picture = createOptimizedPicture(logoImage.src, logoImage.alt, true, [{
      width: '200'
    }]);
    const img = picture.querySelector('img');
    img.className = 'header-header__logo-img';
    img.setAttribute('fetchpriority', 'high');
    img.setAttribute('loading', 'eager');
    moveInstrumentation(logoImage, img);

    logoDiv.append(picture);
    logoAnchor.append(logoDiv);
    headerCenterDiv.append(logoAnchor);
  }
  headerContainer.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  // Assuming login button is static for now as it's not in JSON
  const loginLink = document.createElement('a');
  loginLink.href = '/login.html';
  loginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
  loginLink.style.display = 'inline';
  const loginButton = document.createElement('button');
  loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
  loginButton.textContent = 'Login';
  loginLink.append(loginButton);
  headerRightDiv.append(loginLink);
  headerContainer.append(headerRightDiv);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  const menuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  menuItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const label = itemNode.querySelector('[data-aue-prop="label"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    if (link && label) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      anchor.setAttribute('data-consent', 'false'); // Default, check if it needs to be dynamic
      anchor.setAttribute('data-link', link.href);
      moveInstrumentation(link, anchor);

      if (icon) {
        const iconPicture = createOptimizedPicture(icon.src, icon.alt);
        const iconImg = iconPicture.querySelector('img');
        iconImg.className = 'header-sidebar__menu-icon header-me-4';
        iconImg.setAttribute('loading', 'lazy');
        moveInstrumentation(icon, iconImg);
        anchor.append(iconPicture);
      }

      anchor.append(label.textContent.trim());
      moveInstrumentation(label, anchor);
      listItem.append(anchor);
    }
    moveInstrumentation(itemNode, listItem);
    sidebarMenu.append(listItem);
  });

  // Add static logout item
  const logoutListItem = document.createElement('li');
  logoutListItem.className = 'header-sidebar__menu-item header-sidebar__menu-item--logout header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
  logoutListItem.style.display = 'none';
  const logoutLink = document.createElement('a');
  logoutLink.href = '/';
  logoutLink.className = 'header-sidebar__menu-link header-sidebar__menu-item--logout-btn header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
  logoutLink.setAttribute('data-consent', 'false');
  logoutLink.setAttribute('data-link', '/content/boing/in/en/home');
  const logoutIcon = createOptimizedPicture('/content/dam/aemigrate/uploaded-folder/image/logout-3-fmt-webp-alpha.webp', 'Logout');
  const logoutIconImg = logoutIcon.querySelector('img');
  logoutIconImg.className = 'header-sidebar__menu-icon header-me-4';
  logoutIconImg.setAttribute('loading', 'lazy');
  logoutLink.append(logoutIcon);
  logoutLink.append('Logout');
  logoutListItem.append(logoutLink);
  sidebarMenu.append(logoutListItem);

  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  sidebar.append(sidebarCurve);

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

  const footerLeftLogo = block.querySelector('[data-aue-prop="footerLeftLogo"]');
  if (footerLeftLogo) {
    const itcLink = document.createElement('a');
    itcLink.href = 'https://www.itcportal.com/';
    itcLink.target = '_blank';
    itcLink.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    itcLink.setAttribute('data-cta-region', 'Footer');
    itcLink.setAttribute('aria-label', 'ITC Logo');
    const itcPicture = createOptimizedPicture(footerLeftLogo.src, footerLeftLogo.alt);
    const itcImg = itcPicture.querySelector('img');
    itcImg.className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    itcImg.setAttribute('loading', 'lazy');
    moveInstrumentation(footerLeftLogo, itcImg);
    itcLink.append(itcPicture);
    footerBrandLeft.append(itcLink);
  }

  const footerSecondaryLogo = block.querySelector('[data-aue-prop="footerSecondaryLogo"]');
  if (footerSecondaryLogo) {
    const fssiDiv = document.createElement('div');
    fssiDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
    const fssiPicture = createOptimizedPicture(footerSecondaryLogo.src, footerSecondaryLogo.alt);
    const fssiImg = fssiPicture.querySelector('img');
    fssiImg.className = 'header-object-fit-contain header-w-100 header-no-rendition';
    fssiImg.setAttribute('loading', 'lazy');
    moveInstrumentation(footerSecondaryLogo, fssiImg);
    fssiDiv.append(fssiPicture);
    footerBrandLeft.append(fssiDiv);
  }
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';
  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';

  const footerLists = block.querySelectorAll('[data-aue-model="footerListItem"]');
  const numFooterLists = Math.ceil(footerLists.length / 3); // Assuming 3 items per list for now based on example

  for (let i = 0; i < numFooterLists; i++) {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

    for (let j = 0; j < 3 && (i * 3 + j) < footerLists.length; j++) {
      const itemNode = footerLists[i * 3 + j];
      const link = itemNode.querySelector('[data-aue-prop="link"]');
      const label = itemNode.querySelector('[data-aue-prop="label"]');

      if (link && label) {
        const li = document.createElement('li');
        li.className = 'header-footer-list__item';
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        anchor.setAttribute('data-link-region', 'Footer List');
        anchor.textContent = label.textContent.trim();
        moveInstrumentation(link, anchor);
        moveInstrumentation(label, anchor);
        li.append(anchor);
        ul.append(li);
      }
      moveInstrumentation(itemNode, ul);
    }
    footerListDiv.append(ul);
    footerNavbarLeft.append(footerListDiv);
  }

  footerNavbar.append(footerNavbarLeft);

  // Re-create the right side of the footer navbar, assuming it's also dynamically generated from footerLists
  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';

  // Assuming more footer lists would go here, for now, just append it
  footerNavbar.append(footerNavbarRight);

  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerContainer.append(footerPrimaryContent);
  footerPrimary.append(footerContainer);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.className = 'header-footer-brand__secondary';
  footerSecondary.style.backgroundColor = '';
  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const socialItems = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    if (link && icon) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.target = '_blank';
      anchor.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
      anchor.setAttribute('data-platform-name', icon.alt.toLowerCase());
      anchor.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(link, anchor);

      const iconPicture = createOptimizedPicture(icon.src, icon.alt);
      const iconImg = iconPicture.querySelector('img');
      iconImg.setAttribute('aria-label', icon.alt.toLowerCase());
      iconImg.className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      iconImg.setAttribute('loading', 'lazy');
      moveInstrumentation(icon, iconImg);
      anchor.append(iconPicture);
      li.append(anchor);
    }
    moveInstrumentation(itemNode, li);
    socialList.append(li);
  });
  socialMediaSection.append(socialList);
  footerSecondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  // Assuming ITC portal link is static here based on HTML, but could be dynamic if needed
  const itcPortalLi = document.createElement('li');
  itcPortalLi.className = 'header-footer-brand__left--item header-foot_link';
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  itcPortalLi.append(itcPortalLink);
  copyrightList.append(itcPortalLi);
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  const copyrightTextSpan = document.createElement('span');
  copyrightTextSpan.className = 'header-footer-brand__left--text header-text-white';
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    copyrightTextSpan.textContent = copyrightText.textContent;
    moveInstrumentation(copyrightText, copyrightTextSpan);
  } else {
    copyrightTextSpan.textContent = `© 2026 ${appName}! All Rights Reserved.`;
  }
  copyrightDiv.append(copyrightTextSpan);
  copyrightSection.append(copyrightDiv);
  footerSecondaryContent.append(copyrightSection);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  block.textContent = '';
  block.append(headerContainer);
  block.append(submenuContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
