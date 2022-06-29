const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');

const registroPorPagina = 40;
let totalPaginas;
let iterator;
let paginaActual = 1;

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

function buscarTermino(){

    const termino = document.querySelector('#termino').value;
    
    const key = '28344735-c8bbfce94bb91bb66e19d26d3';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registroPorPagina}&page=${paginaActual}`;

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultado => {
        totalPaginas = calcularPaginas(resultado.totalHits);
        mostrarImagenes(resultado.hits);
        
    })
}

function *crearPaginador(total){
    for (let i = 1; i <= total;i++)
    yield i;
}

function calcularPaginas(total){
    return parseInt(Math.ceil(total/registroPorPagina));
}

function mostrarImagenes(imagenes){
    
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
            <span>${views} vistas</span><br>
            <a type="button" id="verImg" href="${largeImageURL}">VER IMAGEN HD</a>
        </div>
        </div>
        
        `;
    })

    imprimirPaginador()
}

function imprimirPaginador(){
    iterador = crearPaginador(totalPaginas);
    while(paginacionDiv.firstChild){
        paginacionDiv.removeChild(paginacionDiv.firstChild);
    }
    while(true){
        const {value,done} = iterador.next();
        if(done) return;
        //crea  boton para cada pagina
        const boton = document.createElement('a');
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente','bg-yellow-400','px-4','py-1','mr-2','font-bold','mb-4','uppercase','rounded');
        
        boton.onclick = () => {
            paginaActual = value;
            buscarTermino();
        }


        paginacionDiv.appendChild(boton);
    }
}