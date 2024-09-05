// Function to save images in local storage
function saveToLocalStorage(images) {
    localStorage.setItem('gallery-images', JSON.stringify(images));
}

// Function to get images from local storage
function getFromLocalStorage() {
    const storedImages = localStorage.getItem('gallery-images');
    return storedImages ? JSON.parse(storedImages) : [];
}

// Function to render images stored in local storage
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

        // Event listener for deleting images
        deleteButton.addEventListener('click', function() {
            gallery.removeChild(imageContainer);
            deleteImageFromStorage(imageData.name); // Delete from local storage
        });

        imageContainer.appendChild(img);
        imageContainer.appendChild(p);
        imageContainer.appendChild(deleteButton);

        gallery.appendChild(imageContainer);
    });
}

// Function to delete an image from local storage
function deleteImageFromStorage(imageName) {
    let images = getFromLocalStorage();
    images = images.filter(image => image.name !== imageName);
    saveToLocalStorage(images); // Save updated list to local storage
}

// Function to upload new images and save them to local storage
function uploadImages() {
    const gallery = document.getElementById('gallery-images');
    const files = document.getElementById('image-upload').files;
    let storedImages = getFromLocalStorage(); // Get current stored images

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

            // Add event listener to delete the image
            deleteButton.addEventListener('click', function() {
                gallery.removeChild(imageContainer);
                deleteImageFromStorage(file.name); // Remove from local storage
            });

            imageContainer.appendChild(img);
            imageContainer.appendChild(p);
            imageContainer.appendChild(deleteButton);

            gallery.appendChild(imageContainer);

            // Save image data to local storage
            storedImages.push({ src: e.target.result, name: file.name });
            saveToLocalStorage(storedImages);
        };

        reader.readAsDataURL(file);
    }
}

// Call this function when the page loads to render any stored images
document.addEventListener('DOMContentLoaded', renderStoredImages);