import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-app-name]').textContent;
  const header = document.createElement('header');
  header.classList.add('boing-container', 'header', 'd-flex', 'justify-content-between', 'align-items-center', 'h-15', 'px-5', 'py-2', 'fixed-top', 'w-100', 'bg-white');

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.classList.add('d-flex', 'w-25');
  header.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.classList.add('d-flex', 'justify-content-center', 'w-25');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.querySelector('a').href;
    logoAnchor.classList.add('analytics_cta_click');
    logoAnchor.setAttribute('data-ct', '');
    logoAnchor.setAttribute('a-label', 'header-logo-boing');

    const logoDiv = document.createElement('div');
    logoDiv.classList.add('__logo', 'd-flex', 'align-items-center');

    const logoImg = block.querySelector('[data-aue-prop="logo"]');
    if (logoImg) {
      const picture = createOptimizedPicture(logoImg.src, logoImg.alt);
      picture.querySelector('img').classList.add('__logo-img');
      logoDiv.append(picture);
      moveInstrumentation(logoImg, picture);
    }
    logoAnchor.append(logoDiv);
    headerCenterDiv.append(logoAnchor);
    moveInstrumentation(logoLink, logoAnchor);
  }
  header.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.classList.add('d-flex', 'w-25', 'justify-content-end');
  const loginLink = block.querySelector('.header__login-btn-wrapper a');
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.href = loginLink.href;
    loginAnchor.classList.add('__login-btn-wrapper', 'analytics_cta_click');
    loginAnchor.style.display = 'inline';

    const loginButton = document.createElement('button');
    loginButton.classList.add('__login-btn', 'btn', 'text-boing-primary', 'bg-transparent', 'fw-semibold', 'rounded-4', 'btn-sm', 'py-3', 'px-4');
    loginButton.textContent = loginLink.textContent.trim();
    loginAnchor.append(loginButton);
    headerRightDiv.append(loginAnchor);
    moveInstrumentation(loginLink, loginAnchor);
  }
  header.append(headerRightDiv);

  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('submenu-container', 'position-fixed', 'top-0', 'start-0', 'end-0', 'm-auto', 'overflow-hidden');

  const aside = document.createElement('aside');
  aside.classList.add('sidebar', 'start-0', 'bg-white', 'position-absolute');

  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.classList.add('sidebar__menu', 'list-unstyled', 'px-4');

  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  sidebarMenuItems.forEach((itemNode) => {
    const li = document.createElement('li');
    li.classList.add('sidebar__menu-item', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    const label = itemNode.querySelector('[data-aue-prop="label"]');

    if (link && icon && label) {
      const anchor = document.createElement('a');
      anchor.href = link.querySelector('a').href;
      anchor.classList.add('sidebar__menu-link', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'analytics_cta_click');
      anchor.setAttribute('data-consent', 'false');
      anchor.setAttribute('data-link', link.querySelector('a').getAttribute('data-link'));

      const picture = createOptimizedPicture(icon.src, icon.alt);
      picture.querySelector('img').classList.add('sidebar__menu-icon', 'me-4');
      anchor.append(picture);
      moveInstrumentation(icon, picture);

      anchor.append(label.textContent.trim());
      moveInstrumentation(label, anchor);
      li.append(anchor);
      moveInstrumentation(link, anchor);
    }
    sidebarMenuUl.append(li);
    moveInstrumentation(itemNode, li);
  });

  const logoutItem = block.querySelector('.header-sidebar__menu-item--logout');
  if (logoutItem) {
    const logoutLi = document.createElement('li');
    logoutLi.classList.add('sidebar__menu-item', 'sidebar__menu-item--logout', 'py-6', 'border-bottom', 'border-boing-neutral-gray-200');
    logoutLi.style.display = 'none';

    const logoutLink = logoutItem.querySelector('a');
    if (logoutLink) {
      const logoutAnchor = document.createElement('a');
      logoutAnchor.href = logoutLink.href;
      logoutAnchor.classList.add('sidebar__menu-link', 'sidebar__menu-item--logout-btn', 'd-flex', 'align-items-center', 'text-decoration-none', 'px-6', 'fw-medium', 'analytics_cta_click');
      logoutAnchor.setAttribute('data-consent', 'false');
      logoutAnchor.setAttribute('data-link', logoutLink.getAttribute('data-link'));

      const logoutImg = logoutLink.querySelector('img');
      if (logoutImg) {
        const picture = createOptimizedPicture(logoutImg.src, logoutImg.alt);
        picture.querySelector('img').classList.add('sidebar__menu-icon', 'me-4');
        logoutAnchor.append(picture);
        moveInstrumentation(logoutImg, picture);
      }
      logoutAnchor.append(logoutLink.textContent.trim());
      logoutLi.append(logoutAnchor);
      moveInstrumentation(logoutLink, logoutAnchor);
    }
    sidebarMenuUl.append(logoutLi);
    moveInstrumentation(logoutItem, logoutLi);
  }

  aside.append(sidebarMenuUl);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('sidebar__curve');
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.classList.add('footer-brand', 'w-100', 'bg-boing-neutral-gray-600');
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerPrimary = document.createElement('section');
  footerPrimary.classList.add('footer-brand__primary');
  footerPrimary.style.backgroundColor = '';

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('container');

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.classList.add('footer-brand__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  const footerLogo1Link = block.querySelector('[data-aue-prop="footerLogo1"]');
  if (footerLogo1Link) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.href = footerLogo1Link.src;
    logo1Anchor.target = '_blank';
    logo1Anchor.classList.add('footer-brand__logo', 'd-inline-block', 'analytics_cta_click');
    logo1Anchor.setAttribute('data-cta-region', 'Footer');
    logo1Anchor.setAttribute('aria-label', 'ITC Logo');

    const picture = createOptimizedPicture(footerLogo1Link.src, footerLogo1Link.alt);
    picture.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
    logo1Anchor.append(picture);
    footerBrandLeft.append(logo1Anchor);
    moveInstrumentation(footerLogo1Link, picture);
  }

  const footerLogo2Div = document.createElement('div');
  footerLogo2Div.classList.add('footer-brand__secondary--logo', 'd-inline-block');
  const footerLogo2Img = block.querySelector('[data-aue-prop="footerLogo2"]');
  if (footerLogo2Img) {
    const picture = createOptimizedPicture(footerLogo2Img.src, footerLogo2Img.alt);
    picture.querySelector('img').classList.add('object-fit-contain', 'w-100', 'no-rendition');
    footerLogo2Div.append(picture);
    footerBrandLeft.append(footerLogo2Div);
    moveInstrumentation(footerLogo2Img, picture);
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand__right');

  const footerNavbar = document.createElement('nav');
  footerNavbar.classList.add('footer-brand__navbar', 'd-grid', 'd-md-flex');
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.classList.add('footer-brand__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  const createFooterList = (listItems, listName) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');
    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

    listItems.forEach((itemNode) => {
      const li = document.createElement('li');
      li.classList.add('footer-list__item');
      const link = itemNode.querySelector('[data-aue-prop="link"]');
      const label = itemNode.querySelector('[data-aue-prop="label"]');
      if (link && label) {
        const anchor = document.createElement('a');
        anchor.href = link.querySelector('a').href;
        anchor.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'd-inline-block');
        anchor.setAttribute('data-link-region', 'Footer List');
        if (link.querySelector('a').target) {
          anchor.target = link.querySelector('a').target;
        }
        anchor.textContent = label.textContent.trim();
        li.append(anchor);
        moveInstrumentation(link, anchor);
        moveInstrumentation(label, anchor);
      }
      ul.append(li);
      moveInstrumentation(itemNode, li);
    });
    footerListDiv.append(ul);
    return footerListDiv;
  };

  const footerList1Items = block.querySelectorAll('[data-aue-model="footerListItem"][data-aue-resource="footerList1"]');
  footerNavbarLeft.append(createFooterList(footerList1Items, 'footerList1'));

  const footerList2Items = block.querySelectorAll('[data-aue-model="footerListItem"][data-aue-resource="footerList2"]');
  footerNavbarLeft.append(createFooterList(footerList2Items, 'footerList2'));

  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.classList.add('footer-brand__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');

  const footerList3Items = block.querySelectorAll('[data-aue-model="footerListItem"][data-aue-resource="footerList3"]');
  footerNavbarRight.append(createFooterList(footerList3Items, 'footerList3'));

  const footerList4Items = block.querySelectorAll('[data-aue-model="footerListItem"][data-aue-resource="footerList4"]');
  footerNavbarRight.append(createFooterList(footerList4Items, 'footerList4'));

  footerNavbar.append(footerNavbarRight);
  footerBrandRight.append(footerNavbar);

  footerPrimaryContent.append(footerBrandLeft, footerBrandRight);
  footerContainer.append(footerPrimaryContent);
  footerPrimary.append(footerContainer);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.classList.add('footer-brand__secondary');
  footerSecondary.style.backgroundColor = '';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.classList.add('container');

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.classList.add('footer-brand__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const socialMediaRight = document.createElement('section');
  socialMediaRight.classList.add('footer-brand__right', 'd-flex', 'flex-column', 'pb-5');

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaRight.append(socialMediaTitle);

  const socialMediaUl = document.createElement('ul');
  socialMediaUl.classList.add('footer-brand__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  footerSocialLinks.forEach((itemNode) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    if (link && icon) {
      const anchor = document.createElement('a');
      anchor.href = link.querySelector('a').href;
      anchor.classList.add('footer-brand__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
      anchor.target = '_blank';
      anchor.setAttribute('data-platform-name', icon.alt.toLowerCase());
      anchor.setAttribute('data-social-linktype', 'follow');

      const picture = createOptimizedPicture(icon.src, icon.alt);
      picture.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      picture.querySelector('img').setAttribute('aria-label', icon.alt.toLowerCase());
      anchor.append(picture);
      moveInstrumentation(icon, picture);
      li.append(anchor);
      moveInstrumentation(link, anchor);
    }
    socialMediaUl.append(li);
    moveInstrumentation(itemNode, li);
  });
  socialMediaRight.append(socialMediaUl);

  const footerSecondaryLeft = document.createElement('section');
  footerSecondaryLeft.classList.add('footer-brand__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');

  const footerSecondaryLeftUl = document.createElement('ul');
  footerSecondaryLeftUl.classList.add('footer-brand__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item', 'foot_link');
    const anchor = document.createElement('a');
    anchor.href = itcPortalLink.querySelector('a').href;
    anchor.target = '_blank';
    anchor.classList.add('footer-brand__left--link', 'analytics_cta_click');
    anchor.setAttribute('data-cta-region', 'Footer');
    anchor.textContent = itcPortalLink.querySelector('a').textContent.trim();
    li.append(anchor);
    footerSecondaryLeftUl.append(li);
    moveInstrumentation(itcPortalLink, anchor);
  }
  footerSecondaryLeft.append(footerSecondaryLeftUl);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand__left--copyright', 'text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text', 'text-white');
  const footerCopyright = block.querySelector('[data-aue-prop="footerCopyright"]');
  if (footerCopyright) {
    copyrightSpan.textContent = footerCopyright.textContent.trim();
    moveInstrumentation(footerCopyright, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  footerSecondaryLeft.append(copyrightDiv);

  footerSecondaryContent.append(socialMediaRight, footerSecondaryLeft);
  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerSecondary);

  aside.append(footerBrand);

  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'position-absolute', 'top-0', 'start-0', 'w-100', 'h-100', 'bg-black', 'opacity-25');

  submenuContainer.append(aside, overlay);

  const section = document.createElement('section');
  section.classList.add('header-position-relative', 'header-mb-15');

  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('d-none', 'app-name');
  appNameSpan.setAttribute('data-app-name', appName);
  appNameSpan.textContent = appName;
  section.append(appNameSpan);

  section.append(header, submenuContainer);

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
