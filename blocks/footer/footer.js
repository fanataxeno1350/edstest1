import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-container-hd footer-container-hd--p-0';

  const footerBrand = document.createElement('div');
  footerBrand.className = 'footer-brand footer-brand--w-100 footer-brand--bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand__primary';

  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'footer-container';

  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand__primary--content footer-brand__primary--content--d-flex footer-brand__primary--content--flex-column footer-brand__primary--content--flex-md-row footer-brand__primary--content--justify-content-md-between footer-brand__primary--content--align-items-center';

  const footerBrandLeftPrimary = document.createElement('section');
  footerBrandLeftPrimary.className = 'footer-brand__left footer-brand__left--d-flex footer-brand__left--gap-16 footer-brand__left--px-10 footer-brand__left--align-items-center footer-brand__left--justify-content-center';

  const footerBrandRightPrimary = document.createElement('section');
  footerBrandRightPrimary.className = 'footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'footer-brand__navbar footer-brand__navbar--d-grid footer-brand__navbar--d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'footer-brand__navbar--left footer-brand__navbar--left--d-flex footer-brand__navbar--left--flex-column footer-brand__navbar--left--flex-md-row';

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'footer-brand__navbar--right footer-brand__navbar--right--d-flex footer-brand__navbar--right--flex-column footer-brand__navbar--right--flex-md-row';

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand__secondary';

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'footer-container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand__secondary--content footer-brand__secondary--content--d-flex footer-brand__secondary--content--flex-column footer-brand__secondary--content--justify-content-md-between footer-brand__secondary--content--align-items-center';

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.className = 'footer-brand__right footer-brand__right--d-flex footer-brand__right--flex-column footer-brand__right--pb-5';

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.className = 'footer-brand__left footer-brand__left--py-5 footer-brand__left--d-flex footer-brand__left--flex-column footer-brand__left--gap-3';

  // Process the block's children (rows) based on the JSON structure
  const rows = [...block.children];

  // Row 1: Logo 1 and Logo 2
  if (rows[0]) {
    const logoRow = rows[0];
    const cells = [...logoRow.children];
    moveInstrumentation(logoRow, footerBrandLeftPrimary);

    if (cells[0]) {
      const logo1Cell = cells[0];
      const logo1Link = logo1Cell.querySelector('a');
      const logo1Img = logo1Cell.querySelector('img');

      if (logo1Link && logo1Img) {
        const newLink = document.createElement('a');
        newLink.href = logo1Link.href;
        newLink.target = '_blank';
        newLink.className = 'footer-brand__logo footer-brand__logo--d-inline-block footer-brand__logo--analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.setAttribute('aria-label', logo1Link.getAttribute('aria-label') || 'Logo');

        const optimizedPic = createOptimizedPicture(logo1Img.src, logo1Img.alt);
        optimizedPic.querySelector('img').className = 'footer-brand__logo--object-fit-contain footer-brand__logo--w-100 footer-brand__logo--h-100 footer-brand__logo--no-rendition';
        moveInstrumentation(logo1Img, optimizedPic.querySelector('img'));
        newLink.append(optimizedPic);
        footerBrandLeftPrimary.append(newLink);
      }
    }

    if (cells[1]) {
      const logo2Cell = cells[1];
      const logo2Div = document.createElement('div');
      logo2Div.className = 'footer-brand__secondary--logo footer-brand__secondary--logo--d-inline-block';
      const logo2Img = logo2Cell.querySelector('img');

      if (logo2Img) {
        const optimizedPic = createOptimizedPicture(logo2Img.src, logo2Img.alt);
        optimizedPic.querySelector('img').className = 'footer-brand__secondary--logo--object-fit-contain footer-brand__secondary--logo--w-100 footer-brand__secondary--logo--no-rendition';
        moveInstrumentation(logo2Img, optimizedPic.querySelector('img'));
        logo2Div.append(optimizedPic);
        footerBrandLeftPrimary.append(logo2Div);
      }
    }
  }

  // Rows 2-5: Footer Link Lists
  let currentLinkListIndex = 0;
  for (let i = 1; i < 5 && rows[i]; i += 1) {
    const linkListRow = rows[i];
    const ul = document.createElement('ul');
    ul.className = 'footer-list footer-list--d-flex footer-list--align-items-center footer-list--justify-content-center footer-list--align-items-md-start footer-list--flex-column';
    moveInstrumentation(linkListRow, ul);

    [...linkListRow.children].forEach((cell) => {
      const link = cell.querySelector('a');
      if (link) {
        const li = document.createElement('li');
        li.className = 'footer-list__item';
        moveInstrumentation(cell, li);

        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        newLink.className = 'footer-list__item--cta-analytics footer-list__item--analytics_cta_click footer-list__item--footer-list__item--link footer-list__item--d-inline-block';
        newLink.setAttribute('data-link-region', 'Footer List');
        if (link.target) {
          newLink.target = link.target;
        }
        li.append(newLink);
        ul.append(li);
      }
    });

    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'footer-footerList';
    footerListDiv.append(ul);

    if (currentLinkListIndex < 2) {
      footerNavbarLeft.append(footerListDiv);
    } else {
      footerNavbarRight.append(footerListDiv);
    }
    currentLinkListIndex += 1;
  }

  // Rows 6-8: Footer Social Links
  const socialTitle = document.createElement('h3');
  socialTitle.className = 'footer-brand__right--social_media--title';
  socialTitle.textContent = 'Follow Us On';
  footerBrandRightSecondary.append(socialTitle);

  const socialUl = document.createElement('ul');
  socialUl.className = 'footer-brand__right--list footer-brand__right--list--d-flex footer-brand__right--list--align-items-center footer-brand__right--list--justify-content-center footer-brand__right--list--px-10 footer-brand__right--list--flex-wrap';
  footerBrandRightSecondary.append(socialUl);

  for (let i = 5; i < 8 && rows[i]; i += 1) {
    const socialLinkRow = rows[i];
    const cell = socialLinkRow.children[0]; // Assuming one social link per row
    if (cell) {
      const link = cell.querySelector('a');
      const img = cell.querySelector('img');

      if (link && img) {
        const li = document.createElement('li');
        li.className = 'footer-brand__right--item footer-brand__right--item--d-flex footer-brand__right--item--justify-content-center footer-brand__right--item--align-items-center';
        moveInstrumentation(socialLinkRow, li);

        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'footer-brand__right--link footer-brand__right--link--d-flex footer-brand__right--link--justify-content-center footer-brand__right--link--align-items-center footer-brand__right--link--analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label') || 'social-link');
        newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name') || '');
        newLink.setAttribute('data-social-linktype', 'follow');
        newLink.target = '_blank';

        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').className = 'footer-brand__right--link--object-fit-contain footer-brand__right--link--w-100 footer-brand__right--link--h-100 footer-brand__right--link--no-rendition';
        optimizedPic.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label') || '');
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        newLink.append(optimizedPic);
        li.append(newLink);
        socialUl.append(li);
      }
    }
  }

  // Row 9: ITC Portal Link
  const itcPortalRow = rows[8];
  if (itcPortalRow) {
    const itcUl = document.createElement('ul');
    itcUl.className = 'footer-brand__left--list footer-brand__left--list--d-flex footer-brand__left--list--align-items-center footer-brand__left--list--justify-content-center footer-brand__left--list--flex-wrap';
    moveInstrumentation(itcPortalRow, itcUl);

    const itcCell = itcPortalRow.children[0];
    if (itcCell) {
      const link = itcCell.querySelector('a');
      if (link) {
        const li = document.createElement('li');
        li.className = 'footer-brand__left--item footer-brand__left--item--foot_link';
        moveInstrumentation(itcCell, li);

        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        newLink.target = '_blank';
        newLink.className = 'footer-brand__left--link footer-brand__left--link--analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        li.append(newLink);
        itcUl.append(li);
      }
    }
    footerBrandLeftSecondary.append(itcUl);
  }

  // Row 10: Copyright Text
  const copyrightRow = rows[9];
  if (copyrightRow) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'footer-brand__left--copyright footer-brand__left--copyright--text-center';
    moveInstrumentation(copyrightRow, copyrightDiv);

    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'footer-brand__left--text footer-brand__left--text--text-white';
    copyrightSpan.innerHTML = copyrightRow.textContent.trim();
    copyrightDiv.append(copyrightSpan);
    footerBrandLeftSecondary.append(copyrightDiv);
  }

  // Assemble the DOM structure
  footerNavbar.append(footerNavbarLeft, footerNavbarRight);
  footerBrandRightPrimary.append(footerNavbar);
  primaryContent.append(footerBrandLeftPrimary, footerBrandRightPrimary);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  secondaryContent.append(footerBrandRightSecondary, footerBrandLeftSecondary);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  footerBrand.append(primarySection, secondarySection);
  footerContainer.append(footerBrand);

  block.textContent = '';
  block.append(footerContainer);
}
