import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand-footer__primary');

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('footer-container');
  primarySection.append(primaryContainer);

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand-footer__primary--content', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row', 'footer-justify-content-md-between', 'footer-align-items-center');
  primaryContainer.append(primaryContent);

  const leftSection = document.createElement('section');
  leftSection.classList.add('footer-brand-footer__left', 'footer-d-flex', 'footer-gap-16', 'footer-px-10', 'footer-align-items-center', 'footer-justify-content-center');
  primaryContent.append(leftSection);

  const rightSection = document.createElement('section');
  rightSection.classList.add('footer-brand-footer__right');
  primaryContent.append(rightSection);

  const nav = document.createElement('nav');
  nav.classList.add('footer-brand-footer__navbar', 'footer-d-grid', 'footer-d-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');
  rightSection.append(nav);

  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand-footer__navbar--left', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row');
  nav.append(navLeft);

  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand-footer__navbar--right', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row');
  nav.append(navRight);

  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand-footer__secondary');

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('footer-container');
  secondarySection.append(secondaryContainer);

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand-footer__secondary--content', 'footer-d-flex', 'footer-flex-column', 'footer-justify-content-md-between', 'footer-align-items-center');
  secondaryContainer.append(secondaryContent);

  const secondaryRightSection = document.createElement('section');
  secondaryRightSection.classList.add('footer-brand-footer__right', 'footer-d-flex', 'footer-flex-column', 'footer-pb-5');
  secondaryContent.append(secondaryRightSection);

  const secondaryLeftSection = document.createElement('section');
  secondaryLeftSection.classList.add('footer-brand-footer__left', 'footer-py-5', 'footer-d-flex', 'footer-flex-column', 'footer-gap-3');
  secondaryContent.append(secondaryLeftSection);

  const navListWrappers = [];
  const socialLinkWrappers = [];

  [...block.children].forEach((row, rowIndex) => {
    if (rowIndex === 0) {
      // First row contains logos and navigation lists
      const cells = [...row.children];

      // Logo
      const logoCell = cells[0];
      const logoLink = logoCell.querySelector('a');
      const logoImg = logoCell.querySelector('img');
      if (logoLink && logoImg) {
        const newLogoLink = document.createElement('a');
        newLogoLink.href = logoLink.href;
        newLogoLink.target = '_blank';
        newLogoLink.classList.add('footer-brand-footer__logo', 'footer-d-inline-block', 'footer-analytics_cta_click');
        newLogoLink.setAttribute('data-cta-region', 'Footer');
        newLogoLink.setAttribute('aria-label', logoLink.getAttribute('aria-label') || 'Logo');
        const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt);
        moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
        newLogoLink.append(optimizedLogoPic);
        leftSection.append(newLogoLink);
      }

      // Secondary Logo
      const secondaryLogoCell = cells[1];
      const secondaryLogoImg = secondaryLogoCell.querySelector('img');
      if (secondaryLogoImg) {
        const secondaryLogoDiv = document.createElement('div');
        secondaryLogoDiv.classList.add('footer-brand-footer__secondary--logo', 'footer-d-inline-block');
        const optimizedSecondaryLogoPic = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
        moveInstrumentation(secondaryLogoImg, optimizedSecondaryLogoPic.querySelector('img'));
        secondaryLogoDiv.append(optimizedSecondaryLogoPic);
        leftSection.append(secondaryLogoDiv);
      }

      // Navigation Lists
      for (let i = 2; i < cells.length; i += 1) {
        const navListCell = cells[i];
        const ul = navListCell.querySelector('ul');
        if (ul) {
          const footerListDiv = document.createElement('div');
          footerListDiv.classList.add('footer-footerList-footer');
          const newUl = document.createElement('ul');
          newUl.classList.add('footer-list-footer', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-align-items-md-start', 'footer-flex-column');
          [...ul.children].forEach((li) => {
            const link = li.querySelector('a');
            if (link) {
              const newLi = document.createElement('li');
              moveInstrumentation(li, newLi);
              newLi.classList.add('footer-list-footer__item');
              const newLink = document.createElement('a');
              newLink.href = link.href;
              newLink.textContent = link.textContent;
              newLink.classList.add('footer-cta-analytics', 'footer-analytics_cta_click', 'footer-list-footer__item--link', 'footer-d-inline-block');
              newLink.setAttribute('data-link-region', 'Footer List');
              if (link.target) {
                newLink.target = link.target;
              }
              newLi.append(newLink);
              newUl.append(newLi);
            }
          });
          footerListDiv.append(newUl);
          navListWrappers.push(footerListDiv);
        }
      }
    } else if (rowIndex === 1) {
      // Second row contains social links, copyright, and brand link
      const cells = [...row.children];

      // Social Links
      const socialLinksCell = cells[0];
      const socialLinksUl = socialLinksCell.querySelector('ul');
      if (socialLinksUl) {
        const socialMediaTitle = document.createElement('h3');
        socialMediaTitle.classList.add('footer-social_media-footer--title');
        socialMediaTitle.textContent = 'Follow Us On';
        secondaryRightSection.append(socialMediaTitle);

        const newSocialUl = document.createElement('ul');
        newSocialUl.classList.add('footer-brand-footer__right--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-px-10', 'footer-flex-wrap');
        [...socialLinksUl.children].forEach((li) => {
          const link = li.querySelector('a');
          const img = li.querySelector('img');
          if (link && img) {
            const newLi = document.createElement('li');
            moveInstrumentation(li, newLi);
            newLi.classList.add('footer-brand-footer__right--item', 'footer-d-flex', 'footer-justify-content-center', 'footer-align-items-center');

            const newLink = document.createElement('a');
            newLink.href = link.href;
            newLink.target = '_blank';
            newLink.classList.add('footer-brand-footer__right--link', 'footer-d-flex', 'footer-justify-content-center', 'footer-align-items-center', 'footer-analytics_cta_click');
            newLink.setAttribute('data-cta-region', 'Footer');
            newLink.setAttribute('data-cta-label', link.getAttribute('data-cta-label') || `footer-${img.getAttribute('aria-label')}`);
            newLink.setAttribute('data-platform-name', link.getAttribute('data-platform-name') || img.getAttribute('aria-label'));
            newLink.setAttribute('data-social-linktype', 'follow');

            const optimizedImg = createOptimizedPicture(img.src, img.alt);
            moveInstrumentation(img, optimizedImg.querySelector('img'));
            newLink.append(optimizedImg);
            newLi.append(newLink);
            newSocialUl.append(newLi);
          }
        });
        secondaryRightSection.append(newSocialUl);
      }

      // Brand Link and Copyright
      const brandLinkCell = cells[1];
      const brandLink = brandLinkCell.querySelector('a');
      const copyrightSpan = brandLinkCell.querySelector('span');

      const brandLinkUl = document.createElement('ul');
      brandLinkUl.classList.add('footer-brand-footer__left--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-flex-wrap');

      if (brandLink) {
        const brandLinkLi = document.createElement('li');
        brandLinkLi.classList.add('footer-brand-footer__left--item', 'footer-foot_link-footer');
        const newBrandLink = document.createElement('a');
        newBrandLink.href = brandLink.href;
        newBrandLink.target = '_blank';
        newBrandLink.classList.add('footer-brand-footer__left--link', 'footer-analytics_cta_click');
        newBrandLink.setAttribute('data-cta-region', 'Footer');
        newBrandLink.textContent = brandLink.textContent;
        brandLinkLi.append(newBrandLink);
        brandLinkUl.append(brandLinkLi);
      }
      secondaryLeftSection.append(brandLinkUl);

      if (copyrightSpan) {
        const copyrightDiv = document.createElement('div');
        copyrightDiv.classList.add('footer-brand-footer__left--copyright', 'footer-text-center');
        const newCopyrightSpan = document.createElement('span');
        newCopyrightSpan.classList.add('footer-brand-footer__left--text', 'footer-text-white');
        newCopyrightSpan.textContent = copyrightSpan.textContent.trim();
        copyrightDiv.append(newCopyrightSpan);
        secondaryLeftSection.append(copyrightDiv);
      }
    }
  });

  // Distribute navigation lists into left and right nav sections
  navListWrappers.forEach((list, index) => {
    if (index < 2) {
      navLeft.append(list);
    } else {
      navRight.append(list);
    }
  });

  block.textContent = '';
  block.classList.add('footer-container-hd-footer', 'footer-p-0');
  const brandFooterDiv = document.createElement('div');
  brandFooterDiv.classList.add('footer-brand-footer', 'footer-w-100', 'footer-bg-boing-neutral-gray-600');
  brandFooterDiv.setAttribute('data-isdoodlevariation', 'false');
  block.append(brandFooterDiv);

  brandFooterDiv.append(primarySection);
  brandFooterDiv.append(secondarySection);
}
