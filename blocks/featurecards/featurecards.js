import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsWrapper = document.createElement('div');
  featureCardsWrapper.classList.add('featurecards-wrapper');
  moveInstrumentation(block, featureCardsWrapper);

  // Handle the title section first
  const titleRow = block.children[0];
  if (titleRow && titleRow.children.length > 0) {
    const titleCell = titleRow.children[0];
    const h1 = titleCell.querySelector('h1');
    if (h1) {
      const textDiv = document.createElement('div');
      textDiv.id = 'text-68763da680'; // Static ID from HTML
      textDiv.classList.add('featurecards-text');
      const newH1 = document.createElement('h1');
      newH1.classList.add('featurecards-title');
      newH1.innerHTML = h1.innerHTML;
      textDiv.append(newH1);
      featureCardsWrapper.append(textDiv);
      moveInstrumentation(titleRow, textDiv);
    }
  }

  // Process feature cards
  const cardSections = [...block.children].slice(1); // Skip the title row
  cardSections.forEach((row) => {
    const section = document.createElement('section');
    section.classList.add('featurecards-section', 'featurecards-card-section', 'featurecards-mx-auto');
    moveInstrumentation(row, section);

    const link = row.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.classList.add('featurecards-link', 'featurecards-analytics_cta_click', 'featurecards-text-decoration-none');
      if (link.title) {
        newLink.title = link.title;
      }
      if (link.dataset.ctaLabel) {
        newLink.dataset.ctaLabel = link.dataset.ctaLabel;
      }
      if (link.target) {
        newLink.target = link.target;
      }

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('featurecards-image-wrapper', 'featurecards-w-100', 'featurecards-pb-4');
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').classList.add('featurecards-image', 'featurecards-w-100', 'featurecards-h-100');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        imageWrapper.append(optimizedPic);
      }
      newLink.append(imageWrapper);

      const contentCenter = document.createElement('div');
      contentCenter.classList.add('featurecards-content-center');

      const h2 = link.querySelector('h2');
      if (h2) {
        const newH2 = document.createElement('h2');
        newH2.classList.add('featurecards-card-title', 'featurecards-boing--text__heading-1');
        newH2.textContent = h2.textContent.trim();
        contentCenter.append(newH2);
      }

      const p = link.querySelector('p');
      if (p) {
        const pb5 = document.createElement('div');
        pb5.classList.add('featurecards-pb-5');
        const newP = document.createElement('p');
        newP.classList.add('featurecards-card-description', 'featurecards-boing--text__body-2', 'featurecards-text-boing-dark');
        newP.textContent = p.textContent.trim();
        pb5.append(newP);
        contentCenter.append(pb5);
      }

      // Add the redirect button structure (even if d-none)
      const redirectButtonDiv = document.createElement('div');
      redirectButtonDiv.classList.add('featurecards-redirect-button', 'featurecards-d-none');
      const button = document.createElement('button');
      button.type = 'button';
      button.role = 'button';
      button.classList.add('featurecards-arrow-icon-button');
      // The content of the button is the SVG path, which is static in the example HTML
      // For now, we'll leave it empty as per the input block structure, or you might embed an SVG if available.
      // If the button text/content is dynamic and comes from the block, you'd extract it.
      // Based on the HTML, it's a path for an SVG, not text.
      // For this example, we'll just replicate the button structure without the SVG content itself
      // as it's not directly provided as a field in the blockJson for this button.
      redirectButtonDiv.append(button);
      contentCenter.append(redirectButtonDiv);

      newLink.append(contentCenter);
      section.append(newLink);
    }
    featureCardsWrapper.append(section);
  });

  // Add the d-none bolte-sitare-card-sections and curve-container (static structure)
  // These elements are present in the HTML but marked as 'd-none' and don't seem to map
  // directly to the 'featureCard' model in the provided blockJson for dynamic content.
  // They are treated as static structural elements to be replicated.
  const hiddenCards = [...block.querySelectorAll('a.featurecards-d-none.featurecards-bolte-sitare-card-section')];
  hiddenCards.forEach((hiddenCardLink) => {
    const newHiddenCardLink = document.createElement('a');
    newHiddenCardLink.className = hiddenCardLink.className;
    newHiddenCardLink.href = hiddenCardLink.href;
    if (hiddenCardLink.title) newHiddenCardLink.title = hiddenCardLink.title;
    if (hiddenCardLink.dataset.title) newHiddenCardLink.dataset.title = hiddenCardLink.dataset.title;
    if (hiddenCardLink.target) newHiddenCardLink.target = hiddenCardLink.target;

    const bolteSitareCardWrapper = document.createElement('div');
    bolteSitareCardWrapper.className = 'featurecards-bolte-sitare-card-wrapper featurecards-d-flex';

    const bolteSitareCardImageDiv = document.createElement('div');
    bolteSitareCardImageDiv.className = 'featurecards-bolte-sitare-card-image';
    const hiddenImg = hiddenCardLink.querySelector('img');
    if (hiddenImg) {
      const optimizedHiddenPic = createOptimizedPicture(hiddenImg.src, hiddenImg.alt);
      optimizedHiddenPic.querySelector('img').className = 'featurecards-card-image featurecards-h-100 featurecards-w-100';
      moveInstrumentation(hiddenImg, optimizedHiddenPic.querySelector('img'));
      bolteSitareCardImageDiv.append(optimizedHiddenPic);
    }
    bolteSitareCardWrapper.append(bolteSitareCardImageDiv);

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'featurecards-content-wrapper featurecards-d-flex featurecards-flex-column featurecards-justify-content-between';

    const contentDiv1 = document.createElement('div');
    const hiddenH2 = hiddenCardLink.querySelector('h2');
    if (hiddenH2) {
      const newHiddenH2 = document.createElement('h2');
      newHiddenH2.className = 'featurecards-bolte-sitare-card-title featurecards-boing--text__heading-3 featurecards-text-boing-dark';
      newHiddenH2.textContent = hiddenH2.textContent.trim();
      contentDiv1.append(newHiddenH2);
    }
    const hiddenP = hiddenCardLink.querySelector('p');
    if (hiddenP) {
      const newHiddenP = document.createElement('p');
      newHiddenP.className = 'featurecards-bolte-sitare-card-text featurecards-boing--text__body-3 featurecards-text-boing-dark';
      newHiddenP.textContent = hiddenP.textContent.trim();
      contentDiv1.append(newHiddenP);
    }
    contentWrapper.append(contentDiv1);

    const contentDiv2 = document.createElement('div');
    const hiddenButton = hiddenCardLink.querySelector('button');
    if (hiddenButton) {
      const newHiddenButton = document.createElement('button');
      newHiddenButton.className = 'featurecards-bolte-sitare-card-button featurecards-text-white featurecards-boing--text__body-4 featurecards-d-inline-block';
      newHiddenButton.textContent = hiddenButton.textContent.trim();
      contentDiv2.append(newHiddenButton);
    }
    contentWrapper.append(contentDiv2);

    bolteSitareCardWrapper.append(contentWrapper);
    newHiddenCardLink.append(bolteSitareCardWrapper);
    featureCardsWrapper.append(newHiddenCardLink);
  });

  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'featurecards-d-none');
  featureCardsWrapper.append(curveContainer);

  block.textContent = '';
  block.append(featureCardsWrapper);
}
