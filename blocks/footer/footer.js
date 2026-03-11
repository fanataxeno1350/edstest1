import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-brand-footer footer-w-100 footer-bg-boing-neutral-gray-600';
  footerContainer.setAttribute('data-isdoodlevariation', 'false');
  moveInstrumentation(block, footerContainer);

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand-footer__primary';
  primarySection.style.backgroundColor = '';

  const containerDiv = document.createElement('div');
  containerDiv.className = 'footer-container';

  const primaryContentDiv = document.createElement('div');
  primaryContentDiv.className = 'footer-brand-footer__primary--content footer-d-flex footer-flex-column footer-flex-md-row footer-justify-content-md-between footer-align-items-center';

  const leftSection = document.createElement('section');
  leftSection.className = 'footer-brand-footer__left footer-d-flex footer-gap-16 footer-px-10 footer-align-items-center footer-justify-content-center';

  // Logo 1
  const logo1Cell = block.children[0]?.children[0];
  if (logo1Cell) {
    const logo1Link = logo1Cell.querySelector('a');
    const logo1Img = logo1Cell.querySelector('img');
    if (logo1Link && logo1Img) {
      const newLogo1Link = document.createElement('a');
      newLogo1Link.href = logo1Link.href;
      newLogo1Link.target = logo1Link.target;
      newLogo1Link.className = 'footer-brand-footer__logo footer-d-inline-block footer-analytics_cta_click';
      newLogo1Link.setAttribute('data-cta-region', 'Footer');
      newLogo1Link.setAttribute('aria-label', 'ITC Logo');

      const optimizedPic = createOptimizedPicture(logo1Img.src, logo1Img.alt);
      moveInstrumentation(logo1Img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
      optimizedPic.querySelector('img').loading = 'lazy';
      newLogo1Link.append(optimizedPic);
      leftSection.append(newLogo1Link);
    }
  }

  // Logo 2
  const logo2Cell = block.children[0]?.children[1];
  if (logo2Cell) {
    const logo2Img = logo2Cell.querySelector('img');
    if (logo2Img) {
      const secondaryLogoDiv = document.createElement('div');
      secondaryLogoDiv.className = 'footer-brand-footer__secondary--logo footer-d-inline-block';

      const optimizedPic = createOptimizedPicture(logo2Img.src, logo2Img.alt);
      moveInstrumentation(logo2Img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-no-rendition';
      optimizedPic.querySelector('img').loading = 'lazy';
      secondaryLogoDiv.append(optimizedPic);
      leftSection.append(secondaryLogoDiv);
    }
  }

  primaryContentDiv.append(leftSection);

  const rightSection = document.createElement('section');
  rightSection.className = 'footer-brand-footer__right';

  const nav = document.createElement('nav');
  nav.className = 'footer-brand-footer__navbar footer-d-grid footer-d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');

  const navbarLeft = document.createElement('div');
  navbarLeft.className = 'footer-brand-footer__navbar--left footer-d-flex footer-flex-column footer-flex-md-row';

  const navbarRight = document.createElement('div');
  navbarRight.className = 'footer-brand-footer__navbar--right footer-d-flex footer-flex-column footer-flex-md-row';

  // Footer Link Groups
  const footerLinkGroupsCell = block.children[0]?.children[2];
  if (footerLinkGroupsCell) {
    [...footerLinkGroupsCell.children].forEach((linkGroupRow, index) => {
      const ul = document.createElement('ul');
      ul.className = 'footer-list-footer footer-d-flex footer-align-items-center footer-justify-content-center footer-align-items-md-start footer-flex-column';
      moveInstrumentation(linkGroupRow, ul);

      [...linkGroupRow.children].forEach((linkCell) => {
        const link = linkCell.querySelector('a');
        if (link) {
          const li = document.createElement('li');
          li.className = 'footer-list-footer__item';
          moveInstrumentation(linkCell, li);

          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          newLink.className = 'footer-cta-analytics footer-analytics_cta_click footer-list-footer__item--link footer-d-inline-block';
          newLink.setAttribute('data-link-region', 'Footer List');
          if (link.target) newLink.target = link.target;

          li.append(newLink);
          ul.append(li);
        }
      });
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'footer-footerList-footer';
      footerListDiv.append(ul);

      if (index < 2) {
        navbarLeft.append(footerListDiv);
      } else {
        navbarRight.append(footerListDiv);
      }
    });
  }

  nav.append(navbarLeft, navbarRight);
  rightSection.append(nav);
  primaryContentDiv.append(rightSection);
  containerDiv.append(primaryContentDiv);
  primarySection.append(containerDiv);
  footerContainer.append(primarySection);

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand-footer__secondary';
  secondarySection.style.backgroundColor = '';

  const secondaryContainerDiv = document.createElement('div');
  secondaryContainerDiv.className = 'footer-container';

  const secondaryContentDiv = document.createElement('div');
  secondaryContentDiv.className = 'footer-brand-footer__secondary--content footer-d-flex footer-flex-column footer-justify-content-md-between footer-align-items-center';

  const socialMediaRightSection = document.createElement('section');
  socialMediaRightSection.className = 'footer-brand-footer__right footer-d-flex footer-flex-column footer-pb-5';

  const followUsTitle = document.createElement('h3');
  followUsTitle.className = 'footer-social_media-footer--title';
  followUsTitle.textContent = 'Follow Us On';
  socialMediaRightSection.append(followUsTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'footer-brand-footer__right--list footer-d-flex footer-align-items-center footer-justify-content-center footer-px-10 footer-flex-wrap';

  // Footer Social Links
  const footerSocialLinksCell = block.children[0]?.children[3];
  if (footerSocialLinksCell) {
    [...footerSocialLinksCell.children].forEach((socialLinkRow) => {
      const platformCell = socialLinkRow.children[0];
      const urlCell = socialLinkRow.children[1];
      const iconCell = socialLinkRow.children[2];

      if (platformCell && urlCell && iconCell) {
        const platform = platformCell.textContent.trim();
        const url = urlCell.textContent.trim();
        const iconImg = iconCell.querySelector('img');

        if (platform && url && iconImg) {
          const li = document.createElement('li');
          li.className = 'footer-brand-footer__right--item footer-d-flex footer-justify-content-center footer-align-items-center';
          moveInstrumentation(socialLinkRow, li);

          const link = document.createElement('a');
          link.href = url;
          link.target = '_blank';
          link.className = 'footer-brand-footer__right--link footer-d-flex footer-justify-content-center footer-align-items-center footer-analytics_cta_click';
          link.setAttribute('data-cta-region', 'Footer');
          link.setAttribute('data-cta-label', `footer-${platform.toLowerCase()}`);
          link.setAttribute('data-platform-name', platform.toLowerCase());
          link.setAttribute('data-social-linktype', 'follow');

          const optimizedPic = createOptimizedPicture(iconImg.src, iconImg.alt || platform);
          moveInstrumentation(iconImg, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
          optimizedPic.querySelector('img').loading = 'lazy';
          optimizedPic.querySelector('img').setAttribute('aria-label', platform.toLowerCase());

          link.append(optimizedPic);
          li.append(link);
          socialMediaList.append(li);
        }
      }
    });
  }
  socialMediaRightSection.append(socialMediaList);
  secondaryContentDiv.append(socialMediaRightSection);

  const copyrightLeftSection = document.createElement('section');
  copyrightLeftSection.className = 'footer-brand-footer__left footer-py-5 footer-d-flex footer-flex-column footer-gap-3';

  const copyrightList = document.createElement('ul');
  copyrightList.className = 'footer-brand-footer__left--list footer-d-flex footer-align-items-center footer-justify-content-center footer-flex-wrap';

  // ITC Portal Link
  const itcPortalLinkCell = block.children[0]?.children[4];
  if (itcPortalLinkCell) {
    const itcLink = itcPortalLinkCell.querySelector('a');
    if (itcLink) {
      const li = document.createElement('li');
      li.className = 'footer-brand-footer__left--item footer-foot_link-footer';
      moveInstrumentation(itcPortalLinkCell, li);

      const newLink = document.createElement('a');
      newLink.href = itcLink.href;
      newLink.target = itcLink.target;
      newLink.textContent = itcLink.textContent;
      newLink.className = 'footer-brand-footer__left--link footer-analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      li.append(newLink);
      copyrightList.append(li);
    }
  }
  copyrightLeftSection.append(copyrightList);

  // Copyright Text
  const copyrightTextCell = block.children[0]?.children[5];
  if (copyrightTextCell) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'footer-brand-footer__left--copyright footer-text-center';
    moveInstrumentation(copyrightTextCell, copyrightDiv);

    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'footer-brand-footer__left--text footer-text-white';
    copyrightSpan.textContent = copyrightTextCell.textContent.trim();
    copyrightDiv.append(copyrightSpan);
    copyrightLeftSection.append(copyrightDiv);
  }

  secondaryContentDiv.append(copyrightLeftSection);
  secondaryContainerDiv.append(secondaryContentDiv);
  secondarySection.append(secondaryContainerDiv);
  footerContainer.append(secondarySection);

  block.textContent = '';
  block.append(footerContainer);
}
