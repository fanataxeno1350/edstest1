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
  carouselItems.forEach((item, index) => {
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carousel');
    indicator.setAttribute('data-slide-to', index);
    if (index === 0) {
      indicator.classList.add('active');
    }
    carouselIndicators.append(indicator);

    const carouselItemDiv = document.createElement('div');
    carouselItemDiv.classList.add('carousel-item');
    if (index === 0) {
      carouselItemDiv.classList.add('active');
    }

    const dFlexDiv = document.createElement('div');
    dFlexDiv.classList.add('d-md-flex', 'd-block');

    const imageField = item.querySelector('[data-aue-prop="image"]');
    let imageElement;
    if (imageField) {
      imageElement = createOptimizedPicture(imageField.src, imageField.alt, false, [{
        width: '750'
      }]);
      imageElement.querySelector('img').classList.add('shiftclub-carousel__img', 'd-block', 'w-md-50', 'w-100');
      moveInstrumentation(imageField, imageElement);
    } else {
      const img = item.querySelector('img');
      if (img) {
        imageElement = createOptimizedPicture(img.src, img.alt, false, [{
          width: '750'
        }]);
        imageElement.querySelector('img').classList.add('shiftclub-carousel__img', 'd-block', 'w-md-50', 'w-100');
      }
    }
    if (imageElement) {
      dFlexDiv.append(imageElement);
    }

    const rightWrapperDiv = document.createElement('div');
    rightWrapperDiv.classList.add('w-md-50', 'w-100', 'shiftclub-right-wrapper', 'read-more');

    const titleField = item.querySelector('[data-aue-prop="title"]');
    if (titleField) {
      const title = document.createElement('h2');
      title.classList.add('shiftclub-carousel-inner__title');
      title.append(...titleField.childNodes);
      rightWrapperDiv.append(title);
      moveInstrumentation(titleField, title);
    } else {
      const title = item.querySelector('h2');
      if (title) {
        title.classList.add('shiftclub-carousel-inner__title');
        rightWrapperDiv.append(title);
      }
    }

    const descriptionField = item.querySelector('[data-aue-prop="description"]');
    if (descriptionField) {
      const description = document.createElement('p');
      description.classList.add('shiftclub-carousel-inner__description');
      description.append(...descriptionField.childNodes);
      rightWrapperDiv.append(description);
      moveInstrumentation(descriptionField, description);
    } else {
      const description = item.querySelector('p');
      if (description) {
        description.classList.add('shiftclub-carousel-inner__description');
        rightWrapperDiv.append(description);
      }
    }

    dFlexDiv.append(rightWrapperDiv);
    carouselItemDiv.append(dFlexDiv);
    carouselInnerDiv.append(carouselItemDiv);
    moveInstrumentation(item, carouselItemDiv);
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
  block.classList.add('shiftclub-section', 'shiftclub-mx-md-0', 'shiftclub-mx-4');
  block.append(containerDiv);

  block.dataset.blockStatus = 'loaded';
}
