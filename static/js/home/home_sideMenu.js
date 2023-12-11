const sideMenuBut = document.getElementById('menuBar');
const sideMenu = document.getElementById('sideMenu');
const mainCon = document.getElementById('main');
const menuIconsText = Array.from(document.getElementsByClassName('menuIconsText'))


sideMenu.addEventListener('click', function (event) {
    if (event.target){
        event.stopPropagation(); // Prevents the click event from reaching the document
        sideMenu.classList.toggle('active');
        mainCon.classList.toggle('sideBar');
    }


    // Toggle the document click event listener
    if (sideMenu.classList.contains('active')) {
        sideMenu.addEventListener('mouseleave', closeSideMenu);
    } else {
        document.removeEventListener('click', closeSideMenu);
    }
});

function closeSideMenu(event) {
    if (!sideMenu.contains(event.Target)) {
        sideMenu.classList.remove('active');

        mainCon.classList.remove('sideBar');
        document.removeEventListener('click', closeSideMenu);
    }
}



// Function to check if the scroll has passed a specific element
function scrolledPast(element) {
    // Get the position of the element relative to the viewport
    const bounding = element.getBoundingClientRect();
    if (bounding.bottom > 0 ){
        value = bounding.bottom
    }else{
        value = 0
    }
    
    // Check if the bottom of the element is above the top of the viewport
    return value;
}

// Listen for the scroll event
window.addEventListener('scroll', function() {
    const header = document.getElementById('headerContent');
        // The header has scrolled past, you can now update sideMenu's top position
        value = scrolledPast(header)
            sideMenu.style.top = Math.abs((value + 10)) + 'px';
            console.log(value);

});

