fetch('https://www.thecolorapi.com/scheme?hex=FF52CF&mode=analogic&count=10')
    .then( response => response.json() )
    .then( data => {
        data.colors.map( color => {
            console.log(color.hex.value);
            console.log( (color.hsl.fraction.l * 100 ).toFixed(0) );
            const hex = color.hex.value;
            const lightness = (color.hsl.fraction.l * 100 ).toFixed(0);
            render(hex, lightness);
        } );
    } );

function render(colorCode, colorLightness) {
    const div = document.createElement('div');
    div.style.backgroundColor = colorCode;
    div.style.color = colorLightness > 50 ? '#000000' : '#ffffff';
    if (document.documentElement.clientWidth < 700) {
        div.style.height = document.querySelector('.preview').offsetHeight / 10 + 'px';
    } else {
        div.style.width = document.querySelector('.preview').offsetWidth / 10 + 'px';
    }
    div.textContent = colorCode;
    document.querySelector('.preview').append(div);
}