import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('.header-app-name');
  const header = block.querySelector('.header-boing-container');
  const logoLink = header.querySelector('.header-header__logo').closest('a');
  const logoImage = logoLink.querySelector('.header-header__logo-img');
  const loginButton = header.querySelector('.header-header__login-btn-wrapper');
  const loginBtnText = loginButton.querySelector('button');

  const submenuContainer = block.querySelector('.header-submenu-container');
  const sidebar = submenuContainer.querySelector('.header-sidebar');
  const menuList = sidebar.querySelector('.header-sidebar__menu');

  const footerBrand = sidebar.querySelector('.header-footer-brand');
  const footerPrimary = footerBrand.querySelector('.header-footer-brand__primary');
  const footerBrandLogo1 = footerPrimary.querySelector('.header-footer-brand__left a.header-footer-brand__logo img');
  const footerBrandLogo2 = footerPrimary.querySelector('.header-footer-brand__left .header-footer-brand__secondary--logo img');

  const footerNav = footerPrimary.querySelector('.header-footer-brand__navbar');
  const footerLists = footerNav.querySelectorAll('.header-footerList');

  const footerSecondary = footerBrand.querySelector('.header-footer-brand__secondary');
  const socialMediaList = footerSecondary.querySelector('.header-footer-brand__right--list');
  const copyrightText = footerSecondary.querySelector('.header-footer-brand__left--copyright .header-footer-brand__left--text');

  // Create the main header row
  const headerRow = document.createElement('div');
  headerRow.className = 'header';
  moveInstrumentation(header, headerRow);

  // App Name
  const appNameCell = document.createElement('div');
  appNameCell.textContent = appName?.dataset.appName || '';
  headerRow.append(appNameCell);

  // Logo Image
  const logoImageCell = document.createElement('div');
  if (logoImage) {
    const optimizedPic = createOptimizedPicture(logoImage.src, logoImage.alt);
    moveInstrumentation(logoImage, optimizedPic.querySelector('img'));
    const logoLinkElement = document.createElement('a');
    logoLinkElement.href = logoLink?.href || '#';
    logoLinkElement.append(optimizedPic);
    logoImageCell.append(logoLinkElement);
  }
  headerRow.append(logoImageCell);

  // Login Button
  const loginCell = document.createElement('div');
  if (loginButton) {
    const loginLinkElement = document.createElement('a');
    loginLinkElement.href = loginButton.href || '#';
    loginLinkElement.textContent = loginBtnText?.textContent.trim() || '';
    loginCell.append(loginLinkElement);
  }
  headerRow.append(loginCell);

  // Brand Logo 1
  const brandLogo1Cell = document.createElement('div');
  if (footerBrandLogo1) {
    const optimizedPic = createOptimizedPicture(footerBrandLogo1.src, footerBrandLogo1.alt);
    moveInstrumentation(footerBrandLogo1, optimizedPic.querySelector('img'));
    brandLogo1Cell.append(optimizedPic);
  }
  headerRow.append(brandLogo1Cell);

  // Brand Logo 2
  const brandLogo2Cell = document.createElement('div');
  if (footerBrandLogo2) {
    const optimizedPic = createOptimizedPicture(footerBrandLogo2.src, footerBrandLogo2.alt);
    moveInstrumentation(footerBrandLogo2, optimizedPic.querySelector('img'));
    brandLogo2Cell.append(optimizedPic);
  }
  headerRow.append(brandLogo2Cell);

  // Copyright
  const copyrightCell = document.createElement('div');
  copyrightCell.innerHTML = copyrightText?.innerHTML.trim() || '';
  headerRow.append(copyrightCell);

  block.textContent = '';
  block.append(headerRow);

  // Menu Items
  [...menuList.children].forEach((menuItemRow) => {
    const link = menuItemRow.querySelector('a');
    const icon = menuItemRow.querySelector('img');

    const menuItemDiv = document.createElement('div');
    menuItemDiv.className = 'menu-item';
    moveInstrumentation(menuItemRow, menuItemDiv);

    const labelCell = document.createElement('div');
    labelCell.textContent = link?.textContent.trim() || '';
    menuItemDiv.append(labelCell);

    const hrefCell = document.createElement('div');
    hrefCell.textContent = link?.href || '';
    menuItemDiv.append(hrefCell);

    const iconCell = document.createElement('div');
    if (icon) {
      const optimizedPic = createOptimizedPicture(icon.src, icon.alt);
      moveInstrumentation(icon, optimizedPic.querySelector('img'));
      iconCell.append(optimizedPic);
    }
    menuItemDiv.append(iconCell);

    block.append(menuItemDiv);
  });

  // Footer Links
  footerLists.forEach((list) => {
    [...list.children].forEach((footerLinkRow) => {
      const link = footerLinkRow.querySelector('a');

      const footerLinkDiv = document.createElement('div');
      footerLinkDiv.className = 'footer-link';
      moveInstrumentation(footerLinkRow, footerLinkDiv);

      const labelCell = document.createElement('div');
      labelCell.textContent = link?.textContent.trim() || '';
      footerLinkDiv.append(labelCell);

      const hrefCell = document.createElement('div');
      hrefCell.textContent = link?.href || '';
      footerLinkDiv.append(hrefCell);

      block.append(footerLinkDiv);
    });
  });

  // Social Links
  [...socialMediaList.children].forEach((socialLinkRow) => {
    const link = socialLinkRow.querySelector('a');
    const icon = socialLinkRow.querySelector('img');

    const socialLinkDiv = document.createElement('div');
    socialLinkDiv.className = 'social-link';
    moveInstrumentation(socialLinkRow, socialLinkDiv);

    const platformCell = document.createElement('div');
    platformCell.textContent = link?.dataset.platformName || '';
    socialLinkDiv.append(platformCell);

    const hrefCell = document.createElement('div');
    hrefCell.textContent = link?.href || '';
    socialLinkDiv.append(hrefCell);

    const iconCell = document.createElement('div');
    if (icon) {
      const optimizedPic = createOptimizedPicture(icon.src, icon.alt);
      moveInstrumentation(icon, optimizedPic.querySelector('img'));
      iconCell.append(optimizedPic);
    }
    socialLinkDiv.append(iconCell);

    block.append(socialLinkDiv);
  });
}