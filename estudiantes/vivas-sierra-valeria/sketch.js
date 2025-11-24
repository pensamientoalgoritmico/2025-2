// Valeria Vivas
// Párchandose el clima
//Este programa es un generador interactivo que traduce el clima bogotano en estados de ánimo y dichos locales.
// El usuario primero ingresa su nombre y correo, luego llega a un menú donde puede “elegir” cómo siente el clima del día:
// sol, nube, aguacero o modo Bogotrópico.
// Cada opción activa una escena distinta con animaciones, movimientos y frases típicas bogotanas.
// Dependiendo de las decisiones del usuario (por ejemplo, si está haciendo MUCHO o POQUITO sol, viento o aguacero),
// la visualización cambia en intensidad, color y movimiento, creando una especie de pronóstico emocional del clima de nuestra ciudad.

//REFERENTES VISUALES Y CONCEPTUALES
// - Sitio de referencia del proyecto en Canva:
//   https://parchandoseelclima.my.canva.site/
//   Este link recoge la idea maquetada de manera simple con botones funcionales
//   (mapa de Colombia, ciudad, botones redondos, notas, etc.) que luego se tradujeron
//   a las imágenes y composiciones del sketch en p5.js.
//
// REFERENTES DE LENGUAJE Y TONO BOGOTANO
//   Se hizo una revisión de expresiones coloquiales usadas en conversaciones cotidianas y redes sociales
//   (por ejemplo: “Bogotrash”, “la nevera”, “parchar”, “gomelos”, etc.) para construir
//   frases que dialogan con la experiencia real de vivir el clima en Bogotá.
//   Estas expresiones se reinterpretan en el programa como “estados de ánimo climáticos” que pueden causar una cercanía con la ciudad y las emociones que causa su clima día a día, tomandolo con humor.
//
// USO DE IA EN EL PROYECTO
// - Se utilizó inteligencia artificial como apoyo para:
// * Herramientas de programación que ayudaron a optimizar ciertos procesos que podían haberse alargado de no ser por esta ayuda.
//   * Identificar y corregir pequeños errores lógicos en el código (por ejemplo, manejo de variables,
//     reinicio de animaciones y orden de las funciones).
//   * Mejorar la redacción de algunos comentarios y textos que aparecen en el código.
// - La toma de decisiones de diseño (colores, imágenes, frases, estados del clima, interacciones)
//   fue realizada por mí completamente. La IA funcionó como una herramienta de acompañamiento y revisión,
//   no como reemplazo del criterio de diseño ni de la autoría del proyecto.

//Inicio código
//Constantes
const AZUL_FONDO = "#dae9f6"; // color de fondo del menú
const AZUL_OSCURO = "#173c5d"; // color de azul oscuro de la sombra de los círculos del menú
const AZUL = "#19578f"; //color azul de los botones del menú
const AMARILLO = "#ffd33d"; // color de la letra título
const NARANJA = "#d86800"; // color del texto
const GRIS = "#9a9b9b"; // color de fondo gris
const AZUL_CLARO = "#849fb8"; //color de fondo lluvia suave
const VERDE = "#85c44d"; // color de fondo Bogotrópico
const VERDE_OSCURO = "#4e7030";
//Variables

let estado = "datos"; // pantalla actual: "datos"|"bienvenida" |"menu" | "sol" | "nube" | "aguacero" | "Bogotrópico"

//Imagenes de menú
let mapa_Colombia; //imagen del mapa de Colombia
let ciudad; //imagen de Bogotá
let botonB; //imagen del botón de Bogotrópico
let nota; //imagen de la nota de menú
let lluvia; //imagen del botón de aguacero
let nube; //imagen del botón de la nube
let sol; //imagen del botón de la sol

//Imagenes de sol
let notaA; //imagen de la nota de la pantalla de sol
let solGrande; //imagen del sol
let estadodelsol = true; //Hacer que aparezca el cuadro de preguntas al inicio del estado de sol
let eleccionSol = ""; //guardar la elección del sol del dia

//Imagenes del día para arruncharse
let viento; //imagen del viento
let notaRoja; //imagen de la nota de la pantalla de viento
let estadodelviento = true; //Hacer que aparezca el cuadro de preguntas al inicio del estado de viento
let eleccionViento = ""; //guardar la elección del vienti del dia
let vientoinicial = -250; // tener la posición desde la que inicia la imagen del viento
let velocidadviento = 0; // velocidad en la que se mueve la cual depende de lo que elija el usuario

//Imagenes del aguacero
let aguacero; //imagen del aguacero
let notaAmarilla; //imagen de la nota de la pantalla de aguacero
let estadodelaguacero = true; //Hacer que aparezca el cuadro de preguntas al inicio del estado de aguacero
let eleccionAguacero = ""; //guardar la elección del aguacero del dia
let gotasX = [];
let gotasY = [];
let cantidadGotas = 0;
//Cantidadde gotas que son medidad segun las elecciones del usuario
let gotasVelocidad = [];

// Bogotrópico
let hojas; //imagen de las hojas
let hojaAmarilla; //imagen de la hoja
let hojaAzul; //imagen de las hoja
let opAzul = 255; // opacidad de la hoja azul
let opAmarilla = 255; // opacidad de la hoja amarilla

let nubeA; //imagen de la nube que lleva al menú

let nombre = ""; // ingreso del nombre
let correo = ""; // ingreso del correo
let escribiendo = "nombre"; // guarda en que espacio se esta escribiendo

let BRYNDAN_WRITE; //Fuentes del menú
let LONDRINA_SOLID;

function setup() {
  // NO EDITAR LA SIGUIENTE LINEA, HACE QUE SEA PANTALLA COMPLETA Y LO CENTRA EN WEB
  let canvas = createCanvas(1200, 700);
  canvas.parent("canvasContainer");
  //sigue como siempre
  background(255, 255, 255);
  
  mapa_Colombia = loadImage("MAPA.png"); //crea la imagen mapa de Colombia
  ciudad = loadImage("Ciudad.png"); //crea la imagen Bogotá
  botonB = loadImage("botonB.png"); // crea la imagen de Bogotrópico
  nota = loadImage("nota.png"); // crea la imagen de la nota
  nube = loadImage("nube.png"); // crea la imagen del botón de la nube
  lluvia = loadImage("lluvia.png"); // crea la imagen del botón de aguacero
  sol = loadImage("sol.png"); // crea la imagen del botón de sol
  nubeA = loadImage("nubeAzul.png"); // crea la imagen del botón de la nube azul que lleva al menú
  solGrande = loadImage("solgrande.png"); // crea la imagen del sol que se mueve
  notaA = loadImage("notaAzul.png"); // crea la imagen de la nota del sol
  notaRoja = loadImage("notaRoja.png"); // crea la imagen de la nota del viento
  notaAmarilla = loadImage("notaAmarilla.png"); // crea la imagen de la nota del aguacero
  viento = loadImage("viento.png"); //crea la imagen del viento
  aguacero = loadImage("aguacero.png"); //crea la imagen del viento
  hojas = loadImage("hojas.png");
  hojaAzul = loadImage("hojaAzul.png");
  hojaAmarilla = loadImage("hojaAmarilla.png");

  BRYNDAN_WRITE = loadFont("Bryndan_Write.ttf");
  LONDRINA_SOLID = loadFont("LondrinaSolid-Regular.otf");
}

function draw() {
  // se ejecuta en cada frame
  if (estado === "datos") dibujarDatos();
  // dibuja la caja de ingreso de datos
  else if (estado === "bienvenida") dibujarBienvenida();
  // dibuja la bienvenida
  else if (estado === "menu") dibujarMenu();
  // dibuja menú
  else if (estado === "sol") dibujarEscenaSol();
  // dibuja escena del sol
  else if (estado === "nube") dibujarEscenaNube();
  // dibuja escena de la nube
  else if (estado === "aguacero") dibujarEscenaAguacero();
  // dibuja escena de la aguacero
  else if (estado === "Bogotropico") dibujarEscenaBogotropico(); // dibuja escena de la Bogotrópico
}

//Ajustar el tamaño cuando cambia el tamaño de la pantalla
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


//DATOS
function dibujarDatos() {
  // pinta la pantalla de ingreso de datos
  background(AZUL_FONDO); //fondo azul claro
  noStroke(); //sin borde
  fill(255); //relleno del cuadrado en blaco
  rect(45, 60, 1108, 581); //rectángulo donde se muestran los datos
  fill(AZUL_OSCURO); //color en el que se escribe
  textFont(LONDRINA_SOLID); //escoge la fuente en la que escribe
  textSize(32); //tamaño del título
  text(
    "Déjanos tu nombre y correo para enviarte todas las actualizaciones de la página.",
    85,
    125
  ); //lugar y escrito
  textSize(30); //tamaño de la letra subtítulos
  text("NOMBRE / APODO", 85, 230); // instrucción de que debe ingresar en el primer espacio
  rect(85, 250, 1034, 52); // espacio donde se escribe el nombre
  text("CORREO ELECTRÓNICO", 85, 430); // instrucción de que debe ingresar en el primer espacio
  rect(85, 450, 1034, 52); // espacio donde se escribe el correo
  rect(400, 570, 400, 50); // botón de guardar
  fill(255);
  text("GUARDAR", 550, 605); //instrucción de botón
  textFont(); //cambio de fuente en la que se escribe
  text(nombre, 100, 285); //muestra en la pantalla lo que se escriba en el nombre
  text(correo, 100, 485); //muestra en la pantalla lo que se escriba en el correo
}

//BIENVENIDA
function dibujarBienvenida() {
  // pinta la pantalla de bienvenida
  background(AZUL_FONDO); //fondo azul claro
  fill(255, 100); // color de rectángulo con opacidad baja
  noStroke();
  rect(200, 150, 800, 400, 20); //rectángulo de espacio donde se ve la bienvenida con las esquinas redondeadas
  fill(AZUL_OSCURO); // color de la letra
  textFont(LONDRINA_SOLID); //tipografía en la que se ve
  textSize(48); //tamaño en el que se escribe
  textAlign(CENTER); //alineación del texto
  text(nombre + ", ¡te damos la bienvenida!", 600, 300); //usar la información ingresada en la variable como output
  textSize(24); // bajar el tamaño de la letra
  text("A este correo hemos enviado la confirmación de inscripción:", 600, 350);
  textSize(30);
  text(correo, 600, 400); // Usa la variable de correo que se guardo en la pantalla de datos como output
  fill(AZUL);
  rect(450, 450, 300, 70, 15);
  fill(255);
  textSize(32);
  text("EMPEZAR", 600, 495);
}

// MENÚ
function dibujarMenu() {
  // pinta la pantalla de menú
  background(AZUL_FONDO); //fondo azul claro
  image(mapa_Colombia, 26, 0); // pinta la imagen como parte del menú
  image(ciudad, 642, 0); //pinta la imagen de Bogotà como parte del menú
  noStroke(); // dejar las figuras sin borde
  fill(AZUL_OSCURO);
  ellipse(171, 310, 175, 182); //sombra del botón de sol
  ellipse(431, 310, 175, 182); //sombra del botón de la nube
  ellipse(171, 551, 175, 182); //sombra del botón del aguacero
  fill(AZUL);
  ellipse(171, 306, 175, 175); //botón del botón de sol
  ellipse(431, 306, 175, 175); //botón del botón de la nube
  ellipse(171, 546, 175, 175); //botón del botón del aguacero
  image(botonB, 341, 445); //pinta la imagen de Bogotrópico
  image(nota, 658, 274); //pinta la imagen de la nota
  image(lluvia, 96, 495); //pinta la imagen del botón de aguacero
  image(nube, 350, 255); //pinta la imagen del botón de nube
  image(sol, 95, 229); //pinta la imagen del botón de sol
  //titúlos del menú
  textFont(LONDRINA_SOLID); // Fuente del titúlo
  textSize(41); //tamaño del titúlo
  fill(AZUL_OSCURO); //color del titúlo
  text("PÁRCHANDOSE", 965, 95);
  fill(NARANJA);
  textSize(20);
  text("Venga que sí es pa eso..", 290, 105);
  textFont(BRYNDAN_WRITE); //cambio de fuente del titúlo
  fill(AMARILLO);
  textSize(43);
  text("el clima", 918, 120);
  fill(NARANJA); //cambio de color
  textSize(20);
  text("¿Y A USTED.....", 680, 310);
  textAlign(CENTER); //centrar el texto
  textSize(14);
  text("¿El día esta para \narruncharse", 440, 306);
  textSize(12);
  text("Agarre un \npoquito de \nsol", 173, 295);
  textSize(14);
  text("Se vino el \naguacero", 178, 540);
  fill(AMARILLO);
  textSize(18);
  text("¡EL BOGOTRÓPICO!", 445, 550);
  textSize(22);
  fill(AZUL);
  text("¿Qué dicho lo \nparcha", 786, 380);
  textSize(14);
  text(
    "ESCOJA EL CLIMA DE BOGOTRASH CON EL QUE USTED SE QUIERA \nPARCHAR HOY",
    300,
    156
  );
}

// SOL
function dibujarEscenaSol() {
  // pinta la pantalla de la sol
  background(AMARILLO); //color de fondo amarillo
  if (estadodelsol) {
    fill(255, 150);
    stroke(AZUL_OSCURO);
    rect(300, 150, 600, 350, 20); //rectángulo donde se pregunta que tanto sol esta haciendo el cual definde el resto
    noStroke();
    fill(AZUL_OSCURO);
    textFont(LONDRINA_SOLID);
    textSize(30);
    textAlign(CENTER);
    text("Hoy está haciendo...", 600, 220);
    text("¿MUCHO sol o POQUITO sol?", 600, 265);
    fill(AZUL);
    rect(370, 330, 200, 70, 15);
    fill(255);
    textSize(26);
    textFont(BRYNDAN_WRITE);
    text("MUCHO", 470, 372);
    fill(AZUL);
    rect(630, 330, 200, 70, 15);
    fill(255);
    text("POQUITO", 730, 372);
    return;
  }
  if (eleccionSol === "mucho") {
    //crear un escenario más fuerte si la opción que eligio el usuario fue mucho
    let d1 = dist(
      mouseX,
      mouseY,
      14 + solGrande.width / 2,
      218 + solGrande.height / 2
    ); // hacer que dependiendo de la cercania o lejania del mouse con el sol suba o baje la opacidad
    let op1 = map(d1, 0, 400, 255, 50);
    op1 = constrain(op1, 50, 255);
    tint(255, op1); // se afectan las imagenes poniendoles un filtro de color y opacidad
    image(solGrande, 14, 218);
    let d2 = dist(
      mouseX,
      mouseY,
      436 + solGrande.width / 2,
      16 + solGrande.height / 2
    ); //la opacidad de segundo sol se mueve diferente para que se vean complementarios pero no iguales
    let op2 = map(d2, 0, 400, 255, 50);
    op2 = constrain(op2, 50, 255);
    tint(255, op2);
    image(solGrande, 436, 16);
    noTint(); // se para el efecto para que no dañe las demás imagenes
  }
  if (eleccionSol === "poquito") {
    //crear un escenario tranquilo si la opción que eligio el usuario fue poquito
    let d1 = dist(
      mouseX,
      mouseY,
      14 + solGrande.width / 2,
      218 + solGrande.height / 2
    ); // hacer que dependiendo de la cercania o lejania del mouse con el sol suba o baje la opacidad
    let op1 = map(d1, 0, 400, 255, 50);
    op1 = constrain(op1, 50, 255);
    tint(255, op1); // se afectan las imagenes poniendoles un filtro de color y opacidad
    image(solGrande, 200, 90);
    noTint(); // se para el efecto para que no dañe las demás imagenes
  }
  image(nubeA, 1060, 22); // nube azul como botón para volver al menú
  textFont(BRYNDAN_WRITE);
  fill(AMARILLO);
  textSize(16);
  text("el clima", 1116, 54);
  textFont(LONDRINA_SOLID);
  textSize(16);
  fill(AZUL_OSCURO);
  text("PÁRCHANDOSE", 1135, 46);
  image(notaA, 837, 375);
  textSize(26);
  textFont(BRYNDAN_WRITE);
  fill(AZUL);
  text("¡ESTOY MÁS FELIZ QUE \nINFIEL RECIEN \nPERDONADO!", 1010, 460);
}

// NUBE
function dibujarEscenaNube() {
  // pinta la pantalla de la nube
  background(GRIS); //color de fondo gris
  if (estadodelviento) {
    fill(255, 150);
    stroke(AZUL_OSCURO);
    rect(300, 150, 600, 350, 20); //rectángulo donde se pregunta que tanto viento esta haciendo el cual definde el resto
    noStroke();
    fill(AZUL_OSCURO);
    textFont(LONDRINA_SOLID);
    textSize(30);
    textAlign(CENTER);
    text("Hoy está haciendo...", 600, 220);
    text("¿MUCHO viento o POQUITO viento?", 600, 265);
    fill(AZUL);
    rect(370, 330, 200, 70, 15);
    fill(255);
    textSize(26);
    textFont(BRYNDAN_WRITE);
    text("MUCHO", 470, 372);
    fill(AZUL);
    rect(630, 330, 200, 70, 15);
    fill(255);
    text("POQUITO", 730, 372);
    return;
  }
  vientoinicial += velocidadviento; //crear el movimiento de la imagen de derecha a izquierda
  let limiteIzq = -400;
  let limiteDer = width - 1150;
  if (vientoinicial < limiteIzq || vientoinicial > limiteDer) {
    velocidadviento *= -1; //movimiento que hace que se devuelva
  }

  if (eleccionViento === "mucho") {
    //crear un escenario más fuerte si la opción que eligio el usuario fue mucho

    image(viento, vientoinicial, 17);
  }
  if (eleccionViento === "poquito") {
    //crear un escenario tranquilo si la opción que eligio el usuario fue poquito
    image(viento, vientoinicial, 17);
  }
  image(nubeA, 1060, 22); // nube azul como botón para volver al menú
  textFont(BRYNDAN_WRITE);
  fill(AMARILLO);
  textSize(16);
  text("el clima", 1116, 54);
  textFont(LONDRINA_SOLID);
  textSize(16);
  fill(AZUL_OSCURO);
  text("PÁRCHANDOSE", 1135, 46);
  image(notaRoja, 837, 375);
  textSize(26);
  textFont(BRYNDAN_WRITE);
  fill(AMARILLO);
  text("¡ESTOY MÁS ABURRIDO \nQUE GARRAPATA EN \nPELUCHE!", 1010, 460);
}

// AGUACERO
function dibujarEscenaAguacero() {
  // pinta la pantalla del aguacero
  background(AZUL_CLARO); //color de fondo azul claro
  if (estadodelaguacero) {
    fill(255, 150);
    stroke(AZUL_OSCURO);
    rect(300, 150, 600, 350, 20); //rectángulo donde se pregunta que tanto viento esta haciendo el cual definde el resto
    noStroke();
    fill(AZUL_OSCURO);
    textFont(LONDRINA_SOLID);
    textSize(30);
    textAlign(CENTER);
    text("Hoy está haciendo...", 600, 220);
    text("¿MUCHO aguacero o POQUITO aguacero?", 600, 265);
    fill(AZUL);
    rect(370, 330, 200, 70, 15);
    fill(255);
    textSize(26);
    textFont(BRYNDAN_WRITE);
    text("MUCHO", 470, 372);
    fill(AZUL);
    rect(630, 330, 200, 70, 15);
    fill(255);
    text("POQUITO", 730, 372);
    return;
  }
  if (eleccionAguacero === "mucho") {
    //crear un escenario más fuerte si la opción que eligio el usuario fue mucho
    background(AZUL_OSCURO); // lluvia fuerte entonces fondo en azul oscuro
  }
  if (eleccionAguacero === "poquito") {
    //crear un escenario tranquilo si la opción que eligio el usuario fue poquito
    background(AZUL_CLARO); // lluvia suave entonces fondo en azul claro
  }
  if (gotasX.length === 0) {
    // hacer que caigan solo
    for (let i = 0; i < cantidadGotas; i++) {
      gotasX.push(random(width)); // sale en posiciones aleatorias en x
      gotasY.push(random(-500, 0));
      gotasVelocidad.push(random(4, 12)); //cada gota cae en diferentes velocidades
    }
  }
  stroke(255);
  strokeWeight(3);
  for (let i = 0; i < cantidadGotas; i++) {
    //Dibujar las gotas
    if (eleccionAguacero === "mucho") {
      gotasY[i] += gotasVelocidad[i] * 1.6;
    } else if (eleccionAguacero === "poquito") {
      gotasY[i] += gotasVelocidad[i] * 0.7;
    }
    if (gotasY[i] > height) {
      gotasY[i] = random(-200, 0);
      gotasX[i] = random(width);
    }
    line(gotasX[i], gotasY[i], gotasX[i], gotasY[i] + 10); //Crear las gotas como lineas
  }
  noStroke(); // quitar los bordes
  image(aguacero, 161, 137); // imagen de la lluvia
  image(nubeA, 1060, 22);
  // nube azul como botón para volver al menú
  textFont(BRYNDAN_WRITE);
  fill(AMARILLO);
  textSize(16);
  text("el clima", 1116, 54);
  textFont(LONDRINA_SOLID);
  textSize(16);
  fill(AZUL_OSCURO);
  text("PÁRCHANDOSE", 1135, 46);
  image(notaAmarilla, 837, 375);
  textSize(26);
  textFont(BRYNDAN_WRITE);
  fill(NARANJA);
  text("¡ESTÁ LLUVIA ESTORBA \nMÁS QUE ENANO CON \nSOMBRILLA!", 1030, 460);
}

// BOGOTRÓPICO
function dibujarEscenaBogotropico() {
  // pinta la pantalla del Bogotrópico
  background(VERDE); //color de fondo verde
  image(hojas, 164, -153);
  let dAzul = dist(
    mouseX,
    mouseY,
    66 + hojaAzul.width / 2,
    237 + hojaAzul.height / 2
  );
  opAzul = map(dAzul, 0, 400, 255, 50);
  opAzul = constrain(opAzul, 50, 255);
  tint(255, opAzul);
  image(hojaAzul, 66, 237);
  noTint();
  let dAm = dist(
    mouseX,
    mouseY,
    757 + hojaAmarilla.width / 2,
    135 + hojaAmarilla.height / 2
  );
  opAmarilla = map(dAm, 0, 400, 255, 50);
  opAmarilla = constrain(opAmarilla, 50, 255);
  tint(255, opAmarilla);
  image(hojaAmarilla, 757, 135);
  noTint();
  noStroke();
  textSize(26);
  textFont(BRYNDAN_WRITE);
  fill(VERDE_OSCURO);
  text("¡GOMELOS!", 938, 580);
  fill(NARANJA);
  text("¡LA NEVERA!", 503, 320);
  fill(AZUL);
  text("¡LA CAPITAL!", 428, 558);
  noFill();
  stroke(AZUL);
  text("¡CIUDAD GÓTICA!", 652, 128);
  stroke(255);
  fill(NARANJA);
  text("¡BOGOTRASH!", 140, 257);

  image(nubeA, 1060, 22); // nube azul como botón para volver al menú
  textFont(BRYNDAN_WRITE);
  fill(AMARILLO);
  textSize(16);
  text("el clima", 1116, 54);
  textFont(LONDRINA_SOLID);
  textSize(16);
  fill(AZUL_OSCURO);
  text("PÁRCHANDOSE", 1135, 46);
}

// CLICS (MENÚ y ESCENAS)
function mousePressed() {
  // gestiona clics del mouse
  if (estado === "datos") {
    //gestiona los clics del mouse mientras este en la pantalla de datos
    if (mouseX > 85 && mouseX < 1119 && mouseY > 250 && mouseY < 302) {
      // hacer clic en el primer rectángulo y escribe el nombre o apodo
      escribiendo = "nombre";
    }
    if (mouseX > 85 && mouseX < 1119 && mouseY > 450 && mouseY < 502) {
      // hacer clic en el primer rectángulo y escribe el correo
      escribiendo = "correo";
    }
  }
  if (mouseX > 400 && mouseX < 800 && mouseY > 570 && mouseY < 620) {
    estado = "bienvenida"; //cambia a la pantalla de bienvenida
  }
  if (estado === "bienvenida") {
    //gestiona los clics del mouse mientras este en la pantalla de bienvenida
    if (mouseX > 450 && mouseX < 750 && mouseY > 450 && mouseY < 520) {
      estado = "menu"; //cambia a la pantalla de menú
    }
  }
  if (estado === "menu") {
    //gestiona los clics del mouse mientras este en la pantalla de menú
    if (mouseX > 81 && mouseX < 257 && mouseY > 218 && mouseY < 402) {
      //el clic hace el cambio de estado al sol
      estado = "sol";
    }
    if (mouseX > 341 && mouseX < 518 && mouseY > 218 && mouseY < 402) {
      //el clic hace el cambio de estado al nube
      estado = "nube";
    }
    if (mouseX > 81 && mouseX < 257 && mouseY > 458 && mouseY < 642) {
      //el clic hace el cambio de estado al sol
      estado = "aguacero";
    }
    if (mouseX > 341 && mouseX < 518 && mouseY > 525 && mouseY < 642) {
      //el clic hace el cambio de estado al nube
      estado = "Bogotropico";
    }
  }
  if (estado === "sol") {
    //gestiona los clics del mouse mientras este en la pantalla de sol
    if (estadodelsol) {
      //gestiona los clics del mouse mientras este activo el cadro de la pregunta
      // clic en MUCHO
      if (mouseX > 370 && mouseX < 570 && mouseY > 330 && mouseY < 400) {
        estadodelsol = false;
        eleccionSol = "mucho";
        image(solGrande, 200, 90);
      }
      // clic en POQUITO
      if (mouseX > 630 && mouseX < 830 && mouseY > 330 && mouseY < 400) {
        estadodelsol = false;
        eleccionSol = "poquito";
        image(solGrande, 14, 218);
        image(solGrande, 436, 16);
      }
    }
    if (mouseX > 1059 && mouseX < 1179 && mouseY > 21 && mouseY < 76) {
      estado = "menu"; // el clic lo devuelve a la pantalla de menú
      eleccionSol = ""; // si sale y vuelve a entrar tiene la posibilidad de volver a elegir
      estadodelsol = true;
    }
  }
  if (estado === "nube") {
    //gestiona los clics del mouse mientras este en la pantalla de nube
    if (estadodelviento) {
      //gestiona los clics del mouse mientras este activo el cadro de la pregunta
      // clic en MUCHO
      if (mouseX > 370 && mouseX < 570 && mouseY > 330 && mouseY < 400) {
        estadodelviento = false;
        eleccionViento = "mucho";
        velocidadviento = -6; //velocidad rapida
      }
      // clic en POQUITO
      if (mouseX > 630 && mouseX < 830 && mouseY > 330 && mouseY < 400) {
        estadodelviento = false;
        eleccionViento = "poquito";
        velocidadviento = -2; // velocidad lenta
      }
    }
    if (mouseX > 1059 && mouseX < 1179 && mouseY > 21 && mouseY < 76) {
      estado = "menu"; // el clic lo devuelve a la pantalla de menú
      eleccionViento = ""; // si sale y vuelve a entrar tiene la posibilidad de volver a elegir
      estadodelviento = true;
      vientoinicial = -250; // vuelve a su posición inicial
      velocidadviento = 0; // reinicia la velocidad al salir de la pantalla
    }
  }
  if (estado === "aguacero") {
    //gestiona los clics del mouse mientras este en la pantalla de aguacero
    if (mouseX > 370 && mouseX < 570 && mouseY > 330 && mouseY < 400) {
      estadodelaguacero = false;
      eleccionAguacero = "mucho";
      cantidadGotas = 250; // causar la lluvia fuerte
      gotasX = [];
      gotasY = [];
      gotasV = [];
    }
    if (mouseX > 630 && mouseX < 830 && mouseY > 330 && mouseY < 400) {
      estadodelaguacero = false;
      eleccionAguacero = "poquito";
      cantidadGotas = 80; // causar la lluvia suave
      gotasX = [];
      gotasY = [];
      gotasV = [];
    }
    if (mouseX > 1059 && mouseX < 1179 && mouseY > 21 && mouseY < 76) {
      eleccionAguacero = ""; // si sale y vuelve a entrar tiene la posibilidad de volver a elegir
      estadodelaguacero = true;
      estado = "menu"; // el clic lo devuelve a la pantalla de menú
      gotasX = []; //hacer que la lluvia se reinicie
      gotasY = [];
      gotasV = [];
      cantidadGotas = 0;
    }
  }
  if (estado === "Bogotropico") {
    //gestiona los clics del mouse mientras este en la pantalla de Bogotrópico
    if (mouseX > 1059 && mouseX < 1179 && mouseY > 21 && mouseY < 76) {
      estado = "menu"; // el clic lo devuelve a la pantalla de menú
    }
  }
}

//ESCRIBIR
function keyTyped() {
  if (estado === "datos") {
    //gestiona las teclas presionadas del teclado mientras este en la pantalla de datos
    if (escribiendo === "nombre") {
      // ingresa la información que el usario escribe en la variable del nombre
      nombre += key;
    }
    if (escribiendo === "correo") {
      // ingresa la información que el usario escribe en la variable del nombre
      correo += key;
    }
  }
}
//PRESIONAR
function keyPressed() {
  // gestiona si presiona teclas clave
  if (estado === "datos") {
    //gestiona las teclas clave presionadas mientras este en la pantalla de datos
    if (escribiendo === "nombre" && keyCode === BACKSPACE) {
      nombre = nombre.slice(0, -1); //gestionar que si se presiona la tecla borrar se borre la útila letra que este en el nombre
    }

    // BORRAR EN CORREO
    if (escribiendo === "correo" && keyCode === BACKSPACE) {
      correo = correo.slice(0, -1); //gestionar que si se presiona la tecla borrar se borre la útila letra que este en el correo
    }
  }
  if (estado === "menu") {
    //gestiona las teclas clave presionadas mientras este en la pantalla de menú
  }
}

