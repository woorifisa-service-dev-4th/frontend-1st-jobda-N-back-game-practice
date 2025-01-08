document.addEventListener("DOMContentLoaded", () => {
    const photoContainer = document.querySelector(".photo");
    const displayedImages = JSON.parse(localStorage.getItem('displayedImages')) || [];

    displayedImages.forEach((imageSrc, index) => {
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('container');
        containerDiv.innerHTML = `
            <div>${index + 1}</div>
            <img src="${imageSrc}" alt="image${index + 1}">
        `;
        photoContainer.appendChild(containerDiv);
    });
});