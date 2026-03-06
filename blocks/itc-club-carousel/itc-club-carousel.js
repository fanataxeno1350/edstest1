import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContainer = document.createElement('div');
  mainContainer.className = 'shiftclub-container';

  const carouselDiv = document.createElement('div');
  carouselDiv.id = 'carousel';
  carouselDiv.className = 'shiftclub-carousel shiftclub-slide shiftclub-itc-club-carousel';
  carouselDiv.setAttribute('data-ride', 'carousel');

  const carouselShift = document.createElement('div');
  carouselShift.className = 'shiftclub-itc-carousel-shift';

  const carouselInner = document.createElement('div');
  carouselInner.className = 'shiftclub-carousel-inner';

  const indicators = document.createElement('ol');
  indicators.className = 'shiftclub-carousel-indicators';

  const carouselItems = [];

  [...block.children].forEach((row, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = `shiftclub-carousel-item${index === 0 ? ' shiftclub-active' : ''}`;
    moveInstrumentation(row, itemDiv);

    const dFlexDiv = document.createElement('div');
    dFlexDiv.className = 'shiftclub-d-md-flex shiftclub-d-block';

    const cells = [...row.children];

    // Cell 1: Image
    const imageCell = cells[0];
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').className = 'shiftclub-carousel__img shiftclub-d-block shiftclub-w-md-50 shiftclub-w-100';
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        dFlexDiv.append(optimizedPic);
      }
    }

    // Cell 2: Title and Description
    const contentCell = cells[1];
    if (contentCell) {
      const rightWrapper = document.createElement('div');
      rightWrapper.className = 'shiftclub-w-md-50 shiftclub-w-100 shiftclub-itc-club-right-wrapper shiftclub-read-more';

      const title = contentCell.querySelector('h2');
      if (title) {
        title.classList.add('shiftclub-carousel-inner__title');
        rightWrapper.append(title);
      }

      const description = contentCell.querySelector('p');
      if (description) {
        description.classList.add('shiftclub-carousel-inner__description');
        rightWrapper.append(description);
      }
      dFlexDiv.append(rightWrapper);
    }

    itemDiv.append(dFlexDiv);
    carouselItems.push(itemDiv);

    const indicatorLi = document.createElement('li');
    indicatorLi.setAttribute('data-target', '#carousel');
    indicatorLi.setAttribute('data-slide-to', index);
    if (index === 0) {
      indicatorLi.classList.add('shiftclub-active');
    }
    indicators.append(indicatorLi);
  });

  carouselInner.append(indicators, ...carouselItems);
  carouselShift.append(carouselInner);

  // Add navigation buttons
  const prevButton = document.createElement('button');
  prevButton.className = 'shiftclub-carousel-control-prev';
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel');
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.innerHTML = '<span class="shiftclub-carousel-control-prev-icon" aria-hidden="true"></span><span class="shiftclub-sr-only">Previous</span>';

  const nextButton = document.createElement('button');
  nextButton.className = 'shiftclub-carousel-control-next';
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#carousel');
  nextButton.setAttribute('data-slide', 'next');
  nextButton.innerHTML = '<span class="shiftclub-carousel-control-next-icon" aria-hidden="true"></span><span class="shiftclub-sr-only">Next</span>';

  carouselShift.append(prevButton, nextButton);
  carouselDiv.append(carouselShift);
  mainContainer.append(carouselDiv);

  block.textContent = '';
  block.classList.add('shiftclub-itc-club-section', 'shiftclub-mx-md-0', 'shiftclub-mx-4');
  block.append(mainContainer);
}
