import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('section');
  footerContainer.className = 'footer-container-hd footer-p-0';
  moveInstrumentation(block, footerContainer);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'footer-brand footer-w-100 footer-bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');
  footerContainer.append(footerBrand);

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand__primary';
  primarySection.style.backgroundColor = '';
  footerBrand.append(primarySection);

  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'footer-container';
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand__primary--content footer-d-flex footer-flex-column footer-flex-md-row footer-justify-content-md-between footer-align-items-center';
  primaryContainer.append(primaryContent);

  const brandLeft = document.createElement('section');
  brandLeft.className = 'footer-brand__left footer-d-flex footer-gap-16 footer-px-10 footer-align-items-center footer-justify-content-center';
  primaryContent.append(brandLeft);

  // Extracting brandLogoUrl and secondaryLogoUrl
  const brandLogoCell = block.children[0]?.children[0];
  const secondaryLogoCell = block.children[0]?.children[1];

  if (brandLogoCell) {
    const brandLogoLink = brandLogoCell.querySelector('a');
    const brandLogoImg = brandLogoCell.querySelector('img');
    if (brandLogoLink && brandLogoImg) {
      const newLink = document.createElement('a');
      newLink.href = brandLogoLink.href;
      newLink.target = '_blank';
      newLink.className = 'footer-brand__logo footer-d-inline-block footer-analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.setAttribute('aria-label', brandLogoLink.getAttribute('aria-label') || 'ITC Logo');

      const optimizedPic = createOptimizedPicture(brandLogoImg.src, brandLogoImg.alt);
      moveInstrumentation(brandLogoImg, optimizedPic.querySelector('img'));
      newLink.append(optimizedPic);
      brandLeft.append(newLink);
    }
  }

  if (secondaryLogoCell) {
    const secondaryLogoImg = secondaryLogoCell.querySelector('img');
    if (secondaryLogoImg) {
      const secondaryLogoDiv = document.createElement('div');
      secondaryLogoDiv.className = 'footer-brand__secondary--logo footer-d-inline-block';
      const optimizedPic = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
      moveInstrumentation(secondaryLogoImg, optimizedPic.querySelector('img'));
      secondaryLogoDiv.append(optimizedPic);
      brandLeft.append(secondaryLogoDiv);
    }
  }

  const brandRight = document.createElement('section');
  brandRight.className = 'footer-brand__right';
  primaryContent.append(brandRight);

  const navbar = document.createElement('nav');
  navbar.className = 'footer-brand__navbar footer-d-grid footer-d-md-flex';
  navbar.setAttribute('aria-label', 'footer navbar');
  brandRight.append(navbar);

  const navbarLeft = document.createElement('div');
  navbarLeft.className = 'footer-brand__navbar--left footer-d-flex footer-flex-column footer-flex-md-row';
  navbar.append(navbarLeft);

  const navbarRight = document.createElement('div');
  navbarRight.className = 'footer-brand__navbar--right footer-d-flex footer-flex-column footer-flex-md-row';
  navbar.append(navbarRight);

  // Extracting linkLists
  const linkListsContainer = block.children[0]?.children[2];
  if (linkListsContainer) {
    const allUl = linkListsContainer.querySelectorAll('ul.footer-list');
    allUl.forEach((ulElement, index) => {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'footer-footerList';

      const newUl = document.createElement('ul');
      newUl.className = 'footer-list footer-d-flex footer-align-items-center footer-justify-content-center footer-align-items-md-start footer-flex-column';

      [...ulElement.children].forEach((liElement) => {
        const link = liElement.querySelector('a');
        if (link) {
          const newLi = document.createElement('li');
          newLi.className = 'footer-list__item';
          moveInstrumentation(liElement, newLi);

          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          newLink.className = 'footer-cta-analytics footer-analytics_cta_click footer-list__item--link footer-d-inline-block';
          newLink.setAttribute('data-link-region', 'Footer List');
          if (link.target) {
            newLink.target = link.target;
          }
          newLi.append(newLink);
          newUl.append(newLi);
        }
      });
      footerListDiv.append(newUl);

      if (index < 2) {
        navbarLeft.append(footerListDiv);
      } else {
        navbarRight.append(footerListDiv);
      }
    });
  }

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand__secondary';
  secondarySection.style.backgroundColor = '';
  footerBrand.append(secondarySection);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'footer-container';
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand__secondary--content footer-d-flex footer-flex-column footer-justify-content-md-between footer-align-items-center';
  secondaryContainer.append(secondaryContent);

  const socialMediaRight = document.createElement('section');
  socialMediaRight.className = 'footer-brand__right footer-d-flex footer-flex-column footer-pb-5';
  secondaryContent.append(socialMediaRight);

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'footer-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaRight.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'footer-brand__right--list footer-d-flex footer-align-items-center footer-justify-content-center footer-px-10 footer-flex-wrap';
  socialMediaRight.append(socialMediaList);

  // Extracting socialLinks
  const socialLinksContainer = block.children[0]?.children[3];
  if (socialLinksContainer) {
    const socialLis = socialLinksContainer.querySelectorAll('li.footer-brand__right--item');
    socialLis.forEach((liElement) => {
      const link = liElement.querySelector('a');
      const img = liElement.querySelector('img');
      if (link && img) {
        const newLi = document.createElement('li');
        newLi.className = 'footer-brand__right--item footer-d-flex footer-justify-content-center footer-align-items-center';
        moveInstrumentation(liElement, newLi);

        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.target = '_blank';
        newLink.className = 'footer-brand__right--link footer-d-flex footer-justify-content-center footer-align-items-center footer-analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label'));
        newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name'));
        newLink.setAttribute('data-social-linktype', 'follow');

        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        newLink.append(optimizedPic);
        newLi.append(newLink);
        socialMediaList.append(newLi);
      }
    });
  }

  const copyrightLeft = document.createElement('section');
  copyrightLeft.className = 'footer-brand__left footer-py-5 footer-d-flex footer-flex-column footer-gap-3';
  secondaryContent.append(copyrightLeft);

  const portalLinksList = document.createElement('ul');
  portalLinksList.className = 'footer-brand__left--list footer-d-flex footer-align-items-center footer-justify-content-center footer-flex-wrap';
  copyrightLeft.append(portalLinksList);

  // Extracting portalLinks
  const portalLinksContainer = block.children[0]?.children[5];
  if (portalLinksContainer) {
    const portalLi = portalLinksContainer.querySelector('li.footer-brand__left--item');
    const portalLink = portalLinksContainer.querySelector('a');
    if (portalLi && portalLink) {
      const newLi = document.createElement('li');
      newLi.className = 'footer-brand__left--item footer-foot_link';
      moveInstrumentation(portalLi, newLi);

      const newLink = document.createElement('a');
      newLink.href = portalLink.href;
      newLink.target = '_blank';
      newLink.textContent = portalLink.textContent.trim();
      newLink.className = 'footer-brand__left--link footer-analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      newLi.append(newLink);
      portalLinksList.append(newLi);
    }
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand__left--copyright footer-text-center';
  copyrightLeft.append(copyrightDiv);

  // Extracting copyrightText
  const copyrightTextCell = block.children[0]?.children[4];
  if (copyrightTextCell) {
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'footer-brand__left--text footer-text-white';
    copyrightSpan.textContent = copyrightTextCell.textContent.trim();
    moveInstrumentation(copyrightTextCell, copyrightSpan);
    copyrightDiv.append(copyrightSpan);
  }

  block.textContent = '';
  block.append(footerContainer);
}
