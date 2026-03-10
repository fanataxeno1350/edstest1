import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');
  moveInstrumentation(block, wrapper);

  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');
  wrapper.append(firstSection);

  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');
  wrapper.append(secondSection);

  // Process the first row for title, description, and view all link
  const firstRow = block.children[0];
  if (firstRow) {
    const titleCell = firstRow.children[0];
    const descriptionCell = firstRow.children[1];
    const viewAllLinkCell = firstRow.children[2];

    if (titleCell) {
      const h2 = document.createElement('h2');
      h2.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
      h2.innerHTML = titleCell.innerHTML;
      moveInstrumentation(titleCell, h2);
      firstSection.append(h2);
    }

    if (descriptionCell) {
      const p = document.createElement('p');
      p.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
      p.innerHTML = descriptionCell.innerHTML;
      moveInstrumentation(descriptionCell, p);
      firstSection.append(p);
    }

    if (viewAllLinkCell) {
      const link = viewAllLinkCell.querySelector('a');
      if (link) {
        const btnWrapper = document.createElement('div');
        btnWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.title = link.title;
        newLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
        newLink.textContent = link.textContent;
        moveInstrumentation(link, newLink);
        btnWrapper.append(newLink);
        firstSection.append(btnWrapper);
      }
    }
  }

  // Process subsequent rows for blog cards
  [...block.children].slice(1).forEach((row) => {
    const linkCell = row.children[0];
    const imageCell = row.children[1];
    const publishDateCell = row.children[2];
    const headingCell = row.children[3];

    const cardLink = document.createElement('a');
    cardLink.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
    moveInstrumentation(row, cardLink);

    if (linkCell) {
      const originalLink = linkCell.querySelector('a');
      if (originalLink) {
        cardLink.href = originalLink.href;
        cardLink.setAttribute('data-cta-label', originalLink.textContent.trim());
      }
    }

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('latestblogs-latestBlogs-article_listing--cards');
    cardLink.append(cardDiv);

    if (imageCell) {
      const img = imageCell.querySelector('img');
      if (img) {
        const cardImageWrapper = document.createElement('div');
        cardImageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cardImageWrapper.append(optimizedPic);
        cardDiv.append(cardImageWrapper);
      }
    }

    const contentWrapper = document.createElement('div');
    contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');
    cardDiv.append(contentWrapper);

    if (publishDateCell) {
      const pDate = document.createElement('p');
      pDate.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
      const originalDate = publishDateCell.textContent.trim();
      // Assuming the date is in a format that can be parsed directly or needs reformatting
      // For now, just use text content, if a specific format is needed, add date parsing logic
      pDate.textContent = originalDate;
      const dateAttr = publishDateCell.querySelector('p')?.getAttribute('data-date');
      if (dateAttr) {
        pDate.setAttribute('data-date', dateAttr);
      }
      moveInstrumentation(publishDateCell, pDate);
      contentWrapper.append(pDate);
    }

    if (headingCell) {
      const pHeading = document.createElement('p');
      pHeading.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
      pHeading.innerHTML = headingCell.innerHTML;
      moveInstrumentation(headingCell, pHeading);
      contentWrapper.append(pHeading);
    }

    secondSection.append(cardLink);
  });

  block.textContent = '';
  block.append(wrapper);
}