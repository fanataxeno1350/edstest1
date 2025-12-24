import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const primaryLogo = block.querySelector('[data-aue-prop="primaryLogo"]');
  const secondaryLogo = block.querySelector('[data-aue-prop="secondaryLogo"]');
  const copyright = block.querySelector('[data-aue-prop="copyright"]');
  const itcPortalLink = block.querySelector('[data-aue-prop="itcPortalLink"]');
  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const socialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');

  const sectionPrimary = document.createElement('section');
  sectionPrimary.classList.add('footer-brand-primary');

  const footerBrandContainer = document.createElement('div');
  footerBrandContainer.classList.add('footer-brand-container');

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand-primary--content', 'footer-brand-d-flex', 'footer-brand-flex-column', 'footer-brand-flex-md-row', 'footer-brand-justify-content-md-between', 'footer-brand-align-items-center');

  const sectionLeft = document.createElement('section');
  sectionLeft.classList.add('footer-brand-left', 'footer-brand-d-flex', 'footer-brand-gap-16', 'footer-brand-px-10', 'footer-brand-align-items-center', 'footer-brand-justify-content-center');

  if (primaryLogo) {
    const primaryLogoLink = primaryLogo.querySelector('a');
    if (primaryLogoLink) {
      const img = primaryLogoLink.querySelector('img');
      const logoAnchor = document.createElement('a');
      logoAnchor.href = primaryLogoLink.href;
      if (primaryLogoLink.target) {
        logoAnchor.target = primaryLogoLink.target;
      }
      logoAnchor.classList.add('footer-brand-logo', 'footer-brand-d-inline-block', 'analytics_cta_click');
      logoAnchor.setAttribute('data-cta-region', 'Footer');
      logoAnchor.setAttribute('aria-label', img?.alt || 'ITC Logo');
      logoAnchor.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '100px' }]));
      sectionLeft.append(logoAnchor);
      moveInstrumentation(primaryLogo, logoAnchor);
    }
  }

  if (secondaryLogo) {
    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('footer-brand-secondary--logo', 'footer-brand-d-inline-block');
    const img = secondaryLogo.querySelector('img');
    if (img) {
      secondaryLogoDiv.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '100px' }]));
    }
    sectionLeft.append(secondaryLogoDiv);
    moveInstrumentation(secondaryLogo, secondaryLogoDiv);
  }

  primaryContent.append(sectionLeft);

  const sectionRight = document.createElement('section');
  sectionRight.classList.add('footer-brand-right');

  const nav = document.createElement('nav');
  nav.classList.add('footer-brand-navbar', 'footer-brand-d-grid', 'footer-brand-d-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand-navbar--left', 'footer-brand-d-flex', 'footer-brand-flex-column', 'footer-brand-flex-md-row');

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand-navbar--right', 'footer-brand-d-flex', 'footer-brand-flex-column', 'footer-brand-flex-md-row');

  let currentNavDiv = navLeft;
  let listCount = 0;

  footerLinks.forEach((linkNode) => {
    if (listCount >= 2) {
      currentNavDiv = navRight;
      listCount = 0;
    }

    const listWrapper = document.createElement('div');
    listWrapper.classList.add('footer-list-wrapper');

    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'footer-list-d-flex', 'footer-list-align-items-center', 'footer-list-justify-content-center', 'footer-list-align-items-md-start', 'footer-list-flex-column');

    const li = document.createElement('li');
    li.classList.add('footer-list-item');

    const link = linkNode.querySelector('[data-aue-prop="link"] a');
    const linkText = linkNode.querySelector('[data-aue-prop="text"]');

    if (link && linkText) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      if (link.target) {
        anchor.target = link.target;
      }
      anchor.classList.add('footer-list-item--link', 'footer-list-cta-analytics', 'footer-list-analytics_cta_click', 'footer-list-d-inline-block');
      anchor.setAttribute('data-link-region', 'Footer List');
      anchor.textContent = linkText.textContent;
      li.append(anchor);
      moveInstrumentation(linkNode, li);
    } else if (link) {
      // Fallback for when text is not explicitly authored but link exists
      const anchor = document.createElement('a');
      anchor.href = link.href;
      if (link.target) {
        anchor.target = link.target;
      }
      anchor.classList.add('footer-list-item--link', 'footer-list-cta-analytics', 'footer-list-analytics_cta_click', 'footer-list-d-inline-block');
      anchor.setAttribute('data-link-region', 'Footer List');
      anchor.textContent = link.textContent;
      li.append(anchor);
      moveInstrumentation(linkNode, li);
    }

    ul.append(li);
    listWrapper.append(ul);
    currentNavDiv.append(listWrapper);
    listCount++;
  });

  nav.append(navLeft, navRight);
  sectionRight.append(nav);
  primaryContent.append(sectionRight);
  footerBrandContainer.append(primaryContent);
  sectionPrimary.append(footerBrandContainer);

  const sectionSecondary = document.createElement('section');
  sectionSecondary.classList.add('footer-brand-secondary');

  const secondaryBrandContainer = document.createElement('div');
  secondaryBrandContainer.classList.add('footer-brand-container');

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand-secondary--content', 'footer-brand-d-flex', 'footer-brand-flex-column', 'footer-brand-justify-content-md-between', 'footer-brand-align-items-center');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('footer-brand-right', 'footer-brand-d-flex', 'footer-brand-flex-column', 'footer-brand-pb-5');

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('footer-brand-social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.classList.add('footer-brand-right--list', 'footer-brand-d-flex', 'footer-brand-align-items-center', 'footer-brand-justify-content-center', 'footer-brand-px-10', 'footer-brand-flex-wrap');

  socialLinks.forEach((socialLinkNode) => {
    const socialLi = document.createElement('li');
    socialLi.classList.add('footer-brand-right--item', 'footer-brand-d-flex', 'footer-brand-justify-content-center', 'footer-brand-align-items-center');

    const socialLink = socialLinkNode.querySelector('[data-aue-prop="socialUrl"] a');
    const socialIcon = socialLinkNode.querySelector('[data-aue-prop="icon"] img');

    if (socialLink && socialIcon) {
      const socialAnchor = document.createElement('a');
      socialAnchor.href = socialLink.href;
      if (socialLink.target) {
        socialAnchor.target = socialLink.target;
      }
      socialAnchor.classList.add('footer-brand-right--link', 'footer-brand-d-flex', 'footer-brand-justify-content-center', 'footer-brand-align-items-center', 'analytics_cta_click');
      socialAnchor.setAttribute('data-cta-region', 'Footer');
      socialAnchor.setAttribute('data-cta-label', `footer-${socialIcon.alt.toLowerCase()}`);
      socialAnchor.setAttribute('data-platform-name', socialIcon.alt.toLowerCase());
      socialAnchor.setAttribute('data-social-linktype', 'follow');
      socialAnchor.setAttribute('aria-label', socialIcon.alt);

      socialAnchor.append(createOptimizedPicture(socialIcon.src, socialIcon.alt, false, [{ width: '32px' }]));
      socialLi.append(socialAnchor);
      socialMediaList.append(socialLi);
      moveInstrumentation(socialLinkNode, socialLi);
    }
  });

  socialMediaSection.append(socialMediaList);
  secondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('footer-brand-left', 'footer-brand-py-5', 'footer-brand-d-flex', 'footer-brand-flex-column', 'footer-brand-gap-3');

  const itcList = document.createElement('ul');
  itcList.classList.add('footer-brand-left--list', 'footer-brand-d-flex', 'footer-brand-align-items-center', 'footer-brand-justify-content-center', 'footer-brand-flex-wrap');

  if (itcPortalLink) {
    const itcLi = document.createElement('li');
    itcLi.classList.add('footer-brand-left--item', 'footer-brand-foot_link');
    const itcAnchor = itcPortalLink.querySelector('a');
    if (itcAnchor) {
      const anchor = document.createElement('a');
      anchor.href = itcAnchor.href;
      if (itcAnchor.target) {
        anchor.target = itcAnchor.target;
      }
      anchor.classList.add('footer-brand-left--link', 'footer-brand-analytics_cta_click');
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.textContent = itcAnchor.textContent;
      itcLi.append(anchor);
      itcList.append(itcLi);
      moveInstrumentation(itcPortalLink, itcLi);
    }
  }
  copyrightSection.append(itcList);

  if (copyright) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.classList.add('footer-brand-left--copyright', 'footer-brand-text-center');
    const copyrightSpan = document.createElement('span');
    copyrightSpan.classList.add('footer-brand-left--text', 'footer-brand-text-white');
    copyrightSpan.textContent = copyright.textContent;
    copyrightDiv.append(copyrightSpan);
    copyrightSection.append(copyrightDiv);
    moveInstrumentation(copyright, copyrightDiv);
  }

  secondaryContent.append(copyrightSection);
  secondaryBrandContainer.append(secondaryContent);
  sectionSecondary.append(secondaryBrandContainer);

  block.textContent = '';
  block.append(sectionPrimary, sectionSecondary);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
