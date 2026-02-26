import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  moveInstrumentation(block, section);
  section.className = 'header-section header-position-relative header-mb-15';

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-app-name header-d-none';
  appNameSpan.dataset.appName = 'boing';
  appNameSpan.textContent = 'boing';
  section.append(appNameSpan);

  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-container header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const [headerRow, ...sidebarAndFooterRows] = [...block.children];
  const headerCells = [...headerRow.children];

  // Header Left Content
  const leftContentDiv = document.createElement('div');
  leftContentDiv.className = 'header-left-content header-d-flex header-w-25';
  const leftImage = headerCells[0].querySelector('img');
  if (leftImage) {
    const optimizedLeftPic = createOptimizedPicture(leftImage.src, leftImage.alt);
    moveInstrumentation(leftImage, optimizedLeftPic.querySelector('img'));
    leftContentDiv.append(optimizedLeftPic);
  } else {
    leftContentDiv.textContent = headerCells[0].textContent.trim();
  }
  headerContainer.append(leftContentDiv);

  // Header Center Content (Logo)
  const centerContentDiv = document.createElement('div');
  centerContentDiv.className = 'header-center-content header-d-flex header-justify-content-center header-w-25';
  const logoLink = headerCells[1].querySelector('a');
  if (logoLink) {
    const newLogoLink = document.createElement('a');
    newLogoLink.href = logoLink.href;
    newLogoLink.className = 'header-logo-link header-analytics_cta_click';
    newLogoLink.dataset.ct = logoLink.dataset.ct || '';
    newLogoLink.setAttribute('aria-label', logoLink.getAttribute('aria-label') || '');
    moveInstrumentation(logoLink, newLogoLink);

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-logo header-d-flex header-align-items-center';
    const logoImg = logoLink.querySelector('img');
    if (logoImg) {
      const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '200' }]);
      moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
      optimizedLogoPic.querySelector('img').setAttribute('fetchpriority', 'high');
      optimizedLogoPic.querySelector('img').setAttribute('loading', 'eager');
      optimizedLogoPic.querySelector('img').className = 'header-logo-img';
      logoDiv.append(optimizedLogoPic);
    }
    newLogoLink.append(logoDiv);
    centerContentDiv.append(newLogoLink);
  }
  headerContainer.append(centerContentDiv);

  // Header Right Content (Login Button)
  const rightContentDiv = document.createElement('div');
  rightContentDiv.className = 'header-right-content header-d-flex header-w-25 header-justify-content-end';
  const loginLink = headerCells[2].querySelector('a');
  if (loginLink) {
    const newLoginLink = document.createElement('a');
    newLoginLink.href = loginLink.href;
    newLoginLink.className = 'header-login-btn-wrapper header-analytics_cta_click';
    newLoginLink.style.display = 'inline';
    moveInstrumentation(loginLink, newLoginLink);

    const loginButton = document.createElement('button');
    loginButton.className = 'header-login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = loginLink.textContent.trim();
    newLoginLink.append(loginButton);
    rightContentDiv.append(newLoginLink);
  }
  headerContainer.append(rightContentDiv);
  section.append(headerContainer);

  // Submenu Container (Sidebar and Footer)
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  // Sidebar Menu
  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.className = 'header-sidebar-menu header-list-unstyled header-px-4';

  const sidebarMenuItems = sidebarAndFooterRows.filter((row) => row.dataset.blockItemType === 'headerSidebarMenuItem');
  sidebarMenuItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-sidebar-menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    const link = row.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-sidebar-menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      newLink.dataset.consent = link.dataset.consent || '';
      newLink.dataset.link = link.dataset.link || '';
      moveInstrumentation(link, newLink);

      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').className = 'header-sidebar-menu-icon header-me-4';
        optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
        newLink.append(optimizedPic);
      }
      newLink.append(document.createTextNode(link.textContent.trim()));
      li.append(newLink);
    }
    sidebarMenuUl.append(li);
  });
  aside.append(sidebarMenuUl);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar-curve';
  aside.append(sidebarCurve);

  // Footer Brand
  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrandDiv.dataset.isdoodlevariation = 'false';

  // Footer Brand Primary
  const footerBrandPrimarySection = document.createElement('section');
  footerBrandPrimarySection.className = 'header-footer-brand-primary';
  footerBrandPrimarySection.style.backgroundColor = '';

  const footerContainerPrimary = document.createElement('div');
  footerContainerPrimary.className = 'header-footer-container header-container';

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'header-footer-brand-primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  // Footer Brand Left (Logos)
  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand-left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const itcLogoLink = sidebarAndFooterRows.find((row) => row.querySelector('a[aria-label="ITC Logo"]'));
  if (itcLogoLink) {
    const link = itcLogoLink.querySelector('a');
    const newLink = document.createElement('a');
    newLink.href = link.href;
    newLink.target = '_blank';
    newLink.className = 'header-footer-brand-logo header-d-inline-block header-analytics_cta_click';
    newLink.dataset.ctaRegion = 'Footer';
    newLink.setAttribute('aria-label', 'ITC Logo');
    moveInstrumentation(link, newLink);

    const img = link.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
      newLink.append(optimizedPic);
    }
    footerBrandLeft.append(newLink);
  }

  const fssiLogoDiv = sidebarAndFooterRows.find((row) => row.querySelector('img[alt="FSSI Logo"]'));
  if (fssiLogoDiv) {
    const div = document.createElement('div');
    div.className = 'header-footer-brand-secondary--logo header-d-inline-block';
    const img = fssiLogoDiv.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
      optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
      div.append(optimizedPic);
    }
    footerBrandLeft.append(div);
  }
  footerBrandPrimaryContent.append(footerBrandLeft);

  // Footer Brand Right (Navbar)
  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand-right';

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.className = 'header-footer-brand-navbar header-d-grid header-d-md-flex';
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand-navbar--left header-d-flex header-flex-column header-flex-md-row';

  const footerListWrappers = sidebarAndFooterRows.filter((row) => row.dataset.blockItemType === 'headerFooterListItem');
  const listWrappersContent = [[], [], [], []]; // Assuming 4 lists based on HTML structure

  footerListWrappers.forEach((row, index) => {
    const link = row.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list-item--link header-d-inline-block';
      newLink.dataset.linkRegion = 'Footer List';
      if (link.target) newLink.target = link.target;
      moveInstrumentation(link, newLink);
      newLink.textContent = link.textContent.trim();
      listWrappersContent[index % 4].push(newLink);
    }
  });

  listWrappersContent.forEach((listItems, index) => {
    if (listItems.length > 0) {
      const listWrapper = document.createElement('div');
      listWrapper.className = 'header-footer-list-wrapper';
      const ul = document.createElement('ul');
      ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
      listItems.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'header-footer-list-item';
        li.append(item);
        ul.append(li);
      });
      listWrapper.append(ul);
      if (index < 2) {
        footerNavbarLeft.append(listWrapper);
      } else {
        if (!footerBrandNavbar.querySelector('.header-footer-brand-navbar--right')) {
          const footerNavbarRight = document.createElement('div');
          footerNavbarRight.className = 'header-footer-brand-navbar--right header-d-flex header-flex-column header-flex-md-row';
          footerBrandNavbar.append(footerNavbarRight);
        }
        footerBrandNavbar.querySelector('.header-footer-brand-navbar--right').append(listWrapper);
      }
    }
  });

  footerBrandNavbar.prepend(footerNavbarLeft);
  footerBrandRight.append(footerBrandNavbar);
  footerBrandPrimaryContent.append(footerBrandRight);
  footerContainerPrimary.append(footerBrandPrimaryContent);
  footerBrandPrimarySection.append(footerContainerPrimary);
  footerBrandDiv.append(footerBrandPrimarySection);

  // Footer Brand Secondary
  const footerBrandSecondarySection = document.createElement('section');
  footerBrandSecondarySection.className = 'header-footer-brand-secondary';
  footerBrandSecondarySection.style.backgroundColor = '';

  const footerContainerSecondary = document.createElement('div');
  footerContainerSecondary.className = 'header-footer-container header-container';

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'header-footer-brand-secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  // Social Media Links
  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand-right header-d-flex header-flex-column header-pb-5';
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social-media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaUl = document.createElement('ul');
  socialMediaUl.className = 'header-footer-brand-right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const socialMediaLinks = sidebarAndFooterRows.filter((row) => row.dataset.blockItemType === 'headerSocialMediaLink');
  socialMediaLinks.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-footer-brand-right--item header-d-flex header-justify-content-center header-align-items-center';
    const link = row.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.className = 'header-footer-brand-right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      newLink.dataset.ctaRegion = 'Footer';
      newLink.dataset.ctaLabel = link.dataset.ctaLabel || '';
      newLink.dataset.platformName = link.dataset.platformName || '';
      newLink.dataset.socialLinktype = 'follow';
      moveInstrumentation(link, newLink);

      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label') || '');
        optimizedPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
        optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
        newLink.append(optimizedPic);
      }
      li.append(newLink);
    }
    socialMediaUl.append(li);
  });
  socialMediaSection.append(socialMediaUl);
  footerBrandSecondaryContent.append(socialMediaSection);

  // ITC Portal and Copyright
  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.className = 'header-footer-brand-left header-py-5 header-d-flex header-flex-column header-gap-3';

  const itcPortalUl = document.createElement('ul');
  itcPortalUl.className = 'header-footer-brand-left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  const itcPortalLinkRow = sidebarAndFooterRows.find((row) => row.querySelector('a[href="https://www.itcportal.com/"]'));
  if (itcPortalLinkRow) {
    const li = document.createElement('li');
    li.className = 'header-footer-brand-left--item header-foot_link';
    const link = itcPortalLinkRow.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.className = 'header-footer-brand-left--link header-analytics_cta_click';
      newLink.dataset.ctaRegion = 'Footer';
      moveInstrumentation(link, newLink);
      newLink.textContent = link.textContent.trim();
      li.append(newLink);
    }
    itcPortalUl.append(li);
  }
  footerBrandLeftSecondary.append(itcPortalUl);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand-left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand-left--text header-text-white';
  copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  footerBrandLeftSecondary.append(copyrightDiv);

  footerBrandSecondaryContent.append(footerBrandLeftSecondary);
  footerContainerSecondary.append(footerBrandSecondaryContent);
  footerBrandSecondarySection.append(footerContainerSecondary);
  footerBrandDiv.append(footerBrandSecondarySection);

  aside.append(footerBrandDiv);
  submenuContainer.append(aside);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  section.append(submenuContainer);

  block.textContent = '';
  block.append(section);
}
