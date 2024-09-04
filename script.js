function uploadImages() {
    const gallery = document.getElementById('gallery-images');
    const files = document.getElementById('image-upload').files;

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


            imageContainer.appendChild(img);
            imageContainer.appendChild(p);

            
            gallery.appendChild(imageContainer);
        };

        reader.readAsDataURL(file); 
    }
}
