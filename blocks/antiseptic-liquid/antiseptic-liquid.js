import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const antisepticLiquidContainer = document.createElement('div');
  antisepticLiquidContainer.classList.add('liquidblock-container');

  const titleElement = block.querySelector('[data-aue-prop="title"]');
  if (titleElement) {
    const h1 = document.createElement('h1');
    h1.classList.add('liquidblock-orange');
    h1.textContent = titleElement.textContent;
    antisepticLiquidContainer.append(h1);
    moveInstrumentation(titleElement, h1);
  }

  const imageElement = block.querySelector('[data-aue-prop="image"]');
  if (imageElement) {
    const figure = document.createElement('figure');
    const h1 = document.createElement('h1');
    const img = imageElement.querySelector('img');
    if (img) {
      const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
      const newImg = optimizedPicture.querySelector('img');
      newImg.classList.add('liquidblock-image');
      h1.append(optimizedPicture);
      figure.append(h1);
      antisepticLiquidContainer.append(figure);
      moveInstrumentation(imageElement, figure);
    }
  }

  const liquidblockDetails = document.createElement('div');
  liquidblockDetails.classList.add('liquidblock-details');

  const featuresWrapper = document.createElement('div');
  featuresWrapper.classList.add('liquidblock-list-wrapper');
  const featuresList = document.createElement('ul');
  featuresList.classList.add('liquidblock-list');

  const features = block.querySelectorAll('[data-aue-model="features"] > div');
  features.forEach((featureItem) => {
    const li = document.createElement('li');
    li.classList.add('liquidblock-list-item');
    li.textContent = featureItem.textContent;
    featuresList.append(li);
    moveInstrumentation(featureItem, li);
  });
  if (features.length > 0) {
    featuresWrapper.append(featuresList);
    liquidblockDetails.append(featuresWrapper);
  }

  const availableBlock = document.createElement('div');
  availableBlock.classList.add('liquidblock-available-block');

  const availableTitle = document.createElement('h5');
  availableTitle.classList.add('liquidblock-available-title');
  availableTitle.textContent = 'Available in -';
  availableBlock.append(availableTitle);

  const availableItemList = document.createElement('div');
  availableItemList.classList.add('liquidblock-item-list');
  const availableList = document.createElement('ul');
  availableList.classList.add('liquidblock-available-list');

  const availableIn = block.querySelectorAll('[data-aue-model="availableIn"] > div');
  availableIn.forEach((availableItem, index) => {
    const li = document.createElement('li');
    li.classList.add('liquidblock-available-item');
    if (index === 0) {
      li.classList.add('liquidblock-available-item--first');
    }
    if (index === availableIn.length - 1) {
      li.classList.add('liquidblock-available-item--last');
    }
    li.textContent = availableItem.textContent;
    availableList.append(li);
    moveInstrumentation(availableItem, li);
  });

  if (availableIn.length > 0) {
    availableItemList.append(availableList);
    availableBlock.append(availableItemList);
    const p = document.createElement('p');
    p.classList.add('liquidblock-available-text');
    availableBlock.append(p);
    liquidblockDetails.append(availableBlock);
  }

  if (features.length > 0 || availableIn.length > 0) {
    antisepticLiquidContainer.append(liquidblockDetails);
  }

  const disclaimerDiv = document.createElement('div');
  disclaimerDiv.classList.add('liquidblock-disclaimer');
  const disclaimerItemList = document.createElement('div');
  disclaimerItemList.classList.add('liquidblock-item-list');
  const disclaimerList = document.createElement('ul');
  disclaimerList.classList.add('liquidblock-disclaimer-list');

  const disclaimers = block.querySelectorAll('[data-aue-model="disclaimers"] > div');
  disclaimers.forEach((disclaimerItem, index) => {
    const li = document.createElement('li');
    li.classList.add('liquidblock-disclaimer-item');
    if (index === 0) {
      li.classList.add('liquidblock-disclaimer-item--first');
    }
    li.textContent = disclaimerItem.textContent;
    disclaimerList.append(li);
    moveInstrumentation(disclaimerItem, li);
  });

  if (disclaimers.length > 0) {
    disclaimerItemList.append(disclaimerList);
    disclaimerDiv.append(disclaimerItemList);
    antisepticLiquidContainer.append(disclaimerDiv);
  }

  block.textContent = '';
  block.append(antisepticLiquidContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
