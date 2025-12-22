import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselBanner = document.createElement('div');
  carouselBanner.id = 'carouselExampleSlidesOnly';
  carouselBanner.classList.add('carousel-banner', 'carousel', 'slide');
  carouselBanner.setAttribute('data-ride', 'carousel');

  const olIndicators = document.createElement('ol');
  olIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  const carouselItems = Array.from(block.children);

  carouselItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.setAttribute('data-target', '#carouselExampleSlidesOnly');
    li.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      li.classList.add('active');
    }
    olIndicators.append(li);
    moveInstrumentation(item, li);

    const carouselItemDiv = document.createElement('div');
    carouselItemDiv.classList.add('carousel-item');
    if (index === 0) {
      carouselItemDiv.classList.add('active');
    }

    const desktopImage = item.querySelector('[data-aue-prop="desktopImage"]');
    if (desktopImage) {
      const picture = createOptimizedPicture(desktopImage.src, desktopImage.alt);
      picture.querySelector('img').classList.add('d-none', 'd-sm-block', 'w-100', 'carousel-desktop-image');
      carouselItemDiv.append(picture);
      moveInstrumentation(desktopImage, picture);
    }

    const mobileImage = item.querySelector('[data-aue-prop="mobileImage"]');
    if (mobileImage) {
      const picture = createOptimizedPicture(mobileImage.src, mobileImage.alt);
      picture.querySelector('img').classList.add('d-block', 'd-sm-none', 'w-100', 'carousel-mobile-image');
      carouselItemDiv.append(picture);
      moveInstrumentation(mobileImage, picture);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('carousel-content-wrapper', 'position-absolute');

    const heading = item.querySelector('[data-aue-prop="heading"]');
    if (heading) {
      const h1 = document.createElement('h1');
      h1.classList.add('carousel-heading', 'text-sm-left');
      h1.style.color = heading.dataset.color || '';
      h1.textContent = heading.textContent;
      contentWrapper.append(h1);
      moveInstrumentation(heading, h1);
    }

    const description = item.querySelector('[data-aue-prop="description"]');
    if (description) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('carousel-description');
      descriptionDiv.style.color = description.dataset.descColor || '';
      descriptionDiv.innerHTML = description.innerHTML;
      contentWrapper.append(descriptionDiv);
      moveInstrumentation(description, descriptionDiv);
    }

    const ctaLink = item.querySelector('[data-aue-prop="ctaLink"]');
    if (ctaLink) {
      const link = document.createElement('a');
      link.href = ctaLink.href;
      link.classList.add('carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
      link.textContent = ctaLink.textContent;
      if (ctaLink.target) {
        link.target = ctaLink.target;
      }
      if (ctaLink.getAttribute('alt')) {
        link.setAttribute('alt', ctaLink.getAttribute('alt'));
      }
      if (ctaLink.dataset.bgColor) {
        link.style.backgroundColor = ctaLink.dataset.bgColor;
      }
      contentWrapper.append(link);
      moveInstrumentation(ctaLink, link);
    }

    carouselItemDiv.append(contentWrapper);
    carouselInner.append(carouselItemDiv);
    moveInstrumentation(item, carouselItemDiv);
  });

  const carouselNextBtn = document.createElement('div');
  carouselNextBtn.classList.add('carousel-next-btn');

  const prevLink = document.createElement('a');
  prevLink.classList.add('carousel-control-prev');
  prevLink.href = '#carouselExampleSlidesOnly';
  prevLink.setAttribute('role', 'button');
  prevLink.setAttribute('data-slide', 'prev');
  prevLink.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';

  const nextLink = document.createElement('a');
  nextLink.classList.add('carousel-control-next');
  nextLink.href = '#carouselExampleSlidesOnly';
  nextLink.setAttribute('role', 'button');
  nextLink.setAttribute('data-slide', 'next');
  nextLink.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';

  carouselNextBtn.append(prevLink, nextLink);

  carouselBanner.append(olIndicators, carouselInner, carouselNextBtn);

  block.textContent = '';
  block.append(carouselBanner);
  block.className = `carousel-banner block`;
  block.dataset.blockStatus = 'loaded';
}