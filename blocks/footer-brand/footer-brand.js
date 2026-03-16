import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrand = document.createElement('div');
  footerBrand.className = 'footer-brand w-100 bg-boing-neutral-gray-600';

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand__primary';
  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'container';
  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand__primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const leftSection = document.createElement('section');
  leftSection.className = 'footer-brand__left d-flex gap-16 px-10 align-items-center justify-content-center';

  const logo1Wrapper = document.createElement('a');
  logo1Wrapper.className = 'footer-brand__logo d-inline-block analytics_cta_click';
  const logo1 = block.querySelector('[data-aue-prop="logo1"] img');
  if (logo1) {
    logo1Wrapper.href = logo1.closest('a')?.href || '#';
    logo1Wrapper.target = logo1.closest('a')?.target || '_self';
    logo1Wrapper.setAttribute('aria-label', logo1.alt);
    logo1Wrapper.append(createOptimizedPicture(logo1.src, logo1.alt));
    moveInstrumentation(logo1, logo1Wrapper.querySelector('picture'));
    moveInstrumentation(logo1.closest('a'), logo1Wrapper);
  }
  leftSection.append(logo1Wrapper);

  const logo2Wrapper = document.createElement('div');
  logo2Wrapper.className = 'footer-brand__secondary--logo d-inline-block';
  const logo2 = block.querySelector('[data-aue-prop="logo2"] img');
  if (logo2) {
    logo2Wrapper.append(createOptimizedPicture(logo2.src, logo2.alt));
    moveInstrumentation(logo2, logo2Wrapper.querySelector('picture'));
  }
  leftSection.append(logo2Wrapper);

  const rightSection = document.createElement('section');
  rightSection.className = 'footer-brand__right';
  const nav = document.createElement('nav');
  nav.className = 'footer-brand__navbar d-grid d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');

  const navLeft = document.createElement('div');
  navLeft.className = 'footer-brand__navbar--left d-flex flex-column flex-md-row ';

  const footerLinkLists = block.querySelectorAll('[data-aue-model="footerLinkList"]');
  footerLinkLists.forEach((listNode) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'footerList';
    const ul = document.createElement('ul');
    ul.className = 'footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

    const footerLinks = listNode.querySelectorAll('[data-aue-model="footerLink"]');
    footerLinks.forEach((linkNode) => {
      const li = document.createElement('li');
      li.className = 'footer-list__item';
      const link = document.createElement('a');
      link.className = 'cta-analytics analytics_cta_click footer-list__item--link d-inline-block';
      link.setAttribute('data-link-region', 'Footer List');

      const authoredLink = linkNode.querySelector('[data-aue-prop="link"]');
      if (authoredLink) {
        link.href = authoredLink.href;
        if (authoredLink.target) {
          link.target = authoredLink.target;
        }
        link.textContent = authoredLink.textContent;
        moveInstrumentation(authoredLink, link);
      } else {
        const text = linkNode.querySelector('[data-aue-prop="text"]');
        if (text) {
          link.textContent = text.textContent;
          moveInstrumentation(text, link);
        }
      }
      li.append(link);
      ul.append(li);
      moveInstrumentation(linkNode, li);
    });
    footerListDiv.append(ul);
    if (navLeft.children.length < 2) {
      navLeft.append(footerListDiv);
    } else {
      const navRight = nav.querySelector('.footer-brand__navbar--right') || document.createElement('div');
      if (!navRight.className) navRight.className = 'footer-brand__navbar--right d-flex flex-column flex-md-row';
      navRight.append(footerListDiv);
      nav.append(navRight);
    }

    moveInstrumentation(listNode, footerListDiv);
  });

  nav.prepend(navLeft);
  rightSection.append(nav);

  primaryContent.append(leftSection, rightSection);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);
  footerBrand.append(primarySection);

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand__secondary';
  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'container';
  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand__secondary--content d-flex flex-column  justify-content-md-between align-items-center';

  const socialRightSection = document.createElement('section');
  socialRightSection.className = 'footer-brand__right d-flex flex-column pb-5';
  const socialTitle = document.createElement('h3');
  socialTitle.className = 'social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialRightSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'footer-brand__right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  footerSocialLinks.forEach((socialLinkNode) => {
    const li = document.createElement('li');
    li.className = 'footer-brand__right--item d-flex justify-content-center align-items-center';
    const socialLink = document.createElement('a');
    socialLink.className = 'footer-brand__right--link d-flex justify-content-center align-items-center analytics_cta_click';
    socialLink.setAttribute('data-cta-region', 'Footer');
    socialLink.target = '_blank';

    const authoredSocialLink = socialLinkNode.querySelector('[data-aue-prop="link"]');
    if (authoredSocialLink) {
      socialLink.href = authoredSocialLink.href;
      socialLink.setAttribute('data-cta-label', `footer-${authoredSocialLink.textContent.toLowerCase()}`);
      socialLink.setAttribute('data-platform-name', authoredSocialLink.textContent.toLowerCase());
      socialLink.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(authoredSocialLink, socialLink);
    }

    const socialIcon = socialLinkNode.querySelector('[data-aue-prop="icon"] img');
    if (socialIcon) {
      socialLink.setAttribute('aria-label', socialIcon.alt || socialLink.href);
      socialLink.append(createOptimizedPicture(socialIcon.src, socialIcon.alt));
      moveInstrumentation(socialIcon, socialLink.querySelector('picture'));
    }
    li.append(socialLink);
    socialList.append(li);
    moveInstrumentation(socialLinkNode, li);
  });

  socialRightSection.append(socialList);

  const copyrightLeftSection = document.createElement('section');
  copyrightLeftSection.className = 'footer-brand__left py-5 d-flex flex-column gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'footer-brand__left--list d-flex align-items-center justify-content-center flex-wrap';

  const itcPortalLinkNode = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLinkNode) {
    const li = document.createElement('li');
    li.className = 'footer-brand__left--item foot_link';
    const link = document.createElement('a');
    link.className = 'footer-brand__left--link analytics_cta_click';
    link.setAttribute('data-cta-region', 'Footer');
    link.href = itcPortalLinkNode.href;
    link.target = itcPortalLinkNode.target;
    link.textContent = itcPortalLinkNode.textContent;
    li.append(link);
    copyrightList.append(li);
    moveInstrumentation(itcPortalLinkNode, li);
  }
  copyrightLeftSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand__left--copyright text-center ';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'footer-brand__left--text text-white';
  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    copyrightSpan.innerHTML = copyrightText.innerHTML;
    moveInstrumentation(copyrightText, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  copyrightLeftSection.append(copyrightDiv);

  secondaryContent.append(socialRightSection, copyrightLeftSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);
  footerBrand.append(secondarySection);

  block.textContent = '';
  block.append(footerBrand);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
