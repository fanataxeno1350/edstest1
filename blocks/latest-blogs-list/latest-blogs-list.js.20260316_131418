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

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]') || block.querySelector('a');
  if (viewAllLink) {
    viewAllLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
    viewAllLinkContainer.append(viewAllLink);
    moveInstrumentation(viewAllLink, viewAllLinkContainer);
  }
  firstSection.append(viewAllLinkContainer);
  moveInstrumentation(viewAllLinkContainer, firstSection);

  wrapperDiv.append(firstSection);
  moveInstrumentation(firstSection, wrapperDiv);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');

  const blogItems = block.querySelectorAll('[data-aue-model="blog"]');
  blogItems.forEach((itemNode) => {
    const link = itemNode.querySelector('[data-aue-prop="link"]') || itemNode.querySelector('a');
    if (link) {
      link.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
      const ctaLabel = link.getAttribute('data-cta-label');
      if (ctaLabel) {
        link.setAttribute('data-cta-label', ctaLabel);
      }

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('latestblogs-latestBlogs-article_listing--cards');

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');
      const image = itemNode.querySelector('[data-aue-prop="image"]') || itemNode.querySelector('img');
      if (image) {
        const picture = createOptimizedPicture(image.src, image.alt);
        picture.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
        imageWrapper.append(picture);
        moveInstrumentation(image, imageWrapper);
      }
      cardDiv.append(imageWrapper);
      moveInstrumentation(imageWrapper, cardDiv);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');

      const date = itemNode.querySelector('[data-aue-prop="date"]') || itemNode.querySelector('.latestblogs-latestBlogs-published_date');
      if (date) {
        date.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
        contentWrapper.append(date);
        moveInstrumentation(date, contentWrapper);
      }

      const blogTitle = itemNode.querySelector('[data-aue-prop="blogTitle"]') || itemNode.querySelector('.latestblogs-boing--text__body-2');
      if (blogTitle) {
        blogTitle.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
        contentWrapper.append(blogTitle);
        moveInstrumentation(blogTitle, contentWrapper);
      }
      cardDiv.append(contentWrapper);
      moveInstrumentation(contentWrapper, cardDiv);

      link.append(cardDiv);
      moveInstrumentation(cardDiv, link);
      secondSection.append(link);
      moveInstrumentation(itemNode, link); // Instrument the original itemNode to the new link container
    }
  });

  wrapperDiv.append(secondSection);
  moveInstrumentation(secondSection, wrapperDiv);

  block.textContent = '';
  block.append(wrapperDiv);
  block.className = 'latestblogs-latestBlogs-article_listing--wrapper block';
  block.dataset.blockStatus = 'loaded';
}