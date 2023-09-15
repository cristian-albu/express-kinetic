const iterateOverCardList = async (list, right, opacity, ms) => {
    for (let i = 0; i < list.length; i++) {
        list[i].style.right = right;
        list[i].style.opacity = opacity;
        await new Promise((res) => setTimeout(res, ms));
    }
};

const observerCallback = (entries) => {
    const cardList = Array.from(document.querySelectorAll(".service-card"));
    if (entries[0].isIntersecting) {
        iterateOverCardList(cardList, "0px", "1", 75);
    } else {
        iterateOverCardList(cardList, "-200px", "0", 75);
    }
};

if (window.innerWidth > 900) {
    const container = document.querySelector("#servicii");
    const observer = new IntersectionObserver(observerCallback, { threshold: "0.6" });
    observer.observe(container);
}
