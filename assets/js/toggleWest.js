document.addEventListener('DOMContentLoaded', function() {
    const toggleWestButton = document.getElementById('toggleWest');
    const westContainer = document.querySelector('.west-container');
    const mainCard = document.querySelector('.card-container');
    const samuraiContainer = document.querySelector('.samurai-container');
    const northButton = document.getElementById("nebula-button-north");
    const eastButton = document.getElementById("nebula-button-east");

    let isWestActive = false;
    
    function toggleWest() {
        if (!isWestActive) {
            // Show West section
            mainCard.classList.add('slide-right-hide');
            westContainer.classList.add('slide-left-show');
            toggleWestButton.setAttribute('aria-expanded', 'true');
            northButton.style.visibility = 'hidden';
            eastButton.style.visibility = 'hidden';
            isWestActive = true;
            

            // Hide samurai when West section is shown
            samuraiContainer.classList.add('hidden');
        } else {
            // Hide West section
            westContainer.classList.remove('slide-left-show');
            mainCard.classList.remove('slide-right-hide');
            toggleWestButton.setAttribute('aria-expanded', 'false');
            northButton.style.visibility = 'visible';
            eastButton.style.visibility = 'visible';
            isWestActive = false;
            
            // Show samurai when returning to main view
            samuraiContainer.classList.remove('hidden');
        }
    }
    
    // Toggle on checkbox change
    toggleWestButton.addEventListener('change', toggleWest);
});