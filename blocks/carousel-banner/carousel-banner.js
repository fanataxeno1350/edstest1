import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselSection = document.createElement('section');
  carouselSection.classList.add('carousel-section');

  const carouselBanner = document.createElement('div');
  carouselBanner.id = 'carouselExampleSlidesOnly';
  carouselBanner.classList.add('carousel-banner', 'carousel', 'slide');
  carouselBanner.setAttribute('data-ride', 'carousel');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  const carouselSlides = block.querySelectorAll('[data-aue-model="carouselSlide"]');

  carouselSlides.forEach((slide, index) => {
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carouselExampleSlidesOnly');
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('active');
    }
    carouselIndicators.append(indicator);
    moveInstrumentation(slide, indicator);

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    const desktopImageField = slide.querySelector('[data-aue-prop="desktopImage"]');
    const mobileImageField = slide.querySelector('[data-aue-prop="mobileImage"]');

    const desktopImage = desktopImageField ? desktopImageField.querySelector('img') : null;
    const mobileImage = mobileImageField ? mobileImageField.querySelector('img') : null;

    if (desktopImage) {
      const picture = createOptimizedPicture(desktopImage.src, desktopImage.alt);
      picture.classList.add('d-none', 'd-sm-block', 'w-100', 'carousel-desktop-image');
      carouselItem.append(picture);
      moveInstrumentation(desktopImageField, picture);
    }

    if (mobileImage) {
      const picture = createOptimizedPicture(mobileImage.src, mobileImage.alt);
      picture.classList.add('d-block', 'd-sm-none', 'w-100', 'carousel-mobile-image');
      carouselItem.append(picture);
      moveInstrumentation(mobileImageField, picture);
    }

    const carouselContentWrapper = document.createElement('div');
    carouselContentWrapper.classList.add('carousel-content-wrapper', 'position-absolute');

    const headingField = slide.querySelector('[data-aue-prop="heading"]');
    if (headingField) {
      const heading = document.createElement('h1');
      heading.classList.add('carousel-heading', 'text-sm-left');
      heading.textContent = headingField.textContent;
      const color = headingField.dataset.color;
      if (color) {
        heading.style.color = color;
      }
      carouselContentWrapper.append(heading);
      moveInstrumentation(headingField, heading);
    }

    const descriptionField = slide.querySelector('[data-aue-prop="description"]');
    if (descriptionField) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('carousel-description');
      const descColor = descriptionField.dataset.descColor;
      if (descColor) {
        descriptionDiv.style.color = descColor;
      }
      descriptionDiv.innerHTML = descriptionField.innerHTML;
      carouselContentWrapper.append(descriptionDiv);
      moveInstrumentation(descriptionField, descriptionDiv);
    }

    const ctaLinkField = slide.querySelector('[data-aue-prop="ctaLink"]');
    const ctaTextField = slide.querySelector('[data-aue-prop="ctaText"]');

    if (ctaLinkField && ctaTextField) {
      const cta = document.createElement('a');
      cta.classList.add('carousel-cta', 'btn', 'btn-primary', 'btn-start-now');
      cta.href = ctaLinkField.href || '#';
      cta.textContent = ctaTextField.textContent;
      cta.alt = ctaTextField.textContent;
      const bgColor = ctaLinkField.dataset.bgColor;
      if (bgColor) {
        cta.style.backgroundColor = bgColor;
      }
      if (ctaLinkField.target) {
        cta.target = ctaLinkField.target;
        const screenReaderOnly = document.createElement('span');
        screenReaderOnly.classList.add('cmp-link__screen-reader-only');
        screenReaderOnly.textContent = 'opens in a new tab';
        cta.append(screenReaderOnly);
      }
      carouselContentWrapper.append(cta);
      moveInstrumentation(ctaLinkField, cta);
      moveInstrumentation(ctaTextField, cta);
    }

    carouselItem.append(carouselContentWrapper);
    carouselInner.append(carouselItem);
    moveInstrumentation(slide, carouselItem);
  });

  const carouselNextBtn = document.createElement('div');
  carouselNextBtn.classList.add('carousel-next-btn');

  const prevControl = document.createElement('a');
  prevControl.classList.add('carousel-control-prev');
  prevControl.href = '#carouselExampleSlidesOnly';
  prevControl.setAttribute('role', 'button');
  prevControl.setAttribute('data-slide', 'prev');
  prevControl.innerHTML = '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span>';

  const nextControl = document.createElement('a');
  nextControl.classList.add('carousel-control-next');
  nextControl.href = '#carouselExampleSlidesOnly';
  nextControl.setAttribute('role', 'button');
  nextControl.setAttribute('data-slide', 'next');
  nextControl.innerHTML = '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span>';

  carouselNextBtn.append(prevControl, nextControl);

  carouselBanner.append(carouselIndicators, carouselInner, carouselNextBtn);
  carouselSection.append(carouselBanner);

  block.textContent = '';
  block.append(carouselSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
