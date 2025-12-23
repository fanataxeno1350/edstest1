import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainerWrapper = document.createElement('footer');
  footerContainerWrapper.classList.add('footer-container-wrapper');

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');

  const footerItc = document.createElement('section');
  footerItc.classList.add('footer-itc');

  const logoLink = block.querySelector('[data-aue-prop="itcLink"]');
  if (logoLink) {
    const logoAnchor = document.createElement('a');
    logoAnchor.href = logoLink.href;

    const logoImg = block.querySelector('[data-aue-prop="logo"]');
    if (logoImg) {
      const img = logoImg.querySelector('img');
      if (img) {
        logoAnchor.append(createOptimizedPicture(img.src, img.alt || ''));
        moveInstrumentation(img, logoAnchor.querySelector('picture'));
      }
    }
    footerItc.append(logoAnchor);
    moveInstrumentation(logoLink, logoAnchor);
  }

  const footerLinks = document.createElement('section');
  footerLinks.classList.add('footer-links');

  const talkToUsLink = block.querySelector('[data-aue-prop="talkToUsLink"]');
  if (talkToUsLink) {
    const talkToUsAnchor = document.createElement('a');
    talkToUsAnchor.href = talkToUsLink.href;
    talkToUsAnchor.textContent = talkToUsLink.textContent;
    footerLinks.append(talkToUsAnchor);
    moveInstrumentation(talkToUsLink, talkToUsAnchor);
  }

  const termsOfUseLink = block.querySelector('[data-aue-prop="termsOfUseLink"]');
  if (termsOfUseLink) {
    const termsOfUseAnchor = document.createElement('a');
    termsOfUseAnchor.href = termsOfUseLink.href;
    termsOfUseAnchor.textContent = termsOfUseLink.textContent;
    footerLinks.append(termsOfUseAnchor);
    moveInstrumentation(termsOfUseLink, termsOfUseAnchor);
  }

  const privacyPolicyLink = block.querySelector('[data-aue-prop="privacyPolicyLink"]');
  if (privacyPolicyLink) {
    const privacyPolicyAnchor = document.createElement('a');
    privacyPolicyAnchor.href = privacyPolicyLink.href;
    privacyPolicyAnchor.textContent = privacyPolicyLink.textContent;
    if (privacyPolicyLink.target) {
      privacyPolicyAnchor.target = privacyPolicyLink.target;
    }
    footerLinks.append(privacyPolicyAnchor);
    moveInstrumentation(privacyPolicyLink, privacyPolicyAnchor);
  }

  const sitemapLink = block.querySelector('[data-aue-prop="sitemapLink"]');
  if (sitemapLink) {
    const sitemapAnchor = document.createElement('a');
    sitemapAnchor.href = sitemapLink.href;
    sitemapAnchor.textContent = sitemapLink.textContent;
    footerLinks.append(sitemapAnchor);
    moveInstrumentation(sitemapLink, sitemapAnchor);
  }

  const copyright = block.querySelector('[data-aue-prop="copyright"]');
  if (copyright) {
    const copyrightP = document.createElement('p');
    copyrightP.classList.add('footer-copyright');
    copyrightP.innerHTML = copyright.innerHTML;
    footerLinks.append(copyrightP);
    moveInstrumentation(copyright, copyrightP);
  }

  footerContainer.append(footerItc, footerLinks);
  footerContainerWrapper.append(footerContainer);

  block.textContent = '';
  block.append(footerContainerWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
