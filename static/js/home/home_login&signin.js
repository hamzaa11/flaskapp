function feedbackElements(catagory, message, type) {
    if (type === 'signin'){signin();}
    if (type === 'login'){login();}
    console.log('i hate this')

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