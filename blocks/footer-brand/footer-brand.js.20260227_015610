import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandSection = document.createElement('section');
  footerBrandSection.className = 'footer-brand-section footer-p-0';
  moveInstrumentation(block, footerBrandSection);

  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.className = 'footer-brand-wrapper footer-w-100 footer-bg-boing-neutral-gray-600';
  footerBrandWrapper.setAttribute('data-isdoodlevariation', 'false');
  footerBrandSection.append(footerBrandWrapper);

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand-primary';
  footerBrandWrapper.append(primarySection);

  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'footer-container';
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand-primary-content footer-d-flex footer-flex-column footer-flex-md-row footer-justify-content-md-between footer-align-items-center';
  primaryContainer.append(primaryContent);

  const brandLeft = document.createElement('section');
  brandLeft.className = 'footer-brand-left footer-d-flex footer-gap-16 footer-px-10 footer-align-items-center footer-justify-content-center';
  primaryContent.append(brandLeft);

  const brandRight = document.createElement('section');
  brandRight.className = 'footer-brand-right';
  primaryContent.append(brandRight);

  const nav = document.createElement('nav');
  nav.className = 'footer-brand-navbar footer-d-grid footer-d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');
  brandRight.append(nav);

  const navLeft = document.createElement('div');
  navLeft.className = 'footer-brand-navbar-left footer-d-flex footer-flex-column footer-flex-md-row';
  nav.append(navLeft);

  const navRight = document.createElement('div');
  navRight.className = 'footer-brand-navbar-right footer-d-flex footer-flex-column footer-flex-md-row';
  nav.append(navRight);

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand-secondary';
  footerBrandWrapper.append(secondarySection);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'footer-container';
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand-secondary-content footer-d-flex footer-flex-column footer-justify-content-md-between footer-align-items-center';
  secondaryContainer.append(secondaryContent);

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'footer-brand-right footer-d-flex footer-flex-column footer-pb-5';
  secondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'footer-brand-left footer-py-5 footer-d-flex footer-flex-column footer-gap-3';
  secondaryContent.append(copyrightSection);

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'footer-brand-left-list footer-d-flex footer-align-items-center footer-justify-content-center footer-flex-wrap';
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand-left-copyright footer-text-center';
  copyrightSection.append(copyrightDiv);

  let navListCount = 0;

  [...block.children].forEach((row) => {
    moveInstrumentation(row, row);
    const cells = [...row.children];

    // Primary Logo
    const primaryLogoCell = cells[0];
    if (primaryLogoCell) {
      const link = primaryLogoCell.querySelector('a');
      const img = primaryLogoCell.querySelector('img');
      if (link && img) {
        const brandLogoLink = document.createElement('a');
        brandLogoLink.href = link.href;
        brandLogoLink.target = '_blank';
        brandLogoLink.className = 'footer-brand-logo footer-d-inline-block footer-analytics_cta_click';
        brandLogoLink.setAttribute('data-cta-region', 'Footer');
        brandLogoLink.setAttribute('aria-label', link.getAttribute('aria-label'));

        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
        optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
        brandLogoLink.append(optimizedPic);
        brandLeft.append(brandLogoLink);
      }
    }

    // Secondary Logo
    const secondaryLogoCell = cells[1];
    if (secondaryLogoCell) {
      const img = secondaryLogoCell.querySelector('img');
      if (img) {
        const brandSecondaryLogoDiv = document.createElement('div');
        brandSecondaryLogoDiv.className = 'footer-brand-secondary-logo footer-d-inline-block';

        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-no-rendition';
        optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
        brandSecondaryLogoDiv.append(optimizedPic);
        brandLeft.append(brandSecondaryLogoDiv);
      }
    }

    // Navigation Lists
    for (let i = 2; i < cells.length; i += 1) {
      const listCell = cells[i];
      const listItems = listCell.querySelectorAll('li');

      if (listItems.length > 0) {
        const listContainer = document.createElement('div');
        listContainer.className = 'footer-list-container';

        const ul = document.createElement('ul');
        ul.className = 'footer-list footer-d-flex footer-align-items-center footer-justify-content-center footer-align-items-md-start footer-flex-column';

        listItems.forEach((item) => {
          const li = document.createElement('li');
          li.className = 'footer-list-item';
          const link = item.querySelector('a');
          if (link) {
            const newLink = document.createElement('a');
            newLink.href = link.href;
            newLink.textContent = link.textContent;
            newLink.className = 'footer-cta-analytics footer-analytics_cta_click footer-list-item-link footer-d-inline-block';
            newLink.setAttribute('data-link-region', 'Footer List');
            if (link.target) {
              newLink.target = link.target;
            }
            li.append(newLink);
          }
          ul.append(li);
        });
        listContainer.append(ul);

        // Distribute navigation lists into left and right sections
        if (navListCount < 2) {
          navLeft.append(listContainer);
        } else if (navListCount < 4) {
          navRight.append(listContainer);
        }
        navListCount += 1;
      }
    }

    // Social Media Links (if present in the row, assuming they are in the last cells after nav lists)
    const socialLinks = row.querySelectorAll('[data-platform-name]');
    if (socialLinks.length > 0) {
      const h3 = document.createElement('h3');
      h3.className = 'footer-social-media-title';
      h3.textContent = 'Follow Us On';
      socialMediaSection.append(h3);

      const socialUl = document.createElement('ul');
      socialUl.className = 'footer-brand-right-list footer-d-flex footer-align-items-center footer-justify-content-center footer-px-10 footer-flex-wrap';
      socialMediaSection.append(socialUl);

      socialLinks.forEach((link) => {
        const li = document.createElement('li');
        li.className = 'footer-brand-right-item footer-d-flex footer-justify-content-center footer-align-items-center';

        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.target = '_blank';
        newLink.className = 'footer-brand-right-link footer-d-flex footer-justify-content-center footer-align-items-center footer-analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.setAttribute('data-cta-label', `footer-${link.dataset.platformName}`);
        newLink.setAttribute('data-platform-name', link.dataset.platformName);
        newLink.setAttribute('data-social-linktype', 'follow');

        const img = link.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
          optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
          optimizedPic.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label'));
          newLink.append(optimizedPic);
        }
        li.append(newLink);
        socialUl.append(li);
      });
    }

    // ITC Portal Link
    const itcPortalLinkCell = row.querySelector('.footer-brand-left-item.footer-link');
    if (itcPortalLinkCell) {
      const link = itcPortalLinkCell.querySelector('a');
      if (link) {
        const li = document.createElement('li');
        li.className = 'footer-brand-left-item footer-link';

        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.target = '_blank';
        newLink.className = 'footer-brand-left-link footer-analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.textContent = link.textContent.trim();
        li.append(newLink);
        copyrightList.append(li);
      }
    }

    // Copyright Text
    const copyrightTextCell = row.querySelector('.footer-brand-left-copyright span');
    if (copyrightTextCell) {
      const span = document.createElement('span');
      span.className = 'footer-brand-left-text footer-text-white';
      span.textContent = copyrightTextCell.textContent.trim();
      copyrightDiv.append(span);
    }
  });

  block.textContent = '';
  block.append(footerBrandSection);
}
