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

  const logo1Wrapper = document.querySelector('[data-aue-prop="logo1"]');
  if (logo1Wrapper) {
    const logo1Link = logo1Wrapper.querySelector('a');
    if (logo1Link) {
      const logo1Img = logo1Link.querySelector('img');
      if (logo1Img) {
        const picture = createOptimizedPicture(logo1Img.src, logo1Img.alt);
        logo1Link.innerHTML = '';
        logo1Link.append(picture);
      }
      leftSection.append(logo1Link);
      moveInstrumentation(logo1Wrapper, logo1Link);
    }
  }

  const logo2Wrapper = document.querySelector('[data-aue-prop="logo2"]');
  if (logo2Wrapper) {
    const logo2Div = document.createElement('div');
    logo2Div.className = 'footer-brand-footer__secondary--logo d-inline-block';
    const logo2Img = logo22Wrapper.querySelector('img');
    if (logo2Img) {
      const picture = createOptimizedPicture(logo2Img.src, logo2Img.alt);
      logo2Div.append(picture);
    }
    leftSection.append(logo2Div);
    moveInstrumentation(logo2Wrapper, logo2Div);
  }

  const rightSection = document.createElement('section');
  rightSection.className = 'footer-brand-footer__right';

  const nav = document.createElement('nav');
  nav.className = 'footer-brand-footer__navbar d-grid d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');

  const navbarLeft = document.createElement('div');
  navbarLeft.className = 'footer-brand-footer__navbar--left d-flex flex-column flex-md-row ';

  const navbarRight = document.createElement('div');
  navbarRight.className = 'footer-brand-footer__navbar--right d-flex flex-column flex-md-row';

  const footerLinkLists = block.querySelectorAll('[data-aue-model="footerLinkList"]');
  footerLinkLists.forEach((listNode, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'footerList-footer';
    const ul = document.createElement('ul');
    ul.className = 'footer-list-footer d-flex align-items-center justify-content-center align-items-md-start flex-column';

    const links = listNode.querySelectorAll('[data-aue-model="footerLink"]');
    links.forEach((linkNode) => {
      const li = document.createElement('li');
      li.className = 'footer-list-footer__item';
      const link = linkNode.querySelector('[data-aue-prop="link"]');
      if (link) {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent;
        a.className = 'cta-analytics analytics_cta_click footer-list-footer__item--link d-inline-block';
        a.setAttribute('data-link-region', 'Footer List');
        if (link.target) {
          a.target = link.target;
        }
        li.append(a);
        moveInstrumentation(link, a);
      }
      ul.append(li);
      moveInstrumentation(linkNode, li);
    });
    footerListDiv.append(ul);
    moveInstrumentation(listNode, footerListDiv);

    if (index < 2) {
      navbarLeft.append(footerListDiv);
    } else {
      navbarRight.append(footerListDiv);
    }
  });

  nav.append(navbarLeft, navbarRight);
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

    const link = socialLinkNode.querySelector('[data-aue-prop="link"]');
    const icon = socialLinkNode.querySelector('[data-aue-prop="icon"]');

    if (link && icon) {
      const a = document.createElement('a');
      a.href = link.href;
      a.className = 'footer-brand-footer__right--link d-flex justify-content-center align-items-center analytics_cta_click';
      a.setAttribute('data-cta-region', 'Footer');
      a.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
      a.target = '_blank';
      a.setAttribute('data-platform-name', icon.alt.toLowerCase());
      a.setAttribute('data-social-linktype', 'follow');

      const picture = createOptimizedPicture(icon.src, icon.alt);
      a.append(picture);
      li.append(a);
      moveInstrumentation(link, a);
      moveInstrumentation(icon, picture);
    }
    socialList.append(li);
    moveInstrumentation(socialLinkNode, li);
  });

  socialMediaSection.append(socialList);
  secondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'footer-brand-footer__left py-5 d-flex flex-column gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'footer-brand-footer__left--list d-flex align-items-center justify-content-center flex-wrap';

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
    copyrightList.append(li);
    moveInstrumentation(itcPortalLink, a);
  }

  copyrightSection.append(copyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand-footer__left--copyright text-center ';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'footer-brand-footer__left--text text-white';
  const copyrightContent = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightContent) {
    copyrightSpan.innerHTML = copyrightContent.innerHTML;
    moveInstrumentation(copyrightContent, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  }
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(copyrightDiv);

  secondaryContent.append(copyrightSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);
  footerBrandFooter.append(secondarySection);

  block.textContent = '';
  block.append(footerBrandFooter);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
