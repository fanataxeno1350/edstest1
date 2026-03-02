import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('.header-app-name');
  const logoImageContainer = block.querySelector('.header-header__logo');
  const itcLogoContainer = block.querySelector('.header-footer-brand__left .header-footer-brand__logo');
  const fssiLogoContainer = block.querySelector('.header-footer-brand__secondary--logo');
  const copyrightTextSpan = block.querySelector('.header-footer-brand__left--copyright .header-footer-brand__left--text');

  const headerFooterModel = {
    appName: appName ? appName.textContent.trim() : '',
    logoImage: logoImageContainer ? logoImageContainer.querySelector('img').getAttribute('src') : '',
    itcLogo: itcLogoContainer ? itcLogoContainer.querySelector('img').getAttribute('src') : '',
    fssiLogo: fssiLogoContainer ? fssiLogoContainer.querySelector('img').getAttribute('src') : '',
    copyrightText: copyrightTextSpan ? copyrightTextSpan.textContent.trim() : '',
  };

  const menuItems = [];
  const menuItemElements = block.querySelectorAll('.header-sidebar__menu-item');
  menuItemElements.forEach((item) => {
    const iconImg = item.querySelector('.header-sidebar__menu-icon');
    const linkEl = item.querySelector('.header-sidebar__menu-link');
    if (iconImg && linkEl) {
      menuItems.push({
        icon: iconImg.getAttribute('src'),
        text: linkEl.textContent.trim(),
        link: linkEl.getAttribute('href'),
      });
    }
  });

  const footerLinks = [];
  const footerLinkElements = block.querySelectorAll('.header-footer-list__item a');
  footerLinkElements.forEach((linkEl) => {
    footerLinks.push({
      text: linkEl.textContent.trim(),
      link: linkEl.getAttribute('href'),
    });
  });

  const socialLinks = [];
  const socialLinkElements = block.querySelectorAll('.header-footer-brand__right--item a');
  socialLinkElements.forEach((linkEl) => {
    const iconImg = linkEl.querySelector('img');
    if (iconImg) {
      socialLinks.push({
        platform: linkEl.dataset.platformName || '',
        icon: iconImg.getAttribute('src'),
        link: linkEl.getAttribute('href'),
      });
    }
  });

  // Clear the block content
  block.textContent = '';

  // Rebuild the structure based on the extracted data
  const section = document.createElement('section');
  section.className = 'header-position-relative header-mb-15';

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.dataset.appName = headerFooterModel.appName;
  appNameSpan.textContent = headerFooterModel.appName;
  section.append(appNameSpan);

  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const div1 = document.createElement('div');
  div1.className = 'header-d-flex header-w-25';
  header.append(div1);

  const div2 = document.createElement('div');
  div2.className = 'header-d-flex header-justify-content-center header-w-25';
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'header-analytics_cta_click';
  logoLink.dataset.ct = '';
  logoLink.setAttribute('aria-label', 'header-logo-boing');
  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  if (headerFooterModel.logoImage) {
    const logoImg = createOptimizedPicture(headerFooterModel.logoImage, 'Let\'s Boing', true, true);
    logoImg.querySelector('img').className = 'header-header__logo-img';
    logoDiv.append(logoImg);
  }
  logoLink.append(logoDiv);
  div2.append(logoLink);
  header.append(div2);

  const div3 = document.createElement('div');
  div3.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginLink = document.createElement('a');
  loginLink.href = '/login.html';
  loginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
  loginLink.style.display = 'inline';
  const loginButton = document.createElement('button');
  loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
  loginButton.textContent = 'Login';
  loginLink.append(loginButton);
  div3.append(loginLink);
  header.append(div3);
  section.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const menuUl = document.createElement('ul');
  menuUl.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  menuItems.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    const link = document.createElement('a');
    link.href = item.link;
    link.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
    link.dataset.consent = 'false'; // Assuming default, adjust if needed
    link.dataset.link = item.link; // Assuming data-link is href
    const iconImg = createOptimizedPicture(item.icon, item.text);
    iconImg.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
    link.append(iconImg);
    link.append(document.createTextNode(item.text));
    li.append(link);
    menuUl.append(li);
  });
  aside.append(menuUl);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrandDiv.dataset.isdoodlevariation = 'false';

  const primarySection = document.createElement('section');
  primarySection.className = 'header-footer-brand__primary';
  primarySection.style.backgroundColor = '';
  const primaryContainerDiv = document.createElement('div');
  primaryContainerDiv.className = 'header-container';
  const primaryContentDiv = document.createElement('div');
  primaryContentDiv.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const leftSection = document.createElement('section');
  leftSection.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';
  const itcLink = document.createElement('a');
  itcLink.href = 'https://www.itcportal.com/';
  itcLink.target = '_blank';
  itcLink.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
  itcLink.dataset.ctaRegion = 'Footer';
  itcLink.setAttribute('aria-label', 'ITC Logo');
  if (headerFooterModel.itcLogo) {
    const itcImg = createOptimizedPicture(headerFooterModel.itcLogo, 'ITC Logo');
    itcImg.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    itcLink.append(itcImg);
  }
  leftSection.append(itcLink);

  const fssiDiv = document.createElement('div');
  fssiDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
  if (headerFooterModel.fssiLogo) {
    const fssiImg = createOptimizedPicture(headerFooterModel.fssiLogo, 'FSSI Logo');
    fssiImg.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
    fssiDiv.append(fssiImg);
  }
  leftSection.append(fssiDiv);
  primaryContentDiv.append(leftSection);

  const rightSection = document.createElement('section');
  rightSection.className = 'header-footer-brand__right';
  const nav = document.createElement('nav');
  nav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');

  const navLeftDiv = document.createElement('div');
  navLeftDiv.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';

  // Group footer links into lists (assuming 2 lists for left, 2 for right based on original HTML)
  const footerLinksPerColumn = Math.ceil(footerLinks.length / 4); // Distribute into 4 columns
  let currentLinkIndex = 0;

  for (let i = 0; i < 2; i += 1) {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
    for (let j = 0; j < footerLinksPerColumn && currentLinkIndex < footerLinks.length; j += 1) {
      const linkData = footerLinks[currentLinkIndex];
      const li = document.createElement('li');
      li.className = 'header-footer-list__item';
      const link = document.createElement('a');
      link.href = linkData.link;
      link.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      link.dataset.linkRegion = 'Footer List';
      link.textContent = linkData.text;
      li.append(link);
      ul.append(li);
      currentLinkIndex += 1;
    }
    footerListDiv.append(ul);
    navLeftDiv.append(footerListDiv);
  }
  nav.append(navLeftDiv);

  const navRightDiv = document.createElement('div');
  navRightDiv.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';

  for (let i = 0; i < 2; i += 1) {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
    for (let j = 0; j < footerLinksPerColumn && currentLinkIndex < footerLinks.length; j += 1) {
      const linkData = footerLinks[currentLinkIndex];
      const li = document.createElement('li');
      li.className = 'header-footer-list__item';
      const link = document.createElement('a');
      link.href = linkData.link;
      link.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      link.dataset.linkRegion = 'Footer List';
      link.textContent = linkData.text;
      li.append(link);
      ul.append(li);
      currentLinkIndex += 1;
    }
    footerListDiv.append(ul);
    navRightDiv.append(footerListDiv);
  }
  nav.append(navRightDiv);

  rightSection.append(nav);
  primaryContentDiv.append(rightSection);
  primaryContainerDiv.append(primaryContentDiv);
  primarySection.append(primaryContainerDiv);
  footerBrandDiv.append(primarySection);

  const secondarySection = document.createElement('section');
  secondarySection.className = 'header-footer-brand__secondary';
  secondarySection.style.backgroundColor = '';
  const secondaryContainerDiv = document.createElement('div');
  secondaryContainerDiv.className = 'header-container';
  const secondaryContentDiv = document.createElement('div');
  secondaryContentDiv.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaRightSection = document.createElement('section');
  socialMediaRightSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaRightSection.append(socialTitle);
  const socialUl = document.createElement('ul');
  socialUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';
  socialLinks.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
    const link = document.createElement('a');
    link.href = item.link;
    link.target = '_blank';
    link.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
    link.dataset.ctaRegion = 'Footer';
    link.dataset.ctaLabel = `footer-${item.platform}`;
    link.dataset.platformName = item.platform;
    link.dataset.socialLinktype = 'follow';
    const iconImg = createOptimizedPicture(item.icon, item.link);
    iconImg.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    iconImg.querySelector('img').setAttribute('aria-label', item.platform);
    link.append(iconImg);
    li.append(link);
    socialUl.append(li);
  });
  socialMediaRightSection.append(socialUl);
  secondaryContentDiv.append(socialMediaRightSection);

  const copyrightLeftSection = document.createElement('section');
  copyrightLeftSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  const copyrightUl = document.createElement('ul');
  copyrightUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  const copyrightLi = document.createElement('li');
  copyrightLi.className = 'header-footer-brand__left--item header-foot_link';
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
  itcPortalLink.dataset.ctaRegion = 'Footer';
  itcPortalLink.textContent = 'ITC portal';
  copyrightLi.append(itcPortalLink);
  copyrightUl.append(copyrightLi);
  copyrightLeftSection.append(copyrightUl);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = headerFooterModel.copyrightText;
  copyrightDiv.append(copyrightSpan);
  copyrightLeftSection.append(copyrightDiv);
  secondaryContentDiv.append(copyrightLeftSection);

  secondaryContainerDiv.append(secondaryContentDiv);
  secondarySection.append(secondaryContainerDiv);
  footerBrandDiv.append(secondarySection);

  aside.append(footerBrandDiv);
  submenuContainer.append(aside);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  section.append(submenuContainer);

  block.append(section);
}