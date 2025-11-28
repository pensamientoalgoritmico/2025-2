//Luis Alberto Bräuninger
// Generador de Póster
// Este sketch genera un póster visual con patrones geométricos, colores y una frase personalizada.
// Tipografía: NetworkFreeVersion.ttf

// Declaración de variables
let formaSelect, sliderTamano, sliderCantidad, sliderTexto, inputFrase;
let sliderEspaciado, sliderGrosor, selectOrientacion;
let selectColorFondo, selectColorTitulo, selectColorMalla, selectColorPatron;
let botonFiguras, botonReiniciar, botonCentrar;
let forma = "Círculo";
let tamano = 40;
let cantidad = 6;
let frase = "Codigo Urbano";
let tamanoTexto = 32;
let fuenteNetwork;
let figurasRandom = [];
let textoX, textoY;
let textoSeleccionado = false;
let arrastrandoTexto = false;
let offsetX = 0;
let offsetY = 0;
let textoMovido = false; // bandera para saber si el usuario movió el texto
let lineasRandom = [];
let botonLineas;

function preload() {
  //Carga de la fuente
  fuenteNetwork = loadFont("NetworkFreeVersion.ttf");
}

function setup() {
  // NO EDITAR LA SIGUIENTE LINEA, HACE QUE SEA PANTALLA COMPLETA Y LO CENTRA EN WEB
  // Solo cambiar el tamaño del canvas si desea
  cnv = createCanvas(600, 600).parent("canvasContainer");

  textFont(fuenteNetwork);
  textAlign(CENTER, CENTER);
  noStroke();

  // Inicializar posición del texto en el centro del canvas
  textoX = width / 2;
  textoY = height / 2;
  textoMovido = false;

  // CONTROLES (usando position como en tu diseño)

  botonGuardar = createButton("Guardar imagen"); //Boton para SS
  botonGuardar.position(40, height - 180); // ajusta posición si hace falta
  botonGuardar.mousePressed(() => {
    redraw();
    setTimeout(() => {
      saveCanvas(cnv, "poster", "png"); // descarga poster.png
    }, 60);
  });

  formaSelect = createSelect(); //Boton de opciones
  formaSelect.position(40, height - 450);
  formaSelect.option("Escoge un patron");
  formaSelect.option("Círculo");
  formaSelect.option("Cuadrado");
  formaSelect.option("Triángulo");
  formaSelect.changed(() => {
    let v = formaSelect.value();
    if (v !== "Escoge un patron") forma = v;
    redraw();
  });

  sliderTamano = createSlider(10, 500, 40, 1); //SLIDER
  sliderTamano.position(40, height - 430);
  sliderTamano.input(() => {
    tamano = sliderTamano.value();
    redraw();
  });

  sliderCantidad = createSlider(1, 22, 6, 1);
  sliderCantidad.position(40, height - 410);
  sliderCantidad.input(() => {
    cantidad = sliderCantidad.value();
    redraw();
  });

  inputFrase = createInput("Escribe tu frase");
  inputFrase.position(40, height - 390);
  inputFrase.input(() => {
    frase = inputFrase.value();
    if (!textoMovido) {
      textoX = width / 2;
      textoY = height / 2;
    }
    redraw();
  });

  sliderTexto = createSlider(16, 200, 32, 1);
  sliderTexto.position(40, height - 370);
  sliderTexto.input(() => {
    tamanoTexto = sliderTexto.value();
    if (!textoMovido) {
      textoX = width / 2;
      textoY = height / 2;
    }
    redraw();
  });

  sliderEspaciado = createSlider(1, 100, 80, 1);
  sliderEspaciado.position(40, height - 330);
  sliderEspaciado.input(() => redraw());

  sliderGrosor = createSlider(1, 10, 2, 1);
  sliderGrosor.position(40, height - 310);
  sliderGrosor.input(() => redraw());

  selectOrientacion = createSelect();
  selectOrientacion.position(40, height - 350);
  selectOrientacion.option("Malla");
  selectOrientacion.option("Horizontal");
  selectOrientacion.option("Vertical");
  selectOrientacion.option("Cruzada");
  selectOrientacion.changed(() => redraw());

  selectColorFondo = createSelect();
  selectColorFondo.position(40, height - 290);
  selectColorFondo.option("Color De Fondo");
  selectColorFondo.option("Blanco");
  selectColorFondo.option("Negro");
  selectColorFondo.option("Azul");
  selectColorFondo.option("Rojo");
  selectColorFondo.changed(() => redraw());

  selectColorTitulo = createSelect();
  selectColorTitulo.position(40, height - 269);
  selectColorTitulo.option("Color De Letra");
  selectColorTitulo.option("Negro");
  selectColorTitulo.option("Blanco");
  selectColorTitulo.option("Azul");
  selectColorTitulo.option("Rojo");
  selectColorTitulo.changed(() => redraw());

  selectColorMalla = createSelect();
  selectColorMalla.position(650, height - 350);
  selectColorMalla.option("Color");
  selectColorMalla.option("Azul");
  selectColorMalla.option("Blanco");
  selectColorMalla.option("Negro");
  selectColorMalla.option("Rojo");
  selectColorMalla.changed(() => redraw());

  selectColorPatron = createSelect();
  selectColorPatron.position(40, height - 450);
  selectColorPatron.option("Color");
  selectColorPatron.option("Azul");
  selectColorPatron.option("Negro");
  selectColorPatron.option("Blanco");
  selectColorPatron.option("Rojo");
  selectColorPatron.changed(() => redraw());

  botonFiguras = createButton("Generar figuras random");
  botonFiguras.position(40, height - 250);
  botonFiguras.mousePressed(() => {
    generarFigurasRandom();
    redraw();
  });

  botonReiniciar = createButton("Reiniciar lienzo");
  botonReiniciar.position(40, height - 228);
  botonReiniciar.mousePressed(() => {
    window.location.reload();
  });

  // Botón para recentrar el texto manualmente al centro del canvas
  botonCentrar = createButton("Centrar texto");
  botonCentrar.position(40, height - 205);
  botonCentrar.mousePressed(() => {
    textoX = width / 2;
    textoY = height / 2;
    textoMovido = false;
    redraw();
  });

  // botón para generar líneas aleatorias
  botonLineas = createButton("Generar líneas random");
  botonLineas.position(40, height - 155); // ajusta posición si hace falta
  botonLineas.mousePressed(() => {
    generarLineasRandom();
    redraw();
  });
  noLoop();
}

function estaSobreTexto(px, py) {
  textFont(fuenteNetwork);
  textSize(tamanoTexto);
  let w = textWidth(frase);
  let h = textAscent() + textDescent();
  let left = textoX - w / 2;
  let right = textoX + w / 2;
  let top = textoY - h / 2;
  let bottom = textoY + h / 2;
  return px >= left && px <= right && py >= top && py <= bottom;
}

function mousePressed() {
  if (estaSobreTexto(mouseX, mouseY)) {
    textoSeleccionado = true;
    arrastrandoTexto = true;
    offsetX = mouseX - textoX;
    offsetY = mouseY - textoY;
    textoMovido = true; // marcar que el usuario empezó a mover el texto
  } else {
    textoSeleccionado = false;
  }
}

function mouseDragged() {
  if (arrastrandoTexto) {
    textoX = mouseX - offsetX;
    textoY = mouseY - offsetY;
    redraw();
  }
}

function mouseReleased() {
  arrastrandoTexto = false;
}

function touchStarted() {
  if (touches && touches.length > 0) {
    let t = touches[0];
    if (estaSobreTexto(t.x, t.y)) {
      textoSeleccionado = true;
      arrastrandoTexto = true;
      offsetX = t.x - textoX;
      offsetY = t.y - textoY;
      textoMovido = true;
      return false;
    } else {
      textoSeleccionado = false;
    }
  }
}

function touchMoved() {
  if (arrastrandoTexto && touches && touches.length > 0) {
    let t = touches[0];
    textoX = t.x - offsetX;
    textoY = t.y - offsetY;
    redraw();
    return false;
  }
}

function touchEnded() {
  arrastrandoTexto = false;
}

function draw() {
  // Fondo
  let fondo = selectColorFondo.value();
  if (fondo === "Color De Fondo" || fondo === "Blanco") background(255);
  else if (fondo === "Negro") background(0);
  else if (fondo === "Azul") background(50, 100, 200);
  else if (fondo === "Rojo") background(200, 50, 50);

  // Patrón (rejilla de formas)
  let margen = 80;
  let espacioX = (width - 2 * margen) / cantidad;
  let espacioY = (height - 200 - margen) / cantidad;

  // Color del patrón
  let colorPatron = selectColorPatron.value();
  if (colorPatron === "Color" || colorPatron === "Rojo") fill(200, 50, 50, 180);
  else if (colorPatron === "Azul") fill(50, 100, 150, 180);
  else if (colorPatron === "Negro") fill(0, 180);
  else if (colorPatron === "Blanco") fill(255, 180);

  for (let i = 0; i < cantidad; i++) {
    for (let j = 0; j < cantidad; j++) {
      let x = margen + i * espacioX + espacioX / 2;
      let y = 160 + j * espacioY + espacioY / 2;
      dibujarForma(x, y, tamano);
    }
  }

  // Malla (encima o debajo según prefieras; aquí la dibujamos encima)
  dibujarMalla();

  // Figuras random (encima del patrón)
  for (let f of figurasRandom) {
    if (f.color === "blanco") fill(255);
    else fill(0);
    dibujarForma(f.x, f.y, f.tam, f.tipo);
  }

  // Dibujar líneas aleatorias
  for (let L of lineasRandom) {
    strokeWeight(L.sw);
    if (L.col === "negro") stroke(0, L.alpha);
    else if (L.col === "blanco") stroke(255, L.alpha);
    else if (L.col === "rojo") stroke(200, 50, 50, L.alpha);
    else if (L.col === "azul") stroke(50, 100, 200, L.alpha);
    // dibujar línea
    line(L.x1, L.y1, L.x2, L.y2);
  }

  // Título y selección
  let colorTitulo = selectColorTitulo.value();
  let fillColor;
  if (colorTitulo === "Color De Letra" || colorTitulo === "Negro")
    fillColor = color(0);
  else if (colorTitulo === "Blanco") fillColor = color(255);
  else if (colorTitulo === "Azul") fillColor = color(50, 100, 200);
  else if (colorTitulo === "Rojo") fillColor = color(200, 50, 50);

  textFont(fuenteNetwork);
  textSize(tamanoTexto);
  textAlign(CENTER, CENTER);
  fill(fillColor);
  text(frase, textoX, textoY);

  if (textoSeleccionado) {
    noFill();
    stroke(255, 200);
    strokeWeight(1);
    let w = textWidth(frase);
    let h = textAscent() + textDescent();
    rectMode(CORNER);
    rect(textoX - w / 2 - 6, textoY - h / 2 - 6, w + 12, h + 12, 6);
    noStroke();
  }
}

// mover con teclado y enfocar input
function keyPressed() {
  if (textoSeleccionado) {
    let paso = keyIsDown(SHIFT) ? 10 : 1;
    if (keyCode === LEFT_ARROW) textoX -= paso;
    else if (keyCode === RIGHT_ARROW) textoX += paso;
    else if (keyCode === UP_ARROW) textoY -= paso;
    else if (keyCode === DOWN_ARROW) textoY += paso;
    else if (key === "e" || key === "E") inputFrase.elt.focus();
    textoMovido = true;
    redraw();
  }
}

// dibujarForma: dibuja círculo, cuadrado o triángulo según 'tipo'
function dibujarForma(x, y, s, tipo = forma) {
  if (tipo === "Círculo") {
    ellipse(x, y, s);
  } else if (tipo === "Cuadrado") {
    rectMode(CENTER);
    rect(x, y, s, s);
  } else if (tipo === "Triángulo") {
    let h = (s * sqrt(3)) / 2;
    triangle(x, y - h / 2, x - s / 2, y + h / 2, x + s / 2, y + h / 2);
  }
}

function dibujarMalla() {
  let espaciado = sliderEspaciado.value();
  let grosor = sliderGrosor.value();
  let orientacion = selectOrientacion.value();
  let colorElegido = selectColorMalla.value();

  let margen = 80;
  let inicioX = margen;
  let inicioY = 160;
  let areaX = width - 2 * margen;
  let areaY = height - 200 - margen;

  strokeWeight(grosor);

  if (colorElegido === "Azul") stroke(50, 100, 200, 140);
  else if (colorElegido === "Naranja") stroke(255, 140, 60, 140);
  else if (colorElegido === "Verde") stroke(80, 180, 100, 140);
  else if (colorElegido === "Rojo") stroke(200, 50, 50, 140);
  else stroke(0, 50); // fallback

  if (orientacion === "Horizontal" || orientacion === "Cruzada") {
    for (let y = inicioY; y <= inicioY + areaY; y += espaciado) {
      line(inicioX, y, inicioX + areaX, y);
    }
  }
  if (orientacion === "Vertical" || orientacion === "Cruzada") {
    for (let x = inicioX; x <= inicioX + areaX; x += espaciado) {
      line(x, inicioY, x, inicioY + areaY);
    }
  }
  noStroke();
}

function generarFigurasRandom() {
  figurasRandom = [];
  let n = floor(random(8, 25));
  let margen = 80;
  for (let i = 0; i < n; i++) {
    figurasRandom.push({
      x: random(margen, width - margen),
      y: random(160, height - 80),
      tam: random(20, 60),
      tipo: random(["Círculo", "Cuadrado", "Triángulo"]),
      color: random(["blanco", "negro"]),
    });
  }
}

function generarLineasRandom() {
  lineasRandom = [];
  // número de líneas aleatorias entre 6 y 30
  let n = floor(random(6, 31));
  let margen = 20; // margen para que no salgan justo en el borde
  for (let i = 0; i < n; i++) {
    let x1 = random(margen, width - margen);
    let y1 = random(margen, height - margen);
    let x2 = random(margen, width - margen);
    let y2 = random(margen, height - margen);

    // opciones estéticas aleatorias
    let sw = random([0.5, 1, 2, 3, 4]); // grosor
    let col = random(["negro", "blanco", "rojo", "azul"]); // o usa color(r,g,b)
    let alpha = random(80, 220); // transparencia

    lineasRandom.push({ x1, y1, x2, y2, sw, col, alpha });
  }
}

function windowResized() {
  resizeCanvas(600, 600);
  // recentrar al nuevo tamaño solo si el usuario no movió el texto
  if (!textoMovido) {
    textoX = width / 2;
    textoY = height / 2;
  }
  redraw();
}
