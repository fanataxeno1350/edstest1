import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main wrapper div
  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');

  // First section for title, description, and CTA
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');

  // Extract title, description, and CTA from the first row of the block
  const firstRow = block.children[0];
  if (firstRow) {
    const titleCell = firstRow.children[0];
    const descriptionCell = firstRow.children[1];
    const ctaLinkCell = firstRow.children[2];

    if (titleCell) {
      const h2 = document.createElement('h2');
      h2.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
      h2.innerHTML = titleCell.innerHTML;
      moveInstrumentation(titleCell, h2);
      firstSection.append(h2);
    }

    if (descriptionCell) {
      const pDesc = document.createElement('p');
      pDesc.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
      pDesc.innerHTML = descriptionCell.innerHTML;
      moveInstrumentation(descriptionCell, pDesc);
      firstSection.append(pDesc);
    }

    if (ctaLinkCell) {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');
      const ctaLink = ctaLinkCell.querySelector('a');
      if (ctaLink) {
        const newCtaLink = document.createElement('a');
        newCtaLink.href = ctaLink.href;
        newCtaLink.title = ctaLink.title;
        newCtaLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
        newCtaLink.textContent = ctaLink.textContent.trim(); // Trim to remove extra text like SVG path
        moveInstrumentation(ctaLink, newCtaLink);
        ctaWrapper.append(newCtaLink);
      }
      firstSection.append(ctaWrapper);
    }
  }
  mainWrapper.append(firstSection);

  // Second section for blog cards
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');

  // Loop through the rest of the rows (starting from the second row) for blog cards
  [...block.children].slice(1).forEach((row) => {
    const linkCell = row.children[0];
    const imageCell = row.children[1];
    const dateCell = row.children[2];
    const headlineCell = row.children[3];

    if (linkCell && imageCell && dateCell && headlineCell) {
      const link = linkCell.querySelector('a');
      const img = imageCell.querySelector('img');
      const date = dateCell.textContent.trim();
      const headline = headlineCell.textContent.trim();

      if (link && img) {
        const cardWrapper = document.createElement('a');
        cardWrapper.href = link.href;
        cardWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
        cardWrapper.setAttribute('data-cta-label', link.textContent.trim());
        moveInstrumentation(row, cardWrapper);

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('latestblogs-latestBlogs-article_listing--cards');

        const cardImageWrapper = document.createElement('div');
        cardImageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');

        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cardImageWrapper.append(optimizedPic);
        cardDiv.append(cardImageWrapper);

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');

        const pDate = document.createElement('p');
        pDate.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
        pDate.textContent = date;
        pDate.setAttribute('data-date', dateCell.querySelector('p')?.getAttribute('data-date') || '');
        moveInstrumentation(dateCell, pDate);
        contentWrapper.append(pDate);

        const pHeadline = document.createElement('p');
        pHeadline.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
        pHeadline.textContent = headline;
        moveInstrumentation(headlineCell, pHeadline);
        contentWrapper.append(pHeadline);

        cardDiv.append(contentWrapper);
        cardWrapper.append(cardDiv);
        secondSection.append(cardWrapper);
      }
    }
  });

  mainWrapper.append(secondSection);

  block.textContent = '';
  block.classList.add('latestblogs-latestBlogs-article_listing--wrapper');
  block.append(mainWrapper);
}
