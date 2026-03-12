import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const headerContainer = document.createElement('section');
  headerContainer.className = 'header-container-position-relative header-container-mb-15';

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-app-name d-none';
  const appName = block.querySelector('[data-aue-prop="appName"]');
  if (appName) {
    appNameSpan.textContent = appName.textContent;
    appNameSpan.setAttribute('data-app-name', appName.textContent);
    moveInstrumentation(appName, appNameSpan);
  }
  headerContainer.append(appNameSpan);

  const headerMain = document.createElement('header');
  headerMain.className = 'header-main boing-container d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const headerMenuWrapper = document.createElement('div');
  headerMenuWrapper.className = 'header-menu-wrapper d-flex w-25';
  // SVG for menu icon goes here - static content
  headerMain.append(headerMenuWrapper);

  const headerLogoCenter = document.createElement('div');
  headerLogoCenter.className = 'header-logo-center d-flex justify-content-center w-25';
  const logoLinkElement = document.createElement('a');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    logoLinkElement.href = logoLink.textContent;
    logoLinkElement.className = 'header-logo-link analytics_cta_click';
    logoLinkElement.setAttribute('data-ct', '');
    logoLinkElement.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(logoLink, logoLinkElement);
  } else {
    logoLinkElement.href = '/';
    logoLinkElement.className = 'header-logo-link analytics_cta_click';
    logoLinkElement.setAttribute('data-ct', '');
    logoLinkElement.setAttribute('a-label', 'header-logo-boing');
  }

  const headerLogoWrapper = document.createElement('div');
  headerLogoWrapper.className = 'header-logo-wrapper d-flex align-items-center';
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoImage && logoImage.querySelector('img')) {
    const img = logoImage.querySelector('img');
    const optimizedPicture = createOptimizedPicture(img.src, img.alt, true, [{ width: '100vw' }]);
    optimizedPicture.querySelector('img').className = 'header-logo-img';
    headerLogoWrapper.append(optimizedPicture);
    moveInstrumentation(logoImage, optimizedPicture);
  } else if (logoImage && logoImage.querySelector('a')) {
    const img = document.createElement('img');
    img.src = logoImage.querySelector('a').href;
    img.alt = 'Logo';
    img.className = 'header-logo-img';
    const optimizedPicture = createOptimizedPicture(img.src, img.alt, true, [{ width: '100vw' }]);
    optimizedPicture.querySelector('img').className = 'header-logo-img';
    headerLogoWrapper.append(optimizedPicture);
    moveInstrumentation(logoImage, optimizedPicture);
  }
  logoLinkElement.append(headerLogoWrapper);
  headerLogoCenter.append(logoLinkElement);
  headerMain.append(headerLogoCenter);

  const headerLoginSection = document.createElement('div');
  headerLoginSection.className = 'header-login-section d-flex w-25 justify-content-end';
  const loginBtnLink = document.createElement('a');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  if (loginLink) {
    loginBtnLink.href = loginLink.textContent;
    loginBtnLink.className = 'header-login-btn-wrapper analytics_cta_click';
    loginBtnLink.style.display = 'inline';
    moveInstrumentation(loginLink, loginBtnLink);
  } else {
    loginBtnLink.href = '/login.html';
    loginBtnLink.className = 'header-login-btn-wrapper analytics_cta_click';
    loginBtnLink.style.display = 'inline';
  }

  const loginButton = document.createElement('button');
  loginButton.className = 'header-login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
  const loginText = block.querySelector('[data-aue-prop="loginText"]');
  if (loginText) {
    loginButton.textContent = loginText.textContent;
    moveInstrumentation(loginText, loginButton);
  } else {
    loginButton.textContent = 'Login';
  }
  loginBtnLink.append(loginButton);
  headerLoginSection.append(loginBtnLink);
  headerMain.append(headerLoginSection);
  headerContainer.append(headerMain);

  const headerSubmenuContainer = document.createElement('div');
  headerSubmenuContainer.className = 'header-submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const headerSidebar = document.createElement('aside');
  headerSidebar.className = 'header-sidebar start-0 bg-white position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar-menu list-unstyled px-4';

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-sidebar-menu-item py-6 border-bottom border-boing-neutral-gray-200';

    const linkElement = document.createElement('a');
    linkElement.className = 'header-sidebar-menu-link d-flex align-items-center text-decoration-none px-6 fw-medium analytics_cta_click';
    linkElement.setAttribute('data-consent', 'false');

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    if (link) {
      linkElement.href = link.textContent;
      linkElement.setAttribute('data-link', link.textContent);
      moveInstrumentation(link, linkElement);
    } else {
      linkElement.href = '#';
    }

    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    if (icon && icon.querySelector('img')) {
      const img = icon.querySelector('img');
      const optimizedPicture = createOptimizedPicture(img.src, img.alt);
      optimizedPicture.querySelector('img').className = 'header-sidebar-menu-icon me-4';
      linkElement.append(optimizedPicture);
      moveInstrumentation(icon, optimizedPicture);
    } else if (icon && icon.querySelector('a')) {
      const img = document.createElement('img');
      img.src = icon.querySelector('a').href;
      img.alt = 'Icon';
      img.className = 'header-sidebar-menu-icon me-4';
      const optimizedPicture = createOptimizedPicture(img.src, img.alt);
      optimizedPicture.querySelector('img').className = 'header-sidebar-menu-icon me-4';
      linkElement.append(optimizedPicture);
      moveInstrumentation(icon, optimizedPicture);
    }

    const text = itemNode.querySelector('[data-aue-prop="text"]');
    if (text) {
      linkElement.append(text.textContent);
      moveInstrumentation(text, linkElement);
    }
    listItem.append(linkElement);
    sidebarMenu.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  // Add static logout item
  const logoutListItem = document.createElement('li');
  logoutListItem.className = 'header-sidebar-menu-item header-sidebar-menu-item--logout py-6 border-bottom border-boing-neutral-gray-200';
  logoutListItem.style.display = 'none';
  const logoutLink = document.createElement('a');
  logoutLink.href = '/';
  logoutLink.className = 'header-sidebar-menu-link header-sidebar-menu-item--logout-btn d-flex align-items-center text-decoration-none px-6 fw-medium analytics_cta_click';
  logoutLink.setAttribute('data-consent', 'false');
  logoutLink.setAttribute('data-link', '/content/boing/in/en/home');
  const logoutImg = document.createElement('img');
  logoutImg.src = '/content/dam/aemigrate/uploaded-folder/image/logout-3-fmt-webp-alpha.webp';
  logoutImg.alt = 'Logout';
  logoutImg.className = 'header-sidebar-menu-icon me-4';
  logoutImg.loading = 'lazy';
  logoutLink.append(logoutImg, 'Logout');
  logoutListItem.append(logoutLink);
  sidebarMenu.append(logoutListItem);

  headerSidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar-curve';
  headerSidebar.append(sidebarCurve);

  const headerFooterBrand = document.createElement('div');
  headerFooterBrand.className = 'header-footer-brand w-100 bg-boing-neutral-gray-600';
  headerFooterBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand-primary';
  footerBrandPrimary.style.backgroundColor = '';

  const containerPrimary = document.createElement('div');
  containerPrimary.className = 'container';

  const primaryContent = document.createElement('div');
  primaryContent.className = 'header-footer-brand-primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';

  const itcLink = document.createElement('a');
  itcLink.href = 'https://www.itcportal.com/';
  itcLink.target = '_blank';
  itcLink.className = 'header-footer-brand-logo d-inline-block analytics_cta_click';
  itcLink.setAttribute('data-cta-region', 'Footer');
  itcLink.setAttribute('aria-label', 'ITC Logo');
  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  if (footerLogo1 && footerLogo1.querySelector('img')) {
    const img = footerLogo1.querySelector('img');
    const optimizedPicture = createOptimizedPicture(img.src, img.alt);
    optimizedPicture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
    itcLink.append(optimizedPicture);
    moveInstrumentation(footerLogo1, optimizedPicture);
  } else if (footerLogo1 && footerLogo1.querySelector('a')) {
    const img = document.createElement('img');
    img.src = footerLogo1.querySelector('a').href;
    img.alt = 'ITC Logo';
    img.className = 'object-fit-contain w-100 h-100 no-rendition';
    const optimizedPicture = createOptimizedPicture(img.src, img.alt);
    optimizedPicture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
    itcLink.append(optimizedPicture);
    moveInstrumentation(footerLogo1, optimizedPicture);
  }
  footerBrandLeft.append(itcLink);

  const fssiLogoDiv = document.createElement('div');
  fssiLogoDiv.className = 'header-footer-brand-secondary--logo d-inline-block';
  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  if (footerLogo2 && footerLogo2.querySelector('img')) {
    const img = footerLogo2.querySelector('img');
    const optimizedPicture = createOptimizedPicture(img.src, img.alt);
    optimizedPicture.querySelector('img').className = 'object-fit-contain w-100 no-rendition';
    fssiLogoDiv.append(optimizedPicture);
    moveInstrumentation(footerLogo2, optimizedPicture);
  } else if (footerLogo2 && footerLogo2.querySelector('a')) {
    const img = document.createElement('img');
    img.src = footerLogo2.querySelector('a').href;
    img.alt = 'FSSI Logo';
    img.className = 'object-fit-contain w-100 no-rendition';
    const optimizedPicture = createOptimizedPicture(img.src, img.alt);
    optimizedPicture.querySelector('img').className = 'object-fit-contain w-100 no-rendition';
    fssiLogoDiv.append(optimizedPicture);
    moveInstrumentation(footerLogo2, optimizedPicture);
  }
  footerBrandLeft.append(fssiLogoDiv);
  primaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand-right';
  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand-navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand-navbar--left d-flex flex-column flex-md-row ';

  const footerListItems = block.querySelectorAll('[data-aue-model="footerListItem"]');
  const listWrappers = [document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div')];
  listWrappers.forEach((wrapper) => wrapper.className = 'header-footer-list-wrapper');
  const footerLists = [document.createElement('ul'), document.createElement('ul'), document.createElement('ul'), document.createElement('ul')];
  footerLists.forEach((list) => list.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column');

  footerListItems.forEach((itemNode, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-list-item';

    const linkElement = document.createElement('a');
    linkElement.className = 'header-cta-analytics analytics_cta_click header-footer-list-item--link d-inline-block';
    linkElement.setAttribute('data-link-region', 'Footer List');

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    if (link) {
      linkElement.href = link.textContent;
      moveInstrumentation(link, linkElement);
    } else {
      linkElement.href = '#';
    }

    const text = itemNode.querySelector('[data-aue-prop="text"]');
    if (text) {
      linkElement.textContent = text.textContent;
      moveInstrumentation(text, linkElement);
    }

    listItem.append(linkElement);
    const listIndex = Math.floor(index / 3); // Distribute items into 4 lists
    if (footerLists[listIndex]) {
      footerLists[listIndex].append(listItem);
    }
    moveInstrumentation(itemNode, listItem);
  });

  listWrappers[0].append(footerLists[0]);
  listWrappers[1].append(footerLists[1]);
  footerNavbarLeft.append(listWrappers[0], listWrappers[1]);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand-navbar--right d-flex flex-column flex-md-row';
  listWrappers[2].append(footerLists[2]);
  listWrappers[3].append(footerLists[3]);
  footerNavbarRight.append(listWrappers[2], listWrappers[3]);

  footerNavbar.append(footerNavbarLeft, footerNavbarRight);
  footerBrandRight.append(footerNavbar);
  primaryContent.append(footerBrandRight);
  containerPrimary.append(primaryContent);
  footerBrandPrimary.append(containerPrimary);
  headerFooterBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand-secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const containerSecondary = document.createElement('div');
  containerSecondary.className = 'container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'header-footer-brand-secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand-right d-flex flex-column pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social-media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand-right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-brand-right--item d-flex justify-content-center align-items-center';

    const linkElement = document.createElement('a');
    linkElement.className = 'header-footer-brand-right--link d-flex justify-content-center align-items-center analytics_cta_click';
    linkElement.setAttribute('data-cta-region', 'Footer');
    linkElement.target = '_blank';
    linkElement.setAttribute('data-social-linktype', 'follow');

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    if (link) {
      linkElement.href = link.textContent;
      linkElement.setAttribute('alt', link.textContent);
      // Determine platform name from URL for aria-label and data-platform-name
      if (link.textContent.includes('facebook')) {
        linkElement.setAttribute('aria-label', 'facebook');
        linkElement.setAttribute('data-platform-name', 'facebook');
      } else if (link.textContent.includes('instagram')) {
        linkElement.setAttribute('aria-label', 'instagram');
        linkElement.setAttribute('data-platform-name', 'instagram');
      } else if (link.textContent.includes('youtube')) {
        linkElement.setAttribute('aria-label', 'youtube');
        linkElement.setAttribute('data-platform-name', 'youtube');
      }
      moveInstrumentation(link, linkElement);
    } else {
      linkElement.href = '#';
    }

    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    if (icon && icon.querySelector('img')) {
      const img = icon.querySelector('img');
      const optimizedPicture = createOptimizedPicture(img.src, img.alt);
      optimizedPicture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      linkElement.append(optimizedPicture);
      moveInstrumentation(icon, optimizedPicture);
    } else if (icon && icon.querySelector('a')) {
      const img = document.createElement('img');
      img.src = icon.querySelector('a').href;
      img.alt = 'Social Icon';
      img.className = 'object-fit-contain w-100 h-100 no-rendition';
      const optimizedPicture = createOptimizedPicture(img.src, img.alt);
      optimizedPicture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      linkElement.append(optimizedPicture);
      moveInstrumentation(icon, optimizedPicture);
    }

    listItem.append(linkElement);
    socialList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  socialMediaSection.append(socialList);
  secondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-footer-brand-left py-5 d-flex flex-column gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'header-footer-brand-left--list d-flex align-items-center justify-content-center flex-wrap';
  const copyrightListItem = document.createElement('li');
  copyrightListItem.className = 'header-footer-brand-left--item header-foot_link';
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-footer-brand-left--link analytics_cta_click';
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  copyrightListItem.append(itcPortalLink);
  copyrightList.append(copyrightListItem);
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand-left--copyright text-center ';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand-left--text text-white';
  const copyright = block.querySelector('[data-aue-prop="copyright"]');
  if (copyright) {
    copyrightSpan.textContent = copyright.textContent;
    moveInstrumentation(copyright, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  }
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);
  secondaryContent.append(copyrightSection);
  containerSecondary.append(secondaryContent);
  footerBrandSecondary.append(containerSecondary);
  headerFooterBrand.append(footerBrandSecondary);

  headerSidebar.append(headerFooterBrand);
  headerSubmenuContainer.append(headerSidebar);

  const headerOverlay = document.createElement('div');
  headerOverlay.className = 'header-overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  headerSubmenuContainer.append(headerOverlay);
  headerContainer.append(headerSubmenuContainer);

  block.textContent = '';
  block.append(headerContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
