import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Main header container
  const headerSection = document.createElement('section');
  headerSection.className = 'header-position-relative header-mb-15';
  moveInstrumentation(block, headerSection);

  // App Name (hidden)
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', block.children[0].children[0].textContent.trim());
  appNameSpan.textContent = block.children[0].children[0].textContent.trim();
  headerSection.append(appNameSpan);

  // Header bar
  const headerBar = document.createElement('header');
  headerBar.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  headerSection.append(headerBar);

  // Left div (empty in provided HTML, but structured for potential future content)
  const leftDiv = document.createElement('div');
  leftDiv.className = 'header-d-flex header-w-25';
  headerBar.append(leftDiv);

  // Center div (Logo)
  const centerDiv = document.createElement('div');
  centerDiv.className = 'header-d-flex header-justify-content-center header-w-25';
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'header-analytics_cta_click';
  logoLink.setAttribute('data-ct', '');
  logoLink.setAttribute('aria-label', 'header-logo-boing');
  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  const logoImg = block.children[0].children[1].querySelector('img');
  if (logoImg) {
    const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt, true, [{ width: '100' }]);
    moveInstrumentation(logoImg, optimizedLogo.querySelector('img'));
    optimizedLogo.querySelector('img').className = 'header-header__logo-img';
    logoDiv.append(optimizedLogo);
  }
  logoLink.append(logoDiv);
  centerDiv.append(logoLink);
  headerBar.append(centerDiv);

  // Right div (Login Button)
  const rightDiv = document.createElement('div');
  rightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginLink = document.createElement('a');
  loginLink.href = block.children[0].children[3].querySelector('a')?.href || '#';
  loginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
  loginLink.style.display = 'inline';
  const loginButton = document.createElement('button');
  loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
  loginButton.textContent = block.children[0].children[2].textContent.trim();
  loginLink.append(loginButton);
  rightDiv.append(loginLink);
  headerBar.append(rightDiv);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  headerSection.append(submenuContainer);

  // Aside (Sidebar)
  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';
  submenuContainer.append(aside);

  // Sidebar Menu
  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  aside.append(sidebarMenuUl);

  const menuItems = block.children[1].children;
  [...menuItems].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    if (row.children[2].textContent.trim() === 'Logout') {
      li.classList.add('header-sidebar__menu-item--logout');
      li.style.display = 'none';
    }

    const link = row.children[1].querySelector('a');
    const img = row.children[0].querySelector('img');

    if (link && img) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      newLink.setAttribute('data-consent', link.getAttribute('data-consent'));
      newLink.setAttribute('data-link', link.getAttribute('data-link'));
      if (link.textContent.trim() === 'Logout') {
        newLink.classList.add('header-sidebar__menu-item--logout-btn');
      }

      const optimizedIcon = createOptimizedPicture(img.src, img.alt, false, [{ width: '20' }]);
      moveInstrumentation(img, optimizedIcon.querySelector('img'));
      optimizedIcon.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      newLink.append(optimizedIcon);
      newLink.append(document.createTextNode(link.textContent.trim()));
      li.append(newLink);
    }
    sidebarMenuUl.append(li);
  });

  // Sidebar Curve
  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  // Footer Brand
  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrandDiv.setAttribute('data-isdoodlevariation', 'false');
  aside.append(footerBrandDiv);

  // Footer Brand Primary
  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.className = 'header-footer-brand__primary';
  footerPrimarySection.style.backgroundColor = '';
  footerBrandDiv.append(footerPrimarySection);

  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.className = 'header-container';
  footerPrimarySection.append(footerPrimaryContainer);

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';
  footerPrimaryContainer.append(footerPrimaryContent);

  // Footer Brand Left (Logos)
  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';
  footerPrimaryContent.append(footerBrandLeft);

  const footerLogo1Link = document.createElement('a');
  footerLogo1Link.href = block.children[2].children[0].querySelector('a')?.href || '#';
  footerLogo1Link.target = '_blank';
  footerLogo1Link.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
  footerLogo1Link.setAttribute('data-cta-region', 'Footer');
  footerLogo1Link.setAttribute('aria-label', 'ITC Logo');
  const footerLogo1Img = block.children[2].children[0].querySelector('img');
  if (footerLogo1Img) {
    const optimizedFooterLogo1 = createOptimizedPicture(footerLogo1Img.src, footerLogo1Img.alt);
    moveInstrumentation(footerLogo1Img, optimizedFooterLogo1.querySelector('img'));
    optimizedFooterLogo1.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    footerLogo1Link.append(optimizedFooterLogo1);
  }
  footerBrandLeft.append(footerLogo1Link);

  const footerLogo2Div = document.createElement('div');
  footerLogo2Div.className = 'header-footer-brand__secondary--logo header-d-inline-block';
  const footerLogo2Img = block.children[2].children[1].querySelector('img');
  if (footerLogo2Img) {
    const optimizedFooterLogo2 = createOptimizedPicture(footerLogo2Img.src, footerLogo2Img.alt);
    moveInstrumentation(footerLogo2Img, optimizedFooterLogo2.querySelector('img'));
    optimizedFooterLogo2.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
    footerLogo2Div.append(optimizedFooterLogo2);
  }
  footerBrandLeft.append(footerLogo2Div);

  // Footer Brand Right (Navigation)
  const footerBrandRightNav = document.createElement('section');
  footerBrandRightNav.className = 'header-footer-brand__right';
  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');
  footerBrandRightNav.append(footerNav);

  const footerNavLeft = document.createElement('div');
  footerNavLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';
  footerNav.append(footerNavLeft);

  // Footer Lists
  const footerLists = block.children[3].children;
  [...footerLists].forEach((footerListRow) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
    [...footerListRow.children].forEach((itemCell) => {
      const li = document.createElement('li');
      moveInstrumentation(itemCell, li);
      li.className = 'header-footer-list__item';
      const link = itemCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        newLink.setAttribute('data-link-region', 'Footer List');
        if (link.target) newLink.target = link.target;
        newLink.textContent = link.textContent.trim();
        li.append(newLink);
      }
      ul.append(li);
    });
    footerListDiv.append(ul);
    footerNavLeft.append(footerListDiv);
  });

  footerPrimaryContent.append(footerBrandRightNav);

  // Footer Brand Secondary
  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.className = 'header-footer-brand__secondary';
  footerSecondarySection.style.backgroundColor = '';
  footerBrandDiv.append(footerSecondarySection);

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  footerSecondarySection.append(footerSecondaryContainer);

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';
  footerSecondaryContainer.append(footerSecondaryContent);

  // Footer Brand Right (Social Media)
  const footerSocialMediaSection = document.createElement('section');
  footerSocialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  footerSocialMediaSection.append(socialMediaTitle);

  const socialMediaUl = document.createElement('ul');
  socialMediaUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';
  footerSocialMediaSection.append(socialMediaUl);

  const socialLinks = block.children[4].children;
  [...socialLinks].forEach((socialLinkRow) => {
    const li = document.createElement('li');
    moveInstrumentation(socialLinkRow, li);
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
    const link = socialLinkRow.children[0].querySelector('a');
    const img = socialLinkRow.children[1].querySelector('img');

    if (link && img) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.setAttribute('data-cta-label', `footer-${socialLinkRow.children[2].textContent.trim().toLowerCase()}`);
      newLink.target = '_blank';
      newLink.setAttribute('data-platform-name', socialLinkRow.children[2].textContent.trim().toLowerCase());
      newLink.setAttribute('data-social-linktype', 'follow');

      const optimizedIcon = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedIcon.querySelector('img'));
      optimizedIcon.querySelector('img').setAttribute('aria-label', socialLinkRow.children[2].textContent.trim().toLowerCase());
      optimizedIcon.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      newLink.append(optimizedIcon);
      li.append(newLink);
    }
    socialMediaUl.append(li);
  });
  footerSecondaryContent.append(footerSocialMediaSection);

  // Footer Brand Left (ITC Portal & Copyright)
  const footerBrandLeftBottom = document.createElement('section');
  footerBrandLeftBottom.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  footerSecondaryContent.append(footerBrandLeftBottom);

  const footerLeftUl = document.createElement('ul');
  footerLeftUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  footerBrandLeftBottom.append(footerLeftUl);

  const footerItcLi = document.createElement('li');
  footerItcLi.className = 'header-footer-brand__left--item header-foot_link';
  const itcLink = document.createElement('a');
  itcLink.href = block.children[5].children[0].querySelector('a')?.href || '#';
  itcLink.target = '_blank';
  itcLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
  itcLink.setAttribute('data-cta-region', 'Footer');
  itcLink.textContent = block.children[5].children[0].textContent.trim();
  footerItcLi.append(itcLink);
  footerLeftUl.append(footerItcLi);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = block.children[5].children[1].textContent.trim();
  copyrightDiv.append(copyrightSpan);
  footerBrandLeftBottom.append(copyrightDiv);

  // Overlay
  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  block.textContent = '';
  block.append(headerSection);
}
