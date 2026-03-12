import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const sectionWrapper = document.createElement('section');
  sectionWrapper.classList.add('article_listing--wrapper');

  const articleListing = document.createElement('div');
  articleListing.classList.add('article_listing', 'position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('article_listing_section--first', 'text-white', 'text-center');

  const titleElement = block.querySelector('h2');
  if (titleElement) {
    titleElement.classList.add('article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
    firstSection.append(titleElement);
    moveInstrumentation(titleElement, firstSection);
  }

  const descriptionElement = block.querySelector('p');
  if (descriptionElement) {
    descriptionElement.classList.add('article_listing--desc', 'boing--text__body-2', 'pb-4');
    firstSection.append(descriptionElement);
    moveInstrumentation(descriptionElement, firstSection);
  }

  const buttonWrapper = document.createElement('div');
  buttonWrapper.classList.add('article_listing--btnWrapper');
  const buttonLink = block.querySelector('.button-container a');
  if (buttonLink) {
    buttonLink.classList.add('boing--text__title-3', 'article_listing--btn', 'analytics_cta_click');
    const svgIcon = document.createElement('svg');
    svgIcon.classList.add('arrow-icon');
    const useElement = document.createElement('use');
    useElement.setAttribute('xlink:href', '/etc.clientlibs/itc-family-comedy/clientlibs/clientlib-boing/resources/images/sprite/sprite-boing.svg#arrow_forward');
    svgIcon.append(useElement);
    buttonLink.append(svgIcon);
    buttonWrapper.append(buttonLink);
    firstSection.append(buttonWrapper);
    moveInstrumentation(buttonLink.closest('.button-container'), buttonWrapper);
  }

  articleListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('article_listing_section--second', 'd-flex');

  const blogItems = block.querySelectorAll('[data-aue-model="blogItem"]');
  blogItems.forEach((itemNode) => {
    const cardLink = document.createElement('a');
    cardLink.classList.add('article_listing--cardWrapper', 'analytics_cta_click');

    const linkElement = itemNode.querySelector('[data-aue-prop="link"]');
    if (linkElement) {
      cardLink.href = linkElement.href;
      cardLink.setAttribute('data-cta-label', linkElement.textContent.trim());
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('article_listing--cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('article_listing--cardImageWrapper');

    const imageElement = itemNode.querySelector('[data-aue-prop="image"]');
    if (imageElement) {
      const img = imageElement.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt || '', false, [{ width: '750' }]);
        picture.querySelector('img').classList.add('article_listing--cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(picture);
      }
    } else {
      // Fallback for image if data-aue-prop is not found, check for an <a> with image extension
      const fallbackImgLink = itemNode.querySelector('a[href$=".png"], a[href$=".jpg"], a[href$=".jpeg"], a[href$=".gif"]');
      if (fallbackImgLink) {
        const img = document.createElement('img');
        img.src = fallbackImgLink.href;
        img.alt = fallbackImgLink.textContent || '';
        const picture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        picture.querySelector('img').classList.add('article_listing--cardImage', 'w-100', 'h-100');
        cardImageWrapper.append(picture);
      }
    }
    cardDiv.append(cardImageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('cards_content--wrapper');

    const publishedDateElement = itemNode.querySelector('[data-aue-prop="publishedDate"]');
    if (publishedDateElement) {
      const dateP = document.createElement('p');
      dateP.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'published_date');
      dateP.textContent = publishedDateElement.textContent;
      const dateAttr = publishedDateElement.getAttribute('data-date');
      if (dateAttr) {
        dateP.setAttribute('data-date', dateAttr);
      }
      contentWrapper.append(dateP);
      moveInstrumentation(publishedDateElement, dateP);
    }

    const titleTextElement = itemNode.querySelector('[data-aue-prop="title"]');
    if (titleTextElement) {
      const titleP = document.createElement('p');
      titleP.classList.add('boing--text__body-2', 'boing--text__body');
      titleP.textContent = titleTextElement.textContent;
      contentWrapper.append(titleP);
      moveInstrumentation(titleTextElement, titleP);
    }

    cardDiv.append(contentWrapper);
    cardLink.append(cardDiv);
    secondSection.append(cardLink);
    moveInstrumentation(itemNode, cardLink);
  });

  articleListing.append(secondSection);
  sectionWrapper.append(articleListing);

  block.textContent = '';
  block.append(sectionWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
