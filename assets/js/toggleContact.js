document.addEventListener('DOMContentLoaded', function() {
    const contactBtn = document.querySelector('.card-container .btn');
    const bioText = document.querySelector('.card-container .lower-container p');
    
    // Store original text
    const originalText = bioText.textContent.trim();
    const contactText = "mail: pshrote1@gmail.com<br><br>WhatsApp: +91 7744009712"; // contact placeholder
    
    let isContactMode = false;
    let typingInProgress = false;
    
    // Calculate typing speed: 160 WPM = ~13.3 chars/second = ~75ms per character
    const typingSpeed = 25;
    
    function typeText(text, element, callback) {
        if (typingInProgress) return;
        
        typingInProgress = true;
        element.innerHTML = '';
        
        let i = 0;
        
        function typeChar() {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1) + '<span class="typing-cursor">|</span>';
                i++;
                setTimeout(typeChar, typingSpeed);
            } else {
                // Remove cursor after typing is complete
                element.innerHTML = text;
                typingInProgress = false;
                if (callback) callback();
            }
        }
        
        typeChar();
    }
    
    contactBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (typingInProgress) return;
        
        if (!isContactMode) {
            // Switch to contact mode
            contactBtn.textContent = 'Info';
            typeText(contactText, bioText);
            isContactMode = true;
        } else {
            // Switch back to original mode - instant
            contactBtn.textContent = 'Contact now';
            bioText.innerHTML = originalText;
            isContactMode = false;
        }
    });
});

// Add CSS for typing cursor animation
const style = document.createElement('style');
style.textContent = `
    .typing-cursor {
        animation: blink 1s infinite;
        font-weight: bold;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);