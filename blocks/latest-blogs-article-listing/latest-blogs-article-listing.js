import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainWrapper = document.createElement('div');
  mainWrapper.className = 'latestblogs-latestBlogs-article_listing latestblogs-position-relative';

  // First section: Title, Description, and View All Button
  const firstSection = document.createElement('div');
  firstSection.className = 'latestblogs-latestBlogs-article_listing_section--first latestblogs-text-white latestblogs-text-center';
  moveInstrumentation(block.children[0], firstSection); // Transfer instrumentation from the first row

  const title = block.children[0].children[0].querySelector('h2');
  if (title) {
    firstSection.append(title);
  }

  const description = block.children[0].children[0].querySelector('p');
  if (description) {
    firstSection.append(description);
  }

  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'latestblogs-latestBlogs-article_listing--btnWrapper';
  const viewAllLink = block.children[0].children[0].querySelector('a');
  if (viewAllLink) {
    buttonWrapper.append(viewAllLink);
  }
  firstSection.append(buttonWrapper);
  mainWrapper.append(firstSection);

  // Second section: Blog Cards
  const secondSection = document.createElement('div');
  secondSection.className = 'latestblogs-latestBlogs-article_listing_section--second latestblogs-d-flex';

  // Loop through the remaining rows (starting from index 1) for blog cards
  [...block.children].slice(1).forEach((row) => {
    const link = row.children[0].querySelector('a');
    if (link) {
      const cardWrapper = document.createElement('a');
      cardWrapper.href = link.href;
      cardWrapper.className = 'latestblogs-latestBlogs-article_listing--cardWrapper latestblogs-analytics_cta_click';
      if (link.dataset.ctaLabel) {
        cardWrapper.setAttribute('data-cta-label', link.dataset.ctaLabel);
      }
      moveInstrumentation(row, cardWrapper); // Transfer instrumentation from the row to the card wrapper

      const card = document.createElement('div');
      card.className = 'latestblogs-latestBlogs-article_listing--cards';

      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'latestblogs-latestBlogs-article_listing--cardImageWrapper';
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageWrapper.append(optimizedPic);
      }
      card.append(imageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'latestblogs-latestBlogs-cards_content--wrapper';

      const date = link.querySelector('.latestblogs-latestBlogs-published_date');
      if (date) {
        contentWrapper.append(date);
      }

      const title = link.querySelector('.latestblogs-boing--text__body-2');
      if (title) {
        contentWrapper.append(title);
      }
      card.append(contentWrapper);
      cardWrapper.append(card);
      secondSection.append(cardWrapper);
    }
  });

  mainWrapper.append(secondSection);

  block.textContent = '';
  block.classList.add('latestblogs-latestBlogs-article_listing--wrapper');
  block.append(mainWrapper);
}
