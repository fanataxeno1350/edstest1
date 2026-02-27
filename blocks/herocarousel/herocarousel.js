import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const herocarouselSection = document.createElement('section');
  herocarouselSection.classList.add('herocarousel-section');
  moveInstrumentation(block, herocarouselSection);

  const carouselDiv = document.createElement('div');
  carouselDiv.id = 'carouselExampleSlidesOnly';
  carouselDiv.classList.add('herocarousel-banner-carousel', 'herocarousel-carousel', 'herocarousel-slide');
  carouselDiv.setAttribute('data-ride', 'carousel');

  const olIndicators = document.createElement('ol');
  olIndicators.classList.add('herocarousel-carousel-indicators');

  const carouselInner = document.createElement('div');
  carouselInner.classList.add('herocarousel-carousel-inner');

  [...block.children].forEach((row, index) => {
    const cells = [...row.children];

    // Indicators
    const liIndicator = document.createElement('li');
    liIndicator.setAttribute('data-target', '#carouselExampleSlidesOnly');
    liIndicator.setAttribute('data-slide-to', index.toString());
    if (index === 0) {
      liIndicator.classList.add('herocarousel-active');
    }
    olIndicators.append(liIndicator);

    // Carousel Item
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('herocarousel-carousel-item');
    if (index === 0) {
      carouselItem.classList.add('herocarousel-active');
    }
    moveInstrumentation(row, carouselItem);

    const desktopImageCell = cells[0];
    const mobileImageCell = cells[1];
    const headingCell = cells[2];
    const descriptionCell = cells[3];
    const ctaTextCell = cells[4];
    const ctaUrlCell = cells[5];

    if (desktopImageCell) {
      const desktopImg = desktopImageCell.querySelector('img');
      if (desktopImg) {
        const optimizedDesktopPic = createOptimizedPicture(desktopImg.src, desktopImg.alt);
        optimizedDesktopPic.querySelector('img').classList.add('herocarousel-d-none', 'herocarousel-d-sm-block', 'herocarousel-w-100', 'herocarousel-desktop-image');
        optimizedDesktopPic.querySelector('img').setAttribute('loading', desktopImg.getAttribute('loading') || 'lazy');
        optimizedDesktopPic.querySelector('img').setAttribute('fetchpriority', desktopImg.getAttribute('fetchpriority') || 'low');
        moveInstrumentation(desktopImg, optimizedDesktopPic.querySelector('img'));
        carouselItem.append(optimizedDesktopPic);
      }
    }

    if (mobileImageCell) {
      const mobileImg = mobileImageCell.querySelector('img');
      if (mobileImg) {
        const optimizedMobilePic = createOptimizedPicture(mobileImg.src, mobileImg.alt);
        optimizedMobilePic.querySelector('img').classList.add('herocarousel-d-block', 'herocarousel-d-sm-none', 'herocarousel-w-100', 'herocarousel-mobile-image');
        optimizedMobilePic.querySelector('img').setAttribute('loading', mobileImg.getAttribute('loading') || 'lazy');
        optimizedMobilePic.querySelector('img').setAttribute('fetchpriority', mobileImg.getAttribute('fetchpriority') || 'low');
        moveInstrumentation(mobileImg, optimizedMobilePic.querySelector('img'));
        carouselItem.append(optimizedMobilePic);
      }
    }

    const bannerContentWrapper = document.createElement('div');
    bannerContentWrapper.classList.add('herocarousel-banner-content-wrapper', 'herocarousel-position-absolute');

    if (headingCell) {
      const heading = headingCell.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
        const newHeading = document.createElement('h1');
        newHeading.classList.add('herocarousel-koi-carousel-heading', 'herocarousel-text-sm-left');
        newHeading.setAttribute('data-color', heading.getAttribute('data-color') || '#3c2904');
        newHeading.style.color = heading.style.color || 'rgb(60, 41, 4)';
        newHeading.textContent = heading.textContent;
        moveInstrumentation(heading, newHeading);
        bannerContentWrapper.append(newHeading);
      }
    }

    if (descriptionCell) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.classList.add('herocarousel-koi-carousel-description');
      descriptionDiv.setAttribute('data-desc-color', descriptionCell.querySelector('div')?.getAttribute('data-desc-color') || '#3c2904');

      const h3 = descriptionCell.querySelector('h3');
      if (h3) {
        const newH3 = document.createElement('h3');
        newH3.style.color = h3.style.color || 'rgb(60, 41, 4)';
        const i = h3.querySelector('i');
        if (i) {
          const newI = document.createElement('i');
          newI.style.color = i.style.color || 'rgb(60, 41, 4)';
          newI.textContent = i.textContent;
          newH3.append(newI);
        } else {
          newH3.textContent = h3.textContent;
        }
        moveInstrumentation(h3, newH3);
        descriptionDiv.append(newH3);
      }

      const p = descriptionCell.querySelector('p');
      if (p) {
        const newP = document.createElement('p');
        newP.style.color = p.style.color || 'rgb(60, 41, 4)';
        newP.textContent = p.textContent;
        moveInstrumentation(p, newP);
        descriptionDiv.append(newP);
      }
      moveInstrumentation(descriptionCell, descriptionDiv);
      bannerContentWrapper.append(descriptionDiv);
    }

    if (ctaUrlCell) {
      const ctaLink = ctaUrlCell.querySelector('a');
      if (ctaLink) {
        const newCtaLink = document.createElement('a');
        newCtaLink.href = ctaLink.href;
        newCtaLink.setAttribute('data-cmp-clickable', '');
        newCtaLink.setAttribute('data-cmp-data-layer', ctaLink.getAttribute('data-cmp-data-layer') || '');
        newCtaLink.setAttribute('data-bg-color', ctaLink.getAttribute('data-bg-color') || '#6c3003');
        newCtaLink.alt = ctaLink.alt || 'Shop Now';
        newCtaLink.target = ctaLink.target || '_blank';
        newCtaLink.classList.add('herocarousel-koi-carousel-cta', 'herocarousel-btn', 'herocarousel-btn-primary', 'herocarousel-btn-start-now');
        newCtaLink.style.backgroundColor = ctaLink.style.backgroundColor || 'rgb(108, 48, 3)';
        newCtaLink.textContent = ctaTextCell?.textContent.trim() || ctaLink.textContent.trim();

        const span = document.createElement('span');
        span.classList.add('herocarousel-cmp-link__screen-reader-only');
        span.textContent = 'opens in a new tab';
        newCtaLink.append(span);
        moveInstrumentation(ctaLink, newCtaLink);
        bannerContentWrapper.append(newCtaLink);
      }
    }

    carouselItem.append(bannerContentWrapper);
    carouselInner.append(carouselItem);
  });

  carouselDiv.append(olIndicators);
  carouselDiv.append(carouselInner);

  // Next and previous buttons
  const nextCarouselBtn = document.createElement('div');
  nextCarouselBtn.classList.add('herocarousel-next-carousel-btn');

  const prevLink = document.createElement('a');
  prevLink.classList.add('herocarousel-carousel-control-prev');
  prevLink.href = '#carouselExampleSlidesOnly';
  prevLink.setAttribute('role', 'button');
  prevLink.setAttribute('data-slide', 'prev');
  const prevSpanIcon = document.createElement('span');
  prevSpanIcon.classList.add('herocarousel-carousel-control-prev-icon');
  prevSpanIcon.setAttribute('aria-hidden', 'true');
  const prevSpanSrOnly = document.createElement('span');
  prevSpanSrOnly.classList.add('herocarousel-sr-only');
  prevSpanSrOnly.textContent = 'Previous';
  prevLink.append(prevSpanIcon, prevSpanSrOnly);

  const nextLink = document.createElement('a');
  nextLink.classList.add('herocarousel-carousel-control-next');
  nextLink.href = '#carouselExampleSlidesOnly';
  nextLink.setAttribute('role', 'button');
  nextLink.setAttribute('data-slide', 'next');
  const nextSpanIcon = document.createElement('span');
  nextSpanIcon.classList.add('herocarousel-carousel-control-next-icon');
  nextSpanIcon.setAttribute('aria-hidden', 'true');
  const nextSpanSrOnly = document.createElement('span');
  nextSpanSrOnly.classList.add('herocarousel-sr-only');
  nextSpanSrOnly.textContent = 'Next';
  nextLink.append(nextSpanIcon, nextSpanSrOnly);

  nextCarouselBtn.append(prevLink, nextLink);
  carouselDiv.append(nextCarouselBtn);

  herocarouselSection.append(carouselDiv);

  block.textContent = '';
  block.append(herocarouselSection);
}
