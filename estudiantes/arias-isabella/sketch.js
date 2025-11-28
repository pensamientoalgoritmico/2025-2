// Isabella Arias
// Bogotá vibrante un mural de una ciudad con memoria
// Generador interactivo que genera grafiti persistente y permite dibujar con herramientas temporales.El sketch recoge percepciones del usuario, dibuja edificios que reaccionan al sonido,permite generar grafiti persistente y dibujar trazos temporales (es
//https://editor.p5js.org/WestRiverLin/sketches/SJnD_deBW, DJLU – Juegasiempre, Zach Lieberman
//Uso de IA: apoyo en diseño de interacción y refinamiento de persistencia y estética.Se uso especificamente para ubicar e incluir los botones dentro del diseño. Adicionalmente,fue esencial para saber como lograr que al crear el graffiti no se llene muy rapido la pantalla.

//Inicio código

// Variables globales
let palabrasA, palabrasB, frases;
let fuente;
let lienzo;
let selectorPaleta, selectorFigura;
let btnPlay, btnReset, btnExport, btnGraff, btnGenerar;
let inputNombre, inputBogotaEs;
let tamanoSlider, categoryRadio;
let radioBox;
let coloresActuales;
let formaActual = "espiral";
let cancion, amp;
let numEdificios,
  alturasEdificios = [];
let modoGraffiti = false;
let pgGraffiti; // buffer persistente para grafiti que permanece
let pgTemp; // buffer temporal para trazos del usuario
let pressFrames = 0;
// Paleta 1: pensada como bogotá con vida nocturna, P:2, bogota en sus tonos grises,P3:la ciudad calida y la tierra,P:4 tonos amarillos debido a las construcciones. p5:tonos verdes debido a las montañas que rodean la ciudad
let paleta1 = ["#FF25A5", "#7209B7", "#3A0CA3", "#4361EE", "#4CC9F0"];
let paleta2 = ["#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#1D3557"];
let paleta3 = ["#FFCA3A", "#8AC926", "#1982C4", "#6A4C93", "#F72585"];
let paleta4 = ["#F77F00", "#D62828", "#003049", "#EAE2B7", "#FCBF49"];
let paleta5 = ["#06D6A0", "#118AB2", "#073B4C", "#FFD166", "#EF476F"];

function preload() {
  try {
    palabrasA = loadStrings("assets/palabrasA.txt");
    palabrasB = loadStrings("assets/palabrasB.txt");
    frases = loadStrings("assets/frases.txt");
  } catch (e) {
    palabrasA = ["vida", "ruido", "memoria"];
    palabrasB = ["calles que hablan", "muros con historia"];
    frases = ["Bogotá resiste", "Bogotá se pinta"];
  }
  try {
    fuente = loadFont("assets/PermanentMarker-Regular.ttf");
  } catch (e) {
    fuente = null;
  }
  soundFormats("mp3");
  try {
    cancion = loadSound("assets/cancion.mp3");
  } catch (e) {
    cancion = null;
  }
}
// Motivo: las flores representan el contraste y la belleza que el graffiti aporta a Bogotá. Al igual que su naturaleza, se dibujan como trazos temporales para que el usuario "pinte" flores sobre la ciudad.
class Flor {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tamano = 60;
    this.cantidad = 6;
    this.rotacion = 0;
    this.estilo = "Centro";
    this.fondo = false;
    this.col = color(220, 120, 180, 220);
  }
  dibujarEnCanvas(pg) {
    // Dibuja la flor en el gráfico pasado (pg puede ser pgTemp o el canvas principal)
    pg.push();
    pg.translate(this.x, this.y);
    pg.rotate(this.rotacion);
    pg.noStroke();
    if (this.fondo) {
      pg.fill(100, 150, 255, 60);
      pg.ellipse(0, 0, this.tamano * 2);
    }
    pg.fill(this.col);
    for (let i = 0; i < this.cantidad; i++) {
      pg.push();
      pg.rotate((TWO_PI / this.cantidad) * i);
      pg.ellipse(this.tamano * 0.5, 0, this.tamano * 0.8, this.tamano * 0.4);
      pg.pop();
    }
    pg.fill(240, 220, 120);
    pg.ellipse(0, 0, this.tamano * 0.6);
    if (this.estilo === "Redonda") {
      pg.fill(255, 255, 255, 40);
      pg.ellipse(0, 0, this.tamano * 1.1);
    } else if (this.estilo === "Triangular") {
      pg.fill(200, 180, 100, 120);
      pg.triangle(
        -this.tamano * 0.3,
        this.tamano * 0.25,
        0,
        -this.tamano * 0.45,
        this.tamano * 0.3,
        this.tamano * 0.25
      );
    }
    pg.pop();
  }
}
function setup() {
  // NO EDITAR: pantalla completa y centrado en web (plantilla)
  createCanvas(windowWidth, windowHeight).parent("canvasContainer");
  // Buffer persistente para grafiti que debe quedarse
  pgGraffiti = createGraphics(width, height);
  pgGraffiti.clear();
  // Buffer temporal para trazos del usuario
  pgTemp = createGraphics(width, height);
  pgTemp.clear();
  coloresActuales = paleta1;
  amp = new p5.Amplitude();
  if (cancion) amp.setInput(cancion);
  // Inicializar alturas de edificios con ruido
  inicializarEdificios();
  if (fuente) textFont(fuente);
  else textFont("Helvetica");
  // Crear Interfaz de Usuario posicionada relativamente al canvas
  crearUI();
}
function draw() {
  // Fondo con menor opacidad para que los trazos tarden más en desaparecer
  background(0, 0, 0, 8);
  // Capa dinámica que puede ir detrás de edificios
  if (modoGraffiti) dibujarCapaGraffiti();
  // Dibujar edificios representa lo urbano de la ciudad
  dibujarEdificios();
  // Mostrar grafiti persistente
  image(pgGraffiti, 0, 0);
  // Mostrar capa temporal con trazos del usuario (siempre encima)
  image(pgTemp, 0, 0);
  // Actualizar contador de frames presionado para grosor por presión sostenida
  if (
    mouseIsPressed &&
    mouseY > 0 &&
    mouseY < height &&
    mouseX > 0 &&
    mouseX < width
  ) {
    pressFrames = min(pressFrames + 1, 120);
  } else {
    pressFrames = 0;
  }
}
// Genera alturas para evitar una progresión ordenada de los edificios. Esto  representa la diversidad urbana de manera organica.
function inicializarEdificios() {
  numEdificios = max(6, int(width / 40));
  alturasEdificios = [];
  let noiseSeedBase = random(1000);
  for (let i = 0; i < numEdificios; i++) {
    let n = noise(noiseSeedBase + i * 0.18);
    let baseAlt = map(n, 0, 1, height * 0.12, height * 0.45);
    let jitter = random(-height * 0.06, height * 0.06);
    alturasEdificios[i] = constrain(
      baseAlt + jitter,
      height * 0.08,
      height * 0.6
    );
  }
}
// Posiciona elementos al canvas para que parezcan "dentro".Incluye: título, instrucciones, inputs, slider, radio (encerrado en un caudro), botones. Comentario de diseño: "Tu nombre" y "Bogotá es..." recogen voces personales; el radio agrupa la categoría.
function crearUI() {
  const marginX = width * 0.03;
  const titleY = 6;
  const instrOffset = 34;
  const topControlsY = 84;
  const midInstructionOffsetFromBottom = 140;
  // Evitar duplicados si se recrea la UI
  removeExistingUI();
  // Título "BOGOTÁ" (empieza donde inicia el canvas)
  let titulo = createDiv("BOGOTÁ");
  titulo.style("color", "#4CC9F0");
  titulo.style("font-size", "28px");
  titulo.style("font-weight", "700");
  titulo.style("font-family", "Helvetica, Arial, sans-serif");
  titulo.style("position", "absolute");
  titulo.style("z-index", "60");
  titulo.attribute("id", "ui_titulo");
  titulo.position(marginX, titleY);
  // Instrucciones superiores
  let instruccionesArriba = createDiv(
    "Llena y selecciona los datos para generar tu graffiti."
  );
  instruccionesArriba.style("color", "#ffffff");
  instruccionesArriba.style("font-size", "14px");
  instruccionesArriba.style("font-family", "Helvetica, Arial, sans-serif");
  instruccionesArriba.style("position", "absolute");
  instruccionesArriba.style("z-index", "60");
  instruccionesArriba.attribute("id", "ui_instr_arriba");
  instruccionesArriba.position(marginX + 6, titleY + instrOffset);
  // Instrucción intermedia (entre edificios y botones)
  let instruccionesMedio = createDiv("Usa las herramientas para dibujar.");
  instruccionesMedio.style("color", "#FFD166");
  instruccionesMedio.style("font-size", "15px");
  instruccionesMedio.style("font-family", "Helvetica, Arial, sans-serif");
  instruccionesMedio.style("font-weight", "600");
  instruccionesMedio.style("position", "absolute");
  instruccionesMedio.style("z-index", "60");
  instruccionesMedio.attribute("id", "ui_instr_medio");
  instruccionesMedio.position(
    marginX + 6,
    height - midInstructionOffsetFromBottom + 30
  );
  // Controles superiores
  inputNombre = createInput("");
  inputNombre.attribute("placeholder", "Tu nombre");
  inputNombre.style("position", "absolute");
  inputNombre.style("z-index", "60");
  inputNombre.attribute("id", "ui_nombre");
  aplicarEstiloControlPequenio(inputNombre);
  inputNombre.position(marginX, topControlsY);
  inputBogotaEs = createInput("");
  inputBogotaEs.attribute("placeholder", "Bogotá es...");
  inputBogotaEs.style("position", "absolute");
  inputBogotaEs.style("z-index", "60");
  inputBogotaEs.attribute("id", "ui_bogota");
  aplicarEstiloControlPequenio(inputBogotaEs);
  inputBogotaEs.position(marginX + 220, topControlsY);
  // Contenedor para el radio (Palabras / Frases / Historia)
  radioBox = createDiv();
  radioBox.attribute("id", "ui_radioBox");
  radioBox.style("position", "absolute");
  radioBox.style("z-index", "60");
  radioBox.style("left", marginX + 460 + "px");
  radioBox.style("top", topControlsY - 6 + "px");
  radioBox.style("padding", "6px 10px");
  radioBox.style("border", "2px solid rgba(255,37,165,0.9)");
  radioBox.style("border-radius", "8px");
  radioBox.style("background", "rgba(20,20,20,0.6)");
  radioBox.style("box-shadow", "0 6px 18px rgba(0,0,0,0.45)");
  categoryRadio = createRadio();
  categoryRadio.option("A", "Palabras");
  categoryRadio.option("B", "Frases");
  categoryRadio.option("F", "Historia");
  categoryRadio.style("font-size", "12px");
  categoryRadio.parent(radioBox);
  // Barra de tamaño y botón Generar en la misma fila: primero la barra, luego Generar
  tamanoSlider = createSlider(18, 72, 36);
  tamanoSlider.style("position", "absolute");
  tamanoSlider.style("z-index", "60");
  aplicarEstiloControlPequenio(tamanoSlider);
  tamanoSlider.position(marginX, topControlsY + 44);
  btnGenerar = createButton("Generar grafiti");
  aplicarEstiloBotonPequenio(btnGenerar);
  btnGenerar.position(marginX + 160, topControlsY + 40);
  btnGenerar.mousePressed(() => {
    limpiarGrafiti();
    let piezas = [];
    let nombre = inputNombre.value().trim();
    let bogota = inputBogotaEs.value().trim();
    if (nombre.length > 0) piezas.push(nombre);
    if (bogota.length > 0) piezas.push("Bogotá es " + bogota);
    let seleccion = categoryRadio.value();
    if (seleccion === "A") piezas.push(random(palabrasA));
    else if (seleccion === "B") piezas.push(random(palabrasB));
    else if (seleccion === "F") piezas.push(random(frases));
    else piezas.push("Bogotá");
    generarComposicionGrafiti(piezas, tamanoSlider.value());
  });
  // Controles inferiores (botones y selects)
  const bottomY = height - 60;
  btnPlay = createButton("Play / Pause");
  aplicarEstiloBoton(btnPlay);
  btnPlay.position(marginX, bottomY);
  btnPlay.mousePressed(togglePlay);
  selectorPaleta = createSelect();
  aplicarEstiloControl(selectorPaleta);
  selectorPaleta.position(marginX + 140, bottomY);
  selectorPaleta.option("Distrito Grafiti");
  selectorPaleta.option("La Candelaria");
  selectorPaleta.option("Santa Fe");
  selectorPaleta.option("Avenida Boyacá");
  selectorPaleta.option("Avenida El Dorado");
  selectorPaleta.changed(cambiarPaleta);

  selectorFigura = createSelect();
  aplicarEstiloControl(selectorFigura);
  selectorFigura.position(marginX + 320, bottomY);
  selectorFigura.option("espiral");
  selectorFigura.option("flores");
  selectorFigura.option("triángulos");
  selectorFigura.changed(() => (formaActual = selectorFigura.value()));

  btnGraff = createButton("Capas");
  aplicarEstiloBoton(btnGraff);
  btnGraff.position(marginX + 500, bottomY);
  btnGraff.mousePressed(() => (modoGraffiti = !modoGraffiti));

  btnReset = createButton("Limpiar mural");
  aplicarEstiloBoton(btnReset);
  btnReset.position(marginX, height - 28);
  btnReset.mousePressed(resetMural);

  btnExport = createButton("Descargar PNG");
  aplicarEstiloBoton(btnExport);
  btnExport.position(marginX + 140, height - 28);
  btnExport.mousePressed(() => saveCanvas("mural_neon", "png"));
}
// Evita duplicados
function removeExistingUI() {
  const ids = [
    "ui_titulo",
    "ui_instr_arriba",
    "ui_instr_medio",
    "ui_nombre",
    "ui_bogota",
    "ui_radioBox",
  ];
  ids.forEach((id) => {
    let el = select("#" + id);
    if (el) el.remove();
  });
  // eliminar botones/selects/inputs si existen evita duplicados
  //IA lo incluyo al utilizar el elemento de windowResized()
  let possible = [
    inputNombre,
    inputBogotaEs,
    categoryRadio,
    tamanoSlider,
    btnGenerar,
    btnPlay,
    selectorPaleta,
    selectorFigura,
    btnGraff,
    btnReset,
    btnExport,
  ];
  possible.forEach((p) => {
    if (p && p.elt && document.body.contains(p.elt)) {
      try {
        p.remove();
      } catch (e) {}
    }
  });
}
function aplicarEstiloControlPequenio(el) {
  el.style("font-size", "12px");
  el.style("padding", "4px 6px");
  el.style("border-radius", "6px");
  el.style("border", "2px solid #ff25a5");
  el.style("background", "#151515");
  el.style("color", "#fefefe");
  el.style("box-shadow", "0 6px 18px rgba(0,0,0,0.45)");
  el.style("position", "absolute");
  el.style("z-index", "60");
}
function aplicarEstiloBotonPequenio(b) {
  aplicarEstiloControlPequenio(b);
  b.style("cursor", "pointer");
  b.style("text-transform", "uppercase");
  b.style("letter-spacing", "0.4px");
  b.style("background", "linear-gradient(180deg, #4361EE, #FF25A5)");
  b.style("border", "none");
  b.style("padding", "6px 10px");
  b.style("font-size", "12px");
}
function aplicarEstiloControl(el) {
  el.style("font-size", "13px");
  el.style("padding", "6px 8px");
  el.style("border-radius", "8px");
  el.style("border", "2px solid #ff25a5");
  el.style("background", "#151515");
  el.style("color", "#fefefe");
  el.style("box-shadow", "0 6px 18px rgba(0,0,0,0.45)");
  el.style("position", "absolute");
  el.style("z-index", "60");
}
function aplicarEstiloBoton(b) {
  aplicarEstiloControl(b);
  b.style("cursor", "pointer");
  b.style("text-transform", "uppercase");
  b.style("letter-spacing", "0.5px");
  b.style("background", "linear-gradient(180deg, #4361EE, #FF25A5)");
  b.style("border", "none");
  b.style("padding", "8px 12px");
}
function cambiarPaleta() {
  let op = selectorPaleta.value();
  if (op === "Distrito Grafiti") coloresActuales = paleta1;
  else if (op === "La Candelaria") coloresActuales = paleta2;
  else if (op === "Santa Fe") coloresActuales = paleta3;
  else if (op === "Avenida Boyacá") coloresActuales = paleta4;
  else coloresActuales = paleta5;
}
function togglePlay() {
  if (!cancion) return;
  if (!cancion.isPlaying()) cancion.play();
  else cancion.pause();
}
function resetMural() {
  background(0);
  limpiarGrafiti();
}
function limpiarGrafiti() {
  pgGraffiti.clear();
}
// Dibujan edificios
function dibujarEdificios() {
  let nivel = cancion && amp ? amp.getLevel() : 0.03;
  // groundY un poco más arriba para dejar espacio a la instrucción y botones
  let groundOffsetFromBottom = 140; // px
  let groundY = height - groundOffsetFromBottom;
  numEdificios = max(6, int(width / 40));
  let w = width / numEdificios;
  let noiseBase = frameCount * 0.002;
  let peakChance = 0.06;
  let audioInfluence = map(nivel, 0, 0.3, 0, height * 0.12);
  for (let i = 0; i < numEdificios; i++) {
    let n = noise(i * 0.25 + noiseBase);
    let baseAlt = map(n, 0, 1, height * 0.12, height * 0.45);
    let jitter = random(-height * 0.05, height * 0.05);
    let peak =
      random(1) < peakChance ? random(height * 0.08, height * 0.22) : 0;
    let target = baseAlt + jitter + peak + audioInfluence;
    target = constrain(target, 20, groundY - 20);

    if (alturasEdificios[i] === undefined) alturasEdificios[i] = target;
    else alturasEdificios[i] = lerp(alturasEdificios[i], target, 0.08);

    let x = i * w;
    let h = alturasEdificios[i];
    let col = color(random(coloresActuales));
    col.setAlpha(85);
    noStroke();
    fill(col);
    rect(x, groundY - h, w * 0.85, h);
    // Ventanas titilantes
    for (let j = 0; j < 6; j++) {
      if (random(1) < 0.12) {
        fill(255, random(80, 150));
        let wx = x + random(6, max(10, w - 12));
        let wy = groundY - random(h);
        rect(wx, wy, 4, 4);
      }
    }
  }
  // Línea de suelo para separar visualmente
  push();
  stroke(30, 30, 30, 120);
  strokeWeight(2);
  line(0, groundY + 1, width, groundY + 1);
  pop();
}

// GRAFFITI DINÁMICO
function dibujarCapaGraffiti() {
  let nivel = cancion && amp ? amp.getLevel() : 0.03;
  for (let i = 0; i < 10; i++) {
    let col = color(random(coloresActuales));
    col.setAlpha(100);
    stroke(col);
    strokeWeight(random(3, 8));
    let y = random(height * 0.25, height * 0.75);
    line(random(width), y, random(width), y + random(-20, 20));
  }
  if (nivel > 0.12) {
    let palabraTag = random(palabrasB);
    noStroke();
    fill(255, 60);
    textFont(fuente || "Helvetica");
    textSize(18);
    push();
    translate(random(80, width - 80), random(60, height - 140));
    rotate(radians(random(-15, 15)));
    text(palabraTag, 0, 0);
    pop();
    textFont("Helvetica");
  }
}
// trazos del usuario
//Importante: los trazos temporales se dibujan en pgTemp para garantizar que siempre queden por encima del grafiti persistente.
function dibujarTrazosUsuario() {
  // Solo dibujar si el mouse está presionado dentro del canvas
  if (
    !(
      mouseIsPressed &&
      mouseY > 0 &&
      mouseY < height &&
      mouseX > 0 &&
      mouseX < width
    )
  )
    return;
  // Grosor base del slider
  let base = tamanoSlider.value();
  // Velocidad del mouse (distancia entre frames)
  let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
  // Factor por velocidad y por presión sostenida
  let speedFactor = map(speed, 0, 30, 1, 2.8);
  speedFactor = constrain(speedFactor, 1, 2.8);
  let holdFactor = map(pressFrames, 0, 120, 1, 1.6);
  let grosor = base * speedFactor * holdFactor;
  // Color aleatorio de la paleta
  let c = color(random(coloresActuales));
  let rc = red(c),
    gc = green(c),
    bc = blue(c),
    ac = alpha(c);
  // Dibujar en pgTemp (capa superior)
  pgTemp.push();
  if (formaActual === "espiral") {
    pgTemp.stroke(rc, gc, bc, ac);
    pgTemp.strokeWeight(grosor * 0.35);
    pgTemp.line(pmouseX, pmouseY, mouseX, mouseY);
  } else if (formaActual === "flores") {
    // Crear flor y dibujarla en pgTemp
    let f = new Flor(mouseX, mouseY);
    f.tamano = max(12, grosor * 0.6);
    f.cantidad = int(constrain(map(grosor, 10, 300, 4, 10), 3, 12));
    f.rotacion = random(0, TWO_PI);
    if (speed > 12) f.estilo = "Redonda";
    else if (speed > 4) f.estilo = "Centro";
    else f.estilo = "Triangular";
    f.fondo = false;
    f.col = color(rc, gc, bc, 220);
    f.dibujarEnCanvas(pgTemp);
  } else if (formaActual === "triángulos") {
    pgTemp.stroke(rc, gc, bc, ac);
    pgTemp.strokeWeight(2 + grosor * 0.03);
    pgTemp.triangle(
      mouseX,
      mouseY,
      mouseX + grosor * 0.6,
      mouseY + grosor * 0.6,
      mouseX - grosor * 0.6,
      mouseY + grosor * 0.6
    );
  }
  // Partículas suaves en pgTemp
  pgTemp.noStroke();
  pgTemp.fill(rc, gc, bc, 150);
  pgTemp.ellipse(mouseX + random(-5, 5), mouseY + random(-5, 5), random(5, 12));
  pgTemp.pop();
}
// TEXTO TEMPORAL (EN pgTemp)
function dibujarTextoTemporal(t) {
  let c = color(random(coloresActuales));
  let rc = red(c),
    gc = green(c),
    bc = blue(c);
  let tam = tamanoSlider.value();
  pgTemp.push();
  pgTemp.translate(mouseX, mouseY);
  pgTemp.rotate(radians(random(-10, 10)));
  pgTemp.noStroke();
  pgTemp.fill(0, 160);
  pgTemp.textFont(fuente || "Helvetica");
  pgTemp.textSize(tam);
  pgTemp.text(t, 3, 3);
  pgTemp.fill(rc, gc, bc);
  pgTemp.text(t, 0, 0);
  pgTemp.pop();
}
//  El texto generado por "Generar grafiti" se dibuja en pgGraffiti y permanece.Esto permite que las voces recogidas queden como memoria colectiva en el mural.
function dibujarTextoPersistente(t) {
  let col = color(random(coloresActuales));
  let tam = tamanoSlider.value();
  pgGraffiti.push();
  pgGraffiti.textFont(fuente || "Helvetica");
  pgGraffiti.textSize(tam);
  pgGraffiti.noStroke();
  pgGraffiti.translate(mouseX, mouseY);
  pgGraffiti.rotate(radians(random(-10, 10)));
  pgGraffiti.fill(0, 160);
  pgGraffiti.text(t, 3, 3);
  pgGraffiti.fill(col);
  pgGraffiti.text(t, 0, 0);
  pgGraffiti.pop();
}
// GENERAR COMPOSICIÓN (persistente)
function generarComposicionGrafiti(piezas, tamano) {
  for (let i = 0; i < piezas.length; i++) {
    let repeticiones = int(random(4, 8));
    for (let r = 0; r < repeticiones; r++) {
      dibujarTextoAleatorioPG(piezas[i], tamano);
    }
  }
}
function dibujarTextoAleatorioPG(t, tamano) {
  let col = color(random(coloresActuales));
  let x = random(40, width - 160);
  let y = random(60, height - 120);
  pgGraffiti.push();
  pgGraffiti.textFont(fuente || "Helvetica");
  pgGraffiti.textSize(tamano);
  pgGraffiti.noStroke();
  pgGraffiti.translate(x, y);
  pgGraffiti.rotate(radians(random(-12, 12)));
  pgGraffiti.fill(0, 150);
  pgGraffiti.text(t, 2, 2);
  pgGraffiti.fill(col);
  pgGraffiti.text(t, 0, 0);
  pgGraffiti.pop();
}
function mousePressed() {
  // Si el clic está dentro del canvas, dibujar texto temporal en pgTemp
  if (mouseY >= 0 && mouseY <= height && mouseX >= 0 && mouseX <= width) {
    let tipo = int(random(3));
    if (tipo === 0) dibujarTextoTemporal(random(palabrasA));
    else if (tipo === 1) dibujarTextoTemporal(random(palabrasB));
    else dibujarTextoTemporal(random(frases));
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Re-crear buffer persistente con nuevo tamaño y copiar contenido escalado
  // let newPg = createGraphics(width, height);
  // newPg.clear();
  // newPg.image(pgGraffiti, 0, 0, width, height);
  // pgGraffiti = newPg;
  // // Re-crear capa temporal con nuevo tamaño (limpia trazos temporales al redimensionar)
  // let newTemp = createGraphics(width, height);
  // newTemp.clear();
  // pgTemp = newTemp;
  // // Recalcular edificios y reposicionar UI
  // inicializarEdificios();
  // const marginX = width * 0.03;
  // const topControlsY = 84;
  // const midInstructionOffsetFromBottom = 140;
  // if (select("#ui_titulo")) select("#ui_titulo").position(marginX, 6);
  // if (select("#ui_instr_arriba"))
  //   select("#ui_instr_arriba").position(marginX + 6, 6 + 34);
  // if (select("#ui_instr_medio"))
  //   select("#ui_instr_medio").position(
  //     marginX + 6,
  //     height - midInstructionOffsetFromBottom + 30
  //   );
  // if (inputNombre) inputNombre.position(marginX, topControlsY);
  // if (inputBogotaEs) inputBogotaEs.position(marginX + 220, topControlsY);
  // if (tamanoSlider) tamanoSlider.position(marginX, topControlsY + 44);
  // if (btnGenerar) btnGenerar.position(marginX + 160, topControlsY + 40);
  // const bottomY = height - 60;
  // if (btnPlay) btnPlay.position(marginX, bottomY);
  // if (selectorPaleta) selectorPaleta.position(marginX + 140, bottomY);
  // if (selectorFigura) selectorFigura.position(marginX + 320, bottomY);
  // if (btnGraff) btnGraff.position(marginX + 500, bottomY);
  // if (btnReset) btnReset.position(marginX, height - 28);
  // if (btnExport) btnExport.position(marginX + 140, height - 28);
  // if (radioBox && radioBox.elt) {
  //   radioBox.style("left", marginX + 460 + "px");
  //   radioBox.style("top", topControlsY - 6 + "px");
  // } else if (categoryRadio) {
  //   categoryRadio.position(marginX + 460, topControlsY + 4);
  // }
}
