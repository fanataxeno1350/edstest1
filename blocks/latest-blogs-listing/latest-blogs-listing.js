import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main wrapper div
  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');

  // First section (title, description, CTA)
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');

  const titleElement = block.children[0]?.children[0]?.querySelector('h2');
  if (titleElement) {
    const newTitle = document.createElement('h2');
    newTitle.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
    newTitle.textContent = titleElement.textContent;
    firstSection.append(newTitle);
  }

  const descriptionElement = block.children[0]?.children[1]?.querySelector('p');
  if (descriptionElement) {
    const newDescription = document.createElement('p');
    newDescription.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
    newDescription.textContent = descriptionElement.textContent;
    firstSection.append(newDescription);
  }

  const ctaLinkElement = block.children[0]?.children[2]?.querySelector('a');
  if (ctaLinkElement) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');

    const newCtaLink = document.createElement('a');
    newCtaLink.href = ctaLinkElement.href;
    newCtaLink.title = ctaLinkElement.title;
    newCtaLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
    newCtaLink.textContent = ctaLinkElement.textContent.trim(); // Remove extra text content if any
    btnWrapper.append(newCtaLink);
    firstSection.append(btnWrapper);
  }
  mainWrapper.append(firstSection);

  // Second section (blog cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');

  // Loop through the remaining rows for blog cards
  [...block.children].slice(1).forEach((row) => {
    const cardLink = row.children[0]?.querySelector('a');
    const image = row.children[1]?.querySelector('img');
    const date = row.children[2]?.querySelector('p');
    const cardTitle = row.children[3]?.querySelector('p');

    if (cardLink) {
      const cardWrapper = document.createElement('a');
      moveInstrumentation(row, cardWrapper);
      cardWrapper.href = cardLink.href;
      cardWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
      if (cardLink.dataset.ctaLabel) {
        cardWrapper.dataset.ctaLabel = cardLink.dataset.ctaLabel;
      }

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('latestblogs-latestBlogs-article_listing--cards');

      if (image) {
        const cardImageWrapper = document.createElement('div');
        cardImageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');
        const optimizedPic = createOptimizedPicture(image.src, image.alt);
        moveInstrumentation(image, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
        cardImageWrapper.append(optimizedPic);
        cardDiv.append(cardImageWrapper);
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');

      if (date) {
        const newDate = document.createElement('p');
        newDate.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
        newDate.textContent = date.textContent;
        if (date.dataset.date) {
          newDate.dataset.date = date.dataset.date;
        }
        contentWrapper.append(newDate);
      }

      if (cardTitle) {
        const newCardTitle = document.createElement('p');
        newCardTitle.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
        newCardTitle.textContent = cardTitle.textContent;
        contentWrapper.append(newCardTitle);
      }

      cardDiv.append(contentWrapper);
      cardWrapper.append(cardDiv);
      secondSection.append(cardWrapper);
    }
  });

  mainWrapper.append(secondSection);

  block.textContent = '';
  block.append(mainWrapper);
}