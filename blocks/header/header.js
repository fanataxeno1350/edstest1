import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create main header container
  const section = document.createElement('section');
  section.className = 'header-position-relative header-mb-15';
  moveInstrumentation(block, section);

  // App Name (header-d-none header-app-name)
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', 'boing');
  // Assuming appName is the first child of the block if it's a simple text node
  const appNameCell = block.children[0]?.children[0];
  if (appNameCell) {
    appNameSpan.textContent = appNameCell.textContent.trim();
    moveInstrumentation(appNameCell, appNameSpan);
  }
  section.append(appNameSpan);

  // Header container (header-boing-container)
  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  section.append(header);

  // Left div (header-d-flex header-w-25)
  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  // The original HTML has an SVG path here, which isn't directly in the block JSON.
  // For now, we'll leave it empty as per the JSON structure which doesn't explicitly map it.
  header.append(headerLeftDiv);

  // Middle div (header-d-flex header-justify-content-center header-w-25) for Main Logo
  const headerMiddleDiv = document.createElement('div');
  headerMiddleDiv.className = 'header-d-flex header-justify-content-center header-w-25';
  const mainLogoCell = block.children[0]?.children[1]; // Assuming mainLogo is the second cell of the first row
  if (mainLogoCell) {
    const mainLogoLink = mainLogoCell.querySelector('a');
    const mainLogoImg = mainLogoCell.querySelector('img');
    if (mainLogoLink && mainLogoImg) {
      const newMainLogoLink = document.createElement('a');
      newMainLogoLink.href = mainLogoLink.href;
      newMainLogoLink.className = mainLogoLink.className;
      newMainLogoLink.setAttribute('data-ct', mainLogoLink.getAttribute('data-ct') || '');
      newMainLogoLink.setAttribute('aria-label', mainLogoLink.getAttribute('aria-label') || '');
      moveInstrumentation(mainLogoLink, newMainLogoLink);

      const logoDiv = document.createElement('div');
      logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';

      const optimizedMainLogo = createOptimizedPicture(mainLogoImg.src, mainLogoImg.alt, true, [{
        width: '100'
      }]);
      optimizedMainLogo.querySelector('img').className = 'header-header__logo-img';
      moveInstrumentation(mainLogoImg, optimizedMainLogo.querySelector('img'));
      logoDiv.append(optimizedMainLogo);
      newMainLogoLink.append(logoDiv);
      headerMiddleDiv.append(newMainLogoLink);
    }
  }
  header.append(headerMiddleDiv);

  // Right div (header-d-flex header-w-25 header-justify-content-end) for Login Button
  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginButtonCell = block.children[0]?.children[2]; // Assuming loginButtonText is the third cell of the first row
  if (loginButtonCell) {
    const loginLink = loginButtonCell.querySelector('a');
    const loginButton = loginButtonCell.querySelector('button');
    if (loginLink && loginButton) {
      const newLoginLink = document.createElement('a');
      newLoginLink.href = loginLink.href;
      newLoginLink.className = loginLink.className;
      newLoginLink.style.display = loginLink.style.display;
      moveInstrumentation(loginLink, newLoginLink);

      const newLoginButton = document.createElement('button');
      newLoginButton.className = loginButton.className;
      newLoginButton.textContent = loginButton.textContent.trim();
      moveInstrumentation(loginButton, newLoginButton);
      newLoginLink.append(newLoginButton);
      headerRightDiv.append(newLoginLink);
    }
  }
  header.append(headerRightDiv);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  section.append(submenuContainer);

  // Sidebar Aside
  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';
  submenuContainer.append(aside);

  // Sidebar Menu (ul)
  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  aside.append(sidebarMenuUl);

  // Sidebar Menu Items
  // Assuming sidebarMenuItems start from the second row of the block and each row represents an item
  const sidebarRows = [...block.children].slice(1, -1); // Exclude first row (header) and last row (footer)
  sidebarRows.forEach((row, index) => {
    // Check if the row looks like a sidebar item (e.g., has an img and an a tag)
    const img = row.querySelector('img');
    const link = row.querySelector('a');
    if (img && link) {
      const li = document.createElement('li');
      li.className = `header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200${link.textContent.trim() === 'Logout' ? ' header-sidebar__menu-item--logout' : ''}`;
      if (link.textContent.trim() === 'Logout') li.style.display = 'none';
      moveInstrumentation(row, li);

      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = link.className;
      newLink.setAttribute('data-consent', link.getAttribute('data-consent') || '');
      newLink.setAttribute('data-link', link.getAttribute('data-link') || '');
      moveInstrumentation(link, newLink);

      const optimizedIcon = createOptimizedPicture(img.src, img.alt, false, [{
        width: '40'
      }]); // Assuming a small icon size
      optimizedIcon.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      moveInstrumentation(img, optimizedIcon.querySelector('img'));
      newLink.append(optimizedIcon);
      newLink.append(document.createTextNode(link.textContent.trim()));
      li.append(newLink);
      sidebarMenuUl.append(li);
    }
  });

  // Sidebar Curve (if present in original HTML, but not explicitly in JSON fields)
  const sidebarCurveDiv = document.createElement('div');
  sidebarCurveDiv.className = 'header-sidebar__curve';
  aside.append(sidebarCurveDiv);

  // Footer Brand (header-footer-brand)
  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrandDiv.setAttribute('data-isdoodlevariation', 'false');
  aside.append(footerBrandDiv);

  // Footer Brand Primary Section
  const footerPrimarySection = document.createElement('section');
  footerPrimarySection.className = 'header-footer-brand__primary';
  footerPrimarySection.style.backgroundColor = '';
  footerBrandDiv.append(footerPrimarySection);

  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.className = 'header-container';
  footerPrimarySection.append(footerPrimaryContainer);

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';
  footerPrimaryContainer.append(footerPrimaryContent);

  // Footer Brand Left (ITC Logo, FSSI Logo)
  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';
  footerPrimaryContent.append(footerBrandLeft);

  const itcLogoCell = block.children[block.children.length - 1]?.children[0]; // Assuming ITC Logo is the first cell of the last row
  if (itcLogoCell) {
    const itcLink = itcLogoCell.querySelector('a');
    const itcImg = itcLogoCell.querySelector('img');
    if (itcLink && itcImg) {
      const newItcLink = document.createElement('a');
      newItcLink.href = itcLink.href;
      newItcLink.target = '_blank';
      newItcLink.className = itcLink.className;
      newItcLink.setAttribute('data-cta-region', itcLink.getAttribute('data-cta-region') || '');
      newItcLink.setAttribute('aria-label', itcLink.getAttribute('aria-label') || '');
      moveInstrumentation(itcLink, newItcLink);

      const optimizedItcLogo = createOptimizedPicture(itcImg.src, itcImg.alt, false, [{
        width: '100'
      }]);
      optimizedItcLogo.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      moveInstrumentation(itcImg, optimizedItcLogo.querySelector('img'));
      newItcLink.append(optimizedItcLogo);
      footerBrandLeft.append(newItcLink);
    }
  }

  const fssiLogoCell = block.children[block.children.length - 1]?.children[1]; // Assuming FSSI Logo is the second cell of the last row
  if (fssiLogoCell) {
    const fssiImg = fssiLogoCell.querySelector('img');
    if (fssiImg) {
      const fssiDiv = document.createElement('div');
      fssiDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
      moveInstrumentation(fssiLogoCell, fssiDiv);

      const optimizedFssiLogo = createOptimizedPicture(fssiImg.src, fssiImg.alt, false, [{
        width: '100'
      }]);
      optimizedFssiLogo.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
      moveInstrumentation(fssiImg, optimizedFssiLogo.querySelector('img'));
      fssiDiv.append(optimizedFssiLogo);
      footerBrandLeft.append(fssiDiv);
    }
  }

  // Footer Brand Right (Navbar)
  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';
  footerPrimaryContent.append(footerBrandRight);

  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNav);

  const footerNavLeft = document.createElement('div');
  footerNavLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';
  footerNav.append(footerNavLeft);

  const footerNavRight = document.createElement('div');
  footerNavRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  footerNav.append(footerNavRight);

  // Footer List Items
  // Assuming footerListItems are in the last row, starting from the third cell, grouped into columns
  const footerListCells = [...block.children[block.children.length - 1]?.children].slice(2);
  let currentFooterListDiv = document.createElement('div');
  currentFooterListDiv.className = 'header-footerList';
  let footerListUl = document.createElement('ul');
  footerListUl.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
  currentFooterListDiv.append(footerListUl);
  footerNavLeft.append(currentFooterListDiv);

  footerListCells.forEach((cell, cellIndex) => {
    const link = cell.querySelector('a');
    if (link) {
      const li = document.createElement('li');
      li.className = 'header-footer-list__item';
      moveInstrumentation(cell, li);

      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = link.className;
      if (link.target) newLink.target = link.target;
      newLink.textContent = link.textContent.trim();
      moveInstrumentation(link, newLink);
      li.append(newLink);
      footerListUl.append(li);
    } else if (cell.textContent.trim() === '---') { // Assuming '---' or similar acts as a separator for new columns
      // Move to the next column
      if (cellIndex < 3) {
        currentFooterListDiv = document.createElement('div');
        currentFooterListDiv.className = 'header-footerList';
        footerListUl = document.createElement('ul');
        footerListUl.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
        currentFooterListDiv.append(footerListUl);
        footerNavLeft.append(currentFooterListDiv);
      } else {
        currentFooterListDiv = document.createElement('div');
        currentFooterListDiv.className = 'header-footerList';
        footerListUl = document.createElement('ul');
        footerListUl.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
        currentFooterListDiv.append(footerListUl);
        footerNavRight.append(currentFooterListDiv);
      }
    }
  });

  // Footer Brand Secondary Section (Social Links and Copyright)
  const footerSecondarySection = document.createElement('section');
  footerSecondarySection.className = 'header-footer-brand__secondary';
  footerSecondarySection.style.backgroundColor = '';
  footerBrandDiv.append(footerSecondarySection);

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  footerSecondarySection.append(footerSecondaryContainer);

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';
  footerSecondaryContainer.append(footerSecondaryContent);

  // Social Media Links (header-footer-brand__right)
  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  footerSecondaryContent.append(socialMediaSection);

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialUl = document.createElement('ul');
  socialUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';
  socialMediaSection.append(socialUl);

  // Assuming social links are in the last row, after footer list items, each in its own cell
  const socialLinkCells = [...block.children[block.children.length - 1]?.children].slice(footerListCells.length + 2); // Adjust index based on actual block structure
  socialLinkCells.forEach((cell) => {
    const link = cell.querySelector('a');
    const img = cell.querySelector('img');
    if (link && img) {
      const li = document.createElement('li');
      li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
      moveInstrumentation(cell, li);

      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = link.className;
      newLink.target = '_blank';
      newLink.setAttribute('data-cta-region', link.getAttribute('data-cta-region') || '');
      newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label') || '');
      newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name') || '');
      newLink.setAttribute('data-social-linktype', link.getAttribute('data-social-linktype') || '');
      moveInstrumentation(link, newLink);

      const optimizedSocialIcon = createOptimizedPicture(img.src, img.alt, false, [{
        width: '40'
      }]);
      optimizedSocialIcon.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      optimizedSocialIcon.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label') || '');
      moveInstrumentation(img, optimizedSocialIcon.querySelector('img'));
      newLink.append(optimizedSocialIcon);
      socialUl.append(li);
      li.append(newLink);
    }
  });

  // Copyright and ITC Portal Link
  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  footerSecondaryContent.append(copyrightSection);

  const copyrightUl = document.createElement('ul');
  copyrightUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  copyrightSection.append(copyrightUl);

  // ITC Portal link (if not already handled, or if a separate one in footer-brand__left--list)
  // Assuming the ITC portal link in the footer-brand__left--list is the first link in the last cell of the last row
  const itcPortalLinkCell = block.children[block.children.length - 1]?.children[block.children[block.children.length - 1].children.length - 1];
  if (itcPortalLinkCell) {
    const itcPortalLink = itcPortalLinkCell.querySelector('a');
    if (itcPortalLink) {
      const li = document.createElement('li');
      li.className = 'header-footer-brand__left--item header-foot_link';
      moveInstrumentation(itcPortalLinkCell, li);

      const newLink = document.createElement('a');
      newLink.href = itcPortalLink.href;
      newLink.target = '_blank';
      newLink.className = itcPortalLink.className;
      newLink.textContent = itcPortalLink.textContent.trim();
      moveInstrumentation(itcPortalLink, newLink);
      li.append(newLink);
      copyrightUl.append(li);
    }
  }

  // Copyright Text
  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  // Assuming copyrightText is the last text content in the block's last row, or a specific cell.
  // For now, let's try to extract it from the last cell if it's just text.
  const copyrightTextCell = [...block.children[block.children.length - 1]?.children].pop();
  if (copyrightTextCell && copyrightTextCell.textContent.includes('©')) {
    copyrightSpan.textContent = copyrightTextCell.textContent.trim();
    moveInstrumentation(copyrightTextCell, copyrightSpan);
  } else {
    // Fallback if not found easily, or if it's a dedicated field in JSON
    copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  }
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);

  // Overlay
  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  block.textContent = '';
  block.append(section);
}
