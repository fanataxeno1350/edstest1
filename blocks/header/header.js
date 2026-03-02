import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainSection = document.createElement('section');
  mainSection.className = 'header-position-relative header-mb-15';
  moveInstrumentation(block, mainSection);

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  mainSection.append(appNameSpan);

  const headerEl = document.createElement('header');
  headerEl.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  mainSection.append(headerEl);

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  headerEl.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-d-flex header-justify-content-center header-w-25';
  headerEl.append(headerCenterDiv);

  const headerLogoLink = document.createElement('a');
  headerLogoLink.href = '/';
  headerLogoLink.className = 'header-analytics_cta_click';
  headerLogoLink.setAttribute('data-ct', '');
  headerLogoLink.setAttribute('aria-label', 'header-logo-boing');
  headerCenterDiv.append(headerLogoLink);

  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  headerLogoLink.append(headerLogoDiv);

  const headerLogoImg = block.querySelector('.header-header__logo-img');
  if (headerLogoImg) {
    const optimizedHeaderLogo = createOptimizedPicture(headerLogoImg.src, headerLogoImg.alt, true, [{ width: '150' }]);
    moveInstrumentation(headerLogoImg, optimizedHeaderLogo.querySelector('img'));
    headerLogoDiv.append(optimizedHeaderLogo);
  }

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  headerEl.append(headerRightDiv);

  const loginLink = block.querySelector('.header-header__login-btn-wrapper');
  if (loginLink) {
    const newLoginLink = document.createElement('a');
    newLoginLink.href = loginLink.href;
    newLoginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
    newLoginLink.style.display = 'inline';
    moveInstrumentation(loginLink, newLoginLink);

    const loginButton = document.createElement('button');
    loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = 'Login';
    newLoginLink.append(loginButton);
    headerRightDiv.append(newLoginLink);
  }

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  mainSection.append(submenuContainer);

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';
  submenuContainer.append(aside);

  const menuUl = document.createElement('ul');
  menuUl.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  aside.append(menuUl);

  const headerMenuItems = block.querySelectorAll('.header-sidebar__menu-item');
  headerMenuItems.forEach((menuItem) => {
    const li = document.createElement('li');
    li.className = menuItem.className;
    moveInstrumentation(menuItem, li);

    const link = menuItem.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = link.className;
      newLink.setAttribute('data-consent', link.getAttribute('data-consent'));
      newLink.setAttribute('data-link', link.getAttribute('data-link'));
      moveInstrumentation(link, newLink);

      const img = link.querySelector('img');
      if (img) {
        const optimizedImg = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
        moveInstrumentation(img, optimizedImg.querySelector('img'));
        newLink.append(optimizedImg);
      }
      newLink.append(document.createTextNode(link.textContent.trim()));
      li.append(newLink);
    }
    menuUl.append(li);
  });

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrandDiv.setAttribute('data-isdoodlevariation', 'false');
  aside.append(footerBrandDiv);

  const primarySection = document.createElement('section');
  primarySection.className = 'header-footer-brand__primary';
  primarySection.style.backgroundColor = '';
  footerBrandDiv.append(primarySection);

  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'header-container';
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';
  primaryContainer.append(primaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';
  primaryContent.append(footerBrandLeft);

  const itcLink = block.querySelector('a[aria-label="ITC Logo"]');
  if (itcLink) {
    const newItcLink = document.createElement('a');
    newItcLink.href = itcLink.href;
    newItcLink.target = '_blank';
    newItcLink.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    newItcLink.setAttribute('data-cta-region', 'Footer');
    newItcLink.setAttribute('aria-label', 'ITC Logo');
    moveInstrumentation(itcLink, newItcLink);

    const itcImg = itcLink.querySelector('img');
    if (itcImg) {
      const optimizedItcImg = createOptimizedPicture(itcImg.src, itcImg.alt, false, [{ width: '100' }]);
      moveInstrumentation(itcImg, optimizedItcImg.querySelector('img'));
      newItcLink.append(optimizedItcImg);
    }
    footerBrandLeft.append(newItcLink);
  }

  const fssiDiv = block.querySelector('.header-footer-brand__secondary--logo');
  if (fssiDiv) {
    const newFssiDiv = document.createElement('div');
    newFssiDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
    moveInstrumentation(fssiDiv, newFssiDiv);

    const fssiImg = fssiDiv.querySelector('img');
    if (fssiImg) {
      const optimizedFssiImg = createOptimizedPicture(fssiImg.src, fssiImg.alt, false, [{ width: '100' }]);
      moveInstrumentation(fssiImg, optimizedFssiImg.querySelector('img'));
      newFssiDiv.append(optimizedFssiImg);
    }
    footerBrandLeft.append(newFssiDiv);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';
  primaryContent.append(footerBrandRight);

  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNav);

  const footerNavLeft = document.createElement('div');
  footerNavLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';
  footerNav.append(footerNavLeft);

  const footerLists = block.querySelectorAll('.header-footerList');
  footerLists.forEach((footerList, index) => {
    if (index < 2) { // First two footer lists go to footerNavLeft
      const newFooterListDiv = document.createElement('div');
      newFooterListDiv.className = 'header-footerList';
      moveInstrumentation(footerList, newFooterListDiv);

      const ul = document.createElement('ul');
      ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
      newFooterListDiv.append(ul);

      footerList.querySelectorAll('.header-footer-list__item').forEach((item) => {
        const li = document.createElement('li');
        li.className = 'header-footer-list__item';
        moveInstrumentation(item, li);

        const link = item.querySelector('a');
        if (link) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.className = link.className;
          newLink.setAttribute('data-link-region', link.getAttribute('data-link-region'));
          if (link.target) newLink.target = link.target;
          newLink.textContent = link.textContent;
          moveInstrumentation(link, newLink);
          li.append(newLink);
        }
        ul.append(li);
      });
      footerNavLeft.append(newFooterListDiv);
    }
  });

  const footerNavRight = document.createElement('div');
  footerNavRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  footerNav.append(footerNavRight);

  footerLists.forEach((footerList, index) => {
    if (index >= 2) { // Remaining footer lists go to footerNavRight
      const newFooterListDiv = document.createElement('div');
      newFooterListDiv.className = 'header-footerList';
      moveInstrumentation(footerList, newFooterListDiv);

      const ul = document.createElement('ul');
      ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
      newFooterListDiv.append(ul);

      footerList.querySelectorAll('.header-footer-list__item').forEach((item) => {
        const li = document.createElement('li');
        li.className = 'header-footer-list__item';
        moveInstrumentation(item, li);

        const link = item.querySelector('a');
        if (link) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.className = link.className;
          newLink.setAttribute('data-link-region', link.getAttribute('data-link-region'));
          if (link.target) newLink.target = link.target;
          newLink.textContent = link.textContent;
          moveInstrumentation(link, newLink);
          li.append(newLink);
        }
        ul.append(li);
      });
      footerNavRight.append(newFooterListDiv);
    }
  });

  const secondarySection = document.createElement('section');
  secondarySection.className = 'header-footer-brand__secondary';
  secondarySection.style.backgroundColor = '';
  footerBrandDiv.append(secondarySection);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'header-container';
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';
  secondaryContainer.append(secondaryContent);

  const secondaryRight = document.createElement('section');
  secondaryRight.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  secondaryContent.append(secondaryRight);

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  secondaryRight.append(socialTitle);

  const socialUl = document.createElement('ul');
  socialUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';
  secondaryRight.append(socialUl);

  const socialItems = block.querySelectorAll('.header-footer-brand__right--item');
  socialItems.forEach((socialItem) => {
    const li = document.createElement('li');
    li.className = socialItem.className;
    moveInstrumentation(socialItem, li);

    const link = socialItem.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.className = link.className;
      newLink.setAttribute('data-cta-region', link.getAttribute('data-cta-region'));
      newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));
      newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name'));
      newLink.setAttribute('data-social-linktype', link.getAttribute('data-social-linktype'));
      moveInstrumentation(link, newLink);

      const img = link.querySelector('img');
      if (img) {
        const optimizedImg = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
        moveInstrumentation(img, optimizedImg.querySelector('img'));
        newLink.append(optimizedImg);
      }
      li.append(newLink);
    }
    socialUl.append(li);
  });

  const secondaryLeft = document.createElement('section');
  secondaryLeft.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  secondaryContent.append(secondaryLeft);

  const footerLinksUl = document.createElement('ul');
  footerLinksUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  secondaryLeft.append(footerLinksUl);

  const footerFootLink = block.querySelector('.header-foot_link');
  if (footerFootLink) {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__left--item header-foot_link';
    moveInstrumentation(footerFootLink, li);

    const link = footerFootLink.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.className = link.className;
      newLink.setAttribute('data-cta-region', link.getAttribute('data-cta-region'));
      newLink.textContent = link.textContent;
      moveInstrumentation(link, newLink);
      li.append(newLink);
    }
    footerLinksUl.append(li);
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  secondaryLeft.append(copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  block.textContent = '';
  block.append(mainSection);
}
