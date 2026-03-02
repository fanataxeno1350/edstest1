import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const primarySection = document.createElement('section');
  primarySection.classList.add('footerbrand-footer-brand-footer-brand__primary');
  primarySection.style.backgroundColor = '';

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('footerbrand-footer-brand-container');
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footerbrand-footer-brand-footer-brand__primary--content', 'footerbrand-d-flex', 'footerbrand-flex-column', 'footerbrand-flex-md-row', 'footerbrand-justify-content-md-between', 'footerbrand-align-items-center');
  primaryContainer.append(primaryContent);

  const leftSectionPrimary = document.createElement('section');
  leftSectionPrimary.classList.add('footerbrand-footer-brand-footer-brand__left', 'footerbrand-d-flex', 'footerbrand-gap-16', 'footerbrand-px-10', 'footerbrand-align-items-center', 'footerbrand-justify-content-center');
  primaryContent.append(leftSectionPrimary);

  const rightSectionPrimary = document.createElement('section');
  rightSectionPrimary.classList.add('footerbrand-footer-brand-footer-brand__right');
  primaryContent.append(rightSectionPrimary);

  const nav = document.createElement('nav');
  nav.classList.add('footerbrand-footer-brand-footer-brand__navbar', 'footerbrand-d-grid', 'footerbrand-d-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');
  rightSectionPrimary.append(nav);

  const navLeft = document.createElement('div');
  navLeft.classList.add('footerbrand-footer-brand-footer-brand__navbar--left', 'footerbrand-d-flex', 'footerbrand-flex-column', 'footerbrand-flex-md-row');
  nav.append(navLeft);

  const navRight = document.createElement('div');
  navRight.classList.add('footerbrand-footer-brand-footer-brand__navbar--right', 'footerbrand-d-flex', 'footerbrand-flex-column', 'footerbrand-flex-md-row');
  nav.append(navRight);

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footerbrand-footer-brand-footer-brand__secondary');
  secondarySection.style.backgroundColor = '';

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('footerbrand-footer-brand-container');
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footerbrand-footer-brand-footer-brand__secondary--content', 'footerbrand-d-flex', 'footerbrand-flex-column', 'footerbrand-justify-content-md-between', 'footerbrand-align-items-center');
  secondaryContainer.append(secondaryContent);

  const rightSectionSecondary = document.createElement('section');
  rightSectionSecondary.classList.add('footerbrand-footer-brand-footer-brand__right', 'footerbrand-d-flex', 'footerbrand-flex-column', 'footerbrand-pb-5');
  secondaryContent.append(rightSectionSecondary);

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('footerbrand-footer-brand-social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  rightSectionSecondary.append(socialMediaTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footerbrand-footer-brand-footer-brand__right--list', 'footerbrand-d-flex', 'footerbrand-align-items-center', 'footerbrand-justify-content-center', 'footerbrand-px-10', 'footerbrand-flex-wrap');
  rightSectionSecondary.append(socialList);

  const leftSectionSecondary = document.createElement('section');
  leftSectionSecondary.classList.add('footerbrand-footer-brand-footer-brand__left', 'footerbrand-py-5', 'footerbrand-d-flex', 'footerbrand-flex-column', 'footerbrand-gap-3');
  secondaryContent.append(leftSectionSecondary);

  const leftLinkList = document.createElement('ul');
  leftLinkList.classList.add('footerbrand-footer-brand-footer-brand__left--list', 'footerbrand-d-flex', 'footerbrand-align-items-center', 'footerbrand-justify-content-center', 'footerbrand-flex-wrap');
  leftSectionSecondary.append(leftLinkList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footerbrand-footer-brand-footer-brand__left--copyright', 'footerbrand-text-center');
  leftSectionSecondary.append(copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footerbrand-footer-brand-footer-brand__left--text', 'footerbrand-text-white');
  copyrightDiv.append(copyrightSpan);

  // Process rows
  [...block.children].forEach((row, rowIndex) => {
    moveInstrumentation(row, row); // Transfer instrumentation to the row itself for easier debugging

    // Row 0: Primary Logo, Secondary Logo, Footer Link Groups (2 groups for navLeft, 2 for navRight)
    if (rowIndex === 0) {
      const cells = [...row.children];

      // Primary Logo
      const primaryLogoCell = cells[0];
      if (primaryLogoCell) {
        const link = primaryLogoCell.querySelector('a');
        const img = primaryLogoCell.querySelector('img');
        if (link && img) {
          const logoLink = document.createElement('a');
          logoLink.href = link.href;
          logoLink.target = '_blank';
          logoLink.classList.add('footerbrand-footer-brand-footer-brand__logo', 'footerbrand-d-inline-block', 'footerbrand-analytics_cta_click');
          logoLink.setAttribute('data-cta-region', 'Footer');
          logoLink.setAttribute('aria-label', img.alt);

          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('footerbrand-footer-brand-object-fit-contain', 'footerbrand-w-100', 'footerbrand-h-100', 'footerbrand-no-rendition');
          optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
          logoLink.append(optimizedPic);
          leftSectionPrimary.append(logoLink);
        }
      }

      // Secondary Logo
      const secondaryLogoCell = cells[1];
      if (secondaryLogoCell) {
        const img = secondaryLogoCell.querySelector('img');
        if (img) {
          const secondaryLogoDiv = document.createElement('div');
          secondaryLogoDiv.classList.add('footerbrand-footer-brand-footer-brand__secondary--logo', 'footerbrand-d-inline-block');

          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('footerbrand-footer-brand-object-fit-contain', 'footerbrand-w-100', 'footerbrand-no-rendition');
          optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
          secondaryLogoDiv.append(optimizedPic);
          leftSectionPrimary.append(secondaryLogoDiv);
        }
      }

      // Footer Link Groups
      const footerLinkGroupCells = cells.slice(2);
      footerLinkGroupCells.forEach((groupCell, groupIndex) => {
        const footerListDiv = document.createElement('div');
        footerListDiv.classList.add('footerbrand-footer-brand-footerList');
        moveInstrumentation(groupCell, footerListDiv);

        const ul = document.createElement('ul');
        ul.classList.add('footerbrand-footer-brand-footer-list', 'footerbrand-d-flex', 'footerbrand-align-items-center', 'footerbrand-justify-content-center', 'footerbrand-align-items-md-start', 'footerbrand-flex-column');
        footerListDiv.append(ul);

        [...groupCell.children].forEach((linkRow) => {
          const li = document.createElement('li');
          li.classList.add('footerbrand-footer-brand-footer-list__item');
          moveInstrumentation(linkRow, li);

          const link = linkRow.querySelector('a');
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

        if (groupIndex < 2) {
          navLeft.append(footerListDiv);
        } else {
          navRight.append(footerListDiv);
        }
      });
    }

    // Row 1: Social Links, Left Link, Copyright Text
    if (rowIndex === 1) {
      const cells = [...row.children];

      // Social Links
      const socialLinkCells = cells.slice(0, cells.length - 2);
      socialLinkCells.forEach((socialCell) => {
        const li = document.createElement('li');
        li.classList.add('footerbrand-footer-brand-footer-brand__right--item', 'footerbrand-d-flex', 'footerbrand-justify-content-center', 'footerbrand-align-items-center');
        moveInstrumentation(socialCell, li);

        const link = socialCell.querySelector('a');
        const img = socialCell.querySelector('img');
        if (link && img) {
          const socialLink = document.createElement('a');
          socialLink.href = link.href;
          socialLink.target = '_blank';
          socialLink.classList.add('footerbrand-footer-brand-footer-brand__right--link', 'footerbrand-d-flex', 'footerbrand-justify-content-center', 'footerbrand-align-items-center', 'footerbrand-analytics_cta_click');
          socialLink.setAttribute('data-cta-region', 'Footer');
          socialLink.setAttribute('data-cta-label', `footer-${img.getAttribute('aria-label')}`);
          socialLink.setAttribute('data-platform-name', img.getAttribute('aria-label'));
          socialLink.setAttribute('data-social-linktype', 'follow');

          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('footerbrand-footer-brand-object-fit-contain', 'footerbrand-w-100', 'footerbrand-h-100', 'footerbrand-no-rendition');
          optimizedPic.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label'));
          optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
          socialLink.append(optimizedPic);
          li.append(socialLink);
        }
        socialList.append(li);
      });

      // Left Link
      const leftLinkCell = cells[cells.length - 2];
      if (leftLinkCell) {
        const li = document.createElement('li');
        li.classList.add('footerbrand-footer-brand-footer-brand__left--item', 'footerbrand-foot_link');
        moveInstrumentation(leftLinkCell, li);

        const link = leftLinkCell.querySelector('a');
        if (link) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          newLink.target = '_blank';
          newLink.classList.add('footerbrand-footer-brand-footer-brand__left--link', 'footerbrand-analytics_cta_click');
          newLink.setAttribute('data-cta-region', 'Footer');
          li.append(newLink);
        }
        leftLinkList.append(li);
      }

      // Copyright Text
      const copyrightCell = cells[cells.length - 1];
      if (copyrightCell) {
        copyrightSpan.innerHTML = copyrightCell.innerHTML;
        moveInstrumentation(copyrightCell, copyrightSpan);
      }
    }
  });

  block.textContent = '';
  block.append(primarySection, secondarySection);
}
