import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'latestBlogs-article_listing--wrapper';

  const listing = document.createElement('div');
  listing.className = 'latestBlogs-article_listing position-relative';

  const firstSection = document.createElement('div');
  firstSection.className = 'latestBlogs-article_listing_section--first text-white text-center';

  const title = block.querySelector('[data-aue-prop="title"]');
  if (title) {
    const h2 = document.createElement('h2');
    h2.className = 'latestBlogs-article_listing--title boing--text__heading-1 text-white pb-3';
    h2.append(...title.childNodes);
    moveInstrumentation(title, h2);
    firstSection.append(h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const p = document.createElement('p');
    p.className = 'latestBlogs-article_listing--desc boing--text__body-2 pb-4';
    p.append(...description.childNodes);
    moveInstrumentation(description, p);
    firstSection.append(p);
  }

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"]');
  const viewAllLabel = block.querySelector('[data-aue-prop="viewAllLabel"]');
  if (viewAllLink && viewAllLabel) {
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'latestBlogs-article_listing--btnWrapper';

    const a = document.createElement('a');
    a.className = 'boing--text__title-3 latestBlogs-article_listing--btn analytics_cta_click';
    a.href = viewAllLink.textContent.trim();
    a.title = viewAllLabel.textContent.trim();
    a.textContent = viewAllLabel.textContent.trim();

    moveInstrumentation(viewAllLink, a);
    moveInstrumentation(viewAllLabel, a);
    btnWrapper.append(a);
    firstSection.append(btnWrapper);
  }

  listing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.className = 'latestBlogs-article_listing_section--second d-flex';

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const link = cardNode.querySelector('[data-aue-prop="link"]');
    const image = cardNode.querySelector('[data-aue-prop="image"]');
    const date = cardNode.querySelector('[data-aue-prop="date"]');
    const blogTitle = cardNode.querySelector('[data-aue-prop="title"]');

    if (link && image && date && blogTitle) {
      const cardAnchor = document.createElement('a');
      cardAnchor.href = link.textContent.trim();
      cardAnchor.className = 'latestBlogs-article_listing--cardWrapper analytics_cta_click';
      cardAnchor.setAttribute('data-cta-label', blogTitle.textContent.trim());

      const cardDiv = document.createElement('div');
      cardDiv.className = 'latestBlogs-article_listing--cards';

      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.className = 'latestBlogs-article_listing--cardImageWrapper';
      const picture = createOptimizedPicture(image.src, image.alt || '', false, [{ width: '750' }]);
      picture.querySelector('img').className = 'latestBlogs-article_listing--cardImage w-100 h-100';
      cardImageWrapper.append(picture);
      moveInstrumentation(image, cardImageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'latestBlogs-cards_content--wrapper';

      const dateP = document.createElement('p');
      dateP.className = 'boing--text__body-5 p-0 m-0 mb-3 latestBlogs-published_date';
      dateP.textContent = date.textContent.trim();
      dateP.setAttribute('data-date', date.getAttribute('data-date'));
      moveInstrumentation(date, dateP);

      const titleP = document.createElement('p');
      titleP.className = 'boing--text__body-2 boing--text__body';
      titleP.textContent = blogTitle.textContent.trim();
      moveInstrumentation(blogTitle, titleP);

      contentWrapper.append(dateP, titleP);

      cardDiv.append(cardImageWrapper, contentWrapper);
      cardAnchor.append(cardDiv);

      moveInstrumentation(link, cardAnchor);
      moveInstrumentation(cardNode, cardAnchor);
      secondSection.append(cardAnchor);
    }
  });

  listing.append(secondSection);
  wrapper.append(listing);

  block.textContent = '';
  block.append(wrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
