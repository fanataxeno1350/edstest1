import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const mainLogo = block.querySelector('[data-aue-prop="mainLogo"]');
  const headerLogo = block.querySelector('[data-aue-prop="headerLogo"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const menuItems = block.querySelectorAll('[data-aue-model="headerMenuItem"]');
  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  const copyright = block.querySelector('[data-aue-prop="copyright"]');

  const rootDiv = document.createElement('div');
  rootDiv.className = 'header-position-relative header-mb-15';

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  if (appName) {
    appNameSpan.textContent = appName.textContent;
    moveInstrumentation(appName, appNameSpan);
  }
  rootDiv.append(appNameSpan);

  // Header
  const headerEl = document.createElement('header');
  headerEl.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const headerDiv1 = document.createElement('div');
  headerDiv1.className = 'header-d-flex header-w-25';
  // Main Logo (placeholder, not in authored HTML structure for display)
  if (mainLogo) {
    moveInstrumentation(mainLogo, headerDiv1);
  }
  headerEl.append(headerDiv1);

  const headerDiv2 = document.createElement('div');
  headerDiv2.className = 'header-d-flex header-justify-content-center header-w-25';
  const headerLogoLink = document.createElement('a');
  headerLogoLink.href = '/';
  headerLogoLink.className = 'header-analytics_cta_click';
  headerLogoLink.setAttribute('data-ct', '');
  headerLogoLink.setAttribute('a-label', 'header-logo-boing');
  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  if (headerLogo) {
    const img = headerLogo.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt, true, [{ width: '150' }]);
      picture.querySelector('img').className = 'header-header__logo-img';
      headerLogoDiv.append(picture);
      moveInstrumentation(headerLogo, headerLogoDiv);
    }
  }
  headerLogoLink.append(headerLogoDiv);
  headerDiv2.append(headerLogoLink);
  headerEl.append(headerDiv2);

  const headerDiv3 = document.createElement('div');
  headerDiv3.className = 'header-d-flex header-w-25 header-justify-content-end';
  if (loginLink) {
    const loginAnchor = loginLink.querySelector('a');
    if (loginAnchor) {
      const loginWrapper = document.createElement('a');
      loginWrapper.href = loginAnchor.href;
      loginWrapper.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
      loginWrapper.style.display = 'inline';
      const loginButton = document.createElement('button');
      loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
      loginButton.textContent = loginAnchor.textContent.trim();
      loginWrapper.append(loginButton);
      headerDiv3.append(loginWrapper);
      moveInstrumentation(loginLink, loginWrapper);
    }
  }
  headerEl.append(headerDiv3);
  rootDiv.append(headerEl);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const menuList = document.createElement('ul');
  menuList.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  menuItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    if (item.classList.contains('header-sidebar__menu-item--logout')) {
      listItem.classList.add('header-sidebar__menu-item--logout');
      listItem.style.display = 'none';
    }

    const linkEl = item.querySelector('a');
    const iconEl = item.querySelector('img');

    if (linkEl && iconEl) {
      const anchor = document.createElement('a');
      anchor.href = linkEl.href;
      anchor.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      if (linkEl.classList.contains('header-sidebar__menu-item--logout-btn')) {
        anchor.classList.add('header-sidebar__menu-item--logout-btn');
      }
      if (linkEl.dataset.consent) {
        anchor.setAttribute('data-consent', linkEl.dataset.consent);
      }
      if (linkEl.dataset.link) {
        anchor.setAttribute('data-link', linkEl.dataset.link);
      }

      const iconImg = createOptimizedPicture(iconEl.src, iconEl.alt, false, [{ width: '20' }]);
      iconImg.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      anchor.append(iconImg);
      anchor.append(linkEl.textContent.trim());
      listItem.append(anchor);
      moveInstrumentation(item, listItem);
      moveInstrumentation(linkEl, anchor);
      moveInstrumentation(iconEl, iconImg);
    }
    menuList.append(listItem);
  });
  aside.append(menuList);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  // Footer Brand
  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerPrimary = document.createElement('section');
  footerPrimary.className = 'header-footer-brand__primary';

  const footerContainer1 = document.createElement('div');
  footerContainer1.className = 'header-container';

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerLeft = document.createElement('section');
  footerLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  if (footerLogo1) {
    const logo1Link = document.createElement('a');
    logo1Link.href = 'https://www.itcportal.com/';
    logo1Link.target = '_blank';
    logo1Link.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    logo1Link.setAttribute('data-cta-region', 'Footer');
    logo1Link.setAttribute('aria-label', 'ITC Logo');
    const img1 = footerLogo1.querySelector('img');
    if (img1) {
      const picture1 = createOptimizedPicture(img1.src, img1.alt);
      picture1.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      logo1Link.append(picture1);
      moveInstrumentation(footerLogo1, logo1Link);
    }
    footerLeft.append(logo1Link);
  }

  if (footerLogo2) {
    const logo2Div = document.createElement('div');
    logo2Div.className = 'header-footer-brand__secondary--logo header-d-inline-block';
    const img2 = footerLogo2.querySelector('img');
    if (img2) {
      const picture2 = createOptimizedPicture(img2.src, img2.alt);
      picture2.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
      logo2Div.append(picture2);
      moveInstrumentation(footerLogo2, logo2Div);
    }
    footerLeft.append(logo2Div);
  }
  footerPrimaryContent.append(footerLeft);

  const footerRight = document.createElement('section');
  footerRight.className = 'header-footer-brand__right';

  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';

  // Group footer links into lists (assuming 2 lists for left, 2 for right based on authored structure)
  const footerLists = [[], [], [], []];
  footerLinks.forEach((linkItem, index) => {
    const link = linkItem.querySelector('a');
    if (link) {
      const listItem = document.createElement('li');
      listItem.className = 'header-footer-list__item';
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      anchor.setAttribute('data-link-region', 'Footer List');
      if (link.target) {
        anchor.target = link.target;
      }
      anchor.textContent = link.textContent.trim();
      listItem.append(anchor);
      moveInstrumentation(linkItem, listItem);
      moveInstrumentation(link, anchor);

      // Distribute into 4 lists
      footerLists[index % 4].push(listItem);
    }
  });

  footerLists.forEach((listItems, listIndex) => {
    if (listItems.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'header-footerList';
      const ul = document.createElement('ul');
      ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
      listItems.forEach(item => ul.append(item));
      footerListDiv.append(ul);
      if (listIndex < 2) {
        footerNavbarLeft.append(footerListDiv);
      } else {
        if (!footerNav.querySelector('.header-footer-brand__navbar--right')) {
          const footerNavbarRight = document.createElement('div');
          footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
          footerNav.append(footerNavbarRight);
        }
        footerNav.querySelector('.header-footer-brand__navbar--right').append(footerListDiv);
      }
    }
  });

  footerNav.prepend(footerNavbarLeft); // Ensure left part is appended first
  footerRight.append(footerNav);
  footerPrimaryContent.append(footerRight);
  footerContainer1.append(footerPrimaryContent);
  footerPrimary.append(footerContainer1);
  footerBrand.append(footerPrimary);

  // Footer Secondary
  const footerSecondary = document.createElement('section');
  footerSecondary.className = 'header-footer-brand__secondary';

  const footerContainer2 = document.createElement('div');
  footerContainer2.className = 'header-container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const footerRight2 = document.createElement('section');
  footerRight2.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  footerRight2.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  socialLinks.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const linkEl = item.querySelector('a');
    const iconEl = item.querySelector('img');

    if (linkEl && iconEl) {
      const anchor = document.createElement('a');
      anchor.href = linkEl.href;
      anchor.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${iconEl.alt.toLowerCase()}`);
      anchor.target = '_blank';
      anchor.setAttribute('data-platform-name', iconEl.alt.toLowerCase());
      anchor.setAttribute('data-social-linktype', 'follow');

      const iconImg = createOptimizedPicture(iconEl.src, iconEl.alt);
      iconImg.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      iconImg.querySelector('img').setAttribute('aria-label', iconEl.alt.toLowerCase());
      anchor.append(iconImg);
      listItem.append(anchor);
      moveInstrumentation(item, listItem);
      moveInstrumentation(linkEl, anchor);
      moveInstrumentation(iconEl, iconImg);
    }
    socialList.append(listItem);
  });
  footerRight2.append(socialList);
  footerSecondaryContent.append(footerRight2);

  const footerLeft2 = document.createElement('section');
  footerLeft2.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const footerLeftList = document.createElement('ul');
  footerLeftList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  if (itcPortalLink) {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-brand__left--item header-foot_link';
    const link = itcPortalLink.querySelector('a');
    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.target = '_blank';
      anchor.className = 'header-footer-brand__left--link header-analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.textContent = link.textContent.trim();
      listItem.append(anchor);
      moveInstrumentation(itcPortalLink, listItem);
      moveInstrumentation(link, anchor);
    }
    footerLeftList.append(listItem);
  }
  footerLeft2.append(footerLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  if (copyright) {
    copyrightSpan.innerHTML = copyright.innerHTML;
    moveInstrumentation(copyright, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  footerLeft2.append(copyrightDiv);
  footerSecondaryContent.append(footerLeft2);

  footerContainer2.append(footerSecondaryContent);
  footerSecondary.append(footerContainer2);
  footerBrand.append(footerSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  rootDiv.append(submenuContainer);

  block.textContent = '';
  block.append(rootDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
