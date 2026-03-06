import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('header');
  moveInstrumentation(block, headerSection);
  headerSection.className = 'header-itc-header-section';

  const headerContainer = document.createElement('div');
  headerContainer.className = 'header-container';
  headerSection.append(headerContainer);

  const navBar = document.createElement('nav');
  navBar.className = 'header-navbar header-navbar-expand-xl header-navbar-light header-bg-light header-px-xl-5 header-d-flex header-justify-content-between header-align-items-center';
  headerContainer.append(navBar);

  const togglerButton = document.createElement('button');
  togglerButton.className = 'header-navbar-toggler header-collapsed';
  togglerButton.type = 'button';
  togglerButton.setAttribute('data-toggle', 'collapse');
  togglerButton.setAttribute('data-target', '#navbarSupportedContent');
  togglerButton.setAttribute('aria-controls', 'navbarSupportedContent');
  togglerButton.setAttribute('aria-expanded', 'false');
  togglerButton.setAttribute('aria-label', 'Toggle navigation');
  togglerButton.innerHTML = '<span class="header-navbar-toggler-icon"></span>';
  navBar.append(togglerButton);

  const dXlNoneDiv = document.createElement('div');
  dXlNoneDiv.className = 'header-d-xl-none';
  dXlNoneDiv.innerHTML = '&nbsp;';
  navBar.append(dXlNoneDiv);

  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.className = 'header-logo header-image';
  navBar.append(headerLogoDiv);

  const logoDiv = document.createElement('div');
  logoDiv.setAttribute('data-cmp-is', 'image');
  logoDiv.setAttribute('data-cmp-hook-image', 'imageV3');
  logoDiv.id = 'logo-5a4887d867';
  logoDiv.className = 'header-cmp-image header-header-logo-div';
  logoDiv.setAttribute('itemscope', '');
  logoDiv.setAttribute('itemtype', 'http://schema.org/ImageObject');
  headerLogoDiv.append(logoDiv);

  const logoLinkIdInput = document.createElement('input');
  logoLinkIdInput.type = 'hidden';
  logoLinkIdInput.id = 'logoLinkId';
  logoDiv.append(logoLinkIdInput);

  const headerCheckLogoLink = document.createElement('a');
  headerCheckLogoLink.className = 'header-checkLogoLink';
  headerCheckLogoLink.target = '_blank';
  logoDiv.append(headerCheckLogoLink);

  const headerCmpImageLink = document.createElement('a');
  headerCmpImageLink.className = 'header-cmp-image__link';
  headerCmpImageLink.target = '_blank';
  logoDiv.append(headerCmpImageLink);

  const navContentDiv = document.createElement('div');
  navContentDiv.className = 'header-collapse header-navbar-collapse header-justify-content-center';
  navContentDiv.id = 'navbarSupportedContent';
  navBar.append(navContentDiv);

  const navItemNavigationDiv = document.createElement('div');
  navItemNavigationDiv.className = 'header-nav-item header-navigation';
  navContentDiv.append(navItemNavigationDiv);

  const cmpNavigationNav = document.createElement('nav');
  cmpNavigationNav.id = 'navigation-6d5dcb0126';
  cmpNavigationNav.className = 'header-cmp-navigation';
  cmpNavigationNav.setAttribute('itemscope', '');
  cmpNavigationNav.setAttribute('itemtype', 'http://schema.org/SiteNavigationElement');
  cmpNavigationNav.setAttribute('role', 'navigation');
  navItemNavigationDiv.append(cmpNavigationNav);

  const navigationUl = document.createElement('ul');
  navigationUl.className = 'header-cmp-navigation__group';
  cmpNavigationNav.append(navigationUl);

  const headerSectionDiv = document.createElement('div');
  headerSectionDiv.className = 'header-header-section header-d-flex header-align-items-center header-justify-content-end';
  navContentDiv.append(headerSectionDiv);

  const searchIconCountrySelectorTrigger = document.createElement('div');
  searchIconCountrySelectorTrigger.className = 'header-search-icon header-country-selector-trigger header-d-flex header-align-items-center';
  searchIconCountrySelectorTrigger.setAttribute('data-toggle', 'modal');
  searchIconCountrySelectorTrigger.setAttribute('data-target', '#countryModal');
  headerSectionDiv.append(searchIconCountrySelectorTrigger);

  const headerItcHeaderIconList = document.createElement('div');
  headerItcHeaderIconList.className = 'header-itc-header-icon-list';
  navBar.append(headerItcHeaderIconList);

  const searchBlock = document.createElement('div');
  searchBlock.id = 'searchBlock';
  searchBlock.className = 'header-search-block header-hidden';
  headerItcHeaderIconList.append(searchBlock);

  const searchBox = document.createElement('div');
  searchBox.id = 'searchBox';
  searchBox.className = 'header-search-box';
  searchBlock.append(searchBox);

  const searchContainer = document.createElement('div');
  searchContainer.id = 'searchContainer';
  searchContainer.className = 'header-search-container header-hidden';
  searchBox.append(searchContainer);

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.id = 'searchInput';
  searchInput.placeholder = 'Search';
  searchContainer.append(searchInput);

  const searchButton = document.createElement('button');
  searchButton.id = 'searchButton';
  searchContainer.append(searchButton);

  const closeButton = document.createElement('img');
  closeButton.id = 'closeButton';
  closeButton.loading = 'lazy';
  closeButton.alt = 'Close icon';
  searchBox.append(closeButton);

  const searchResults = document.createElement('div');
  searchResults.id = 'searchResults';
  searchResults.className = 'header-search-results header-hidden';
  searchBlock.append(searchResults);

  const resultListH4 = document.createElement('h4');
  resultListH4.className = 'header-resultList';
  resultListH4.textContent = 'Popular Suggestions';
  searchResults.append(resultListH4);

  const suggestionsListUl = document.createElement('ul');
  suggestionsListUl.id = 'suggestionsList';
  searchResults.append(suggestionsListUl);

  const resultListH4Pages = document.createElement('h4');
  resultListH4Pages.className = 'header-resultList';
  resultListH4Pages.textContent = 'Pages';
  searchResults.append(resultListH4Pages);

  const productsListUl = document.createElement('ul');
  productsListUl.id = 'productsList';
  productsListUl.className = 'header-products';
  searchResults.append(productsListUl);

  const viewAllButton = document.createElement('button');
  viewAllButton.id = 'viewAllButton';
  viewAllButton.textContent = 'VIEW ALL ITEMS';
  searchResults.append(viewAllButton);

  const searchNavLink = document.createElement('a');
  searchNavLink.className = 'header-nav-link';
  headerItcHeaderIconList.append(searchNavLink);

  const searchIconImg = document.createElement('img');
  searchIconImg.loading = 'lazy';
  searchIconImg.id = 'searchIcon';
  searchIconImg.alt = 'Search icon';
  searchNavLink.append(searchIconImg);

  const searchSpan = document.createElement('span');
  searchSpan.className = 'header-d-block';
  searchSpan.textContent = 'Search';
  searchNavLink.append(searchSpan);

  const navItemLi = document.createElement('li');
  navItemLi.className = 'header-nav-item';
  headerItcHeaderIconList.append(navItemLi);

  const navItemLink = document.createElement('a');
  navItemLink.className = 'header-nav-link';
  navItemLi.append(navItemLink);

  const modalDiv = document.createElement('div');
  modalDiv.className = 'header-modal header-fade header-itc-country-selector header-show';
  modalDiv.id = 'countryModal';
  modalDiv.tabIndex = '-1';
  modalDiv.setAttribute('role', 'dialog');
  modalDiv.setAttribute('aria-labelledby', 'countryModalLabel');
  modalDiv.setAttribute('aria-modal', 'true');
  modalDiv.style.display = 'block';
  headerSection.append(modalDiv);

  const modalDialog = document.createElement('div');
  modalDialog.className = 'header-modal-dialog header-modal-dialog-centered';
  modalDialog.setAttribute('role', 'document');
  modalDiv.append(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.className = 'header-modal-content';
  modalDialog.append(modalContent);

  const modalHeader = document.createElement('div');
  modalHeader.className = 'header-modal-header header-border-0 header-text-center';
  modalContent.append(modalHeader);

  const w100Div = document.createElement('div');
  w100Div.className = 'header-w-100';
  modalHeader.append(w100Div);

  const modalTitle = document.createElement('h2');
  modalTitle.className = 'header-modal-title';
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  w100Div.append(modalTitle);

  const experienceText = document.createElement('p');
  experienceText.className = 'header-experience-text';
  experienceText.textContent = 'Experience';
  w100Div.append(experienceText);

  const modalBody = document.createElement('div');
  modalBody.className = 'header-modal-body';
  modalContent.append(modalBody);

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.className = 'header-country-options header-d-flex header-justify-content-center header-align-items-center';
  modalBody.append(countryOptionsDiv);

  // Process block children
  [...block.children].forEach((row) => {
    moveInstrumentation(row, headerSection);
    const cells = [...row.children];

    // Logo Image and Link
    const logoImageCell = cells[0];
    if (logoImageCell) {
      const img = logoImageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '131' }]);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        headerCmpImageLink.append(optimizedPic);
        headerCmpImageLink.href = logoImageCell.querySelector('a')?.href || '/';
        headerCmpImageLink.querySelector('img').width = '131';
        headerCmpImageLink.querySelector('img').height = '71';
        headerCmpImageLink.querySelector('img').alt = img.alt;
        headerCmpImageLink.querySelector('img').className = 'header-cmp-image__image';
        headerCmpImageLink.querySelector('img').setAttribute('itemprop', 'contentUrl');
        headerCmpImageLink.querySelector('img').loading = 'lazy';

        const screenReaderSpan = document.createElement('span');
        screenReaderSpan.className = 'header-cmp-link__screen-reader-only';
        screenReaderSpan.textContent = 'opens in a new tab';
        headerCmpImageLink.append(screenReaderSpan);

        // For the first logo link that contains the SVG
        const svgImg = logoImageCell.querySelector('img[src*=".svg"]');
        if (svgImg) {
          const svgOptimizedPic = createOptimizedPicture(svgImg.src, svgImg.alt);
          moveInstrumentation(svgImg, svgOptimizedPic.querySelector('img'));
          headerCheckLogoLink.append(svgOptimizedPic);
          headerCheckLogoLink.querySelector('img').className = 'header-cmp-image__image header-itc-logo-image';
          headerCheckLogoLink.querySelector('img').setAttribute('itemprop', 'contentUrl');
          headerCheckLogoLink.querySelector('img').loading = 'lazy';

          const svgScreenReaderSpan = document.createElement('span');
          svgScreenReaderSpan.className = 'header-cmp-link__screen-reader-only';
          svgScreenReaderSpan.textContent = 'opens in a new tab';
          headerCheckLogoLink.append(svgScreenReaderSpan);
        }

        const logoLinkInput = logoImageCell.querySelector('input');
        if (logoLinkInput) {
          logoLinkIdInput.value = logoLinkInput.value;
        }
      }
    }

    // Navigation Links
    const navigationLinksCell = cells[1];
    if (navigationLinksCell) {
      [...navigationLinksCell.children].forEach((linkRow) => {
        const link = linkRow.querySelector('a');
        if (link) {
          const li = document.createElement('li');
          li.className = 'header-cmp-navigation__item header-cmp-navigation__item--level-0';
          moveInstrumentation(linkRow, li);

          const a = document.createElement('a');
          a.className = 'header-cmp-navigation__item-link';
          a.href = link.href;
          a.textContent = link.textContent;
          li.append(a);
          navigationUl.append(li);
        }
      });
    }

    // Search Icon
    const searchIconCell = cells[2];
    if (searchIconCell) {
      const img = searchIconCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        searchIconImg.src = optimizedPic.querySelector('img').src;
        searchIconImg.alt = optimizedPic.querySelector('img').alt;
      }

      const closeImg = searchIconCell.querySelector('img[alt="Close icon"]');
      if (closeImg) {
        const optimizedClosePic = createOptimizedPicture(closeImg.src, closeImg.alt);
        moveInstrumentation(closeImg, optimizedClosePic.querySelector('img'));
        closeButton.src = optimizedClosePic.querySelector('img').src;
        closeButton.alt = optimizedClosePic.querySelector('img').alt;
      }

      const searchButtonImg = searchIconCell.querySelector('button img');
      if (searchButtonImg) {
        const optimizedSearchButtonPic = createOptimizedPicture(searchButtonImg.src, searchButtonImg.alt);
        moveInstrumentation(searchButtonImg, optimizedSearchButtonPic.querySelector('img'));
        searchButton.append(optimizedSearchButtonPic);
      }
    }

    // Country Options
    const countryOptionsCell = cells[3];
    if (countryOptionsCell) {
      const countryCodeSpan = document.createElement('span');
      countryCodeSpan.className = 'header-country-code';
      searchIconCountrySelectorTrigger.append(countryCodeSpan);

      const countryFlagImg = document.createElement('img');
      countryFlagImg.className = 'header-header-country-flag';
      countryFlagImg.alt = 'flag';
      searchIconCountrySelectorTrigger.append(countryFlagImg);

      const dropdownIconImg = document.createElement('img');
      dropdownIconImg.className = 'header-dropdown-icon';
      dropdownIconImg.alt = 'dropdown-icon';
      searchIconCountrySelectorTrigger.append(dropdownIconImg);

      [...countryOptionsCell.children].forEach((countryRow) => {
        const countryFlagImgSrc = countryRow.querySelector('img')?.src;
        const countryFlagImgAlt = countryRow.querySelector('img')?.alt;
        const countryName = countryRow.querySelector('p')?.textContent;
        const countryUrl = countryRow.querySelector('div[data-url]')?.getAttribute('data-url');
        const countryData = countryRow.querySelector('div[data-country]')?.getAttribute('data-country');

        if (countryFlagImgSrc && countryName && countryUrl && countryData) {
          const countryOptionDiv = document.createElement('div');
          countryOptionDiv.className = `header-country-option header-mx-3 header-d-flex header-flex-column header-align-items-center ${countryData === 'india' ? 'header-selected' : ''}`;
          countryOptionDiv.setAttribute('data-country', countryData);
          countryOptionDiv.setAttribute('data-url', countryUrl);
          moveInstrumentation(countryRow, countryOptionDiv);

          const flagImg = createOptimizedPicture(countryFlagImgSrc, countryFlagImgAlt);
          moveInstrumentation(countryRow.querySelector('img'), flagImg.querySelector('img'));
          flagImg.querySelector('img').className = `header-country-flag header-${countryData}-flag`;
          countryOptionDiv.append(flagImg);

          const p = document.createElement('p');
          p.className = 'header-country-name';
          p.textContent = countryName;
          countryOptionDiv.append(p);

          countryOptionsDiv.append(countryOptionDiv);

          // Set initial country display
          if (countryData === 'india') {
            countryCodeSpan.textContent = 'IN';
            countryFlagImg.src = flagImg.querySelector('img').src;
            countryFlagImg.alt = countryFlagImgAlt;
            searchIconCountrySelectorTrigger.setAttribute('data-flag-in', flagImg.querySelector('img').src);
          } else if (countryData === 'usa') {
            searchIconCountrySelectorTrigger.setAttribute('data-flag-usa', flagImg.querySelector('img').src);
          }

          const dropdownIcon = countryOptionsCell.querySelector('img[alt="dropdown-icon"]');
          if (dropdownIcon) {
            const optimizedDropdownPic = createOptimizedPicture(dropdownIcon.src, dropdownIcon.alt);
            moveInstrumentation(dropdownIcon, optimizedDropdownPic.querySelector('img'));
            dropdownIconImg.src = optimizedDropdownPic.querySelector('img').src;
            dropdownIconImg.alt = optimizedDropdownPic.querySelector('img').alt;
          }
        }
      });
    }
  });

  block.textContent = '';
  block.append(headerSection);
}
