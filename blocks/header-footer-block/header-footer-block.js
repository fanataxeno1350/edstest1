import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainSection = document.createElement('section');
  mainSection.className = 'position-relative mb-15';

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'd-none header-app-name';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  moveInstrumentation(block.querySelector('.header-app-name'), appNameSpan);
  mainSection.append(appNameSpan);

  const header = document.createElement('header');
  header.className = 'boing-container header-header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'd-flex w-25';
  header.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'd-flex justify-content-center w-25';
  const headerLogoLink = document.createElement('a');
  headerLogoLink.className = 'analytics_cta_click header-analytics_cta_click';
  headerLogoLink.setAttribute('a-label', 'header-logo-boing');
  const headerLogoLinkAuthored = block.querySelector('[data-aue-prop="headerLogoLink"]');
  if (headerLogoLinkAuthored) {
    headerLogoLink.href = headerLogoLinkAuthored.href;
    moveInstrumentation(headerLogoLinkAuthored, headerLogoLink);
  } else {
    headerLogoLink.href = '/';
  }

  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.className = 'header__logo d-flex align-items-center';
  const headerLogoImg = block.querySelector('[data-aue-prop="headerLogo"]');
  if (headerLogoImg) {
    headerLogoDiv.append(createOptimizedPicture(headerLogoImg.src, headerLogoImg.alt, true, [{ width: '200' }]));
    moveInstrumentation(headerLogoImg, headerLogoDiv);
  }
  headerLogoLink.append(headerLogoDiv);
  headerCenterDiv.append(headerLogoLink);
  header.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'd-flex w-25 justify-content-end';
  const loginLink = document.createElement('a');
  loginLink.className = 'header__login-btn-wrapper analytics_cta_click header-analytics_cta_click';
  loginLink.style.display = 'inline';
  const loginLinkAuthored = block.querySelector('[data-aue-prop="loginLink"]');
  if (loginLinkAuthored) {
    loginLink.href = loginLinkAuthored.href;
    moveInstrumentation(loginLinkAuthored, loginLink);
  } else {
    loginLink.href = '/login.html';
  }
  const loginButton = document.createElement('button');
  loginButton.className = 'header__login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
  loginButton.textContent = 'Login';
  loginLink.append(loginButton);
  headerRightDiv.append(loginLink);
  header.append(headerRightDiv);

  mainSection.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-sidebar start-0 bg-white position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar__menu list-unstyled px-4';

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'header-sidebar__menu-item py-6 border-bottom border-boing-neutral-gray-200';
    if (itemNode.querySelector('[data-aue-prop="label"]').textContent.toLowerCase() === 'logout') {
      li.className += ' header-sidebar__menu-item--logout';
      li.style.display = 'none';
    }

    const link = document.createElement('a');
    link.className = 'header-sidebar__menu-link d-flex align-items-center text-decoration-none px-6 fw-medium analytics_cta_click header-analytics_cta_click';
    const linkAuthored = itemNode.querySelector('[data-aue-prop="link"]');
    if (linkAuthored) {
      link.href = linkAuthored.href;
      link.setAttribute('data-link', linkAuthored.getAttribute('data-link') || linkAuthored.href);
      moveInstrumentation(linkAuthored, link);
    }
    link.setAttribute('data-consent', 'false'); // Default value
    if (itemNode.querySelector('[data-aue-prop="label"]').textContent.toLowerCase() === 'play game') {
      link.setAttribute('data-consent', 'true');
    }
    if (itemNode.querySelector('[data-aue-prop="label"]').textContent.toLowerCase() === 'logout') {
      link.className += ' header-sidebar__menu-item--logout-btn';
    }

    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    if (icon) {
      const img = createOptimizedPicture(icon.src, icon.alt, false, [{ width: '40' }]);
      img.querySelector('img').className = 'header-sidebar__menu-icon me-4';
      link.append(img);
      moveInstrumentation(icon, img);
    }

    const label = itemNode.querySelector('[data-aue-prop="label"]');
    if (label) {
      link.append(label.textContent.trim());
      moveInstrumentation(label, link);
    }

    li.append(link);
    sidebarMenu.append(li);
    moveInstrumentation(itemNode, li);
  });

  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  sidebar.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand w-100 bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand__primary';
  footerBrandPrimary.style.backgroundColor = '';

  const containerDiv = document.createElement('div');
  containerDiv.className = 'container';

  const primaryContentDiv = document.createElement('div');
  primaryContentDiv.className = 'header-footer-brand__primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left d-flex gap-16 px-10 align-items-center justify-content-center';

  const itcLogoLink = document.createElement('a');
  itcLogoLink.className = 'header-footer-brand__logo d-inline-block analytics_cta_click header-analytics_cta_click';
  itcLogoLink.setAttribute('data-cta-region', 'Footer');
  itcLogoLink.setAttribute('aria-label', 'ITC Logo');
  itcLogoLink.target = '_blank';
  const itcPortalLinkAuthored = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLinkAuthored) {
    itcLogoLink.href = itcPortalLinkAuthored.href;
    moveInstrumentation(itcPortalLinkAuthored, itcLogoLink);
  } else {
    itcLogoLink.href = 'https://www.itcportal.com/';
  }

  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  if (footerLogo1) {
    const img1 = createOptimizedPicture(footerLogo1.src, footerLogo1.alt);
    img1.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
    itcLogoLink.append(img1);
    moveInstrumentation(footerLogo1, img1);
  }
  footerBrandLeft.append(itcLogoLink);

  const secondaryLogoDiv = document.createElement('div');
  secondaryLogoDiv.className = 'header-footer-brand__secondary--logo d-inline-block';
  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  if (footerLogo2) {
    const img2 = createOptimizedPicture(footerLogo2.src, footerLogo2.alt);
    img2.querySelector('img').className = 'object-fit-contain w-100 no-rendition';
    secondaryLogoDiv.append(img2);
    moveInstrumentation(footerLogo2, img2);
  }
  footerBrandLeft.append(secondaryLogoDiv);
  primaryContentDiv.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const navbarLeft = document.createElement('div');
  navbarLeft.className = 'header-footer-brand__navbar--left d-flex flex-column flex-md-row';

  const footerLists = block.querySelectorAll('[data-aue-model="footerListItem"]');
  const numLists = Math.ceil(footerLists.length / 3); // Distribute items into 4 lists for example, adjust as needed

  for (let i = 0; i < 4; i += 1) {
    const footerListWrapper = document.createElement('div');
    footerListWrapper.className = 'header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

    const startIndex = i * numLists;
    const endIndex = Math.min(startIndex + numLists, footerLists.length);

    for (let j = startIndex; j < endIndex; j += 1) {
      const itemNode = footerLists[j];
      const li = document.createElement('li');
      li.className = 'header-footer-list__item';

      const link = document.createElement('a');
      link.className = 'cta-analytics analytics_cta_click header-footer-list__item--link d-inline-block';
      link.setAttribute('data-link-region', 'Footer List');
      const linkAuthored = itemNode.querySelector('[data-aue-prop="link"]');
      if (linkAuthored) {
        link.href = linkAuthored.href;
        if (linkAuthored.target) {
          link.target = linkAuthored.target;
        }
        moveInstrumentation(linkAuthored, link);
      }

      const label = itemNode.querySelector('[data-aue-prop="label"]');
      if (label) {
        link.textContent = label.textContent;
        moveInstrumentation(label, link);
      }

      li.append(link);
      ul.append(li);
      moveInstrumentation(itemNode, li);
    }

    footerListWrapper.append(ul);
    if (i < 2) {
      navbarLeft.append(footerListWrapper);
    } else {
      // Create navbarRight if it doesn't exist yet
      let navbarRight = footerNavbar.querySelector('.header-footer-brand__navbar--right');
      if (!navbarRight) {
        navbarRight = document.createElement('div');
        navbarRight.className = 'header-footer-brand__navbar--right d-flex flex-column flex-md-row';
        footerNavbar.append(navbarRight);
      }
      navbarRight.append(footerListWrapper);
    }
  }

  footerNavbar.prepend(navbarLeft);
  footerBrandRight.append(footerNavbar);
  primaryContentDiv.append(footerBrandRight);
  containerDiv.append(primaryContentDiv);
  footerBrandPrimary.append(containerDiv);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand__secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const secondaryContainerDiv = document.createElement('div');
  secondaryContainerDiv.className = 'container';

  const secondaryContentDiv = document.createElement('div');
  secondaryContentDiv.className = 'header-footer-brand__secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right d-flex flex-column pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-footer-brand__right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLinkItem"]');
  socialLinks.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__right--item d-flex justify-content-center align-items-center';

    const link = document.createElement('a');
    link.className = 'header-footer-brand__right--link d-flex justify-content-center align-items-center analytics_cta_click header-analytics_cta_click';
    link.setAttribute('data-cta-region', 'Footer');
    link.target = '_blank';
    link.setAttribute('data-social-linktype', 'follow');

    const linkAuthored = itemNode.querySelector('[data-aue-prop="link"]');
    if (linkAuthored) {
      link.href = linkAuthored.href;
      link.setAttribute('data-platform-name', linkAuthored.href.includes('facebook') ? 'facebook' : (linkAuthored.href.includes('instagram') ? 'instagram' : 'youtube'));
      link.setAttribute('data-cta-label', `footer-${link.getAttribute('data-platform-name')}`);
      moveInstrumentation(linkAuthored, link);
    }

    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    if (icon) {
      const img = createOptimizedPicture(icon.src, icon.alt);
      img.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      img.querySelector('img').setAttribute('aria-label', link.getAttribute('data-platform-name'));
      link.append(img);
      moveInstrumentation(icon, img);
    }

    li.append(link);
    socialMediaList.append(li);
    moveInstrumentation(itemNode, li);
  });

  socialMediaSection.append(socialMediaList);
  secondaryContentDiv.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-footer-brand__left py-5 d-flex flex-column gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'header-footer-brand__left--list d-flex align-items-center justify-content-center flex-wrap';

  const itcPortalLinkItem = document.createElement('li');
  itcPortalLinkItem.className = 'header-footer-brand__left--item header-foot_link';
  const itcPortalLinkAnchor = document.createElement('a');
  itcPortalLinkAnchor.className = 'header-footer-brand__left--link analytics_cta_click header-analytics_cta_click';
  itcPortalLinkAnchor.setAttribute('data-cta-region', 'Footer');
  itcPortalLinkAnchor.target = '_blank';
  const itcPortalLinkText = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLinkText) {
    itcPortalLinkAnchor.href = itcPortalLinkText.href;
    itcPortalLinkAnchor.textContent = 'ITC portal';
    moveInstrumentation(itcPortalLinkText, itcPortalLinkAnchor);
  } else {
    itcPortalLinkAnchor.href = 'https://www.itcportal.com/';
    itcPortalLinkAnchor.textContent = 'ITC portal';
  }
  itcPortalLinkItem.append(itcPortalLinkAnchor);
  copyrightList.append(itcPortalLinkItem);
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text text-white';
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent;
    moveInstrumentation(copyrightText, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  }
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);
  secondaryContentDiv.append(copyrightSection);

  secondaryContainerDiv.append(secondaryContentDiv);
  footerBrandSecondary.append(secondaryContainerDiv);
  footerBrand.append(footerBrandSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  submenuContainer.append(overlay);

  mainSection.append(submenuContainer);

  block.textContent = '';
  block.append(mainSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
