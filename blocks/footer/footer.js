import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const primarySection = document.createElement('section');
  primarySection.classList.add('brand-footer__primary');

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container');
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('brand-footer__primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');
  primaryContainer.append(primaryContent);

  const leftSection = document.createElement('section');
  leftSection.classList.add('brand-footer__left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');
  primaryContent.append(leftSection);

  // Logo 1
  const logo1Wrapper = document.createElement('a');
  logo1Wrapper.classList.add('brand-footer__logo', 'd-inline-block', 'analytics_cta_click');
  const logo1Aue = block.querySelector('[data-aue-prop="logo1"]');
  if (logo1Aue) {
    const img1 = logo1Aue.querySelector('img');
    if (img1) {
      const picture1 = createOptimizedPicture(img1.src, img1.alt);
      logo1Wrapper.append(picture1);
      logo1Wrapper.href = logo1Aue.href;
      if (logo1Aue.target) logo1Wrapper.target = logo1Aue.target;
      if (logo1Aue.getAttribute('aria-label')) logo1Wrapper.setAttribute('aria-label', logo1Aue.getAttribute('aria-label'));
      moveInstrumentation(logo1Aue, logo1Wrapper);
    }
  }
  leftSection.append(logo1Wrapper);

  // Logo 2
  const logo2Wrapper = document.createElement('div');
  logo2Wrapper.classList.add('brand-footer__secondary--logo', 'd-inline-block');
  const logo2Aue = block.querySelector('[data-aue-prop="logo2"]');
  if (logo2Aue) {
    const img2 = logo2Aue.querySelector('img');
    if (img2) {
      const picture2 = createOptimizedPicture(img2.src, img2.alt);
      logo2Wrapper.append(picture2);
      moveInstrumentation(logo2Aue, logo2Wrapper);
    }
  }
  leftSection.append(logo2Wrapper);

  const rightSection = document.createElement('section');
  rightSection.classList.add('brand-footer__right');
  primaryContent.append(rightSection);

  const nav = document.createElement('nav');
  nav.classList.add('brand-footer__navbar', 'd-grid', 'd-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');
  rightSection.append(nav);

  const navLeft = document.createElement('div');
  navLeft.classList.add('brand-footer__navbar--left', 'd-flex', 'flex-column', 'flex-md-row');
  nav.append(navLeft);

  const navRight = document.createElement('div');
  navRight.classList.add('brand-footer__navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  nav.append(navRight);

  // Navigation Lists
  const navLists = block.querySelectorAll('[data-aue-model="footerNavList"]');
  navLists.forEach((navListAue, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList-footer');
    const ul = document.createElement('ul');
    ul.classList.add('list-footer', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');
    footerListDiv.append(ul);

    const linksAue = navListAue.querySelectorAll('[data-aue-prop="links"]');
    linksAue.forEach((linkAue) => {
      const li = document.createElement('li');
      li.classList.add('list-footer__item');
      const a = document.createElement('a');
      a.classList.add('cta-analytics', 'analytics_cta_click', 'list-footer__item--link', 'd-inline-block');
      a.href = linkAue.href;
      a.textContent = linkAue.textContent;
      if (linkAue.target) a.target = linkAue.target;
      if (linkAue.dataset.linkRegion) a.dataset.linkRegion = linkAue.dataset.linkRegion;
      li.append(a);
      ul.append(li);
      moveInstrumentation(linkAue, a);
    });
    moveInstrumentation(navListAue, footerListDiv);
    if (index < 2) {
      navLeft.append(footerListDiv);
    } else {
      navRight.append(footerListDiv);
    }
  });

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('brand-footer__secondary');

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('brand-footer__secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');
  secondaryContainer.append(secondaryContent);

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('brand-footer__right', 'd-flex', 'flex-column', 'pb-5');
  secondaryContent.append(socialMediaSection);

  const followUsTitle = document.createElement('h3');
  followUsTitle.classList.add('social_media-footer--title');
  followUsTitle.textContent = 'Follow Us On';
  socialMediaSection.append(followUsTitle);

  const socialList = document.createElement('ul');
  socialList.classList.add('brand-footer__right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');
  socialMediaSection.append(socialList);

  // Social Links
  const socialLinks = block.querySelectorAll('[data-aue-model="footerSocial"]');
  socialLinks.forEach((socialLinkAue) => {
    const li = document.createElement('li');
    li.classList.add('brand-footer__right--item', 'd-flex', 'justify-content-center', 'align-items-center');
    const a = document.createElement('a');
    a.classList.add('brand-footer__right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');

    const linkAue = socialLinkAue.querySelector('[data-aue-prop="socialLink"]');
    if (linkAue) {
      a.href = linkAue.href;
      if (linkAue.target) a.target = linkAue.target;
      if (linkAue.dataset.ctaRegion) a.dataset.ctaRegion = linkAue.dataset.ctaRegion;
      if (linkAue.dataset.ctaLabel) a.dataset.ctaLabel = linkAue.dataset.ctaLabel;
      if (linkAue.dataset.platformName) a.dataset.platformName = linkAue.dataset.platformName;
      if (linkAue.dataset.socialLinktype) a.dataset.socialLinktype = linkAue.dataset.socialLinktype;
      moveInstrumentation(linkAue, a);
    }

    const iconAue = socialLinkAue.querySelector('[data-aue-prop="icon"]');
    if (iconAue) {
      const img = iconAue.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        if (img.getAttribute('aria-label')) picture.querySelector('img').setAttribute('aria-label', img.getAttribute('aria-label'));
        a.append(picture);
        moveInstrumentation(iconAue, a);
      }
    }

    li.append(a);
    socialList.append(li);
    moveInstrumentation(socialLinkAue, li);
  });

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('brand-footer__left', 'py-5', 'd-flex', 'flex-column', 'gap-3');
  secondaryContent.append(copyrightSection);

  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('brand-footer__left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');
  copyrightSection.append(copyrightList);

  // ITC Portal Link
  const itcPortalLi = document.createElement('li');
  itcPortalLi.classList.add('brand-footer__left--item', 'foot_link-footer');
  const itcPortalA = document.createElement('a');
  itcPortalA.classList.add('brand-footer__left--link', 'analytics_cta_click');
  const itcPortalLinkAue = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLinkAue) {
    itcPortalA.href = itcPortalLinkAue.href;
    itcPortalA.textContent = itcPortalLinkAue.textContent;
    if (itcPortalLinkAue.target) itcPortalA.target = itcPortalLinkAue.target;
    if (itcPortalLinkAue.dataset.ctaRegion) itcPortalA.dataset.ctaRegion = itcPortalLinkAue.dataset.ctaRegion;
    itcPortalLi.append(itcPortalA);
    copyrightList.append(itcPortalLi);
    moveInstrumentation(itcPortalLinkAue, itcPortalA);
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('brand-footer__left--copyright', 'text-center');
  copyrightSection.append(copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('brand-footer__left--text', 'text-white');
  const copyrightAue = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightAue) {
    copyrightSpan.textContent = copyrightAue.textContent;
    moveInstrumentation(copyrightAue, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);

  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.classList.add('brand-footer', 'w-100', 'bg-boing-neutral-gray-600');
  footerBrandDiv.append(primarySection, secondarySection);

  block.textContent = '';
  block.append(footerBrandDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
