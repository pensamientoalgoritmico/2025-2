//Luciana García Neira, Pensamiento Algorítmico 2025-2
//TU SEMANA 15; UN BREVE RESUMEN
// DESC: Un afiche interactivo generativo sobre la experencia de un estudiante de uniandes en la semana 15 del semestre. Cuenta con preguntas y oportunidades de personalización colaborativas entre el usuario y programa.
//Caja 1 morada: Nivel de estrés con slider. Círculos que se inflan o desinflan según el nivel de estrés de la semana 15
//Caja 2 partículas: Un clase de partículas con un botón ligado a la pregunta 'prefieres mañanas soleadas o tardes lluviosas' para recordar el hermoso clima de nuestra ciudad. Las partículas cambian de estado según el botón.
//Caja 3 circulo amarillo: Un circulo donde el usuario puede dibujar encima y desgastarlo para representar su energía en semana 1 vs semana 15 con hold click del mouse
//Caja 4 morada: Checkboxes de transporte para intenter llegar a clase de 7 en la universidad. Al escoger una, el programa devuelve una hora aleatoria de llegar a clase (igual todas son tarde)
//Caja 5 morada: Caja de input de texto para el usuario donde puede escribir su pedido de cafetería favorito para una estudiante que tiene que reempezar un trabajo de Pensamiento Algorítmico (por dar un ejemplo)
//Caja 6: Mini generador de formas en cuadrícula. Al responder la pregunta, el usuario decide si se generan circulos o cuadrados en la caja inferior derecha. Estos cambian aleatoriamente de tamaño/radio
//Adicional: Botón para guardar sketch como png

//Utilicé la IA para ayudarme con el funcionamiento de algunos botones (checkboxes y slider más que todo) y para organizar el código siguiendo las pautas. También le pedí ayuda para entender cómo cambiar el comportamiento de las partículas de la clase con un botón. El resto de los elementos se basan completamente en lo que aprendimos en clase. También pedí ayuda para crear un buffer para el circulo amarillo ya que se desaparecía al usar la caja de texto al igual que otro texto decorativo. 

//Referentes:
// snowflake class, p5.js https://p5js.org/examples/classes-and-objects-snowflakes/

/********************************************
 * VARIABLES GLOBALES
 ********************************************/
//variables globales
let myFont; //variable de tipografía

let rect1X = 406,
  rect1Y = 129,
  rect1W = 255,
  rect1H = 320; //rectángulo de estrés
let rectTX = 358,
  rectTY = 114,
  rectTW = 234,
  rectTH = 56;

//para el circulo amarillo de dibujo libre
let cx = 860; // centro X del círculo
let cy = 350; // centro Y del círculo
let r = 121.5; // radio del círculo

// colores
const CREMA = "#FBF3E9";
const AZUL = "#5CE1E6";
const MORADO = "#E2A9F1";
const AMARILLO = "#FFBD59";

// checkboxes para caja transporte
let selectedIndex = -1; // ninguna seleccionada al inicio
let boxX = 730,
  boxW = 14,
  boxH = 14;
let boxYs = [95, 115, 135, 155]; // posiciones Y para las cajitas

// hora simulada caja transporte
let horaExtra = ""; // se actualiza al seleccionar una cajita

//cajita de texto input
let campoTexto;

//array de clase particulas para el rectangulo amarillo
let snowflakes = [];
let isRaining = true;
let toggleButton;

//bonus boton para guardar png del sketch
let saveButton;

//let drawLayer; //buffer para que el fondo no se vuelva negro
//florecita generativa
//let flor;

//para la cuadricula generativa programar o construir
let modo = ""; // "" = nada, "programar" o "construir"
let botonProgramar, botonConstruir;

/********************************************
 * PRELOAD
 ********************************************/
function preload() {
  myFont = loadFont("assets/Horizon.otf");
}

/********************************************
 * SETUP
 ********************************************/
function setup() {
  print("starting setup...");
  let canvas = createCanvas(windowWidth, windowHeight).parent(
    "canvasContainer"
  );
  canvas.style("background-color", "#FBF3E9");
  angleMode(DEGREES);
  textFont(myFont);
  textAlign(LEFT, TOP);
  textWrap(WORD);
  //  colorMode(HSB, 360, 100, 100);

  // Crear particulas climáticas UNA sola vez

  for (let i = 0; i < 300; i++) {
    snowflakes.push(new Snowflake()); // Global Mode  ← banda izquierda (x = 0 .. 255)
    snowflakes.push(new Snowflake(null, 1400)); // Global Mode  ← banda derecha (x = 1400 .. 1655)
  }

  
// --- BUFFER PARA EL CÍRCULO AMARILLO ---
drawLayer = createGraphics(windowWidth, windowHeight);
drawLayer.strokeWeight(6);
drawLayer.stroke(CREMA); // color de línea
drawLayer.fill(AMARILLO); // color del círculo
drawLayer.ellipse(cx, cy, r * 2); // dibuja el círculo amarillo una sola vez

 

  //botones para generador aleatorio caja azul hueca
  // Botón "programar"
  botonProgramar = createButton("programar");
  botonProgramar.position(1300 + 100, 420 + 100); // centrado aprox
  botonProgramar.style("font-family", "Horizon, sans-serif");
  botonProgramar.style("font-size", "15px");
  botonProgramar.style("background", AZUL);
  botonProgramar.style("color", CREMA);
  botonProgramar.style("border", "none");
  botonProgramar.style("padding", "10px 20px");
  botonProgramar.mousePressed(() => (modo = "programar"));

  // Botón "construir"
  botonConstruir = createButton("construir");
  botonConstruir.position(1300 + 100, 420 + 200); // al lado
  botonConstruir.style("font-family", "Horizon, sans-serif");
  botonConstruir.style("font-size", "15px");
  botonConstruir.style("background", AZUL);
  botonConstruir.style("color", CREMA);
  botonConstruir.style("border", "none");
  botonConstruir.style("padding", "10px 20px");
  botonConstruir.mousePressed(() => (modo = "construir"));

  // Botón para alternar estado lluvia/aire caja amarilla
  toggleButton = createButton("Modo: lluvia");
  toggleButton.position(25, 130);
  toggleButton.mousePressed(toggleMode);
  toggleButton.style("font-family", "sans-serif");
  toggleButton.style("font-size", "12px");
  toggleButton.style("padding", "6px 10px");
  toggleButton.style("background", "#5CE1E6");
  toggleButton.style("color", CREMA);
  toggleButton.style("border", "1px solid #5CE1E6");
  toggleButton.style("border-radius", "4px");
  toggleButton.style("cursor", "pointer");

  //slider nivel de estrés
  stressSlider = createSlider(0, 100, 50, 1);
  stressSlider.size(265);
  stressSlider.style("transform", "rotate(-90deg)");
  stressSlider.style("transform-origin", "left top");
  stressSlider.style("accent-color", AZUL);
  const sliderOffsetX = 32;
  const sliderVisualHeight = 265;
  const sliderTop =
    rectTY + rectTH - (rect1Y - rectTY) + (rect1H + sliderVisualHeight) / 2;
  stressSlider.position(rect1X - sliderOffsetX, sliderTop);

  // Campo de texto (HTML) y estilos
  const css = `
    @font-face {
      font-family: 'Horizon';
      src: url('assets/Horizon.otf') format('opentype');
      font-weight: normal; font-style: normal;
    }
    .cafe-input::placeholder { color: ${CREMA}; opacity: 1; }
    .cafe-input:focus { outline: none; }
  `;
  createElement("style", css);

  //caja de texto pregunta café
  campoTexto = createInput("");
  campoTexto.attribute("placeholder", "algo rico porfa...");
  campoTexto.addClass("cafe-input");
  campoTexto.position(1120, 100); // dentro de la caja morada inferior
  campoTexto.size(230);
  campoTexto.style("font-size", "16px");
  campoTexto.style("background", AZUL);
  campoTexto.style("border", "none");
  campoTexto.style("color", CREMA);
  campoTexto.style("font-family", "Horizon, sans-serif");
  campoTexto.style("line-height", "28px");
  campoTexto.style("padding", "0");
  campoTexto.style("caret-color", CREMA);

  // --- PINTAR SOLO UNA VEZ EL CÍRCULO AMARILLO DE DIBUJO LIBRE ---
  background(251, 243, 233); // fondo general al inicio
  stroke(CREMA);
  strokeWeight(8);
  fill(AMARILLO);
  ellipse(cx, cy, r * 2);

  // Título (lo pintamos también al inicio; luego se repite en draw)
  noStroke();
  textSize(60);
  fill(AZUL);
  text("TU SEMANA 15", 15, 15);
  textSize(18.4);
  text("UN BREVE", 520, 65);
  text("RESUMEN", 520, 85);

  print("setup done.");

  //para el botón de save
  saveButton = createButton("Guarda tu obra maestra");
  saveButton.style("font-size", "16px");
  saveButton.style("background", "transparent");
  saveButton.style("border", "none");
  saveButton.style("color", AZUL);
  saveButton.style("font-family", "Horizon, sans-serif");
  saveButton.position(320, 500);
  saveButton.mousePressed(saveDrawing);

  
}

/********************************************
 * DRAW
 ********************************************/
function draw() {
  // --- CAPA 1: LIMPIEZAS / FONDOS DONDE SÍ QUEREMOS RE-PINTAR ---
  // (No tocamos el círculo amarillo central para no borrar tus trazos)

  // background(251, 243, 233);

  
// --- MOSTRAR EL BUFFER ---
image(drawLayer, 0, 0);

// --- DIBUJO LIBRE SOBRE EL CÍRCULO ---
if (mouseIsPressed && isInsideCircle(mouseX, mouseY, cx, cy, r)) {
    drawLayer.line(pmouseX, pmouseY, mouseX, mouseY);
}

  
  
  // Banda amarilla a la izquierda: se repinta cada frame para que las partículas no dejen rastro
  noStroke();
  fill(AMARILLO);
  rect(0, 0, 255, height);

  //replica a la derecha
  noStroke();
  fill(AMARILLO);
  rect(1400, 0, 255, height);

  // --- CAPA 2: ANIMACIONES ---
  // Partículas climáticas (actualizar y dibujar SIEMPRE aquí)
  const currentTime = frameCount / 60;
  for (const flake of snowflakes) {
    flake.update(currentTime, isRaining);
    flake.display();
  }

  // Dibujo libre sobre el círculo (no pintamos el círculo de fondo, solo las líneas)
  if (mouseIsPressed && isInsideCircle(mouseX, mouseY, cx, cy, r)) {
    stroke(CREMA);
    strokeWeight(6);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  // --- CAPA 3: UI QUE SE REDIBUJA ---
  // Pregunta clima en banda amarilla
  noStroke();
  fill(CREMA);
  textSize(10);
  text(
    "¿Te gustaron más las mañanas soleadas o las tardes lluviosas?",
    30,
    85,
    220,
    60
  );

  // Caja morada de estrés y título
  fill(MORADO);
  rect(rect1X, rect1Y, rect1W, rect1H);

  stroke(CREMA);
  fill(AZUL);
  strokeWeight(8);
  rect(rectTX, rectTY, rectTW, rectTH);

  //texto caja estrés
  noStroke();
  textSize(9);
  fill(CREMA);
  text(
    "De abajo para arriba, ¿Cual fue tu nivel de estrés por entregas finales?",
    368,
    123,
    225,
    56
  );

  // Caja transporte morada
  noStroke();
  fill(MORADO);
  rect(720, 25, 358, 151);
  ellipse(795.5, 100.5, 151);

  // Texto transporte y opciones
  fill(CREMA);
  textSize(10);
  text(
    "¡Trancaron la circunvalar! ¿Cómo llegarás a tu clase de 7?",
    740,
    50,
    330,
    30
  );
  text("Tembici", 750, 95);
  text("Transmilenio", 750, 115);
  text("carro/wheels", 750, 135);
  text("18-3", 750, 155);

  textSize(15);
  text("Llegas a las . . .", 880, 90);
  textSize(50);
  text("7 : ", 880, 109);

  // Dibujar cajitas (checkboxes)
  for (let i = 0; i < boxYs.length; i++) {
    noStroke();
    fill(i === selectedIndex ? AZUL : AMARILLO);
    rect(boxX, boxYs[i], boxW, boxH, 3);
  }

  // Mostrar hora simulada si hay selección
  if (selectedIndex !== -1) {
    fill(CREMA);
    textSize(50);
    text("7 : " + horaExtra, 880, 109);
  }

  // Caja morada inferior (input texto)
  noStroke();
  fill(MORADO);
  rect(1100, 25, 270, 182);
  ellipse(1360, 116, 182);

  fill(CREMA);
  textSize(10);
  text(
    "Me saqué 2.5 en la pre entrega de este programa. . . Recomiéndame tu pedido favorito de café para empezar de ceros.",
    1115,
    35,
    290,
    50
  );

  // Caja de instrucciones del círculo amarillo (la redibujamos cada frame; no tapa el círculo)
  stroke(CREMA);
  fill(AZUL);
  textSize(8);
  strokeWeight(8);
  rect(750, 480, 180, 126);
  noStroke();
  fill(CREMA);
  text(
    "Asume que tu energía en semana 1 es un círculo completo. ¿Cómo se ve en semana 15? Desquítate (o no) y raya a tu gusto con un clásico Hold click",
    755,
    490,
    165,
    126
  );

  // Título
  textSize(60);
  fill(AZUL);
  text("TU SEMANA 15", 15, 15);
  textSize(18.4);
  text("UN BREVE", 520, 65);
  text("RESUMEN", 520, 85);

   //texto motivacional
  fill(MORADO);
  textSize(25);
  text(
    "Y recuerda, solo queda una semana. Nada puede malir sal.",
    1100,
    250,
    300,
    200
  );
  
  // --- CAPA 4: Visual ligado al slider dentro de la caja morada de estrés. Circulos que cambian de tamaño con el slider ---
  const nivel = stressSlider.value(); // 0–100
  const cxStress = rect1X + rect1W / 2;
  const cyStress = rect1Y + rect1H / 2;
  const rMax = Math.min(rect1W, rect1H) / 2 - 15;
  const rMin = 6;
  const rStress = map(nivel, 0, 100, rMin, rMax);

  stroke(CREMA);
  strokeWeight(2);
  fill(AZUL);
  ellipse(
    cxStress,
    cyStress,
    rStress * random(0, 2.5),
    rStress * random(0, 2.5)
  );
  ellipse(
    cxStress - 30,
    cyStress + 30,
    rStress * random(0.5, 1.5),
    rStress * random(0.5, 1.5)
  );
  ellipse(
    cxStress + 30,
    cyStress + 30,
    rStress * random(0.2, 1),
    rStress * random(0.2, 1)
  );

  //caja azul generador florecita

  // Dibuja el rectángulo azul con borde
  stroke(AZUL);
  strokeWeight(5);
  noFill();
  rect(1100, 420, 255, 255);

  //text box generador cuadro
  fill(AZUL);
  rect(1040, 450, 150, 100);
  textSize(10);
  fill(CREMA);
  text(
    "Escoge la DISOdisciplina que más frustración te ha causado",
    1045,
    455,
    145,
    100
  );

  if (modo === "programar") {
    let cols = 5;
    let rows = 5;
    let cellW = 255 / cols;
    let cellH = 255 / rows;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = 1100 + i * cellW;
        let y = 420 + j * cellH;
        let size = random(10, cellW - 10); // tamaño aleatorio
        fill(AMARILLO);
        stroke(MORADO);
        strokeWeight(random(1, 8));
        rect(x + 5, y + 5, size * random(0.5, 1.5), size * random(0.5, 1.5));
      }
    }
  }

  // Si el modo es "construir" → dibuja círculos en la misma cuadrícula
  if (modo === "construir") {
    let cols = 5;
    let rows = 5;
    let cellW = 255 / cols;
    let cellH = 255 / rows;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = 1100 + i * cellW + cellW / 2;
        let y = 420 + j * cellH + cellH / 2;
        let r = random(random(1, 10), cellW / 2); // radio aleatorio
        fill(AZUL);
        stroke(AMARILLO);
        strokeWeight(random(1, 9));
        ellipse(x, y, r * 2, r * 2);
      }
    }
  }
}

/********************************************
 * FUNCIONES (HELPERS / UTILITARIOS)
 ********************************************/
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
// función de verificación para el dibujo del circulo amarillo. Solo se dibuja si está dentyro del area del circulo
function isInsideCircle(x, y, cx, cy, r) {
  return dist(x, y, cx, cy) <= r;
}

/********************************************
 * EVENTOS (INTERACCIÓN)
 ********************************************/
// Manejo de clic para las cajitas con numero aleatorio de horas. Usamos las checkboxes para seleccionar un medio de transporte y medir que tan tarde llegaría el usuario a clase. Le pedí ayuda a copilot para hacer estas cajas.
function mousePressed() {
  for (let i = 0; i < boxYs.length; i++) {
    if (
      mouseX >= boxX &&
      mouseX <= boxX + boxW &&
      mouseY >= boxYs[i] &&
      mouseY <= boxYs[i] + boxH
    ) {
      selectedIndex = i; // selecciona esta cajita
      // Generar dos números aleatorios para la hora
      let num1 = int(random(0, 6)); // 0-5
      let num2 = int(random(0, 10)); // 0-9
      horaExtra = `${num1}${num2}`;
      break;
    }
  }

  //parametros de las particulas climáticas
  let currentTime = frameCount / 60;
  for (let flake of snowflakes) {
    flake.update(currentTime, isRaining);
    flake.display();
  }
}

//parámtetros de las particulas
function toggleMode() {
  isRaining = !isRaining;
  toggleButton.html(`Modo: ${isRaining ? "lluvia" : "aire"}`);
}

//para guardar el png del sketch
function saveDrawing() {
  // This function is called when the button is pressed
  save("mySketch.png"); // Saves the canvas as a PNG file
}
