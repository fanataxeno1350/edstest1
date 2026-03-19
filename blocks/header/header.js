import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');

  const menuItems = block.querySelectorAll('[data-aue-model="menuItem"]');

  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const footerSocials = block.querySelectorAll('[data-aue-model="footerSocial"]');
  const copyright = block.querySelector('[data-aue-prop="copyright"]');

  const headerSection = document.createElement('section');
  headerSection.className = 'header-position-relative header-mb-15';

  // App Name
  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'header-d-none header-app-name';
    appNameSpan.dataset.appName = appName.textContent.trim();
    appNameSpan.textContent = appName.textContent.trim();
    headerSection.append(appNameSpan);
    moveInstrumentation(appName, appNameSpan);
  }

  // Header
  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const headerDiv1 = document.createElement('div');
  headerDiv1.className = 'header-d-flex header-w-25';
  header.append(headerDiv1);

  const headerDiv2 = document.createElement('div');
  headerDiv2.className = 'header-d-flex  header-justify-content-center header-w-25';

  if (logoLink && logoImage) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href;
    logoAnchor.className = 'header-analytics_cta_click';
    logoAnchor.dataset.ct = '';
    logoAnchor.ariaLabel = 'header-logo-boing';

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header__logo header-d-flex header-align-items-center';

    const picture = createOptimizedPicture(logoImage.src, logoImage.alt, true, [{ width: '150' }]);
    picture.querySelector('img').className = 'header__logo-img';
    logoDiv.append(picture);
    logoAnchor.append(logoDiv);
    headerDiv2.append(logoAnchor);

    moveInstrumentation(logoLink, logoAnchor);
    moveInstrumentation(logoImage, picture);
  }
  header.append(headerDiv2);

  const headerDiv3 = document.createElement('div');
  headerDiv3.className = 'header-d-flex header-w-25 header-justify-content-end';

  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href;
    loginAnchor.className = 'header__login-btn-wrapper header-analytics_cta_click';
    loginAnchor.style.display = 'inline';

    const loginButton = document.createElement('button');
    loginButton.className = 'header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = loginLink.textContent.trim();
    loginAnchor.append(loginButton);
    headerDiv3.append(loginAnchor);
    moveInstrumentation(loginLink, loginAnchor);
  }
  header.append(headerDiv3);
  headerSection.append(header);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const ul = document.createElement('ul');
  ul.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  menuItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'header-sidebar__menu-item   header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    const label = itemNode.querySelector('[data-aue-prop="label"]');

    if (link && icon && label) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-sidebar__menu-link  header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      anchor.dataset.consent = 'false'; // Assuming default
      anchor.dataset.link = link.dataset.link;

      const picture = createOptimizedPicture(icon.src, icon.alt);
      picture.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      anchor.append(picture);
      anchor.append(label.textContent.trim());
      li.append(anchor);

      moveInstrumentation(link, anchor);
      moveInstrumentation(icon, picture);
      moveInstrumentation(label, anchor);
    } else if (link && label) {
      // Handle logout link which might not have an icon
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-sidebar__menu-link header-sidebar__menu-item--logout-btn header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      anchor.dataset.consent = 'false';
      anchor.dataset.link = link.dataset.link;
      anchor.textContent = label.textContent.trim();
      li.append(anchor);

      if (itemNode.classList.contains('header-sidebar__menu-item--logout')) {
        li.className = 'header-sidebar__menu-item  header-sidebar__menu-item--logout header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
        li.style.display = 'none';
      }
      moveInstrumentation(link, anchor);
      moveInstrumentation(label, anchor);
    }

    ul.append(li);
    moveInstrumentation(itemNode, li);
  });
  aside.append(ul);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  // Footer Brand
  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.dataset.isdoodlevariation = 'false';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand__primary';
  footerBrandPrimary.style.backgroundColor = '';

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';

  const footerContent = document.createElement('div');
  footerContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerLeft = document.createElement('section');
  footerLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  if (footerLogo1) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.href = footerLogo1.href || '#'; // Fallback href
    logo1Anchor.target = '_blank';
    logo1Anchor.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    logo1Anchor.dataset.ctaRegion = 'Footer';
    logo1Anchor.ariaLabel = footerLogo1.alt || 'Logo';

    const picture = createOptimizedPicture(footerLogo1.src, footerLogo1.alt);
    picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    logo1Anchor.append(picture);
    footerLeft.append(logo1Anchor);
    moveInstrumentation(footerLogo1, picture);
  }

  if (footerLogo2) {
    const logo2Div = document.createElement('div');
    logo2Div.className = 'header-footer-brand__secondary--logo header-d-inline-block';

    const picture = createOptimizedPicture(footerLogo2.src, footerLogo2.alt);
    picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
    logo2Div.append(picture);
    footerLeft.append(logo2Div);
    moveInstrumentation(footerLogo2, picture);
  }
  footerContent.append(footerLeft);

  const footerRight = document.createElement('section');
  footerRight.className = 'header-footer-brand__right';

  const nav = document.createElement('nav');
  nav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  nav.ariaLabel = 'footer navbar';

  const navbarLeft = document.createElement('div');
  navbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';

  // Group footer links into 4 columns (assuming 3 links per column for now based on authored HTML)
  const linksPerColumn = Math.ceil(footerLinks.length / 4);
  let currentLinkIndex = 0;

  for (let i = 0; i < 4; i += 1) {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    const footerListUl = document.createElement('ul');
    footerListUl.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

    for (let j = 0; j < linksPerColumn && currentLinkIndex < footerLinks.length; j += 1) {
      const itemNode = footerLinks[currentLinkIndex];
      const link = itemNode.querySelector('[data-aue-prop="link"]');
      const label = itemNode.querySelector('[data-aue-prop="label"]');

      if (link && label) {
        const li = document.createElement('li');
        li.className = 'header-footer-list__item';

        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        anchor.dataset.linkRegion = 'Footer List';
        anchor.textContent = label.textContent.trim();
        if (link.target) {
          anchor.target = link.target;
        }

        li.append(anchor);
        footerListUl.append(li);
        moveInstrumentation(link, anchor);
        moveInstrumentation(label, anchor);
        moveInstrumentation(itemNode, li);
      }
      currentLinkIndex += 1;
    }

    if (footerListUl.children.length > 0) {
      footerListDiv.append(footerListUl);
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
  nav.append(navbarLeft);
  footerRight.append(nav);
  footerContent.append(footerRight);
  footerContainer.append(footerContent);
  footerBrandPrimary.append(footerContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand__secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'header-container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column  header-justify-content-md-between header-align-items-center';

  const socialRight = document.createElement('section');
  socialRight.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialRight.append(socialTitle);

  const socialUl = document.createElement('ul');
  socialUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  footerSocials.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    if (link && icon) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      anchor.dataset.ctaRegion = 'Footer';
      anchor.dataset.ctaLabel = `footer-${link.href.includes('facebook') ? 'facebook' : link.href.includes('instagram') ? 'instagram' : link.href.includes('youtube') ? 'youtube' : 'social'}`;
      anchor.target = '_blank';
      anchor.dataset.platformName = link.href.includes('facebook') ? 'facebook' : link.href.includes('instagram') ? 'instagram' : link.href.includes('youtube') ? 'youtube' : '';
      anchor.dataset.socialLinktype = 'follow';

      const picture = createOptimizedPicture(icon.src, icon.alt);
      picture.querySelector('img').ariaLabel = icon.alt;
      picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      anchor.append(picture);
      li.append(anchor);

      moveInstrumentation(link, anchor);
      moveInstrumentation(icon, picture);
    }
    socialUl.append(li);
    moveInstrumentation(itemNode, li);
  });
  socialRight.append(socialUl);
  secondaryContent.append(socialRight);

  const copyrightLeft = document.createElement('section');
  copyrightLeft.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const copyrightUl = document.createElement('ul');
  copyrightUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  // Assuming 'ITC portal' is a static link or the first footer link from the original authored content
  const itcPortalLink = block.querySelector('.header-foot_link a');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__left--item header-foot_link';
    const anchor = document.createElement('a');
    anchor.href = itcPortalLink.href;
    anchor.target = '_blank';
    anchor.className = 'header-footer-brand__left--link header-analytics_cta_click';
    anchor.dataset.ctaRegion = 'Footer';
    anchor.textContent = itcPortalLink.textContent.trim();
    li.append(anchor);
    copyrightUl.append(li);
    moveInstrumentation(itcPortalLink, anchor);
  }

  copyrightLeft.append(copyrightUl);

  if (copyright) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
    copyrightSpan.textContent = copyright.textContent.trim();
    copyrightDiv.append(copyrightSpan);
    copyrightLeft.append(copyrightDiv);
    moveInstrumentation(copyright, copyrightSpan);
  }
  secondaryContent.append(copyrightLeft);
  secondaryContainer.append(secondaryContent);
  footerBrandSecondary.append(secondaryContainer);
  footerBrand.append(footerBrandSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  headerSection.append(submenuContainer);

  block.textContent = '';
  block.append(headerSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
