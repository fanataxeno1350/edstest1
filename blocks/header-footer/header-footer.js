import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  if (appName) {
    moveInstrumentation(appName, block);
    block.prepend(appName);
  }

  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  moveInstrumentation(block.querySelector('header'), header);

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  header.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-d-flex header-justify-content-center header-w-25';
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    const logoAnchor = logoLink.querySelector('a');
    if (logoAnchor) {
      logoAnchor.className = 'header-analytics_cta_click';
      logoAnchor.removeAttribute('data-aue-prop');
      const logoDiv = document.createElement('div');
      logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
      const logoImg = block.querySelector('[data-aue-prop="logoImage"]');
      if (logoImg) {
        const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
        picture.querySelector('img').className = 'header-header__logo-img';
        logoDiv.append(picture);
        moveInstrumentation(logoImg, picture);
      }
      logoAnchor.append(logoDiv);
      headerCenterDiv.append(logoAnchor);
      moveInstrumentation(logoLink, headerCenterDiv);
    }
  }
  header.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  if (loginLink) {
    const loginAnchor = loginLink.querySelector('a');
    if (loginAnchor) {
      loginAnchor.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
      loginAnchor.style.display = 'inline';
      loginAnchor.removeAttribute('data-aue-prop');
      const loginButton = document.createElement('button');
      loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
      loginButton.textContent = loginAnchor.textContent.trim();
      loginAnchor.textContent = '';
      loginAnchor.append(loginButton);
      headerRightDiv.append(loginAnchor);
      moveInstrumentation(loginLink, headerRightDiv);
    }
  }
  header.append(headerRightDiv);
  block.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';
  moveInstrumentation(block.querySelector('aside'), aside);

  const menuList = document.createElement('ul');
  menuList.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  const menuItems = block.querySelectorAll('[data-aue-model="menuItem"]');
  menuItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    if (link) {
      const anchor = link.querySelector('a');
      if (anchor) {
        anchor.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
        anchor.removeAttribute('data-aue-prop');

        const icon = itemNode.querySelector('[data-aue-prop="icon"]');
        if (icon) {
          const img = icon.querySelector('img');
          if (img) {
            img.className = 'header-sidebar__menu-icon header-me-4';
            anchor.prepend(img);
            moveInstrumentation(icon, anchor);
          }
        }

        const label = itemNode.querySelector('[data-aue-prop="label"]');
        if (label) {
          anchor.append(label.textContent.trim());
          moveInstrumentation(label, anchor);
        }
        listItem.append(anchor);
        moveInstrumentation(link, listItem);
      }
    }
    menuList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });
  aside.append(menuList);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');
  moveInstrumentation(block.querySelector('.header-footer-brand'), footerBrand);

  const footerPrimary = document.createElement('section');
  footerPrimary.className = 'header-footer-brand__primary';
  footerPrimary.style.backgroundColor = '';

  const footerContainer1 = document.createElement('div');
  footerContainer1.className = 'header-container';

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerLeftSection = document.createElement('section');
  footerLeftSection.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const footerBrandLogo1 = block.querySelector('[data-aue-prop="footerBrandLogo1"]');
  if (footerBrandLogo1) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.href = 'https://www.itcportal.com/';
    logo1Anchor.target = '_blank';
    logo1Anchor.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    logo1Anchor.setAttribute('data-cta-region', 'Footer');
    logo1Anchor.setAttribute('aria-label', 'ITC Logo');
    const picture = createOptimizedPicture(footerBrandLogo1.src, footerBrandLogo1.alt);
    picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    logo1Anchor.append(picture);
    footerLeftSection.append(logo1Anchor);
    moveInstrumentation(footerBrandLogo1, logo1Anchor);
  }

  const footerBrandLogo2 = block.querySelector('[data-aue-prop="footerBrandLogo2"]');
  if (footerBrandLogo2) {
    const logo2Div = document.createElement('div');
    logo2Div.className = 'header-footer-brand__secondary--logo header-d-inline-block';
    const picture = createOptimizedPicture(footerBrandLogo2.src, footerBrandLogo2.alt);
    picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
    logo2Div.append(picture);
    footerLeftSection.append(logo2Div);
    moveInstrumentation(footerBrandLogo2, logo2Div);
  }
  footerPrimaryContent.append(footerLeftSection);

  const footerRightSection = document.createElement('section');
  footerRightSection.className = 'header-footer-brand__right';

  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const numLinksPerColumn = Math.ceil(footerLinks.length / 4); // Distribute into 4 columns

  let currentColumn = document.createElement('div');
  currentColumn.className = 'header-footerList';
  let currentList = document.createElement('ul');
  currentList.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

  footerLinks.forEach((itemNode, index) => {
    if (index > 0 && index % numLinksPerColumn === 0) {
      currentColumn.append(currentList);
      footerNavbarLeft.append(currentColumn);
      currentColumn = document.createElement('div');
      currentColumn.className = 'header-footerList';
      currentList = document.createElement('ul');
      currentList.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
    }

    const listItem = document.createElement('li');
    listItem.className = 'header-footer-list__item';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const label = itemNode.querySelector('[data-aue-prop="label"]');

    if (link && label) {
      const anchor = link.querySelector('a');
      if (anchor) {
        anchor.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        anchor.setAttribute('data-link-region', 'Footer List');
        anchor.textContent = label.textContent.trim();
        listItem.append(anchor);
        moveInstrumentation(link, listItem);
        moveInstrumentation(label, listItem);
      }
    }
    currentList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });
  currentColumn.append(currentList);
  footerNavbarLeft.append(currentColumn);

  footerNav.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  // No specific content for footerNavbarRight in the provided HTML, so it remains empty
  footerNav.append(footerNavbarRight);

  footerRightSection.append(footerNav);
  footerPrimaryContent.append(footerRightSection);

  footerContainer1.append(footerPrimaryContent);
  footerPrimary.append(footerContainer1);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.className = 'header-footer-brand__secondary';
  footerSecondary.style.backgroundColor = '';

  const footerContainer2 = document.createElement('div');
  footerContainer2.className = 'header-container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    if (link && icon) {
      const anchor = link.querySelector('a');
      if (anchor) {
        anchor.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
        anchor.setAttribute('data-cta-region', 'Footer');
        anchor.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
        anchor.setAttribute('data-platform-name', icon.alt.toLowerCase());
        anchor.setAttribute('data-social-linktype', 'follow');

        const picture = createOptimizedPicture(icon.src, icon.alt);
        picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
        picture.querySelector('img').setAttribute('aria-label', icon.alt.toLowerCase());
        anchor.append(picture);
        listItem.append(anchor);
        moveInstrumentation(link, listItem);
        moveInstrumentation(icon, listItem);
      }
    }
    socialList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });
  socialMediaSection.append(socialList);
  footerSecondaryContent.append(socialMediaSection);

  const footerBrandLeftSection = document.createElement('section');
  footerBrandLeftSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-brand__left--item header-foot_link';
    const anchor = itcPortalLink.querySelector('a');
    if (anchor) {
      anchor.className = 'header-footer-brand__left--link header-analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      listItem.append(anchor);
      moveInstrumentation(itcPortalLink, listItem);
    }
    footerBrandLeftList.append(listItem);
  }
  footerBrandLeftSection.append(footerBrandLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  footerBrandLeftSection.append(copyrightDiv);

  footerSecondaryContent.append(footerBrandLeftSection);
  footerContainer2.append(footerSecondaryContent);
  footerSecondary.append(footerContainer2);
  footerBrand.append(footerSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  block.append(submenuContainer);

  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
