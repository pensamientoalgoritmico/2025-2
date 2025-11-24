
// VARIABLES
let nombrePoster = "";
let ubicacionActual = "0"; 
let nombrePersonaje1 = "";
let nombrePersonaje2 = "";
let imgCandelaria, imgUsaquen, imgCentro, imgChapinero;
let fuente;
let personajesVisibles = new Set();

// PALETA RETRO
const C = {
  magenta: "#ff00ff",
  cyan: "#00ffff",
  amarillo: "#ffcc00",
  turquesa: "#2ad1d1",
  naranja: "#ff7a00",
  azul: "#0033aa",
  azulOsc: "#0a1a33",
  piel1: "#ffcc99",
  piel2: "#d9a679",
  gris: "#666666",
  grisOsc: "#333333",
  negro: "#000000",
  blanco: "#ffffff",
  café: "#6b4f2b",
  verde: "#1ea34a",
  rojo: "#cc2233",
  morado: "#7c3ef3"
};

function preload() {
  imgCentro = loadImage("assets/Centro1.png");
  imgCandelaria = loadImage("assets/Lacandelaria1.png");
  imgUsaquen = loadImage("assets/Usaquen1.png");
  imgChapinero = loadImage("assets/Chapi.png");
  fuente = loadFont('PressStart2P-Regular.ttf');
}

function setup() {
  
  // NO EDITAR LA SIGUIENTE LINEA, HACE QUE SEA PANTALLA COMPLETA Y LO CENTRA EN WEB
  createCanvas(windowWidth, windowHeight).parent("canvasContainer");
  let canvas = createCanvas(400, 400);
  canvas.parent("canvasContainer");
  noStroke();

  document.getElementById("fondo").addEventListener("change", e => {
    ubicacionActual = e.target.value;
    redraw();
  });

  document.getElementById("nombrePoster").addEventListener("input", e => {
    nombrePoster = e.target.value;
    redraw();
  });

  document.getElementById("nombrePersonaje1").addEventListener("input", e => {
    nombrePersonaje1 = e.target.value;
    redraw();
  });

  document.getElementById("nombrePersonaje2").addEventListener("input", e => {
    nombrePersonaje2 = e.target.value;
    redraw();
  });

  document.querySelectorAll(".btnPersonaje").forEach(btn => {
    btn.addEventListener("click", () => {
      const nombre = btn.dataset.nombre;
      if (personajesVisibles.has(nombre)) {
        personajesVisibles.delete(nombre);
        btn.classList.remove("activo");
      } else {
        personajesVisibles.add(nombre);
        btn.classList.add("activo");
      }
      redraw();
    });
  });

  document.getElementById("btnGenerar").addEventListener("click", () => {
    redraw();
  });

  // NUEVO: botón guardar imagen
  document.getElementById("btnGuardar").addEventListener("click", () => {
    saveCanvas(canvas, 'poster_bogota', 'png');
  });

  noLoop();
}

function draw() {
  background(0);

  // Fondo
  imageMode(CORNER);
  if (ubicacionActual === "0" && imgCentro) image(imgCentro, 0, 0, width, height);
  else if (ubicacionActual === "1" && imgCandelaria) image(imgCandelaria, 0, 0, width, height);
  else if (ubicacionActual === "2" && imgUsaquen) image(imgUsaquen, 0, 0, width, height);
  else if (ubicacionActual === "3" && imgChapinero) image(imgChapinero, 0, 0, width, height);

  // Título del póster
  textFont(fuente);
  textSize(20);
  textAlign(CENTER, CENTER);
  fill(C.blanco);
  text(nombrePoster, width / 2, height / 10);

  // Personaje 1
  if (personajesVisibles.has("1")) {
    dibujarElegante(width * 0.25, height * 0.55);
    text(nombrePersonaje1, width * 0.25, height * 0.9);
  }

  // Personaje 2
  if (personajesVisibles.has("2")) {
    dibujarAudifonos(width * 0.75, height * 0.55);
    text(nombrePersonaje2, width * 0.75, height * 0.9);
  }
}

// PERSONAJE 1
function dibujarElegante(x, y) {
  push();
  translate(x, y);
  scale(3);
  noStroke();

  fill("#a0a0a0");
  beginShape();
  vertex(-6, -22); vertex(18, -22); vertex(20, -18); vertex(-8, -18);
  endShape(CLOSE);
  fill("#7d7d7d");
  rect(-2, -18, 16, 8);

  fill("#d9a679");
  rect(0, -10, 12, 12, 2);
  fill("#5d4c34");
  rect(2, -4, 8, 3);
  fill("#c48b52");
  rect(5, -7, 3, 3);
  fill("#3a2e1f");
  rect(2, -10, 4, 2);
  rect(7, -10, 4, 2);
  fill(0);
  rect(3, -7, 2, 2);
  rect(8, -7, 2, 2);

  fill("#19324a");
  rect(-4, 2, 20, 22);
  fill("#c93131");
  rect(4, 4, 4, 8);
  fill("#751a1a");
  rect(5, 12, 2, 4);
  fill("#d4c48f");
  rect(3, 10, 2, 2);
  rect(3, 14, 2, 2);
  rect(3, 18, 2, 2);

  fill("#d9a679");
  rect(-8, 4, 4, 14);
  rect(16, 4, 4, 14);

  fill("#1b293b");
  rect(0, 24, 6, 10);
  rect(6, 24, 6, 10);
  fill("#000000");
  rect(0, 34, 6, 3);
  rect(6, 34, 6, 3);

  pop();
}

// PERSONAJE 2
function dibujarAudifonos(x, y) {
  push();
  translate(x, y);
  scale(3);
  noStroke();

  fill("#6b4f2b");
  beginShape();
  vertex(-2, -14); vertex(16, -14); vertex(16, -4); vertex(-2, -4);
  endShape(CLOSE);

  fill("#82e1ff");
  rect(-4, -12, 4, 12);
  rect(16, -12, 4, 12);
  rect(0, -16, 12, 4);

  fill("#ffcc99");
  rect(2, -10, 12, 12, 2);
  fill(0);
  rect(4, -6, 2, 2);
  rect(10, -6, 2, 2);
  fill("#c76767");
  rect(6, -2, 4, 2);
  fill("#3a2e1f");
  rect(4, -10, 3, 2);
  rect(9, -10, 3, 2);

  fill("#e94b6b");
  rect(-2, 2, 20, 22);
  fill("#ffcc33");
  rect(2, 4, 12, 12);

  fill("#ffcc99");
  rect(-6, 4, 4, 14);
  rect(18, 4, 4, 14);

  fill("#3c628a");
  rect(4, 24, 6, 10);
  rect(10, 24, 6, 10);
  fill("#8c1f3f");
  rect(4, 34, 6, 3);
  rect(10, 34, 6, 3);

  pop();
}
//Ajustar el tamaño cuando cambia el tamaño de la pantalla
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
