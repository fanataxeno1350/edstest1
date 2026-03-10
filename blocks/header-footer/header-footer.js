import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const mainSection = document.createElement('section');
  mainSection.className = 'header-position-relative header-mb-15';
  moveInstrumentation(block, mainSection);

  // App Name
  const appNameSpan = document.createElement('span');
  appNameSpan.className = 'header-d-none header-app-name';
  appNameSpan.setAttribute('data-app-name', 'boing');
  appNameSpan.textContent = 'boing';
  mainSection.append(appNameSpan);

  // Header
  const header = document.createElement('header');
  header.className = 'header-boing-container header-header header-d-flex header-justify-content-between header-align-items-center header-h-15 header-px-5 header-py-2 header-fixed-top header-w-100 header-bg-white';
  mainSection.append(header);

  const headerDiv1 = document.createElement('div');
  headerDiv1.className = 'header-d-flex header-w-25';
  header.append(headerDiv1);

  const headerDiv2 = document.createElement('div');
  headerDiv2.className = 'header-d-flex header-justify-content-center header-w-25';
  header.append(headerDiv2);

  const logoLink = document.createElement('a');
  logoLink.href = '/';
  logoLink.className = 'header-analytics_cta_click';
  logoLink.setAttribute('data-ct', '');
  logoLink.setAttribute('a-label', 'header-logo-boing');
  headerDiv2.append(logoLink);

  const logoDiv = document.createElement('div');
  logoDiv.className = 'header-header__logo header-d-flex header-align-items-center';
  logoLink.append(logoDiv);

  const logoImg = document.createElement('img');
  logoImg.src = '/content/dam/aemigrate/uploaded-folder/image/lets-boing-logo-fmt-webp-alpha.webp';
  logoImg.alt = 'Let\'s Boing';
  logoImg.fetchPriority = 'high';
  logoImg.loading = 'eager';
  logoImg.className = 'header-header__logo-img';
  logoDiv.append(logoImg);

  const headerDiv3 = document.createElement('div');
  headerDiv3.className = 'header-d-flex header-w-25 header-justify-content-end';
  header.append(headerDiv3);

  const loginLink = document.createElement('a');
  loginLink.href = '/login.html';
  loginLink.className = 'header-header__login-btn-wrapper header-analytics_cta_click';
  loginLink.style.display = 'inline';
  headerDiv3.append(loginLink);

  const loginButton = document.createElement('button');
  loginButton.className = 'header-header__login-btn header-btn header-text-boing-primary header-bg-transparent header-fw-semibold header-rounded-4 header-btn-sm header-py-3 header-px-4';
  loginButton.textContent = 'Login';
  loginLink.append(loginButton);

  // Submenu Container
  const submenuContainer = document.createElement('div');
  submenuContainer.className = 'header-submenu-container header-position-fixed header-top-0 header-start-0 header-end-0 header-m-auto header-overflow-hidden';
  mainSection.append(submenuContainer);

  const aside = document.createElement('aside');
  aside.className = 'header-sidebar header-start-0 header-bg-white header-position-absolute';
  submenuContainer.append(aside);

  const menuUl = document.createElement('ul');
  menuUl.className = 'header-sidebar__menu header-list-unstyled header-px-4';
  aside.append(menuUl);

  // Menu Items
  const menuItems = [
    { href: '/', img: '/content/dam/aemigrate/uploaded-folder/image/home-fmt-webp-alpha.webp', alt: 'Home', label: 'Home' },
    { href: '/login/profile.html', img: '/content/dam/aemigrate/uploaded-folder/image/profile-circle-1-fmt-webp-alpha.webp', alt: 'Profile', label: 'Profile' },
    { href: '/tedhe-medhe-samachaar.html', img: '/content/dam/aemigrate/uploaded-folder/image/news-fmt-webp-alpha.webp', alt: 'Tedhe Medhe Samachaar', label: 'Tedhe Medhe Samachaar' },
    { href: '/bolte-sitare.html', img: '/content/dam/aemigrate/uploaded-folder/image/star-fmt-webp-alpha.webp', alt: 'Bolte Sitaare', label: 'Bolte Sitaare' },
    { href: '/lets-doodle.html', img: '/content/dam/aemigrate/uploaded-folder/image/lets-doodle-icon-20-1.png', alt: 'Let\'s Doodle', label: 'Let\'s Doodle' },
    { href: '/play-game.html', img: '/content/dam/aemigrate/uploaded-folder/image/gameicnred-fmt-webp-alpha.webp', alt: 'play game', label: 'Play Game' },
    { href: '/', img: '/content/dam/aemigrate/uploaded-folder/image/logout-3-fmt-webp-alpha.webp', alt: 'Logout', label: 'Logout', isLogout: true },
  ];

  menuItems.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-sidebar__menu-item header-py-6 header-border-bottom header-border-boing-neutral-gray-200';
    if (item.isLogout) {
      li.classList.add('header-sidebar__menu-item--logout');
      li.style.display = 'none';
    }
    menuUl.append(li);

    const link = document.createElement('a');
    link.href = item.href;
    link.className = 'header-sidebar__menu-link header-d-flex header-align-items-center header-text-decoration-none header-px-6 header-fw-medium header-analytics_cta_click';
    if (item.isLogout) {
      link.classList.add('header-sidebar__menu-item--logout-btn');
    }
    link.setAttribute('data-consent', item.href.includes('/play-game.html') ? 'true' : 'false');
    link.setAttribute('data-link', item.href.replace('.html', ''));
    li.append(link);

    const img = createOptimizedPicture(item.img, item.alt);
    img.querySelector('img').className = 'header-sidebar__menu-icon header-me-4';
    img.querySelector('img').loading = 'lazy';
    link.append(img);
    link.append(document.createTextNode(item.label));
  });

  const sidebarCurve = document.createElement('div');
  sidebarCurve.className = 'header-sidebar__curve';
  aside.append(sidebarCurve);

  // Footer Brand
  const footerBrand = document.createElement('div');
  footerBrand.className = 'header-footer-brand header-w-100 header-bg-boing-neutral-gray-600';
  footerBrand.setAttribute('data-isdoodlevariation', 'false');
  aside.append(footerBrand);

  // Footer Primary
  const footerPrimary = document.createElement('section');
  footerPrimary.className = 'header-footer-brand__primary';
  footerPrimary.style.backgroundColor = '';
  footerBrand.append(footerPrimary);

  const footerPrimaryContainer = document.createElement('div');
  footerPrimaryContainer.className = 'header-container';
  footerPrimary.append(footerPrimaryContainer);

  const footerPrimaryContent = document.createElement('div');
  footerPrimaryContent.className = 'header-footer-brand__primary--content header-d-flex header-flex-column header-flex-md-row header-justify-content-md-between header-align-items-center';
  footerPrimaryContainer.append(footerPrimaryContent);

  const footerBrandLeft = document.createElement('section');
  footerBrandLeft.className = 'header-footer-brand__left header-d-flex header-gap-16 header-px-10 header-align-items-center header-justify-content-center';
  footerPrimaryContent.append(footerBrandLeft);

  const itcLink = document.createElement('a');
  itcLink.href = 'https://www.itcportal.com/';
  itcLink.target = '_blank';
  itcLink.className = 'header-footer-brand__logo header-d-inline-block header-analytics_cta_click';
  itcLink.setAttribute('data-cta-region', 'Footer');
  itcLink.setAttribute('aria-label', 'ITC Logo');
  footerBrandLeft.append(itcLink);

  const itcImg = createOptimizedPicture('/content/dam/aemigrate/uploaded-folder/image/itc-logo-2-fmt-webp-alpha.webp', 'ITC Logo');
  itcImg.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
  itcImg.querySelector('img').loading = 'lazy';
  itcLink.append(itcImg);

  const fssiDiv = document.createElement('div');
  fssiDiv.className = 'header-footer-brand__secondary--logo header-d-inline-block';
  footerBrandLeft.append(fssiDiv);

  const fssiImg = createOptimizedPicture('/content/dam/aemigrate/uploaded-folder/image/fssi-logo-update-fmt-webp-alpha.webp', 'FSSI Logo');
  fssiImg.querySelector('img').className = 'header-object-fit-contain header-w-100 header-no-rendition';
  fssiImg.querySelector('img').loading = 'lazy';
  fssiDiv.append(fssiImg);

  const footerBrandRight = document.createElement('section');
  footerBrandRight.className = 'header-footer-brand__right';
  footerPrimaryContent.append(footerBrandRight);

  const footerNav = document.createElement('nav');
  footerNav.className = 'header-footer-brand__navbar header-d-grid header-d-md-flex';
  footerNav.setAttribute('aria-label', 'footer navbar');
  footerBrandRight.append(footerNav);

  const footerNavLeft = document.createElement('div');
  footerNavLeft.className = 'header-footer-brand__navbar--left header-d-flex header-flex-column header-flex-md-row';
  footerNav.append(footerNavLeft);

  const footerListsData = [
    [
      { label: 'About us', link: '/about-us.html' },
      { label: 'Terms and Conditions', link: '/terms-and-conditions.html' },
      { label: 'Privacy Policy', link: '/privacy-policy.html' },
    ],
    [
      { label: 'BoingWale Blogs', link: '/bolte-sitare/boingwale-blogs.html' },
      { label: 'Tedhe Medhe Highlights', link: '/tedhe-medhe-samachaar/tedhe-medhe-highlights.html' },
      { label: 'Numbers Ka Khel', link: '/bolte-sitare/number-ka-khel.html' },
    ],
    [
      { label: 'Contact us', link: 'https://www.itcportal.com/contact-us.aspx', target: '_blank' },
      { label: 'Sa-Meme-Char', link: '/tedhe-medhe-samachaar/sa-meme-chaar.html' },
      { label: 'Numbers Ka Khel', link: '/bolte-sitare/number-ka-khel.html' },
    ],
    [
      { label: 'Pyaar O Scope', link: '/bolte-sitare/love-compatibility.html' },
      { label: 'Bhavishya On The Go', link: '/bolte-sitare/bhavishya-on-the-go.html' },
      { label: 'Boing Weekly', link: '/tedhe-medhe-samachaar/boing-weekly.html' },
    ],
  ];

  footerListsData.forEach((listData, index) => {
    const footerListDiv = document.createElement('div');
    footerListDiv.className = 'header-footerList';
    if (index < 2) {
      footerNavLeft.append(footerListDiv);
    } else {
      if (index === 2) {
        const footerNavRight = document.createElement('div');
        footerNavRight.className = 'header-footer-brand__navbar--right header-d-flex header-flex-column header-flex-md-row';
        footerNav.append(footerNavRight);
      }
      footerNav.querySelector('.header-footer-brand__navbar--right').append(footerListDiv);
    }

    const ul = document.createElement('ul');
    ul.className = 'header-footer-list header-d-flex header-align-items-center header-justify-content-center header-align-items-md-start header-flex-column';
    footerListDiv.append(ul);

    listData.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'header-footer-list__item';
      ul.append(li);

      const link = document.createElement('a');
      link.href = item.link;
      link.className = 'header-cta-analytics header-analytics_cta_click header-footer-list__item--link header-d-inline-block';
      link.setAttribute('data-link-region', 'Footer List');
      if (item.target) {
        link.target = item.target;
      }
      link.textContent = item.label;
      li.append(link);
    });
  });

  // Footer Secondary
  const footerSecondary = document.createElement('section');
  footerSecondary.className = 'header-footer-brand__secondary';
  footerSecondary.style.backgroundColor = '';
  footerBrand.append(footerSecondary);

  const footerSecondaryContainer = document.createElement('div');
  footerSecondaryContainer.className = 'header-container';
  footerSecondary.append(footerSecondaryContainer);

  const footerSecondaryContent = document.createElement('div');
  footerSecondaryContent.className = 'header-footer-brand__secondary--content header-d-flex header-flex-column header-justify-content-md-between header-align-items-center';
  footerSecondaryContainer.append(footerSecondaryContent);

  const footerSocialSection = document.createElement('section');
  footerSocialSection.className = 'header-footer-brand__right header-d-flex header-flex-column header-pb-5';
  footerSecondaryContent.append(footerSocialSection);

  const socialTitle = document.createElement('h3');
  socialTitle.className = 'header-social_media--title';
  socialTitle.textContent = 'Follow Us On';
  footerSocialSection.append(socialTitle);

  const socialUl = document.createElement('ul');
  socialUl.className = 'header-footer-brand__right--list header-d-flex header-align-items-center header-justify-content-center header-px-10 header-flex-wrap';
  footerSocialSection.append(socialUl);

  const socialLinksData = [
    { href: 'https://www.facebook.com/share/1BiTDumTX4/?mibextid=wwXIf', img: '/content/dam/aemigrate/uploaded-folder/image/facebook-5-fmt-webp-alpha.webp', alt: 'facebook', platform: 'facebook' },
    { href: 'https://www.instagram.com/bingo_snacks?igsh=bjc5eXg1cDNkM3U1', img: '/content/dam/aemigrate/uploaded-folder/image/instagram-2-fmt-webp-alpha.webp', alt: 'instagram', platform: 'instagram' },
    { href: 'http://www.youtube.com/@BingoSnacks', img: '/content/dam/aemigrate/uploaded-folder/image/youtube-2-fmt-webp-alpha.webp', alt: 'youtube', platform: 'youtube' },
  ];

  socialLinksData.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'header-footer-brand__right--item header-d-flex header-justify-content-center header-align-items-center';
    socialUl.append(li);

    const link = document.createElement('a');
    link.href = item.href;
    link.target = '_blank';
    link.className = 'header-footer-brand__right--link header-d-flex header-justify-content-center header-align-items-center header-analytics_cta_click';
    link.setAttribute('data-cta-region', 'Footer');
    link.setAttribute('data-cta-label', `footer-${item.platform}`);
    link.setAttribute('data-platform-name', item.platform);
    link.setAttribute('data-social-linktype', 'follow');
    li.append(link);

    const img = createOptimizedPicture(item.img, item.alt);
    img.querySelector('img').className = 'header-object-fit-contain header-w-100 header-h-100 header-no-rendition';
    img.querySelector('img').loading = 'lazy';
    img.querySelector('img').setAttribute('aria-label', item.platform);
    link.append(img);
  });

  const footerCopyrightSection = document.createElement('section');
  footerCopyrightSection.className = 'header-footer-brand__left header-py-5 header-d-flex header-flex-column header-gap-3';
  footerSecondaryContent.append(footerCopyrightSection);

  const copyrightUl = document.createElement('ul');
  copyrightUl.className = 'header-footer-brand__left--list header-d-flex header-align-items-center header-justify-content-center header-flex-wrap';
  footerCopyrightSection.append(copyrightUl);

  const copyrightLi = document.createElement('li');
  copyrightLi.className = 'header-footer-brand__left--item header-foot_link';
  copyrightUl.append(copyrightLi);

  const copyrightLink = document.createElement('a');
  copyrightLink.href = 'https://www.itcportal.com/';
  copyrightLink.target = '_blank';
  copyrightLink.className = 'header-footer-brand__left--link header-analytics_cta_click';
  copyrightLink.setAttribute('data-cta-region', 'Footer');
  copyrightLink.textContent = 'ITC portal';
  copyrightLi.append(copyrightLink);

  const copyrightDiv = document.createElement('div');
  copyrightDiv.className = 'header-footer-brand__left--copyright header-text-center';
  footerCopyrightSection.append(copyrightDiv);

  const copyrightSpan = document.createElement('span');
  copyrightSpan.className = 'header-footer-brand__left--text header-text-white';
  copyrightSpan.textContent = '© 2026 Bingo! All Rights Reserved.';
  copyrightDiv.append(copyrightSpan);

  const overlay = document.createElement('div');
  overlay.className = 'header-overlay header-position-absolute header-top-0 header-start-0 header-w-100 header-h-100 header-bg-black header-opacity-25';
  submenuContainer.append(overlay);

  block.textContent = '';
  block.append(mainSection);
}