import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.className = 'footer-brand-wrapper footer-brand-bg-boing-neutral-gray-600';
  footerBrandWrapper.setAttribute('data-isdoodlevariation', 'false');
  moveInstrumentation(block.children[0], footerBrandWrapper); // Transfer instrumentation from the first row

  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand-primary-section';
  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'footer-brand-container';
  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand-primary-content footer-brand-d-flex footer-brand-flex-column footer-brand-flex-md-row footer-brand-justify-content-md-between footer-brand-align-items-center';

  const leftSection = document.createElement('section');
  leftSection.className = 'footer-brand-left-section footer-brand-d-flex footer-brand-gap-16 footer-brand-px-10 footer-brand-align-items-center footer-brand-justify-content-center';

  // Primary Logo
  const primaryLogoCell = block.children[0]?.children[0];
  if (primaryLogoCell) {
    const primaryLink = primaryLogoCell.querySelector('a');
    const primaryImg = primaryLogoCell.querySelector('img');
    if (primaryLink && primaryImg) {
      const newLink = document.createElement('a');
      newLink.href = primaryLink.href;
      newLink.target = primaryLink.target;
      newLink.className = 'footer-brand-logo footer-brand-d-inline-block footer-brand-analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      newLink.setAttribute('aria-label', 'ITC Logo');

      const optimizedPic = createOptimizedPicture(primaryImg.src, primaryImg.alt);
      optimizedPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-brand-w-100 footer-brand-h-100 footer-brand-no-rendition';
      optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(primaryImg, optimizedPic.querySelector('img'));
      newLink.append(optimizedPic);
      leftSection.append(newLink);
    }
  }

  // Secondary Logo
  const secondaryLogoCell = block.children[0]?.children[1];
  if (secondaryLogoCell) {
    const secondaryImg = secondaryLogoCell.querySelector('img');
    if (secondaryImg) {
      const secondaryLogoDiv = document.createElement('div');
      secondaryLogoDiv.className = 'footer-brand-secondary-logo footer-brand-d-inline-block';
      const optimizedPic = createOptimizedPicture(secondaryImg.src, secondaryImg.alt);
      optimizedPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-brand-w-100 footer-brand-no-rendition';
      optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
      moveInstrumentation(secondaryImg, optimizedPic.querySelector('img'));
      secondaryLogoDiv.append(optimizedPic);
      leftSection.append(secondaryLogoDiv);
    }
  }

  const rightSection = document.createElement('section');
  rightSection.className = 'footer-brand-right-section';
  const nav = document.createElement('nav');
  nav.className = 'footer-brand-navbar footer-brand-d-grid footer-brand-d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');

  const navbarLeft = document.createElement('div');
  navbarLeft.className = 'footer-brand-navbar-left footer-brand-d-flex footer-brand-flex-column footer-brand-flex-md-row';
  const navbarRight = document.createElement('div');
  navbarRight.className = 'footer-brand-navbar-right footer-brand-d-flex footer-brand-flex-column footer-brand-flex-md-row';

  // Navigation Groups
  const navGroupsCell = block.children[0]?.children[2];
  if (navGroupsCell) {
    const navGroupElements = [...navGroupsCell.children];
    navGroupElements.forEach((group, index) => {
      const footerListComponent = document.createElement('div');
      footerListComponent.className = 'footerList-component';
      const ul = document.createElement('ul');
      ul.className = 'footer-list-component-list footer-brand-d-flex footer-brand-align-items-center footer-brand-justify-content-center footer-brand-align-items-md-start footer-brand-flex-column';
      moveInstrumentation(group, ul);

      [...group.children].forEach((linkItem) => {
        const li = document.createElement('li');
        li.className = 'footer-list-component-item';
        moveInstrumentation(linkItem, li);
        const link = linkItem.querySelector('a');
        if (link) {
          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          newLink.className = 'footer-list-component-link cta-analytics footer-brand-analytics_cta_click footer-brand-d-inline-block';
          newLink.setAttribute('data-link-region', 'Footer List');
          if (link.target) {
            newLink.target = link.target;
          }
          li.append(newLink);
        }
        ul.append(li);
      });
      footerListComponent.append(ul);
      if (index < 2) {
        navbarLeft.append(footerListComponent);
      } else {
        navbarRight.append(footerListComponent);
      }
    });
  }

  nav.append(navbarLeft, navbarRight);
  rightSection.append(nav);
  primaryContent.append(leftSection, rightSection);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);
  footerBrandWrapper.append(primarySection);

  // Secondary Section (Social Links and Copyright)
  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand-secondary-section';
  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'footer-brand-container';
  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand-secondary-content footer-brand-d-flex footer-brand-flex-column footer-brand-justify-content-md-between footer-brand-align-items-center';

  const socialRightSection = document.createElement('section');
  socialRightSection.className = 'footer-brand-right-section footer-brand-d-flex footer-brand-flex-column footer-brand-pb-5';
  const socialTitle = document.createElement('h3');
  socialTitle.className = 'footer-brand-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  socialRightSection.append(socialTitle);

  const socialUl = document.createElement('ul');
  socialUl.className = 'footer-brand-right-list footer-brand-d-flex footer-brand-align-items-center footer-brand-justify-content-center footer-brand-px-10 footer-brand-flex-wrap';

  // Social Links
  const socialLinksCell = block.children[0]?.children[3];
  if (socialLinksCell) {
    [...socialLinksCell.children].forEach((socialLinkItem) => {
      const li = document.createElement('li');
      li.className = 'footer-brand-right-item footer-brand-d-flex footer-brand-justify-content-center footer-brand-align-items-center';
      moveInstrumentation(socialLinkItem, li);
      const link = socialLinkItem.querySelector('a');
      const img = socialLinkItem.querySelector('img');
      if (link && img) {
        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.target = link.target;
        newLink.className = 'footer-brand-right-link footer-brand-d-flex footer-brand-justify-content-center footer-brand-align-items-center footer-brand-analytics_cta_click';
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.setAttribute('data-cta-label', `footer-${img.alt.toLowerCase()}`);
        newLink.setAttribute('data-platform-name', img.alt.toLowerCase());
        newLink.setAttribute('data-social-linktype', 'follow');

        const optimizedPic = createOptimizedPicture(img.src, img.alt);
        optimizedPic.querySelector('img').className = 'footer-brand-object-fit-contain footer-brand-w-100 footer-brand-h-100 footer-brand-no-rendition';
        optimizedPic.querySelector('img').setAttribute('loading', 'lazy');
        optimizedPic.querySelector('img').setAttribute('aria-label', img.alt.toLowerCase());
        moveInstrumentation(img, optimizedPic.querySelector('img'));
        newLink.append(optimizedPic);
        li.append(newLink);
      }
      socialUl.append(li);
    });
  }
  socialRightSection.append(socialUl);

  const copyrightLeftSection = document.createElement('section');
  copyrightLeftSection.className = 'footer-brand-left-section footer-brand-py-5 footer-brand-d-flex footer-brand-flex-column footer-brand-gap-3';

  const copyrightUl = document.createElement('ul');
  copyrightUl.className = 'footer-brand-left-list footer-brand-d-flex footer-brand-align-items-center footer-brand-justify-content-center footer-brand-flex-wrap';

  // Portal Link
  const portalLinkCell = block.children[0]?.children[4];
  if (portalLinkCell) {
    const portalLink = portalLinkCell.querySelector('a');
    if (portalLink) {
      const li = document.createElement('li');
      li.className = 'footer-brand-left-item footer-brand-foot_link';
      moveInstrumentation(portalLinkCell, li);
      const newLink = document.createElement('a');
      newLink.href = portalLink.href;
      newLink.target = portalLink.target;
      newLink.textContent = portalLink.textContent;
      newLink.className = 'footer-brand-left-link footer-brand-analytics_cta_click';
      newLink.setAttribute('data-cta-region', 'Footer');
      li.append(newLink);
      copyrightUl.append(li);
    }
  }
  copyrightLeftSection.append(copyrightUl);

  // Copyright
  const copyrightCell = block.children[0]?.children[5];
  if (copyrightCell) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'footer-brand-left-copyright footer-brand-text-center';
    const span = document.createElement('span');
    span.className = 'footer-brand-left-text footer-brand-text-white';
    span.textContent = copyrightCell.textContent.trim();
    moveInstrumentation(copyrightCell, span);
    copyrightDiv.append(span);
    copyrightLeftSection.append(copyrightDiv);
  }

  secondaryContent.append(socialRightSection, copyrightLeftSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);
  footerBrandWrapper.append(secondarySection);

  block.textContent = '';
  block.append(footerBrandWrapper);
}
