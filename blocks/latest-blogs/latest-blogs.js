import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.className = 'latestblogs-latestBlogs-article_listing latestblogs-position-relative';

  // First section (title, description, button)
  const firstSection = document.createElement('div');
  firstSection.className = 'latestblogs-latestBlogs-article_listing_section--first latestblogs-text-white latestblogs-text-center';

  const title = document.createElement('h2');
  title.className = 'latestblogs-latestBlogs-article_listing--title latestblogs-boing--text__heading-1 latestblogs-text-white latestblogs-pb-3';
  title.textContent = block.children[0].children[0].textContent.trim(); // Assuming first cell of first row has title
  firstSection.append(title);

  const description = document.createElement('p');
  description.className = 'latestblogs-latestBlogs-article_listing--desc latestblogs-boing--text__body-2 latestblogs-pb-4';
  description.textContent = block.children[0].children[1].textContent.trim(); // Assuming second cell of first row has description
  firstSection.append(description);

  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'latestblogs-latestBlogs-article_listing--btnWrapper';
  const viewAllLink = block.children[0].children[2].querySelector('a'); // Assuming third cell of first row has the link
  if (viewAllLink) {
    const newLink = document.createElement('a');
    newLink.href = viewAllLink.href;
    newLink.title = viewAllLink.title;
    newLink.className = 'latestblogs-boing--text__title-3 latestblogs-latestBlogs-article_listing--btn latestblogs-analytics_cta_click';
    newLink.textContent = viewAllLink.textContent.trim();
    btnWrapper.append(newLink);
  }
  firstSection.append(btnWrapper);
  wrapper.append(firstSection);

  // Second section (blog cards)
  const secondSection = document.createElement('div');
  secondSection.className = 'latestblogs-latestBlogs-article_listing_section--second latestblogs-d-flex';

  // Loop through remaining rows (which are blog cards)
  [...block.children].slice(1).forEach((row) => {
    const link = row.children[0].querySelector('a');
    if (link) {
      const cardWrapper = document.createElement('a');
      moveInstrumentation(row, cardWrapper); // Transfer instrumentation from the row to the new link element
      cardWrapper.href = link.href;
      cardWrapper.className = 'latestblogs-latestBlogs-article_listing--cardWrapper latestblogs-analytics_cta_click';
      cardWrapper.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));

      const card = document.createElement('div');
      card.className = 'latestblogs-latestBlogs-article_listing--cards';

      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.className = 'latestblogs-latestBlogs-article_listing--cardImageWrapper';
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').className = 'latestblogs-latestBlogs-article_listing--cardImage latestblogs-w-100 latestblogs-h-100';
        moveInstrumentation(img, optimizedPic.querySelector('img')); // Transfer instrumentation from original img to optimized img
        cardImageWrapper.append(optimizedPic);
      }
      card.append(cardImageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'latestblogs-latestBlogs-cards_content--wrapper';

      const dateP = link.querySelector('p[data-date]');
      if (dateP) {
        const newDateP = document.createElement('p');
        newDateP.className = 'latestblogs-boing--text__body-5 latestblogs-p-0 latestblogs-m-0 latestblogs-mb-3 latestblogs-latestBlogs-published_date';
        newDateP.setAttribute('data-date', dateP.getAttribute('data-date'));
        newDateP.textContent = dateP.textContent.trim();
        contentWrapper.append(newDateP);
      }

      const titleP = link.querySelector('p:not([data-date])');
      if (titleP) {
        const newTitleP = document.createElement('p');
        newTitleP.className = 'latestblogs-boing--text__body-2 latestblogs-boing--text__body';
        newTitleP.textContent = titleP.textContent.trim();
        contentWrapper.append(newTitleP);
      }

      card.append(contentWrapper);
      cardWrapper.append(card);
      secondSection.append(cardWrapper);
    }
  });

  wrapper.append(secondSection);

  block.textContent = '';
  block.append(wrapper);
}