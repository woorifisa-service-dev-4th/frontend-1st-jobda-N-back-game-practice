document.addEventListener("DOMContentLoaded", () => {
    const images = [
        ["image/type1-1.png", "image/type1-2.png", "image/type1-3.png"],
        ["image/type2-1.png", "image/type2-2.png", "image/type2-3.png"],
        ["image/type3-1.png", "image/type3-2.png", "image/type3-3.png"],
        ["image/type4-1.png", "image/type4-2.png", "image/type4-3.png"],
        ["image/type5-1.png", "image/type5-2.png", "image/type5-3.png"]
    ];
    const imageElement = document.querySelector(".small-gray-box img");
    const finalStepElement = document.querySelector(".final-step");
    const totalStepElement = document.querySelector(".total-step");
    const centeredTextElement = document.querySelector(".centered-text");
    let initialIndex = 0;
    let initialPhase = true;
    let totalSteps = 17;
    let displayedImages = [];
    let canReceiveInput = false;
    let userInputs = {};
    let inputIndex = 3;
    let comparisonResults = {};
    let resultIndex = 3;

    const typeIndex = Math.floor(Math.random() * images.length);
    let comparisonIndex = -1;
    function changeImage() {
        let imageIndex;
        do {
            imageIndex = Math.floor(Math.random() * images[0].length);
        } while (comparisonIndex === imageIndex);

        comparisonIndex = imageIndex;

        if (initialIndex < 3) {
            imageElement.src = images[typeIndex][imageIndex];
            initialIndex++;
            centeredTextElement.textContent = "제시되는 도형을 기억해주세요";
        } else {
            initialPhase = false;
            imageElement.src = images[typeIndex][imageIndex];
            centeredTextElement.innerHTML = "화면에 제시되는 도형이 몇 번째 전 도형과 같은지 키보드로 판단해 주세요";
            canReceiveInput = true;
            document.querySelector(".gray-box").classList.remove("selected");
            document.querySelector(".gray-box2").classList.remove("selected");
            document.querySelector(".gray-box3").classList.remove("selected");
        }
        displayedImages.push(imageElement.src);
        if (displayedImages.length > 3) {
            const currentImage = displayedImages[displayedImages.length - 1];
            const twoBackImage = displayedImages[displayedImages.length - 3];
            const threeBackImage = displayedImages[displayedImages.length - 4];
            if (currentImage === twoBackImage) {
                comparisonResults[resultIndex++] = "LeftArrow";
            } else if (currentImage === threeBackImage) {
                comparisonResults[resultIndex++] = "RightArrow";
            } else {
                comparisonResults[resultIndex++] = "Space";
            }
        }
        localStorage.setItem("displayedImages", JSON.stringify(displayedImages));
        localStorage.setItem("comparisonResults", JSON.stringify(comparisonResults));
    }
    function updateFinalStep() {
        let timeLeft = 3;
        finalStepElement.textContent = timeLeft;
        const interval = setInterval(() => {
            timeLeft--;
            if (timeLeft === 0) {
                if (totalSteps > 0) {
                    changeImage();
                    timeLeft = 3;
                }
                if (!initialPhase) {
                    if (totalSteps > 0) {
                        totalStepElement.textContent = `남은 문항 ${totalSteps}`;
                    }
                    if (totalSteps === 0) {
                        localStorage.setItem("userInputs", JSON.stringify(userInputs));
                        window.location.href = "result_page.html";
                    }
                    totalSteps--;
                }
            }
            finalStepElement.textContent = timeLeft;
        }, 1000);
    }
    document.addEventListener("keydown", function (event) {
        if (canReceiveInput) {
            let selectedBox;
            if (event.code === "Space") {
                selectedBox = document.querySelector(".gray-box");
                userInputs[inputIndex++] = "Space";
            } else if (event.code === "ArrowRight") {
                selectedBox = document.querySelector(".gray-box3");
                userInputs[inputIndex++] = "ArrowRight";
            } else if (event.code === "ArrowLeft") {
                selectedBox = document.querySelector(".gray-box2");
                userInputs[inputIndex++] = "ArrowLeft";
            }
            else {
                userInputs[inputIndex++] = "null";
            }
            if (selectedBox) {
                selectedBox.classList.add("selected");
                canReceiveInput = false;
            }
        }
    });
    changeImage();
    updateFinalStep();
});