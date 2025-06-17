
window.addEventListener("load", function () {
  const samurai = document.querySelector(".samurai");
  const container = document.querySelector(".samurai-container");
  const profileImageContainer = document.getElementById("profileImageContainer");
  let classes = null;
  let keys = {};
  
  // Get profile image container position for initial placement
  const profileRect = profileImageContainer.getBoundingClientRect();
  let positionX = profileRect.left + profileRect.width / 2 - 46; // More accurate centering (96px is samurai width)
  let positionY = profileRect.top + profileRect.height / 2 - 66;
  
  const speed = 10;
  let facingRight = true;
  let isInProfileContainer = true;
  let isNearNebulaButton = false; // Track proximity to nebula button
  
  // Set initial position in profile container
  container.style.left = positionX + 'px';
  container.style.top = positionY + 'px';

  const removeClasses = () => {
    classes.forEach((classe) => {
      if (classe !== "samurai") {
        samurai.classList.remove(classe);
      }
    });
  };

  const setIdle = () => {
    removeClasses();
    samurai.classList.add("idle");
  };

  const checkNebulaButtonProximity = () => {
    const nebulaButton = document.querySelector('.nebula-button-north');
    if (!nebulaButton) return false;
    
    const nebulaRect = nebulaButton.getBoundingClientRect();
    const samuraiCenterX = positionX + 100; // Center of samurai (doubled size)
    const samuraiCenterY = positionY + 100;
    
    // Expanded interaction area - check if samurai is within 50px of button edges
    const proximityDistance = 50;
    const wasNearButton = isNearNebulaButton;
    
    isNearNebulaButton = (
      samuraiCenterX >= nebulaRect.left - proximityDistance &&
      samuraiCenterX <= nebulaRect.right + proximityDistance &&
      samuraiCenterY >= nebulaRect.top - proximityDistance &&
      samuraiCenterY <= nebulaRect.bottom + proximityDistance
    );
    
    // Simulate CSS hover state when near
    if (wasNearButton !== isNearNebulaButton) {
      if (isNearNebulaButton) {
        // Apply the same hover effect from CSS by directly styling the checkmark
        const checkmark = nebulaButton.querySelector('.checkmark');
        if (checkmark) {
          checkmark.style.transform = 'scale(1.1)';
          checkmark.style.boxShadow = '0 0 12px rgba(75, 94, 170, 0.5)';
        }
      } else {
        // Remove hover effect
        const checkmark = nebulaButton.querySelector('.checkmark');
        if (checkmark) {
          checkmark.style.transform = '';
          checkmark.style.boxShadow = '';
        }
      }
    }
    
    return isNearNebulaButton;
  };

  const checkIfInProfileContainer = () => {
    const profileRect = profileImageContainer.getBoundingClientRect();
    const samuraiCenterX = positionX + 100; // 100 is half of doubled samurai width
    const samuraiCenterY = positionY + 100; // 100 is half of doubled samurai height
    
    const wasInProfile = isInProfileContainer;
    isInProfileContainer = (
      samuraiCenterX >= profileRect.left &&
      samuraiCenterX <= profileRect.right &&
      samuraiCenterY >= profileRect.top &&
      samuraiCenterY <= profileRect.bottom
    );
    
    // Update profile container appearance based on samurai position
    if (wasInProfile !== isInProfileContainer) {
      if (isInProfileContainer) {
        profileImageContainer.style.background = '#ffffff';
      } else {
        profileImageContainer.style.background = '#f0f0f0';
      }
    }
  };

  const updatePosition = () => {
    // Move right
    if (keys["d"] || keys["ArrowRight"]) {
      positionX += speed;
      if (positionX > window.innerWidth - 200) { // Doubled from 100
        positionX = window.innerWidth - 200;
      }
      facingRight = true;
      samurai.style.transform = "scaleX(2.08) scaleY(2.08)"; // Doubled scale
    }
    // Move left
    if (keys["a"] || keys["ArrowLeft"]) {
      positionX -= speed;
      if (positionX < 0) {
        positionX = 0;
      }
      facingRight = false;
      samurai.style.transform = "scaleX(-2.08) scaleY(2.08)"; // Doubled scale
    }
    // Move up
    if (keys["w"] || keys["ArrowUp"]) {
      positionY -= speed;
      if (positionY < 0) {
        positionY = 0;
      }
    }
    // Move down
    if (keys["s"] || keys["ArrowDown"]) {
      positionY += speed;
      if (positionY > window.innerHeight - 200) { // Doubled from 100
        positionY = window.innerHeight - 200;
      }
    }
    
    container.style.left = positionX + 'px';
    container.style.top = positionY + 'px';
    
    checkIfInProfileContainer();
    checkNebulaButtonProximity(); // Check button proximity every frame
  };

  window.addEventListener("keydown", function (ev) {
    classes = Array.from(samurai.classList);
    console.log("keydown");
    removeClasses();
    keys[ev.key] = true;
    
    switch (ev.key) {
      case "d":
      case "ArrowRight":
        samurai.style.transform = "scaleX(2.08) scaleY(2.08)";
        samurai.classList.add("run");
        break;
      case "a":
      case "ArrowLeft":
        samurai.style.transform = "scaleX(-2.08) scaleY(2.08)";
        samurai.classList.add("run");
        break;
      case "w":
      case "s":
      case "ArrowUp":
      case "ArrowDown":
        samurai.classList.add("run");
        break;
      case "k":
        samurai.classList.add("attack");
        // Check if samurai is near nebula button and toggle it
        if (isNearNebulaButton) {
          const toggleButton = document.getElementById('toggleAuthor');
          if (toggleButton) {
            toggleButton.click();
            console.log("Nebula button toggled!"); // Debug log
          }
        }
        break;
    }
  });

  window.addEventListener("keyup", function (ev) {
    keys[ev.key] = false;
    setIdle();
  });

  setInterval(() => {
    for (let key in keys) {
      if (!keys["a"] && !keys["d"] && !keys["w"] && !keys["s"] && !keys["k"] && 
          !keys["ArrowLeft"] && !keys["ArrowRight"] && !keys["ArrowUp"] && !keys["ArrowDown"]) {
        setIdle();
      }
    }
  }, 100);

  // Handle window resize
  window.addEventListener("resize", function() {
    const profileRect = profileImageContainer.getBoundingClientRect();
    // If samurai is still in profile area, update position
    if (isInProfileContainer) {
      positionX = profileRect.left + profileRect.width / 2 - 96; // More accurate centering
      positionY = profileRect.top + profileRect.height / 2 - 96;
      container.style.left = positionX + 'px';
      container.style.top = positionY + 'px';
    }
  });

  // Game loop for smooth movement
  function gameLoop() {
    updatePosition();
    requestAnimationFrame(gameLoop);
  }
  
  gameLoop();
});