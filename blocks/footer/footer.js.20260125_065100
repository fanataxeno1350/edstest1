import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerSection = document.createElement('footer');
  footerSection.classList.add('footer-section');

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');

  // Left Column - Logos
  const footerColLeft = document.createElement('div');
  footerColLeft.classList.add('footer-col-left');

  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-logos');

  const footerItcLogo = document.createElement('div');
  footerItcLogo.classList.add('footer-itc-logo');
  const itcLogoDiv = document.createElement('div');
  itcLogoDiv.classList.add('logo-image');
  const itcLogoWrapper = document.createElement('div');
  itcLogoWrapper.classList.add('cmp-image', 'footer-logo-div');
  const itcLogoLink = document.createElement('a');
  itcLogoLink.classList.add('cmp-image__link');
  itcLogoLink.target = '_self';
  const itcLogoImg = block.querySelector('[data-aue-prop="itcLogo"] img');
  if (itcLogoImg) {
    itcLogoLink.href = block.querySelector('[data-aue-prop="itcLogoLink"]').textContent.trim();
    itcLogoLink.append(createOptimizedPicture(itcLogoImg.src, itcLogoImg.alt));
    moveInstrumentation(itcLogoImg.closest('div'), itcLogoLink);
  } else {
    const itcLogoFallbackLink = block.querySelector('a[href*="itc-logo-white"]');
    if (itcLogoFallbackLink) {
      itcLogoLink.href = itcLogoFallbackLink.href;
      const img = itcLogoFallbackLink.querySelector('img');
      if (img) {
        itcLogoLink.append(createOptimizedPicture(img.src, img.alt));
      }
      moveInstrumentation(itcLogoFallbackLink.closest('div'), itcLogoLink);
    }
  }
  itcLogoWrapper.append(itcLogoLink);
  itcLogoDiv.append(itcLogoWrapper);
  footerItcLogo.append(itcLogoDiv);
  footerLogos.append(footerItcLogo);

  const footerFssaiLogo = document.createElement('div');
  footerFssaiLogo.classList.add('footer-fssai-logo');
  const fssaiLogoDiv = document.createElement('div');
  fssaiLogoDiv.classList.add('fssailogo-image');
  const fssaiLogoWrapper = document.createElement('div');
  fssaiLogoWrapper.classList.add('cmp-image', 'footer-logo-div');
  const fssaiLogoImg = block.querySelector('[data-aue-prop="fssaiLogo"] img');
  if (fssaiLogoImg) {
    fssaiLogoWrapper.append(createOptimizedPicture(fssaiLogoImg.src, fssaiLogoImg.alt));
    moveInstrumentation(fssaiLogoImg.closest('div'), fssaiLogoWrapper);
  } else {
    const fssaiLogoFallbackImg = block.querySelector('img[src*="fssai-white"]');
    if (fssaiLogoFallbackImg) {
      fssaiLogoWrapper.append(createOptimizedPicture(fssaiLogoFallbackImg.src, fssaiLogoFallbackImg.alt));
      moveInstrumentation(fssaiLogoFallbackImg.closest('div'), fssaiLogoWrapper);
    }
  }
  fssaiLogoDiv.append(fssaiLogoWrapper);
  footerFssaiLogo.append(fssaiLogoDiv);
  footerLogos.append(footerFssaiLogo);

  footerColLeft.append(footerLogos);
  footerRow.append(footerColLeft);

  // Footer Page Links Wrapper
  const footerPageLinksWrapper = document.createElement('div');
  footerPageLinksWrapper.classList.add('footer-page-links-wrapper');

  const footerLinksList1 = document.createElement('div');
  footerLinksList1.classList.add('list-1-container');
  const ul1 = document.createElement('ul');
  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"][data-aue-prop="footerLinks"]');
  footerLinks.forEach((linkNode) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.target = '_blank';
    const url = linkNode.querySelector('[data-aue-prop="url"]');
    const text = linkNode.querySelector('[data-aue-prop="text"]');
    if (url) {
      a.href = url.textContent.trim();
    }
    if (text) {
      a.textContent = text.textContent.trim();
    }
    a.append(document.createElement('span')).classList.add('cmp-link__screen-reader-only');
    li.append(a);
    ul1.append(li);
    moveInstrumentation(linkNode, li);
  });
  if (footerLinks.length > 0) {
    footerLinksList1.append(ul1);
  }
  footerPageLinksWrapper.append(footerLinksList1);

  const footerLinksList2 = document.createElement('div');
  footerLinksList2.classList.add('list-2-container');
  footerPageLinksWrapper.append(footerLinksList2);
  footerRow.append(footerPageLinksWrapper);

  // Footer Link Left Section
  const footerLinkLeftSection = document.createElement('div');
  footerLinkLeftSection.classList.add('footer-link-left-section');

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-lists-container');

  const list4Container = document.createElement('div');
  list4Container.classList.add('list-4-container');
  const ul4 = document.createElement('ul');
  const footerListLinks = block.querySelectorAll('[data-aue-model="footerLink"][data-aue-prop="footerListLinks"]');
  footerListLinks.forEach((linkNode) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.target = '_blank';
    const url = linkNode.querySelector('[data-aue-prop="url"]');
    const text = linkNode.querySelector('[data-aue-prop="text"]');
    if (url) {
      a.href = url.textContent.trim();
    }
    if (text) {
      a.textContent = text.textContent.trim();
    }
    a.append(document.createElement('span')).classList.add('cmp-link__screen-reader-only');
    li.append(a);
    ul4.append(li);
    moveInstrumentation(linkNode, li);
  });
  if (footerListLinks.length > 0) {
    list4Container.append(ul4);
  }
  footerListsContainer.append(list4Container);

  const list3Container = document.createElement('div');
  list3Container.classList.add('list-3-container');
  footerListsContainer.append(list3Container);
  footerLinkLeftSection.append(footerListsContainer);

  const contactDetails = document.createElement('div');
  contactDetails.classList.add('contact-details');

  const grievanceTitle = block.querySelector('[data-aue-prop="grievanceTitle"]');
  if (grievanceTitle) {
    const h5 = document.createElement('h5');
    h5.classList.add('contact-details__title-text');
    h5.textContent = grievanceTitle.textContent.trim();
    contactDetails.append(h5);
    moveInstrumentation(grievanceTitle, h5);
  }

  const grievanceName = block.querySelector('[data-aue-prop="grievanceName"]');
  if (grievanceName) {
    const pName = document.createElement('p');
    pName.classList.add('contact-details__description-text');
    pName.textContent = grievanceName.textContent.trim();
    contactDetails.append(pName);
    moveInstrumentation(grievanceName, pName);
  }

  const grievanceContact = block.querySelector('[data-aue-prop="grievanceContact"]');
  if (grievanceContact) {
    const pContact = document.createElement('p');
    pContact.classList.add('contact-details__description-text');
    pContact.textContent = grievanceContact.textContent.trim();
    contactDetails.append(pContact);
    moveInstrumentation(grievanceContact, pContact);
  }

  const grievanceTime = block.querySelector('[data-aue-prop="grievanceTime"]');
  if (grievanceTime) {
    const pTime = document.createElement('p');
    pTime.classList.add('contact-details__description-text');
    pTime.textContent = grievanceTime.textContent.trim();
    contactDetails.append(pTime);
    moveInstrumentation(grievanceTime, pTime);
  }

  footerLinkLeftSection.append(contactDetails);
  footerRow.append(footerLinkLeftSection);

  // Right Column - Social Icons and Copyright
  const footerColRight = document.createElement('div');
  footerColRight.classList.add('footer-col-right');

  const socialIconsWrapper = document.createElement('div');
  const footerSocialIcons = block.querySelectorAll('[data-aue-model="footerSocialIcon"][data-aue-prop="footerSocialIcons"]');
  footerSocialIcons.forEach((socialIconNode) => {
    const ul = document.createElement('ul');
    ul.classList.add('social-icons-list');
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.id = 'socialIcons';
    a.target = '_blank';
    const url = socialIconNode.querySelector('[data-aue-prop="url"]');
    const iconImg = socialIconNode.querySelector('[data-aue-prop="icon"] img');
    if (url) {
      a.href = url.textContent.trim();
    }
    if (iconImg) {
      a.append(createOptimizedPicture(iconImg.src, iconImg.alt));
    } else {
      const fallbackImg = socialIconNode.querySelector('img');
      if (fallbackImg) {
        a.append(createOptimizedPicture(fallbackImg.src, fallbackImg.alt));
      }
    }
    a.append(document.createElement('span')).classList.add('cmp-link__screen-reader-only');
    li.append(a);
    ul.append(li);
    socialIconsWrapper.append(ul);
    moveInstrumentation(socialIconNode, ul);
  });
  footerColRight.append(socialIconsWrapper);

  const copyright = block.querySelector('[data-aue-prop="copyright"]');
  if (copyright) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-copyright');
    copyrightSpan.textContent = copyright.textContent.trim();
    footerColRight.append(copyrightSpan);
    moveInstrumentation(copyright, copyrightSpan);
  }
  footerRow.append(footerColRight);

  footerContainer.append(footerRow);
  footerSection.append(footerContainer);

  // Secondary Footer
  const footerSecondarySection = document.createElement('footer');
  footerSecondarySection.classList.add('footer-secondary-section');

  const footerSecondaryContainer = document.createElement('ul');
  footerSecondaryContainer.classList.add('footer-secondary-container');

  const footerSecondaryLinks = block.querySelectorAll('[data-aue-model="footerLink"][data-aue-prop="footerSecondaryLinks"]');
  footerSecondaryLinks.forEach((linkNode) => {
    const li = document.createElement('li');
    li.classList.add('footer-secondary-lists');
    const a = document.createElement('a');
    a.classList.add('footer-links');
    a.target = '_blank';
    const url = linkNode.querySelector('[data-aue-prop="url"]');
    const text = linkNode.querySelector('[data-aue-prop="text"]');
    if (url) {
      a.href = url.textContent.trim();
    }
    if (text) {
      a.textContent = text.textContent.trim();
    }
    a.append(document.createElement('span')).classList.add('cmp-link__screen-reader-only');
    li.append(a);
    footerSecondaryContainer.append(li);
    moveInstrumentation(linkNode, li);
  });
  footerSecondarySection.append(footerSecondaryContainer);

  block.textContent = '';
  block.append(footerSection, footerSecondarySection);

  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
