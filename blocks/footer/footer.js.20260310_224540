import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-brand-footer footer-w-100 footer-bg-boing-neutral-gray-600';
  footerContainer.setAttribute('data-isdoodlevariation', 'false');

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand-footer__primary';

  const primaryContentDiv = document.createElement('div');
  primaryContentDiv.className = 'footer-container';

  const primaryContentInnerDiv = document.createElement('div');
  primaryContentInnerDiv.className = 'footer-brand-footer__primary--content footer-d-flex footer-flex-column footer-flex-md-row footer-justify-content-md-between footer-align-items-center';

  const leftSection = document.createElement('section');
  leftSection.className = 'footer-brand-footer__left footer-d-flex footer-gap-16 footer-px-10 footer-align-items-center footer-justify-content-center';

  const rightSection = document.createElement('section');
  rightSection.className = 'footer-brand-footer__right';

  const nav = document.createElement('nav');
  nav.className = 'footer-brand-footer__navbar footer-d-grid footer-d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');

  const navLeftDiv = document.createElement('div');
  navLeftDiv.className = 'footer-brand-footer__navbar--left footer-d-flex footer-flex-column footer-flex-md-row';

  const navRightDiv = document.createElement('div');
  navRightDiv.className = 'footer-brand-footer__navbar--right footer-d-flex footer-flex-column footer-flex-md-row';

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand-footer__secondary';

  const secondaryContentDiv = document.createElement('div');
  secondaryContentDiv.className = 'footer-container';

  const secondaryContentInnerDiv = document.createElement('div');
  secondaryContentInnerDiv.className = 'footer-brand-footer__secondary--content footer-d-flex footer-flex-column footer-justify-content-md-between footer-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'footer-brand-footer__right footer-d-flex footer-flex-column footer-pb-5';
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'footer-social_media-footer--title';
  socialMediaTitle.textContent = 'Follow Us On';
  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'footer-brand-footer__right--list footer-d-flex footer-align-items-center footer-justify-content-center footer-px-10 footer-flex-wrap';
  socialMediaSection.append(socialMediaTitle, socialMediaList);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'footer-brand-footer__left footer-py-5 footer-d-flex footer-flex-column footer-gap-3';
  const copyrightList = document.createElement('ul');
  copyrightList.className = 'footer-brand-footer__left--list footer-d-flex footer-align-items-center footer-justify-content-center footer-flex-wrap';
  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand-footer__left--copyright footer-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'footer-brand-footer__left--text footer-text-white';
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightList, copyrightDiv);

  let footerLinkGroupCounter = 0;
  let footerSocialLinkCounter = 0;

  [...block.children].forEach((row, rowIndex) => {
    moveInstrumentation(row, row);

    const cells = [...row.children];

    // Primary Logo
    if (rowIndex === 0) {
      const logo1Cell = cells[0];
      const logo1Link = logo1Cell.querySelector('a');
      const logo1Img = logo1Cell.querySelector('img');
      if (logo1Link && logo1Img) {
        const newLink = document.createElement('a');
        newLink.href = logo1Link.href;
        newLink.target = '_blank';
        newLink.className = 'footer-brand-footer__logo footer-d-inline-block footer-analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.setAttribute('aria-label', logo1Link.getAttribute('aria-label') || '');

        const optimizedPic = createOptimizedPicture(logo1Img.src, logo1Img.alt);
        moveInstrumentation(logo1Img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
        optimizedPic.querySelector('img').loading = 'lazy';
        newLink.append(optimizedPic);
        leftSection.append(newLink);
      }
    }

    // Secondary Logo
    if (rowIndex === 1) {
      const logo2Cell = cells[0];
      const logo2Img = logo2Cell.querySelector('img');
      if (logo2Img) {
        const logo2Div = document.createElement('div');
        logo2Div.className = 'footer-brand-footer__secondary--logo footer-d-inline-block';
        const optimizedPic = createOptimizedPicture(logo2Img.src, logo2Img.alt);
        moveInstrumentation(logo2Img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-no-rendition';
        optimizedPic.querySelector('img').loading = 'lazy';
        logo2Div.append(optimizedPic);
        leftSection.append(logo2Div);
      }
    }

    // Footer Link Groups
    if (rowIndex >= 2 && rowIndex <= 5) { // Assuming 4 link groups
      const linkGroupDiv = document.createElement('div');
      linkGroupDiv.className = 'footer-footerList-footer';
      const ul = document.createElement('ul');
      ul.className = 'footer-list-footer footer-d-flex footer-align-items-center footer-justify-content-center footer-align-items-md-start footer-flex-column';

      [...cells].forEach((cell) => {
        const link = cell.querySelector('a');
        if (link) {
          const li = document.createElement('li');
          li.className = 'footer-list-footer__item';
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          newLink.className = 'footer-cta-analytics footer-analytics_cta_click footer-list-footer__item--link footer-d-inline-block';
          newLink.setAttribute('data-link-region', 'Footer List');
          if (link.target) {
            newLink.target = link.target;
          }
          li.append(newLink);
          ul.append(li);
        }
      });
      linkGroupDiv.append(ul);
      if (footerLinkGroupCounter < 2) {
        navLeftDiv.append(linkGroupDiv);
      } else {
        navRightDiv.append(linkGroupDiv);
      }
      footerLinkGroupCounter++;
    }

    // Footer Social Links
    if (rowIndex >= 6 && rowIndex <= 8) { // Assuming 3 social links
      const socialLinkCell = cells[0];
      const socialLink = socialLinkCell.querySelector('a');
      const socialImg = socialLinkCell.querySelector('img');

      if (socialLink && socialImg) {
        const li = document.createElement('li');
        li.className = 'footer-brand-footer__right--item footer-d-flex footer-justify-content-center footer-align-items-center';

        const newLink = document.createElement('a');
        newLink.href = socialLink.href;
        newLink.target = '_blank';
        newLink.className = 'footer-brand-footer__right--link footer-d-flex footer-justify-content-center footer-align-items-center footer-analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.setAttribute('data-cta-label', socialLink.getAttribute('data-cta-label') || `footer-${socialImg.alt.toLowerCase()}`);
        newLink.setAttribute('data-platform-name', socialLink.getAttribute('data-platform-name') || socialImg.alt.toLowerCase());
        newLink.setAttribute('data-social-linktype', 'follow');

        const optimizedPic = createOptimizedPicture(socialImg.src, socialImg.alt);
        moveInstrumentation(socialImg, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
        optimizedPic.querySelector('img').loading = 'lazy';
        optimizedPic.querySelector('img').setAttribute('aria-label', socialImg.alt);

        newLink.append(optimizedPic);
        li.append(newLink);
        socialMediaList.append(li);
      }
      footerSocialLinkCounter++;
    }

    // Bottom Link
    if (rowIndex === 9) {
      const bottomLinkCell = cells[0];
      const bottomLink = bottomLinkCell.querySelector('a');
      if (bottomLink) {
        const li = document.createElement('li');
        li.className = 'footer-brand-footer__left--item footer-foot_link-footer';
        const newLink = document.createElement('a');
        newLink.href = bottomLink.href;
        newLink.textContent = bottomLink.textContent;
        newLink.className = 'footer-brand-footer__left--link footer-analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        if (bottomLink.target) {
          newLink.target = bottomLink.target;
        }
        li.append(newLink);
        copyrightList.append(li);
      }
    }

    // Copyright Text
    if (rowIndex === 10) {
      const copyrightCell = cells[0];
      copyrightSpan.innerHTML = copyrightCell.innerHTML;
    }
  });

  nav.append(navLeftDiv, navRightDiv);
  rightSection.append(nav);
  primaryContentInnerDiv.append(leftSection, rightSection);
  primaryContentDiv.append(primaryContentInnerDiv);
  primarySection.append(primaryContentDiv);

  secondaryContentInnerDiv.append(socialMediaSection, copyrightSection);
  secondaryContentDiv.append(secondaryContentInnerDiv);
  secondarySection.append(secondaryContentDiv);

  footerContainer.append(primarySection, secondarySection);
  block.textContent = '';
  block.append(footerContainer);
}
