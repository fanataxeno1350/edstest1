import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rootSection = document.createElement('section');
  rootSection.className = 'latestBlogs-article_listing--wrapper';

  const mainDiv = document.createElement('div');
  mainDiv.className = 'latestBlogs-article_listing position-relative';

  // SECTION ONE: Header content
  const firstSection = document.createElement('div');
  firstSection.className = 'latestBlogs-article_listing_section--first text-white text-center';

  const mainTitle = block.querySelector('[data-aue-prop="mainTitle"]');
  if (mainTitle) {
    const h2 = document.createElement('h2');
    h2.className = 'latestBlogs-article_listing--title boing--text__heading-1 text-white pb-3';
    moveInstrumentation(mainTitle, h2);
    h2.textContent = mainTitle.textContent.trim();
    firstSection.append(h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const p = document.createElement('p');
    p.className = 'latestBlogs-article_listing--desc boing--text__body-2 pb-4';
    moveInstrumentation(description, p);
    p.textContent = description.textContent.trim();
    firstSection.append(p);
  }

  const btnWrapper = document.createElement('div');
  btnWrapper.className = 'latestBlogs-article_listing--btnWrapper';

  const viewAllLink = block.querySelector('[data-aue-prop="viewAllLink"] a');
  if (viewAllLink) {
    const a = document.createElement('a');
    a.href = viewAllLink.href;
    a.title = viewAllLink.title || '';
    a.className = 'boing--text__title-3 latestBlogs-article_listing--btn analytics_cta_click';
    moveInstrumentation(viewAllLink, a);

    // Extract text and potential SVG from the link content
    const linkText = viewAllLink.textContent.trim();
    const svgMatch = linkText.match(/^(.*?)(\/content\/dam\/aemigrate\/uploaded-folder\/image\/.*?\.svg\+xml)$/);
    if (svgMatch) {
      a.textContent = svgMatch[1].trim();
      const img = document.createElement('img');
      img.src = svgMatch[2];
      img.alt = 'Arrow Icon'; // Add a meaningful alt text
      a.append(img);
    } else {
      a.textContent = linkText;
    }
    btnWrapper.append(a);
  }
  firstSection.append(btnWrapper);
  mainDiv.append(firstSection);

  // SECTION TWO: Blog cards
  const secondSection = document.createElement('div');
  secondSection.className = 'latestBlogs-article_listing_section--second d-flex';

  const blogCards = block.querySelectorAll('[data-aue-model="blogCard"]');
  blogCards.forEach((cardNode) => {
    const cardLink = cardNode.querySelector('[data-aue-prop="link"] a');
    const cardImage = cardNode.querySelector('[data-aue-prop="image"]');
    const cardDate = cardNode.querySelector('[data-aue-prop="date"]');
    const cardTitle = cardNode.querySelector('[data-aue-prop="title"]');

    if (cardLink && cardTitle) {
      const cardWrapper = document.createElement('a');
      cardWrapper.href = cardLink.href;
      cardWrapper.className = 'latestBlogs-article_listing--cardWrapper analytics_cta_click';
      cardWrapper.dataset.ctaLabel = cardTitle.textContent.trim();
      moveInstrumentation(cardLink, cardWrapper);
      moveInstrumentation(cardNode, cardWrapper);

      const cardContainer = document.createElement('div');
      cardContainer.className = 'latestBlogs-article_listing--cards';

      if (cardImage) {
        const imageWrapper = document.createElement('div');
        imageWrapper.className = 'latestBlogs-article_listing--cardImageWrapper';
        const img = cardImage.querySelector('img');
        if (img) {
          const optimizedPicture = createOptimizedPicture(img.src, img.alt);
          const optimizedImg = optimizedPicture.querySelector('img');
          optimizedImg.className = 'latestBlogs-article_listing--cardImage w-100 h-100';
          imageWrapper.append(optimizedPicture);
          moveInstrumentation(cardImage, imageWrapper);
        }
        cardContainer.append(imageWrapper);
      }

      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'latestBlogs-cards_content--wrapper';

      if (cardDate) {
        const dateP = document.createElement('p');
        dateP.className = 'boing--text__body-5 p-0 m-0 mb-3 latestBlogs-published_date';
        const rawDate = cardDate.textContent.trim();
        dateP.dataset.date = rawDate;
        try {
          const dateObj = new Date(rawDate);
          const options = { day: '2-digit', month: 'long', year: 'numeric' };
          dateP.textContent = dateObj.toLocaleDateString('en-GB', options);
        } catch (e) {
          dateP.textContent = rawDate; // Fallback if date parsing fails
        }
        moveInstrumentation(cardDate, dateP);
        contentWrapper.append(dateP);
      }

      if (cardTitle) {
        const titleP = document.createElement('p');
        titleP.className = 'boing--text__body-2 boing--text__body';
        titleP.textContent = cardTitle.textContent.trim();
        moveInstrumentation(cardTitle, titleP);
        contentWrapper.append(titleP);
      }

      cardContainer.append(contentWrapper);
      cardWrapper.append(cardContainer);
      secondSection.append(cardWrapper);
    }
  });

  mainDiv.append(secondSection);
  rootSection.append(mainDiv);

  block.textContent = '';
  block.append(rootSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
