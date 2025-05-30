window.addEventListener("load", function () {
  const samurai = document.querySelector(".samurai");
  const container = document.querySelector(".samurai-container");
  let classes = null;
  let keys = {};
  let positionX = window.innerWidth / 2;
  let positionY = window.innerHeight / 2;
  const speed = 15;
  let facingRight = true;
  
  // Set initial position
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

  const updatePosition = () => {
    // Move right
    if (keys["d"] && !keys["k"]) {
      positionX += speed;
      if (positionX > window.innerWidth - 200) {
        positionX = window.innerWidth - 200;
      }
      facingRight = true;
      samurai.style.transform = "scaleX(4) scaleY(4)";
    }
    // Move left
    if (keys["a"] && !keys["k"]) {
      positionX -= speed;
      if (positionX < 100) {
        positionX = 100;
      }
      facingRight = false;
      samurai.style.transform = "scaleX(-4) scaleY(4)";
    }
    // Move up
    if (keys["w"] && !keys["k"]) {
      positionY -= speed;
      if (positionY < 100) {
        positionY = 100;
      }
    }
    // Move down
    if (keys["s"] && !keys["k"]) {
      positionY += speed;
      if (positionY > window.innerHeight - 200) {
        positionY = window.innerHeight - 200;
      }
    }
    
    container.style.left = positionX + 'px';
    container.style.top = positionY + 'px';
  };

  window.addEventListener("keydown", function (ev) {
    if (["a", "d", "w", "s", "k"].includes(ev.key)) {
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
        case "k":
          samurai.classList.add("attack");
          // Maintain facing direction during attack
          samurai.style.transform = facingRight ? "scaleX(4) scaleY(4)" : "scaleX(-4) scaleY(4)";
      }
    }
  });

  window.addEventListener("keyup", function (ev) {
    if (["a", "d", "w", "s", "k"].includes(ev.key)) {
      keys[ev.key] = false;
      if (!keys["a"] && !keys["d"] && !keys["w"] && !keys["s"] && !keys["k"]) {
        setIdle();
      }
    }
  });

  // Game loop for smooth movement
  function gameLoop() {
    updatePosition();
    requestAnimationFrame(gameLoop);
  }
  
  gameLoop();
});
