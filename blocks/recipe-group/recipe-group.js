import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const recipeGroupDiv = document.createElement('div');
  recipeGroupDiv.classList.add('recipe-group-cmp-recipe-group');

  // Background Image
  const backgroundImageElement = block.querySelector('[data-aue-prop="backgroundImage"]');
  if (backgroundImageElement) {
    const img = backgroundImageElement.querySelector('img');
    if (img && img.src) {
      recipeGroupDiv.style.backgroundImage = `url("${img.src}")`;
      moveInstrumentation(img, recipeGroupDiv);
    }
  }

  // Header Section
  const headerSectionDiv = document.createElement('div');
  headerSectionDiv.classList.add('recipe-group-cmp-recipe-group__header-section');
  recipeGroupDiv.append(headerSectionDiv);

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h2Title = document.createElement('h2');
    h2Title.classList.add('recipe-group-cmp-recipe-group__title', 'recipe-group-text-center', 'recipe-group-title-star-icon');
    h2Title.textContent = titleElement.textContent;
    headerSectionDiv.append(h2Title);
    moveInstrumentation(titleElement, h2Title);
  }

  const subtitleElement = block.querySelector('[data-aue-prop="subtitle"]');
  if (subtitleElement) {
    const subTitleDiv = document.createElement('div');
    subTitleDiv.classList.add('recipe-group-cmp-recipe-group__sub-title', 'recipe-group-text-center');
    subTitleDiv.textContent = subtitleElement.textContent;
    headerSectionDiv.append(subTitleDiv);
    moveInstrumentation(subtitleElement, subTitleDiv);
  }

  // Tab Group
  const tabGroupDiv = document.createElement('div');
  tabGroupDiv.classList.add('recipe-group-cmp-tab-group');
  recipeGroupDiv.append(tabGroupDiv);

  const tabGroupWrapperDiv = document.createElement('div');
  tabGroupWrapperDiv.classList.add('recipe-group-cmp-tab-group__wrapper');
  tabGroupDiv.append(tabGroupWrapperDiv);

  const tabs = block.querySelectorAll('[data-aue-model="tab"]');
  tabs.forEach((tabNode, index) => {
    const tabDiv = document.createElement('div');
    tabDiv.classList.add('recipe-group-cmp-tab-group__tab');
    if (index === 0) {
      tabDiv.classList.add('recipe-group-active');
    }

    const tabImageDiv = document.createElement('div');
    tabImageDiv.classList.add('recipe-group-cmp-tab-group__image');
    const lazyImageContainerDiv = document.createElement('div');
    lazyImageContainerDiv.classList.add('recipe-group-lazy-image-container');
    tabImageDiv.append(lazyImageContainerDiv);

    const imageElement = tabNode.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.classList.add('recipe-group-cmp-tab-group__img', 'recipe-group-lazy-image', 'recipe-group-loaded');
        lazyImageContainerDiv.append(picture);
        moveInstrumentation(img, picture);
      }
    }
    tabDiv.append(tabImageDiv);

    const tabTitleElement = tabNode.querySelector('[data-aue-prop="title"]');
    if (tabTitleElement) {
      const tabTitleDiv = document.createElement('div');
      tabTitleDiv.classList.add('recipe-group-cmp-tab-group__title', 'recipe-group-body-3');
      tabTitleDiv.textContent = tabTitleElement.textContent;
      tabDiv.append(tabTitleDiv);
      moveInstrumentation(tabTitleElement, tabTitleDiv);
    }

    if (index === 0) {
      const titleBorderWrapperDiv = document.createElement('div');
      titleBorderWrapperDiv.classList.add('recipe-group-cmp-tab-group__title-border-wrapper');
      const titleBorderDiv = document.createElement('div');
      titleBorderDiv.classList.add('recipe-group-cmp-tab-group__title-border');
      titleBorderWrapperDiv.append(titleBorderDiv);
      tabDiv.append(titleBorderWrapperDiv);
    }

    tabGroupWrapperDiv.append(tabDiv);
    moveInstrumentation(tabNode, tabDiv);
  });

  // Content Section
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('recipe-group-cmp-recipe-group__content');
  recipeGroupDiv.append(contentDiv);

  const contentTitleElement = block.querySelector('[data-aue-prop="contentTitle"]');
  if (contentTitleElement) {
    const h2ContentTitle = document.createElement('h2');
    h2ContentTitle.classList.add('recipe-group-cmp-recipe-group__content-title', 'recipe-group-text-center');
    h2ContentTitle.textContent = contentTitleElement.textContent;
    contentDiv.append(h2ContentTitle);
    moveInstrumentation(contentTitleElement, h2ContentTitle);
  }

  // Carousel for Recipes
  const carouselWrapperDiv = document.createElement('div');
  carouselWrapperDiv.classList.add('recipe-group-slickcarousel', 'recipe-group-carousel', 'recipe-group-panelcontainer');
  contentDiv.append(carouselWrapperDiv);

  const carouselDiv = document.createElement('div');
  carouselDiv.classList.add('recipe-group-cmp-carousel');
  carouselDiv.setAttribute('data-component', 'carousel');
  carouselDiv.setAttribute('data-show-infinite-scroll', 'false');
  carouselDiv.setAttribute('data-show-arrows', 'true');
  carouselDiv.setAttribute('data-show-dots', 'true');
  carouselDiv.setAttribute('data-item-count-per-slide', '3');
  carouselDiv.setAttribute('data-auto-play-is-enabled', 'false');
  carouselDiv.setAttribute('data-auto-play-speed-in-ms', '500');
  carouselDiv.setAttribute('data-reveal-next-item-partially', 'false');
  carouselDiv.setAttribute('data-show-center-zoom', 'false');
  carouselDiv.setAttribute('data-slides-to-scroll', '3');
  carouselDiv.setAttribute('data-initialized', 'true');
  carouselWrapperDiv.append(carouselDiv);

  const carouselContainerDiv = document.createElement('div');
  carouselContainerDiv.classList.add('recipe-group-cmp-carousel__container', 'recipe-group-slick-initialized', 'recipe-group-slick-slider', 'recipe-group-slick-dotted');
  carouselDiv.append(carouselContainerDiv);

  // Carousel navigation buttons (placeholders for now, actual functionality handled by external JS)
  const prevButton = document.createElement('button');
  prevButton.classList.add('recipe-group-slick-prev', 'recipe-group-slick-arrow', 'recipe-group-slick-disabled');
  prevButton.setAttribute('aria-label', 'Previous');
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('aria-disabled', 'true');
  prevButton.style.backgroundImage = 'url("/etc.clientlibs/itc-foods-brands/clientlibs/clientlib-yippee/resources/images/prev-arrow-disabled.svg")';
  prevButton.textContent = 'Previous';
  carouselContainerDiv.append(prevButton);

  const slickListDiv = document.createElement('div');
  slickListDiv.classList.add('recipe-group-slick-list', 'recipe-group-draggable');
  carouselContainerDiv.append(slickListDiv);

  const slickTrackDiv = document.createElement('div');
  slickTrackDiv.classList.add('recipe-group-slick-track');
  slickTrackDiv.style.cssText = 'opacity: 1; width: 3078px; transform: translate3d(0px, 0px, 0px);';
  slickListDiv.append(slickTrackDiv);

  const recipes = block.querySelectorAll('[data-aue-model="recipeCard"]');
  recipes.forEach((recipeNode, index) => {
    const carouselItemDiv = document.createElement('div');
    carouselItemDiv.classList.add('recipe-group-cmp-carousel__item', 'recipe-group-slick-slide');
    carouselItemDiv.setAttribute('data-slick-index', index);
    carouselItemDiv.setAttribute('aria-hidden', index !== 0 && index !== 1 && index !== 2);
    carouselItemDiv.setAttribute('tabindex', index === 0 || index === 1 || index === 2 ? '0' : '-1');
    carouselItemDiv.setAttribute('role', 'tabpanel');
    carouselItemDiv.setAttribute('id', `slick-slide3${index}`);
    if (index === 0) {
      carouselItemDiv.classList.add('recipe-group-slick-current', 'recipe-group-slick-active');
      carouselItemDiv.setAttribute('aria-describedby', `slick-slide-control3${index}`);
    } else if (index === 1 || index === 2) {
      carouselItemDiv.classList.add('recipe-group-slick-active');
    }
    carouselItemDiv.style.width = '342px';

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('recipe-group-card', 'recipe-group-cmp-card--yippee-recipe');
    carouselItemDiv.append(cardDiv);

    const cmpCardDiv = document.createElement('div');
    cmpCardDiv.classList.add('recipe-group-cmp-card');
    cardDiv.append(cmpCardDiv);

    const mainContentDiv = document.createElement('div');
    mainContentDiv.classList.add('recipe-group-cmp-card__main-content');
    cmpCardDiv.append(mainContentDiv);

    const optionsDiv = document.createElement('div');
    optionsDiv.classList.add('recipe-group-cmp-card__options');
    const threeDotsDiv = document.createElement('div');
    threeDotsDiv.classList.add('recipe-group-cmp-card__three-dots', 'recipe-group-icon-Ellipses');
    optionsDiv.append(threeDotsDiv);
    mainContentDiv.append(optionsDiv);

    const mediaDiv = document.createElement('div');
    mediaDiv.classList.add('recipe-group-cmp-card__media');
    const mediaLazyImageContainer = document.createElement('div');
    mediaLazyImageContainer.classList.add('recipe-group-lazy-image-container');
    mediaDiv.append(mediaLazyImageContainer);

    const cardImageElement = recipeNode.querySelector('[data-aue-prop="cardImage"]');
    if (cardImageElement) {
      const img = cardImageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.classList.add('recipe-group-cmp-card__img', 'recipe-group-is-clickable', 'recipe-group-lazy-image', 'recipe-group-loaded');
        mediaLazyImageContainer.append(picture);
        moveInstrumentation(img, picture);
      }
    }
    mainContentDiv.append(mediaDiv);

    const cardContentDiv = document.createElement('div');
    cardContentDiv.classList.add('recipe-group-cmp-card__content');

    const cardTitleElement = recipeNode.querySelector('[data-aue-prop="cardTitle"]');
    if (cardTitleElement) {
      const h2CardTitle = document.createElement('h2');
      h2CardTitle.classList.add('recipe-group-cmp-card__title');
      h2CardTitle.textContent = cardTitleElement.textContent;
      cardContentDiv.append(h2CardTitle);
      moveInstrumentation(cardTitleElement, h2CardTitle);
    }

    const timeInMinutesDiv = document.createElement('div');
    timeInMinutesDiv.classList.add('recipe-group-cmp-card__time-in-minutes');
    const timeWrapperDiv = document.createElement('div');
    timeWrapperDiv.classList.add('recipe-group-cmp-card__time-wrapper');
    const timeIconDiv = document.createElement('div');
    timeIconDiv.classList.add('recipe-group-cmp-card__time-icon');
    timeWrapperDiv.append(timeIconDiv);

    const timeElement = recipeNode.querySelector('[data-aue-prop="time"]');
    if (timeElement) {
      const timeDiv = document.createElement('div');
      timeDiv.classList.add('recipe-group-cmp-card__time');
      timeDiv.textContent = timeElement.textContent;
      timeWrapperDiv.append(timeDiv);
      moveInstrumentation(timeElement, timeDiv);
    }
    timeInMinutesDiv.append(timeWrapperDiv);

    const minutesP = document.createElement('p');
    minutesP.classList.add('recipe-group-cmp-card__minutes', 'recipe-group-body-3');
    minutesP.textContent = ' Mins';
    timeInMinutesDiv.append(minutesP);
    cardContentDiv.append(timeInMinutesDiv);

    mainContentDiv.append(cardContentDiv);

    slickTrackDiv.append(carouselItemDiv);
    moveInstrumentation(recipeNode, carouselItemDiv);
  });

  const nextButton = document.createElement('button');
  nextButton.classList.add('recipe-group-slick-next', 'recipe-group-slick-arrow');
  nextButton.setAttribute('aria-label', 'Next');
  nextButton.setAttribute('type', 'button');
  nextButton.style.backgroundImage = 'url("/etc.clientlibs/itc-foods-brands/clientlibs/clientlib-yippee/resources/images/next-arrow.svg")';
  nextButton.setAttribute('aria-disabled', 'false');
  nextButton.textContent = 'Next';
  carouselContainerDiv.append(nextButton);

  // Carousel dots (placeholders for now)
  const slickDotsUl = document.createElement('ul');
  slickDotsUl.classList.add('recipe-group-slick-dots');
  slickDotsUl.setAttribute('role', 'tablist');
  // For demonstration, creating 3 dots as per original HTML
  for (let i = 0; i < Math.ceil(recipes.length / 3); i++) {
    const li = document.createElement('li');
    if (i === 0) li.classList.add('recipe-group-slick-active');
    li.setAttribute('role', 'presentation');
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('role', 'tab');
    button.setAttribute('id', `slick-slide-control3${i}`);
    button.setAttribute('aria-controls', `slick-slide3${i * 3}`);
    button.setAttribute('aria-label', `${i + 1} of ${Math.ceil(recipes.length / 3)}`);
    button.setAttribute('tabindex', i === 0 ? '0' : '-1');
    if (i === 0) button.setAttribute('aria-selected', 'true');
    button.textContent = i + 1;
    li.append(button);
    slickDotsUl.append(li);
  }
  carouselContainerDiv.append(slickDotsUl);

  // Action Section (View All Link)
  const actionDiv = document.createElement('div');
  actionDiv.classList.add('recipe-group-cmp-recipe-group__action');
  recipeGroupDiv.append(actionDiv);

  const viewAllLinkElement = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLinkElement) {
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('recipe-group-button', 'recipe-group-cmp-button--primary-anchor', 'recipe-group-cmp-button--primary-anchor-undefined');
    const link = viewAllLinkElement.querySelector('a');
    if (link) {
      const cmpButtonLink = document.createElement('a');
      cmpButtonLink.classList.add('recipe-group-cmp-button');
      cmpButtonLink.href = link.href;
      cmpButtonLink.target = link.target;

      const spanText = document.createElement('span');
      spanText.classList.add('recipe-group-cmp-button__text');
      spanText.textContent = link.textContent;
      cmpButtonLink.append(spanText);

      buttonDiv.append(cmpButtonLink);
      actionDiv.append(buttonDiv);
      moveInstrumentation(link, cmpButtonLink);
    }
    moveInstrumentation(viewAllLinkElement, buttonDiv);
  }

  const shareDiv = document.createElement('div');
  shareDiv.classList.add('recipe-group-share');
  recipeGroupDiv.append(shareDiv);

  block.textContent = '';
  block.append(recipeGroupDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
