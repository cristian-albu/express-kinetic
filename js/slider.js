/**
 * Build a testimonial button
 * @param {string} text
 * @param {string} ariaLabel
 * @returns {HTMLButtonElement}
 */
const createButton = (text, ariaLabel) => {
    const button = document.createElement("button");
    button.ariaLabel = ariaLabel;
    button.innerText = text;
    button.classList.add("t-btn");
    return button;
};

/**
 * Builds a container for the left and right arrow buttons
 * @param {HTMLDivElement} sliderContainer - The container of the testimonials
 */
const buildBtnContainer = (sliderContainer) => {
    const sliderBtnContainer = document.createElement("div");
    sliderBtnContainer.classList.add("t-btn-container");

    const sliderBtnLeft = createButton("<", "Vezi testimonialul din stânga");
    const sliderBtnRight = createButton(">", "Vezi testimonialul din dreapta");

    sliderBtnContainer.appendChild(sliderBtnLeft);
    sliderBtnContainer.appendChild(sliderBtnRight);
    sliderContainer.appendChild(sliderBtnContainer);

    return { sliderBtnLeft, sliderBtnRight };
};

/**
 * Apply the styles for each slide, including the ones that may appear on the next left or right click.
 * @param {HTMLDivElement[]} list - The list of slides (testimonials)
 */
const applyStyles = (list) => {
    for (let i = 0; i < list.length; i++) {
        let left = "";
        let scale = "1";
        let zIndex = "1";
        let opacity = "0";
        if (i === 0) {
            left = "-30%";
            zIndex = "1";
            opacity = "0";
        } else if (i === 1) {
            left = "0%";
            zIndex = "2";
            opacity = "1";
        } else if (i === 2) {
            left = "35%";
            scale = "1.2";
            zIndex = "5";
            opacity = "1";
        } else if (i === 3) {
            left = "70%";
            zIndex = "2";
            opacity = "1";
        } else {
            left = "100%";
            zIndex = "1";
            opacity = "0";
        }
        list[i].classList.add("t-card-js");
        list[i].style.left = left;
        list[i].style.scale = scale;
        list[i].style.zIndex = zIndex;
        list[i].style.opacity = opacity;
    }
};

/**
 * Gets the existing slides as nodes, process them to be in a array of elements. Also handles edge cases for between 2 and 5 slides.
 * @param {HTMLDivElement} sliderContainer - The container of the testimonials
 * @returns {HTMLDivElement[]}
 */
const getSliders = (sliderContainer) => {
    const sliderCards = Array.from(document.querySelectorAll(".t-card"));
    const sliderCardsLength = sliderCards.length;

    // Handle edge cases so the animation is smooth by appending duplicate slides at each end of the array
    if (sliderCardsLength > 2 && sliderCardsLength < 5) {
        for (let i = 0; i < sliderCardsLength - 1; i++) {
            const postSlide = sliderCards[i].cloneNode(true);
            sliderCards.push(postSlide);
            sliderContainer.appendChild(postSlide);
        }
        const preSlide = sliderCards[sliderCardsLength - 1].cloneNode(true);
        sliderCards.unshift(preSlide);
        sliderContainer.insertBefore(preSlide, sliderContainer.firstChild);
    }

    applyStyles(sliderCards);
    return sliderCards;
};

/**
 * Pops the last element of the list and inserts it at the beginning and then reapplies the styles
 * @param {HTMLDivElement[]} sliderCards - An array of testimonials
 */
const handleLeftClick = (sliderCards) => {
    sliderCards.unshift(sliderCards.pop());
    applyStyles(sliderCards);
};

/**
 * Shifts the last element of the list and inserts it at the end and then reapplies the styles
 * @param {HTMLDivElement[]} sliderCards - An array of testimonials
 */
const handleRightClick = (sliderCards) => {
    sliderCards.push(sliderCards.shift());
    applyStyles(sliderCards);
};

/**
 * Handles the arrow left and arrow right for the slider
 * @param {KeyboardEvent} event - The native keydown event
 * @param {HTMLDivElement[]} sliderCards - An array of testimonials
 */
const handleKeyDown = (event, sliderCards) => {
    if (event.key === "ArrowLeft") handleLeftClick(sliderCards);
    if (event.key === "ArrowRight") handleRightClick(sliderCards);
};

/**
 * Wraps the Intersaction observer in order to provide a block context with sliderCards it
 * @param {HTMLDivElement} container - The container of the testimonials
 * @param {HTMLDivElement[]} sliderCards - An array of testimonials
 */
const observerWrapper = (container, sliderCards) => {
    /**
     * Add and remove keydown event listeners while the sliderContainer is in view
     * @param {*} entries - Observer entries
     */
    const keyDownListenerCallback = (entries) => {
        if (entries[0].isIntersecting) {
            document.addEventListener("keydown", function (event) {
                handleKeyDown(event, sliderCards);
            });
        } else {
            document.removeEventListener("keydown", function (event) {
                handleKeyDown(event, sliderCards);
            });
        }
    };

    const observer = new IntersectionObserver(keyDownListenerCallback);
    observer.observe(container);
};

// Make slider only for desktop
if (window.innerWidth > 900) {
    const sliderContainer = document.querySelector(".t-container");
    if (sliderContainer.querySelectorAll(".t-card").length >= 3) {
        const sliderCards = getSliders(sliderContainer);
        const { sliderBtnLeft, sliderBtnRight } = buildBtnContainer(sliderContainer);
        sliderBtnLeft.addEventListener("click", () => handleLeftClick(sliderCards));
        sliderBtnRight.addEventListener("click", () => handleRightClick(sliderCards));
        observerWrapper(sliderContainer, sliderCards);
    }
}
