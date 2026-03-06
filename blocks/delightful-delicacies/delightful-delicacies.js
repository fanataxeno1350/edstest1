import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('itc-how-shift');

  // First row is the main image, heading, sub-heading, description, and button
  const mainRow = block.children[0];
  const mainImageCell = mainRow.children[0];
  const headingCell = mainRow.children[1];
  const subHeadingCell = mainRow.children[2];
  const descriptionCell = mainRow.children[3];
  const buttonLinkCell = mainRow.children[4];
  const buttonLabelCell = mainRow.children[5];

  // Left Image Div
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('left-image-div');
  leftImageDiv.id = 'leftDivId';
  const mainImg = mainImageCell.querySelector('img');
  if (mainImg) {
    const optimizedMainPic = createOptimizedPicture(mainImg.src, mainImg.alt);
    moveInstrumentation(mainImg, optimizedMainPic.querySelector('img'));
    leftImageDiv.append(optimizedMainPic);
  }
  section.append(leftImageDiv);

  // Container for text and items
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('container', 'read-more');

  // Heading
  const h1 = document.createElement('h1');
  h1.classList.add('text-center', 'pb-4', 'rs-heading');
  h1.innerHTML = headingCell.innerHTML;
  containerDiv.append(h1);

  // Sub-heading and Description
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('read-more-text');
  const h2 = document.createElement('h2');
  h2.innerHTML = subHeadingCell.innerHTML;
  readMoreTextDiv.append(h2);
  const p = document.createElement('p');
  p.innerHTML = descriptionCell.innerHTML;
  readMoreTextDiv.append(p);
  containerDiv.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('readMore');
  containerDiv.append(readMoreSpan);

  // Wrapper for Delicacy Items
  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add('d-flex', 'justify-content-evenly', 'flex-wrap', 'why-shift-wrapper');

  // Loop through remaining rows for delicacy items
  for (let i = 1; i < block.children.length; i += 1) {
    const row = block.children[i];
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('mb-md-0', 'mb-3', 'text-center');
    moveInstrumentation(row, itemDiv);

    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('itc-health-goal-wrapper');

    const imageCell = row.children[0];
    const linkCell = row.children[1];
    const labelCell = row.children[2];

    const img = imageCell.querySelector('img');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      imageWrapper.append(optimizedPic);
    }
    itemDiv.append(imageWrapper);

    const link = linkCell.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.alt = link.alt;
      newLink.classList.add('text-center', 'd-block', 'text-capitalize', 'pt-2', 'image-label');
      newLink.innerHTML = labelCell.innerHTML;
      itemDiv.append(newLink);
    }
    whyShiftWrapper.append(itemDiv);
  }
  containerDiv.append(whyShiftWrapper);

  const emptyDiv = document.createElement('div');
  emptyDiv.classList.add('d-md-none', 'd-block');
  containerDiv.append(emptyDiv);

  // Button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('button', 'how-shift-button');
  const buttonLink = buttonLinkCell.querySelector('a');
  if (buttonLink) {
    const newButtonLink = document.createElement('a');
    newButtonLink.href = buttonLink.href;
    newButtonLink.alt = buttonLink.alt;
    newButtonLink.classList.add('cmp-button');
    if (buttonLink.target) {
      newButtonLink.target = buttonLink.target;
    }
    if (buttonLink.id) {
      newButtonLink.id = buttonLink.id;
    }
    if (buttonLink.dataset.cmpDataLayer) {
      newButtonLink.dataset.cmpDataLayer = buttonLink.dataset.cmpDataLayer;
    }

    const spanText = document.createElement('span');
    spanText.classList.add('cmp-button__text');
    spanText.textContent = buttonLabelCell.textContent;
    newButtonLink.append(spanText);

    if (newButtonLink.target === '_blank') {
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      newButtonLink.append(screenReaderSpan);
    }
    buttonDiv.append(newButtonLink);
  }
  containerDiv.append(buttonDiv);

  section.append(containerDiv);

  block.textContent = '';
  block.append(section);
}