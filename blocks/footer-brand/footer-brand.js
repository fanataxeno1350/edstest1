import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const primarySection = document.createElement('section');
  primarySection.classList.add('footerbrand-footer-brand-footer-brand__primary');

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('footerbrand-footer-brand-container');

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footerbrand-footer-brand-footer-brand__primary--content', 'footerbrand-d-flex', 'footerbrand-flex-column', 'footerbrand-flex-md-row', 'footerbrand-justify-content-md-between', 'footerbrand-align-items-center');

  const leftSectionPrimary = document.createElement('section');
  leftSectionPrimary.classList.add('footerbrand-footer-brand-footer-brand__left', 'footerbrand-d-flex', 'footerbrand-gap-16', 'footerbrand-px-10', 'footerbrand-align-items-center', 'footerbrand-justify-content-center');

  const rightSectionPrimary = document.createElement('section');
  rightSectionPrimary.classList.add('footerbrand-footer-brand-footer-brand__right');

  const nav = document.createElement('nav');
  nav.classList.add('footerbrand-footer-brand-footer-brand__navbar', 'footerbrand-d-grid', 'footerbrand-d-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');

  const navLeft = document.createElement('div');
  navLeft.classList.add('footerbrand-footer-brand-footer-brand__navbar--left', 'footerbrand-d-flex', 'footerbrand-flex-column', 'footerbrand-flex-md-row');

  const navRight = document.createElement('div');
  navRight.classList.add('footerbrand-footer-brand-footer-brand__navbar--right', 'footerbrand-d-flex', 'footerbrand-flex-column', 'footerbrand-flex-md-row');

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footerbrand-footer-brand-footer-brand__secondary');

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('footerbrand-footer-brand-container');

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footerbrand-footer-brand-footer-brand__secondary--content', 'footerbrand-d-flex', 'footerbrand-flex-column', 'footerbrand-justify-content-md-between', 'footerbrand-align-items-center');

  const rightSectionSecondary = document.createElement('section');
  rightSectionSecondary.classList.add('footerbrand-footer-brand-footer-brand__right', 'footerbrand-d-flex', 'footerbrand-flex-column', 'footerbrand-pb-5');

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('footerbrand-footer-brand-social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';

  const socialList = document.createElement('ul');
  socialList.classList.add('footerbrand-footer-brand-footer-brand__right--list', 'footerbrand-d-flex', 'footerbrand-align-items-center', 'footerbrand-justify-content-center', 'footerbrand-px-10', 'footerbrand-flex-wrap');

  const leftSectionSecondary = document.createElement('section');
  leftSectionSecondary.classList.add('footerbrand-footer-brand-footer-brand__left', 'footerbrand-py-5', 'footerbrand-d-flex', 'footerbrand-flex-column', 'footerbrand-gap-3');

  const footerLeftLinksList = document.createElement('ul');
  footerLeftLinksList.classList.add('footerbrand-footer-brand-footer-brand__left--list', 'footerbrand-d-flex', 'footerbrand-align-items-center', 'footerbrand-justify-content-center', 'footerbrand-flex-wrap');

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footerbrand-footer-brand-footer-brand__left--copyright', 'footerbrand-text-center');

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footerbrand-footer-brand-footer-brand__left--text', 'footerbrand-text-white');

  // Process block children
  [...block.children].forEach((row, rowIndex) => {
    if (rowIndex === 0) {
      // First row for logos
      const logo1Cell = row.children[0];
      const logo2Cell = row.children[1];

      if (logo1Cell) {
        const logo1Link = logo1Cell.querySelector('a');
        const logo1Img = logo1Cell.querySelector('img');
        if (logo1Link && logo1Img) {
          const newLogo1Link = document.createElement('a');
          newLogo1Link.href = logo1Link.href;
          newLogo1Link.target = '_blank';
          newLogo1Link.classList.add('footerbrand-footer-brand-footer-brand__logo', 'footerbrand-d-inline-block', 'footerbrand-analytics_cta_click');
          newLogo1Link.setAttribute('data-cta-region', 'Footer');
          newLogo1Link.setAttribute('aria-label', logo1Link.getAttribute('aria-label') || '');
          const optimizedPic = createOptimizedPicture(logo1Img.src, logo1Img.alt);
          moveInstrumentation(logo1Img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('footerbrand-footer-brand-object-fit-contain', 'footerbrand-w-100', 'footerbrand-h-100', 'footerbrand-no-rendition');
          newLogo1Link.append(optimizedPic);
          leftSectionPrimary.append(newLogo1Link);
          moveInstrumentation(logo1Cell, newLogo1Link);
        }
      }

      if (logo2Cell) {
        const logo2Img = logo2Cell.querySelector('img');
        if (logo2Img) {
          const secondaryLogoDiv = document.createElement('div');
          secondaryLogoDiv.classList.add('footerbrand-footer-brand-footer-brand__secondary--logo', 'footerbrand-d-inline-block');
          const optimizedPic = createOptimizedPicture(logo2Img.src, logo2Img.alt);
          moveInstrumentation(logo2Img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('footerbrand-footer-brand-object-fit-contain', 'footerbrand-w-100', 'footerbrand-no-rendition');
          secondaryLogoDiv.append(optimizedPic);
          leftSectionPrimary.append(secondaryLogoDiv);
          moveInstrumentation(logo2Cell, secondaryLogoDiv);
        }
      }
    } else if (rowIndex === 1) {
      // Second row for link groups
      [...row.children].forEach((cell, cellIndex) => {
        const footerListDiv = document.createElement('div');
        footerListDiv.classList.add('footerbrand-footer-brand-footerList');
        moveInstrumentation(cell, footerListDiv);

        const ul = document.createElement('ul');
        ul.classList.add('footerbrand-footer-brand-footer-list', 'footerbrand-d-flex', 'footerbrand-align-items-center', 'footerbrand-justify-content-center', 'footerbrand-align-items-md-start', 'footerbrand-flex-column');

        [...cell.children].forEach((linkElement) => {
          const li = document.createElement('li');
          li.classList.add('footerbrand-footer-brand-footer-list__item');
          moveInstrumentation(linkElement, li);

          const link = linkElement.querySelector('a');
          if (link) {
            const newLink = document.createElement('a');
            newLink.href = link.href;
            newLink.textContent = link.textContent;
            newLink.classList.add('footerbrand-footer-brand-cta-analytics', 'footerbrand-analytics_cta_click', 'footerbrand-footer-brand-footer-list__item--link', 'footerbrand-d-inline-block');
            newLink.setAttribute('data-link-region', 'Footer List');
            if (link.target) {
              newLink.target = link.target;
            }
            li.append(newLink);
          }
          ul.append(li);
        });
        footerListDiv.append(ul);

        if (cellIndex < 2) {
          navLeft.append(footerListDiv);
        } else {
          navRight.append(footerListDiv);
        }
      });
    } else if (rowIndex === 2) {
      // Third row for social links
      [...row.children].forEach((cell) => {
        const socialLinkLi = document.createElement('li');
        socialLinkLi.classList.add('footerbrand-footer-brand-footer-brand__right--item', 'footerbrand-d-flex', 'footerbrand-justify-content-center', 'footerbrand-align-items-center');
        moveInstrumentation(cell, socialLinkLi);

        const link = cell.querySelector('a');
        const img = cell.querySelector('img');

        if (link && img) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.classList.add('footerbrand-footer-brand-footer-brand__right--link', 'footerbrand-d-flex', 'footerbrand-justify-content-center', 'footerbrand-align-items-center', 'footerbrand-analytics_cta_click');
          newLink.setAttribute('data-cta-region', 'Footer');
          newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label') || '');
          newLink.target = '_blank';
          newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name') || '');
          newLink.setAttribute('data-social-linktype', link.getAttribute('data-social-linktype') || '');

          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label') || '');
          optimizedPic.querySelector('img').classList.add('footerbrand-footer-brand-object-fit-contain', 'footerbrand-w-100', 'footerbrand-h-100', 'footerbrand-no-rendition');
          newLink.append(optimizedPic);
          socialLinkLi.append(newLink);
        }
        socialList.append(socialLinkLi);
      });
    } else if (rowIndex === 3) {
      // Fourth row for footer left links and copyright
      const footerLeftLinksCell = row.children[0];
      const copyrightCell = row.children[1];

      if (footerLeftLinksCell) {
        [...footerLeftLinksCell.children].forEach((linkElement) => {
          const li = document.createElement('li');
          li.classList.add('footerbrand-footer-brand-footer-brand__left--item', 'footerbrand-foot_link');
          moveInstrumentation(linkElement, li);

          const link = linkElement.querySelector('a');
          if (link) {
            const newLink = document.createElement('a');
            newLink.href = link.href;
            newLink.textContent = link.textContent;
            newLink.classList.add('footerbrand-footer-brand-footer-brand__left--link', 'footerbrand-analytics_cta_click');
            newLink.setAttribute('data-cta-region', 'Footer');
            if (link.target) {
              newLink.target = link.target;
            }
            li.append(newLink);
          }
          footerLeftLinksList.append(li);
        });
      }

      if (copyrightCell) {
        copyrightSpan.textContent = copyrightCell.textContent.trim();
        moveInstrumentation(copyrightCell, copyrightSpan);
      }
    }
  });

  // Assemble the DOM
  nav.append(navLeft, navRight);
  rightSectionPrimary.append(nav);
  primaryContent.append(leftSectionPrimary, rightSectionPrimary);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  rightSectionSecondary.append(socialMediaTitle, socialList);
  copyrightDiv.append(copyrightSpan);
  leftSectionSecondary.append(footerLeftLinksList, copyrightDiv);
  secondaryContent.append(rightSectionSecondary, leftSectionSecondary);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  block.textContent = '';
  block.append(primarySection, secondarySection);

  block.classList.add('footerbrand-w-100', 'footerbrand-bg-boing-neutral-gray-600');
  block.setAttribute('data-isdoodlevariation', 'false');
}
