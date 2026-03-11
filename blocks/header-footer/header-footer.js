import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainSection = document.createElement('section');
  mainSection.className = 'header-position-relative header-mb-15';

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  mainSection.append(appNameSpan);

  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const div1 = document.createElement('div');
  div1.className = 'header-d-flex header-w-25';
  header.append(div1);

  const logoWrapper = document.createElement('div');
  logoWrapper.className = 'header-d-flex header-justify-content-center header-w-25';
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]') || block.querySelector('a[href^="/"]');
  const logoImg = block.querySelector('[data-aue-prop="logo"]') || block.querySelector('.header-header__logo-img');

  if (logoLink && logoImg) {
    const a = document.createElement('a');
    a.href = logoLink.href;
    a.className = 'header-analytics_cta_click';
    a.setAttribute('data-ct', '');
    a.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(logoLink, a);

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';

    const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
    picture.querySelector('img').className = 'header-header__logo-img';
    picture.querySelector('img').setAttribute('fetchpriority', 'high');
    picture.querySelector('img').setAttribute('loading', 'eager');
    moveInstrumentation(logoImg, picture.querySelector('img'));

    logoDiv.append(picture);
    a.append(logoDiv);
    logoWrapper.append(a);
  }
  header.append(logoWrapper);

  const loginWrapper = document.createElement('div');
  loginWrapper.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]') || block.querySelector('a[href="/login.html"]');
  const loginText = block.querySelector('[data-aue-prop="loginText"]') || block.querySelector('.header-header__login-btn');

  if (loginLink && loginText) {
    const a = document.createElement('a');
    a.href = loginLink.href;
    a.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
    a.style.display = 'inline';
    moveInstrumentation(loginLink, a);

    const button = document.createElement('button');
    button.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    button.textContent = loginText.textContent.trim();
    moveInstrumentation(loginText, button);

    a.append(button);
    loginWrapper.append(a);
  }
  header.append(loginWrapper);
  mainSection.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const menuList = document.createElement('ul');
  menuList.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  const menuItems = block.querySelectorAll('[data-aue-model="menuItem"]');
  menuItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const text = itemNode.querySelector('[data-aue-prop="text"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    if (link && text && icon) {
      const a = document.createElement('a');
      a.href = link.href;
      a.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      a.setAttribute('data-consent', 'false');
      a.setAttribute('data-link', link.getAttribute('data-link') || link.href);
      moveInstrumentation(link, a);

      const picture = createOptimizedPicture(icon.src, icon.alt);
      picture.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      picture.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(icon, picture.querySelector('img'));
      a.append(picture);

      const span = document.createElement('span');
      span.textContent = text.textContent.trim();
      moveInstrumentation(text, span);
      a.append(span);

      li.append(a);
    }
    moveInstrumentation(itemNode, li);
    menuList.append(li);
  });

  // Add logout item if needed (it's hidden by default in the sample HTML)
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
  logoutLink.append('Logout');
  logoutLi.append(logoutLink);
  menuList.append(logoutLi);

  aside.append(menuList);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerPrimary = document.createElement('section');
  footerPrimary.className = 'header-footer-brand__primary';
  footerPrimary.style.backgroundColor = '';

  const container = document.createElement('div');
  container.className = 'header-container';

  const primaryContent = document.createElement('div');
  primaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const footerPrimaryLogoLink = block.querySelector('[data-aue-prop="footerPrimaryLogoLink"]') || block.querySelector('a[href="https://www.itcportal.com/"]');
  const footerPrimaryLogoImg = block.querySelector('[data-aue-prop="footerPrimaryLogo"]') || block.querySelector('img[alt="ITC Logo"]');

  if (footerPrimaryLogoLink && footerPrimaryLogoImg) {
    const a = document.createElement('a');
    a.href = footerPrimaryLogoLink.href;
    a.target = '_blank';
    a.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    a.setAttribute('data-cta-region', 'Footer');
    a.setAttribute('aria-label', 'ITC Logo');
    moveInstrumentation(footerPrimaryLogoLink, a);

    const picture = createOptimizedPicture(footerPrimaryLogoImg.src, footerPrimaryLogoImg.alt);
    picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    picture.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(footerPrimaryLogoImg, picture.querySelector('img'));
    a.append(picture);
    footerBrandLeft.append(a);
  }

  const footerSecondaryLogoImg = block.querySelector('[data-aue-prop="footerSecondaryLogo"]') || block.querySelector('img[alt="FSSI Logo"]');
  if (footerSecondaryLogoImg) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';

    const picture = createOptimizedPicture(footerSecondaryLogoImg.src, footerSecondaryLogoImg.alt);
    picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
    picture.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(footerSecondaryLogoImg, picture.querySelector('img'));
    secondaryLogoDiv.append(picture);
    footerBrandLeft.append(secondaryLogoDiv);
  }
  primaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';

  const nav = document.createElement('nav');
  nav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');

  const navbarLeft = document.createElement('div');
  navbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const columnSize = Math.ceil(footerLinks.length / 4); // Distribute into 4 columns

  for (let i = 0; i < 4; i += 1) {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

    const startIndex = i * columnSize;
    const endIndex = Math.min(startIndex + columnSize, footerLinks.length);

    for (let j = startIndex; j < endIndex; j += 1) {
      const itemNode = footerLinks[j];
      const li = document.createElement('li');
      li.className = 'header-footer-list__item';

      const link = itemNode.querySelector('[data-aue-prop="link"]');
      const text = itemNode.querySelector('[data-aue-prop="text"]');

      if (link && text) {
        const a = document.createElement('a');
        a.href = link.href;
        a.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        a.setAttribute('data-link-region', 'Footer List');
        a.textContent = text.textContent.trim();
        moveInstrumentation(link, a);
        moveInstrumentation(text, a);
        li.append(a);
      }
      moveInstrumentation(itemNode, li);
      ul.append(li);
    }
    if (ul.children.length > 0) {
      footerListDiv.append(ul);
      if (i < 2) {
        navbarLeft.append(footerListDiv);
      } else {
        if (i === 2) {
          const navbarRight = document.createElement('div');
          navbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
          nav.append(navbarRight);
        }
        nav.querySelector('.header-footer-brand__navbar--right').append(footerListDiv);
      }
    }
  }

  nav.prepend(navbarLeft);
  footerBrandRight.append(nav);
  primaryContent.append(footerBrandRight);
  container.append(primaryContent);
  footerPrimary.append(container);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.className = 'header-footer-brand__secondary';
  footerSecondary.style.backgroundColor = '';

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'header-container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const socialLink = itemNode.querySelector('[data-aue-prop="socialLink"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    if (socialLink && icon) {
      const a = document.createElement('a');
      a.href = socialLink.href;
      a.target = '_blank';
      a.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      a.setAttribute('data-cta-region', 'Footer');
      a.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
      a.setAttribute('data-platform-name', icon.alt.toLowerCase());
      a.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(socialLink, a);

      const picture = createOptimizedPicture(icon.src, icon.alt);
      picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      picture.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(icon, picture.querySelector('img'));
      a.append(picture);
      li.append(a);
    }
    moveInstrumentation(itemNode, li);
    socialMediaList.append(li);
  });
  socialMediaSection.append(socialMediaList);
  secondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const itcPortalList = document.createElement('ul');
  itcPortalList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  const itcPortalLi = document.createElement('li');
  itcPortalLi.className = 'header-footer-brand__left--item header-foot_link';
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  itcPortalLi.append(itcPortalLink);
  itcPortalList.append(itcPortalLi);
  copyrightSection.append(itcPortalList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  const copyrightText = block.querySelector('[data-aue-prop="copyright"]') || block.querySelector('.header-footer-brand__left--copyright span');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);
  secondaryContent.append(copyrightSection);

  secondaryContainer.append(secondaryContent);
  footerSecondary.append(secondaryContainer);
  footerBrand.append(footerSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  mainSection.append(submenuContainer);

  block.textContent = '';
  block.append(mainSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
