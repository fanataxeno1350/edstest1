import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainSection = document.createElement('section');
  mainSection.className = 'header-position-relative header-mb-15';
  moveInstrumentation(block, mainSection);

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.dataset.appName = block.children[0]?.children[0]?.textContent || '';
  appNameSpan.textContent = block.children[0]?.children[0]?.textContent || '';
  mainSection.append(appNameSpan);

  // Header
  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  moveInstrumentation(block.children[0], header);

  const headerDiv1 = document.createElement('div');
  headerDiv1.className = 'header-d-flex header-w-25';
  header.append(headerDiv1);

  const headerDiv2 = document.createElement('div');
  headerDiv2.className = 'header-d-flex header-justify-content-center header-w-25';
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'header-analytics_cta_click';
  logoLink.dataset.ct = '';
  logoLink.setAttribute('aria-label', 'header-logo-boing');
  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  const logoImg = block.children[1]?.children[0]?.querySelector('img');
  if (logoImg) {
    const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt);
    moveInstrumentation(logoImg, optimizedLogo.querySelector('img'));
    optimizedLogo.querySelector('img').className = 'header-header__logo-img';
    logoDiv.append(optimizedLogo);
  }
  logoLink.append(logoDiv);
  headerDiv2.append(logoLink);
  header.append(headerDiv2);

  const headerDiv3 = document.createElement('div');
  headerDiv3.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginLink = document.createElement('a');
  loginLink.href = '/login.html';
  loginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
  loginLink.style.display = 'inline';
  const loginButton = document.createElement('button');
  loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
  loginButton.textContent = block.children[2]?.children[0]?.textContent || 'Login';
  loginLink.append(loginButton);
  headerDiv3.append(loginLink);
  header.append(headerDiv3);
  mainSection.append(header);

  // Submenu Container (Sidebar)
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  moveInstrumentation(block.children[3], submenuContainer);

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  const sidebarItems = block.children[3]?.children[0]?.children;
  if (sidebarItems) {
    [...sidebarItems].forEach((row) => {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
      const link = row.querySelector('a');
      const img = row.querySelector('img');

      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
        newLink.dataset.consent = link.dataset.consent || 'false';
        newLink.dataset.link = link.dataset.link || '';
        if (img) {
          const optimizedImg = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedImg.querySelector('img'));
          optimizedImg.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
          optimizedImg.querySelector('img').loading = 'lazy';
          newLink.append(optimizedImg);
        }
        newLink.append(document.createTextNode(link.textContent.trim()));
        li.append(newLink);
      }
      sidebarMenu.append(li);
    });
  }
  aside.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  // Footer Brand
  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.dataset.isdoodlevariation = 'false';
  moveInstrumentation(block.children[4], footerBrand);

  const footerPrimary = document.createElement('section');
  footerPrimary.className = 'header-footer-brand__primary';
  footerPrimary.style.backgroundColor = '';
  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.className = 'header-container';
  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const footerLogo1Link = document.createElement('a');
  footerLogo1Link.href = 'https://www.itcportal.com/';
  footerLogo1Link.target = '_blank';
  footerLogo1Link.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
  footerLogo1Link.dataset.ctaRegion = 'Footer';
  footerLogo1Link.setAttribute('aria-label', 'ITC Logo');
  const footerLogo1Img = block.children[4]?.children[0]?.querySelector('img');
  if (footerLogo1Img) {
    const optimizedFooterLogo1 = createOptimizedPicture(footerLogo1Img.src, footerLogo1Img.alt);
    moveInstrumentation(footerLogo1Img, optimizedFooterLogo1.querySelector('img'));
    optimizedFooterLogo1.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    optimizedFooterLogo1.querySelector('img').loading = 'lazy';
    footerLogo1Link.append(optimizedFooterLogo1);
  }
  footerBrandLeft.append(footerLogo1Link);

  const footerLogo2Div = document.createElement('div');
  footerLogo2Div.className = 'header-footer-brand__secondary--logo header-d-inline-block';
  const footerLogo2Img = block.children[5]?.children[0]?.querySelector('img');
  if (footerLogo2Img) {
    const optimizedFooterLogo2 = createOptimizedPicture(footerLogo2Img.src, footerLogo2Img.alt);
    moveInstrumentation(footerLogo2Img, optimizedFooterLogo2.querySelector('img'));
    optimizedFooterLogo2.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
    optimizedFooterLogo2.querySelector('img').loading = 'lazy';
    footerLogo2Div.append(optimizedFooterLogo2);
  }
  footerBrandLeft.append(footerLogo2Div);
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';
  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';

  // Footer Links (groups of 3)
  const footerLinksData = block.children[6]?.children[0]?.children;
  if (footerLinksData) {
    let currentList = document.createElement('ul');
    currentList.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
    let listCount = 0;

    [...footerLinksData].forEach((row, index) => {
      if (listCount === 0) {
        const footerListDiv = document.createElement('div');
        footerListDiv.className = 'header-footerList';
        currentList = document.createElement('ul');
        currentList.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
        footerListDiv.append(currentList);
        if (index < 6) { // First two columns
          footerNavbarLeft.append(footerListDiv);
        } else { // Last two columns
          if (listCount === 0) {
            const footerNavbarRight = document.createElement('div');
            footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
            footerNavbar.append(footerNavbarRight);
          }
          footerNavbar.lastElementChild.append(footerListDiv);
        }
      }

      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.className = 'header-footer-list__item';
      const link = row.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        newLink.dataset.linkRegion = 'Footer List';
        if (link.target) newLink.target = link.target;
        newLink.textContent = link.textContent;
        li.append(newLink);
      }
      currentList.append(li);
      listCount++;
      if (listCount === 3) {
        listCount = 0;
      }
    });
  }

  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerPrimaryContainer.append(footerPrimaryContent);
  footerPrimary.append(footerPrimaryContainer);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.className = 'header-footer-brand__secondary';
  footerSecondary.style.backgroundColor = '';
  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const footerSecondaryRight = document.createElement('section');
  footerSecondaryRight.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  footerSecondaryRight.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const socialLinksData = block.children[7]?.children[0]?.children;
  if (socialLinksData) {
    [...socialLinksData].forEach((row) => {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
      const link = row.querySelector('a');
      const img = row.querySelector('img');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
        newLink.dataset.ctaRegion = 'Footer';
        newLink.dataset.ctaLabel = `footer-${link.dataset.platformName || ''}`;
        newLink.target = '_blank';
        newLink.dataset.platformName = link.dataset.platformName || '';
        newLink.dataset.socialLinktype = 'follow';
        if (img) {
          const optimizedImg = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedImg.querySelector('img'));
          optimizedImg.querySelector('img').setAttribute('aria-label', img.alt);
          optimizedImg.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
          optimizedImg.querySelector('img').loading = 'lazy';
          newLink.append(optimizedImg);
        }
        li.append(newLink);
      }
      socialList.append(li);
    });
  }
  footerSecondaryRight.append(socialList);
  footerSecondaryContent.append(footerSecondaryRight);

  const footerSecondaryLeft = document.createElement('section');
  footerSecondaryLeft.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  const footerSecondaryLeftList = document.createElement('ul');
  footerSecondaryLeftList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  const itcPortalLi = document.createElement('li');
  itcPortalLi.className = 'header-footer-brand__left--item header-foot_link';
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
  itcPortalLink.dataset.ctaRegion = 'Footer';
  itcPortalLink.textContent = 'ITC portal';
  itcPortalLi.append(itcPortalLink);
  footerSecondaryLeftList.append(itcPortalLi);
  footerSecondaryLeft.append(footerSecondaryLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = block.children[8]?.children[0]?.textContent || '© 2026 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  footerSecondaryLeft.append(copyrightDiv);
  footerSecondaryContent.append(footerSecondaryLeft);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  mainSection.append(submenuContainer);

  block.textContent = '';
  block.append(mainSection);
}
