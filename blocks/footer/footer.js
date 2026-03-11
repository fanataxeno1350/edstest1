import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-brand-footer footer-w-100 footer-bg-boing-neutral-gray-600';
  footerContainer.setAttribute('data-isdoodlevariation', 'false');
  moveInstrumentation(block, footerContainer);

  // Primary Section
  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand-footer__primary';
  primarySection.style.backgroundColor = '';

  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'footer-container';

  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand-footer__primary--content footer-d-flex footer-flex-column footer-flex-md-row footer-justify-content-md-between footer-align-items-center';

  const leftSection = document.createElement('section');
  leftSection.className = 'footer-brand-footer__left footer-d-flex footer-gap-16 footer-px-10 footer-align-items-center footer-justify-content-center';

  const rightSection = document.createElement('section');
  rightSection.className = 'footer-brand-footer__right';

  const nav = document.createElement('nav');
  nav.className = 'footer-brand-footer__navbar footer-d-grid footer-d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');

  const navLeft = document.createElement('div');
  navLeft.className = 'footer-brand-footer__navbar--left footer-d-flex footer-flex-column footer-flex-md-row';

  const navRight = document.createElement('div');
  navRight.className = 'footer-brand-footer__navbar--right footer-d-flex footer-flex-column footer-flex-md-row';

  // Secondary Section
  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand-footer__secondary';
  secondarySection.style.backgroundColor = '';

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'footer-container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand-footer__secondary--content footer-d-flex footer-flex-column footer-justify-content-md-between footer-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'footer-brand-footer__right footer-d-flex footer-flex-column footer-pb-5';

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'footer-brand-footer__left footer-py-5 footer-d-flex footer-flex-column footer-gap-3';

  const rows = [...block.children];

  // Row 1: Logo 1 and Logo 2
  const logoRow = rows.shift();
  if (logoRow) {
    const logoCells = [...logoRow.children];

    const logo1Cell = logoCells[0];
    if (logo1Cell) {
      const logo1Link = logo1Cell.querySelector('a');
      const logo1Img = logo1Cell.querySelector('img');
      if (logo1Link && logo1Img) {
        const newLogo1Link = document.createElement('a');
        newLogo1Link.href = logo1Link.href;
        newLogo1Link.target = '_blank';
        newLogo1Link.className = 'footer-brand-footer__logo footer-d-inline-block footer-analytics_cta_click';
        newLogo1Link.setAttribute('data-cta-region', 'Footer');
        newLogo1Link.setAttribute('aria-label', 'ITC Logo');
        moveInstrumentation(logo1Link, newLogo1Link);

        const optimizedPic = createOptimizedPicture(logo1Img.src, logo1Img.alt);
        optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
        optimizedPic.querySelector('img').loading = 'lazy';
        moveInstrumentation(logo1Img, optimizedPic.querySelector('img'));
        newLogo1Link.append(optimizedPic);
        leftSection.append(newLogo1Link);
      }
    }

    const logo2Cell = logoCells[1];
    if (logo2Cell) {
      const logo2Img = logo2Cell.querySelector('img');
      if (logo2Img) {
        const secondaryLogoDiv = document.createElement('div');
        secondaryLogoDiv.className = 'footer-brand-footer__secondary--logo footer-d-inline-block';
        moveInstrumentation(logo2Cell, secondaryLogoDiv);

        const optimizedPic = createOptimizedPicture(logo2Img.src, logo2Img.alt);
        optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-no-rendition';
        optimizedPic.querySelector('img').loading = 'lazy';
        moveInstrumentation(logo2Img, optimizedPic.querySelector('img'));
        secondaryLogoDiv.append(optimizedPic);
        leftSection.append(secondaryLogoDiv);
      }
    }
  }

  // Rows 2-5: Nav Lists
  for (let i = 0; i < 4; i += 1) {
    const navListRow = rows.shift();
    if (navListRow) {
      const ul = document.createElement('ul');
      ul.className = 'footer-list-footer footer-d-flex footer-align-items-center footer-justify-content-center footer-align-items-md-start footer-flex-column';
      moveInstrumentation(navListRow, ul);

      [...navListRow.children].forEach((cell) => {
        const link = cell.querySelector('a');
        if (link) {
          const li = document.createElement('li');
          li.className = 'footer-list-footer__item';
          moveInstrumentation(cell, li);

          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          newLink.className = 'footer-cta-analytics footer-analytics_cta_click footer-list-footer__item--link footer-d-inline-block';
          newLink.setAttribute('data-link-region', 'Footer List');
          if (link.target) {
            newLink.target = link.target;
          }
          moveInstrumentation(link, newLink);
          li.append(newLink);
          ul.append(li);
        }
      });

      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'footer-footerList-footer';
      footerListDiv.append(ul);

      if (i < 2) {
        navLeft.append(footerListDiv);
      } else {
        navRight.append(footerListDiv);
      }
    }
  }

  // Row 6: Social Links
  const socialLinksRow = rows.shift();
  if (socialLinksRow) {
    const socialTitle = document.createElement('h3');
    socialTitle.className = 'footer-social_media-footer--title';
    socialTitle.textContent = 'Follow Us On';
    socialMediaSection.append(socialTitle);

    const socialUl = document.createElement('ul');
    socialUl.className = 'footer-brand-footer__right--list footer-d-flex footer-align-items-center footer-justify-content-center footer-px-10 footer-flex-wrap';
    moveInstrumentation(socialLinksRow, socialUl);

    [...socialLinksRow.children].forEach((cell) => {
      const link = cell.querySelector('a');
      const img = cell.querySelector('img');
      if (link && img) {
        const li = document.createElement('li');
        li.className = 'footer-brand-footer__right--item footer-d-flex footer-justify-content-center footer-align-items-center';
        moveInstrumentation(cell, li);

        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.target = '_blank';
        newLink.className = 'footer-brand-footer__right--link footer-d-flex footer-justify-content-center footer-align-items-center footer-analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.setAttribute('data-cta-label', `footer-${img.alt.toLowerCase()}`);
        newLink.setAttribute('data-platform-name', img.alt.toLowerCase());
        newLink.setAttribute('data-social-linktype', 'follow');
        moveInstrumentation(link, newLink);

        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
        optimizedPic.querySelector('img').loading = 'lazy';
        optimizedPic.querySelector('img').setAttribute('aria-label', img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        newLink.append(optimizedPic);
        li.append(newLink);
        socialUl.append(li);
      }
    });
    socialMediaSection.append(socialUl);
  }

  // Row 7: ITC Portal Link and Copyright Text
  const copyrightRow = rows.shift();
  if (copyrightRow) {
    const copyrightUl = document.createElement('ul');
    copyrightUl.className = 'footer-brand-footer__left--list footer-d-flex footer-align-items-center footer-justify-content-center footer-flex-wrap';
    moveInstrumentation(copyrightRow, copyrightUl);

    const itcPortalCell = copyrightRow.children[0];
    if (itcPortalCell) {
      const itcLink = itcPortalCell.querySelector('a');
      if (itcLink) {
        const li = document.createElement('li');
        li.className = 'footer-brand-footer__left--item footer-foot_link-footer';
        moveInstrumentation(itcPortalCell, li);

        const newLink = document.createElement('a');
        newLink.href = itcLink.href;
        newLink.target = '_blank';
        newLink.textContent = itcLink.textContent;
        newLink.className = 'footer-brand-footer__left--link footer-analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        moveInstrumentation(itcLink, newLink);
        li.append(newLink);
        copyrightUl.append(li);
      }
    }
    copyrightSection.append(copyrightUl);

    const copyrightTextCell = copyrightRow.children[1];
    if (copyrightTextCell) {
      const copyrightDiv = document.createElement('div');
      copyrightDiv.className = 'footer-brand-footer__left--copyright footer-text-center';
      moveInstrumentation(copyrightTextCell, copyrightDiv);

      const copyrightSpan = document.createElement('span');
      copyrightSpan.className = 'footer-brand-footer__left--text footer-text-white';
      copyrightSpan.innerHTML = copyrightTextCell.innerHTML;
      copyrightDiv.append(copyrightSpan);
      copyrightSection.append(copyrightDiv);
    }
  }

  nav.append(navLeft, navRight);
  primaryContent.append(leftSection, rightSection);
  rightSection.append(nav);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  secondaryContent.append(socialMediaSection, copyrightSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  footerContainer.append(primarySection, secondarySection);

  block.textContent = '';
  block.append(footerContainer);
}
