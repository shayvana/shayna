document.addEventListener('DOMContentLoaded', function() {
    const folders = document.querySelectorAll('.folder');
    const popup = document.getElementById('folder-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupGrid = document.getElementById('popup-grid');
    const closeBtn = document.querySelector('.close-btn');
    const pokedexItems = document.querySelectorAll('.pokedex-item');

    folders.forEach(folder => {
        folder.addEventListener('click', function() {
            const folderName = this.dataset.folder;
            popupTitle.textContent = this.textContent;
            popupGrid.innerHTML = `
                <img src="placeholder1.jpg" alt="Placeholder">
                <img src="placeholder2.jpg" alt="Placeholder">
                <img src="placeholder3.jpg" alt="Placeholder">
                <img src="placeholder4.jpg" alt="Placeholder">
            `;
            popup.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    pokedexItems.forEach(item => {
        item.addEventListener('click', function() {
            const fullDesc = this.querySelector('.full-desc');
            const shortDesc = this.querySelector('.short-desc');
            if (fullDesc.style.display === 'none') {
                fullDesc.style.display = 'block';
                shortDesc.style.display = 'none';
            } else {
                fullDesc.style.display = 'none';
                shortDesc.style.display = 'block';
            }
        });
    });

    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
});