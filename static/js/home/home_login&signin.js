
function handleMovieClick(movieId) {
    // Make an AJAX request to your Flask backend
    fetch('/add_movie', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            movie_id: movieId,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server, if needed
        console.log(data);
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });
}
