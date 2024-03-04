// public/js/social.js

// Define constants and variables
const pictureForm = document.querySelector('#pictureForm');
const imageUrl = document.querySelector('#imageUrl');
const description = document.querySelector('#description');
const submitPictureBtn = document.querySelector('#submitPictureBtn');
const picturePlaceholder = document.querySelector('#picturePlaceholder');

// Event listener for submitting picture
submitPictureBtn.addEventListener('click', postPicture);

// Function to display pictures and comments
async function displayPicturesAndComments() {
    // Function implementation -------------------------------------------------
   

// Function to handle displaying images
function displayImages() {
    // Select the image container
    const imageContainer = document.querySelector('.img-container');

    // Set the source of the image
    const imageUrl = 'imageUrl'; // Replace 'path_to_your_image.jpg' with your image URL
    const imageAlt = 'Image Description'; // Replace 'Image Description' with a suitable description

    // Set the image source and alt attribute
    imageContainer.innerHTML = `<img src="${imageUrl}" alt="${imageAlt}">`;

    // Show the image container by changing its visibility
    imageContainer.style.visibility = 'visible';
}

// Call the function to display images
displayImages();
//--------------------------------------------------------------


}

// Function to handle posting a picture
async function postPicture(event) {
    event.preventDefault(); // Prevent form submission

    try {
        // Send picture data to the server
        const response = await axios.post('http://localhost:9090/social/post-picture', {
            imageUrl: imageUrl.value,
            description: description.value
        });

        // Clear the form fields after successful submission
        imageUrl.value = '';
        description.value = '';

        // Refresh the displayed pictures and comments
        displayPicturesAndComments();
    } catch (error) {
        console.error(error);
    }
}

// Initial call to display pictures and comments when the page loads
displayPicturesAndComments();
