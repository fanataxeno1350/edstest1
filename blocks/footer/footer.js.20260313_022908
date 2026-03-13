import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand-footer__primary');

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('footer-container');
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand-footer__primary--content', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row', 'footer-justify-content-md-between', 'footer-align-items-center');
  primaryContainer.append(primaryContent);

  const leftSection = document.createElement('section');
  leftSection.classList.add('footer-brand-footer__left', 'footer-d-flex', 'footer-gap-16', 'footer-px-10', 'footer-align-items-center', 'footer-justify-content-center');
  primaryContent.append(leftSection);

  // Logo 1
  const logo1Link = block.querySelector('[data-aue-prop="logo1Link"]');
  const logo1Img = block.querySelector('[data-aue-prop="logo1"]');
  if (logo1Link && logo1Img) {
    const logo1Anchor = document.createElement('a');
    logo1Anchor.classList.add('footer-brand-footer__logo', 'footer-d-inline-block', 'footer-analytics_cta_click');
    logo1Anchor.href = logo1Link.href;
    logo1Anchor.target = '_blank';
    logo1Anchor.setAttribute('aria-label', logo1Img.alt);

    const picture1 = createOptimizedPicture(logo1Img.src, logo1Img.alt);
    logo1Anchor.append(picture1);
    leftSection.append(logo1Anchor);
    moveInstrumentation(logo1Link, logo1Anchor);
    moveInstrumentation(logo1Img, picture1);
  }

  // Logo 2
  const logo2Img = block.querySelector('[data-aue-prop="logo2"]');
  if (logo2Img) {
    const logo2Div = document.createElement('div');
    logo2Div.classList.add('footer-brand-footer__secondary--logo', 'footer-d-inline-block');

    const picture2 = createOptimizedPicture(logo2Img.src, logo2Img.alt);
    logo2Div.append(picture2);
    leftSection.append(logo2Div);
    moveInstrumentation(logo2Img, picture2);
  }

  const rightSection = document.createElement('section');
  rightSection.classList.add('footer-brand-footer__right');
  primaryContent.append(rightSection);

  const nav = document.createElement('nav');
  nav.classList.add('footer-brand-footer__navbar', 'footer-d-grid', 'footer-d-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');
  rightSection.append(nav);

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand-footer__navbar--left', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row');
  nav.append(navLeft);

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand-footer__navbar--right', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row');
  nav.append(navRight);

  // Nav Lists (Multifield)
  const navLists = block.querySelectorAll('[data-aue-model="footerNavList"]');
  navLists.forEach((navList, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footer-footerList-footer');

    const ul = document.createElement('ul');
    ul.classList.add('footer-list-footer', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-align-items-md-start', 'footer-flex-column');
    footerListDiv.append(ul);

    const links = ['link1', 'link2', 'link3'];
    links.forEach((linkProp) => {
      const linkElement = navList.querySelector(`[data-aue-prop="${linkProp}"]`);
      if (linkElement && linkElement.href && linkElement.textContent) {
        const li = document.createElement('li');
        li.classList.add('footer-list-footer__item');

        const a = document.createElement('a');
        a.href = linkElement.href;
        a.textContent = linkElement.textContent;
        a.classList.add('footer-cta-analytics', 'footer-analytics_cta_click', 'footer-list-footer__item--link', 'footer-d-inline-block');
        a.setAttribute('data-link-region', 'Footer List');
        if (linkElement.target) a.target = linkElement.target;

        li.append(a);
        ul.append(li);
        moveInstrumentation(linkElement, a);
      }
    });

    if (index < 2) {
      navLeft.append(footerListDiv);
    } else {
      navRight.append(footerListDiv);
    }
    moveInstrumentation(navList, footerListDiv);
  });

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand-footer__secondary');

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('footer-container');
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand-footer__secondary--content', 'footer-d-flex', 'footer-flex-column', 'footer-justify-content-md-between', 'footer-align-items-center');
  secondaryContainer.append(secondaryContent);

  const socialMediaRightSection = document.createElement('section');
  socialMediaRightSection.classList.add('footer-brand-footer__right', 'footer-d-flex', 'footer-flex-column', 'footer-pb-5');
  secondaryContent.append(socialMediaRightSection);

  const socialTitle = document.createElement('h3');
  socialTitle.classList.add('footer-social_media-footer--title');
  socialTitle.textContent = 'Follow Us On';
  socialMediaRightSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('footer-brand-footer__right--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-px-10', 'footer-flex-wrap');
  socialMediaRightSection.append(socialList);

  // Social Links (Multifield)
  const socialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  socialLinks.forEach((socialLinkItem) => {
    const socialLinkElement = socialLinkItem.querySelector('[data-aue-prop="socialLink"]');
    const socialIconElement = socialLinkItem.querySelector('[data-aue-prop="icon"]');

    if (socialLinkElement && socialIconElement) {
      const li = document.createElement('li');
      li.classList.add('footer-brand-footer__right--item', 'footer-d-flex', 'footer-justify-content-center', 'footer-align-items-center');

      const a = document.createElement('a');
      a.classList.add('footer-brand-footer__right--link', 'footer-d-flex', 'footer-justify-content-center', 'footer-align-items-center', 'footer-analytics_cta_click');
      a.href = socialLinkElement.href;
      a.target = '_blank';
      a.setAttribute('data-cta-region', 'Footer');
      a.setAttribute('data-cta-label', `footer-${socialIconElement.alt.toLowerCase()}`);
      a.setAttribute('data-platform-name', socialIconElement.alt.toLowerCase());
      a.setAttribute('data-social-linktype', 'follow');

      const picture = createOptimizedPicture(socialIconElement.src, socialIconElement.alt);
      a.append(picture);
      li.append(a);
      socialList.append(li);

      moveInstrumentation(socialLinkElement, a);
      moveInstrumentation(socialIconElement, picture);
      moveInstrumentation(socialLinkItem, li);
    }
  });

  const copyrightLeftSection = document.createElement('section');
  copyrightLeftSection.classList.add('footer-brand-footer__left', 'footer-py-5', 'footer-d-flex', 'footer-flex-column', 'footer-gap-3');
  secondaryContent.append(copyrightLeftSection);

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand-footer__left--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-flex-wrap');
  copyrightLeftSection.append(copyrightList);

  // ITC Portal Link
  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink && itcPortalLink.href && itcPortalLink.textContent) {
    const li = document.createElement('li');
    li.classList.add('footer-brand-footer__left--item', 'footer-foot_link-footer');

    const a = document.createElement('a');
    a.href = itcPortalLink.href;
    a.textContent = itcPortalLink.textContent;
    a.classList.add('footer-brand-footer__left--link', 'footer-analytics_cta_click');
    a.setAttribute('data-cta-region', 'Footer');
    if (itcPortalLink.target) a.target = itcPortalLink.target;

    li.append(a);
    copyrightList.append(li);
    moveInstrumentation(itcPortalLink, a);
  }

  // Copyright
  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand-footer__left--copyright', 'footer-text-center');
  copyrightLeftSection.append(copyrightDiv);

  const copyrightTextSpan = document.createElement('span');
  copyrightTextSpan.classList.add('footer-brand-footer__left--text', 'footer-text-white');
  const copyrightContent = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightContent) {
    copyrightTextSpan.innerHTML = copyrightContent.innerHTML;
    moveInstrumentation(copyrightContent, copyrightTextSpan);
  } else {
    // Fallback if data-aue-prop is not found
    const firstP = block.querySelector('p');
    if (firstP) {
      copyrightTextSpan.innerHTML = firstP.innerHTML;
      moveInstrumentation(firstP, copyrightTextSpan);
    }
  }
  copyrightDiv.append(copyrightTextSpan);

  const rootDiv = document.createElement('div');
  rootDiv.classList.add('footer-brand-footer', 'footer-w-100', 'footer-bg-boing-neutral-gray-600');
  rootDiv.setAttribute('data-isdoodlevariation', 'false');

  rootDiv.append(primarySection, secondarySection);

  block.textContent = '';
  block.append(rootDiv);
  block.className = 'footer-container-hd-footer footer-p-0 block';
  block.dataset.blockStatus = 'loaded';
}
