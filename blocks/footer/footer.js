import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerSection = document.createElement('footer');
  footerSection.classList.add('footer-itc-footer-section');
  moveInstrumentation(block, footerSection);

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');
  footerSection.append(footerContainer);

  const footerRow = document.createElement('div');
  footerRow.classList.add('footer-row');
  footerContainer.append(footerRow);

  // First column: Logos
  const col1 = document.createElement('div');
  col1.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-d-flex', 'footer-d-lg-block', 'footer-justify-content-center');
  footerRow.append(col1);

  const footerLogosDiv = document.createElement('div');
  footerLogosDiv.classList.add('footer-footer-logos');
  col1.append(footerLogosDiv);

  const itcLogoDiv = document.createElement('div');
  itcLogoDiv.classList.add('footer-footer-itc-logo');
  footerLogosDiv.append(itcLogoDiv);

  const itcLogoCell = block.children[0]?.children[0];
  if (itcLogoCell) {
    const itcImg = itcLogoCell.querySelector('img');
    if (itcImg) {
      const itcLink = itcLogoCell.querySelector('a');
      const optimizedPic = createOptimizedPicture(itcImg.src, itcImg.alt);
      moveInstrumentation(itcImg, optimizedPic.querySelector('img'));
      if (itcLink) {
        const newLink = document.createElement('a');
        newLink.href = itcLink.href;
        newLink.append(optimizedPic);
        itcLogoDiv.append(newLink);
      } else {
        itcLogoDiv.append(optimizedPic);
      }
    }
  }

  const fssaiLogoDiv = document.createElement('div');
  fssaiLogoDiv.classList.add('footer-footer-fssai-logo');
  footerLogosDiv.append(fssaiLogoDiv);

  const fssaiLogoCell = block.children[0]?.children[1];
  if (fssaiLogoCell) {
    const fssaiImg = fssaiLogoCell.querySelector('img');
    if (fssaiImg) {
      const optimizedPic = createOptimizedPicture(fssaiImg.src, fssaiImg.alt);
      moveInstrumentation(fssaiImg, optimizedPic.querySelector('img'));
      fssaiLogoDiv.append(optimizedPic);
    }
  }

  // Second column: Footer Links
  const col2 = document.createElement('div');
  col2.classList.add('footer-col-lg-3', 'footer-col-sm-12', 'footer-d-flex', 'footer-justify-content-xl-between', 'footer-footer-page-links-wrapper', 'footer-pt-md-0', 'footer-pt-4', 'footer-px-1');
  footerRow.append(col2);

  const footerLinksContainer = document.createElement('div');
  footerLinksContainer.classList.add('footer-footer-lists-container', 'footer-d-flex');
  // Assuming footer links are in the third cell of the first row
  const footerLinksCell = block.children[0]?.children[2];
  if (footerLinksCell) {
    const lists = footerLinksCell.querySelectorAll('ul');
    lists.forEach((list, index) => {
      const newListDiv = document.createElement('div');
      newListDiv.classList.add(`footer-list-${index + 1}`, 'footer-list');
      const newUl = document.createElement('ul');
      [...list.children].forEach((li) => {
        const newLi = document.createElement('li');
        moveInstrumentation(li, newLi);
        const link = li.querySelector('a');
        if (link) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          if (link.target) newLink.target = link.target;
          newLi.append(newLink);
        }
        newUl.append(newLi);
      });
      newListDiv.append(newUl);
      footerLinksContainer.append(newListDiv);
    });
  }
  col2.append(footerLinksContainer);

  // Third column: Grievance details and more links
  const col3 = document.createElement('div');
  col3.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-itc-footer-link-left');
  footerRow.append(col3);

  // Re-adding footer links here as per HTML structure
  const footerListsContainer = document.createElement('div');
  footerListsContainer.classList.add('footer-footer-lists-container', 'footer-d-flex');
  const infoLinksCell = block.children[0]?.children[3]; // Assuming info links are in the fourth cell
  if (infoLinksCell) {
    const lists = infoLinksCell.querySelectorAll('ul');
    lists.forEach((list, index) => {
      const newListDiv = document.createElement('div');
      newListDiv.classList.add(`footer-list-${index + 3}`, 'footer-list'); // Adjusted index for class name
      const newUl = document.createElement('ul');
      [...list.children].forEach((li) => {
        const newLi = document.createElement('li');
        moveInstrumentation(li, newLi);
        const link = li.querySelector('a');
        if (link) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          if (link.target) newLink.target = link.target;
          newLi.append(newLink);
        }
        newUl.append(newLi);
      });
      newListDiv.append(newUl);
      footerListsContainer.append(newListDiv);
    });
  }
  col3.append(footerListsContainer);

  const contactDetailsDiv = document.createElement('div');
  contactDetailsDiv.classList.add('footer-contact-details');
  col3.append(contactDetailsDiv);

  const grievanceTitleCell = block.children[0]?.children[4];
  if (grievanceTitleCell?.textContent) {
    const title = document.createElement('h5');
    title.classList.add('footer-contact-details__title', 'footer-mb-md-3', 'footer-mb-0');
    title.textContent = grievanceTitleCell.textContent;
    contactDetailsDiv.append(title);
  }

  const grievanceNameCell = block.children[0]?.children[5];
  if (grievanceNameCell?.textContent) {
    const name = document.createElement('p');
    name.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
    name.textContent = grievanceNameCell.textContent;
    contactDetailsDiv.append(name);
  }

  const grievanceContactCell = block.children[0]?.children[6];
  if (grievanceContactCell?.textContent) {
    const contact = document.createElement('p');
    contact.classList.add('footer-contact-details__description', 'footer-mb-md-1', 'footer-mb-0');
    contact.textContent = grievanceContactCell.textContent;
    contactDetailsDiv.append(contact);
  }

  const grievanceHoursCell = block.children[0]?.children[7];
  if (grievanceHoursCell?.textContent) {
    const hours = document.createElement('p');
    hours.classList.add('footer-contact-details__description', 'footer-mb-0');
    hours.textContent = grievanceHoursCell.textContent;
    contactDetailsDiv.append(hours);
  }

  // Fourth column: Social icons and copyright
  const col4 = document.createElement('div');
  col4.classList.add('footer-col-lg-6', 'footer-col-sm-12', 'footer-align-items-md-end', 'footer-d-flex', 'footer-flex-column', 'footer-itc-footer-link-right');
  footerRow.append(col4);

  const socialIconsContainer = document.createElement('div');
  col4.append(socialIconsContainer);

  const socialIconsCell = block.children[0]?.children[8];
  if (socialIconsCell) {
    const socialLinks = socialIconsCell.querySelectorAll('a');
    socialLinks.forEach((link) => {
      const ul = document.createElement('ul');
      ul.classList.add('footer-list-unstyled');
      const li = document.createElement('li');
      moveInstrumentation(link, li);
      const newLink = document.createElement('a');
      newLink.href = link.href;
      if (link.target) newLink.target = link.target;
      const img = link.querySelector('img');
      if (img) {
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        newLink.append(optimizedPic);
      }
      const screenReaderSpan = link.querySelector('.footer-cmp-link__screen-reader-only');
      if (screenReaderSpan) {
        newLink.append(screenReaderSpan.cloneNode(true));
      }
      li.append(newLink);
      ul.append(li);
      socialIconsContainer.append(ul);
    });
  }

  const copyrightCell = block.children[0]?.children[9];
  if (copyrightCell?.textContent) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-footer-link');
    copyrightSpan.textContent = copyrightCell.textContent;
    col4.append(copyrightSpan);
  }

  // Secondary Footer
  const secondaryFooter = document.createElement('footer');
  secondaryFooter.classList.add('footer-itc-footer-section', 'footer-itc-footer-secondary');
  moveInstrumentation(block.children[1], secondaryFooter);

  const secondaryUl = document.createElement('ul');
  secondaryUl.classList.add('footer-itc-footer-secondary-container');
  secondaryFooter.append(secondaryUl);

  const secondaryLinksCell = block.children[0]?.children[10];
  if (secondaryLinksCell) {
    const secondaryLinks = secondaryLinksCell.querySelectorAll('a');
    secondaryLinks.forEach((link) => {
      const li = document.createElement('li');
      li.classList.add('footer-itc-footer-secondary-lists');
      moveInstrumentation(link, li);
      const newLink = document.createElement('a');
      newLink.classList.add('footer-footer-links');
      newLink.href = link.href;
      if (link.target) newLink.target = link.target;
      const screenReaderSpan = link.querySelector('.footer-cmp-link__screen-reader-only');
      if (screenReaderSpan) {
        newLink.append(screenReaderSpan.cloneNode(true));
      }
      li.append(newLink);
      secondaryUl.append(li);
    });
  }

  block.textContent = '';
  block.append(footerSection, secondaryFooter);
}
