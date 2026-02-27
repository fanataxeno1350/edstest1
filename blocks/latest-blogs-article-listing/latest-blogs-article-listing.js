import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainWrapper = document.createElement('div');
  mainWrapper.classList.add('latest-blogs-article_listing', 'latest-blogs-position-relative');
  moveInstrumentation(block, mainWrapper);

  // First section (static content)
  const firstSection = document.createElement('div');
  firstSection.classList.add(
    'latest-blogs-article_listing_section--first',
    'latest-blogs-text-white',
    'latest-blogs-text-center',
  );

  const title = document.createElement('h2');
  title.classList.add(
    'latest-blogs-article_listing--title',
    'latest-blogs-boing--text__heading-1',
    'latest-blogs-text-white',
    'latest-blogs-pb-3',
  );
  title.textContent = 'More Boings';
  firstSection.append(title);

  const description = document.createElement('p');
  description.classList.add(
    'latest-blogs-article_listing--desc',
    'latest-blogs-boing--text__body-2',
    'latest-blogs-pb-4',
  );
  description.textContent = 'Stay updated with our latest news, blogs and events';
  firstSection.append(description);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latest-blogs-article_listing--btnWrapper');

  const viewAllLink = document.createElement('a');
  viewAllLink.href = '/bolte-sitare/boingwale-blogs.html';
  viewAllLink.title = 'View All';
  viewAllLink.classList.add(
    'latest-blogs-boing--text__title-3',
    'latest-blogs-article_listing--btn',
    'latest-blogs-analytics_cta_click',
  );
  viewAllLink.textContent = 'View All';
  btnWrapper.append(viewAllLink);
  firstSection.append(btnWrapper);
  mainWrapper.append(firstSection);

  // Second section (dynamic content from block children)
  const secondSection = document.createElement('div');
  secondSection.classList.add('latest-blogs-article_listing_section--second', 'latest-blogs-d-flex');

  [...block.children].forEach((row) => {
    const link = row.querySelector('a');
    if (link) {
      const cardLink = document.createElement('a');
      cardLink.href = link.href;
      cardLink.classList.add('latest-blogs-article_listing--cardWrapper', 'latest-blogs-analytics_cta_click');
      if (link.dataset.ctaLabel) {
        cardLink.dataset.ctaLabel = link.dataset.ctaLabel;
      }
      moveInstrumentation(row, cardLink);

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('latest-blogs-article_listing--cards');

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('latest-blogs-article_listing--cardImageWrapper');
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add(
          'latest-blogs-article_listing--cardImage',
          'latest-blogs-w-100',
          'latest-blogs-h-100',
        );
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageWrapper.append(optimizedPic);
      }
      cardDiv.append(imageWrapper);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latest-blogs-cards_content--wrapper');

      const dateElement = link.querySelector('.latest-blogs-published_date');
      if (dateElement) {
        const newDate = document.createElement('p');
        newDate.classList.add(
          'latest-blogs-boing--text__body-5',
          'latest-blogs-p-0',
          'latest-blogs-m-0',
          'latest-blogs-mb-3',
          'latest-blogs-published_date',
        );
        newDate.textContent = dateElement.textContent;
        if (dateElement.dataset.date) {
          newDate.dataset.date = dateElement.dataset.date;
        }
        contentWrapper.append(newDate);
      }

      const titleElement = link.querySelector('.latest-blogs-boing--text__body-2.latest-blogs-boing--text__body');
      if (titleElement) {
        const newTitle = document.createElement('p');
        newTitle.classList.add(
          'latest-blogs-boing--text__body-2',
          'latest-blogs-boing--text__body',
        );
        newTitle.textContent = titleElement.textContent;
        contentWrapper.append(newTitle);
      }

      cardDiv.append(contentWrapper);
      cardLink.append(cardDiv);
      secondSection.append(cardLink);
    }
  });

  mainWrapper.append(secondSection);

  block.textContent = '';
  block.append(mainWrapper);
}
