import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContainer = document.createElement('div');
  mainContainer.classList.add('shiftclub-container');

  const carouselDiv = document.createElement('div');
  carouselDiv.id = 'carousel';
  carouselDiv.classList.add('shiftclub-carousel', 'shiftclub-slide', 'shiftclub-itc-club-carousel');
  carouselDiv.setAttribute('data-ride', 'carousel');

  const itcCarouselShift = document.createElement('div');
  itcCarouselShift.classList.add('shiftclub-itc-carousel-shift');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('shiftclub-carousel-inner');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('shiftclub-carousel-indicators');

  const carouselItems = [];

  [...block.children].forEach((row, index) => {
    const liIndicator = document.createElement('li');
    liIndicator.setAttribute('data-target', '#carousel');
    liIndicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      liIndicator.classList.add('shiftclub-active');
    }
    carouselIndicators.append(liIndicator);

    const carouselItemDiv = document.createElement('div');
    carouselItemDiv.classList.add('shiftclub-carousel-item');
    if (index === 0) {
      carouselItemDiv.classList.add('shiftclub-active');
    }
    moveInstrumentation(row, carouselItemDiv);

    const dFlexDiv = document.createElement('div');
    dFlexDiv.classList.add('shiftclub-d-md-flex', 'shiftclub-d-block');

    const cells = [...row.children];

    // Image cell
    const imageCell = cells[0];
    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('shiftclub-carousel__img', 'shiftclub-d-block', 'shiftclub-w-md-50', 'shiftclub-w-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        dFlexDiv.append(optimizedPic);
      }
    }

    // Content cell (Title and Description)
    const contentCell = cells[1];
    if (contentCell) {
      const rightWrapperDiv = document.createElement('div');
      rightWrapperDiv.classList.add('shiftclub-w-md-50', 'shiftclub-w-100', 'shiftclub-itc-club-right-wrapper', 'shiftclub-read-more');

      const title = contentCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (title) {
        const h2 = document.createElement('h2');
        h2.classList.add('shiftclub-carousel-inner__title');
        h2.textContent = title.textContent;
        moveInstrumentation(title, h2);
        rightWrapperDiv.append(h2);
      }

      const description = contentCell.querySelector('p');
      if (description) {
        const p = document.createElement('p');
        p.classList.add('shiftclub-carousel-inner__description');
        p.textContent = description.textContent;
        moveInstrumentation(description, p);
        rightWrapperDiv.append(p);
      }
      dFlexDiv.append(rightWrapperDiv);
    }

    carouselItemDiv.append(dFlexDiv);
    carouselItems.push(carouselItemDiv);
  });

  carouselInner.append(carouselIndicators, ...carouselItems);

  const prevButton = document.createElement('button');
  prevButton.classList.add('shiftclub-carousel-control-prev');
  prevButton.type = 'button';
  prevButton.setAttribute('data-target', '#carousel');
  prevButton.setAttribute('data-slide', 'prev');
  prevButton.innerHTML = '<span class="shiftclub-carousel-control-prev-icon" aria-hidden="true"></span><span class="shiftclub-sr-only">Previous</span>';

  const nextButton = document.createElement('button');
  nextButton.classList.add('shiftclub-carousel-control-next');
  nextButton.type = 'button';
  nextButton.setAttribute('data-target', '#carousel');
  nextButton.setAttribute('data-slide', 'next');
  nextButton.innerHTML = '<span class="shiftclub-carousel-control-next-icon" aria-hidden="true"></span><span class="shiftclub-sr-only">Next</span>';

  itcCarouselShift.append(carouselInner, prevButton, nextButton);
  carouselDiv.append(itcCarouselShift);
  mainContainer.append(carouselDiv);

  block.textContent = '';
  block.classList.add('shiftclub-mx-md-0', 'shiftclub-mx-4');
  block.append(mainContainer);
}
