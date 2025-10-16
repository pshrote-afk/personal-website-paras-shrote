document.addEventListener('DOMContentLoaded', function() {
    const toggleEastButton = document.getElementById('toggleEast');
    const eastContainer = document.querySelector('.east-container');
    const mainCard = document.querySelector('.card-container');
    const samuraiContainer = document.querySelector('.samurai-container');
    const northButton = document.getElementById("nebula-button-north");

    let isEastActive = false;
    
    function toggleEast() {
        if (!isEastActive) {
            // Show East section
            mainCard.classList.add('slide-left-hide');
            eastContainer.classList.add('slide-right-show');
            toggleEastButton.setAttribute('aria-expanded', 'true');
            northButton.style.visibility = 'hidden';
            isEastActive = true;
            

            // Hide samurai when East section is shown
            samuraiContainer.classList.add('hidden');
        } else {
            // Hide East section
            eastContainer.classList.remove('slide-right-show');
            mainCard.classList.remove('slide-left-hide');
            toggleEastButton.setAttribute('aria-expanded', 'false');
            northButton.style.visibility = 'visible';
            isEastActive = false;
            
            // Show samurai when returning to main view
            samuraiContainer.classList.remove('hidden');
        }
    }
    
    // Toggle on checkbox change
    toggleEastButton.addEventListener('change', toggleEast);
});