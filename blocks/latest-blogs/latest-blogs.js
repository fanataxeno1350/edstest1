import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');

  // First section (title, description, cta)
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');
  moveInstrumentation(block.children[0], firstSection); // Transfer instrumentation from the first row

  const titleElement = document.createElement('h2');
  titleElement.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
  const titleCell = block.children[0].children[0];
  if (titleCell) {
    titleElement.innerHTML = titleCell.innerHTML;
    moveInstrumentation(titleCell, titleElement);
  }
  firstSection.append(titleElement);

  const descElement = document.createElement('p');
  descElement.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
  const descCell = block.children[0].children[1];
  if (descCell) {
    descElement.innerHTML = descCell.innerHTML;
    moveInstrumentation(descCell, descElement);
  }
  firstSection.append(descElement);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');

  const ctaLink = document.createElement('a');
  ctaLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
  const ctaLinkCell = block.children[0].children[2];
  const ctaLabelCell = block.children[0].children[3];
  if (ctaLinkCell && ctaLinkCell.querySelector('a')) {
    const originalLink = ctaLinkCell.querySelector('a');
    ctaLink.href = originalLink.href;
    ctaLink.title = originalLink.title || ctaLabelCell.textContent.trim();
    ctaLink.textContent = ctaLabelCell.textContent.trim();
    moveInstrumentation(originalLink, ctaLink);
  } else if (ctaLinkCell) {
    // Fallback if no <a> in cell, but content exists
    ctaLink.href = ctaLinkCell.textContent.trim(); // Assuming URL is directly in cell
    ctaLink.textContent = ctaLabelCell ? ctaLabelCell.textContent.trim() : 'View All';
  }
  btnWrapper.append(ctaLink);
  firstSection.append(btnWrapper);
  wrapper.append(firstSection);

  // Second section (blog cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');

  // Loop through remaining rows for blog cards
  [...block.children].slice(1).forEach((row) => {
    const linkCell = row.children[0];
    const imageCell = row.children[1];
    const dateCell = row.children[2];
    const titleCell = row.children[3];

    if (linkCell && imageCell && dateCell && titleCell) {
      const cardLink = document.createElement('a');
      cardLink.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
      moveInstrumentation(row, cardLink); // Transfer instrumentation from the row to the card link

      const originalLink = linkCell.querySelector('a');
      if (originalLink) {
        cardLink.href = originalLink.href;
        cardLink.setAttribute('data-cta-label', originalLink.textContent.trim()); // Assuming cta-label from link text
      } else {
        cardLink.href = linkCell.textContent.trim();
        cardLink.setAttribute('data-cta-label', titleCell.textContent.trim());
      }

      const card = document.createElement('div');
      card.classList.add('latestblogs-latestBlogs-article_listing--cards');

      const cardImageWrapper = document.createElement('div');
      cardImageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');
      const img = imageCell.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cardImageWrapper.append(optimizedPic);
      }
      card.append(cardImageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');

      const dateP = document.createElement('p');
      dateP.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
      dateP.textContent = dateCell.textContent.trim();
      const originalDate = dateCell.querySelector('[data-date]');
      if (originalDate) {
        dateP.setAttribute('data-date', originalDate.getAttribute('data-date'));
      }
      moveInstrumentation(dateCell, dateP);
      contentWrapper.append(dateP);

      const titleP = document.createElement('p');
      titleP.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
      titleP.textContent = titleCell.textContent.trim();
      moveInstrumentation(titleCell, titleP);
      contentWrapper.append(titleP);

      card.append(contentWrapper);
      cardLink.append(card);
      secondSection.append(cardLink);
    }
  });

  wrapper.append(secondSection);

  block.textContent = '';
  block.append(wrapper);
}
