import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const headerLogo = block.querySelector('[data-aue-prop="headerLogo"]');
  const headerLogoLink = block.querySelector('[data-aue-prop="headerLogoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  const footerItcPortal = block.querySelector('[data-aue-prop="footerItcPortal"]');
  const footerCopyright = block.querySelector('[data-aue-prop="footerCopyright"]');

  const menuItems = block.querySelectorAll('[data-aue-model="headerMenuItem"]');
  const footerLinks1 = block.querySelectorAll('[data-aue-model="footerLinks1"]');
  const footerLinks2 = block.querySelectorAll('[data-aue-model="footerLinks2"]');
  const footerLinks3 = block.querySelectorAll('[data-aue-model="footerLinks3"]');
  const footerLinks4 = block.querySelectorAll('[data-aue-model="footerLinks4"]');
  const socialLinks = block.querySelectorAll('[data-aue-model="socialLinks"]');

  const section = document.createElement('section');
  section.className = 'header-position-relative header-mb-15';

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'header-d-none header-app-name';
    appNameSpan.textContent = appName.textContent;
    moveInstrumentation(appName, appNameSpan);
    section.append(appNameSpan);
  }

  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  header.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-d-flex  header-justify-content-center header-w-25';
  const headerLogoAnchor = document.createElement('a');
  headerLogoAnchor.className = 'header-analytics_cta_click';
  headerLogoAnchor.setAttribute('data-ct', '');
  headerLogoAnchor.setAttribute('a-label', 'header-logo-boing');
  if (headerLogoLink) {
    headerLogoAnchor.href = headerLogoLink.querySelector('a')?.href || '#';
    moveInstrumentation(headerLogoLink, headerLogoAnchor);
  }

  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.className = 'header__logo header-d-flex header-align-items-center';
  if (headerLogo) {
    const img = headerLogo.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt, true);
      picture.querySelector('img').className = 'header__logo-img';
      headerLogoDiv.append(picture);
      moveInstrumentation(headerLogo, picture);
    }
  }
  headerLogoAnchor.append(headerLogoDiv);
  headerCenterDiv.append(headerLogoAnchor);
  header.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.className = 'header__login-btn-wrapper header-analytics_cta_click';
    loginAnchor.style.display = 'inline';
    loginAnchor.href = loginLink.querySelector('a')?.href || '#';
    const loginButton = document.createElement('button');
    loginButton.className = 'header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = loginLink.textContent.trim();
    loginAnchor.append(loginButton);
    headerRightDiv.append(loginAnchor);
    moveInstrumentation(loginLink, loginAnchor);
  }
  header.append(headerRightDiv);
  section.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const menuUl = document.createElement('ul');
  menuUl.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  menuItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    if (itemNode.classList.contains('header-sidebar__menu-item--logout')) {
      li.classList.add('header-sidebar__menu-item--logout');
      li.style.display = 'none';
    }

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    const label = itemNode.querySelector('[data-aue-prop="label"]');

    const anchor = document.createElement('a');
    anchor.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
    anchor.setAttribute('data-consent', link?.dataset.consent || 'false');
    anchor.setAttribute('data-link', link?.dataset.link || '');
    anchor.href = link?.querySelector('a')?.href || '#';

    if (icon) {
      const img = icon.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
        anchor.append(picture);
        moveInstrumentation(icon, picture);
      }
    }

    if (label) {
      anchor.append(label.textContent.trim());
      moveInstrumentation(label, anchor);
    }

    li.append(anchor);
    menuUl.append(li);
    moveInstrumentation(itemNode, li);
  });
  aside.append(menuUl);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand__primary';
  footerBrandPrimary.style.backgroundColor = '';

  const footerBrandPrimaryContainer = document.createElement('div');
  footerBrandPrimaryContainer.className = 'header-container';

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  if (footerLogo1) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    logo1Anchor.setAttribute('data-cta-region', 'Footer');
    logo1Anchor.setAttribute('aria-label', 'ITC Logo');
    logo1Anchor.target = '_blank';
    logo1Anchor.href = footerLogo1.querySelector('a')?.href || '#';

    const img1 = footerLogo1.querySelector('img');
    if (img1) {
      const picture = createOptimizedPicture(img1.src, img1.alt);
      picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      logo1Anchor.append(picture);
      moveInstrumentation(footerLogo1, picture);
    }
    footerBrandLeft.append(logo1Anchor);
  }

  if (footerLogo2) {
    const logo2Div = document.createElement('div');
    logo2Div.className = 'header-footer-brand__secondary--logo header-d-inline-block';
    const img2 = footerLogo2.querySelector('img');
    if (img2) {
      const picture = createOptimizedPicture(img2.src, img2.alt);
      picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
      logo2Div.append(picture);
      moveInstrumentation(footerLogo2, picture);
    }
    footerBrandLeft.append(logo2Div);
  }
  footerBrandPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';

  const createFooterList = (linksNodes) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

    linksNodes.forEach((itemNode) => {
      const li = document.createElement('li');
      li.className = 'header-footer-list__item';
      const link = itemNode.querySelector('[data-aue-prop="link"]');
      const label = itemNode.querySelector('[data-aue-prop="label"]');

      const anchor = document.createElement('a');
      anchor.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      anchor.setAttribute('data-link-region', 'Footer List');
      anchor.href = link?.querySelector('a')?.href || '#';
      anchor.textContent = label?.textContent.trim() || '';
      if (link?.querySelector('a')?.target) {
        anchor.target = link.querySelector('a').target;
      }
      li.append(anchor);
      ul.append(li);
      moveInstrumentation(itemNode, li);
    });
    footerListDiv.append(ul);
    return footerListDiv;
  };

  footerNavbarLeft.append(createFooterList(footerLinks1));
  footerNavbarLeft.append(createFooterList(footerLinks2));
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  footerNavbarRight.append(createFooterList(footerLinks3));
  footerNavbarRight.append(createFooterList(footerLinks4));
  footerNavbar.append(footerNavbarRight);

  footerBrandRight.append(footerNavbar);
  footerBrandPrimaryContent.append(footerBrandRight);
  footerBrandPrimaryContainer.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandPrimaryContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand__secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const footerBrandSecondaryContainer = document.createElement('div');
  footerBrandSecondaryContainer.className = 'header-container';

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column  header-justify-content-md-between header-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaUl = document.createElement('ul');
  socialMediaUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  socialLinks.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    const anchor = document.createElement('a');
    anchor.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.setAttribute('data-cta-label', link?.dataset.ctaLabel || '');
    anchor.target = '_blank';
    anchor.setAttribute('data-platform-name', link?.dataset.platformName || '');
    anchor.setAttribute('data-social-linktype', 'follow');
    anchor.href = link?.querySelector('a')?.href || '#';

    if (icon) {
      const img = icon.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
        picture.querySelector('img').setAttribute('aria-label', link?.dataset.platformName || '');
        anchor.append(picture);
        moveInstrumentation(icon, picture);
      }
    }
    li.append(anchor);
    socialMediaUl.append(li);
    moveInstrumentation(itemNode, li);
  });
  socialMediaSection.append(socialMediaUl);
  footerBrandSecondaryContent.append(socialMediaSection);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const footerBrandLeftUl = document.createElement('ul');
  footerBrandLeftUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  if (footerItcPortal) {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__left--item header-foot_link';
    const anchor = document.createElement('a');
    anchor.className = 'header-footer-brand__left--link header-analytics_cta_click';
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.target = '_blank';
    anchor.href = footerItcPortal.querySelector('a')?.href || '#';
    anchor.textContent = footerItcPortal.textContent.trim();
    li.append(anchor);
    footerBrandLeftUl.append(li);
    moveInstrumentation(footerItcPortal, li);
  }
  footerBrandLeftSecondary.append(footerBrandLeftUl);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
  if (footerCopyright) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
    copyrightSpan.textContent = footerCopyright.textContent.trim();
    copyrightDiv.append(copyrightSpan);
    moveInstrumentation(footerCopyright, copyrightSpan);
  }
  footerBrandLeftSecondary.append(copyrightDiv);
  footerBrandSecondaryContent.append(footerBrandLeftSecondary);

  footerBrandSecondaryContainer.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerBrandSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  section.append(submenuContainer);

  block.textContent = '';
  block.append(section);
  block.className = `header block`;
  block.dataset.blockStatus = 'loaded';
}
