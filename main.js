//DOM Elements
const root = document.querySelector(":root");
const codeBox = document.querySelector("aside code");
const copyBtn = document.querySelector("aside #copy-btn");
const blurControl = document.querySelector("#blur-control");
const opacityControl = document.querySelector("#opacity-control");
const colorControl = document.querySelector("#color-control");
const target = document.querySelectorAll(".target");
const shadowControl = document.querySelector("#shadow-control");

//Control Variables
let redValue = 189
let greenValue = 189
let blueValue = 189
let alphaValue = 0.14;
let colorValue = `rgba(${redValue}, ${greenValue}, ${blueValue},${alphaValue})`;
let rgbColor = "rgba(189, 189, 189";
let shadowValue = 0.2;
let shadowString = `0 8px 32px 0 rgba(14, 15, 18, 0.20)`;
let blurValue = 5;
let blurString = `blur(${blurValue}px)`;
const screenBG = [
    {
        bg: "brown",
        color: "#fff",
    },
    {
        bg: "#336699",
        color: "#fff",
    },
    {
        bg: "#9EE493",
        color: "#111",
    },
    {
        bg: "#077187",
        color: "#fff",
    },
    {
        bg: "#faa307",
        color: "#fff",
    },
    {
        bg: "#dc2f02",
        color: "#fff",
    },
    {
        bg: "#6bd425",
        color: "#111",
    },
    {
        bg: "#cd9777",
        color: "#111",
    },



];
let randIndex = Math.floor(Math.random() * screenBG.length);
root.style.setProperty("--screen-bg", screenBG[randIndex].bg);
root.style.setProperty("--screen-text", screenBG[randIndex].color);

//To set the sliders default values
blurControl.value = 5;
shadowControl.value = shadowValue;
opacityControl.value = alphaValue;

colorControl.parentElement.querySelector(
    ".indicator"
).innerText = `#${redValue.toString(16)}${greenValue.toString(16)}${blueValue.toString(16)}`;

shadowControl.parentElement.querySelector(
    ".name .indicator"
).innerText = shadowValue;
opacityControl.parentElement.querySelector(
    ".name .indicator"
).innerText = alphaValue;
blurControl.parentElement.querySelector(
    ".name .indicator"
).innerText = blurValue;

//Functions
//..............................
//Color format transformation function
function hexToRGB(h) {

    if (h.length == 4) {
        redValue = parseInt(h[1] + h[1], 16);
        greenValue = parseInt(h[2] + h[2], 16);
        blueValue = parseInt(h[3] + h[3], 16);
    } else if (h.length == 7) {
        redValue = parseInt(h[1] + h[2], 16);
        greenValue = parseInt(h[3] + h[4], 16);
        blueValue = parseInt(h[5] + h[6], 16);
    }
    colorValue = `rgba(${redValue}, ${greenValue}, ${blueValue},${alphaValue})`;
}
// Code Output
function codeOutput() {
    codeBox.innerHTML = Prism.highlight(
        `
    background: ${colorValue};
    box-shadow: ${shadowString};
    backdrop-filter: ${blurString};
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    `,
        Prism.languages.javascript,
        "javascript"
    );
}
codeOutput()
//Copy to clipboard

copyBtn.addEventListener("click", () => {
    let dummy = document.createElement("textarea");
    dummy.innerText = codeBox.textContent;
    document.body.appendChild(dummy);
    dummy.select();
    dummy.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.body.removeChild(dummy);
    copyBtn.innerText = "Copied!!";
    setTimeout(() => {
        copyBtn.innerText = "Copy";
    }, 4000);
});

//Event Listeners
blurControl.addEventListener("input", () => {
    blurValue = event.target.value;
    blurString = `blur(${blurValue}px)`;
    target.forEach((item) => (item.style.backdropFilter = `${blurString}`));
    let indicator = blurControl.parentElement.querySelector(".name .indicator");
    indicator.innerText = event.target.value;
    codeOutput();
});
opacityControl.addEventListener("input", () => {
    alphaValue = event.target.value;
    colorValue = `rgba(${redValue}, ${greenValue}, ${blueValue},${alphaValue})`;
    target.forEach((item) => (item.style.background = colorValue));
    let indicator = opacityControl.parentElement.querySelector(
        ".name .indicator"
    );
    indicator.innerText = alphaValue;
    codeOutput();
});
colorControl.addEventListener("input", () => {
    hexToRGB(event.target.value);
    target.forEach((item) => (item.style.background = colorValue));
    let indicator = colorControl.parentElement.querySelector(".indicator");
    indicator.innerText = event.target.value;
    codeOutput();
});

shadowControl.addEventListener("input", () => {
    shadowValue = event.target.value;
    shadowString = `0 8px 32px 0 rgba(14, 15, 18, ${shadowValue})`;
    target.forEach((item) => (item.style.boxShadow = shadowString));
    let indicator = shadowControl.parentElement.querySelector(".name .indicator");
    indicator.innerText = shadowValue;
    codeOutput();
});



