import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const logo = block.querySelector('[data-aue-prop="logo"]');
  const homeLink = block.querySelector('[data-aue-prop="homeLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');

  const sidebarMenuItems = [...block.querySelectorAll('[data-aue-model="sidebarMenuItem"]')];
  const footerLinks = [...block.querySelectorAll('[data-aue-model="footerLink"]')];
  const footerSocialLinks = [...block.querySelectorAll('[data-aue-model="footerSocialLink"]')];

  const section = document.createElement('section');
  section.className = 'header-position-relative header-mb-15';

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', appName.textContent);
  appNameSpan.setAttribute('data-aue-prop', 'appName');
  appNameSpan.setAttribute('data-aue-type', 'text');
  appNameSpan.textContent = appName.textContent;
  moveInstrumentation(appName, appNameSpan);
  section.append(appNameSpan);

  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const headerDiv1 = document.createElement('div');
  headerDiv1.className = 'header-d-flex header-w-25';
  header.append(headerDiv1);

  const headerDiv2 = document.createElement('div');
  headerDiv2.className = 'header-d-flex header-justify-content-center header-w-25';
  const logoLink = document.createElement('a');
  logoLink.href = homeLink.querySelector('a')?.href || '/';
  logoLink.className = 'header-analytics_cta_click';
  logoLink.setAttribute('data-ct', '');
  logoLink.setAttribute('a-label', 'header-logo-boing');
  logoLink.setAttribute('data-aue-prop', 'homeLink');
  logoLink.setAttribute('data-aue-type', 'reference');
  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  const logoImg = logo.querySelector('img');
  if (logoImg) {
    const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt, true, [{ width: '100px' }]);
    optimizedLogo.querySelector('img').className = 'header-header__logo-img';
    logoDiv.append(optimizedLogo);
  }
  logoLink.append(logoDiv);
  moveInstrumentation(logo, logoLink);
  moveInstrumentation(homeLink, logoLink);
  headerDiv2.append(logoLink);
  header.append(headerDiv2);

  const headerDiv3 = document.createElement('div');
  headerDiv3.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginWrapper = document.createElement('a');
  loginWrapper.href = loginLink.querySelector('a')?.href || '/login.html';
  loginWrapper.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
  loginWrapper.style.display = 'inline';
  loginWrapper.setAttribute('data-aue-prop', 'loginLink');
  loginWrapper.setAttribute('data-aue-type', 'reference');
  const loginButton = document.createElement('button');
  loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
  loginButton.textContent = loginLink.querySelector('a')?.textContent || 'Login';
  loginWrapper.append(loginButton);
  moveInstrumentation(loginLink, loginWrapper);
  headerDiv3.append(loginWrapper);
  header.append(headerDiv3);
  section.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  sidebarMenuItems.forEach((item) => {
    const itemLi = document.createElement('li');
    itemLi.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    itemLi.setAttribute('data-aue-model', 'sidebarMenuItem');

    const itemLink = document.createElement('a');
    itemLink.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
    itemLink.setAttribute('data-consent', 'false');

    const linkElement = item.querySelector('[data-aue-prop="link"] a');
    if (linkElement) {
      itemLink.href = linkElement.href;
      itemLink.setAttribute('data-link', linkElement.getAttribute('data-link') || linkElement.href);
      itemLink.setAttribute('data-aue-prop', 'link');
      itemLink.setAttribute('data-aue-type', 'reference');
    }

    const iconElement = item.querySelector('[data-aue-prop="icon"] img');
    if (iconElement) {
      const optimizedIcon = createOptimizedPicture(iconElement.src, iconElement.alt, false, [{ width: '24px' }]);
      optimizedIcon.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      itemLink.append(optimizedIcon);
      moveInstrumentation(item.querySelector('[data-aue-prop="icon"]'), itemLink);
    }

    const labelElement = item.querySelector('[data-aue-prop="label"]');
    if (labelElement) {
      const labelSpan = document.createElement('span');
      labelSpan.textContent = labelElement.textContent;
      labelSpan.setAttribute('data-aue-prop', 'label');
      labelSpan.setAttribute('data-aue-type', 'text');
      itemLink.append(labelSpan);
      moveInstrumentation(labelElement, labelSpan);
    }

    itemLi.append(itemLink);
    sidebarMenu.append(itemLi);
    moveInstrumentation(item, itemLi);
  });

  const logoutLi = document.createElement('li');
  logoutLi.className = 'header-sidebar__menu-item header-sidebar__menu-item--logout header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
  logoutLi.style.display = 'none';
  const logoutLink = document.createElement('a');
  logoutLink.href = '/';
  logoutLink.className = 'header-sidebar__menu-link header-sidebar__menu-item--logout-btn header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
  logoutLink.setAttribute('data-consent', 'false');
  logoutLink.setAttribute('data-link', '/content/boing/in/en/home');
  const logoutImg = document.createElement('img');
  logoutImg.src = '/content/dam/aemigrate/uploaded-folder/image/logout-3-fmt-webp-alpha.webp';
  logoutImg.alt = 'Logout';
  logoutImg.className = 'header-sidebar__menu-icon header-me-4';
  logoutImg.loading = 'lazy';
  logoutLink.append(logoutImg, 'Logout');
  logoutLi.append(logoutLink);
  sidebarMenu.append(logoutLi);

  aside.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand__primary';
  footerBrandPrimary.style.backgroundColor = '';
  const footerBrandPrimaryContainer = document.createElement('div');
  footerBrandPrimaryContainer.className = 'header-container';
  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const itcLogoLink = document.createElement('a');
  itcLogoLink.href = 'https://www.itcportal.com/';
  itcLogoLink.target = '_blank';
  itcLogoLink.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
  itcLogoLink.setAttribute('data-cta-region', 'Footer');
  itcLogoLink.setAttribute('aria-label', 'ITC Logo');
  const itcLogoImg = document.createElement('img');
  itcLogoImg.src = '/content/dam/aemigrate/uploaded-folder/image/itc-logo-2-fmt-webp-alpha.webp';
  itcLogoImg.alt = 'ITC Logo';
  itcLogoImg.className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
  itcLogoImg.loading = 'lazy';
  itcLogoLink.append(itcLogoImg);
  footerBrandLeft.append(itcLogoLink);

  const fssiLogoDiv = document.createElement('div');
  fssiLogoDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
  const fssiLogoImg = document.createElement('img');
  fssiLogoImg.className = 'header-object-fit-contain header-w-100 header-no-rendition';
  fssiLogoImg.src = '/content/dam/aemigrate/uploaded-folder/image/fssi-logo-update-fmt-webp-alpha.webp';
  fssiLogoImg.alt = 'FSSI Logo';
  fssiLogoImg.loading = 'lazy';
  fssiLogoDiv.append(fssiLogoImg);
  footerBrandLeft.append(fssiLogoDiv);
  footerBrandPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';
  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';

  const footerListDiv1 = document.createElement('div');
  footerListDiv1.className = 'header-footerList';
  const footerList1 = document.createElement('ul');
  footerList1.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
  footerLinks.slice(0, 3).forEach((item) => {
    const itemLi = document.createElement('li');
    itemLi.className = 'header-footer-list__item';
    itemLi.setAttribute('data-aue-model', 'footerLink');

    const itemLink = document.createElement('a');
    itemLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
    itemLink.setAttribute('data-link-region', 'Footer List');

    const linkElement = item.querySelector('[data-aue-prop="link"] a');
    if (linkElement) {
      itemLink.href = linkElement.href;
      itemLink.setAttribute('data-aue-prop', 'link');
      itemLink.setAttribute('data-aue-type', 'reference');
    }

    const labelElement = item.querySelector('[data-aue-prop="label"]');
    if (labelElement) {
      const labelSpan = document.createElement('span');
      labelSpan.textContent = labelElement.textContent;
      labelSpan.setAttribute('data-aue-prop', 'label');
      labelSpan.setAttribute('data-aue-type', 'text');
      itemLink.append(labelSpan);
      moveInstrumentation(labelElement, labelSpan);
    }

    itemLi.append(itemLink);
    footerList1.append(itemLi);
    moveInstrumentation(item, itemLi);
  });
  footerListDiv1.append(footerList1);
  footerNavbarLeft.append(footerListDiv1);

  const footerListDiv2 = document.createElement('div');
  footerListDiv2.className = 'header-footerList';
  const footerList2 = document.createElement('ul');
  footerList2.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
  footerLinks.slice(3, 6).forEach((item) => {
    const itemLi = document.createElement('li');
    itemLi.className = 'header-footer-list__item';
    itemLi.setAttribute('data-aue-model', 'footerLink');

    const itemLink = document.createElement('a');
    itemLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
    itemLink.setAttribute('data-link-region', 'Footer List');

    const linkElement = item.querySelector('[data-aue-prop="link"] a');
    if (linkElement) {
      itemLink.href = linkElement.href;
      itemLink.setAttribute('data-aue-prop', 'link');
      itemLink.setAttribute('data-aue-type', 'reference');
    }

    const labelElement = item.querySelector('[data-aue-prop="label"]');
    if (labelElement) {
      const labelSpan = document.createElement('span');
      labelSpan.textContent = labelElement.textContent;
      labelSpan.setAttribute('data-aue-prop', 'label');
      labelSpan.setAttribute('data-aue-type', 'text');
      itemLink.append(labelSpan);
      moveInstrumentation(labelElement, labelSpan);
    }

    itemLi.append(itemLink);
    footerList2.append(itemLi);
    moveInstrumentation(item, itemLi);
  });
  footerListDiv2.append(footerList2);
  footerNavbarLeft.append(footerListDiv2);
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';

  const footerListDiv3 = document.createElement('div');
  footerListDiv3.className = 'header-footerList';
  const footerList3 = document.createElement('ul');
  footerList3.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
  footerLinks.slice(6, 9).forEach((item) => {
    const itemLi = document.createElement('li');
    itemLi.className = 'header-footer-list__item';
    itemLi.setAttribute('data-aue-model', 'footerLink');

    const itemLink = document.createElement('a');
    itemLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
    itemLink.setAttribute('data-link-region', 'Footer List');

    const linkElement = item.querySelector('[data-aue-prop="link"] a');
    if (linkElement) {
      itemLink.href = linkElement.href;
      itemLink.setAttribute('data-aue-prop', 'link');
      itemLink.setAttribute('data-aue-type', 'reference');
    }

    const labelElement = item.querySelector('[data-aue-prop="label"]');
    if (labelElement) {
      const labelSpan = document.createElement('span');
      labelSpan.textContent = labelElement.textContent;
      labelSpan.setAttribute('data-aue-prop', 'label');
      labelSpan.setAttribute('data-aue-type', 'text');
      itemLink.append(labelSpan);
      moveInstrumentation(labelElement, labelSpan);
    }

    itemLi.append(itemLink);
    footerList3.append(itemLi);
    moveInstrumentation(item, itemLi);
  });
  footerListDiv3.append(footerList3);
  footerNavbarRight.append(footerListDiv3);

  const footerListDiv4 = document.createElement('div');
  footerListDiv4.className = 'header-footerList';
  const footerList4 = document.createElement('ul');
  footerList4.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
  footerLinks.slice(9, 12).forEach((item) => {
    const itemLi = document.createElement('li');
    itemLi.className = 'header-footer-list__item';
    itemLi.setAttribute('data-aue-model', 'footerLink');

    const itemLink = document.createElement('a');
    itemLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
    itemLink.setAttribute('data-link-region', 'Footer List');

    const linkElement = item.querySelector('[data-aue-prop="link"] a');
    if (linkElement) {
      itemLink.href = linkElement.href;
      itemLink.setAttribute('data-aue-prop', 'link');
      itemLink.setAttribute('data-aue-type', 'reference');
    }

    const labelElement = item.querySelector('[data-aue-prop="label"]');
    if (labelElement) {
      const labelSpan = document.createElement('span');
      labelSpan.textContent = labelElement.textContent;
      labelSpan.setAttribute('data-aue-prop', 'label');
      labelSpan.setAttribute('data-aue-type', 'text');
      itemLink.append(labelSpan);
      moveInstrumentation(labelElement, labelSpan);
    }

    itemLi.append(itemLink);
    footerList4.append(itemLi);
    moveInstrumentation(item, itemLi);
  });
  footerListDiv4.append(footerList4);
  footerNavbarRight.append(footerListDiv4);
  footerNavbar.append(footerNavbarRight);

  footerBrandRight.append(footerNavbar);
  footerBrandPrimaryContent.append(footerBrandRight);
  footerBrandPrimaryContainer.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandPrimaryContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand__secondary';
  footerBrandSecondary.style.backgroundColor = '';
  const footerBrandSecondaryContainer = document.createElement('div');
  footerBrandSecondaryContainer.className = 'header-container';
  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const footerBrandRightSocial = document.createElement('section');
  footerBrandRightSocial.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  footerBrandRightSocial.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  footerSocialLinks.forEach((item) => {
    const itemLi = document.createElement('li');
    itemLi.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
    itemLi.setAttribute('data-aue-model', 'footerSocialLink');

    const itemLink = document.createElement('a');
    itemLink.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
    itemLink.setAttribute('data-cta-region', 'Footer');
    itemLink.target = '_blank';
    itemLink.setAttribute('data-social-linktype', 'follow');

    const linkElement = item.querySelector('[data-aue-prop="link"] a');
    if (linkElement) {
      itemLink.href = linkElement.href;
      itemLink.setAttribute('data-platform-name', linkElement.textContent.toLowerCase());
      itemLink.setAttribute('data-cta-label', `footer-${linkElement.textContent.toLowerCase()}`);
      itemLink.setAttribute('data-aue-prop', 'link');
      itemLink.setAttribute('data-aue-type', 'reference');
    }

    const iconElement = item.querySelector('[data-aue-prop="icon"] img');
    if (iconElement) {
      const optimizedIcon = createOptimizedPicture(iconElement.src, iconElement.alt, false, [{ width: '32px' }]);
      optimizedIcon.querySelector('img').setAttribute('aria-label', iconElement.alt);
      optimizedIcon.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      itemLink.append(optimizedIcon);
      moveInstrumentation(item.querySelector('[data-aue-prop="icon"]'), itemLink);
    }

    itemLi.append(itemLink);
    socialMediaList.append(itemLi);
    moveInstrumentation(item, itemLi);
  });
  footerBrandRightSocial.append(socialMediaList);
  footerBrandSecondaryContent.append(footerBrandRightSocial);

  const footerBrandLeftCopyright = document.createElement('section');
  footerBrandLeftCopyright.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  const copyrightLi = document.createElement('li');
  copyrightLi.className = 'header-footer-brand__left--item header-foot_link';
  const copyrightLink = document.createElement('a');
  copyrightLink.href = 'https://www.itcportal.com/';
  copyrightLink.target = '_blank';
  copyrightLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
  copyrightLink.setAttribute('data-cta-region', 'Footer');
  copyrightLink.textContent = 'ITC portal';
  copyrightLi.append(copyrightLink);
  copyrightList.append(copyrightLi);
  footerBrandLeftCopyright.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = '© 2025 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  footerBrandLeftCopyright.append(copyrightDiv);
  footerBrandSecondaryContent.append(footerBrandLeftCopyright);

  footerBrandSecondaryContainer.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerBrandSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  section.append(submenuContainer);

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
