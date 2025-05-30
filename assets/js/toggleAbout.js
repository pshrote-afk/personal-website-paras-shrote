    const toggle = document.getElementById('toggleAbout');
    const mainCard = document.querySelector('body > .card-container');
    const aboutContainer = document.querySelector('.about-container');

    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        mainCard.classList.add('slide-down-hide');
        aboutContainer.classList.add('slide-down-show');
        aboutContainer.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
      } else {
        mainCard.classList.remove('slide-down-hide');
        aboutContainer.classList.remove('slide-down-show');
        aboutContainer.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
