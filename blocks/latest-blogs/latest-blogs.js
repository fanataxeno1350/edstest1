import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('latestblogs-latestBlogs-article_listing', 'latestblogs-position-relative');

  // First section: Heading, Description, CTA
  const firstSection = document.createElement('div');
  firstSection.classList.add('latestblogs-latestBlogs-article_listing_section--first', 'latestblogs-text-white', 'latestblogs-text-center');

  const heading = document.createElement('h2');
  heading.classList.add('latestblogs-latestBlogs-article_listing--title', 'latestblogs-boing--text__heading-1', 'latestblogs-text-white', 'latestblogs-pb-3');
  
  const description = document.createElement('p');
  description.classList.add('latestblogs-latestBlogs-article_listing--desc', 'latestblogs-boing--text__body-2', 'latestblogs-pb-4');

  const ctaWrapper = document.createElement('div');
  ctaWrapper.classList.add('latestblogs-latestBlogs-article_listing--btnWrapper');
  const ctaLink = document.createElement('a');
  ctaLink.classList.add('latestblogs-boing--text__title-3', 'latestblogs-latestBlogs-article_listing--btn', 'latestblogs-analytics_cta_click');

  // Second section: Blog cards
  const secondSection = document.createElement('div');
  secondSection.classList.add('latestblogs-latestBlogs-article_listing_section--second', 'latestblogs-d-flex');

  // Process block children
  [...block.children].forEach((row, index) => {
    if (index === 0) {
      // First row contains the main heading, description, and CTA
      const headingCell = row.children[0];
      const descriptionCell = row.children[1];
      const ctaUrlCell = row.children[2];
      const ctaTextCell = row.children[3];

      if (headingCell) {
        heading.innerHTML = headingCell.innerHTML;
        moveInstrumentation(headingCell, heading);
      }
      if (descriptionCell) {
        description.innerHTML = descriptionCell.innerHTML;
        moveInstrumentation(descriptionCell, description);
      }
      if (ctaUrlCell && ctaUrlCell.querySelector('a')) {
        const originalLink = ctaUrlCell.querySelector('a');
        ctaLink.href = originalLink.href;
        ctaLink.title = originalLink.title || originalLink.textContent;
        ctaLink.textContent = ctaTextCell ? ctaTextCell.textContent.trim() : originalLink.textContent.trim();
        moveInstrumentation(originalLink, ctaLink);
      } else if (ctaUrlCell) {
        // Fallback if no <a> in ctaUrlCell, assume it's just the URL text
        ctaLink.href = ctaUrlCell.textContent.trim();
        ctaLink.title = ctaTextCell ? ctaTextCell.textContent.trim() : 'View All';
        ctaLink.textContent = ctaTextCell ? ctaTextCell.textContent.trim() : 'View All';
        moveInstrumentation(ctaUrlCell, ctaLink);
      }
      
      firstSection.append(heading, description);
      if (ctaLink.href) {
        ctaWrapper.append(ctaLink);
        firstSection.append(ctaWrapper);
      }
    } else {
      // Subsequent rows are blog cards
      const cardLink = document.createElement('a');
      cardLink.classList.add('latestblogs-latestBlogs-article_listing--cardWrapper', 'latestblogs-analytics_cta_click');
      moveInstrumentation(row, cardLink);

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('latestblogs-latestBlogs-article_listing--cards');

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('latestblogs-latestBlogs-article_listing--cardImageWrapper');
      
      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('latestblogs-latestBlogs-cards_content--wrapper');

      const datePara = document.createElement('p');
      datePara.classList.add('latestblogs-boing--text__body-5', 'latestblogs-p-0', 'latestblogs-m-0', 'latestblogs-mb-3', 'latestblogs-latestBlogs-published_date');
      
      const titlePara = document.createElement('p');
      titlePara.classList.add('latestblogs-boing--text__body-2', 'latestblogs-boing--text__body');

      const urlCell = row.children[0];
      const imageCell = row.children[1];
      const dateCell = row.children[2];
      const titleCell = row.children[3];

      if (urlCell && urlCell.querySelector('a')) {
        const originalCardLink = urlCell.querySelector('a');
        cardLink.href = originalCardLink.href;
        cardLink.setAttribute('data-cta-label', originalCardLink.textContent.trim());
        // No need to moveInstrumentation from originalCardLink to cardLink, as row already moved to cardLink
      } else if (urlCell) {
        cardLink.href = urlCell.textContent.trim();
        cardLink.setAttribute('data-cta-label', titleCell ? titleCell.textContent.trim() : '');
      }

      if (imageCell && imageCell.querySelector('img')) {
        const img = imageCell.querySelector('img');
        const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        optimizedPic.querySelector('img').classList.add('latestblogs-latestBlogs-article_listing--cardImage', 'latestblogs-w-100', 'latestblogs-h-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageWrapper.append(optimizedPic);
      }

      if (dateCell) {
        datePara.textContent = dateCell.textContent.trim();
        // Assuming dateCell might contain a data-date attribute if it was authored as such
        if (dateCell.hasAttribute('data-date')) {
          datePara.setAttribute('data-date', dateCell.getAttribute('data-date'));
        }
        moveInstrumentation(dateCell, datePara);
      }

      if (titleCell) {
        titlePara.textContent = titleCell.textContent.trim();
        moveInstrumentation(titleCell, titlePara);
      }

      contentWrapper.append(datePara, titlePara);
      cardDiv.append(imageWrapper, contentWrapper);
      cardLink.append(cardDiv);
      secondSection.append(cardLink);
    }
  });

  wrapperDiv.append(firstSection, secondSection);
  block.textContent = '';
  block.append(wrapperDiv);
}
