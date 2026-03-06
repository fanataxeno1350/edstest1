import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const clubSectionWrapper = document.createElement('section');
  clubSectionWrapper.className = 'club-section-wrapper mx-md-0 mx-4';
  moveInstrumentation(block, clubSectionWrapper);

  const clubSectionContainer = document.createElement('div');
  clubSectionContainer.className = 'club-section-container';

  const carouselDiv = document.createElement('div');
  carouselDiv.id = 'carousel';
  carouselDiv.className = 'club-carousel carousel slide';
  carouselDiv.setAttribute('data-ride', 'carousel');

  const clubCarouselShift = document.createElement('div');
  clubCarouselShift.className = 'club-carousel-shift';

  const carouselInner = document.createElement('div');
  carouselInner.className = 'carousel-inner';

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.className = 'carousel-indicators';

  const carouselItems = [];

  [...block.children].forEach((row, index) => {
    const liIndicator = document.createElement('li');
    liIndicator.setAttribute('data-target', '#carousel');
    liIndicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      liIndicator.classList.add('active');
    }
    carouselIndicators.append(liIndicator);

    const carouselItem = document.createElement('div');
    carouselItem.className = 'carousel-item';
    if (index === 0) {
      carouselItem.classList.add('active');
    }
    moveInstrumentation(row, carouselItem);

    const dMdFlexDiv = document.createElement('div');
    dMdFlexDiv.className = 'd-md-flex d-block';

    const cells = [...row.children];

    // Image cell
    const imgWrapper = cells[0];
    const img = imgWrapper ? imgWrapper.querySelector('img') : null;
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('carousel-img', 'd-block', 'w-md-50', 'w-100');
      dMdFlexDiv.append(optimizedPic);
    }

    // Content cell
    const contentWrapper = cells[1];
    if (contentWrapper) {
      const clubRightWrapper = document.createElement('div');
      clubRightWrapper.className = 'w-md-50 w-100 club-right-wrapper read-more';

      const h2 = contentWrapper.querySelector('h2');
      if (h2) {
        h2.classList.add('carousel-inner-title');
        clubRightWrapper.append(h2);
      }

      const p = contentWrapper.querySelector('p');
      if (p) {
        p.classList.add('carousel-inner-description');
        clubRightWrapper.append(p);
      }
      dMdFlexDiv.append(clubRightWrapper);
    }

    carouselItem.append(dMdFlexDiv);
    carouselItems.push(carouselItem);
  });

  carouselInner.append(carouselIndicators, ...carouselItems);
  clubCarouselShift.append(carouselInner);

  // Add carousel controls
  const prevButton = document.createElement('button');
  prevButton.className = 'carousel-control-prev';
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel');
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';

  const nextButton = document.createElement('button');
  nextButton.className = 'carousel-control-next';
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#carousel');
  nextButton.setAttribute('data-slide', 'next');
  nextButton.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';

  clubCarouselShift.append(prevButton, nextButton);
  carouselDiv.append(clubCarouselShift);
  clubSectionContainer.append(carouselDiv);
  clubSectionWrapper.append(clubSectionContainer);

  block.textContent = '';
  block.append(clubSectionWrapper);
}
