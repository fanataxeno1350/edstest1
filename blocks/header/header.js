import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('header');
  headerSection.classList.add('header-itc-header-section');
  moveInstrumentation(block, headerSection);

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');
  headerSection.append(headerContainer);

  const navBar = document.createElement('nav');
  navBar.classList.add('header-navbar', 'header-navbar', 'header-navbar-expand-xl', 'header-navbar-light', 'header-bg-light', 'header-px-xl-5', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center');
  headerContainer.append(navBar);

  // Toggle button
  const togglerButton = document.createElement('button');
  togglerButton.classList.add('header-navbar-toggler', 'header-collapsed');
  togglerButton.setAttribute('type', 'button');
  togglerButton.setAttribute('data-toggle', 'collapse');
  togglerButton.setAttribute('data-target', '#navbarSupportedContent');
  togglerButton.setAttribute('aria-controls', 'navbarSupportedContent');
  togglerButton.setAttribute('aria-expanded', 'false');
  togglerButton.setAttribute('aria-label', 'Toggle navigation');
  togglerButton.innerHTML = '<span class="header-navbar-toggler-icon"></span>';
  navBar.append(togglerButton);

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.classList.add('header-d-xl-none');
  dXlNoneDiv.innerHTML = '&nbsp;';
  navBar.append(dXlNoneDiv);

  // Logo
  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'header-image');
  navBar.append(logoDiv);

  const logoLinkWrapper = document.createElement('a');
  logoLinkWrapper.classList.add('header-cmp-image__link');
  logoLinkWrapper.setAttribute('target', '_blank');
  logoDiv.append(logoLinkWrapper);

  const logoImg = block.querySelector('img[alt="Kitchens of India"]');
  if (logoImg) {
    const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '131' }]);
    moveInstrumentation(logoImg, optimizedLogo.querySelector('img'));
    logoLinkWrapper.append(optimizedLogo);
    logoLinkWrapper.href = logoImg.closest('a')?.href || '/';
  }

  const navCollapseDiv = document.createElement('div');
  navCollapseDiv.classList.add('header-collapse', 'header-navbar-collapse', 'header-justify-content-center');
  navCollapseDiv.id = 'navbarSupportedContent';
  navBar.append(navCollapseDiv);

  // Navigation
  const navItemDiv = document.createElement('div');
  navItemDiv.classList.add('header-nav-item', 'header-navigation');
  navCollapseDiv.append(navItemDiv);

  const navElement = document.createElement('nav');
  navElement.classList.add('header-cmp-navigation');
  navElement.setAttribute('role', 'navigation');
  navElement.setAttribute('itemscope', '');
  navElement.setAttribute('itemtype', 'http://schema.org/SiteNavigationElement');
  navItemDiv.append(navElement);

  const navUl = document.createElement('ul');
  navUl.classList.add('header-cmp-navigation__group');
  navElement.append(navUl);

  const shopLink = block.querySelector('a[href="/home/shop.html"]');
  if (shopLink) {
    const shopLi = document.createElement('li');
    shopLi.classList.add('header-cmp-navigation__item', 'header-cmp-navigation__item--level-0');
    const newShopLink = document.createElement('a');
    newShopLink.classList.add('header-cmp-navigation__item-link');
    newShopLink.href = shopLink.href;
    newShopLink.textContent = shopLink.textContent;
    shopLi.append(newShopLink);
    navUl.append(shopLi);
  }

  const heritageLink = block.querySelector('a[href="/home/our-heritage.html"]');
  if (heritageLink) {
    const heritageLi = document.createElement('li');
    heritageLi.classList.add('header-cmp-navigation__item', 'header-cmp-navigation__item--level-0');
    const newHeritageLink = document.createElement('a');
    newHeritageLink.classList.add('header-cmp-navigation__item-link');
    newHeritageLink.href = heritageLink.href;
    newHeritageLink.textContent = heritageLink.textContent;
    heritageLi.append(newHeritageLink);
    navUl.append(heritageLi);
  }

  // Right section (country selector and search)
  const rightSection = document.createElement('div');
  rightSection.classList.add('header-section', 'header-d-flex', 'header-align-items-center', 'header-justify-content-end');
  navCollapseDiv.append(rightSection);

  // Country Selector
  const countrySelectorDiv = document.createElement('div');
  countrySelectorDiv.classList.add('header-search-icon', 'header-country-selector-trigger', 'header-d-flex', 'header-align-items-center');
  countrySelectorDiv.setAttribute('data-toggle', 'modal');
  countrySelectorDiv.setAttribute('data-target', '#countryModal');
  countrySelectorDiv.setAttribute('data-flag-in', '/content/dam/aemigrate/uploaded-folder/image/india-1-fmt-webp-alpha.webp');
  countrySelectorDiv.setAttribute('data-flag-usa', '/content/dam/aemigrate/uploaded-folder/image/usa-fmt-webp-alpha.webp');
  rightSection.append(countrySelectorDiv);

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-country-code');
  countryCodeSpan.textContent = block.querySelector('.header-country-code')?.textContent || 'IN';
  countrySelectorDiv.append(countryCodeSpan);

  const countryFlagImg = block.querySelector('img.header-country-flag');
  if (countryFlagImg) {
    const optimizedFlag = createOptimizedPicture(countryFlagImg.src, countryFlagImg.alt);
    moveInstrumentation(countryFlagImg, optimizedFlag.querySelector('img'));
    optimizedFlag.classList.add('header-country-flag');
    countrySelectorDiv.append(optimizedFlag);
  }

  const dropdownIcon = block.querySelector('img[alt="dropdown-icon"]');
  if (dropdownIcon) {
    const optimizedDropdown = createOptimizedPicture(dropdownIcon.src, dropdownIcon.alt);
    moveInstrumentation(dropdownIcon, optimizedDropdown.querySelector('img'));
    optimizedDropdown.classList.add('header-dropdown-icon');
    countrySelectorDiv.append(optimizedDropdown);
  }

  // Search block (simplified for decoration)
  const iconListDiv = document.createElement('div');
  iconListDiv.classList.add('header-itc-header-icon-list');
  navBar.append(iconListDiv);

  const searchBlockDiv = document.createElement('div');
  searchBlockDiv.id = 'searchBlock';
  searchBlockDiv.classList.add('header-search-block', 'header-hidden');
  iconListDiv.append(searchBlockDiv);

  const searchBoxDiv = document.createElement('div');
  searchBoxDiv.id = 'searchBox';
  searchBoxDiv.classList.add('header-search-box');
  searchBlockDiv.append(searchBoxDiv);

  const searchContainerDiv = document.createElement('div');
  searchContainerDiv.id = 'searchContainer';
  searchContainerDiv.classList.add('header-search-container', 'header-hidden');
  searchBoxDiv.append(searchContainerDiv);

  const searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'text');
  searchInput.id = 'searchInput';
  searchInput.setAttribute('placeholder', block.querySelector('#searchInput')?.getAttribute('placeholder') || 'Search');
  searchContainerDiv.append(searchInput);

  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  const searchButtonImg = block.querySelector('#searchButton img');
  if (searchButtonImg) {
    const optimizedSearchBtnImg = createOptimizedPicture(searchButtonImg.src, searchButtonImg.alt);
    moveInstrumentation(searchButtonImg, optimizedSearchBtnImg.querySelector('img'));
    searchButton.append(optimizedSearchBtnImg);
  }
  searchContainerDiv.append(searchButton);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.setAttribute('loading', 'lazy');
  const closeButtonSrc = block.querySelector('#closeButton')?.src;
  if (closeButtonSrc) {
    closeButton.src = closeButtonSrc;
    closeButton.alt = block.querySelector('#closeButton')?.alt || 'Close icon';
  }
  closeButton.classList.add('header-close-button'); // Add a class for potential styling
  searchBoxDiv.append(closeButton);

  const searchIconLink = document.createElement('a');
  searchIconLink.classList.add('header-nav-link');
  iconListDiv.append(searchIconLink);

  const searchIconImg = block.querySelector('#searchIcon');
  if (searchIconImg) {
    const optimizedSearchIcon = createOptimizedPicture(searchIconImg.src, searchIconImg.alt);
    moveInstrumentation(searchIconImg, optimizedSearchIcon.querySelector('img'));
    optimizedSearchIcon.id = 'searchIcon';
    optimizedSearchIcon.setAttribute('loading', 'lazy');
    searchIconLink.append(optimizedSearchIcon);
  }

  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-d-block');
  searchSpan.textContent = 'Search';
  searchIconLink.append(searchSpan);

  // Country Modal (simplified for decoration)
  const countryModalDiv = document.createElement('div');
  countryModalDiv.classList.add('header-modal', 'header-fade', 'header-itc-country-selector', 'header-show');
  countryModalDiv.id = 'countryModal';
  countryModalDiv.setAttribute('tabindex', '-1');
  countryModalDiv.setAttribute('role', 'dialog');
  countryModalDiv.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModalDiv.setAttribute('aria-modal', 'true');
  countryModalDiv.style.display = 'block';
  headerSection.append(countryModalDiv);

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('header-modal-dialog', 'header-modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');
  countryModalDiv.append(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.classList.add('header-modal-content');
  modalDialog.append(modalContent);

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('header-modal-header', 'header-border-0', 'header-text-center');
  modalContent.append(modalHeader);

  const headerW100 = document.createElement('div');
  headerW100.classList.add('header-w-100');
  modalHeader.append(headerW100);

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('header-modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br/>KITCHENS OF INDIA';
  headerW100.append(modalTitle);

  const experienceText = document.createElement('p');
  experienceText.classList.add('header-experience-text');
  experienceText.textContent = 'Experience';
  headerW100.append(experienceText);

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-modal-body');
  modalContent.append(modalBody);

  const countryOptions = document.createElement('div');
  countryOptions.classList.add('header-country-options', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');
  modalBody.append(countryOptions);

  const indiaOption = document.createElement('div');
  indiaOption.classList.add('header-country-option', 'header-selected', 'header-mx-3', 'header-d-flex', 'header-flex-column', 'header-align-items-center');
  indiaOption.setAttribute('data-country', 'india');
  indiaOption.setAttribute('data-url', '/india');
  countryOptions.append(indiaOption);

  const indiaFlagImg = block.querySelector('img.header-india-flag');
  if (indiaFlagImg) {
    const optimizedIndiaFlag = createOptimizedPicture(indiaFlagImg.src, indiaFlagImg.alt);
    moveInstrumentation(indiaFlagImg, optimizedIndiaFlag.querySelector('img'));
    optimizedIndiaFlag.classList.add('header-country-flag', 'header-india-flag');
    indiaOption.append(optimizedIndiaFlag);
  }

  const indiaName = document.createElement('p');
  indiaName.classList.add('header-country-name');
  indiaName.textContent = 'India';
  indiaOption.append(indiaName);

  const usaOption = document.createElement('div');
  usaOption.classList.add('header-country-option', 'header-mx-3', 'header-d-flex', 'header-flex-column', 'header-align-items-center');
  usaOption.setAttribute('data-country', 'usa');
  usaOption.setAttribute('data-url', '/usa');
  countryOptions.append(usaOption);

  const usaFlagImg = block.querySelector('img.header-usa-flag');
  if (usaFlagImg) {
    const optimizedUsaFlag = createOptimizedPicture(usaFlagImg.src, usaFlagImg.alt);
    moveInstrumentation(usaFlagImg, optimizedUsaFlag.querySelector('img'));
    optimizedUsaFlag.classList.add('header-country-flag', 'header-usa-flag');
    usaOption.append(optimizedUsaFlag);
  }

  const usaName = document.createElement('p');
  usaName.classList.add('header-country-name');
  usaName.textContent = 'USA';
  usaOption.append(usaName);

  block.textContent = '';
  block.append(headerSection);
}