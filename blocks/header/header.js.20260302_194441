import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('.header-app-name')?.textContent;
  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  // Assuming the first cell of the block's first row contains the logo image
  const logoImgCell = block.children[0]?.children[0];
  if (logoImgCell) {
    const logoImg = logoImgCell.querySelector('img');
    if (logoImg) {
      const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt);
      moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
      headerLeftDiv.append(optimizedLogoPic);
    }
  }

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-d-flex header-justify-content-center header-w-25';
  const logoLink = block.querySelector('a[data-label="header-logo-boing"]');
  if (logoLink) {
    const newLogoLink = document.createElement('a');
    newLogoLink.href = logoLink.href;
    newLogoLink.className = logoLink.className;
    newLogoLink.setAttribute('data-ct', logoLink.getAttribute('data-ct'));
    newLogoLink.setAttribute('aria-label', logoLink.getAttribute('aria-label'));

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
    const logoImage = logoLink.querySelector('img');
    if (logoImage) {
      const optimizedLogoImage = createOptimizedPicture(logoImage.src, logoImage.alt);
      moveInstrumentation(logoImage, optimizedLogoImage.querySelector('img'));
      logoImage.className = 'header-header__logo-img'; // Preserve class
      logoDiv.append(optimizedLogoImage);
    }
    newLogoLink.append(logoDiv);
    headerCenterDiv.append(newLogoLink);
  }

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
      newLoginButton.textContent = loginButton.textContent;
      newLoginLink.append(newLoginButton);
    }
    headerRightDiv.append(newLoginLink);
  }

  headerContainer.append(headerLeftDiv, headerCenterDiv, headerRightDiv);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  // Extract sidebar menu items
  const sidebarMenuItems = block.querySelectorAll('.header-sidebar__menu-item');
  sidebarMenuItems.forEach((item) => {
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
        optimizedImg.querySelector('img').className = img.className;
        newLink.append(optimizedImg);
      }
      newLink.append(link.textContent.trim());
      li.append(newLink);
    }
    sidebarMenu.append(li);
  });

  aside.append(sidebarMenu);

  const sidebarCurve = block.querySelector('.header-sidebar__curve');
  if (sidebarCurve) {
    aside.append(sidebarCurve.cloneNode(true));
  }

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', block.querySelector('.header-footer-brand').getAttribute('data-isdoodlevariation'));

  const footerPrimary = document.createElement('section');
  footerPrimary.className = 'header-footer-brand__primary';
  footerPrimary.style.backgroundColor = block.querySelector('.header-footer-brand__primary').style.backgroundColor;

  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.className = 'header-container';

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const itcLogoLink = block.querySelector('a[aria-label="ITC Logo"]');
  if (itcLogoLink) {
    const newItcLogoLink = document.createElement('a');
    newItcLogoLink.href = itcLogoLink.href;
    newItcLogoLink.target = itcLogoLink.target;
    newItcLogoLink.className = itcLogoLink.className;
    newItcLogoLink.setAttribute('data-cta-region', itcLogoLink.getAttribute('data-cta-region'));
    newItcLogoLink.setAttribute('aria-label', itcLogoLink.getAttribute('aria-label'));

    const itcLogoImg = itcLogoLink.querySelector('img');
    if (itcLogoImg) {
      const optimizedItcLogoImg = createOptimizedPicture(itcLogoImg.src, itcLogoImg.alt);
      moveInstrumentation(itcLogoImg, optimizedItcLogoImg.querySelector('img'));
      optimizedItcLogoImg.querySelector('img').className = itcLogoImg.className;
      newItcLogoLink.append(optimizedItcLogoImg);
    }
    footerBrandLeft.append(newItcLogoLink);
  }

  const fssiLogoDiv = block.querySelector('.header-footer-brand__secondary--logo');
  if (fssiLogoDiv) {
    const newFssiLogoDiv = document.createElement('div');
    newFssiLogoDiv.className = fssiLogoDiv.className;
    const fssiLogoImg = fssiLogoDiv.querySelector('img');
    if (fssiLogoImg) {
      const optimizedFssiLogoImg = createOptimizedPicture(fssiLogoImg.src, fssiLogoImg.alt);
      moveInstrumentation(fssiLogoImg, optimizedFssiLogoImg.querySelector('img'));
      optimizedFssiLogoImg.querySelector('img').className = fssiLogoImg.className;
      newFssiLogoDiv.append(optimizedFssiLogoImg);
    }
    footerBrandLeft.append(newFssiLogoDiv);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';

  // Extract footer lists
  const footerLists = block.querySelectorAll('.header-footerList');
  footerLists.forEach((list, index) => {
    const newFooterListDiv = document.createElement('div');
    newFooterListDiv.className = 'header-footerList';

    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

    list.querySelectorAll('.header-footer-list__item').forEach((item) => {
      const li = document.createElement('li');
      moveInstrumentation(item, li);
      li.className = item.className;

      const link = item.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = link.className;
        newLink.setAttribute('data-link-region', link.getAttribute('data-link-region'));
        if (link.target) newLink.target = link.target;
        newLink.textContent = link.textContent;
        li.append(newLink);
      }
      ul.append(li);
    });
    newFooterListDiv.append(ul);
    if (index < 2) {
      footerNavbarLeft.append(newFooterListDiv);
    } else {
      // For simplicity, assuming the next two lists go to footerNavbarRight
      if (!footerNavbarRight.children.length) {
        const footerNavbarRight = document.createElement('div');
        footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
        footerNavbar.append(footerNavbarRight);
      }
      footerNavbar.querySelector('.header-footer-brand__navbar--right').append(newFooterListDiv);
    }
  });

  footerNavbar.append(footerNavbarLeft);
  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandLeft, footerBrandRight);
  footerPrimaryContainer.append(footerPrimaryContent);
  footerPrimary.append(footerPrimaryContainer);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.className = 'header-footer-brand__secondary';
  footerSecondary.style.backgroundColor = block.querySelector('.header-footer-brand__secondary').style.backgroundColor;

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const socialLinks = block.querySelectorAll('.header-footer-brand__right--item');
  socialLinks.forEach((item) => {
    const li = document.createElement('li');
    moveInstrumentation(item, li);
    li.className = item.className;

    const link = item.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = link.target;
      newLink.className = link.className;
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
    socialMediaList.append(li);
  });

  socialMediaSection.append(socialMediaList);
  footerSecondaryContent.append(socialMediaSection);

  const footerLeftSecondary = document.createElement('section');
  footerLeftSecondary.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const footerLeftSecondaryList = document.createElement('ul');
  footerLeftSecondaryList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  const itcPortalLink = block.querySelector('.header-foot_link a');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__left--item header-foot_link';
    const newLink = document.createElement('a');
    newLink.href = itcPortalLink.href;
    newLink.target = itcPortalLink.target;
    newLink.className = itcPortalLink.className;
    newLink.setAttribute('data-cta-region', itcPortalLink.getAttribute('data-cta-region'));
    newLink.textContent = itcPortalLink.textContent;
    li.append(newLink);
    footerLeftSecondaryList.append(li);
  }
  footerLeftSecondary.append(footerLeftSecondaryList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = block.querySelector('.header-footer-brand__left--copyright span').textContent;
  copyrightDiv.append(copyrightSpan);
  footerLeftSecondary.append(copyrightDiv);

  footerSecondaryContent.append(footerLeftSecondary);
  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  // Clear existing content and append new structure
  block.textContent = '';
  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'header-d-none header-app-name';
    appNameSpan.setAttribute('data-app-name', appName);
    appNameSpan.textContent = appName;
    block.append(appNameSpan);
  }
  block.append(headerContainer, submenuContainer);
}