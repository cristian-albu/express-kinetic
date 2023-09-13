function buildBtnContainer(sliderContainer) {
    const sliderBtnContainer = document.createElement("div");
    const sliderBtnLeft = document.createElement("button");
    const sliderBtnRight = document.createElement("button");
    sliderBtnContainer.classList.add("t-btn-container");
    sliderBtnLeft.innerText = "<";
    sliderBtnRight.innerText = ">";
    sliderBtnLeft.classList.add("t-btn");
    sliderBtnRight.classList.add("t-btn");
    sliderBtnContainer.appendChild(sliderBtnLeft);
    sliderBtnContainer.appendChild(sliderBtnRight);
    sliderContainer.appendChild(sliderBtnContainer);
    return { sliderBtnLeft, sliderBtnRight };
}

function applyStyles(list) {
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
            zIndex = "3";
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
}

function getSliders(sliderContainer) {
    const sliderCards = [];
    document.querySelectorAll(".t-card").forEach((e) => sliderCards.push(e));
    const sliderCardsLength = sliderCards.length;
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
}

function handleLeftClick(sliderCards) {
    sliderCards.unshift(sliderCards.pop());
    applyStyles(sliderCards);
}

function handleRightclick(sliderCards) {
    sliderCards.push(sliderCards.shift());
    applyStyles(sliderCards);
}

function handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
        handleLeftClick();
    }

    if (event.key === "ArrowRight") {
        handleRightclick();
    }
}

const keyDownListenerCallback = (entries) => {
    if (entries[0].isIntersecting) {
        document.addEventListener("keydown", handleKeyDown);
    } else {
        document.removeEventListener("keydown", handleKeyDown);
    }
};

if (window.innerWidth > 900) {
    const sliderContainer = document.querySelector(".t-container");
    const sliderCards = getSliders(sliderContainer);
    const { sliderBtnLeft, sliderBtnRight } = buildBtnContainer(sliderContainer);

    sliderBtnLeft.addEventListener("click", function () {
        handleLeftClick(sliderCards);
    });
    sliderBtnRight.addEventListener("click", function () {
        handleRightclick(sliderCards);
    });

    const observer = new IntersectionObserver(keyDownListenerCallback, { rootMargin: "0px", threshold: 1.0 });
    observer.observe(sliderContainer);
}
