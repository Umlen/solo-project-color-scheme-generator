const previewEl = document.querySelector('.preview');

document.getElementById('get-scheme-btn').addEventListener('click', () => {
    const seedColor = document.getElementById('seed-color').value.replace('#', '').toUpperCase();
    const schemeMode = document.getElementById('scheme-mode').value;
    const countOfColors = document.getElementById('count-of-colors').value;
    getDataFromApi(seedColor, schemeMode, countOfColors);
});

getDataFromApi('50509B', 'monochrome', '5');

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
    colorDiv.style.color = colorLightness > 50 ? '#000000' : '#ffffff';
    colorDiv.textContent = colorCode;
    return colorDiv;
}