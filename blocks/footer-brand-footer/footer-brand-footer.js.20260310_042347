import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainContainer = document.createElement('div');
  mainContainer.className = 'footer-brand-footer footer-w-100 footer-bg-boing-neutral-gray-600';
  mainContainer.setAttribute('data-isdoodlevariation', 'false');

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand-footer__primary';
  primarySection.style.backgroundColor = '';
  mainContainer.append(primarySection);

  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'footer-container';
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand-footer__primary--content footer-d-flex footer-flex-column footer-flex-md-row footer-justify-content-md-between footer-align-items-center';
  primaryContainer.append(primaryContent);

  const leftSection = document.createElement('section');
  leftSection.className = 'footer-brand-footer__left footer-d-flex footer-gap-16 footer-px-10 footer-align-items-center footer-justify-content-center';
  primaryContent.append(leftSection);

  const rightSection = document.createElement('section');
  rightSection.className = 'footer-brand-footer__right';
  primaryContent.append(rightSection);

  const navbar = document.createElement('nav');
  navbar.className = 'footer-brand-footer__navbar footer-d-grid footer-d-md-flex';
  navbar.setAttribute('aria-label', 'footer navbar');
  rightSection.append(navbar);

  const navbarLeft = document.createElement('div');
  navbarLeft.className = 'footer-brand-footer__navbar--left footer-d-flex footer-flex-column footer-flex-md-row';
  navbar.append(navbarLeft);

  const navbarRight = document.createElement('div');
  navbarRight.className = 'footer-brand-footer__navbar--right footer-d-flex footer-flex-column footer-flex-md-row';
  navbar.append(navbarRight);

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand-footer__secondary';
  secondarySection.style.backgroundColor = '';
  mainContainer.append(secondarySection);

  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'footer-container';
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand-footer__secondary--content footer-d-flex footer-flex-column footer-justify-content-md-between footer-align-items-center';
  secondaryContainer.append(secondaryContent);

  const secondaryRightSection = document.createElement('section');
  secondaryRightSection.className = 'footer-brand-footer__right footer-d-flex footer-flex-column footer-pb-5';
  secondaryContent.append(secondaryRightSection);

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'footer-social_media-footer--title';
  socialMediaTitle.textContent = 'Follow Us On';
  secondaryRightSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'footer-brand-footer__right--list footer-d-flex footer-align-items-center footer-justify-content-center footer-px-10 footer-flex-wrap';
  secondaryRightSection.append(socialMediaList);

  const secondaryLeftSection = document.createElement('section');
  secondaryLeftSection.className = 'footer-brand-footer__left footer-py-5 footer-d-flex footer-flex-column footer-gap-3';
  secondaryContent.append(secondaryLeftSection);

  const footerLinksList = document.createElement('ul');
  footerLinksList.className = 'footer-brand-footer__left--list footer-d-flex footer-align-items-center footer-justify-content-center footer-flex-wrap';
  secondaryLeftSection.append(footerLinksList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand-footer__left--copyright footer-text-center';
  secondaryLeftSection.append(copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'footer-brand-footer__left--text footer-text-white';
  copyrightDiv.append(copyrightSpan);

  let footerLinkListCounter = 0;

  [...block.children].forEach((row, rowIndex) => {
    moveInstrumentation(row, mainContainer);
    const cells = [...row.children];

    // Logo 1
    if (rowIndex === 0 && cells[0]) {
      const logo1Link = cells[0].querySelector('a');
      const logo1Img = cells[0].querySelector('img');
      if (logo1Link && logo1Img) {
        const newLogo1Link = document.createElement('a');
        newLogo1Link.href = logo1Link.href;
        newLogo1Link.target = '_blank';
        newLogo1Link.className = 'footer-brand-footer__logo footer-d-inline-block footer-analytics_cta_click';
        newLogo1Link.setAttribute('data-cta-region', 'Footer');
        newLogo1Link.setAttribute('aria-label', logo1Link.getAttribute('aria-label') || 'Logo');
        
        const optimizedPic = createOptimizedPicture(logo1Img.src, logo1Img.alt);
        moveInstrumentation(logo1Img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
        optimizedPic.querySelector('img').loading = 'lazy';
        newLogo1Link.append(optimizedPic);
        leftSection.append(newLogo1Link);
      }
    }

    // Logo 2
    if (rowIndex === 0 && cells[1]) {
      const logo2Img = cells[1].querySelector('img');
      if (logo2Img) {
        const logo2Div = document.createElement('div');
        logo2Div.className = 'footer-brand-footer__secondary--logo footer-d-inline-block';
        
        const optimizedPic = createOptimizedPicture(logo2Img.src, logo2Img.alt);
        moveInstrumentation(logo2Img, optimizedPic.querySelector('img'));
        optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-no-rendition';
        optimizedPic.querySelector('img').loading = 'lazy';
        logo2Div.append(optimizedPic);
        leftSection.append(logo2Div);
      }
    }

    // Footer Link Lists
    if (rowIndex >= 1 && cells.length === 2 && cells[0].textContent.trim() !== '' && cells[1].textContent.trim() !== '') {
      const footerListDiv = document.createElement('div');
      footerListDiv.className = 'footer-footerList-footer';
      
      const ul = document.createElement('ul');
      ul.className = 'footer-list-footer footer-d-flex footer-align-items-center footer-justify-content-center footer-align-items-md-start footer-flex-column';
      footerListDiv.append(ul);

      const link = cells[1].querySelector('a');
      if (link) {
        const li = document.createElement('li');
        li.className = 'footer-list-footer__item';

        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.textContent = cells[0].textContent.trim(); // Label from first cell
        newLink.className = 'footer-cta-analytics footer-analytics_cta_click footer-list-footer__item--link footer-d-inline-block';
        newLink.setAttribute('data-link-region', 'Footer List');
        if (link.target) newLink.target = link.target;
        li.append(newLink);
        ul.append(li);
      }

      if (footerLinkListCounter < 2) {
        navbarLeft.append(footerListDiv);
      } else {
        navbarRight.append(footerListDiv);
      }
      footerLinkListCounter++;
    }

    // Footer Social Links
    if (rowIndex >= 1 && cells.length === 2 && cells[0].querySelector('img') && cells[1].querySelector('a')) {
      const img = cells[0].querySelector('img');
      const link = cells[1].querySelector('a');

      const li = document.createElement('li');
      li.className = 'footer-brand-footer__right--item footer-d-flex footer-justify-content-center footer-align-items-center';

      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.target = '_blank';
      newLink.className = 'footer-brand-footer__right--link footer-d-flex footer-justify-content-center footer-align-items-center footer-analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.setAttribute('data-cta-label', `footer-${img.alt.toLowerCase()}`);
      newLink.setAttribute('data-platform-name', img.alt.toLowerCase());
      newLink.setAttribute('data-social-linktype', 'follow');
      
      const optimizedPic = createOptimizedPicture(img.src, img.alt);
      moveInstrumentation(img, optimizedPic.querySelector('img'));
      optimizedPic.querySelector('img').className = 'footer-object-fit-contain footer-w-100 footer-h-100 footer-no-rendition';
      optimizedPic.querySelector('img').setAttribute('aria-label', img.alt);
      optimizedPic.querySelector('img').loading = 'lazy';
      newLink.append(optimizedPic);
      li.append(newLink);
      socialMediaList.append(li);
    }

    // ITC Portal Link
    if (rowIndex === block.children.length - 2 && cells.length === 1 && cells[0].querySelector('a')) {
      const itcLink = cells[0].querySelector('a');
      const li = document.createElement('li');
      li.className = 'footer-brand-footer__left--item footer-foot_link-footer';

      const newLink = document.createElement('a');
      newLink.href = itcLink.href;
      newLink.target = '_blank';
      newLink.className = 'footer-brand-footer__left--link footer-analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.textContent = itcLink.textContent.trim();
      li.append(newLink);
      footerLinksList.append(li);
    }

    // Copyright Text
    if (rowIndex === block.children.length - 1 && cells.length === 1 && cells[0].textContent.trim() !== '') {
      copyrightSpan.textContent = cells[0].textContent.trim();
    }
  });

  block.textContent = '';
  block.append(mainContainer);
}
