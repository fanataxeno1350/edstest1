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

  const leftSection = document.createElement('section');
  leftSection.className = 'footer-brand-footer__left d-flex gap-16 px-10 align-items-center justify-content-center';

  const primaryLogoLink = block.querySelector('[data-aue-prop="primaryLogo"]');
  if (primaryLogoLink) {
    const logoWrapper = document.createElement('a');
    logoWrapper.className = 'footer-brand-footer__logo d-inline-block analytics_cta_click';
    logoWrapper.href = primaryLogoLink.href;
    logoWrapper.target = '_blank';
    logoWrapper.setAttribute('data-cta-region', 'Footer');
    logoWrapper.setAttribute('aria-label', primaryLogoLink.querySelector('img')?.alt || 'Logo');

    const img = primaryLogoLink.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
      logoWrapper.append(picture);
      moveInstrumentation(img, picture.querySelector('img'));
    }
    leftSection.append(logoWrapper);
    moveInstrumentation(primaryLogoLink, logoWrapper);
  }

  const secondaryLogoDiv = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogoDiv) {
    const secondaryLogoWrapper = document.createElement('div');
    secondaryLogoWrapper.className = 'footer-brand-footer__secondary--logo d-inline-block';
    const img = secondaryLogoDiv.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      picture.querySelector('img').className = 'object-fit-contain w-100 no-rendition';
      secondaryLogoWrapper.append(picture);
      moveInstrumentation(img, picture.querySelector('img'));
    }
    leftSection.append(secondaryLogoWrapper);
    moveInstrumentation(secondaryLogoDiv, secondaryLogoWrapper);
  }

  const rightSection = document.createElement('section');
  rightSection.className = 'footer-brand-footer__right';
  const nav = document.createElement('nav');
  nav.className = 'footer-brand-footer__navbar d-grid d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');

  const navBarLeft = document.createElement('div');
  navBarLeft.className = 'footer-brand-footer__navbar--left d-flex flex-column flex-md-row ';
  const navBarRight = document.createElement('div');
  navBarRight.className = 'footer-brand-footer__navbar--right d-flex flex-column flex-md-row';

  const navLists = block.querySelectorAll('[data-aue-model="footerNavList"]');
  navLists.forEach((navList, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'footerList-footer';
    const ul = document.createElement('ul');
    ul.className = 'footer-list-footer d-flex align-items-center justify-content-center align-items-md-start flex-column';

    const createListItem = (linkElement) => {
      if (linkElement) {
        const li = document.createElement('li');
        li.className = 'footer-list-footer__item';
        const a = document.createElement('a');
        a.href = linkElement.href;
        a.textContent = linkElement.textContent;
        a.className = 'cta-analytics analytics_cta_click footer-list-footer__item--link d-inline-block';
        a.setAttribute('data-link-region', 'Footer List');
        if (linkElement.target) {
          a.target = linkElement.target;
        }
        li.append(a);
        moveInstrumentation(linkElement, a);
        return li;
      }
      return null;
    };

    const link1 = navList.querySelector('[data-aue-prop="link1"]');
    const link2 = navList.querySelector('[data-aue-prop="link2"]');
    const link3 = navList.querySelector('[data-aue-prop="link3"]');

    const li1 = createListItem(link1);
    const li2 = createListItem(link2);
    const li3 = createListItem(link3);

    if (li1) ul.append(li1);
    if (li2) ul.append(li2);
    if (li3) ul.append(li3);

    footerListDiv.append(ul);
    moveInstrumentation(navList, footerListDiv);

    if (index < 2) {
      navBarLeft.append(footerListDiv);
    } else {
      navBarRight.append(footerListDiv);
    }
  });

  nav.append(navBarLeft, navBarRight);
  rightSection.append(nav);
  primaryContent.append(leftSection, rightSection);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);
  footerBrandFooter.append(primarySection);

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand-footer__secondary';
  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'container';
  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand-footer__secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'footer-brand-footer__right d-flex flex-column pb-5';
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'footer-brand-footer__right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const socialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  socialLinks.forEach((socialLinkItem) => {
    const li = document.createElement('li');
    li.className = 'footer-brand-footer__right--item d-flex justify-content-center align-items-center';

    const socialUrl = socialLinkItem.querySelector('[data-aue-prop="socialUrl"]');
    const icon = socialLinkItem.querySelector('[data-aue-prop="icon"]');

    if (socialUrl && icon) {
      const a = document.createElement('a');
      a.href = socialUrl.href;
      a.className = 'footer-brand-footer__right--link d-flex justify-content-center align-items-center analytics_cta_click';
      a.target = '_blank';
      a.setAttribute('data-cta-region', 'Footer');
      a.setAttribute('data-cta-label', `footer-${icon.querySelector('img')?.alt?.toLowerCase() || 'social'}`);
      a.setAttribute('data-platform-name', icon.querySelector('img')?.alt?.toLowerCase() || '');
      a.setAttribute('data-social-linktype', 'follow');

      const img = icon.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').className = 'object-fit-contain w-100 h-100 no-rendition';
        picture.querySelector('img').setAttribute('aria-label', img.alt);
        a.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
      }
      li.append(a);
      moveInstrumentation(socialLinkItem, li);
    }
    socialMediaList.append(li);
  });
  socialMediaSection.append(socialMediaList);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'footer-brand-footer__left py-5 d-flex flex-column gap-3';

  const itcPortalList = document.createElement('ul');
  itcPortalList.className = 'footer-brand-footer__left--list d-flex align-items-center justify-content-center flex-wrap';

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.className = 'footer-brand-footer__left--item foot_link';
    const a = document.createElement('a');
    a.href = itcPortalLink.href;
    a.textContent = itcPortalLink.textContent;
    a.target = '_blank';
    a.className = 'footer-brand-footer__left--link analytics_cta_click';
    a.setAttribute('data-cta-region', 'Footer');
    li.append(a);
    itcPortalList.append(li);
    moveInstrumentation(itcPortalLink, a);
  }
  copyrightSection.append(itcPortalList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand-footer__left--copyright text-center ';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'footer-brand-footer__left--text text-white';
  const copyrightText = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent.trim();
    moveInstrumentation(copyrightText, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  }
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);

  secondaryContent.append(socialMediaSection, copyrightSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);
  footerBrandFooter.append(secondarySection);

  block.textContent = '';
  block.append(footerBrandFooter);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
