import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const logo = block.querySelector('[data-aue-prop="logo"]');
  const secondaryLogo = block.querySelector('[data-aue-prop="secondaryLogo"]');
  const fssiLogo = block.querySelector('[data-aue-prop="fssiLogo"]');
  const loginButtonLink = block.querySelector('[data-aue-prop="loginButtonLink"]');
  const menuItems = block.querySelectorAll('[data-aue-model="menuItem"]');
  const footerNavItems = block.querySelectorAll('[data-aue-model="footerNavItem"]');
  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');

  const section = document.createElement('section');
  section.className = 'header-position-relative header-mb-15';

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'header-d-none header-app-name';
    appNameSpan.setAttribute('data-app-name', appName.textContent.trim());
    appNameSpan.textContent = appName.textContent.trim();
    moveInstrumentation(appName, appNameSpan);
    section.append(appNameSpan);
  }

  const header = document.createElement('header');
  header.className = 'header-boing-container header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const div1 = document.createElement('div');
  div1.className = 'header-d-flex header-w-25';
  // Assuming there might be content here that is not directly mapped in JSON, e.g., a hamburger menu icon
  // For now, it's empty as per the provided HTML structure.
  header.append(div1);

  const div2 = document.createElement('div');
  div2.className = 'header-d-flex  header-justify-content-center header-w-25';
  if (logo) {
    const logoLink = logo.querySelector('a') || document.createElement('a');
    if (!logoLink.href) {
      const fallbackLink = logo.querySelector('p a');
      if (fallbackLink) logoLink.href = fallbackLink.href;
    }
    logoLink.className = 'header-analytics_cta_click';
    logoLink.setAttribute('data-ct', '');
    logoLink.setAttribute('a-label', 'header-logo-boing');

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header__logo header-d-flex header-align-items-center';

    const imgElement = logo.querySelector('img');
    if (imgElement) {
      const optimizedPicture = createOptimizedPicture(imgElement.src, imgElement.alt, true, [{ width: '100vw' }]);
      optimizedPicture.querySelector('img').className = 'header__logo-img';
      logoDiv.append(optimizedPicture);
    }
    logoLink.append(logoDiv);
    moveInstrumentation(logo, logoLink);
    div2.append(logoLink);
  }
  header.append(div2);

  const div3 = document.createElement('div');
  div3.className = 'header-d-flex header-w-25 header-justify-content-end';
  if (loginButtonLink) {
    const loginLink = loginButtonLink.querySelector('a') || document.createElement('a');
    if (!loginLink.href) {
      const fallbackLink = loginButtonLink.querySelector('p a');
      if (fallbackLink) loginLink.href = fallbackLink.href;
    }
    loginLink.className = 'header__login-btn-wrapper header-analytics_cta_click';
    loginLink.style.display = 'inline';

    const loginButton = document.createElement('button');
    loginButton.className = 'header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = loginButtonLink.textContent.trim();
    loginLink.append(loginButton);
    moveInstrumentation(loginButtonLink, loginLink);
    div3.append(loginLink);
  }
  header.append(div3);
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

    const linkElement = itemNode.querySelector('[data-aue-prop="link"] a') || document.createElement('a');
    if (!linkElement.href) {
      const fallbackLink = itemNode.querySelector('[data-aue-prop="link"] p a');
      if (fallbackLink) linkElement.href = fallbackLink.href;
    }
    linkElement.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
    linkElement.setAttribute('data-consent', 'false'); // Default, adjust if needed
    linkElement.setAttribute('data-link', linkElement.href);

    const iconElement = itemNode.querySelector('[data-aue-prop="icon"] img');
    if (iconElement) {
      const optimizedPicture = createOptimizedPicture(iconElement.src, iconElement.alt);
      optimizedPicture.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      linkElement.append(optimizedPicture);
    }

    const labelElement = itemNode.querySelector('[data-aue-prop="label"]');
    if (labelElement) {
      linkElement.append(labelElement.textContent.trim());
      moveInstrumentation(labelElement, linkElement);
    }

    listItem.append(linkElement);
    moveInstrumentation(itemNode, listItem);
    menuList.append(listItem);
  });

  // Add the logout item if it exists in the original HTML, with its specific classes
  const logoutItem = block.querySelector('.header-sidebar__menu-item--logout');
  if (logoutItem) {
    menuList.append(logoutItem);
  }

  aside.append(menuList);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand__primary';
  footerBrandPrimary.style.backgroundColor = '';

  const footerContainer = document.createElement('div');
  footerContainer.className = 'header-container';

  const footerContent = document.createElement('div');
  footerContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  if (secondaryLogo) {
    const logoLink = secondaryLogo.querySelector('a') || document.createElement('a');
    if (!logoLink.href) {
      const fallbackLink = secondaryLogo.querySelector('p a');
      if (fallbackLink) logoLink.href = fallbackLink.href;
    }
    logoLink.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    logoLink.setAttribute('data-cta-region', 'Footer');
    logoLink.setAttribute('aria-label', 'ITC Logo');
    logoLink.target = '_blank';

    const imgElement = secondaryLogo.querySelector('img');
    if (imgElement) {
      const optimizedPicture = createOptimizedPicture(imgElement.src, imgElement.alt);
      optimizedPicture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      logoLink.append(optimizedPicture);
    }
    moveInstrumentation(secondaryLogo, logoLink);
    footerBrandLeft.append(logoLink);
  }

  if (fssiLogo) {
    const fssiDiv = document.createElement('div');
    fssiDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
    const imgElement = fssiLogo.querySelector('img');
    if (imgElement) {
      const optimizedPicture = createOptimizedPicture(imgElement.src, imgElement.alt);
      optimizedPicture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
      fssiDiv.append(optimizedPicture);
    }
    moveInstrumentation(fssiLogo, fssiDiv);
    footerBrandLeft.append(fssiDiv);
  }
  footerContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  footerNavbar.append(footerNavbarRight);

  // Group footerNavItems into two columns for left and two for right, as per HTML structure
  const columnGroups = [[], [], [], []];
  footerNavItems.forEach((item, index) => {
    columnGroups[index % 4].push(item);
  });

  columnGroups.forEach((group, groupIndex) => {
    if (group.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'header-footerList';

      const footerListUl = document.createElement('ul');
      footerListUl.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

      group.forEach((itemNode) => {
        const listItem = document.createElement('li');
        listItem.className = 'header-footer-list__item';

        const linkElement = itemNode.querySelector('[data-aue-prop="link"] a') || document.createElement('a');
        if (!linkElement.href) {
          const fallbackLink = itemNode.querySelector('[data-aue-prop="link"] p a');
          if (fallbackLink) linkElement.href = fallbackLink.href;
        }
        linkElement.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        linkElement.setAttribute('data-link-region', 'Footer List');

        const labelElement = itemNode.querySelector('[data-aue-prop="label"]');
        if (labelElement) {
          linkElement.textContent = labelElement.textContent.trim();
          moveInstrumentation(labelElement, linkElement);
        }

        listItem.append(linkElement);
        moveInstrumentation(itemNode, listItem);
        footerListUl.append(listItem);
      });
      footerListDiv.append(footerListUl);
      if (groupIndex < 2) {
        footerNavbarLeft.append(footerListDiv);
      } else {
        footerNavbarRight.append(footerListDiv);
      }
    }
  });

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
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column  header-justify-content-md-between header-align-items-center';

  const footerSecondaryRight = document.createElement('section');
  footerSecondaryRight.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  footerSecondaryRight.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  socialLinks.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

    const linkElement = itemNode.querySelector('[data-aue-prop="link"] a') || document.createElement('a');
    if (!linkElement.href) {
      const fallbackLink = itemNode.querySelector('[data-aue-prop="link"] p a');
      if (fallbackLink) linkElement.href = fallbackLink.href;
    }
    linkElement.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
    linkElement.setAttribute('data-cta-region', 'Footer');
    linkElement.setAttribute('data-cta-label', `footer-${linkElement.href.includes('facebook') ? 'facebook' : linkElement.href.includes('instagram') ? 'instagram' : 'youtube'}`);
    linkElement.target = '_blank';
    linkElement.setAttribute('data-platform-name', linkElement.href.includes('facebook') ? 'facebook' : linkElement.href.includes('instagram') ? 'instagram' : 'youtube');
    linkElement.setAttribute('data-social-linktype', 'follow');

    const iconElement = itemNode.querySelector('[data-aue-prop="icon"] img');
    if (iconElement) {
      const optimizedPicture = createOptimizedPicture(iconElement.src, iconElement.alt);
      optimizedPicture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      optimizedPicture.querySelector('img').setAttribute('aria-label', iconElement.alt);
      linkElement.append(optimizedPicture);
    }
    listItem.append(linkElement);
    moveInstrumentation(itemNode, listItem);
    socialMediaList.append(listItem);
  });

  footerSecondaryRight.append(socialMediaList);
  footerSecondaryContent.append(footerSecondaryRight);

  const footerSecondaryLeft = document.createElement('section');
  footerSecondaryLeft.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const footerSecondaryLeftList = document.createElement('ul');
  footerSecondaryLeftList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  if (itcPortalLink) {
    const listItem = document.createElement('li');
    listItem.className = 'header-footer-brand__left--item header-foot_link';
    const linkElement = itcPortalLink.querySelector('a') || document.createElement('a');
    if (!linkElement.href) {
      const fallbackLink = itcPortalLink.querySelector('p a');
      if (fallbackLink) linkElement.href = fallbackLink.href;
    }
    linkElement.className = 'header-footer-brand__left--link header-analytics_cta_click';
    linkElement.setAttribute('data-cta-region', 'Footer');
    linkElement.target = '_blank';
    linkElement.textContent = itcPortalLink.textContent.trim();
    listItem.append(linkElement);
    moveInstrumentation(itcPortalLink, listItem);
    footerSecondaryLeftList.append(listItem);
  }
  footerSecondaryLeft.append(footerSecondaryLeftList);

  if (copyrightText) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
    copyrightSpan.textContent = copyrightText.textContent.trim();
    copyrightDiv.append(copyrightSpan);
    moveInstrumentation(copyrightText, copyrightDiv);
    footerSecondaryLeft.append(copyrightDiv);
  }

  footerSecondaryContent.append(footerSecondaryLeft);
  footerSecondaryContainer.append(footerSecondaryContent);
  footerBrandSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  section.append(submenuContainer);

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
