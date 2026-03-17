import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  const headerLogoImage = block.querySelector('[data-aue-prop="headerLogoImage"]');
  const headerLogoLink = block.querySelector('[data-aue-prop="headerLogoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  const footerLogoImage1 = block.querySelector('[data-aue-prop="footerLogoImage1"]');
  const footerLogoImage2 = block.querySelector('[data-aue-prop="footerLogoImage2"]');
  const footerLinkItems = block.querySelectorAll('[data-aue-model="footerLinkItem"]');
  const socialLinkItems = block.querySelectorAll('[data-aue-model="socialLinkItem"]');
  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');

  const headerSection = document.createElement('section');
  headerSection.className = 'header-section position-relative mb-15';

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'header-section-app-name d-none';
    appNameSpan.textContent = appName.textContent;
    moveInstrumentation(appName, appNameSpan);
    headerSection.append(appNameSpan);
  }

  const header = document.createElement('header');
  header.className = 'header-section-boing-container boing-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-section-d-flex d-flex w-25';
  if (logoImage) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoImage.src;
    logoAnchor.textContent = logoImage.src;
    moveInstrumentation(logoImage, logoAnchor);
    headerLeftDiv.append(logoAnchor);
  }
  header.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-section-d-flex d-flex justify-content-center w-25';
  if (headerLogoLink) {
    const headerLogoAnchor = document.createElement('a');
    headerLogoAnchor.href = headerLogoLink.href;
    headerLogoAnchor.className = 'header-section-analytics_cta_click analytics_cta_click';
    headerLogoAnchor.setAttribute('data-ct', '');
    headerLogoAnchor.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(headerLogoLink, headerLogoAnchor);

    const headerLogoDiv = document.createElement('div');
    headerLogoDiv.className = 'header__logo d-flex align-items-center';

    if (headerLogoImage) {
      const picture = createOptimizedPicture(headerLogoImage.src, headerLogoImage.alt);
      picture.querySelector('img').className = 'header__logo-img';
      picture.querySelector('img').setAttribute('fetchpriority', 'high');
      picture.querySelector('img').setAttribute('loading', 'eager');
      moveInstrumentation(headerLogoImage, picture);
      headerLogoDiv.append(picture);
    }
    headerLogoAnchor.append(headerLogoDiv);
    headerCenterDiv.append(headerLogoAnchor);
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

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-section-sidebar__menu sidebar__menu list-unstyled px-4';

  sidebarMenuItems.forEach((itemNode) => {
    const menuItem = document.createElement('li');
    menuItem.className = 'header-section-sidebar__menu-item sidebar__menu-item py-6 border-bottom border-boing-neutral-gray-200';
    if (itemNode.classList.contains('sidebar__menu-item--logout')) {
      menuItem.classList.add('sidebar__menu-item--logout');
      menuItem.style.display = 'none';
    }

    const menuLink = itemNode.querySelector('[data-aue-prop="menuLink"]');
    const menuIcon = itemNode.querySelector('[data-aue-prop="menuIcon"]');
    const menuText = itemNode.querySelector('[data-aue-prop="menuText"]');

    if (menuLink) {
      const anchor = document.createElement('a');
      anchor.href = menuLink.href;
      anchor.className = 'header-section-sidebar__menu-link sidebar__menu-link d-flex align-items-center text-decoration-none px-6 fw-medium analytics_cta_click';
      if (itemNode.classList.contains('sidebar__menu-item--logout')) {
        anchor.classList.add('sidebar__menu-item--logout-btn');
      }
      anchor.setAttribute('data-consent', menuLink.getAttribute('data-consent'));
      anchor.setAttribute('data-link', menuLink.getAttribute('data-link'));
      moveInstrumentation(menuLink, anchor);

      if (menuIcon) {
        const iconImg = createOptimizedPicture(menuIcon.src, menuIcon.alt);
        iconImg.querySelector('img').className = 'header-section-sidebar__menu-icon sidebar__menu-icon me-4';
        iconImg.querySelector('img').setAttribute('loading', 'lazy');
        moveInstrumentation(menuIcon, iconImg);
        anchor.append(iconImg);
      }

      if (menuText) {
        anchor.append(menuText.textContent.trim());
        moveInstrumentation(menuText, anchor);
      }
      menuItem.append(anchor);
    }
    sidebarMenu.append(menuItem);
    moveInstrumentation(itemNode, menuItem);
  });
  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-section-sidebar__curve sidebar__curve';
  sidebar.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-section-footer-brand footer-brand w-100 bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-section-footer-brand__primary footer-brand__primary';
  footerBrandPrimary.style.backgroundColor = '';

  const footerBrandContainer = document.createElement('div');
  footerBrandContainer.className = 'header-section-container container';

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'header-section-footer-brand__primary--content footer-brand__primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-section-footer-brand__left footer-brand__left d-flex gap-16 px-10 align-items-center justify-content-center';

  if (footerLogoImage1) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.href = 'https://www.itcportal.com/';
    logo1Anchor.target = '_blank';
    logo1Anchor.className = 'header-section-footer-brand__logo footer-brand__logo d-inline-block analytics_cta_click';
    logo1Anchor.setAttribute('data-cta-region', 'Footer');
    logo1Anchor.setAttribute('aria-label', 'ITC Logo');

    const logo1Picture = createOptimizedPicture(footerLogoImage1.src, footerLogoImage1.alt);
    logo1Picture.querySelector('img').className = 'header-section-object-fit-contain object-fit-contain w-100 h-100 no-rendition';
    logo1Picture.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(footerLogoImage1, logo1Picture);
    logo1Anchor.append(logo1Picture);
    footerBrandLeft.append(logo1Anchor);
  }

  if (footerLogoImage2) {
    const logo2Div = document.createElement('div');
    logo2Div.className = 'header-section-footer-brand__secondary--logo footer-brand__secondary--logo d-inline-block';

    const logo2Picture = createOptimizedPicture(footerLogoImage2.src, footerLogoImage2.alt);
    logo2Picture.querySelector('img').className = 'header-section-object-fit-contain object-fit-contain w-100 no-rendition';
    logo2Picture.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(footerLogoImage2, logo2Picture);
    logo2Div.append(logo2Picture);
    footerBrandLeft.append(logo2Div);
  }
  footerBrandPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-section-footer-brand__right footer-brand__right';

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.className = 'header-section-footer-brand__navbar footer-brand__navbar d-grid d-md-flex';
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.className = 'header-section-footer-brand__navbar--left footer-brand__navbar--left d-flex flex-column flex-md-row';

  const footerLinkLists = new Map();
  footerLinkItems.forEach((itemNode, index) => {
    const footerLink = itemNode.querySelector('[data-aue-prop="footerLink"]');
    const footerText = itemNode.querySelector('[data-aue-prop="footerText"]');

    if (footerLink && footerText) {
      const linkHref = footerLink.href;
      let listIndex = 0;
      if (index >= 0 && index <= 2) {
        listIndex = 0;
      } else if (index >= 3 && index <= 5) {
        listIndex = 1;
      } else if (index >= 6 && index <= 8) {
        listIndex = 2;
      } else if (index >= 9 && index <= 11) {
        listIndex = 3;
      }
      
      if (!footerLinkLists.has(listIndex)) {
        footerLinkLists.set(listIndex, []);
      }
      footerLinkLists.get(listIndex).push({ link: footerLink, text: footerText, node: itemNode });
    }
  });

  footerLinkLists.forEach((links, listIndex) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-section-footerList footerList';

    const ul = document.createElement('ul');
    ul.className = 'header-section-footer-list footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

    links.forEach(({ link, text, node }) => {
      const li = document.createElement('li');
      li.className = 'header-section-footer-list__item footer-list__item';

      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-section-cta-analytics cta-analytics analytics_cta_click footer-list__item--link d-inline-block';
      anchor.setAttribute('data-link-region', 'Footer List');
      anchor.textContent = text.textContent.trim();
      if (link.target) {
        anchor.target = link.target;
      }
      moveInstrumentation(link, anchor);
      moveInstrumentation(text, anchor);
      li.append(anchor);
      ul.append(li);
      moveInstrumentation(node, li);
    });

    footerListDiv.append(ul);
    if (listIndex === 0 || listIndex === 1) {
      footerBrandNavbarLeft.append(footerListDiv);
    } else {
      // Create footerBrandNavbarRight if it doesn't exist yet
      let footerBrandNavbarRight = footerBrandNavbar.querySelector('.header-section-footer-brand__navbar--right');
      if (!footerBrandNavbarRight) {
        footerBrandNavbarRight = document.createElement('div');
        footerBrandNavbarRight.className = 'header-section-footer-brand__navbar--right footer-brand__navbar--right d-flex flex-column flex-md-row';
        footerBrandNavbar.append(footerBrandNavbarRight);
      }
      footerBrandNavbarRight.append(footerListDiv);
    }
  });
  footerBrandNavbar.append(footerBrandNavbarLeft);
  footerBrandRight.append(footerBrandNavbar);
  footerBrandPrimaryContent.append(footerBrandRight);
  footerBrandContainer.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-section-footer-brand__secondary footer-brand__secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const footerBrandSecondaryContainer = document.createElement('div');
  footerBrandSecondaryContainer.className = 'header-section-container container';

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'header-section-footer-brand__secondary--content footer-brand__secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-section-footer-brand__right footer-brand__right d-flex flex-column pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-section-social_media--title social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-section-footer-brand__right--list footer-brand__right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  socialLinkItems.forEach((itemNode) => {
    const socialLink = itemNode.querySelector('[data-aue-prop="socialLink"]');
    const socialIcon = itemNode.querySelector('[data-aue-prop="socialIcon"]');

    if (socialLink && socialIcon) {
      const li = document.createElement('li');
      li.className = 'header-section-footer-brand__right--item footer-brand__right--item d-flex justify-content-center align-items-center';

      const anchor = document.createElement('a');
      anchor.href = socialLink.href;
      anchor.target = '_blank';
      anchor.className = 'header-section-footer-brand__right--link footer-brand__right--link d-flex justify-content-center align-items-center analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${socialIcon.alt.toLowerCase()}`);
      anchor.setAttribute('data-platform-name', socialIcon.alt.toLowerCase());
      anchor.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(socialLink, anchor);

      const iconPicture = createOptimizedPicture(socialIcon.src, socialIcon.alt);
      iconPicture.querySelector('img').className = 'header-section-object-fit-contain object-fit-contain w-100 h-100 no-rendition';
      iconPicture.querySelector('img').setAttribute('aria-label', socialIcon.alt);
      iconPicture.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(socialIcon, iconPicture);
      anchor.append(iconPicture);
      li.append(anchor);
      socialMediaList.append(li);
      moveInstrumentation(itemNode, li);
    }
  });
  socialMediaSection.append(socialMediaList);
  footerBrandSecondaryContent.append(socialMediaSection);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.className = 'header-section-footer-brand__left footer-brand__left py-5 d-flex flex-column gap-3';

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.className = 'header-section-footer-brand__left--list footer-brand__left--list d-flex align-items-center justify-content-center flex-wrap';

  if (itcPortalLink) {
    const li = document.createElement('li');
    li.className = 'header-section-footer-brand__left--item footer-brand__left--item foot_link';

    const anchor = document.createElement('a');
    anchor.href = itcPortalLink.href;
    anchor.target = '_blank';
    anchor.className = 'header-section-footer-brand__left--link footer-brand__left--link analytics_cta_click';
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.textContent = itcPortalLink.textContent.trim();
    moveInstrumentation(itcPortalLink, anchor);
    li.append(anchor);
    footerBrandLeftList.append(li);
  }
  footerBrandLeftSecondary.append(footerBrandLeftList);

  if (copyrightText) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'header-section-footer-brand__left--copyright footer-brand__left--copyright text-center';

    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'header-section-footer-brand__left--text footer-brand__left--text text-white';
    copyrightSpan.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, copyrightSpan);
    copyrightDiv.append(copyrightSpan);
    footerBrandLeftSecondary.append(copyrightDiv);
  }
  footerBrandSecondaryContent.append(footerBrandLeftSecondary);
  footerBrandSecondaryContainer.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerBrandSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.className = 'header-section-overlay overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  submenuContainer.append(overlay);

  headerSection.append(submenuContainer);

  block.textContent = '';
  block.append(headerSection);
  block.className = `header-section block`;
  block.dataset.blockStatus = 'loaded';
}
