import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const logo = block.querySelector('[data-aue-prop="logo"]');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const sidebarLogo = block.querySelector('[data-aue-prop="sidebarLogo"]');
  const menuItems = block.querySelectorAll('[data-aue-model="headerMenuItem"]');
  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  const footerList1 = block.querySelectorAll('[data-aue-model="footerList1"]');
  const footerList2 = block.querySelectorAll('[data-aue-model="footerList2"]');
  const footerList3 = block.querySelectorAll('[data-aue-model="footerList3"]');
  const footerList4 = block.querySelectorAll('[data-aue-model="footerList4"]');
  const socialIcons = block.querySelectorAll('[data-aue-model="socialIcon"]');
  const footerLink = block.querySelector('[data-aue-prop="footerLink"]');
  const copyright = block.querySelector('[data-aue-prop="copyright"]');

  const section = document.createElement('section');
  section.classList.add('header-position-relative', 'header-mb-15');

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.classList.add('header-d-none', 'header-app-name');
    appNameSpan.setAttribute('data-app-name', appName.textContent.trim());
    appNameSpan.textContent = appName.textContent.trim();
    moveInstrumentation(appName, appNameSpan);
    section.append(appNameSpan);
  }

  const header = document.createElement('header');
  header.classList.add('boing-container', 'header-header', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center', 'header-h-15', 'header-px-5', 'header-py-2', 'header-fixed-top', 'header-w-100', 'header-bg-white');

  const headerDiv1 = document.createElement('div');
  headerDiv1.classList.add('header-d-flex', 'header-w-25');
  // No direct content for headerDiv1 based on provided HTML, it's for a placeholder/icon
  header.append(headerDiv1);

  const headerDiv2 = document.createElement('div');
  headerDiv2.classList.add('header-d-flex', 'header-justify-content-center', 'header-w-25');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href;
    logoAnchor.classList.add('header-analytics_cta_click');
    logoAnchor.setAttribute('data-ct', '');
    logoAnchor.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(logoLink, logoAnchor);

    const logoDiv = document.createElement('div');
    logoDiv.classList.add('header__logo', 'header-d-flex', 'header-align-items-center');

    if (logo) {
      const logoImg = createOptimizedPicture(logo.src, logo.alt, true, [{ width: '100px' }]);
      logoImg.querySelector('img').classList.add('header__logo-img');
      logoDiv.append(logoImg);
      moveInstrumentation(logo, logoImg);
    }
    logoAnchor.append(logoDiv);
    headerDiv2.append(logoAnchor);
  }
  header.append(headerDiv2);

  const headerDiv3 = document.createElement('div');
  headerDiv3.classList.add('header-d-flex', 'header-w-25', 'header-justify-content-end');
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href;
    loginAnchor.classList.add('header__login-btn-wrapper', 'header-analytics_cta_click');
    loginAnchor.style.display = 'inline';
    moveInstrumentation(loginLink, loginAnchor);

    const loginButton = document.createElement('button');
    loginButton.classList.add('header__login-btn', 'header-btn', 'header-text-boing-primary', 'header-bg-transparent', 'header-fw-semibold', 'header-rounded-4', 'header-btn-sm', 'header-py-3', 'header-px-4');
    loginButton.textContent = loginLink.textContent.trim();
    loginAnchor.append(loginButton);
    headerDiv3.append(loginAnchor);
  }
  header.append(headerDiv3);
  section.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('header-submenu-container', 'header-position-fixed', 'header-top-0', 'header-start-0', 'header-end-0', 'header-m-auto', 'header-overflow-hidden');

  const aside = document.createElement('aside');
  aside.classList.add('header-sidebar', 'header-start-0', 'header-bg-white', 'header-position-absolute');

  const menuList = document.createElement('ul');
  menuList.classList.add('header-sidebar__menu', 'header-list-unstyled', 'header-px-4');

  menuItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.classList.add('header-sidebar__menu-item', 'header-py-6', 'header-border-bottom', 'header-border-boing-neutral-gray-200');

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    const label = itemNode.querySelector('[data-aue-prop="label"]');

    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.classList.add('header-sidebar__menu-link', 'header-d-flex', 'header-align-items-center', 'header-text-decoration-none', 'header-px-6', 'header-fw-medium', 'header-analytics_cta_click');
      anchor.setAttribute('data-consent', 'false'); // Default, adjust if prop exists
      anchor.setAttribute('data-link', link.getAttribute('data-link') || link.href);
      moveInstrumentation(link, anchor);

      if (icon) {
        const iconImg = createOptimizedPicture(icon.src, icon.alt, false, [{ width: '20px' }]);
        iconImg.querySelector('img').classList.add('header-sidebar__menu-icon', 'header-me-4');
        anchor.append(iconImg);
        moveInstrumentation(icon, iconImg);
      }
      if (label) {
        anchor.append(label.textContent.trim());
        moveInstrumentation(label, anchor);
      }
      listItem.append(anchor);
    }
    menuList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });
  aside.append(menuList);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar__curve');
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('header-footer-brand', 'header-w-100', 'header-bg-boing-neutral-gray-600');
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerPrimary = document.createElement('section');
  footerPrimary.classList.add('header-footer-brand__primary');
  footerPrimary.style.backgroundColor = '';

  const footerContainer1 = document.createElement('div');
  footerContainer1.classList.add('header-container');

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.classList.add('header-footer-brand__primary--content', 'header-d-flex', 'header-flex-column', 'header-flex-md-row', 'header-justify-content-md-between', 'header-align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('header-footer-brand__left', 'header-d-flex', 'header-gap-16', 'header-px-10', 'header-align-items-center', 'header-justify-content-center');

  if (footerLogo1) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.href = footerLogo1.closest('a')?.href || '#'; // Assuming logo is wrapped in an anchor
    logo1Anchor.target = '_blank';
    logo1Anchor.classList.add('header-footer-brand__logo', 'header-d-inline-block', 'header-analytics_cta_click');
    logo1Anchor.setAttribute('data-cta-region', 'Footer');
    logo1Anchor.setAttribute('aria-label', footerLogo1.alt || 'Logo');
    moveInstrumentation(footerLogo1.closest('a') || footerLogo1, logo1Anchor);

    const logo1Img = createOptimizedPicture(footerLogo1.src, footerLogo1.alt, false, [{ width: '100px' }]);
    logo1Img.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
    logo1Anchor.append(logo1Img);
    footerBrandLeft.append(logo1Anchor);
    moveInstrumentation(footerLogo1, logo1Img);
  }

  if (footerLogo2) {
    const logo2Div = document.createElement('div');
    logo2Div.classList.add('header-footer-brand__secondary--logo', 'header-d-inline-block');
    moveInstrumentation(footerLogo2.closest('div') || footerLogo2, logo2Div);

    const logo2Img = createOptimizedPicture(footerLogo2.src, footerLogo2.alt, false, [{ width: '100px' }]);
    logo2Img.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-no-rendition');
    logo2Div.append(logo2Img);
    footerBrandLeft.append(logo2Div);
    moveInstrumentation(footerLogo2, logo2Img);
  }
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('header-footer-brand__right');

  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('header-footer-brand__navbar', 'header-d-grid', 'header-d-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('header-footer-brand__navbar--left', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');

  const createFooterList = (items, modelName) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('header-footerList');
    const ul = document.createElement('ul');
    ul.classList.add('header-footer-list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-align-items-md-start', 'header-flex-column');

    items.forEach((itemNode) => {
      const listItem = document.createElement('li');
      listItem.classList.add('header-footer-list__item');
      const link = itemNode.querySelector('[data-aue-prop="link"]');
      const label = itemNode.querySelector('[data-aue-prop="label"]');

      if (link) {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.classList.add('header-cta-analytics', 'header-analytics_cta_click', 'header-footer-list__item--link', 'header-d-inline-block');
        anchor.setAttribute('data-link-region', 'Footer List');
        if (link.target) anchor.target = link.target;
        if (label) {
          anchor.textContent = label.textContent.trim();
          moveInstrumentation(label, anchor);
        }
        listItem.append(anchor);
        moveInstrumentation(link, anchor);
      }
      ul.append(listItem);
      moveInstrumentation(itemNode, listItem);
    });
    footerListDiv.append(ul);
    return footerListDiv;
  };

  footerNavbarLeft.append(createFooterList(footerList1, 'footerList1'));
  footerNavbarLeft.append(createFooterList(footerList2, 'footerList2'));
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('header-footer-brand__navbar--right', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');

  footerNavbarRight.append(createFooterList(footerList3, 'footerList3'));
  footerNavbarRight.append(createFooterList(footerList4, 'footerList4'));
  footerNavbar.append(footerNavbarRight);

  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerContainer1.append(footerPrimaryContent);
  footerPrimary.append(footerContainer1);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.classList.add('header-footer-brand__secondary');
  footerSecondary.style.backgroundColor = '';

  const footerContainer2 = document.createElement('div');
  footerContainer2.classList.add('header-container');

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.classList.add('header-footer-brand__secondary--content', 'header-d-flex', 'header-flex-column', 'header-justify-content-md-between', 'header-align-items-center');

  const footerBrandRight2 = document.createElement('section');
  footerBrandRight2.classList.add('header-footer-brand__right', 'header-d-flex', 'header-flex-column', 'header-pb-5');

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('header-social_media--title');
  socialTitle.textContent = 'Follow Us On';
  footerBrandRight2.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('header-footer-brand__right--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-px-10', 'header-flex-wrap');

  socialIcons.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.classList.add('header-footer-brand__right--item', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.classList.add('header-footer-brand__right--link', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center', 'header-analytics_cta_click');
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${link.textContent.trim().toLowerCase()}`); // Assuming link text is platform name
      anchor.target = '_blank';
      anchor.setAttribute('data-platform-name', link.textContent.trim().toLowerCase());
      anchor.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(link, anchor);

      if (icon) {
        const iconImg = createOptimizedPicture(icon.src, icon.alt, false, [{ width: '24px' }]);
        iconImg.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
        iconImg.querySelector('img').setAttribute('aria-label', icon.alt);
        anchor.append(iconImg);
        moveInstrumentation(icon, iconImg);
      }
      listItem.append(anchor);
    }
    socialList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });
  footerBrandRight2.append(socialList);
  footerSecondaryContent.append(footerBrandRight2);

  const footerBrandLeft2 = document.createElement('section');
  footerBrandLeft2.classList.add('header-footer-brand__left', 'header-py-5', 'header-d-flex', 'header-flex-column', 'header-gap-3');

  const footerLeftList = document.createElement('ul');
  footerLeftList.classList.add('header-footer-brand__left--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-flex-wrap');

  if (footerLink) {
    const listItem = document.createElement('li');
    listItem.classList.add('header-footer-brand__left--item', 'header-foot_link');
    const anchor = document.createElement('a');
    anchor.href = footerLink.href;
    anchor.target = '_blank';
    anchor.classList.add('header-footer-brand__left--link', 'header-analytics_cta_click');
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.textContent = footerLink.textContent.trim();
    listItem.append(anchor);
    footerLeftList.append(listItem);
    moveInstrumentation(footerLink, anchor);
  }
  footerBrandLeft2.append(footerLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('header-footer-brand__left--copyright', 'header-text-center');
  if (copyright) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('header-footer-brand__left--text', 'header-text-white');
    copyrightSpan.textContent = copyright.textContent.trim();
    copyrightDiv.append(copyrightSpan);
    moveInstrumentation(copyright, copyrightSpan);
  }
  footerBrandLeft2.append(copyrightDiv);
  footerSecondaryContent.append(footerBrandLeft2);

  footerContainer2.append(footerSecondaryContent);
  footerSecondary.append(footerContainer2);
  footerBrand.append(footerSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.classList.add('header-overlay', 'header-position-absolute', 'header-top-0', 'header-start-0', 'header-w-100', 'header-h-100', 'header-bg-black', 'header-opacity-25');
  submenuContainer.append(overlay);

  section.append(submenuContainer);

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
