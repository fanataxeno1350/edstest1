import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainSection = document.createElement('section');
  mainSection.className = 'header-position-relative header-mb-15';

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  mainSection.append(appNameSpan);

  // Header
  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  // Assuming the SVG is dynamic and comes from block.children or a specific field not explicitly mapped in this JSON
  // For now, it's an empty div as per the HTML structure provided.
  header.append(headerLeftDiv);

  const headerMiddleDiv = document.createElement('div');
  headerMiddleDiv.className = 'header-d-flex header-justify-content-center header-w-25';
  const headerLogoLink = document.createElement('a');
  headerLogoLink.href = '/';
  headerLogoLink.className = 'header-analytics_cta_click';
  headerLogoLink.setAttribute('data-ct', '');
  headerLogoLink.setAttribute('a-label', 'header-logo-boing');
  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  const headerLogoImg = document.createElement('img');
  headerLogoImg.src = '/content/dam/aemigrate/uploaded-folder/image/lets-boing-logo-fmt-webp-alpha.webp';
  headerLogoImg.alt = 'Let\'s Boing';
  headerLogoImg.setAttribute('fetchpriority', 'high');
  headerLogoImg.setAttribute('loading', 'eager');
  headerLogoImg.className = 'header-header__logo-img';
  headerLogoDiv.append(headerLogoImg);
  headerLogoLink.append(headerLogoDiv);
  headerMiddleDiv.append(headerLogoLink);
  header.append(headerMiddleDiv);

  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginLink = document.createElement('a');
  loginLink.href = '/login.html';
  loginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
  loginLink.style.display = 'inline';
  const loginButton = document.createElement('button');
  loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
  loginButton.textContent = 'Login';
  loginLink.append(loginButton);
  headerRightDiv.append(loginLink);
  header.append(headerRightDiv);
  mainSection.append(header);

  // Submenu Container (Sidebar and Overlay)
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrandDiv.setAttribute('data-isdoodlevariation', 'false');

  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.className = 'header-footer-brand__primary';
  footerPrimarySection.style.backgroundColor = '';
  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.className = 'header-container';
  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const itcLink = document.createElement('a');
  itcLink.href = 'https://www.itcportal.com/';
  itcLink.target = '_blank';
  itcLink.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
  itcLink.setAttribute('data-cta-region', 'Footer');
  itcLink.setAttribute('aria-label', 'ITC Logo');
  const itcImg = document.createElement('img');
  itcImg.src = '/content/dam/aemigrate/uploaded-folder/image/itc-logo-2-fmt-webp-alpha.webp';
  itcImg.alt = 'ITC Logo';
  itcImg.className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
  itcImg.setAttribute('loading', 'lazy');
  itcLink.append(itcImg);
  footerBrandLeft.append(itcLink);

  const fssiLogoDiv = document.createElement('div');
  fssiLogoDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
  const fssiImg = document.createElement('img');
  fssiImg.className = 'header-object-fit-contain header-w-100 header-no-rendition';
  fssiImg.src = '/content/dam/aemigrate/uploaded-folder/image/fssi-logo-update-fmt-webp-alpha.webp';
  fssiImg.alt = 'FSSI Logo';
  fssiImg.setAttribute('loading', 'lazy');
  fssiLogoDiv.append(fssiImg);
  footerBrandLeft.append(fssiLogoDiv);
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

  footerNavbar.append(footerNavbarLeft, footerNavbarRight);
  footerBrandRight.append(footerNavbar);
  footerPrimaryContent.append(footerBrandRight);
  footerPrimaryContainer.append(footerPrimaryContent);
  footerPrimarySection.append(footerPrimaryContainer);
  footerBrandDiv.append(footerPrimarySection);

  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.className = 'header-footer-brand__secondary';
  footerSecondarySection.style.backgroundColor = '';
  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);
  const socialMediaUl = document.createElement('ul');
  socialMediaUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';
  socialMediaSection.append(socialMediaUl);
  footerSecondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  const copyrightUl = document.createElement('ul');
  copyrightUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  copyrightSection.append(copyrightUl);
  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);
  footerSecondaryContent.append(copyrightSection);

  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondarySection.append(footerSecondaryContainer);
  footerBrandDiv.append(footerSecondarySection);

  aside.append(sidebarMenuUl, document.createElement('div').className = 'header-sidebar__curve', footerBrandDiv);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';

  submenuContainer.append(aside, overlayDiv);
  mainSection.append(submenuContainer);

  // Process block children for dynamic content
  [...block.children].forEach((row) => {
    moveInstrumentation(row, mainSection); // Move instrumentation to the main section or appropriate container

    const rowType = row.dataset.rowType;

    if (rowType === 'sidebarMenuItem') {
      const li = document.createElement('li');
      li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
      moveInstrumentation(row, li);

      const link = document.createElement('a');
      link.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      link.setAttribute('data-consent', 'false'); // Default, can be overridden if cell has it

      const cells = [...row.children];
      const iconCell = cells[0];
      const textCell = cells[2];
      const linkCell = cells[3];

      if (iconCell) {
        const img = iconCell.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
          optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
          link.append(optimizedPic);
        }
      }

      if (textCell) {
        link.append(textCell.textContent.trim());
      }

      if (linkCell) {
        const a = linkCell.querySelector('a');
        if (a) {
          link.href = a.href;
          link.setAttribute('data-link', a.href);
        }
      }
      li.append(link);
      sidebarMenuUl.append(li);
    } else if (rowType === 'footerLinkItem') {
      const cells = [...row.children];
      const textCell = cells[0];
      const linkCell = cells[1];

      if (textCell && linkCell) {
        const li = document.createElement('li');
        li.className = 'header-footer-list__item';
        moveInstrumentation(row, li);

        const a = document.createElement('a');
        a.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        a.setAttribute('data-link-region', 'Footer List');
        a.textContent = textCell.textContent.trim();
        const existingLink = linkCell.querySelector('a');
        if (existingLink) {
          a.href = existingLink.href;
          if (existingLink.target) a.target = existingLink.target;
        } else {
          a.href = linkCell.textContent.trim(); // Fallback if no <a> tag
        }

        li.append(a);

        // Append to the correct footerList based on the original HTML structure
        // The HTML has 4 `footerList` divs, we need to distribute them.
        // For simplicity, let's just append them to the first one found or create one.
        let targetUl = footerNavbarLeft.querySelector('.header-footerList ul');
        if (!targetUl) {
          const footerListDiv = document.createElement('div');
          footerListDiv.className = 'header-footerList';
          targetUl = document.createElement('ul');
          targetUl.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
          footerListDiv.append(targetUl);
          footerNavbarLeft.append(footerListDiv);
        }
        targetUl.append(li);
      }
    } else if (rowType === 'socialMediaLink') {
      const cells = [...row.children];
      const iconCell = cells[0];
      const linkCell = cells[2];

      if (iconCell && linkCell) {
        const li = document.createElement('li');
        li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
        moveInstrumentation(row, li);

        const a = document.createElement('a');
        a.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
        a.setAttribute('data-cta-region', 'Footer');
        a.target = '_blank';

        const existingLink = linkCell.querySelector('a');
        if (existingLink) {
          a.href = existingLink.href;
          a.setAttribute('data-cta-label', `footer-${existingLink.href.includes('facebook') ? 'facebook' : existingLink.href.includes('instagram') ? 'instagram' : existingLink.href.includes('youtube') ? 'youtube' : 'social'}`);
          a.setAttribute('data-platform-name', existingLink.href.includes('facebook') ? 'facebook' : existingLink.href.includes('instagram') ? 'instagram' : existingLink.href.includes('youtube') ? 'youtube' : '');
          a.setAttribute('data-social-linktype', 'follow');
        } else {
          a.href = linkCell.textContent.trim();
        }

        const img = iconCell.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
          optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
          optimizedPic.querySelector('img').setAttribute('aria-label', img.alt);
          a.append(optimizedPic);
        }
        li.append(a);
        socialMediaUl.append(li);
      }
    }
  });

  block.textContent = '';
  block.append(mainSection);
}
