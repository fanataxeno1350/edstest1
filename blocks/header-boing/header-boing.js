import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Main header container
  const headerSection = document.createElement('section');
  headerSection.className = 'header-position-relative header-mb-15';
  moveInstrumentation(block, headerSection);

  // App Name (hidden)
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.dataset.appName = block.children[0]?.children[0]?.textContent || 'boing';
  appNameSpan.textContent = block.children[0]?.children[0]?.textContent || 'boing';
  headerSection.append(appNameSpan);

  // Fixed Header
  const headerContainer = document.createElement('header');
  headerContainer.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  headerSection.append(headerContainer);

  // Left div (empty in provided HTML, but present in structure)
  const leftDiv = document.createElement('div');
  leftDiv.className = 'header-d-flex header-w-25';
  headerContainer.append(leftDiv);

  // Middle div (Logo)
  const middleDiv = document.createElement('div');
  middleDiv.className = 'header-d-flex header-justify-content-center header-w-25';
  headerContainer.append(middleDiv);

  const logoLink = document.createElement('a');
  logoLink.href = block.children[0]?.children[2]?.querySelector('a')?.href || '/';
  logoLink.className = 'header-analytics_cta_click';
  logoLink.dataset.ct = '';
  logoLink.setAttribute('aria-label', 'header-logo-boing');
  middleDiv.append(logoLink);

  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  logoLink.append(logoDiv);

  const logoImg = block.children[0]?.children[1]?.querySelector('img');
  if (logoImg) {
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt);
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
    optimizedLogoPic.querySelector('img').className = 'header-header__logo-img';
    optimizedLogoPic.querySelector('img').setAttribute('fetchpriority', 'high');
    optimizedLogoPic.querySelector('img').setAttribute('loading', 'eager');
    logoDiv.append(optimizedLogoPic);
  }

  // Right div (Login Button)
  const rightDiv = document.createElement('div');
  rightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  headerContainer.append(rightDiv);

  const loginLink = block.children[0]?.children[3]?.querySelector('a');
  if (loginLink) {
    const newLoginLink = document.createElement('a');
    newLoginLink.href = loginLink.href;
    newLoginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
    newLoginLink.style.display = 'inline';
    moveInstrumentation(loginLink, newLoginLink);

    const loginButton = document.createElement('button');
    loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = loginLink.textContent.trim();
    newLoginLink.append(loginButton);
    rightDiv.append(newLoginLink);
  }

  // Submenu Container (Sidebar and Overlay)
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  headerSection.append(submenuContainer);

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';
  submenuContainer.append(aside);

  // Sidebar Menu Items
  const menuUl = document.createElement('ul');
  menuUl.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  aside.append(menuUl);

  // Assuming menuItems start from the 5th row (index 4) in the block children
  // and continue until footerMenuItems start.
  // We need to determine the range for menuItems and footerMenuItems based on the block structure.
  // Given the JSON, menuItems, footerMenuItems, and footerSocialLinks are containers.
  // Let's assume the structure is: appName, logoImage, logoLink, loginLink, menuItems (rows), footerMenuItems (rows), footerSocialLinks (rows), itcLogo, fssiLogo, itcPortalLink, copyrightText

  // Find the start and end of menuItems, footerMenuItems, and footerSocialLinks based on their structure in the block.children
  // This requires a more robust way to identify the sections if they are not strictly ordered or if there are other cells.
  // For now, let's assume menuItems start from the 5th row (index 4) and iterate until we hit a different structure.
  // This is a common pattern where each row corresponds to an item in a list.

  // Let's re-evaluate based on the blockJson structure: menuItems, footerMenuItems, footerSocialLinks are containers.
  // This means they are represented as multiple rows in the block.children.

  const blockChildren = [...block.children];
  let currentChildIndex = 0;

  // Skip appName, logoImage, logoLink, loginLink
  // These are single cells in the first row of the block.
  // The actual block.children will have rows for each item in the containers.

  // Let's assume the first row of the block contains appName, logoImage, logoLink, loginLink
  // And subsequent rows correspond to menuItems, then footerMenuItems, then footerSocialLinks.
  // This is a common interpretation of how block.children maps to container fields.

  // Find the row containing the first menu item
  // In the provided HTML, menu items are `li` elements directly under `ul`.
  // In the block.children, each `li` would be a `row`.
  // The `headerMenuItem` model has `icon`, `label`, `link`.

  // Let's assume block.children[0] is the row for appName, logoImage, logoLink, loginLink.
  // Then subsequent rows are for menuItems, then footerMenuItems, then footerSocialLinks.

  // To correctly map, we need to know how many rows each container takes.
  // Without explicit delimiters in the block.children, we have to infer.
  // A common approach is that each 'row' in the block.children corresponds to one item in a 'container' field.

  // Let's assume the block.children structure is:
  // [0]: appName, logoImage, logoLink, loginLink
  // [1...N]: menuItems
  // [N+1...M]: footerMenuItems
  // [M+1...P]: footerSocialLinks
  // [P+1]: itcLogo, fssiLogo, itcPortalLink, copyrightText (might be in one row or separate)

  // This is where the `blockJson` doesn't directly map to `block.children` in a simple 1:1 row fashion for all fields.
  // For `decorate` function, we usually iterate `block.children` and parse cells within each row.

  // Let's re-parse based on the HTML structure and typical AEM block patterns:
  // The first row of the block table will contain the app name, logo image, logo link, and login link.
  // Subsequent rows will contain the menu items (icon, label, link).
  // Then footer items (label, link).
  // Then social links (icon, link).
  // Then the last row might contain ITC logo, FSSI logo, ITC portal link, copyright text.

  // Get the first row for header details
  const headerRow = blockChildren[0];
  const headerCells = headerRow ? [...headerRow.children] : [];

  // Extract appName from the first cell of the first row
  if (headerCells[0]) {
    appNameSpan.textContent = headerCells[0].textContent.trim();
    appNameSpan.dataset.appName = headerCells[0].textContent.trim();
  }

  // Extract logoImage from the second cell of the first row
  const blockLogoImg = headerCells[1]?.querySelector('img');
  if (blockLogoImg) {
    const optimizedBlockLogoPic = createOptimizedPicture(blockLogoImg.src, blockLogoImg.alt);
    moveInstrumentation(blockLogoImg, optimizedBlockLogoPic.querySelector('img'));
    optimizedBlockLogoPic.querySelector('img').className = 'header-header__logo-img';
    optimizedBlockLogoPic.querySelector('img').setAttribute('fetchpriority', 'high');
    optimizedBlockLogoPic.querySelector('img').setAttribute('loading', 'eager');
    logoDiv.append(optimizedBlockLogoPic);
  }

  // Extract logoLink from the third cell of the first row
  const blockLogoLink = headerCells[2]?.querySelector('a');
  if (blockLogoLink) {
    logoLink.href = blockLogoLink.href;
    logoLink.setAttribute('aria-label', blockLogoLink.textContent.trim() || 'header-logo-boing');
  }

  // Extract loginLink from the fourth cell of the first row
  const blockLoginLink = headerCells[3]?.querySelector('a');
  if (blockLoginLink) {
    const newLoginLink = document.createElement('a');
    newLoginLink.href = blockLoginLink.href;
    newLoginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
    newLoginLink.style.display = 'inline';
    moveInstrumentation(blockLoginLink, newLoginLink);

    const loginButton = document.createElement('button');
    loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
    loginButton.textContent = blockLoginLink.textContent.trim();
    newLoginLink.append(loginButton);
    rightDiv.append(newLoginLink);
  }

  // Loop through remaining rows for menu items, footer items, and social links
  // We need to distinguish between them. A common pattern is to have a specific class or structure in the row.
  // Or, based on the number of cells per row.

  // Given the HTML, `menuItems` have an icon, label, and link.
  // `footerMenuItems` have a label and link.
  // `footerSocialLinks` have an icon and link.

  let menuItemsStart = false;
  let footerMenuItemsStart = false;
  let footerSocialLinksStart = false;

  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');

  const footerNavLeft = document.createElement('div');
  footerNavLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';
  footerNav.append(footerNavLeft);

  const footerNavRight = document.createElement('div');
  footerNavRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  footerNav.append(footerNavRight);

  let currentFooterList = null;
  let footerListCount = 0;

  const socialMediaUl = document.createElement('ul');
  socialMediaUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const footerLeftListUl = document.createElement('ul');
  footerLeftListUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  for (let i = 1; i < blockChildren.length; i += 1) {
    const row = blockChildren[i];
    const cells = [...row.children];

    // Heuristic to distinguish item types based on number of cells or content type
    // Header Menu Item: icon (img), label (text), link (a) -> 3 cells
    // Footer Menu Item: label (text), link (a) -> 2 cells
    // Footer Social Link: icon (img), link (a) -> 2 cells
    // ITC/FSSI/Copyright: img, img, a, text -> 4 cells (or fewer if some are empty)

    // This is a very fragile way to parse. A better way would be to have explicit markers in the block.
    // Or, if the block.children directly maps to the 'items' in a container field, each row is one item.
    // Let's assume the order as per the JSON structure: menuItems, footerMenuItems, footerSocialLinks, then the last few fields.

    // Menu Items
    if (cells.length === 3 && cells[0].querySelector('img') && cells[1].textContent && cells[2].querySelector('a')) {
      const li = document.createElement('li');
      moveInstrumentation(row, li);
      li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

      const link = document.createElement('a');
      link.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      link.href = cells[2].querySelector('a').href;
      link.dataset.consent = 'false'; // Default, adjust if needed
      link.dataset.link = cells[2].querySelector('a').href; // Use href as data-link
      link.textContent = cells[1].textContent.trim();
      moveInstrumentation(cells[2].querySelector('a'), link);

      const img = cells[0].querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
        optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
        link.prepend(optimizedPic);
      }
      li.append(link);
      menuUl.append(li);
    } else if (cells.length === 2 && cells[0].textContent && cells[1].querySelector('a')) {
      // Footer Menu Item or Footer Social Link
      // Need to differentiate based on image presence
      if (cells[0].querySelector('img')) { // Footer Social Link
        const li = document.createElement('li');
        moveInstrumentation(row, li);
        li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

        const link = document.createElement('a');
        link.href = cells[1].querySelector('a').href;
        link.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
        link.dataset.ctaRegion = 'Footer';
        link.dataset.ctaLabel = `footer-${cells[0].querySelector('img').alt.toLowerCase()}`;
        link.target = '_blank';
        link.dataset.platformName = cells[0].querySelector('img').alt.toLowerCase();
        link.dataset.socialLinktype = 'follow';
        moveInstrumentation(cells[1].querySelector('a'), link);

        const img = cells[0].querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').setAttribute('aria-label', img.alt);
          optimizedPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
          optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
          link.append(optimizedPic);
        }
        li.append(link);
        socialMediaUl.append(li);
      } else { // Footer Menu Item
        if (!currentFooterList || footerListCount % 3 === 0) { // Create a new footerList div every 3 lists
          currentFooterList = document.createElement('div');
          currentFooterList.className = 'header-footerList';
          if (footerListCount < 3) {
            footerNavLeft.append(currentFooterList);
          } else {
            footerNavRight.append(currentFooterList);
          }
          footerListCount += 1;
        }

        let ul = currentFooterList.querySelector('ul');
        if (!ul) {
          ul = document.createElement('ul');
          ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
          currentFooterList.append(ul);
        }

        const li = document.createElement('li');
        moveInstrumentation(row, li);
        li.className = 'header-footer-list__item';

        const link = document.createElement('a');
        link.href = cells[1].querySelector('a').href;
        link.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        link.dataset.linkRegion = 'Footer List';
        link.textContent = cells[0].textContent.trim();
        moveInstrumentation(cells[1].querySelector('a'), link);

        li.append(link);
        ul.append(li);
      }
    } else if (cells.length === 4 && cells[0].querySelector('img') && cells[1].querySelector('img') && cells[2].querySelector('a') && cells[3].textContent) {
      // This row likely contains ITC Logo, FSSI Logo, ITC Portal Link, Copyright Text
      // This is the last row of the block, after all item lists.
      const footerBrandDiv = document.createElement('div');
      footerBrandDiv.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
      footerBrandDiv.dataset.isdoodlevariation = 'false';
      aside.append(footerBrandDiv);

      const primarySection = document.createElement('section');
      primarySection.className = 'header-footer-brand__primary';
      footerBrandDiv.append(primarySection);

      const containerDiv = document.createElement('div');
      containerDiv.className = 'header-container';
      primarySection.append(containerDiv);

      const primaryContentDiv = document.createElement('div');
      primaryContentDiv.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';
      containerDiv.append(primaryContentDiv);

      const brandLeftSection = document.createElement('section');
      brandLeftSection.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';
      primaryContentDiv.append(brandLeftSection);

      // ITC Logo
      const itcLink = document.createElement('a');
      itcLink.href = cells[2].querySelector('a').href; // Assuming ITC Portal Link is the source for href
      itcLink.target = '_blank';
      itcLink.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
      itcLink.dataset.ctaRegion = 'Footer';
      itcLink.setAttribute('aria-label', 'ITC Logo');
      moveInstrumentation(cells[2].querySelector('a'), itcLink);
      brandLeftSection.append(itcLink);

      const itcImg = cells[0].querySelector('img');
      if (itcImg) {
        const optimizedItcPic = createOptimizedPicture(itcImg.src, itcImg.alt);
        moveInstrumentation(itcImg, optimizedItcPic.querySelector('img'));
        optimizedItcPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
        optimizedItcPic.querySelector('img').setAttribute('loading', 'lazy');
        itcLink.append(optimizedItcPic);
      }

      // FSSI Logo
      const fssiDiv = document.createElement('div');
      fssiDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
      brandLeftSection.append(fssiDiv);

      const fssiImg = cells[1].querySelector('img');
      if (fssiImg) {
        const optimizedFssiPic = createOptimizedPicture(fssiImg.src, fssiImg.alt);
        moveInstrumentation(fssiImg, optimizedFssiPic.querySelector('img'));
        optimizedFssiPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
        optimizedFssiPic.querySelector('img').setAttribute('loading', 'lazy');
        fssiDiv.append(optimizedFssiPic);
      }

      const brandRightSection = document.createElement('section');
      brandRightSection.className = 'header-footer-brand__right';
      primaryContentDiv.append(brandRightSection);
      brandRightSection.append(footerNav);

      // Secondary Footer Section (Social Media & Copyright)
      const secondarySection = document.createElement('section');
      secondarySection.className = 'header-footer-brand__secondary';
      footerBrandDiv.append(secondarySection);

      const secondaryContainerDiv = document.createElement('div');
      secondaryContainerDiv.className = 'header-container';
      secondarySection.append(secondaryContainerDiv);

      const secondaryContentDiv = document.createElement('div');
      secondaryContentDiv.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';
      secondaryContainerDiv.append(secondaryContentDiv);

      const socialRightSection = document.createElement('section');
      socialRightSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
      secondaryContentDiv.append(socialRightSection);

      const socialTitle = document.createElement('h3');
      socialTitle.className = 'header-social_media--title';
      socialTitle.textContent = 'Follow Us On';
      socialRightSection.append(socialTitle);
      socialRightSection.append(socialMediaUl);

      const copyrightLeftSection = document.createElement('section');
      copyrightLeftSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
      secondaryContentDiv.append(copyrightLeftSection);

      const itcPortalLi = document.createElement('li');
      itcPortalLi.className = 'header-footer-brand__left--item header-foot_link';
      footerLeftListUl.append(itcPortalLi);

      const itcPortalLink = document.createElement('a');
      itcPortalLink.href = cells[2].querySelector('a').href;
      itcPortalLink.target = '_blank';
      itcPortalLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
      itcPortalLink.dataset.ctaRegion = 'Footer';
      itcPortalLink.textContent = 'ITC portal'; // Hardcoded as per HTML
      moveInstrumentation(cells[2].querySelector('a'), itcPortalLink);
      itcPortalLi.append(itcPortalLink);

      copyrightLeftSection.append(footerLeftListUl);

      const copyrightDiv = document.createElement('div');
      copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
      copyrightLeftSection.append(copyrightDiv);

      const copyrightSpan = document.createElement('span');
      copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
      copyrightSpan.textContent = cells[3].textContent.trim();
      copyrightDiv.append(copyrightSpan);
    }
  }

  // Sidebar curve and overlay
  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  block.textContent = '';
  block.append(headerSection);
}
