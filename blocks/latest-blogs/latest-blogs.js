import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');
  moveInstrumentation(block, wrapper);

  // First section (title, description, cta)
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');

  const titleRow = block.children[0];
  if (titleRow) {
    const titleCell = titleRow.children[0];
    if (titleCell) {
      const h2 = document.createElement('h2');
      h2.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
      h2.innerHTML = titleCell.innerHTML;
      moveInstrumentation(titleCell, h2);
      firstSection.append(h2);
    }
  }

  const descriptionRow = block.children[1];
  if (descriptionRow) {
    const descriptionCell = descriptionRow.children[0];
    if (descriptionCell) {
      const p = document.createElement('p');
      p.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
      p.innerHTML = descriptionCell.innerHTML;
      moveInstrumentation(descriptionCell, p);
      firstSection.append(p);
    }
  }

  const ctaRow = block.children[2];
  if (ctaRow) {
    const ctaLinkCell = ctaRow.children[0];
    const ctaLabelCell = ctaRow.children[1];
    // const ctaIconCell = ctaRow.children[2]; // CTA Icon is not present in the provided HTML for the button

    if (ctaLinkCell && ctaLabelCell) {
      const btnWrapper = document.createElement('div');
      btnWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');

      const link = ctaLinkCell.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.title = ctaLabelCell.textContent.trim(); // Use ctaLabel for title
        newLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
        newLink.textContent = ctaLabelCell.textContent.trim();
        moveInstrumentation(link, newLink);
        btnWrapper.append(newLink);
      }
      firstSection.append(btnWrapper);
    }
  }
  wrapper.append(firstSection);

  // Second section (blog cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');

  // Loop through the remaining rows for blog cards
  [...block.children].slice(3).forEach((row) => {
    const linkCell = row.children[0];
    const imageCell = row.children[1];
    const publishedDateCell = row.children[2];
    const headlineCell = row.children[3];

    if (linkCell && imageCell && publishedDateCell && headlineCell) {
      const link = linkCell.querySelector('a');
      const img = imageCell.querySelector('img');

      if (link && img) {
        const cardWrapper = document.createElement('a');
        cardWrapper.href = link.href;
        cardWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
        cardWrapper.setAttribute('data-cta-label', headlineCell.textContent.trim());
        moveInstrumentation(row, cardWrapper);

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('latestblogs-latestBlogs-article_listing--cards');

        const cardImageWrapper = document.createElement('div');
        cardImageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        cardImageWrapper.append(optimizedPic);
        cardDiv.append(cardImageWrapper);

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');

        const publishedDateP = document.createElement('p');
        publishedDateP.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
        publishedDateP.setAttribute('data-date', publishedDateCell.textContent.trim()); // Assuming date is raw string
        publishedDateP.textContent = publishedDateCell.textContent.trim();
        moveInstrumentation(publishedDateCell, publishedDateP);
        contentWrapper.append(publishedDateP);

        const headlineP = document.createElement('p');
        headlineP.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
        headlineP.textContent = headlineCell.textContent.trim();
        moveInstrumentation(headlineCell, headlineP);
        contentWrapper.append(headlineP);

        cardDiv.append(contentWrapper);
        cardWrapper.append(cardDiv);
        secondSection.append(cardWrapper);
      }
    }
  });

  wrapper.append(secondSection);

  block.textContent = '';
  block.append(wrapper);
}
