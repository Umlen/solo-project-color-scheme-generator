const previewEl = document.querySelector('.preview');
const seedColorEl = document.getElementById('seed-color');
const schemeModeEl = document.getElementById('scheme-mode');
const countOfColorsEl = document.getElementById('count-of-colors');

document.getElementById('get-scheme-btn').addEventListener('click', () => {
    const seedColor = seedColorEl.value.replace('#', '').toUpperCase();
    const schemeMode = schemeModeEl.value;
    const countOfColors = countOfColorsEl.value;
    getDataFromApi(seedColor, schemeMode, countOfColors);
});

document.getElementById('get-random-scheme-btn').addEventListener('click', getRandomScheme);

document.getElementById('theme-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

getRandomScheme();

function getRandomScheme() {
    /*getting random hex code*/
    const symbols = '0123456789ABCDEF';
    let randomColorCode = '';
    for (let i = 0; i < 6; i++) {
        randomColorCode += symbols.charAt(Math.floor(Math.random() * 16));
    }
    seedColorEl.value = '#' + randomColorCode;

    /*getting random sheme mode*/
    const modes = [
        'monochrome',
        'monochrome-dark',
        'monochrome-light',
        'analogic',
        'complement',
        'analogic-complement',
        'triad'
    ];
    const randomSchemeMode = modes[Math.floor(Math.random() * 7)];
    schemeModeEl.value = randomSchemeMode;

    /*getting random count*/
    const randomCount = Math.round(Math.random() * 7 + 3);
    countOfColorsEl.value = randomCount;

    getDataFromApi(randomColorCode, randomSchemeMode, randomCount);
}

function getDataFromApi(hexCode, mode, count) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${hexCode}&mode=${mode}&count=${count}`)
    .then(response => response.json())
    .then(data => render(data));
}

function render(schemeObj) {
    previewEl.innerHTML = '';
    schemeObj.colors.map(color => {
        const hex = color.hex.value;
        const lightness = (color.hsl.fraction.l * 100 ).toFixed(0);
        previewEl.append(createSchemeElem(hex, lightness));
    });
}

function createSchemeElem(colorCode, colorLightness) {
    const colorDiv = document.createElement('div');
    colorDiv.style.backgroundColor = colorCode;
    colorDiv.style.color = colorLightness > 40 ? '#000000' : '#ffffff';
    colorDiv.textContent = colorCode;
    return colorDiv;
}