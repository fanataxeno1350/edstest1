import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');

  const footerItc = document.createElement('section');
  footerItc.classList.add('footer-itc');

  const logoImageField = block.querySelector('[data-aue-prop="logoImage"]');
  const logoLinkField = block.querySelector('[data-aue-prop="logoLink"]');
  let logoAnchor;

  if (logoImageField) {
    const img = logoImageField.querySelector('img');
    if (img) {
      logoAnchor = document.createElement('a');
      logoAnchor.href = logoLinkField?.textContent || '#';
      logoAnchor.append(createOptimizedPicture(img.src, img.alt));
      footerItc.append(logoAnchor);
      moveInstrumentation(logoImageField, logoAnchor);
      moveInstrumentation(logoLinkField, logoAnchor);
    }
  } else if (logoLinkField) {
    const link = logoLinkField.querySelector('a');
    if (link) {
      logoAnchor = document.createElement('a');
      logoAnchor.href = link.href;
      logoAnchor.textContent = link.textContent;
      footerItc.append(logoAnchor);
      moveInstrumentation(logoLinkField, logoAnchor);
    }
  }

  const footerLinks = document.createElement('section');
  footerLinks.classList.add('footer-links');

  const contactLinkField = block.querySelector('[data-aue-prop="contactLink"]');
  if (contactLinkField) {
    const link = contactLinkField.querySelector('a');
    if (link) {
      const contactAnchor = document.createElement('a');
      contactAnchor.href = link.href;
      contactAnchor.textContent = link.textContent;
      footerLinks.append(contactAnchor);
      moveInstrumentation(contactLinkField, contactAnchor);
    }
  }

  const termsOfUseLinkField = block.querySelector('[data-aue-prop="termsOfUseLink"]');
  if (termsOfUseLinkField) {
    const link = termsOfUseLinkField.querySelector('a');
    if (link) {
      const termsAnchor = document.createElement('a');
      termsAnchor.href = link.href;
      termsAnchor.textContent = link.textContent;
      footerLinks.append(termsAnchor);
      moveInstrumentation(termsOfUseLinkField, termsAnchor);
    }
  }

  const privacyPolicyLinkField = block.querySelector('[data-aue-prop="privacyPolicyLink"]');
  if (privacyPolicyLinkField) {
    const link = privacyPolicyLinkField.querySelector('a');
    if (link) {
      const privacyAnchor = document.createElement('a');
      privacyAnchor.href = link.href;
      privacyAnchor.textContent = link.textContent;
      if (link.target) {
        privacyAnchor.target = link.target;
      }
      footerLinks.append(privacyAnchor);
      moveInstrumentation(privacyPolicyLinkField, privacyAnchor);
    }
  }

  const sitemapLinkField = block.querySelector('[data-aue-prop="sitemapLink"]');
  if (sitemapLinkField) {
    const link = sitemapLinkField.querySelector('a');
    if (link) {
      const sitemapAnchor = document.createElement('a');
      sitemapAnchor.href = link.href;
      sitemapAnchor.textContent = link.textContent;
      footerLinks.append(sitemapAnchor);
      moveInstrumentation(sitemapLinkField, sitemapAnchor);
    }
  }

  const copyrightTextField = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightTextField) {
    const copyrightP = document.createElement('p');
    copyrightP.innerHTML = copyrightTextField.innerHTML;
    footerLinks.append(copyrightP);
    moveInstrumentation(copyrightTextField, copyrightP);
  }

  footerContainer.append(footerItc, footerLinks);

  block.textContent = '';
  block.classList.add('footer-main');
  block.append(footerContainer);
  block.dataset.blockStatus = 'loaded';
}
