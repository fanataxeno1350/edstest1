import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('section');
  headerSection.className = 'header-position-relative header-mb-15';
  moveInstrumentation(block, headerSection);

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  headerSection.append(appNameSpan);

  // Header Container
  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  headerSection.append(headerContainer);

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  // Assuming the SVG is static or handled elsewhere, as it's just a path in the HTML.
  // If it needs to be dynamic, the block JSON would need a field for it.
  headerContainer.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-d-flex header-justify-content-center header-w-25';
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'header-analytics_cta_click';
  logoLink.setAttribute('data-ct', '');
  logoLink.setAttribute('a-label', 'header-logo-boing');
  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  const logoImg = block.querySelector('.header-header__logo-img');
  if (logoImg) {
    const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt);
    moveInstrumentation(logoImg, optimizedLogo.querySelector('img'));
    logoDiv.append(optimizedLogo);
  }
  logoLink.append(logoDiv);
  headerCenterDiv.append(logoLink);
  headerContainer.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginLink = block.querySelector('.header-header__login-btn-wrapper');
  if (loginLink) {
    const newLoginLink = document.createElement('a');
    newLoginLink.href = loginLink.href;
    newLoginLink.className = loginLink.className;
    newLoginLink.style.display = loginLink.style.display;
    const loginButton = loginLink.querySelector('button');
    if (loginButton) {
      const newLoginButton = document.createElement('button');
      newLoginButton.className = loginButton.className;
      newLoginButton.textContent = loginButton.textContent.trim();
      newLoginLink.append(newLoginButton);
    }
    headerRightDiv.append(newLoginLink);
  }
  headerContainer.append(headerRightDiv);

  // Submenu Container (Sidebar)
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  headerSection.append(submenuContainer);

  const sidebarAside = document.createElement('aside');
  sidebarAside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';
  submenuContainer.append(sidebarAside);

  const menuUl = document.createElement('ul');
  menuUl.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  sidebarAside.append(menuUl);

  // Menu Items
  const menuItems = block.querySelectorAll('.header-sidebar__menu-item');
  menuItems.forEach((item) => {
    const li = document.createElement('li');
    moveInstrumentation(item, li);
    li.className = item.className;
    const link = item.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = link.className;
      newLink.setAttribute('data-consent', link.getAttribute('data-consent'));
      newLink.setAttribute('data-link', link.getAttribute('data-link'));
      const img = link.querySelector('img');
      if (img) {
        const optimizedImg = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedImg.querySelector('img'));
        newLink.append(optimizedImg);
      }
      newLink.append(document.createTextNode(link.textContent.trim()));
      li.append(newLink);
    }
    menuUl.append(li);
  });

  // Sidebar Curve
  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  sidebarAside.append(sidebarCurve);

  // Footer Brand
  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrandDiv.setAttribute('data-isdoodlevariation', 'false');
  sidebarAside.append(footerBrandDiv);

  // Footer Primary Section
  const footerPrimary = document.createElement('section');
  footerPrimary.className = 'header-footer-brand__primary';
  footerPrimary.style.backgroundColor = '';
  footerBrandDiv.append(footerPrimary);

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';
  footerPrimary.append(footerContainer);

  const footerContent = document.createElement('div');
  footerContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';
  footerContainer.append(footerContent);

  // Footer Brand Left
  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';
  footerContent.append(footerBrandLeft);

  const itcLink = block.querySelector('.header-footer-brand__left a[aria-label="ITC Logo"]');
  if (itcLink) {
    const newItcLink = document.createElement('a');
    newItcLink.href = itcLink.href;
    newItcLink.target = '_blank';
    newItcLink.className = itcLink.className;
    newItcLink.setAttribute('data-cta-region', itcLink.getAttribute('data-cta-region'));
    newItcLink.setAttribute('aria-label', itcLink.getAttribute('aria-label'));
    const itcImg = itcLink.querySelector('img');
    if (itcImg) {
      const optimizedItcImg = createOptimizedPicture(itcImg.src, itcImg.alt);
      moveInstrumentation(itcImg, optimizedItcImg.querySelector('img'));
      optimizedItcImg.querySelector('img').className = itcImg.className;
      newItcLink.append(optimizedItcImg);
    }
    footerBrandLeft.append(newItcLink);
  }

  const fssiLogoDiv = block.querySelector('.header-footer-brand__secondary--logo');
  if (fssiLogoDiv) {
    const newFssiLogoDiv = document.createElement('div');
    newFssiLogoDiv.className = fssiLogoDiv.className;
    const fssiImg = fssiLogoDiv.querySelector('img');
    if (fssiImg) {
      const optimizedFssiImg = createOptimizedPicture(fssiImg.src, fssiImg.alt);
      moveInstrumentation(fssiImg, optimizedFssiImg.querySelector('img'));
      optimizedFssiImg.querySelector('img').className = fssiImg.className;
      newFssiLogoDiv.append(optimizedFssiImg);
    }
    footerBrandLeft.append(newFssiLogoDiv);
  }

  // Footer Brand Right (Navigation)
  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';
  footerContent.append(footerBrandRight);

  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNav);

  const footerNavLeft = document.createElement('div');
  footerNavLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';
  footerNav.append(footerNavLeft);

  // Footer Lists
  const footerLists = block.querySelectorAll('.header-footerList');
  footerLists.forEach((footerList, index) => {
    const newFooterListDiv = document.createElement('div');
    newFooterListDiv.className = 'header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

    const listItems = footerList.querySelectorAll('.header-footer-list__item');
    listItems.forEach((item) => {
      const li = document.createElement('li');
      moveInstrumentation(item, li);
      li.className = item.className;
      const link = item.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = link.className;
        if (link.target) newLink.target = link.target;
        newLink.setAttribute('data-link-region', link.getAttribute('data-link-region'));
        newLink.textContent = link.textContent.trim();
        li.append(newLink);
      }
      ul.append(li);
    });
    newFooterListDiv.append(ul);
    if (index < 2) {
      footerNavLeft.append(newFooterListDiv);
    } else {
      // Assuming the last two lists go into footerNavRight
      if (!footerNav.querySelector('.header-footer-brand__navbar--right')) {
        const footerNavRight = document.createElement('div');
        footerNavRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
        footerNav.append(footerNavRight);
      }
      footerNav.querySelector('.header-footer-brand__navbar--right').append(newFooterListDiv);
    }
  });

  // Footer Secondary Section
  const footerSecondary = document.createElement('section');
  footerSecondary.className = 'header-footer-brand__secondary';
  footerSecondary.style.backgroundColor = '';
  footerBrandDiv.append(footerSecondary);

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  footerSecondary.append(footerSecondaryContainer);

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';
  footerSecondaryContainer.append(footerSecondaryContent);

  // Social Media
  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  footerSecondaryContent.append(socialMediaSection);

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialUl = document.createElement('ul');
  socialUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';
  socialMediaSection.append(socialUl);

  const socialLinks = block.querySelectorAll('.header-footer-brand__right--item');
  socialLinks.forEach((socialItem) => {
    const li = document.createElement('li');
    moveInstrumentation(socialItem, li);
    li.className = socialItem.className;
    const link = socialItem.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = link.className;
      newLink.target = '_blank';
      newLink.setAttribute('data-cta-region', link.getAttribute('data-cta-region'));
      newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));
      newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name'));
      newLink.setAttribute('data-social-linktype', link.getAttribute('data-social-linktype'));
      const img = link.querySelector('img');
      if (img) {
        const optimizedImg = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedImg.querySelector('img'));
        optimizedImg.querySelector('img').className = img.className;
        optimizedImg.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label'));
        newLink.append(optimizedImg);
      }
      li.append(newLink);
    }
    socialUl.append(li);
  });

  // Footer Copyright
  const footerCopyrightSection = document.createElement('section');
  footerCopyrightSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  footerSecondaryContent.append(footerCopyrightSection);

  const footerCopyrightUl = document.createElement('ul');
  footerCopyrightUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  footerCopyrightSection.append(footerCopyrightUl);

  const itcPortalItem = block.querySelector('.header-footer-brand__left--item.header-foot_link');
  if (itcPortalItem) {
    const li = document.createElement('li');
    moveInstrumentation(itcPortalItem, li);
    li.className = itcPortalItem.className;
    const link = itcPortalItem.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.className = link.className;
      newLink.setAttribute('data-cta-region', link.getAttribute('data-cta-region'));
      newLink.textContent = link.textContent.trim();
      li.append(newLink);
    }
    footerCopyrightUl.append(li);
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  footerCopyrightSection.append(copyrightDiv);

  // Overlay
  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  block.textContent = '';
  block.append(headerSection);
}
