import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('latestblogs-latestBlogs-article_listing--wrapper');

  const articleListing = document.createElement('div');
  articleListing.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');
  wrapper.append(articleListing);

  const [firstRow, ...cardRows] = block.children;

  // First section: Title, Description, CTA
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');
  moveInstrumentation(firstRow, firstSection);

  const headingCell = firstRow.children[0];
  const descriptionCell = firstRow.children[1];
  const ctaLinkCell = firstRow.children[2];
  const ctaTextCell = firstRow.children[3];

  if (headingCell) {
    const h2 = document.createElement('h2');
    h2.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
    h2.innerHTML = headingCell.innerHTML;
    moveInstrumentation(headingCell, h2);
    firstSection.append(h2);
  }

  if (descriptionCell) {
    const pDesc = document.createElement('p');
    pDesc.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
    pDesc.innerHTML = descriptionCell.innerHTML;
    moveInstrumentation(descriptionCell, pDesc);
    firstSection.append(pDesc);
  }

  if (ctaLinkCell && ctaTextCell) {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');

    const link = ctaLinkCell.querySelector('a');
    const cta = document.createElement('a');
    cta.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
    if (link) {
      cta.href = link.href;
      cta.title = ctaTextCell.textContent.trim();
      moveInstrumentation(link, cta);
    }
    cta.textContent = ctaTextCell.textContent.trim();
    moveInstrumentation(ctaTextCell, cta);
    btnWrapper.append(cta);
    firstSection.append(btnWrapper);
  }
  articleListing.append(firstSection);

  // Second section: Blog Cards
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');

  cardRows.forEach((row) => {
    const linkCell = row.children[0];
    const imageCell = row.children[1];
    const dateCell = row.children[2];
    const titleCell = row.children[3];

    const cardLink = document.createElement('a');
    cardLink.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
    moveInstrumentation(row, cardLink);

    const link = linkCell.querySelector('a');
    if (link) {
      cardLink.href = link.href;
      cardLink.setAttribute('data-cta-label', titleCell.textContent.trim());
      moveInstrumentation(linkCell, cardLink);
    }

    const card = document.createElement('div');
    card.classList.add('latestblogs-latestBlogs-article_listing--cards');

    if (imageCell) {
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
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');

    if (dateCell) {
      const pDate = document.createElement('p');
      pDate.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
      pDate.textContent = dateCell.textContent.trim();
      // Assuming the date string in the cell is already formatted correctly or can be parsed.
      // If dateCell contains a specific date format, you might need to parse and reformat it.
      // For now, directly use the text content.
      const date = new Date(dateCell.textContent.trim()); // Attempt to parse date for data-date attribute
      if (!Number.isNaN(date.getTime())) {
        pDate.setAttribute('data-date', date.toISOString());
      }
      moveInstrumentation(dateCell, pDate);
      contentWrapper.append(pDate);
    }

    if (titleCell) {
      const pTitle = document.createElement('p');
      pTitle.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
      pTitle.innerHTML = titleCell.innerHTML;
      moveInstrumentation(titleCell, pTitle);
      contentWrapper.append(pTitle);
    }

    card.append(contentWrapper);
    cardLink.append(card);
    secondSection.append(cardLink);
  });

  articleListing.append(secondSection);

  block.textContent = '';
  block.append(wrapper);
}
