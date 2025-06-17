const toggle = document.getElementById('toggleAuthor');
const mainCard = document.querySelector('body > .card-container');
const authorContainer = document.querySelector('.author-container');
const samuraiContainer = document.querySelector('.samurai-container');

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    mainCard.classList.add('slide-down-hide');
    authorContainer.classList.add('slide-down-show');
    authorContainer.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    
    // Hide samurai when Author section is shown
    samuraiContainer.classList.add('hidden');
  } else {
    mainCard.classList.remove('slide-down-hide');
    authorContainer.classList.remove('slide-down-show');
    authorContainer.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    
    // Show samurai when returning to main view
    samuraiContainer.classList.remove('hidden');
  }
});