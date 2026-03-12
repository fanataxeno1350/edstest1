import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const headerLogo = block.querySelector('[data-aue-prop="headerLogo"]');
  const headerLogoLink = block.querySelector('[data-aue-prop="headerLogoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const menuItems = block.querySelectorAll('[data-aue-model="headerMenuItem"]');
  const footerPrimaryLogo = block.querySelector('[data-aue-prop="footerPrimaryLogo"]');
  const footerSecondaryLogo = block.querySelector('[data-aue-prop="footerSecondaryLogo"]');
  const footerMenuItems = block.querySelectorAll('[data-aue-model="footerMenuItem"]');
  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  const footerItcPortalLink = block.querySelector('[data-aue-prop="footerItcPortalLink"]');
  const copyright = block.querySelector('[data-aue-prop="copyright"]');

  block.textContent = '';

  const section = document.createElement('section');
  section.className = 'header-position-relative header-mb-15';

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'header-d-none header-app-name';
    appNameSpan.dataset.appName = appName.textContent.trim();
    appNameSpan.append(appName.textContent.trim());
    moveInstrumentation(appName, appNameSpan);
    section.append(appNameSpan);
  }

  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  header.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-d-flex header-justify-content-center header-w-25';
  if (headerLogoLink) {
    const logoLink = document.createElement('a');
    logoLink.href = headerLogoLink.href || '/';
    logoLink.className = 'header-analytics_cta_click';
    logoLink.dataset.ct = '';
    logoLink.setAttribute('aria-label', 'header-logo-boing');

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';

    if (headerLogo) {
      const img = headerLogo.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, true, [{ width: '150' }]);
        picture.querySelector('img').className = 'header-header__logo-img';
        logoDiv.append(picture);
        moveInstrumentation(headerLogo, picture);
      }
    }
    logoLink.append(logoDiv);
    moveInstrumentation(headerLogoLink, logoLink);
    headerCenterDiv.append(logoLink);
  }
  header.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  if (loginLink) {
    const loginAnchor = loginLink.querySelector('a');
    if (loginAnchor) {
      const newLoginAnchor = document.createElement('a');
      newLoginAnchor.href = loginAnchor.href;
      newLoginAnchor.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
      newLoginAnchor.style.display = 'inline';

      const loginButton = document.createElement('button');
      loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
      loginButton.textContent = loginAnchor.textContent.trim();

      newLoginAnchor.append(loginButton);
      moveInstrumentation(loginLink, newLoginAnchor);
      headerRightDiv.append(newLoginAnchor);
    }
  }
  header.append(headerRightDiv);
  section.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const menuList = document.createElement('ul');
  menuList.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  menuItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    const label = itemNode.querySelector('[data-aue-prop="label"]');

    if (link) {
      const anchor = link.querySelector('a');
      if (anchor) {
        const newAnchor = document.createElement('a');
        newAnchor.href = anchor.href;
        newAnchor.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
        newAnchor.dataset.consent = anchor.dataset.consent || 'false';
        newAnchor.dataset.link = anchor.dataset.link || '';

        if (icon) {
          const img = icon.querySelector('img');
          if (img) {
            const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '24' }]);
            picture.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
            newAnchor.append(picture);
            moveInstrumentation(icon, picture);
          }
        }

        if (label) {
          newAnchor.append(label.textContent.trim());
          moveInstrumentation(label, newAnchor);
        } else {
          newAnchor.append(anchor.textContent.trim());
        }
        listItem.append(newAnchor);
        moveInstrumentation(link, newAnchor);
      }
    }
    if (itemNode.classList.contains('header-sidebar__menu-item--logout')) {
      listItem.classList.add('header-sidebar__menu-item--logout');
      listItem.style.display = 'none';
    }
    menuList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  aside.append(menuList);

  const curveDiv = document.createElement('div');
  curveDiv.className = 'header-sidebar__curve';
  aside.append(curveDiv);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.dataset.isdoodlevariation = 'false';

  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.className = 'header-footer-brand__primary';
  footerPrimarySection.style.backgroundColor = '';

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  if (footerPrimaryLogo) {
    const primaryLogoLink = footerPrimaryLogo.querySelector('a');
    if (primaryLogoLink) {
      const newPrimaryLogoLink = document.createElement('a');
      newPrimaryLogoLink.href = primaryLogoLink.href;
      newPrimaryLogoLink.target = '_blank';
      newPrimaryLogoLink.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
      newPrimaryLogoLink.dataset.ctaRegion = 'Footer';
      newPrimaryLogoLink.setAttribute('aria-label', 'ITC Logo');

      const img = primaryLogoLink.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }]);
        picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
        newPrimaryLogoLink.append(picture);
        moveInstrumentation(footerPrimaryLogo, newPrimaryLogoLink);
      }
      footerBrandLeft.append(newPrimaryLogoLink);
    }
  }

  if (footerSecondaryLogo) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
    const img = footerSecondaryLogo.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '100' }]);
      picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
      secondaryLogoDiv.append(picture);
      moveInstrumentation(footerSecondaryLogo, secondaryLogoDiv);
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
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';

  // Group footer menu items into two lists for left and two for right
  const groupedFooterMenuItems = [[], [], [], []];
  footerMenuItems.forEach((item, index) => {
    groupedFooterMenuItems[index % 4].push(item);
  });

  groupedFooterMenuItems.forEach((group, groupIndex) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    const footerListUl = document.createElement('ul');
    footerListUl.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

    group.forEach((itemNode) => {
      const listItem = document.createElement('li');
      listItem.className = 'header-footer-list__item';

      const link = itemNode.querySelector('[data-aue-prop="link"]');
      const label = itemNode.querySelector('[data-aue-prop="label"]');

      if (link) {
        const anchor = link.querySelector('a');
        if (anchor) {
          const newAnchor = document.createElement('a');
          newAnchor.href = anchor.href;
          newAnchor.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
          newAnchor.dataset.linkRegion = 'Footer List';
          if (anchor.target) newAnchor.target = anchor.target;
          if (label) {
            newAnchor.textContent = label.textContent.trim();
            moveInstrumentation(label, newAnchor);
          } else {
            newAnchor.textContent = anchor.textContent.trim();
          }
          listItem.append(newAnchor);
          moveInstrumentation(link, newAnchor);
        }
      }
      footerListUl.append(listItem);
      moveInstrumentation(itemNode, listItem);
    });
    footerListDiv.append(footerListUl);

    if (groupIndex < 2) {
      footerNavbarLeft.append(footerListDiv);
    } else {
      footerNavbarRight.append(footerListDiv);
    }
  });

  footerNavbar.append(footerNavbarLeft, footerNavbarRight);
  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerContainer.append(footerPrimaryContent);
  footerPrimarySection.append(footerContainer);
  footerBrand.append(footerPrimarySection);

  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.className = 'header-footer-brand__secondary';
  footerSecondarySection.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaRight = document.createElement('section');
  socialMediaRight.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaRight.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  socialLinks.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    if (link) {
      const anchor = link.querySelector('a');
      if (anchor) {
        const newAnchor = document.createElement('a');
        newAnchor.href = anchor.href;
        newAnchor.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
        newAnchor.dataset.ctaRegion = 'Footer';
        newAnchor.dataset.ctaLabel = `footer-${anchor.dataset.platformName || 'social'}`;
        newAnchor.target = '_blank';
        newAnchor.dataset.platformName = anchor.dataset.platformName || '';
        newAnchor.dataset.socialLinktype = 'follow';

        if (icon) {
          const img = icon.querySelector('img');
          if (img) {
            const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '32' }]);
            picture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
            picture.querySelector('img').setAttribute('aria-label', anchor.dataset.platformName || 'social icon');
            newAnchor.append(picture);
            moveInstrumentation(icon, picture);
          }
        }
        listItem.append(newAnchor);
        moveInstrumentation(link, newAnchor);
      }
    }
    socialMediaList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  socialMediaRight.append(socialMediaList);
  footerSecondaryContent.append(socialMediaRight);

  const footerBottomLeft = document.createElement('section');
  footerBottomLeft.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const footerBottomLeftList = document.createElement('ul');
  footerBottomLeftList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  if (footerItcPortalLink) {
    const itcLink = footerItcPortalLink.querySelector('a');
    if (itcLink) {
      const listItem = document.createElement('li');
      listItem.className = 'header-footer-brand__left--item header-foot_link';
      const newAnchor = document.createElement('a');
      newAnchor.href = itcLink.href;
      newAnchor.target = '_blank';
      newAnchor.className = 'header-footer-brand__left--link header-analytics_cta_click';
      newAnchor.dataset.ctaRegion = 'Footer';
      newAnchor.textContent = itcLink.textContent.trim();
      listItem.append(newAnchor);
      moveInstrumentation(footerItcPortalLink, newAnchor);
      footerBottomLeftList.append(listItem);
    }
  }
  footerBottomLeft.append(footerBottomLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  if (copyright) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
    copyrightSpan.innerHTML = copyright.innerHTML;
    moveInstrumentation(copyright, copyrightSpan);
    copyrightDiv.append(copyrightSpan);
  }
  footerBottomLeft.append(copyrightDiv);

  footerSecondaryContent.append(footerBottomLeft);
  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondarySection.append(footerSecondaryContainer);
  footerBrand.append(footerSecondarySection);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);
  section.append(submenuContainer);

  block.append(section);

  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}