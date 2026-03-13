import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const headerImage = block.querySelector('[data-aue-prop="headerImage"]');
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const menuItems = block.querySelectorAll('[data-aue-model="headerMenuItem"]');
  const footerBrandLogo = block.querySelector('[data-aue-prop="footerBrandLogo"]');
  const footerSecondaryLogo = block.querySelector('[data-aue-prop="footerSecondaryLogo"]');
  const footerMenuItems = block.querySelectorAll('[data-aue-model="footerMenuItem"]');
  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  const footerItcPortalLink = block.querySelector('[data-aue-prop="footerItcPortalLink"]');
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');

  const sectionWrapper = document.createElement('section');
  sectionWrapper.className = 'header-position-relative header-mb-15';

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'header-d-none header-app-name';
    appNameSpan.setAttribute('data-app-name', appName.textContent.trim());
    appNameSpan.textContent = appName.textContent.trim();
    moveInstrumentation(appName, appNameSpan);
    sectionWrapper.append(appNameSpan);
  }

  const headerElement = document.createElement('header');
  headerElement.className = 'header-boing-container header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const headerDiv1 = document.createElement('div');
  headerDiv1.className = 'header-d-flex header-w-25';
  if (headerImage) {
    const img = headerImage.querySelector('img') || headerImage.querySelector('a');
    if (img) {
      const picture = createOptimizedPicture(img.src || img.href, img.alt || '');
      headerDiv1.append(picture);
      moveInstrumentation(headerImage, picture);
    }
  }
  headerElement.append(headerDiv1);

  const headerDiv2 = document.createElement('div');
  headerDiv2.className = 'header-d-flex  header-justify-content-center header-w-25';
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.querySelector('a').href;
    logoAnchor.className = 'header-analytics_cta_click';
    logoAnchor.setAttribute('data-ct', '');
    logoAnchor.setAttribute('a-label', 'header-logo-boing');
    const logoDiv = document.createElement('div');
    logoDiv.className = 'header__logo header-d-flex header-align-items-center';
    if (logoImage) {
      const img = logoImage.querySelector('img') || logoImage.querySelector('a');
      if (img) {
        const picture = createOptimizedPicture(img.src || img.href, img.alt || 'Let\'s Boing');
        picture.querySelector('img').className = 'header__logo-img';
        logoDiv.append(picture);
        moveInstrumentation(logoImage, picture);
      }
    }
    logoAnchor.append(logoDiv);
    moveInstrumentation(logoLink, logoAnchor);
    headerDiv2.append(logoAnchor);
  }
  headerElement.append(headerDiv2);

  const headerDiv3 = document.createElement('div');
  headerDiv3.className = 'header-d-flex header-w-25 header-justify-content-end';
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.querySelector('a').href;
    loginAnchor.className = 'header__login-btn-wrapper header-analytics_cta_click';
    loginAnchor.style.display = 'inline';
    const loginButton = document.createElement('button');
    loginButton.className = 'header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = loginLink.querySelector('a').textContent.trim() || 'Login';
    loginAnchor.append(loginButton);
    moveInstrumentation(loginLink, loginAnchor);
    headerDiv3.append(loginAnchor);
  }
  headerElement.append(headerDiv3);
  sectionWrapper.append(headerElement);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const menuList = document.createElement('ul');
  menuList.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  menuItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-sidebar__menu-item  header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    const link = item.querySelector('[data-aue-prop="link"]');
    const icon = item.querySelector('[data-aue-prop="icon"]');
    const label = item.querySelector('[data-aue-prop="label"]');

    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.querySelector('a').href;
      anchor.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      anchor.setAttribute('data-link', link.querySelector('a').href);

      if (icon) {
        const img = icon.querySelector('img') || icon.querySelector('a');
        if (img) {
          const picture = createOptimizedPicture(img.src || img.href, img.alt || '');
          picture.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
          anchor.append(picture);
          moveInstrumentation(icon, picture);
        }
      }
      if (label) {
        anchor.append(label.textContent.trim());
        moveInstrumentation(label, anchor);
      }
      moveInstrumentation(link, anchor);
      listItem.append(anchor);
    }
    menuList.append(listItem);
    moveInstrumentation(item, listItem);
  });
  aside.append(menuList);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';

  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.className = 'header-footer-brand__primary';
  footerPrimarySection.style.backgroundColor = '';

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  if (footerBrandLogo) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = footerBrandLogo.querySelector('a')?.href || '#';
    logoAnchor.target = '_blank';
    logoAnchor.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    logoAnchor.setAttribute('data-cta-region', 'Footer');
    logoAnchor.setAttribute('aria-label', 'ITC Logo');
    const img = footerBrandLogo.querySelector('img') || footerBrandLogo.querySelector('a');
    if (img) {
      const picture = createOptimizedPicture(img.src || img.href, img.alt || 'ITC Logo');
      picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100';
      logoAnchor.append(picture);
      moveInstrumentation(footerBrandLogo, picture);
    }
    footerBrandLeft.append(logoAnchor);
  }

  if (footerSecondaryLogo) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
    const img = footerSecondaryLogo.querySelector('img') || footerSecondaryLogo.querySelector('a');
    if (img) {
      const picture = createOptimizedPicture(img.src || img.href, img.alt || 'FSSI Logo');
      picture.querySelector('img').className = 'header-object-fit-contain header-w-100';
      secondaryLogoDiv.append(picture);
      moveInstrumentation(footerSecondaryLogo, picture);
    }
    footerBrandLeft.append(secondaryLogoDiv);
  }
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';

  // Group footer menu items into two lists for left and two for right
  const footerMenuLists = [[], [], [], []];
  footerMenuItems.forEach((item, index) => {
    footerMenuLists[index % 4].push(item);
  });

  footerMenuLists.forEach((listItems, listIndex) => {
    if (listItems.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'header-footerList';
      const ul = document.createElement('ul');
      ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
      listItems.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'header-footer-list__item';
        const link = item.querySelector('[data-aue-prop="link"]');
        const label = item.querySelector('[data-aue-prop="label"]');
        if (link) {
          const anchor = document.createElement('a');
          anchor.href = link.querySelector('a').href;
          anchor.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
          anchor.setAttribute('data-link-region', 'Footer List');
          if (link.querySelector('a').target) {
            anchor.target = link.querySelector('a').target;
          }
          anchor.textContent = label ? label.textContent.trim() : link.querySelector('a').textContent.trim();
          moveInstrumentation(link, anchor);
          if (label) moveInstrumentation(label, anchor);
          li.append(anchor);
        }
        ul.append(li);
        moveInstrumentation(item, li);
      });
      footerListDiv.append(ul);
      if (listIndex < 2) {
        footerNavbarLeft.append(footerListDiv);
      } else {
        footerNavbarRight.append(footerListDiv);
      }
    }
  });

  footerNavbar.append(footerNavbarLeft, footerNavbarRight);
  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerContainer.append(footerPrimaryContent);
  footerPrimarySection.append(footerContainer);
  footerBrandDiv.append(footerPrimarySection);

  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.className = 'header-footer-brand__secondary';
  footerSecondarySection.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column  header-justify-content-md-between header-align-items-center';

  const footerSocialRight = document.createElement('section');
  footerSocialRight.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  footerSocialRight.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  socialLinks.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
    const link = item.querySelector('[data-aue-prop="link"]');
    const icon = item.querySelector('[data-aue-prop="icon"]');

    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.querySelector('a').href;
      anchor.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      // Extract platform name from href for data-cta-label and data-platform-name
      const url = new URL(anchor.href);
      let platformName = '';
      if (url.hostname.includes('facebook')) {
        platformName = 'facebook';
      } else if (url.hostname.includes('instagram')) {
        platformName = 'instagram';
      } else if (url.hostname.includes('youtube')) {
        platformName = 'youtube';
      }
      anchor.setAttribute('data-cta-label', `footer-${platformName}`);
      anchor.target = '_blank';
      anchor.setAttribute('data-platform-name', platformName);
      anchor.setAttribute('data-social-linktype', 'follow');

      if (icon) {
        const img = icon.querySelector('img') || icon.querySelector('a');
        if (img) {
          const picture = createOptimizedPicture(img.src || img.href, img.alt || platformName);
          picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100';
          picture.querySelector('img').setAttribute('aria-label', platformName);
          anchor.append(picture);
          moveInstrumentation(icon, picture);
        }
      }
      moveInstrumentation(link, anchor);
      li.append(anchor);
    }
    socialList.append(li);
    moveInstrumentation(item, li);
  });
  footerSocialRight.append(socialList);
  footerSecondaryContent.append(footerSocialRight);

  const footerCopyrightLeft = document.createElement('section');
  footerCopyrightLeft.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  if (footerItcPortalLink) {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__left--item header-foot_link';
    const anchor = document.createElement('a');
    anchor.href = footerItcPortalLink.querySelector('a').href;
    anchor.target = '_blank';
    anchor.className = 'header-footer-brand__left--link header-analytics_cta_click';
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.textContent = footerItcPortalLink.querySelector('a').textContent.trim() || 'ITC portal';
    moveInstrumentation(footerItcPortalLink, anchor);
    li.append(anchor);
    copyrightList.append(li);
  }
  footerCopyrightLeft.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
  if (copyrightText) {
    const span = document.createElement('span');
    span.className = 'header-footer-brand__left--text header-text-white';
    span.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, span);
    copyrightDiv.append(span);
  }
  footerCopyrightLeft.append(copyrightDiv);
  footerSecondaryContent.append(footerCopyrightLeft);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondarySection.append(footerSecondaryContainer);
  footerBrandDiv.append(footerSecondarySection);

  aside.append(footerBrandDiv);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  sectionWrapper.append(submenuContainer);

  block.textContent = '';
  block.append(sectionWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
