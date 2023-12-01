const screenWidth = screen.availWidth
const imgDiv = document.getElementById('bg_img')
const overlay = document.getElementById('overlay')
const searchDiv = document.getElementById('search-bar')
const resultBox = document.getElementById('resultBox')
const movieSearch = document.getElementById('movieSearch')

function setWidth(){
    imgDiv.style.width = screen.availWidth + 'px'
    movieSearch.style.width = screen.availWidth + 'px'
    overlay.style.width = screen.availWidth + 'px'
}
setWidth()

function updateWidth(){
    setWidth()

}

window.addEventListener('resize',updateWidth)

localStorage.setItem('RefreshRoute', '/');

// On page load, check if there's a stored route in localStorage and use it
if (performance.navigation.type === 1) {
    // Redirect to a new URL
    window.location.href = '/';
  }