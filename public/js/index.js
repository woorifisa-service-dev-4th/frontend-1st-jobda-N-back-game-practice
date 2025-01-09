document.addEventListener("DOMContentLoaded", () => {
    const shapes = document.querySelectorAll('.shapes-container img');

    shapes.forEach(shape => {
        const randomDelay = Math.random();
        shape.style.setProperty('--random', randomDelay);
    });
});


const button = document.querySelector("button");

button.addEventListener("click", () => {
    window.location.href = "ready_page.html";
});
