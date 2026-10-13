'use strict';

const menu = document.querySelector('.menu-toggle');
const navigation = document.getElementById('nav-links');

if (menu && navigation) {
  document.body.classList.add('menu-enabled');
  menu.hidden = false;

  function closeMenu() {
    menu.setAttribute('aria-expanded', 'false');
    menu.querySelector('span').textContent = '+';
    navigation.classList.remove('open');
  }

  menu.addEventListener('click', () => {
    const isOpen = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(isOpen));
    menu.querySelector('span').textContent = isOpen ? '−' : '+';
    navigation.classList.toggle('open', isOpen);
  });

  navigation.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });

  matchMedia('(min-width: 1001px)').addEventListener('change', closeMenu);
}

const sampleSelector = document.querySelector('.sample-selector');
const sampleChoices = document.querySelectorAll('input[name="experiment-source"]');
const sampleGrid = document.getElementById('experiment-grid');
const sampleDescription = document.getElementById('sample-description');

if (sampleSelector && sampleChoices.length && sampleGrid && sampleDescription) {
  const samples = {
    fake: {
      source: 'AI-generated sample',
      subject: 'AI-generated image of a dog on a lawn',
      description: 'AI-generated sample: a dog on a lawn, before and after localized inpainting.',
      original: 'fake.png'
    },
    real: {
      source: 'real photograph',
      subject: 'photograph of a man wearing a traditional hat',
      description: 'Real photograph: a portrait, before and after localized inpainting.',
      original: 'real.jpg'
    },
    treering: {
      source: 'Tree-Ring watermarked sample',
      subject: 'Tree-Ring watermarked image of an animal wearing sunglasses',
      description: 'Tree-Ring watermarked sample: a generated animal portrait, before and after localized inpainting.',
      original: 'treering.png'
    },
    stablesig: {
      source: 'Stable Signature watermarked sample',
      subject: 'Stable Signature watermarked image of a mountain landscape',
      description: 'Stable Signature watermarked sample: a generated mountain landscape, before and after localized inpainting.',
      original: 'stablesig.png'
    }
  };

  function updateSample() {
    const key = document.querySelector('input[name="experiment-source"]:checked')?.value;
    const sample = samples[key];
    if (!sample) return;

    sampleGrid.querySelectorAll('figure[data-variant]').forEach(figure => {
      const variant = figure.dataset.variant;
      const method = variant === 'lama' ? 'LaMa' : 'ZITS';
      const filename = variant === 'original' ? sample.original : `${key}_${variant}.png`;
      const image = figure.querySelector('img');
      const link = figure.querySelector('a');
      const path = `assets/thesis/${filename}`;

      image.alt = variant === 'original'
        ? `Original ${sample.subject}`
        : `${sample.subject} after localized inpainting with ${method}`;
      image.src = path;
      link.href = path;
      link.setAttribute('aria-label', `Open ${variant === 'original' ? 'original' : method + ' edited'} ${sample.source} at full resolution`);
    });
    sampleDescription.textContent = sample.description;
  }

  sampleChoices.forEach(choice => choice.addEventListener('change', updateSample));
  sampleSelector.hidden = false;
  updateSample();
}
