import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  const secondaryLogo = block.querySelector('[data-aue-prop="secondaryLogo"]');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const menuItems = block.querySelectorAll('[data-aue-model="headerMenuItem"]');
  const footerLinks = block.querySelectorAll('[data-aue-model="footerLinkItem"]');
  const footerSocial = block.querySelectorAll('[data-aue-model="footerSocialItem"]');
  const footerITCPortalLink = block.querySelector('[data-aue-prop="footerITCPortalLink"]');
  const footerCopyright = block.querySelector('[data-aue-prop="footerCopyright"]');

  const headerPositionRelative = document.createElement('section');
  headerPositionRelative.className = 'header-position-relative header-mb-15';

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'header-d-none header-app-name';
    appNameSpan.dataset.appName = appName.textContent.trim();
    appNameSpan.textContent = appName.textContent.trim();
    moveInstrumentation(appName, appNameSpan);
    headerPositionRelative.append(appNameSpan);
  }

  const headerBoingContainer = document.createElement('header');
  headerBoingContainer.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const headerDiv1 = document.createElement('div');
  headerDiv1.className = 'header-d-flex header-w-25';
  headerBoingContainer.append(headerDiv1);

  const headerDiv2 = document.createElement('div');
  headerDiv2.className = 'header-d-flex header-justify-content-center header-w-25';
  const logoLinkElement = document.createElement('a');
  logoLinkElement.className = 'header-analytics_cta_click';
  logoLinkElement.dataset.ct = '';
  logoLinkElement.setAttribute('aria-label', 'header-logo-boing');
  if (logoLink) {
    logoLinkElement.href = logoLink.querySelector('a')?.href || '#';
    moveInstrumentation(logoLink, logoLinkElement);
  }

  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  if (logoImage) {
    const img = logoImage.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt, true, img.loading);
      headerLogoDiv.append(picture);
      moveInstrumentation(img, picture);
    }
    moveInstrumentation(logoImage, headerLogoDiv);
  }
  logoLinkElement.append(headerLogoDiv);
  headerDiv2.append(logoLinkElement);
  headerBoingContainer.append(headerDiv2);

  const headerDiv3 = document.createElement('div');
  headerDiv3.className = 'header-d-flex header-w-25 header-justify-content-end';

  if (loginLink) {
    const loginLinkElement = loginLink.querySelector('a');
    if (loginLinkElement) {
      const loginWrapper = document.createElement('a');
      loginWrapper.href = loginLinkElement.href;
      loginWrapper.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
      loginWrapper.style.display = 'inline';

      const loginButton = document.createElement('button');
      loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
      loginButton.textContent = loginLinkElement.textContent.trim();
      loginWrapper.append(loginButton);
      headerDiv3.append(loginWrapper);
      moveInstrumentation(loginLinkElement, loginWrapper);
      moveInstrumentation(loginLink, loginWrapper);
    }
  }
  headerBoingContainer.append(headerDiv3);
  headerPositionRelative.append(headerBoingContainer);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  menuItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

    const link = itemNode.querySelector('[data-aue-prop="link"] a');
    const icon = itemNode.querySelector('[data-aue-prop="icon"] img');
    const label = itemNode.querySelector('[data-aue-prop="label"]');

    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      linkElement.dataset.consent = 'false'; // Default value, adjust if needed
      linkElement.dataset.link = link.dataset.link || '';

      if (icon) {
        const img = document.createElement('img');
        img.src = icon.src;
        img.alt = icon.alt;
        img.className = 'header-sidebar__menu-icon header-me-4';
        img.loading = 'lazy';
        linkElement.append(img);
        moveInstrumentation(icon, img);
      }
      if (label) {
        linkElement.append(label.textContent.trim());
        moveInstrumentation(label, linkElement);
      } else if (link.textContent) {
        linkElement.append(link.textContent.trim());
      }
      li.append(linkElement);
      moveInstrumentation(link, linkElement);
    }
    sidebarMenu.append(li);
    moveInstrumentation(itemNode, li);
  });
  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  sidebar.append(sidebarCurve);

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

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  if (footerITCPortalLink) {
    const itcLinkElement = footerITCPortalLink.querySelector('a');
    if (itcLinkElement) {
      const itcLinkWrapper = document.createElement('a');
      itcLinkWrapper.href = itcLinkElement.href;
      itcLinkWrapper.target = '_blank';
      itcLinkWrapper.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
      itcLinkWrapper.dataset.ctaRegion = 'Footer';
      itcLinkWrapper.setAttribute('aria-label', 'ITC Logo');

      const itcImg = footerITCPortalLink.querySelector('img');
      if (itcImg) {
        const imgElement = document.createElement('img');
        imgElement.src = itcImg.src;
        imgElement.alt = itcImg.alt;
        imgElement.className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
        imgElement.loading = 'lazy';
        itcLinkWrapper.append(imgElement);
        moveInstrumentation(itcImg, imgElement);
      }
      footerBrandLeft.append(itcLinkWrapper);
      moveInstrumentation(itcLinkElement, itcLinkWrapper);
      moveInstrumentation(footerITCPortalLink, itcLinkWrapper);
    }
  }

  if (secondaryLogo) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
    const secondaryImg = secondaryLogo.querySelector('img');
    if (secondaryImg) {
      const imgElement = document.createElement('img');
      imgElement.className = 'header-object-fit-contain header-w-100 header-no-rendition';
      imgElement.src = secondaryImg.src;
      imgElement.alt = secondaryImg.alt;
      imgElement.loading = 'lazy';
      secondaryLogoDiv.append(imgElement);
      moveInstrumentation(secondaryImg, imgElement);
    }
    footerBrandLeft.append(secondaryLogoDiv);
    moveInstrumentation(secondaryLogo, secondaryLogoDiv);
  }

  footerContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';

  const footerLinksGrouped = {};
  footerLinks.forEach((itemNode, index) => {
    const link = itemNode.querySelector('[data-aue-prop="link"] a');
    const label = itemNode.querySelector('[data-aue-prop="label"]');

    if (link && label) {
      const groupIndex = Math.floor(index / 3); // Group into sets of 3
      if (!footerLinksGrouped[groupIndex]) {
        footerLinksGrouped[groupIndex] = [];
      }
      footerLinksGrouped[groupIndex].push({ link, label, itemNode });
    }
  });

  Object.values(footerLinksGrouped).forEach((group) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

    group.forEach(({ link, label, itemNode }) => {
      const li = document.createElement('li');
      li.className = 'header-footer-list__item';

      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      linkElement.dataset.linkRegion = 'Footer List';
      if (link.target) {
        linkElement.target = link.target;
      }
      linkElement.textContent = label.textContent.trim();
      li.append(linkElement);
      ul.append(li);
      moveInstrumentation(link, linkElement);
      moveInstrumentation(label, linkElement);
      moveInstrumentation(itemNode, li);
    });
    footerListDiv.append(ul);
    footerNavbarLeft.append(footerListDiv);
  });

  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  // No specific content for footerNavbarRight in the provided HTML, assuming it's structured similarly to footerNavbarLeft if content were present.
  footerNavbar.append(footerNavbarRight);

  footerBrandRight.append(footerNavbar);
  footerContent.append(footerBrandRight);
  footerContainer.append(footerContent);
  footerBrandPrimary.append(footerContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand__secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const footerBrandRightSocial = document.createElement('section');
  footerBrandRightSocial.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  footerBrandRightSocial.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  footerSocial.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const link = itemNode.querySelector('[data-aue-prop="link"] a');
    const icon = itemNode.querySelector('[data-aue-prop="icon"] img');

    if (link && icon) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.target = '_blank';
      linkElement.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      linkElement.dataset.ctaRegion = 'Footer';
      linkElement.dataset.ctaLabel = `footer-${icon.alt.toLowerCase()}`; // Assuming alt text is platform name
      linkElement.dataset.platformName = icon.alt.toLowerCase();
      linkElement.dataset.socialLinktype = 'follow';

      const imgElement = document.createElement('img');
      imgElement.src = icon.src;
      imgElement.alt = icon.alt;
      imgElement.setAttribute('aria-label', icon.alt.toLowerCase());
      imgElement.className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      imgElement.loading = 'lazy';

      linkElement.append(imgElement);
      li.append(linkElement);
      socialList.append(li);
      moveInstrumentation(link, linkElement);
      moveInstrumentation(icon, imgElement);
      moveInstrumentation(itemNode, li);
    }
  });
  footerBrandRightSocial.append(socialList);
  footerSecondaryContent.append(footerBrandRightSocial);

  const footerBrandLeftCopyright = document.createElement('section');
  footerBrandLeftCopyright.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const footerLeftList = document.createElement('ul');
  footerLeftList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  // Re-adding ITC portal link here as per the expected HTML structure
  if (footerITCPortalLink) {
    const itcLinkElement = footerITCPortalLink.querySelector('a');
    if (itcLinkElement) {
      const li = document.createElement('li');
      li.className = 'header-footer-brand__left--item header-foot_link';

      const link = document.createElement('a');
      link.href = itcLinkElement.href;
      link.target = '_blank';
      link.className = 'header-footer-brand__left--link header-analytics_cta_click';
      link.dataset.ctaRegion = 'Footer';
      link.textContent = 'ITC portal';
      li.append(link);
      footerLeftList.append(li);
      // Instrumentation for this specific instance of the link
      moveInstrumentation(itcLinkElement, link);
    }
  }
  footerBrandLeftCopyright.append(footerLeftList);

  if (footerCopyright) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
    copyrightSpan.textContent = footerCopyright.textContent.trim();
    copyrightDiv.append(copyrightSpan);
    footerBrandLeftCopyright.append(copyrightDiv);
    moveInstrumentation(footerCopyright, copyrightSpan);
  }

  footerSecondaryContent.append(footerBrandLeftCopyright);
  footerSecondaryContainer.append(footerSecondaryContent);
  footerBrandSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  headerPositionRelative.append(submenuContainer);

  block.textContent = '';
  block.append(headerPositionRelative);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
