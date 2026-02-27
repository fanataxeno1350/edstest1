import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const section = document.createElement('section');
  section.classList.add('banner-banner-section');

  // Assuming the block's children directly represent the rows for the banner content
  // Based on the provided HTML, the structure is quite static, so we'll build it directly.
  
  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('banner-position-relative', 'banner-boing', 'banner-banner-section__wrapper');
  moveInstrumentation(block.firstElementChild, wrapperDiv); // Transfer instrumentation from the first row if available

  const ctaDiv = document.createElement('div');
  ctaDiv.classList.add('banner-position-absolute', 'banner-start-50', 'banner-translate-middle-x', 'banner-w-100', 'banner-boing__banner--cta');

  const innerCtaDiv = document.createElement('div');
  innerCtaDiv.classList.add('banner-cta');

  // If there were actual content in the block's children (e.g., a link for the CTA),
  // we would loop through block.children and extract it.
  // Since the blockJson doesn't define fields, we're assuming a static structure as per the HTML.
  // If the CTA content comes from a cell, you'd do something like:
  // const ctaLink = block.querySelector('a');
  // if (ctaLink) {
  //   const newLink = document.createElement('a');
  //   newLink.href = ctaLink.href;
  //   newLink.textContent = ctaLink.textContent;
  //   innerCtaDiv.append(newLink);
  //   moveInstrumentation(ctaLink, newLink);
  // }

  ctaDiv.append(innerCtaDiv);
  wrapperDiv.append(ctaDiv);
  section.append(wrapperDiv);

  block.textContent = '';
  block.append(section);
}
