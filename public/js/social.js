

// Function to fetch pictures and their comments
async function fetchPicturesAndComments() {
    try {
        const picturesResponse = await axios.get('http://localhost:9090/social/get-pictures');
        const pictures = picturesResponse.data;

        for (const picture of pictures) {
            const commentsResponse = await axios.get(`http://localhost:9090/social/get-comments/${picture.id}`);
            const comments = commentsResponse.data;
            renderPicture(picture, comments);
        }
    } catch (error) {
        console.error('Error fetching pictures and comments:', error);
    }
}

// Function to render a picture and its comments
function renderPicture(picture, comments) {
    const picturePlaceholder = document.getElementById('picturePlaceholder');

    // Create elements for the picture and comments
    const card = document.createElement('div');
    card.classList.add('card', 'mt-3');

    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = picture.imageUrl;
    img.alt = 'Picture';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = picture.description;

    const commentList = document.createElement('ul');
    commentList.classList.add('list-group', 'list-group-flush');

    for (const comment of comments) {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = comment.comment;
        commentList.appendChild(listItem);
    }

    // Create form for adding comments
    const commentForm = document.createElement('form');
    commentForm.classList.add('mt-2');
    commentForm.innerHTML = `
        <div class="mb-3">
            <label for="commentInput" class="form-label">Add Comment:</label>
            <input type="text" class="form-control" id="commentInput" placeholder="Enter your comment">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    `;

    // Event listener for comment submission
    commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const commentInput = document.getElementById('commentInput').value;
        if (commentInput.trim() !== '') {
            try {
                const response = await axios.post(`http://localhost:9090/social/post-comment/${picture.id}`, {
                    comment: commentInput
                });
                const newComment = response.data.comment;
                renderNewComment(newComment, commentList);
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        }
    });

    // Append elements to the card
    cardBody.appendChild(description);
    cardBody.appendChild(commentList);
    cardBody.appendChild(commentForm);
    card.appendChild(img);
    card.appendChild(cardBody);

    // Append the card to the picturePlaceholder
    picturePlaceholder.appendChild(card);
}

// Function to render a new comment
function renderNewComment(comment, commentList) {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.textContent = comment.comment;
    commentList.appendChild(listItem);
}

// Function to handle form submission for posting a new picture
async function submitPictureForm(event) {
    event.preventDefault();
    const imageUrl = document.getElementById('imageUrl').value;
    const description = document.getElementById('description').value;

    try {
        const response = await axios.post('http://localhost:9090/social/post-picture', {
            imageUrl,
            description
        });

        const picture = response.data.picture;

        // Fetch and render the newly added picture with its comments
        const commentsResponse = await axios.get(`http://localhost:9090/social/get-comments/${picture.id}`);
        const comments = commentsResponse.data;
        renderPicture(picture, comments);
    } catch (error) {
        console.error('Error posting picture:', error);
    }
}

// Event listener for form submission to post a new picture
document.getElementById('pictureForm').addEventListener('submit', submitPictureForm);

// Fetch pictures and comments when the page loads
fetchPicturesAndComments();


// Function to render a picture and its comments
function renderPicture(picture, comments) {
    const picturePlaceholder = document.getElementById('picturePlaceholder');

    // Create elements for the picture and comments
    const card = document.createElement('div');
    card.classList.add('card', 'mt-3');

    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.src = picture.imageUrl;
    img.alt = 'Picture';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const description = document.createElement('p');
    description.classList.add('card-text');
    description.textContent = picture.description;

    const commentList = document.createElement('ul');
    commentList.classList.add('list-group', 'list-group-flush');

    for (const comment of comments) {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = comment.comment;
        commentList.appendChild(listItem);
    }

    // Create form for adding comments
    const commentForm = document.createElement('form');
    commentForm.classList.add('mt-2');
    commentForm.innerHTML = `
        <div class="mb-3">
            <label for="commentInput" class="form-label">Add Comment:</label>
            <input type="text" class="form-control" id="commentInput" placeholder="Enter your comment">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    `;

    // Event listener for comment submission
    commentForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const commentInput = document.getElementById('commentInput').value;
        if (commentInput.trim() !== '') {
            try {
                const response = await axios.post(`http://localhost:9090/social/post-comment/${picture.id}`, {
                    comment: commentInput
                });
                const newComment = response.data.comment;
                renderNewComment(newComment, commentList);
            } catch (error) {
                console.error('Error posting comment:', error);
            }
        }
    });

    // Append elements to the card
    cardBody.appendChild(description);
    cardBody.appendChild(commentList);
    cardBody.appendChild(commentForm);
    card.appendChild(img);
    card.appendChild(cardBody);

    // Append the card to the picturePlaceholder
    picturePlaceholder.appendChild(card);
}
