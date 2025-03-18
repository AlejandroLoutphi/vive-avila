
document.addEventListener("DOMContentLoaded", () => {
    const fullscreen = document.getElementById("fullscreen");
    const fullscreenImg = document.getElementById("fullscreen-img");
    const images = document.querySelectorAll(".photo");
    const backButton = document.getElementById("back");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    let currentIndex = 0;

    const showFullscreen = (index) => {
        fullscreen.style.display = "flex";
        fullscreenImg.src = images[index].src;
        currentIndex = index;
    };

    const hideFullscreen = () => {
        fullscreen.style.display = "none";
    };

    const showPrev = () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        fullscreenImg.src = images[currentIndex].src;
    };

    const showNext = () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        fullscreenImg.src = images[currentIndex].src;
    };

    images.forEach((img, index) => {
        img.addEventListener("click", () => showFullscreen(index));
    });

    backButton.addEventListener("click", hideFullscreen);
    prevButton.addEventListener("click", showPrev);
    nextButton.addEventListener("click", showNext);
});
