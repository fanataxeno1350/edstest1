import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const howShiftSection = document.createElement('section');
  howShiftSection.classList.add('how-shift-section');
  moveInstrumentation(block, howShiftSection);

  // First row for left image and main content
  const [leftImageRow, headingRow, subheadingRow, descriptionRow, ...itemRows] = [...block.children];

  // Left Image Div
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('how-shift-left-image-div');
  leftImageDiv.id = 'leftDivId';

  const leftImageCell = leftImageRow.children[0];
  const leftImage = leftImageCell.querySelector('img');
  if (leftImage) {
    const optimizedLeftPic = createOptimizedPicture(leftImage.src, leftImage.alt);
    moveInstrumentation(leftImage, optimizedLeftPic.querySelector('img'));
    leftImageDiv.append(optimizedLeftPic);
  }
  howShiftSection.append(leftImageDiv);

  // Main Content Container
  const howShiftContainer = document.createElement('div');
  howShiftContainer.classList.add('how-shift-container', 'how-shift-read-more');

  // Heading
  const headingCell = headingRow.children[0];
  const heading = headingCell.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) {
    const newHeading = document.createElement('h1');
    newHeading.classList.add('how-shift-heading', 'how-shift-koi-theme', 'text-center', 'how-shift-pb-4');
    newHeading.innerHTML = heading.innerHTML;
    moveInstrumentation(heading, newHeading);
    howShiftContainer.append(newHeading);
  }

  // Read More Text (Subheading and Description)
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('how-shift-read-more-text');

  const subheadingCell = subheadingRow.children[0];
  const subheading = subheadingCell.querySelector('h1, h2, h3, h4, h5, h6');
  if (subheading) {
    const newSubheading = document.createElement('h2');
    newSubheading.style.textAlign = 'center';
    newSubheading.innerHTML = subheading.innerHTML;
    moveInstrumentation(subheading, newSubheading);
    readMoreTextDiv.append(newSubheading);
  }

  const descriptionCell = descriptionRow.children[0];
  const description = descriptionCell.querySelector('p');
  if (description) {
    const newDescription = document.createElement('p');
    newDescription.style.textAlign = 'center';
    newDescription.innerHTML = description.innerHTML;
    moveInstrumentation(description, newDescription);
    readMoreTextDiv.append(newDescription);
  }
  howShiftContainer.append(readMoreTextDiv);
  howShiftContainer.append(document.createElement('span')).classList.add('how-shift-readMore');

  // Items Wrapper
  const itemsWrapper = document.createElement('div');
  itemsWrapper.classList.add('how-shift-d-flex', 'how-shift-justify-content-evenly', 'how-shift-flex-wrap', 'how-shift-why-shift-wrapper');

  itemRows.forEach((row) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('how-shift-mb-md-0', 'how-shift-mb-3', 'how-shift-text-center');
    moveInstrumentation(row, itemDiv);

    const [imageCell, linkCell] = [...row.children];

    // Image
    const healthGoalWrapper = document.createElement('div');
    healthGoalWrapper.classList.add('how-shift-health-goal-wrapper');
    const img = imageCell.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      healthGoalWrapper.append(optimizedPic);
    }
    itemDiv.append(healthGoalWrapper);

    // Link
    const link = linkCell.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.alt = link.alt || '';
      newLink.classList.add('how-shift-text-center', 'how-shift-d-block', 'how-shift-text-capitalize', 'how-shift-pt-2', 'how-shift-image-label');
      newLink.innerHTML = link.innerHTML;
      moveInstrumentation(link, newLink);
      itemDiv.append(newLink);
    }
    itemsWrapper.append(itemDiv);
  });
  howShiftContainer.append(itemsWrapper);

  howShiftContainer.append(document.createElement('div')).classList.add('how-shift-d-md-none', 'how-shift-d-block');

  // Button
  const buttonRow = itemRows[itemRows.length - 1].nextElementSibling; // Assuming button is after the last item row
  const buttonCell = buttonRow.children[0];
  const buttonLink = buttonCell.querySelector('a');
  if (buttonLink) {
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('how-shift-button', 'how-shift-how-shift-button');

    const newButtonLink = document.createElement('a');
    newButtonLink.href = buttonLink.href;
    newButtonLink.alt = buttonLink.alt || '';
    newButtonLink.classList.add('how-shift-cmp-button');
    if (buttonLink.dataset.cmpDataLayer) {
      newButtonLink.setAttribute('data-cmp-data-layer', buttonLink.dataset.cmpDataLayer);
    }
    if (buttonLink.target) {
      newButtonLink.target = buttonLink.target;
    }
    if (buttonLink.id) {
      newButtonLink.id = buttonLink.id;
    }

    const spanText = document.createElement('span');
    spanText.classList.add('how-shift-cmp-button__text');
    spanText.textContent = buttonLink.textContent.trim();
    newButtonLink.append(spanText);

    if (newButtonLink.target === '_blank') {
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('how-shift-cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      newButtonLink.append(screenReaderSpan);
    }
    moveInstrumentation(buttonLink, newButtonLink);
    buttonDiv.append(newButtonLink);
    howShiftContainer.append(buttonDiv);
  }

  howShiftSection.append(howShiftContainer);

  block.textContent = '';
  block.append(howShiftSection);
}
