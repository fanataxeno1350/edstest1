//Working checkpoint
import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainSection = document.createElement('section');
  mainSection.className = 'header-position-relative header-mb-15';

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', 'boing');

  const headerRow = block.children[0];
  moveInstrumentation(headerRow, appNameSpan);
  const appNameCell = headerRow.children[0];
  appNameSpan.textContent = appNameCell.textContent.trim();
  mainSection.append(appNameSpan);

  // Header Container
  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  mainSection.append(headerContainer);

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  headerContainer.append(headerLeftDiv);

  const headerMiddleDiv = document.createElement('div');
  headerMiddleDiv.className = 'header-d-flex header-justify-content-center header-w-25';
  headerContainer.append(headerMiddleDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  headerContainer.append(headerRightDiv);

  // Header Logo
  const logoRow = block.children[1];
  moveInstrumentation(logoRow, headerMiddleDiv);
  const logoCell = logoRow.children[0];
  const logoLink = logoCell.querySelector('a');
  const logoImg = logoCell.querySelector('img');

  if (logoLink && logoImg) {
    const newLogoLink = document.createElement('a');
    newLogoLink.href = logoLink.href;
    newLogoLink.className = 'header-analytics_cta_click';
    newLogoLink.setAttribute('data-ct', '');
    newLogoLink.setAttribute('a-label', 'header-logo-boing');

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';

    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt);
    optimizedLogoPic.querySelector('img').className = 'header-header__logo-img';
    optimizedLogoPic.querySelector('img').setAttribute('fetchpriority', 'high');
    optimizedLogoPic.querySelector('img').setAttribute('loading', 'eager');
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));

    logoDiv.append(optimizedLogoPic);
    newLogoLink.append(logoDiv);
    headerMiddleDiv.append(newLogoLink);
  }

  // Login Button
  const loginRow = block.children[2];
  moveInstrumentation(loginRow, headerRightDiv);
  const loginCell = loginRow.children[0];
  const loginLink = loginCell.querySelector('a');
  const loginButton = loginCell.querySelector('button');

  if (loginLink && loginButton) {
    const newLoginLink = document.createElement('a');
    newLoginLink.href = loginLink.href;
    newLoginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
    newLoginLink.style.display = 'inline';

    const newLoginButton = document.createElement('button');
    newLoginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    newLoginButton.textContent = loginButton.textContent.trim();
    moveInstrumentation(loginButton, newLoginButton);

    newLoginLink.append(newLoginButton);
    headerRightDiv.append(newLoginLink);
  }

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  mainSection.append(submenuContainer);

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';
  submenuContainer.append(aside);

  const ul = document.createElement('ul');
  ul.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  aside.append(ul);

  // Sidebar Menu Items
  const sidebarMenuRows = Array.from(block.children).slice(3, -9);
  sidebarMenuRows.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    if (row.children[0].querySelector('a[href="/"]').textContent.trim() === 'Logout') {
      li.classList.add('header-sidebar__menu-item--logout');
      li.style.display = 'none';
    }

    const cell = row.children[0];
    const link = cell.querySelector('a');
    const img = cell.querySelector('img');

    if (link && img) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      newLink.setAttribute('data-consent', link.getAttribute('data-consent'));
      newLink.setAttribute('data-link', link.getAttribute('data-link'));
      if (link.textContent.trim() === 'Logout') {
        newLink.classList.add('header-sidebar__menu-item--logout-btn');
      }

      const optimizedImg = createOptimizedPicture(img.src, img.alt);
      optimizedImg.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      optimizedImg.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(img, optimizedImg.querySelector('img'));

      newLink.append(optimizedImg);
      newLink.append(document.createTextNode(`\n                ${link.textContent.trim()} \n              `));
      li.append(newLink);
    }
    ul.append(li);
  });

  const sidebarCurveDiv = document.createElement('div');
  sidebarCurveDiv.className = 'header-sidebar__curve';
  aside.append(sidebarCurveDiv);

  // Footer Brand Container
  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrandDiv.setAttribute('data-isdoodlevariation', 'false');
  aside.append(footerBrandDiv);

  // Footer Primary Section
  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.className = 'header-footer-brand__primary';
  footerPrimarySection.style.backgroundColor = '';
  footerBrandDiv.append(footerPrimarySection);

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';
  footerPrimarySection.append(footerContainer);

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';
  footerContainer.append(footerPrimaryContent);

  const footerLeftSection = document.createElement('section');
  footerLeftSection.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';
  footerPrimaryContent.append(footerLeftSection);

  const footerRightSection = document.createElement('section');
  footerRightSection.className = 'header-footer-brand__right';
  footerPrimaryContent.append(footerRightSection);

  // Footer Logos
  const footerLogo1Row = block.children[block.children.length - 9];
  moveInstrumentation(footerLogo1Row, footerLeftSection);
  const footerLogo1Cell = footerLogo1Row.children[0];
  const footerLogo1Link = footerLogo1Cell.querySelector('a');
  const footerLogo1Img = footerLogo1Cell.querySelector('img');

  if (footerLogo1Link && footerLogo1Img) {
    const newFooterLogo1Link = document.createElement('a');
    newFooterLogo1Link.href = footerLogo1Link.href;
    newFooterLogo1Link.target = '_blank';
    newFooterLogo1Link.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    newFooterLogo1Link.setAttribute('data-cta-region', 'Footer');
    newFooterLogo1Link.setAttribute('aria-label', 'ITC Logo');

    const optimizedFooterLogo1Pic = createOptimizedPicture(footerLogo1Img.src, footerLogo1Img.alt);
    optimizedFooterLogo1Pic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    optimizedFooterLogo1Pic.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(footerLogo1Img, optimizedFooterLogo1Pic.querySelector('img'));

    newFooterLogo1Link.append(optimizedFooterLogo1Pic);
    footerLeftSection.append(newFooterLogo1Link);
  }

  const footerLogo2Row = block.children[block.children.length - 8];
  moveInstrumentation(footerLogo2Row, footerLeftSection);
  const footerLogo2Cell = footerLogo2Row.children[0];
  const footerLogo2Img = footerLogo2Cell.querySelector('img');

  if (footerLogo2Img) {
    const footerLogo2Div = document.createElement('div');
    footerLogo2Div.className = 'header-footer-brand__secondary--logo header-d-inline-block';

    const optimizedFooterLogo2Pic = createOptimizedPicture(footerLogo2Img.src, footerLogo2Img.alt);
    optimizedFooterLogo2Pic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
    optimizedFooterLogo2Pic.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(footerLogo2Img, optimizedFooterLogo2Pic.querySelector('img'));

    footerLogo2Div.append(optimizedFooterLogo2Pic);
    footerLeftSection.append(footerLogo2Div);
  }

  // Footer Navbar
  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');
  footerRightSection.append(footerNav);

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';
  footerNav.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  footerNav.append(footerNavbarRight);

  // Footer Lists
  const footerListRows = Array.from(block.children).slice(block.children.length - 7, block.children.length - 3);
  footerListRows.forEach((row, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    moveInstrumentation(row, footerListDiv);

    const footerListUl = document.createElement('ul');
    footerListUl.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
    footerListDiv.append(footerListUl);

    const listItems = row.children[0].querySelectorAll('li');
    listItems.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'header-footer-list__item';
      moveInstrumentation(item, li);

      const link = item.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        newLink.setAttribute('data-link-region', 'Footer List');
        if (link.target) newLink.target = link.target;
        newLink.textContent = link.textContent.trim();
        li.append(newLink);
      }
      footerListUl.append(li);
    });

    if (index < 2) {
      footerNavbarLeft.append(footerListDiv);
    } else {
      footerNavbarRight.append(footerListDiv);
    }
  });

  // Footer Secondary Section
  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.className = 'header-footer-brand__secondary';
  footerSecondarySection.style.backgroundColor = '';
  footerBrandDiv.append(footerSecondarySection);

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  footerSecondarySection.append(footerSecondaryContainer);

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';
  footerSecondaryContainer.append(footerSecondaryContent);

  const footerSocialSection = document.createElement('section');
  footerSocialSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  footerSecondaryContent.append(footerSocialSection);

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  footerSocialSection.append(socialTitle);

  const socialUl = document.createElement('ul');
  socialUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';
  footerSocialSection.append(socialUl);

  // Footer Social Items
  const footerSocialRows = Array.from(block.children).slice(block.children.length - 3, block.children.length);
  footerSocialRows.forEach((row) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
    moveInstrumentation(row, li);

    const cell = row.children[0];
    const link = cell.querySelector('a');
    const img = cell.querySelector('img');

    if (link && img) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));
      newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name'));
      newLink.setAttribute('data-social-linktype', 'follow');

      const optimizedImg = createOptimizedPicture(img.src, img.alt);
      optimizedImg.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label'));
      optimizedImg.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      optimizedImg.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(img, optimizedImg.querySelector('img'));

      newLink.append(optimizedImg);
      socialUl.append(li);
      li.append(newLink);
    }
  });

  const footerCopyrightSection = document.createElement('section');
  footerCopyrightSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  footerSecondaryContent.append(footerCopyrightSection);

  const footerCopyrightUl = document.createElement('ul');
  footerCopyrightUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  footerCopyrightSection.append(footerCopyrightUl);

  // Footer Left Link
  const footerLinkRow = block.children[block.children.length - 2];
  moveInstrumentation(footerLinkRow, footerCopyrightUl);
  const footerLinkCell = footerLinkRow.children[0];
  const footerLink = footerLinkCell.querySelector('a');
  if (footerLink) {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__left--item header-foot_link';
    const newLink = document.createElement('a');
    newLink.href = footerLink.href;
    newLink.target = '_blank';
    newLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
    newLink.setAttribute('data-cta-region', 'Footer');
    newLink.textContent = footerLink.textContent.trim();
    li.append(newLink);
    footerCopyrightUl.append(li);
  }

  // Copyright Text
  const copyrightRow = block.children[block.children.length - 1];
  moveInstrumentation(copyrightRow, footerCopyrightSection);
  const copyrightCell = copyrightRow.children[0];
  const copyrightTextDiv = document.createElement('div');
  copyrightTextDiv.className = 'header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = copyrightCell.textContent.trim();
  copyrightTextDiv.append(copyrightSpan);
  footerCopyrightSection.append(copyrightTextDiv);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  block.textContent = '';
  block.append(mainSection);
}
