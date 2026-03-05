import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerWrapper = document.createElement('div');
  headerWrapper.classList.add('header-cmp-header-wrapper', 'header-layout-container', 'header-transparent-header');

  const headerNavigation = document.createElement('div');
  headerNavigation.classList.add('header-navigation', 'header-nav-css-from-wrapper');

  const cmpNavigationWrapper = document.createElement('div');
  cmpNavigationWrapper.classList.add('header-cmp-navigation-wrapper');
  cmpNavigationWrapper.setAttribute('role', 'banner');
  cmpNavigationWrapper.setAttribute('aria-label', 'navigation.header.aria.label');

  // Extract Logo Link
  const logoWrapper = document.createElement('div');
  logoWrapper.classList.add('header-cmp-navigation-wrapper__logo');
  const logoLink = block.children[0]?.children[0]?.querySelector('a');
  if (logoLink) {
    const newLogoLink = document.createElement('a');
    newLogoLink.href = logoLink.href;
    newLogoLink.target = logoLink.target;
    newLogoLink.setAttribute('aria-label', logoLink.getAttribute('aria-label'));
    newLogoLink.innerHTML = logoLink.innerHTML;
    moveInstrumentation(logoLink, newLogoLink);
    logoWrapper.append(newLogoLink);
  }

  const contactUsCtaWrapper = document.createElement('div');
  contactUsCtaWrapper.classList.add('header-cmp-navigation-wrapper__contactUs-cta');

  // Extract Contact Us CTA (first one in the JSON structure, under contactLinks)
  const contactLinkCell = block.children[0]?.children[2];
  const contactLink = contactLinkCell?.querySelector('a');
  if (contactLink) {
    const newContactLink = document.createElement('a');
    newContactLink.href = contactLink.href;
    newContactLink.classList.add('header-cta', 'header-cta__', 'header-cmp-navigation--content__cta');
    newContactLink.target = contactLink.target;
    newContactLink.setAttribute('aria-label', contactLink.getAttribute('aria-label'));
    newContactLink.innerHTML = contactLink.innerHTML;
    moveInstrumentation(contactLink, newContactLink);
    contactUsCtaWrapper.append(newContactLink);
  }

  const iconWrapper = document.createElement('div');
  iconWrapper.classList.add('header-cmp-navigation-wrapper__icon');
  iconWrapper.id = 'navigation-toggle';
  iconWrapper.innerHTML = `
    <div class="header-hamburger-ellipse" tabindex="0">
      <span class="header-hamburger-icon header-qd-icon header-qd-icon--hamburger"></span>
      <span class="header-close-icon header-qd-icon header-qd-icon--cancel"></span>
    </div>
  `;
  contactUsCtaWrapper.append(iconWrapper);

  logoWrapper.append(contactUsCtaWrapper);
  cmpNavigationWrapper.append(logoWrapper);

  // Desktop Navigation
  const desktopNavbar = document.createElement('nav');
  desktopNavbar.classList.add('header-cmp-navigation-wrapper__navbar');
  desktopNavbar.id = 'navbar-desktop';
  desktopNavbar.setAttribute('role', 'navigation');
  desktopNavbar.setAttribute('aria-label', 'navigation.main.aria.label');

  const desktopNavbarList = document.createElement('ul');
  desktopNavbarList.classList.add('header-cmp-navigation-wrapper__navbar-list');

  // Menu Items
  const menuItemsContainer = block.children[0]?.children[1]; // Second cell for menuItems
  if (menuItemsContainer) {
    [...menuItemsContainer.children].forEach((menuItemRow) => {
      const menuItemLi = document.createElement('li');
      menuItemLi.classList.add('header-cmp-navigation-wrapper__navbar-menu');
      moveInstrumentation(menuItemRow, menuItemLi);

      const menuLink = menuItemRow.children[0]?.querySelector('a');
      if (menuLink) {
        const newMenuLink = document.createElement('a');
        newMenuLink.href = menuLink.href;
        newMenuLink.target = menuLink.target;
        newMenuLink.classList.add('header-cmp-navigation-wrapper__navbar-menulink');
        newMenuLink.setAttribute('aria-haspopup', 'true');
        newMenuLink.setAttribute('aria-expanded', 'false');
        newMenuLink.innerHTML = `
          <span>${menuLink.textContent}</span>
          <span class="header-qd-icon-wrapper">
            <span class="header-menu-icon header-qd-icon header-qd-icon--cheveron-down"></span>
          </span>
        `;
        moveInstrumentation(menuLink, newMenuLink);
        menuItemLi.append(newMenuLink);

        const submenuItemsContainer = menuItemRow.children[1]; // Second cell for submenuItems
        if (submenuItemsContainer) {
          const submenuUl = document.createElement('ul');
          submenuUl.classList.add('header-cmp-navigation-wrapper__navbar-submenu');
          [...submenuItemsContainer.children].forEach((submenuItemRow) => {
            const submenuLi = document.createElement('li');
            moveInstrumentation(submenuItemRow, submenuLi);
            const submenuLink = submenuItemRow.querySelector('a');
            if (submenuLink) {
              const newSubmenuLink = document.createElement('a');
              newSubmenuLink.href = submenuLink.href;
              newSubmenuLink.target = submenuLink.target;
              newSubmenuLink.setAttribute('aria-expanded', 'false');
              newSubmenuLink.innerHTML = `<span>${submenuLink.textContent}</span>`;
              moveInstrumentation(submenuLink, newSubmenuLink);
              submenuLi.append(newSubmenuLink);
            }
            submenuUl.append(submenuLi);
          });
          menuItemLi.append(submenuUl);
        }
      }
      desktopNavbarList.append(menuItemLi);
    });
  }
  desktopNavbar.append(desktopNavbarList);

  // Contact Us CTA (second one in the HTML)
  const desktopContactLink = block.children[0]?.children[2]?.querySelector('a'); // Assuming it's the same link as the first one
  if (desktopContactLink) {
    const newDesktopContactLink = document.createElement('a');
    newDesktopContactLink.href = desktopContactLink.href;
    newDesktopContactLink.classList.add('header-cta', 'header-cta__', 'header-cmp-navigation--content__cta');
    newDesktopContactLink.target = desktopContactLink.target;
    newDesktopContactLink.setAttribute('aria-label', '${navigation.contactUsAriaLabel}'); // Use the placeholder from HTML
    newDesktopContactLink.innerHTML = `
      <span class="header-cta__icon header-qd-icon header-qd-icon--cheveron-right" aria-hidden="true"></span>
      <span class="header-cta__label">Contact Us</span>
    `;
    moveInstrumentation(desktopContactLink, newDesktopContactLink);
    desktopNavbar.append(newDesktopContactLink);
  }

  // Language Selector
  const languageSelectorDiv = document.createElement('div');
  languageSelectorDiv.classList.add('header-language-selector', 'header-lang-css-from-wrapper');
  languageSelectorDiv.style.visibility = 'visible';

  const languageUl = document.createElement('ul');
  languageUl.classList.add('header-cmp-language-selector');

  const languageOptionsContainer = block.children[0]?.children[3]; // Fourth cell for languageOptions
  if (languageOptionsContainer) {
    [...languageOptionsContainer.children].forEach((langOptionRow) => {
      const langLi = document.createElement('li');
      moveInstrumentation(langOptionRow, langLi);
      const langLink = langOptionRow.querySelector('a');
      if (langLink) {
        const newLangLink = document.createElement('a');
        newLangLink.href = langLink.href;
        newLangLink.setAttribute('aria-label', langLink.getAttribute('aria-label'));
        newLangLink.classList.add('header-cmp-language-selector__link');
        newLangLink.setAttribute('data-lang', langLink.getAttribute('data-lang'));
        newLangLink.textContent = langLink.textContent;
        moveInstrumentation(langLink, newLangLink);
        langLi.append(newLangLink);
      }
      // Check if the current language option is active based on the HTML structure
      if (langOptionRow.textContent.trim() === 'English' && langOptionRow.closest('li')?.classList.contains('header-active')) {
        langLi.classList.add('header-active');
      }
      languageUl.append(langLi);
    });
  }
  languageSelectorDiv.append(languageUl);
  desktopNavbar.append(languageSelectorDiv);

  cmpNavigationWrapper.append(desktopNavbar);

  // Mobile Navigation (similar structure to desktop, but with different classes and interaction)
  const mobileNavbar = document.createElement('nav');
  mobileNavbar.classList.add('header-cmp-navigation-wrapper__mobilenavbar');
  mobileNavbar.id = 'navbar-mobile';
  mobileNavbar.setAttribute('role', 'navigation');
  mobileNavbar.setAttribute('aria-label', 'navigation.main.aria.label');

  const mobileNavbarList = document.createElement('ul');
  mobileNavbarList.classList.add('header-cmp-navigation-wrapper__mobilenavbar-list');

  if (menuItemsContainer) {
    [...menuItemsContainer.children].forEach((menuItemRow) => {
      const mobileMenuItemLi = document.createElement('li');
      mobileMenuItemLi.classList.add('header-cmp-navigation-wrapper__mobilenavbar-menu', 'header-border');
      moveInstrumentation(menuItemRow, mobileMenuItemLi);

      const menuLink = menuItemRow.children[0]?.querySelector('a');
      if (menuLink) {
        const mobileMenuLink = document.createElement('a');
        mobileMenuLink.classList.add('header-cmp-navigation-wrapper__mobilenavbar-menulink');
        mobileMenuLink.innerHTML = `
          <span>${menuLink.textContent}</span>
          <span class="header-qd-icon header-qd-icon--cheveron-right header-cmp-navigation-wrapper__mobilenavbar-menulink-icon"></span>
        `;
        // No href on the main mobile menu link, it triggers submenu
        moveInstrumentation(menuLink, mobileMenuLink);
        mobileMenuItemLi.append(mobileMenuLink);

        const submenuItemsContainer = menuItemRow.children[1];
        if (submenuItemsContainer) {
          const mobileSubmenuUl = document.createElement('ul');
          mobileSubmenuUl.classList.add('header-cmp-navigation-wrapper__mobilenavbar-submenu');

          const mobileSubmenuHeaderLi = document.createElement('li');
          mobileSubmenuHeaderLi.classList.add('header-cmp-navigation-wrapper__mobilenavbar-menuheader');
          mobileSubmenuHeaderLi.innerHTML = `<a><span>${menuLink.textContent}</span></a>`;
          mobileSubmenuUl.append(mobileSubmenuHeaderLi);

          [...submenuItemsContainer.children].forEach((submenuItemRow) => {
            const mobileSubmenuLi = document.createElement('li');
            mobileSubmenuLi.classList.add('header-cmp-navigation-wrapper__mobilenavbar-menu');
            moveInstrumentation(submenuItemRow, mobileSubmenuLi);
            const submenuLink = submenuItemRow.querySelector('a');
            if (submenuLink) {
              const newMobileSubmenuLink = document.createElement('a');
              newMobileSubmenuLink.href = submenuLink.href;
              newMobileSubmenuLink.target = submenuLink.target;
              newMobileSubmenuLink.classList.add('header-cmp-navigation-wrapper__mobilenavbar-menulink');
              newMobileSubmenuLink.innerHTML = `<span>${submenuLink.textContent}</span>`;
              moveInstrumentation(submenuLink, newMobileSubmenuLink);
              mobileSubmenuLi.append(newMobileSubmenuLink);
            }
            mobileSubmenuUl.append(mobileSubmenuLi);
          });
          mobileMenuItemLi.append(mobileSubmenuUl);
        }
      }
      mobileNavbarList.append(mobileMenuItemLi);
    });
  }
  mobileNavbar.append(mobileNavbarList);

  const mobileNavBack = document.createElement('div');
  mobileNavBack.classList.add('header-cmp-navigation-wrapper__mobilenavbar-back', 'header-nav-back');
  mobileNavBack.innerHTML = `
    <a class="header-cmp-navigation-wrapper__icon">
      <span class="header-back-icon header-qd-icon header-qd-icon--cheveron-left"></span>
    </a>
    <span class="header-cmp-navigation-wrapper__iconlabel">Back</span>
  `;
  mobileNavbar.append(mobileNavBack);

  // Mobile Language Selector (same as desktop)
  const mobileLanguageSelectorDiv = languageSelectorDiv.cloneNode(true);
  mobileNavbar.append(mobileLanguageSelectorDiv);

  cmpNavigationWrapper.append(mobileNavbar);

  headerNavigation.append(cmpNavigationWrapper);
  headerWrapper.append(headerNavigation);

  block.textContent = '';
  block.append(headerWrapper);
}
