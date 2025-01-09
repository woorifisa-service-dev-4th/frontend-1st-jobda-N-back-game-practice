document.addEventListener("DOMContentLoaded", () => {
    const photoContainer = document.querySelector(".photo");
    const displayedImages = JSON.parse(localStorage.getItem("displayedImages")) || [];
    const userInputs = JSON.parse(localStorage.getItem("userInputs")) || {};
    const comparisonResults = JSON.parse(localStorage.getItem("comparisonResults")) || [];

    let correctCount = 0;
    let incorrectCount = 0;
    displayedImages.forEach((imageSrc, index) => {
        const containerDiv = document.createElement("div");
        containerDiv.classList.add("container");

        if (userInputs[index] !== comparisonResults[index]) {
            containerDiv.classList.add("container-incorrect");
            incorrectCount++;
        } else {
            correctCount++;
        }
        if (userInputs[index] !== comparisonResults[index]) {
            containerDiv.classList.add("container-incorrect");
        }
        containerDiv.innerHTML = `
            <div>${index + 1}</div>
            <img src="${imageSrc}" alt="image${index + 1}">
        `;
        photoContainer.appendChild(containerDiv);
    });

    // 정답 및 오답 개수를 업데이트
    const correctAnswerDiv = document.querySelector(".correct-answer");
    const incorrectAnswerDiv = document.querySelector(".incorrect-answer");

    correctAnswerDiv.textContent = `정답 ${correctCount - 3}개`;
    incorrectAnswerDiv.textContent = `오답 ${incorrectCount}개`;

    console.log(userInputs);
    console.log(comparisonResults);
});
