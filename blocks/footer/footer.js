import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerSection = document.createElement('footer');
  footerSection.classList.add('footer-section');
  moveInstrumentation(block, footerSection);

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');
  footerSection.append(footerContainer);

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');
  footerContainer.append(footerRow);

  // Process the first row (logos and initial links)
  const [logoRow, linksRow, contactRow, socialRow, secondaryLinksRow] = block.children;

  // --- Left Column (Logos) ---
  const footerColLeft = document.createElement('div');
  footerColLeft.classList.add('footer-col-left');
  footerRow.append(footerColLeft);

  const footerLogos = document.createElement('div');
  footerLogos.classList.add('footer-logos');
  footerColLeft.append(footerLogos);

  // Logo 1
  const footerItcLogo = document.createElement('div');
  footerItcLogo.classList.add('footer-itc-logo');
  footerLogos.append(footerItcLogo);

  const footerLogoImage1 = document.createElement('div');
  footerLogoImage1.classList.add('footer-logo-image');
  footerItcLogo.append(footerLogoImage1);

  const logo1Cell = logoRow.children[0];
  const logo1Link = logo1Cell.querySelector('a');
  const logo1Img = logo1Cell.querySelector('img');

  if (logo1Link) {
    const newLogo1Link = document.createElement('a');
    newLogo1Link.target = '_self';
    newLogo1Link.classList.add('footer-logo-link');
    moveInstrumentation(logo1Link, newLogo1Link);
    footerLogoImage1.append(newLogo1Link);
  }

  if (logo1Img) {
    const newLinkWrapper = document.createElement('a');
    newLinkWrapper.classList.add('footer-image-link');
    newLinkWrapper.href = logo1Img.closest('a')?.href || '#'; // Get href from parent a if exists
    const optimizedPic = createOptimizedPicture(logo1Img.src, logo1Img.alt, false, [{ width: '93' }]);
    optimizedPic.querySelector('img').classList.add('footer-image-img');
    optimizedPic.querySelector('img').setAttribute('itemprop', 'contentUrl');
    optimizedPic.querySelector('img').setAttribute('width', '93');
    optimizedPic.querySelector('img').setAttribute('height', '111');
    moveInstrumentation(logo1Img, optimizedPic.querySelector('img'));
    newLinkWrapper.append(optimizedPic);
    footerLogoImage1.append(newLinkWrapper);
  }

  // Logo 2
  const footerFssaiLogo = document.createElement('div');
  footerFssaiLogo.classList.add('footer-fssai-logo');
  footerLogos.append(footerFssaiLogo);

  const footerFssaiLogoImage = document.createElement('div');
  footerFssaiLogoImage.classList.add('footer-fssailogo-image');
  footerFssaiLogo.append(footerFssaiLogoImage);

  const logo2Cell = logoRow.children[1];
  const logo2Link = logo2Cell.querySelector('a');
  const logo2Img = logo2Cell.querySelector('img');

  if (logo2Link) {
    const newLogo2Link = document.createElement('a');
    newLogo2Link.target = '_self';
    newLogo2Link.classList.add('footer-logo-link');
    moveInstrumentation(logo2Link, newLogo2Link);
    footerFssaiLogoImage.append(newLogo2Link);
  }

  if (logo2Img) {
    const optimizedPic = createOptimizedPicture(logo2Img.src, logo2Img.alt, false, [{ width: '192' }]);
    optimizedPic.querySelector('img').classList.add('footer-image-img');
    optimizedPic.querySelector('img').setAttribute('itemprop', 'contentUrl');
    optimizedPic.querySelector('img').setAttribute('width', '192');
    optimizedPic.querySelector('img').setAttribute('height', '69');
    moveInstrumentation(logo2Img, optimizedPic.querySelector('img'));
    footerFssaiLogoImage.append(optimizedPic);
  }

  // --- Page Links Column ---
  const footerColPageLinks = document.createElement('div');
  footerColPageLinks.classList.add('footer-col-page-links');
  footerRow.append(footerColPageLinks);

  // Footer Links (from the 'footerLinks' container in JSON)
  const footerLinksContainer = document.createElement('div');
  footerLinksContainer.classList.add('footer-lists-container');
  footerColPageLinks.append(footerLinksContainer);

  const footerList1 = document.createElement('div');
  footerList1.classList.add('footer-list-1-list');
  footerLinksContainer.append(footerList1);

  const footerList2 = document.createElement('div');
  footerList2.classList.add('footer-list-2-list');
  footerLinksContainer.append(footerList2);

  const footerList4 = document.createElement('div');
  footerList4.classList.add('footer-list-4-list');
  footerLinksContainer.append(footerList4);
  const ul4 = document.createElement('ul');
  footerList4.append(ul4);

  const footerList3 = document.createElement('div');
  footerList3.classList.add('footer-list-3-list');
  footerLinksContainer.append(footerList3);
  const ul3 = document.createElement('ul');
  ul3.id = 'list-499c6a3139';
  ul3.classList.add('footer-list-cmp-list');
  footerList3.append(ul3);

  // Assuming footerLinks are in the 'linksRow' and organized into columns/lists
  // This part needs careful mapping based on how the 'footerLinks' are structured in the block
  // For now, let's assume they are in the second row, cells 0 and 1
  const linksCell1 = linksRow.children[0];
  const linksCell2 = linksRow.children[1];

  // Links for footerList4 (Privacy Policy, Terms, Talk To Us)
  const links1 = linksCell1.querySelectorAll('li');
  links1.forEach((li) => {
    const newLi = document.createElement('li');
    moveInstrumentation(li, newLi);
    newLi.id = li.id;
    const link = li.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.target = '_blank';
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      newLink.setAttribute('data-cmp-clickable', '');
      const span = document.createElement('span');
      span.classList.add('footer-link-screen-reader-only');
      span.textContent = 'opens in a new tab';
      newLink.append(span);
      newLi.append(newLink);
    }
    ul4.append(newLi);
  });

  // Links for footerList3 (Our Heritage, Shop)
  const links2 = linksCell2.querySelectorAll('li');
  links2.forEach((li) => {
    const newLi = document.createElement('li');
    moveInstrumentation(li, newLi);
    newLi.classList.add('footer-list-cmp-list-item');
    const link = li.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.classList.add('footer-list-cmp-list-item-link');
      newLink.href = link.href;
      const span = document.createElement('span');
      span.classList.add('footer-list-cmp-list-item-title');
      span.textContent = link.querySelector('span')?.textContent || '';
      newLink.append(span);
      newLi.append(newLink);
    }
    ul3.append(newLi);
  });

  // --- Contact Details ---
  const footerContactDetails = document.createElement('div');
  footerContactDetails.classList.add('footer-contact-details');
  footerColPageLinks.append(footerContactDetails);

  const grievanceOfficerTitle = contactRow.children[0].querySelector('p:first-child') || contactRow.children[0].querySelector('h5');
  if (grievanceOfficerTitle) {
    const h5 = document.createElement('h5');
    h5.classList.add('footer-contact-details-title');
    h5.textContent = grievanceOfficerTitle.textContent;
    moveInstrumentation(grievanceOfficerTitle, h5);
    footerContactDetails.append(h5);
  }

  const grievanceOfficerName = contactRow.children[0].querySelector('p:nth-child(2)');
  if (grievanceOfficerName) {
    const p = document.createElement('p');
    p.classList.add('footer-contact-details-description');
    p.textContent = grievanceOfficerName.textContent;
    moveInstrumentation(grievanceOfficerName, p);
    footerContactDetails.append(p);
  }

  const grievanceOfficerContact = contactRow.children[0].querySelector('p:nth-child(3)');
  if (grievanceOfficerContact) {
    const p = document.createElement('p');
    p.classList.add('footer-contact-details-description');
    p.textContent = grievanceOfficerContact.textContent;
    moveInstrumentation(grievanceOfficerContact, p);
    footerContactDetails.append(p);
  }

  const grievanceOfficerTiming = contactRow.children[0].querySelector('p:nth-child(4)');
  if (grievanceOfficerTiming) {
    const p = document.createElement('p');
    p.classList.add('footer-contact-details-description');
    p.textContent = grievanceOfficerTiming.textContent;
    moveInstrumentation(grievanceOfficerTiming, p);
    footerContactDetails.append(p);
  }

  // --- Social Links and Copyright ---
  const footerColLinkRight = document.createElement('div');
  footerColLinkRight.classList.add('footer-col-link-right');
  footerRow.append(footerColLinkRight);

  // Social Icons
  const socialDiv = document.createElement('div');
  footerColLinkRight.append(socialDiv);

  const social1Ul = document.createElement('ul');
  social1Ul.classList.add('footer-list-unstyled');
  socialDiv.append(social1Ul);

  const social2Ul = document.createElement('ul');
  social2Ul.classList.add('footer-list-unstyled');
  socialDiv.append(social2Ul);

  const socialLinksCells = socialRow.querySelectorAll('div > ul > li');
  if (socialLinksCells[0]) {
    const li = document.createElement('li');
    moveInstrumentation(socialLinksCells[0], li);
    const link = socialLinksCells[0].querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.id = 'socialIcons';
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.setAttribute('data-cmp-clickable', '');
      newLink.setAttribute('data-cmp-data-layer', link.getAttribute('data-cmp-data-layer') || '');
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        newLink.append(optimizedPic);
      }
      const span = document.createElement('span');
      span.classList.add('footer-link-screen-reader-only');
      span.textContent = 'opens in a new tab';
      newLink.append(span);
      li.append(newLink);
    }
    social1Ul.append(li);
  }

  if (socialLinksCells[1]) {
    const li = document.createElement('li');
    moveInstrumentation(socialLinksCells[1], li);
    const link = socialLinksCells[1].querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.id = 'socialIcons';
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.setAttribute('data-cmp-clickable', '');
      newLink.setAttribute('data-cmp-data-layer', link.getAttribute('data-cmp-data-layer') || '');
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        newLink.append(optimizedPic);
      }
      const span = document.createElement('span');
      span.classList.add('footer-link-screen-reader-only');
      span.textContent = 'opens in a new tab';
      newLink.append(span);
      li.append(newLink);
    }
    social2Ul.append(li);
  }

  // Copyright
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-link');
  const copyrightContent = socialRow.children[1].textContent.trim(); // Assuming copyright is in the second cell of socialRow
  copyrightSpan.textContent = copyrightContent;
  moveInstrumentation(socialRow.children[1], copyrightSpan);
  footerColLinkRight.append(copyrightSpan);

  // --- Secondary Footer Section ---
  const footerSectionSecondary = document.createElement('footer');
  footerSectionSecondary.classList.add('footer-section-secondary');
  moveInstrumentation(secondaryLinksRow, footerSectionSecondary);

  const footerSecondaryContainer = document.createElement('ul');
  footerSecondaryContainer.classList.add('footer-secondary-container');
  footerSectionSecondary.append(footerSecondaryContainer);

  const secondaryLinks = secondaryLinksRow.querySelectorAll('a');
  secondaryLinks.forEach((link) => {
    const li = document.createElement('li');
    li.classList.add('footer-secondary-lists');
    moveInstrumentation(link.closest('li'), li);
    const newLink = document.createElement('a');
    newLink.classList.add('footer-secondary-links');
    newLink.target = '_blank';
    newLink.href = link.href;
    const span = document.createElement('span');
    span.classList.add('footer-link-screen-reader-only');
    span.textContent = 'opens in a new tab';
    newLink.append(span);
    li.append(newLink);
    footerSecondaryContainer.append(li);
  });

  block.textContent = '';
  block.append(footerSection, footerSectionSecondary);
}
