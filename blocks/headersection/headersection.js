import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const leftImage = block.querySelector('[data-aue-prop="leftImage"]');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const menuItems = block.querySelectorAll('[data-aue-model="menuItem"]');
  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const socialMediaItems = block.querySelectorAll('[data-aue-model="socialMedia"]');
  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  const copyright = block.querySelector('[data-aue-prop="copyright"]');

  block.textContent = '';

  const headerSection = document.createElement('section');
  headerSection.className = 'header-section position-relative mb-15';

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'header-section-app-name d-none';
    appNameSpan.setAttribute('data-app-name', appName.textContent);
    moveInstrumentation(appName, appNameSpan);
    headerSection.append(appNameSpan);
  }

  const header = document.createElement('header');
  header.className = 'header-section-boing-container boing-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-section-d-flex d-flex w-25';
  if (leftImage) {
    const leftImg = createOptimizedPicture(leftImage.textContent, '', false, [{ width: '25' }]);
    moveInstrumentation(leftImage, headerLeftDiv);
    headerLeftDiv.append(leftImg);
  }
  header.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-section-d-flex d-flex  justify-content-center w-25';
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href;
    logoAnchor.className = 'header-section-analytics_cta_click analytics_cta_click';
    logoAnchor.setAttribute('data-ct', '');
    logoAnchor.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(logoLink, logoAnchor);

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header__logo d-flex align-items-center';

    if (logoImage) {
      const logoPic = createOptimizedPicture(logoImage.src, logoImage.alt, true, [{ width: '200' }]);
      logoPic.querySelector('img').className = 'header__logo-img';
      moveInstrumentation(logoImage, logoPic);
      logoDiv.append(logoPic);
    }
    logoAnchor.append(logoDiv);
    headerCenterDiv.append(logoAnchor);
  }
  header.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-section-d-flex d-flex w-25 justify-content-end';
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href;
    loginAnchor.className = 'header__login-btn-wrapper analytics_cta_click';
    loginAnchor.style.display = 'inline';
    moveInstrumentation(loginLink, loginAnchor);

    const loginButton = document.createElement('button');
    loginButton.className = 'header__login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
    loginButton.textContent = loginLink.textContent.trim();
    loginAnchor.append(loginButton);
    headerRightDiv.append(loginAnchor);
  }
  header.append(headerRightDiv);

  headerSection.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-section-submenu-container submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-section-sidebar sidebar start-0 bg-white position-absolute';

  const menuList = document.createElement('ul');
  menuList.className = 'header-section-sidebar__menu sidebar__menu list-unstyled px-4';

  menuItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-section-sidebar__menu-item sidebar__menu-item   py-6 border-bottom border-boing-neutral-gray-200';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    const label = itemNode.querySelector('[data-aue-prop="label"]');

    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-section-sidebar__menu-link sidebar__menu-link  d-flex align-items-center text-decoration-none px-6 fw-medium analytics_cta_click';
      anchor.setAttribute('data-consent', 'false'); // Assuming default
      anchor.setAttribute('data-link', link.getAttribute('data-link') || link.href);
      moveInstrumentation(link, anchor);

      if (icon) {
        const iconImg = createOptimizedPicture(icon.src, icon.alt, false, [{ width: '24' }]);
        iconImg.querySelector('img').className = 'header-section-sidebar__menu-icon sidebar__menu-icon me-4';
        moveInstrumentation(icon, iconImg);
        anchor.append(iconImg);
      }
      if (label) {
        anchor.append(label.textContent.trim());
        moveInstrumentation(label, anchor);
      }
      listItem.append(anchor);
    }
    moveInstrumentation(itemNode, listItem);
    menuList.append(listItem);
  });
  sidebar.append(menuList);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-section-sidebar__curve sidebar__curve';
  sidebar.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-section-footer-brand footer-brand w-100 bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerPrimary = document.createElement('section');
  footerPrimary.className = 'header-section-footer-brand__primary footer-brand__primary';

  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.className = 'header-section-container container';

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-section-footer-brand__primary--content footer-brand__primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-section-footer-brand__left footer-brand__left d-flex gap-16 px-10 align-items-center justify-content-center';

  if (footerLogo1) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.href = 'https://www.itcportal.com/'; // Assuming static for now, or extract from authored link if present
    logo1Anchor.target = '_blank';
    logo1Anchor.className = 'header-section-footer-brand__logo footer-brand__logo d-inline-block analytics_cta_click';
    logo1Anchor.setAttribute('data-cta-region', 'Footer');
    logo1Anchor.setAttribute('aria-label', 'ITC Logo');
    moveInstrumentation(footerLogo1, logo1Anchor);

    const logo1Pic = createOptimizedPicture(footerLogo1.src, footerLogo1.alt, false, [{ width: '100' }]);
    logo1Pic.querySelector('img').className = 'header-section-object-fit-contain object-fit-contain w-100 h-100 no-rendition';
    logo1Anchor.append(logo1Pic);
    footerBrandLeft.append(logo1Anchor);
  }

  if (footerLogo2) {
    const logo2Div = document.createElement('div');
    logo2Div.className = 'header-section-footer-brand__secondary--logo footer-brand__secondary--logo d-inline-block';
    moveInstrumentation(footerLogo2, logo2Div);

    const logo2Pic = createOptimizedPicture(footerLogo2.src, footerLogo2.alt, false, [{ width: '100' }]);
    logo2Pic.querySelector('img').className = 'header-section-object-fit-contain object-fit-contain w-100 no-rendition';
    logo2Div.append(logo2Pic);
    footerBrandLeft.append(logo2Div);
  }
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-section-footer-brand__right footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-section-footer-brand__navbar footer-brand__navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-section-footer-brand__navbar--left footer-brand__navbar--left d-flex flex-column flex-md-row ';

  // Grouping footer links into columns (assuming 2 columns per left/right section)
  const linkColumns = [[], [], [], []];
  footerLinks.forEach((itemNode, index) => {
    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const label = itemNode.querySelector('[data-aue-prop="label"]');
    if (link && label) {
      const listItem = document.createElement('li');
      listItem.className = 'header-section-footer-list__item footer-list__item';

      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-section-cta-analytics cta-analytics analytics_cta_click footer-list__item--link d-inline-block';
      anchor.setAttribute('data-link-region', 'Footer List');
      if (link.target) anchor.target = link.target;
      anchor.textContent = label.textContent.trim();
      moveInstrumentation(link, anchor);
      moveInstrumentation(label, anchor);
      listItem.append(anchor);
      linkColumns[index % 4].push(listItem);
    }
    moveInstrumentation(itemNode, linkColumns[index % 4][linkColumns[index % 4].length - 1]);
  });

  linkColumns.slice(0, 2).forEach(col => {
    if (col.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'header-section-footerList footerList';
      const ul = document.createElement('ul');
      ul.className = 'header-section-footer-list footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
      col.forEach(li => ul.append(li));
      footerListDiv.append(ul);
      footerNavbarLeft.append(footerListDiv);
    }
  });
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-section-footer-brand__navbar--right footer-brand__navbar--right d-flex flex-column flex-md-row';

  linkColumns.slice(2, 4).forEach(col => {
    if (col.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'header-section-footerList footerList';
      const ul = document.createElement('ul');
      ul.className = 'header-section-footer-list footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
      col.forEach(li => ul.append(li));
      footerListDiv.append(ul);
      footerNavbarRight.append(footerListDiv);
    }
  });
  footerNavbar.append(footerNavbarRight);

  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerPrimaryContainer.append(footerPrimaryContent);
  footerPrimary.append(footerPrimaryContainer);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.className = 'header-section-footer-brand__secondary footer-brand__secondary';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-section-container container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-section-footer-brand__secondary--content footer-brand__secondary--content d-flex flex-column  justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-section-footer-brand__right footer-brand__right d-flex flex-column pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-section-social_media--title social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-section-footer-brand__right--list footer-brand__right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  socialMediaItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-section-footer-brand__right--item footer-brand__right--item d-flex justify-content-center align-items-center';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    if (link && icon) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.target = '_blank';
      anchor.className = 'header-section-footer-brand__right--link footer-brand__right--link d-flex justify-content-center align-items-center analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
      anchor.setAttribute('data-platform-name', icon.alt.toLowerCase());
      anchor.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(link, anchor);

      const iconPic = createOptimizedPicture(icon.src, icon.alt, false, [{ width: '32' }]);
      iconPic.querySelector('img').className = 'header-section-object-fit-contain object-fit-contain w-100 h-100 no-rendition';
      iconPic.querySelector('img').setAttribute('aria-label', icon.alt);
      moveInstrumentation(icon, iconPic);
      anchor.append(iconPic);
      listItem.append(anchor);
    }
    moveInstrumentation(itemNode, listItem);
    socialMediaList.append(listItem);
  });
  socialMediaSection.append(socialMediaList);
  footerSecondaryContent.append(socialMediaSection);

  const footerLeftBottom = document.createElement('section');
  footerLeftBottom.className = 'header-section-footer-brand__left footer-brand__left py-5 d-flex flex-column gap-3';

  const footerLeftBottomList = document.createElement('ul');
  footerLeftBottomList.className = 'header-section-footer-brand__left--list footer-brand__left--list d-flex align-items-center justify-content-center flex-wrap';

  if (itcPortalLink) {
    const listItem = document.createElement('li');
    listItem.className = 'header-section-footer-brand__left--item footer-brand__left--item foot_link';
    const anchor = document.createElement('a');
    anchor.href = itcPortalLink.href;
    anchor.target = '_blank';
    anchor.className = 'header-section-footer-brand__left--link footer-brand__left--link analytics_cta_click';
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.textContent = itcPortalLink.textContent.trim();
    moveInstrumentation(itcPortalLink, anchor);
    listItem.append(anchor);
    footerLeftBottomList.append(listItem);
  }
  footerLeftBottom.append(footerLeftBottomList);

  if (copyright) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'header-section-footer-brand__left--copyright footer-brand__left--copyright text-center ';
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'header-section-footer-brand__left--text footer-brand__left--text text-white';
    copyrightSpan.textContent = copyright.textContent.trim();
    moveInstrumentation(copyright, copyrightSpan);
    copyrightDiv.append(copyrightSpan);
    footerLeftBottom.append(copyrightDiv);
  }
  footerSecondaryContent.append(footerLeftBottom);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.className = 'header-section-overlay overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  submenuContainer.append(overlay);

  headerSection.append(submenuContainer);

  block.append(headerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
