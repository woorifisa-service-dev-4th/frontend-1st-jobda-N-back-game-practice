document.addEventListener("DOMContentLoaded", () => {
    let countdown = 10;
    const countdownElement = document.querySelector(".timer-container p");
    const skipButton = document.querySelector(".round-button");

    const interval = setInterval(() => {
        countdown--;
        countdownElement.textContent = `${countdown}초가 지나면 자동으로 시작합니다.`;
        if (countdown === 0) {
            clearInterval(interval);
            window.location.href = "main_page.html";
        }
    }, 1000);

    skipButton.addEventListener("click", () => {
        window.location.href = "main_page.html";
    });
});
