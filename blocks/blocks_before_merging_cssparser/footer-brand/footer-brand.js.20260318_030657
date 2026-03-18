import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.classList.add('footer-brand', 'footer-brand-w-100', 'footer-brand-bg-boing-neutral-gray-600');

  // Primary Section
  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand__primary');
  footerBrandDiv.append(primarySection);
  moveInstrumentation(block.querySelector('.footer-brand__primary'), primarySection);

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container');
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand__primary--content', 'footer-brand-d-flex', 'footer-brand-flex-column', 'footer-brand-flex-md-row', 'footer-brand-justify-content-md-between', 'footer-brand-align-items-center');
  primaryContainer.append(primaryContent);

  // Primary Left Section (Logos)
  const primaryLeft = document.createElement('section');
  primaryLeft.classList.add('footer-brand__left', 'footer-brand-d-flex', 'footer-brand-gap-16', 'footer-brand-px-10', 'footer-brand-align-items-center', 'footer-brand-justify-content-center');
  primaryContent.append(primaryLeft);

  // Logo 1
  const logo1Link = block.querySelector('[data-aue-prop="logo1Link"]');
  if (logo1Link) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.classList.add('footer-brand__logo', 'footer-brand-d-inline-block', 'analytics_cta_click');
    logo1Anchor.setAttribute('data-cta-region', 'Footer');
    logo1Anchor.setAttribute('aria-label', 'ITC Logo');
    logo1Anchor.href = logo1Link.href;
    if (logo1Link.target) logo1Anchor.target = logo1Link.target;

    const logo1Img = block.querySelector('[data-aue-prop="logo1"]');
    if (logo1Img) {
      const picture = createOptimizedPicture(logo1Img.src, logo1Img.alt);
      picture.querySelector('img').classList.add('footer-brand-object-fit-contain', 'footer-brand-w-100', 'footer-brand-h-100', 'footer-brand-no-rendition');
      logo1Anchor.append(picture);
      moveInstrumentation(logo1Img, picture);
    }
    primaryLeft.append(logo1Anchor);
    moveInstrumentation(logo1Link, logo1Anchor);
  }

  // Logo 2
  const logo2Div = document.createElement('div');
  logo2Div.classList.add('footer-brand__secondary--logo', 'footer-brand-d-inline-block');
  const logo2Img = block.querySelector('[data-aue-prop="logo2"]');
  if (logo2Img) {
    const picture = createOptimizedPicture(logo2Img.src, logo2Img.alt);
    picture.querySelector('img').classList.add('footer-brand-object-fit-contain', 'footer-brand-w-100', 'footer-brand-no-rendition');
    logo2Div.append(picture);
    moveInstrumentation(logo2Img, picture);
  }
  primaryLeft.append(logo2Div);

  // Primary Right Section (Navigation)
  const primaryRight = document.createElement('section');
  primaryRight.classList.add('footer-brand__right');
  primaryContent.append(primaryRight);

  const nav = document.createElement('nav');
  nav.classList.add('footer-brand__navbar', 'footer-brand-d-grid', 'footer-brand-d-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');
  primaryRight.append(nav);

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand__navbar--left', 'footer-brand-d-flex', 'footer-brand-flex-column', 'footer-brand-flex-md-row');
  nav.append(navLeft);

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand__navbar--right', 'footer-brand-d-flex', 'footer-brand-flex-column', 'footer-brand-flex-md-row');
  nav.append(navRight);

  // Footer Link Groups
  const footerLinkGroups = block.querySelectorAll('[data-aue-model="footerLinkGroup"]');
  footerLinkGroups.forEach((groupNode, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');

    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'footer-list-d-flex', 'footer-list-align-items-center', 'footer-list-justify-content-center', 'footer-list-align-items-md-start', 'footer-list-flex-column');
    footerListDiv.append(ul);

    const footerLinks = groupNode.querySelectorAll('[data-aue-model="footerLink"]');
    footerLinks.forEach((linkNode) => {
      const li = document.createElement('li');
      li.classList.add('footer-list__item');

      const link = linkNode.querySelector('[data-aue-prop="link"]');
      const linkText = linkNode.querySelector('[data-aue-prop="text"]');

      if (link && linkText) {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = linkText.textContent;
        a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list__item--link', 'footer-list-d-inline-block');
        a.setAttribute('data-link-region', 'Footer List');
        if (link.target) a.target = link.target;
        li.append(a);
        moveInstrumentation(link, a);
        moveInstrumentation(linkText, a);
      }
      ul.append(li);
      moveInstrumentation(linkNode, li);
    });

    if (index < 2) {
      navLeft.append(footerListDiv);
    } else {
      navRight.append(footerListDiv);
    }
    moveInstrumentation(groupNode, footerListDiv);
  });

  // Secondary Section
  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand__secondary');
  footerBrandDiv.append(secondarySection);
  moveInstrumentation(block.querySelector('.footer-brand__secondary'), secondarySection);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand__secondary--content', 'footer-brand-d-flex', 'footer-brand-flex-column', 'footer-brand-justify-content-md-between', 'footer-brand-align-items-center');
  secondaryContainer.append(secondaryContent);

  // Secondary Right Section (Social Media)
  const secondaryRight = document.createElement('section');
  secondaryRight.classList.add('footer-brand__right', 'footer-brand-d-flex', 'footer-brand-flex-column', 'footer-brand-pb-5');
  secondaryContent.append(secondaryRight);

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('footer-brand-social_media--title');
  socialTitle.textContent = 'Follow Us On';
  secondaryRight.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand__right--list', 'footer-brand-d-flex', 'footer-brand-align-items-center', 'footer-brand-justify-content-center', 'footer-brand-px-10', 'footer-brand-flex-wrap');
  secondaryRight.append(socialList);

  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  footerSocialLinks.forEach((socialLinkNode) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand__right--item', 'footer-brand-d-flex', 'footer-brand-justify-content-center', 'footer-brand-align-items-center');

    const socialLink = socialLinkNode.querySelector('[data-aue-prop="socialLink"]');
    const socialIcon = socialLinkNode.querySelector('[data-aue-prop="socialIcon"]');

    if (socialLink && socialIcon) {
      const a = document.createElement('a');
      a.classList.add('footer-brand__right--link', 'footer-brand-d-flex', 'footer-brand-justify-content-center', 'footer-brand-align-items-center', 'analytics_cta_click');
      a.setAttribute('data-cta-region', 'Footer');
      a.href = socialLink.href;
      if (socialLink.target) a.target = socialLink.target;

      const platformName = socialLink.href.includes('facebook') ? 'facebook' : socialLink.href.includes('instagram') ? 'instagram' : socialLink.href.includes('youtube') ? 'youtube' : '';
      if (platformName) {
        a.setAttribute('data-cta-label', `footer-${platformName}`);
        a.setAttribute('data-platform-name', platformName);
        a.setAttribute('data-social-linktype', 'follow');
      }

      const picture = createOptimizedPicture(socialIcon.src, socialIcon.alt || platformName);
      picture.querySelector('img').classList.add('footer-brand-object-fit-contain', 'footer-brand-w-100', 'footer-brand-h-100', 'footer-brand-no-rendition');
      picture.querySelector('img').setAttribute('aria-label', platformName);
      a.append(picture);
      li.append(a);
      moveInstrumentation(socialIcon, picture);
      moveInstrumentation(socialLink, a);
    }
    socialList.append(li);
    moveInstrumentation(socialLinkNode, li);
  });

  // Secondary Left Section (ITC Portal & Copyright)
  const secondaryLeft = document.createElement('section');
  secondaryLeft.classList.add('footer-brand__left', 'footer-brand-py-5', 'footer-brand-d-flex', 'footer-brand-flex-column', 'footer-brand-gap-3');
  secondaryContent.append(secondaryLeft);

  const itcList = document.createElement('ul');
  itcList.classList.add('footer-brand__left--list', 'footer-brand-d-flex', 'footer-brand-align-items-center', 'footer-brand-justify-content-center', 'footer-brand-flex-wrap');
  secondaryLeft.append(itcList);

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.classList.add('footer-brand__left--item', 'footer-brand-foot_link');

    const a = document.createElement('a');
    a.href = itcPortalLink.href;
    a.textContent = itcPortalLink.textContent;
    a.classList.add('footer-brand__left--link', 'analytics_cta_click');
    a.setAttribute('data-cta-region', 'Footer');
    if (itcPortalLink.target) a.target = itcPortalLink.target;
    li.append(a);
    itcList.append(li);
    moveInstrumentation(itcPortalLink, a);
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand__left--copyright', 'footer-brand-text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text', 'footer-brand-text-white');
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    copyrightSpan.innerHTML = copyrightText.innerHTML;
    moveInstrumentation(copyrightText, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  secondaryLeft.append(copyrightDiv);

  block.textContent = '';
  block.append(footerBrandDiv);
  block.className = 'footer-brand block';
  block.dataset.blockStatus = 'loaded';
}
