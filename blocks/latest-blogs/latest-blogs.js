import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainWrapper = document.createElement('div');
  mainWrapper.className = 'latestblogs-latestBlogs-article_listing latestblogs-position-relative';

  // First section (Title, Description, View All Button)
  const firstSection = document.createElement('div');
  firstSection.className = 'latestblogs-latestBlogs-article_listing_section--first latestblogs-text-white latestblogs-text-center';
  moveInstrumentation(block.children[0], firstSection);

  const titleWrapper = block.children[0].children[0];
  if (titleWrapper) {
    const h2 = document.createElement('h2');
    h2.className = 'latestblogs-latestBlogs-article_listing--title latestblogs-boing--text__heading-1 latestblogs-text-white latestblogs-pb-3';
    h2.innerHTML = titleWrapper.innerHTML;
    moveInstrumentation(titleWrapper, h2);
    firstSection.append(h2);
  }

  const descWrapper = block.children[0].children[1];
  if (descWrapper) {
    const p = document.createElement('p');
    p.className = 'latestblogs-latestBlogs-article_listing--desc latestblogs-boing--text__body-2 latestblogs-pb-4';
    p.innerHTML = descWrapper.innerHTML;
    moveInstrumentation(descWrapper, p);
    firstSection.append(p);
  }

  const viewAllWrapper = block.children[0].children[2];
  if (viewAllWrapper) {
    const btnWrapper = document.createElement('div');
    btnWrapper.className = 'latestblogs-latestBlogs-article_listing--btnWrapper';
    const link = viewAllWrapper.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.title = link.title || '';
      newLink.className = 'latestblogs-boing--text__title-3 latestblogs-latestBlogs-article_listing--btn latestblogs-analytics_cta_click';
      newLink.textContent = link.textContent.trim(); // Trim to remove potential extra text/icons
      moveInstrumentation(link, newLink);
      btnWrapper.append(newLink);
    }
    moveInstrumentation(viewAllWrapper, btnWrapper);
    firstSection.append(btnWrapper);
  }

  mainWrapper.append(firstSection);

  // Second section (Blog Cards)
  const secondSection = document.createElement('div');
  secondSection.className = 'latestblogs-latestBlogs-article_listing_section--second latestblogs-d-flex';

  // Loop through the rest of the rows for blog items
  [...block.children].slice(1).forEach((row) => {
    const link = row.querySelector('a');
    if (link) {
      const cardWrapper = document.createElement('a');
      cardWrapper.href = link.href;
      cardWrapper.className = 'latestblogs-latestBlogs-article_listing--cardWrapper latestblogs-analytics_cta_click';
      cardWrapper.setAttribute('data-cta-label', link.getAttribute('data-cta-label') || '');
      moveInstrumentation(row, cardWrapper);

      const card = document.createElement('div');
      card.className = 'latestblogs-latestBlogs-article_listing--cards';

      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'latestblogs-latestBlogs-article_listing--cardImageWrapper';
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').className = 'latestblogs-latestBlogs-article_listing--cardImage latestblogs-w-100 latestblogs-h-100';
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageWrapper.append(optimizedPic);
      }
      card.append(imageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'latestblogs-latestBlogs-cards_content--wrapper';

      const date = link.querySelector('p[data-date]');
      if (date) {
        const pDate = document.createElement('p');
        pDate.className = 'latestblogs-boing--text__body-5 latestblogs-p-0 latestblogs-m-0 latestblogs-mb-3 latestblogs-latestBlogs-published_date';
        pDate.setAttribute('data-date', date.getAttribute('data-date') || '');
        pDate.textContent = date.textContent;
        moveInstrumentation(date, pDate);
        contentWrapper.append(pDate);
      }

      const title = link.querySelector('.latestblogs-boing--text__body-2');
      if (title) {
        const pTitle = document.createElement('p');
        pTitle.className = 'latestblogs-boing--text__body-2 latestblogs-boing--text__body';
        pTitle.innerHTML = title.innerHTML;
        moveInstrumentation(title, pTitle);
        contentWrapper.append(pTitle);
      }
      card.append(contentWrapper);
      cardWrapper.append(card);
      secondSection.append(cardWrapper);
    }
  });

  mainWrapper.append(secondSection);

  block.textContent = '';
  block.append(mainWrapper);
}
