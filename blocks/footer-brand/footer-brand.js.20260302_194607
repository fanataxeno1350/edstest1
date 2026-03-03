import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'footer-brand-primary';

  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-container';

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'footer-brand-primary--content footer-d-flex footer-flex-column footer-flex-md-row footer-justify-content-md-between footer-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'footer-brand-left footer-d-flex footer-gap-16 footer-px-10 footer-align-items-center footer-justify-content-center';

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'footer-brand-right';

  const nav = document.createElement('nav');
  nav.className = 'footer-brand-navbar footer-d-grid footer-d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.className = 'footer-brand-navbar--left footer-d-flex footer-flex-column footer-flex-md-row';

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.className = 'footer-brand-navbar--right footer-d-flex footer-flex-column footer-flex-md-row';

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'footer-brand-secondary';

  const footerContainerSecondary = document.createElement('div');
  footerContainerSecondary.className = 'footer-container';

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'footer-brand-secondary--content footer-d-flex footer-flex-column footer-justify-content-md-between footer-align-items-center';

  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.className = 'footer-brand-right footer-d-flex footer-flex-column footer-pb-5';

  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.className = 'footer-brand-left footer-py-5 footer-d-flex footer-flex-column footer-gap-3';

  // Process block children
  [...block.children].forEach((row, rowIndex) => {
    moveInstrumentation(row, rowIndex === 0 ? footerBrandPrimary : footerBrandSecondary);

    if (rowIndex === 0) { // Primary Footer
      const primaryLogoCell = row.children[0];
      const secondaryLogoCell = row.children[1];
      const linkGroupsCells = Array.from(row.children).slice(2, -2); // Exclude logos, social links, and copyright

      // Primary Logo
      if (primaryLogoCell) {
        const primaryLink = primaryLogoCell.querySelector('a');
        const primaryImg = primaryLogoCell.querySelector('img');
        if (primaryLink && primaryImg) {
          const brandLogoLink = document.createElement('a');
          brandLogoLink.href = primaryLink.href;
          brandLogoLink.target = '_blank';
          brandLogoLink.className = 'footer-brand-logo footer-d-inline-block footer-analytics_cta_click';
          brandLogoLink.setAttribute('data-cta-region', 'Footer');
          brandLogoLink.setAttribute('aria-label', primaryLink.getAttribute('aria-label') || '');

          const optimizedPic = createOptimizedPicture(primaryImg.src, primaryImg.alt);
          moveInstrumentation(primaryImg, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
          optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
          brandLogoLink.append(optimizedPic);
          footerBrandLeft.append(brandLogoLink);
        }
      }

      // Secondary Logo
      if (secondaryLogoCell) {
        const secondaryImg = secondaryLogoCell.querySelector('img');
        if (secondaryImg) {
          const brandSecondaryLogoDiv = document.createElement('div');
          brandSecondaryLogoDiv.className = 'footer-brand-secondary--logo footer-d-inline-block';

          const optimizedPic = createOptimizedPicture(secondaryImg.src, secondaryImg.alt);
          moveInstrumentation(secondaryImg, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-no-rendition';
          optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
          brandSecondaryLogoDiv.append(optimizedPic);
          footerBrandLeft.append(brandSecondaryLogoDiv);
        }
      }

      // Link Groups
      linkGroupsCells.forEach((cell, cellIndex) => {
        const ul = cell.querySelector('ul');
        if (ul) {
          const footerListDiv = document.createElement('div');
          footerListDiv.className = 'footer-footerList';
          const newUl = document.createElement('ul');
          newUl.className = 'footer-list footer-d-flex footer-align-items-center footer-justify-content-center footer-align-items-md-start footer-flex-column';

          [...ul.children].forEach((li) => {
            const newLi = document.createElement('li');
            newLi.className = 'footer-list-item';
            const link = li.querySelector('a');
            if (link) {
              const newLink = document.createElement('a');
              newLink.href = link.href;
              newLink.textContent = link.textContent;
              newLink.className = 'footer-cta-analytics footer-analytics_cta_click footer-list-item--link footer-d-inline-block';
              newLink.setAttribute('data-link-region', 'Footer List');
              if (link.target) newLink.target = link.target;
              newLi.append(newLink);
            }
            newUl.append(newLi);
          });
          footerListDiv.append(newUl);
          if (cellIndex < 2) {
            footerBrandNavbarLeft.append(footerListDiv);
          } else {
            footerBrandNavbarRight.append(footerListDiv);
          }
        }
      });

    } else if (rowIndex === 1) { // Secondary Footer
      const socialLinksCell = row.children[0];
      const footerLinksCell = row.children[1];
      const copyrightCell = row.children[2];

      // Social Links
      if (socialLinksCell) {
        const h3 = document.createElement('h3');
        h3.className = 'footer-social_media--title';
        h3.textContent = 'Follow Us On';
        footerBrandRightSecondary.append(h3);

        const ul = socialLinksCell.querySelector('ul');
        if (ul) {
          const newUl = document.createElement('ul');
          newUl.className = 'footer-brand-right--list footer-d-flex footer-align-items-center footer-justify-content-center footer-px-10 footer-flex-wrap';

          [...ul.children].forEach((li) => {
            const newLi = document.createElement('li');
            newLi.className = 'footer-brand-right--item footer-d-flex footer-justify-content-center footer-align-items-center';
            const link = li.querySelector('a');
            const img = li.querySelector('img');
            if (link && img) {
              const newLink = document.createElement('a');
              newLink.href = link.href;
              newLink.className = 'footer-brand-right--link footer-d-flex footer-justify-content-center footer-align-items-center footer-analytics_cta_click';
              newLink.setAttribute('data-cta-region', 'Footer');
              newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label') || '');
              newLink.target = '_blank';
              newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name') || '');
              newLink.setAttribute('data-social-linktype', link.getAttribute('data-social-linktype') || '');

              const optimizedPic = createOptimizedPicture(img.src, img.alt);
              moveInstrumentation(img, optimizedPic.querySelector('img'));
              optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
              optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
              optimizedPic.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label') || '');
              newLink.append(optimizedPic);
              newLi.append(newLink);
            }
            newUl.append(newLi);
          });
          footerBrandRightSecondary.append(newUl);
        }
      }

      // Footer Links
      if (footerLinksCell) {
        const ul = footerLinksCell.querySelector('ul');
        if (ul) {
          const newUl = document.createElement('ul');
          newUl.className = 'footer-brand-left--list footer-d-flex footer-align-items-center footer-justify-content-center footer-flex-wrap';

          [...ul.children].forEach((li) => {
            const newLi = document.createElement('li');
            newLi.className = 'footer-brand-left--item footer-foot_link';
            const link = li.querySelector('a');
            if (link) {
              const newLink = document.createElement('a');
              newLink.href = link.href;
              newLink.textContent = link.textContent;
              newLink.className = 'footer-brand-left--link footer-analytics_cta_click';
              newLink.setAttribute('data-cta-region', 'Footer');
              if (link.target) newLink.target = link.target;
              newLi.append(newLink);
            }
            newUl.append(newLi);
          });
          footerBrandLeftSecondary.append(newUl);
        }
      }

      // Copyright
      if (copyrightCell) {
        const copyrightDiv = document.createElement('div');
        copyrightDiv.className = 'footer-brand-left--copyright footer-text-center';
        const span = document.createElement('span');
        span.className = 'footer-brand-left--text footer-text-white';
        span.innerHTML = copyrightCell.innerHTML;
        copyrightDiv.append(span);
        footerBrandLeftSecondary.append(copyrightDiv);
      }
    }
  });

  // Assemble primary footer
  nav.append(footerBrandNavbarLeft, footerBrandNavbarRight);
  footerBrandRight.append(nav);
  footerBrandPrimaryContent.append(footerBrandLeft, footerBrandRight);
  footerContainer.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerContainer);

  // Assemble secondary footer
  footerBrandSecondaryContent.append(footerBrandRightSecondary, footerBrandLeftSecondary);
  footerContainerSecondary.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerContainerSecondary);

  block.textContent = '';
  block.append(footerBrandPrimary, footerBrandSecondary);
}
