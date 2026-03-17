import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.className = 'latestBlogs-article_listing--wrapper';

  const listingDiv = document.createElement('div');
  listingDiv.className = 'latestBlogs-article_listing position-relative';

  const firstSection = document.createElement('div');
  firstSection.className = 'latestBlogs-article_listing_section--first text-white text-center';

  const heading = block.querySelector('[data-aue-prop="heading"]') || block.querySelector('h2');
  if (heading) {
    heading.classList.add('latestBlogs-article_listing--title', 'boing--text__heading-1', 'text-white', 'pb-3');
    firstSection.append(heading);
    moveInstrumentation(heading, firstSection);
  }

  const description = block.querySelector('[data-aue-prop="description"]') || block.querySelector('p');
  if (description) {
    description.classList.add('latestBlogs-article_listing--desc', 'boing--text__body-2', 'pb-4');
    firstSection.append(description);
    moveInstrumentation(description, firstSection);
  }

  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'latestBlogs-article_listing--btnWrapper';

  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]') || block.querySelector('.button-container a');
  if (ctaLink) {
    ctaLink.classList.add('boing--text__title-3', 'latestBlogs-article_listing--btn', 'analytics_cta_click');
    btnWrapper.append(ctaLink);
    moveInstrumentation(ctaLink, btnWrapper);
  }
  firstSection.append(btnWrapper);

  listingDiv.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.className = 'latestBlogs-article_listing_section--second d-flex';

  const articles = block.querySelectorAll('[data-aue-model="latestBlogsArticle"]');
  articles.forEach((articleNode) => {
    const cardLink = document.createElement('a');
    cardLink.className = 'latestBlogs-article_listing--cardWrapper analytics_cta_click';

    const linkHref = articleNode.querySelector('[data-aue-prop="link"]')?.getAttribute('href') || articleNode.querySelector('a')?.getAttribute('href');
    if (linkHref) {
      cardLink.href = linkHref;
    }

    const ctaLabel = articleNode.querySelector('[data-aue-prop="title"]')?.textContent || articleNode.querySelector('p:last-of-type')?.textContent;
    if (ctaLabel) {
      cardLink.setAttribute('data-cta-label', ctaLabel.trim());
    }

    const cardDiv = document.createElement('div');
    cardDiv.className = 'latestBlogs-article_listing--cards';

    const cardImageWrapper = document.createElement('div');
    cardImageWrapper.className = 'latestBlogs-article_listing--cardImageWrapper';

    const image = articleNode.querySelector('[data-aue-prop="image"]') || articleNode.querySelector('img');
    if (image) {
      const picture = createOptimizedPicture(image.src, image.alt);
      picture.querySelector('img').classList.add('latestBlogs-article_listing--cardImage', 'w-100', 'h-100');
      cardImageWrapper.append(picture);
      moveInstrumentation(image, cardImageWrapper);
    }
    cardDiv.append(cardImageWrapper);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'latestBlogs-cards_content--wrapper';

    const date = articleNode.querySelector('[data-aue-prop="date"]') || articleNode.querySelector('.latestBlogs-published_date');
    if (date) {
      date.classList.add('boing--text__body-5', 'p-0', 'm-0', 'mb-3', 'latestBlogs-published_date');
      contentWrapper.append(date);
      moveInstrumentation(date, contentWrapper);
    }

    const title = articleNode.querySelector('[data-aue-prop="title"]') || articleNode.querySelector('p:last-of-type');
    if (title) {
      title.classList.add('boing--text__body-2', 'boing--text__body');
      contentWrapper.append(title);
      moveInstrumentation(title, contentWrapper);
    }

    cardDiv.append(contentWrapper);
    cardLink.append(cardDiv);
    secondSection.append(cardLink);
    moveInstrumentation(articleNode, cardLink);
  });

  listingDiv.append(secondSection);
  wrapperDiv.append(listingDiv);

  block.textContent = '';
  block.append(wrapperDiv);
  block.className = `latestBlogs-article-list block`;
  block.dataset.blockStatus = 'loaded';
}
