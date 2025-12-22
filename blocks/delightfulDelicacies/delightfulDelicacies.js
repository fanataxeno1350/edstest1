import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainImageDiv = document.createElement('div');
  mainImageDiv.classList.add('delightfuldelicacies-left-image-div');
  mainImageDiv.id = 'leftDivId';

  const mainImage = block.querySelector('[data-aue-prop="mainImage"]');
  if (mainImage) {
    const picture = createOptimizedPicture(mainImage.src, mainImage.alt);
    mainImageDiv.append(picture);
    moveInstrumentation(mainImage, picture);
  }

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('delightfuldelicacies-container', 'delightfuldelicacies-read-more');

  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    const h1 = document.createElement('h1');
    h1.classList.add('delightfuldelicacies-text-center', 'delightfuldelicacies-pb-4', 'delightfuldelicacies-rs-heading');
    h1.append(...heading.childNodes);
    containerDiv.append(h1);
    moveInstrumentation(heading, h1);
  }

  const subheading = block.querySelector('[data-aue-prop="subheading"]');
  if (subheading) {
    const readMoreTextDiv = document.createElement('div');
    readMoreTextDiv.classList.add('delightfuldelicacies-read-more-text');
    readMoreTextDiv.append(...subheading.childNodes);
    containerDiv.append(readMoreTextDiv);
    moveInstrumentation(subheading, readMoreTextDiv);
  }

  const spanReadMore = document.createElement('span');
  spanReadMore.classList.add('delightfuldelicacies-readMore');
  containerDiv.append(spanReadMore);

  const whyShiftWrapper = document.createElement('div');
  whyShiftWrapper.classList.add('delightfuldelicacies-d-flex', 'delightfuldelicacies-justify-content-evenly', 'delightfuldelicacies-flex-wrap', 'delightfuldelicacies-why-shift-wrapper');

  const delicacyItems = block.querySelectorAll('[data-aue-model="delicacyItem"]');
  delicacyItems.forEach((itemNode) => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('delightfuldelicacies-mb-md-0', 'delightfuldelicacies-mb-3', 'delightfuldelicacies-text-center');

    const itcHealthGoalWrapper = document.createElement('div');
    itcHealthGoalWrapper.classList.add('delightfuldelicacies-itc-health-goal-wrapper');

    const itemImage = itemNode.querySelector('[data-aue-prop="image"]');
    if (itemImage) {
      const picture = createOptimizedPicture(itemImage.src, itemImage.alt);
      itcHealthGoalWrapper.append(picture);
      moveInstrumentation(itemImage, picture);
    }
    itemDiv.append(itcHealthGoalWrapper);

    const itemLink = itemNode.querySelector('[data-aue-prop="link"]');
    const itemLabel = itemNode.querySelector('[data-aue-prop="label"]');

    if (itemLink && itemLabel) {
      const a = document.createElement('a');
      a.href = itemLink.href;
      a.alt = itemLabel.textContent;
      a.classList.add('delightfuldelicacies-text-center', 'delightfuldelicacies-d-block', 'delightfuldelicacies-text-capitalize', 'delightfuldelicacies-pt-2', 'delightfuldelicacies-image-label');
      a.append(...itemLabel.childNodes);
      itemDiv.append(a);
      moveInstrumentation(itemLink, a);
      moveInstrumentation(itemLabel, a);
    }
    whyShiftWrapper.append(itemDiv);
    moveInstrumentation(itemNode, itemDiv);
  });
  containerDiv.append(whyShiftWrapper);

  const dMdNoneDiv = document.createElement('div');
  dMdNoneDiv.classList.add('delightfuldelicacies-d-md-none', 'delightfuldelicacies-d-block');
  containerDiv.append(dMdNoneDiv);

  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add('delightfuldelicacies-button', 'delightfuldelicacies-how-shift-button');

  const ctaLink = block.querySelector('[data-aue-prop="ctaLink"]');
  const ctaLabel = block.querySelector('[data-aue-prop="ctaLabel"]');

  if (ctaLink && ctaLabel) {
    const a = document.createElement('a');
    a.href = ctaLink.href;
    a.alt = ctaLabel.textContent;
    a.classList.add('delightfuldelicacies-cmp-button');
    a.target = '_blank';

    const spanText = document.createElement('span');
    spanText.classList.add('delightfuldelicacies-cmp-button__text');
    spanText.append(...ctaLabel.childNodes);
    a.append(spanText);

    const spanScreenReader = document.createElement('span');
    spanScreenReader.classList.add('cmp-link__screen-reader-only');
    spanScreenReader.textContent = 'opens in a new tab';
    a.append(spanScreenReader);

    buttonDiv.append(a);
    moveInstrumentation(ctaLink, a);
    moveInstrumentation(ctaLabel, a);
  }
  containerDiv.append(buttonDiv);

  block.textContent = '';
  block.append(mainImageDiv, containerDiv);
  block.className = 'delightfuldelicacies-itc-how-shift block';
  block.dataset.blockStatus = 'loaded';
}