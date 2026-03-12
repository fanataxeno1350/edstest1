import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-app-name]').textContent;

  const headerContainer = document.createElement('header');
  headerContainer.className = `header-${appName}-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white`;

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  // Assuming the content here is for a hamburger icon or similar, not directly mapped in JSON
  // For now, it remains empty as per the provided authored HTML structure

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-d-flex header-justify-content-center header-w-25';

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]') || document.createElement('a');
  logoLink.className = 'header-analytics_cta_click';
  logoLink.setAttribute('data-ct', '');
  logoLink.setAttribute('aria-label', `header-logo-${appName}`);
  if (!logoLink.parentElement) {
    logoLink.href = block.querySelector('.header-header__logo a')?.href || '/';
  }

  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';

  const logoImg = block.querySelector('[data-aue-prop="logo"]') || block.querySelector('.header-header__logo-img');
  if (logoImg) {
    const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
    picture.querySelector('img').className = 'header-header__logo-img';
    logoDiv.append(picture);
    moveInstrumentation(logoImg, logoDiv);
  }
  logoLink.append(logoDiv);
  moveInstrumentation(block.querySelector('.header-d-flex.header-justify-content-center.header-w-25 a'), logoLink);
  headerCenterDiv.append(logoLink);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';

  const loginLink = block.querySelector('.header-header__login-btn-wrapper') || document.createElement('a');
  if (!loginLink.parentElement) {
    loginLink.href = '/login.html'; // Default if not found
    loginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
    loginLink.style.display = 'inline';
    const loginButton = document.createElement('button');
    loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = 'Login';
    loginLink.append(loginButton);
  } else {
    // Ensure the button is moved if it exists within the authored loginLink
    const authoredButton = loginLink.querySelector('button');
    if (authoredButton) {
      moveInstrumentation(authoredButton, loginLink);
    }
  }
  headerRightDiv.append(loginLink);
  moveInstrumentation(block.querySelector('.header-d-flex.header-w-25.header-justify-content-end a'), loginLink);

  headerContainer.append(headerLeftDiv, headerCenterDiv, headerRightDiv);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

    const link = itemNode.querySelector('[data-aue-prop="link"]') || itemNode.querySelector('a');
    if (link) {
      link.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      link.setAttribute('data-consent', 'false'); // Default, adjust if needed
      link.setAttribute('data-link', link.href); // Assuming href is the data-link

      const icon = itemNode.querySelector('[data-aue-prop="icon"]') || itemNode.querySelector('img');
      if (icon) {
        const picture = createOptimizedPicture(icon.src, icon.alt);
        picture.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
        link.prepend(picture);
        moveInstrumentation(icon, link);
      }

      const label = itemNode.querySelector('[data-aue-prop="label"]') || itemNode.textContent.trim();
      if (typeof label === 'string') {
        link.append(label);
      } else if (label instanceof HTMLElement) {
        link.append(label.textContent);
        moveInstrumentation(label, link);
      }
      listItem.append(link);
      moveInstrumentation(link, listItem);
    }
    sidebarMenu.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  const logoutItem = block.querySelector('.header-sidebar__menu-item--logout');
  if (logoutItem) {
    sidebarMenu.append(logoutItem);
    moveInstrumentation(logoutItem, sidebarMenu);
  }

  sidebar.append(sidebarMenu);

  const sidebarCurve = block.querySelector('.header-sidebar__curve');
  if (sidebarCurve) {
    sidebar.append(sidebarCurve);
    moveInstrumentation(sidebarCurve, sidebar);
  }

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand__primary';
  footerBrandPrimary.style.backgroundColor = '';

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const itcLogoLink = block.querySelector('[data-aue-prop="itcLogo"]') ? block.querySelector('[data-aue-prop="itcLogo"]').closest('a') : document.createElement('a');
  if (!itcLogoLink.parentElement) {
    itcLogoLink.href = 'https://www.itcportal.com/';
    itcLogoLink.target = '_blank';
    itcLogoLink.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    itcLogoLink.setAttribute('data-cta-region', 'Footer');
    itcLogoLink.setAttribute('aria-label', 'ITC Logo');
    const itcImg = block.querySelector('[data-aue-prop="itcLogo"]') || block.querySelector('.header-footer-brand__logo img');
    if (itcImg) {
      const picture = createOptimizedPicture(itcImg.src, itcImg.alt);
      picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      itcLogoLink.append(picture);
      moveInstrumentation(itcImg, itcLogoLink);
    }
  }
  footerBrandLeft.append(itcLogoLink);

  const fssiLogoDiv = document.createElement('div');
  fssiLogoDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
  const fssiImg = block.querySelector('[data-aue-prop="fssiLogo"]') || block.querySelector('.header-footer-brand__secondary--logo img');
  if (fssiImg) {
    const picture = createOptimizedPicture(fssiImg.src, fssiImg.alt);
    picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
    fssiLogoDiv.append(picture);
    moveInstrumentation(fssiImg, fssiLogoDiv);
  }
  footerBrandLeft.append(fssiLogoDiv);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';

  const footerLists = block.querySelectorAll('.header-footerList');
  footerLists.forEach((listNode, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

    const footerLinks = listNode.querySelectorAll('[data-aue-model="footerLink"]');
    footerLinks.forEach((linkNode) => {
      const listItem = document.createElement('li');
      listItem.className = 'header-footer-list__item';

      const link = linkNode.querySelector('[data-aue-prop="link"]') || linkNode.querySelector('a');
      if (link) {
        link.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        link.setAttribute('data-link-region', 'Footer List');
        const label = linkNode.querySelector('[data-aue-prop="label"]') || link.textContent;
        if (typeof label === 'string') {
          link.textContent = label;
        } else if (label instanceof HTMLElement) {
          link.textContent = label.textContent;
          moveInstrumentation(label, link);
        }
        listItem.append(link);
        moveInstrumentation(link, listItem);
      }
      ul.append(listItem);
      moveInstrumentation(linkNode, listItem);
    });
    footerListDiv.append(ul);
    moveInstrumentation(listNode, footerListDiv);
    if (index < 2) { // Assuming first two lists go to left, next two to right
      footerNavbarLeft.append(footerListDiv);
    } else {
      // This implies there's a footerNavbarRight, which we'll create next
    }
  });

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  // Re-iterate or move the remaining footerLists into footerNavbarRight
  footerLists.forEach((listNode, index) => {
    if (index >= 2) {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'header-footerList';
      const ul = document.createElement('ul');
      ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

      const footerLinks = listNode.querySelectorAll('[data-aue-model="footerLink"]');
      footerLinks.forEach((linkNode) => {
        const listItem = document.createElement('li');
        listItem.className = 'header-footer-list__item';

        const link = linkNode.querySelector('[data-aue-prop="link"]') || linkNode.querySelector('a');
        if (link) {
          link.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
          link.setAttribute('data-link-region', 'Footer List');
          const label = linkNode.querySelector('[data-aue-prop="label"]') || link.textContent;
          if (typeof label === 'string') {
            link.textContent = label;
          } else if (label instanceof HTMLElement) {
            link.textContent = label.textContent;
            moveInstrumentation(label, link);
          }
          listItem.append(link);
          moveInstrumentation(link, listItem);
        }
        ul.append(listItem);
        moveInstrumentation(linkNode, listItem);
      });
      footerListDiv.append(ul);
      moveInstrumentation(listNode, footerListDiv);
      footerNavbarRight.append(footerListDiv);
    }
  });

  footerNavbar.append(footerNavbarLeft, footerNavbarRight);
  footerBrandRight.append(footerNavbar);

  footerPrimaryContent.append(footerBrandLeft, footerBrandRight);
  footerContainer.append(footerPrimaryContent);
  footerBrandPrimary.append(footerContainer);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand__secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'header-container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  socialLinks.forEach((socialNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const link = socialNode.querySelector('[data-aue-prop="link"]') || socialNode.querySelector('a');
    if (link) {
      link.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      link.setAttribute('data-cta-region', 'Footer');
      link.target = '_blank';
      link.setAttribute('data-platform-name', link.href.includes('facebook') ? 'facebook' : link.href.includes('instagram') ? 'instagram' : 'youtube');
      link.setAttribute('data-social-linktype', 'follow');
      link.setAttribute('data-cta-label', `footer-${link.getAttribute('data-platform-name')}`);

      const icon = socialNode.querySelector('[data-aue-prop="icon"]') || socialNode.querySelector('img');
      if (icon) {
        const picture = createOptimizedPicture(icon.src, icon.alt);
        picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
        picture.querySelector('img').setAttribute('aria-label', link.getAttribute('data-platform-name'));
        link.append(picture);
        moveInstrumentation(icon, link);
      }
      listItem.append(link);
      moveInstrumentation(link, listItem);
    }
    socialList.append(listItem);
    moveInstrumentation(socialNode, listItem);
  });
  socialMediaSection.append(socialList);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  const itcPortalLink = block.querySelector('.header-foot_link a');
  if (itcPortalLink) {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-brand__left--item header-foot_link';
    itcPortalLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
    itcPortalLink.setAttribute('data-cta-region', 'Footer');
    listItem.append(itcPortalLink);
    moveInstrumentation(itcPortalLink.parentElement, listItem);
    copyrightList.append(listItem);
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);

  copyrightSection.append(copyrightList, copyrightDiv);

  secondaryContent.append(socialMediaSection, copyrightSection);
  secondaryContainer.append(secondaryContent);
  footerBrandSecondary.append(secondaryContainer);

  footerBrand.append(footerBrandPrimary, footerBrandSecondary);
  sidebar.append(footerBrand);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';

  submenuContainer.append(sidebar, overlay);

  block.textContent = '';
  block.className = `header-position-relative header-mb-15 ${block.dataset.blockName} block`;
  block.append(headerContainer, submenuContainer);
  block.dataset.blockStatus = 'loaded';
}