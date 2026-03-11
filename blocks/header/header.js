import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainHeader = document.createElement('header');
  mainHeader.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  moveInstrumentation(block.children[0], mainHeader);

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  mainHeader.append(appNameSpan);

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  mainHeader.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-d-flex header-justify-content-center header-w-25';
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'header-analytics_cta_click';
  logoLink.setAttribute('data-ct', '');
  logoLink.setAttribute('a-label', 'header-logo-boing');
  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  const logoImg = block.querySelector('.header-header__logo-img');
  if (logoImg) {
    const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt);
    moveInstrumentation(logoImg, optimizedLogo.querySelector('img'));
    logoDiv.append(optimizedLogo);
  }
  logoLink.append(logoDiv);
  headerCenterDiv.append(logoLink);
  mainHeader.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginLink = block.querySelector('.header-header__login-btn-wrapper');
  if (loginLink) {
    const newLoginLink = document.createElement('a');
    newLoginLink.href = loginLink.href;
    newLoginLink.className = loginLink.className;
    newLoginLink.style.display = loginLink.style.display;
    const loginButton = document.createElement('button');
    loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = 'Login';
    newLoginLink.append(loginButton);
    headerRightDiv.append(newLoginLink);
  }
  mainHeader.append(headerRightDiv);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const ul = document.createElement('ul');
  ul.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  const headerMenuItems = block.querySelectorAll('.header-sidebar__menu-item');
  headerMenuItems.forEach((item) => {
    const li = document.createElement('li');
    moveInstrumentation(item, li);
    li.className = item.className;
    if (item.style.display) {
      li.style.display = item.style.display;
    }

    const link = item.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = link.className;
      if (link.dataset.consent) {
        newLink.setAttribute('data-consent', link.dataset.consent);
      }
      if (link.dataset.link) {
        newLink.setAttribute('data-link', link.dataset.link);
      }

      const img = link.querySelector('img');
      if (img) {
        const optimizedImg = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedImg.querySelector('img'));
        optimizedImg.querySelector('img').className = img.className;
        optimizedImg.querySelector('img').loading = img.loading;
        newLink.append(optimizedImg);
      }
      newLink.append(link.textContent.trim());
      li.append(newLink);
    }
    ul.append(li);
  });
  aside.append(ul);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const primarySection = document.createElement('section');
  primarySection.className = 'header-footer-brand__primary';
  primarySection.style.backgroundColor = '';

  const containerDiv = document.createElement('div');
  containerDiv.className = 'header-container';

  const primaryContentDiv = document.createElement('div');
  primaryContentDiv.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const itcLink = block.querySelector('.header-footer-brand__left a[href="https://www.itcportal.com/"]');
  if (itcLink) {
    const newItcLink = document.createElement('a');
    newItcLink.href = itcLink.href;
    newItcLink.target = '_blank';
    newItcLink.className = itcLink.className;
    newItcLink.setAttribute('data-cta-region', itcLink.dataset.ctaRegion);
    newItcLink.setAttribute('aria-label', itcLink.ariaLabel);
    const itcImg = itcLink.querySelector('img');
    if (itcImg) {
      const optimizedItcImg = createOptimizedPicture(itcImg.src, itcImg.alt);
      moveInstrumentation(itcImg, optimizedItcImg.querySelector('img'));
      optimizedItcImg.querySelector('img').className = itcImg.className;
      optimizedItcImg.querySelector('img').loading = itcImg.loading;
      newItcLink.append(optimizedItcImg);
    }
    footerBrandLeft.append(newItcLink);
  }

  const fssiDiv = block.querySelector('.header-footer-brand__secondary--logo');
  if (fssiDiv) {
    const newFssiDiv = document.createElement('div');
    newFssiDiv.className = fssiDiv.className;
    const fssiImg = fssiDiv.querySelector('img');
    if (fssiImg) {
      const optimizedFssiImg = createOptimizedPicture(fssiImg.src, fssiImg.alt);
      moveInstrumentation(fssiImg, optimizedFssiImg.querySelector('img'));
      optimizedFssiImg.querySelector('img').className = fssiImg.className;
      optimizedFssiImg.querySelector('img').loading = fssiImg.loading;
      newFssiDiv.append(optimizedFssiImg);
    }
    footerBrandLeft.append(newFssiDiv);
  }
  primaryContentDiv.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';
  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');

  const navLeft = document.createElement('div');
  navLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';

  const footerLists = block.querySelectorAll('.header-footerList');
  footerLists.forEach((footerList, index) => {
    const newFooterListDiv = document.createElement('div');
    newFooterListDiv.className = 'header-footerList';
    const newUl = document.createElement('ul');
    newUl.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

    footerList.querySelectorAll('.header-footer-list__item').forEach((item) => {
      const newLi = document.createElement('li');
      moveInstrumentation(item, newLi);
      newLi.className = item.className;
      const link = item.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = link.className;
        if (link.dataset.linkRegion) {
          newLink.setAttribute('data-link-region', link.dataset.linkRegion);
        }
        if (link.target) {
          newLink.target = link.target;
        }
        newLink.textContent = link.textContent;
        newLi.append(newLink);
      }
      newUl.append(newLi);
    });
    newFooterListDiv.append(newUl);
    if (index < 2) {
      navLeft.append(newFooterListDiv);
    } else {
      // Assuming the structure is two footer lists on the left and two on the right
      if (!navRight) {
        var navRight = document.createElement('div');
        navRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
      }
      navRight.append(newFooterListDiv);
    }
  });

  footerNav.append(navLeft);
  if (navRight) {
    footerNav.append(navRight);
  }
  footerBrandRight.append(footerNav);
  primaryContentDiv.append(footerBrandRight);
  containerDiv.append(primaryContentDiv);
  primarySection.append(containerDiv);
  footerBrand.append(primarySection);

  const secondarySection = document.createElement('section');
  secondarySection.className = 'header-footer-brand__secondary';
  secondarySection.style.backgroundColor = '';

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'header-container';

  const secondaryContentDiv = document.createElement('div');
  secondaryContentDiv.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialUl = document.createElement('ul');
  socialUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  block.querySelectorAll('.header-footer-brand__right--item').forEach((item) => {
    const newLi = document.createElement('li');
    moveInstrumentation(item, newLi);
    newLi.className = item.className;
    const link = item.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = link.className;
      newLink.target = link.target;
      newLink.setAttribute('data-cta-region', link.dataset.ctaRegion);
      newLink.setAttribute('data-cta-label', link.dataset.ctaLabel);
      newLink.setAttribute('data-platform-name', link.dataset.platformName);
      newLink.setAttribute('data-social-linktype', link.dataset.socialLinktype);

      const img = link.querySelector('img');
      if (img) {
        const optimizedImg = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedImg.querySelector('img'));
        optimizedImg.querySelector('img').className = img.className;
        optimizedImg.querySelector('img').loading = img.loading;
        optimizedImg.querySelector('img').setAttribute('aria-label', img.ariaLabel);
        newLink.append(optimizedImg);
      }
      newLi.append(newLink);
    }
    socialUl.append(newLi);
  });
  socialMediaSection.append(socialUl);
  secondaryContentDiv.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const copyrightUl = document.createElement('ul');
  copyrightUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  const itcPortalLi = block.querySelector('.header-footer-brand__left--item.header-foot_link');
  if (itcPortalLi) {
    const newLi = document.createElement('li');
    moveInstrumentation(itcPortalLi, newLi);
    newLi.className = itcPortalLi.className;
    const link = itcPortalLi.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = link.target;
      newLink.className = link.className;
      newLink.setAttribute('data-cta-region', link.dataset.ctaRegion);
      newLink.textContent = link.textContent;
      newLi.append(newLink);
    }
    copyrightUl.append(newLi);
  }
  copyrightSection.append(copyrightUl);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);
  secondaryContentDiv.append(copyrightSection);

  secondaryContainer.append(secondaryContentDiv);
  secondarySection.append(secondaryContainer);
  footerBrand.append(secondarySection);
  aside.append(footerBrand);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(aside, overlayDiv);

  block.textContent = '';
  block.append(mainHeader, submenuContainer);
}
