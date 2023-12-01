function signin() {
  document.body.style.overflow = 'hidden'

  const signinPlacementDiv = document.getElementById('signinPlacementDiv');
  const loginPlacementDiv = document.getElementById('loginPlacementDiv');
  const signinInnerDiv = document.getElementById('signinInnerDiv');

  loginPlacementDiv.style.display = 'none'

  let innerValues = window.getComputedStyle(signinInnerDiv);
  let placementValues = window.getComputedStyle(signinPlacementDiv);
  // Retrieve the computed width and height
  let signinInnerDivWidth = parseFloat(innerValues.getPropertyValue('width'));
  let signinInnerDivHeight = parseFloat(innerValues.getPropertyValue('height'));

  let signinPlacementDivPadding =  parseFloat(placementValues.getPropertyValue('padding'));
  signinPlacementDiv.style.width = (window.innerWidth - signinPlacementDivPadding * 2) + 'px';
  signinPlacementDiv.style.height = window.innerHeight + 'px';

  // Display the signinPlacementDiv
      signinPlacementDiv.style.display = 'flex';


  // Update the size on window resize
  signinPlacementDiv.addEventListener('click',(event)=>{
      if (event.target === signinPlacementDiv) {
          signinInnerDiv.classList.add('signin-hidden');
          // Optionally, set a timeout to remove the signin-inner class after the animation completes
          setTimeout(() => {
            signinPlacementDiv.style.display = 'none';
            signinInnerDiv.classList.remove('signin-hidden');
            window.location.href = "/";
          }, 500); // Assuming the animation duration is 0.5 seconds
        }
    })

  window.addEventListener('resize', () => {
    signinPlacementDiv.style.width = window.innerWidth + 'px';
    signinPlacementDiv.style.height = window.innerHeight + 'px';

    if (signinInnerDivHeight > window.innerHeight || signinInnerDivWidth > window.innerWidth) {
      // Add the signin-hidden class to trigger the animation
      signinInnerDiv.classList.add('signin-hidden');

      // Optionally, set a timeout to remove the signin-inner class after the animation completes
      setTimeout(() => {
        signinPlacementDiv.style.display = 'none';
        signinInnerDiv.classList.remove('signin-hidden');
      }, 500); // Assuming the animation duration is 0.5 seconds
    }
  });
}

const submitButtonSignin = document.getElementById('submitButtonSignin')
submitButtonSignin.addEventListener('click',() =>{
  const divErrorElement = document.getElementsByClassName('error-message')
  usernameVaule = usernameInputSignin.value
  divErrorElement.style.display = 'none'


})


function feedbackElements(catagory, message) {
  signin();
  if (catagory.includes('error') ){
      console.log(catagory + 'Error')
      const divErrorElement = document.getElementById(catagory + 'Error');
      divErrorElement.style.display = 'block';
      divErrorElement.textContent = message;
  } else {
      console.log(catagory + 'Vaild')
      const divErrorElement = document.getElementById(catagory + 'Vaild');
      divErrorElement.style.display = 'block';
      divErrorElement.textContent = message;

  }
};




  