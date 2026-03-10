import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // Primary Footer Section
  const primarySection = document.createElement('section');
  primarySection.classList.add('footer-brand__primary');
  const primaryContainer = document.createElement('div');
  primaryContainer.classList.add('footer-container');
  const primaryContent = document.createElement('div');
  primaryContent.classList.add('footer-brand__primary--content', 'footer-brand__primary--content-d-flex', 'footer-brand__primary--content-flex-column', 'footer-brand__primary--content-flex-md-row', 'footer-brand__primary--content-justify-content-md-between', 'footer-brand__primary--content-align-items-center');

  const leftBrandSection = document.createElement('section');
  leftBrandSection.classList.add('footer-brand__left', 'footer-brand__left-d-flex', 'footer-brand__left-gap-16', 'footer-brand__left-px-10', 'footer-brand__left-align-items-center', 'footer-brand__left-justify-content-center');

  const rightBrandSection = document.createElement('section');
  rightBrandSection.classList.add('footer-brand__right');
  const nav = document.createElement('nav');
  nav.classList.add('footer-brand__navbar', 'footer-brand__navbar-d-grid', 'footer-brand__navbar-d-md-flex');
  nav.setAttribute('aria-label', 'footer navbar');
  const navLeft = document.createElement('div');
  navLeft.classList.add('footer-brand__navbar--left', 'footer-brand__navbar--left-d-flex', 'footer-brand__navbar--left-flex-column', 'footer-brand__navbar--left-flex-md-row');
  const navRight = document.createElement('div');
  navRight.classList.add('footer-brand__navbar--right', 'footer-brand__navbar--right-d-flex', 'footer-brand__navbar--right-flex-column', 'footer-brand__navbar--right-flex-md-row');

  // Secondary Footer Section
  const secondarySection = document.createElement('section');
  secondarySection.classList.add('footer-brand__secondary');
  const secondaryContainer = document.createElement('div');
  secondaryContainer.classList.add('footer-container');
  const secondaryContent = document.createElement('div');
  secondaryContent.classList.add('footer-brand__secondary--content', 'footer-brand__secondary--content-d-flex', 'footer-brand__secondary--content-flex-column', 'footer-brand__secondary--content-justify-content-md-between', 'footer-brand__secondary--content-align-items-center');

  const socialMediaSection = document.createElement('section');
  socialMediaSection.classList.add('footer-brand__right', 'footer-brand__right-d-flex', 'footer-brand__right-flex-column', 'footer-brand__right-pb-5');
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.classList.add('footer-social_media--title');
  socialMediaTitle.textContent = 'Follow Us On';
  const socialMediaList = document.createElement('ul');
  socialMediaList.classList.add('footer-brand__right--list', 'footer-brand__right--list-d-flex', 'footer-brand__right--list-align-items-center', 'footer-brand__right--list-justify-content-center', 'footer-brand__right--list-px-10', 'footer-brand__right--list-flex-wrap');

  const copyrightSection = document.createElement('section');
  copyrightSection.classList.add('footer-brand__left', 'footer-brand__left-py-5', 'footer-brand__left-d-flex', 'footer-brand__left-flex-column', 'footer-brand__left-gap-3');
  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand__left--list', 'footer-brand__left--list-d-flex', 'footer-brand__left--list-align-items-center', 'footer-brand__left--list-justify-content-center', 'footer-brand__left--list-flex-wrap');
  const copyrightDiv = document.createElement('div');
  copyrightDiv.classList.add('footer-brand__left--copyright', 'footer-brand__left--copyright-text-center');
  const copyrightSpan = document.createElement('span');
  copyrightSpan.classList.add('footer-brand__left--text', 'footer-brand__left--text-text-white');

  let linkGroupCounter = 0;
  let socialLinkCounter = 0;

  [...block.children].forEach((row, rowIndex) => {
    moveInstrumentation(row, row);
    const cells = [...row.children];

    // Logo Image
    if (rowIndex === 0) {
      const logoLink = cells[0].querySelector('a');
      const logoImg = cells[0].querySelector('img');
      if (logoLink && logoImg) {
        const newLogoLink = document.createElement('a');
        newLogoLink.href = logoLink.href;
        newLogoLink.target = '_blank';
        newLogoLink.classList.add('footer-brand__logo', 'footer-brand__logo-d-inline-block', 'footer-brand__logo-analytics_cta_click');
        newLogoLink.setAttribute('data-cta-region', 'Footer');
        newLogoLink.setAttribute('aria-label', 'ITC Logo');
        const optimizedLogoPic = createOptimizedPicture(logoImg.src, logoImg.alt);
        moveInstrumentation(logoImg, optimizedLogoPic.querySelector('img'));
        optimizedLogoPic.querySelector('img').classList.add('footer-brand__logo-object-fit-contain', 'footer-brand__logo-w-100', 'footer-brand__logo-h-100', 'footer-brand__logo-no-rendition');
        newLogoLink.append(optimizedLogoPic);
        leftBrandSection.append(newLogoLink);
      }

      // Secondary Logo Image
      const secondaryLogoDiv = cells[1].querySelector('div');
      const secondaryLogoImg = cells[1].querySelector('img');
      if (secondaryLogoDiv && secondaryLogoImg) {
        const newSecondaryLogoDiv = document.createElement('div');
        newSecondaryLogoDiv.classList.add('footer-brand__secondary--logo', 'footer-brand__secondary--logo-d-inline-block');
        const optimizedSecondaryLogoPic = createOptimizedPicture(secondaryLogoImg.src, secondaryLogoImg.alt);
        moveInstrumentation(secondaryLogoImg, optimizedSecondaryLogoPic.querySelector('img'));
        optimizedSecondaryLogoPic.querySelector('img').classList.add('footer-brand__secondary--logo-object-fit-contain', 'footer-brand__secondary--logo-w-100', 'footer-brand__secondary--logo-no-rendition');
        newSecondaryLogoDiv.append(optimizedSecondaryLogoPic);
        leftBrandSection.append(newSecondaryLogoDiv);
      }
    }

    // Link Groups
    if (cells[0].textContent.trim() === 'Footer Link Group') {
      const linkGroupDiv = document.createElement('div');
      linkGroupDiv.classList.add('footer-footerList');
      const ul = document.createElement('ul');
      ul.classList.add('footer-list', 'footer-list-d-flex', 'footer-list-align-items-center', 'footer-list-justify-content-center', 'footer-list-align-items-md-start', 'footer-list-flex-column');

      [...cells[1].children].forEach((linkRow) => {
        const linkTitle = linkRow.children[0].textContent.trim();
        const linkUrl = linkRow.children[1].querySelector('a')?.href || linkRow.children[1].textContent.trim();

        if (linkTitle && linkUrl) {
          const li = document.createElement('li');
          li.classList.add('footer-list__item');
          const link = document.createElement('a');
          link.href = linkUrl;
          link.textContent = linkTitle;
          link.classList.add('footer-cta-analytics', 'footer-list__item-analytics_cta_click', 'footer-list__item--link', 'footer-list__item--link-d-inline-block');
          link.setAttribute('data-link-region', 'Footer List');
          if (linkUrl.startsWith('http')) {
            link.target = '_blank';
          }
          li.append(link);
          ul.append(li);
        }
      });
      linkGroupDiv.append(ul);

      if (linkGroupCounter < 2) {
        navLeft.append(linkGroupDiv);
      } else {
        navRight.append(linkGroupDiv);
      }
      linkGroupCounter++;
    }

    // Social Links
    if (cells[0].textContent.trim() === 'Footer Social Link') {
      const socialUrl = cells[1].querySelector('a')?.href || cells[1].textContent.trim();
      const iconImg = cells[2].querySelector('img');

      if (socialUrl && iconImg) {
        const li = document.createElement('li');
        li.classList.add('footer-brand__right--item', 'footer-brand__right--item-d-flex', 'footer-brand__right--item-justify-content-center', 'footer-brand__right--item-align-items-center');
        const link = document.createElement('a');
        link.href = socialUrl;
        link.target = '_blank';
        link.classList.add('footer-brand__right--link', 'footer-brand__right--link-d-flex', 'footer-brand__right--link-justify-content-center', 'footer-brand__right--link-align-items-center', 'footer-brand__right--link-analytics_cta_click');
        link.setAttribute('data-cta-region', 'Footer');
        link.setAttribute('data-cta-label', `footer-${iconImg.alt.toLowerCase()}`);
        link.setAttribute('data-platform-name', iconImg.alt.toLowerCase());
        link.setAttribute('data-social-linktype', 'follow');

        const optimizedIconPic = createOptimizedPicture(iconImg.src, iconImg.alt);
        moveInstrumentation(iconImg, optimizedIconPic.querySelector('img'));
        optimizedIconPic.querySelector('img').classList.add('footer-brand__right--link-object-fit-contain', 'footer-brand__right--link-w-100', 'footer-brand__right--link-h-100', 'footer-brand__right--link-no-rendition');
        optimizedIconPic.querySelector('img').setAttribute('aria-label', iconImg.alt.toLowerCase());
        link.append(optimizedIconPic);
        li.append(link);
        socialMediaList.append(li);
      }
    }

    // ITC Portal Link
    if (cells[0].textContent.trim() === 'ITC Portal Link') {
      const itcLink = cells[1].querySelector('a');
      if (itcLink) {
        const li = document.createElement('li');
        li.classList.add('footer-brand__left--item', 'footer-brand__left--item-foot_link');
        const link = document.createElement('a');
        link.href = itcLink.href;
        link.textContent = itcLink.textContent;
        link.target = '_blank';
        link.classList.add('footer-brand__left--link', 'footer-brand__left--link-analytics_cta_click');
        link.setAttribute('data-cta-region', 'Footer');
        li.append(link);
        copyrightList.append(li);
      }
    }

    // Copyright
    if (cells[0].textContent.trim() === 'Copyright') {
      copyrightSpan.textContent = cells[1].textContent.trim();
      copyrightDiv.append(copyrightSpan);
    }
  });

  // Assemble Primary Section
  primaryContent.append(leftBrandSection);
  nav.append(navLeft, navRight);
  rightBrandSection.append(nav);
  primaryContent.append(rightBrandSection);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  // Assemble Secondary Section
  socialMediaSection.append(socialMediaTitle, socialMediaList);
  secondaryContent.append(socialMediaSection);
  copyrightSection.append(copyrightList, copyrightDiv);
  secondaryContent.append(copyrightSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  block.textContent = '';
  block.classList.add('footer-brand', 'footer-brand-w-100', 'footer-brand-bg-boing-neutral-gray-600');
  block.setAttribute('data-isdoodlevariation', 'false');
  block.append(primarySection, secondarySection);
}
