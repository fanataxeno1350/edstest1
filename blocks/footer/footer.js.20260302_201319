import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Primary section
  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand--footer__primary');

  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('footer-container');

  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand--footer__primary--content', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row', 'footer-justify-content-md-between', 'footer-align-items-center');

  const leftSection = document.createElement('section');
  leftSection.classList.add('footer-brand--footer__left', 'footer-d-flex', 'footer-gap-16', 'footer-px-10', 'footer-align-items-center', 'footer-justify-content-center');

  const rightSection = document.createElement('section');
  rightSection.classList.add('footer-brand--footer__right');

  const navbar = document.createElement('nav');
  navbar.classList.add('footer-brand--footer__navbar', 'footer-d-grid', 'footer-d-md-flex');
  navbar.setAttribute('aria-label', 'footer navbar');

  const navbarLeft = document.createElement('div');
  navbarLeft.classList.add('footer-brand--footer__navbar--left', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row');

  const navbarRight = document.createElement('div');
  navbarRight.classList.add('footer-brand--footer__navbar--right', 'footer-d-flex', 'footer-flex-column', 'footer-flex-md-row');

  // Secondary section
  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand--footer__secondary');

  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('footer-container');

  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand--footer__secondary--content', 'footer-d-flex', 'footer-flex-column', 'footer-justify-content-md-between', 'footer-align-items-center');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('footer-brand--footer__right', 'footer-d-flex', 'footer-flex-column', 'footer-pb-5');

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('footer-brand--footer__left', 'footer-py-5', 'footer-d-flex', 'footer-flex-column', 'footer-gap-3');

  // Process rows from the block
  const rows = [...block.children];

  // Extract logo and secondary logo (first two cells of the first row)
  if (rows[0] && rows[0].children.length >= 2) {
    const logoCell = rows[0].children[0];
    const secondaryLogoCell = rows[0].children[1];

    const logoLink = logoCell.querySelector('a');
    const logoImg = logoCell.querySelector('img');
    if (logoLink && logoImg) {
      const newLogoLink = document.createElement('a');
      newLogoLink.href = logoLink.href;
      newLogoLink.target = '_blank';
      newLogoLink.classList.add('footer-brand--footer__logo', 'footer-d-inline-block', 'footer-analytics_cta_click');
      newLogoLink.setAttribute('data-cta-region', 'Footer');
      newLogoLink.setAttribute('aria-label', 'ITC Logo');

      const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt);
      moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
      optimizedLogoPic.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
      newLogoLink.append(optimizedLogoPic);
      leftSection.append(newLogoLink);
    }

    const secondaryLogoDiv = document.createElement('div');
    secondaryLogoDiv.classList.add('footer-brand--footer__secondary--logo', 'footer-d-inline-block');
    const secondaryLogoImg = secondaryLogoCell.querySelector('img');
    if (secondaryLogoImg) {
      const optimizedSecondaryLogoPic = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
      moveInstrumentation(secondaryLogoImg, optimizedSecondaryLogoPic.querySelector('img'));
      optimizedSecondaryLogoPic.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-no-rendition');
      secondaryLogoDiv.append(optimizedSecondaryLogoPic);
      leftSection.append(secondaryLogoDiv);
    }
    moveInstrumentation(rows[0], leftSection); // Transfer instrumentation from the first row to the left section
  }

  // Footer Nav Lists (starting from the second row)
  let navListCounter = 0;
  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    const cells = [...row.children];

    if (cells.length === 1) {
      const cell = cells[0];
      const links = cell.querySelectorAll('a');
      if (links.length > 0) {
        const footerListDiv = document.createElement('div');
        footerListDiv.classList.add('footer-footerList--footer');

        const ul = document.createElement('ul');
        ul.classList.add('footer-list--footer', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-align-items-md-start', 'footer-flex-column');

        links.forEach((link) => {
          const li = document.createElement('li');
          li.classList.add('footer-list--footer__item');

          const newLink = document.createElement('a');
          newLink.href = link.href;
          newLink.textContent = link.textContent;
          newLink.classList.add('footer-cta-analytics', 'footer-analytics_cta_click', 'footer-list--footer__item--link', 'footer-d-inline-block');
          newLink.setAttribute('data-link-region', 'Footer List');
          if (link.target) {
            newLink.target = link.target;
          }
          li.append(newLink);
          ul.append(li);
        });
        footerListDiv.append(ul);
        moveInstrumentation(row, footerListDiv); // Transfer instrumentation for each nav list row

        if (navListCounter < 2) {
          navbarLeft.append(footerListDiv);
        } else {
          navbarRight.append(footerListDiv);
        }
        navListCounter += 1;
      }
    } else if (cells.length === 2 && cells[0].querySelector('h3')) { // Social Links section
      const socialTitleCell = cells[0];
      const socialLinksCell = cells[1];

      const socialTitle = socialTitleCell.querySelector('h3');
      if (socialTitle) {
        const newSocialTitle = document.createElement('h3');
        newSocialTitle.classList.add('footer-social_media--footer--title');
        newSocialTitle.textContent = socialTitle.textContent;
        socialMediaSection.append(newSocialTitle);
      }

      const socialUl = document.createElement('ul');
      socialUl.classList.add('footer-brand--footer__right--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-px-10', 'footer-flex-wrap');

      const socialLinks = socialLinksCell.querySelectorAll('a');
      socialLinks.forEach((link) => {
        const li = document.createElement('li');
        li.classList.add('footer-brand--footer__right--item', 'footer-d-flex', 'footer-justify-content-center', 'footer-align-items-center');

        const newLink = document.createElement('a');
        newLink.href = link.href;
        newLink.target = '_blank';
        newLink.classList.add('footer-brand--footer__right--link', 'footer-d-flex', 'footer-justify-content-center', 'footer-align-items-center', 'footer-analytics_cta_click');
        newLink.setAttribute('data-cta-region', 'Footer');
        newLink.setAttribute('data-cta-label', `footer-${link.querySelector('img')?.alt || ''}`.toLowerCase());
        newLink.setAttribute('data-platform-name', link.querySelector('img')?.alt || '');
        newLink.setAttribute('data-social-linktype', 'follow');

        const img = link.querySelector('img');
        if (img) {
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          optimizedPic.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
          optimizedPic.querySelector('img').setAttribute('aria-label', img.alt);
          newLink.append(optimizedPic);
        }
        li.append(newLink);
        socialUl.append(li);
      });
      socialMediaSection.append(socialUl);
      moveInstrumentation(row, socialMediaSection); // Transfer instrumentation for social media row
    } else if (cells.length === 1 && cells[0].querySelector('a') && cells[0].querySelector('span')) { // ITC Portal Link and Copyright
      const cell = cells[0];

      const itcUl = document.createElement('ul');
      itcUl.classList.add('footer-brand--footer__left--list', 'footer-d-flex', 'footer-align-items-center', 'footer-justify-content-center', 'footer-flex-wrap');

      const itcLi = document.createElement('li');
      itcLi.classList.add('footer-brand--footer__left--item', 'footer-foot_link--footer');

      const itcLink = cell.querySelector('a');
      if (itcLink) {
        const newItcLink = document.createElement('a');
        newItcLink.href = itcLink.href;
        newItcLink.target = '_blank';
        newItcLink.classList.add('footer-brand--footer__left--link', 'footer-analytics_cta_click');
        newItcLink.setAttribute('data-cta-region', 'Footer');
        newItcLink.textContent = itcLink.textContent;
        itcLi.append(newItcLink);
      }
      itcUl.append(itcLi);
      copyrightSection.append(itcUl);

      const copyrightDiv = document.createElement('div');
      copyrightDiv.classList.add('footer-brand--footer__left--copyright', 'footer-text-center');

      const copyrightSpan = cell.querySelector('span');
      if (copyrightSpan) {
        const newCopyrightSpan = document.createElement('span');
        newCopyrightSpan.classList.add('footer-brand--footer__left--text', 'footer-text-white');
        newCopyrightSpan.textContent = copyrightSpan.textContent;
        copyrightDiv.append(newCopyrightSpan);
      }
      copyrightSection.append(copyrightDiv);
      moveInstrumentation(row, copyrightSection); // Transfer instrumentation for copyright row
    }
  }

  navbar.append(navbarLeft, navbarRight);
  rightSection.append(navbar);
  primaryContent.append(leftSection, rightSection);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  secondaryContent.append(socialMediaSection, copyrightSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  const wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add('footer-brand--footer', 'footer-w-100', 'footer-bg-boing-neutral-gray-600');
  wrapperDiv.setAttribute('data-isdoodlevariation', 'false');
  wrapperDiv.append(primarySection, secondarySection);

  block.textContent = '';
  block.classList.add('footer-container-hd--footer', 'footer-p-0');
  block.append(wrapperDiv);
}
