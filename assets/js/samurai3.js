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
    if (keys["d"]) {
      positionX += speed;
      if (positionX > window.innerWidth - 200) { // Doubled from 100
        positionX = window.innerWidth - 200;
      }
      facingRight = true;
      samurai.style.transform = "scaleX(2.08) scaleY(2.08)"; // Doubled scale
    }
    // Move left
    if (keys["a"]) {
      positionX -= speed;
      if (positionX < 0) {
        positionX = 0;
      }
      facingRight = false;
      samurai.style.transform = "scaleX(-2.08) scaleY(2.08)"; // Doubled scale
    }
    // Move up
    if (keys["w"]) {
      positionY -= speed;
      if (positionY < 0) {
        positionY = 0;
      }
    }
    // Move down
    if (keys["s"]) {
      positionY += speed;
      if (positionY > window.innerHeight - 200) { // Doubled from 100
        positionY = window.innerHeight - 200;
      }
    }
    
    container.style.left = positionX + 'px';
    container.style.top = positionY + 'px';
    
    checkIfInProfileContainer();
  };

  window.addEventListener("keydown", function (ev) {
    if (["a", "d", "w", "s"].includes(ev.key)) {
      classes = Array.from(samurai.classList);
      removeClasses();
      keys[ev.key] = true;

      switch (ev.key) {
        case "d":
        case "a":
        case "w":
        case "s":
          samurai.classList.add("run");
          break;
      }
    }
  });

  window.addEventListener("keyup", function (ev) {
    if (["a", "d", "w", "s"].includes(ev.key)) {
      keys[ev.key] = false;
      if (!keys["a"] && !keys["d"] && !keys["w"] && !keys["s"]) {
        setIdle();
      }
    }
  });

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