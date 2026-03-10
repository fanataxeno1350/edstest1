import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-brand-footer footer-w-100 footer-bg-boing-neutral-gray-600';
  footerContainer.setAttribute('data-isdoodlevariation', 'false');
  moveInstrumentation(block, footerContainer);

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

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand-footer__secondary';
  secondarySection.style.backgroundColor = '';

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'footer-container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand-footer__secondary--content footer-d-flex footer-flex-column footer-justify-content-md-between footer-align-items-center';

  const socialMediaRight = document.createElement('section');
  socialMediaRight.className = 'footer-brand-footer__right footer-d-flex footer-flex-column footer-pb-5';

  const copyrightLeft = document.createElement('section');
  copyrightLeft.className = 'footer-brand-footer__left footer-py-5 footer-d-flex footer-flex-column footer-gap-3';

  let primaryLogoLink, secondaryLogoImg, copyrightText, itcPortalLink;
  const footerLinkLists = [];
  const footerSocialLinks = [];

  [...block.children].forEach((row) => {
    if (row.children.length > 0) {
      const firstCell = row.children[0];
      const secondCell = row.children.length > 1 ? row.children[1] : null;

      // Primary Logo
      if (firstCell.querySelector('a img')) {
        const link = firstCell.querySelector('a');
        const img = firstCell.querySelector('img');
        primaryLogoLink = document.createElement('a');
        primaryLogoLink.href = link.href;
        primaryLogoLink.target = '_blank';
        primaryLogoLink.className = 'footer-brand-footer__logo footer-d-inline-block footer-analytics_cta_click';
        primaryLogoLink.setAttribute('data-cta-region', 'Footer');
        primaryLogoLink.setAttribute('aria-label', img.alt);
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        primaryLogoLink.append(optimizedPic);
        moveInstrumentation(link, primaryLogoLink);
      }
      // Secondary Logo
      else if (firstCell.querySelector('img') && !primaryLogoLink) {
        const img = firstCell.querySelector('img');
        secondaryLogoImg = document.createElement('div');
        secondaryLogoImg.className = 'footer-brand-footer__secondary--logo footer-d-inline-block';
        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        secondaryLogoImg.append(optimizedPic);
      }
      // Footer Link Lists
      else if (firstCell.querySelector('ul')) {
        const ul = firstCell.querySelector('ul');
        const linkListDiv = document.createElement('div');
        linkListDiv.className = 'footer-footerList-footer';
        const newUl = document.createElement('ul');
        newUl.className = 'footer-list-footer footer-d-flex footer-align-items-center footer-justify-content-center footer-align-items-md-start footer-flex-column';
        [...ul.children].forEach((li) => {
          const link = li.querySelector('a');
          if (link) {
            const newLi = document.createElement('li');
            newLi.className = 'footer-list-footer__item';
            const newLink = document.createElement('a');
            newLink.href = link.href;
            newLink.textContent = link.textContent;
            newLink.className = 'footer-cta-analytics footer-analytics_cta_click footer-list-footer__item--link footer-d-inline-block';
            newLink.setAttribute('data-link-region', 'Footer List');
            if (link.target) newLink.target = link.target;
            moveInstrumentation(link, newLink);
            newLi.append(newLink);
            newUl.append(newLi);
          }
        });
        linkListDiv.append(newUl);
        footerLinkLists.push(linkListDiv);
      }
      // Footer Social Links
      else if (firstCell.querySelector('h3') && firstCell.textContent.includes('Follow Us On')) {
        const ul = secondCell.querySelector('ul');
        if (ul) {
          const h3 = document.createElement('h3');
          h3.className = 'footer-social_media-footer--title';
          h3.textContent = 'Follow Us On';
          socialMediaRight.append(h3);

          const socialUl = document.createElement('ul');
          socialUl.className = 'footer-brand-footer__right--list footer-d-flex footer-align-items-center footer-justify-content-center footer-px-10 footer-flex-wrap';

          [...ul.children].forEach((li) => {
            const link = li.querySelector('a');
            const img = li.querySelector('img');
            if (link && img) {
              const newLi = document.createElement('li');
              newLi.className = 'footer-brand-footer__right--item footer-d-flex footer-justify-content-center footer-align-items-center';
              const newLink = document.createElement('a');
              newLink.href = link.href;
              newLink.className = 'footer-brand-footer__right--link footer-d-flex footer-justify-content-center footer-align-items-center footer-analytics_cta_click';
              newLink.setAttribute('data-cta-region', 'Footer');
              newLink.setAttribute('data-cta-label', `footer-${link.getAttribute('data-platform-name')}`);
              newLink.target = '_blank';
              newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name'));
              newLink.setAttribute('data-social-linktype', 'follow');
              const optimizedPic = createOptimizedPicture(img.src, img.alt);
              moveInstrumentation(img, optimizedPic.querySelector('img'));
              newLink.append(optimizedPic);
              moveInstrumentation(link, newLink);
              newLi.append(newLink);
              socialUl.append(newLi);
            }
          });
          footerSocialLinks.push(socialUl);
        }
      }
      // Copyright and ITC Portal Link
      else if (firstCell.querySelector('span') && firstCell.textContent.includes('©')) {
        copyrightText = firstCell.querySelector('span').textContent.trim();
        const itcLink = firstCell.querySelector('a');
        if (itcLink) {
          itcPortalLink = document.createElement('a');
          itcPortalLink.href = itcLink.href;
          itcPortalLink.textContent = itcLink.textContent;
          itcPortalLink.target = '_blank';
          itcPortalLink.className = 'footer-brand-footer__left--link footer-analytics_cta_click';
          itcPortalLink.setAttribute('data-cta-region', 'Footer');
          moveInstrumentation(itcLink, itcPortalLink);
        }
      }
    }
  });

  // Assemble primary section
  if (primaryLogoLink) {
    leftSection.append(primaryLogoLink);
  }
  if (secondaryLogoImg) {
    leftSection.append(secondaryLogoImg);
  }

  footerLinkLists.forEach((list, index) => {
    if (index < 2) {
      navLeft.append(list);
    } else {
      navRight.append(list);
    }
  });
  nav.append(navLeft, navRight);
  rightSection.append(nav);
  primaryContent.append(leftSection, rightSection);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  // Assemble secondary section
  if (footerSocialLinks.length > 0) {
    socialMediaRight.append(...footerSocialLinks);
    secondaryContent.append(socialMediaRight);
  }

  if (itcPortalLink || copyrightText) {
    const copyrightUl = document.createElement('ul');
    copyrightUl.className = 'footer-brand-footer__left--list footer-d-flex footer-align-items-center footer-justify-content-center footer-flex-wrap';
    if (itcPortalLink) {
      const itcLi = document.createElement('li');
      itcLi.className = 'footer-brand-footer__left--item footer-foot_link-footer';
      itcLi.append(itcPortalLink);
      copyrightUl.append(itcLi);
    }
    copyrightLeft.append(copyrightUl);

    if (copyrightText) {
      const copyrightDiv = document.createElement('div');
      copyrightDiv.className = 'footer-brand-footer__left--copyright footer-text-center';
      const copyrightSpan = document.createElement('span');
      copyrightSpan.className = 'footer-brand-footer__left--text footer-text-white';
      copyrightSpan.textContent = copyrightText;
      copyrightDiv.append(copyrightSpan);
      copyrightLeft.append(copyrightDiv);
    }
    secondaryContent.append(copyrightLeft);
  }

  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  footerContainer.append(primarySection, secondarySection);

  block.textContent = '';
  block.append(footerContainer);
}
