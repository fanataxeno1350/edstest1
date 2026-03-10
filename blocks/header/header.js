import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.className = 'header-position-relative header-mb-15';
  moveInstrumentation(block, section);

  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', block.children[0].children[0].textContent.trim());
  appNameSpan.textContent = block.children[0].children[0].textContent.trim();
  section.append(appNameSpan);

  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const div1 = document.createElement('div');
  div1.className = 'header-d-flex header-w-25';
  header.append(div1);

  const div2 = document.createElement('div');
  div2.className = 'header-d-flex header-justify-content-center header-w-25';
  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'header-analytics_cta_click';
  logoLink.setAttribute('data-ct', '');
  logoLink.setAttribute('a-label', 'header-logo-boing');
  const logoDiv = document.createElement('div');
  logoDiv.className = 'header__logo header-d-flex header-align-items-center';
  const logoImg = block.children[0].children[1].querySelector('img');
  if (logoImg) {
    const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt);
    moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
    optimizedLogoPic.querySelector('img').className = 'header__logo-img';
    optimizedLogoPic.querySelector('img').setAttribute('fetchpriority', 'high');
    optimizedLogoPic.querySelector('img').setAttribute('loading', 'eager');
    logoDiv.append(optimizedLogoPic);
  }
  logoLink.append(logoDiv);
  div2.append(logoLink);
  header.append(div2);

  const div3 = document.createElement('div');
  div3.className = 'header-d-flex header-w-25 header-justify-content-end';
  const loginLink = document.createElement('a');
  loginLink.href = block.children[0].children[2].querySelector('a').href;
  loginLink.className = 'header__login-btn-wrapper header-analytics_cta_click';
  loginLink.style.display = 'inline';
  const loginButton = document.createElement('button');
  loginButton.className = 'header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
  loginButton.textContent = block.children[0].children[2].querySelector('a').textContent.trim();
  loginLink.append(loginButton);
  div3.append(loginLink);
  header.append(div3);
  section.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const sidebarMenuUl = document.createElement('ul');
  sidebarMenuUl.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  const sidebarMenuItems = [...block.children].slice(1, block.children.length - 3);
  sidebarMenuItems.forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    const link = row.querySelector('a');
    const img = row.querySelector('img');

    if (link && img) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      newLink.setAttribute('data-consent', link.getAttribute('data-consent') || 'false');
      newLink.setAttribute('data-link', link.getAttribute('data-link') || '');

      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
      newLink.append(optimizedPic);
      newLink.append(document.createTextNode(link.textContent.trim()));
      li.append(newLink);
    } else if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-sidebar__menu-link header-sidebar__menu-item--logout-btn header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      newLink.setAttribute('data-consent', link.getAttribute('data-consent') || 'false');
      newLink.setAttribute('data-link', link.getAttribute('data-link') || '');
      newLink.textContent = link.textContent.trim();
      li.append(newLink);
      li.className = 'header-sidebar__menu-item header-sidebar__menu-item--logout header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
      li.style.display = 'none';
    }
    sidebarMenuUl.append(li);
  });
  aside.append(sidebarMenuUl);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerPrimary = document.createElement('section');
  footerPrimary.className = 'header-footer-brand__primary';
  footerPrimary.style.backgroundColor = '';
  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.className = 'header-container';
  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  const footerLogo1Link = document.createElement('a');
  footerLogo1Link.href = block.children[block.children.length - 1].children[0].querySelector('a').href;
  footerLogo1Link.target = '_blank';
  footerLogo1Link.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
  footerLogo1Link.setAttribute('data-cta-region', 'Footer');
  footerLogo1Link.setAttribute('aria-label', 'ITC Logo');
  const footerLogo1Img = block.children[block.children.length - 1].children[0].querySelector('img');
  if (footerLogo1Img) {
    const optimizedFooterLogo1Pic = createOptimizedPicture(footerLogo1Img.src, footerLogo1Img.alt);
    moveInstrumentation(footerLogo1Img, optimizedFooterLogo1Pic.querySelector('img'));
    optimizedFooterLogo1Pic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    optimizedFooterLogo1Pic.querySelector('img').setAttribute('loading', 'lazy');
    footerLogo1Link.append(optimizedFooterLogo1Pic);
  }
  footerBrandLeft.append(footerLogo1Link);

  const footerLogo2Div = document.createElement('div');
  footerLogo2Div.className = 'header-footer-brand__secondary--logo header-d-inline-block';
  const footerLogo2Img = block.children[block.children.length - 1].children[1].querySelector('img');
  if (footerLogo2Img) {
    const optimizedFooterLogo2Pic = createOptimizedPicture(footerLogo2Img.src, footerLogo2Img.alt);
    moveInstrumentation(footerLogo2Img, optimizedFooterLogo2Pic.querySelector('img'));
    optimizedFooterLogo2Pic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
    optimizedFooterLogo2Pic.querySelector('img').setAttribute('loading', 'lazy');
    footerLogo2Div.append(optimizedFooterLogo2Pic);
  }
  footerBrandLeft.append(footerLogo2Div);
  footerPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';
  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');

  const footerNavLeft = document.createElement('div');
  footerNavLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';

  const footerList1Div = document.createElement('div');
  footerList1Div.className = 'header-footerList';
  const footerList1Ul = document.createElement('ul');
  footerList1Ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
  [...block.children[block.children.length - 3].children].forEach((cell) => {
    const li = document.createElement('li');
    moveInstrumentation(cell, li);
    li.className = 'header-footer-list__item';
    const link = cell.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      newLink.setAttribute('data-link-region', 'Footer List');
      newLink.textContent = link.textContent.trim();
      li.append(newLink);
    }
    footerList1Ul.append(li);
  });
  footerList1Div.append(footerList1Ul);
  footerNavLeft.append(footerList1Div);

  const footerList2Div = document.createElement('div');
  footerList2Div.className = 'header-footerList';
  const footerList2Ul = document.createElement('ul');
  footerList2Ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
  [...block.children[block.children.length - 2].children].forEach((cell) => {
    const li = document.createElement('li');
    moveInstrumentation(cell, li);
    li.className = 'header-footer-list__item';
    const link = cell.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      newLink.setAttribute('data-link-region', 'Footer List');
      newLink.textContent = link.textContent.trim();
      li.append(newLink);
    }
    footerList2Ul.append(li);
  });
  footerList2Div.append(footerList2Ul);
  footerNavLeft.append(footerList2Div);
  footerNav.append(footerNavLeft);

  const footerNavRight = document.createElement('div');
  footerNavRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';

  const footerList3Div = document.createElement('div');
  footerList3Div.className = 'header-footerList';
  const footerList3Ul = document.createElement('ul');
  footerList3Ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
  [...block.children[block.children.length - 1].children].forEach((cell) => {
    const li = document.createElement('li');
    moveInstrumentation(cell, li);
    li.className = 'header-footer-list__item';
    const link = cell.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      newLink.setAttribute('data-link-region', 'Footer List');
      newLink.textContent = link.textContent.trim();
      if (link.target) newLink.target = link.target;
      li.append(newLink);
    }
    footerList3Ul.append(li);
  });
  footerList3Div.append(footerList3Ul);
  footerNavRight.append(footerList3Div);

  const footerList4Div = document.createElement('div');
  footerList4Div.className = 'header-footerList';
  const footerList4Ul = document.createElement('ul');
  footerList4Ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
  // Assuming the last three rows are for footer lists and social, and copyright
  // Need to adjust slicing based on actual block structure after sidebar
  // For now, let's assume the last three rows are the footer list columns
  // This part needs careful mapping to the block.children structure
  // For example, if footerListColumn4 is the 4th last row in the block
  // This part is highly dependent on how the block.children are structured
  // For the provided HTML, there are 3 footer list columns in the block
  // Let's re-evaluate the block.children mapping for footer lists.
  // Based on the JSON, there are 4 footer list columns. The HTML only shows 3 columns.
  // We need to decide how to handle this discrepancy. For now, I'll use the HTML structure.
  // Assuming the last row of the block is for social and copyright, and the 3 rows before that are footer lists.
  // This means rows 1, 2, 3 from the end are footer lists.

  // Re-evaluating based on the provided JSON: `footerListColumn1`, `footerListColumn2`, `footerListColumn3`, `footerListColumn4`
  // And the HTML has 3 columns in the primary footer section.
  // Let's assume the block.children for footer lists are structured sequentially after sidebar menu items.
  // This is a common pattern for block content.
  // If sidebarMenuItems are from block.children[1] to block.children[block.children.length - 4]
  // Then footerListColumn1 would be block.children[block.children.length - 3]
  // footerListColumn2 would be block.children[block.children.length - 2]
  // footerListColumn3 would be block.children[block.children.length - 1]
  // This mapping is crucial and needs to be correct based on the actual block structure in AEM.

  // Given the HTML structure, the footer lists are nested. The block JSON indicates 4 columns.
  // Let's assume the first table row after the header row (index 0) is appName, logo, login.
  // Then the next several rows are sidebar menu items.
  // Then the next rows are footer lists, then social, then copyright.

  // To make this work, we need to know the exact index of each footer list in block.children.
  // From the HTML, the three footer lists are in three separate `div.footerList` elements.
  // In the block JSON, they are `footerListColumn1`, `footerListColumn2`, `footerListColumn3`, `footerListColumn4`.
  // This implies 4 rows in the block for these lists.
  // Let's assume the block structure is:
  // 0: Header (appName, logo, login)
  // 1-N: Sidebar Menu Items
  // N+1: Footer Logo 1, Footer Logo 2
  // N+2: Footer List Column 1
  // N+3: Footer List Column 2
  // N+4: Footer List Column 3
  // N+5: Footer List Column 4 (if present in block, but not in HTML example)
  // N+6: Footer Social List
  // N+7: Footer Copyright, Footer ITC Portal URL

  // Let's use the provided HTML structure as the guide for the number of footer lists.
  // The HTML has 3 footer list columns under `footer-brand__navbar--left` and `footer-brand__navbar--right`.
  // This implies 3 rows in the block for footer list items.
  // Let's assume these are the rows immediately after the sidebar menu items, before social/copyright.

  // Let's re-index based on the actual HTML structure provided, assuming the block content directly maps to the visible elements.
  // Block children structure:
  // [0] -> App Name, Logo, Login Button
  // [1] -> Sidebar Menu Item 1
  // [2] -> Sidebar Menu Item 2
  // ...
  // [N] -> Sidebar Menu Item N (Logout)
  // [N+1] -> Footer Logo 1, Footer Logo 2
  // [N+2] -> Footer List Column 1 (About us, Terms, Privacy)
  // [N+3] -> Footer List Column 2 (BoingWale Blogs, Tedhe Medhe Highlights, Numbers Ka Khel)
  // [N+4] -> Footer List Column 3 (Contact us, Sa-Meme-Char, Numbers Ka Khel)
  // [N+5] -> Footer List Column 4 (Pyaar O Scope, Bhavishya On The Go, Boing Weekly)
  // [N+6] -> Social Media (Facebook, Instagram, Youtube)
  // [N+7] -> ITC Portal, Copyright

  // Let's find the starting index for footer lists.
  // The sidebar menu items end at `block.children.length - 7` (if we count 4 footer lists, 1 social, 1 copyright, 1 logo row)
  // So, sidebarMenuItems = [...block.children].slice(1, block.children.length - 6);
  // Footer Logo 1, 2 = block.children[block.children.length - 6]
  // Footer List 1 = block.children[block.children.length - 5]
  // Footer List 2 = block.children[block.children.length - 4]
  // Footer List 3 = block.children[block.children.length - 3]
  // Footer List 4 = block.children[block.children.length - 2] (This is the 4th column in JSON, but HTML only shows 3 in primary section)
  // Social List = block.children[block.children.length - 1]
  // Copyright/ITC Portal URL = block.children[block.children.length]

  // This is tricky without a definitive block content structure. Let's assume the JSON model fields directly map to block.children order after the initial header row.
  // 0: appName, logoImage, loginUrl
  // 1 to (1 + sidebarMenu.items.length - 1): sidebarMenu.items
  // (1 + sidebarMenu.items.length): footerLogo1, footerLogo2
  // (1 + sidebarMenu.items.length + 1): footerListColumn1
  // (1 + sidebarMenu.items.length + 2): footerListColumn2
  // (1 + sidebarMenu.items.length + 3): footerListColumn3
  // (1 + sidebarMenu.items.length + 4): footerListColumn4
  // (1 + sidebarMenu.items.length + 5): footerSocialList
  // (1 + sidebarMenu.items.length + 6): footerCopyright, footerITCPortalUrl

  const sidebarMenuEndIndex = 1 + sidebarMenuItems.length; // The index after the last sidebar item
  const footerLogoRow = block.children[sidebarMenuEndIndex];

  // Re-extract footer logos based on the new index
  const newFooterLogo1Link = document.createElement('a');
  newFooterLogo1Link.href = footerLogoRow.children[0].querySelector('a').href;
  newFooterLogo1Link.target = '_blank';
  newFooterLogo1Link.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
  newFooterLogo1Link.setAttribute('data-cta-region', 'Footer');
  newFooterLogo1Link.setAttribute('aria-label', 'ITC Logo');
  const newFooterLogo1Img = footerLogoRow.children[0].querySelector('img');
  if (newFooterLogo1Img) {
    const optimizedNewFooterLogo1Pic = createOptimizedPicture(newFooterLogo1Img.src, newFooterLogo1Img.alt);
    moveInstrumentation(newFooterLogo1Img, optimizedNewFooterLogo1Pic.querySelector('img'));
    optimizedNewFooterLogo1Pic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    optimizedNewFooterLogo1Pic.querySelector('img').setAttribute('loading', 'lazy');
    newFooterLogo1Link.append(optimizedNewFooterLogo1Pic);
  }
  footerBrandLeft.append(newFooterLogo1Link);

  const newFooterLogo2Div = document.createElement('div');
  newFooterLogo2Div.className = 'header-footer-brand__secondary--logo header-d-inline-block';
  const newFooterLogo2Img = footerLogoRow.children[1].querySelector('img');
  if (newFooterLogo2Img) {
    const optimizedNewFooterLogo2Pic = createOptimizedPicture(newFooterLogo2Img.src, newFooterLogo2Img.alt);
    moveInstrumentation(newFooterLogo2Img, optimizedNewFooterLogo2Pic.querySelector('img'));
    optimizedNewFooterLogo2Pic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
    optimizedNewFooterLogo2Pic.querySelector('img').setAttribute('loading', 'lazy');
    newFooterLogo2Div.append(optimizedNewFooterLogo2Pic);
  }
  footerBrandLeft.append(newFooterLogo2Div);

  // Footer Lists based on JSON model (4 columns)
  const footerListColumn1Row = block.children[sidebarMenuEndIndex + 1];
  const footerListColumn2Row = block.children[sidebarMenuEndIndex + 2];
  const footerListColumn3Row = block.children[sidebarMenuEndIndex + 3];
  const footerListColumn4Row = block.children[sidebarMenuEndIndex + 4];

  const createFooterList = (row) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    const footerListUl = document.createElement('ul');
    footerListUl.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
    [...row.children].forEach((cell) => {
      const li = document.createElement('li');
      moveInstrumentation(cell, li);
      li.className = 'header-footer-list__item';
      const link = cell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        newLink.setAttribute('data-link-region', 'Footer List');
        newLink.textContent = link.textContent.trim();
        if (link.target) newLink.target = link.target;
        li.append(newLink);
      }
      footerListUl.append(li);
    });
    footerListDiv.append(footerListUl);
    return footerListDiv;
  };

  footerNavLeft.append(createFooterList(footerListColumn1Row));
  footerNavLeft.append(createFooterList(footerListColumn2Row));
  footerNav.append(footerNavLeft);

  footerNavRight.append(createFooterList(footerListColumn3Row));
  footerNavRight.append(createFooterList(footerListColumn4Row));
  footerNav.append(footerNavRight);

  footerBrandRight.append(footerNav);
  footerPrimaryContent.append(footerBrandRight);
  footerPrimaryContainer.append(footerPrimaryContent);
  footerPrimary.append(footerPrimaryContainer);
  footerBrand.append(footerPrimary);

  const footerSecondary = document.createElement('section');
  footerSecondary.className = 'header-footer-brand__secondary';
  footerSecondary.style.backgroundColor = '';
  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialListUl = document.createElement('ul');
  socialListUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  const socialListRow = block.children[sidebarMenuEndIndex + 5]; // Assuming this is the social list row
  [...socialListRow.children].forEach((cell) => {
    const li = document.createElement('li');
    moveInstrumentation(cell, li);
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
    const link = cell.querySelector('a');
    const img = cell.querySelector('img');

    if (link && img) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));
      newLink.target = '_blank';
      newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name'));
      newLink.setAttribute('data-social-linktype', 'follow');

      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
      optimizedPic.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label'));
      newLink.append(optimizedPic);
      li.append(newLink);
    }
    socialListUl.append(li);
  });
  socialMediaSection.append(socialListUl);
  footerSecondaryContent.append(socialMediaSection);

  const footerCopyrightSection = document.createElement('section');
  footerCopyrightSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const footerCopyrightListUl = document.createElement('ul');
  footerCopyrightListUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  const copyrightRow = block.children[sidebarMenuEndIndex + 6]; // Assuming this is the copyright row
  const itcPortalLink = copyrightRow.children[0].querySelector('a');
  if (itcPortalLink) {
    const li = document.createElement('li');
    moveInstrumentation(itcPortalLink.parentElement, li);
    li.className = 'header-footer-brand__left--item header-foot_link';
    const newLink = document.createElement('a');
    newLink.href = itcPortalLink.href;
    newLink.target = '_blank';
    newLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
    newLink.setAttribute('data-cta-region', 'Footer');
    newLink.textContent = itcPortalLink.textContent.trim();
    li.append(newLink);
    footerCopyrightListUl.append(li);
  }
  footerCopyrightSection.append(footerCopyrightListUl);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = copyrightRow.children[1].textContent.trim();
  copyrightDiv.append(copyrightSpan);
  footerCopyrightSection.append(copyrightDiv);

  footerSecondaryContent.append(footerCopyrightSection);
  footerSecondaryContainer.append(footerSecondaryContent);
  footerSecondary.append(footerSecondaryContainer);
  footerBrand.append(footerSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlayDiv = document.createElement('div');
  overlayDiv.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlayDiv);

  section.append(submenuContainer);

  block.textContent = '';
  block.append(section);
}
