import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');

  const title = block.querySelector('[data-aue-prop="title"]') || block.querySelector('h2');
  if (title) {
    title.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
    firstSection.append(title);
    moveInstrumentation(title, firstSection);
  }

  const description = block.querySelector('[data-aue-prop="description"]') || block.querySelector('p');
  if (description) {
    description.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
    firstSection.append(description);
    moveInstrumentation(description, firstSection);
  }

  const viewAllLinkContainer = document.createElement('div');
  viewAllLinkContainer.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');
  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]') || block.querySelector('.button-container a');
  if (viewAllLink) {
    viewAllLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
    viewAllLinkContainer.append(viewAllLink);
    moveInstrumentation(viewAllLink, viewAllLinkContainer);
  }
  firstSection.append(viewAllLinkContainer);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');

  const articleCards = block.querySelectorAll('[data-aue-model="articleCard"]');
  articleCards.forEach((cardNode) => {
    const linkElement = cardNode.querySelector('[data-aue-prop="link"]') || cardNode.querySelector('a');
    if (linkElement) {
      const cardWrapper = document.createElement('a');
      cardWrapper.href = linkElement.href;
      cardWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
      if (linkElement.title) {
        cardWrapper.setAttribute('title', linkElement.title);
      }
      if (linkElement.dataset.ctaLabel) {
        cardWrapper.dataset.ctaLabel = linkElement.dataset.ctaLabel;
      }

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('latestblogs-latestBlogs-article_listing--cards');

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');
      const image = cardNode.querySelector('[data-aue-prop="image"] img');
      if (image) {
        const picture = createOptimizedPicture(image.src, image.alt);
        picture.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
        imageWrapper.append(picture);
        moveInstrumentation(image, imageWrapper);
      } else {
        const imgLink = cardNode.querySelector('a[href$=".webp"], a[href$=".png"], a[href$=".jpeg"], a[href$=".jpg"], a[href$=".svg"]');
        if (imgLink) {
          const picture = createOptimizedPicture(imgLink.href, '');
          picture.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
          imageWrapper.append(picture);
          moveInstrumentation(imgLink, imageWrapper);
        }
      }
      cardDiv.append(imageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');

      const publishedDate = cardNode.querySelector('[data-aue-prop="publishedDate"]') || cardNode.querySelector('.latestblogs-latestBlogs-published_date');
      if (publishedDate) {
        publishedDate.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
        contentWrapper.append(publishedDate);
        moveInstrumentation(publishedDate, contentWrapper);
      }

      const headline = cardNode.querySelector('[data-aue-prop="headline"]') || cardNode.querySelector('.latestblogs-boing--text__body');
      if (headline) {
        headline.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
        contentWrapper.append(headline);
        moveInstrumentation(headline, contentWrapper);
      }

      cardDiv.append(contentWrapper);
      cardWrapper.append(cardDiv);
      secondSection.append(cardWrapper);
      moveInstrumentation(cardNode, cardWrapper);
    }
  });

  wrapperDiv.append(firstSection, secondSection);
  block.textContent = '';
  block.append(wrapperDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}