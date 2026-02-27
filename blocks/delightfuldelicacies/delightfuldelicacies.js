import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main section element
  const section = document.createElement('section');
  section.classList.add('delightfuldelicacies-itc-how-shift');
  moveInstrumentation(block, section);

  // Extract main image from the first row/cell
  const mainImageRow = block.children[0];
  const mainImageCell = mainImageRow.children[0];
  const mainImage = mainImageCell.querySelector('img');

  if (mainImage) {
    const leftDiv = document.createElement('div');
    leftDiv.classList.add('delightfuldelicacies-left-image-div');
    leftDiv.id = 'leftDivId';
    const optimizedMainPic = createOptimizedPicture(mainImage.src, mainImage.alt);
    moveInstrumentation(mainImage, optimizedMainPic.querySelector('img'));
    leftDiv.append(optimizedMainPic);
    section.append(leftDiv);
  }

  // Create the right content container
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('delightfuldelicacies-container', 'delightfuldelicacies-read-more');

  // Extract heading, subheading, description
  const contentRow = block.children[1]; // Assuming the second row contains the main content
  const contentCells = [...contentRow.children];

  const heading = contentCells[0].querySelector('h1');
  if (heading) {
    const newHeading = document.createElement('h1');
    newHeading.classList.add('delightfuldelicacies-text-center', 'delightfuldelicacies-pb-4', 'delightfuldelicacies-rs-heading');
    newHeading.innerHTML = heading.innerHTML;
    moveInstrumentation(heading, newHeading);
    containerDiv.append(newHeading);
  }

  const subheading = contentCells[1].querySelector('h2');
  const description = contentCells[1].querySelector('p');
  if (subheading || description) {
    const readMoreTextDiv = document.createElement('div');
    readMoreTextDiv.classList.add('delightfuldelicacies-read-more-text');
    if (subheading) {
      const newSubheading = document.createElement('h2');
      newSubheading.style.textAlign = 'center';
      newSubheading.innerHTML = subheading.innerHTML;
      moveInstrumentation(subheading, newSubheading);
      readMoreTextDiv.append(newSubheading);
    }
    if (description) {
      const newDescription = document.createElement('p');
      newDescription.style.textAlign = 'center';
      newDescription.innerHTML = description.innerHTML;
      moveInstrumentation(description, newDescription);
      readMoreTextDiv.append(newDescription);
    }
    containerDiv.append(readMoreTextDiv);
  }

  // Add the read more span
  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('delightfuldelicacies-readMore');
  containerDiv.append(readMoreSpan);

  // Create the wrapper for delicacy cards
  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add(
    'delightfuldelicacies-d-flex',
    'delightfuldelicacies-justify-content-evenly',
    'delightfuldelicacies-flex-wrap',
    'delightfuldelicacies-why-shift-wrapper',
  );

  // Loop through delicacy cards (starting from the third row in the block)
  // Assuming delicacy cards start from the third row and each card is a row
  const delicacyCardRows = [...block.children].slice(2, block.children.length - 1); // Exclude the last row for button

  delicacyCardRows.forEach((row) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('delightfuldelicacies-mb-md-0', 'delightfuldelicacies-mb-3', 'delightfuldelicacies-text-center');
    moveInstrumentation(row, cardDiv);

    const cells = [...row.children];
    const imageCell = cells[0];
    const linkCell = cells[1];
    const labelCell = cells[2];

    const img = imageCell.querySelector('img');
    const link = linkCell.querySelector('a');
    const labelText = labelCell.textContent;

    if (img) {
      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('delightfuldelicacies-itc-health-goal-wrapper');
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imgWrapper.append(optimizedPic);
      cardDiv.append(imgWrapper);
    }

    if (link && labelText) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.alt = link.alt || labelText;
      newLink.classList.add(
        'delightfuldelicacies-text-center',
        'delightfuldelicacies-d-block',
        'delightfuldelicacies-text-capitalize',
        'delightfuldelicacies-pt-2',
        'delightfuldelicacies-image-label',
      );
      newLink.innerHTML = labelText;
      moveInstrumentation(link, newLink);
      cardDiv.append(newLink);
    }

    whyShiftWrapper.append(cardDiv);
  });

  containerDiv.append(whyShiftWrapper);

  // Add the responsive empty div
  const responsiveDiv = document.createElement('div');
  responsiveDiv.classList.add('delightfuldelicacies-d-md-none', 'delightfuldelicacies-d-block');
  containerDiv.append(responsiveDiv);

  // Extract button from the last row
  const buttonRow = block.children[block.children.length - 1];
  const buttonCell = buttonRow.children[0];
  const buttonLink = buttonCell.querySelector('a');

  if (buttonLink) {
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('delightfuldelicacies-button', 'delightfuldelicacies-how-shift-button');

    const newButtonLink = document.createElement('a');
    newButtonLink.href = buttonLink.href;
    newButtonLink.alt = buttonLink.alt;
    newButtonLink.target = buttonLink.target;
    newButtonLink.id = buttonLink.id;
    newButtonLink.classList.add('delightfuldelicacies-cmp-button');
    if (buttonLink.dataset.cmpDataLayer) {
      newButtonLink.setAttribute('data-cmp-data-layer', buttonLink.dataset.cmpDataLayer);
    }

    const buttonSpanText = document.createElement('span');
    buttonSpanText.classList.add('delightfuldelicacies-cmp-button__text');
    buttonSpanText.textContent = buttonLink.textContent;
    newButtonLink.append(buttonSpanText);

    if (buttonLink.target === '_blank') {
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('delightfuldelicacies-cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      newButtonLink.append(screenReaderSpan);
    }
    moveInstrumentation(buttonLink, newButtonLink);
    buttonDiv.append(newButtonLink);
    containerDiv.append(buttonDiv);
  }

  section.append(containerDiv);

  // Clear the original block content and append the new structure
  block.textContent = '';
  block.append(section);
}
