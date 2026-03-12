import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const mainLogoLink = block.querySelector('[data-aue-prop="mainLogoLink"]');
  const mainLogoImg = block.querySelector('[data-aue-prop="mainLogo"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  const footerList1Items = block.querySelectorAll('[data-aue-model="footerList1"]');
  const footerList2Items = block.querySelectorAll('[data-aue-model="footerList2"]');
  const footerList3Items = block.querySelectorAll('[data-aue-model="footerList3"]');
  const footerList4Items = block.querySelectorAll('[data-aue-model="footerList4"]');
  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  const copyright = block.querySelector('[data-aue-prop="copyright"]');

  const rootDiv = document.createElement('div');
  rootDiv.classList.add('header-position-relative', 'header-mb-15');

  // App Name
  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.classList.add('header-d-none', 'header-app-name');
    appNameSpan.dataset.appName = appName.textContent.trim();
    appNameSpan.textContent = appName.textContent.trim();
    moveInstrumentation(appName, appNameSpan);
    rootDiv.append(appNameSpan);
  }

  // Header
  const header = document.createElement('header');
  header.classList.add('header-boing-container', 'header-header', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center', 'header-h-15', 'header-px-5', 'header-py-2', 'header-fixed-top', 'header-w-100', 'header-bg-white');

  const headerDiv1 = document.createElement('div');
  headerDiv1.classList.add('header-d-flex', 'header-w-25');
  header.append(headerDiv1);

  const headerDiv2 = document.createElement('div');
  headerDiv2.classList.add('header-d-flex', 'header-justify-content-center', 'header-w-25');

  if (mainLogoLink && mainLogoImg) {
    const mainLogoAnchor = document.createElement('a');
    mainLogoAnchor.href = mainLogoLink.href;
    mainLogoAnchor.classList.add('header-analytics_cta_click');
    mainLogoAnchor.dataset.ct = '';
    mainLogoAnchor.setAttribute('aria-label', 'header-logo-boing');

    const logoDiv = document.createElement('div');
    logoDiv.classList.add('header-header__logo', 'header-d-flex', 'header-align-items-center');
    logoDiv.append(createOptimizedPicture(mainLogoImg.src, mainLogoImg.alt, true, 'eager'));
    moveInstrumentation(mainLogoImg, logoDiv.querySelector('picture'));
    mainLogoAnchor.append(logoDiv);
    moveInstrumentation(mainLogoLink, mainLogoAnchor);
    headerDiv2.append(mainLogoAnchor);
  }
  header.append(headerDiv2);

  const headerDiv3 = document.createElement('div');
  headerDiv3.classList.add('header-d-flex', 'header-w-25', 'header-justify-content-end');
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href;
    loginAnchor.classList.add('header-header__login-btn-wrapper', 'header-analytics_cta_click');
    loginAnchor.style.display = 'inline';

    const loginButton = document.createElement('button');
    loginButton.classList.add('header-header__login-btn', 'header-btn', 'header-text-boing-primary', 'header-bg-transparent', 'header-fw-semibold', 'header-rounded-4', 'header-btn-sm', 'header-py-3', 'header-px-4');
    loginButton.textContent = loginLink.textContent.trim();
    loginAnchor.append(loginButton);
    moveInstrumentation(loginLink, loginAnchor);
    headerDiv3.append(loginAnchor);
  }
  header.append(headerDiv3);
  rootDiv.append(header);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('header-submenu-container', 'header-position-fixed', 'header-top-0', 'header-start-0', 'header-end-0', 'header-m-auto', 'header-overflow-hidden');

  const aside = document.createElement('aside');
  aside.classList.add('header-sidebar', 'header-start-0', 'header-bg-white', 'header-position-absolute');

  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.classList.add('header-sidebar__menu', 'header-list-unstyled', 'header-px-4');

  sidebarMenuItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.classList.add('header-sidebar__menu-item', 'header-py-6', 'header-border-bottom', 'header-border-boing-neutral-gray-200');

    const link = itemNode.querySelector('a');
    const icon = itemNode.querySelector('img');
    const label = itemNode.querySelector('a').textContent.trim();

    if (link && icon) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.classList.add('header-sidebar__menu-link', 'header-d-flex', 'header-align-items-center', 'header-text-decoration-none', 'header-px-6', 'header-fw-medium', 'header-analytics_cta_click');
      anchor.dataset.consent = link.dataset.consent || 'false';
      anchor.dataset.link = link.dataset.link || '';

      const img = createOptimizedPicture(icon.src, icon.alt);
      img.classList.add('header-sidebar__menu-icon', 'header-me-4');
      img.loading = 'lazy';
      anchor.append(img);
      anchor.append(document.createTextNode(label));
      moveInstrumentation(link, anchor);
      moveInstrumentation(icon, img);
      li.append(anchor);
    }
    moveInstrumentation(itemNode, li);
    sidebarMenuUl.append(li);
  });
  aside.append(sidebarMenuUl);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar__curve');
  aside.append(sidebarCurve);

  // Footer Brand
  const footerBrand = document.createElement('div');
  footerBrand.classList.add('header-footer-brand', 'header-w-100', 'header-bg-boing-neutral-gray-600');
  footerBrand.dataset.isdoodlevariation = 'false';

  const footerPrimary = document.createElement('section');
  footerPrimary.classList.add('header-footer-brand__primary');
  footerPrimary.style.backgroundColor = '';

  const footerContainer1 = document.createElement('div');
  footerContainer1.classList.add('header-container');

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.classList.add('header-footer-brand__primary--content', 'header-d-flex', 'header-flex-column', 'header-flex-md-row', 'header-justify-content-md-between', 'header-align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('header-footer-brand__left', 'header-d-flex', 'header-gap-16', 'header-px-10', 'header-align-items-center', 'header-justify-content-center');

  if (footerLogo1) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.href = footerLogo1.closest('a')?.href || '#';
    logo1Anchor.target = '_blank';
    logo1Anchor.classList.add('header-footer-brand__logo', 'header-d-inline-block', 'header-analytics_cta_click');
    logo1Anchor.dataset.ctaRegion = 'Footer';
    logo1Anchor.setAttribute('aria-label', footerLogo1.alt);

    const img1 = createOptimizedPicture(footerLogo1.src, footerLogo1.alt);
    img1.classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
    img1.loading = 'lazy';
    logo1Anchor.append(img1);
    moveInstrumentation(footerLogo1, logo1Anchor.querySelector('picture'));
    footerBrandLeft.append(logo1Anchor);
  }

  if (footerLogo2) {
    const logo2Div = document.createElement('div');
    logo2Div.classList.add('header-footer-brand__secondary--logo', 'header-d-inline-block');

    const img2 = createOptimizedPicture(footerLogo2.src, footerLogo2.alt);
    img2.classList.add('header-object-fit-contain', 'header-w-100', 'header-no-rendition');
    img2.loading = 'lazy';
    logo2Div.append(img2);
    moveInstrumentation(footerLogo2, logo2Div.querySelector('picture'));
    footerBrandLeft.append(logo2Div);
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
      const li = document.createElement('li');
      li.classList.add('header-footer-list__item');
      const link = itemNode.querySelector('a');
      if (link) {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.classList.add('header-cta-analytics', 'header-analytics_cta_click', 'header-footer-list__item--link', 'header-d-inline-block');
        anchor.dataset.linkRegion = 'Footer List';
        anchor.textContent = link.textContent.trim();
        if (link.target) anchor.target = link.target;
        li.append(anchor);
        moveInstrumentation(link, anchor);
      }
      moveInstrumentation(itemNode, li);
      ul.append(li);
    });
    footerListDiv.append(ul);
    return footerListDiv;
  };

  footerNavbarLeft.append(createFooterList(footerList1Items));
  footerNavbarLeft.append(createFooterList(footerList2Items));
  footerNav.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('header-footer-brand__navbar--right', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');
  footerNavbarRight.append(createFooterList(footerList3Items));
  footerNavbarRight.append(createFooterList(footerList4Items));
  footerNav.append(footerNavbarRight);

  footerBrandRight.append(footerNav);
  footerPrimaryContent.append(footerBrandRight);
  footerContainer1.append(footerPrimaryContent);
  footerPrimary.append(footerContainer1);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.classList.add('header-footer-brand__secondary');
  footerSecondary.style.backgroundColor = '';

  const footerContainer2 = document.createElement('div');
  footerContainer2.classList.add('header-container');

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.classList.add('header-footer-brand__secondary--content', 'header-d-flex', 'header-flex-column', 'header-justify-content-md-between', 'header-align-items-center');

  const footerBrandRight2 = document.createElement('section');
  footerBrandRight2.classList.add('header-footer-brand__right', 'header-d-flex', 'header-flex-column', 'header-pb-5');

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('header-social_media--title');
  socialTitle.textContent = 'Follow Us On';
  footerBrandRight2.append(socialTitle);

  const socialUl = document.createElement('ul');
  socialUl.classList.add('header-footer-brand__right--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-px-10', 'header-flex-wrap');

  socialLinks.forEach((itemNode) => {
    const li = document.createElement('li');
    li.classList.add('header-footer-brand__right--item', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');
    const link = itemNode.querySelector('a');
    const icon = itemNode.querySelector('img');

    if (link && icon) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.classList.add('header-footer-brand__right--link', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center', 'header-analytics_cta_click');
      anchor.dataset.ctaRegion = 'Footer';
      anchor.dataset.ctaLabel = `footer-${icon.alt.toLowerCase()}`;
      anchor.target = '_blank';
      anchor.dataset.platformName = icon.alt.toLowerCase();
      anchor.dataset.socialLinktype = 'follow';

      const img = createOptimizedPicture(icon.src, icon.alt);
      img.classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
      img.loading = 'lazy';
      anchor.append(img);
      moveInstrumentation(link, anchor);
      moveInstrumentation(icon, img);
      li.append(anchor);
    }
    moveInstrumentation(itemNode, li);
    socialUl.append(li);
  });
  footerBrandRight2.append(socialUl);
  footerSecondaryContent.append(footerBrandRight2);

  const footerBrandLeft2 = document.createElement('section');
  footerBrandLeft2.classList.add('header-footer-brand__left', 'header-py-5', 'header-d-flex', 'header-flex-column', 'header-gap-3');

  const itcUl = document.createElement('ul');
  itcUl.classList.add('header-footer-brand__left--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-flex-wrap');

  if (itcPortalLink) {
    const li = document.createElement('li');
    li.classList.add('header-footer-brand__left--item', 'header-foot_link');
    const anchor = document.createElement('a');
    anchor.href = itcPortalLink.href;
    anchor.target = '_blank';
    anchor.classList.add('header-footer-brand__left--link', 'header-analytics_cta_click');
    anchor.dataset.ctaRegion = 'Footer';
    anchor.textContent = itcPortalLink.textContent.trim();
    li.append(anchor);
    moveInstrumentation(itcPortalLink, anchor);
    itcUl.append(li);
  }
  footerBrandLeft2.append(itcUl);

  if (copyright) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.classList.add('header-footer-brand__left--copyright', 'header-text-center');
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('header-footer-brand__left--text', 'header-text-white');
    copyrightSpan.textContent = copyright.textContent.trim();
    copyrightDiv.append(copyrightSpan);
    moveInstrumentation(copyright, copyrightSpan);
    footerBrandLeft2.append(copyrightDiv);
  }
  footerSecondaryContent.append(footerBrandLeft2);
  footerContainer2.append(footerSecondaryContent);
  footerSecondary.append(footerContainer2);
  footerBrand.append(footerSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.classList.add('header-overlay', 'header-position-absolute', 'header-top-0', 'header-start-0', 'header-w-100', 'header-h-100', 'header-bg-black', 'header-opacity-25');
  submenuContainer.append(overlay);

  rootDiv.append(submenuContainer);

  block.textContent = '';
  block.append(rootDiv);
  block.className = 'header-footer block';
  block.dataset.blockStatus = 'loaded';
}
