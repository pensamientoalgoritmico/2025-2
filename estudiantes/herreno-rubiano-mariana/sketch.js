// Entrega final
// Mariana Herreño Rubiano
// SeñalArte
// SeñalArte es una aplicación interactiva que permite crear un póster personalizado inspirado en Bogotá. 
// El usuario puede elegir una señal de tránsito con palabras típicas bogotanas, agregarle stickers 
// personalizados como un nombre o un tag de graffiti y guardar su composición final para conservar su propia creación urbana.
// La IA me ayudó a crear algunas funciones complejas, sobre todo las que tienen que ver con la lluvia 
// y el destello aleatorio de las ventanas. También me ayudó a conectar los botones del HTML con el sketch 
// y a corregir errores del código.

// Variables principales: color de la señal, gotas de lluvia, palabra de la señal y stickers
let colorSenal;
let gotas = [];
let palabraActual = "PARE";
let tipografiaSticker;
let palabras = [];
let stickers = [];
let maxStickers = 4;
let mostrarBienvenida = true; 

// Antes de empezar cargo la tipografía y el archivo de palabras
preload = () => {
  tipografiaSticker = loadFont("tipografia/letra.otf");
  loadStrings("palabras/señal.txt", (data) => {
    palabras = data; // aquí se guardan las palabras de la señal
  });
};

function setup() {
  // NO EDITAR LA SIGUIENTE LINEA, HACE QUE SEA PANTALLA COMPLETA Y LO CENTRA EN WEB
  createCanvas(600, 600).parent("canvasContainer");

  colorSenal = color(200, 0, 0); // color base de la señal
  frameRate(30);
  angleMode(DEGREES);
}

function draw() {
  background(20, 20, 40); // fondo oscuro tipo noche bogotana

  dibujarEdificios(); // edificios del fondo
  dibujarLluvia();    // lluvia animada (hecha con ayuda de IA)

  // Pantalla de bienvenida
  if (mostrarBienvenida) {
    dibujarBienvenida(); 
  } else {
    dibujarPoste();
    dibujarSenal();
    dibujarStickers(); 
  }
}

// Pantalla inicial
dibujarBienvenida = () => {
  push();
  textAlign(CENTER, CENTER);

  // Título con la tipografía importada
  textFont(tipografiaSticker);
  fill(255);
  textSize(48);
  text("Bienvenido a SeñalArte", width / 2, height / 3);

  // Texto más pequeño explicando qué hacer
  textFont("sans-serif");
  textSize(18);
  fill(200);
  text(
    "En este programa crearás una composición personalizada de Bogotá,\npuede ser utilizada como póster.\nHaz click para continuar.",
    width / 2,
    height / 2
  );
  pop();
};

// Dibujar la señal hexagonal típica
dibujarSenal = () => {
  push();
  translate(width / 2, height / 3);
  stroke(255);
  strokeWeight(6);
  fill(colorSenal);

  // Forma hexagonal hecha a mano
  beginShape();
  vertex(86.6, -50);
  vertex(86.6, 50);
  vertex(0, 100);
  vertex(-86.6, 50);
  vertex(-86.6, -50);
  vertex(0, -100);
  endShape(CLOSE);

  // Palabra del centro
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(40);
  textFont("sans-serif");
  text(palabraActual, 0, 0);
  pop();
};

// Dibujar los stickers que el usuario agrega
dibujarStickers = () => {
  push();
  translate(width / 2, height / 3);

  for (let i = 0; i < stickers.length; i++) {
    let s = stickers[i];
    push();
    translate(s.x, s.y);
    rotate(s.rotacion);

    // Fondo del sticker
    fill(255, 255, 0);
    stroke(0);
    strokeWeight(2);
    rectMode(CENTER);
    rect(0, 0, 80, 25, 5);

    // Texto del sticker
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    textFont(tipografiaSticker);
    text(s.texto, 0, 0);

    pop();
  }

  pop();
};

// Poste que sostiene la señal
dibujarPoste = () => {
  stroke(100);
  strokeWeight(10);
  line(width / 2, height / 3 + 100, width / 2, height);
};

// Edificios del fondo con ventanas que se prenden y apagan aleatoriamente
// (esta parte la hice con ayuda de IA porque mezcla ciclos, colores y aleatoriedad)
dibujarEdificios = () => {
  noStroke();
  for (let i = 0; i < width; i += 100) {
    fill(30);
    rect(i, height / 2, 80, height / 2);

    for (let y = height / 2 + 20; y < height; y += 40) {
      for (let x = i + 10; x < i + 70; x += 20) {
        // Ventanas que se iluminan al azar
        fill(random() < 0.05 ? color(255, 255, 100) : color(10));
        rect(x, y, 10, 10);
      }
    }
  }
};

// Lluvia animada (también creada con ayuda IA para manejar la velocidad y movimiento)
dibujarLluvia = () => {
  if (gotas.length < 200) {
    gotas.push({
      x: random(width),
      y: random(-100, 0),
      speed: random(4, 10)
    });
  }

  stroke(180, 180, 255);
  for (let i = 0; i < gotas.length; i++) {
    let g = gotas[i];
    line(g.x, g.y, g.x, g.y + 10);
    g.y += g.speed;

    if (g.y > height) {
      g.y = random(-100, 0);
      g.x = random(width);
    }
  }
};

// Agregar un nuevo sticker desde el input
agregarSticker = () => {
  if (stickers.length >= maxStickers) return;

  let input = document.getElementById("stickerInput");
  let texto = input.value;

  let x = random(-70, 70);
  let y = random(-80, 80);

  // Evito que salga justo encima de la palabra con ayuda de IA
  if (abs(x) < 50 && abs(y) < 30) {
    x = random(-70, 70);
    y = random(-80, 80);
  }

  let rotacion = random(-45, 45);
  stickers.push({ texto: texto, x: x, y: y, rotacion: rotacion });
};

// Borrar el último sticker
borrarSticker = () => {
  if (stickers.length > 0) {
    stickers.pop();
  }
};

// Cambiar la palabra de la señal al azar desde el archivo cargado
cambiarPalabra = () => {
  if (palabras.length > 0) {
    palabraActual = random(palabras);
  }
};

// Guardar la composición como imagen final
guardarComposicion = () => {
  saveCanvas('mi_composicion', 'png');
};

// Cambiar de la pantalla de bienvenida al programa
mousePressed = () => {
  if (mostrarBienvenida) {
    mostrarBienvenida = false;

    // Función para volver al inicio si el usuario quiere
    volverInicio = () => {
      mostrarBienvenida = true;
    };
  }
};
