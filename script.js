
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let read = false;
let imagesLoaded = 0;
let totalImages = 0;
let apiImagesArray = [];

const loadCountAPI = 5
const apiKey = 'bjVy6tNV1_Qnf8QDIYzw6SaUHxSwfB0FXHJpHK4U3bQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query="street+photography"&count=${loadCountAPI}`;

//check if images are loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        loadCountAPI = 30;
    }
}

//helper function to set attributes on DOM elements
function settingAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links & photos, add to DOM
function displayImages() {
    imagesLoaded = 0;
    totalImages = apiImagesArray.length;
    //run for each function for objects of array
    apiImagesArray.forEach((photo) => {
        //create <a> to link to Unsplash
       const item = document.createElement('a');
       settingAttributes(item, {
        href: photo.links.html,
        target: '_blank',
       });
       //creare <img> for photo
       const img = document.createElement('img');
       settingAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
       });
       // Evenet listener to check loading
       img.addEventListener('load', imageLoaded);
       //put <img> inside <a>, then both inside image container
       item.appendChild(img);
       imageContainer.appendChild(item);
    });
}

async function getImages() {
    try {
        const res = await fetch(apiUrl);
        apiImagesArray = await res.json();
        displayImages();
    } catch (error) {
       // Catch Error Here
    }
}
// Checking to if scrolling is near bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getImages();
    }
})

getImages();