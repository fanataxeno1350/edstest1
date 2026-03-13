import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const title = block.querySelector('[data-aue-prop="title"]') || block.querySelector('h2');
  const tabsData = [...block.querySelectorAll('[data-aue-model="tab"]')];

  const productTabsCmp = document.createElement('div');
  productTabsCmp.classList.add('product-tabs-cmp-product-tabs');

  if (title) {
    const h2 = document.createElement('h2');
    h2.classList.add('product-tabs-cmp-product-tabs__title');
    h2.textContent = title.textContent;
    moveInstrumentation(title, h2);
    productTabsCmp.append(h2);
  }

  const tabsWrapper = document.createElement('div');
  tabsWrapper.classList.add('product-tabs-cmp-product-tabs__tabs');

  const contentWrapper = document.createElement('div');
  contentWrapper.classList.add('product-tabs-cmp-product-tabs__content');

  tabsData.forEach((tabNode, index) => {
    const tabNameElement = tabNode.querySelector('[data-aue-prop="tabName"]') || tabNode.querySelector('p');
    const tabName = tabNameElement ? tabNameElement.textContent : `Tab ${index + 1}`;

    // Create tab button
    const tabButtonDiv = document.createElement('div');
    tabButtonDiv.classList.add('product-tabs-button', 'product-tabs-cmp-button--secondary');
    if (index === 0) {
      tabButtonDiv.classList.add('product-tabs-active');
    }

    const button = document.createElement('button');
    button.type = 'button';
    button.classList.add('product-tabs-cmp-button');

    const span = document.createElement('span');
    span.classList.add('product-tabs-cmp-button__text');
    span.textContent = tabName;
    moveInstrumentation(tabNameElement, span);

    button.append(span);
    tabButtonDiv.append(button);
    tabsWrapper.append(tabButtonDiv);

    // Create carousel for tab content
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('product-tabs-slickcarousel', 'product-tabs-carousel', 'product-tabs-panelcontainer');
    carouselContainer.style.display = index === 0 ? 'block' : 'none'; // Show first tab by default
    carouselContainer.setAttribute('data-tab-index', index);

    const carouselCmp = document.createElement('div');
    carouselCmp.classList.add('product-tabs-cmp-carousel');

    const carouselItems = [...tabNode.querySelectorAll('[data-aue-model="carouselItem"]')];

    const carouselTrack = document.createElement('div');
    carouselTrack.classList.add('product-tabs-slick-list', 'product-tabs-draggable');
    const innerTrack = document.createElement('div');
    innerTrack.classList.add('product-tabs-slick-track');

    carouselItems.forEach((itemNode, itemIndex) => {
      const imageElement = itemNode.querySelector('[data-aue-prop="image"] img');
      const linkElement = itemNode.querySelector('[data-aue-prop="link"] a');

      const carouselItemDiv = document.createElement('div');
      carouselItemDiv.classList.add('product-tabs-cmp-carousel__item', 'product-tabs-slick-slide');
      if (itemIndex < 3) { // Assuming 3 items per slide for initial active state
        carouselItemDiv.classList.add('product-tabs-slick-current', 'product-tabs-slick-active');
      }
      carouselItemDiv.setAttribute('data-slick-index', itemIndex);
      carouselItemDiv.setAttribute('aria-hidden', itemIndex >= 3 ? 'true' : 'false');
      carouselItemDiv.setAttribute('tabindex', itemIndex === 0 ? '0' : '-1');
      carouselItemDiv.setAttribute('role', 'tabpanel');

      const lazyImageContainer = document.createElement('div');
      lazyImageContainer.classList.add('product-tabs-lazy-image-container');

      if (linkElement) {
        lazyImageContainer.setAttribute('data-redirection-url', linkElement.href);
        moveInstrumentation(linkElement, lazyImageContainer);
      }

      if (imageElement) {
        const picture = createOptimizedPicture(imageElement.src, imageElement.alt);
        picture.querySelector('img').classList.add('product-tabs-is-clickable', 'product-tabs-lazy-image', 'product-tabs-loaded');
        lazyImageContainer.append(picture);
        moveInstrumentation(imageElement, picture);
      }

      carouselItemDiv.append(lazyImageContainer);
      innerTrack.append(carouselItemDiv);
      moveInstrumentation(itemNode, carouselItemDiv);
    });

    carouselTrack.append(innerTrack);
    carouselCmp.append(carouselTrack);
    carouselContainer.append(carouselCmp);
    contentWrapper.append(carouselContainer);
    moveInstrumentation(tabNode, carouselContainer);

    // Add event listener to tab button to switch content
    tabButtonDiv.addEventListener('click', () => {
      tabsWrapper.querySelectorAll('.product-tabs-button').forEach(btn => btn.classList.remove('product-tabs-active'));
      tabButtonDiv.classList.add('product-tabs-active');
      contentWrapper.querySelectorAll('.product-tabs-slickcarousel').forEach(carousel => {
        carousel.style.display = 'none';
      });
      carouselContainer.style.display = 'block';
    });
  });

  productTabsCmp.append(tabsWrapper);
  productTabsCmp.append(contentWrapper);

  // View all button (assuming it's a single button at the end of the block)
  const viewAllButtonSource = block.querySelector('.button-container a');
  if (viewAllButtonSource) {
    const viewAllDiv = document.createElement('div');
    viewAllDiv.classList.add('product-tabs-button', 'product-tabs-cmp-button--primary', 'product-tabs-cmp-product-tabs__button-range');

    const viewAllBtn = document.createElement('button');
    viewAllBtn.type = 'button';
    viewAllBtn.classList.add('product-tabs-cmp-button');

    const viewAllSpan = document.createElement('span');
    viewAllSpan.classList.add('product-tabs-cmp-button__text');
    viewAllSpan.textContent = viewAllButtonSource.textContent;

    viewAllBtn.append(viewAllSpan);
    viewAllDiv.append(viewAllBtn);
    productTabsCmp.append(viewAllDiv);
    moveInstrumentation(viewAllButtonSource, viewAllDiv);
  }

  block.textContent = '';
  block.append(productTabsCmp);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
