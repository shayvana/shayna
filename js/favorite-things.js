document.addEventListener('DOMContentLoaded', function() {
    const folders = document.querySelectorAll('.folder');
    const popup = document.getElementById('folder-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupGrid = document.getElementById('popup-grid');
    const closeBtn = document.querySelector('.close-btn');

    folders.forEach(folder => {
        folder.addEventListener('click', function() {
            const folderName = this.dataset.folder;
            const images = this.dataset.images.split(',');
            popupTitle.textContent = this.querySelector('.folder-name').textContent;
            popupGrid.innerHTML = '';
            images.forEach(image => {
                popupGrid.innerHTML += `
                    <img src="images/${folderName}/${image}" alt="${image}">
                `;
            });
            popup.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});