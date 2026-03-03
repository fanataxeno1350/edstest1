import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Main header container
  const headerSection = document.createElement('section');
  headerSection.className = 'header-position-relative header-mb-15';
  moveInstrumentation(block, headerSection);

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', block.children[0].children[0].textContent.trim());
  appNameSpan.textContent = block.children[0].children[0].textContent.trim();
  headerSection.append(appNameSpan);

  // Header bar
  const headerBar = document.createElement('header');
  headerBar.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  moveInstrumentation(block.children[1], headerBar);

  // Header Left (empty div in HTML, but blockJson has logoImage and logoAlt)
  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  // The block JSON implies a logo image here, but the HTML is empty. 
  // For now, we'll keep it empty as per the provided HTML structure.
  headerBar.append(headerLeftDiv);

  // Header Center (Logo)
  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-d-flex header-justify-content-center header-w-25';
  const logoLink = document.createElement('a');
  logoLink.href = block.children[0].children[1].querySelector('a').href;
  logoLink.className = 'header-analytics_cta_click';
  logoLink.setAttribute('data-ct', '');
  logoLink.setAttribute('a-label', 'header-logo-boing');
  moveInstrumentation(block.children[0].children[1].querySelector('a'), logoLink);

  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  const logoImg = block.children[0].children[1].querySelector('img');
  if (logoImg) {
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt);
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
    optimizedLogoPic.querySelector('img').className = 'header-header__logo-img';
    optimizedLogoPic.querySelector('img').setAttribute('fetchpriority', 'high');
    optimizedLogoPic.querySelector('img').setAttribute('loading', 'eager');
    logoDiv.append(optimizedLogoPic);
  }
  logoLink.append(logoDiv);
  headerCenterDiv.append(logoLink);
  headerBar.append(headerCenterDiv);

  // Header Right (Login Button)
  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginLink = block.children[0].children[2].querySelector('a');
  if (loginLink) {
    const newLoginLink = document.createElement('a');
    newLoginLink.href = loginLink.href;
    newLoginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
    newLoginLink.style.display = 'inline';
    moveInstrumentation(loginLink, newLoginLink);

    const loginButton = document.createElement('button');
    loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = loginLink.textContent.trim();
    newLoginLink.append(loginButton);
    headerRightDiv.append(newLoginLink);
  }
  headerBar.append(headerRightDiv);
  headerSection.append(headerBar);

  // Submenu Container (Sidebar)
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  moveInstrumentation(block.children[2], submenuContainer);

  const sidebarAside = document.createElement('aside');
  sidebarAside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';
  moveInstrumentation(block.children[2].children[0], sidebarAside);

  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  // Sidebar Menu Items
  const sidebarMenuItems = block.children[2].children[0].children[0].querySelectorAll('li');
  sidebarMenuItems.forEach((item) => {
    const li = document.createElement('li');
    li.className = item.className;
    moveInstrumentation(item, li);

    const link = item.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = link.className;
      newLink.setAttribute('data-consent', link.getAttribute('data-consent'));
      newLink.setAttribute('data-link', link.getAttribute('data-link'));
      moveInstrumentation(link, newLink);

      const img = link.querySelector('img');
      if (img) {
        const optimizedIconPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedIconPic.querySelector('img'));
        optimizedIconPic.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
        optimizedIconPic.querySelector('img').setAttribute('loading', 'lazy');
        newLink.append(optimizedIconPic);
      }
      newLink.append(link.textContent.trim());
      li.append(newLink);
    }
    sidebarMenuUl.append(li);
  });
  sidebarAside.append(sidebarMenuUl);

  // Sidebar curve
  const sidebarCurveDiv = document.createElement('div');
  sidebarCurveDiv.className = 'header-sidebar__curve';
  sidebarAside.append(sidebarCurveDiv);

  // Footer Brand
  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrandDiv.setAttribute('data-isdoodlevariation', 'false');
  moveInstrumentation(block.children[2].children[0].children[2], footerBrandDiv);

  // Footer Primary Section
  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.className = 'header-footer-brand__primary';
  footerPrimarySection.style.backgroundColor = '';
  moveInstrumentation(block.children[2].children[0].children[2].children[0], footerPrimarySection);

  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.className = 'header-container';

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  // Footer Left (Logos)
  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const itcLink = block.children[2].children[0].children[2].children[0].children[0].children[0].children[0].querySelector('a');
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
      const optimizedItcPic = createOptimizedPicture(itcImg.src, itcImg.alt);
      moveInstrumentation(itcImg, optimizedItcPic.querySelector('img'));
      optimizedItcPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      optimizedItcPic.querySelector('img').setAttribute('loading', 'lazy');
      newItcLink.append(optimizedItcPic);
    }
    footerBrandLeft.append(newItcLink);
  }

  const fssiDiv = block.children[2].children[0].children[2].children[0].children[0].children[0].children[1];
  if (fssiDiv) {
    const newFssiDiv = document.createElement('div');
    newFssiDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
    moveInstrumentation(fssiDiv, newFssiDiv);

    const fssiImg = fssiDiv.querySelector('img');
    if (fssiImg) {
      const optimizedFssiPic = createOptimizedPicture(fssiImg.src, fssiImg.alt);
      moveInstrumentation(fssiImg, optimizedFssiPic.querySelector('img'));
      optimizedFssiPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
      optimizedFssiPic.querySelector('img').setAttribute('loading', 'lazy');
      newFssiDiv.append(optimizedFssiPic);
    }
    footerBrandLeft.append(newFssiDiv);
  }
  footerPrimaryContent.append(footerBrandLeft);

  // Footer Right (Navigation)
  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';
  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');
  moveInstrumentation(block.children[2].children[0].children[2].children[0].children[0].children[1].children[0], footerNav);

  const footerNavLeft = document.createElement('div');
  footerNavLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';

  // Footer Lists
  const footerLists = block.children[2].children[0].children[2].children[0].children[0].children[1].querySelectorAll('.header-footerList');
  footerLists.forEach((footerListDiv, index) => {
    const newFooterListDiv = document.createElement('div');
    newFooterListDiv.className = 'header-footerList';
    moveInstrumentation(footerListDiv, newFooterListDiv);

    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

    const listItems = footerListDiv.querySelectorAll('li');
    listItems.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'header-footer-list__item';
      moveInstrumentation(item, li);

      const link = item.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = link.className;
        newLink.setAttribute('data-link-region', link.getAttribute('data-link-region'));
        if (link.target) {
          newLink.target = link.target;
        }
        newLink.textContent = link.textContent.trim();
        moveInstrumentation(link, newLink);
        li.append(newLink);
      }
      ul.append(li);
    });
    newFooterListDiv.append(ul);
    if (index < 2) { // Assuming first two go to footerNavLeft
      footerNavLeft.append(newFooterListDiv);
    }
  });
  footerNav.append(footerNavLeft);

  const footerNavRight = document.createElement('div');
  footerNavRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  // Append remaining footer lists to footerNavRight
  footerLists.forEach((footerListDiv, index) => {
    if (index >= 2) { // Assuming remaining two go to footerNavRight
      const newFooterListDiv = document.createElement('div');
      newFooterListDiv.className = 'header-footerList';
      moveInstrumentation(footerListDiv, newFooterListDiv);

      const ul = document.createElement('ul');
      ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

      const listItems = footerListDiv.querySelectorAll('li');
      listItems.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'header-footer-list__item';
        moveInstrumentation(item, li);

        const link = item.querySelector('a');
        if (link) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.className = link.className;
          newLink.setAttribute('data-link-region', link.getAttribute('data-link-region'));
          if (link.target) {
            newLink.target = link.target;
          }
          newLink.textContent = link.textContent.trim();
          moveInstrumentation(link, newLink);
          li.append(newLink);
        }
        ul.append(li);
      });
      newFooterListDiv.append(ul);
      footerNavRight.append(newFooterListDiv);
    }
  });
  footerNav.append(footerNavRight);

  footerBrandRight.append(footerNav);
  footerPrimaryContent.append(footerBrandRight);
  footerPrimaryContainer.append(footerPrimaryContent);
  footerPrimarySection.append(footerPrimaryContainer);
  footerBrandDiv.append(footerPrimarySection);

  // Footer Secondary Section
  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.className = 'header-footer-brand__secondary';
  footerSecondarySection.style.backgroundColor = '';
  moveInstrumentation(block.children[2].children[0].children[2].children[1], footerSecondarySection);

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  // Footer Right (Social Media)
  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  moveInstrumentation(block.children[2].children[0].children[2].children[1].children[0].children[0].children[0], socialMediaSection);

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialUl = document.createElement('ul');
  socialUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const socialItems = block.children[2].children[0].children[2].children[1].children[0].children[0].children[0].querySelectorAll('li');
  socialItems.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
    moveInstrumentation(item, li);

    const link = item.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = link.className;
      newLink.target = '_blank';
      newLink.setAttribute('data-cta-region', link.getAttribute('data-cta-region'));
      newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));
      newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name'));
      newLink.setAttribute('data-social-linktype', link.getAttribute('data-social-linktype'));
      moveInstrumentation(link, newLink);

      const img = link.querySelector('img');
      if (img) {
        const optimizedSocialPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedSocialPic.querySelector('img'));
        optimizedSocialPic.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label'));
        optimizedSocialPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
        optimizedSocialPic.querySelector('img').setAttribute('loading', 'lazy');
        newLink.append(optimizedSocialPic);
      }
      li.append(newLink);
    }
    socialUl.append(li);
  });
  socialMediaSection.append(socialUl);
  footerSecondaryContent.append(socialMediaSection);

  // Footer Left (ITC Portal & Copyright)
  const footerLeftSection = document.createElement('section');
  footerLeftSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  moveInstrumentation(block.children[2].children[0].children[2].children[1].children[0].children[1], footerLeftSection);

  const footerLeftUl = document.createElement('ul');
  footerLeftUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  const itcPortalLi = document.createElement('li');
  itcPortalLi.className = 'header-footer-brand__left--item header-foot_link';
  const itcPortalLink = block.children[2].children[0].children[2].children[1].children[0].children[1].children[0].children[0].querySelector('a');
  if (itcPortalLink) {
    const newItcPortalLink = document.createElement('a');
    newItcPortalLink.href = itcPortalLink.href;
    newItcPortalLink.target = '_blank';
    newItcPortalLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
    newItcPortalLink.setAttribute('data-cta-region', 'Footer');
    newItcPortalLink.textContent = itcPortalLink.textContent.trim();
    moveInstrumentation(itcPortalLink, newItcPortalLink);
    itcPortalLi.append(newItcPortalLink);
  }
  footerLeftUl.append(itcPortalLi);
  footerLeftSection.append(footerLeftUl);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = block.children[2].children[0].children[2].children[1].children[0].children[1].children[1].querySelector('span').textContent.trim();
  moveInstrumentation(block.children[2].children[0].children[2].children[1].children[0].children[1].children[1].querySelector('span'), copyrightSpan);
  copyrightDiv.append(copyrightSpan);
  footerLeftSection.append(copyrightDiv);
  footerSecondaryContent.append(footerLeftSection);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondarySection.append(footerSecondaryContainer);
  footerBrandDiv.append(footerSecondarySection);

  sidebarAside.append(footerBrandDiv);
  submenuContainer.append(sidebarAside);

  // Overlay
  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  moveInstrumentation(block.children[3], overlayDiv);
  submenuContainer.append(overlayDiv);

  headerSection.append(submenuContainer);

  block.textContent = '';
  block.append(headerSection);
}
