export default class Slider {
  constructor(slidesContainer, slidesLength, leftBtn, rightBtn, navigatorDots) {
    this.slidesContainer = slidesContainer;
    this.slidesLength = slidesLength;
    this.originalLength = slidesLength - 2; // Adjust for cloned slides
    this.index = 1;
    this.navigationIndex = 0;
    this.navigatorDots = Array.from(navigatorDots);
    this.leftBtn = leftBtn;
    this.rightBtn = rightBtn;
    this.transitioning = false;
    //necessary data for mobile swipe functionality
    this.startX = 0;
    this.currentX = 0;
    this.treshold = 70; // Minimum swipe distance to trigger slide change
    this.leftBtn.addEventListener("click", () => {
      this.moveSlide(-1);
    });
    this.rightBtn.addEventListener("click", () => {
      this.moveSlide(1);
    });
    // Initialize the slider position
    this.slidesContainer.style.transform = "translateX(-100%)";

    // Listen for transition end to handle looping
    this.slidesContainer.addEventListener("transitionend", () => {
      this.checkLoop();
    });

    this.navigatorDots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        this.goToSlide(i);
      });
    });

    //listeners for mobile swipe functionality

    this.slidesContainer.addEventListener("touchstart", (e) => {
      this.handleTouchStart(e);
    });
    this.slidesContainer.addEventListener("touchmove", (e) => {
      this.handleTouchMove(e);
    });
    this.slidesContainer.addEventListener("touchend", () => {
      this.handleTouchEnd();
    });
  }

  moveSlide(direction) {
    //avoid multiclicking during transition
    if (this.transitioning) return;
    this.transitioning = true;

    // Update indices
    this.index += direction;
    // Update navigation index with wrap-around
    this.navigationIndex =
      (this.navigationIndex + direction + this.originalLength) %
      this.originalLength;

    // Move the slides container
    this.slidesContainer.style.transform = `translateX(-${this.index * 100}%)`;
    // Update navigator dots
    this.updateNavigators();
  }

  updateNavigators() {
    // Update the visual state of navigator dots
    this.navigatorDots.forEach((dot, i) => {
      if (i === this.navigationIndex) {
        dot.classList.remove("bg-gray-400");
        dot.classList.add("bg-gray-700");
      } else {
        dot.classList.remove("bg-gray-700");
        dot.classList.add("bg-gray-400");
      }
    });
  }

  goToSlide(slideIndex) {
    if (this.transitioning) return;
    this.transitioning = true;
    const distance = Math.abs(this.navigationIndex - slideIndex);

    this.index = slideIndex + 1; // Adjust for cloned slide at start
    this.navigationIndex = slideIndex; // Adjust to slide index

    if (distance > 1) {
      this.slidesContainer.style.transition = "none";
      this.slidesContainer.style.transform = `translateX(-${
        this.index * 100
      }%)`;
      setTimeout(() => {
        this.slidesContainer.style.transition = "transform 0.9s ease-in-out";
        this.transitioning = false;
      }, 20);
    } else {
      //avoid malfunctioning caused by the asynchronous reset of transitioning via setTimeout
      this.slidesContainer.style.transition = "transform 0.9s ease-in-out";

      this.slidesContainer.style.transform = `translateX(-${
        this.index * 100
      }%)`;
    }

    this.updateNavigators();
  }

  checkLoop() {
    // Optional: handle infinite loop logic here if needed

    // Check if we need to jump to the cloned slide
    const requiredJumpCondition =
      this.index === 0 || this.index === this.slidesLength - 1;

    if (requiredJumpCondition) {
      if (this.index === this.slidesLength - 1) {
        // Jump to the first real slide without transition
        this.slidesContainer.style.transition = "none";
        this.slidesContainer.style.transform = "translateX(-100%)";
        //reset index to real first slide
        this.index = 1;

        // Reset transition and position after jump
        setTimeout(() => {
          this.slidesContainer.style.transition = "transform 0.9s ease-in-out";
          this.transitioning = false;
        }, 20);
      }

      if (this.index === 0) {
        // Jump to the last real slide without transition
        this.slidesContainer.style.transition = "none";
        this.slidesContainer.style.transform = `translateX(-${
          (this.slidesLength - 2) * 100
        }%)`;
        //reset index to real last slide
        this.index = this.slidesLength - 2;

        // Reset transition and position after jump
        setTimeout(() => {
          this.slidesContainer.style.transition = "transform 0.9s ease-in-out";
          this.transitioning = false;
        }, 20);
      }
    } else {
      this.transitioning = false;
    }
  }

  //mobile swipe functionality methods
  handleTouchStart(event) {
    this.slidesContainer.style.transition = "none";
    this.startX = event.touches[0].clientX;
  }

  handleTouchMove(event) {
    event.preventDefault(); // Prevent scrolling while swiping
    this.currentX = event.touches[0].clientX;

    const dragDistance = this.currentX - this.startX;
    const baseTranslatePercentage = -this.index * 100;

    this.slidesContainer.style.transform = `translateX(calc(${baseTranslatePercentage}% + ${dragDistance}px))`;
  }

  handleTouchEnd() {
    this.slidesContainer.style.transition = "transform 0.5s ease-in-out";
    const deltaX = this.startX - this.currentX;

    if (Math.abs(deltaX) > this.treshold) {
      if (deltaX > 0) {
        this.moveSlide(1); // Swipe right, move to previous slide
      } else {
        this.moveSlide(-1); // Swipe left, move to next slide
      }
    } else {
      // Torna alla posizione dell'indice attuale (animato grazie alla riga 1)
      this.slidesContainer.style.transform = `translateX(-${
        this.index * 100
      }%)`;
    }

    /* if (Math.abs(deltaX) <= this.threshold) {
      // Torna alla posizione dell'indice attuale (animato grazie alla riga 1)
      this.slidesContainer.style.transform = `translateX(-${
        this.index * 100
      }%)`;
    } */
    //reset values
    this.startX = 0;
    this.currentX = 0;
  }
}
