import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const headerLogoLink = block.querySelector('[data-aue-prop="headerLogoLink"]');
  const headerLogoImg = block.querySelector('[data-aue-prop="headerLogo"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  const footerLogoITC = block.querySelector('[data-aue-prop="footerLogoITC"]');
  const footerLogoFSSI = block.querySelector('[data-aue-prop="footerLogoFSSI"]');
  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  const footerITCPortalLink = block.querySelector('[data-aue-prop="footerITCPortalLink"]');
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');

  block.textContent = '';

  const section = document.createElement('section');
  section.className = 'header-section header-position-relative header-mb-15';

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'header-section-app-name header-d-none';
    appNameSpan.dataset.appName = appName.textContent.trim();
    appNameSpan.textContent = appName.textContent.trim();
    moveInstrumentation(appName, appNameSpan);
    section.append(appNameSpan);
  }

  const header = document.createElement('header');
  header.className = 'header-section-boing-container header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const headerDiv1 = document.createElement('div');
  headerDiv1.className = 'header-section-d-flex header-d-flex header-w-25';
  header.append(headerDiv1);

  const headerDiv2 = document.createElement('div');
  headerDiv2.className = 'header-section-d-flex header-d-flex header-justify-content-center header-w-25';

  if (headerLogoLink) {
    const logoLink = headerLogoLink.querySelector('a');
    if (logoLink) {
      const logoAnchor = document.createElement('a');
      logoAnchor.href = logoLink.href;
      logoAnchor.className = 'header-section-analytics_cta_click header-analytics_cta_click';
      logoAnchor.dataset.ct = '';
      logoAnchor.setAttribute('aria-label', 'header-logo-boing');

      const logoDiv = document.createElement('div');
      logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';

      if (headerLogoImg) {
        const img = headerLogoImg.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt, true, img.loading);
          picture.querySelector('img').className = 'header-header__logo-img';
          logoDiv.append(picture);
          moveInstrumentation(img, picture);
        }
      }
      logoAnchor.append(logoDiv);
      headerDiv2.append(logoAnchor);
      moveInstrumentation(headerLogoLink, logoAnchor);
    }
  }
  header.append(headerDiv2);

  const headerDiv3 = document.createElement('div');
  headerDiv3.className = 'header-section-d-flex header-d-flex header-w-25 header-justify-content-end';
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
  header.append(headerDiv3);
  section.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-section-submenu-container header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-section-sidebar header-sidebar header-start-0 header-bg-white header-position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-section-sidebar__menu header-sidebar__menu header-list-unstyled header-px-4';

  sidebarMenuItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'header-section-sidebar__menu-item header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

    const linkEl = itemNode.querySelector('[data-aue-prop="link"] a');
    const iconEl = itemNode.querySelector('[data-aue-prop="icon"] img');
    const labelEl = itemNode.querySelector('[data-aue-prop="label"]');

    if (linkEl) {
      const anchor = document.createElement('a');
      anchor.href = linkEl.href;
      anchor.className = 'header-section-sidebar__menu-link header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      anchor.dataset.consent = 'false'; // Default, adjust if needed
      anchor.dataset.link = linkEl.dataset.link; // Copy data-link attribute

      if (iconEl) {
        const picture = createOptimizedPicture(iconEl.src, iconEl.alt, false, iconEl.loading);
        picture.querySelector('img').className = 'header-section-sidebar__menu-icon header-sidebar__menu-icon header-me-4';
        anchor.append(picture);
        moveInstrumentation(iconEl, picture);
      }

      if (labelEl) {
        anchor.append(labelEl.textContent.trim());
        moveInstrumentation(labelEl, anchor);
      } else if (linkEl.textContent) {
        anchor.append(linkEl.textContent.trim());
      }
      li.append(anchor);
      moveInstrumentation(linkEl, anchor);
    }
    sidebarMenu.append(li);
    moveInstrumentation(itemNode, li);
  });
  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-section-sidebar__curve header-sidebar__curve';
  sidebar.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-section-footer-brand header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.dataset.isdoodlevariation = 'false';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-section-footer-brand__primary header-footer-brand__primary';
  footerBrandPrimary.style.backgroundColor = '';

  const container1 = document.createElement('div');
  container1.className = 'header-section-container header-container';

  const primaryContent = document.createElement('div');
  primaryContent.className = 'header-section-footer-brand__primary--content header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-section-footer-brand__left header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  if (footerLogoITC) {
    const itcLink = footerLogoITC.querySelector('a');
    const itcImg = footerLogoITC.querySelector('img');
    if (itcLink && itcImg) {
      const itcAnchor = document.createElement('a');
      itcAnchor.href = itcLink.href;
      itcAnchor.target = '_blank';
      itcAnchor.className = 'header-section-footer-brand__logo header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
      itcAnchor.dataset.ctaRegion = 'Footer';
      itcAnchor.setAttribute('aria-label', 'ITC Logo');

      const picture = createOptimizedPicture(itcImg.src, itcImg.alt, false, itcImg.loading);
      picture.querySelector('img').className = 'header-section-object-fit-contain header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      itcAnchor.append(picture);
      footerBrandLeft.append(itcAnchor);
      moveInstrumentation(footerLogoITC, itcAnchor);
    }
  }

  if (footerLogoFSSI) {
    const fssiDiv = document.createElement('div');
    fssiDiv.className = 'header-section-footer-brand__secondary--logo header-footer-brand__secondary--logo header-d-inline-block';
    const fssiImg = footerLogoFSSI.querySelector('img');
    if (fssiImg) {
      const picture = createOptimizedPicture(fssiImg.src, fssiImg.alt, false, fssiImg.loading);
      picture.querySelector('img').className = 'header-section-object-fit-contain header-object-fit-contain header-w-100 header-no-rendition';
      fssiDiv.append(picture);
      footerBrandLeft.append(fssiDiv);
      moveInstrumentation(footerLogoFSSI, fssiDiv);
    }
  }
  primaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-section-footer-brand__right header-footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-section-footer-brand__navbar header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-section-footer-brand__navbar--left header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';

  const footerListDiv1 = document.createElement('div');
  footerListDiv1.className = 'header-section-footerList header-footerList';
  const ul1 = document.createElement('ul');
  ul1.className = 'header-section-footer-list header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

  const footerListDiv2 = document.createElement('div');
  footerListDiv2.className = 'header-section-footerList header-footerList';
  const ul2 = document.createElement('ul');
  ul2.className = 'header-section-footer-list header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-section-footer-brand__navbar--right header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';

  const footerListDiv3 = document.createElement('div');
  footerListDiv3.className = 'header-section-footerList header-footerList';
  const ul3 = document.createElement('ul');
  ul3.className = 'header-section-footer-list header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

  const footerListDiv4 = document.createElement('div');
  footerListDiv4.className = 'header-section-footerList header-footerList';
  const ul4 = document.createElement('ul');
  ul4.className = 'header-section-footer-list header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

  footerLinks.forEach((itemNode, index) => {
    const li = document.createElement('li');
    li.className = 'header-section-footer-list__item header-footer-list__item';
    const linkEl = itemNode.querySelector('[data-aue-prop="link"] a');
    const labelEl = itemNode.querySelector('[data-aue-prop="label"]');

    if (linkEl) {
      const anchor = document.createElement('a');
      anchor.href = linkEl.href;
      anchor.className = 'header-section-cta-analytics header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      anchor.dataset.linkRegion = 'Footer List';
      if (linkEl.target) anchor.target = linkEl.target;

      if (labelEl) {
        anchor.textContent = labelEl.textContent.trim();
        moveInstrumentation(labelEl, anchor);
      } else {
        anchor.textContent = linkEl.textContent.trim();
      }
      li.append(anchor);
      moveInstrumentation(linkEl, anchor);
    }

    if (index % 4 === 0) {
      ul1.append(li);
    } else if (index % 4 === 1) {
      ul2.append(li);
    } else if (index % 4 === 2) {
      ul3.append(li);
    } else {
      ul4.append(li);
    }
    moveInstrumentation(itemNode, li);
  });

  if (ul1.children.length > 0) footerListDiv1.append(ul1);
  if (ul2.children.length > 0) footerListDiv2.append(ul2);
  if (ul3.children.length > 0) footerListDiv3.append(ul3);
  if (ul4.children.length > 0) footerListDiv4.append(ul4);

  if (footerListDiv1.children.length > 0) footerNavbarLeft.append(footerListDiv1);
  if (footerListDiv2.children.length > 0) footerNavbarLeft.append(footerListDiv2);
  if (footerListDiv3.children.length > 0) footerNavbarRight.append(footerListDiv3);
  if (footerListDiv4.children.length > 0) footerNavbarRight.append(footerListDiv4);

  footerNavbar.append(footerNavbarLeft, footerNavbarRight);
  footerBrandRight.append(footerNavbar);
  primaryContent.append(footerBrandRight);
  container1.append(primaryContent);
  footerBrandPrimary.append(container1);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-section-footer-brand__secondary header-footer-brand__secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const container2 = document.createElement('div');
  container2.className = 'header-section-container header-container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'header-section-footer-brand__secondary--content header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-section-footer-brand__right header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-section-social_media--title header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-section-footer-brand__right--list header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  socialLinks.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'header-section-footer-brand__right--item header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const linkEl = itemNode.querySelector('[data-aue-prop="link"] a');
    const iconEl = itemNode.querySelector('[data-aue-prop="icon"] img');

    if (linkEl && iconEl) {
      const anchor = document.createElement('a');
      anchor.href = linkEl.href;
      anchor.target = '_blank';
      anchor.className = 'header-section-footer-brand__right--link header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      anchor.dataset.ctaRegion = 'Footer';
      anchor.dataset.ctaLabel = `footer-${iconEl.alt.toLowerCase()}`; // Assuming alt text is platform name
      anchor.dataset.platformName = iconEl.alt.toLowerCase();
      anchor.dataset.socialLinktype = 'follow';

      const picture = createOptimizedPicture(iconEl.src, iconEl.alt, false, iconEl.loading);
      picture.querySelector('img').className = 'header-section-object-fit-contain header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      anchor.append(picture);
      li.append(anchor);
      moveInstrumentation(linkEl, anchor);
      moveInstrumentation(iconEl, picture);
    }
    socialList.append(li);
    moveInstrumentation(itemNode, li);
  });
  socialMediaSection.append(socialList);
  secondaryContent.append(socialMediaSection);

  const footerBottomLeft = document.createElement('section');
  footerBottomLeft.className = 'header-section-footer-brand__left header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const footerBottomList = document.createElement('ul');
  footerBottomList.className = 'header-section-footer-brand__left--list header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  if (footerITCPortalLink) {
    const itcPortalAnchor = footerITCPortalLink.querySelector('a');
    if (itcPortalAnchor) {
      const li = document.createElement('li');
      li.className = 'header-section-footer-brand__left--item header-footer-brand__left--item header-foot_link';
      const anchor = document.createElement('a');
      anchor.href = itcPortalAnchor.href;
      anchor.target = '_blank';
      anchor.className = 'header-section-footer-brand__left--link header-footer-brand__left--link header-analytics_cta_click';
      anchor.dataset.ctaRegion = 'Footer';
      anchor.textContent = itcPortalAnchor.textContent.trim();
      li.append(anchor);
      footerBottomList.append(li);
      moveInstrumentation(footerITCPortalLink, anchor);
    }
  }
  footerBottomLeft.append(footerBottomList);

  if (copyrightText) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'header-section-footer-brand__left--copyright header-footer-brand__left--copyright header-text-center';
    const span = document.createElement('span');
    span.className = 'header-section-footer-brand__left--text header-footer-brand__left--text header-text-white';
    span.textContent = copyrightText.textContent.trim();
    copyrightDiv.append(span);
    footerBottomLeft.append(copyrightDiv);
    moveInstrumentation(copyrightText, copyrightDiv);
  }

  secondaryContent.append(footerBottomLeft);
  container2.append(secondaryContent);
  footerBrandSecondary.append(container2);
  footerBrand.append(footerBrandSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.className = 'header-section-overlay header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  section.append(submenuContainer);

  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
