import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('header');
  moveInstrumentation(block, headerSection);
  headerSection.classList.add('header-section');

  const headerContainer = document.createElement('div');
  headerContainer.classList.add('header-container');
  headerSection.append(headerContainer);

  const headerNavbar = document.createElement('nav');
  headerNavbar.classList.add('header-navbar', 'header-navbar-expand-xl', 'header-navbar-light', 'header-bg-light', 'header-px-xl-5', 'header-d-flex', 'header-justify-content-between', 'header-align-items-center');
  headerContainer.append(headerNavbar);

  // Toggler button
  const togglerButton = document.createElement('button');
  togglerButton.classList.add('header-navbar-toggler', 'header-collapsed');
  togglerButton.setAttribute('type', 'button');
  togglerButton.setAttribute('data-toggle', 'collapse');
  togglerButton.setAttribute('data-target', '#navbarSupportedContent');
  togglerButton.setAttribute('aria-controls', 'navbarSupportedContent');
  togglerButton.setAttribute('aria-expanded', 'false');
  togglerButton.setAttribute('aria-label', 'Toggle navigation');
  togglerButton.innerHTML = '<span class="header-navbar-toggler-icon"></span>';
  headerNavbar.append(togglerButton);

  const divDxlNone = document.createElement('div');
  divDxlNone.classList.add('header-d-xl-none');
  divDxlNone.innerHTML = '&nbsp;';
  headerNavbar.append(divDxlNone);

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('header-logo-div', 'header-image');
  headerNavbar.append(logoDiv);

  const collapseDiv = document.createElement('div');
  collapseDiv.classList.add('header-collapse', 'header-navbar-collapse', 'header-justify-content-center');
  collapseDiv.setAttribute('id', 'navbarSupportedContent');
  headerNavbar.append(collapseDiv);

  const navItemDiv = document.createElement('div');
  navItemDiv.classList.add('header-nav-item', 'header-navigation');
  collapseDiv.append(navItemDiv);

  const navigationNav = document.createElement('nav');
  navigationNav.setAttribute('id', 'navigation-6d5dcb0126');
  navigationNav.classList.add('header-cmp-navigation');
  navigationNav.setAttribute('itemscope', '');
  navigationNav.setAttribute('itemtype', 'http://schema.org/SiteNavigationElement');
  navigationNav.setAttribute('role', 'navigation');
  navItemDiv.append(navigationNav);

  const navUl = document.createElement('ul');
  navUl.classList.add('header-cmp-navigation__group');
  navigationNav.append(navUl);

  const sectionWrapper = document.createElement('div');
  sectionWrapper.classList.add('header-section-wrapper', 'header-d-flex', 'header-align-items-center', 'header-justify-content-end');
  collapseDiv.append(sectionWrapper);

  const searchIconDiv = document.createElement('div');
  searchIconDiv.classList.add('header-search-icon', 'header-country-selector-trigger', 'header-d-flex', 'header-align-items-center');
  searchIconDiv.setAttribute('data-toggle', 'modal');
  searchIconDiv.setAttribute('data-target', '#countryModal');
  sectionWrapper.append(searchIconDiv);

  const iconListDiv = document.createElement('div');
  iconListDiv.classList.add('header-icon-list');
  headerNavbar.append(iconListDiv);

  const searchBlock = document.createElement('div');
  searchBlock.setAttribute('id', 'searchBlock');
  searchBlock.classList.add('header-search-block', 'header-hidden');
  iconListDiv.append(searchBlock);

  const searchBox = document.createElement('div');
  searchBox.setAttribute('id', 'searchBox');
  searchBox.classList.add('header-search-box');
  searchBlock.append(searchBox);

  const searchContainer = document.createElement('div');
  searchContainer.setAttribute('id', 'searchContainer');
  searchContainer.classList.add('header-search-container', 'header-hidden');
  searchBox.append(searchContainer);

  const searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'text');
  searchInput.setAttribute('id', 'searchInput');
  searchContainer.append(searchInput);

  const searchButton = document.createElement('button');
  searchButton.setAttribute('id', 'searchButton');
  searchContainer.append(searchButton);

  const closeButton = document.createElement('img');
  closeButton.setAttribute('id', 'closeButton');
  closeButton.setAttribute('loading', 'lazy');
  closeButton.setAttribute('src', '/content/dam/kitchens-of-india/placeholders/vector-four.svg');
  closeButton.setAttribute('alt', 'Close icon');
  searchBox.append(closeButton);

  const searchResults = document.createElement('div');
  searchResults.setAttribute('id', 'searchResults');
  searchResults.classList.add('header-search-results', 'header-hidden');
  searchBlock.append(searchResults);

  const popularSuggestionsH4 = document.createElement('h4');
  popularSuggestionsH4.classList.add('header-result-list');
  popularSuggestionsH4.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestionsH4);

  const suggestionsListUl = document.createElement('ul');
  suggestionsListUl.setAttribute('id', 'suggestionsList');
  searchResults.append(suggestionsListUl);

  const pagesH4 = document.createElement('h4');
  pagesH4.classList.add('header-result-list');
  pagesH4.textContent = 'Pages';
  searchResults.append(pagesH4);

  const productsListUl = document.createElement('ul');
  productsListUl.setAttribute('id', 'productsList');
  productsListUl.classList.add('header-products-list');
  searchResults.append(productsListUl);

  const viewAllButton = document.createElement('button');
  viewAllButton.setAttribute('id', 'viewAllButton');
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(viewAllButton);

  const searchLink = document.createElement('a');
  searchLink.classList.add('header-nav-link');
  iconListDiv.append(searchLink);

  const searchIconImg = document.createElement('img');
  searchIconImg.setAttribute('loading', 'lazy');
  searchIconImg.setAttribute('id', 'searchIcon');
  searchIconImg.setAttribute('src', '/content/dam/kitchens-of-india/placeholders/search-icon.png');
  searchIconImg.setAttribute('alt', 'Search icon');
  searchLink.append(searchIconImg);

  const searchSpan = document.createElement('span');
  searchSpan.classList.add('header-d-block');
  searchSpan.textContent = 'Search';
  searchLink.append(searchSpan);

  const navItemLi = document.createElement('li');
  navItemLi.classList.add('header-nav-item');
  iconListDiv.append(navItemLi);

  const navItemLink = document.createElement('a');
  navItemLink.classList.add('header-nav-link');
  navItemLi.append(navItemLink);

  const modalDiv = document.createElement('div');
  modalDiv.classList.add('header-modal', 'header-fade', 'header-country-selector', 'header-show');
  modalDiv.setAttribute('id', 'countryModal');
  modalDiv.setAttribute('tabindex', '-1');
  modalDiv.setAttribute('role', 'dialog');
  modalDiv.setAttribute('aria-labelledby', 'countryModalLabel');
  modalDiv.setAttribute('aria-modal', 'true');
  modalDiv.style.display = 'block';
  headerSection.append(modalDiv);

  const modalDialog = document.createElement('div');
  modalDialog.classList.add('header-modal-dialog', 'header-modal-dialog-centered');
  modalDialog.setAttribute('role', 'document');
  modalDiv.append(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.classList.add('header-modal-content');
  modalDialog.append(modalContent);

  const modalHeader = document.createElement('div');
  modalHeader.classList.add('header-modal-header', 'header-border-0', 'header-text-center');
  modalContent.append(modalHeader);

  const modalHeaderW100 = document.createElement('div');
  modalHeaderW100.classList.add('header-w-100');
  modalHeader.append(modalHeaderW100);

  const modalTitle = document.createElement('h2');
  modalTitle.classList.add('header-modal-title');
  modalHeaderW100.append(modalTitle);

  const experienceText = document.createElement('p');
  experienceText.classList.add('header-experience-text');
  experienceText.textContent = 'Experience';
  modalHeaderW100.append(experienceText);

  const modalBody = document.createElement('div');
  modalBody.classList.add('header-modal-body');
  modalContent.append(modalBody);

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.classList.add('header-country-options', 'header-d-flex', 'header-justify-content-center', 'header-align-items-center');
  modalBody.append(countryOptionsDiv);

  // Loop through block children to extract data
  [...block.children].forEach((row) => {
    const cells = [...row.children];

    // Logo 1
    const logo1Cell = cells[0];
    if (logo1Cell) {
      const logo1Link = logo1Cell.querySelector('a.header-check-logo-link');
      const logo1Img = logo1Link ? logo1Link.querySelector('img') : null;
      if (logo1Img) {
        const newLogo1Link = document.createElement('a');
        moveInstrumentation(logo1Link, newLogo1Link);
        newLogo1Link.setAttribute('target', '_blank');
        newLogo1Link.classList.add('header-check-logo-link');
        newLogo1Link.href = logo1Link.href; // Assuming href exists if link does

        const optimizedLogo1Pic = createOptimizedPicture(logo1Img.src, logo1Img.alt);
        moveInstrumentation(logo1Img, optimizedLogo1Pic.querySelector('img'));
        optimizedLogo1Pic.querySelector('img').classList.add('header-itc-logo-image');
        optimizedLogo1Pic.querySelector('img').setAttribute('itemprop', 'contentUrl');
        newLogo1Link.append(optimizedLogo1Pic);

        const srOnlySpan = document.createElement('span');
        srOnlySpan.classList.add('header-cmp-link__screen-reader-only');
        srOnlySpan.textContent = 'opens in a new tab';
        newLogo1Link.append(srOnlySpan);
        logoDiv.append(newLogo1Link);
      }
    }

    // Logo 2
    const logo2Cell = cells[1];
    if (logo2Cell) {
      const logo2Link = logo2Cell.querySelector('a.header-cmp-image__link');
      const logo2Img = logo2Link ? logo2Link.querySelector('img') : null;
      if (logo2Img) {
        const newLogo2Link = document.createElement('a');
        moveInstrumentation(logo2Link, newLogo2Link);
        newLogo2Link.classList.add('header-cmp-image__link');
        newLogo2Link.href = logo2Link.href;
        newLogo2Link.setAttribute('target', '_blank');

        const optimizedLogo2Pic = createOptimizedPicture(logo2Img.src, logo2Img.alt, false, [{ width: '131' }]);
        moveInstrumentation(logo2Img, optimizedLogo2Pic.querySelector('img'));
        optimizedLogo2Pic.querySelector('img').classList.add('header-cmp-image__image');
        optimizedLogo2Pic.querySelector('img').setAttribute('itemprop', 'contentUrl');
        optimizedLogo2Pic.querySelector('img').setAttribute('width', '131');
        optimizedLogo2Pic.querySelector('img').setAttribute('height', '71');
        newLogo2Link.append(optimizedLogo2Pic);

        const srOnlySpan = document.createElement('span');
        srOnlySpan.classList.add('header-cmp-link__screen-reader-only');
        srOnlySpan.textContent = 'opens in a new tab';
        newLogo2Link.append(srOnlySpan);
        logoDiv.append(newLogo2Link);
      }
    }

    // Navigation Links
    const navigationLinksCell = cells[2];
    if (navigationLinksCell) {
      const navLinks = navigationLinksCell.querySelectorAll('li.header-cmp-navigation__item--level-0');
      navLinks.forEach((navLinkItem) => {
        const navLink = navLinkItem.querySelector('a.header-cmp-navigation__item-link');
        if (navLink) {
          const li = document.createElement('li');
          moveInstrumentation(navLinkItem, li);
          li.classList.add('header-cmp-navigation__item', 'header-cmp-navigation__item--level-0');

          const a = document.createElement('a');
          moveInstrumentation(navLink, a);
          a.classList.add('header-cmp-navigation__item-link');
          a.href = navLink.href;
          a.textContent = navLink.textContent;
          li.append(a);
          navUl.append(li);
        }
      });
    }

    // Country Code and Flag
    const countryCodeCell = cells[3];
    if (countryCodeCell) {
      const countryCodeSpan = countryCodeCell.querySelector('span.header-country-code');
      if (countryCodeSpan) {
        const span = document.createElement('span');
        moveInstrumentation(countryCodeSpan, span);
        span.classList.add('header-country-code');
        span.textContent = countryCodeSpan.textContent;
        searchIconDiv.append(span);
      }

      const countryFlagImg = countryCodeCell.querySelector('img.header-country-flag');
      if (countryFlagImg) {
        const img = createOptimizedPicture(countryFlagImg.src, countryFlagImg.alt);
        moveInstrumentation(countryFlagImg, img.querySelector('img'));
        img.querySelector('img').classList.add('header-country-flag');
        searchIconDiv.append(img);
      }

      const dropdownIconImg = countryCodeCell.querySelector('img.header-dropdown-icon');
      if (dropdownIconImg) {
        const img = createOptimizedPicture(dropdownIconImg.src, dropdownIconImg.alt);
        moveInstrumentation(dropdownIconImg, img.querySelector('img'));
        img.querySelector('img').classList.add('header-dropdown-icon');
        searchIconDiv.append(img);
      }
    }

    // Country Options
    const countryOptionsCell = cells[4];
    if (countryOptionsCell) {
      const countryOptions = countryOptionsCell.querySelectorAll('div.header-country-option');
      countryOptions.forEach((optionDiv) => {
        const newOptionDiv = document.createElement('div');
        moveInstrumentation(optionDiv, newOptionDiv);
        newOptionDiv.classList.add('header-country-option', 'header-mx-3', 'header-d-flex', 'header-flex-column', 'header-align-items-center');
        newOptionDiv.setAttribute('data-country', optionDiv.getAttribute('data-country'));
        newOptionDiv.setAttribute('data-url', optionDiv.getAttribute('data-url'));
        if (optionDiv.classList.contains('header-selected')) {
          newOptionDiv.classList.add('header-selected');
        }

        const flagImg = optionDiv.querySelector('img.header-country-flag');
        if (flagImg) {
          const img = createOptimizedPicture(flagImg.src, flagImg.alt);
          moveInstrumentation(flagImg, img.querySelector('img'));
          img.querySelector('img').classList.add('header-country-flag');
          if (flagImg.classList.contains('header-india-flag')) {
            img.querySelector('img').classList.add('header-india-flag');
          } else if (flagImg.classList.contains('header-usa-flag')) {
            img.querySelector('img').classList.add('header-usa-flag');
          }
          newOptionDiv.append(img);
        }

        const countryNameP = optionDiv.querySelector('p.header-country-name');
        if (countryNameP) {
          const p = document.createElement('p');
          moveInstrumentation(countryNameP, p);
          p.classList.add('header-country-name');
          p.textContent = countryNameP.textContent;
          newOptionDiv.append(p);
        }
        countryOptionsDiv.append(newOptionDiv);
      });
    }

    // Search Placeholder
    const searchPlaceholderCell = cells[5];
    if (searchPlaceholderCell) {
      const placeholderText = searchPlaceholderCell.textContent.trim();
      if (placeholderText) {
        searchInput.setAttribute('placeholder', placeholderText);
      }
    }
  });

  modalTitle.innerHTML = 'SELECT YOUR <br/>KITCHENS OF INDIA';

  block.textContent = '';
  block.append(headerSection);
}
