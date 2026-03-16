import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-app-name]').textContent;
  block.classList.add(`${appName}-header`);

  const headerWrapper = document.createElement('header');
  headerWrapper.className = 'boing-header-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const leftDiv = document.createElement('div');
  leftDiv.className = 'd-flex w-25';
  headerWrapper.append(leftDiv);

  const centerDiv = document.createElement('div');
  centerDiv.className = 'd-flex justify-content-center w-25';
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href;
    logoAnchor.className = 'analytics_cta_click';
    logoAnchor.setAttribute('data-ct', '');
    logoAnchor.setAttribute('a-label', 'header-logo-boing');

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header__logo d-flex align-items-center';

    const logoImg = block.querySelector('[data-aue-prop="logo"]');
    if (logoImg) {
      const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
      picture.querySelector('img').className = 'header__logo-img';
      logoDiv.append(picture);
      moveInstrumentation(logoImg, picture);
    }
    logoAnchor.append(logoDiv);
    centerDiv.append(logoAnchor);
    moveInstrumentation(logoLink, logoAnchor);
  }
  headerWrapper.append(centerDiv);

  const rightDiv = document.createElement('div');
  rightDiv.className = 'd-flex w-25 justify-content-end';
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href;
    loginAnchor.className = 'header__login-btn-wrapper analytics_cta_click';
    loginAnchor.style.display = 'inline';

    const loginButton = document.createElement('button');
    loginButton.className = 'header__login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
    loginButton.textContent = loginLink.textContent.trim();

    loginAnchor.append(loginButton);
    rightDiv.append(loginAnchor);
    moveInstrumentation(loginLink, loginAnchor);
  }
  headerWrapper.append(rightDiv);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'sidebar start-0 bg-white position-absolute';

  const menuList = document.createElement('ul');
  menuList.className = 'sidebar__menu list-unstyled px-4';

  const menuLinks = block.querySelectorAll('[data-aue-model="menuLink"]');
  menuLinks.forEach((menuLinkItem) => {
    const listItem = document.createElement('li');
    listItem.className = 'sidebar__menu-item py-6 border-bottom border-boing-neutral-gray-200';

    const linkElement = menuLinkItem.querySelector('[data-aue-prop="link"]');
    const labelElement = menuLinkItem.querySelector('[data-aue-prop="label"]');
    const iconElement = menuLinkItem.querySelector('[data-aue-prop="icon"]');

    if (linkElement && labelElement) {
      const anchor = document.createElement('a');
      anchor.href = linkElement.href;
      anchor.className = 'sidebar__menu-link d-flex align-items-center text-decoration-none px-6 fw-medium analytics_cta_click';
      anchor.setAttribute('data-consent', 'false'); // Assuming default
      anchor.setAttribute('data-link', linkElement.getAttribute('data-link') || linkElement.href);

      if (iconElement) {
        const picture = createOptimizedPicture(iconElement.src, iconElement.alt);
        picture.querySelector('img').className = 'sidebar__menu-icon me-4';
        anchor.append(picture);
        moveInstrumentation(iconElement, picture);
      }
      anchor.append(labelElement.textContent.trim());
      listItem.append(anchor);
      moveInstrumentation(linkElement, anchor);
      moveInstrumentation(labelElement, anchor);
    }
    menuList.append(listItem);
    moveInstrumentation(menuLinkItem, listItem);
  });
  aside.append(menuList);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'sidebar__curve';
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'footer-brand w-100 bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand__primary';
  primarySection.style.backgroundColor = '';

  const containerDiv = document.createElement('div');
  containerDiv.className = 'container';

  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand__primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'footer-brand__left d-flex gap-16 px-10 align-items-center justify-content-center';

  const footerLogo1Link = block.querySelector('[data-aue-prop="footerLogo1Link"]');
  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  if (footerLogo1Link && footerLogo1) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.href = footerLogo1Link.href;
    logo1Anchor.target = '_blank';
    logo1Anchor.className = 'footer-brand__logo d-inline-block analytics_cta_click';
    logo1Anchor.setAttribute('data-cta-region', 'Footer');
    logo1Anchor.setAttribute('aria-label', footerLogo1.alt || 'ITC Logo');

    const picture = createOptimizedPicture(footerLogo1.src, footerLogo1.alt);
    picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
    logo1Anchor.append(picture);
    footerBrandLeft.append(logo1Anchor);
    moveInstrumentation(footerLogo1Link, logo1Anchor);
    moveInstrumentation(footerLogo1, picture);
  }

  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  if (footerLogo2) {
    const logo2Div = document.createElement('div');
    logo2Div.className = 'footer-brand__secondary--logo d-inline-block';
    const picture = createOptimizedPicture(footerLogo2.src, footerLogo2.alt);
    picture.querySelector('img').className = 'object-fit-contain w-100 no-rendition';
    logo2Div.append(picture);
    footerBrandLeft.append(logo2Div);
    moveInstrumentation(footerLogo2, picture);
  }
  primaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'footer-brand__right';

  const footerNav = document.createElement('nav');
  footerNav.className = 'footer-brand__navbar d-grid d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');

  const navbarLeft = document.createElement('div');
  navbarLeft.className = 'footer-brand__navbar--left d-flex flex-column flex-md-row';

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const linkGroups = [[], [], [], []]; // Assuming 4 columns for footer links based on original HTML
  footerLinks.forEach((linkItem, index) => {
    const groupIndex = index % 4;
    linkGroups[groupIndex].push(linkItem);
  });

  linkGroups.forEach((group, groupIndex) => {
    if (group.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'footerList';
      const ul = document.createElement('ul');
      ul.className = 'footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

      group.forEach((linkItem) => {
        const li = document.createElement('li');
        li.className = 'footer-list__item';

        const linkElement = linkItem.querySelector('[data-aue-prop="link"]');
        const labelElement = linkItem.querySelector('[data-aue-prop="label"]');

        if (linkElement && labelElement) {
          const anchor = document.createElement('a');
          anchor.href = linkElement.href;
          anchor.className = 'cta-analytics analytics_cta_click footer-list__item--link d-inline-block';
          anchor.setAttribute('data-link-region', 'Footer List');
          if (linkElement.target) {
            anchor.target = linkElement.target;
          }
          anchor.textContent = labelElement.textContent.trim();
          li.append(anchor);
          moveInstrumentation(linkElement, anchor);
          moveInstrumentation(labelElement, anchor);
        }
        ul.append(li);
        moveInstrumentation(linkItem, li);
      });
      footerListDiv.append(ul);
      if (groupIndex < 2) {
        navbarLeft.append(footerListDiv);
      } else {
        if (groupIndex === 2 && !navbarRight) {
          var navbarRight = document.createElement('div');
          navbarRight.className = 'footer-brand__navbar--right d-flex flex-column flex-md-row';
        }
        navbarRight.append(footerListDiv);
      }
    }
  });

  footerNav.append(navbarLeft);
  if (navbarRight) {
    footerNav.append(navbarRight);
  }
  footerBrandRight.append(footerNav);
  primaryContent.append(footerBrandRight);
  containerDiv.append(primaryContent);
  primarySection.append(containerDiv);
  footerBrand.append(primarySection);

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand__secondary';
  secondarySection.style.backgroundColor = '';

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand__secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'footer-brand__right d-flex flex-column pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'footer-brand__right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((socialLinkItem) => {
    const li = document.createElement('li');
    li.className = 'footer-brand__right--item d-flex justify-content-center align-items-center';

    const linkElement = socialLinkItem.querySelector('[data-aue-prop="link"]');
    const iconElement = socialLinkItem.querySelector('[data-aue-prop="icon"]');

    if (linkElement && iconElement) {
      const anchor = document.createElement('a');
      anchor.href = linkElement.href;
      anchor.className = 'footer-brand__right--link d-flex justify-content-center align-items-center analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${iconElement.alt.toLowerCase()}`);
      anchor.target = '_blank';
      anchor.setAttribute('data-platform-name', iconElement.alt.toLowerCase());
      anchor.setAttribute('data-social-linktype', 'follow');

      const picture = createOptimizedPicture(iconElement.src, iconElement.alt);
      picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      picture.querySelector('img').setAttribute('aria-label', iconElement.alt.toLowerCase());
      anchor.append(picture);
      li.append(anchor);
      moveInstrumentation(linkElement, anchor);
      moveInstrumentation(iconElement, picture);
    }
    socialList.append(li);
    moveInstrumentation(socialLinkItem, li);
  });
  socialMediaSection.append(socialList);
  secondaryContent.append(socialMediaSection);

  const footerBottomLeft = document.createElement('section');
  footerBottomLeft.className = 'footer-brand__left py-5 d-flex flex-column gap-3';

  const footerBottomList = document.createElement('ul');
  footerBottomList.className = 'footer-brand__left--list d-flex align-items-center justify-content-center flex-wrap';

  // Add ITC portal link explicitly as it's not part of multifield
  const itcLi = document.createElement('li');
  itcLi.className = 'footer-brand__left--item foot_link';
  const itcAnchor = document.createElement('a');
  itcAnchor.href = 'https://www.itcportal.com/';
  itcAnchor.target = '_blank';
  itcAnchor.className = 'footer-brand__left--link analytics_cta_click';
  itcAnchor.setAttribute('data-cta-region', 'Footer');
  itcAnchor.textContent = 'ITC portal';
  itcLi.append(itcAnchor);
  footerBottomList.append(itcLi);

  footerBottomLeft.append(footerBottomList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand__left--copyright text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'footer-brand__left--text text-white';
  const copyrightText = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  footerBottomLeft.append(copyrightDiv);

  secondaryContent.append(footerBottomLeft);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);
  footerBrand.append(secondarySection);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.className = 'overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  submenuContainer.append(overlay);

  block.textContent = '';
  block.append(headerWrapper);
  block.append(submenuContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
