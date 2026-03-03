import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('latestblogs-latestBlogs-article_listing--wrapper');

  const articleListing = document.createElement('div');
  articleListing.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');
  wrapper.append(articleListing);

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');
  articleListing.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');
  articleListing.append(secondSection);

  // Process the first row for heading, description, and CTA
  const firstRow = block.children[0];
  if (firstRow) {
    const headingCell = firstRow.children[0];
    const descriptionCell = firstRow.children[1];
    const ctaLinkCell = firstRow.children[2];
    const ctaTextCell = firstRow.children[3];

    if (headingCell) {
      const h2 = document.createElement('h2');
      h2.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
      h2.innerHTML = headingCell.innerHTML;
      firstSection.append(h2);
    }

    if (descriptionCell) {
      const pDesc = document.createElement('p');
      pDesc.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
      pDesc.innerHTML = descriptionCell.innerHTML;
      firstSection.append(pDesc);
    }

    if (ctaLinkCell && ctaTextCell) {
      const btnWrapper = document.createElement('div');
      btnWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');
      const ctaLink = ctaLinkCell.querySelector('a');
      if (ctaLink) {
        const newCtaLink = document.createElement('a');
        newCtaLink.href = ctaLink.href;
        newCtaLink.title = ctaTextCell.textContent.trim();
        newCtaLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
        newCtaLink.textContent = ctaTextCell.textContent.trim();
        btnWrapper.append(newCtaLink);
        firstSection.append(btnWrapper);
      }
    }
    moveInstrumentation(firstRow, firstSection);
  }

  // Process the remaining rows for blog cards
  [...block.children].slice(1).forEach((row) => {
    const linkCell = row.children[0];
    const imageCell = row.children[1];
    const dateCell = row.children[2];
    const titleCell = row.children[3];

    if (linkCell && imageCell && dateCell && titleCell) {
      const cardLink = linkCell.querySelector('a');
      const img = imageCell.querySelector('img');

      if (cardLink && img) {
        const newCardLink = document.createElement('a');
        newCardLink.href = cardLink.href;
        newCardLink.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
        newCardLink.setAttribute('data-cta-label', cardLink.textContent.trim());
        moveInstrumentation(row, newCardLink);

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('latestblogs-latestBlogs-article_listing--cards');
        newCardLink.append(cardDiv);

        const cardImageWrapper = document.createElement('div');
        cardImageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cardImageWrapper.append(optimizedPic);
        cardDiv.append(cardImageWrapper);

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');
        cardDiv.append(contentWrapper);

        const dateP = document.createElement('p');
        dateP.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
        dateP.textContent = dateCell.textContent.trim();
        // Assuming dateCell might contain a data-date attribute, if not, it's fine
        const existingDateP = dateCell.querySelector('p[data-date]');
        if (existingDateP) {
          dateP.setAttribute('data-date', existingDateP.getAttribute('data-date'));
        }
        contentWrapper.append(dateP);

        const titleP = document.createElement('p');
        titleP.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
        titleP.innerHTML = titleCell.innerHTML;
        contentWrapper.append(titleP);

        secondSection.append(newCardLink);
      }
    }
  });

  block.textContent = '';
  block.append(wrapper);
}
