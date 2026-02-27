import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('banner-banner-section');

  [...block.children].forEach((row) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('banner-position-relative', 'banner-boing', 'banner-banner-section__wrapper');
    moveInstrumentation(row, wrapper);

    [...row.children].forEach((cell) => {
      const ctaWrapper = document.createElement('div');
      ctaWrapper.classList.add('banner-position-absolute', 'banner-start-50', 'banner-translate-middle-x', 'banner-w-100', 'banner-boing__banner--cta');

      const ctaDiv = document.createElement('div');
      ctaDiv.classList.add('banner-cta');

      // Assuming the CTA content is directly within the cell
      // If there's a specific element for the CTA (e.g., a link or a button),
      // you'd need to query for it here.
      const ctaContent = cell.innerHTML;
      if (ctaContent) {
        ctaDiv.innerHTML = ctaContent;
      }
      moveInstrumentation(cell, ctaDiv);

      ctaWrapper.append(ctaDiv);
      wrapper.append(ctaWrapper);
    });
    section.append(wrapper);
  });

  block.textContent = '';
  block.append(section);
}
