import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const headerImage = block.querySelector('[data-aue-prop="headerImage"]');
  const headerLogoLink = block.querySelector('[data-aue-prop="headerLogoLink"]');
  const headerLogo = block.querySelector('[data-aue-prop="headerLogo"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const loginText = block.querySelector('[data-aue-prop="loginText"]');
  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  const footerLogoITC = block.querySelector('[data-aue-prop="footerLogoITC"]');
  const footerLogoFSSI = block.querySelector('[data-aue-prop="footerLogoFSSI"]');
  const footerList1Items = block.querySelectorAll('[data-aue-prop="footerList1"] [data-aue-model="footerListItem"]');
  const footerList2Items = block.querySelectorAll('[data-aue-prop="footerList2"] [data-aue-model="footerListItem"]');
  const footerList3Items = block.querySelectorAll('[data-aue-prop="footerList3"] [data-aue-model="footerListItem"]');
  const footerList4Items = block.querySelectorAll('[data-aue-prop="footerList4"] [data-aue-model="footerListItem"]');
  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  const footerLeftLink = block.querySelector('[data-aue-prop="footerLeftLink"]');
  const footerCopyright = block.querySelector('[data-aue-prop="footerCopyright"]');

  block.textContent = '';

  const section = document.createElement('section');
  section.className = 'position-relative mb-15';

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'd-none app-name';
    appNameSpan.dataset.appName = appName.textContent.trim();
    appNameSpan.append(appName.textContent.trim());
    moveInstrumentation(appName, appNameSpan);
    section.append(appNameSpan);
  }

  const header = document.createElement('header');
  header.className = 'boing-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'd-flex w-25';
  if (headerImage) {
    headerLeftDiv.append(headerImage.textContent.trim());
    moveInstrumentation(headerImage, headerLeftDiv);
  }
  header.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'd-flex justify-content-center w-25';
  if (headerLogoLink) {
    const headerLogoAnchor = document.createElement('a');
    headerLogoAnchor.className = 'analytics_cta_click';
    headerLogoAnchor.href = headerLogoLink.href || '/';
    headerLogoAnchor.dataset.ct = '';
    headerLogoAnchor.setAttribute('a-label', 'header-logo-boing');
    moveInstrumentation(headerLogoLink, headerLogoAnchor);

    const headerLogoDiv = document.createElement('div');
    headerLogoDiv.className = 'header__logo d-flex align-items-center';

    if (headerLogo) {
      const img = headerLogo.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').className = 'header__logo-img';
        picture.querySelector('img').setAttribute('fetchpriority', 'high');
        picture.querySelector('img').setAttribute('loading', 'eager');
        headerLogoDiv.append(picture);
        moveInstrumentation(headerLogo, picture);
      }
    }
    headerLogoAnchor.append(headerLogoDiv);
    headerCenterDiv.append(headerLogoAnchor);
  }
  header.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'd-flex w-25 justify-content-end';
  if (loginLink) {
    const loginAnchor = document.createElement('a');
    loginAnchor.className = 'header__login-btn-wrapper analytics_cta_click';
    loginAnchor.href = loginLink.href || '/login.html';
    loginAnchor.style.display = 'inline';
    moveInstrumentation(loginLink, loginAnchor);

    const loginButton = document.createElement('button');
    loginButton.className = 'header__login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
    if (loginText) {
      loginButton.append(loginText.textContent.trim());
      moveInstrumentation(loginText, loginButton);
    }
    loginAnchor.append(loginButton);
    headerRightDiv.append(loginAnchor);
  }
  header.append(headerRightDiv);
  section.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar start-0 bg-white position-absolute';

  const sidebarMenuUL = document.createElement('ul');
  sidebarMenuUL.className = 'sidebar__menu list-unstyled px-4';

  sidebarMenuItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'sidebar__menu-item py-6 border-bottom border-boing-neutral-gray-200';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');
    const text = itemNode.querySelector('[data-aue-prop="text"]');

    if (link) {
      const anchor = document.createElement('a');
      anchor.className = 'sidebar__menu-link d-flex align-items-center text-decoration-none px-6 fw-medium analytics_cta_click';
      anchor.href = link.href || '#';
      anchor.dataset.consent = 'false'; // Default value, adjust if needed
      anchor.dataset.link = link.href || '#'; // Assuming data-link maps to href
      moveInstrumentation(link, anchor);

      if (icon) {
        const img = icon.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt);
          picture.querySelector('img').className = 'sidebar__menu-icon me-4';
          picture.querySelector('img').setAttribute('loading', 'lazy');
          anchor.append(picture);
          moveInstrumentation(icon, picture);
        }
      }
      if (text) {
        anchor.append(text.textContent.trim());
        moveInstrumentation(text, anchor);
      }
      listItem.append(anchor);
    }
    sidebarMenuUL.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  sidebar.append(sidebarMenuUL);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'sidebar__curve';
  sidebar.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'footer-brand w-100 bg-boing-neutral-gray-600';
  footerBrand.dataset.isdoodlevariation = 'false';

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'footer-brand__primary';
  footerBrandPrimary.style.backgroundColor = '';

  const containerPrimary = document.createElement('div');
  containerPrimary.className = 'container';

  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand__primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'footer-brand__left d-flex gap-16 px-10 align-items-center justify-content-center';

  if (footerLogoITC) {
    const itcAnchor = document.createElement('a');
    itcAnchor.className = 'footer-brand__logo d-inline-block analytics_cta_click';
    itcAnchor.href = footerLogoITC.href || 'https://www.itcportal.com/';
    itcAnchor.target = '_blank';
    itcAnchor.setAttribute('aria-label', 'ITC Logo');
    moveInstrumentation(footerLogoITC, itcAnchor);

    const img = footerLogoITC.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      picture.querySelector('img').setAttribute('loading', 'lazy');
      itcAnchor.append(picture);
    }
    footerBrandLeft.append(itcAnchor);
  }

  if (footerLogoFSSI) {
    const fssiDiv = document.createElement('div');
    fssiDiv.className = 'footer-brand__secondary--logo d-inline-block';
    const img = footerLogoFSSI.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      picture.querySelector('img').className = 'object-fit-contain w-100 no-rendition';
      picture.querySelector('img').setAttribute('loading', 'lazy');
      fssiDiv.append(picture);
      moveInstrumentation(footerLogoFSSI, picture);
    }
    footerBrandLeft.append(fssiDiv);
  }
  primaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'footer-brand__navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'footer-brand__navbar--left d-flex flex-column flex-md-row';

  const createFooterList = (items) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'footerList';
    const ul = document.createElement('ul');
    ul.className = 'footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

    items.forEach((itemNode) => {
      const listItem = document.createElement('li');
      listItem.className = 'footer-list__item';

      const link = itemNode.querySelector('[data-aue-prop="link"]');
      const text = itemNode.querySelector('[data-aue-prop="text"]');

      if (link) {
        const anchor = document.createElement('a');
        anchor.className = 'cta-analytics analytics_cta_click footer-list__item--link d-inline-block';
        anchor.dataset.linkRegion = 'Footer List';
        anchor.href = link.href || '#';
        moveInstrumentation(link, anchor);
        if (text) {
          anchor.append(text.textContent.trim());
          moveInstrumentation(text, anchor);
        }
        listItem.append(anchor);
      }
      ul.append(listItem);
      moveInstrumentation(itemNode, listItem);
    });
    footerListDiv.append(ul);
    return footerListDiv;
  };

  footerNavbarLeft.append(createFooterList(footerList1Items));
  footerNavbarLeft.append(createFooterList(footerList2Items));
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'footer-brand__navbar--right d-flex flex-column flex-md-row';

  footerNavbarRight.append(createFooterList(footerList3Items));
  footerNavbarRight.append(createFooterList(footerList4Items));
  footerNavbar.append(footerNavbarRight);

  footerBrandRight.append(footerNavbar);
  primaryContent.append(footerBrandRight);
  containerPrimary.append(primaryContent);
  footerBrandPrimary.append(containerPrimary);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'footer-brand__secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const containerSecondary = document.createElement('div');
  containerSecondary.className = 'container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand__secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'footer-brand__right d-flex flex-column pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'footer-brand__right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  socialLinks.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'footer-brand__right--item d-flex justify-content-center align-items-center';

    const link = itemNode.querySelector('[data-aue-prop="link"]');
    const icon = itemNode.querySelector('[data-aue-prop="icon"]');

    if (link) {
      const anchor = document.createElement('a');
      anchor.className = 'footer-brand__right--link d-flex justify-content-center align-items-center analytics_cta_click';
      anchor.dataset.ctaRegion = 'Footer';
      anchor.dataset.ctaLabel = `footer-${link.href.includes('facebook') ? 'facebook' : link.href.includes('instagram') ? 'instagram' : link.href.includes('youtube') ? 'youtube' : 'social'}`;
      anchor.target = '_blank';
      anchor.dataset.platformName = link.href.includes('facebook') ? 'facebook' : link.href.includes('instagram') ? 'instagram' : link.href.includes('youtube') ? 'youtube' : 'social';
      anchor.dataset.socialLinktype = 'follow';
      anchor.href = link.href || '#';
      moveInstrumentation(link, anchor);

      if (icon) {
        const img = icon.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt);
          picture.querySelector('img').setAttribute('aria-label', anchor.dataset.platformName);
          picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
          picture.querySelector('img').setAttribute('loading', 'lazy');
          anchor.append(picture);
          moveInstrumentation(icon, picture);
        }
      }
      listItem.append(anchor);
    }
    socialList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  socialMediaSection.append(socialList);
  secondaryContent.append(socialMediaSection);

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.className = 'footer-brand__left py-5 d-flex flex-column gap-3';

  const footerLeftList = document.createElement('ul');
  footerLeftList.className = 'footer-brand__left--list d-flex align-items-center justify-content-center flex-wrap';

  if (footerLeftLink) {
    const listItem = document.createElement('li');
    listItem.className = 'footer-brand__left--item foot_link';
    const anchor = document.createElement('a');
    anchor.className = 'footer-brand__left--link analytics_cta_click';
    anchor.href = footerLeftLink.href || 'https://www.itcportal.com/';
    anchor.target = '_blank';
    anchor.dataset.ctaRegion = 'Footer';
    anchor.append(footerLeftLink.textContent.trim());
    moveInstrumentation(footerLeftLink, anchor);
    listItem.append(anchor);
    footerLeftList.append(listItem);
  }
  footerBrandLeftSecondary.append(footerLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand__left--copyright text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'footer-brand__left--text text-white';
  if (footerCopyright) {
    copyrightSpan.append(footerCopyright.textContent.trim());
    moveInstrumentation(footerCopyright, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  footerBrandLeftSecondary.append(copyrightDiv);

  secondaryContent.append(footerBrandLeftSecondary);
  containerSecondary.append(secondaryContent);
  footerBrandSecondary.append(containerSecondary);
  footerBrand.append(footerBrandSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.className = 'overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  submenuContainer.append(overlay);

  section.append(submenuContainer);

  block.append(section);
  block.className = 'boing-header-footer block';
  block.dataset.blockStatus = 'loaded';
}
