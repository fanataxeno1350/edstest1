import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const header = document.createElement('header');
  header.classList.add('header-itc-header-section');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');

  const navbar = document.createElement('nav');
  navbar.classList.add('header-navbar', 'header-navbar-expand-xl', 'header-navbar-light', 'header-bg-light', 'header-px-xl-5', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center');

  const navbarToggler = document.createElement('button');
  navbarToggler.classList.add('header-navbar-toggler', 'header-collapsed');
  navbarToggler.type = 'button';
  navbarToggler.setAttribute('data-toggle', 'collapse');
  navbarToggler.setAttribute('data-target', '#navbarSupportedContent');
  navbarToggler.setAttribute('aria-controls', 'navbarSupportedContent');
  navbarToggler.setAttribute('aria-expanded', 'false');
  navbarToggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.classList.add('header-navbar-toggler-icon');
  navbarToggler.append(togglerIcon);
  moveInstrumentation(block.querySelector('button.header-navbar-toggler'), navbarToggler);

  const dXlNone = document.createElement('div');
  dXlNone.classList.add('header-d-xl-none');
  dXlNone.innerHTML = '&nbsp;';

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'header-image');

  const logoImageContainer = block.querySelector('[data-aue-prop="logoImage"]');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  const altLogoImageContainer = block.querySelector('[data-aue-prop="altLogoImage"]');
  const altLogoLink = block.querySelector('[data-aue-prop="altLogoLink"]');

  if (logoImageContainer && logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.target = '_blank';
    logoAnchor.href = logoLink.textContent.trim();
    logoAnchor.classList.add('header-checkLogoLink');
    const logoImg = logoImageContainer.querySelector('img');
    if (logoImg) {
      logoAnchor.append(createOptimizedPicture(logoImg.src, logoImg.alt));
    }
    const srOnly = document.createElement('span');
    srOnly.classList.add('header-cmp-link__screen-reader-only');
    srOnly.textContent = 'opens in a new tab';
    logoAnchor.append(srOnly);
    logoDiv.append(logoAnchor);
    moveInstrumentation(logoImageContainer, logoDiv);
    moveInstrumentation(logoLink, logoAnchor);
  }

  if (altLogoImageContainer && altLogoLink) {
    const altLogoAnchor = document.createElement('a');
    altLogoAnchor.classList.add('header-cmp-image__link');
    altLogoAnchor.href = altLogoLink.textContent.trim();
    altLogoAnchor.target = '_blank';
    const altLogoImg = altLogoImageContainer.querySelector('img');
    if (altLogoImg) {
      altLogoAnchor.append(createOptimizedPicture(altLogoImg.src, altLogoImg.alt, false, [{ width: '131' }]));
    }
    const srOnlyAlt = document.createElement('span');
    srOnlyAlt.classList.add('header-cmp-link__screen-reader-only');
    srOnlyAlt.textContent = 'opens in a new tab';
    altLogoAnchor.append(srOnlyAlt);
    logoDiv.append(altLogoAnchor);
    moveInstrumentation(altLogoImageContainer, logoDiv);
    moveInstrumentation(altLogoLink, altLogoAnchor);
  }

  const navbarCollapse = document.createElement('div');
  navbarCollapse.classList.add('header-collapse', 'header-navbar-collapse', 'header-justify-content-center');
  navbarCollapse.id = 'navbarSupportedContent';

  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('header-nav-item', 'header-navigation');

  const navigationNav = document.createElement('nav');
  navigationNav.id = 'navigation-6d5dcb0126';
  navigationNav.classList.add('header-cmp-navigation');
  navigationNav.setAttribute('itemscope', '');
  navigationNav.setAttribute('itemtype', 'http://schema.org/SiteNavigationElement');
  navigationNav.setAttribute('role', 'navigation');

  const navGroup = document.createElement('ul');
  navGroup.classList.add('header-cmp-navigation__group');

  const navShopLink = block.querySelector('[data-aue-prop="navShopLink"]');
  if (navShopLink) {
    const shopLi = document.createElement('li');
    shopLi.classList.add('header-cmp-navigation__item', 'header-cmp-navigation__item--level-0');
    const shopAnchor = document.createElement('a');
    shopAnchor.classList.add('header-cmp-navigation__item-link');
    shopAnchor.href = navShopLink.textContent.trim();
    shopAnchor.textContent = 'Shop';
    shopLi.append(shopAnchor);
    navGroup.append(shopLi);
    moveInstrumentation(navShopLink, shopAnchor);
  }

  const navOurHeritageLink = block.querySelector('[data-aue-prop="navOurHeritageLink"]');
  if (navOurHeritageLink) {
    const heritageLi = document.createElement('li');
    heritageLi.classList.add('header-cmp-navigation__item', 'header-cmp-navigation__item--level-0');
    const heritageAnchor = document.createElement('a');
    heritageAnchor.classList.add('header-cmp-navigation__item-link');
    heritageAnchor.href = navOurHeritageLink.textContent.trim();
    heritageAnchor.textContent = 'Our Heritage';
    heritageLi.append(heritageAnchor);
    navGroup.append(heritageLi);
    moveInstrumentation(navOurHeritageLink, heritageAnchor);
  }

  navigationNav.append(navGroup);
  navItemNavigation.append(navigationNav);

  const headerSection = document.createElement('div');
  headerSection.classList.add('header-header-section', 'header-d-flex', 'header-align-items-center', 'header-justify-content-end');

  const searchIconCountrySelector = document.createElement('div');
  searchIconCountrySelector.classList.add('header-search-icon', 'header-country-selector-trigger', 'header-d-flex', 'header-align-items-center');
  searchIconCountrySelector.setAttribute('data-toggle', 'modal');
  searchIconCountrySelector.setAttribute('data-target', '#countryModal');
  searchIconCountrySelector.setAttribute('data-flag-in', '/content/dam/aemigrate/uploaded-folder/image/india-1-fmt-webp-alpha.webp');
  searchIconCountrySelector.setAttribute('data-flag-usa', '/content/dam/aemigrate/uploaded-folder/image/usa-fmt-webp-alpha.webp');

  const countryCode = document.createElement('span');
  countryCode.classList.add('header-country-code');
  countryCode.textContent = 'IN';
  searchIconCountrySelector.append(countryCode);

  const countryFlagIndia = block.querySelector('[data-aue-prop="countryFlagIndia"]');
  if (countryFlagIndia) {
    const flagImg = countryFlagIndia.querySelector('img');
    if (flagImg) {
      const flagPicture = createOptimizedPicture(flagImg.src, flagImg.alt);
      flagPicture.classList.add('header-header-country-flag');
      searchIconCountrySelector.append(flagPicture);
      moveInstrumentation(countryFlagIndia, flagPicture);
    }
  }

  const dropdownIcon = block.querySelector('[data-aue-prop="dropdownIcon"]');
  if (dropdownIcon) {
    const dropImg = dropdownIcon.querySelector('img');
    if (dropImg) {
      const dropPicture = createOptimizedPicture(dropImg.src, dropImg.alt);
      dropPicture.classList.add('header-dropdown-icon');
      searchIconCountrySelector.append(dropPicture);
      moveInstrumentation(dropdownIcon, dropPicture);
    }
  }

  headerSection.append(searchIconCountrySelector);
  navbarCollapse.append(navItemNavigation, headerSection);

  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.classList.add('header-itc-header-icon-list');

  const searchBlock = document.createElement('div');
  searchBlock.id = 'searchBlock';
  searchBlock.classList.add('header-search-block', 'header-hidden');

  const searchBox = document.createElement('div');
  searchBox.id = 'searchBox';
  searchBox.classList.add('header-search-box');

  const searchContainer = document.createElement('div');
  searchContainer.id = 'searchContainer';
  searchContainer.classList.add('header-search-container', 'header-hidden');

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'searchInput';
  searchInput.placeholder = 'Search';
  searchContainer.append(searchInput);

  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  const searchBlockIcon = block.querySelector('[data-aue-prop="searchBlockIcon"]');
  if (searchBlockIcon) {
    const searchBlockImg = searchBlockIcon.querySelector('img');
    if (searchBlockImg) {
      searchButton.append(createOptimizedPicture(searchBlockImg.src, searchBlockImg.alt));
      moveInstrumentation(searchBlockIcon, searchButton);
    }
  }
  searchContainer.append(searchButton);
  searchBox.append(searchContainer);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  const closeIcon = block.querySelector('[data-aue-prop="closeIcon"]');
  if (closeIcon) {
    const closeImg = closeIcon.querySelector('img');
    if (closeImg) {
      closeButton.src = closeImg.src;
      closeButton.alt = closeImg.alt;
      moveInstrumentation(closeIcon, closeButton);
    }
  }
  searchBox.append(closeButton);
  searchBlock.append(searchBox);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('header-search-results', 'header-hidden');

  const popularSuggestions = document.createElement('h4');
  popularSuggestions.classList.add('header-resultList');
  popularSuggestions.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestions);

  const suggestionsList = document.createElement('ul');
  suggestionsList.id = 'suggestionsList';
  searchResults.append(suggestionsList);

  const pages = document.createElement('h4');
  pages.classList.add('header-resultList');
  pages.textContent = 'Pages';
  searchResults.append(pages);

  const productsList = document.createElement('ul');
  productsList.id = 'productsList';
  productsList.classList.add('header-products');
  searchResults.append(productsList);

  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(viewAllButton);

  searchBlock.append(searchResults);
  itcHeaderIconList.append(searchBlock);

  const searchNavLink = document.createElement('a');
  searchNavLink.classList.add('header-nav-link');
  const searchIcon = block.querySelector('[data-aue-prop="searchIcon"]');
  if (searchIcon) {
    const searchImg = searchIcon.querySelector('img');
    if (searchImg) {
      const searchPicture = createOptimizedPicture(searchImg.src, searchImg.alt);
      searchPicture.id = 'searchIcon';
      searchPicture.loading = 'lazy';
      searchNavLink.append(searchPicture);
      moveInstrumentation(searchIcon, searchPicture);
    }
  }
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-d-block');
  searchSpan.textContent = 'Search';
  searchNavLink.append(searchSpan);
  itcHeaderIconList.append(searchNavLink);

  const navItemLi = document.createElement('li');
  navItemLi.classList.add('header-nav-item');
  const emptyNavLink = document.createElement('a');
  emptyNavLink.classList.add('header-nav-link');
  navItemLi.append(emptyNavLink);
  itcHeaderIconList.append(navItemLi);

  navbar.append(navbarToggler, dXlNone, logoDiv, navbarCollapse, itcHeaderIconList);
  headerContainer.append(navbar);

  const countryModal = document.createElement('div');
  countryModal.classList.add('header-modal', 'header-fade', 'header-itc-country-selector', 'header-show');
  countryModal.id = 'countryModal';
  countryModal.tabIndex = -1;
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
  countryModal.style.display = 'block';

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('header-modal-dialog', 'header-modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');

  const modalContent = document.createElement('div');
  modalContent.classList.add('header-modal-content');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('header-modal-header', 'header-border-0', 'header-text-center');

  const modalHeaderW100 = document.createElement('div');
  modalHeaderW100.classList.add('header-w-100');

  const modalTitle = block.querySelector('[data-aue-prop="modalTitle"]');
  if (modalTitle) {
    const h2Title = document.createElement('h2');
    h2Title.classList.add('header-modal-title');
    h2Title.innerHTML = modalTitle.innerHTML;
    modalHeaderW100.append(h2Title);
    moveInstrumentation(modalTitle, h2Title);
  }

  const modalExperienceText = block.querySelector('[data-aue-prop="modalExperienceText"]');
  if (modalExperienceText) {
    const pExperience = document.createElement('p');
    pExperience.classList.add('header-experience-text');
    pExperience.innerHTML = modalExperienceText.innerHTML;
    modalHeaderW100.append(pExperience);
    moveInstrumentation(modalExperienceText, pExperience);
  }

  modalHeader.append(modalHeaderW100);
  modalContent.append(modalHeader);

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-modal-body');

  const countryOptions = document.createElement('div');
  countryOptions.classList.add('header-country-options', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');

  const countryOptionIndia = document.createElement('div');
  countryOptionIndia.classList.add('header-country-option', 'header-selected', 'header-mx-3', 'header-d-flex', 'header-flex-column', 'header-align-items-center');
  countryOptionIndia.setAttribute('data-country', 'india');
  countryOptionIndia.setAttribute('data-url', '/india');

  const countryFlagIndiaModal = block.querySelector('[data-aue-prop="countryFlagIndia"]');
  if (countryFlagIndiaModal) {
    const flagImg = countryFlagIndiaModal.querySelector('img');
    if (flagImg) {
      const flagPicture = createOptimizedPicture(flagImg.src, flagImg.alt);
      flagPicture.classList.add('header-country-flag', 'header-india-flag');
      countryOptionIndia.append(flagPicture);
      moveInstrumentation(countryFlagIndiaModal, flagPicture);
    }
  }

  const countryIndiaLabel = block.querySelector('[data-aue-prop="countryIndiaLabel"]');
  if (countryIndiaLabel) {
    const pIndia = document.createElement('p');
    pIndia.classList.add('header-country-name');
    pIndia.innerHTML = countryIndiaLabel.innerHTML;
    countryOptionIndia.append(pIndia);
    moveInstrumentation(countryIndiaLabel, pIndia);
  }

  countryOptions.append(countryOptionIndia);

  const countryOptionUSA = document.createElement('div');
  countryOptionUSA.classList.add('header-country-option', 'header-mx-3', 'header-d-flex', 'header-flex-column', 'header-align-items-center');
  countryOptionUSA.setAttribute('data-country', 'usa');
  countryOptionUSA.setAttribute('data-url', '/usa');

  const countryFlagUSAModal = block.querySelector('[data-aue-prop="countryFlagUSA"]');
  if (countryFlagUSAModal) {
    const flagImg = countryFlagUSAModal.querySelector('img');
    if (flagImg) {
      const flagPicture = createOptimizedPicture(flagImg.src, flagImg.alt);
      flagPicture.classList.add('header-country-flag', 'header-usa-flag');
      countryOptionUSA.append(flagPicture);
      moveInstrumentation(countryFlagUSAModal, flagPicture);
    }
  }

  const countryUSALabel = block.querySelector('[data-aue-prop="countryUSALabel"]');
  if (countryUSALabel) {
    const pUSA = document.createElement('p');
    pUSA.classList.add('header-country-name');
    pUSA.innerHTML = countryUSALabel.innerHTML;
    countryOptionUSA.append(pUSA);
    moveInstrumentation(countryUSALabel, pUSA);
  }

  countryOptions.append(countryOptionUSA);
  modalBody.append(countryOptions);
  modalContent.append(modalBody);
  modalDialog.append(modalContent);
  countryModal.append(modalDialog);

  header.append(headerContainer, countryModal);

  block.textContent = '';
  block.append(header);
  block.className = `header block`;
  block.dataset.blockStatus = 'loaded';
}