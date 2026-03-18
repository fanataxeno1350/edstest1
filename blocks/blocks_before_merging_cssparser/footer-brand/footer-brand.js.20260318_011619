import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrand = document.createElement('div');
  footerBrand.className = 'footer-brand w-100 bg-boing-neutral-gray-600';
  footerBrand.dataset.isdoodlevariation = 'false';

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand__primary';
  primarySection.style.backgroundColor = '';

  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'container';

  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand__primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'footer-brand__left d-flex gap-16 px-10 align-items-center justify-content-center';

  const logo1Wrapper = document.querySelector('[data-aue-prop="logo1"]');
  if (logo1Wrapper) {
    const logo1Link = logo1Wrapper.querySelector('a');
    const logo1Img = logo1Wrapper.querySelector('img');
    if (logo1Link && logo1Img) {
      const newLogo1Link = document.createElement('a');
      newLogo1Link.href = logo1Link.href;
      newLogo1Link.target = logo1Link.target;
      newLogo1Link.className = 'footer-brand__logo d-inline-block analytics_cta_click';
      newLogo1Link.setAttribute('data-cta-region', 'Footer');
      newLogo1Link.setAttribute('aria-label', 'ITC Logo');

      const picture = createOptimizedPicture(logo1Img.src, logo1Img.alt);
      const newImg = picture.querySelector('img');
      newImg.className = 'object-fit-contain w-100 h-100 no-rendition';
      newImg.loading = 'lazy';
      newLogo1Link.append(picture);
      footerBrandLeft.append(newLogo1Link);
      moveInstrumentation(logo1Wrapper, newLogo1Link);
    }
  }

  const logo2Wrapper = document.querySelector('[data-aue-prop="logo2"]');
  if (logo2Wrapper) {
    const logo2Img = logo2Wrapper.querySelector('img');
    if (logo2Img) {
      const newLogo2Div = document.createElement('div');
      newLogo2Div.className = 'footer-brand__secondary--logo d-inline-block';

      const picture = createOptimizedPicture(logo2Img.src, logo2Img.alt);
      const newImg = picture.querySelector('img');
      newImg.className = 'object-fit-contain w-100 no-rendition';
      newImg.loading = 'lazy';
      newLogo2Div.append(picture);
      footerBrandLeft.append(newLogo2Div);
      moveInstrumentation(logo2Wrapper, newLogo2Div);
    }
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'footer-brand__right';

  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'footer-brand__navbar d-grid d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'footer-brand__navbar--left d-flex flex-column flex-md-row ';

  const footerLinkColumns = block.querySelectorAll('[data-aue-model="footerLinkColumn"]');
  footerLinkColumns.forEach((columnNode) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'footerList';

    const footerListUl = document.createElement('ul');
    footerListUl.className = 'footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';

    const links = columnNode.querySelectorAll('[data-aue-model="footerLink"]');
    links.forEach((linkNode) => {
      const listItem = document.createElement('li');
      listItem.className = 'footer-list__item';

      const link = linkNode.querySelector('[data-aue-prop="link"] a');
      if (link) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.className = 'cta-analytics analytics_cta_click footer-list__item--link d-inline-block';
        newLink.setAttribute('data-link-region', 'Footer List');
        newLink.textContent = link.textContent;
        if (link.target) {
          newLink.target = link.target;
        }
        listItem.append(newLink);
        moveInstrumentation(linkNode, listItem);
      }
      footerListUl.append(listItem);
    });
    footerListDiv.append(footerListUl);
    footerNavbarLeft.append(footerListDiv);
    moveInstrumentation(columnNode, footerListDiv);
  });

  footerNavbar.append(footerNavbarLeft);
  footerBrandRight.append(footerNavbar);

  primaryContent.append(footerBrandLeft, footerBrandRight);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);
  footerBrand.append(primarySection);

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand__secondary';
  secondarySection.style.backgroundColor = '';

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'container';

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand__secondary--content d-flex flex-column justify-content-md-between align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'footer-brand__right d-flex flex-column pb-5';

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'footer-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialMediaSection.append(socialTitle);

  const socialList = document.createElement('ul');
  socialList.className = 'footer-brand__right--list d-flex align-items-center justify-content-center px-10 flex-wrap';

  const footerSocialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  footerSocialLinks.forEach((socialLinkNode) => {
    const listItem = document.createElement('li');
    listItem.className = 'footer-brand__right--item d-flex justify-content-center align-items-center';

    const link = socialLinkNode.querySelector('[data-aue-prop="link"] a');
    const icon = socialLinkNode.querySelector('[data-aue-prop="icon"] img');

    if (link && icon) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = link.target;
      newLink.className = 'footer-brand__right--link d-flex justify-content-center align-items-center analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.setAttribute('data-cta-label', `footer-${link.dataset.platformName || ''}`);
      newLink.setAttribute('data-platform-name', link.dataset.platformName || '');
      newLink.setAttribute('data-social-linktype', 'follow');

      const picture = createOptimizedPicture(icon.src, icon.alt);
      const newImg = picture.querySelector('img');
      newImg.className = 'object-fit-contain w-100 h-100 no-rendition';
      newImg.loading = 'lazy';
      newImg.setAttribute('aria-label', icon.getAttribute('aria-label'));
      newLink.append(picture);
      listItem.append(newLink);
      moveInstrumentation(socialLinkNode, listItem);
    }
    socialList.append(listItem);
  });
  socialMediaSection.append(socialList);
  secondaryContent.append(socialMediaSection);

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'footer-brand__left py-5 d-flex flex-column gap-3';

  const itcPortalList = document.createElement('ul');
  itcPortalList.className = 'footer-brand__left--list d-flex align-items-center justify-content-center flex-wrap';

  const itcPortalLinkWrapper = block.querySelector('[data-aue-prop="itcPortalLink"]');
  if (itcPortalLinkWrapper) {
    const itcLink = itcPortalLinkWrapper.querySelector('a');
    if (itcLink) {
      const listItem = document.createElement('li');
      listItem.className = 'footer-brand__left--item foot_link';

      const newLink = document.createElement('a');
      newLink.href = itcLink.href;
      newLink.target = itcLink.target;
      newLink.className = 'footer-brand__left--link analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.textContent = itcLink.textContent;
      listItem.append(newLink);
      itcPortalList.append(listItem);
      moveInstrumentation(itcPortalLinkWrapper, listItem);
    }
  }
  copyrightSection.append(itcPortalList);

  const copyrightWrapper = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightWrapper) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'footer-brand__left--copyright text-center ';

    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'footer-brand__left--text text-white';
    copyrightSpan.innerHTML = copyrightWrapper.innerHTML;
    copyrightDiv.append(copyrightSpan);
    copyrightSection.append(copyrightDiv);
    moveInstrumentation(copyrightWrapper, copyrightDiv);
  }

  secondaryContent.append(copyrightSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);
  footerBrand.append(secondarySection);

  block.textContent = '';
  block.append(footerBrand);
  block.className = `footer-brand block`;
  block.dataset.blockStatus = 'loaded';
}
