document.addEventListener("DOMContentLoaded", () => {
    const images = ["image/type1-1.png", "image/type1-2.png", "image/type1-3.png"];

    const imageElement = document.querySelector(".small-gray-box img");
    const finalStepElement = document.querySelector(".final-step");
    const totalStepElement = document.querySelector(".total-step");
    const centeredTextElement = document.querySelector(".centered-text");

    let initialIndex = 0;
    let initialPhase = true;
    let displayedImages = [];
    let canReceiveInput = false;

    function changeImage() {
        if (initialIndex < images.length) {
            imageElement.src = images[initialIndex];
            initialIndex++;
            centeredTextElement.textContent = "제시되는 도형을 기억해주세요";
        } else {
            initialPhase = false;
            const randomIndex = Math.floor(Math.random() * images.length);
            imageElement.src = images[randomIndex];
            centeredTextElement.innerHTML = "화면에 제시되는 도형이 몇 번째 전 도형과 같은지 키보드로 판단해 주세요";
        }
        displayedImages.push(imageElement.src);
        localStorage.setItem("displayedImages", JSON.stringify(displayedImages));
    }

    function updateFinalStep() {
        let timeLeft = 3;
        finalStepElement.textContent = timeLeft;

        const interval = setInterval(() => {
            timeLeft--;
            if (timeLeft === 0) {
                changeImage();
                timeLeft = 3;
                canReceiveInput = true; // 키보드 입력을 받을 수 있는 상태로 설정

                if (!initialPhase) {
                    let totalSteps = parseInt(totalStepElement.textContent.split(" ")[2]);
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

    document.addEventListener("keydown", function (event) {
        if (canReceiveInput && event.code === "Space") {
            document.querySelector(".gray-box").classList.add("selected");
            canReceiveInput = false; // 입력을 받은 후에는 다시 입력을 받을 수 없도록 설정
        }
    });

    changeImage();
    updateFinalStep();
});
