function login() {
    document.body.style.overflow = 'hidden';
    const loginPlacementDiv = document.getElementById('loginPlacementDiv');
    const loginInnerDiv = document.getElementById('loginInnerDiv');
    const signinPlacementDiv = document.getElementById('signinPlacementDiv')
    signinPlacementDiv.style.display = 'none'
    let innerValues = window.getComputedStyle(loginInnerDiv);
    let placementValues = window.getComputedStyle(loginPlacementDiv);
    // Retrieve the computed
    let loginInnerDivWidth = parseFloat(innerValues.getPropertyValue('width'));
    let loginInnerDivHeight = parseFloat(innerValues.getPropertyValue('height'));

    let loginPlacementDivPadding = parseFloat(placementValues.getPropertyValue('padding'));
  
    loginPlacementDiv.style.width = (window.innerWidth - loginPlacementDivPadding*2 ) + 'px' ;
    loginPlacementDiv.style.height = window.innerHeight + 'px';

    // Display the loginPlacementDiv
        loginPlacementDiv.style.display = 'flex';

  
    // Update the size on window resize
    loginPlacementDiv.addEventListener('click',(event)=>{
        if (event.target === loginPlacementDiv) {
            loginInnerDiv.classList.add('login-hidden');
            // Optionally, set a timeout to remove the login-inner class after the animation completes
            setTimeout(() => {
              loginPlacementDiv.style.display = 'none';
              loginInnerDiv.classList.remove('login-hidden');
              window.location.href = "/";
            }, 500); // Assuming the animation duration is 0.5 seconds
          }
      })

    window.addEventListener('resize', () => {
      loginPlacementDiv.style.width = window.innerWidth + 'px';
      loginPlacementDiv.style.height = window.innerHeight + 'px';

      if (loginInnerDivHeight > window.innerHeight || loginInnerDivWidth > window.innerWidth) {
        // Add the login-hidden class to trigger the animation
        loginInnerDiv.classList.add('login-hidden');
  
        // Optionally, set a timeout to remove the login-inner class after the animation completes
        setTimeout(() => {
          loginPlacementDiv.style.display = 'none';
          loginInnerDiv.classList.remove('login-hidden');
        }, 500); // Assuming the animation duration is 0.5 seconds
      }
    });
  }
  