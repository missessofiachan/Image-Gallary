function saveToLocalStorage(images) {
    localStorage.setItem('gallery-images', JSON.stringify(images));
}

function getFromLocalStorage() {
    const storedImages = localStorage.getItem('gallery-images');
    return storedImages ? JSON.parse(storedImages) : [];
}

function renderStoredImages() {
    const gallery = document.getElementById('gallery-images');
    const storedImages = getFromLocalStorage();

    storedImages.forEach(imageData => {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        const img = document.createElement('img');
        img.src = imageData.src;
        img.alt = imageData.name;

        const p = document.createElement('p');
        p.textContent = imageData.name;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-btn');

        deleteButton.addEventListener('click', function() {
            gallery.removeChild(imageContainer);
            deleteImageFromStorage(imageData.name);
        });

        imageContainer.appendChild(img);
        imageContainer.appendChild(p);
        imageContainer.appendChild(deleteButton);

        gallery.appendChild(imageContainer);
    });
}

function deleteImageFromStorage(imageName) {
    let images = getFromLocalStorage();
    images = images.filter(image => image.name !== imageName);
    saveToLocalStorage(images);
}

function uploadImages() {
    const gallery = document.getElementById('gallery-images');
    const files = document.getElementById('image-upload').files;
    let storedImages = getFromLocalStorage();

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');

            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = file.name;

            const p = document.createElement('p');
            p.textContent = file.name;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');

            deleteButton.addEventListener('click', function() {
                gallery.removeChild(imageContainer);
                deleteImageFromStorage(file.name);
            });

            imageContainer.appendChild(img);
            imageContainer.appendChild(p);
            imageContainer.appendChild(deleteButton);

            gallery.appendChild(imageContainer);

            storedImages.push({ src: e.target.result, name: file.name });
            saveToLocalStorage(storedImages);
        };

        reader.readAsDataURL(file);
    }
}

document.addEventListener('DOMContentLoaded', renderStoredImages);