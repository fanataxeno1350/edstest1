import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const headerSection = document.createElement('header');
  headerSection.className = 'header-itc-header-section';
  moveInstrumentation(block, headerSection);

  const headerContainer = document.createElement('div');
  headerContainer.className = 'header-container';
  headerSection.append(headerContainer);

  const navbar = document.createElement('nav');
  navbar.className = 'header-navbar header-navbar-expand-xl header-navbar-light header-bg-light header-px-xl-5 header-d-flex header-justify-content-between header-align-items-center';
  headerContainer.append(navbar);

  const toggleButton = document.createElement('button');
  toggleButton.className = 'header-navbar-toggler header-collapsed';
  toggleButton.type = 'button';
  toggleButton.setAttribute('data-toggle', 'collapse');
  toggleButton.setAttribute('data-target', '#navbarSupportedContent');
  toggleButton.setAttribute('aria-controls', 'navbarSupportedContent');
  toggleButton.setAttribute('aria-expanded', 'false');
  toggleButton.setAttribute('aria-label', 'Toggle navigation');
  toggleButton.innerHTML = '<span class="header-navbar-toggler-icon"></span>';
  navbar.append(toggleButton);

  const spacerDiv = document.createElement('div');
  spacerDiv.className = 'header-d-xl-none';
  spacerDiv.innerHTML = '&nbsp;';
  navbar.append(spacerDiv);

  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-logo header-image';
  navbar.append(logoDiv);

  const logoImageDiv = document.createElement('div');
  logoImageDiv.setAttribute('data-cmp-is', 'image');
  logoImageDiv.id = 'logo-5a4887d867';
  logoImageDiv.className = 'header-cmp-image header-logo-div';
  logoImageDiv.setAttribute('itemscope', '');
  logoImageDiv.setAttribute('itemtype', 'http://schema.org/ImageObject');
  logoDiv.append(logoImageDiv);

  const logoLinkInput = document.createElement('input');
  logoLinkInput.type = 'hidden';
  logoLinkInput.id = 'logoLinkId';
  logoImageDiv.append(logoLinkInput);

  const checkLogoLink = document.createElement('a');
  checkLogoLink.target = '_blank';
  checkLogoLink.className = 'header-checkLogoLink';
  logoImageDiv.append(checkLogoLink);

  const itcLogoImg = document.createElement('img');
  itcLogoImg.loading = 'lazy';
  itcLogoImg.className = 'header-cmp-image__image header-itc-logo-image';
  itcLogoImg.setAttribute('itemprop', 'contentUrl');
  checkLogoLink.append(itcLogoImg);
  checkLogoLink.append(document.createElement('span')).className = 'header-cmp-link__screen-reader-only';
  checkLogoLink.lastChild.textContent = 'opens in a new tab';

  const kitchensOfIndiaLogoLink = document.createElement('a');
  kitchensOfIndiaLogoLink.className = 'header-cmp-image__link';
  kitchensOfIndiaLogoLink.href = '/';
  kitchensOfIndiaLogoLink.target = '_blank';
  logoImageDiv.append(kitchensOfIndiaLogoLink);

  const kitchensOfIndiaLogoImg = document.createElement('img');
  kitchensOfIndiaLogoImg.loading = 'lazy';
  kitchensOfIndiaLogoImg.className = 'header-cmp-image__image';
  kitchensOfIndiaLogoImg.setAttribute('itemprop', 'contentUrl');
  kitchensOfIndiaLogoImg.alt = 'Kitchens of India';
  kitchensOfIndiaLogoLink.append(kitchensOfIndiaLogoImg);
  kitchensOfIndiaLogoLink.append(document.createElement('span')).className = 'header-cmp-link__screen-reader-only';
  kitchensOfIndiaLogoLink.lastChild.textContent = 'opens in a new tab';

  const navbarCollapse = document.createElement('div');
  navbarCollapse.className = 'header-collapse header-navbar-collapse header-justify-content-center';
  navbarCollapse.id = 'navbarSupportedContent';
  navbar.append(navbarCollapse);

  const navItemNavigation = document.createElement('div');
  navItemNavigation.className = 'header-nav-item header-navigation';
  navbarCollapse.append(navItemNavigation);

  const navElement = document.createElement('nav');
  navElement.id = 'navigation-6d5dcb0126';
  navElement.className = 'header-cmp-navigation';
  navElement.setAttribute('itemscope', '');
  navElement.setAttribute('itemtype', 'http://schema.org/SiteNavigationElement');
  navElement.setAttribute('role', 'navigation');
  navItemNavigation.append(navElement);

  const navUl = document.createElement('ul');
  navUl.className = 'header-cmp-navigation__group';
  navElement.append(navUl);

  const sectionDiv = document.createElement('div');
  sectionDiv.className = 'header-section header-d-flex header-align-items-center header-justify-content-end';
  navbarCollapse.append(sectionDiv);

  const searchIconCountrySelector = document.createElement('div');
  searchIconCountrySelector.className = 'header-search-icon header-country-selector-trigger header-d-flex header-align-items-center';
  searchIconCountrySelector.setAttribute('data-toggle', 'modal');
  searchIconCountrySelector.setAttribute('data-target', '#countryModal');
  sectionDiv.append(searchIconCountrySelector);

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.className = 'header-country-code';
  searchIconCountrySelector.append(countryCodeSpan);

  const countryFlagImg = document.createElement('img');
  countryFlagImg.className = 'header-country-flag';
  countryFlagImg.alt = 'flag';
  searchIconCountrySelector.append(countryFlagImg);

  const dropdownIconImg = document.createElement('img');
  dropdownIconImg.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIconImg.alt = 'dropdown-icon';
  dropdownIconImg.className = 'header-dropdown-icon';
  searchIconCountrySelector.append(dropdownIconImg);

  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.className = 'header-itc-header-icon-list';
  navbar.append(itcHeaderIconList);

  const searchBlock = document.createElement('div');
  searchBlock.id = 'searchBlock';
  searchBlock.className = 'header-search-block header-hidden';
  itcHeaderIconList.append(searchBlock);

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
  searchButton.innerHTML = '<img loading="lazy" src="/content/dam/aemigrate/uploaded-folder/image/search-icon.png" alt="Search icon"/>';
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

  const popularSuggestionsH4 = document.createElement('h4');
  popularSuggestionsH4.className = 'header-resultList';
  popularSuggestionsH4.textContent = 'Popular Suggestions';
  searchResults.append(popularSuggestionsH4);

  const suggestionsListUl = document.createElement('ul');
  suggestionsListUl.id = 'suggestionsList';
  searchResults.append(suggestionsListUl);

  const pagesH4 = document.createElement('h4');
  pagesH4.className = 'header-resultList';
  pagesH4.textContent = 'Pages';
  searchResults.append(pagesH4);

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
  itcHeaderIconList.append(searchNavLink);

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
  itcHeaderIconList.append(navItemLi);
  navItemLi.append(document.createElement('a')).className = 'header-nav-link';

  const countryModal = document.createElement('div');
  countryModal.className = 'header-modal header-fade header-itc-country-selector header-show';
  countryModal.id = 'countryModal';
  countryModal.tabIndex = '-1';
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
  countryModal.style.display = 'block';
  headerSection.append(countryModal);

  const modalDialog = document.createElement('div');
  modalDialog.className = 'header-modal-dialog header-modal-dialog-centered';
  modalDialog.setAttribute('role', 'document');
  countryModal.append(modalDialog);

  const modalContent = document.createElement('div');
  modalContent.className = 'header-modal-content';
  modalDialog.append(modalContent);

  const modalHeader = document.createElement('div');
  modalHeader.className = 'header-modal-header header-border-0 header-text-center';
  modalContent.append(modalHeader);

  const modalHeaderW100 = document.createElement('div');
  modalHeaderW100.className = 'header-w-100';
  modalHeader.append(modalHeaderW100);

  const modalTitle = document.createElement('h2');
  modalTitle.className = 'header-modal-title';
  modalTitle.innerHTML = 'SELECT YOUR <br/>KITCHENS OF INDIA';
  modalHeaderW100.append(modalTitle);

  const experienceText = document.createElement('p');
  experienceText.className = 'header-experience-text';
  experienceText.textContent = 'Experience';
  modalHeaderW100.append(experienceText);

  const modalBody = document.createElement('div');
  modalBody.className = 'header-modal-body';
  modalContent.append(modalBody);

  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.className = 'header-country-options header-d-flex header-justify-content-center header-align-items-center';
  modalBody.append(countryOptionsDiv);

  // Process block children
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const model = row.dataset.model;

    if (model === 'navigationItem') {
      const label = cells[0].textContent.trim();
      const link = cells[1].querySelector('a')?.href || '#';

      const li = document.createElement('li');
      li.className = 'header-cmp-navigation__item header-cmp-navigation__item--level-0';
      moveInstrumentation(row, li);

      const a = document.createElement('a');
      a.className = 'header-cmp-navigation__item-link';
      a.href = link;
      a.textContent = label;
      li.append(a);
      navUl.append(li);
    } else if (model === 'countryOption') {
      const flagSrc = cells[0].querySelector('img')?.src || '';
      const countryName = cells[1].textContent.trim();
      const countryUrl = cells[2].querySelector('a')?.href || '#';

      const countryOptionDiv = document.createElement('div');
      countryOptionDiv.className = 'header-country-option header-mx-3 header-d-flex header-flex-column header-align-items-center';
      countryOptionDiv.setAttribute('data-country', countryName.toLowerCase());
      countryOptionDiv.setAttribute('data-url', countryUrl);
      moveInstrumentation(row, countryOptionDiv);

      const flagImg = createOptimizedPicture(flagSrc, `${countryName} Flag`);
      flagImg.querySelector('img').className = `header-country-flag header-${countryName.toLowerCase()}-flag`;
      moveInstrumentation(cells[0].querySelector('img'), flagImg.querySelector('img'));
      countryOptionDiv.append(flagImg);

      const p = document.createElement('p');
      p.className = 'header-country-name';
      p.textContent = countryName;
      countryOptionDiv.append(p);

      countryOptionsDiv.append(countryOptionDiv);
    } else if (model === 'header') {
      const logoImage = cells[0].querySelector('img');
      if (logoImage) {
        const optimizedLogo = createOptimizedPicture(logoImage.src, logoImage.alt);
        moveInstrumentation(logoImage, optimizedLogo.querySelector('img'));
        itcLogoImg.src = optimizedLogo.querySelector('img').src;
        itcLogoImg.srcset = optimizedLogo.querySelector('img').srcset;
        kitchensOfIndiaLogoImg.src = optimizedLogo.querySelector('img').src;
        kitchensOfIndiaLogoImg.srcset = optimizedLogo.querySelector('img').srcset;
        kitchensOfIndiaLogoImg.width = logoImage.width;
        kitchensOfIndiaLogoImg.height = logoImage.height;
      }

      const logoLink = cells[1].querySelector('a');
      if (logoLink) {
        logoLinkInput.value = logoLink.href;
        kitchensOfIndiaLogoLink.href = logoLink.href;
      }

      const countryCode = cells[3].textContent.trim();
      if (countryCode) {
        countryCodeSpan.textContent = countryCode;
      }

      const countryFlag = cells[4].querySelector('img');
      if (countryFlag) {
        const optimizedFlag = createOptimizedPicture(countryFlag.src, countryFlag.alt);
        moveInstrumentation(countryFlag, optimizedFlag.querySelector('img'));
        countryFlagImg.src = optimizedFlag.querySelector('img').src;
        countryFlagImg.srcset = optimizedFlag.querySelector('img').srcset;
        searchIconCountrySelector.setAttribute('data-flag-in', optimizedFlag.querySelector('img').src);
        searchIconCountrySelector.setAttribute('data-flag-usa', optimizedFlag.querySelector('img').src); // Assuming two flags for now
      }

      const searchIcon = cells[6].querySelector('img');
      if (searchIcon) {
        const optimizedSearchIcon = createOptimizedPicture(searchIcon.src, searchIcon.alt);
        moveInstrumentation(searchIcon, optimizedSearchIcon.querySelector('img'));
        searchButton.querySelector('img').src = optimizedSearchIcon.querySelector('img').src;
        searchButton.querySelector('img').srcset = optimizedSearchIcon.querySelector('img').srcset;
        searchIconImg.src = optimizedSearchIcon.querySelector('img').src;
        searchIconImg.srcset = optimizedSearchIcon.querySelector('img').srcset;
        closeButton.src = optimizedSearchIcon.querySelector('img').src; // Assuming close icon is also from searchIcon for now
      }
    }
  });

  block.textContent = '';
  block.append(headerSection);
}