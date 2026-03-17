import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootSection = document.createElement('section');
  rootSection.className = 'header-position-relative header-mb-15';

  // App Name
  const appNameSpan = block.querySelector('[data-aue-prop="appName"]');
  if (appNameSpan) {
    const newAppNameSpan = document.createElement('span');
    newAppNameSpan.className = 'header-d-none header-app-name';
    newAppNameSpan.textContent = appNameSpan.textContent;
    moveInstrumentation(appNameSpan, newAppNameSpan);
    rootSection.append(newAppNameSpan);
  }

  // Main Header
  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const headerDiv1 = document.createElement('div');
  headerDiv1.className = 'header-d-flex header-w-25';
  // Header Image (assuming it's just a text node in authored HTML, but blockJson says reference)
  // If it's an actual img, the selector would be different.
  // For now, handling as text content based on provided HTML.
  const headerImageContent = block.querySelector('div.header-d-flex.header-w-25:first-child');
  if (headerImageContent && headerImageContent.textContent.trim()) {
    const headerImageText = document.createElement('span'); // Or img if it's an actual image
    headerImageText.textContent = headerImageContent.textContent.trim();
    moveInstrumentation(headerImageContent, headerImageText);
    headerDiv1.append(headerImageText);
  }
  header.append(headerDiv1);

  const headerDiv2 = document.createElement('div');
  headerDiv2.className = 'header-d-flex  header-justify-content-center header-w-25';
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const logoImg = block.querySelector('[data-aue-prop="logo"]');
  if (logoLink || logoImg) {
    const logoAnchor = document.createElement('a');
    logoAnchor.className = 'header-analytics_cta_click';
    logoAnchor.setAttribute('data-ct', '');
    logoAnchor.setAttribute('a-label', 'header-logo-boing');
    logoAnchor.href = logoLink ? logoLink.href : '#';
    moveInstrumentation(logoLink, logoAnchor);

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header__logo header-d-flex header-align-items-center';

    if (logoImg) {
      const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
      picture.querySelector('img').className = 'header__logo-img';
      picture.querySelector('img').setAttribute('fetchpriority', 'high');
      picture.querySelector('img').setAttribute('loading', 'eager');
      moveInstrumentation(logoImg, picture);
      logoDiv.append(picture);
    }
    logoAnchor.append(logoDiv);
    headerDiv2.append(logoAnchor);
  }
  header.append(headerDiv2);

  const headerDiv3 = document.createElement('div');
  headerDiv3.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href;
    loginAnchor.className = 'header__login-btn-wrapper header-analytics_cta_click';
    loginAnchor.style.display = 'inline';
    moveInstrumentation(loginLink, loginAnchor);

    const loginButton = document.createElement('button');
    loginButton.className = 'header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = loginLink.textContent.trim(); // Assuming the text is the button label
    loginAnchor.append(loginButton);
    headerDiv3.append(loginAnchor);
  }
  header.append(headerDiv3);
  rootSection.append(header);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const menuList = document.createElement('ul');
  menuList.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  const menuItems = block.querySelectorAll('[data-aue-model="menuItem"]');
  menuItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = itemNode.classList.contains('header-sidebar__menu-item--logout')
      ? 'header-sidebar__menu-item  header-sidebar__menu-item--logout header-py-6 header-border-bottom header-border-boing-neutral-gray-200'
      : 'header-sidebar__menu-item   header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    if (itemNode.style.display) {
      listItem.style.display = itemNode.style.display;
    }

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    const label = itemNode.querySelector('[data-aue-prop="label"]');

    if (link || icon || label) {
      const anchor = document.createElement('a');
      anchor.href = link ? link.href : '#';
      anchor.className = itemNode.classList.contains('header-sidebar__menu-item--logout-btn')
        ? 'header-sidebar__menu-link header-sidebar__menu-item--logout-btn header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click'
        : 'header-sidebar__menu-link  header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      if (link && link.dataset.consent) {
        anchor.setAttribute('data-consent', link.dataset.consent);
      }
      if (link && link.dataset.link) {
        anchor.setAttribute('data-link', link.dataset.link);
      }
      moveInstrumentation(link, anchor);

      if (icon) {
        const img = createOptimizedPicture(icon.src, icon.alt);
        img.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
        img.querySelector('img').setAttribute('loading', 'lazy');
        moveInstrumentation(icon, img);
        anchor.append(img);
      }
      if (label) {
        anchor.append(label.textContent.trim());
        moveInstrumentation(label, anchor);
      }
      listItem.append(anchor);
    }
    menuList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });
  aside.append(menuList);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  // Footer Brand
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

  const footerLeft = document.createElement('section');
  footerLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  if (footerLogo1) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.href = footerLogo1.closest('a') ? footerLogo1.closest('a').href : '#';
    logo1Anchor.target = '_blank';
    logo1Anchor.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    logo1Anchor.setAttribute('data-cta-region', 'Footer');
    logo1Anchor.setAttribute('aria-label', 'ITC Logo');
    moveInstrumentation(footerLogo1.closest('a'), logo1Anchor);

    const picture = createOptimizedPicture(footerLogo1.src, footerLogo1.alt);
    picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    picture.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(footerLogo1, picture);
    logo1Anchor.append(picture);
    footerLeft.append(logo1Anchor);
  }

  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  if (footerLogo2) {
    const logo2Div = document.createElement('div');
    logo2Div.className = 'header-footer-brand__secondary--logo header-d-inline-block';
    const picture = createOptimizedPicture(footerLogo2.src, footerLogo2.alt);
    picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
    picture.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(footerLogo2, picture);
    logo2Div.append(picture);
    footerLeft.append(logo2Div);
  }
  footerPrimaryContent.append(footerLeft);

  const footerRight = document.createElement('section');
  footerRight.className = 'header-footer-brand__right';

  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');

  const footerNavLeft = document.createElement('div');
  footerNavLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  let currentList = document.createElement('ul');
  currentList.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
  let listCount = 0;

  footerLinks.forEach((itemNode) => {
    if (listCount > 0 && listCount % 3 === 0) { // Create new ul every 3 items
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'header-footerList';
      footerListDiv.append(currentList);
      footerNavLeft.append(footerListDiv);
      currentList = document.createElement('ul');
      currentList.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
    }

    const listItem = document.createElement('li');
    listItem.className = 'header-footer-list__item';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const label = itemNode.querySelector('[data-aue-prop="label"]');

    if (link || label) {
      const anchor = document.createElement('a');
      anchor.href = link ? link.href : '#';
      anchor.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      anchor.setAttribute('data-link-region', 'Footer List');
      if (link && link.target) {
        anchor.target = link.target;
      }
      anchor.textContent = label ? label.textContent.trim() : link.textContent.trim();
      moveInstrumentation(link, anchor);
      moveInstrumentation(label, anchor);
      listItem.append(anchor);
    }
    currentList.append(listItem);
    moveInstrumentation(itemNode, listItem);
    listCount++;
  });

  if (currentList.children.length > 0) {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    footerListDiv.append(currentList);
    if (listCount <= 6) { // Append to footerNavLeft if total items are 6 or less (2 lists)
      footerNavLeft.append(footerListDiv);
    } else { // Otherwise, append to footerNavRight
      const footerNavRight = document.createElement('div');
      footerNavRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
      footerNavRight.append(footerListDiv);
      footerNav.append(footerNavLeft, footerNavRight);
    }
  } else {
    footerNav.append(footerNavLeft);
  }

  footerRight.append(footerNav);
  footerPrimaryContent.append(footerRight);
  footerContainer.append(footerPrimaryContent);
  footerPrimary.append(footerContainer);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.className = 'header-footer-brand__secondary';
  footerSecondary.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column  header-justify-content-md-between header-align-items-center';

  const socialMediaRight = document.createElement('section');
  socialMediaRight.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaRight.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const footerSocials = block.querySelectorAll('[data-aue-model="footerSocial"]');
  footerSocials.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    if (link || icon) {
      const anchor = document.createElement('a');
      anchor.href = link ? link.href : '#';
      anchor.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${link.dataset.platformName || 'social'}`);
      anchor.target = '_blank';
      anchor.setAttribute('data-platform-name', link.dataset.platformName || '');
      anchor.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(link, anchor);

      if (icon) {
        const img = createOptimizedPicture(icon.src, icon.alt);
        img.querySelector('img').setAttribute('aria-label', icon.alt);
        img.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
        img.querySelector('img').setAttribute('loading', 'lazy');
        moveInstrumentation(icon, img);
        anchor.append(img);
      }
      listItem.append(anchor);
    }
    socialList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });
  socialMediaRight.append(socialList);
  footerSecondaryContent.append(socialMediaRight);

  const copyrightLeft = document.createElement('section');
  copyrightLeft.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

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
    moveInstrumentation(itcPortalLink, anchor);
    listItem.append(anchor);
    copyrightList.append(listItem);
  }
  copyrightLeft.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.'; // Fallback
  }
  copyrightDiv.append(copyrightSpan);
  copyrightLeft.append(copyrightDiv);
  footerSecondaryContent.append(copyrightLeft);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerSecondary);
  aside.append(footerBrand);

  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  rootSection.append(submenuContainer);

  block.textContent = '';
  block.append(rootSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
