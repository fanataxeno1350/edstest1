import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselId = 'carouselExampleSlidesOnly'; // Static ID from HTML

  const olIndicators = document.createElement('ol');
  olIndicators.classList.add('banner-carousel-indicators');

  const divCarouselInner = document.createElement('div');
  divCarouselInner.classList.add('banner-carousel-inner');

  [...block.children].forEach((row, index) => {
    // Create indicator
    const liIndicator = document.createElement('li');
    liIndicator.setAttribute('data-target', `#${carouselId}`);
    liIndicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      liIndicator.classList.add('banner-active');
    }
    olIndicators.append(liIndicator);

    // Create carousel item
    const divCarouselItem = document.createElement('div');
    divCarouselItem.classList.add('banner-carousel-item');
    if (index === 0) {
      divCarouselItem.classList.add('banner-active');
    }
    moveInstrumentation(row, divCarouselItem);

    const cells = [...row.children];

    // Extract content from cells based on the model fields
    const desktopImageCell = cells[0];
    const mobileImageCell = cells[1];
    const headingCell = cells[2];
    const descriptionCell = cells[3];
    const ctaLabelCell = cells[4];
    const ctaUrlCell = cells[5];

    // Desktop Image
    const desktopImg = desktopImageCell.querySelector('img');
    if (desktopImg) {
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt);
      optimizedDesktopPic.classList.add('banner-d-none', 'banner-d-sm-block', 'banner-w-100', 'banner-desktop-image');
      optimizedDesktopPic.querySelector('img').setAttribute('loading', desktopImg.getAttribute('loading') || 'lazy');
      optimizedDesktopPic.querySelector('img').setAttribute('fetchpriority', desktopImg.getAttribute('fetchpriority') || 'low');
      moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
      divCarouselItem.append(optimizedDesktopPic);
    }

    // Mobile Image
    const mobileImg = mobileImageCell.querySelector('img');
    if (mobileImg) {
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt);
      optimizedMobilePic.classList.add('banner-d-block', 'banner-d-sm-none', 'banner-w-100', 'banner-mobile-image');
      optimizedMobilePic.querySelector('img').setAttribute('loading', mobileImg.getAttribute('loading') || 'lazy');
      optimizedMobilePic.querySelector('img').setAttribute('fetchpriority', mobileImg.getAttribute('fetchpriority') || 'low');
      moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
      divCarouselItem.append(optimizedMobilePic);
    }

    // Content Wrapper
    const divContentWrapper = document.createElement('div');
    divContentWrapper.classList.add('banner-banner-content-wrapper', 'banner-position-absolute');

    // Heading
    const heading = headingCell.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      const newHeading = document.createElement('h1');
      newHeading.classList.add('banner-koi-carousel-heading', 'banner-text-sm-left');
      newHeading.textContent = heading.textContent;
      // Transfer data-color and style if present
      if (heading.hasAttribute('data-color')) {
        newHeading.setAttribute('data-color', heading.getAttribute('data-color'));
      }
      if (heading.hasAttribute('style')) {
        newHeading.setAttribute('style', heading.getAttribute('style'));
      }
      moveInstrumentation(heading, newHeading);
      divContentWrapper.append(newHeading);
    }

    // Description
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('banner-koi-carousel-description');
    if (descriptionCell.hasAttribute('data-desc-color')) {
      descriptionDiv.setAttribute('data-desc-color', descriptionCell.getAttribute('data-desc-color'));
    }
    // Append all child nodes from the description cell (h3, p, etc.)
    [...descriptionCell.children].forEach((child) => {
      descriptionDiv.append(child.cloneNode(true)); // Clone to avoid moving original nodes
    });
    moveInstrumentation(descriptionCell, descriptionDiv);
    divContentWrapper.append(descriptionDiv);

    // CTA Button
    const ctaLink = ctaUrlCell.querySelector('a');
    if (ctaLink) {
      const newCta = document.createElement('a');
      newCta.href = ctaLink.href;
      newCta.textContent = ctaLabelCell.textContent.trim() || ctaLink.textContent;
      newCta.classList.add('banner-koi-carousel-cta', 'banner-btn', 'banner-btn-primary', 'banner-btn-start-now');
      // Transfer attributes from the original link
      ['data-cmp-clickable', 'data-cmp-data-layer', 'data-bg-color', 'alt', 'target', 'style']
        .forEach((attr) => {
          if (ctaLink.hasAttribute(attr)) {
            newCta.setAttribute(attr, ctaLink.getAttribute(attr));
          }
        });
      // Add screen reader span if it exists
      const screenReaderSpan = ctaLink.querySelector('.banner-cmp-link__screen-reader-only');
      if (screenReaderSpan) {
        newCta.append(screenReaderSpan.cloneNode(true));
      }
      moveInstrumentation(ctaLink, newCta);
      divContentWrapper.append(newCta);
    }

    divCarouselItem.append(divContentWrapper);
    divCarouselInner.append(divCarouselItem);
  });

  // Create the main carousel wrapper
  const mainCarouselDiv = document.createElement('div');
  mainCarouselDiv.id = carouselId;
  mainCarouselDiv.classList.add('banner-bannerCarousel', 'banner-carousel', 'banner-slide');
  mainCarouselDiv.setAttribute('data-ride', 'carousel');

  mainCarouselDiv.append(olIndicators);
  mainCarouselDiv.append(divCarouselInner);

  // Add navigation buttons (static structure)
  const divNextCarouselBtn = document.createElement('div');
  divNextCarouselBtn.classList.add('banner-next-carousel-btn');

  const prevLink = document.createElement('a');
  prevLink.classList.add('banner-carousel-control-prev');
  prevLink.href = `#${carouselId}`;
  prevLink.setAttribute('role', 'button');
  prevLink.setAttribute('data-slide', 'prev');
  prevLink.innerHTML = '<span class="banner-carousel-control-prev-icon" aria-hidden="true"></span><span class="banner-sr-only">Previous</span>';
  divNextCarouselBtn.append(prevLink);

  const nextLink = document.createElement('a');
  nextLink.classList.add('banner-carousel-control-next');
  nextLink.href = `#${carouselId}`;
  nextLink.setAttribute('role', 'button');
  nextLink.setAttribute('data-slide', 'next');
  nextLink.innerHTML = '<span class="banner-carousel-control-next-icon" aria-hidden="true"></span><span class="banner-sr-only">Next</span>';
  divNextCarouselBtn.append(nextLink);

  mainCarouselDiv.append(divNextCarouselBtn);

  block.textContent = '';
  block.append(mainCarouselDiv);
}
