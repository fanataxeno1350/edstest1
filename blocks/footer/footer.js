import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container-hd-footer', 'footer-p-0');

  const footerBrandFooter = document.createElement('div');
  footerBrandFooter.classList.add('footer-brand-footer', 'footer-w-100', 'footer-bg-boing-neutral-gray-600');
  footerBrandFooter.setAttribute('data-isdoodlevariation', 'false');

  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand-footer__primary');

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('footer-container');

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand-footer__primary--content', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row', 'footer-justify-content-md-between', 'footer-align-items-center');

  const brandFooterLeft = document.createElement('section');
  brandFooterLeft.classList.add('footer-brand-footer__left', 'footer-d-flex', 'footer-gap-16', 'footer-px-10', 'footer-align-items-center', 'footer-justify-content-center');

  const logo1Wrapper = document.querySelector('[data-aue-prop="logo1"]');
  if (logo1Wrapper) {
    const logo1Link = logo1Wrapper.querySelector('a');
    const logo1Img = logo1Wrapper.querySelector('img');
    if (logo1Link && logo1Img) {
      const newLogo1Link = document.createElement('a');
      newLogo1Link.href = logo1Link.href;
      if (logo1Link.target) newLogo1Link.target = logo1Link.target;
      if (logo1Link.getAttribute('aria-label')) newLogo1Link.setAttribute('aria-label', logo1Link.getAttribute('aria-label'));
      newLogo1Link.classList.add('footer-brand-footer__logo', 'footer-d-inline-block', 'footer-analytics_cta_click');
      newLogo1Link.setAttribute('data-cta-region', 'Footer');

      const picture = createOptimizedPicture(logo1Img.src, logo1Img.alt);
      picture.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
      newLogo1Link.append(picture);
      brandFooterLeft.append(newLogo1Link);
      moveInstrumentation(logo1Wrapper, newLogo1Link);
    }
  }

  const logo2Wrapper = document.querySelector('[data-aue-prop="logo2"]');
  if (logo2Wrapper) {
    const logo2Img = logo2Wrapper.querySelector('img');
    if (logo2Img) {
      const secondaryLogoDiv = document.createElement('div');
      secondaryLogoDiv.classList.add('footer-brand-footer__secondary--logo', 'footer-d-inline-block');

      const picture = createOptimizedPicture(logo2Img.src, logo2Img.alt);
      picture.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-no-rendition');
      secondaryLogoDiv.append(picture);
      brandFooterLeft.append(secondaryLogoDiv);
      moveInstrumentation(logo2Wrapper, secondaryLogoDiv);
    }
  }

  const brandFooterRight = document.createElement('section');
  brandFooterRight.classList.add('footer-brand-footer__right');

  const nav = document.createElement('nav');
  nav.classList.add('footer-brand-footer__navbar', 'footer-d-grid', 'footer-d-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand-footer__navbar--left', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row');

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand-footer__navbar--right', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row');

  const footerLinkLists = block.querySelectorAll('[data-aue-model="footerLinkList"]');
  footerLinkLists.forEach((listNode, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footer-footerList-footer');

    const ul = document.createElement('ul');
    ul.classList.add('footer-list-footer', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-align-items-md-start', 'footer-flex-column');

    const links = listNode.querySelectorAll('[data-aue-model="footerLink"]');
    links.forEach((linkNode) => {
      const li = document.createElement('li');
      li.classList.add('footer-list-footer__item');

      const link = linkNode.querySelector('a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = link.textContent;
        newLink.classList.add('footer-cta-analytics', 'footer-analytics_cta_click', 'footer-list-footer__item--link', 'footer-d-inline-block');
        newLink.setAttribute('data-link-region', 'Footer List');
        if (link.target) newLink.target = link.target;
        li.append(newLink);
        moveInstrumentation(linkNode, li);
      }
      ul.append(li);
    });
    footerListDiv.append(ul);
    moveInstrumentation(listNode, footerListDiv);

    // Distribute link lists to left and right nav sections
    if (index < 2) {
      navLeft.append(footerListDiv);
    } else {
      navRight.append(footerListDiv);
    }
  });

  nav.append(navLeft, navRight);
  brandFooterRight.append(nav);
  primaryContent.append(brandFooterLeft, brandFooterRight);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand-footer__secondary');

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('footer-container');

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand-footer__secondary--content', 'footer-d-flex', 'footer-flex-column', 'footer-justify-content-md-between', 'footer-align-items-center');

  const secondaryRight = document.createElement('section');
  secondaryRight.classList.add('footer-brand-footer__right', 'footer-d-flex', 'footer-flex-column', 'footer-pb-5');

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('footer-social_media-footer--title');
  socialMediaTitle.textContent = 'Follow Us On';
  secondaryRight.append(socialMediaTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-footer__right--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-px-10', 'footer-flex-wrap');

  const footerSocials = block.querySelectorAll('[data-aue-model="footerSocial"]');
  footerSocials.forEach((socialNode) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand-footer__right--item', 'footer-d-flex', 'footer-justify-content-center', 'footer-align-items-center');

    const socialLink = socialNode.querySelector('[data-aue-prop="socialLink"] a');
    const socialIcon = socialNode.querySelector('[data-aue-prop="icon"] img');

    if (socialLink && socialIcon) {
      const newSocialLink = document.createElement('a');
      newSocialLink.href = socialLink.href;
      if (socialLink.target) newSocialLink.target = socialLink.target;
      newSocialLink.classList.add('footer-brand-footer__right--link', 'footer-d-flex', 'footer-justify-content-center', 'footer-align-items-center', 'footer-analytics_cta_click');
      newSocialLink.setAttribute('data-cta-region', 'Footer');
      newSocialLink.setAttribute('data-cta-label', `footer-${socialIcon.alt.toLowerCase()}`);
      newSocialLink.setAttribute('data-platform-name', socialIcon.alt.toLowerCase());
      newSocialLink.setAttribute('data-social-linktype', 'follow');

      const picture = createOptimizedPicture(socialIcon.src, socialIcon.alt);
      picture.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
      newSocialLink.append(picture);
      li.append(newSocialLink);
      moveInstrumentation(socialNode, li);
    }
    socialList.append(li);
  });
  secondaryRight.append(socialList);

  const secondaryLeft = document.createElement('section');
  secondaryLeft.classList.add('footer-brand-footer__left', 'footer-py-5', 'footer-d-flex', 'footer-flex-column', 'footer-gap-3');

  const bottomLinksList = document.createElement('ul');
  bottomLinksList.classList.add('footer-brand-footer__left--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-flex-wrap');

  const footerBottomLinks = block.querySelectorAll('[data-aue-model="footerBottomLinks"] [data-aue-prop="link"]');
  footerBottomLinks.forEach((linkNode) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand-footer__left--item', 'footer-foot_link-footer');

    const link = linkNode.querySelector('a');
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent;
      if (link.target) newLink.target = link.target;
      newLink.classList.add('footer-brand-footer__left--link', 'footer-analytics_cta_click');
      newLink.setAttribute('data-cta-region', 'Footer');
      li.append(newLink);
      moveInstrumentation(linkNode, li);
    }
    bottomLinksList.append(li);
  });
  secondaryLeft.append(bottomLinksList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand-footer__left--copyright', 'footer-text-center');

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand-footer__left--text', 'footer-text-white');
  const copyrightContent = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightContent) {
    copyrightSpan.innerHTML = copyrightContent.innerHTML;
    moveInstrumentation(copyrightContent, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  }
  copyrightDiv.append(copyrightSpan);
  secondaryLeft.append(copyrightDiv);

  secondaryContent.append(secondaryRight, secondaryLeft);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  footerBrandFooter.append(primarySection, secondarySection);
  footerContainer.append(footerBrandFooter);

  block.textContent = '';
  block.append(footerContainer);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
