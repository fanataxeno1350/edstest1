import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const leftImageDiv = document.createElement('div');
  leftImageDiv.className = 'delightfuldelicacies-left-image-div';
  leftImageDiv.id = 'leftDivId';

  const leftImage = block.querySelector('[data-aue-prop="leftImage"]');
  if (leftImage) {
    const img = leftImage.querySelector('img');
    if (img) {
      leftImageDiv.append(createOptimizedPicture(img.src, img.alt));
    } else {
      const link = leftImage.querySelector('a');
      if (link && (link.href.endsWith('.webp') || link.href.endsWith('.png') || link.href.endsWith('.jpg') || link.href.endsWith('.jpeg'))) {
        leftImageDiv.append(createOptimizedPicture(link.href, ''));
      }
    }
    moveInstrumentation(leftImage, leftImageDiv);
  }

  const containerDiv = document.createElement('div');
  containerDiv.className = 'delightfuldelicacies-container delightfuldelicacies-read-more';

  const headingElement = document.createElement('h1');
  headingElement.className = 'delightfuldelicacies-text-center delightfuldelicacies-pb-4 delightfuldelicacies-rs-heading';
  const heading = block.querySelector('[data-aue-prop="heading"]');
  if (heading) {
    headingElement.textContent = heading.textContent;
    moveInstrumentation(heading, headingElement);
  }
  containerDiv.append(headingElement);

  const readMoreTextDiv = document.createElement('div');
  readMoreTextDiv.className = 'delightfuldelicacies-read-more-text';

  const subheading = block.querySelector('[data-aue-prop="subheading"]');
  if (subheading) {
    readMoreTextDiv.append(...subheading.children);
    moveInstrumentation(subheading, readMoreTextDiv);
  } else {
    const fallbackSubheading = block.querySelector('h2');
    if (fallbackSubheading) {
      readMoreTextDiv.append(fallbackSubheading);
    }
  }

  const description = block.querySelector('[data-aue-prop="description"]');
  if (description) {
    readMoreTextDiv.append(...description.children);
    moveInstrumentation(description, readMoreTextDiv);
  } else {
    const fallbackDescription = block.querySelector('p');
    if (fallbackDescription) {
      readMoreTextDiv.append(fallbackDescription);
    }
  }
  containerDiv.append(readMoreTextDiv);

  const spanReadMore = document.createElement('span');
  spanReadMore.className = 'delightfuldelicacies-readMore';
  containerDiv.append(spanReadMore);

  const categoriesWrapper = document.createElement('div');
  categoriesWrapper.className = 'delightfuldelicacies-d-flex delightfuldelicacies-justify-content-evenly delightfuldelicacies-flex-wrap delightfuldelicacies-why-shift-wrapper';

  const categories = block.querySelectorAll('[data-aue-model="delicacyCategory"]');
  categories.forEach((categoryNode) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'delightfuldelicacies-mb-md-0 delightfuldelicacies-mb-3 delightfuldelicacies-text-center';

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'delightfuldelicacies-itc-health-goal-wrapper';
    const image = categoryNode.querySelector('[data-aue-prop="image"]');
    if (image) {
      const img = image.querySelector('img');
      if (img) {
        imageWrapper.append(createOptimizedPicture(img.src, img.alt));
      } else {
        const link = image.querySelector('a');
        if (link && (link.href.endsWith('.webp') || link.href.endsWith('.png') || link.href.endsWith('.jpg') || link.href.endsWith('.jpeg'))) {
          imageWrapper.append(createOptimizedPicture(link.href, ''));
        }
      }
      moveInstrumentation(image, imageWrapper);
    }
    itemDiv.append(imageWrapper);

    const linkElement = document.createElement('a');
    linkElement.className = 'delightfuldelicacies-text-center delightfuldelicacies-d-block delightfuldelicacies-text-capitalize delightfuldelicacies-pt-2 delightfuldelicacies-image-label';
    const link = categoryNode.querySelector('[data-aue-prop="link"]');
    if (link) {
      const a = link.querySelector('a');
      if (a) {
        linkElement.href = a.href;
        linkElement.alt = a.alt || '';
      }
      moveInstrumentation(link, linkElement);
    }

    const label = categoryNode.querySelector('[data-aue-prop="label"]');
    if (label) {
      linkElement.innerHTML = label.innerHTML;
      moveInstrumentation(label, linkElement);
    } else {
      const fallbackLink = categoryNode.querySelector('a');
      if (fallbackLink) {
        linkElement.innerHTML = fallbackLink.innerHTML;
      }
    }
    itemDiv.append(linkElement);
    categoriesWrapper.append(itemDiv);
    moveInstrumentation(categoryNode, itemDiv);
  });
  containerDiv.append(categoriesWrapper);

  const mobileSpacerDiv = document.createElement('div');
  mobileSpacerDiv.className = 'delightfuldelicacies-d-md-none delightfuldelicacies-d-block';
  containerDiv.append(mobileSpacerDiv);

  const buttonDiv = document.createElement('div');
  buttonDiv.className = 'delightfuldelicacies-button delightfuldelicacies-how-shift-button';

  const buttonLink = block.querySelector('[data-aue-prop="buttonLink"]');
  const buttonLabel = block.querySelector('[data-aue-prop="buttonLabel"]');

  if (buttonLink || buttonLabel) {
    const aElement = document.createElement('a');
    aElement.className = 'delightfuldelicacies-cmp-button';
    aElement.target = '_blank';

    if (buttonLink) {
      const a = buttonLink.querySelector('a');
      if (a) {
        aElement.href = a.href;
        aElement.alt = a.alt || '';
        if (a.id) aElement.id = a.id;
        if (a.dataset.cmpDataLayer) aElement.dataset.cmpDataLayer = a.dataset.cmpDataLayer;
      }
      moveInstrumentation(buttonLink, aElement);
    }

    const spanText = document.createElement('span');
    spanText.className = 'delightfuldelicacies-cmp-button__text';
    if (buttonLabel) {
      spanText.textContent = buttonLabel.textContent;
      moveInstrumentation(buttonLabel, spanText);
    } else if (buttonLink) {
      const a = buttonLink.querySelector('a');
      if (a) {
        spanText.textContent = a.textContent;
      }
    }
    aElement.append(spanText);

    const spanScreenReader = document.createElement('span');
    spanScreenReader.className = 'cmp-link__screen-reader-only';
    spanScreenReader.textContent = 'opens in a new tab';
    aElement.append(spanScreenReader);

    buttonDiv.append(aElement);
  }
  containerDiv.append(buttonDiv);

  block.textContent = '';
  block.append(leftImageDiv, containerDiv);
  block.className = `delightfuldelicacies-itc-how-shift ${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
