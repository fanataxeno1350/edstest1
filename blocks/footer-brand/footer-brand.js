import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const footerBrandContainerHd = document.createElement('section');
  footerBrandContainerHd.className = 'footer-brand-container-hd p-0';

  const footerBrandWrapper = document.createElement('div');
  footerBrandWrapper.className = 'footer-brand-wrapper w-100 bg-boing-neutral-gray-600';
  footerBrandContainerHd.append(footerBrandWrapper);

  // Primary Section
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'footer-brand-primary';
  footerBrandPrimary.style.backgroundColor = '';
  footerBrandWrapper.append(footerBrandPrimary);

  const footerBrandContainerPrimary = document.createElement('div');
  footerBrandContainerPrimary.className = 'footer-brand-container';
  footerBrandPrimary.append(footerBrandContainerPrimary);

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'footer-brand-primary--content d-flex flex-column flex-md-row justify-content-md-between align-items-center';
  footerBrandContainerPrimary.append(footerBrandPrimaryContent);

  // Primary Left Section
  const footerBrandLeftPrimary = document.createElement('section');
  footerBrandLeftPrimary.className = 'footer-brand-left d-flex gap-16 px-10 align-items-center justify-content-center';
  footerBrandPrimaryContent.append(footerBrandLeftPrimary);

  const logoLink = block.querySelector('[data-aue-prop="logo"]');
  if (logoLink) {
    const logoAnchor = logoLink.querySelector('a');
    if (logoAnchor) {
      const logoImg = logoAnchor.querySelector('img');
      const footerBrandLogo = document.createElement('a');
      footerBrandLogo.href = logoAnchor.href;
      footerBrandLogo.target = '_blank';
      footerBrandLogo.className = 'footer-brand-logo d-inline-block analytics_cta_click';
      footerBrandLogo.setAttribute('data-cta-region', 'Footer');
      footerBrandLogo.setAttribute('aria-label', logoImg ? logoImg.alt : 'Logo');
      if (logoImg) {
        footerBrandLogo.append(createOptimizedPicture(logoImg.src, logoImg.alt, false, [{ width: '100vw' }]));
        footerBrandLogo.querySelector('img').className = 'object-fit-contain w-100 h-100';
      }
      footerBrandLeftPrimary.append(footerBrandLogo);
      moveInstrumentation(logoLink, footerBrandLogo);
    }
  }

  const secondaryLogoDiv = block.querySelector('[data-aue-prop="secondaryLogo"]');
  if (secondaryLogoDiv) {
    const secondaryLogoImg = secondaryLogoDiv.querySelector('img');
    if (secondaryLogoImg) {
      const footerBrandSecondaryLogo = document.createElement('div');
      footerBrandSecondaryLogo.className = 'footer-brand-secondary--logo d-inline-block';
      footerBrandSecondaryLogo.append(createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt, false, [{ width: '100vw' }]));
      footerBrandSecondaryLogo.querySelector('img').className = 'object-fit-contain w-100';
      footerBrandLeftPrimary.append(footerBrandSecondaryLogo);
      moveInstrumentation(secondaryLogoDiv, footerBrandSecondaryLogo);
    }
  }

  // Primary Right Section (Navigation)
  const footerBrandRightPrimary = document.createElement('section');
  footerBrandRightPrimary.className = 'footer-brand-right';
  footerBrandPrimaryContent.append(footerBrandRightPrimary);

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.className = 'footer-brand-navbar d-grid d-md-flex';
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
  footerBrandRightPrimary.append(footerBrandNavbar);

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.className = 'footer-brand-navbar--left d-flex flex-column flex-md-row ';
  footerBrandNavbar.append(footerBrandNavbarLeft);

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.className = 'footer-brand-navbar--right d-flex flex-column flex-md-row';
  footerBrandNavbar.append(footerBrandNavbarRight);

  const navColumns = block.querySelectorAll('[data-aue-model="footerNavColumn"]');
  navColumns.forEach((columnNode, index) => {
    const footerListComponent = document.createElement('div');
    footerListComponent.className = 'footer-list-component';

    const footerList = document.createElement('ul');
    footerList.className = 'footer-list d-flex align-items-center justify-content-center align-items-md-start flex-column';
    footerListComponent.append(footerList);

    const links = columnNode.querySelectorAll('li');
    links.forEach((linkNode) => {
      const footerListItem = document.createElement('li');
      footerListItem.className = 'footer-list-item';
      const anchor = linkNode.querySelector('a');
      if (anchor) {
        const newAnchor = document.createElement('a');
        newAnchor.href = anchor.href;
        newAnchor.className = 'cta-analytics analytics_cta_click footer-list-item--link d-inline-block';
        newAnchor.setAttribute('data-link-region', 'Footer List');
        if (anchor.target) newAnchor.target = anchor.target;
        newAnchor.textContent = anchor.textContent;
        footerListItem.append(newAnchor);
      }
      footerList.append(footerListItem);
      moveInstrumentation(linkNode, footerListItem);
    });

    if (index % 2 === 0) {
      footerBrandNavbarLeft.append(footerListComponent);
    } else {
      footerBrandNavbarRight.append(footerListComponent);
    }
    moveInstrumentation(columnNode, footerListComponent);
  });

  // Secondary Section
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'footer-brand-secondary';
  footerBrandSecondary.style.backgroundColor = '';
  footerBrandWrapper.append(footerBrandSecondary);

  const footerBrandContainerSecondary = document.createElement('div');
  footerBrandContainerSecondary.className = 'footer-brand-container';
  footerBrandSecondary.append(footerBrandContainerSecondary);

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'footer-brand-secondary--content d-flex flex-column justify-content-md-between align-items-center';
  footerBrandContainerSecondary.append(footerBrandSecondaryContent);

  // Secondary Right Section (Social Media)
  const footerBrandRightSecondary = document.createElement('section');
  footerBrandRightSecondary.className = 'footer-brand-right d-flex flex-column pb-5';
  footerBrandSecondaryContent.append(footerBrandRightSecondary);

  const socialTitle = block.querySelector('h3');
  if (socialTitle) {
    const footerSocialMediaTitle = document.createElement('h3');
    footerSocialMediaTitle.className = 'footer-social-media--title';
    footerSocialMediaTitle.textContent = socialTitle.textContent;
    footerBrandRightSecondary.append(footerSocialMediaTitle);
    moveInstrumentation(socialTitle, footerSocialMediaTitle);
  }

  const footerBrandRightList = document.createElement('ul');
  footerBrandRightList.className = 'footer-brand-right--list d-flex align-items-center justify-content-center px-10 flex-wrap';
  footerBrandRightSecondary.append(footerBrandRightList);

  const socialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  socialLinks.forEach((socialLinkNode) => {
    const footerBrandRightItem = document.createElement('li');
    footerBrandRightItem.className = 'footer-brand-right--item d-flex justify-content-center align-items-center';

    const linkElement = socialLinkNode.querySelector('[data-aue-prop="link"] a');
    const iconElement = socialLinkNode.querySelector('[data-aue-prop="icon"] img');

    if (linkElement && iconElement) {
      const footerBrandRightLink = document.createElement('a');
      footerBrandRightLink.href = linkElement.href;
      footerBrandRightLink.target = '_blank';
      footerBrandRightLink.className = 'footer-brand-right--link d-flex justify-content-center align-items-center analytics_cta_click';
      footerBrandRightLink.setAttribute('data-cta-region', 'Footer');
      footerBrandRightLink.setAttribute('data-cta-label', `footer-${iconElement.alt.toLowerCase()}`);
      footerBrandRightLink.setAttribute('data-platform-name', iconElement.alt.toLowerCase());
      footerBrandRightLink.setAttribute('data-social-linktype', 'follow');
      footerBrandRightLink.setAttribute('aria-label', iconElement.alt);

      footerBrandRightLink.append(createOptimizedPicture(iconElement.src, iconElement.alt, false, [{ width: '100vw' }]));
      footerBrandRightLink.querySelector('img').className = 'object-fit-contain w-100 h-100';

      footerBrandRightItem.append(footerBrandRightLink);
    }
    footerBrandRightList.append(footerBrandRightItem);
    moveInstrumentation(socialLinkNode, footerBrandRightItem);
  });

  // Secondary Left Section (Portal Link and Copyright)
  const footerBrandLeftSecondary = document.createElement('section');
  footerBrandLeftSecondary.className = 'footer-brand-left py-5 d-flex flex-column gap-3';
  footerBrandSecondaryContent.append(footerBrandLeftSecondary);

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.className = 'footer-brand-left--list d-flex align-items-center justify-content-center flex-wrap';
  footerBrandLeftSecondary.append(footerBrandLeftList);

  const portalLinkDiv = block.querySelector('[data-aue-prop="portalLink"]');
  if (portalLinkDiv) {
    const portalAnchor = portalLinkDiv.querySelector('a');
    if (portalAnchor) {
      const footerBrandLeftItem = document.createElement('li');
      footerBrandLeftItem.className = 'footer-brand-left--item footer-foot_link';

      const newPortalAnchor = document.createElement('a');
      newPortalAnchor.href = portalAnchor.href;
      newPortalAnchor.target = '_blank';
      newPortalAnchor.className = 'footer-brand-left--link analytics_cta_click';
      newPortalAnchor.setAttribute('data-cta-region', 'Footer');
      newPortalAnchor.textContent = portalAnchor.textContent;

      footerBrandLeftItem.append(newPortalAnchor);
      footerBrandLeftList.append(footerBrandLeftItem);
      moveInstrumentation(portalLinkDiv, footerBrandLeftItem);
    }
  }

  const copyrightDiv = block.querySelector('[data-aue-prop="copyright"]');
  if (copyrightDiv) {
    const footerBrandLeftCopyright = document.createElement('div');
    footerBrandLeftCopyright.className = 'footer-brand-left--copyright text-center ';

    const footerBrandLeftText = document.createElement('span');
    footerBrandLeftText.className = 'footer-brand-left--text text-white';
    footerBrandLeftText.innerHTML = copyrightDiv.innerHTML;

    footerBrandLeftCopyright.append(footerBrandLeftText);
    footerBrandLeftSecondary.append(footerBrandLeftCopyright);
    moveInstrumentation(copyrightDiv, footerBrandLeftCopyright);
  }

  block.textContent = '';
  block.append(footerBrandContainerHd);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
