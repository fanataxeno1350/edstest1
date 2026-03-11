import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.classList.add('footer-brand-primary');
  footerBrandPrimary.style.backgroundColor = 'transparent';

  const footerContainerPrimary = document.createElement('div');
  footerContainerPrimary.classList.add('footer-container');
  footerBrandPrimary.append(footerContainerPrimary);

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.classList.add('footer-brand-primary-content');
  footerContainerPrimary.append(footerBrandPrimaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.classList.add('footer-brand-left');
  footerBrandPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.classList.add('footer-brand-right');
  footerBrandPrimaryContent.append(footerBrandRight);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.classList.add('footer-brand-secondary');
  footerBrandSecondary.style.backgroundColor = 'transparent';

  const footerContainerSecondary = document.createElement('div');
  footerContainerSecondary.classList.add('footer-container');
  footerBrandSecondary.append(footerContainerSecondary);

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.classList.add('footer-brand-secondary-content');
  footerContainerSecondary.append(footerBrandSecondaryContent);

  const footerBrandRightSocial = document.createElement('section');
  footerBrandRightSocial.classList.add('footer-brand-right-social');
  footerBrandSecondaryContent.append(footerBrandRightSocial);

  const footerBrandLeftCopyright = document.createElement('section');
  footerBrandLeftCopyright.classList.add('footer-brand-left-copyright');
  footerBrandSecondaryContent.append(footerBrandLeftCopyright);

  let primaryLogoLink;
  let secondaryLogo;
  let itcPortalLink;
  let copyrightText;
  const footerLinks = [];
  const footerSocials = [];

  [...block.children].forEach((row, rIdx) => {
    const cells = [...row.children];
    const rowType = row.dataset.aueModel;

    if (rIdx === 0) {
      // First row contains primaryLogo, secondaryLogo, itcPortalLink, copyrightText
      const primaryLogoCell = cells[0];
      const secondaryLogoCell = cells[1];
      const itcPortalLinkCell = cells[2];
      const copyrightTextCell = cells[3];

      if (primaryLogoCell) {
        const link = primaryLogoCell.querySelector('a');
        if (link) {
          primaryLogoLink = document.createElement('a');
          primaryLogoLink.href = link.href;
          primaryLogoLink.target = '_blank';
          primaryLogoLink.classList.add('footer-brand-logo', 'analytics_cta_click');
          primaryLogoLink.setAttribute('data-cta-region', 'Footer');
          primaryLogoLink.setAttribute('aria-label', 'ITC Logo');
          moveInstrumentation(link, primaryLogoLink);

          const img = link.querySelector('img');
          if (img) {
            const pic = createOptimizedPicture(img.src, img.alt);
            pic.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
            pic.querySelector('img').setAttribute('loading', 'lazy');
            moveInstrumentation(img, pic.querySelector('img'));
            primaryLogoLink.append(pic);
          }
        } else {
          const img = primaryLogoCell.querySelector('img');
          if (img) {
            primaryLogoLink = document.createElement('a');
            primaryLogoLink.href = img.src; // Fallback to image src if no link
            primaryLogoLink.target = '_blank';
            primaryLogoLink.classList.add('footer-brand-logo', 'analytics_cta_click');
            primaryLogoLink.setAttribute('data-cta-region', 'Footer');
            primaryLogoLink.setAttribute('aria-label', 'ITC Logo');
            moveInstrumentation(img, primaryLogoLink);

            const pic = createOptimizedPicture(img.src, img.alt);
            pic.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
            pic.querySelector('img').setAttribute('loading', 'lazy');
            moveInstrumentation(img, pic.querySelector('img'));
            primaryLogoLink.append(pic);
          }
        }
      }

      if (secondaryLogoCell) {
        const img = secondaryLogoCell.querySelector('img');
        if (img) {
          secondaryLogo = document.createElement('div');
          secondaryLogo.classList.add('footer-brand-secondary-logo');
          moveInstrumentation(secondaryLogoCell, secondaryLogo);

          const pic = createOptimizedPicture(img.src, img.alt);
          pic.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-no-rendition');
          pic.querySelector('img').setAttribute('loading', 'lazy');
          moveInstrumentation(img, pic.querySelector('img'));
          secondaryLogo.append(pic);
        }
      }

      if (itcPortalLinkCell) {
        const link = itcPortalLinkCell.querySelector('a');
        if (link) {
          itcPortalLink = document.createElement('a');
          itcPortalLink.href = link.href;
          itcPortalLink.target = '_blank';
          itcPortalLink.classList.add('footer-brand-left-link', 'analytics_cta_click');
          itcPortalLink.setAttribute('data-cta-region', 'Footer');
          itcPortalLink.append(...link.childNodes);
          moveInstrumentation(link, itcPortalLink);
        }
      }

      if (copyrightTextCell) {
        copyrightText = document.createElement('div');
        copyrightText.classList.add('footer-brand-left-copyright-text');
        const span = document.createElement('span');
        span.classList.add('footer-brand-left-text', 'footer-text-white');
        span.append(...copyrightTextCell.childNodes);
        moveInstrumentation(copyrightTextCell, span);
        copyrightText.append(span);
      }
    } else if (rowType === 'footerLink') {
      const linkCell = cells[0];
      const labelCell = cells[1];
      if (linkCell && labelCell) {
        const link = linkCell.querySelector('a');
        const label = labelCell.textContent.trim();
        if (link) {
          const footerLinkItem = {
            link: link.href,
            label,
            target: link.target,
            instrumentationSource: link,
          };
          footerLinks.push(footerLinkItem);
        }
      }
    } else if (rowType === 'footerSocial') {
      const socialLinkCell = cells[0];
      const iconCell = cells[1];
      if (socialLinkCell && iconCell) {
        const link = socialLinkCell.querySelector('a');
        const img = iconCell.querySelector('img');
        if (link && img) {
          const socialItem = {
            link: link.href,
            imgSrc: img.src,
            imgAlt: img.alt,
            target: link.target,
            instrumentationSource: link,
            imgInstrumentationSource: img,
          };
          footerSocials.push(socialItem);
        }
      }
    }
  });

  // Build Footer Brand Left
  if (primaryLogoLink) {
    footerBrandLeft.append(primaryLogoLink);
  }
  if (secondaryLogo) {
    footerBrandLeft.append(secondaryLogo);
  }

  // Build Footer Brand Right (Navigation)
  if (footerLinks.length > 0) {
    const footerBrandNavbar = document.createElement('nav');
    footerBrandNavbar.classList.add('footer-brand-navbar');
    footerBrandNavbar.setAttribute('aria-label', 'footer navbar');
    footerBrandRight.append(footerBrandNavbar);

    const footerBrandNavbarLeft = document.createElement('div');
    footerBrandNavbarLeft.classList.add('footer-brand-navbar-left');
    footerBrandNavbar.append(footerBrandNavbarLeft);

    const footerBrandNavbarRight = document.createElement('div');
    footerBrandNavbarRight.classList.add('footer-brand-navbar-right');
    footerBrandNavbar.append(footerBrandNavbarRight);

    // Distribute links into 4 columns (2 left, 2 right)
    const numColumns = 4;
    const linksPerColumn = Math.ceil(footerLinks.length / numColumns);

    for (let i = 0; i < numColumns; i += 1) {
      const start = i * linksPerColumn;
      const end = start + linksPerColumn;
      const columnLinks = footerLinks.slice(start, end);

      if (columnLinks.length > 0) {
        const footerListWrapper = document.createElement('div');
        footerListWrapper.classList.add('footer-list-wrapper');
        const footerList = document.createElement('ul');
        footerList.classList.add('footer-list');
        footerListWrapper.append(footerList);

        columnLinks.forEach((item) => {
          const listItem = document.createElement('li');
          listItem.classList.add('footer-list-item');

          const link = document.createElement('a');
          link.href = item.link;
          link.classList.add('footer-cta-analytics', 'analytics_cta_click', 'footer-list-item-link');
          link.setAttribute('data-link-region', 'Footer List');
          if (item.target) {
            link.target = item.target;
          }
          link.textContent = item.label;
          moveInstrumentation(item.instrumentationSource, link);
          listItem.append(link);
          footerList.append(listItem);
        });

        if (i < 2) {
          footerBrandNavbarLeft.append(footerListWrapper);
        } else {
          footerBrandNavbarRight.append(footerListWrapper);
        }
      }
    }
  }

  // Build Footer Brand Right Social
  if (footerSocials.length > 0) {
    const socialTitle = document.createElement('h3');
    socialTitle.classList.add('footer-social-media-title');
    socialTitle.textContent = 'Follow Us On';
    footerBrandRightSocial.append(socialTitle);

    const socialList = document.createElement('ul');
    socialList.classList.add('footer-brand-right-list');
    footerBrandRightSocial.append(socialList);

    footerSocials.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.classList.add('footer-brand-right-item');

      const link = document.createElement('a');
      link.href = item.link;
      link.classList.add('footer-brand-right-link', 'analytics_cta_click');
      link.setAttribute('data-cta-region', 'Footer');
      link.setAttribute('data-cta-label', `footer-${item.imgAlt.toLowerCase()}`);
      if (item.target) {
        link.target = item.target;
      }
      link.setAttribute('data-platform-name', item.imgAlt.toLowerCase());
      link.setAttribute('data-social-linktype', 'follow');
      moveInstrumentation(item.instrumentationSource, link);

      const pic = createOptimizedPicture(item.imgSrc, item.imgAlt);
      pic.querySelector('img').classList.add('footer-object-fit-contain', 'footer-w-100', 'footer-h-100', 'footer-no-rendition');
      pic.querySelector('img').setAttribute('loading', 'lazy');
      pic.querySelector('img').setAttribute('aria-label', item.imgAlt.toLowerCase());
      moveInstrumentation(item.imgInstrumentationSource, pic.querySelector('img'));
      link.append(pic);

      listItem.append(link);
      socialList.append(listItem);
    });
  }

  // Build Footer Brand Left Copyright
  const copyrightList = document.createElement('ul');
  copyrightList.classList.add('footer-brand-left-list');
  footerBrandLeftCopyright.append(copyrightList);

  if (itcPortalLink) {
    const listItem = document.createElement('li');
    listItem.classList.add('footer-brand-left-item', 'footer-foot-link');
    listItem.append(itcPortalLink);
    copyrightList.append(listItem);
  }

  if (copyrightText) {
    footerBrandLeftCopyright.append(copyrightText);
  }

  block.textContent = '';
  block.append(footerBrandPrimary, footerBrandSecondary);
}
