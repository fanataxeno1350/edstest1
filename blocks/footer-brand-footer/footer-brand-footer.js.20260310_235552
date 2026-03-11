import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const primaryLogoCell = block.children[0]?.children[0];
  const secondaryLogoCell = block.children[0]?.children[1];
  const navListsCells = [...block.children].slice(1, -2);
  const socialLinksCells = block.children[block.children.length - 2]?.children;
  const itcPortalLinkCell = block.children[block.children.length - 1]?.children[0];
  const copyrightTextCell = block.children[block.children.length - 1]?.children[1];

  const footerContainer = document.createElement('section');
  footerContainer.className = 'footer-container-hd-footer footer-p-0';

  const brandFooterDiv = document.createElement('div');
  brandFooterDiv.className = 'footer-brand-footer footer-w-100 footer-bg-boing-neutral-gray-600';
  brandFooterDiv.setAttribute('data-isdoodlevariation', 'false');
  moveInstrumentation(block, brandFooterDiv);

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand-footer__primary';
  primarySection.style.backgroundColor = '';

  const primaryContainerDiv = document.createElement('div');
  primaryContainerDiv.className = 'footer-container';

  const primaryContentDiv = document.createElement('div');
  primaryContentDiv.className = 'footer-brand-footer__primary--content footer-d-flex footer-flex-column footer-flex-md-row footer-justify-content-md-between footer-align-items-center';

  const leftSection = document.createElement('section');
  leftSection.className = 'footer-brand-footer__left footer-d-flex footer-gap-16 footer-px-10 footer-align-items-center footer-justify-content-center';

  if (primaryLogoCell) {
    const primaryLogoLink = primaryLogoCell.querySelector('a');
    if (primaryLogoLink) {
      const newPrimaryLogoLink = document.createElement('a');
      newPrimaryLogoLink.href = primaryLogoLink.href;
      newPrimaryLogoLink.target = '_blank';
      newPrimaryLogoLink.className = 'footer-brand-footer__logo footer-d-inline-block footer-analytics_cta_click';
      newPrimaryLogoLink.setAttribute('data-cta-region', 'Footer');
      newPrimaryLogoLink.setAttribute('aria-label', 'ITC Logo');
      moveInstrumentation(primaryLogoLink, newPrimaryLogoLink);

      const primaryLogoImg = primaryLogoLink.querySelector('img');
      if (primaryLogoImg) {
        const optimizedPic = createOptimizedPicture(primaryLogoImg.src, primaryLogoImg.alt);
        optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
        optimizedPic.querySelector('img').loading = 'lazy';
        moveInstrumentation(primaryLogoImg, optimizedPic.querySelector('img'));
        newPrimaryLogoLink.append(optimizedPic);
      }
      leftSection.append(newPrimaryLogoLink);
    }
  }

  if (secondaryLogoCell) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.className = 'footer-brand-footer__secondary--logo footer-d-inline-block';
    moveInstrumentation(secondaryLogoCell, secondaryLogoDiv);

    const secondaryLogoImg = secondaryLogoCell.querySelector('img');
    if (secondaryLogoImg) {
      const optimizedPic = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
      optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-no-rendition';
      optimizedPic.querySelector('img').loading = 'lazy';
      moveInstrumentation(secondaryLogoImg, optimizedPic.querySelector('img'));
      secondaryLogoDiv.append(optimizedPic);
    }
    leftSection.append(secondaryLogoDiv);
  }

  const rightSection = document.createElement('section');
  rightSection.className = 'footer-brand-footer__right';

  const nav = document.createElement('nav');
  nav.className = 'footer-brand-footer__navbar footer-d-grid footer-d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');

  const navLeftDiv = document.createElement('div');
  navLeftDiv.className = 'footer-brand-footer__navbar--left footer-d-flex footer-flex-column footer-flex-md-row';

  const navRightDiv = document.createElement('div');
  navRightDiv.className = 'footer-brand-footer__navbar--right footer-d-flex footer-flex-column footer-flex-md-row';

  navListsCells.forEach((navListCell, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'footer-footerList-footer';
    moveInstrumentation(navListCell, footerListDiv);

    const ul = document.createElement('ul');
    ul.className = 'footer-list-footer footer-d-flex footer-align-items-center footer-justify-content-center footer-align-items-md-start footer-flex-column';

    [...navListCell.children].forEach((row) => {
      const li = document.createElement('li');
      li.className = 'footer-list-footer__item';
      moveInstrumentation(row, li);

      const link = row.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        newLink.className = 'footer-cta-analytics footer-analytics_cta_click footer-list-footer__item--link footer-d-inline-block';
        newLink.setAttribute('data-link-region', 'Footer List');
        if (link.target) {
          newLink.target = link.target;
        }
        li.append(newLink);
      }
      ul.append(li);
    });
    footerListDiv.append(ul);
    if (index < 2) {
      navLeftDiv.append(footerListDiv);
    } else {
      navRightDiv.append(footerListDiv);
    }
  });

  nav.append(navLeftDiv, navRightDiv);
  rightSection.append(nav);
  primaryContentDiv.append(leftSection, rightSection);
  primaryContainerDiv.append(primaryContentDiv);
  primarySection.append(primaryContainerDiv);

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand-footer__secondary';
  secondarySection.style.backgroundColor = '';

  const secondaryContainerDiv = document.createElement('div');
  secondaryContainerDiv.className = 'footer-container';

  const secondaryContentDiv = document.createElement('div');
  secondaryContentDiv.className = 'footer-brand-footer__secondary--content footer-d-flex footer-flex-column footer-justify-content-md-between footer-align-items-center';

  const socialMediaRightSection = document.createElement('section');
  socialMediaRightSection.className = 'footer-brand-footer__right footer-d-flex footer-flex-column footer-pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'footer-social_media-footer--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaRightSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'footer-brand-footer__right--list footer-d-flex footer-align-items-center footer-justify-content-center footer-px-10 footer-flex-wrap';

  if (socialLinksCells) {
    [...socialLinksCells].forEach((socialLinkCell) => {
      const li = document.createElement('li');
      li.className = 'footer-brand-footer__right--item footer-d-flex footer-justify-content-center footer-align-items-center';
      moveInstrumentation(socialLinkCell, li);

      const socialLink = socialLinkCell.querySelector('a');
      if (socialLink) {
        const newSocialLink = document.createElement('a');
        newSocialLink.href = socialLink.href;
        newSocialLink.className = 'footer-brand-footer__right--link footer-d-flex footer-justify-content-center footer-align-items-center footer-analytics_cta_click';
        newSocialLink.setAttribute('data-cta-region', 'Footer');
        newSocialLink.setAttribute('data-cta-label', `footer-${socialLink.textContent.toLowerCase()}`);
        newSocialLink.target = '_blank';
        newSocialLink.setAttribute('data-platform-name', socialLink.textContent.toLowerCase());
        newSocialLink.setAttribute('data-social-linktype', 'follow');
        moveInstrumentation(socialLink, newSocialLink);

        const socialIconImg = socialLink.querySelector('img');
        if (socialIconImg) {
          const optimizedPic = createOptimizedPicture(socialIconImg.src, socialIconImg.alt);
          optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
          optimizedPic.querySelector('img').loading = 'lazy';
          optimizedPic.querySelector('img').setAttribute('aria-label', socialLink.textContent.toLowerCase());
          moveInstrumentation(socialIconImg, optimizedPic.querySelector('img'));
          newSocialLink.append(optimizedPic);
        }
        li.append(newSocialLink);
      }
      socialMediaList.append(li);
    });
  }
  socialMediaRightSection.append(socialMediaList);

  const copyrightLeftSection = document.createElement('section');
  copyrightLeftSection.className = 'footer-brand-footer__left footer-py-5 footer-d-flex footer-flex-column footer-gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'footer-brand-footer__left--list footer-d-flex footer-align-items-center footer-justify-content-center footer-flex-wrap';

  if (itcPortalLinkCell) {
    const li = document.createElement('li');
    li.className = 'footer-brand-footer__left--item footer-foot_link-footer';
    moveInstrumentation(itcPortalLinkCell, li);

    const link = itcPortalLinkCell.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      newLink.target = '_blank';
      newLink.className = 'footer-brand-footer__left--link footer-analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      li.append(newLink);
    }
    copyrightList.append(li);
  }
  copyrightLeftSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand-footer__left--copyright footer-text-center';
  if (copyrightTextCell) {
    const span = document.createElement('span');
    span.className = 'footer-brand-footer__left--text footer-text-white';
    span.innerHTML = copyrightTextCell.innerHTML;
    moveInstrumentation(copyrightTextCell, span);
    copyrightDiv.append(span);
  }
  copyrightLeftSection.append(copyrightDiv);

  secondaryContentDiv.append(socialMediaRightSection, copyrightLeftSection);
  secondaryContainerDiv.append(secondaryContentDiv);
  secondarySection.append(secondaryContainerDiv);

  brandFooterDiv.append(primarySection, secondarySection);
  footerContainer.append(brandFooterDiv);

  block.textContent = '';
  block.append(footerContainer);
}
