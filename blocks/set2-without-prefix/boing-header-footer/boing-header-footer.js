import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const headerLogo = block.querySelector('[data-aue-prop="headerLogo"]');
  const headerLogoLink = block.querySelector('[data-aue-prop="headerLogoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  const footerPrimaryLogo = block.querySelector('[data-aue-prop="footerPrimaryLogo"]');
  const footerSecondaryLogo = block.querySelector('[data-aue-prop="footerSecondaryLogo"]');
  const footerListItems = block.querySelectorAll('[data-aue-model="footerListItem"]');
  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  const footerLeftLink = block.querySelector('[data-aue-prop="footerLeftLink"]');
  const copyright = block.querySelector('[data-aue-prop="copyright"]');

  block.textContent = '';

  // Header
  const header = document.createElement('header');
  header.className = 'boing-container header d-flex justify-content-between align-items-center h-15 px-5 py-2 fixed-top w-100 bg-white';

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'd-flex w-25';
  header.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.className = 'd-flex  justify-content-center w-25';
  if (headerLogoLink) {
    const headerLogoAnchor = headerLogoLink.querySelector('a');
    if (headerLogoAnchor) {
      const headerLogoDiv = document.createElement('div');
      headerLogoDiv.className = 'header__logo d-flex align-items-center';
      if (headerLogo) {
        const img = headerLogo.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt, true, [{ width: '100px' }]);
          picture.className = 'header__logo-img';
          headerLogoDiv.append(picture);
          moveInstrumentation(img, picture);
        }
        moveInstrumentation(headerLogo, headerLogoDiv);
      }
      headerLogoAnchor.append(headerLogoDiv);
      headerCenterDiv.append(headerLogoAnchor);
      moveInstrumentation(headerLogoLink, headerCenterDiv);
    }
  }
  header.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'd-flex w-25 justify-content-end';
  if (loginLink) {
    const loginAnchor = loginLink.querySelector('a');
    if (loginAnchor) {
      const button = document.createElement('button');
      button.className = 'header__login-btn btn text-boing-primary bg-transparent fw-semibold rounded-4 btn-sm py-3 px-4';
      button.textContent = loginAnchor.textContent.trim();
      loginAnchor.textContent = ''; // Clear original content to append new button
      loginAnchor.className = 'header__login-btn-wrapper analytics_cta_click';
      loginAnchor.style.display = 'inline';
      loginAnchor.append(button);
      headerRightDiv.append(loginAnchor);
      moveInstrumentation(loginLink, headerRightDiv);
    }
  }
  header.append(headerRightDiv);

  block.append(header);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'submenu-container position-fixed top-0 start-0 end-0 m-auto overflow-hidden';

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar start-0 bg-white position-absolute';

  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'sidebar__menu list-unstyled px-4';

  sidebarMenuItems.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'sidebar__menu-item py-6 border-bottom border-boing-neutral-gray-200';

    const link = itemNode.querySelector('a');
    if (link) {
      link.className = 'sidebar__menu-link d-flex align-items-center text-decoration-none px-6 fw-medium analytics_cta_click';
      const icon = itemNode.querySelector('img');
      if (icon) {
        icon.className = 'sidebar__menu-icon me-4';
        link.prepend(icon);
        moveInstrumentation(icon, link);
      }
      listItem.append(link);
      moveInstrumentation(link, listItem);
    }
    sidebarMenu.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  sidebar.append(sidebarMenu);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'sidebar__curve';
  sidebar.append(sidebarCurve);

  // Footer Brand
  const footerBrand = document.createElement('div');
  footerBrand.className = 'footer-brand w-100 bg-boing-neutral-gray-600';
  footerBrand.dataset.isdoodlevariation = 'false';

  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.className = 'footer-brand__primary';

  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.className = 'container';

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'footer-brand__primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'footer-brand__left d-flex gap-16 px-10 align-items-center justify-content-center';

  if (footerPrimaryLogo) {
    const primaryLogoAnchor = footerPrimaryLogo.querySelector('a');
    if (primaryLogoAnchor) {
      primaryLogoAnchor.className = 'footer-brand__logo d-inline-block analytics_cta_click';
      const img = footerPrimaryLogo.querySelector('img');
      if (img) {
        img.className = 'object-fit-contain w-100 h-100 no-rendition';
        primaryLogoAnchor.append(img);
        moveInstrumentation(img, primaryLogoAnchor);
      }
      footerBrandLeft.append(primaryLogoAnchor);
      moveInstrumentation(footerPrimaryLogo, footerBrandLeft);
    }
  }

  if (footerSecondaryLogo) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.className = 'footer-brand__secondary--logo d-inline-block';
    const img = footerSecondaryLogo.querySelector('img');
    if (img) {
      img.className = 'object-fit-contain w-100 no-rendition';
      secondaryLogoDiv.append(img);
      moveInstrumentation(img, secondaryLogoDiv);
    }
    footerBrandLeft.append(secondaryLogoDiv);
    moveInstrumentation(footerSecondaryLogo, footerBrandLeft);
  }

  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'footer-brand__navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'footer-brand__navbar--left d-flex flex-column flex-md-row ';

  const footerList1Div = document.createElement('div');
  footerList1Div.className = 'footerList';
  const footerList1Ul = document.createElement('ul');
  footerList1Ul.className = 'footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

  const footerList2Div = document.createElement('div');
  footerList2Div.className = 'footerList';
  const footerList2Ul = document.createElement('ul');
  footerList2Ul.className = 'footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

  const footerList3Div = document.createElement('div');
  footerList3Div.className = 'footerList';
  const footerList3Ul = document.createElement('ul');
  footerList3Ul.className = 'footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

  const footerList4Div = document.createElement('div');
  footerList4Div.className = 'footerList';
  const footerList4Ul = document.createElement('ul');
  footerList4Ul.className = 'footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

  // Distribute footer list items into four lists
  footerListItems.forEach((itemNode, index) => {
    const listItem = document.createElement('li');
    listItem.className = 'footer-list__item';
    const link = itemNode.querySelector('a');
    if (link) {
      link.className = 'cta-analytics analytics_cta_click footer-list__item--link d-inline-block';
      listItem.append(link);
      moveInstrumentation(link, listItem);
    }

    if (index % 4 === 0) {
      footerList1Ul.append(listItem);
    } else if (index % 4 === 1) {
      footerList2Ul.append(listItem);
    } else if (index % 4 === 2) {
      footerList3Ul.append(listItem);
    } else {
      footerList4Ul.append(listItem);
    }
    moveInstrumentation(itemNode, listItem);
  });

  footerList1Div.append(footerList1Ul);
  footerList2Div.append(footerList2Ul);
  footerNavbarLeft.append(footerList1Div, footerList2Div);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'footer-brand__navbar--right d-flex flex-column flex-md-row';
  footerList3Div.append(footerList3Ul);
  footerList4Div.append(footerList4Ul);
  footerNavbarRight.append(footerList3Div, footerList4Div);

  footerNavbar.append(footerNavbarLeft, footerNavbarRight);
  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);

  footerPrimaryContainer.append(footerPrimaryContent);
  footerPrimarySection.append(footerPrimaryContainer);
  footerBrand.append(footerPrimarySection);

  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.className = 'footer-brand__secondary';

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'container';

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'footer-brand__secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'footer-brand__right d-flex flex-column pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'footer-brand__right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  socialLinks.forEach((itemNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'footer-brand__right--item d-flex justify-content-center align-items-center';

    const link = itemNode.querySelector('a');
    if (link) {
      link.className = 'footer-brand__right--link d-flex justify-content-center align-items-center analytics_cta_click';
      const icon = itemNode.querySelector('img');
      if (icon) {
        icon.className = 'object-fit-contain w-100 h-100 no-rendition';
        link.append(icon);
        moveInstrumentation(icon, link);
      }
      listItem.append(link);
      moveInstrumentation(link, listItem);
    }
    socialMediaList.append(listItem);
    moveInstrumentation(itemNode, listItem);
  });

  socialMediaSection.append(socialMediaList);
  footerSecondaryContent.append(socialMediaSection);

  const footerLeftSection = document.createElement('section');
  footerLeftSection.className = 'footer-brand__left py-5 d-flex flex-column gap-3';

  const footerLeftList = document.createElement('ul');
  footerLeftList.className = 'footer-brand__left--list d-flex align-items-center justify-content-center flex-wrap';

  if (footerLeftLink) {
    const listItem = document.createElement('li');
    listItem.className = 'footer-brand__left--item foot_link';
    const link = footerLeftLink.querySelector('a');
    if (link) {
      link.className = 'footer-brand__left--link analytics_cta_click';
      listItem.append(link);
      moveInstrumentation(link, listItem);
    }
    footerLeftList.append(listItem);
    moveInstrumentation(footerLeftLink, footerLeftSection);
  }

  footerLeftSection.append(footerLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand__left--copyright text-center ';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'footer-brand__left--text text-white';
  if (copyright) {
    copyrightSpan.textContent = copyright.textContent.trim();
    moveInstrumentation(copyright, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  footerLeftSection.append(copyrightDiv);

  footerSecondaryContent.append(footerLeftSection);
  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondarySection.append(footerSecondaryContainer);
  footerBrand.append(footerSecondarySection);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  const overlay = document.createElement('div');
  overlay.className = 'overlay position-absolute top-0 start-0 w-100 h-100 bg-black opacity-25';
  submenuContainer.append(overlay);

  block.append(submenuContainer);

  if (appName) {
    appName.className = 'd-none app-name';
    block.prepend(appName);
  }

  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
