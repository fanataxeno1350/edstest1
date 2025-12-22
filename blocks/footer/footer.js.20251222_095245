import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerSection = document.createElement('footer');
  footerSection.classList.add('footer-section');

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');

  const footerColLeft = document.createElement('div');
  footerColLeft.classList.add('footer-col-left');

  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-logos');

  const logos = block.querySelectorAll('[data-aue-prop="logos"] > div');
  logos.forEach((logoNode) => {
    const logoDiv = document.createElement('div');
    const imageLink = logoNode.querySelector('a');
    const image = logoNode.querySelector('img');
    
    if (imageLink && image) {
      const logoImageDiv = document.createElement('div');
      logoImageDiv.classList.add('logo-image');
      
      const picture = createOptimizedPicture(image.src, image.alt);
      const imgElement = picture.querySelector('img');
      imgElement.removeAttribute('width');
      imgElement.removeAttribute('height');

      const link = document.createElement('a');
      link.href = imageLink.href;
      link.target = '_self';
      link.append(picture);
      logoImageDiv.append(link);

      if (logoNode.querySelector('[data-aue-model="logo"]:nth-child(1)')) {
        logoDiv.classList.add('footer-itc-logo');
      } else if (logoNode.querySelector('[data-aue-model="logo"]:nth-child(2)')) {
        logoDiv.classList.add('footer-fssai-logo');
        logoImageDiv.classList.remove('logo-image');
        logoImageDiv.classList.add('fssailogo-image');
      }
      logoDiv.append(logoImageDiv);
      footerLogos.append(logoDiv);
      moveInstrumentation(logoNode, logoDiv);
    }
  });
  moveInstrumentation(block.querySelector('[data-aue-prop="logos"]'), footerLogos);
  footerColLeft.append(footerLogos);
  footerRow.append(footerColLeft);

  const footerLinkLeftSection = document.createElement('div');
  footerLinkLeftSection.classList.add('footer-link-left-section');

  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-lists-container');

  const footerLinks = block.querySelector('[data-aue-prop="footerLinks"]');
  if (footerLinks) {
    const list4Container = document.createElement('div');
    list4Container.classList.add('list-4-container');
    const ul4 = document.createElement('ul');
    Array.from(footerLinks.children).forEach((linkNode, index) => {
      const li = document.createElement('li');
      li.id = `footerLinks-${index + 1}`;
      const a = linkNode.querySelector('a');
      if (a) {
        a.target = '_blank';
        const span = document.createElement('span');
        span.classList.add('cmp-link__screen-reader-only');
        span.textContent = 'opens in a new tab';
        a.append(span);
        li.append(a);
      }
      ul4.append(li);
      moveInstrumentation(linkNode, li);
    });
    list4Container.append(ul4);
    footerListsContainer.append(list4Container);
    moveInstrumentation(footerLinks, list4Container);
  }

  const additionalLinks = block.querySelector('[data-aue-prop="additionalLinks"]');
  if (additionalLinks) {
    const list3Container = document.createElement('div');
    list3Container.classList.add('list-3-container');
    const ul3 = document.createElement('ul');
    ul3.id = 'list-499c6a3139'; // Hardcoded ID from sample HTML
    ul3.classList.add('cmp-list');
    Array.from(additionalLinks.children).forEach((linkNode) => {
      const li = document.createElement('li');
      li.classList.add('cmp-list__item');
      const a = linkNode.querySelector('a');
      const title = linkNode.querySelector('[data-aue-prop="title"]');
      if (a && title) {
        a.classList.add('cmp-list__item-link');
        a.href = a.href;
        const span = document.createElement('span');
        span.classList.add('cmp-list__item-title');
        span.textContent = title.textContent;
        a.prepend(span);
        li.append(a);
      }
      ul3.append(li);
      moveInstrumentation(linkNode, li);
    });
    list3Container.append(ul3);
    footerListsContainer.append(list3Container);
    moveInstrumentation(additionalLinks, list3Container);
  }

  footerLinkLeftSection.append(footerListsContainer);

  const contactDetails = document.createElement('div');
  contactDetails.classList.add('contact-details');

  const grievanceTitle = block.querySelector('[data-aue-prop="grievanceTitle"]');
  if (grievanceTitle) {
    const h5 = document.createElement('h5');
    h5.classList.add('contact-details__title-text');
    h5.textContent = grievanceTitle.textContent;
    contactDetails.append(h5);
    moveInstrumentation(grievanceTitle, h5);
  }

  const grievanceName = block.querySelector('[data-aue-prop="grievanceName"]');
  if (grievanceName) {
    const pName = document.createElement('p');
    pName.classList.add('contact-details__description-text');
    pName.textContent = grievanceName.textContent;
    contactDetails.append(pName);
    moveInstrumentation(grievanceName, pName);
  }

  const grievanceContact = block.querySelector('[data-aue-prop="grievanceContact"]');
  if (grievanceContact) {
    const pContact = document.createElement('p');
    pContact.classList.add('contact-details__description-text');
    pContact.textContent = grievanceContact.textContent;
    contactDetails.append(pContact);
    moveInstrumentation(grievanceContact, pContact);
  }

  const grievanceTiming = block.querySelector('[data-aue-prop="grievanceTiming"]');
  if (grievanceTiming) {
    const pTiming = document.createElement('p');
    pTiming.classList.add('contact-details__description-text');
    pTiming.textContent = grievanceTiming.textContent;
    contactDetails.append(pTiming);
    moveInstrumentation(grievanceTiming, pTiming);
  }

  footerLinkLeftSection.append(contactDetails);
  footerRow.append(footerLinkLeftSection);

  const footerColRight = document.createElement('div');
  footerColRight.classList.add('footer-col-right');

  const socialIconsContainer = document.createElement('div');
  const socialIcons = block.querySelectorAll('[data-aue-prop="socialIcons"] > div');
  socialIcons.forEach((socialIconNode) => {
    const ul = document.createElement('ul');
    ul.classList.add('social-icons-list');
    const li = document.createElement('li');
    const link = socialIconNode.querySelector('a');
    const image = socialIconNode.querySelector('img');
    if (link && image) {
      link.id = 'socialIcons';
      link.target = '_blank';
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.src = image.src;
      link.append(img);
      const span = document.createElement('span');
      span.classList.add('cmp-link__screen-reader-only');
      span.textContent = 'opens in a new tab';
      link.append(span);
      li.append(link);
    }
    ul.append(li);
    socialIconsContainer.append(ul);
    moveInstrumentation(socialIconNode, ul);
  });
  footerColRight.append(socialIconsContainer);
  moveInstrumentation(block.querySelector('[data-aue-prop="socialIcons"]'), socialIconsContainer);

  const copyright = block.querySelector('[data-aue-prop="copyright"]');
  if (copyright) {
    const span = document.createElement('span');
    span.classList.add('footer-copyright');
    span.textContent = copyright.textContent;
    footerColRight.append(span);
    moveInstrumentation(copyright, span);
  }

  footerRow.append(footerColRight);
  footerContainer.append(footerRow);
  footerSection.append(footerContainer);

  const footerSecondarySection = document.createElement('footer');
  footerSecondarySection.classList.add('footer-secondary-section');

  const footerSecondaryContainer = document.createElement('ul');
  footerSecondaryContainer.classList.add('footer-secondary-container');

  // Assuming additional links from block.json are used here, but the HTML sample has empty links.
  // If there are specific links for the secondary footer, they should be extracted here.
  // For now, creating two empty list items as per the sample HTML structure.
  for (let i = 0; i < 2; i += 1) {
    const li = document.createElement('li');
    li.classList.add('footer-secondary-lists');
    const a = document.createElement('a');
    a.classList.add('footer-links');
    a.target = '_blank';
    const span = document.createElement('span');
    span.classList.add('cmp-link__screen-reader-only');
    span.textContent = 'opens in a new tab';
    a.append(span);
    li.append(a);
    footerSecondaryContainer.append(li);
  }
  footerSecondarySection.append(footerSecondaryContainer);

  block.textContent = '';
  block.append(footerSection, footerSecondarySection);
  block.classList.add('footer');
  block.dataset.blockStatus = 'loaded';
}
