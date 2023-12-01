// Declare a variable to store the currently active fetch request
let activeFetchRequest = null;

function searchMovies() {
    movieSearch.style.boxShadow = 'none'
    // Cancel the active fetch request if it exists
    if (activeFetchRequest) {
        activeFetchRequest.abort();
    }
    resultBox.classList.remove('appear');
    resultBox.style.paddingBottom = '0px'
    setTimeout(()=>{
        resultBox.style.paddingBottom = '20px'
    },1030)
    resultBox.style.height = '0px';
    resultBox.innerHTML = '';

    var movieTitle = document.getElementById('movieSearch').value;
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=df467e9d0f181da999e923e5b5ee05a0&query=${movieTitle}&sort_by=release_date.desc`;

    // Use the 'fetch' function and store the promise in the activeFetchRequest variable
    activeFetchRequest = fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Check if the 'activeFetchRequest' is still the current fetch request
            if (activeFetchRequest) {
                resultBox.style.visibility = 'visible';
                if (data.results && data.results.length > 0) {
                    for (let i = 0; i < 5; i++) {
                        let title = data.results[i].title;
                        let Rdate = data.results[i].release_date ? data.results[i].release_date : 'NA';
                        let moviePoster = data.results[i].poster_path;  // Fixed property name

                        // Check if the movie has a poster image
                        let movieBox = document.createElement('div');
                        movieBox.className = 'movieBox';

                        let movieImg = document.createElement('img');  // Changed to 'img' element
                        movieImg.className = 'movieImg';
                        movieImg.style.width = '40px';
                        movieImg.style.height = '60px';

                        if (moviePoster) {
                            let posterPath = `https://image.tmdb.org/t/p/w500${moviePoster}`;
                            movieImg.src = posterPath;
                            movieImg.alt = 'Movie Poster';
                        }

                        let movieInfo = document.createElement('div');
                        movieInfo.className = 'movieInfo';

                        let movieTitleElem = document.createElement('div');
                        movieTitleElem.className = 'movieTitle';
                        movieTitleElem.dataset.title = title;
                        let strongTitle = document.createElement('strong');
                        strongTitle.textContent = truncateText(title, 30);
                        movieTitleElem.appendChild(strongTitle);

                        let movieRDate = document.createElement('div');
                        movieRDate.className = 'movieRDate';
                        movieRDate.textContent = Rdate;

                        movieInfo.appendChild(movieTitleElem);
                        movieInfo.appendChild(movieRDate);

                        movieBox.appendChild(movieImg);
                        movieBox.appendChild(movieInfo);

                        resultBox.appendChild(movieBox);
                    }

                    // Clear the activeFetchRequest variable after processing the data
                    activeFetchRequest = null;

                    // Adjust the height of the result box after appending movies
                    resultBox.style.height = (resultBox.scrollHeight - 10 - parseInt(getComputedStyle(resultBox).padding) * 2) + 'px';
                    resultBox.classList.add('appear');
                }
            }
        })
        .catch(error => {
            // Handle errors...

            // Clear the activeFetchRequest variable in case of an error
            activeFetchRequest = null;
        });
}

document.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchMovies();
    }
});

function truncateText(content, maxCharacters) {
    if (content.length > maxCharacters) {
        return content.substring(0, maxCharacters) + '...';
    } else {
        return content;
    }
}
