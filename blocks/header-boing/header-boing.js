import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const appName = block.querySelector('[data-aue-prop="appName"]');
  const headerLogoImage = block.querySelector('[data-aue-prop="headerLogoImage"]');
  const headerLogoLink = block.querySelector('[data-aue-prop="headerLogoLink"]');
  const loginLink = block.querySelector('[data-aue-prop="loginLink"]');
  const sidebarLogoImage = block.querySelector('[data-aue-prop="sidebarLogoImage"]');
  const sidebarMenuItems = block.querySelectorAll('[data-aue-model="sidebarMenuItem"]');
  const footerLogo1 = block.querySelector('[data-aue-prop="footerLogo1"]');
  const footerLogo2 = block.querySelector('[data-aue-prop="footerLogo2"]');
  const footerListItems1 = block.querySelectorAll('[data-aue-prop="footerListItems1"] [data-aue-model="footerListItem"]');
  const footerListItems2 = block.querySelectorAll('[data-aue-prop="footerListItems2"] [data-aue-model="footerListItem"]');
  const footerListItems3 = block.querySelectorAll('[data-aue-prop="footerListItems3"] [data-aue-model="footerListItem"]');
  const footerListItems4 = block.querySelectorAll('[data-aue-prop="footerListItems4"] [data-aue-model="footerListItem"]');
  const footerSocialItems = block.querySelectorAll('[data-aue-model="footerSocialItem"]');
  const footerITCPortalLink = block.querySelector('[data-aue-prop="footerITCPortalLink"]');
  const footerCopyright = block.querySelector('[data-aue-prop="footerCopyright"]');

  // Root section wrapper
  const sectionWrapper = document.createElement('section');
  sectionWrapper.className = 'header-position-relative header-mb-15';

  // App Name (hidden)
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.dataset.appName = appName?.textContent?.trim() || '';
  if (appName) {
    moveInstrumentation(appName, appNameSpan);
    appNameSpan.textContent = appName.textContent;
  }
  sectionWrapper.append(appNameSpan);

  // Header element
  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';

  // Header Left (empty div for spacing)
  const headerLeftDiv = document.createElement('div');
  headerLeftDiv.className = 'header-d-flex header-w-25';
  header.append(headerLeftDiv);

  // Header Logo
  const headerLogoDiv = document.createElement('div');
  headerLogoDiv.className = 'header-d-flex  header-justify-content-center header-w-25';
  const headerLogoAnchor = document.createElement('a');
  headerLogoAnchor.className = 'header-analytics_cta_click';
  headerLogoAnchor.dataset.ctaLabel = 'header-logo-boing';
  headerLogoAnchor.href = headerLogoLink?.querySelector('a')?.href || '#';
  if (headerLogoLink) {
    moveInstrumentation(headerLogoLink, headerLogoAnchor);
  }
  const headerLogoInnerDiv = document.createElement('div');
  headerLogoInnerDiv.className = 'header__logo header-d-flex header-align-items-center';
  if (headerLogoImage) {
    const img = headerLogoImage.querySelector('img');
    if (img) {
      const optimizedPicture = createOptimizedPicture(img.src, img.alt);
      optimizedPicture.querySelector('img').className = 'header__logo-img';
      headerLogoInnerDiv.append(optimizedPicture);
      moveInstrumentation(headerLogoImage, headerLogoInnerDiv);
    }
  }
  headerLogoAnchor.append(headerLogoInnerDiv);
  headerLogoDiv.append(headerLogoAnchor);
  header.append(headerLogoDiv);

  // Header Right (Login Button)
  const headerRightDiv = document.createElement('div');
  headerRightDiv.className = 'header-d-flex header-w-25 header-justify-content-end';
  if (loginLink) {
    const loginAnchor = loginLink.querySelector('a');
    if (loginAnchor) {
      const loginBtnWrapper = document.createElement('a');
      loginBtnWrapper.href = loginAnchor.href;
      loginBtnWrapper.className = 'header__login-btn-wrapper header-analytics_cta_click';
      loginBtnWrapper.style.display = 'inline';

      const loginButton = document.createElement('button');
      loginButton.className = 'header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
      loginButton.textContent = loginAnchor.textContent;

      loginBtnWrapper.append(loginButton);
      headerRightDiv.append(loginBtnWrapper);
      moveInstrumentation(loginLink, loginBtnWrapper);
    }
  }
  header.append(headerRightDiv);
  sectionWrapper.append(header);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';

  // Sidebar
  const sidebar = document.createElement('aside');
  sidebar.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';

  // Sidebar Menu
  const sidebarMenu = document.createElement('ul');
  sidebarMenu.className = 'header-sidebar__menu header-list-unstyled header-px-4';

  sidebarMenuItems.forEach((item) => {
    const link = item.querySelector('[data-aue-prop="link"] a');
    const icon = item.querySelector('[data-aue-prop="icon"] img');
    const label = item.querySelector('[data-aue-prop="label"]');

    if (link && icon && label) {
      const listItem = document.createElement('li');
      listItem.className = 'header-sidebar__menu-item   header-py-6 header-border-bottom header-border-boing-neutral-gray-200';

      const menuLink = document.createElement('a');
      menuLink.href = link.href;
      menuLink.className = 'header-sidebar__menu-link  header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
      menuLink.dataset.consent = 'false'; // Assuming default, adjust if needed
      menuLink.dataset.link = link.href; // Assuming link.href is the content path

      const optimizedIcon = createOptimizedPicture(icon.src, icon.alt);
      optimizedIcon.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
      optimizedIcon.querySelector('img').loading = 'lazy';
      menuLink.append(optimizedIcon);
      menuLink.append(label.textContent);

      listItem.append(menuLink);
      sidebarMenu.append(listItem);
      moveInstrumentation(item, listItem);
    }
  });
  sidebar.append(sidebarMenu);

  // Sidebar Curve (static element)
  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  sidebar.append(sidebarCurve);

  // Footer Brand
  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.dataset.isdoodlevariation = 'false';

  // Footer Brand Primary
  const footerBrandPrimary = document.createElement('section');
  footerBrandPrimary.className = 'header-footer-brand__primary';
  footerBrandPrimary.style.backgroundColor = '';
  const footerBrandPrimaryContainer = document.createElement('div');
  footerBrandPrimaryContainer.className = 'header-container';
  const footerBrandPrimaryContent = document.createElement('div');
  footerBrandPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';

  // Footer Brand Left (Logos)
  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';

  if (footerLogo1) {
    const logo1Link = document.createElement('a');
    logo1Link.href = footerITCPortalLink?.querySelector('a')?.href || '#'; // Assuming ITC link for first logo
    logo1Link.target = '_blank';
    logo1Link.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
    logo1Link.dataset.ctaRegion = 'Footer';
    logo1Link.setAttribute('aria-label', 'ITC Logo');
    const img1 = footerLogo1.querySelector('img');
    if (img1) {
      const optimizedImg1 = createOptimizedPicture(img1.src, img1.alt);
      optimizedImg1.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      optimizedImg1.querySelector('img').loading = 'lazy';
      logo1Link.append(optimizedImg1);
      moveInstrumentation(footerLogo1, logo1Link);
    }
    footerBrandLeft.append(logo1Link);
  }

  if (footerLogo2) {
    const logo2Div = document.createElement('div');
    logo2Div.className = 'header-footer-brand__secondary--logo header-d-inline-block';
    const img2 = footerLogo2.querySelector('img');
    if (img2) {
      const optimizedImg2 = createOptimizedPicture(img2.src, img2.alt);
      optimizedImg2.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
      optimizedImg2.querySelector('img').loading = 'lazy';
      logo2Div.append(optimizedImg2);
      moveInstrumentation(footerLogo2, logo2Div);
    }
    footerBrandLeft.append(logo2Div);
  }
  footerBrandPrimaryContent.append(footerBrandLeft);

  // Footer Brand Right (Navigation)
  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';
  const footerNavbar = document.createElement('nav');
  footerNavbar.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNavbar.setAttribute('aria-label', 'footer navbar');

  const footerNavbarLeft = document.createElement('div');
  footerNavbarLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row ';

  const createFooterList = (items) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
    items.forEach((item) => {
      const link = item.querySelector('[data-aue-prop="link"] a');
      const label = item.querySelector('[data-aue-prop="label"]');
      if (link && label) {
        const li = document.createElement('li');
        li.className = 'header-footer-list__item';
        const a = document.createElement('a');
        a.href = link.href;
        a.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
        a.dataset.linkRegion = 'Footer List';
        a.textContent = label.textContent;
        if (link.target) a.target = link.target; // Preserve target if present
        li.append(a);
        ul.append(li);
        moveInstrumentation(item, li);
      }
    });
    footerListDiv.append(ul);
    return footerListDiv;
  };

  footerNavbarLeft.append(createFooterList(footerListItems1));
  footerNavbarLeft.append(createFooterList(footerListItems2));
  footerNavbar.append(footerNavbarLeft);

  const footerNavbarRight = document.createElement('div');
  footerNavbarRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
  footerNavbarRight.append(createFooterList(footerListItems3));
  footerNavbarRight.append(createFooterList(footerListItems4));
  footerNavbar.append(footerNavbarRight);

  footerBrandRight.append(footerNavbar);
  footerBrandPrimaryContent.append(footerBrandRight);

  footerBrandPrimaryContainer.append(footerBrandPrimaryContent);
  footerBrandPrimary.append(footerBrandPrimaryContainer);
  footerBrand.append(footerBrandPrimary);

  // Footer Brand Secondary
  const footerBrandSecondary = document.createElement('section');
  footerBrandSecondary.className = 'header-footer-brand__secondary';
  footerBrandSecondary.style.backgroundColor = '';
  const footerBrandSecondaryContainer = document.createElement('div');
  footerBrandSecondaryContainer.className = 'header-container';
  const footerBrandSecondaryContent = document.createElement('div');
  footerBrandSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column  header-justify-content-md-between header-align-items-center';

  // Footer Brand Right (Social Media)
  const footerSocialSection = document.createElement('section');
  footerSocialSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  footerSocialSection.append(socialTitle);
  const socialList = document.createElement('ul');
  socialList.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';

  footerSocialItems.forEach((item) => {
    const link = item.querySelector('[data-aue-prop="link"] a');
    const icon = item.querySelector('[data-aue-prop="icon"] img');
    if (link && icon) {
      const li = document.createElement('li');
      li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
      const a = document.createElement('a');
      a.href = link.href;
      a.target = '_blank';
      a.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
      a.dataset.ctaRegion = 'Footer';
      a.dataset.ctaLabel = `footer-${icon.alt.toLowerCase()}`; // Assuming alt text is platform name
      a.dataset.platformName = icon.alt.toLowerCase();
      a.dataset.socialLinktype = 'follow';

      const optimizedIcon = createOptimizedPicture(icon.src, icon.alt);
      optimizedIcon.querySelector('img').setAttribute('aria-label', icon.alt.toLowerCase());
      optimizedIcon.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
      optimizedIcon.querySelector('img').loading = 'lazy';
      a.append(optimizedIcon);
      li.append(a);
      socialList.append(li);
      moveInstrumentation(item, li);
    }
  });
  footerSocialSection.append(socialList);
  footerBrandSecondaryContent.append(footerSocialSection);

  // Footer Brand Left (ITC Portal and Copyright)
  const footerCopyrightSection = document.createElement('section');
  footerCopyrightSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  const footerCopyrightList = document.createElement('ul');
  footerCopyrightList.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';

  if (footerITCPortalLink) {
    const itcLi = document.createElement('li');
    itcLi.className = 'header-footer-brand__left--item header-foot_link';
    const itcAnchor = footerITCPortalLink.querySelector('a');
    if (itcAnchor) {
      const a = document.createElement('a');
      a.href = itcAnchor.href;
      a.target = '_blank';
      a.className = 'header-footer-brand__left--link header-analytics_cta_click';
      a.dataset.ctaRegion = 'Footer';
      a.textContent = itcAnchor.textContent;
      itcLi.append(a);
      footerCopyrightList.append(itcLi);
      moveInstrumentation(footerITCPortalLink, itcLi);
    }
  }
  footerCopyrightSection.append(footerCopyrightList);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center ';
  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  if (footerCopyright) {
    copyrightSpan.textContent = footerCopyright.textContent;
    moveInstrumentation(footerCopyright, copyrightSpan);
  }
  copyrightDiv.append(copyrightSpan);
  footerCopyrightSection.append(copyrightDiv);
  footerBrandSecondaryContent.append(footerCopyrightSection);

  footerBrandSecondaryContainer.append(footerBrandSecondaryContent);
  footerBrandSecondary.append(footerBrandSecondaryContainer);
  footerBrand.append(footerBrandSecondary);

  sidebar.append(footerBrand);
  submenuContainer.append(sidebar);

  // Overlay
  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);
  sectionWrapper.append(submenuContainer);

  block.textContent = '';
  block.append(sectionWrapper);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
