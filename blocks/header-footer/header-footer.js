import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainSection = document.createElement('section');
  mainSection.className = 'header-position-relative header-mb-15';

  const appNameSpan = block.querySelector('[data-aue-prop="appName"]');
  if (appNameSpan) {
    appNameSpan.className = 'header-d-none header-app-name';
    mainSection.append(appNameSpan);
  }

  const header = document.createElement('header');
  header.className = 'boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  header.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-d-flex header-justify-content-center header-w-25';

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]') || block.querySelector('.button-container a');
  const logoImg = block.querySelector('[data-aue-prop="logo"]') || block.querySelector('picture img');

  if (logoLink && logoImg) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href || logoLink.textContent.trim();
    logoAnchor.className = 'header-analytics_cta_click';
    logoAnchor.setAttribute('data-ct', '');
    logoAnchor.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(logoLink, logoAnchor);

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';

    const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt, true, [{ width: '100vw' }]);
    optimizedLogo.querySelector('img').className = 'header-header__logo-img';
    logoDiv.append(optimizedLogo);
    moveInstrumentation(logoImg, optimizedLogo);
    logoAnchor.append(logoDiv);
    headerCenterDiv.append(logoAnchor);
  }
  header.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';

  const loginLink = block.querySelector('[data-aue-prop="loginLink"]') || block.querySelector('.button-container:nth-of-type(2) a');
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href || loginLink.textContent.trim();
    loginAnchor.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
    loginAnchor.style.display = 'inline';

    const loginButton = document.createElement('button');
    loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = loginLink.textContent.trim();
    loginAnchor.append(loginButton);
    moveInstrumentation(loginLink, loginAnchor);
    headerRightDiv.append(loginAnchor);
  }
  header.append(headerRightDiv);
  mainSection.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

    const linkElement = itemNode.querySelector('[data-aue-prop="link"]') || itemNode.querySelector('a');
    const iconElement = itemNode.querySelector('[data-aue-prop="icon"]') || itemNode.querySelector('picture img');
    const labelElement = itemNode.querySelector('[data-aue-prop="label"]') || itemNode.querySelector('p');

    if (linkElement && iconElement && labelElement) {
      const anchor = document.createElement('a');
      anchor.href = linkElement.href || linkElement.textContent.trim();
      anchor.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      anchor.setAttribute('data-consent', 'false');
      anchor.setAttribute('data-link', anchor.href);

      const optimizedIcon = createOptimizedPicture(iconElement.src, iconElement.alt);
      optimizedIcon.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      anchor.append(optimizedIcon);
      moveInstrumentation(iconElement, optimizedIcon);

      anchor.append(labelElement.textContent.trim());
      moveInstrumentation(linkElement, anchor);
      moveInstrumentation(labelElement, anchor);
      li.append(anchor);
    }
    moveInstrumentation(itemNode, li);
    sidebarMenuUl.append(li);
  });
  aside.append(sidebarMenuUl);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrandDiv.setAttribute('data-isdoodlevariation', 'false');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand__primary';
  footerBrandPrimary.style.backgroundColor = '';

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';

  const footerContent = document.createElement('div');
  footerContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const brandLogos = block.querySelectorAll('[data-aue-model="brandLogo"]');
  brandLogos.forEach((logoNode) => {
    const logoLinkElement = logoNode.querySelector('[data-aue-prop="link"]') || logoNode.querySelector('a');
    const logoImageElement = logoNode.querySelector('[data-aue-prop="logo"]') || logoNode.querySelector('picture img');

    if (logoLinkElement && logoImageElement) {
      const logoAnchor = document.createElement('a');
      logoAnchor.href = logoLinkElement.href || logoLinkElement.textContent.trim();
      logoAnchor.target = '_blank';
      logoAnchor.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
      logoAnchor.setAttribute('data-cta-region', 'Footer');
      logoAnchor.setAttribute('aria-label', logoImageElement.alt);

      const optimizedLogo = createOptimizedPicture(logoImageElement.src, logoImageElement.alt);
      optimizedLogo.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      logoAnchor.append(optimizedLogo);
      moveInstrumentation(logoLinkElement, logoAnchor);
      moveInstrumentation(logoImageElement, optimizedLogo);

      footerBrandLeft.append(logoAnchor);
    }
    moveInstrumentation(logoNode, logoAnchor || document.createDocumentFragment());
  });

  footerContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const numFooterLinks = footerLinks.length;
  const linksPerColumn = Math.ceil(numFooterLinks / 4); 

  for (let i = 0; i < 4; i += 1) {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

    const start = i * linksPerColumn;
    const end = Math.min(start + linksPerColumn, numFooterLinks);

    for (let j = start; j < end; j += 1) {
      const linkNode = footerLinks[j];
      const li = document.createElement('li');
      li.className = 'header-footer-list__item';

      const linkElement = linkNode.querySelector('[data-aue-prop="link"]') || linkNode.querySelector('a');
      const labelElement = linkNode.querySelector('[data-aue-prop="label"]') || linkNode.querySelector('p');

      if (linkElement && labelElement) {
        const anchor = document.createElement('a');
        anchor.href = linkElement.href || linkElement.textContent.trim();
        anchor.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        anchor.setAttribute('data-link-region', 'Footer List');
        anchor.textContent = labelElement.textContent.trim();
        if (linkElement.target) {
          anchor.target = linkElement.target;
        }
        li.append(anchor);
        moveInstrumentation(linkElement, anchor);
        moveInstrumentation(labelElement, anchor);
      }
      moveInstrumentation(linkNode, li);
      ul.append(li);
    }
    if (ul.children.length > 0) {
      footerListDiv.append(ul);
      if (i < 2) {
        footerNavbarLeft.append(footerListDiv);
      } else {
        if (!footerNavbar.querySelector('.header-footer-brand__navbar--right')) {
          const footerNavbarRight = document.createElement('div');
          footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
          footerNavbar.append(footerNavbarRight);
        }
        footerNavbar.querySelector('.header-footer-brand__navbar--right').append(footerListDiv);
      }
    }
  }

  footerNavbar.prepend(footerNavbarLeft);
  footerBrandRight.append(footerNavbar);
  footerContent.append(footerBrandRight);
  footerContainer.append(footerContent);
  footerBrandPrimary.append(footerContainer);
  footerBrandDiv.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand__secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'header-container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaUl = document.createElement('ul');
  socialMediaUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((socialNode) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const linkElement = socialNode.querySelector('[data-aue-prop="link"]') || socialNode.querySelector('a');
    const iconElement = socialNode.querySelector('[data-aue-prop="icon"]') || socialNode.querySelector('picture img');

    if (linkElement && iconElement) {
      const anchor = document.createElement('a');
      anchor.href = linkElement.href || linkElement.textContent.trim();
      anchor.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${iconElement.alt.toLowerCase()}`);
      anchor.target = '_blank';
      anchor.setAttribute('data-platform-name', iconElement.alt.toLowerCase());
      anchor.setAttribute('data-social-linktype', 'follow');

      const optimizedIcon = createOptimizedPicture(iconElement.src, iconElement.alt);
      optimizedIcon.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      optimizedIcon.querySelector('img').setAttribute('aria-label', iconElement.alt.toLowerCase());
      anchor.append(optimizedIcon);
      moveInstrumentation(linkElement, anchor);
      moveInstrumentation(iconElement, optimizedIcon);
      li.append(anchor);
    }
    moveInstrumentation(socialNode, li);
    socialMediaUl.append(li);
  });
  socialMediaSection.append(socialMediaUl);
  secondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const copyrightUl = document.createElement('ul');
  copyrightUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  const itcPortalLink = document.createElement('li');
  itcPortalLink.className = 'header-footer-brand__left--item header-foot_link';
  const itcAnchor = document.createElement('a');
  itcAnchor.href = 'https://www.itcportal.com/';
  itcAnchor.target = '_blank';
  itcAnchor.className = 'header-footer-brand__left--link header-analytics_cta_click';
  itcAnchor.setAttribute('data-cta-region', 'Footer');
  itcAnchor.textContent = 'ITC portal';
  itcPortalLink.append(itcAnchor);
  copyrightUl.append(itcPortalLink);
  copyrightSection.append(copyrightUl);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';

  const copyrightTextSpan = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightTextSpan) {
    copyrightTextSpan.className = 'header-footer-brand__left--text header-text-white';
    copyrightDiv.append(copyrightTextSpan);
  }
  copyrightSection.append(copyrightDiv);
  secondaryContent.append(copyrightSection);
  secondaryContainer.append(secondaryContent);
  footerBrandSecondary.append(secondaryContainer);
  footerBrandDiv.append(footerBrandSecondary);
  aside.append(footerBrandDiv);

  submenuContainer.append(aside);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  mainSection.append(submenuContainer);

  block.textContent = '';
  block.append(mainSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
