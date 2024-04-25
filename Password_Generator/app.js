const inputSlider = document.querySelector("[lengthSlider]")
const lengthDisplay = document.querySelector("[lengthContainer]")
const passwordDisplay = document.querySelector("[passwordDisplay]")
const copyBtn = document.querySelector("[dataCopy]")
const copyMsg = document.querySelector("[dataCopyMsg]")
const upperaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const numbersCheck = document.querySelector("#numbers")
const symbolsCheck = document.querySelector("#symbols")
const indicator = document.querySelector(".indicator")
const generateBtn = document.querySelector(".generateButton")
const allCheckBox = document.querySelector("input[type=checkbox]")
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password = "";
let passwordLength = 10;
let checkCount = 0;


function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ((passwordLength - min)*100/(max - min) + "% 100%");
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    // shadow
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

handleSlider();
setIndicator("#ccc");

function getrandomInteger(min, max){
    return Math.floor(Math.random() * (max-min)) + min;

}

function generateRandNumber(){
    return getrandomInteger(0,9);
}

function generateLowercase(){
    return String.fromCharCode(getrandomInteger(97, 123))
}

function generateUppercase(){
    return String.fromCharCode(getrandomInteger(65, 90))
}

function generateSymbol(){
    const randNum = getrandomInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calculateStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbol = false;

    if(upperaseCheck.checked)
        hasUpper = true;
    if(lowercaseCheck.checked)
        hasLower = true;
    if(numbersCheck.checked)
        hasNumber = true;
    if(symbolsCheck.checked)
        hasSymbol = true;

    if(hasLower && hasUpper && (hasNumber || hasSymbol) && passwordLength >= 8){
        setIndicator("#0f0");
    }
    else if((hasLower || hasUpper) && (hasNumber || hasSymbol) && passwordLength >= 6)
        setIndicator("#ff0");
    else    
        setIndicator("#f00"); 
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = 'Copied';
    }
    catch(e){
        copyMsg.innerText = 'Failed';
    }

    //to make copy wala span visible
    copyMsg.classList.add('active')
    setTimeout(() => {
        copyMsg.classList.remove('active');
    }, 2000);
}

function shufflePassword(array){
    //Fisher Yates method
    for(let i=array.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str +=  el));
    return str;
}

function handleCheckBox(){
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    // Special condition
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handleCheckBox());
})

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyContent();
})

generateBtn.addEventListener('click', () => {
    //none of the checkbox are selected
    if(checkCount <= 0) return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the journey to find new password
    console.log("Starting the journey");

    //remove old password
    password = "";

    // let's put the stuff mentioned by checkboxes

    // if(upperaseCheck.checked){
    //     password += generateUpperCase;
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandNumbers();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }

    let funcArr = [];

    if(upperaseCheck.checked)
        funcArr.push(generateUppercase);

    if(lowercaseCheck.checked)
        funcArr.push(generateLowercase);

    if(numbersCheck.checked)
        funcArr.push(generateRandNumber);

    if(symbolsCheck.checked)
        funcArr.push(generateSymbol);

    // compulsory addition
    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }
    console.log("compulsary addition done")

    //remaining addition
    for(let i=0; i<passwordLength-funcArr.length; i++){
        let randIndex = getrandomInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    console.log("remaining addition done");

    //suffle the password
    password = shufflePassword(Array.from(password));
    console.log("Shuffling done");

    // show in UI
    passwordDisplay.value = password;
    console.log("UI done");

    ///calculate strength
    calculateStrength();
    
})