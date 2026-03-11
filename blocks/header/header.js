import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const logo = block.querySelector('[data-aue-prop="logo"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const sidebarMenu = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  const footerLinks = block.querySelectorAll('[data-aue-model="footerLink"]');
  const socialLinks = block.querySelectorAll('[data-aue-model="socialLink"]');
  const footerCopyright = block.querySelector('[data-aue-prop="footerCopyright"]');

  const section = document.createElement('section');
  section.className = 'header-position-relative header-mb-15';

  if (appName) {
    const appNameSpan = document.createElement('span');
    appNameSpan.className = 'header-d-none header-app-name';
    appNameSpan.setAttribute('data-app-name', appName.textContent.trim());
    appNameSpan.textContent = appName.textContent.trim();
    moveInstrumentation(appName, appNameSpan);
    section.append(appNameSpan);
  }

  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  const div1 = document.createElement('div');
  div1.className = 'header-d-flex header-w-25';
  header.append(div1);

  const div2 = document.createElement('div');
  div2.className = 'header-d-flex header-justify-content-center header-w-25';
  if (logo) {
    const logoLink = document.createElement('a');
    logoLink.href = logo.querySelector('a')?.href || '/';
    logoLink.className = 'header-analytics_cta_click';
    logoLink.setAttribute('data-ct', '');
    logoLink.setAttribute('a-label', 'header-logo-boing');

    const logoDiv = document.createElement('div');
    logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';

    const logoImg = logo.querySelector('img');
    if (logoImg) {
      const optimizedLogo = createOptimizedPicture(logoImg.src, logoImg.alt, true, [{ width: '100' }]);
      optimizedLogo.querySelector('img').className = 'header-header__logo-img';
      logoDiv.append(optimizedLogo);
    }
    logoLink.append(logoDiv);
    moveInstrumentation(logo, logoLink);
    div2.append(logoLink);
  }
  header.append(div2);

  const div3 = document.createElement('div');
  div3.className = 'header-d-flex header-w-25 header-justify-content-end';
  if (loginLink) {
    const loginAnchor = loginLink.querySelector('a');
    if (loginAnchor) {
      const loginWrapper = document.createElement('a');
      loginWrapper.href = loginAnchor.href;
      loginWrapper.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
      loginWrapper.style.display = 'inline';

      const loginButton = document.createElement('button');
      loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
      loginButton.textContent = loginAnchor.textContent.trim();
      loginWrapper.append(loginButton);
      moveInstrumentation(loginLink, loginWrapper);
      div3.append(loginWrapper);
    }
  }
  header.append(div3);
  section.append(header);

  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  const ul = document.createElement('ul');
  ul.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  sidebarMenu.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    const link = item.querySelector('[data-aue-prop="link"] a');
    const icon = item.querySelector('[data-aue-prop="icon"] img');
    const label = item.querySelector('[data-aue-prop="label"]');

    if (link && icon && label) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      anchor.setAttribute('data-consent', 'false');
      anchor.setAttribute('data-link', link.getAttribute('data-link') || '');

      const optimizedIcon = createOptimizedPicture(icon.src, icon.alt, false, [{ width: '20' }]);
      optimizedIcon.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      anchor.append(optimizedIcon);
      anchor.append(label.textContent.trim());
      li.append(anchor);
      moveInstrumentation(item, li);
      moveInstrumentation(link, anchor);
      moveInstrumentation(icon, optimizedIcon);
      moveInstrumentation(label, anchor);
    }
    ul.append(li);
  });
  aside.append(ul);

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');

  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand__primary';
  footerBrandPrimary.style.backgroundColor = '';

  const footerBrandContainer = document.createElement('div');
  footerBrandContainer.className = 'header-container';

  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  if (footerLogo1) {
    const logo1Anchor = footerLogo1.querySelector('a');
    if (logo1Anchor) {
      const logo1Link = document.createElement('a');
      logo1Link.href = logo1Anchor.href;
      logo1Link.target = '_blank';
      logo1Link.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
      logo1Link.setAttribute('data-cta-region', 'Footer');
      logo1Link.setAttribute('aria-label', 'ITC Logo');

      const logo1Img = footerLogo1.querySelector('img');
      if (logo1Img) {
        const optimizedLogo1 = createOptimizedPicture(logo1Img.src, logo1Img.alt, false, [{ width: '100' }]);
        optimizedLogo1.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
        logo1Link.append(optimizedLogo1);
      }
      moveInstrumentation(footerLogo1, logo1Link);
      footerBrandLeft.append(logo1Link);
    }
  }

  if (footerLogo2) {
    const logo2Div = document.createElement('div');
    logo2Div.className = 'header-footer-brand__secondary--logo header-d-inline-block';
    const logo2Img = footerLogo2.querySelector('img');
    if (logo2Img) {
      const optimizedLogo2 = createOptimizedPicture(logo2Img.src, logo2Img.alt, false, [{ width: '100' }]);
      optimizedLogo2.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
      logo2Div.append(optimizedLogo2);
    }
    moveInstrumentation(footerLogo2, logo2Div);
    footerBrandLeft.append(logo2Div);
  }
  footerBrandPrimaryContent.append(footerBrandLeft);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';

  const footerBrandNav = document.createElement('nav');
  footerBrandNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerBrandNav.setAttribute('aria-label', 'footer navbar');

  const footerBrandNavLeft = document.createElement('div');
  footerBrandNavLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';

  // Group footer links into two columns for left nav
  const footerLinksLeftCol1 = document.createElement('div');
  footerLinksLeftCol1.className = 'header-footerList';
  const ulLeftCol1 = document.createElement('ul');
  ulLeftCol1.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

  const footerLinksLeftCol2 = document.createElement('div');
  footerLinksLeftCol2.className = 'header-footerList';
  const ulLeftCol2 = document.createElement('ul');
  ulLeftCol2.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

  footerLinks.forEach((item, index) => {
    const link = item.querySelector('[data-aue-prop="link"] a');
    const label = item.querySelector('[data-aue-prop="label"]');

    if (link && label) {
      const li = document.createElement('li');
      li.className = 'header-footer-list__item';

      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      anchor.setAttribute('data-link-region', 'Footer List');
      anchor.textContent = label.textContent.trim();
      if (link.target) anchor.target = link.target;

      li.append(anchor);
      moveInstrumentation(item, li);
      moveInstrumentation(link, anchor);
      moveInstrumentation(label, anchor);

      if (index < 3) {
        ulLeftCol1.append(li);
      } else if (index < 6) {
        ulLeftCol2.append(li);
      }
    }
  });

  if (ulLeftCol1.children.length > 0) footerLinksLeftCol1.append(ulLeftCol1);
  if (ulLeftCol2.children.length > 0) footerLinksLeftCol2.append(ulLeftCol2);

  if (footerLinksLeftCol1.children.length > 0) footerBrandNavLeft.append(footerLinksLeftCol1);
  if (footerLinksLeftCol2.children.length > 0) footerBrandNavLeft.append(footerLinksLeftCol2);

  footerBrandNav.append(footerBrandNavLeft);

  const footerBrandNavRight = document.createElement('div');
  footerBrandNavRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';

  // Group remaining footer links into two columns for right nav
  const footerLinksRightCol1 = document.createElement('div');
  footerLinksRightCol1.className = 'header-footerList';
  const ulRightCol1 = document.createElement('ul');
  ulRightCol1.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

  const footerLinksRightCol2 = document.createElement('div');
  footerLinksRightCol2.className = 'header-footerList';
  const ulRightCol2 = document.createElement('ul');
  ulRightCol2.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';

  // Continue processing footer links for the right side, starting from index 6
  footerLinks.forEach((item, index) => {
    if (index >= 6) {
      const link = item.querySelector('[data-aue-prop="link"] a');
      const label = item.querySelector('[data-aue-prop="label"]');

      if (link && label) {
        const li = document.createElement('li');
        li.className = 'header-footer-list__item';

        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        anchor.setAttribute('data-link-region', 'Footer List');
        anchor.textContent = label.textContent.trim();
        if (link.target) anchor.target = link.target;

        li.append(anchor);
        moveInstrumentation(item, li);
        moveInstrumentation(link, anchor);
        moveInstrumentation(label, anchor);

        if (index < 9) {
          ulRightCol1.append(li);
        } else {
          ulRightCol2.append(li);
        }
      }
    }
  });

  if (ulRightCol1.children.length > 0) footerLinksRightCol1.append(ulRightCol1);
  if (ulRightCol2.children.length > 0) footerLinksRightCol2.append(ulRightCol2);

  if (footerLinksRightCol1.children.length > 0) footerBrandNavRight.append(footerLinksRightCol1);
  if (footerLinksRightCol2.children.length > 0) footerBrandNavRight.append(footerLinksRightCol2);

  footerBrandNav.append(footerBrandNavRight);
  footerBrandRight.append(footerBrandNav);
  footerBrandPrimaryContent.append(footerBrandRight);

  footerBrandContainer.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandContainer);
  footerBrand.append(footerBrandPrimary);

  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand__secondary';
  footerBrandSecondary.style.backgroundColor = '';

  const footerBrandSecondaryContainer = document.createElement('div');
  footerBrandSecondaryContainer.className = 'header-container';

  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';

  const footerBrandRightSection = document.createElement('section');
  footerBrandRightSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';

  const socialMediaTitle = document.createElement('h3');
  socialMediaTitle.className = 'header-social_media--title';
  socialMediaTitle.textContent = 'Follow Us On';
  footerBrandRightSection.append(socialMediaTitle);

  const socialMediaList = document.createElement('ul');
  socialMediaList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  socialLinks.forEach((item) => {
    const link = item.querySelector('[data-aue-prop="link"] a');
    const icon = item.querySelector('[data-aue-prop="icon"] img');

    if (link && icon) {
      const li = document.createElement('li');
      li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';

      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.target = '_blank';
      anchor.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      anchor.setAttribute('data-cta-region', 'Footer');
      anchor.setAttribute('data-cta-label', `footer-${icon.alt.toLowerCase()}`);
      anchor.setAttribute('data-platform-name', icon.alt.toLowerCase());
      anchor.setAttribute('data-social-linktype', 'follow');

      const optimizedIcon = createOptimizedPicture(icon.src, icon.alt, false, [{ width: '20' }]);
      optimizedIcon.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      optimizedIcon.querySelector('img').setAttribute('aria-label', icon.alt.toLowerCase());
      anchor.append(optimizedIcon);

      li.append(anchor);
      moveInstrumentation(item, li);
      moveInstrumentation(link, anchor);
      moveInstrumentation(icon, optimizedIcon);
      socialMediaList.append(li);
    }
  });
  footerBrandRightSection.append(socialMediaList);
  footerBrandSecondaryContent.append(footerBrandRightSection);

  const footerBrandLeftSection = document.createElement('section');
  footerBrandLeftSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';

  const footerBrandLeftList = document.createElement('ul');
  footerBrandLeftList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  const itcPortalLi = document.createElement('li');
  itcPortalLi.className = 'header-footer-brand__left--item header-foot_link';
  const itcPortalLink = document.createElement('a');
  itcPortalLink.href = 'https://www.itcportal.com/';
  itcPortalLink.target = '_blank';
  itcPortalLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
  itcPortalLink.setAttribute('data-cta-region', 'Footer');
  itcPortalLink.textContent = 'ITC portal';
  itcPortalLi.append(itcPortalLink);
  footerBrandLeftList.append(itcPortalLi);
  footerBrandLeftSection.append(footerBrandLeftList);

  if (footerCopyright) {
    const copyrightDiv = document.createElement('div');
    copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
    const copyrightSpan = document.createElement('span');
    copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
    copyrightSpan.textContent = footerCopyright.textContent.trim();
    copyrightDiv.append(copyrightSpan);
    moveInstrumentation(footerCopyright, copyrightDiv);
    footerBrandLeftSection.append(copyrightDiv);
  }

  footerBrandSecondaryContent.append(footerBrandLeftSection);
  footerBrandSecondaryContainer.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerBrandSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  aside.append(footerBrand);
  submenuContainer.append(aside);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  section.append(submenuContainer);

  block.textContent = '';
  block.append(section);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
