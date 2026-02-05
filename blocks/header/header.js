import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const mainSection = document.createElement('section');
  mainSection.className = 'header-position-relative header-mb-15';

  const appNameDiv = block.querySelector('[data-aue-prop="appName"]');
  if (appNameDiv) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'header-d-none header-app-name';
    appNameSpan.textContent = appNameDiv.textContent;
    appNameSpan.setAttribute('data-app-name', appNameDiv.textContent);
    mainSection.append(appNameSpan);
    moveInstrumentation(appNameDiv, appNameSpan);
  }

  const header = document.createElement('header');
  header.className = 'header-boing-container header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  header.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'header-d-flex  header-justify-content-center header-w-25';
  const headerLogoLink = block.querySelector('[data-aue-prop="headerLogoLink"]');
  const headerLogo = block.querySelector('[data-aue-prop="headerLogo"]');
  if (headerLogoLink && headerLogo) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = headerLogoLink.querySelector('a')?.href || '#';
    logoAnchor.className = 'header-analytics_cta_click';
    logoAnchor.setAttribute('data-ct', '');
    logoAnchor.setAttribute('a-label', 'header-logo-boing');
    const logoDiv = document.createElement('div');
    logoDiv.className = 'header__logo header-d-flex header-align-items-center';
    const logoImg = headerLogo.querySelector('img');
    if (logoImg) {
      logoDiv.append(createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '100px' }]));
    }
    logoAnchor.append(logoDiv);
    headerCenterDiv.append(logoAnchor);
    moveInstrumentation(headerLogoLink, logoAnchor);
    moveInstrumentation(headerLogo, logoDiv);
  }
  header.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.querySelector('a')?.href || '#';
    loginAnchor.className = 'header__login-btn-wrapper header-analytics_cta_click';
    loginAnchor.style.display = 'inline';
    const loginButton = document.createElement('button');
    loginButton.className = 'header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = loginLink.querySelector('a')?.textContent || 'Login';
    loginAnchor.append(loginButton);
    headerRightDiv.append(loginAnchor);
    moveInstrumentation(loginLink, loginAnchor);
  }
  header.append(headerRightDiv);
  mainSection.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const menuItemsUl = document.createElement('ul');
  menuItemsUl.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  const menuItems = block.querySelectorAll('[data-aue-model="headerMenuItem"]');
  menuItems.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-sidebar__menu-item  header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    const link = item.querySelector('[data-aue-prop="link"]');
    const icon = item.querySelector('[data-aue-prop="icon"]');
    const label = item.querySelector('[data-aue-prop="label"]');

    if (link && label) {
      const anchor = document.createElement('a');
      anchor.href = link.querySelector('a')?.href || '#';
      anchor.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      anchor.setAttribute('data-link', link.querySelector('a')?.href || '');
      if (icon) {
        const img = icon.querySelector('img');
        if (img) {
          const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '24px' }]);
          optimizedPicture.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
          optimizedPicture.querySelector('img').loading = 'lazy';
          anchor.append(optimizedPicture);
        }
        moveInstrumentation(icon, anchor);
      }
      anchor.append(label.textContent);
      li.append(anchor);
      moveInstrumentation(link, anchor);
      moveInstrumentation(label, anchor);
    }
    menuItemsUl.append(li);
    moveInstrumentation(item, li);
  });

  // Add the logout item if it exists in the original block
  const logoutItem = block.querySelector('.header__menu-item--logout');
  if (logoutItem) {
    menuItemsUl.append(logoutItem);
  }

  sidebar.append(menuItemsUl);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  sidebar.append(sidebarCurve);

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

  const brandLogo = block.querySelector('[data-aue-prop="brandLogo"]');
  if (brandLogo) {
    const brandAnchor = document.createElement('a');
    brandAnchor.href = brandLogo.querySelector('a')?.href || '#';
    brandAnchor.target = '_blank';
    brandAnchor.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    brandAnchor.setAttribute('data-cta-region', 'Footer');
    brandAnchor.setAttribute('aria-label', 'ITC Logo');
    const brandImg = brandLogo.querySelector('img');
    if (brandImg) {
      const optimizedPicture = createOptimizedPicture(brandImg.src, brandImg.alt, false, [{ width: '100px' }]);
      optimizedPicture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100';
      optimizedPicture.querySelector('img').loading = 'lazy';
      brandAnchor.append(optimizedPicture);
    }
    footerBrandLeft.append(brandAnchor);
    moveInstrumentation(brandLogo, brandAnchor);
  }

  const secondaryLogo = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogo) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
    const secondaryImg = secondaryLogo.querySelector('img');
    if (secondaryImg) {
      const optimizedPicture = createOptimizedPicture(secondaryImg.src, secondaryImg.alt, false, [{ width: '100px' }]);
      optimizedPicture.querySelector('img').className = 'header-object-fit-contain header-w-100';
      optimizedPicture.querySelector('img').loading = 'lazy';
      secondaryLogoDiv.append(optimizedPicture);
    }
    footerBrandLeft.append(secondaryLogoDiv);
    moveInstrumentation(secondaryLogo, secondaryLogoDiv);
  }
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';

  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');

  const footerNavLeft = document.createElement('div');
  footerNavLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const linkGroups = [[], [], [], []]; // Assuming 4 columns based on HTML
  footerLinks.forEach((linkItem, index) => {
    linkGroups[index % 4].push(linkItem);
  });

  linkGroups.forEach((group) => {
    if (group.length > 0) {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'header-footerList';
      const footerUl = document.createElement('ul');
      footerUl.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
      group.forEach((linkItem) => {
        const li = document.createElement('li');
        li.className = 'header-footer-list__item';
        const link = linkItem.querySelector('[data-aue-prop="link"]');
        const label = linkItem.querySelector('[data-aue-prop="label"]');
        if (link && label) {
          const anchor = document.createElement('a');
          anchor.href = link.querySelector('a')?.href || '#';
          anchor.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
          anchor.setAttribute('data-link-region', 'Footer List');
          if (link.querySelector('a')?.target) {
            anchor.target = link.querySelector('a')?.target;
          }
          anchor.textContent = label.textContent;
          li.append(anchor);
          moveInstrumentation(link, anchor);
          moveInstrumentation(label, anchor);
        }
        footerUl.append(li);
        moveInstrumentation(linkItem, li);
      });
      footerListDiv.append(footerUl);
      footerNavLeft.append(footerListDiv);
    }
  });
  footerNav.append(footerNavLeft);

  // To match the HTML structure, the footer links are split into two `footer-brand__navbar--left` and `footer-brand__navbar--right`
  // For simplicity, I'm appending all generated lists to footerNavLeft and footerNavRight based on the original structure.
  const footerNavRight = document.createElement('div');
  footerNavRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  // If there are more than 2 link groups, they would go into footerNavRight
  // For this specific example, all links are already handled by the logic above.
  // If the block JSON were to define separate multifields for left and right, this would need adjustment.
  footerNav.append(footerNavRight);

  footerBrandRight.append(footerNav);
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

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  footerSocialRight.append(socialMediaTitle);

  const socialUl = document.createElement('ul');
  socialUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  footerSocialLinks.forEach((socialItem) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
    const link = socialItem.querySelector('[data-aue-prop="link"]');
    const icon = socialItem.querySelector('[data-aue-prop="icon"]');

    if (link && icon) {
      const anchor = document.createElement('a');
      anchor.href = link.querySelector('a')?.href || '#';
      anchor.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${icon.querySelector('img')?.alt.toLowerCase() || 'social'}`);
      anchor.target = '_blank';
      anchor.setAttribute('data-platform-name', icon.querySelector('img')?.alt.toLowerCase() || '');
      anchor.setAttribute('data-social-linktype', 'follow');
      const img = icon.querySelector('img');
      if (img) {
        const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '32px' }]);
        optimizedPicture.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100';
        optimizedPicture.querySelector('img').loading = 'lazy';
        anchor.append(optimizedPicture);
      }
      li.append(anchor);
      moveInstrumentation(link, anchor);
      moveInstrumentation(icon, anchor);
    }
    socialUl.append(li);
    moveInstrumentation(socialItem, li);
  });
  footerSocialRight.append(socialUl);
  footerSecondaryContent.append(footerSocialRight);

  const footerCopyrightLeft = document.createElement('section');
  footerCopyrightLeft.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const footerCopyrightUl = document.createElement('ul');
  footerCopyrightUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  const footerBrandLink = block.querySelector('[data-aue-prop="footerBrandLink"]');
  if (footerBrandLink) {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__left--item header-foot_link';
    const anchor = document.createElement('a');
    anchor.href = footerBrandLink.querySelector('a')?.href || '#';
    anchor.target = '_blank';
    anchor.className = 'header-footer-brand__left--link header-analytics_cta_click';
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.textContent = footerBrandLink.querySelector('a')?.textContent || 'ITC portal';
    li.append(anchor);
    footerCopyrightUl.append(li);
    moveInstrumentation(footerBrandLink, anchor);
  }
  footerCopyrightLeft.append(footerCopyrightUl);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  const copyright = block.querySelector('[data-aue-prop="copyright"]');
  if (copyright) {
    copyrightSpan.textContent = copyright.textContent;
    moveInstrumentation(copyright, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  footerCopyrightLeft.append(copyrightDiv);
  footerSecondaryContent.append(footerCopyrightLeft);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondarySection.append(footerSecondaryContainer);
  footerBrandDiv.append(footerSecondarySection);

  sidebar.append(footerBrandDiv);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  mainSection.append(submenuContainer);

  block.textContent = '';
  block.append(mainSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
