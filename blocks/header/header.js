import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('header-position-relative', 'header-mb-15');

  // App Name
  const appNameRow = block.children[0];
  const appNameSpan = document.createElement('span');
  appNameSpan.classList.add('header-d-none', 'header-app-name');
  appNameSpan.setAttribute('data-app-name', '');
  if (appNameRow) {
    const appNameText = appNameRow.children[0];
    if (appNameText) {
      appNameSpan.textContent = appNameText.textContent;
      appNameSpan.setAttribute('data-app-name', appNameText.textContent);
      moveInstrumentation(appNameText, appNameSpan);
    }
  }
  section.append(appNameSpan);

  // Header Container
  const header = document.createElement('header');
  header.classList.add('header-boing-container', 'header-header', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center', 'header-h-15', 'header-px-5', 'header-py-2', 'header-fixed-top', 'header-w-100', 'header-bg-white');

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.classList.add('header-d-flex', 'header-w-25');
  header.append(headerLeftDiv);

  const headerCenterDiv = document.createElement('div');
  headerCenterDiv.classList.add('header-d-flex', 'header-justify-content-center', 'header-w-25');
  const logoLink = document.createElement('a');
  logoLink.classList.add('header-analytics_cta_click');
  logoLink.setAttribute('data-ct', '');
  logoLink.setAttribute('aria-label', 'header-logo-boing');
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-header__logo', 'header-d-flex', 'header-align-items-center');

  const logoImageRow = block.children[1];
  if (logoImageRow) {
    const logoImg = logoImageRow.children[0].querySelector('img');
    const logoAnchor = logoImageRow.children[0].querySelector('a');
    if (logoImg) {
      const pic = createOptimizedPicture(logoImg.src, logoImg.alt, true, 'eager');
      pic.querySelector('img').classList.add('header-header__logo-img');
      moveInstrumentation(logoImg, pic.querySelector('img'));
      logoDiv.append(pic);
    } else if (logoAnchor) {
      // Fallback for logo image if it's wrapped in an anchor
      const pic = createOptimizedPicture(logoAnchor.href, logoAnchor.textContent, true, 'eager');
      pic.querySelector('img').classList.add('header-header__logo-img');
      moveInstrumentation(logoAnchor, pic.querySelector('img'));
      logoDiv.append(pic);
    }
    if (logoAnchor) {
      logoLink.href = logoAnchor.href;
      moveInstrumentation(logoAnchor, logoLink);
    }
  }
  logoLink.append(logoDiv);
  headerCenterDiv.append(logoLink);
  header.append(headerCenterDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.classList.add('header-d-flex', 'header-w-25', 'header-justify-content-end');
  const loginLink = document.createElement('a');
  loginLink.classList.add('header-header__login-btn-wrapper', 'header-analytics_cta_click');
  loginLink.style.display = 'inline';
  const loginButton = document.createElement('button');
  loginButton.classList.add('header-header__login-btn', 'header-btn', 'header-text-boing-primary', 'header-bg-transparent', 'header-fw-semibold', 'header-rounded-4', 'header-btn-sm', 'header-py-3', 'header-px-4');

  const loginRow = block.children[2];
  if (loginRow) {
    const loginAnchor = loginRow.children[0].querySelector('a');
    if (loginAnchor) {
      loginLink.href = loginAnchor.href;
      loginButton.textContent = loginAnchor.textContent.trim();
      moveInstrumentation(loginAnchor, loginLink);
    } else {
      loginButton.textContent = loginRow.children[0].textContent.trim();
      moveInstrumentation(loginRow.children[0], loginLink);
    }
  }
  loginLink.append(loginButton);
  headerRightDiv.append(loginLink);
  header.append(headerRightDiv);
  section.append(header);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.classList.add('header-submenu-container', 'header-position-fixed', 'header-top-0', 'header-start-0', 'header-end-0', 'header-m-auto', 'header-overflow-hidden');
  const aside = document.createElement('aside');
  aside.classList.add('header-sidebar', 'header-start-0', 'header-bg-white', 'header-position-absolute');
  const ul = document.createElement('ul');
  ul.classList.add('header-sidebar__menu', 'header-list-unstyled', 'header-px-4');

  const sidebarMenuRows = Array.from(block.children).slice(3, -5); // Sidebar menu items are from row 3 up to the footer section
  sidebarMenuRows.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('header-sidebar__menu-item', 'header-py-6', 'header-border-bottom', 'header-border-boing-neutral-gray-200');
    moveInstrumentation(row, li);

    const link = row.children[0].querySelector('a');
    const img = row.children[0].querySelector('img');
    const label = row.children[0].textContent.trim();

    const a = document.createElement('a');
    a.classList.add('header-sidebar__menu-link', 'header-d-flex', 'header-align-items-center', 'header-text-decoration-none', 'header-px-6', 'header-fw-medium', 'header-analytics_cta_click');
    a.setAttribute('data-consent', 'false');
    if (link) {
      a.href = link.href;
      a.setAttribute('data-link', link.href);
      moveInstrumentation(link, a);
    }

    if (img) {
      const pic = createOptimizedPicture(img.src, img.alt);
      pic.querySelector('img').classList.add('header-sidebar__menu-icon', 'header-me-4');
      moveInstrumentation(img, pic.querySelector('img'));
      a.append(pic);
    }
    a.append(label);
    li.append(a);
    ul.append(li);
  });

  // Add logout item if it exists in the original HTML and is hidden
  const logoutItem = document.createElement('li');
  logoutItem.classList.add('header-sidebar__menu-item', 'header-sidebar__menu-item--logout', 'header-py-6', 'header-border-bottom', 'header-border-boing-neutral-gray-200');
  logoutItem.style.display = 'none';
  const logoutLink = document.createElement('a');
  logoutLink.classList.add('header-sidebar__menu-link', 'header-sidebar__menu-item--logout-btn', 'header-d-flex', 'header-align-items-center', 'header-text-decoration-none', 'header-px-6', 'header-fw-medium', 'header-analytics_cta_click');
  logoutLink.setAttribute('data-consent', 'false');
  logoutLink.href = '/';
  logoutLink.setAttribute('data-link', '/content/boing/in/en/home');
  const logoutImg = createOptimizedPicture('/content/dam/aemigrate/uploaded-folder/image/logout-3-fmt-webp-alpha.webp', 'Logout');
  logoutImg.querySelector('img').classList.add('header-sidebar__menu-icon', 'header-me-4');
  logoutLink.append(logoutImg);
  logoutLink.append('Logout');
  logoutItem.append(logoutLink);
  ul.append(logoutItem);

  aside.append(ul);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.classList.add('header-sidebar__curve');
  aside.append(sidebarCurve);

  // Footer Brand
  const footerBrand = document.createElement('div');
  footerBrand.classList.add('header-footer-brand', 'header-w-100', 'header-bg-boing-neutral-gray-600');
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const primarySection = document.createElement('section');
  primarySection.classList.add('header-footer-brand__primary');
  primarySection.style.backgroundColor = '';
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('header-container');
  const primaryContentDiv = document.createElement('div');
  primaryContentDiv.classList.add('header-footer-brand__primary--content', 'header-d-flex', 'header-flex-column', 'header-flex-md-row', 'header-justify-content-md-between', 'header-align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('header-footer-brand__left', 'header-d-flex', 'header-gap-16', 'header-px-10', 'header-align-items-center', 'header-justify-content-center');

  const itcLogoLink = document.createElement('a');
  itcLogoLink.classList.add('header-footer-brand__logo', 'header-d-inline-block', 'header-analytics_cta_click');
  itcLogoLink.setAttribute('data-cta-region', 'Footer');
  itcLogoLink.setAttribute('aria-label', 'ITC Logo');
  itcLogoLink.target = '_blank';

  const itcLogoRow = block.children[block.children.length - 5]; // ITC Logo is the 5th last row
  if (itcLogoRow) {
    const itcLink = itcLogoRow.children[0].querySelector('a');
    const itcImg = itcLogoRow.children[0].querySelector('img');
    if (itcLink) {
      itcLogoLink.href = itcLink.href;
      moveInstrumentation(itcLink, itcLogoLink);
    }
    if (itcImg) {
      const pic = createOptimizedPicture(itcImg.src, itcImg.alt);
      pic.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
      moveInstrumentation(itcImg, pic.querySelector('img'));
      itcLogoLink.append(pic);
    }
  }
  footerBrandLeft.append(itcLogoLink);

  const fssiLogoDiv = document.createElement('div');
  fssiLogoDiv.classList.add('header-footer-brand__secondary--logo', 'header-d-inline-block');
  const fssiLogoRow = block.children[block.children.length - 4]; // FSSI Logo is the 4th last row
  if (fssiLogoRow) {
    const fssiImg = fssiLogoRow.children[0].querySelector('img');
    if (fssiImg) {
      const pic = createOptimizedPicture(fssiImg.src, fssiImg.alt);
      pic.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-no-rendition');
      moveInstrumentation(fssiImg, pic.querySelector('img'));
      fssiLogoDiv.append(pic);
    }
  }
  footerBrandLeft.append(fssiLogoDiv);
  primaryContentDiv.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('header-footer-brand__right');
  const nav = document.createElement('nav');
  nav.classList.add('header-footer-brand__navbar', 'header-d-grid', 'header-d-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');

  const navLeft = document.createElement('div');
  navLeft.classList.add('header-footer-brand__navbar--left', 'header-d-flex', 'header-flex-column', 'header-flex-md-row');

  const footerListRows = Array.from(block.children).slice(block.children.length - 3, block.children.length - 1); // Footer lists are the 3rd and 2nd last rows
  footerListRows.forEach((row, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('header-footerList');
    const footerUl = document.createElement('ul');
    footerUl.classList.add('header-footer-list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-align-items-md-start', 'header-flex-column');
    moveInstrumentation(row, footerListDiv);

    Array.from(row.children).forEach((cell) => {
      const footerLink = cell.querySelector('a');
      if (footerLink) {
        const li = document.createElement('li');
        li.classList.add('header-footer-list__item');
        const a = document.createElement('a');
        a.classList.add('header-cta-analytics', 'header-analytics_cta_click', 'header-footer-list__item--link', 'header-d-inline-block');
        a.setAttribute('data-link-region', 'Footer List');
        a.href = footerLink.href;
        a.textContent = footerLink.textContent.trim();
        if (footerLink.target) {
          a.target = footerLink.target;
        }
        moveInstrumentation(footerLink, a);
        li.append(a);
        footerUl.append(li);
      }
    });
    footerListDiv.append(footerUl);
    if (index === 0) {
      navLeft.append(footerListDiv);
    } else {
      // For simplicity, assuming the second list also goes to navLeft for now
      // In a real scenario, you might need more specific logic to determine left/right
      navLeft.append(footerListDiv);
    }
  });

  nav.append(navLeft);
  footerBrandRight.append(nav);
  primaryContentDiv.append(footerBrandRight);
  containerDiv.append(primaryContentDiv);
  primarySection.append(containerDiv);
  footerBrand.append(primarySection);

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('header-footer-brand__secondary');
  secondarySection.style.backgroundColor = '';
  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('header-container');
  const secondaryContentDiv = document.createElement('div');
  secondaryContentDiv.classList.add('header-footer-brand__secondary--content', 'header-d-flex', 'header-flex-column', 'header-justify-content-md-between', 'header-align-items-center');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('header-footer-brand__right', 'header-d-flex', 'header-flex-column', 'header-pb-5');
  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('header-social_media--title');
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialUl = document.createElement('ul');
  socialUl.classList.add('header-footer-brand__right--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-px-10', 'header-flex-wrap');

  const socialLinksRow = block.children[block.children.length - 1]; // Social Links are the last row
  if (socialLinksRow) {
    Array.from(socialLinksRow.children).forEach((cell) => {
      const socialLink = cell.querySelector('a');
      const socialImg = cell.querySelector('img');
      if (socialLink && socialImg) {
        const li = document.createElement('li');
        li.classList.add('header-footer-brand__right--item', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');
        const a = document.createElement('a');
        a.classList.add('header-footer-brand__right--link', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center', 'header-analytics_cta_click');
        a.setAttribute('data-cta-region', 'Footer');
        a.setAttribute('data-cta-label', `footer-${socialImg.alt.toLowerCase()}`);
        a.target = '_blank';
        a.setAttribute('data-platform-name', socialImg.alt.toLowerCase());
        a.setAttribute('data-social-linktype', 'follow');
        a.href = socialLink.href;

        const pic = createOptimizedPicture(socialImg.src, socialImg.alt);
        pic.querySelector('img').classList.add('header-object-fit-contain', 'header-w-100', 'header-h-100', 'header-no-rendition');
        pic.querySelector('img').setAttribute('aria-label', socialImg.alt.toLowerCase());
        moveInstrumentation(socialImg, pic.querySelector('img'));
        moveInstrumentation(socialLink, a);
        a.append(pic);
        li.append(a);
        socialUl.append(li);
      }
    });
  }
  socialMediaSection.append(socialUl);
  secondaryContentDiv.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('header-footer-brand__left', 'header-py-5', 'header-d-flex', 'header-flex-column', 'header-gap-3');

  const copyrightUl = document.createElement('ul');
  copyrightUl.classList.add('header-footer-brand__left--list', 'header-d-flex', 'header-align-items-center', 'header-justify-content-center', 'header-flex-wrap');

  const itcPortalLinkRow = block.children[block.children.length - 2]; // ITC Portal link is the 2nd last row
  if (itcPortalLinkRow) {
    const itcPortalAnchor = itcPortalLinkRow.children[0].querySelector('a');
    if (itcPortalAnchor) {
      const li = document.createElement('li');
      li.classList.add('header-footer-brand__left--item', 'header-foot_link');
      const a = document.createElement('a');
      a.classList.add('header-footer-brand__left--link', 'header-analytics_cta_click');
      a.setAttribute('data-cta-region', 'Footer');
      a.href = itcPortalAnchor.href;
      a.target = '_blank';
      a.textContent = itcPortalAnchor.textContent.trim();
      moveInstrumentation(itcPortalAnchor, a);
      li.append(a);
      copyrightUl.append(li);
    }
  }
  copyrightSection.append(copyrightUl);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('header-footer-brand__left--copyright', 'header-text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('header-footer-brand__left--text', 'header-text-white');
  const copyrightTextRow = block.children[block.children.length - 1]; // Assuming copyright text is the last cell of the last row for now
  if (copyrightTextRow) {
    const copyrightCell = copyrightTextRow.children[0];
    if (copyrightCell) {
      copyrightSpan.textContent = copyrightCell.textContent.trim();
      moveInstrumentation(copyrightCell, copyrightSpan);
    }
  }
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);
  secondaryContentDiv.append(copyrightSection);

  secondaryContainer.append(secondaryContentDiv);
  secondarySection.append(secondaryContainer);
  footerBrand.append(secondarySection);
  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlayDiv = document.createElement('div');
  overlayDiv.classList.add('header-overlay', 'header-position-absolute', 'header-top-0', 'header-start-0', 'header-w-100', 'header-h-100', 'header-bg-black', 'header-opacity-25');
  submenuContainer.append(overlayDiv);
  section.append(submenuContainer);

  block.textContent = '';
  block.append(section);
}
