import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const minLength = block.querySelector('[data-aue-prop="minLength"]')?.textContent || '3';
  const resultsDesktopSize = block.querySelector('[data-aue-prop="resultsDesktopSize"]')?.textContent || '8';
  const resultsMobileSize = block.querySelector('[data-aue-prop="resultsMobileSize"]')?.textContent || '5';
  const inputPlaceholder = block.querySelector('[data-aue-prop="inputPlaceholder"]')?.textContent || 'Start Typing...';
  const noResultsTitle = block.querySelector('[data-aue-prop="noResultsTitle"]')?.textContent || 'Sorry, we cannot find what you are looking for :(';
  const noResultsDescription = block.querySelector('[data-aue-prop="noResultsDescription"]')?.textContent || 'Please try a new search term or browse through one of our product categories.';

  const categoriesData = [];
  const categoryElements = block.querySelectorAll('[data-aue-model="searchCategory"]');
  categoryElements.forEach((categoryEl) => {
    const categoryName = categoryEl.querySelector('[data-aue-prop="categoryName"]')?.textContent || '';
    const categoryURL = categoryEl.querySelector('[data-aue-prop="categoryURL"]')?.textContent || '';
    if (categoryName && categoryURL) {
      categoriesData.push({
        categoryName,
        categoryURL,
      });
    }
  });

  const errorResponse = {
    noResultsTitle,
    noResultsDescription,
    categories: categoriesData,
  };

  const section = document.createElement('section');
  section.id = `search-${Math.random().toString(36).substring(2, 11)}`; // Generate a unique ID
  section.className = 'search-search';
  section.role = 'search';
  section.dataset.cmpMinLength = minLength;
  section.dataset.cmpResultsDesktopSize = resultsDesktopSize;
  section.dataset.cmpResultsMobileSize = resultsMobileSize;
  section.dataset.errorResponse = JSON.stringify(errorResponse);
  section.dataset.inputPlaceholder = inputPlaceholder;

  const infoDiv = document.createElement('div');
  infoDiv.className = 'search-search__info';
  infoDiv.setAttribute('aria-live', 'polite');
  infoDiv.setAttribute('role', 'status');
  section.append(infoDiv);
  moveInstrumentation(block.querySelector('.search-search__info'), infoDiv);

  const form = document.createElement('form');
  form.className = 'search-search__form';
  form.dataset.cmpHookSearch = 'form';
  form.method = 'get';
  form.action = '/content/itc-foods-brands/yippee/us/en.customsearchresults.json/_jcr_content/root/search';
  form.autocomplete = 'off';

  const inputHidden = document.createElement('input');
  inputHidden.type = 'hidden';
  inputHidden.id = 'searchroot';
  inputHidden.name = 'searchroot';
  inputHidden.value = '/content/itc-foods-brands/yippee/us/en';
  form.append(inputHidden);
  moveInstrumentation(block.querySelector('input[type="hidden"]'), inputHidden);

  const fieldDiv = document.createElement('div');
  fieldDiv.className = 'search-search__field';

  const searchIcon = document.createElement('i');
  searchIcon.className = 'search-search__icon';
  searchIcon.dataset.cmpHookSearch = 'icon';
  fieldDiv.append(searchIcon);
  moveInstrumentation(block.querySelector('.search-search__icon'), searchIcon);

  const loadingIndicator = document.createElement('span');
  loadingIndicator.className = 'search-search__loading-indicator';
  loadingIndicator.dataset.cmpHookSearch = 'loadingIndicator';
  fieldDiv.append(loadingIndicator);
  moveInstrumentation(block.querySelector('.search-search__loading-indicator'), loadingIndicator);

  const input = document.createElement('input');
  input.className = 'search-search__input';
  input.dataset.cmpHookSearch = 'input';
  input.type = 'text';
  input.name = 'fulltext';
  input.placeholder = inputPlaceholder;
  input.role = 'combobox';
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-haspopup', 'true');
  input.setAttribute('aria-invalid', 'false');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-owns', 'cmp-search-results-0');
  fieldDiv.append(input);
  moveInstrumentation(block.querySelector('.search-search__input'), input);

  const clearButton = document.createElement('button');
  clearButton.className = 'search-search__clear';
  clearButton.dataset.cmpHookSearch = 'clear';
  clearButton.setAttribute('aria-label', 'Clear');

  const clearIcon = document.createElement('i');
  clearIcon.className = 'search-search__clear-icon';
  clearButton.append(clearIcon);
  fieldDiv.append(clearButton);
  moveInstrumentation(block.querySelector('.search-search__clear'), clearButton);

  form.append(fieldDiv);
  section.append(form);

  const resultsDiv = document.createElement('div');
  resultsDiv.className = 'search-search__results';
  resultsDiv.setAttribute('aria-label', 'Search results');
  resultsDiv.dataset.cmpHookSearch = 'results';
  resultsDiv.setAttribute('role', 'listbox');
  resultsDiv.setAttribute('aria-multiselectable', 'false');
  resultsDiv.id = 'cmp-search-results-0';
  section.append(resultsDiv);
  moveInstrumentation(block.querySelector('.search-search__results'), resultsDiv);

  const scriptTemplate = document.createElement('script');
  scriptTemplate.dataset.cmpHookSearch = 'itemTemplate';
  scriptTemplate.type = 'x-template';
  scriptTemplate.textContent = `
  <a class="search__item" data-cmp-hook-search="item" role="option" aria-selected="false">
      <span class="search__item-title" data-cmp-hook-search="itemTitle"></span>
  </a>
`;
  section.append(scriptTemplate);
  moveInstrumentation(block.querySelector('script[data-cmp-hook-search="itemTemplate"]'), scriptTemplate);

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
