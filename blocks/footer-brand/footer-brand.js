import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandDiv = document.createElement('div');
  footerBrandDiv.classList.add('footer-brand', 'w-100', 'bg-boing-neutral-gray-600');

  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand-primary');

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('container');

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand-primary--content', 'd-flex', 'flex-column', 'flex-md-row', 'justify-content-md-between', 'align-items-center');

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand-left', 'd-flex', 'gap-16', 'px-10', 'align-items-center', 'justify-content-center');

  const logo1Wrapper = document.querySelector('[data-aue-prop="logo1"]');
  if (logo1Wrapper) {
    const logo1Link = logo1Wrapper.querySelector('a');
    const logo1Img = logo1Wrapper.querySelector('img');
    if (logo1Link && logo1Img) {
      const picture = createOptimizedPicture(logo1Img.src, logo1Img.alt);
      const logo1Div = document.createElement('a');
      logo1Div.href = logo1Link.href;
      logo1Div.target = logo1Link.target;
      logo1Div.classList.add('footer-brand-logo', 'd-inline-block', 'analytics_cta_click');
      logo1Div.setAttribute('data-cta-region', 'Footer');
      logo1Div.setAttribute('aria-label', logo1Link.getAttribute('aria-label'));
      logo1Div.append(picture);
      footerBrandLeft.append(logo1Div);
      moveInstrumentation(logo1Wrapper, logo1Div);
    }
  }

  const logo2Wrapper = document.querySelector('[data-aue-prop="logo2"]');
  if (logo2Wrapper) {
    const logo2Img = logo2Wrapper.querySelector('img');
    if (logo2Img) {
      const picture = createOptimizedPicture(logo2Img.src, logo2Img.alt);
      const logo2Div = document.createElement('div');
      logo2Div.classList.add('footer-brand-secondary--logo', 'd-inline-block');
      logo2Div.append(picture);
      footerBrandLeft.append(logo2Div);
      moveInstrumentation(logo2Wrapper, logo2Div);
    }
  }

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand-right');

  const footerBrandNavbar = document.createElement('nav');
  footerBrandNavbar.classList.add('footer-brand-navbar', 'd-grid', 'd-md-flex');
  footerBrandNavbar.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavbarLeft = document.createElement('div');
  footerBrandNavbarLeft.classList.add('footer-brand-navbar--left', 'd-flex', 'flex-column', 'flex-md-row');

  const footerLinkGroups = block.querySelectorAll('[data-aue-model="footerLinkGroup"]');
  footerLinkGroups.forEach((groupNode) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');

    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

    const links = groupNode.querySelectorAll('[data-aue-model="footerLink"]');
    links.forEach((linkNode) => {
      const li = document.createElement('li');
      li.classList.add('footer-list-item');

      const a = document.createElement('a');
      a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item--link', 'd-inline-block');
      a.setAttribute('data-link-region', 'Footer List');

      const label = linkNode.querySelector('[data-aue-prop="label"]');
      const url = linkNode.querySelector('[data-aue-prop="url"]');

      if (label && url) {
        a.textContent = label.textContent;
        a.href = url.textContent;
        if (url.textContent.startsWith('http')) {
          a.target = '_blank';
        }
        li.append(a);
        moveInstrumentation(label, a);
        moveInstrumentation(url, a);
      }
      ul.append(li);
      moveInstrumentation(linkNode, li);
    });
    footerListDiv.append(ul);
    footerBrandNavbarLeft.append(footerListDiv);
    moveInstrumentation(groupNode, footerListDiv);
  });

  const footerBrandNavbarRight = document.createElement('div');
  footerBrandNavbarRight.classList.add('footer-brand-navbar--right', 'd-flex', 'flex-column', 'flex-md-row');
  // Assuming the authored HTML structure for footerLinkGroups implies two groups for left and two for right
  // This part needs adjustment if the authored HTML provides more specific grouping for left/right
  // For now, we'll just append the remaining groups to the right if any
  const remainingLinkGroups = Array.from(footerLinkGroups).slice(2); // Get the 3rd and 4th groups
  remainingLinkGroups.forEach((groupNode) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.classList.add('footerList');

    const ul = document.createElement('ul');
    ul.classList.add('footer-list', 'd-flex', 'align-items-center', 'justify-content-center', 'align-items-md-start', 'flex-column');

    const links = groupNode.querySelectorAll('[data-aue-model="footerLink"]');
    links.forEach((linkNode) => {
      const li = document.createElement('li');
      li.classList.add('footer-list-item');

      const a = document.createElement('a');
      a.classList.add('cta-analytics', 'analytics_cta_click', 'footer-list-item--link', 'd-inline-block');
      a.setAttribute('data-link-region', 'Footer List');

      const label = linkNode.querySelector('[data-aue-prop="label"]');
      const url = linkNode.querySelector('[data-aue-prop="url"]');

      if (label && url) {
        a.textContent = label.textContent;
        a.href = url.textContent;
        if (url.textContent.startsWith('http')) {
          a.target = '_blank';
        }
        li.append(a);
        moveInstrumentation(label, a);
        moveInstrumentation(url, a);
      }
      ul.append(li);
      moveInstrumentation(linkNode, li);
    });
    footerListDiv.append(ul);
    footerBrandNavbarRight.append(footerListDiv);
    moveInstrumentation(groupNode, footerListDiv);
  });

  footerBrandNavbar.append(footerBrandNavbarLeft, footerBrandNavbarRight);
  footerBrandRight.append(footerBrandNavbar);

  primaryContent.append(footerBrandLeft, footerBrandRight);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand-secondary');

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('container');

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand-secondary--content', 'd-flex', 'flex-column', 'justify-content-md-between', 'align-items-center');

  const secondaryFooterBrandRight = document.createElement('section');
  secondaryFooterBrandRight.classList.add('footer-brand-right', 'd-flex', 'flex-column', 'pb-5');

  const followUsTitle = document.createElement('h3');
  followUsTitle.classList.add('footer-social_media--title');
  followUsTitle.textContent = 'Follow Us On';
  secondaryFooterBrandRight.append(followUsTitle);

  const socialLinksList = document.createElement('ul');
  socialLinksList.classList.add('footer-brand-right--list', 'd-flex', 'align-items-center', 'justify-content-center', 'px-10', 'flex-wrap');

  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  socialLinks.forEach((socialLinkNode) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand-right--item', 'd-flex', 'justify-content-center', 'align-items-center');

    const a = document.createElement('a');
    a.classList.add('footer-brand-right--link', 'd-flex', 'justify-content-center', 'align-items-center', 'analytics_cta_click');
    a.setAttribute('data-cta-region', 'Footer');
    a.target = '_blank';
    a.setAttribute('data-social-linktype', 'follow');

    const platform = socialLinkNode.querySelector('[data-aue-prop="platform"]');
    const url = socialLinkNode.querySelector('[data-aue-prop="url"]');
    const icon = socialLinkNode.querySelector('[data-aue-prop="icon"]');

    if (platform && url && icon) {
      a.setAttribute('data-cta-label', `footer-${platform.textContent.toLowerCase()}`);
      a.setAttribute('data-platform-name', platform.textContent.toLowerCase());
      a.href = url.textContent;

      const picture = createOptimizedPicture(icon.src, icon.alt || platform.textContent);
      picture.querySelector('img').classList.add('object-fit-contain', 'w-100', 'h-100', 'no-rendition');
      picture.querySelector('img').setAttribute('aria-label', platform.textContent.toLowerCase());
      a.append(picture);
      moveInstrumentation(icon, a);
      moveInstrumentation(platform, a);
      moveInstrumentation(url, a);
    }
    li.append(a);
    socialLinksList.append(li);
    moveInstrumentation(socialLinkNode, li);
  });
  secondaryFooterBrandRight.append(socialLinksList);

  const secondaryFooterBrandLeft = document.createElement('section');
  secondaryFooterBrandLeft.classList.add('footer-brand-left', 'py-5', 'd-flex', 'flex-column', 'gap-3');

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.classList.add('footer-brand-left--list', 'd-flex', 'align-items-center', 'justify-content-center', 'flex-wrap');

  const footerBrandLinks = block.querySelectorAll('[data-aue-model="footerLink"][data-aue-resource="footerBrandLinks"]');
  footerBrandLinks.forEach((linkNode) => {
    const li = document.createElement('li');
    li.classList.add('footer-brand-left--item', 'foot_link');

    const a = document.createElement('a');
    a.classList.add('footer-brand-left--link', 'analytics_cta_click');
    a.setAttribute('data-cta-region', 'Footer');

    const label = linkNode.querySelector('[data-aue-prop="label"]');
    const url = linkNode.querySelector('[data-aue-prop="url"]');

    if (label && url) {
      a.textContent = label.textContent;
      a.href = url.textContent;
      if (url.textContent.startsWith('http')) {
        a.target = '_blank';
      }
      li.append(a);
      moveInstrumentation(label, a);
      moveInstrumentation(url, a);
    }
    footerBrandLeftList.append(li);
    moveInstrumentation(linkNode, li);
  });
  secondaryFooterBrandLeft.append(footerBrandLeftList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand-left--copyright', 'text-center');

  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand-left--text', 'text-white');

  const copyrightText = block.querySelector('[data-aue-prop="copyrightText"]');
  if (copyrightText) {
    copyrightSpan.textContent = copyrightText.textContent.trim();
    copyrightDiv.append(copyrightSpan);
    moveInstrumentation(copyrightText, copyrightSpan);
  }
  secondaryFooterBrandLeft.append(copyrightDiv);

  secondaryContent.append(secondaryFooterBrandRight, secondaryFooterBrandLeft);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  footerBrandDiv.append(primarySection, secondarySection);

  block.textContent = '';
  block.append(footerBrandDiv);
  block.className = 'footer-brand block';
  block.dataset.blockStatus = 'loaded';
}
