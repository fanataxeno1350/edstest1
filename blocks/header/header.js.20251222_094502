import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');

  const nav = document.createElement('nav');
  nav.classList.add('header-navbar', 'header-navbar-expand-xl', 'header-navbar-light', 'header-bg-light', 'header-px-xl-5', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center');

  const togglerButton = document.createElement('button');
  togglerButton.classList.add('header-navbar-toggler', 'header-collapsed');
  togglerButton.type = 'button';
  togglerButton.dataset.toggle = 'collapse';
  togglerButton.dataset.target = '#navbarSupportedContent';
  togglerButton.setAttribute('aria-controls', 'navbarSupportedContent');
  togglerButton.setAttribute('aria-expanded', 'false');
  togglerButton.setAttribute('aria-label', 'Toggle navigation');
  const togglerSpan = document.createElement('span');
  togglerSpan.classList.add('header-navbar-toggler-icon');
  togglerButton.append(togglerSpan);
  nav.append(togglerButton);

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.classList.add('header-d-xl-none');
  dXlNoneDiv.innerHTML = '&nbsp;';
  nav.append(dXlNoneDiv);

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo', 'header-image');

  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoImage && logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.classList.add('header-checkLogoLink');
    logoAnchor.target = '_blank';
    logoAnchor.href = logoLink.textContent.trim();
    const picture = createOptimizedPicture(logoImage.src, logoImage.alt);
    logoAnchor.append(picture);
    const srOnlySpan = document.createElement('span');
    srOnlySpan.classList.add('header-cmp-link__screen-reader-only');
    srOnlySpan.textContent = 'opens in a new tab';
    logoAnchor.append(srOnlySpan);
    logoDiv.append(logoAnchor);
    moveInstrumentation(logoImage, picture);
    moveInstrumentation(logoLink, logoAnchor);
  }

  const logoAltImage = block.querySelector('[data-aue-prop="logoAltImage"]');
  const logoAltLink = block.querySelector('[data-aue-prop="logoAltLink"]');
  if (logoAltImage && logoAltLink) {
    const altLogoAnchor = document.createElement('a');
    altLogoAnchor.classList.add('header-cmp-image__link');
    altLogoAnchor.href = logoAltLink.textContent.trim();
    altLogoAnchor.target = '_blank';
    const picture = createOptimizedPicture(logoAltImage.src, logoAltImage.alt);
    altLogoAnchor.append(picture);
    const srOnlySpan = document.createElement('span');
    srOnlySpan.classList.add('header-cmp-link__screen-reader-only');
    srOnlySpan.textContent = 'opens in a new tab';
    altLogoAnchor.append(srOnlySpan);
    logoDiv.append(altLogoAnchor);
    moveInstrumentation(logoAltImage, picture);
    moveInstrumentation(logoAltLink, altLogoAnchor);
  }
  nav.append(logoDiv);

  const navbarCollapseDiv = document.createElement('div');
  navbarCollapseDiv.classList.add('header-collapse', 'header-navbar-collapse', 'header-justify-content-center');
  navbarCollapseDiv.id = 'navbarSupportedContent';

  const navItemNavigation = document.createElement('div');
  navItemNavigation.classList.add('header-nav-item', 'header-navigation');
  const navigationNav = document.createElement('nav');
  navigationNav.classList.add('header-cmp-navigation');
  navigationNav.setAttribute('role', 'navigation');
  navigationNav.setAttribute('itemscope', '');
  navigationNav.setAttribute('itemtype', 'http://schema.org/SiteNavigationElement');
  const navGroupUl = document.createElement('ul');
  navGroupUl.classList.add('header-cmp-navigation__group');

  const navigationLinks = block.querySelectorAll('[data-aue-model="navLink"]');
  navigationLinks.forEach((linkNode) => {
    const label = linkNode.querySelector('[data-aue-prop="label"]');
    const link = linkNode.querySelector('[data-aue-prop="link"]');

    if (label && link) {
      const navItemLi = document.createElement('li');
      navItemLi.classList.add('header-cmp-navigation__item', 'header-cmp-navigation__item--level-0');
      const navLinkAnchor = document.createElement('a');
      navLinkAnchor.classList.add('header-cmp-navigation__item-link');
      navLinkAnchor.href = link.textContent.trim();
      navLinkAnchor.textContent = label.textContent.trim();
      navItemLi.append(navLinkAnchor);
      navGroupUl.append(navItemLi);
      moveInstrumentation(label, navLinkAnchor);
      moveInstrumentation(link, navLinkAnchor);
      moveInstrumentation(linkNode, navItemLi);
    }
  });
  navigationNav.append(navGroupUl);
  navItemNavigation.append(navigationNav);
  navbarCollapseDiv.append(navItemNavigation);

  const headerSectionDiv = document.createElement('div');
  headerSectionDiv.classList.add('header-header-section', 'header-d-flex', 'header-align-items-center', 'header-justify-content-end');

  const countrySelectorTrigger = document.createElement('div');
  countrySelectorTrigger.classList.add('header-search-icon', 'header-country-selector-trigger', 'header-d-flex', 'header-align-items-center');
  countrySelectorTrigger.dataset.toggle = 'modal';
  countrySelectorTrigger.dataset.target = '#countryModal';

  const countrySelectorFlagIn = block.querySelector('[data-aue-prop="countrySelectorFlagIn"]');
  if (countrySelectorFlagIn) {
    countrySelectorTrigger.dataset.flagIn = countrySelectorFlagIn.textContent.trim();
    moveInstrumentation(countrySelectorFlagIn, countrySelectorTrigger);
  }

  const countrySelectorFlagUsa = block.querySelector('[data-aue-prop="countrySelectorFlagUsa"]');
  if (countrySelectorFlagUsa) {
    countrySelectorTrigger.dataset.flagUsa = countrySelectorFlagUsa.textContent.trim();
    moveInstrumentation(countrySelectorFlagUsa, countrySelectorTrigger);
  }

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.classList.add('header-country-code');
  countryCodeSpan.textContent = 'IN';
  countrySelectorTrigger.append(countryCodeSpan);

  const countryFlagImg = document.createElement('img');
  countryFlagImg.classList.add('header-header-country-flag');
  countryFlagImg.alt = 'flag';
  countryFlagImg.src = countrySelectorTrigger.dataset.flagIn;
  countrySelectorTrigger.append(countryFlagImg);

  const dropdownIconImg = document.createElement('img');
  dropdownIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIconImg.alt = 'dropdown-icon';
  dropdownIconImg.classList.add('header-dropdown-icon');
  countrySelectorTrigger.append(dropdownIconImg);

  headerSectionDiv.append(countrySelectorTrigger);
  navbarCollapseDiv.append(headerSectionDiv);

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
  const searchButtonImg = document.createElement('img');
  searchButtonImg.loading = 'lazy';
  searchButtonImg.src = '/content/dam/aemigrate/uploaded-folder/image/search-icon.png';
  searchButtonImg.alt = 'Search icon';
  searchButton.append(searchButtonImg);
  searchContainer.append(searchButton);
  searchBox.append(searchContainer);

  const closeButtonImg = document.createElement('img');
  closeButtonImg.id = 'closeButton';
  closeButtonImg.loading = 'lazy';
  closeButtonImg.src = '/content/dam/aemigrate/uploaded-folder/image/1766399720915.svg+xml';
  closeButtonImg.alt = 'Close icon';
  searchBox.append(closeButtonImg);
  searchBlock.append(searchBox);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.classList.add('header-search-results', 'header-hidden');
  const popularSuggestionsH4 = document.createElement('h4');
  popularSuggestionsH4.classList.add('header-resultList');
  popularSuggestionsH4.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestionsH4);
  const suggestionsListUl = document.createElement('ul');
  suggestionsListUl.id = 'suggestionsList';
  searchResults.append(suggestionsListUl);
  const pagesH4 = document.createElement('h4');
  pagesH4.classList.add('header-resultList');
  pagesH4.textContent = 'Pages';
  searchResults.append(pagesH4);
  const productsListUl = document.createElement('ul');
  productsListUl.id = 'productsList';
  productsListUl.classList.add('header-products');
  searchResults.append(productsListUl);
  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(viewAllButton);
  searchBlock.append(searchResults);
  itcHeaderIconList.append(searchBlock);

  const searchIconAnchor = document.createElement('a');
  searchIconAnchor.classList.add('header-nav-link');
  const searchIcon = block.querySelector('[data-aue-prop="searchIcon"]');
  if (searchIcon) {
    const searchImg = createOptimizedPicture(searchIcon.src, searchIcon.alt);
    searchImg.querySelector('img').id = 'searchIcon';
    searchIconAnchor.append(searchImg);
    moveInstrumentation(searchIcon, searchImg);
  }
  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-d-block');
  searchSpan.textContent = 'Search';
  searchIconAnchor.append(searchSpan);
  itcHeaderIconList.append(searchIconAnchor);

  const emptyLi = document.createElement('li');
  emptyLi.classList.add('header-nav-item');
  const emptyAnchor = document.createElement('a');
  emptyAnchor.classList.add('header-nav-link');
  emptyLi.append(emptyAnchor);
  itcHeaderIconList.append(emptyLi);

  nav.append(navbarCollapseDiv);
  nav.append(itcHeaderIconList);
  headerContainer.append(nav);

  const modalDiv = document.createElement('div');
  modalDiv.classList.add('header-modal', 'header-fade', 'header-itc-country-selector', 'header-show');
  modalDiv.id = 'countryModal';
  modalDiv.tabIndex = -1;
  modalDiv.setAttribute('role', 'dialog');
  modalDiv.setAttribute('aria-labelledby', 'countryModalLabel');
  modalDiv.setAttribute('aria-modal', 'true');
  modalDiv.style.display = 'block';

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('header-modal-dialog', 'header-modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');

  const modalContent = document.createElement('div');
  modalContent.classList.add('header-modal-content');

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('header-modal-header', 'header-border-0', 'header-text-center');
  const headerW100 = document.createElement('div');
  headerW100.classList.add('header-w-100');
  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('header-modal-title');
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  headerW100.append(modalTitle);
  const experienceText = document.createElement('p');
  experienceText.classList.add('header-experience-text');
  experienceText.textContent = 'Experience';
  headerW100.append(experienceText);
  modalHeader.append(headerW100);
  modalContent.append(modalHeader);

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-modal-body');
  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add('header-country-options', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');

  const countryOptions = block.querySelectorAll('[data-aue-model="countryOption"]');
  countryOptions.forEach((optionNode, index) => {
    const flag = optionNode.querySelector('[data-aue-prop="flag"]');
    const countryName = optionNode.querySelector('[data-aue-prop="countryName"]');
    const countryUrl = optionNode.querySelector('[data-aue-prop="countryUrl"]');

    if (flag && countryName && countryUrl) {
      const countryOptionDiv = document.createElement('div');
      countryOptionDiv.classList.add('header-country-option', 'header-mx-3', 'header-d-flex', 'header-flex-column', 'header-align-items-center');
      if (index === 0) {
        countryOptionDiv.classList.add('header-selected');
      }
      countryOptionDiv.dataset.country = countryName.textContent.trim().toLowerCase();
      countryOptionDiv.dataset.url = countryUrl.textContent.trim();

      const countryFlagImg = createOptimizedPicture(flag.src, flag.alt);
      countryFlagImg.classList.add('header-country-flag');
      countryFlagImg.querySelector('img').classList.add(`header-${countryName.textContent.trim().toLowerCase()}-flag`);
      countryOptionDiv.append(countryFlagImg);

      const countryNameP = document.createElement('p');
      countryNameP.classList.add('header-country-name');
      countryNameP.textContent = countryName.textContent.trim();
      countryOptionDiv.append(countryNameP);

      countryOptionsDiv.append(countryOptionDiv);
      moveInstrumentation(flag, countryFlagImg);
      moveInstrumentation(countryName, countryNameP);
      moveInstrumentation(countryUrl, countryOptionDiv);
      moveInstrumentation(optionNode, countryOptionDiv);
    }
  });

  modalBody.append(countryOptionsDiv);
  modalContent.append(modalBody);
  modalDialog.append(modalContent);
  modalDiv.append(modalDialog);

  block.textContent = '';
  block.append(headerContainer);
  block.append(modalDiv);
  block.className = `header-itc-header-section ${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
