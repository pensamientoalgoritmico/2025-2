// Variables para fuentes
let urbanaFont, aerosFont, robloxFont;

// Controles
let sliderEdificio1;
let sliderEdificio2;
let sliderEdificio3;
let colorVentanas;
let selectorHora;
let campoNombre;
let selectorFuente;

function preload() {
  urbanaFont = loadFont("Urbana.ttf");
  aerosFont = loadFont("Aeros.otf");
  robloxFont = loadFont("Roblox.ttf");
}

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent("canvasContainer");
  textAlign(CENTER, CENTER);
  textSize(10);

  // Slider para tamaño del edificio 1
  sliderEdificio1 = createSlider(150, 400, 250, 10);
  // sliderEdificio1.position(585, 40);
  sliderEdificio1.position(40, 40);
  sliderEdificio1.class("slider1");

  // Slider para tamaño del edificio 2
  sliderEdificio2 = createSlider(150, 400, 350, 10);
  // sliderEdificio2.position(585, 60);
  sliderEdificio2.position(40, 60);
  sliderEdificio2.class("slider2");

  // Slider para tamaño del edificio 3
  sliderEdificio3 = createSlider(150, 400, 300, 10);
  // sliderEdificio3.position(585, 80);
  sliderEdificio3.position(40, 80);
  sliderEdificio3.class("slider3");

  // Color picker para ventanas
  colorVentanas = createColorPicker("plum");
  colorVentanas.position(1110, 500);
  colorVentanas.class("pickerVentanas");

  // Selector para hora del día
  selectorHora = createSelect();
  selectorHora.position(1110, 550);
  selectorHora.option("Mañana");
  selectorHora.option("Tarde");
  selectorHora.option("Noche");
  selectorHora.selected("Mañana");
  selectorHora.class("selectorHora");

  // Campo de texto para nombre del usuario
  campoNombre = createInput("");
  // campoNombre.position(585, 120);
  campoNombre.position(40, 120);

  campoNombre.attribute("placeholder", "Tu nombre");

  // Selector de tipografía
  selectorFuente = createSelect();
  // selectorFuente.position(585, 150);
  selectorFuente.position(40, 150);
  selectorFuente.option("Urbana");
  selectorFuente.option("Aeros");
  selectorFuente.option("Roblox");
  selectorFuente.selected("Urbana");
  selectorFuente.class("selectorFuente");
}

function draw() {
  // Fondo según hora del día
  let hora = selectorHora.value();
  if (hora === "Mañana") {
    background(176, 196, 222);
  } else if (hora === "Tarde") {
    background(255, 146, 0); // cálido
  } else if (hora === "Noche") {
    background(13, 49, 97); // oscuro
  }

  // Obtener valores de controles
  let h1 = sliderEdificio1.value();
  let h2 = sliderEdificio2.value();
  let h3 = sliderEdificio3.value();
  let colorW = colorVentanas.color();
  let nombre = campoNombre.value();

  // Cambiar tipografía según selección
  let fuente = selectorFuente.value();
  if (fuente === "Urbana") {
    textFont(urbanaFont);
  } else if (fuente === "Aeros") {
    textFont(aerosFont);
  } else if (fuente === "Roblox") {
    textFont(robloxFont);
  }

  // Mensaje claro
  fill(255);
  textSize(40);
  if (nombre !== "") {
    text("Bienvenid@, " + nombre + "!", 470, 110);
  } else {
    text("Bienvenid@, ", 470, 110);
  }
  fill(255);
  textSize(40);
  text("a la rutina diaria de Bogota", 470, 150);

  // Dibujar edificios
  fill(100);
  rect(100, height - h1, 100, h1); // edificio 1
  rect(250, height - h2, 100, h2); // edificio 2
  rect(400, height - h3, 100, h3); // edificio 3

  // Dibujar ventanas en cada edificio
  fill(colorW);
  for (let y = height - h1 + 20; y < height; y += 40) {
    rect(110, y, 20, 20);
    rect(160, y, 20, 20);
  }
  for (let y = height - h2 + 20; y < height; y += 40) {
    rect(260, y, 20, 20);
    rect(310, y, 20, 20);
  }
  for (let y = height - h3 + 20; y < height; y += 40) {
    rect(410, y, 20, 20);
    rect(460, y, 20, 20);
  }

  // Estilo visual adicional
  fill(0, 0, 205);
  textSize(18);
  text("Interactua con los botones y", 670, 420);
  text("revela los secretos que Bogota", 670, 440);
  text("guarda para ti", 670, 460);
  // Dibujar flecha dorada hacia la izquierda en (700,550)
  fill(255, 215, 0); // dorado
  stroke(255, 215, 0);
  beginShape();
  vertex(680, 540); // punta de la flecha
  vertex(720, 520);
  vertex(720, 530);
  vertex(760, 530);
  vertex(760, 550);
  vertex(720, 550);
  vertex(720, 560);
  endShape(CLOSE);
}
