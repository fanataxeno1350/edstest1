import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainSection = document.createElement('section');
  mainSection.className = 'header-position-relative header-mb-15';
  moveInstrumentation(block, mainSection);

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  mainSection.append(appNameSpan);

  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  mainSection.append(header);

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  // Assuming the block's first row (block.children[0]) contains the logo
  const logoCell = block.children[0]?.children[0];
  if (logoCell) {
    const logoImg = logoCell.querySelector('img');
    if (logoImg) {
      const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt);
      moveInstrumentation(logoImg, optimizedLogo.querySelector('img'));
      headerLeftDiv.append(optimizedLogo);
    }
  }
  header.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-d-flex header-justify-content-center header-w-25';
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'header-analytics_cta_click';
  logoLink.setAttribute('data-ct', '');
  logoLink.setAttribute('a-label', 'header-logo-boing');
  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  const logoImg = block.children[0]?.children[0]?.querySelector('img'); // Assuming the logo is in the first cell of the first row
  if (logoImg) {
    const optimizedLogoImg = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '100vw' }]);
    moveInstrumentation(logoImg, optimizedLogoImg.querySelector('img'));
    optimizedLogoImg.querySelector('img').className = 'header-header__logo-img';
    optimizedLogoImg.querySelector('img').setAttribute('fetchpriority', 'high');
    optimizedLogoImg.querySelector('img').setAttribute('loading', 'eager');
    logoDiv.append(optimizedLogoImg);
  }
  logoLink.append(logoDiv);
  headerCenterDiv.append(logoLink);
  header.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginLink = document.createElement('a');
  loginLink.href = '/login.html';
  loginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
  loginLink.style.display = 'inline';
  const loginButton = document.createElement('button');
  loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
  loginButton.textContent = 'Login';
  loginLink.append(loginButton);
  headerRightDiv.append(loginLink);
  header.append(headerRightDiv);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  mainSection.append(submenuContainer);

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';
  submenuContainer.append(aside);

  const menuUl = document.createElement('ul');
  menuUl.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  aside.append(menuUl);

  // Process Menu Items (assuming they start from the second row)
  // The block.children structure is [headerRow, menuItem1, menuItem2, ..., itcLogoRow, fssiLogoRow, copyrightRow, footerLink1, ..., socialLink1, ...]
  // We need to find the correct starting and ending rows for menu items.
  // For simplicity, let's assume menu items are the rows with 3 cells (icon, label, link)
  // This needs to be robust based on actual block content structure.
  const menuItems = [...block.children].filter(row => row.children.length === 3 && row.children[0].querySelector('img') && row.children[1].textContent && row.children[2].querySelector('a'));

  menuItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

    const iconCell = row.children[0];
    const labelCell = row.children[1];
    const linkCell = row.children[2];

    const linkElement = linkCell.querySelector('a');
    const imgElement = iconCell.querySelector('img');

    if (linkElement && imgElement) {
      const a = document.createElement('a');
      a.href = linkElement.href;
      a.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      a.setAttribute('data-consent', 'false'); // Default, adjust if needed
      a.setAttribute('data-link', linkElement.href.replace('.html', '')); // Adjust path as needed

      const optimizedIcon = createOptimizedPicture(imgElement.src, imgElement.alt);
      moveInstrumentation(imgElement, optimizedIcon.querySelector('img'));
      optimizedIcon.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      optimizedIcon.querySelector('img').setAttribute('loading', 'lazy');
      a.append(optimizedIcon);
      a.append(document.createTextNode(labelCell.textContent.trim()));
      li.append(a);
    }
    menuUl.append(li);
  });

  // Add logout item
  const logoutLi = document.createElement('li');
  logoutLi.className = 'header-sidebar__menu-item header-sidebar__menu-item--logout header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
  logoutLi.style.display = 'none';
  const logoutLink = document.createElement('a');
  logoutLink.href = '/';
  logoutLink.className = 'header-sidebar__menu-link header-sidebar__menu-item--logout-btn header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
  logoutLink.setAttribute('data-consent', 'false');
  logoutLink.setAttribute('data-link', '/content/boing/in/en/home');
  const logoutImg = createOptimizedPicture('/content/dam/aemigrate/uploaded-folder/image/logout-3-fmt-webp-alpha.webp', 'Logout');
  logoutImg.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
  logoutImg.querySelector('img').setAttribute('loading', 'lazy');
  logoutLink.append(logoutImg);
  logoutLink.append(document.createTextNode('Logout'));
  logoutLi.append(logoutLink);
  menuUl.append(logoutLi);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrandDiv.setAttribute('data-isdoodlevariation', 'false');
  aside.append(footerBrandDiv);

  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.className = 'header-footer-brand__primary';
  footerPrimarySection.style.backgroundColor = '';
  footerBrandDiv.append(footerPrimarySection);

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';
  footerPrimarySection.append(footerContainer);

  const footerContent = document.createElement('div');
  footerContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';
  footerContainer.append(footerContent);

  const footerLeftSection = document.createElement('section');
  footerLeftSection.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';
  footerContent.append(footerLeftSection);

  // ITC Logo
  const itcLogoLink = document.createElement('a');
  itcLogoLink.href = 'https://www.itcportal.com/';
  itcLogoLink.target = '_blank';
  itcLogoLink.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
  itcLogoLink.setAttribute('data-cta-region', 'Footer');
  itcLogoLink.setAttribute('aria-label', 'ITC Logo');
  const itcLogoImg = block.children[1]?.children[0]?.querySelector('img'); // Assuming ITC logo is in the second row, first cell
  if (itcLogoImg) {
    const optimizedItcLogo = createOptimizedPicture(itcLogoImg.src, itcLogoImg.alt);
    moveInstrumentation(itcLogoImg, optimizedItcLogo.querySelector('img'));
    optimizedItcLogo.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    optimizedItcLogo.querySelector('img').setAttribute('loading', 'lazy');
    itcLogoLink.append(optimizedItcLogo);
  }
  footerLeftSection.append(itcLogoLink);

  // FSSI Logo
  const fssiLogoDiv = document.createElement('div');
  fssiLogoDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
  const fssiLogoImg = block.children[2]?.children[0]?.querySelector('img'); // Assuming FSSI logo is in the third row, first cell
  if (fssiLogoImg) {
    const optimizedFssiLogo = createOptimizedPicture(fssiLogoImg.src, fssiLogoImg.alt);
    moveInstrumentation(fssiLogoImg, optimizedFssiLogo.querySelector('img'));
    optimizedFssiLogo.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
    optimizedFssiLogo.querySelector('img').setAttribute('loading', 'lazy');
    fssiLogoDiv.append(optimizedFssiLogo);
  }
  footerLeftSection.append(fssiLogoDiv);

  const footerRightSection = document.createElement('section');
  footerRightSection.className = 'header-footer-brand__right';
  footerContent.append(footerRightSection);

  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');
  footerRightSection.append(footerNav);

  const footerNavLeft = document.createElement('div');
  footerNavLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';
  footerNav.append(footerNavLeft);

  // Process Footer Links (grouped by columns)
  // Assuming footer links are in rows with 2 cells (label, link)
  const footerLinkRows = [...block.children].filter(row => row.children.length === 2 && row.children[0].textContent && row.children[1].querySelector('a'));

  // Group footer links into 4 columns (as per HTML structure)
  const columns = [[], [], [], []];
  footerLinkRows.forEach((row, index) => {
    columns[index % 4].push(row);
  });

  columns.forEach((col, colIndex) => {
    if (col.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'header-footerList';
      const ul = document.createElement('ul');
      ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

      col.forEach(row => {
        const li = document.createElement('li');
        moveInstrumentation(row, li);
        li.className = 'header-footer-list__item';
        const linkElement = row.children[1].querySelector('a');
        if (linkElement) {
          const a = document.createElement('a');
          a.href = linkElement.href;
          a.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
          a.setAttribute('data-link-region', 'Footer List');
          if (linkElement.target) {
            a.target = linkElement.target;
          }
          a.textContent = row.children[0].textContent.trim();
          li.append(a);
        }
        ul.append(li);
      });
      footerListDiv.append(ul);
      if (colIndex < 2) {
        footerNavLeft.append(footerListDiv);
      } else {
        let footerNavRight = footerNav.querySelector('.header-footer-brand__navbar--right');
        if (!footerNavRight) {
          footerNavRight = document.createElement('div');
          footerNavRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
          footerNav.append(footerNavRight);
        }
        footerNavRight.append(footerListDiv);
      }
    }
  });

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

  const socialMediaRightSection = document.createElement('section');
  socialMediaRightSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  footerSecondaryContent.append(socialMediaRightSection);

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaRightSection.append(socialMediaTitle);

  const socialMediaUl = document.createElement('ul');
  socialMediaUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';
  socialMediaRightSection.append(socialMediaUl);

  // Process Social Links (assuming rows with 3 cells: icon, platform, link)
  const socialLinkRows = [...block.children].filter(row => row.children.length === 3 && row.children[0].querySelector('img') && row.children[1].textContent && row.children[2].querySelector('a'));

  socialLinkRows.forEach(row => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const iconCell = row.children[0];
    const platformCell = row.children[1];
    const linkCell = row.children[2];

    const linkElement = linkCell.querySelector('a');
    const imgElement = iconCell.querySelector('img');

    if (linkElement && imgElement) {
      const a = document.createElement('a');
      a.href = linkElement.href;
      a.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      a.setAttribute('data-cta-region', 'Footer');
      a.setAttribute('data-cta-label', `footer-${platformCell.textContent.toLowerCase()}`);
      a.target = '_blank';
      a.setAttribute('data-platform-name', platformCell.textContent.toLowerCase());
      a.setAttribute('data-social-linktype', 'follow');

      const optimizedIcon = createOptimizedPicture(imgElement.src, imgElement.alt);
      moveInstrumentation(imgElement, optimizedIcon.querySelector('img'));
      optimizedIcon.querySelector('img').setAttribute('aria-label', platformCell.textContent.toLowerCase());
      optimizedIcon.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      optimizedIcon.querySelector('img').setAttribute('alt', linkElement.href);
      optimizedIcon.querySelector('img').setAttribute('loading', 'lazy');
      a.append(optimizedIcon);
      li.append(a);
    }
    socialMediaUl.append(li);
  });

  const copyrightLeftSection = document.createElement('section');
  copyrightLeftSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  footerSecondaryContent.append(copyrightLeftSection);

  const copyrightUl = document.createElement('ul');
  copyrightUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  copyrightLeftSection.append(copyrightUl);

  const itcPortalLi = document.createElement('li');
  itcPortalLi.className = 'header-footer-brand__left--item header-foot_link';
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  itcPortalLi.append(itcPortalLink);
  copyrightUl.append(itcPortalLi);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  // Assuming copyright text is in the last row of the block, first cell
  const copyrightTextCell = block.children[block.children.length - 1]?.children[0];
  if (copyrightTextCell) {
    copyrightSpan.textContent = copyrightTextCell.textContent.trim();
  } else {
    copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.'; // Fallback
  }
  copyrightDiv.append(copyrightSpan);
  copyrightLeftSection.append(copyrightDiv);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  block.textContent = '';
  block.append(mainSection);
}