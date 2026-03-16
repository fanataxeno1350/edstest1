import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainSection = document.createElement('section');
  mainSection.className = 'header-section header-position-relative header-mb-15';
  moveInstrumentation(block, mainSection);

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-section-app-name header-d-none';
  appNameSpan.dataset.appName = block.children[0]?.children[0]?.textContent.trim() || 'boing';
  appNameSpan.textContent = appNameSpan.dataset.appName;
  mainSection.append(appNameSpan);

  // Header Container
  const header = document.createElement('header');
  header.className = 'header-section-boing-container header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  // Left div (empty in provided HTML, but present in structure)
  const leftDiv = document.createElement('div');
  leftDiv.className = 'header-section-d-flex header-d-flex header-w-25';
  header.append(leftDiv);

  // Middle div (Main Logo)
  const middleDiv = document.createElement('div');
  middleDiv.className = 'header-section-d-flex header-d-flex header-justify-content-center header-w-25';
  const mainLogoLink = document.createElement('a');
  mainLogoLink.href = '/';
  mainLogoLink.className = 'header-section-analytics_cta_click header-analytics_cta_click';
  mainLogoLink.dataset.ct = '';
  mainLogoLink.setAttribute('aria-label', 'header-logo-boing');
  const mainLogoDiv = document.createElement('div');
  mainLogoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  const mainLogoImg = block.children[0]?.children[1]?.querySelector('img');
  if (mainLogoImg) {
    const optimizedMainLogo = createOptimizedPicture(mainLogoImg.src, mainLogoImg.alt, true, 'eager');
    moveInstrumentation(mainLogoImg, optimizedMainLogo.querySelector('img'));
    optimizedMainLogo.querySelector('img').classList.add('header-header__logo-img');
    mainLogoDiv.append(optimizedMainLogo);
  }
  mainLogoLink.append(mainLogoDiv);
  middleDiv.append(mainLogoLink);
  header.append(middleDiv);

  // Right div (Login Button)
  const rightDiv = document.createElement('div');
  rightDiv.className = 'header-section-d-flex header-d-flex header-w-25 header-justify-content-end';
  const loginLink = block.children[0]?.children[2]?.querySelector('a');
  const loginButton = block.children[0]?.children[2]?.querySelector('button');
  if (loginLink && loginButton) {
    const newLoginLink = document.createElement('a');
    newLoginLink.href = loginLink.href;
    newLoginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
    newLoginLink.style.display = 'inline';
    const newLoginButton = document.createElement('button');
    newLoginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    newLoginButton.textContent = loginButton.textContent.trim();
    newLoginLink.append(newLoginButton);
    rightDiv.append(newLoginLink);
  }
  header.append(rightDiv);
  mainSection.append(header);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-section-submenu-container header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-section-sidebar header-sidebar header-start-0 header-bg-white header-position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-section-sidebar__menu header-sidebar__menu header-list-unstyled header-px-4';

  // Sidebar Menu Items
  const sidebarItems = Array.from(block.children).filter(row => row.dataset.model === 'sidebarMenuItem');
  sidebarItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-section-sidebar__menu-item header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    if (row.children[2]?.textContent.trim() === 'Logout') {
      li.classList.add('header-sidebar__menu-item--logout');
      li.style.display = 'none';
    }

    const link = row.children[2]?.querySelector('a');
    const img = row.children[0]?.querySelector('img');
    const title = row.children[1]?.textContent.trim();

    if (link && img && title) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-section-sidebar__menu-link header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      if (title === 'Logout') {
        newLink.classList.add('header-sidebar__menu-item--logout-btn');
      }
      newLink.dataset.consent = link.dataset.consent || 'false';
      newLink.dataset.link = link.dataset.link || '';

      const optimizedImg = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedImg.querySelector('img'));
      optimizedImg.querySelector('img').classList.add('header-section-sidebar__menu-icon', 'header-sidebar__menu-icon', 'header-me-4');
      optimizedImg.querySelector('img').setAttribute('loading', 'lazy');

      newLink.append(optimizedImg);
      newLink.append(document.createTextNode(title));
      li.append(newLink);
    }
    sidebarMenu.append(li);
  });
  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-section-sidebar__curve header-sidebar__curve';
  sidebar.append(sidebarCurve);

  // Footer Brand
  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-section-footer-brand header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.dataset.isdoodlevariation = 'false';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-section-footer-brand__primary header-footer-brand__primary';
  footerBrandPrimary.style.backgroundColor = '';

  const containerPrimary = document.createElement('div');
  containerPrimary.className = 'header-section-container header-container';

  const primaryContent = document.createElement('div');
  primaryContent.className = 'header-section-footer-brand__primary--content header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-section-footer-brand__left header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const footerLogo1Link = document.createElement('a');
  footerLogo1Link.href = 'https://www.itcportal.com/';
  footerLogo1Link.target = '_blank';
  footerLogo1Link.className = 'header-section-footer-brand__logo header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
  footerLogo1Link.dataset.ctaRegion = 'Footer';
  footerLogo1Link.setAttribute('aria-label', 'ITC Logo');
  const footerLogo1Img = block.children[0]?.children[3]?.querySelector('img');
  if (footerLogo1Img) {
    const optimizedFooterLogo1 = createOptimizedPicture(footerLogo1Img.src, footerLogo1Img.alt);
    moveInstrumentation(footerLogo1Img, optimizedFooterLogo1.querySelector('img'));
    optimizedFooterLogo1.querySelector('img').classList.add('header-section-object-fit-contain', 'header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
    optimizedFooterLogo1.querySelector('img').setAttribute('loading', 'lazy');
    footerLogo1Link.append(optimizedFooterLogo1);
  }
  footerBrandLeft.append(footerLogo1Link);

  const footerLogo2Div = document.createElement('div');
  footerLogo2Div.className = 'header-section-footer-brand__secondary--logo header-footer-brand__secondary--logo header-d-inline-block';
  const footerLogo2Img = block.children[0]?.children[4]?.querySelector('img');
  if (footerLogo2Img) {
    const optimizedFooterLogo2 = createOptimizedPicture(footerLogo2Img.src, footerLogo2Img.alt);
    moveInstrumentation(footerLogo2Img, optimizedFooterLogo2.querySelector('img'));
    optimizedFooterLogo2.querySelector('img').classList.add('header-section-object-fit-contain', 'header-object-fit-contain', 'header-w-100', 'header-no-rendition');
    optimizedFooterLogo2.querySelector('img').setAttribute('loading', 'lazy');
    footerLogo2Div.append(optimizedFooterLogo2);
  }
  footerBrandLeft.append(footerLogo2Div);
  primaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-section-footer-brand__right header-footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-section-footer-brand__navbar header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-section-footer-brand__navbar--left header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';

  // Footer Link Lists
  const footerLinkItems = Array.from(block.children).filter(row => row.dataset.model === 'footerLinkItem');
  const footerLists = [];
  for (let i = 0; i < 4; i += 1) {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-section-footerList header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-section-footer-list header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
    footerLists.push(ul);
    footerListDiv.append(ul);
    if (i < 2) {
      footerNavbarLeft.append(footerListDiv);
    } else {
      const footerNavbarRight = footerNavbar.querySelector('.header-section-footer-brand__navbar--right') || document.createElement('div');
      if (!footerNavbarRight.classList.contains('header-section-footer-brand__navbar--right')) {
        footerNavbarRight.className = 'header-section-footer-brand__navbar--right header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
        footerNavbar.append(footerNavbarRight);
      }
      footerNavbarRight.append(footerListDiv);
    }
  }

  footerLinkItems.forEach((row, index) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-section-footer-list__item header-footer-list__item';

    const link = row.children[1]?.querySelector('a');
    const title = row.children[0]?.textContent.trim();

    if (link && title) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-section-cta-analytics header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      newLink.dataset.linkRegion = 'Footer List';
      if (link.target) {
        newLink.target = link.target;
      }
      newLink.textContent = title;
      li.append(newLink);
    }
    // Distribute footer links into the 4 lists
    footerLists[index % 4].append(li);
  });

  footerNavbar.append(footerNavbarLeft);
  footerBrandRight.append(footerNavbar);
  primaryContent.append(footerBrandRight);
  containerPrimary.append(primaryContent);
  footerBrandPrimary.append(containerPrimary);
  footerBrand.append(footerBrandPrimary);

  // Footer Brand Secondary
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-section-footer-brand__secondary header-footer-brand__secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const containerSecondary = document.createElement('div');
  containerSecondary.className = 'header-section-container header-container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'header-section-footer-brand__secondary--content header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-section-footer-brand__right header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-section-social_media--title header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-section-footer-brand__right--list header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  // Social Link Items
  const socialLinkItems = Array.from(block.children).filter(row => row.dataset.model === 'socialLinkItem');
  socialLinkItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-section-footer-brand__right--item header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const link = row.children[1]?.querySelector('a');
    const img = row.children[0]?.querySelector('img');

    if (link && img) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-section-footer-brand__right--link header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      newLink.dataset.ctaRegion = 'Footer';
      newLink.dataset.ctaLabel = `footer-${img.alt.toLowerCase()}`;
      newLink.target = '_blank';
      newLink.dataset.platformName = img.alt.toLowerCase();
      newLink.dataset.socialLinktype = 'follow';

      const optimizedImg = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedImg.querySelector('img'));
      optimizedImg.querySelector('img').setAttribute('aria-label', img.alt.toLowerCase());
      optimizedImg.querySelector('img').classList.add('header-section-object-fit-contain', 'header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
      optimizedImg.querySelector('img').setAttribute('loading', 'lazy');

      newLink.append(optimizedImg);
      li.append(newLink);
    }
    socialMediaList.append(li);
  });
  socialMediaSection.append(socialMediaList);
  secondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-section-footer-brand__left header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'header-section-footer-brand__left--list header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  const itcPortalLi = document.createElement('li');
  itcPortalLi.className = 'header-section-footer-brand__left--item header-footer-brand__left--item header-foot_link';
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-section-footer-brand__left--link header-footer-brand__left--link header-analytics_cta_click';
  itcPortalLink.dataset.ctaRegion = 'Footer';
  itcPortalLink.textContent = 'ITC portal';
  itcPortalLi.append(itcPortalLink);
  copyrightList.append(itcPortalLi);
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-section-footer-brand__left--copyright header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-section-footer-brand__left--text header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = block.children[0]?.children[5]?.textContent.trim() || '© 2026 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);
  secondaryContent.append(copyrightSection);

  containerSecondary.append(secondaryContent);
  footerBrandSecondary.append(containerSecondary);
  footerBrand.append(footerBrandSecondary);
  sidebar.append(footerBrand);

  submenuContainer.append(sidebar);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-section-overlay header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  mainSection.append(submenuContainer);

  block.textContent = '';
  block.append(mainSection);
}
