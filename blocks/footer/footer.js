import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerSection = document.createElement('footer');
  footerSection.className = 'footer-itc-footer-section';
  moveInstrumentation(block, footerSection);

  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-container';
  footerSection.append(footerContainer);

  const footerRow = document.createElement('div');
  footerRow.className = 'footer-row';
  footerContainer.append(footerRow);

  // First column: Logos
  const col1 = document.createElement('div');
  col1.className = 'footer-col-lg-6 footer-col-sm-12 footer-d-flex footer-d-lg-block footer-justify-content-center';
  footerRow.append(col1);

  const footerLogos = document.createElement('div');
  footerLogos.className = 'footer-footer-logos';
  col1.append(footerLogos);

  const footerItcLogoDiv = document.createElement('div');
  footerItcLogoDiv.className = 'footer-footer-itc-logo';
  footerLogos.append(footerItcLogoDiv);

  const itcLogoWrapper = document.createElement('div');
  itcLogoWrapper.className = 'footer-logo footer-image';
  footerItcLogoDiv.append(itcLogoWrapper);

  const itcLogoCell = block.children[0]?.children[0]; // Assuming ITC logo is in the first cell of the first row
  const itcLogoImg = itcLogoCell?.querySelector('img');
  if (itcLogoImg) {
    const itcOptimizedPic = createOptimizedPicture(itcLogoImg.src, itcLogoImg.alt);
    moveInstrumentation(itcLogoImg, itcOptimizedPic.querySelector('img'));
    const itcLink = itcLogoCell.querySelector('a');
    if (itcLink) {
      const newLink = document.createElement('a');
      newLink.href = itcLink.href;
      newLink.append(itcOptimizedPic);
      itcLogoWrapper.append(newLink);
    } else {
      itcLogoWrapper.append(itcOptimizedPic);
    }
  }

  const footerFssaiLogoDiv = document.createElement('div');
  footerFssaiLogoDiv.className = 'footer-footer-fssai-logo';
  footerLogos.append(footerFssaiLogoDiv);

  const fssaiLogoWrapper = document.createElement('div');
  fssaiLogoWrapper.className = 'footer-fssailogo footer-logo footer-image';
  footerFssaiLogoDiv.append(fssaiLogoWrapper);

  const fssaiLogoCell = block.children[0]?.children[1]; // Assuming FSSAI logo is in the second cell of the first row
  const fssaiLogoImg = fssaiLogoCell?.querySelector('img');
  if (fssaiLogoImg) {
    const fssaiOptimizedPic = createOptimizedPicture(fssaiLogoImg.src, fssaiLogoImg.alt);
    moveInstrumentation(fssaiLogoImg, fssaiOptimizedPic.querySelector('img'));
    const fssaiLink = fssaiLogoCell.querySelector('a');
    if (fssaiLink) {
      const newLink = document.createElement('a');
      newLink.href = fssaiLink.href;
      newLink.append(fssaiOptimizedPic);
      fssaiLogoWrapper.append(newLink);
    } else {
      fssaiLogoWrapper.append(fssaiOptimizedPic);
    }
  }

  // Second column: Footer Nav Links (if any, based on block.children structure)
  const col2 = document.createElement('div');
  col2.className = 'footer-col-lg-3 footer-col-sm-12 footer-d-flex footer-justify-content-xl-between footer-footer-page-links-wrapper footer-pt-md-0 footer-pt-4 footer-px-1';
  footerRow.append(col2);

  // Assuming footer navs are in subsequent rows, each row being a list
  const navRows = [...block.children].slice(1, 3); // Adjust slice based on actual content structure for navs
  navRows.forEach((row, index) => {
    const navListDiv = document.createElement('div');
    navListDiv.className = `footer-list-${index + 1} footer-list`;
    col2.append(navListDiv);

    const ul = document.createElement('ul');
    navListDiv.append(ul);

    [...row.children].forEach((cell) => {
      const link = cell.querySelector('a');
      if (link) {
        const li = document.createElement('li');
        moveInstrumentation(cell, li);
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        newLink.target = link.target;
        if (link.target === '_blank') {
          const span = document.createElement('span');
          span.className = 'footer-cmp-link__screen-reader-only';
          span.textContent = 'opens in a new tab';
          newLink.append(span);
        }
        li.append(newLink);
        ul.append(li);
      }
    });
  });

  // Third column: Footer Links and Grievance Details
  const col3 = document.createElement('div');
  col3.className = 'footer-col-lg-6 footer-col-sm-12 footer-itc-footer-link-left';
  footerRow.append(col3);

  const footerListsContainer = document.createElement('div');
  footerListsContainer.className = 'footer-footer-lists-container footer-d-flex';
  col3.append(footerListsContainer);

  // Assuming footer links are in rows after navs
  const footerLinkRows = [...block.children].slice(3, 5); // Adjust slice based on actual content structure
  footerLinkRows.forEach((row, index) => {
    const listDiv = document.createElement('div');
    listDiv.className = `footer-list-${4 - index} footer-list`; // Assuming list-4 and list-3
    footerListsContainer.append(listDiv);

    const ul = document.createElement('ul');
    if (index === 1) ul.id = 'list-499c6a3139'; // Specific ID from HTML
    ul.className = 'footer-cmp-list';
    listDiv.append(ul);

    [...row.children].forEach((cell) => {
      const link = cell.querySelector('a');
      if (link) {
        const li = document.createElement('li');
        moveInstrumentation(cell, li);
        li.className = 'footer-cmp-list__item';
        const newLink = document.createElement('a');
        newLink.className = 'footer-cmp-list__item-link';
        newLink.href = link.href;
        newLink.target = link.target;
        const spanTitle = document.createElement('span');
        spanTitle.className = 'footer-cmp-list__item-title';
        spanTitle.textContent = link.textContent;
        newLink.append(spanTitle);
        if (link.target === '_blank') {
          const span = document.createElement('span');
          span.className = 'footer-cmp-link__screen-reader-only';
          span.textContent = 'opens in a new tab';
          newLink.append(span);
        }
        li.append(newLink);
        ul.append(li);
      }
    });
  });

  const contactDetailsDiv = document.createElement('div');
  contactDetailsDiv.className = 'footer-contact-details';
  col3.append(contactDetailsDiv);

  // Grievance Officer details - assuming they are in the next rows
  const grievanceTitleRow = block.children[5]; // Adjust index
  const grievanceNameRow = block.children[6];
  const grievanceContactRow = block.children[7];
  const grievanceTimeRow = block.children[8];

  if (grievanceTitleRow) {
    const title = grievanceTitleRow.querySelector('h5') || grievanceTitleRow.querySelector('p');
    if (title) {
      const h5 = document.createElement('h5');
      h5.className = 'footer-contact-details__title footer-mb-md-3 footer-mb-0';
      h5.textContent = title.textContent;
      contactDetailsDiv.append(h5);
    }
  }

  if (grievanceNameRow) {
    const name = grievanceNameRow.querySelector('p');
    if (name) {
      const p = document.createElement('p');
      p.className = 'footer-contact-details__description footer-mb-md-1 footer-mb-0';
      p.textContent = name.textContent;
      contactDetailsDiv.append(p);
    }
  }

  if (grievanceContactRow) {
    const contact = grievanceContactRow.querySelector('p');
    if (contact) {
      const p = document.createElement('p');
      p.className = 'footer-contact-details__description footer-mb-md-1 footer-mb-0';
      p.textContent = contact.textContent;
      contactDetailsDiv.append(p);
    }
  }

  if (grievanceTimeRow) {
    const time = grievanceTimeRow.querySelector('p');
    if (time) {
      const p = document.createElement('p');
      p.className = 'footer-contact-details__description footer-mb-0';
      p.textContent = time.textContent;
      contactDetailsDiv.append(p);
    }
  }

  // Fourth column: Social Icons and Copyright
  const col4 = document.createElement('div');
  col4.className = 'footer-col-lg-6 footer-col-sm-12 footer-align-items-md-end footer-d-flex footer-flex-column footer-itc-footer-link-right';
  footerRow.append(col4);

  const socialIconsDiv = document.createElement('div');
  col4.append(socialIconsDiv);

  // Assuming social icons are in the next rows
  const socialRows = [...block.children].slice(9, 11); // Adjust slice based on actual content structure
  socialRows.forEach((row) => {
    const ul = document.createElement('ul');
    ul.className = 'footer-list-unstyled';
    socialIconsDiv.append(ul);

    [...row.children].forEach((cell) => {
      const link = cell.querySelector('a');
      const img = cell.querySelector('img');
      if (link && img) {
        const li = document.createElement('li');
        moveInstrumentation(cell, li);
        const newLink = document.createElement('a');
        newLink.id = 'socialIcons';
        newLink.href = link.href;
        newLink.target = link.target;
        newLink.setAttribute('data-cmp-clickable', '');
        newLink.setAttribute('data-cmp-data-layer', link.getAttribute('data-cmp-data-layer'));

        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        newLink.append(optimizedPic);

        if (link.target === '_blank') {
          const span = document.createElement('span');
          span.className = 'footer-cmp-link__screen-reader-only';
          span.textContent = 'opens in a new tab';
          newLink.append(span);
        }
        li.append(newLink);
        ul.append(li);
      }
    });
  });

  // Copyright notice
  const copyrightRow = block.children[11]; // Adjust index
  if (copyrightRow) {
    const copyrightText = copyrightRow.querySelector('p') || copyrightRow.textContent;
    if (copyrightText) {
      const span = document.createElement('span');
      span.className = 'footer-footer-link';
      span.textContent = copyrightText.textContent || copyrightText;
      col4.append(span);
    }
  }

  block.textContent = '';
  block.append(footerSection);
}