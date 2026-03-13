import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const footerNewDiv = document.createElement('div');
  footerNewDiv.classList.add('footer-new');

  const topContentDiv = document.createElement('div');
  topContentDiv.classList.add('footer-new__top-content');

  const backgroundImage = block.querySelector('[data-aue-prop="backgroundImage"]');
  if (backgroundImage) {
    const img = backgroundImage.querySelector('img');
    if (img) {
      topContentDiv.style.backgroundImage = `url("${img.src}")`;
      moveInstrumentation(backgroundImage, topContentDiv);
    }
  }

  const logoDiv = document.createElement('div');
  logoDiv.classList.add('footer-cmp-image', 'footer-new__logo');
  const logoLink = block.querySelector('[data-aue-prop="logoLink"]');
  if (logoLink) {
    const a = logoLink.querySelector('a');
    if (a) {
      a.classList.add('footer-cmp-image__link');
      logoDiv.append(a);
      moveInstrumentation(logoLink, logoDiv);
    }
  }
  const logoImage = block.querySelector('[data-aue-prop="logoImage"]');
  if (logoImage) {
    const img = logoImage.querySelector('img');
    if (img) {
      const picture = createOptimizedPicture(img.src, img.alt);
      const link = logoDiv.querySelector('a');
      if (link) {
        link.append(picture);
      } else {
        logoDiv.append(picture);
      }
      moveInstrumentation(logoImage, logoDiv);
    }
  }
  topContentDiv.append(logoDiv);

  const navDiv = document.createElement('div');
  navDiv.classList.add('footer-new__nav');
  const navGroups = block.querySelectorAll('[data-aue-model="footerNavigationGroup"]');
  if (navGroups.length > 0) {
    navDiv.classList.add(`footer-new__nav__count-${navGroups.length * 5}`); // Assuming 5 items per group from sample
  }

  navGroups.forEach((groupNode) => {
    const ul = document.createElement('ul');
    ul.classList.add('footer-new__nav-group');

    const navItems = groupNode.querySelectorAll('[data-aue-model="footerNavigationItem"]');
    navItems.forEach((itemNode) => {
      const li = document.createElement('li');
      li.classList.add('footer-new__nav-item');

      const navLink = itemNode.querySelector('[data-aue-prop="navLink"]');
      const navLabel = itemNode.querySelector('[data-aue-prop="navLabel"]');

      if (navLink) {
        const a = navLink.querySelector('a');
        if (a) {
          a.classList.add('footer-new__nav-link');
          a.setAttribute('data-cmp-clickable', '');
          if (navLabel) {
            a.textContent = navLabel.textContent.trim();
            moveInstrumentation(navLabel, a);
          }
          li.append(a);
          moveInstrumentation(navLink, li);
        }
      }
      ul.append(li);
      moveInstrumentation(itemNode, li);
    });
    navDiv.append(ul);
    moveInstrumentation(groupNode, ul);
  });
  topContentDiv.append(navDiv);
  footerNewDiv.append(topContentDiv);

  const bottomContentDiv = document.createElement('div');
  bottomContentDiv.classList.add('footer-new__bottom-content');

  const containerDiv = document.createElement('div');
  containerDiv.classList.add('footer-new__container');

  const itcTitlesDiv = document.createElement('div');
  itcTitlesDiv.classList.add('footer-new__itc-titles');

  const footerTitleLink1 = block.querySelector('[data-aue-prop="footerTitleLink1"]');
  if (footerTitleLink1) {
    const a = footerTitleLink1.querySelector('a');
    if (a) {
      a.classList.add('footer-desc-1');
      itcTitlesDiv.append(a);
      moveInstrumentation(footerTitleLink1, itcTitlesDiv);
    }
  }

  const footerTitleLink2 = block.querySelector('[data-aue-prop="footerTitleLink2"]');
  if (footerTitleLink2) {
    const a = footerTitleLink2.querySelector('a');
    if (a) {
      a.classList.add('footer-desc-1');
      itcTitlesDiv.append(a);
      moveInstrumentation(footerTitleLink2, itcTitlesDiv);
    }
  }
  containerDiv.append(itcTitlesDiv);

  const socialMediaDiv = document.createElement('div');
  socialMediaDiv.classList.add('footer-new__social-media');

  const socialLinks = block.querySelectorAll('[data-aue-model="footerSocialLink"]');
  socialLinks.forEach((socialLinkNode) => {
    const socialLink = socialLinkNode.querySelector('[data-aue-prop="socialLink"]');
    if (socialLink) {
      const a = socialLink.querySelector('a');
      if (a) {
        const socialType = a.getAttribute('data-social');
        if (socialType) {
          a.classList.add(`footer-icon-${socialType}`);
        }
        socialMediaDiv.append(a);
        moveInstrumentation(socialLink, socialMediaDiv);
      }
    }
    moveInstrumentation(socialLinkNode, socialMediaDiv);
  });
  containerDiv.append(socialMediaDiv);

  bottomContentDiv.append(containerDiv);
  footerNewDiv.append(bottomContentDiv);

  block.textContent = '';
  block.append(footerNewDiv);
  block.className = `${block.dataset.blockName} block`;
  block.dataset.blockStatus = 'loaded';
}
