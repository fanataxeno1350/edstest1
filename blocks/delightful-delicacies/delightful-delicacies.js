import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const delightfulDelicaciesSection = document.createElement('section');
  delightfulDelicaciesSection.classList.add('delightfuldelicacies-itc-how-shift');

  // Left Image Div
  const leftImageDiv = document.createElement('div');
  leftImageDiv.classList.add('delightfuldelicacies-left-image-div');
  leftImageDiv.id = 'leftDivId';
  const bannerImage = block.querySelector('[data-aue-prop="bannerImage"]');
  if (bannerImage) {
    const img = bannerImage.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      leftImageDiv.append(picture);
      moveInstrumentation(bannerImage, picture);
    }
  }
  delightfulDelicaciesSection.append(leftImageDiv);

  // Container Div
  const containerDiv = document.createElement('div');
  containerDiv.classList.add('delightfuldelicacies-container', 'delightfuldelicacies-read-more');

  // Heading
  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    const h1 = document.createElement('h1');
    h1.classList.add('delightfuldelicacies-text-center', 'delightfuldelicacies-pb-4', 'delightfuldelicacies-rs-heading');
    h1.textContent = heading.textContent;
    containerDiv.append(h1);
    moveInstrumentation(heading, h1);
  }

  // Subheading and Description
  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.classList.add('delightfuldelicacies-read-more-text');

  const subheading = block.querySelector('[data-aue-prop="subheading"]');
  if (subheading) {
    const h2 = document.createElement('h2');
    h2.innerHTML = subheading.innerHTML;
    readMoreTextDiv.append(h2);
    moveInstrumentation(subheading, h2);
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    const p = document.createElement('p');
    p.innerHTML = description.innerHTML;
    readMoreTextDiv.append(p);
    moveInstrumentation(description, p);
  }
  containerDiv.append(readMoreTextDiv);

  const readMoreSpan = document.createElement('span');
  readMoreSpan.classList.add('delightfuldelicacies-readMore');
  containerDiv.append(readMoreSpan);

  // Categories Wrapper
  const categoriesWrapper = document.createElement('div');
  categoriesWrapper.classList.add('delightfuldelicacies-d-flex', 'delightfuldelicacies-justify-content-evenly', 'delightfuldelicacies-flex-wrap', 'delightfuldelicacies-why-shift-wrapper');

  const categories = block.querySelectorAll('[data-aue-model="delicacyCategory"]');
  categories.forEach((category) => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('delightfuldelicacies-mb-md-0', 'delightfuldelicacies-mb-3', 'delightfuldelicacies-text-center');

    const healthGoalWrapper = document.createElement('div');
    healthGoalWrapper.classList.add('delightfuldelicacies-itc-health-goal-wrapper');

    const imageField = category.querySelector('[data-aue-prop="image"]');
    if (imageField) {
      const img = imageField.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        healthGoalWrapper.append(picture);
        moveInstrumentation(imageField, picture);
      }
    }
    categoryDiv.append(healthGoalWrapper);

    const linkField = category.querySelector('[data-aue-prop="link"]');
    const labelField = category.querySelector('[data-aue-prop="label"]');

    if (linkField && labelField) {
      const a = document.createElement('a');
      a.href = linkField.querySelector('a')?.href || '#';
      a.alt = labelField.textContent;
      a.classList.add('delightfuldelicacies-text-center', 'delightfuldelicacies-d-block', 'delightfuldelicacies-text-capitalize', 'delightfuldelicacies-pt-2', 'delightfuldelicacies-image-label');
      a.innerHTML = labelField.innerHTML;
      categoryDiv.append(a);
      moveInstrumentation(linkField, a);
      moveInstrumentation(labelField, a);
    }
    categoriesWrapper.append(categoryDiv);
    moveInstrumentation(category, categoryDiv);
  });
  containerDiv.append(categoriesWrapper);

  const emptyDiv = document.createElement('div');
  emptyDiv.classList.add('delightfuldelicacies-d-md-none', 'delightfuldelicacies-d-block');
  containerDiv.append(emptyDiv);

  // Button
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('delightfuldelicacies-button', 'delightfuldelicacies-how-shift-button');

  const buttonLinkField = block.querySelector('[data-aue-prop="buttonLink"]');
  const buttonLabelField = block.querySelector('[data-aue-prop="buttonLabel"]');

  if (buttonLinkField && buttonLabelField) {
    const a = document.createElement('a');
    a.href = buttonLinkField.querySelector('a')?.href || '#';
    a.alt = buttonLabelField.textContent;
    a.classList.add('delightfuldelicacies-cmp-button');
    // Check if the original link had a target attribute
    const originalLink = buttonLinkField.querySelector('a');
    if (originalLink && originalLink.target) {
      a.target = originalLink.target;
    }

    const spanText = document.createElement('span');
    spanText.classList.add('delightfuldelicacies-cmp-button__text');
    spanText.textContent = buttonLabelField.textContent;
    a.append(spanText);

    if (a.target === '_blank') {
      const screenReaderSpan = document.createElement('span');
      screenReaderSpan.classList.add('cmp-link__screen-reader-only');
      screenReaderSpan.textContent = 'opens in a new tab';
      a.append(screenReaderSpan);
    }
    buttonDiv.append(a);
    moveInstrumentation(buttonLinkField, a);
    moveInstrumentation(buttonLabelField, a);
  }
  containerDiv.append(buttonDiv);

  delightfulDelicaciesSection.append(containerDiv);

  block.textContent = '';
  block.append(delightfulDelicaciesSection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
