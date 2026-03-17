import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrand = document.createElement('div');
  footerBrand.className = 'footer-brand w-100 bg-boing-neutral-gray-600';

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand__primary';
  primarySection.style.backgroundColor = '';

  const containerPrimary = document.createElement('div');
  containerPrimary.className = 'container';

  const contentPrimary = document.createElement('div');
  contentPrimary.className = 'footer-brand__primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const leftSectionPrimary = document.createElement('section');
  leftSectionPrimary.className = 'footer-brand__left d-flex gap-16 px-10 align-items-center justify-content-center';

  // Logo 1
  const logo1Wrapper = document.querySelector('[data-aue-prop="logo1"]');
  if (logo1Wrapper) {
    const logo1Link = logo1Wrapper.querySelector('a');
    if (logo1Link) {
      const logo1Img = logo1Link.querySelector('img');
      if (logo1Img) {
        const picture = createOptimizedPicture(logo1Img.src, logo1Img.alt);
        logo1Link.textContent = '';
        logo1Link.append(picture);
        moveInstrumentation(logo1Img, picture);
      }
      leftSectionPrimary.append(logo1Link);
      moveInstrumentation(logo1Wrapper, logo1Link);
    }
  }

  // Logo 2
  const logo2Wrapper = document.querySelector('[data-aue-prop="logo2"]');
  if (logo2Wrapper) {
    const logo2Div = document.createElement('div');
    logo2Div.className = 'footer-brand__secondary--logo d-inline-block';
    const logo2Img = logo2Wrapper.querySelector('img');
    if (logo2Img) {
      const picture = createOptimizedPicture(logo2Img.src, logo2Img.alt);
      logo2Div.append(picture);
      moveInstrumentation(logo2Img, picture);
    }
    leftSectionPrimary.append(logo2Div);
    moveInstrumentation(logo2Wrapper, logo2Div);
  }

  const rightSectionPrimary = document.createElement('section');
  rightSectionPrimary.className = 'footer-brand__right';

  const navbar = document.createElement('nav');
  navbar.className = 'footer-brand__navbar d-grid d-md-flex';
  navbar.setAttribute('aria-label', 'footer navbar');

  const navbarLeft = document.createElement('div');
  navbarLeft.className = 'footer-brand__navbar--left d-flex flex-column flex-md-row ';

  const navbarRight = document.createElement('div');
  navbarRight.className = 'footer-brand__navbar--right d-flex flex-column flex-md-row';

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  let currentColumn = 0;
  footerLinks.forEach((linkNode, index) => {
    const linkWrapper = document.createElement('div');
    linkWrapper.className = 'footerList';
    const ul = document.createElement('ul');
    ul.className = 'footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

    const li = document.createElement('li');
    li.className = 'footer-list__item';

    const linkElement = linkNode.querySelector('[data-aue-prop="link"]');
    const labelElement = linkNode.querySelector('[data-aue-prop="label"]');

    if (linkElement) {
      const a = document.createElement('a');
      a.href = linkElement.href || '#';
      a.className = 'cta-analytics analytics_cta_click footer-list__item--link d-inline-block';
      a.setAttribute('data-link-region', 'Footer List');
      if (linkElement.target) {
        a.target = linkElement.target;
      }
      a.textContent = labelElement ? labelElement.textContent : linkElement.textContent;
      li.append(a);
      moveInstrumentation(linkElement, a);
      if (labelElement) {
        moveInstrumentation(labelElement, a);
      }
    }
    ul.append(li);
    linkWrapper.append(ul);
    moveInstrumentation(linkNode, linkWrapper);

    // Distribute links into two columns for navbarLeft and navbarRight
    if (index < 2) {
      navbarLeft.append(linkWrapper);
    } else if (index < 4) {
      navbarRight.append(linkWrapper);
    }
  });

  navbar.append(navbarLeft, navbarRight);
  rightSectionPrimary.append(navbar);

  contentPrimary.append(leftSectionPrimary, rightSectionPrimary);
  containerPrimary.append(contentPrimary);
  primarySection.append(containerPrimary);

  // Secondary Section
  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand__secondary';
  secondarySection.style.backgroundColor = '';

  const containerSecondary = document.createElement('div');
  containerSecondary.className = 'container';

  const contentSecondary = document.createElement('div');
  contentSecondary.className = 'footer-brand__secondary--content d-flex flex-column  justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'footer-brand__right d-flex flex-column pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'footer-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'footer-brand__right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const footerSocials = block.querySelectorAll('[data-aue-model="footerSocial"]');
  footerSocials.forEach((socialNode) => {
    const socialItem = document.createElement('li');
    socialItem.className = 'footer-brand__right--item d-flex justify-content-center align-items-center';

    const socialLinkElement = socialNode.querySelector('[data-aue-prop="link"]');
    const socialIconElement = socialNode.querySelector('[data-aue-prop="icon"]');

    if (socialLinkElement) {
      const a = document.createElement('a');
      a.href = socialLinkElement.href || '#';
      a.className = 'footer-brand__right--link d-flex justify-content-center align-items-center analytics_cta_click';
      a.setAttribute('data-cta-region', 'Footer');
      a.target = '_blank';

      if (socialIconElement) {
        const img = socialIconElement.querySelector('img');
        if (img) {
          const picture = createOptimizedPicture(img.src, img.alt);
          a.append(picture);
          moveInstrumentation(img, picture);
        }
      }
      socialItem.append(a);
      moveInstrumentation(socialLinkElement, a);
      if (socialIconElement) {
        moveInstrumentation(socialIconElement, a);
      }
    }
    socialList.append(socialItem);
    moveInstrumentation(socialNode, socialItem);
  });
  socialMediaSection.append(socialList);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'footer-brand__left py-5 d-flex flex-column gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'footer-brand__left--list d-flex align-items-center justify-content-center flex-wrap';

  const itcPortalLinkWrapper = document.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLinkWrapper) {
    const itcItem = document.createElement('li');
    itcItem.className = 'footer-brand__left--item footer-foot_link';
    const itcLink = itcPortalLinkWrapper.querySelector('a');
    if (itcLink) {
      itcLink.className = 'footer-brand__left--link analytics_cta_click';
      itcLink.setAttribute('data-cta-region', 'Footer');
      itcItem.append(itcLink);
      moveInstrumentation(itcPortalLinkWrapper, itcLink);
    }
    copyrightList.append(itcItem);
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand__left--copyright text-center ';

  const copyrightTextSpan = document.createElement('span');
  copyrightTextSpan.className = 'footer-brand__left--text text-white';
  const copyrightTextElement = document.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightTextElement) {
    copyrightTextSpan.innerHTML = copyrightTextElement.innerHTML;
    moveInstrumentation(copyrightTextElement, copyrightTextSpan);
  }

  copyrightDiv.append(copyrightTextSpan);
  copyrightSection.append(copyrightList, copyrightDiv);

  contentSecondary.append(socialMediaSection, copyrightSection);
  containerSecondary.append(contentSecondary);
  secondarySection.append(containerSecondary);

  footerBrand.append(primarySection, secondarySection);

  block.textContent = '';
  block.append(footerBrand);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
