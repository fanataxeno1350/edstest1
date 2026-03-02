import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainDiv = document.createElement('div');
  mainDiv.classList.add('feature-cards-wrapper');

  // Handle the title/text element separately if it exists
  const firstDiv = block.querySelector('div:first-child');
  if (firstDiv && firstDiv.querySelector('.featurecards-cmp-text')) {
    const titleContainer = document.createElement('div');
    moveInstrumentation(firstDiv, titleContainer);
    titleContainer.innerHTML = firstDiv.innerHTML;
    mainDiv.append(titleContainer);
  }

  const cardsContainer = document.createElement('div');
  cardsContainer.classList.add('feature-cards-container');
  mainDiv.append(cardsContainer);

  // Process each 'section' element as a feature card
  [...block.children].forEach((row) => {
    // Skip the initial title div if it was already processed
    if (row === firstDiv) return;

    // Only process sections that look like feature cards
    if (row.tagName === 'SECTION' || row.tagName === 'A') {
      const linkElement = row.querySelector('a');
      if (linkElement) {
        const newCardLink = document.createElement('a');
        moveInstrumentation(row, newCardLink);

        newCardLink.href = linkElement.href;
        if (linkElement.target) {
          newCardLink.target = linkElement.target;
        }
        if (linkElement.title) {
          newCardLink.title = linkElement.title;
        }
        if (linkElement.dataset.ctaLabel) {
          newCardLink.dataset.ctaLabel = linkElement.dataset.ctaLabel;
        }
        newCardLink.classList.add('feature-card');

        const img = linkElement.querySelector('img');
        if (img) {
          const pictureWrapper = document.createElement('div');
          pictureWrapper.classList.add('feature-card-image');
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          pictureWrapper.append(optimizedPic);
          newCardLink.append(pictureWrapper);
        }

        const textContentDiv = document.createElement('div');
        textContentDiv.classList.add('feature-card-content');

        const heading = linkElement.querySelector('h2');
        if (heading) {
          const newHeading = document.createElement('h2');
          moveInstrumentation(heading, newHeading);
          newHeading.textContent = heading.textContent;
          textContentDiv.append(newHeading);
        }

        const description = linkElement.querySelector('p');
        if (description) {
          const newDescription = document.createElement('p');
          moveInstrumentation(description, newDescription);
          newDescription.textContent = description.textContent;
          textContentDiv.append(newDescription);
        }

        newCardLink.append(textContentDiv);
        cardsContainer.append(newCardLink);
      }
    }
  });

  block.textContent = '';
  block.append(mainDiv);
}
