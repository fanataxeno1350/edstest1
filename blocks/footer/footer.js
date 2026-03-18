import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer-container');

  const brandPrimary = document.createElement('section');
  brandPrimary.classList.add('footer-brand__primary');

  const brandPrimaryContent = document.createElement('div');
  brandPrimaryContent.classList.add('footer-brand__primary--content', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row', 'footer-justify-content-md-between', 'footer-align-items-center');

  const brandLeft = document.createElement('section');
  brandLeft.classList.add('footer-brand__left', 'footer-d-flex', 'footer-gap-16', 'footer-px-10', 'footer-align-items-center', 'footer-justify-content-center');

  const logoImage = block.querySelector('[data-aue-prop="logoImage"] img');
  if (logoImage) {
    const logoLink = document.createElement('a');
    logoLink.classList.add('footer-brand__logo', 'footer-d-inline-block', 'footer-analytics_cta_click');
    logoLink.setAttribute('aria-label', logoImage.alt);
    logoLink.target = '_blank';
    logoLink.href = logoImage.closest('a')?.href || '#';

    const picture = createOptimizedPicture(logoImage.src, logoImage.alt);
    picture.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
    logoLink.append(picture);
    brandLeft.append(logoLink);
    moveInstrumentation(logoImage.closest('a'), logoLink);
  }

  const secondaryLogoImage = block.querySelector('[data-aue-prop="secondaryLogoImage"] img');
  if (secondaryLogoImage) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'footer-d-inline-block');

    const picture = createOptimizedPicture(secondaryLogoImage.src, secondaryLogoImage.alt);
    picture.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-no-rendition');
    secondaryLogoDiv.append(picture);
    brandLeft.append(secondaryLogoDiv);
    moveInstrumentation(secondaryLogoImage.closest('div'), secondaryLogoDiv);
  }

  const brandRight = document.createElement('section');
  brandRight.classList.add('footer-brand__right');

  const nav = document.createElement('nav');
  nav.classList.add('footer-brand__navbar', 'footer-d-grid', 'footer-d-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand__navbar--left', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row');

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand__navbar--right', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row');

  const linkLists = block.querySelectorAll('[data-aue-model="footerLinkList"]');
  linkLists.forEach((listNode, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footer-footerList');

    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-align-items-md-start', 'footer-flex-column');

    const links = listNode.querySelectorAll('[data-aue-model="footerLink"]');
    links.forEach((linkNode) => {
      const li = document.createElement('li');
      li.classList.add('footer-list__item');

      const a = document.createElement('a');
      a.classList.add('footer-cta-analytics', 'footer-analytics_cta_click', 'footer-list__item--link', 'footer-d-inline-block');
      a.setAttribute('data-link-region', 'Footer List');
      a.href = linkNode.querySelector('[data-aue-prop="link"]')?.href || '#';
      a.textContent = linkNode.querySelector('[data-aue-prop="text"]')?.textContent || '';
      if (linkNode.querySelector('[data-aue-prop="link"]')?.target) {
        a.target = linkNode.querySelector('[data-aue-prop="link"]')?.target;
      }

      li.append(a);
      ul.append(li);
      moveInstrumentation(linkNode, li);
    });

    footerListDiv.append(ul);
    moveInstrumentation(listNode, footerListDiv);

    if (index < 2) {
      navLeft.append(footerListDiv);
    } else {
      navRight.append(footerListDiv);
    }
  });

  nav.append(navLeft, navRight);
  brandRight.append(nav);
  brandPrimaryContent.append(brandLeft, brandRight);
  brandPrimary.append(brandPrimaryContent);

  const brandSecondary = document.createElement('section');
  brandSecondary.classList.add('footer-brand__secondary');

  const brandSecondaryContent = document.createElement('div');
  brandSecondaryContent.classList.add('footer-brand__secondary--content', 'footer-d-flex', 'footer-flex-column', 'footer-justify-content-md-between', 'footer-align-items-center');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('footer-brand__right', 'footer-d-flex', 'footer-flex-column', 'footer-pb-5');

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('footer-social_media--title');
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-px-10', 'footer-flex-wrap');

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((socialLinkNode) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'footer-d-flex', 'footer-justify-content-center', 'footer-align-items-center');

    const a = document.createElement('a');
    a.classList.add('footer-brand__right--link', 'footer-d-flex', 'footer-justify-content-center', 'footer-align-items-center', 'footer-analytics_cta_click');
    a.setAttribute('data-cta-region', 'Footer');
    a.target = '_blank';
    a.href = socialLinkNode.querySelector('[data-aue-prop="link"]')?.href || '#';

    const iconImg = socialLinkNode.querySelector('[data-aue-prop="icon"] img');
    if (iconImg) {
      const picture = createOptimizedPicture(iconImg.src, iconImg.alt);
      picture.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
      picture.querySelector('img').setAttribute('aria-label', iconImg.alt);
      a.append(picture);
      moveInstrumentation(iconImg.closest('a'), a);
    }

    li.append(a);
    socialList.append(li);
    moveInstrumentation(socialLinkNode, li);
  });

  socialMediaSection.append(socialList);

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('footer-brand__left', 'footer-py-5', 'footer-d-flex', 'footer-flex-column', 'footer-gap-3');

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand__left--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-flex-wrap');

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item', 'footer-foot_link');

    const a = document.createElement('a');
    a.classList.add('footer-brand__left--link', 'footer-analytics_cta_click');
    a.setAttribute('data-cta-region', 'Footer');
    a.href = itcPortalLink.href || '#';
    a.textContent = itcPortalLink.textContent || '';
    if (itcPortalLink.target) {
      a.target = itcPortalLink.target;
    }

    li.append(a);
    copyrightList.append(li);
    moveInstrumentation(itcPortalLink, li);
  }

  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand__left--copyright', 'footer-text-center');

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text', 'footer-text-white');
  copyrightSpan.textContent = block.querySelector('[data-aue-prop="copyright"]')?.textContent || '';
  copyrightDiv.append(copyrightSpan);
  moveInstrumentation(block.querySelector('[data-aue-prop="copyright"]'), copyrightDiv);

  copyrightSection.append(copyrightDiv);

  brandSecondaryContent.append(socialMediaSection, copyrightSection);
  brandSecondary.append(brandSecondaryContent);

  footerContainer.append(brandPrimary, brandSecondary);

  block.textContent = '';
  block.append(footerContainer);
  block.className = 'footer block';
  block.dataset.blockStatus = 'loaded';
}
