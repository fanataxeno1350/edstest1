import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.className = 'shiftclubcarousel-section shiftclubcarousel-mx-md-0 shiftclubcarousel-mx-4';

  const container = document.createElement('div');
  container.className = 'shiftclubcarousel-container';
  section.append(container);

  const carousel = document.createElement('div');
  carousel.id = 'carousel';
  carousel.className = 'shiftclubcarousel-carousel shiftclubcarousel-slide shiftclubcarousel-itc-club-carousel';
  carousel.setAttribute('data-ride', 'carousel');
  container.append(carousel);

  const carouselShift = document.createElement('div');
  carouselShift.className = 'shiftclubcarousel-itc-carousel-shift';
  carousel.append(carouselShift);

  const carouselInner = document.createElement('div');
  carouselInner.className = 'shiftclubcarousel-carousel-inner';
  carouselShift.append(carouselInner);

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.className = 'shiftclubcarousel-carousel-indicators';
  carouselInner.append(carouselIndicators);

  const carouselItemsContainer = document.createElement('div');
  carouselInner.append(carouselItemsContainer);

  [...block.children].forEach((row, i) => {
    moveInstrumentation(row, carouselItemsContainer);

    const carouselItem = document.createElement('div');
    carouselItem.className = `shiftclubcarousel-carousel-item${i === 0 ? ' shiftclubcarousel-active' : ''}`;
    carouselItemsContainer.append(carouselItem);

    const dFlexWrapper = document.createElement('div');
    dFlexWrapper.className = 'shiftclubcarousel-d-md-flex shiftclubcarousel-d-block';
    carouselItem.append(dFlexWrapper);

    const cells = [...row.children];

    // Image
    const imageCell = cells[0];
    const img = imageCell.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').className = 'shiftclubcarousel-shiftclubcarousel__img shiftclubcarousel-d-block shiftclubcarousel-w-md-50 shiftclubcarousel-w-100';
      dFlexWrapper.append(optimizedPic);
    }

    // Content (Title, Description)
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'shiftclubcarousel-w-md-50 shiftclubcarousel-w-100 shiftclubcarousel-itc-club-right-wrapper shiftclubcarousel-read-more';
    dFlexWrapper.append(contentWrapper);

    const titleCell = cells[1];
    if (titleCell) {
      const title = titleCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (title) {
        const h2 = document.createElement('h2');
        h2.className = 'shiftclubcarousel-carousel-inner__title';
        h2.textContent = title.textContent;
        contentWrapper.append(h2);
      }
    }

    const descriptionCell = cells[2];
    if (descriptionCell) {
      const description = descriptionCell.querySelector('p');
      if (description) {
        const p = document.createElement('p');
        p.className = 'shiftclubcarousel-carousel-inner__description';
        p.textContent = description.textContent;
        contentWrapper.append(p);
      }
    }

    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carousel');
    indicator.setAttribute('data-slide-to', i);
    if (i === 0) {
      indicator.classList.add('shiftclubcarousel-active');
    }
    carouselIndicators.append(indicator);
  });

  // Previous button
  const prevButton = document.createElement('button');
  prevButton.className = 'shiftclubcarousel-carousel-control-prev';
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel');
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.innerHTML = `
    <span class="shiftclubcarousel-carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="shiftclubcarousel-sr-only">Previous</span>
  `;
  carouselShift.append(prevButton);

  // Next button
  const nextButton = document.createElement('button');
  nextButton.className = 'shiftclubcarousel-carousel-control-next';
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#carousel');
  nextButton.setAttribute('data-slide', 'next');
  nextButton.innerHTML = `
    <span class="shiftclubcarousel-carousel-control-next-icon" aria-hidden="true"></span>
    <span class="shiftclubcarousel-sr-only">Next</span>
  `;
  carouselShift.append(nextButton);

  block.textContent = '';
  block.append(section);
}
