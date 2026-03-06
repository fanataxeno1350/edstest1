import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-container';

  const footerRow = document.createElement('div');
  footerRow.className = 'footer-row';

  // First column: Logos
  const col1 = document.createElement('div');
  col1.className = 'footer-col-lg-6 footer-col-sm-12 footer-d-flex footer-d-lg-block footer-justify-content-center';

  const logosDiv = document.createElement('div');
  logosDiv.className = 'footer-logos';

  const itcLogoDiv = document.createElement('div');
  itcLogoDiv.className = 'footer-itc-logo';
  const itcLogoImageDiv = document.createElement('div');
  itcLogoImageDiv.className = 'footer-logo footer-image';
  const itcLogoLink = document.createElement('a');
  itcLogoLink.className = 'footer-cmp-image__link';
  const itcLogoImg = document.createElement('img');
  itcLogoLink.append(itcLogoImg);
  itcLogoImageDiv.append(itcLogoLink);
  itcLogoDiv.append(itcLogoImageDiv);
  logosDiv.append(itcLogoDiv);

  const fssaiLogoDiv = document.createElement('div');
  fssaiLogoDiv.className = 'footer-fssai-logo';
  const fssaiLogoImageDiv = document.createElement('div');
  fssaiLogoImageDiv.className = 'footer-fssailogo footer-logo footer-image';
  const fssaiLogoImg = document.createElement('img');
  fssaiLogoImageDiv.append(fssaiLogoImg);
  fssaiLogoDiv.append(fssaiLogoImageDiv);
  logosDiv.append(fssaiLogoDiv);

  col1.append(logosDiv);
  footerRow.append(col1);

  // Second column: Footer Links (Privacy, Terms, Talk to Us, Our Heritage, Shop)
  const col2 = document.createElement('div');
  col2.className = 'footer-col-lg-6 footer-col-sm-12 footer-itc-footer-link-left';

  const listsContainer = document.createElement('div');
  listsContainer.className = 'footer-lists-container footer-d-flex';

  const list4Div = document.createElement('div');
  list4Div.className = 'footer-list-4 footer-list';
  const ul4 = document.createElement('ul');
  list4Div.append(ul4);
  listsContainer.append(list4Div);

  const list3Div = document.createElement('div');
  list3Div.className = 'footer-list-3 footer-list';
  const ul3 = document.createElement('ul');
  list3Div.append(ul3);
  listsContainer.append(list3Div);

  col2.append(listsContainer);

  const contactDetailsDiv = document.createElement('div');
  contactDetailsDiv.className = 'footer-contact-details';
  const grievanceTitle = document.createElement('h5');
  grievanceTitle.className = 'footer-contact-details__title footer-mb-md-3 footer-mb-0';
  const grievanceName = document.createElement('p');
  grievanceName.className = 'footer-contact-details__description footer-mb-md-1 footer-mb-0';
  const grievanceContact = document.createElement('p');
  grievanceContact.className = 'footer-contact-details__description footer-mb-md-1 footer-mb-0';
  const grievanceTiming = document.createElement('p');
  grievanceTiming.className = 'footer-contact-details__description footer-mb-0';
  contactDetailsDiv.append(grievanceTitle, grievanceName, grievanceContact, grievanceTiming);
  col2.append(contactDetailsDiv);

  footerRow.append(col2);

  // Third column: Social Icons and Copyright
  const col3 = document.createElement('div');
  col3.className = 'footer-col-lg-6 footer-col-sm-12 footer-align-items-md-end footer-d-flex footer-flex-column footer-itc-footer-link-right';

  const socialIconsWrapper = document.createElement('div');
  const instagramUl = document.createElement('ul');
  instagramUl.className = 'footer-list-unstyled';
  const facebookUl = document.createElement('ul');
  facebookUl.className = 'footer-list-unstyled';
  socialIconsWrapper.append(instagramUl, facebookUl);
  col3.append(socialIconsWrapper);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'footer-link';
  col3.append(copyrightSpan);

  footerRow.append(col3);

  footerContainer.append(footerRow);
  block.append(footerContainer);

  // Process block children
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length === 2) {
      const type = cells[0].textContent.trim();
      const contentCell = cells[1];

      if (type === 'Logo') {
        const img = contentCell.querySelector('img');
        const link = contentCell.querySelector('a');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          if (img.alt === 'ITC logo') {
            itcLogoImg.replaceWith(optimizedPic);
            if (link) {
              itcLogoLink.href = link.href;
            }
          } else if (img.alt === 'Fssai Logo') {
            fssaiLogoImg.replaceWith(optimizedPic);
          }
        }
      } else if (type === 'Footer Link') {
        const link = contentCell.querySelector('a');
        if (link) {
          const li = document.createElement('li');
          moveInstrumentation(contentCell, li);
          li.id = `footerLinks-${ul4.children.length + 1}`;
          const newLink = document.createElement('a');
          newLink.target = '_blank';
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          const screenReaderSpan = document.createElement('span');
          screenReaderSpan.className = 'footer-cmp-link__screen-reader-only';
          screenReaderSpan.textContent = 'opens in a new tab';
          newLink.append(screenReaderSpan);
          li.append(newLink);
          ul4.append(li);
        }
      } else if (type === 'Footer List Link') {
        const link = contentCell.querySelector('a');
        if (link) {
          const li = document.createElement('li');
          moveInstrumentation(contentCell, li);
          li.className = 'footer-cmp-list__item';
          const newLink = document.createElement('a');
          newLink.className = 'footer-cmp-list__item-link';
          newLink.href = link.href;
          const spanTitle = document.createElement('span');
          spanTitle.className = 'footer-cmp-list__item-title';
          spanTitle.textContent = link.textContent;
          newLink.append(spanTitle);
          li.append(newLink);
          ul3.append(li);
        }
      } else if (type === 'Social Icon') {
        const link = contentCell.querySelector('a');
        const img = contentCell.querySelector('img');
        if (link && img) {
          const li = document.createElement('li');
          moveInstrumentation(contentCell, li);
          const newLink = document.createElement('a');
          newLink.id = 'socialIcons';
          newLink.href = link.href;
          newLink.target = '_blank';
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          newLink.append(optimizedPic);
          const screenReaderSpan = document.createElement('span');
          screenReaderSpan.className = 'footer-cmp-link__screen-reader-only';
          screenReaderSpan.textContent = 'opens in a new tab';
          newLink.append(screenReaderSpan);
          li.append(newLink);
          if (link.href.includes('instagram')) {
            instagramUl.append(li);
          } else if (link.href.includes('facebook')) {
            facebookUl.append(li);
          }
        }
      } else if (type === 'Grievance Officer Title') {
        grievanceTitle.textContent = contentCell.textContent.trim();
      } else if (type === 'Grievance Officer Name') {
        grievanceName.textContent = contentCell.textContent.trim();
      } else if (type === 'Grievance Officer Contact') {
        grievanceContact.textContent = contentCell.textContent.trim();
      } else if (type === 'Grievance Officer Timing') {
        grievanceTiming.textContent = contentCell.textContent.trim();
      } else if (type === 'Copyright Text') {
        copyrightSpan.textContent = contentCell.textContent.trim();
      }
    }
  });

  block.textContent = '';
  block.append(footerContainer);
}
