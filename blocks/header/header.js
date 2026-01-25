import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const header = document.createElement('header');
  header.className = 'header-itc-header-section';

  const headerContainer = document.createElement('div');
  headerContainer.className = 'header-container';

  const nav = document.createElement('nav');
  nav.className = 'header-navbar header-navbar-expand-xl header-navbar-light header-bg-light header-px-xl-5 header-d-flex header-justify-content-between header-align-items-center';

  const navToggler = document.createElement('button');
  navToggler.className = 'header-navbar-toggler header-collapsed';
  navToggler.type = 'button';
  navToggler.setAttribute('data-toggle', 'collapse');
  navToggler.setAttribute('data-target', '#navbarSupportedContent');
  navToggler.setAttribute('aria-controls', 'navbarSupportedContent');
  navToggler.setAttribute('aria-expanded', 'false');
  navToggler.setAttribute('aria-label', 'Toggle navigation');
  const togglerIcon = document.createElement('span');
  togglerIcon.className = 'header-navbar-toggler-icon';
  navToggler.append(togglerIcon);
  nav.append(navToggler);

  const dXlNone = document.createElement('div');
  dXlNone.className = 'header-d-xl-none';
  dXlNone.innerHTML = '&nbsp;';
  nav.append(dXlNone);

  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-logo header-image';
  const logoImageField = block.querySelector('[data-aue-prop="logoImage"]');
  const logoLinkField = block.querySelector('[data-aue-prop="logoLink"]');

  if (logoImageField) {
    const logoLink = document.createElement('a');
    logoLink.className = 'header-cmp-image__link';
    logoLink.target = '_blank';
    if (logoLinkField) {
      const link = logoLinkField.querySelector('a');
      if (link) { 
        logoLink.href = link.href;
        moveInstrumentation(link, logoLink);
      } else {
        logoLink.href = logoLinkField.textContent.trim();
      }
      moveInstrumentation(logoLinkField, logoLink);
    }
    
    const imgElement = logoImageField.querySelector('img');
    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt);
      logoLink.append(picture);
      moveInstrumentation(imgElement, picture);
    }
    logoDiv.append(logoLink);
    moveInstrumentation(logoImageField, logoDiv);
  }
  nav.append(logoDiv);

  const navbarCollapse = document.createElement('div');
  navbarCollapse.className = 'header-collapse header-navbar-collapse header-justify-content-center';
  navbarCollapse.id = 'navbarSupportedContent';

  const navItemNavigation = document.createElement('div');
  navItemNavigation.className = 'header-nav-item header-navigation';
  const navigationNav = document.createElement('nav');
  navigationNav.id = 'navigation-6d5dcb0126';
  navigationNav.className = 'header-cmp-navigation';
  navigationNav.setAttribute('itemscope', '');
  navigationNav.setAttribute('itemtype', 'http://schema.org/SiteNavigationElement');
  navigationNav.setAttribute('role', 'navigation');
  const navigationUl = document.createElement('ul');
  navigationUl.className = 'header-cmp-navigation__group';

  const navigationLinks = block.querySelectorAll('[data-aue-model="navigationLink"]');
  navigationLinks.forEach((linkNode) => {
    const li = document.createElement('li');
    li.className = 'header-cmp-navigation__item header-cmp-navigation__item--level-0';
    const linkField = linkNode.querySelector('[data-aue-prop="link"]');
    const labelField = linkNode.querySelector('[data-aue-prop="label"]');
    if (linkField) {
      const a = document.createElement('a');
      a.className = 'header-cmp-navigation__item-link';
      const link = linkField.querySelector('a');
      if (link) {
        a.href = link.href;
        a.textContent = labelField ? labelField.textContent.trim() : link.textContent.trim();
        moveInstrumentation(link, a);
      } else {
        a.href = linkField.textContent.trim();
        a.textContent = labelField ? labelField.textContent.trim() : linkField.textContent.trim();
      }
      li.append(a);
      moveInstrumentation(linkField, li);
      if (labelField) moveInstrumentation(labelField, li);
    }
    navigationUl.append(li);
    moveInstrumentation(linkNode, li);
  });
  navigationNav.append(navigationUl);
  navItemNavigation.append(navigationNav);
  navbarCollapse.append(navItemNavigation);

  const headerSection = document.createElement('div');
  headerSection.className = 'header-header-section header-d-flex header-align-items-center header-justify-content-end';

  const searchIconDiv = document.createElement('div');
  searchIconDiv.className = 'header-search-icon header-country-selector-trigger header-d-flex header-align-items-center';
  searchIconDiv.setAttribute('data-toggle', 'modal');
  searchIconDiv.setAttribute('data-target', '#countryModal');

  const countryCodeSpan = document.createElement('span');
  countryCodeSpan.className = 'header-country-code';
  const countryCodeField = block.querySelector('[data-aue-prop="countryCode"]');
  if (countryCodeField) {
    countryCodeSpan.textContent = countryCodeField.textContent.trim();
    moveInstrumentation(countryCodeField, countryCodeSpan);
  }
  searchIconDiv.append(countryCodeSpan);

  const countryFlagImg = document.createElement('img');
  countryFlagImg.className = 'header-header-country-flag';
  countryFlagImg.alt = 'flag';
  const countryFlagIconField = block.querySelector('[data-aue-prop="countryFlagIcon"]');
  if (countryFlagIconField) {
    const img = countryFlagIconField.querySelector('img');
    if (img) {
      countryFlagImg.src = img.src;
      searchIconDiv.setAttribute('data-flag-in', img.src);
      moveInstrumentation(img, countryFlagImg);
    } else {
      countryFlagImg.src = countryFlagIconField.textContent.trim();
      searchIconDiv.setAttribute('data-flag-in', countryFlagIconField.textContent.trim());
    }
    moveInstrumentation(countryFlagIconField, searchIconDiv);
  }
  searchIconDiv.append(countryFlagImg);

  const dropdownIcon = document.createElement('img');
  dropdownIcon.src = '/content/dam/aemigrate/uploaded-folder/image/dropdown-icon.png';
  dropdownIcon.alt = 'dropdown-icon';
  dropdownIcon.className = 'header-dropdown-icon';
  searchIconDiv.append(dropdownIcon);

  headerSection.append(searchIconDiv);
  navbarCollapse.append(headerSection);
  nav.append(navbarCollapse);

  const itcHeaderIconList = document.createElement('div');
  itcHeaderIconList.className = 'header-itc-header-icon-list';

  // Search block (static part)
  const searchBlock = document.createElement('div');
  searchBlock.id = 'searchBlock';
  searchBlock.className = 'header-search-block header-hidden';
  searchBlock.innerHTML = `
    <div id="searchBox" class="header-search-box">    
        <div id="searchContainer" class="header-search-container header-hidden">
            <input type="text" id="searchInput" placeholder="Search">
            <button id="searchButton">
                <img loading="lazy" src="/content/dam/aemigrate/uploaded-folder/image/search-icon.png" alt="Search icon">
            </button>
        </div>
        <img id="closeButton" loading="lazy" src="/content/dam/aemigrate/uploaded-folder/image/1766399720915.svg+xml" alt="Close icon">
    </div>
    <div id="searchResults" class="header-search-results header-hidden">
        <h4 class="header-resultList">Popular Suggestions</h4>
        <ul id="suggestionsList"></ul>
        <h4 class="header-resultList">Pages</h4>
        <ul id="productsList" class="header-products"></ul>
        <button id="viewAllButton">VIEW ALL ITEMS</button>
    </div>
  `;
  itcHeaderIconList.append(searchBlock);

  const searchNavLink = document.createElement('a');
  searchNavLink.className = 'header-nav-link';
  const searchIconImg = document.createElement('img');
  searchIconImg.id = 'searchIcon';
  searchIconImg.loading = 'lazy';
  searchIconImg.alt = 'Search icon';
  const searchIconField = block.querySelector('[data-aue-prop="searchIcon"]');
  if (searchIconField) {
    const img = searchIconField.querySelector('img');
    if (img) {
      searchIconImg.src = img.src;
      moveInstrumentation(img, searchIconImg);
    } else {
      searchIconImg.src = searchIconField.textContent.trim();
    }
    moveInstrumentation(searchIconField, searchNavLink);
  }
  searchNavLink.append(searchIconImg);
  const searchSpan = document.createElement('span');
  searchSpan.className = 'header-d-block';
  searchSpan.textContent = 'Search';
  searchNavLink.append(searchSpan);
  itcHeaderIconList.append(searchNavLink);

  const navItem = document.createElement('li');
  navItem.className = 'header-nav-item';
  const navLink = document.createElement('a');
  navLink.className = 'header-nav-link';
  navItem.append(navLink);
  itcHeaderIconList.append(navItem);

  nav.append(itcHeaderIconList);
  headerContainer.append(nav);
  header.append(headerContainer);

  // Country Modal
  const countryModal = document.createElement('div');
  countryModal.className = 'header-modal header-fade header-itc-country-selector header-show';
  countryModal.id = 'countryModal';
  countryModal.tabIndex = '-1';
  countryModal.setAttribute('role', 'dialog');
  countryModal.setAttribute('aria-labelledby', 'countryModalLabel');
  countryModal.setAttribute('aria-modal', 'true');
  countryModal.style.display = 'block';

  const modalDialog = document.createElement('div');
  modalDialog.className = 'header-modal-dialog header-modal-dialog-centered';
  modalDialog.setAttribute('role', 'document');
  const modalContent = document.createElement('div');
  modalContent.className = 'header-modal-content';
  const modalHeader = document.createElement('div');
  modalHeader.className = 'header-modal-header header-border-0 header-text-center';
  const headerW100 = document.createElement('div');
  headerW100.className = 'header-w-100';
  const modalTitle = document.createElement('h2');
  modalTitle.className = 'header-modal-title';
  modalTitle.innerHTML = 'SELECT YOUR <br>KITCHENS OF INDIA';
  const experienceText = document.createElement('p');
  experienceText.className = 'header-experience-text';
  experienceText.textContent = 'Experience';
  headerW100.append(modalTitle, experienceText);
  modalHeader.append(headerW100);
  modalContent.append(modalHeader);

  const modalBody = document.createElement('div');
  modalBody.className = 'header-modal-body';
  const countryOptionsDiv = document.createElement('div');
  countryOptionsDiv.className = 'header-country-options header-d-flex header-justify-content-center header-align-items-center';

  const countryOptions = block.querySelectorAll('[data-aue-model="countryOption"]');
  countryOptions.forEach((optionNode) => {
    const countryOptionDiv = document.createElement('div');
    countryOptionDiv.className = 'header-country-option header-mx-3 header-d-flex header-flex-column header-align-items-center';

    const countryNameField = optionNode.querySelector('[data-aue-prop="countryName"]');
    const countryUrlField = optionNode.querySelector('[data-aue-prop="countryUrl"]');
    const flagImageField = optionNode.querySelector('[data-aue-prop="flagImage"]');

    if (countryNameField) {
      const countryName = countryNameField.textContent.trim().toLowerCase();
      countryOptionDiv.setAttribute('data-country', countryName);
      if (countryUrlField) {
        countryOptionDiv.setAttribute('data-url', countryUrlField.textContent.trim());
        moveInstrumentation(countryUrlField, countryOptionDiv);
      }
      if (countryName === 'india') {
        countryOptionDiv.classList.add('header-selected');
      }

      const flagImg = document.createElement('img');
      flagImg.className = `header-country-flag header-${countryName}-flag`;
      flagImg.alt = `${countryName.charAt(0).toUpperCase() + countryName.slice(1)} Flag`;

      if (flagImageField) {
        const img = flagImageField.querySelector('img');
        if (img) {
          flagImg.src = img.src;
          moveInstrumentation(img, flagImg);
        } else {
          flagImg.src = flagImageField.textContent.trim();
        }
        moveInstrumentation(flagImageField, countryOptionDiv);
      }
      countryOptionDiv.append(flagImg);

      const countryNameP = document.createElement('p');
      countryNameP.className = 'header-country-name';
      countryNameP.textContent = countryNameField.textContent.trim();
      countryOptionDiv.append(countryNameP);
      moveInstrumentation(countryNameField, countryOptionDiv);
    }
    countryOptionsDiv.append(countryOptionDiv);
    moveInstrumentation(optionNode, countryOptionDiv);
  });

  modalBody.append(countryOptionsDiv);
  modalContent.append(modalBody);
  modalDialog.append(modalContent);
  countryModal.append(modalDialog);
  header.append(countryModal);

  block.textContent = '';
  block.append(header);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}