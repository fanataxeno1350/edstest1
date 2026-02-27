import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const container = document.createElement('div');
  container.classList.add('container');

  const carouselDiv = document.createElement('div');
  carouselDiv.id = 'carousel';
  carouselDiv.classList.add('carousel', 'slide', 'shiftclub-carousel');
  carouselDiv.setAttribute('data-ride', 'carousel');

  const shiftclubCarouselShift = document.createElement('div');
  shiftclubCarouselShift.classList.add('shiftclub-carousel-shift');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselItems = Array.from(block.children);

  carouselItems.forEach((itemNode, index) => {
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carousel');
    indicator.setAttribute('data-slide-to', index);
    if (index === 0) {
      indicator.classList.add('active');
    }
    carouselIndicators.append(indicator);
    moveInstrumentation(itemNode, indicator);
  });

  carouselItems.forEach((itemNode, index) => {
    const carouselItemDiv = document.createElement('div');
    carouselItemDiv.classList.add('carousel-item');
    if (index === 0) {
      carouselItemDiv.classList.add('active');
    }

    const dMdFlexDiv = document.createElement('div');
    dMdFlexDiv.classList.add('d-md-flex', 'd-block');

    const imageWrapper = itemNode.querySelector('[data-aue-prop="image"]');
    let imgElement = imageWrapper ? imageWrapper.querySelector('img') : null;
    if (!imgElement) {
      const imgLink = itemNode.querySelector('a[href$=".webp"], a[href$=".jpeg"], a[href$=".png"], a[href$=".jpg"]');
      if (imgLink) {
        imgElement = document.createElement('img');
        imgElement.src = imgLink.href;
        imgElement.alt = imgLink.textContent || '';
      }
    }

    if (imgElement) {
      const picture = createOptimizedPicture(imgElement.src, imgElement.alt, false, [{ width: '750' }]);
      picture.classList.add('shiftclub-carousel__img', 'd-block', 'w-md-50', 'w-100');
      dMdFlexDiv.append(picture);
      if (imageWrapper) {
        moveInstrumentation(imageWrapper, picture);
      }
    }

    const rightWrapper = document.createElement('div');
    rightWrapper.classList.add('w-md-50', 'w-100', 'shiftclub-right-wrapper', 'read-more');

    const titleElement = itemNode.querySelector('[data-aue-prop="title"]');
    if (titleElement) {
      const h2 = document.createElement('h2');
      h2.classList.add('shiftclub-carousel-inner__title');
      h2.append(...titleElement.childNodes);
      rightWrapper.append(h2);
      moveInstrumentation(titleElement, h2);
    }

    const descriptionElement = itemNode.querySelector('[data-aue-prop="description"]');
    if (descriptionElement) {
      const p = document.createElement('p');
      p.classList.add('shiftclub-carousel-inner__description');
      p.append(...descriptionElement.childNodes);
      rightWrapper.append(p);
      moveInstrumentation(descriptionElement, p);
    }

    dMdFlexDiv.append(rightWrapper);
    carouselItemDiv.append(dMdFlexDiv);
    carouselInner.append(carouselItemDiv);
    moveInstrumentation(itemNode, carouselItemDiv);
  });

  const prevButton = document.createElement('button');
  prevButton.classList.add('carousel-control-prev');
  prevButton.setAttribute('type', 'button');
  prevButton.setAttribute('data-target', '#carousel');
  prevButton.setAttribute('data-slide', 'prev');

  const prevIcon = document.createElement('span');
  prevIcon.classList.add('carousel-control-prev-icon');
  prevIcon.setAttribute('aria-hidden', 'true');
  prevButton.append(prevIcon);

  const prevSrOnly = document.createElement('span');
  prevSrOnly.classList.add('sr-only');
  prevSrOnly.textContent = 'Previous';
  prevButton.append(prevSrOnly);

  const nextButton = document.createElement('button');
  nextButton.classList.add('carousel-control-next');
  nextButton.setAttribute('type', 'button');
  nextButton.setAttribute('data-target', '#carousel');
  nextButton.setAttribute('data-slide', 'next');

  const nextIcon = document.createElement('span');
  nextIcon.classList.add('carousel-control-next-icon');
  nextIcon.setAttribute('aria-hidden', 'true');
  nextButton.append(nextIcon);

  const nextSrOnly = document.createElement('span');
  nextSrOnly.classList.add('sr-only');
  nextSrOnly.textContent = 'Next';
  nextButton.append(nextSrOnly);

  shiftclubCarouselShift.append(carouselIndicators, carouselInner, prevButton, nextButton);
  carouselDiv.append(shiftclubCarouselShift);
  container.append(carouselDiv);

  block.textContent = '';
  block.append(container);
  block.className = `${block.dataset.blockName} block shiftclub-section shiftclub-mx-md-0 shiftclub-mx-4`;
  block.dataset.blockStatus = 'loaded';
}
