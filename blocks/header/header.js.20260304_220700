import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerWrapper = document.createElement('div');
  headerWrapper.className = 'header-cmp-header-wrapper header-layout-container header-transparent-header';

  const navigationDiv = document.createElement('div');
  navigationDiv.className = 'header-navigation header-navigation header-nav-css-from-wrapper';
  headerWrapper.append(navigationDiv);

  const cmpNavigationWrapper = document.createElement('div');
  cmpNavigationWrapper.className = 'header-cmp-navigation-wrapper';
  cmpNavigationWrapper.setAttribute('role', 'banner');
  cmpNavigationWrapper.setAttribute('aria-label', 'navigation.header.aria.label');
  navigationDiv.append(cmpNavigationWrapper);

  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-cmp-navigation-wrapper__logo';
  cmpNavigationWrapper.append(logoDiv);

  // Extract logo link from the first row's first cell
  const logoLinkCell = block.children[0]?.children[0];
  if (logoLinkCell) {
    const logoAnchor = logoLinkCell.querySelector('a');
    if (logoAnchor) {
      const newLogoAnchor = document.createElement('a');
      newLogoAnchor.href = logoAnchor.href;
      newLogoAnchor.target = '_self';
      newLogoAnchor.setAttribute('aria-label', 'Qiddiya - Go to homepage');
      newLogoAnchor.innerHTML = `
        <span class="header-qd-icon header-qd-icon--logo header-qd-logo">
          <span class="header-path1"></span><span class="header-path2"></span><span class="header-path3"></span><span class="header-path4"></span><span class="header-path5"></span><span class="header-path6"></span><span class="header-path7"></span><span class="header-path8"></span><span class="header-path9"></span><span class="header-path10"></span><span class="header-path11"></span><span class="header-path12"></span><span class="header-path13"></span><span class="header-path14"></span><span class="header-path15"></span><span class="header-path16"></span><span class="header-path17"></span><span class="header-path18"></span><span class="header-path19"></span><span class="header-path20"></span><span class="header-path21"></span><span class="header-path22"></span><span class="header-path23"></span><span class="header-path24"></span><span class="header-path25"></span>
        </span>
      `;
      logoDiv.append(newLogoAnchor);
      moveInstrumentation(logoAnchor, newLogoAnchor);
    }
  }

  const contactUsCtaDiv = document.createElement('div');
  contactUsCtaDiv.className = 'header-cmp-navigation-wrapper__contactUs-cta';
  logoDiv.append(contactUsCtaDiv);

  // Extract Contact Us CTA from the first row's second and third cells
  const contactUsLabelCell = block.children[0]?.children[1];
  const contactUsLinkCell = block.children[0]?.children[2];
  const contactUsAriaLabelCell = block.children[0]?.children[3];

  if (contactUsLabelCell && contactUsLinkCell) {
    const contactUsAnchor = contactUsLinkCell.querySelector('a');
    if (contactUsAnchor) {
      const newContactUsAnchor = document.createElement('a');
      newContactUsAnchor.href = contactUsAnchor.href;
      newContactUsAnchor.className = 'header-cta header-cta__ header-cmp-navigation--content__cta';
      newContactUsAnchor.target = '_self';
      newContactUsAnchor.setAttribute('aria-label', contactUsAriaLabelCell?.textContent || 'Contact Us');
      newContactUsAnchor.innerHTML = `
        <span class="header-cta__icon header-qd-icon header-qd-icon--cheveron-right" aria-hidden="true"></span>
        <span class="header-cta__label">${contactUsLabelCell.textContent}</span>
      `;
      contactUsCtaDiv.append(newContactUsAnchor);
      moveInstrumentation(contactUsAnchor, newContactUsAnchor);
      moveInstrumentation(contactUsLabelCell, newContactUsAnchor.querySelector('.header-cta__label'));
    }
  }

  const iconDiv = document.createElement('div');
  iconDiv.className = 'header-cmp-navigation-wrapper__icon';
  iconDiv.id = 'navigation-toggle';
  iconDiv.innerHTML = `
    <div class="header-hamburger-ellipse" tabindex="0">
      <span class="header-hamburger-icon header-qd-icon header-qd-icon--hamburger"></span>
      <span class="header-close-icon header-qd-icon header-qd-icon--cancel"></span>
    </div>
  `;
  contactUsCtaDiv.append(iconDiv);

  const desktopNavbar = document.createElement('nav');
  desktopNavbar.className = 'header-cmp-navigation-wrapper__navbar';
  desktopNavbar.id = 'navbar-desktop';
  desktopNavbar.setAttribute('role', 'navigation');
  desktopNavbar.setAttribute('aria-label', 'navigation.main.aria.label');
  cmpNavigationWrapper.append(desktopNavbar);

  const desktopNavbarList = document.createElement('ul');
  desktopNavbarList.className = 'header-cmp-navigation-wrapper__navbar-list';
  desktopNavbar.append(desktopNavbarList);

  const mobileNavbar = document.createElement('nav');
  mobileNavbar.className = 'header-cmp-navigation-wrapper__mobilenavbar';
  mobileNavbar.id = 'navbar-mobile';
  mobileNavbar.setAttribute('role', 'navigation');
  mobileNavbar.setAttribute('aria-label', 'navigation.main.aria.label');
  cmpNavigationWrapper.append(mobileNavbar);

  const mobileNavbarList = document.createElement('ul');
  mobileNavbarList.className = 'header-cmp-navigation-wrapper__mobilenavbar-list';
  mobileNavbar.append(mobileNavbarList);

  // Iterate through navigation items (starting from the second row)
  // The block structure is assumed to have navigation items starting from the second row.
  // Each navigation item is a row, and its children are the label and link.
  // Sub-navigation items are subsequent rows with the same parent label.
  let currentParentDesktopMenu = null;
  let currentParentMobileMenu = null;

  for (let i = 1; i < block.children.length; i += 1) {
    const row = block.children[i];
    const cells = [...row.children];

    // Check if this row is a Language item
    const isLanguageItem = cells.length === 3 && cells[2].textContent.trim() !== ''; // Assuming langCode is in the third cell

    if (isLanguageItem) {
      // Process Language items
      let desktopLangSelector = desktopNavbar.querySelector('.header-language-selector');
      if (!desktopLangSelector) {
        desktopLangSelector = document.createElement('div');
        desktopLangSelector.className = 'header-language-selector header-lang-css-from-wrapper';
        desktopLangSelector.style.visibility = 'visible';
        desktopNavbar.append(desktopLangSelector);

        const desktopLangList = document.createElement('ul');
        desktopLangList.className = 'header-cmp-language-selector';
        desktopLangSelector.append(desktopLangList);
      }
      const desktopLangList = desktopLangSelector.querySelector('ul');

      let mobileLangSelector = mobileNavbar.querySelector('.header-language-selector');
      if (!mobileLangSelector) {
        mobileLangSelector = document.createElement('div');
        mobileLangSelector.className = 'header-language-selector header-lang-css-from-wrapper';
        mobileLangSelector.style.visibility = 'visible';
        mobileNavbar.append(mobileLangSelector);

        const mobileLangList = document.createElement('ul');
        mobileLangList.className = 'header-cmp-language-selector';
        mobileLangSelector.append(mobileLangList);
      }
      const mobileLangList = mobileLangSelector.querySelector('ul');

      const langLabel = cells[0].textContent.trim();
      const langLink = cells[1].querySelector('a')?.href || '#';
      const langCode = cells[2].textContent.trim();

      const desktopLangLi = document.createElement('li');
      if (langLink === '/') { // Assuming '/' is the active language
        desktopLangLi.classList.add('header-active');
      }
      const desktopLangAnchor = document.createElement('a');
      desktopLangAnchor.href = langLink;
      desktopLangAnchor.setAttribute('aria-label', langLabel);
      desktopLangAnchor.className = 'header-cmp-language-selector__link';
      desktopLangAnchor.setAttribute('data-lang', langCode);
      desktopLangAnchor.textContent = langLabel;
      desktopLangLi.append(desktopLangAnchor);
      desktopLangList.append(desktopLangLi);
      moveInstrumentation(row, desktopLangLi);

      const mobileLangLi = document.createElement('li');
      if (langLink === '/') { // Assuming '/' is the active language
        mobileLangLi.classList.add('header-active');
      }
      const mobileLangAnchor = document.createElement('a');
      mobileLangAnchor.href = langLink;
      mobileLangAnchor.setAttribute('aria-label', langLabel);
      mobileLangAnchor.className = 'header-cmp-language-selector__link';
      mobileLangAnchor.setAttribute('data-lang', langCode);
      mobileLangAnchor.textContent = langLabel;
      mobileLangLi.append(mobileLangAnchor);
      mobileLangList.append(mobileLangLi);

      // Reset current parent menu as language items are usually at the end
      currentParentDesktopMenu = null;
      currentParentMobileMenu = null;
      continue;
    }

    // Process Navigation Items
    const label = cells[0].textContent.trim();
    const linkElement = cells[1].querySelector('a');
    const link = linkElement?.href || '#';

    // Determine if it's a top-level menu or a submenu item
    if (cells[0].textContent.trim() !== '' && cells[1].textContent.trim() !== '') { // New top-level item
      // Desktop Navbar
      const desktopLi = document.createElement('li');
      desktopLi.className = 'header-cmp-navigation-wrapper__navbar-menu';
      moveInstrumentation(row, desktopLi);

      const desktopAnchor = document.createElement('a');
      desktopAnchor.setAttribute('aria-haspopup', 'true');
      desktopAnchor.setAttribute('aria-expanded', 'false');
      desktopAnchor.className = 'header-cmp-navigation-wrapper__navbar-menulink';
      desktopAnchor.target = '_self';
      desktopAnchor.href = link;
      desktopAnchor.innerHTML = `
        <span>${label}</span>
        <span class="header-qd-icon-wrapper">
          <span class="header-menu-icon header-qd-icon header-qd-icon--cheveron-down"></span>
        </span>
      `;
      desktopLi.append(desktopAnchor);
      desktopNavbarList.append(desktopLi);
      currentParentDesktopMenu = desktopLi;

      // Mobile Navbar
      const mobileLi = document.createElement('li');
      mobileLi.className = 'header-cmp-navigation-wrapper__mobilenavbar-menu header-border';
      moveInstrumentation(row, mobileLi);

      const mobileAnchor = document.createElement('a');
      mobileAnchor.className = 'header-cmp-navigation-wrapper__mobilenavbar-menulink';
      mobileAnchor.innerHTML = `
        <span>${label}</span>
        <span class="header-qd-icon header-qd-icon--cheveron-right header-cmp-navigation-wrapper__mobilenavbar-menulink-icon"></span>
      `;
      mobileLi.append(mobileAnchor);
      mobileNavbarList.append(mobileLi);
      currentParentMobileMenu = mobileLi;

    } else if (currentParentDesktopMenu && currentParentMobileMenu) { // Submenu item
      // Desktop Submenu
      let desktopSubmenu = currentParentDesktopMenu.querySelector('.header-cmp-navigation-wrapper__navbar-submenu');
      if (!desktopSubmenu) {
        desktopSubmenu = document.createElement('ul');
        desktopSubmenu.className = 'header-cmp-navigation-wrapper__navbar-submenu';
        currentParentDesktopMenu.append(desktopSubmenu);
      }
      const desktopSubLi = document.createElement('li');
      const desktopSubAnchor = document.createElement('a');
      desktopSubAnchor.setAttribute('aria-expanded', 'false');
      desktopSubAnchor.target = '_self';
      desktopSubAnchor.href = link;
      desktopSubAnchor.innerHTML = `<span>${label}</span>`;
      desktopSubLi.append(desktopSubAnchor);
      desktopSubmenu.append(desktopSubLi);
      moveInstrumentation(row, desktopSubLi);

      // Mobile Submenu
      let mobileSubmenu = currentParentMobileMenu.querySelector('.header-cmp-navigation-wrapper__mobilenavbar-submenu');
      if (!mobileSubmenu) {
        mobileSubmenu = document.createElement('ul');
        mobileSubmenu.className = 'header-cmp-navigation-wrapper__mobilenavbar-submenu';
        currentParentMobileMenu.append(mobileSubmenu);

        const mobileSubmenuHeader = document.createElement('li');
        mobileSubmenuHeader.className = 'header-cmp-navigation-wrapper__mobilenavbar-menuheader';
        mobileSubmenuHeader.innerHTML = `<a><span>${currentParentMobileMenu.querySelector('span').textContent}</span></a>`;
        mobileSubmenu.append(mobileSubmenuHeader);
      }
      const mobileSubLi = document.createElement('li');
      mobileSubLi.className = 'header-cmp-navigation-wrapper__mobilenavbar-menu';
      const mobileSubAnchor = document.createElement('a');
      mobileSubAnchor.className = 'header-cmp-navigation-wrapper__mobilenavbar-menulink';
      mobileSubAnchor.target = '_self';
      mobileSubAnchor.href = link;
      mobileSubAnchor.innerHTML = `<span>${label}</span>`;
      mobileSubLi.append(mobileSubAnchor);
      mobileSubmenu.append(mobileSubLi);
      moveInstrumentation(row, mobileSubLi);
    }
  }

  // Add Contact Us CTA again for desktop (if it exists)
  if (contactUsLabelCell && contactUsLinkCell) {
    const contactUsAnchor = contactUsLinkCell.querySelector('a');
    if (contactUsAnchor) {
      const newContactUsAnchor = document.createElement('a');
      newContactUsAnchor.href = contactUsAnchor.href;
      newContactUsAnchor.className = 'header-cta header-cta__ header-cmp-navigation--content__cta';
      newContactUsAnchor.target = '_self';
      newContactUsAnchor.setAttribute('aria-label', contactUsAriaLabelCell?.textContent || '${navigation.contactUsAriaLabel}');
      newContactUsAnchor.innerHTML = `
        <span class="header-cta__icon header-qd-icon header-qd-icon--cheveron-right" aria-hidden="true"></span>
        <span class="header-cta__label">${contactUsLabelCell.textContent}</span>
      `;
      desktopNavbar.append(newContactUsAnchor);
      // Instrumentation already moved for the first instance, no need to move again
    }
  }

  // Add mobile navbar back button
  const mobileNavBackDiv = document.createElement('div');
  mobileNavBackDiv.className = 'header-cmp-navigation-wrapper__mobilenavbar-back header-nav-back';
  mobileNavBackDiv.innerHTML = `
    <a class="header-cmp-navigation-wrapper__icon">
      <span class="header-back-icon header-qd-icon header-qd-icon--cheveron-left"></span>
    </a>
    <span class="header-cmp-navigation-wrapper__iconlabel">Back</span>
  `;
  mobileNavbar.append(mobileNavBackDiv);

  block.textContent = '';
  block.append(headerWrapper);
}
