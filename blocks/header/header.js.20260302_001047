import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainHeaderSection = document.createElement('section');
  mainHeaderSection.className = 'header-section header-position-relative header-mb-15';
  moveInstrumentation(block, mainHeaderSection);

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-app-name header-d-none';
  const appNameCell = block.children[0]?.children[0];
  if (appNameCell) {
    appNameSpan.textContent = appNameCell.textContent.trim();
    appNameSpan.setAttribute('data-app-name', appNameCell.textContent.trim());
    moveInstrumentation(appNameCell, appNameSpan);
  }
  mainHeaderSection.append(appNameSpan);

  const headerRow = block.children[0];
  const headerElement = document.createElement('header');
  headerElement.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  moveInstrumentation(headerRow, headerElement);

  // Left div (empty in provided HTML, but structured)
  const leftDiv = document.createElement('div');
  leftDiv.className = 'header-w-25 header-d-flex';
  headerElement.append(leftDiv);

  // Center div (Logo)
  const centerDiv = document.createElement('div');
  centerDiv.className = 'header-w-25 header-justify-content-center header-d-flex';
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'header-analytics_cta_click';
  logoLink.setAttribute('data-ct', '');
  logoLink.setAttribute('aria-label', 'header-logo-boing');
  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';

  const logoImageCell = headerRow.children[1];
  const logoImg = logoImageCell?.querySelector('img');
  if (logoImg) {
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, true, [{ width: '100vw' }]);
    optimizedLogoPic.querySelector('img').className = 'header-header__logo-img';
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
    logoDiv.append(optimizedLogoPic);
  }
  logoLink.append(logoDiv);
  centerDiv.append(logoLink);
  headerElement.append(centerDiv);

  // Right div (Login Button)
  const rightDiv = document.createElement('div');
  rightDiv.className = 'header-w-25 header-justify-content-end header-d-flex';
  const loginLink = document.createElement('a');
  const loginLinkCell = headerRow.children[2];
  const loginButton = loginLinkCell?.querySelector('button');
  if (loginButton) {
    loginLink.href = loginLinkCell.querySelector('a')?.href || '#';
    loginLink.className = 'header-header__login-btn-wrapper header-inline-display';
    const newLoginButton = document.createElement('button');
    newLoginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    newLoginButton.textContent = loginButton.textContent.trim();
    moveInstrumentation(loginButton, newLoginButton);
    loginLink.append(newLoginButton);
  }
  rightDiv.append(loginLink);
  headerElement.append(rightDiv);
  mainHeaderSection.append(headerElement);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  // Header Menu Items
  const menuItemsRows = [...block.children].slice(1, -1); // Exclude header row and footer row
  menuItemsRows.forEach((row) => {
    if (row.children.length === 4) { // Assuming 4 cells for a menu item: label, icon, iconAlt, url
      const li = document.createElement('li');
      li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
      moveInstrumentation(row, li);

      const link = document.createElement('a');
      link.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      link.href = row.children[3].textContent.trim(); // URL
      link.setAttribute('data-consent', 'false'); // Default, adjust if needed
      link.setAttribute('data-link', row.children[3].textContent.trim()); // URL

      const iconImg = row.children[1].querySelector('img'); // Icon
      if (iconImg) {
        const optimizedIconPic = createOptimizedPicture(iconImg.src, iconImg.alt, false, [{ width: '40' }]);
        optimizedIconPic.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
        moveInstrumentation(iconImg, optimizedIconPic.querySelector('img'));
        link.append(optimizedIconPic);
      }

      link.append(row.children[0].textContent.trim()); // Label
      li.append(link);
      sidebarMenu.append(li);
    }
  });
  sidebar.append(sidebarMenu);

  // Logout menu item (hardcoded as it's not in the block json as a regular item)
  const logoutLi = document.createElement('li');
  logoutLi.className = 'header-sidebar__menu-item header-sidebar__menu-item--logout header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
  logoutLi.style.display = 'none';
  const logoutLink = document.createElement('a');
  logoutLink.href = '/';
  logoutLink.className = 'header-sidebar__menu-link header-sidebar__menu-item--logout-btn header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
  logoutLink.setAttribute('data-consent', 'false');
  logoutLink.setAttribute('data-link', '/content/boing/in/en/home');
  const logoutImg = createOptimizedPicture('/content/dam/aemigrate/uploaded-folder/image/logout-3-fmt-webp-alpha.webp', 'Logout', false, [{ width: '40' }]);
  logoutImg.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
  logoutLink.append(logoutImg);
  logoutLink.append('Logout');
  logoutLi.append(logoutLink);
  sidebarMenu.append(logoutLi);

  // Sidebar curve
  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  sidebar.append(sidebarCurve);

  // Footer Brand Section
  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrandDiv.setAttribute('data-isdoodlevariation', 'false');

  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.className = 'header-footer-brand__primary';
  footerPrimarySection.style.backgroundColor = '';
  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';
  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerLeftSection = document.createElement('section');
  footerLeftSection.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  // Brand Logo 1
  const brandLogo1Link = document.createElement('a');
  brandLogo1Link.href = 'https://www.itcportal.com/';
  brandLogo1Link.target = '_blank';
  brandLogo1Link.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
  brandLogo1Link.setAttribute('data-cta-region', 'Footer');
  brandLogo1Link.setAttribute('aria-label', 'ITC Logo');
  const brandLogo1Cell = block.children[block.children.length - 1]?.children[0];
  const brandLogo1Img = brandLogo1Cell?.querySelector('img');
  if (brandLogo1Img) {
    const optimizedBrandLogo1Pic = createOptimizedPicture(brandLogo1Img.src, brandLogo1Img.alt, false, [{ width: '100vw' }]);
    optimizedBrandLogo1Pic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    moveInstrumentation(brandLogo1Img, optimizedBrandLogo1Pic.querySelector('img'));
    brandLogo1Link.append(optimizedBrandLogo1Pic);
  }
  footerLeftSection.append(brandLogo1Link);

  // Brand Logo 2
  const brandLogo2Div = document.createElement('div');
  brandLogo2Div.className = 'header-footer-brand__secondary--logo header-d-inline-block';
  const brandLogo2Cell = block.children[block.children.length - 1]?.children[1];
  const brandLogo2Img = brandLogo2Cell?.querySelector('img');
  if (brandLogo2Img) {
    const optimizedBrandLogo2Pic = createOptimizedPicture(brandLogo2Img.src, brandLogo2Img.alt, false, [{ width: '100vw' }]);
    optimizedBrandLogo2Pic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
    moveInstrumentation(brandLogo2Img, optimizedBrandLogo2Pic.querySelector('img'));
    brandLogo2Div.append(optimizedBrandLogo2Pic);
  }
  footerLeftSection.append(brandLogo2Div);
  footerPrimaryContent.append(footerLeftSection);

  const footerRightSection = document.createElement('section');
  footerRightSection.className = 'header-footer-brand__right';
  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';

  // Footer Links (assuming they are grouped into columns based on the HTML structure)
  const footerLinkRows = [...block.children].slice(block.children.length - 1);
  const footerLinkGroups = [];
  footerLinkRows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      const links = cell.querySelectorAll('a');
      if (links.length > 0) {
        footerLinkGroups.push(links);
      }
    });
  });

  footerLinkGroups.forEach((group, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

    group.forEach((link) => {
      const li = document.createElement('li');
      li.className = 'header-footer-list__item';
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent.trim();
      newLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      newLink.setAttribute('data-link-region', 'Footer List');
      if (link.target) newLink.target = link.target;
      moveInstrumentation(link, newLink);
      li.append(newLink);
      ul.append(li);
    });
    footerListDiv.append(ul);
    if (index < 2) {
      footerNavbarLeft.append(footerListDiv);
    } else {
      // Assuming subsequent groups go to footerNavbarRight
      if (!footerNav.querySelector('.header-footer-brand__navbar--right')) {
        const footerNavbarRight = document.createElement('div');
        footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
        footerNav.append(footerNavbarRight);
      }
      footerNav.querySelector('.header-footer-brand__navbar--right').append(footerListDiv);
    }
  });

  footerNav.append(footerNavbarLeft);
  footerRightSection.append(footerNav);
  footerPrimaryContent.append(footerRightSection);
  footerContainer.append(footerPrimaryContent);
  footerPrimarySection.append(footerContainer);
  footerBrandDiv.append(footerPrimarySection);

  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.className = 'header-footer-brand__secondary';
  footerSecondarySection.style.backgroundColor = '';
  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaRightSection = document.createElement('section');
  socialMediaRightSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaRightSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const socialLinkRows = [...block.children].slice(block.children.length - 1);
  socialLinkRows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      const socialLinks = cell.querySelectorAll('a[data-platform-name]');
      socialLinks.forEach((link) => {
        const li = document.createElement('li');
        li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.setAttribute('data-cta-label', `footer-${link.getAttribute('data-platform-name')}`);
        newLink.target = '_blank';
        newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name'));
        newLink.setAttribute('data-social-linktype', 'follow');

        const img = link.querySelector('img');
        if (img) {
          const optimizedSocialPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '40' }]);
          optimizedSocialPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
          optimizedSocialPic.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label'));
          moveInstrumentation(img, optimizedSocialPic.querySelector('img'));
          newLink.append(optimizedSocialPic);
        }
        moveInstrumentation(link, newLink);
        li.append(newLink);
        socialList.append(li);
      });
    });
  });
  socialMediaRightSection.append(socialList);
  footerSecondaryContent.append(socialMediaRightSection);

  const footerBottomLeftSection = document.createElement('section');
  footerBottomLeftSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const footerBottomLeftList = document.createElement('ul');
  footerBottomLeftList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  // ITC Portal link (from the HTML, not explicitly in blockJson as a separate FooterLink)
  const itcPortalLi = document.createElement('li');
  itcPortalLi.className = 'header-footer-brand__left--item header-foot_link';
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  itcPortalLi.append(itcPortalLink);
  footerBottomLeftList.append(itcPortalLi);
  footerBottomLeftSection.append(footerBottomLeftList);

  // Copyright
  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  footerBottomLeftSection.append(copyrightDiv);

  footerSecondaryContent.append(footerBottomLeftSection);
  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondarySection.append(footerSecondaryContainer);
  footerBrandDiv.append(footerSecondarySection);

  sidebar.append(footerBrandDiv);
  submenuContainer.append(sidebar);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  mainHeaderSection.append(submenuContainer);

  block.textContent = '';
  block.append(mainHeaderSection);
}
