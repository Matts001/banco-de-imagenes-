const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.onload = () =>{
    formulario.addEventListener('submit', validarTermino);

}

function validarTermino(e){
    e.preventDefault();
    const termino = document.querySelector('#termino').value;

    if(termino == ''){
        console.log('sin terminos...');
        return;
    }
    buscarTermino(termino);
}

function buscarTermino(termino){
    const key = '28344735-c8bbfce94bb91bb66e19d26d3';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}`;

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => {
        mostrarImagenes(resultado.hits);
    })
    
}

function mostrarImagenes(imagenes){
    console.log(imagenes);
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }

    imagenes.forEach(imagen => {
        const {previewURL,likes,views,largeImageURL} = imagen;

        resultado.innerHTML +=`           
        <div class="tarjeta">
        <img src="${previewURL}">
        <div class="cuerpo">
            <p>${likes} me gusta</p>
            <span>${views} veces vista</span><br>
            <a type="button" id="verImg" href="${largeImageURL}">VER IMAGEN HD</a>
        </div>
        </div>    
        `;
    })
}