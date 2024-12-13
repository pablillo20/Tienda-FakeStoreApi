// Link para trabajar con la Api
var link = "https://api.escuelajs.co/api/v1/";

// Guardar la categoría seleccionada
let categoriaSelecionada = null;

// Productos Actual
let pagina = 0;

// Array para el carrito (cargado desde localStorage si existe)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Peticion Scroll Infinito
peticion = false;
var paginaScroll = false;

// Seccion Iniciada 
seccion = false;

window.onload = () => {

    // Logear Usuario 
    document.getElementById("iniciarSesion").addEventListener("click", (e) => {
        e.preventDefault();
        logueo(e);
    });

    document.getElementById("registrarse").addEventListener("click", (e) => {
        e.preventDefault();

        registrarUsuario(e);
    });

    // Cerrrar sesion
    const btnLogin = document.getElementById("btnLogin").addEventListener("click", logout);

    // Inicializar vista del carrito
    mostrarCarrito();

    // Mostar Categorias Productos
    mostrarCategorias();

    // Vistas de la Página
    inicio = document.getElementById("container");
    vistaProductos = document.getElementById("container2");
    detallesProducto = document.getElementById("container3");
    carritoContainer = document.getElementById("container4");
    login = document.getElementById("container5");
    register = document.getElementById("container6");


    // Navegación al inicio
    document.getElementById("inicio").addEventListener("click", () => {

        paginaScroll = false;

        inicio.style.display = "grid";

        register.style.display = "none";
        login.style.display = "none";
        vistaProductos.style.display = "none";
        detallesProducto.style.display = "none";
        carritoContainer.style.display = "none";
    });

    // Navegación al inicio
    document.getElementById("inicio1").addEventListener("click", () => {
        paginaScroll = false;

        inicio.style.display = "grid";

        register.style.display = "none";
        login.style.display = "none";
        vistaProductos.style.display = "none";
        detallesProducto.style.display = "none";
        carritoContainer.style.display = "none";
    });

    // Navegación al contacto
    document.getElementById("btnContacto").addEventListener("click", () => {
        paginaScroll = false;

        inicio.style.display = "grid";

        register.style.display = "none";
        login.style.display = "none";
        vistaProductos.style.display = "none";
        detallesProducto.style.display = "none";
        carritoContainer.style.display = "none";

        // Desplazar la ventana al apartado de Contacto
        document.getElementById("btnContacto").scrollIntoView({ behavior: "smooth" });
    });

    // Cesta de la compra
    cesta = document.getElementById("carrito").addEventListener("click", () => {
        paginaScroll = false;

        carritoContainer.style.display = "grid";
        carritoContainer.style.visibility = "visible";

        register.style.display = "none";
        login.style.display = "none";
        inicio.style.display = "none";
        vistaProductos.style.display = "none";
        detallesProducto.style.display = "none";
    });


    //Navegacion al Register
    document.getElementById("btnRegister").addEventListener("click", () => {
        paginaScroll = false;

        register.style.display = "grid";
        register.style.visibility = "visible";

        login.style.display = "none";
        inicio.style.display = "none";
        vistaProductos.style.display = "none";
        detallesProducto.style.display = "none";
        carritoContainer.style.display = "none";
    });

    // Navegación al Login
    document.getElementById("btnLogin").addEventListener("click", () => {
        paginaScroll = false;

        login.style.display = "grid";
        login.style.visibility = "visible";

        register.style.display = "none";
        inicio.style.display = "none";
        vistaProductos.style.display = "none";
        detallesProducto.style.display = "none";
        carritoContainer.style.display = "none";
    });

    // Navegación al Login
    document.getElementById("log").addEventListener("click", () => {
        paginaScroll = false;

        login.style.display = "grid";
        login.style.visibility = "visible";

        register.style.display = "none";
        inicio.style.display = "none";
        vistaProductos.style.display = "none";
        detallesProducto.style.display = "none";
        carritoContainer.style.display = "none";
    });


    // Mostrar mas Productos
    const mostrarMas = document.getElementById("btnMas");
    mostrarMas.addEventListener("click", cargarMasProductos);


    // Scroll Infinito
    window.addEventListener("scroll", () => {
        if (paginaScroll)
            if (!peticion && window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
                cargarMasProductos();
            }
    });

    // Vaciar el carrito
    document.getElementById("btnVaciar").addEventListener('click', () => {

        const notification = document.getElementById('notification');
        notification.classList.add('show');

        // Ocultar la notificación después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);

        carrito = [];
        guardarCarrito();
        mostrarCarrito();
    });

    // Finalizar compra
    document.getElementById("btnComprar").addEventListener('click', () => {
        if (carrito.length === 0) {
            return;
        }
        const notification = document.getElementById('notification');
        notification.classList.add('show');

        // Ocultar la notificación después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
        carrito = [];
        guardarCarrito();
        mostrarCarrito();
    });

};

// Función para mostrar las categorías
function mostrarCategorias() {
    paginaScroll = false;

    document.getElementById("Cargando").classList.add("mostrar");

    fetch(link + "categories", { method: "GET" })
        .then((res) => res.json())
        .then((datosRecibidos) => {
            document.getElementById("Cargando").classList.remove("mostrar");

            if (datosRecibidos.length >= 6) {
                // Asignar la imagen de cada categoría con el operador ternario
                asignarImagenError("#categoria1 img", datosRecibidos[0].image);
                document.querySelector("#categoria1 h3").textContent = datosRecibidos[0].name;
                document.querySelector("#categoria1").addEventListener("click", () => verProductos(datosRecibidos[0].id));

                asignarImagenError("#categoria2 img", datosRecibidos[1].image);
                document.querySelector("#categoria2 h3").textContent = datosRecibidos[1].name;
                document.querySelector("#categoria2").addEventListener("click", () => verProductos(datosRecibidos[1].id));

                asignarImagenError("#categoria3 img", datosRecibidos[2].image);
                document.querySelector("#categoria3 h3").textContent = datosRecibidos[2].name;
                document.querySelector("#categoria3").addEventListener("click", () => verProductos(datosRecibidos[2].id));

                asignarImagenError("#categoria4 img", datosRecibidos[0].image);
                document.querySelector("#categoria4 h3").textContent = datosRecibidos[0].name;
                document.querySelector("#categoria4").addEventListener("click", () => verProductos(datosRecibidos[0].id));

                asignarImagenError("#categoria5 img", datosRecibidos[0].image);
                document.querySelector("#categoria5 h3").textContent = datosRecibidos[0].name;
                document.querySelector("#categoria5").addEventListener("click", () => verProductos(datosRecibidos[0].id));

                asignarImagenError("#categoria6 img", datosRecibidos[0].image);
                document.querySelector("#categoria6 h3").textContent = datosRecibidos[0].name;
                document.querySelector("#categoria6").addEventListener("click", () => verProductos(datosRecibidos[0].id));
            }
        })
        .catch((err) => {
            console.error("Error en la petición: ", err);
        });
}

// Función para mostrar productos de una categoría
function verProductos(categoriaId) {
    inicio.style.display = "none";

    vistaProductos.style.visibility = "visible";
    vistaProductos.style.display = "grid";

    categoriaSelecionada = categoriaId;

    // Cargar los primeros productos
    cargarMasProductos();
}


// Función para cargar más productos
function cargarMasProductos() {
    peticion = true;
    paginaScroll = true;
    document.getElementById("Cargando").classList.add("mostrar");
    const contenedorProductos = document.querySelector(".lista_productos_contenedor")

    fetch(link + "categories/" + categoriaSelecionada + "/products?offset=" + pagina + "&limit=10", { method: "GET" })
        .then((res) => res.json())
        .then((productos) => {
            document.getElementById("Cargando").classList.remove("mostrar");

            productos.forEach(producto => {
                peticion = false;
                console.log(producto)
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('lista_producto');

                const productoImg = document.createElement('img');
                asignarImagenError(productoImg, producto.images[0]);
                productoImg.alt = producto.title || 'Producto sin título';
                productoDiv.appendChild(productoImg);

                const productoInfoDiv = document.createElement('div');
                productoInfoDiv.classList.add('lista_producto_info');

                const productoTitle = document.createElement('h3');
                productoTitle.textContent = producto.title;
                productoInfoDiv.appendChild(productoTitle);

                const productoPrice = document.createElement('span');
                productoPrice.textContent = producto.price;
                productoInfoDiv.appendChild(productoPrice);

                productoDiv.appendChild(productoInfoDiv);

                contenedorProductos.appendChild(productoDiv);

                // Mostrar Productos
                productoImg.addEventListener("click", () => {
                    pagina = 0;
                    mostrarDetalleProducto(producto);
                });
            });

            peticion = false;

            if (productos <= 0) {
                peticion = true;
            }
            pagina += 10;
        })
        .catch((err) => {
            peticion = false;
            console.error("Error al cargar los productos: ", err);
        });
}

// Función para mostrar el detalle de un producto
function mostrarDetalleProducto(producto) {
    paginaScroll = false;

    // Ocultar el contenedor de productos
    vistaProductos.style.display = "none";

    // Mostrar el contenedor de detalle del producto
    detallesProducto.style.visibility = "visible";
    detallesProducto.style.display = "grid";

    const productoDetalleImg = detallesProducto.querySelector(".producto_detalle_img img");
    asignarImagenError(productoDetalleImg, producto.images[0]);

    const productoDetalleInfo = detallesProducto.querySelector(".producto_detalle_info");

    // Título del producto
    const productoTitle = productoDetalleInfo.querySelector("h2");
    productoTitle.textContent = producto.title;

    // Descripción del producto
    const productoDescription = productoDetalleInfo.querySelector("p");
    productoDescription.textContent = producto.description;

    // Precio del producto
    const productoPrecio = productoDetalleInfo.querySelector(".precio");
    productoPrecio.textContent = producto.price;

    // Botón de compra
    const btnAñadir = productoDetalleInfo.querySelector(".btn_añadir");
    btnAñadir.addEventListener("click", () => {

        const notification = document.getElementById('notification');
        notification.classList.add('show');

        // Ocultar la notificación después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);

        añadirAlCarrito(producto)
    });
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para mostrar el carrito
function mostrarCarrito() {
    paginaScroll = false;
    const carritoLista = document.querySelector(".carrito_lista");
    carritoLista.innerHTML = '';

    // Recorremos el carrito para mostrar los productos
    carrito.forEach((producto, index) => {

        const productoItem = document.createElement('div');
        productoItem.classList.add('carrito_item');

        // Creamos la imagen del producto
        const productoImg = document.createElement('img');
        asignarImagenError(productoImg, producto.images[0]);
        productoImg.alt = producto.title || 'Producto sin título';
        productoItem.appendChild(productoImg);

        // Información del producto
        const productoInfoDiv = document.createElement('div');
        productoInfoDiv.classList.add('detalle');

        // Creamos y añadimos el título del producto
        const productoTitle = document.createElement('span');
        productoTitle.textContent = producto.title;
        productoInfoDiv.appendChild(productoTitle);


        // Añadimos la información al contenedor del producto
        productoItem.appendChild(productoInfoDiv);

        // Crear el div para los botones de cantidad
        const cantidadDiv = document.createElement('div');
        cantidadDiv.classList.add('cantidad');

        const btnMenos = document.createElement('button');
        btnMenos.textContent = "-";
        btnMenos.addEventListener('click', () => modificarCantidad(index, -1));
        cantidadDiv.appendChild(btnMenos);

        const cantidadSpan = document.createElement('span');
        cantidadSpan.textContent = producto.cantidad;
        cantidadDiv.appendChild(cantidadSpan);

        const btnMas = document.createElement('button');
        btnMas.textContent = "+";
        btnMas.addEventListener('click', () => modificarCantidad(index, 1));
        cantidadDiv.appendChild(btnMas);

        // Añadimos el div de cantidad al contenedor de producto
        productoItem.appendChild(cantidadDiv);

        // Crear el botón de eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener('click', () => eliminarDelCarrito(index));

        // Añadimos el botón de eliminar al contenedor de producto
        productoItem.appendChild(btnEliminar);

        // Añadimos el producto al contenedor general del carrito
        carritoLista.appendChild(productoItem);
    });

    // Actualizar el total del carrito
    actualizarTotalCarrito();
}

// Función para modificar la cantidad de un producto en el carrito
function modificarCantidad(index, cantidadCambio) {
    const producto = carrito[index];
    producto.cantidad += cantidadCambio;

    // Asegurarse de que la cantidad no sea menor que 1
    if (producto.cantidad < 1) {
        producto.cantidad = 1;
    }

    // Actualizar el carrito en localStorage y la vista
    guardarCarrito();
    mostrarCarrito();
}

// Función para agregar un producto al carrito (modificada para acumular productos)
function añadirAlCarrito(producto) {
    // Comprobar si el producto ya está en el carrito
    const indiceExistente = carrito.findIndex(item => item.title === producto.title);

    if (indiceExistente === -1) {
        // Si no está en el carrito, añadirlo con cantidad 1
        carrito.push({ ...producto, cantidad: 1 });
    } else {
        // Si ya existe, aumentar la cantidad
        carrito[indiceExistente].cantidad++;
    }

    // Mostrar el carrito actualizado
    guardarCarrito();
    mostrarCarrito();
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para actualizar el total del carrito
function actualizarTotalCarrito() {
    const totalElemento = document.getElementById('carritoTotal');
    let total = 0;
    carrito.forEach((producto) => {
        total += producto.price * producto.cantidad;
    });
    totalElemento.textContent = total.toFixed(2);
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    mostrarCarrito();
}

// Cerrar Seccion
function logout() {
    if (seccion) {
        console.log("Éxito en el cierre de sesión!");
    }

    const btnLogin = document.getElementById("btnLogin");

    // Comprobar la clase para cambiarla
    if (btnLogin.classList.contains("fas") && btnLogin.classList.contains("fa-sign-out-alt")) {
        btnLogin.classList.remove("fas", "fa-sign-out-alt");
    }

    btnLogin.classList.add("far", "fa-user");

    seccion = false;
}

// Loguea Usuarios (logea para que el usuario pueda añadir cosas al carrito 
// no me ha dado tiempo a conseguir guardar el carrito a cada usuario)
function logueo(event) {
    event.preventDefault();

    // Mostrar mensaje de carga
    document.getElementById("Cargando").classList.add("mostrar");

    // Obtener los datos del formulario
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    fetch(link + "users", { method: "GET" })
        .then((res) => res.json())
        .then((usuarios) => {
            const usuario = usuarios.find(user => user.email === email && user.password === password);

            if (usuario) {
                seccion = true;
                console.log("¡Inicio de sesión exitoso!");
                const btnLogin = document.getElementById("btnLogin");
                btnLogin.classList.remove("far", "fa-user");
                btnLogin.classList.add("fas", "fa-sign-out-alt");
                const notification = document.getElementById('notification');
                notification.classList.add('show');

                // Ocultar la notificación después de 3 segundos
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 3000);


            } else {
                alert("Correo electrónico o contraseña incorrectos.");
            }

            // Ocultar mensaje de carga
            document.getElementById("Cargando").classList.remove("mostrar");
        })
        .catch((err) => {
            console.error("Error al cargar los usuarios: ", err);
            document.getElementById("Cargando").classList.remove("mostrar");
        });
}

function registrarUsuario(event) {
    event.preventDefault();

    // Mostrar mensaje de carga
    document.getElementById("Cargando").classList.add("mostrar");

    // Obtener los datos del formulario
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const avatar = document.getElementById("registerAvatar").value || "https://picsum.photos/800";

    // Realizar solicitud para obtener los usuarios existentes
    fetch(link + "users/", { method: "GET" })
        .then((res) => res.json())
        .then((usuarios) => {
            // Verificar si el correo electrónico ya está registrado
            const usuarioExistente = usuarios.find(user => user.email === email);

            if (usuarioExistente) {
                alert("El correo electrónico ya está registrado.");
            } else {
                fetch(link + "users/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password,
                        avatar: avatar
                    })
                })
                    .then((res) => res.json())
                    .then((response) => {
                        if (response.id) {
                            console.log("¡Registro exitoso!", response);
                            alert("Usuario registrado exitosamente.");
                            document.getElementById("registerForm").reset();
                        } else {
                            alert("Ocurrió un error al registrar el usuario.");
                        }
                    })
                    .catch((err) => {
                        console.error("Error al registrar el usuario:", err);
                        alert("Error al conectar con el servidor.");
                    });
            }

            // Ocultar mensaje de carga
            document.getElementById("Cargando").classList.remove("mostrar");
        })
        .catch((err) => {
            console.error("Error al cargar los usuarios:", err);
            alert("Error al verificar usuarios existentes.");
            document.getElementById("Cargando").classList.remove("mostrar");
        });
}


// Función para asignar una imagen con manejo de errores
function asignarImagenError(elemento, src) {
    if (typeof elemento === 'string') {
        elemento = document.querySelector(elemento);
    }
    elemento.src = src ? src : './Imagenes/default.jpg';
    elemento.addEventListener('error', () => {
        elemento.src = './Imagenes/default.jpg';
    });
}
