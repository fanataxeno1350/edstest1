import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');

  const footerItc = document.createElement('section');
  footerItc.classList.add('footer-itc');

  const logoLinkWrapper = block.querySelector('[data-aue-prop="logoLink"]');
  const logoWrapper = block.querySelector('[data-aue-prop="logo"]');

  let logoAnchor;
  if (logoLinkWrapper && logoLinkWrapper.querySelector('a')) {
    logoAnchor = logoLinkWrapper.querySelector('a');
  } else if (logoWrapper && logoWrapper.querySelector('a')) {
    logoAnchor = logoWrapper.querySelector('a');
  }

  if (logoAnchor) {
    const img = logoWrapper ? logoWrapper.querySelector('img') : null;
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt || '');
      logoAnchor.textContent = '';
      logoAnchor.append(picture);
      footerItc.append(logoAnchor);
      moveInstrumentation(logoWrapper, picture);
      moveInstrumentation(logoLinkWrapper, logoAnchor);
    } else {
      footerItc.append(logoAnchor);
      moveInstrumentation(logoLinkWrapper, logoAnchor);
    }
  }

  const footerLinksSection = document.createElement('section');
  footerLinksSection.classList.add('footer-links');

  const linksContainer = block.querySelector('[data-aue-prop="links"]');
  if (linksContainer) {
    const footerLinks = linksContainer.querySelectorAll('[data-aue-model="footerLink"]');
    footerLinks.forEach((linkNode) => {
      const linkWrapper = linkNode.querySelector('[data-aue-prop="link"]');
      const textWrapper = linkNode.querySelector('[data-aue-prop="text"]');
      let anchor;
      if (linkWrapper && linkWrapper.querySelector('a')) {
        anchor = linkWrapper.querySelector('a');
      } else if (textWrapper && textWrapper.textContent.trim()) {
        anchor = document.createElement('a');
        anchor.href = '#'; // Fallback if no actual link is present
        anchor.textContent = textWrapper.textContent.trim();
      }

      if (anchor) {
        // Ensure the text content of the anchor comes from the 'text' field if available
        if (textWrapper && textWrapper.textContent.trim()) {
          anchor.textContent = textWrapper.textContent.trim();
        }
        footerLinksSection.append(anchor);
        moveInstrumentation(linkNode, anchor);
        if (linkWrapper) moveInstrumentation(linkWrapper, anchor);
        if (textWrapper) moveInstrumentation(textWrapper, anchor);
      }
    });
  }

  const copyrightWrapper = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightWrapper) {
    const copyrightP = copyrightWrapper.querySelector('p');
    if (copyrightP) {
      footerLinksSection.append(copyrightP);
      moveInstrumentation(copyrightWrapper, copyrightP);
    }
  }

  if (footerItc.children.length > 0) {
    footerContainer.append(footerItc);
  }
  if (footerLinksSection.children.length > 0) {
    footerContainer.append(footerLinksSection);
  }

  block.textContent = '';
  block.append(footerContainer);
  block.className = 'footer-main block';
  block.dataset.blockStatus = 'loaded';
}
