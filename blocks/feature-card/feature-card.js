import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Create the main outer wrapper section
  const section = document.createElement('section');
  section.classList.add('featurecard-feature_card--Section', 'featurecard-feature_card', 'featurecard-mx-auto');

  // Loop through each row in the block (assuming one row per card for this structure)
  [...block.children].forEach((row) => {
    // Create the anchor element
    const anchor = document.createElement('a');
    moveInstrumentation(row, anchor); // Transfer instrumentation from the row to the anchor
    anchor.classList.add('featurecard-feature_card--Section-a', 'featurecard-d-flex', 'featurecard-flex-column', 'featurecard-analytics_cta_click', 'featurecard-text-decoration-none');

    // Extract content from the cells of the current row
    const cells = [...row.children];

    // Cell 0: Image and Image Alt Text
    const imgCell = cells[0];
    const img = imgCell.querySelector('img');
    const ctaHref = imgCell.querySelector('a')?.href || ''; // Assuming CTA Href might be on the image link or separate
    const ctaLabel = imgCell.querySelector('a')?.textContent || ''; // Assuming CTA Label might be on the image link or separate

    // Create image wrapper div
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('featurecard-feature_card--image', 'featurecard-w-100', 'featurecard-pb-4');
    if (img) {
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').classList.add('featurecard-feature_card--image-img', 'featurecard-w-100', 'featurecard-h-100');
      imageDiv.append(optimizedPic);
    }
    anchor.append(imageDiv);

    // Create text content wrapper div
    const textContentDiv = document.createElement('div');
    textContentDiv.classList.add('featurecard-feature_card--text-center', 'featurecard-text-center');

    // Cell 1: Title
    const titleCell = cells[1];
    const title = titleCell.textContent.trim();
    if (title) {
      const h2 = document.createElement('h2');
      h2.classList.add('featurecard-feature_card--title', 'featurecard-boing--text__heading-1');
      h2.textContent = title;
      textContentDiv.append(h2);
    }

    // Cell 2: Description
    const descriptionCell = cells[2];
    const description = descriptionCell.innerHTML.trim(); // Use innerHTML to preserve rich text
    if (description) {
      const descDivWrapper = document.createElement('div');
      descDivWrapper.classList.add('featurecard-feature_card--pb-5', 'featurecard-pb-5');
      const p = document.createElement('p');
      p.classList.add('featurecard-feature_card--desc', 'featurecard-boing--text__body-2', 'featurecard-text-boing-dark');
      p.innerHTML = description;
      descDivWrapper.append(p);
      textContentDiv.append(descDivWrapper);
    }

    // Cell 3: CTA Label (if not already extracted from image link)
    const ctaLabelCell = cells[3];
    const finalCtaLabel = ctaLabelCell ? ctaLabelCell.textContent.trim() : ctaLabel;
    if (finalCtaLabel) {
      anchor.setAttribute('data-cta-label', finalCtaLabel);
    }

    // Cell 4: CTA Href (if not already extracted from image link)
    const ctaHrefCell = cells[4];
    const finalCtaHref = ctaHrefCell ? ctaHrefCell.textContent.trim() : ctaHref;
    if (finalCtaHref) {
      anchor.href = finalCtaHref;
      anchor.title = finalCtaLabel || ''; // Use CTA label as title if available
      anchor.target = '_blank'; // Assuming external link
    }

    // Add the hidden button div (static structure)
    const redirectedBtnDiv = document.createElement('div');
    redirectedBtnDiv.classList.add('featurecard-feature_card--redirected_btn', 'featurecard-redirected_btn', 'featurecard-d-none');
    const button = document.createElement('button');
    button.type = 'button';
    button.role = 'button';
    button.classList.add('featurecard-feature_card--arrow-icon-btn', 'featurecard-arrow-icon-btn');
    // The content of the button is a path, which can be directly set as text content
    button.textContent = '/content/dam/aemigrate/uploaded-folder/image/1772509295184.svg+xml';
    redirectedBtnDiv.append(button);
    textContentDiv.append(redirectedBtnDiv);

    anchor.append(textContentDiv);
    section.append(anchor);
  });

  // Clear the block and append the new structure
  block.textContent = '';
  block.append(section);
}
