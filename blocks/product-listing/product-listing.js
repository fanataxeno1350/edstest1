import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const containerIn = document.createElement('div');
  containerIn.className = 'productlisting-container-in';

  const titleElement = block.querySelector('h1, h2, h3, h4, h5, h6');
  if (titleElement) {
    const h2 = document.createElement('h2');
    h2.className = 'productlisting-orange';
    h2.textContent = titleElement.textContent;
    containerIn.append(h2);
    moveInstrumentation(titleElement, h2);
  }

  const sliderDiv = document.createElement('div');
  sliderDiv.className = 'productlisting-slider';

  const flexsliderDiv = document.createElement('div');
  flexsliderDiv.className = 'productlisting-flexslider productlisting-carousel';

  const flexViewportDiv = document.createElement('div');
  flexViewportDiv.className = 'productlisting-flex-viewport';
  flexViewportDiv.style.overflow = 'hidden';
  flexViewportDiv.style.position = 'relative';

  const slidesUl = document.createElement('ul');
  slidesUl.className = 'productlisting-slides';

  const productItems = block.querySelectorAll('[data-aue-model="product"]');
  productItems.forEach((productNode) => {
    const li = document.createElement('li');
    li.style.width = '410px';
    li.style.marginRight = '40px';
    li.style.float = 'left';
    li.style.display = 'block';

    const article = document.createElement('article');
    article.className = 'productlisting-list-pro';

    const title = productNode.querySelector('[data-aue-prop="title"]');
    if (title) {
      const h5 = document.createElement('h5');
      h5.textContent = title.textContent;
      article.append(h5);
      moveInstrumentation(title, h5);
    }

    const figure = document.createElement('figure');
    const image = productNode.querySelector('[data-aue-prop="image"]');
    if (image) {
      const img = image.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        figure.append(picture);
        moveInstrumentation(image, picture);
      }
    } else {
      const imgFallback = productNode.querySelector('img');
      if (imgFallback) {
        const picture = createOptimizedPicture(imgFallback.src, imgFallback.alt);
        figure.append(picture);
        moveInstrumentation(imgFallback, picture);
      }
    }
    article.append(figure);

    const link = productNode.querySelector('[data-aue-prop="link"]');
    if (link) {
      const a = document.createElement('a');
      a.className = 'productlisting-r-more';
      a.href = link.href || '#';
      a.textContent = link.textContent || 'know more';
      article.append(a);
      article.append(document.createTextNode(' '));
      moveInstrumentation(link, a);
    }

    const divStyle = document.createElement('div');
    divStyle.style.fontSize = '9px';
    divStyle.style.position = 'relative';
    divStyle.style.margin = '10px 0';
    divStyle.style.textAlign = 'center';

    const itemListDiv = document.createElement('div');
    itemListDiv.className = 'productlisting-item-list';
    const ul = document.createElement('ul');
    const liItem = document.createElement('li');
    liItem.className = 'productlisting-first productlisting-last';
    ul.append(liItem);
    itemListDiv.append(ul);
    divStyle.append(itemListDiv);
    article.append(divStyle);

    li.append(article);
    slidesUl.append(li);
    moveInstrumentation(productNode, li);
  });

  flexViewportDiv.append(slidesUl);
  flexsliderDiv.append(flexViewportDiv);

  // Add navigation elements (empty as per the provided HTML structure)
  const olNav = document.createElement('ol');
  olNav.className = 'productlisting-flex-control-nav productlisting-flex-control-paging';
  flexsliderDiv.append(olNav);

  const ulNav = document.createElement('ul');
  ulNav.className = 'productlisting-flex-direction-nav';
  flexsliderDiv.append(ulNav);

  sliderDiv.append(flexsliderDiv);
  containerIn.append(sliderDiv);

  block.textContent = '';
  block.append(containerIn);
  block.className = `productlisting-product-listing block`;
  block.dataset.blockStatus = 'loaded';
}
