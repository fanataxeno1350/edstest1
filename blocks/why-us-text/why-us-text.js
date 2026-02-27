export default function decorate(block) {
  const whyUsTextContainer = document.createElement('div');
  whyUsTextContainer.id = 'text-ac7d0b8693';
  whyUsTextContainer.className = 'whyustext-container';

  [...block.children].forEach((row) => {
    // Assuming each row corresponds to a heading, subheading, or spacer
    const cells = [...row.children];

    // Heading
    if (cells[0]) {
      const headingText = cells[0].textContent.trim();
      if (headingText) {
        const h1Heading = document.createElement('h1');
        h1Heading.className = 'whyustext-heading';
        h1Heading.textContent = headingText;
        whyUsTextContainer.append(h1Heading);
      }
    }

    // Subheading
    if (cells[1]) {
      const subheadingText = cells[1].textContent.trim();
      if (subheadingText) {
        const h1Subheading = document.createElement('h1');
        h1Subheading.className = 'whyustext-subheading';
        h1Subheading.textContent = subheadingText;
        whyUsTextContainer.append(h1Subheading);
      }
    }

    // Spacer
    if (cells[2]) {
      const spacerText = cells[2].textContent.trim();
      const h1Spacer = document.createElement('h1');
      h1Spacer.className = 'whyustext-spacer';
      h1Spacer.textContent = spacerText || ' ';
      whyUsTextContainer.append(h1Spacer);
    }
  });

  block.textContent = '';
  block.append(whyUsTextContainer);
}
