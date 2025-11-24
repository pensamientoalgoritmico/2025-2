//Daniela Gonzalez Molina
//Bogota a mi manera

//Este código representa Bogotá desde mi perspectiva: una ciudad llena de tráfico, lluvia constante y grafitis por todas partes. Quise tomar esos elementos que a veces se sienten caóticos y transformarlos en algo más agradable y “chévere” de ver. Por eso, el programa permite controlar la cantidad de lluvia y el tráfico, y también decidir en qué partes aparecen los grafitis, para que se vuelvan algo bonito que resalta en la escena y no solo manchas en las paredes como muchas veces se ven en la ciudad. De esta manera, el sketch traduce mi experiencia de Bogotá a una versión más lúdica y visualmente amable.

//En este proyecto use  Copilot como apoyo puntual para algunos aspectos técnicos del código. En específico, lo usé para ajustar la posición de los botones en la interfaz, para entender mejor cómo se hacía el proceso de descargar la imagen generada desde p5.js y para definir las trayectorias y posiciones de movimiento de los buses. También recurrí a Copilot cuando alguna función no me estaba funcionando bien y necesitaba sugerencias para corregir errores de sintaxis o de lógica. Tambien para poner las plantillas. A partir de esas propuestas, yo probaba, modificaba y decidía qué dejar y qué cambiar en el código final.

// Variables principales

// Intensidad de lluvia y trafico, van a ser sliders.
let lluvia = 50;
let trafico = 50;

// Define el estilo de los grafitis (0, 1 o 2). va a ser un Boton
let estilo = 0;

// Color de fondo de la ciudad (un gris que se va cambiando con un botón)
let colorFondo = 46;

// Arreglos: elementos que se van generando
let grafitis = []; //
let edificios = []; // posición y tamaño de los edificios
let buses = []; // posición y velocidad de los buses

// Botones y controles
let botonEstilo; // Botón para cambiar el estilo de los grafitis
let botonColor; // Botón para cambiar el color de la ciudad
let botonNuevo; // Botón para generar una nueva versión de Bogotá
let botonDescargar; // Botón para descargar la imagen del canvas

// Sliders
let sliderLluvia; // Slider para controlar la cantidad de lluvia
let sliderTrafico; // Slider para controlar el tráfico

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("canvasContainer");

  // Edificios y buses
  crearEdificios();
  crearBuses();

  // Boton 1: Cambiar estilo de grafitis
  botonEstilo = createButton("Cambiar estilo de grafitis"); // Crear botón con este texto
  botonEstilo.position(20, 20); // Posicion el botón en la pantalla
  botonEstilo.mousePressed(() => {
    // Decir qué pasa cuando se hace clic
    // Cambia el estilo entre 0, 1 y 2 en orden
    estilo = (estilo + 1) % 3;
  });

  // BOTÓN 2: Cambiar color ciudad
  botonColor = createButton("Cambiar color de la ciudad"); // Crear botón
  botonColor.position(20, 50); // Posición del botón
  botonColor.mousePressed(() => {
    // lo que hace
    // Cambiar el color de fondo a uno aleatorio de esta lista de grises
    colorFondo = random([30, 46, 70, 90]);
  });

  // BOTÓN 3: Nueva Bogotá
  botonNuevo = createButton("Generar otra Bogotá"); // Crear botón
  botonNuevo.position(20, 80); // Posición del botón
  botonNuevo.mousePressed(() => {
    // que hace
    // Nuevos valores aleatorios a lluvia y tráfico
    lluvia = random(20, 80);
    trafico = random(20, 80);

    // Escoger al azar un estilo de grafiti (0, 1 o 2)
    estilo = floor(random(3));

    // Escoger al azar un color de fondo de la lista
    colorFondo = random([30, 46, 70, 90]);

    // Borrar todo para crear una nueva bogota
    grafitis = [];
    edificios = [];
    buses = [];

    // Volver a crear edificios y buses nuevos con los nuevos valores
    crearEdificios();
    crearBuses();

    // Actualizar los sliders para que coincidan con los nuevos valores aleatorios
    sliderLluvia.value(lluvia);
    sliderTrafico.value(trafico);
  });

  // BOTÓN 4: Descargar imagen
  botonDescargar = createButton("Descargar imagen"); // Crear botón
  botonDescargar.position(20, 110); // Posición del botón
  botonDescargar.mousePressed(descargarImagen); // Al hacer clic, llama a la función que guarda el canvas

  // SLIDER 1: Lluvia
  // Slider que va de 0 a 100 y empieza en 50 controlando cuantas gotas caen
  sliderLluvia = createSlider(0, 100, 50);
  sliderLluvia.position(20, 150); // Posición del slider en la pantalla

  // SLIDER 2: Tráfico
  // Slider que va de 0 a 100 y empieza en 50 controla la intensidad del tráfico
  sliderTrafico = createSlider(0, 100, 50);
  sliderTrafico.position(20, 180); // Posición del slider en la pantalla
}

function draw() {
  // Actualizar valores desde los sliders
  // Lee el valor actual del slider de lluvia y guardarlo en la variable lluvia
  lluvia = sliderLluvia.value();
  // Lee el valor actual del slider de tráfico y guardarlo en la variable trafico
  trafico = sliderTrafico.value();

  // Fondo de la escena
  // Pintar el fondo del canvas con el color actual de la ciudad
  background(colorFondo);

  // Dibujar todos los elementos de la ciudad
  // Dibujar los que están guardados
  dibujarEdificios();
  dibujarCarretera();
  dibujarBuses();
  dibujarMuro();

  // Lluvia
  // Solo dibujar lluvia si el valor de lluvia es mayor a 10 si no solo no llueve pero empieza con lluvia para representar bogota que casi siempre llueve
  if (lluvia > 10) {
    dibujarLluvia();
  }

  // Grafitis
  //  todos los grafitis guardados y dibujarlos uno por uno
  for (let g of grafitis) {
    dibujarGrafiti(g);
  }

  // Texto de instrucciones
  fill(255);
  noStroke();
  text("Clic en muros o edificios para grafitis", 20, height - 20);
}

function descargarImagen() {
  //Para esto necesite ayuda de Copilot para saber bien como descargar y el paso a paso
  let fecha = new Date(); // Obtener la fecha y hora actuales del sistema

  // Construir un nombre de archivo tipo: Bogota_Urbana_2025-11-23_15-30-05.png
  let nombreArchivo =
    "Bogota_Urbana_" +
    fecha.getFullYear() +
    "-" +
    (fecha.getMonth() + 1) +
    "-" +
    fecha.getDate() +
    "_" +
    fecha.getHours() +
    "-" +
    fecha.getMinutes() +
    "-" +
    fecha.getSeconds() +
    ".png";

  // Guardar el canvas como imagen PNG
  saveCanvas(nombreArchivo, "png");

  // Mensaje en la consola para confirmar que se descargó
  console.log("Imagen descargada: " + nombreArchivo);
}

function mousePressed() {
  // Revisar si el clic fue sobre el muro

  // El muro está entre y = 250 y y = 310, y entre x = 50 y x = width - 50
  if (mouseY > 250 && mouseY < 310 && mouseX > 50 && mouseX < width - 50) {
    // cuando haga clic dentro del muro agregar un grafiti en esa posición
    agregarGrafiti(mouseX, mouseY);
  }

  // Revisar si el clic fue sobre algún edificio
  for (let e of edificios) {
    if (
      mouseX > e.x && // El clic está a la derecha del borde izquierdo del edificio
      mouseX < e.x + e.w && // y a la izquierda del borde derecho
      mouseY > e.y && // y por debajo del borde superior
      mouseY < e.y + e.h // y por encima del borde inferior
    ) {
      // Si el clic está dentro del rectángulo del edificio, agregar grafiti
      agregarGrafiti(mouseX, mouseY);
    }
  }
}

function crearEdificios() {
  // Vaciar el arreglo de edificios para empezar desde cero
  edificios = [];

  // Posición inicial en x para el primer edificio
  let x = 60;

  // Crear 4 edificios con tamaños aleatorios
  for (let i = 0; i < 4; i++) {
    // Ancho aleatorio del edificio
    let w = random(70, 130);

    // Altura aleatoria del edificio
    let h = random(160, 240);

    // Agregar un objeto edificio con posición y tamaño calculados
    edificios.push({
      x: x, // Posición horizontal del edificio
      y: height - h - 160, // Posición vertical calculada para que se apoye sobre la zona de arriba
      w: w, // Ancho del edificio
      h: h, // Alto del edificio
    });

    // Avanzar x para que el próximo edificio quede a la derecha, con un espacio entre ellos y no se peguen
    x += w + 30;
  }
}

function dibujarEdificios() {
  for (let e of edificios) {
    fill(80); // Color gris para los edificios
    rect(e.x, e.y, e.w, e.h); // Dibujar el rectángulo del edificio
  }
}

function dibujarCarretera() {
  // Dibujar carretera
  fill(50);
  rect(0, height - 150, width, 60);

  // Dibujar las líneas amarillas de la mitad de la carretera
  stroke(255, 255, 100);
  for (let x = 0; x < width; x += 40) {
    // Líneas discontinuas
    line(x, height - 120, x + 20, height - 120);
  }
  noStroke(); // Quitar los bordes para los siguientes dibujos
}

function crearBuses() {
  buses = []; //borrarlos

  // Crear 2 buses
  for (let i = 0; i < 2; i++) {
    buses.push({
      x: random(-200, -100), // Posición inicial en x (fuera de la pantalla por la izquierda)
      y: height - 140, // Posición en y para que queden sobre la carretera
      vel: random(3, 6), // Velocidad aleatoria del bus
    });
  }
}

function dibujarBuses() {
  for (let b of buses) {
    // rectángulo rojo
    fill(200, 30, 40);
    rect(b.x, b.y, 100, 25);

    // Ventana
    fill(180, 220, 255);
    rect(b.x + 10, b.y + 5, 80, 8);

    // Texto "TM" para simular TransMilenio
    fill(255);
    text("TM", b.x + 80, b.y + 18);

    // Mover el bus hacia la derecha según su velocidad
    b.x += b.vel;

    // Si el bus se sale por el lado derecho de la pantalla, volverlo a mandar por la izquierda
    if (b.x > width) {
      b.x = -150;
    }
  }
}

function dibujarMuro() {
  // Muro principal
  fill(150, 100, 70); // Color café del muro
  rect(50, 250, width - 100, 60); // Rectángulo grande del muro

  // Ladrillos del muro
  // Dibujar varias filas y columnas de ladrillos pequeños para dar textura
  for (let i = 0; i < 6; i++) {
    // 6 filas de ladrillos
    for (let j = 0; j < 15; j++) {
      // 15 ladrillos por fila
      fill(160, 110, 80); // Color ligeramente distinto para los ladrillos
      rect(50 + j * 50, 250 + i * 10, 48, 8); // Cada ladrillo es un rectángulo pequeño
    }
  }
}

function dibujarLluvia() {
  // Dibujar la lluvia como muchas líneas cortas verticales
  stroke(200); // Color gris claro para las gotas

  // Dibujar tantas gotas como indique la variable lluvia
  for (let i = 0; i < lluvia; i++) {
    let x = random(width); // Posición aleatoria en x
    let y = random(height); // Posición aleatoria en y
    line(x, y, x, y + 8); // Línea vertical corta que simula una gota
  }

  noStroke(); // Quitar el borde para los siguientes dibujos
}

function agregarGrafiti(x, y) {
  let colores = [
    [230, 57, 70], // Rojo
    [255, 209, 102], // Amarillo
    [6, 214, 160], // Aguamarina
    [17, 138, 178], // Azul
    [131, 56, 236], // Morado
  ];

  // Escoger un color al azar
  let colorUsar = random(colores);

  // Arreglo para guardar todos los puntos que forman este grafiti
  let puntos = [];

  // Estilo 0: muchos puntos pequeños tipo spray
  if (estilo === 0) {
    for (let i = 0; i < 40; i++) {
      puntos.push({
        x: x + random(-20, 20),
        y: y + random(-20, 20),
        size: random(2, 5),
      });
    }

    // Estilo 1: puntos muy pequeños y más delgados
  } else if (estilo === 1) {
    for (let i = 0; i < 15; i++) {
      puntos.push({
        x: x + random(-25, 25),
        y: y + random(-10, 10),
        size: random(1, 2), // Manchas chiquitas
      });
    }

    // Estilo 2: pocas manchas grandes
  } else {
    for (let i = 0; i < 6; i++) {
      puntos.push({
        x: x + random(-15, 15),
        y: y + random(-15, 15),
        size: random(8, 15), // Manchas grandes
      });
    }
  }

  // Guardar este grafiti como un objeto dentro del arreglo grafitis
  grafitis.push({
    x: x, // Posición original del clic en x (referencia)
    y: y, // Posición original del clic en y
    color: colorUsar, // Color elegido para este grafiti
    puntos: puntos, // Lista de puntos que lo forman
  });
}

function dibujarGrafiti(g) {
  // Usar el color guardado para este grafiti
  fill(g.color[0], g.color[1], g.color[2]);
  noStroke();

  // Recorrer todos los puntos del grafiti y dibujarlos como elipses
  for (let p of g.puntos) {
    ellipse(p.x, p.y, p.size); // Cada punto es un círculo pequeño
  }
}
