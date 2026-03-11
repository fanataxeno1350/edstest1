import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const menuItems = block.querySelectorAll('[data-aue-model="headerMenuItem"]');
  const footerLogoITC = block.querySelector('[data-aue-prop="footerLogoITC"]');
  const footerLogoFSSI = block.querySelector('[data-aue-prop="footerLogoFSSI"]');
  const footerList1 = block.querySelectorAll('[data-aue-model="footerList1"]');
  const footerList2 = block.querySelectorAll('[data-aue-model="footerList2"]');
  const footerList3 = block.querySelectorAll('[data-aue-model="footerList3"]');
  const footerList4 = block.querySelectorAll('[data-aue-model="footerList4"]');
  const socialLinks = block.querySelectorAll('[data-aue-model="headerSocialLink"]');
  const footerLeftLink = block.querySelector('[data-aue-prop="footerLeftLink"]');
  const copyright = block.querySelector('[data-aue-prop="copyright"]');

  const rootDiv = document.createElement('div');
  rootDiv.classList.add('header-position-relative', 'header-mb-15');

  // App Name
  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.classList.add('header-d-none', 'header-app-name');
    appNameSpan.setAttribute('data-app-name', appName.textContent.trim());
    moveInstrumentation(appName, appNameSpan);
    appNameSpan.textContent = appName.textContent.trim();
    rootDiv.append(appNameSpan);
  }

  // Header section
  const headerSection = document.createElement('header');
  headerSection.classList.add('header-boing-container', 'header-header', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center', 'header-h-15', 'header-px-5', 'header-py-2', 'header-fixed-top', 'header-w-100', 'header-bg-white');

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.classList.add('header-d-flex', 'header-w-25');
  headerSection.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.classList.add('header-d-flex', 'header-justify-content-center', 'header-w-25');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href || '/';
    logoAnchor.classList.add('header-analytics_cta_click');
    logoAnchor.setAttribute('data-ct', '');
    logoAnchor.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(logoLink, logoAnchor);

    const logoDiv = document.createElement('div');
    logoDiv.classList.add('header-header__logo', 'header-d-flex', 'header-align-items-center');
    if (logoImage) {
      const picture = createOptimizedPicture(logoImage.src, logoImage.alt || 'Logo', true, [{
        width: '100px'
      }]);
      picture.querySelector('img').classList.add('header-header__logo-img');
      moveInstrumentation(logoImage, picture);
      logoDiv.append(picture);
    }
    logoAnchor.append(logoDiv);
    headerCenterDiv.append(logoAnchor);
  }
  headerSection.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.classList.add('header-d-flex', 'header-w-25', 'header-justify-content-end');
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href || '/login.html';
    loginAnchor.classList.add('header-header__login-btn-wrapper', 'header-analytics_cta_click');
    loginAnchor.style.display = 'inline';
    moveInstrumentation(loginLink, loginAnchor);

    const loginButton = document.createElement('button');
    loginButton.classList.add('header-header__login-btn', 'header-btn', 'header-text-boing-primary', 'header-bg-transparent', 'header-fw-semibold', 'header-rounded-4', 'header-btn-sm', 'header-py-3', 'header-px-4');
    loginButton.textContent = loginLink.textContent.trim() || 'Login';
    loginAnchor.append(loginButton);
    headerRightDiv.append(loginAnchor);
  }
  headerSection.append(headerRightDiv);
  rootDiv.append(headerSection);

  // Submenu container
  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('header-submenu-container', 'header-position-fixed', 'header-top-0', 'header-start-0', 'header-end-0', 'header-m-auto', 'header-overflow-hidden');

  const aside = document.createElement('aside');
  aside.classList.add('header-sidebar', 'header-start-0', 'header-bg-white', 'header-position-absolute');

  const menuList = document.createElement('ul');
  menuList.classList.add('header-sidebar__menu', 'header-list-unstyled', 'header-px-4');

  menuItems.forEach((itemNode) => {
    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    const label = itemNode.querySelector('[data-aue-prop="label"]');

    const listItem = document.createElement('li');
    listItem.classList.add('header-sidebar__menu-item', 'header-py-6', 'header-border-bottom', 'header-border-boing-neutral-gray-200');

    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href || '#';
      anchor.classList.add('header-sidebar__menu-link', 'header-d-flex', 'header-align-items-center', 'header-text-decoration-none', 'header-px-6', 'header-fw-medium', 'header-analytics_cta_click');
      anchor.setAttribute('data-consent', 'false'); // Default, adjust if needed
      anchor.setAttribute('data-link', link.getAttribute('data-link') || '');
      moveInstrumentation(link, anchor);

      if (icon) {
        const picture = createOptimizedPicture(icon.src, icon.alt || 'Menu Icon', false, [{
          width: '20px'
        }]);
        picture.querySelector('img').classList.add('header-sidebar__menu-icon', 'header-me-4');
        moveInstrumentation(icon, picture);
        anchor.append(picture);
      }
      if (label) {
        moveInstrumentation(label, anchor);
        anchor.append(label.textContent.trim());
      } else if (link.textContent) {
        anchor.append(link.textContent.trim());
      }
      listItem.append(anchor);
    }
    menuList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  aside.append(menuList);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar__curve');
  aside.append(sidebarCurve);

  // Footer Brand
  const footerBrand = document.createElement('div');
  footerBrand.classList.add('header-footer-brand', 'header-w-100', 'header-bg-boing-neutral-gray-600');
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.classList.add('header-footer-brand__primary');
  footerPrimarySection.style.backgroundColor = '';

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('header-container');

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.classList.add('header-footer-brand__primary--content', 'header-d-flex', 'header-flex-column', 'header-flex-md-row', 'header-justify-content-md-between', 'header-align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('header-footer-brand__left', 'header-d-flex', 'header-gap-16', 'header-px-10', 'header-align-items-center', 'header-justify-content-center');

  if (footerLogoITC) {
    const itcAnchor = document.createElement('a');
    itcAnchor.href = footerLogoITC.src || 'https://www.itcportal.com/';
    itcAnchor.target = '_blank';
    itcAnchor.classList.add('header-footer-brand__logo', 'header-d-inline-block', 'header-analytics_cta_click');
    itcAnchor.setAttribute('data-cta-region', 'Footer');
    itcAnchor.setAttribute('aria-label', 'ITC Logo');
    moveInstrumentation(footerLogoITC, itcAnchor);

    const itcPicture = createOptimizedPicture(footerLogoITC.src, footerLogoITC.alt || 'ITC Logo', false, [{
      width: '100px'
    }]);
    itcPicture.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
    itcAnchor.append(itcPicture);
    footerBrandLeft.append(itcAnchor);
  }

  if (footerLogoFSSI) {
    const fssiDiv = document.createElement('div');
    fssiDiv.classList.add('header-footer-brand__secondary--logo', 'header-d-inline-block');
    moveInstrumentation(footerLogoFSSI, fssiDiv);

    const fssiPicture = createOptimizedPicture(footerLogoFSSI.src, footerLogoFSSI.alt || 'FSSI Logo', false, [{
      width: '100px'
    }]);
    fssiPicture.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-no-rendition');
    fssiDiv.append(fssiPicture);
    footerBrandLeft.append(fssiDiv);
  }
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('header-footer-brand__right');

  const footerNav = document.createElement('nav');
  footerNav.classList.add('header-footer-brand__navbar', 'header-d-grid', 'header-d-md-flex');
  footerNav.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('header-footer-brand__navbar--left', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');

  const createFooterList = (items) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('header-footerList');
    const ul = document.createElement('ul');
    ul.classList.add('header-footer-list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-align-items-md-start', 'header-flex-column');

    items.forEach((itemNode) => {
      const link = itemNode.querySelector('[data-aue-prop="link"]');
      const label = itemNode.querySelector('[data-aue-prop="label"]');

      const li = document.createElement('li');
      li.classList.add('header-footer-list__item');
      if (link) {
        const anchor = document.createElement('a');
        anchor.href = link.href || '#';
        anchor.classList.add('header-cta-analytics', 'header-analytics_cta_click', 'header-footer-list__item--link', 'header-d-inline-block');
        anchor.setAttribute('data-link-region', 'Footer List');
        if (link.target) anchor.target = link.target;
        moveInstrumentation(link, anchor);
        if (label) {
          moveInstrumentation(label, anchor);
          anchor.textContent = label.textContent.trim();
        } else {
          anchor.textContent = link.textContent.trim();
        }
        li.append(anchor);
      }
      ul.append(li);
      moveInstrumentation(itemNode, li);
    });
    footerListDiv.append(ul);
    return footerListDiv;
  };

  footerNavbarLeft.append(createFooterList(footerList1));
  footerNavbarLeft.append(createFooterList(footerList2));
  footerNav.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('header-footer-brand__navbar--right', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');
  footerNavbarRight.append(createFooterList(footerList3));
  footerNavbarRight.append(createFooterList(footerList4));
  footerNav.append(footerNavbarRight);

  footerBrandRight.append(footerNav);
  footerPrimaryContent.append(footerBrandRight);
  footerContainer.append(footerPrimaryContent);
  footerPrimarySection.append(footerContainer);
  footerBrand.append(footerPrimarySection);

  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.classList.add('header-footer-brand__secondary');
  footerSecondarySection.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.classList.add('header-container');

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.classList.add('header-footer-brand__secondary--content', 'header-d-flex', 'header-flex-column', 'header-justify-content-md-between', 'header-align-items-center');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('header-footer-brand__right', 'header-d-flex', 'header-flex-column', 'header-pb-5');

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('header-social_media--title');
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('header-footer-brand__right--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-px-10', 'header-flex-wrap');

  socialLinks.forEach((itemNode) => {
    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    const li = document.createElement('li');
    li.classList.add('header-footer-brand__right--item', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');

    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href || '#';
      anchor.target = '_blank';
      anchor.classList.add('header-footer-brand__right--link', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center', 'header-analytics_cta_click');
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${link.href.includes('facebook') ? 'facebook' : link.href.includes('instagram') ? 'instagram' : 'youtube'}`);
      anchor.setAttribute('data-platform-name', link.href.includes('facebook') ? 'facebook' : link.href.includes('instagram') ? 'instagram' : 'youtube');
      anchor.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(link, anchor);

      if (icon) {
        const picture = createOptimizedPicture(icon.src, icon.alt || link.href, false, [{
          width: '24px'
        }]);
        picture.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
        picture.querySelector('img').setAttribute('aria-label', link.href.includes('facebook') ? 'facebook' : link.href.includes('instagram') ? 'instagram' : 'youtube');
        moveInstrumentation(icon, picture);
        anchor.append(picture);
      }
      li.append(anchor);
    }
    socialList.append(li);
    moveInstrumentation(itemNode, li);
  });
  socialMediaSection.append(socialList);
  footerSecondaryContent.append(socialMediaSection);

  const footerBottomLeft = document.createElement('section');
  footerBottomLeft.classList.add('header-footer-brand__left', 'header-py-5', 'header-d-flex', 'header-flex-column', 'header-gap-3');

  const footerBottomLeftList = document.createElement('ul');
  footerBottomLeftList.classList.add('header-footer-brand__left--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-flex-wrap');

  if (footerLeftLink) {
    const li = document.createElement('li');
    li.classList.add('header-footer-brand__left--item', 'header-foot_link');
    const anchor = document.createElement('a');
    anchor.href = footerLeftLink.href || 'https://www.itcportal.com/';
    anchor.target = '_blank';
    anchor.classList.add('header-footer-brand__left--link', 'header-analytics_cta_click');
    anchor.setAttribute('data-cta-region', 'Footer');
    moveInstrumentation(footerLeftLink, anchor);
    anchor.textContent = footerLeftLink.textContent.trim() || 'ITC portal';
    li.append(anchor);
    footerBottomLeftList.append(li);
  }
  footerBottomLeft.append(footerBottomLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('header-footer-brand__left--copyright', 'header-text-center');
  if (copyright) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('header-footer-brand__left--text', 'header-text-white');
    moveInstrumentation(copyright, copyrightSpan);
    copyrightSpan.textContent = copyright.textContent.trim();
    copyrightDiv.append(copyrightSpan);
  }
  footerBottomLeft.append(copyrightDiv);
  footerSecondaryContent.append(footerBottomLeft);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondarySection.append(footerSecondaryContainer);
  footerBrand.append(footerSecondarySection);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('header-overlay', 'header-position-absolute', 'header-top-0', 'header-start-0', 'header-w-100', 'header-h-100', 'header-bg-black', 'header-opacity-25');
  submenuContainer.append(overlayDiv);
  rootDiv.append(submenuContainer);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}