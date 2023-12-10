const sideMenuBut = document.getElementById('menuBar');
const sideMenu = document.getElementById('sideMenu');
const mainCon = document.getElementById('main');
const menuIconsText = Array.from(document.getElementsByClassName('menuIconsText'))


sideMenu.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevents the click event from reaching the document
    sideMenu.classList.toggle('active');
    mainCon.classList.toggle('sideBar');

});

// Function to check if the scroll has passed a specific element
function scrolledPast(element) {
    // Get the position of the element relative to the viewport
    const bounding = element.getBoundingClientRect();
    return bounding.bottom > 0 ? bounding.bottom : 0;
}

// Listen for the scroll event
window.addEventListener('scroll', function () {
    const header = document.getElementById('headerContent');
    // The header has scrolled past, you can now update sideMenu's top position
    const value = scrolledPast(header);
    sideMenu.style.top = Math.abs(value + 10) + 'px';
});
