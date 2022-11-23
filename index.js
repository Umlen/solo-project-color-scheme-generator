const previewEl = document.querySelector('.preview');
const seedColorEl = document.getElementById('seed-color');
const schemeModeEl = document.getElementById('scheme-mode');
const countOfColorsEl = document.getElementById('count-of-colors');

getRandomScheme();

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

document.getElementById('get-random-scheme-btn').addEventListener('click', getRandomScheme);

document.getElementById('get-scheme-btn').addEventListener('click', () => {
    const seedColor = seedColorEl.value.replace('#', '').toUpperCase();
    const schemeMode = schemeModeEl.value;
    const countOfColors = countOfColorsEl.value;
    getDataFromApi(seedColor, schemeMode, countOfColors);
});

function getDataFromApi(hexCode, mode, count) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${mode}&count=${count}`)
    .then(response => response.json())
    .then(data => render(data));
}

function render(schemeObj) {
    previewEl.innerHTML = '';
    schemeObj.colors.map(color => {
        const hex = color.hex.value;
        const lightness = (color.hsl.fraction.l * 100).toFixed(0);
        previewEl.append(createPreviewColorDiv(hex, lightness));
    });
}

function createPreviewColorDiv(colorCode, colorLightness) {
    const colorDiv = document.createElement('div');
    colorDiv.classList.add('preview-color-div');
    colorDiv.style.backgroundColor = colorCode;
    colorDiv.style.color = colorLightness > 40 ? '#000000' : '#ffffff';
    colorDiv.innerHTML = `<p>${colorCode}</p>`;
    colorDiv.addEventListener('click', clickToCopy);
    return colorDiv;
}

function clickToCopy(e) {
    navigator.clipboard.writeText(e.target.textContent);
}

function getRandomScheme() {
    const color = getRandomHex();
    const mode = getRandomMode(); 
    const count = Math.round(Math.random() * 7 + 3);
    seedColorEl.value = '#' + color;
    schemeModeEl.value = mode;
    countOfColorsEl.value = count;
    getDataFromApi(color, mode, count);
}

function getRandomHex() {
    const symbols = '0123456789ABCDEF';
    let randomColorCode = '';
    for (let i = 0; i < 6; i++) {
        randomColorCode += symbols.charAt(Math.floor(Math.random() * 16));
    }
    return randomColorCode;
}

function getRandomMode() {
    const modes = [
        'monochrome',
        'monochrome-dark',
        'monochrome-light',
        'analogic',
        'complement',
        'analogic-complement',
        'triad'
    ];
    return modes[Math.floor(Math.random() * 7)];
}