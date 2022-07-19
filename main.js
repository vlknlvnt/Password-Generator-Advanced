// Getting letters, numbers and symbols

// Starting from 97, pick one among 26 codes (which stands for letters) randomly
let getLower = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

let getUpper = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);   
}

let getNumber = () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

let getSymbol = () => {
    return String.fromCharCode(Math.floor(Math.random() * 15) + 33);
}

let randomFunctions = { 
    lower: getLower,
    upper: getUpper,
    number: getNumber,
    symbol: getSymbol
 };

// Selecting items in HTML body 
const showResult = document.getElementById('result');
const createBtn = document.getElementById('create-pass');
const copyBtn = document.getElementById('copy');

// Creating & showing generated password in HTML
createBtn.addEventListener('click', () => {
    const inputValue = document.getElementById('pass-length').value; // Getting input value
    const length = +inputValue; // Length equals in input value // + turns the value to number because at first it was string

    // Getting checkbox's if they're checked
    const hasLower = document.getElementById('lowercase').checked;  
    const hasUpper = document.getElementById('uppercase').checked;  
    const hasSymbol = document.getElementById('sign').checked;  
    const hasNumber = document.getElementById('number').checked;  

    showResult.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length); // show the result of generatePassword as an innertext

});

const generatePassword = (lower, upper, number, symbol, length) => {
    
    let generatedPassword = ''; // at first its an empty string

    const optionsCount = lower + upper + number + symbol; 
    const optionsArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]); // putting them into an array, filter out unchecked, get their values
      

    if(optionsCount === 0) {
		return ''; // if an option has no value, it does nothing
	}
    // create a loop
	for(let i=0; i<length; i+=optionsCount) { // get all values in optionsCount
		optionsArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunctions[funcName]();
		});
	}
	
	const finalPassword = generatedPassword.slice(0, length); // length equals to length of the array of generatedPassword
	
	return finalPassword;

}

// Copying the password
copyBtn.addEventListener('click', () => {
    const password = showResult.innerText;
    if (!password) // if there is no password, do nothing
        return

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(password);

   // After copyying, if password exists, message appears
   if (password) {

        var modalArea = document.getElementById('modal');

        setTimeout(function () {modalArea.classList.add('copymessage')}, 100);
        setTimeout(function () {modalArea.classList.remove('copymessage')}, 4000);

   }

})
