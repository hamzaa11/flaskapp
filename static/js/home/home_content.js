const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const imgDiv = document.getElementById('bg_img')
const overlay = document.getElementById('overlay')
const searchCon = document.getElementById('search-container')
const resultBox = document.getElementById('resultBox')
if (window.innerWidth > 1300){
    imgDiv.style.width = 1400 + 'px'
}



function updateWidth(){
    console.log(imgDiv.offsetWidth + 'px,', imgDiv.offsetHeight + 'px')
    overlay.style.width = imgDiv.offsetWidth + 'px'
    overlay.style.height = imgDiv.offsetHeight + 'px'
    resultBox.style.width = searchCon.offsetWidth - 42 + 'px'
}

updateWidth()


window.addEventListener('resize',updateWidth)

localStorage.setItem('RefreshRoute', '/');

// On page load, check if there's a stored route in localStorage and use it
if (performance.navigation.type === 1) {
    // Redirect to a new URL
    window.location.href = '/';
  }

