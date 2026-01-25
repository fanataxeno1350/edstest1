import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerSection = document.createElement('footer');
  footerSection.className = 'footer-section';

  const footerContainer = document.createElement('div');
  footerContainer.className = 'footer-container';
  footerSection.append(footerContainer);

  const footerRow = document.createElement('div');
  footerRow.className = 'footer-row';
  footerContainer.append(footerRow);

  // Footer Column Left
  const footerColLeft = document.createElement('div');
  footerColLeft.className = 'footer-col-left';
  footerRow.append(footerColLeft);

  const footerLogos = document.createElement('div');
  footerLogos.className = 'footer-logos';
  footerColLeft.append(footerLogos);

  // ITC Logo
  const itcLogoDiv = document.createElement('div');
  itcLogoDiv.className = 'footer-itc-logo';
  footerLogos.append(itcLogoDiv);

  const logoImageDiv = document.createElement('div');
  logoImageDiv.className = 'logo-image';
  itcLogoDiv.append(logoImageDiv);

  const itcLogoLinkWrapper = document.createElement('a');
  itcLogoLinkWrapper.className = 'cmp-image__link';
  itcLogoLinkWrapper.setAttribute('data-aue-prop', 'itcLogoLink');
  logoImageDiv.append(itcLogoLinkWrapper);

  const itcLogo = block.querySelector('[data-aue-prop="itcLogo"]');
  if (itcLogo) {
    const itcImg = itcLogo.querySelector('img');
    if (itcImg) {
      const itcOptimizedPicture = createOptimizedPicture(itcImg.src, itcImg.alt);
      itcLogoLinkWrapper.append(itcOptimizedPicture);
    }
    const itcLink = itcLogo.querySelector('a');
    if (itcLink) {
      itcLogoLinkWrapper.href = itcLink.href;
      if (itcLink.target) {
        itcLogoLinkWrapper.target = itcLink.target;
      }
    }
    moveInstrumentation(itcLogo, logoImageDiv);
  }

  // FSSAI Logo
  const fssaiLogoDiv = document.createElement('div');
  fssaiLogoDiv.className = 'footer-fssai-logo';
  footerLogos.append(fssaiLogoDiv);

  const fssaiLogoImageDiv = document.createElement('div');
  fssaiLogoImageDiv.className = 'fssailogo-image';
  fssaiLogoDiv.append(fssaiLogoImageDiv);

  const fssaiLogo = block.querySelector('[data-aue-prop="fssaiLogo"]');
  if (fssaiLogo) {
    const fssaiImg = fssaiLogo.querySelector('img');
    if (fssaiImg) {
      const fssaiOptimizedPicture = createOptimizedPicture(fssaiImg.src, fssaiImg.alt);
      fssaiLogoImageDiv.append(fssaiOptimizedPicture);
    }
    moveInstrumentation(fssaiLogo, fssaiLogoImageDiv);
  }

  // Footer Page Links Wrapper (empty in provided HTML, but kept for structure)
  const footerPageLinksWrapper = document.createElement('div');
  footerPageLinksWrapper.className = 'footer-page-links-wrapper';
  footerRow.append(footerPageLinksWrapper);

  const list1Container = document.createElement('div');
  list1Container.className = 'list-1-container';
  footerPageLinksWrapper.append(list1Container);

  const list2Container = document.createElement('div');
  list2Container.className = 'list-2-container';
  footerPageLinksWrapper.append(list2Container);

  // Footer Link Left Section
  const footerLinkLeftSection = document.createElement('div');
  footerLinkLeftSection.className = 'footer-link-left-section';
  footerRow.append(footerLinkLeftSection);

  const footerListsContainer = document.createElement('div');
  footerListsContainer.className = 'footer-lists-container';
  footerLinkLeftSection.append(footerListsContainer);

  // Footer Links (list-4-container)
  const list4Container = document.createElement('div');
  list4Container.className = 'list-4-container';
  footerListsContainer.append(list4Container);

  const footerLinksUl = document.createElement('ul');
  list4Container.append(footerLinksUl);

  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"][data-aue-orderevenumber]');
  footerLinks.forEach((linkNode) => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.className = 'cmp-list__item-link';

    const url = linkNode.querySelector('[data-aue-prop="url"]');
    if (url) {
      link.href = url.textContent.trim();
    }

    const text = linkNode.querySelector('[data-aue-prop="text"]');
    if (text) {
      link.textContent = text.textContent.trim();
    }

    link.target = '_blank';
    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.className = 'cmp-link__screen-reader-only';
    screenReaderOnly.textContent = 'opens in a new tab';
    link.append(screenReaderOnly);

    li.append(link);
    footerLinksUl.append(li);
    moveInstrumentation(linkNode, li);
  });

  // Footer List Links (list-3-container)
  const list3Container = document.createElement('div');
  list3Container.className = 'list-3-container';
  footerListsContainer.append(list3Container);

  const footerListLinksUl = document.createElement('ul');
  footerListLinksUl.className = 'cmp-list';
  list3Container.append(footerListLinksUl);

  const footerListLinks = block.querySelectorAll('[data-aue-model="footerLink"]:not([data-aue-orderevenumber])');
  footerListLinks.forEach((linkNode) => {
    const li = document.createElement('li');
    li.className = 'cmp-list__item';

    const link = document.createElement('a');
    link.className = 'cmp-list__item-link';

    const url = linkNode.querySelector('[data-aue-prop="url"]');
    if (url) {
      link.href = url.textContent.trim();
    }

    const textSpan = document.createElement('span');
    textSpan.className = 'cmp-list__item-title';
    const text = linkNode.querySelector('[data-aue-prop="text"]');
    if (text) {
      textSpan.textContent = text.textContent.trim();
    }
    link.append(textSpan);

    li.append(link);
    footerListLinksUl.append(li);
    moveInstrumentation(linkNode, li);
  });

  // Contact Details
  const contactDetails = document.createElement('div');
  contactDetails.className = 'contact-details';
  footerLinkLeftSection.append(contactDetails);

  const grievanceTitle = block.querySelector('[data-aue-prop="grievanceTitle"]');
  if (grievanceTitle) {
    const h5 = document.createElement('h5');
    h5.className = 'contact-details__title-text';
    h5.textContent = grievanceTitle.textContent.trim();
    contactDetails.append(h5);
    moveInstrumentation(grievanceTitle, h5);
  }

  const grievanceName = block.querySelector('[data-aue-prop="grievanceName"]');
  if (grievanceName) {
    const p = document.createElement('p');
    p.className = 'contact-details__description-text';
    p.textContent = grievanceName.textContent.trim();
    contactDetails.append(p);
    moveInstrumentation(grievanceName, p);
  }

  const grievanceContact = block.querySelector('[data-aue-prop="grievanceContact"]');
  if (grievanceContact) {
    const p = document.createElement('p');
    p.className = 'contact-details__description-text';
    p.textContent = grievanceContact.textContent.trim();
    contactDetails.append(p);
    moveInstrumentation(grievanceContact, p);
  }

  const grievanceTime = block.querySelector('[data-aue-prop="grievanceTime"]');
  if (grievanceTime) {
    const p = document.createElement('p');
    p.className = 'contact-details__description-text';
    p.textContent = grievanceTime.textContent.trim();
    contactDetails.append(p);
    moveInstrumentation(grievanceTime, p);
  }

  // Footer Column Right
  const footerColRight = document.createElement('div');
  footerColRight.className = 'footer-col-right';
  footerRow.append(footerColRight);

  const socialIconsWrapper = document.createElement('div');
  footerColRight.append(socialIconsWrapper);

  const socialIcons = block.querySelectorAll('[data-aue-model="socialIcon"]');
  socialIcons.forEach((socialIconNode) => {
    const socialIconsList = document.createElement('ul');
    socialIconsList.className = 'social-icons-list';

    const li = document.createElement('li');
    const link = document.createElement('a');
    link.id = 'socialIcons';

    const url = socialIconNode.querySelector('[data-aue-prop="url"]');
    if (url) {
      link.href = url.textContent.trim();
    }
    link.target = '_blank';

    const icon = socialIconNode.querySelector('[data-aue-prop="icon"]');
    if (icon) {
      const img = icon.querySelector('img');
      if (img) {
        const optimizedPicture = createOptimizedPicture(img.src, img.alt);
        link.append(optimizedPicture);
      }
    }

    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.className = 'cmp-link__screen-reader-only';
    screenReaderOnly.textContent = 'opens in a new tab';
    link.append(screenReaderOnly);

    li.append(link);
    socialIconsList.append(li);
    socialIconsWrapper.append(socialIconsList);
    moveInstrumentation(socialIconNode, socialIconsList);
  });

  const copyright = block.querySelector('[data-aue-prop="copyright"]');
  if (copyright) {
    const span = document.createElement('span');
    span.className = 'footer-copyright';
    span.textContent = copyright.textContent.trim();
    footerColRight.append(span);
    moveInstrumentation(copyright, span);
  }

  // Footer Secondary Section
  const footerSecondarySection = document.createElement('footer');
  footerSecondarySection.className = 'footer-secondary-section';

  const footerSecondaryContainer = document.createElement('ul');
  footerSecondaryContainer.className = 'footer-secondary-container';
  footerSecondarySection.append(footerSecondaryContainer);

  const footerSecondaryLinks = block.querySelectorAll('[data-aue-model="footerLink"][data-aue-orderevenumber]');
  footerSecondaryLinks.forEach((linkNode) => {
    const li = document.createElement('li');
    li.className = 'footer-secondary-lists';
    const link = document.createElement('a');
    link.className = 'footer-links';

    const url = linkNode.querySelector('[data-aue-prop="url"]');
    if (url) {
      link.href = url.textContent.trim();
    }

    const text = linkNode.querySelector('[data-aue-prop="text"]');
    if (text) {
      link.textContent = text.textContent.trim();
    }

    link.target = '_blank';
    const screenReaderOnly = document.createElement('span');
    screenReaderOnly.className = 'cmp-link__screen-reader-only';
    screenReaderOnly.textContent = 'opens in a new tab';
    link.append(screenReaderOnly);

    li.append(link);
    footerSecondaryContainer.append(li);
    moveInstrumentation(linkNode, li);
  });

  block.textContent = '';
  block.append(footerSection, footerSecondarySection);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
