//DOM Elements
const codeBox = document.querySelector('aside code');
const copyBtn = document.querySelector('aside #copy-btn');
const blurControl = document.querySelector('#blur-control');
const opacityControl = document.querySelector('#opacity-control');
const colorControl = document.querySelector('#color-control');
const target = document.querySelectorAll('.target');
const shadowControl = document.querySelector('#shadow-control');

//Control Variables
let colorValue = 'rgba(210, 189, 189,0.04)'
let rgbColor = 'rgba(210, 189, 189'
let alphaValue = 0.04
let shadowValue = 0.20
let shadowString = `0 8px 32px 0 rgba(14, 15, 18, 0.20)`;
let blurValue = 5;
let blurString = `blur(${blurValue}px)`;

//To set the sliders default values
blurControl.value = 5
shadowControl.value = shadowValue
opacityControl.value = alphaValue

shadowControl.parentElement.querySelector('.name .indicator').innerText = shadowValue;
opacityControl.parentElement.querySelector('.name .indicator').innerText = alphaValue;
blurControl.parentElement.querySelector('.name .indicator').innerText = blurValue;

//Functions
//..............................
//Color format transformation function
function hexToRGB(h) {
    let r, g, b = 0;

    if (h.length == 4) {
        r = parseInt(h[1] + h[1], 16);
        g = parseInt(h[2] + h[2], 16);;
        b = parseInt(h[3] + h[3], 16);
    } else if (h.length == 7) {
        r = parseInt(h[1] + h[2], 16);
        g = parseInt(h[3] + h[4], 16);
        b = parseInt(h[5] + h[6], 16);
    }

    return `rgba( ${r}, ${g}, ${b}`;
}
// Code Output
function codeOutput() {
    codeBox.innerHTML = Prism.highlight(`
    background: ${colorValue};
    box-shadow: ${shadowString};
    backdrop-filter: ${blurString};
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    `, Prism.languages.javascript, 'javascript');
}

//Copy to clipboard 

copyBtn.addEventListener('click', () => {
    let dummy = document.createElement('textarea');
    dummy.innerText = codeBox.textContent;
    document.body.appendChild(dummy)
    dummy.select()
    dummy.setSelectionRange(0, 99999)
    document.execCommand("copy")
    document.body.removeChild(dummy)
    copyBtn.innerText = "Copied!!"
    setTimeout(() => {
        copyBtn.innerText = "Copy"
    }, 4000)
})

//Event Listeners
blurControl.addEventListener('input', () => {
    blurValue = event.target.value
    blurString = `blur(${blurValue}px)`
    target.forEach(item => item.style.backdropFilter = `${blurString}`)
    let indicator = blurControl.parentElement.querySelector('.name .indicator');
    indicator.innerText = event.target.value;
    codeOutput()
})
opacityControl.addEventListener('input', () => {
    alphaValue = event.target.value;
    colorValue = `${rgbColor},${alphaValue})`
    target.forEach(item => item.style.background = colorValue)
    let indicator = opacityControl.parentElement.querySelector('.name .indicator');
    indicator.innerText = alphaValue;
    codeOutput()
})
colorControl.addEventListener('input', () => {
    rgbColor = hexToRGB(event.target.value)
    colorValue = `${rgbColor}, ${alphaValue})`
    target.forEach(item => item.style.background = colorValue)
    let indicator = colorControl.parentElement.querySelector('.name .indicator');
    indicator.innerText = event.target.value;
    codeOutput()
})
shadowControl.addEventListener('input', () => {
    shadowValue = event.target.value
    shadowString = `0 8px 32px 0 rgba(14, 15, 18, ${event.target.value})`
    target.forEach(item => item.style.boxShadow = shadowString)
    let indicator = shadowControl.parentElement.querySelector('.name .indicator');
    indicator.innerText = shadowValue;
    codeOutput()
})

codeOutput()