document.addEventListener("DOMContentLoaded", () => {
    const images = [
        "image/type1-1.png",
        "image/type1-2.png",
        "image/type1-3.png"
    ];

    const imageElement = document.querySelector(".small-gray-box img");
    const finalStepElement = document.querySelector(".final-step");
    const totalStepElement = document.querySelector(".total-step");

    let initialIndex = 0;
    let initialPhase = true;
    let displayedImages = [];

    function changeImage() {
        if (initialIndex < images.length) {
            imageElement.src = images[initialIndex];
            initialIndex++;
        } else {
            initialPhase = false;
            const randomIndex = Math.floor(Math.random() * images.length);
            imageElement.src = images[randomIndex];
        }
        displayedImages.push(imageElement.src);
        localStorage.setItem('displayedImages', JSON.stringify(displayedImages));
    }

    function updateFinalStep() {
        let timeLeft = 3;
        finalStepElement.textContent = timeLeft;

        const interval = setInterval(() => {
            timeLeft--;
            if (timeLeft === 0) {
                changeImage();
                timeLeft = 3;

                if (!initialPhase) {
                    let totalSteps = parseInt(totalStepElement.textContent.split(' ')[2]);
                    if (totalSteps > 0) {
                        totalSteps--;
                        totalStepElement.textContent = `남은 문항 ${totalSteps}`;
                    }
                    if (totalSteps === 0) {
                        window.location.href = "result_page.html";
                    }
                }
            }
            finalStepElement.textContent = timeLeft;
        }, 1000);
    }

    changeImage();
    updateFinalStep();
});
