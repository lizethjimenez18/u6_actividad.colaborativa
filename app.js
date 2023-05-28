var carritoVisible = false;

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready();
}

function ready() {
    // funcionalidad para botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for (var i = 0; i < botonesEliminarItem.length; i++) {
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    //se agrega funcionalidad al boton sumar cantidad

    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for (var i = 0; i < botonesSumarCantidad.length; i++) {
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

    //se agrega funcionalidad al boton restar cantidad

    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for (var i = 0; i < botonesRestarCantidad.length; i++) {
        var button = botonesRestarCantidad[i];
        button.addEventListener('click', restarCantidad);
    }

    //Se agrega funcionalidad a los botones Agregar al Carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for (var i = 0; i < botonesAgregarAlCarrito.length; i++) {
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);

    }
    // Agregar funcionalidad al botón pagar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked);



}

// se elimina item seleccionado del carrito

function eliminarItemCarrito(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();

    // actualizar el valor del carrito una vez eliminado un item
    actualizarTotalCarrito();

    // si hay elementos en el carrito una vez que se eliminó
    // si no existen elementos, se oculta el carrito
    ocultarCarrito();

}

// actualiza total del carrito
function actualizarTotalCarrito() {
    // seleccion de contenedor carrito
    var carritoContenedor = document.getElementsByClassName("carrito")[0];
    var carritoItems = carritoContenedor.getElementsByClassName("carrito-item");
    var total = 0;

    // recorrer cada elemento del carrito para actualizar el total
    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        console.log(precioElemento);

        //quitar el simbolo peso y punto de milesimo
        var precio = parseFloat(precioElemento.innerText.replace('$', '').replace('.', ''));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio * cantidad);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ",00";

}


function ocultarCarrito() {
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        //maximizar el contenedor de los elementos
        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';


    }

}

// aumentar en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    // se actualiza total
    actualizarTotalCarrito();
}

function restarCantidad(event) {
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;
    // que no sea menor a 1
    if (cantidadActual>=1) {
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        // se actualiza total
        actualizarTotalCarrito();

    }


}

function agregarAlCarritoClicked(event) {
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName("título-item")[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    // la siguiente funcion agrega el elemento al carrito
    agregarItemAlCarrito(titulo, precio, imagenSrc);

    //Se hace visible el carrito cuando se agrega por primera vez
    hacerVisibleCarrito();

}

function agregarItemAlCarrito(titulo, precio, imagenSrc) {
    var item = document.createElement('div');
    item.classList.add = 'item';
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    // controlaremos que el item ingresado no se encuentre ya enlistado
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for (var i = 0;i < nombresItemsCarrito.length; i++) {
        if (nombresItemsCarrito[i].innerText==titulo) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }
    var itemCarritoContenido = `
    <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
`



    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    // agregamos la funcionalidad de eliminar el nuevo item
    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',eliminarItemCarrito);

    // agregamos la funcionalidad de sumar el nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    // agregamos la funcionalidad de restar el nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

//lo puse, estar atenta
    actualizarTotalCarrito();

}

function pagarClicked(){
    alert("gracias por su compra");
    // elimino todos los elementos del carrito
var carritoItems = document.getElementsByClassName('carrito-items')[0];
while(carritoItems.hasChildNodes()){
    carritoItems.removeChild(carritoItems.firstChild);
}
actualizarTotalCarrito();

//funcion que oculta el carrito


ocultarCarrito();


}

function hacerVisibleCarrito(){
    carritoVisible=true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width='60%';
}
