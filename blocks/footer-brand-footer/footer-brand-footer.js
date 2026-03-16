import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const primarySection = document.createElement('section');
  primarySection.className = 'footer-brand-footer__primary';
  const primaryContainer = document.createElement('div');
  primaryContainer.className = 'footer-container';
  const primaryContent = document.createElement('div');
  primaryContent.className = 'footer-brand-footer__primary--content footer-d-flex footer-flex-column footer-flex-md-row footer-justify-content-md-between footer-align-items-center';

  const leftSection = document.createElement('section');
  leftSection.className = 'footer-brand-footer__left footer-d-flex footer-gap-16 footer-px-10 footer-align-items-center footer-justify-content-center';

  const rightSection = document.createElement('section');
  rightSection.className = 'footer-brand-footer__right';
  const nav = document.createElement('nav');
  nav.className = 'footer-brand-footer__navbar footer-d-grid footer-d-md-flex';
  nav.setAttribute('aria-label', 'footer navbar');
  const navLeft = document.createElement('div');
  navLeft.className = 'footer-brand-footer__navbar--left footer-d-flex footer-flex-column footer-flex-md-row';
  const navRight = document.createElement('div');
  navRight.className = 'footer-brand-footer__navbar--right footer-d-flex footer-flex-column footer-flex-md-row';

  const secondarySection = document.createElement('section');
  secondarySection.className = 'footer-brand-footer__secondary';
  const secondaryContainer = document.createElement('div');
  secondaryContainer.className = 'footer-container';
  const secondaryContent = document.createElement('div');
  secondaryContent.className = 'footer-brand-footer__secondary--content footer-d-flex footer-flex-column footer-justify-content-md-between footer-align-items-center';

  const socialMediaSection = document.createElement('section');
  socialMediaSection.className = 'footer-brand-footer__right footer-d-flex footer-flex-column footer-pb-5';
  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'footer-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'footer-brand-footer__right--list footer-d-flex footer-align-items-center footer-justify-content-center footer-px-10 footer-flex-wrap';

  const copyrightSection = document.createElement('section');
  copyrightSection.className = 'footer-brand-footer__left footer-py-5 footer-d-flex footer-flex-column footer-gap-3';
  const itcPortalList = document.createElement('ul');
  itcPortalList.className = 'footer-brand-footer__left--list footer-d-flex footer-align-items-center footer-justify-content-center footer-flex-wrap';
  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'footer-brand-footer__left--copyright footer-text-center';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'footer-brand-footer__left--text footer-text-white';

  let linkListCounter = 0;
  let socialLinkCounter = 0;

  [...block.children].forEach((row, index) => {
    moveInstrumentation(row, row);
    const cells = [...row.children];

    // Footer-Brand-Footer Model
    if (index === 0) {
      const logoImageCell = cells[0];
      const secondaryLogoImageCell = cells[1];
      const itcPortalLinkCell = cells[2];
      const copyrightTextCell = cells[3];

      // Logo Image
      if (logoImageCell) {
        const link = logoImageCell.querySelector('a');
        const img = logoImageCell.querySelector('img');
        if (link && img) {
          const logoLink = document.createElement('a');
          logoLink.href = link.href;
          logoLink.target = '_blank';
          logoLink.className = 'footer-brand-footer__logo footer-d-inline-block footer-analytics_cta_click';
          logoLink.setAttribute('data-cta-region', 'Footer');
          logoLink.setAttribute('aria-label', img.alt || 'ITC Logo');
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          logoLink.append(optimizedPic);
          leftSection.append(logoLink);
        }
      }

      // Secondary Logo Image
      if (secondaryLogoImageCell) {
        const img = secondaryLogoImageCell.querySelector('img');
        if (img) {
          const secondaryLogoDiv = document.createElement('div');
          secondaryLogoDiv.className = 'footer-brand-footer__secondary--logo footer-d-inline-block';
          const optimizedPic = createOptimizedPicture(img.src, img.alt);
          moveInstrumentation(img, optimizedPic.querySelector('img'));
          secondaryLogoDiv.append(optimizedPic);
          leftSection.append(secondaryLogoDiv);
        }
      }

      // ITC Portal Link (in copyright section)
      if (itcPortalLinkCell) {
        const link = itcPortalLinkCell.querySelector('a');
        if (link) {
          const itcPortalLi = document.createElement('li');
          itcPortalLi.className = 'footer-brand-footer__left--item footer-foot_link';
          const itcPortalAnchor = document.createElement('a');
          itcPortalAnchor.href = link.href;
          itcPortalAnchor.target = '_blank';
          itcPortalAnchor.className = 'footer-brand-footer__left--link footer-analytics_cta_click';
          itcPortalAnchor.setAttribute('data-cta-region', 'Footer');
          itcPortalAnchor.textContent = link.textContent;
          itcPortalLi.append(itcPortalAnchor);
          itcPortalList.append(itcPortalLi);
        }
      }

      // Copyright Text
      if (copyrightTextCell) {
        copyrightSpan.textContent = copyrightTextCell.textContent.trim();
      }
    }

    // Footer Link List Model
    if (row.dataset.model === 'footerLinkList') {
      const labelCell = cells[0];
      const linkCell = cells[1];

      if (labelCell && linkCell) {
        const link = linkCell.querySelector('a');
        if (link) {
          const li = document.createElement('li');
          li.className = 'footer-list-footer__item';
          const a = document.createElement('a');
          a.href = link.href;
          a.className = 'footer-cta-analytics footer-analytics_cta_click footer-list-footer__item--link footer-d-inline-block';
          a.setAttribute('data-link-region', 'Footer List');
          a.textContent = labelCell.textContent.trim();
          if (link.target) {
            a.target = link.target;
          }
          li.append(a);

          let targetNavDiv;
          if (linkListCounter < 3) {
            targetNavDiv = navLeft;
          } else {
            targetNavDiv = navRight;
          }

          let ul = targetNavDiv.querySelector('.footer-list-footer:last-child');
          if (!ul || ul.children.length >= 3) {
            const footerListDiv = document.createElement('div');
            footerListDiv.className = 'footer-footerList-footer';
            ul = document.createElement('ul');
            ul.className = 'footer-list-footer footer-d-flex footer-align-items-center footer-justify-content-center footer-align-items-md-start footer-flex-column';
            footerListDiv.append(ul);
            targetNavDiv.append(footerListDiv);
          }
          ul.append(li);
          linkListCounter++;
        }
      }
    }

    // Footer Social Link Model
    if (row.dataset.model === 'footerSocialLink') {
      const socialUrlCell = cells[0];
      const iconImageCell = cells[1];

      if (socialUrlCell && iconImageCell) {
        const socialLink = socialUrlCell.querySelector('a');
        const iconImg = iconImageCell.querySelector('img');

        if (socialLink && iconImg) {
          const li = document.createElement('li');
          li.className = 'footer-brand-footer__right--item footer-d-flex footer-justify-content-center footer-align-items-center';
          const a = document.createElement('a');
          a.href = socialLink.href;
          a.target = '_blank';
          a.className = 'footer-brand-footer__right--link footer-d-flex footer-justify-content-center footer-align-items-center footer-analytics_cta_click';
          a.setAttribute('data-cta-region', 'Footer');
          a.setAttribute('data-cta-label', `footer-${iconImg.alt.toLowerCase()}`);
          a.setAttribute('data-platform-name', iconImg.alt.toLowerCase());
          a.setAttribute('data-social-linktype', 'follow');

          const optimizedPic = createOptimizedPicture(iconImg.src, iconImg.alt);
          moveInstrumentation(iconImg, optimizedPic.querySelector('img'));
          a.append(optimizedPic);
          li.append(a);
          socialMediaList.append(li);
          socialLinkCounter++;
        }
      }
    }
  });

  // Assemble the DOM
  nav.append(navLeft, navRight);
  rightSection.append(nav);
  primaryContent.append(leftSection, rightSection);
  primaryContainer.append(primaryContent);
  primarySection.append(primaryContainer);

  socialMediaSection.append(socialMediaTitle, socialMediaList);
  copyrightDiv.append(copyrightSpan);
  copyrightSection.append(itcPortalList, copyrightDiv);
  secondaryContent.append(socialMediaSection, copyrightSection);
  secondaryContainer.append(secondaryContent);
  secondarySection.append(secondaryContainer);

  block.textContent = '';
  block.classList.add('footer-container-hd-footer', 'footer-p-0');

  const brandFooterDiv = document.createElement('div');
  brandFooterDiv.className = 'footer-brand-footer footer-w-100 footer-bg-boing-neutral-gray-600';
  brandFooterDiv.setAttribute('data-isdoodlevariation', 'false');
  brandFooterDiv.append(primarySection, secondarySection);
  block.append(brandFooterDiv);
}
