import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const bannerCarouselSection = document.createElement('section');
  bannerCarouselSection.classList.add('banner-carousel-section');

  const carouselDiv = document.createElement('div');
  carouselDiv.id = 'carouselExampleSlidesOnly';
  carouselDiv.classList.add('banner-carousel', 'carousel', 'slide');
  carouselDiv.setAttribute('data-ride', 'carousel');

  const carouselIndicators = document.createElement('ol');
  carouselIndicators.classList.add('carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('carousel-inner');

  // Loop through each row in the block (each banner)
  [...block.children].forEach((row, index) => {
    moveInstrumentation(row, carouselInner); // Transfer instrumentation to the carousel-inner

    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (index === 0) {
      carouselItem.classList.add('active');
    }

    // Create carousel indicator
    const indicator = document.createElement('li');
    indicator.setAttribute('data-target', '#carouselExampleSlidesOnly');
    indicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicator.classList.add('active');
    }
    carouselIndicators.append(indicator);

    // Extract content from cells
    const cells = [...row.children];

    // Desktop Image
    const desktopImageCell = cells[0];
    const desktopImg = desktopImageCell.querySelector('img');
    if (desktopImg) {
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt, (index === 0), [{ media: '(min-width: 600px)', width: '2000' }, { width: '750' }]);
      moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
      optimizedDesktopPic.querySelector('img').classList.add('d-none', 'd-sm-block', 'w-100', 'banner-desktop-image');
      carouselItem.append(optimizedDesktopPic);
    }

    // Mobile Image
    const mobileImageCell = cells[1];
    const mobileImg = mobileImageCell.querySelector('img');
    if (mobileImg) {
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt, (index === 0), [{ width: '750' }]);
      moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
      optimizedMobilePic.querySelector('img').classList.add('d-block', 'd-sm-none', 'w-100', 'banner-mobile-image');
      carouselItem.append(optimizedMobilePic);
    }

    const bannerContentWrapper = document.createElement('div');
    bannerContentWrapper.classList.add('banner-content-wrapper', 'position-absolute');

    // Heading
    const headingCell = cells[2];
    const heading = headingCell.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      const bannerHeading = document.createElement('h1');
      bannerHeading.classList.add('banner-heading', 'text-sm-left');
      bannerHeading.textContent = heading.textContent;
      // Transfer data-color and style if present
      if (heading.dataset.color) {
        bannerHeading.setAttribute('data-color', heading.dataset.color);
      }
      if (heading.style.color) {
        bannerHeading.style.color = heading.style.color;
      }
      bannerContentWrapper.append(bannerHeading);
    }

    // Description
    const descriptionCell = cells[3];
    const bannerDescription = document.createElement('div');
    bannerDescription.classList.add('banner-description');
    if (descriptionCell.dataset.descColor) {
      bannerDescription.setAttribute('data-desc-color', descriptionCell.dataset.descColor);
    }
    // Append all children from the original description cell
    while (descriptionCell.firstChild) {
      bannerDescription.append(descriptionCell.firstChild);
    }
    bannerContentWrapper.append(bannerDescription);

    // CTA Link and Text
    const ctaLinkCell = cells[4];
    const ctaTextCell = cells[5];
    const ctaLink = ctaLinkCell.querySelector('a');
    const ctaText = ctaTextCell.textContent.trim();

    if (ctaLink && ctaText) {
      const bannerCta = document.createElement('a');
      bannerCta.href = ctaLink.href;
      bannerCta.textContent = ctaText;
      bannerCta.classList.add('banner-cta', 'btn', 'btn-primary', 'btn-start-now');
      // Transfer attributes from original link
      if (ctaLink.dataset.cmpClickable) {
        bannerCta.setAttribute('data-cmp-clickable', ctaLink.dataset.cmpClickable);
      }
      if (ctaLink.dataset.cmpDataLayer) {
        bannerCta.setAttribute('data-cmp-data-layer', ctaLink.dataset.cmpDataLayer);
      }
      if (ctaLink.dataset.bgColor) {
        bannerCta.setAttribute('data-bg-color', ctaLink.dataset.bgColor);
      }
      if (ctaLink.alt) {
        bannerCta.alt = ctaLink.alt;
      }
      if (ctaLink.target) {
        bannerCta.target = ctaLink.target;
      }
      if (ctaLink.style.backgroundColor) {
        bannerCta.style.backgroundColor = ctaLink.style.backgroundColor;
      }
      // Add screen reader span if target is _blank
      if (ctaLink.target === '_blank') {
        const srOnlySpan = document.createElement('span');
        srOnlySpan.classList.add('cmp-link__screen-reader-only');
        srOnlySpan.textContent = 'opens in a new tab';
        bannerCta.append(srOnlySpan);
      }
      bannerContentWrapper.append(bannerCta);
    }

    carouselItem.append(bannerContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselDiv.append(carouselIndicators);
  carouselDiv.append(carouselInner);

  // Add next/prev buttons
  const nextCarouselBtn = document.createElement('div');
  nextCarouselBtn.classList.add('next-carousel-btn');

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

  nextCarouselBtn.append(prevLink);
  nextCarouselBtn.append(nextLink);
  carouselDiv.append(nextCarouselBtn);

  bannerCarouselSection.append(carouselDiv);

  block.textContent = '';
  block.append(bannerCarouselSection);
}
