import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('section');
  headerSection.className = 'header-section header-position-relative header-mb-15';

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-section-app-name header-d-none';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  moveInstrumentation(block.querySelector('.header-section-app-name'), appNameSpan);
  headerSection.append(appNameSpan);

  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-section-boing-container header header-boing-container header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  moveInstrumentation(block.querySelector('header'), headerContainer);

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-section-d-flex header-d-flex header-w-25';
  moveInstrumentation(block.querySelector('header > div:nth-child(1)'), headerLeftDiv);
  headerContainer.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-section-d-flex header-d-flex header-justify-content-center header-w-25';
  moveInstrumentation(block.querySelector('header > div:nth-child(2)'), headerCenterDiv);

  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href;
    logoAnchor.className = 'header-section-analytics_cta_click header-analytics_cta_click';
    logoAnchor.setAttribute('data-ct', '');
    logoAnchor.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(logoLink, logoAnchor);

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';

    const logoImg = block.querySelector('[data-aue-prop="logo"]');
    if (logoImg) {
      const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
      picture.querySelector('img').className = 'header-header__logo-img';
      picture.querySelector('img').setAttribute('fetchpriority', 'high');
      picture.querySelector('img').setAttribute('loading', 'eager');
      moveInstrumentation(logoImg, picture);
      logoDiv.append(picture);
    }
    logoAnchor.append(logoDiv);
    headerCenterDiv.append(logoAnchor);
  }
  headerContainer.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-section-d-flex header-d-flex header-w-25 header-justify-content-end';
  moveInstrumentation(block.querySelector('header > div:nth-child(3)'), headerRightDiv);

  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href;
    loginAnchor.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
    loginAnchor.style.display = 'inline';
    moveInstrumentation(loginLink, loginAnchor);

    const loginButton = document.createElement('button');
    loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = loginLink.textContent.trim(); // Assuming text content is 'Login'
    loginAnchor.append(loginButton);
    headerRightDiv.append(loginAnchor);
  }
  headerContainer.append(headerRightDiv);
  headerSection.append(headerContainer);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-section-submenu-container header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  moveInstrumentation(block.querySelector('.header-section-submenu-container'), submenuContainer);

  const sidebarAside = document.createElement('aside');
  sidebarAside.className = 'header-section-sidebar header-sidebar header-start-0 header-bg-white header-position-absolute';
  moveInstrumentation(block.querySelector('aside'), sidebarAside);

  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.className = 'header-section-sidebar__menu header-sidebar__menu header-list-unstyled header-px-4';

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'header-section-sidebar__menu-item header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    if (itemNode.classList.contains('header-sidebar__menu-item--logout')) {
      li.classList.add('header-sidebar__menu-item--logout');
      li.style.display = 'none';
    }

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const label = itemNode.querySelector('[data-aue-prop="label"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    if (link && label) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-section-sidebar__menu-link header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      anchor.setAttribute('data-consent', link.getAttribute('data-consent'));
      anchor.setAttribute('data-link', link.getAttribute('data-link'));
      if (itemNode.classList.contains('header-sidebar__menu-item--logout')) {
        anchor.classList.add('header-sidebar__menu-item--logout-btn');
      }
      moveInstrumentation(link, anchor);

      if (icon) {
        const picture = createOptimizedPicture(icon.src, icon.alt);
        picture.querySelector('img').className = 'header-section-sidebar__menu-icon header-sidebar__menu-icon header-me-4';
        picture.querySelector('img').setAttribute('loading', 'lazy');
        moveInstrumentation(icon, picture);
        anchor.append(picture);
      }
      anchor.append(label.textContent.trim());
      moveInstrumentation(label, anchor);
      li.append(anchor);
    }
    moveInstrumentation(itemNode, li);
    sidebarMenuUl.append(li);
  });
  sidebarAside.append(sidebarMenuUl);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-section-sidebar__curve header-sidebar__curve';
  moveInstrumentation(block.querySelector('.header-section-sidebar__curve'), sidebarCurve);
  sidebarAside.append(sidebarCurve);

  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-section-footer-brand header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrandDiv.setAttribute('data-isdoodlevariation', 'false');
  moveInstrumentation(block.querySelector('.header-section-footer-brand'), footerBrandDiv);

  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.className = 'header-section-footer-brand__primary header-footer-brand__primary';
  footerPrimarySection.style.backgroundColor = '';
  moveInstrumentation(block.querySelector('.header-section-footer-brand__primary'), footerPrimarySection);

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-section-container header-container';
  footerPrimarySection.append(footerContainer);

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-section-footer-brand__primary--content header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';
  footerContainer.append(footerPrimaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-section-footer-brand__left header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';
  moveInstrumentation(block.querySelector('.header-section-footer-brand__primary--content > .header-section-footer-brand__left'), footerBrandLeft);

  const footerLogoItcLink = block.querySelector('[data-aue-prop="footerLogoITC"]');
  if (footerLogoItcLink) {
    const itcAnchor = document.createElement('a');
    itcAnchor.href = 'https://www.itcportal.com/';
    itcAnchor.target = '_blank';
    itcAnchor.className = 'header-section-footer-brand__logo header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    itcAnchor.setAttribute('data-cta-region', 'Footer');
    itcAnchor.setAttribute('aria-label', 'ITC Logo');
    moveInstrumentation(footerLogoItcLink, itcAnchor);

    const picture = createOptimizedPicture(footerLogoItcLink.src, footerLogoItcLink.alt);
    picture.querySelector('img').className = 'header-section-object-fit-contain header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    picture.querySelector('img').setAttribute('loading', 'lazy');
    itcAnchor.append(picture);
    footerBrandLeft.append(itcAnchor);
  }

  const footerLogoFssiDiv = document.createElement('div');
  footerLogoFssiDiv.className = 'header-section-footer-brand__secondary--logo header-footer-brand__secondary--logo header-d-inline-block';
  const footerLogoFssiImg = block.querySelector('[data-aue-prop="footerLogoFSSI"]');
  if (footerLogoFssiImg) {
    const picture = createOptimizedPicture(footerLogoFssiImg.src, footerLogoFssiImg.alt);
    picture.querySelector('img').className = 'header-section-object-fit-contain header-object-fit-contain header-w-100 header-no-rendition';
    picture.querySelector('img').setAttribute('loading', 'lazy');
    moveInstrumentation(footerLogoFssiImg, picture);
    footerLogoFssiDiv.append(picture);
  }
  footerBrandLeft.append(footerLogoFssiDiv);
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-section-footer-brand__right header-footer-brand__right';
  moveInstrumentation(block.querySelector('.header-section-footer-brand__primary--content > .header-section-footer-brand__right'), footerBrandRight);

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-section-footer-brand__navbar header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNavbar);

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-section-footer-brand__navbar--left header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';
  footerNavbar.append(footerNavbarLeft);

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const linkSets = [[], [], [], []]; // Group into 4 lists as per authored HTML
  footerLinks.forEach((linkNode, index) => {
    linkSets[index % 4].push(linkNode);
  });

  linkSets.forEach(set => {
    if (set.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'header-section-footerList header-footerList';

      const footerListUl = document.createElement('ul');
      footerListUl.className = 'header-section-footer-list header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

      set.forEach(linkNode => {
        const li = document.createElement('li');
        li.className = 'header-section-footer-list__item header-footer-list__item';

        const link = linkNode.querySelector('[data-aue-prop="link"]');
        const label = linkNode.querySelector('[data-aue-prop="label"]');

        if (link && label) {
          const anchor = document.createElement('a');
          anchor.href = link.href;
          anchor.className = 'header-section-cta-analytics header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
          anchor.setAttribute('data-link-region', 'Footer List');
          if (link.target) anchor.target = link.target;
          anchor.textContent = label.textContent.trim();
          moveInstrumentation(link, anchor);
          moveInstrumentation(label, anchor);
          li.append(anchor);
        }
        moveInstrumentation(linkNode, li);
        footerListUl.append(li);
      });
      footerListDiv.append(footerListUl);
      footerNavbarLeft.append(footerListDiv);
    }
  });

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-section-footer-brand__navbar--right header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  footerNavbar.append(footerNavbarRight);

  // The provided HTML structure for footer links is a bit complex with nested divs.
  // To match the structure exactly, we need to create two more 'footerListDiv's for the right side.
  // This assumes the `footerLinks` multifield items are ordered such that the first 6 go to left, next 6 to right.
  // This is an interpretation based on the sample HTML, which has 6 links in left and 6 in right.
  // A more robust solution might require a 'footerLinkGroup' multifield.

  // For now, let's assume the remaining linkSets (if any) go to the right navbar.
  // This part needs adjustment if the number of links or their grouping changes.
  if (linkSets[2].length > 0) {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-section-footerList header-footerList';
    const footerListUl = document.createElement('ul');
    footerListUl.className = 'header-section-footer-list header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
    linkSets[2].forEach(linkNode => {
      const li = document.createElement('li');
      li.className = 'header-section-footer-list__item header-footer-list__item';
      const link = linkNode.querySelector('[data-aue-prop="link"]');
      const label = linkNode.querySelector('[data-aue-prop="label"]');
      if (link && label) {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.className = 'header-section-cta-analytics header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        anchor.setAttribute('data-link-region', 'Footer List');
        if (link.target) anchor.target = link.target;
        anchor.textContent = label.textContent.trim();
        moveInstrumentation(link, anchor);
        moveInstrumentation(label, anchor);
        li.append(anchor);
      }
      moveInstrumentation(linkNode, li);
      footerListUl.append(li);
    });
    footerListDiv.append(footerListUl);
    footerNavbarRight.append(footerListDiv);
  }

  if (linkSets[3].length > 0) {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-section-footerList header-footerList';
    const footerListUl = document.createElement('ul');
    footerListUl.className = 'header-section-footer-list header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
    linkSets[3].forEach(linkNode => {
      const li = document.createElement('li');
      li.className = 'header-section-footer-list__item header-footer-list__item';
      const link = linkNode.querySelector('[data-aue-prop="link"]');
      const label = linkNode.querySelector('[data-aue-prop="label"]');
      if (link && label) {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.className = 'header-section-cta-analytics header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        anchor.setAttribute('data-link-region', 'Footer List');
        if (link.target) anchor.target = link.target;
        anchor.textContent = label.textContent.trim();
        moveInstrumentation(link, anchor);
        moveInstrumentation(label, anchor);
        li.append(anchor);
      }
      moveInstrumentation(linkNode, li);
      footerListUl.append(li);
    });
    footerListDiv.append(footerListUl);
    footerNavbarRight.append(footerListDiv);
  }

  footerPrimaryContent.append(footerBrandRight);
  footerBrandDiv.append(footerPrimarySection);

  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.className = 'header-section-footer-brand__secondary header-footer-brand__secondary';
  footerSecondarySection.style.backgroundColor = '';
  moveInstrumentation(block.querySelector('.header-section-footer-brand__secondary'), footerSecondarySection);

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-section-container header-container';
  footerSecondarySection.append(footerSecondaryContainer);

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-section-footer-brand__secondary--content header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';
  footerSecondaryContainer.append(footerSecondaryContent);

  const footerSecondaryRight = document.createElement('section');
  footerSecondaryRight.className = 'header-section-footer-brand__right header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  moveInstrumentation(block.querySelector('.header-section-footer-brand__secondary--content > .header-section-footer-brand__right'), footerSecondaryRight);

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-section-social_media--title header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  footerSecondaryRight.append(socialMediaTitle);

  const socialLinksUl = document.createElement('ul');
  socialLinksUl.className = 'header-section-footer-brand__right--list header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((itemNode) => {
    const li = document.createElement('li');
    li.className = 'header-section-footer-brand__right--item header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    if (link && icon) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-section-footer-brand__right--link header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
      anchor.target = '_blank';
      anchor.setAttribute('data-platform-name', icon.alt.toLowerCase());
      anchor.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(link, anchor);

      const picture = createOptimizedPicture(icon.src, icon.alt);
      picture.querySelector('img').className = 'header-section-object-fit-contain header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      picture.querySelector('img').setAttribute('aria-label', icon.alt.toLowerCase());
      picture.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(icon, picture);
      anchor.append(picture);
      li.append(anchor);
    }
    moveInstrumentation(itemNode, li);
    socialLinksUl.append(li);
  });
  footerSecondaryRight.append(socialLinksUl);
  footerSecondaryContent.append(footerSecondaryRight);

  const footerSecondaryLeft = document.createElement('section');
  footerSecondaryLeft.className = 'header-section-footer-brand__left header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  moveInstrumentation(block.querySelector('.header-section-footer-brand__secondary--content > .header-section-footer-brand__left'), footerSecondaryLeft);

  const footerSecondaryLeftUl = document.createElement('ul');
  footerSecondaryLeftUl.className = 'header-section-footer-brand__left--list header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  const itcPortalLi = document.createElement('li');
  itcPortalLi.className = 'header-section-footer-brand__left--item header-footer-brand__left--item header-foot_link';
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-section-footer-brand__left--link header-footer-brand__left--link header-analytics_cta_click';
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  itcPortalLi.append(itcPortalLink);
  footerSecondaryLeftUl.append(itcPortalLi);
  footerSecondaryLeft.append(footerSecondaryLeftUl);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-section-footer-brand__left--copyright header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-section-footer-brand__left--text header-footer-brand__left--text header-text-white';
  const copyrightText = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  footerSecondaryLeft.append(copyrightDiv);
  footerSecondaryContent.append(footerSecondaryLeft);
  footerBrandDiv.append(footerSecondarySection);

  sidebarAside.append(footerBrandDiv);
  submenuContainer.append(sidebarAside);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-section-overlay header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  moveInstrumentation(block.querySelector('.header-section-overlay'), overlayDiv);
  submenuContainer.append(overlayDiv);
  headerSection.append(submenuContainer);

  block.textContent = '';
  block.append(headerSection);
  block.className = 'header block';
  block.dataset.blockStatus = 'loaded';
}
