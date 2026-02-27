import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainSection = document.createElement('section');
  moveInstrumentation(block, mainSection);
  mainSection.className = 'header-position-relative header-mb-15';

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  mainSection.append(appNameSpan);

  // Header Section
  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  mainSection.append(header);

  const headerDiv1 = document.createElement('div');
  headerDiv1.className = 'header-d-flex header-w-25';
  header.append(headerDiv1);

  const headerDiv2 = document.createElement('div');
  headerDiv2.className = 'header-d-flex header-justify-content-center header-w-25';
  header.append(headerDiv2);

  const headerDiv3 = document.createElement('div');
  headerDiv3.className = 'header-d-flex header-w-25 header-justify-content-end';
  header.append(headerDiv3);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  mainSection.append(submenuContainer);

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';
  submenuContainer.append(aside);

  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  aside.append(sidebarMenuUl);

  const sidebarCurveDiv = document.createElement('div');
  sidebarCurveDiv.className = 'header-sidebar__curve';
  aside.append(sidebarCurveDiv);

  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrandDiv.setAttribute('data-isdoodlevariation', 'false');
  aside.append(footerBrandDiv);

  const footerBrandPrimarySection = document.createElement('section');
  footerBrandPrimarySection.className = 'header-footer-brand__primary';
  footerBrandPrimarySection.style.backgroundColor = '';
  footerBrandDiv.append(footerBrandPrimarySection);

  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.className = 'header-container';
  footerBrandPrimarySection.append(footerPrimaryContainer);

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';
  footerPrimaryContainer.append(footerPrimaryContent);

  const footerBrandLeftSection = document.createElement('section');
  footerBrandLeftSection.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';
  footerPrimaryContent.append(footerBrandLeftSection);

  const footerBrandRightSection = document.createElement('section');
  footerBrandRightSection.className = 'header-footer-brand__right';
  footerPrimaryContent.append(footerBrandRightSection);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRightSection.append(footerBrandNavbar);

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';
  footerBrandNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  footerBrandNavbar.append(footerNavbarRight);

  const footerBrandSecondarySection = document.createElement('section');
  footerBrandSecondarySection.className = 'header-footer-brand__secondary';
  footerBrandSecondarySection.style.backgroundColor = '';
  footerBrandDiv.append(footerBrandSecondarySection);

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  footerBrandSecondarySection.append(footerSecondaryContainer);

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';
  footerSecondaryContainer.append(footerSecondaryContent);

  const footerSecondaryRightSection = document.createElement('section');
  footerSecondaryRightSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  footerSecondaryContent.append(footerSecondaryRightSection);

  const footerSecondaryLeftSection = document.createElement('section');
  footerSecondaryLeftSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  footerSecondaryContent.append(footerSecondaryLeftSection);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  // Process block children
  [...block.children].forEach((row, index) => {
    if (index === 0) {
      // Header content
      const cells = [...row.children];

      // Logo Image
      const logoLink = cells[0].querySelector('a');
      const logoImg = cells[0].querySelector('img');
      if (logoLink && logoImg) {
        const newLogoLink = document.createElement('a');
        newLogoLink.href = logoLink.href;
        newLogoLink.className = 'header-analytics_cta_click';
        newLogoLink.setAttribute('data-ct', '');
        newLogoLink.setAttribute('a-label', 'header-logo-boing');
        moveInstrumentation(logoLink, newLogoLink);

        const logoDiv = document.createElement('div');
        logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
        newLogoLink.append(logoDiv);

        const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt);
        optimizedLogoPic.querySelector('img').className = 'header-header__logo-img';
        optimizedLogoPic.querySelector('img').setAttribute('fetchpriority', 'high');
        optimizedLogoPic.querySelector('img').setAttribute('loading', 'eager');
        moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
        logoDiv.append(optimizedLogoPic);

        headerDiv2.append(newLogoLink);
      }

      // Login Button
      const loginLink = cells[1].querySelector('a');
      const loginButton = cells[1].querySelector('button');
      if (loginLink && loginButton) {
        const newLoginLink = document.createElement('a');
        newLoginLink.href = loginLink.href;
        newLoginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
        newLoginLink.style.display = 'inline';
        moveInstrumentation(loginLink, newLoginLink);

        const newLoginButton = document.createElement('button');
        newLoginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
        newLoginButton.textContent = loginButton.textContent.trim();
        moveInstrumentation(loginButton, newLoginButton);
        newLoginLink.append(newLoginButton);
        headerDiv3.append(newLoginLink);
      }
    } else if (row.getAttribute('data-model-id') === 'sidebarMenuItem') {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

      const link = row.querySelector('a');
      const img = row.querySelector('img');
      if (link && img) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
        newLink.setAttribute('data-consent', link.getAttribute('data-consent') || 'false');
        newLink.setAttribute('data-link', link.getAttribute('data-link') || link.href);
        moveInstrumentation(link, newLink);

        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
        optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        newLink.append(optimizedPic);
        newLink.append(document.createTextNode(link.textContent.trim()));
        li.append(newLink);
      }
      sidebarMenuUl.append(li);
    } else if (row.getAttribute('data-model-id') === 'footerNavItem') {
      const label = row.children[0].textContent.trim();
      const link = row.children[1].querySelector('a');

      let targetUl = footerNavbarLeft.querySelector('.header-footerList:nth-child(1) .header-footer-list');
      if (!targetUl) {
        const footerListDiv = document.createElement('div');
        footerListDiv.className = 'header-footerList';
        footerNavbarLeft.append(footerListDiv);
        targetUl = document.createElement('ul');
        targetUl.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
        footerListDiv.append(targetUl);
      }

      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.className = 'header-footer-list__item';

      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      newLink.setAttribute('data-link-region', 'Footer List');
      if (link.target) newLink.target = link.target;
      newLink.textContent = label;
      moveInstrumentation(link, newLink);
      li.append(newLink);
      targetUl.append(li);

    } else if (row.getAttribute('data-model-id') === 'footerSocialLink') {
      const img = row.children[0].querySelector('img');
      const link = row.children[1].querySelector('a');

      let socialUl = footerSecondaryRightSection.querySelector('.header-footer-brand__right--list');
      if (!socialUl) {
        const title = document.createElement('h3');
        title.className = 'header-social_media--title';
        title.textContent = 'Follow Us On';
        footerSecondaryRightSection.append(title);

        socialUl = document.createElement('ul');
        socialUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';
        footerSecondaryRightSection.append(socialUl);
      }

      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.setAttribute('data-cta-label', `footer-${img.alt.toLowerCase()}`);
      newLink.setAttribute('target', '_blank');
      newLink.setAttribute('data-platform-name', img.alt.toLowerCase());
      newLink.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(link, newLink);

      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      optimizedPic.querySelector('img').setAttribute('aria-label', img.alt.toLowerCase());
      optimizedPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      newLink.append(optimizedPic);
      li.append(newLink);
      socialUl.append(li);
    }
  });

  // Footer Copyright
  const lastRow = [...block.children][block.children.length - 1];
  if (lastRow && lastRow.getAttribute('data-model-id') !== 'sidebarMenuItem' && lastRow.getAttribute('data-model-id') !== 'footerNavItem' && lastRow.getAttribute('data-model-id') !== 'footerSocialLink') {
    const copyrightText = lastRow.children[0].textContent.trim();

    let copyrightUl = footerSecondaryLeftSection.querySelector('.header-footer-brand__left--list');
    if (!copyrightUl) {
      copyrightUl = document.createElement('ul');
      copyrightUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
      footerSecondaryLeftSection.append(copyrightUl);
    }

    // Example of a static link that might be in the last row if it's not a model item
    const itcLink = lastRow.querySelector('a');
    if (itcLink) {
      const li = document.createElement('li');
      li.className = 'header-footer-brand__left--item header-foot_link';
      const newLink = document.createElement('a');
      newLink.href = itcLink.href;
      newLink.target = '_blank';
      newLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.textContent = itcLink.textContent.trim();
      moveInstrumentation(itcLink, newLink);
      li.append(newLink);
      copyrightUl.append(li);
    }

    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
    copyrightSpan.textContent = copyrightText;
    copyrightDiv.append(copyrightSpan);
    footerSecondaryLeftSection.append(copyrightDiv);
  }

  block.textContent = '';
  block.append(mainSection);
}
