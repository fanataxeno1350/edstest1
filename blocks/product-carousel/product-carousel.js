import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const productCarouselBox = document.createElement('div');
  productCarouselBox.className = 'product-carousel-box';

  const titleElement = block.querySelector('h1, h2, h3, h4, h5, h6');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.className = 'product-carousel-white';
    h2.textContent = titleElement.textContent;
    productCarouselBox.append(h2);
    moveInstrumentation(titleElement, h2);
  }

  const productCarouselBxWrapper = document.createElement('div');
  productCarouselBxWrapper.className = 'product-carousel-bx-wrapper';

  const productCarouselBxViewport = document.createElement('div');
  productCarouselBxViewport.className = 'product-carousel-bx-viewport';

  const productCarouselBxslider = document.createElement('ul');
  productCarouselBxslider.className = 'product-carousel-bxslider';

  const productItems = block.querySelectorAll(':scope > div');
  productItems.forEach((productItem) => {
    const li = document.createElement('li');

    const imageElement = productItem.querySelector('picture, img');
    if (imageElement) {
      const figure = document.createElement('figure');
      const img = imageElement.querySelector('img');
      if (img) {
        figure.append(createOptimizedPicture(img.src, img.alt));
      } else {
        figure.append(imageElement);
      }
      li.append(figure);
      moveInstrumentation(imageElement, figure);
    }

    const productCarouselDtl = document.createElement('div');
    productCarouselDtl.className = 'product-carousel-dtl';

    const title = productItem.querySelector('h1, h2, h3, h4, h5, h6');
    if (title) {
      const h1 = document.createElement('h1');
      h1.textContent = title.textContent;
      productCarouselDtl.append(h1);
      moveInstrumentation(title, h1);
    }

    const description = productItem.querySelector('p:not(.button-container), ul');
    if (description) {
      if (description.tagName === 'P') {
        const p = document.createElement('p');
        p.className = 'product-carousel-font-weight-100';
        p.innerHTML = description.innerHTML;
        productCarouselDtl.append(p);
        moveInstrumentation(description, p);
      } else if (description.tagName === 'UL') {
        productCarouselDtl.classList.add('product-carousel-bulletPoints');
        const ul = document.createElement('ul');
        ul.innerHTML = description.innerHTML;
        productCarouselDtl.append(ul);
        productCarouselDtl.append(document.createElement('br'));
        moveInstrumentation(description, ul);
      }
    }

    const readMoreLink = productItem.querySelector('.button-container a');
    if (readMoreLink) {
      const a = document.createElement('a');
      a.className = 'product-carousel-r-more';
      a.href = readMoreLink.href;
      a.textContent = readMoreLink.textContent;
      productCarouselDtl.append(a);
      moveInstrumentation(readMoreLink, a);
    }

    const buyNowLink = productItem.querySelector('span.button-container');
    if (buyNowLink) {
      const a = document.createElement('span');
      a.className = 'product-carousel-r-more';
      a.style.cursor = 'pointer !important';
      a.textContent = buyNowLink.textContent;
      a.onclick = () => window.open(buyNowLink.querySelector('a').href);
      productCarouselDtl.append(a);
      moveInstrumentation(buyNowLink, a);
    }

    li.append(productCarouselDtl);

    const disclaimer = productItem.querySelector('div:last-child');
    if (disclaimer && !disclaimer.querySelector('picture, img, h1, h2, h3, h4, h5, h6, p:not(.button-container), ul, .button-container')) {
      const productCarouselDis = document.createElement('div');
      productCarouselDis.className = 'product-carousel-dis';
      const productCarouselItemList = document.createElement('div');
      productCarouselItemList.className = 'product-carousel-item-list';
      const ul = document.createElement('ul');
      const liDisclaimer = document.createElement('li');
      liDisclaimer.className = 'product-carousel-first product-carousel-last';
      liDisclaimer.innerHTML = disclaimer.innerHTML;
      ul.append(liDisclaimer);
      productCarouselItemList.append(ul);
      productCarouselDis.append(productCarouselItemList);
      li.append(productCarouselDis);
      moveInstrumentation(disclaimer, productCarouselDis);
    }

    productCarouselBxslider.append(li);
    moveInstrumentation(productItem, li);
  });

  productCarouselBxViewport.append(productCarouselBxslider);
  productCarouselBxWrapper.append(productCarouselBxViewport);

  const productCarouselBxControls = document.createElement('div');
  productCarouselBxControls.className = 'product-carousel-bx-controls product-carousel-bx-has-pager product-carousel-bx-has-controls-direction';

  const productCarouselBxPager = document.createElement('div');
  productCarouselBxPager.className = 'product-carousel-bx-pager product-carousel-bx-default-pager';
  // Pager items will be added dynamically by the carousel script
  productCarouselBxControls.append(productCarouselBxPager);

  const productCarouselBxControlsDirection = document.createElement('div');
  productCarouselBxControlsDirection.className = 'product-carousel-bx-controls-direction';

  const prevLink = document.createElement('a');
  prevLink.className = 'product-carousel-bx-prev';
  prevLink.href = '';
  prevLink.textContent = 'Prev';
  productCarouselBxControlsDirection.append(prevLink);

  const nextLink = document.createElement('a');
  nextLink.className = 'product-carousel-bx-next';
  nextLink.href = '';
  nextLink.textContent = 'Next';
  productCarouselBxControlsDirection.append(nextLink);

  productCarouselBxControls.append(productCarouselBxControlsDirection);
  productCarouselBxWrapper.append(productCarouselBxControls);

  productCarouselBox.append(productCarouselBxWrapper);

  block.textContent = '';
  block.append(productCarouselBox);
  block.className = 'product-carousel block';
  block.dataset.blockStatus = 'loaded';
}
