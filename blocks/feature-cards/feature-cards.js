import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const featureCardsContainer = document.createElement('div');
  featureCardsContainer.classList.add('featurecards-container');

  const rows = [...block.children];

  // Main Title and Highlight Title
  const mainTitleRow = rows.shift();
  const highlightTitleRow = rows.shift();

  if (mainTitleRow && highlightTitleRow) {
    const featureCardsTextWrapper = document.createElement('div');
    featureCardsTextWrapper.classList.add('featurecards-text-wrapper');
    const mainTitleH1 = document.createElement('h1');
    mainTitleH1.classList.add('featurecards-title-main');

    const mainTitleContent = mainTitleRow.querySelector('div');
    if (mainTitleContent) {
      mainTitleH1.append(...mainTitleContent.childNodes);
      moveInstrumentation(mainTitleContent, mainTitleH1);
    }

    const highlightTitleSpan = document.createElement('span');
    highlightTitleSpan.classList.add('featurecards-title-highlight');
    const highlightTitleContent = highlightTitleRow.querySelector('div');
    if (highlightTitleContent) {
      highlightTitleSpan.append(...highlightTitleContent.childNodes);
      moveInstrumentation(highlightTitleContent, highlightTitleSpan);
    }

    mainTitleH1.append(highlightTitleSpan);
    featureCardsTextWrapper.append(mainTitleH1);
    featureCardsContainer.append(featureCardsTextWrapper);
  }

  // Cards section
  rows.forEach((row) => {
    const section = document.createElement('section');
    section.classList.add('featurecards-section', 'featurecards-card-section');
    moveInstrumentation(row, section);

    const cells = [...row.children];
    if (cells.length >= 4) {
      const linkCell = cells[3]; // Link cell
      const imageCell = cells[0]; // Image cell
      const titleCell = cells[1]; // Title cell
      const descriptionCell = cells[2]; // Description cell

      const linkElement = linkCell.querySelector('a');
      const anchor = document.createElement('a');
      anchor.classList.add('featurecards-link', 'analytics_cta_click');

      if (linkElement) {
        anchor.href = linkElement.href;
        if (linkElement.title) anchor.title = linkElement.title;
        if (linkElement.target) anchor.target = linkElement.target;
        if (linkElement.dataset.ctaLabel) anchor.dataset.ctaLabel = linkElement.dataset.ctaLabel;
        moveInstrumentation(linkElement, anchor);
      } else {
        // Fallback if link is not an <a> tag directly
        const linkText = linkCell.textContent.trim();
        if (linkText) {
          try {
            const url = new URL(linkText);
            anchor.href = url.href;
            anchor.title = 'Explore'; // Default title
            anchor.dataset.ctaLabel = 'Explore'; // Default cta-label
            if (url.hostname !== window.location.hostname) {
              anchor.target = '_blank';
            }
          } catch (e) {
            anchor.href = linkText; // Assume it's a path
            anchor.title = 'Explore';
            anchor.dataset.ctaLabel = 'Explore';
          }
        }
      }

      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('featurecards-image-wrapper', 'featurecards-image-wrapper-pb-4');

      const img = imageCell.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        imageWrapper.append(pic);
        pic.querySelector('img').classList.add('featurecards-image');
        moveInstrumentation(img, pic.querySelector('img'));
      } else if (imageCell.querySelector('a')) {
        // Handle case where image is wrapped in an anchor
        const imgInAnchor = imageCell.querySelector('a img');
        if (imgInAnchor) {
          const pic = createOptimizedPicture(imgInAnchor.src, imgInAnchor.alt);
          imageWrapper.append(pic);
          pic.querySelector('img').classList.add('featurecards-image');
          moveInstrumentation(imgInAnchor, pic.querySelector('img'));
        }
      }
      anchor.append(imageWrapper);

      const textCenter = document.createElement('div');
      textCenter.classList.add('featurecards-text-center');

      const titleH2 = document.createElement('h2');
      titleH2.classList.add('featurecards-card-title', 'boing--text__heading-1');
      const titleContent = titleCell.querySelector('div');
      if (titleContent) {
        titleH2.append(...titleContent.childNodes);
        moveInstrumentation(titleContent, titleH2);
      }
      textCenter.append(titleH2);

      const descriptionPb5 = document.createElement('div');
      descriptionPb5.classList.add('featurecards-pb-5');
      const descriptionP = document.createElement('p');
      descriptionP.classList.add('featurecards-card-desc', 'boing--text__body-2', 'featurecards-text-boing-dark');
      const descriptionContent = descriptionCell.querySelector('div');
      if (descriptionContent) {
        descriptionP.append(...descriptionContent.childNodes);
        moveInstrumentation(descriptionContent, descriptionP);
      }
      descriptionPb5.append(descriptionP);
      textCenter.append(descriptionPb5);

      const redirectedBtn = document.createElement('div');
      redirectedBtn.classList.add('featurecards-redirected-btn', 'featurecards-d-none');
      const button = document.createElement('button');
      button.type = 'button';
      button.role = 'button';
      button.classList.add('featurecards-arrow-icon-btn');
      // The content of this button is hardcoded in the HTML, not from authoring.
      // If it were dynamic, we'd extract it.
      redirectedBtn.append(button);
      textCenter.append(redirectedBtn);

      anchor.append(textCenter);
      section.append(anchor);
      featureCardsContainer.append(section);
    }
  });

  // Bolte Sitare Card Section (d-none, so we create them but they are hidden by default)
  // Assuming these are also driven by the 'cards' multifield, but with different styling.
  // We need to re-iterate the original rows for these, assuming they are meant to be parallel representations.
  // To avoid re-processing the shifted rows, we'll re-access block.children for this specific section.
  const originalRowsForBolteSitare = [...block.children].slice(2); // Skip main title and highlight title rows

  originalRowsForBolteSitare.forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 4) {
      const linkCell = cells[3]; // Link cell
      const imageCell = cells[0]; // Image cell
      const titleCell = cells[1]; // Title cell
      const descriptionCell = cells[2]; // Description cell

      const linkElement = linkCell.querySelector('a');
      const anchor = document.createElement('a');
      anchor.classList.add('featurecards-bolte-sitare-card-section', 'featurecards-d-none', 'analytics_cta_click');

      let ctaLabel = 'Explore'; // Default CTA label

      if (linkElement) {
        anchor.href = linkElement.href;
        if (linkElement.title) anchor.title = linkElement.title;
        if (linkElement.target) anchor.target = linkElement.target;
        if (linkElement.dataset.ctaLabel) {
          anchor.dataset.title = linkElement.title; // map title to data-title
          ctaLabel = linkElement.dataset.ctaLabel;
        }
        moveInstrumentation(linkElement, anchor);
      } else {
        const linkText = linkCell.textContent.trim();
        if (linkText) {
          try {
            const url = new URL(linkText);
            anchor.href = url.href;
            anchor.title = titleCell.textContent.trim(); // Use card title as default title
            anchor.dataset.title = anchor.title;
            if (url.hostname !== window.location.hostname) {
              anchor.target = '_blank';
            }
          } catch (e) {
            anchor.href = linkText;
            anchor.title = titleCell.textContent.trim();
            anchor.dataset.title = anchor.title;
          }
        }
      }

      const bolteSitareCardSectionWrapper = document.createElement('div');
      bolteSitareCardSectionWrapper.classList.add('featurecards-bolte-sitare-card-section-wrapper');

      const bolteSitareCardSectionImg = document.createElement('div');
      bolteSitareCardSectionImg.classList.add('featurecards-bolte-sitare-card-section-img');
      const img = imageCell.querySelector('img');
      if (img) {
        const pic = createOptimizedPicture(img.src, img.alt);
        bolteSitareCardSectionImg.append(pic);
        pic.querySelector('img').classList.add('featurecards-card-img');
        moveInstrumentation(img, pic.querySelector('img'));
      } else if (imageCell.querySelector('a')) {
        const imgInAnchor = imageCell.querySelector('a img');
        if (imgInAnchor) {
          const pic = createOptimizedPicture(imgInAnchor.src, imgInAnchor.alt);
          bolteSitareCardSectionImg.append(pic);
          pic.querySelector('img').classList.add('featurecards-card-img');
          moveInstrumentation(imgInAnchor, pic.querySelector('img'));
        }
      }
      bolteSitareCardSectionWrapper.append(bolteSitareCardSectionImg);

      const contentWrapper = document.createElement('div');
      contentWrapper.classList.add('featurecards-content-wrapper', 'featurecards-d-flex', 'featurecards-flex-column', 'featurecards-justify-content-between');

      const contentDiv = document.createElement('div');

      const bolteSitareCardSectionTitle = document.createElement('h2');
      bolteSitareCardSectionTitle.classList.add('featurecards-bolte-sitare-card-section-title', 'boing--text__heading-3', 'featurecards-text-boing-dark');
      const titleContent = titleCell.querySelector('div');
      if (titleContent) {
        bolteSitareCardSectionTitle.append(...titleContent.childNodes);
        moveInstrumentation(titleContent, bolteSitareCardSectionTitle);
      }
      contentDiv.append(bolteSitareCardSectionTitle);

      const bolteSitareCardSectionText = document.createElement('p');
      bolteSitareCardSectionText.classList.add('featurecards-bolte-sitare-card-section-text', 'boing--text__body-3', 'featurecards-text-boing-dark');
      const descriptionContent = descriptionCell.querySelector('div');
      if (descriptionContent) {
        bolteSitareCardSectionText.append(...descriptionContent.childNodes);
        moveInstrumentation(descriptionContent, bolteSitareCardSectionText);
      }
      contentDiv.append(bolteSitareCardSectionText);
      contentWrapper.append(contentDiv);

      const buttonDiv = document.createElement('div');
      const bolteSitareCardSectionBtn = document.createElement('button');
      bolteSitareCardSectionBtn.classList.add('featurecards-bolte-sitare-card-section-btn', 'featurecards-text-white', 'boing--text__body-4', 'featurecards-d-inline-block');
      bolteSitareCardSectionBtn.textContent = ctaLabel; // Use dynamic CTA label
      buttonDiv.append(bolteSitareCardSectionBtn);
      contentWrapper.append(buttonDiv);

      bolteSitareCardSectionWrapper.append(contentWrapper);
      anchor.append(bolteSitareCardSectionWrapper);
      featureCardsContainer.append(anchor);
    }
  });

  // Curve container (d-none)
  const curveContainer = document.createElement('div');
  curveContainer.classList.add('featurecards-curve-container', 'featurecards-d-none');
  featureCardsContainer.append(curveContainer);

  block.textContent = '';
  block.append(featureCardsContainer);
}
