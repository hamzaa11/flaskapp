const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const imgDiv = document.getElementById('bg_img')
const overlay = document.getElementById('overlay')


function setWidth(){
    imgDiv.style.width = screen.availWidth + 'px'

    if (screen.availWidth < 600){ 
        searchConDiv.style.width = (window.innerWidth - 100) + 'px'
    }

    overlay.style.width = screen.availWidth + 'px'
}
setWidth()


window.addEventListener('resize',setWidth)

localStorage.setItem('RefreshRoute', '/');

// On page load, check if there's a stored route in localStorage and use it
if (performance.navigation.type === 1) {
    // Redirect to a new URL
    window.location.href = '/';
  }

