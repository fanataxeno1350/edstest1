import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandFooter = document.createElement('div');
  footerBrandFooter.className = 'footer-brand-footer w-100 bg-boing-neutral-gray-600';

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand-footer__primary';

  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'container';

  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand-footer__primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const leftSectionPrimary = document.createElement('section');
  leftSectionPrimary.className = 'footer-brand-footer__left d-flex gap-16 px-10 align-items-center justify-content-center';

  const logo1Wrapper = document.querySelector('[data-aue-prop="logo1"]');
  if (logo1Wrapper) {
    const logo1Link = logo1Wrapper.querySelector('a');
    if (logo1Link) {
      const logo1Img = logo1Link.querySelector('img');
      if (logo1Img) {
        const picture = createOptimizedPicture(logo1Img.src, logo1Img.alt);
        logo1Link.innerHTML = '';
        logo1Link.append(picture);
        moveInstrumentation(logo1Img, picture);
      }
      leftSectionPrimary.append(logo1Link);
      moveInstrumentation(logo1Wrapper, logo1Link);
    }
  }

  const logo2Wrapper = document.querySelector('[data-aue-prop="logo2"]');
  if (logo2Wrapper) {
    const logo2Div = logo2Wrapper.querySelector('div');
    if (logo2Div) {
      const logo2Img = logo22Div.querySelector('img');
      if (logo2Img) {
        const picture = createOptimizedPicture(logo2Img.src, logo2Img.alt);
        logo2Div.innerHTML = '';
        logo2Div.append(picture);
        moveInstrumentation(logo2Img, picture);
      }
      leftSectionPrimary.append(logo2Div);
      moveInstrumentation(logo2Wrapper, logo2Div);
    }
  }

  const rightSectionPrimary = document.createElement('section');
  rightSectionPrimary.className = 'footer-brand-footer__right';

  const navPrimary = document.createElement('nav');
  navPrimary.className = 'footer-brand-footer__navbar d-grid d-md-flex';
  navPrimary.setAttribute('aria-label', 'footer navbar');

  const navLeft = document.createElement('div');
  navLeft.className = 'footer-brand-footer__navbar--left d-flex flex-column flex-md-row ';

  const navRight = document.createElement('div');
  navRight.className = 'footer-brand-footer__navbar--right d-flex flex-column flex-md-row';

  const footerNavLists = block.querySelectorAll('[data-aue-model="footerNavList"]');
  footerNavLists.forEach((listNode, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'footerList-footer';
    const ul = document.createElement('ul');
    ul.className = 'footer-list-footer d-flex align-items-center justify-content-center align-items-md-start flex-column';

    ['link1', 'link2', 'link3'].forEach((linkProp) => {
      const linkWrapper = listNode.querySelector(`[data-aue-prop="${linkProp}"]`);
      if (linkWrapper) {
        const link = linkWrapper.querySelector('a');
        if (link) {
          const li = document.createElement('li');
          li.className = 'footer-list-footer__item';
          li.append(link);
          ul.append(li);
          moveInstrumentation(linkWrapper, li);
        }
      }
    });
    footerListDiv.append(ul);
    moveInstrumentation(listNode, footerListDiv);

    if (index < 2) {
      navLeft.append(footerListDiv);
    } else {
      navRight.append(footerListDiv);
    }
  });

  navPrimary.append(navLeft, navRight);
  rightSectionPrimary.append(navPrimary);
  primaryContent.append(leftSectionPrimary, rightSectionPrimary);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand-footer__secondary';

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand-footer__secondary--content d-flex flex-column  justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'footer-brand-footer__right d-flex flex-column pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'footer-brand-footer__right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((socialLinkNode) => {
    const li = document.createElement('li');
    li.className = 'footer-brand-footer__right--item d-flex justify-content-center align-items-center';

    const socialUrlWrapper = socialLinkNode.querySelector('[data-aue-prop="socialUrl"]');
    const iconWrapper = socialLinkNode.querySelector('[data-aue-prop="icon"]');

    if (socialUrlWrapper && iconWrapper) {
      const link = socialUrlWrapper.querySelector('a');
      const img = iconWrapper.querySelector('img');

      if (link && img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        link.innerHTML = '';
        link.append(picture);
        moveInstrumentation(img, picture);

        li.append(link);
        moveInstrumentation(socialLinkNode, li);
      }
    }
    socialList.append(li);
  });
  socialMediaSection.append(socialList);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'footer-brand-footer__left py-5 d-flex flex-column gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'footer-brand-footer__left--list d-flex align-items-center justify-content-center flex-wrap';

  const itcPortalLinkWrapper = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLinkWrapper) {
    const itcLink = itcPortalLinkWrapper.querySelector('a');
    if (itcLink) {
      const li = document.createElement('li');
      li.className = 'footer-brand-footer__left--item foot_link';
      li.append(itcLink);
      copyrightList.append(li);
      moveInstrumentation(itcPortalLinkWrapper, li);
    }
  }
  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand-footer__left--copyright text-center ';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'footer-brand-footer__left--text text-white';

  const copyrightText = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightText) {
    copyrightSpan.innerHTML = copyrightText.innerHTML;
    moveInstrumentation(copyrightText, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.'; // Fallback
  }
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);

  secondaryContent.append(socialMediaSection, copyrightSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  footerBrandFooter.append(primarySection, secondarySection);

  block.textContent = '';
  block.append(footerBrandFooter);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
