import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-container-hd footer-p-0';
  moveInstrumentation(block.querySelector('.footer-container-hd'), footerContainer);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'footer-brand footer-w-100 footer-bg-boing-neutral-gray-600';
  footerBrand.dataset.isdoodlevariation = 'false';
  footerContainer.append(footerBrand);

  // Primary Section
  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand__primary';
  primarySection.style.backgroundColor = '';
  footerBrand.append(primarySection);

  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'footer-container';
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand__primary--content footer-d-flex footer-flex-column footer-flex-md-row footer-justify-content-md-between footer-align-items-center';
  primaryContainer.append(primaryContent);

  // Brand Left (Logos)
  const brandLeft = document.createElement('section');
  brandLeft.className = 'footer-brand__left footer-d-flex footer-gap-16 footer-px-10 footer-align-items-center footer-justify-content-center';
  primaryContent.append(brandLeft);

  const logoPrimary = block.querySelector('[data-aue-prop="logoPrimary"]');
  if (logoPrimary) {
    const primaryLink = document.createElement('a');
    primaryLink.href = logoPrimary.href;
    primaryLink.target = '_blank';
    primaryLink.className = 'footer-brand__logo footer-d-inline-block footer-analytics_cta_click';
    primaryLink.dataset.ctaRegion = 'Footer';
    primaryLink.ariaLabel = 'ITC Logo';

    const img = logoPrimary.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      picture.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
      primaryLink.append(picture);
      moveInstrumentation(img, picture.querySelector('img'));
    }
    brandLeft.append(primaryLink);
    moveInstrumentation(logoPrimary, primaryLink);
  }

  const logoSecondary = block.querySelector('[data-aue-prop="logoSecondary"]');
  if (logoSecondary) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.className = 'footer-brand__secondary--logo footer-d-inline-block';

    const img = logoSecondary.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      picture.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-no-rendition';
      secondaryLogoDiv.append(picture);
      moveInstrumentation(img, picture.querySelector('img'));
    }
    brandLeft.append(secondaryLogoDiv);
    moveInstrumentation(logoSecondary, secondaryLogoDiv);
  }

  // Brand Right (Navigation)
  const brandRight = document.createElement('section');
  brandRight.className = 'footer-brand__right';
  primaryContent.append(brandRight);

  const nav = document.createElement('nav');
  nav.className = 'footer-brand__navbar footer-d-grid footer-d-md-flex';
  nav.ariaLabel = 'footer navbar';
  brandRight.append(nav);

  const navbarLeft = document.createElement('div');
  navbarLeft.className = 'footer-brand__navbar--left footer-d-flex footer-flex-column footer-flex-md-row';
  nav.append(navbarLeft);

  const navbarRight = document.createElement('div');
  navbarRight.className = 'footer-brand__navbar--right footer-d-flex footer-flex-column footer-flex-md-row';
  nav.append(navbarRight);

  const footerNavLists = block.querySelectorAll('[data-aue-model="footerNavList"]');
  footerNavLists.forEach((listNode, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'footer-footerList';

    const ul = document.createElement('ul');
    ul.className = 'footer-list footer-d-flex footer-align-items-center footer-justify-content-center footer-align-items-md-start footer-flex-column';

    for (let i = 1; i <= 3; i += 1) {
      const linkProp = `link${i}`;
      const linkElement = listNode.querySelector(`[data-aue-prop="${linkProp}"]`);
      if (linkElement) {
        const li = document.createElement('li');
        li.className = 'footer-list__item';

        const a = document.createElement('a');
        a.href = linkElement.href;
        if (linkElement.target) {
          a.target = linkElement.target;
        }
        a.className = 'footer-cta-analytics footer-analytics_cta_click footer-list__item--link footer-d-inline-block';
        a.dataset.linkRegion = 'Footer List';
        a.textContent = linkElement.textContent;
        li.append(a);
        ul.append(li);
        moveInstrumentation(linkElement, a);
      }
    }
    footerListDiv.append(ul);

    if (index < 2) {
      navbarLeft.append(footerListDiv);
    } else {
      navbarRight.append(footerListDiv);
    }
    moveInstrumentation(listNode, footerListDiv);
  });

  // Secondary Section
  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand__secondary';
  secondarySection.style.backgroundColor = '';
  footerBrand.append(secondarySection);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'footer-container';
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand__secondary--content footer-d-flex footer-flex-column footer-justify-content-md-between footer-align-items-center';
  secondaryContainer.append(secondaryContent);

  // Secondary Brand Right (Social Media)
  const secondaryBrandRight = document.createElement('section');
  secondaryBrandRight.className = 'footer-brand__right footer-d-flex footer-flex-column footer-pb-5';
  secondaryContent.append(secondaryBrandRight);

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'footer-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  secondaryBrandRight.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'footer-brand__right--list footer-d-flex footer-align-items-center footer-justify-content-center footer-px-10 footer-flex-wrap';
  secondaryBrandRight.append(socialList);

  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialList"]');
  footerSocialLinks.forEach((socialNode) => {
    const li = document.createElement('li');
    li.className = 'footer-brand__right--item footer-d-flex footer-justify-content-center footer-align-items-center';

    const socialLink = socialNode.querySelector('[data-aue-prop="socialLink"]');
    const socialIcon = socialNode.querySelector('[data-aue-prop="socialIcon"]');

    if (socialLink && socialIcon) {
      const a = document.createElement('a');
      a.href = socialLink.href;
      a.target = '_blank';
      a.className = 'footer-brand__right--link footer-d-flex footer-justify-content-center footer-align-items-center footer-analytics_cta_click';
      a.dataset.ctaRegion = 'Footer';
      a.dataset.ctaLabel = `footer-${socialIcon.alt.toLowerCase()}`;
      a.dataset.platformName = socialIcon.alt.toLowerCase();
      a.dataset.socialLinktype = 'follow';

      const img = socialIcon.querySelector('img');
      if (img) {
        const picture = createOptimizedPicture(img.src, img.alt);
        picture.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
        picture.querySelector('img').ariaLabel = img.alt.toLowerCase();
        a.append(picture);
        moveInstrumentation(img, picture.querySelector('img'));
      }
      li.append(a);
      moveInstrumentation(socialLink, a);
      moveInstrumentation(socialIcon, a);
    }
    socialList.append(li);
    moveInstrumentation(socialNode, li);
  });

  // Secondary Brand Left (ITC Portal & Copyright)
  const secondaryBrandLeft = document.createElement('section');
  secondaryBrandLeft.className = 'footer-brand__left footer-py-5 footer-d-flex footer-flex-column footer-gap-3';
  secondaryContent.append(secondaryBrandLeft);

  const itcList = document.createElement('ul');
  itcList.className = 'footer-brand__left--list footer-d-flex footer-align-items-center footer-justify-content-center footer-flex-wrap';
  secondaryBrandLeft.append(itcList);

  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLink) {
    const li = document.createElement('li');
    li.className = 'footer-brand__left--item footer-foot_link';

    const a = document.createElement('a');
    a.href = itcPortalLink.href;
    a.target = '_blank';
    a.className = 'footer-brand__left--link footer-analytics_cta_click';
    a.dataset.ctaRegion = 'Footer';
    a.textContent = itcPortalLink.textContent;
    li.append(a);
    itcList.append(li);
    moveInstrumentation(itcPortalLink, a);
  }

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand__left--copyright footer-text-center';
  secondaryBrandLeft.append(copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'footer-brand__left--text footer-text-white';
  const copyrightElement = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightElement) {
    copyrightSpan.innerHTML = copyrightElement.innerHTML;
    moveInstrumentation(copyrightElement, copyrightSpan);
  } else {
    copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  }
  copyrightDiv.append(copyrightSpan);

  block.textContent = '';
  block.append(footerContainer);
  block.className = 'footer block';
  block.dataset.blockStatus = 'loaded';
}
