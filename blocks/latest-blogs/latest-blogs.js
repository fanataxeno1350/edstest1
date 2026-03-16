import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapper = document.createElement('div');
  wrapper.classList.add('latestblogs-latestBlogs-article_listing--wrapper');

  const articleListing = document.createElement('div');
  articleListing.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');

  // First section (title, description, view all button)
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');

  const title = document.createElement('h2');
  title.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
  title.textContent = 'More Boings';
  firstSection.append(title);

  const description = document.createElement('p');
  description.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');
  description.textContent = 'Stay updated with our latest news, blogs and events';
  firstSection.append(description);

  const btnWrapper = document.createElement('div');
  btnWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');
  const viewAllLink = document.createElement('a');
  viewAllLink.href = '/bolte-sitare/boingwale-blogs.html';
  viewAllLink.title = 'View All';
  viewAllLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');
  viewAllLink.textContent = 'View All';
  btnWrapper.append(viewAllLink);
  firstSection.append(btnWrapper);
  articleListing.append(firstSection);

  // Second section (blog cards)
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');

  [...block.children].forEach((row) => {
    const link = row.querySelector('a');
    const img = row.querySelector('img');
    const publishDate = row.querySelector('[data-date]');
    const blogTitle = row.querySelector('.latestblogs-boing--text__body-2');

    if (link && img && publishDate && blogTitle) {
      const cardLink = document.createElement('a');
      cardLink.href = link.href;
      cardLink.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
      if (link.dataset.ctaLabel) {
        cardLink.dataset.ctaLabel = link.dataset.ctaLabel;
      }
      moveInstrumentation(link, cardLink);

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

      const dateP = document.createElement('p');
      dateP.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
      dateP.dataset.date = publishDate.dataset.date;
      dateP.textContent = publishDate.textContent;
      contentWrapper.append(dateP);

      const titleP = document.createElement('p');
      titleP.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');
      titleP.textContent = blogTitle.textContent;
      contentWrapper.append(titleP);

      cardDiv.append(contentWrapper);
      cardLink.append(cardDiv);
      secondSection.append(cardLink);
    }
  });

  articleListing.append(secondSection);
  wrapper.append(articleListing);

  block.textContent = '';
  block.append(wrapper);
}