import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');

  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
    h2.append(...title.childNodes);
    moveInstrumentation(title, h2);
    firstSection.append(h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const pDesc = document.createElement('p');
    pDesc.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
    pDesc.append(...description.childNodes);
    moveInstrumentation(description, pDesc);
    firstSection.append(pDesc);
  }

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  if (viewAllLink) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');

    const link = viewAllLink.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.title = link.title;
      newLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
      newLink.textContent = link.textContent.trim(); // Get the text content, not the URL
      moveInstrumentation(link, newLink);
      btnWrapper.append(newLink);
    }
    moveInstrumentation(viewAllLink, btnWrapper);
    firstSection.append(btnWrapper);
  }

  mainDiv.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const linkElement = cardNode.querySelector('[data-aue-prop="link"]');
    const imageElement = cardNode.querySelector('[data-aue-prop="image"]');
    const publishedDateElement = cardNode.querySelector('[data-aue-prop="publishedDate"]');
    const blogTitleElement = cardNode.querySelector('[data-aue-prop="blogTitle"]');

    const cardLink = document.createElement('a');
    cardLink.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
    if (linkElement && linkElement.querySelector('a')) {
      const authoredLink = linkElement.querySelector('a');
      cardLink.href = authoredLink.href;
      cardLink.setAttribute('data-cta-label', authoredLink.title || authoredLink.textContent.trim());
      moveInstrumentation(authoredLink, cardLink);
    } else if (linkElement) {
      cardLink.href = linkElement.textContent.trim();
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestblogs-latestBlogs-article_listing--cards');

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');
    if (imageElement && imageElement.querySelector('img')) {
      const img = imageElement.querySelector('img');
      const picture = createOptimizedPicture(img.src, img.alt || '', false, [{
        width: '750'
      }]);
      picture.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
      cardImageWrapper.append(picture);
      moveInstrumentation(img, picture);
    }
    moveInstrumentation(imageElement, cardImageWrapper);
    cardDiv.append(cardImageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');

    if (publishedDateElement) {
      const pDate = document.createElement('p');
      pDate.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
      // Assuming the date is within the element or its textContent
      pDate.textContent = publishedDateElement.textContent.trim();
      const dataDate = publishedDateElement.getAttribute('data-date');
      if (dataDate) {
        pDate.setAttribute('data-date', dataDate);
      }
      moveInstrumentation(publishedDateElement, pDate);
      contentWrapper.append(pDate);
    }

    if (blogTitleElement) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
      pTitle.append(...blogTitleElement.childNodes);
      moveInstrumentation(blogTitleElement, pTitle);
      contentWrapper.append(pTitle);
    }

    cardDiv.append(contentWrapper);
    cardLink.append(cardDiv);
    moveInstrumentation(cardNode, cardLink);
    secondSection.append(cardLink);
  });

  mainDiv.append(secondSection);

  block.textContent = '';
  block.append(mainDiv);
  block.className = 'latestblogs-latestBlogs-article_listing--wrapper block';
  block.dataset.blockStatus = 'loaded';
}
