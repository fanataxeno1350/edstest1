import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container');

  const carouselDiv = document.createElement('div');
  carouselDiv.id = 'carousel';
  carouselDiv.classList.add('carousel', 'slide', 'shiftclub-carousel');
  carouselDiv.setAttribute('data-ride', 'carousel');

  const shiftDiv = document.createElement('div');
  shiftDiv.classList.add('shiftclub-carousel-shift');

  const carouselInnerDiv = document.createElement('div');
  carouselInnerDiv.classList.add('carousel-inner');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselItems = Array.from(block.children);
  carouselItems.forEach((itemNode, index) => {
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carousel');
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('active');
    }
    carouselIndicators.append(indicator);

    const carouselItemDiv = document.createElement('div');
    carouselItemDiv.classList.add('carousel-item');
    if (index === 0) {
      carouselItemDiv.classList.add('active');
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('d-md-flex', 'd-block');

    const imageField = itemNode.querySelector('[data-aue-prop="image"]');
    let imageElement;
    if (imageField) {
      if (imageField) {
        imageElement = createOptimizedPicture(imageField.src, imageField.alt);
        imageElement.querySelector('img').classList.add('shiftclub-carousel__img', 'd-block', 'w-md-50', 'w-100');
        contentWrapper.append(imageElement);
        moveInstrumentation(imageField, imageElement);
      }
    } else {
      const img = itemNode.querySelector('img');
      if (img) {
        imageElement = createOptimizedPicture(img.src, img.alt);
        imageElement.querySelector('img').classList.add('shiftclub-carousel__img', 'd-block', 'w-md-50', 'w-100');
        contentWrapper.append(imageElement);
      }
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('w-md-50', 'w-100', 'shiftclub-right-wrapper', 'read-more');

    const titleField = itemNode.querySelector('[data-aue-prop="title"]');
    if (titleField) {
      const h2 = document.createElement('h2');
      h2.classList.add('shiftclub-carousel-inner__title');
      h2.append(...titleField.childNodes);
      rightWrapper.append(h2);
      moveInstrumentation(titleField, h2);
    } else {
      const h2 = itemNode.querySelector('h2');
      if (h2) {
        h2.classList.add('shiftclub-carousel-inner__title');
        rightWrapper.append(h2);
      }
    }

    const descriptionField = itemNode.querySelector('[data-aue-prop="description"]');
    if (descriptionField) {
      const p = document.createElement('p');
      p.classList.add('shiftclub-carousel-inner__description');
      p.append(...descriptionField.childNodes);
      rightWrapper.append(p);
      moveInstrumentation(descriptionField, p);
    } else {
      const p = itemNode.querySelector('p');
      if (p) {
        p.classList.add('shiftclub-carousel-inner__description');
        rightWrapper.append(p);
      }
    }

    contentWrapper.append(rightWrapper);
    carouselItemDiv.append(contentWrapper);
    carouselInnerDiv.append(carouselItemDiv);
    moveInstrumentation(itemNode, carouselItemDiv);
  });

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel');
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-control-next');
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#carousel');
  nextButton.setAttribute('data-slide', 'next');
  nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';

  shiftDiv.append(carouselIndicators, carouselInnerDiv, prevButton, nextButton);
  carouselDiv.append(shiftDiv);
  containerDiv.append(carouselDiv);

  block.textContent = '';
  block.append(containerDiv);
  block.className = `${block.dataset.blockName} block shiftclub-section shiftclub-mx-md-0 shiftclub-mx-4`;
  block.dataset.blockStatus = 'loaded';
}
