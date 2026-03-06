import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const carouselId = 'carouselExampleSlidesOnly'; // Static ID from HTML
  block.setAttribute('id', carouselId);
  block.classList.add('banner-bannerCarousel', 'banner-carousel', 'banner-slide');
  block.setAttribute('data-ride', 'carousel');

  const ol = document.createElement('ol');
  ol.classList.add('banner-carousel-indicators');

  const innerDiv = document.createElement('div');
  innerDiv.classList.add('banner-carousel-inner');

  [...block.children].forEach((row, index) => {
    // Transfer instrumentation from the original row to the new carousel item
    const carouselItem = document.createElement('div');
    moveInstrumentation(row, carouselItem);
    carouselItem.classList.add('banner-carousel-item');
    if (index === 0) {
      carouselItem.classList.add('banner-active');
    }

    const indicatorLi = document.createElement('li');
    indicatorLi.setAttribute('data-target', `#${carouselId}`);
    indicatorLi.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      indicatorLi.classList.add('banner-active');
    }
    ol.append(indicatorLi);

    const cells = [...row.children];

    // Desktop Image
    const desktopImageCell = cells[0];
    const desktopImg = desktopImageCell.querySelector('img');
    if (desktopImg) {
      const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt);
      moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
      optimizedDesktopPic.querySelector('img').classList.add('banner-d-none', 'banner-d-sm-block', 'banner-w-100', 'banner-desktop-image');
      optimizedDesktopPic.querySelector('img').setAttribute('loading', desktopImg.getAttribute('loading') || 'lazy');
      optimizedDesktopPic.querySelector('img').setAttribute('fetchpriority', desktopImg.getAttribute('fetchpriority') || 'low');
      carouselItem.append(optimizedDesktopPic);
    }

    // Mobile Image
    const mobileImageCell = cells[1];
    const mobileImg = mobileImageCell.querySelector('img');
    if (mobileImg) {
      const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt);
      moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
      optimizedMobilePic.querySelector('img').classList.add('banner-d-block', 'banner-d-sm-none', 'banner-w-100', 'banner-mobile-image');
      optimizedMobilePic.querySelector('img').setAttribute('loading', mobileImg.getAttribute('loading') || 'lazy');
      optimizedMobilePic.querySelector('img').setAttribute('fetchpriority', mobileImg.getAttribute('fetchpriority') || 'low');
      carouselItem.append(optimizedMobilePic);
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('banner-content-wrapper', 'banner-position-absolute');

    // Heading
    const headingCell = cells[2];
    const heading = headingCell.querySelector('h1');
    if (heading) {
      const newHeading = document.createElement('h1');
      newHeading.classList.add('banner-koi-carousel-heading', 'banner-text-sm-left');
      newHeading.setAttribute('data-color', heading.getAttribute('data-color'));
      newHeading.style.color = heading.style.color;
      newHeading.innerHTML = heading.innerHTML;
      contentWrapper.append(newHeading);
    }

    // Description
    const descriptionCell = cells[3];
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('banner-koi-carousel-description');
    descriptionDiv.setAttribute('data-desc-color', descriptionCell.querySelector('div')?.getAttribute('data-desc-color') || '');
    descriptionDiv.innerHTML = descriptionCell.innerHTML;
    contentWrapper.append(descriptionDiv);

    // CTA Button
    const ctaTextCell = cells[4];
    const ctaUrlCell = cells[5];
    const ctaLink = ctaUrlCell.querySelector('a');

    if (ctaLink && ctaTextCell) {
      const newCta = document.createElement('a');
      newCta.href = ctaLink.href;
      newCta.textContent = ctaTextCell.textContent.trim();
      newCta.classList.add('banner-koi-carousel-cta', 'banner-btn', 'banner-btn-primary', 'banner-btn-start-now');
      newCta.setAttribute('data-cmp-clickable', '');
      newCta.setAttribute('data-bg-color', ctaLink.getAttribute('data-bg-color'));
      newCta.setAttribute('alt', ctaLink.getAttribute('alt'));
      newCta.setAttribute('target', ctaLink.getAttribute('target'));
      newCta.style.backgroundColor = ctaLink.style.backgroundColor;

      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('banner-cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      newCta.append(screenReaderSpan);

      contentWrapper.append(newCta);
    }

    carouselItem.append(contentWrapper);
    innerDiv.append(carouselItem);
  });

  block.textContent = '';
  block.append(ol);
  block.append(innerDiv);

  // Add next and previous buttons
  const nextPrevDiv = document.createElement('div');
  nextPrevDiv.classList.add('banner-next-carousel-btn');

  const prevLink = document.createElement('a');
  prevLink.classList.add('banner-carousel-control-prev');
  prevLink.href = `#${carouselId}`;
  prevLink.setAttribute('role', 'button');
  prevLink.setAttribute('data-slide', 'prev');
  prevLink.innerHTML = '<span class="banner-carousel-control-prev-icon" aria-hidden="true"></span><span class="banner-sr-only">Previous</span>';
  nextPrevDiv.append(prevLink);

  const nextLink = document.createElement('a');
  nextLink.classList.add('banner-carousel-control-next');
  nextLink.href = `#${carouselId}`;
  nextLink.setAttribute('role', 'button');
  nextLink.setAttribute('data-slide', 'next');
  nextLink.innerHTML = '<span class="banner-carousel-control-next-icon" aria-hidden="true"></span><span class="banner-sr-only">Next</span>';
  nextPrevDiv.append(nextLink);

  block.append(nextPrevDiv);
}
