//BOGOTÁ SÓNICA

// Bogotá sónica es un generador de posters interactivo que captura la esencia de Bogotá a través de elecciones personales. 
// Los usuarios combinan elementos cotidianos con sentimientos y canciones icónicas de la ciudad, creando un poster visual único con ilustraciones originales, paletas de color y tipografías específicas.

// REFERENTES:
//Estéticos:
// Rogelio Salmona: https://pin.it/QdXS3RrO9 
//Influencia en paleta de color por uso de ladrillo

// Alejandro Obregon: https://artsandculture.google.com/asset/cóndor-de-los-andes-obregón/TQGhR3iKohlRww 
//Abstracción en pinturas

// John Whitney: https://proyectoidis.org/john-whitney/ 
//Animación abstracta en computador

//Conceptuales:
// La biblioteca de Babel - Jorge Luis Borges
//Combinaciones infinitas a partir de elementos limitados

// Armando Silva
//Estudios sobre imaginarios urbanos y graffiti como escritura ciudadana
// Visión Gestalt
//Construcción de un todo mediante elementos fragmentados

// USO DE IA:
// La IA sirvió como asistente técnico para implementar, a partir de las funciones de p5.js, mi visión personal de Bogotá, no para generar el concepto creativo.  Todas las ilustraciones, paletas de color y decisiones estéticas son creación propia  basada en mi criterio como diseñadora y habitante de la ciudad.


// Bogotá Sónica - Experiencia Interactiva Musical
// Por: Valery Daniela Cárdenas Gómez - 202420012


//VARIABLES
let botonX = 311;
let botonY = 257;
let botonW = 178;
let botonH = 124;

let fuenteBienvenida;
let textoBienvenida = [];

let fuenteNormal;

let pantalla = 0;

//Elementos y sentimientos que considero los más representativos de la ciudad
let elementos = ["Sombrilla", "Ajiaco", "Filas"];
let sentimientos = ["Nostalgia", "Alegría", "Orgullo"];

let selectorElemento,
  selectorSentimiento,
  botonContinuar1,
  botonContinuar2,
  botonContinuar3,
  botonContinuar4;
let elegidoElemento = "";
let elegidoSentimiento = "";

let caraluna, prisioneros, sueltame, sanalejo;

let inputFrase;
let inputCreado = false;

let botonVolverInicio;
let play = false;
let pausar = false;

let mostrarInstrucciones = true;
let tiempoInstrucciones = 0;

//las paletas fueron escogidas para representar cada sensación
const paletas = {
  Nostalgia: [
    [24, 108, 140],
    [7, 74, 89],
    [109, 160, 166],
    [242, 242, 242],
  ],
  Alegría: [
    [143, 175, 217],
    [242, 195, 53],
    [242, 179, 61],
    [242, 148, 34],
  ],
  Orgullo: [
    [254, 237, 191],
    [217, 152, 74],
    [191, 121, 80],
    [191, 71, 44],
  ],
};

let seleccion = -1;

function preload() {
  fuenteBienvenida = loadFont("fuentes/Stencilia-Bold.ttf");
  textoBienvenida = loadStrings("textos/instrucciones.txt");

  fuenteNormal = loadFont("fuentes/OverpassMono.ttf");

  fuenteSanAlejo = loadFont("fuentes/BitcountSingleInk.ttf");
  fuenteDiamante = loadFont("fuentes/RubikGlitch-Regular.ttf");
  fuenteCaraluna = loadFont("fuentes/Lobster-Regular.ttf");

  caraluna = loadSound("canciones/Caraluna.mp3");
  sueltame = loadSound("canciones/Diamante.mp3");
  sanalejo = loadSound("canciones/Sanalejo.mp3");
}

function setup() {
  //Esto permite encajar el canvas sin perder su relación de proporcionalidad
  createCanvas(800, 600).parent("canvasContainer");
   select('body').style('position', 'relative');
  select('#canvasContainer').style('position', 'relative');
}

function draw() {
  //función por pantalla 
  if (pantalla === 0) {
    fondo();
  } else if (pantalla === 1) {
    instrucciones();
  } else if (pantalla === 2) {
    palabras();
  } else if (pantalla === 3) {
    canciones();
  } else if (pantalla === 4) {
    frase();
  } else if (pantalla === 5) {
    resultado();
  }
}

//Pantalla inicial
function fondo() {
  background(165, 181, 193);

  //edificios
  //parte lateral
  stroke(0);
  strokeWeight(1);
  fill(122, 68, 51);
  beginShape();
  vertex(67.7122, 379.4539);
  vertex(22.99, 379);
  vertex(22, 274.6593);
  vertex(67.7122, 252.5288);
  endShape(CLOSE);

  beginShape();
  vertex(138.19, 230.3982);
  vertex(146.6606, 480);
  vertex(173.6966, 480);
  vertex(173.6966, 214.6717);
  endShape(CLOSE);

  beginShape();
  vertex(579.1232, 490);
  vertex(527.1657, 484.9195);
  vertex(523.7771, 259.0171);
  vertex(572, 218);
  endShape(CLOSE);

  beginShape();
  vertex(492, 362.9322);
  vertex(442, 331.3059);
  vertex(442, 290.6435);
  vertex(492, 272);
  endShape(CLOSE);

  //parte delantera
  fill(181, 83, 60);
  rect(267.0248, 361.9769, 62.3112, 141.7407);
  rect(492.4775, 272.3942, 268.0182, 250);
  rect(418.0558, 320.8927, 74.0341, 218.4314);
  rect(67.7122, 252.078, 87.2813, 220.697);
  rect(330.5086, 376.3564, 86.9617, 162.9676);
  rect(658.9445, 271.0177, 138.8585, 263.1003);
  rect(571.2713, 217.9119, 87.6465, 316.206);
  rect(173.6966, 214.6717, 93.5157, 249.3752);
  rect(0, 379.2593, 67.3397, 150.872);

  //cables
  noFill();
  arc(0, 100, 420, 130, 0, PI);
  arc(0, 110, 420, 130, 0, PI);

  arc(310, 100, 220, 130, 0, PI);
  arc(310, 110, 220, 130, 0, PI);

  arc(310 + 200, 99, 220, 130, 0, PI);
  arc(310 + 200, 110, 220, 130, 0, PI);

  arc(310 + 400, 99, 220, 130, 0, PI);
  arc(310 + 400, 110, 220, 130, 0, PI);

  //postes
  fill(155);
  rect(width / 4, 100, 25, 500);
  rect(width / 4 + 200, 100, 25, 500);
  rect(width / 4 + 400, 100, 25, 500);

  //piso
  fill(200);
  rect(0, 520, 800, 80);

  //transmi
  fill(200, 0, 0);
  rect(85, 425, 297, 155);

  fill(100);
  rect(0, 425, 9, 155);
  rect(18, 425, 9, 155);
  rect(36, 425, 9, 155);
  rect(54, 425, 9, 155);
  rect(72, 425, 9, 155);
  fill(130);
  rect(9, 425, 9, 155);
  rect(27, 425, 9, 155);
  rect(45, 425, 9, 155);
  rect(63, 425, 9, 155);
  rect(81, 425, 9, 155);

  fill(0);
  beginShape();
  vertex(90, 510.84);
  vertex(327.95, 510.84);
  vertex(371.66, 551.35);
  vertex(350, 435);
  vertex(90, 435);
  endShape(CLOSE);

  fill(180);
  beginShape();
  vertex(100, 500.84);
  vertex(334.95, 500.84);
  vertex(364.66, 536.35);
  vertex(343, 445);
  vertex(100, 445);
  endShape(CLOSE);

  fill(50);
  ellipse(117, 575, 60);
  ellipse(300, 575, 60);

  //cartel inicio
  noStroke();
  fill(255, 204, 0);
  ellipse(width / 2, 260, 103);
  rect(botonX, botonY, 178, 124);
  fill(255, 0, 0);
  textFont(fuenteBienvenida);
  textSize(27);
  textAlign(CENTER);
  text("BOGOTÁ", width / 2, height / 2 - 6);
  text("SÓNICA", width / 2, height / 2 + 28);
  fill(0);
  text("2", width / 2 - 25, height / 2 - 50);
  textSize(30);
  text("02", width / 2, height / 2 - 50);
  textSize(27);
  text("5", width / 2 + 28, height / 2 - 50);

  fill(50, 155, 26);
  text("INICIAR", width / 2, height / 2 + 60);
}

//Pantalla instrucciones
function instrucciones() {
  fill(250);
  rect(129, 117, 542, 365);

  //margen texto
  let margenX = 149;
  let margenY = 177;
  let anchoTexto = 502;
  let altoTexto = 325;
  fill(0);
  textAlign(LEFT, TOP);
  textSize(20);
  let y = margenY;
  for (let i = 0; i < textoBienvenida.length; i++) {
    text(textoBienvenida[i], margenX, y, anchoTexto, altoTexto);
    y += 40;
  }

  //boton para continuar
  if (!botonContinuar1) {
    botonContinuar1 = createButton("CONTINUAR");
    botonContinuar1.parent('canvasContainer');
    botonContinuar1.position(550, 420);
    botonContinuar1.mousePressed(() => {
      pantalla = 2;
      botonContinuar1.hide();
    });
  }
}

//Pantalla para seleccionar sentimiento y elemento
function palabras() {
  fill(250);
  rect(129, 117, 542, 365);

  //instrucciones p2
  fill(0);
  textSize(20);
  textAlign(CENTER);
  text("Elige un elemento y un sentimiento", width / 2, 160);
  text("con el que identifiques a Bogotá", width / 2, 190);

  //selector elemento
  if (!selectorElemento) {
    selectorElemento = createSelect();
    selectorElemento.parent('canvasContainer');
    selectorElemento.position(450, 280);
    selectorElemento.option("Seleccione un elemento");
    for (let palabra of elementos) {
      selectorElemento.option(palabra);
    }
  }
  //selector sentimiento
  if (!selectorSentimiento) {
    selectorSentimiento = createSelect();
    selectorSentimiento.parent('canvasContainer');
    selectorSentimiento.position(200, 280);
    selectorSentimiento.option("Seleccione un sentimiento");
    for (let palabra of sentimientos) {
      selectorSentimiento.option(palabra);
    }
  }

  //boton para continuar
  if (!botonContinuar2) {
    botonContinuar2 = createButton("CONTINUAR");
    botonContinuar2.parent('canvasContainer');
    botonContinuar2.position(550, 420 );
    botonContinuar2.mousePressed(() => {
      elegidoElemento = selectorElemento.value();
      elegidoSentimiento = selectorSentimiento.value();
      if (
        elegidoElemento !== "Seleccione un elemento" &&
        elegidoSentimiento !== "Seleccione un sentimiento"
      ) {
        pantalla = 3;
        selectorElemento.hide();
        selectorSentimiento.hide();
        botonContinuar2.hide();
      } else {
        //copilot me ayudó con esta función para poder evitar que continuen sin seleccionar
        alert("Por favor selecciona ambas opciones.");
      }
    });
  }
}

//Pantalla para seleccionar la canción
function canciones() {
  fill(250);
  rect(129, 117, 542, 365);

  // instrucciones p3
  fill(0);
  textFont(fuenteBienvenida);
  textSize(20);
  textAlign(CENTER);
  text("Elige una canción con la que identifiques Bogotá", width / 2, 160);
//canciones elegidas por ser representativas
  let canciones = [
    "Suéltame, Bogotá - Diamante Eléctrico",
    "El Diablo - Sanalejo",
    "Caraluna - Bacilos",
  ];

  for (let i = 0; i < canciones.length; i++) {
    let y = 250 + i * 40;

    // rectángulo de opción
    fill(181, 83, 60);
    rect(170, y, 256, 30);

    // texto de canción
    fill(255);
    textFont(fuenteNormal);
    textSize(10);
    textAlign(CENTER, CENTER);
    text(canciones[i], 170 + 128, y + 15);

    // checkbox
    fill(181, 83, 60);
    rect(440, y + 5, 20, 20);
    if (seleccion === i) {
      // marca de selección
      fill(255);
      rect(444, y + 9, 12, 12);
    }
  }

  // botón para continuar
  if (!botonContinuar3) {
    botonContinuar3 = createButton("CONTINUAR");
    botonContinuar3.parent('canvasContainer');
    botonContinuar3.position(550, 420 );
    botonContinuar3.mousePressed(() => {
      if (seleccion !== -1) {
        pantalla = 4;
        botonContinuar3.hide();
      } else {
        alert("Por favor selecciona una canción antes de continuar.");
      }
    });
  }
}

//Pantalla para ingresar la frase
function frase() {
  fill(250);
  rect(129, 117, 542, 365);

  // instrucciones p4
  fill(0);
  textFont(fuenteBienvenida);
  textSize(20);
  textAlign(CENTER);
  text("Escribe la frase que deseas que salga en tu poster", width / 2, 160);

  //input para frase poster
  if (!inputCreado) {
    strokeWeight(3);
    inputFrase = createInput();
    inputFrase.parent('canvasContainer');
    inputFrase.position(width/2 -150 , 250);
    inputFrase.size(300);
    inputFrase.style("font-size", "16px");
    inputCreado = true;
    inputFrase.attribute("placeholder", "Escribe tu frase");
  }
  if (!botonContinuar4) {
    botonContinuar4 = createButton("CONTINUAR");
    botonContinuar4.parent('canvasContainer');
    botonContinuar4.position(550, 420);
    botonContinuar4.mousePressed(() => {
      if (inputFrase.value().trim() !== "") {
        inputFrase.remove();
        pantalla = 5;
        botonContinuar4.hide();
      } else {
        alert("Por favor escribe una frase antes de continuar.");
      }
    });
  }
}

//Función resultado
function resultado() {
  //la paleta se ajusta al sentimiento elegido
  let paleta = paletas[elegidoSentimiento];

  //que suene la canción
  if (!play) {
    if (seleccion === 0 && sueltame && !sueltame.isPlaying()) {
      sueltame.play();
      play = true;
    } else if (seleccion === 1 && sanalejo && !sanalejo.isPlaying()) {
      sanalejo.play();
      play = true;
    } else if (seleccion === 2 && caraluna && !caraluna.isPlaying()) {
      caraluna.play();
      play = true;
    }
  }

  // Fondo según paleta
  background(paleta[0]);

  //Efecto espiral (antes de la ilustración)
  if (elegidoElemento === "Filas") dibujarEspiral(paleta);

  // Ilustración según canción
  if (seleccion === 0) efectoDiamante(paleta);
  if (seleccion === 1) efectoSanAlejo(paleta);
  if (seleccion === 2) efectoCaraluna(paleta);

  //  Efectos (encima de la ilustración)
  if (elegidoElemento === "Sombrilla") dibujarLluvia(paleta);
  if (elegidoElemento === "Ajiaco") dibujarAjiaco(paleta);

  // fuente según canción
  if (inputFrase && inputFrase.value()) {
    fill(255);
    textSize(50);
    textAlign(CENTER);

    // Aplicar fuente según canción
    if (seleccion === 0) {
      textFont(fuenteDiamante);
    } else if (seleccion === 1) {
      textFont(fuenteSanAlejo);
    } else if (seleccion === 2) {
      textFont(fuenteCaraluna);
    } else {
      textFont(fuenteBienvenida);
    }

    text(inputFrase.value(), width / 2, height - 70);
  }

  //Pausar música
  if (pausar) {
    fill(255, 150);
    textSize(16);
    textAlign(CENTER);
    text("Música pausada. Toca para reanudar", width / 2, 40);
  }

  // Botón volver al inicio
  if (!botonVolverInicio) {
    botonVolverInicio = createButton("INICIO");
    botonVolverInicio.position(width - 120, height - 30);
    botonVolverInicio.mousePressed(volverAlInicio);
  }

   // Instrucciones temporales para guardar y pausar
  if (mostrarInstrucciones) {    
    fill(0);
    textSize(16);
    textAlign(CENTER);
    text("Toca la pantalla para pausar música. Presiona 'S' para guardar.", width / 2, height/2 );
    
    // Contador para quitar instrucciones 
    tiempoInstrucciones++;
    if (tiempoInstrucciones > 250) { 
      mostrarInstrucciones = false;
    }
  }
  
  // Marco blanco
  noFill();
  stroke(255);
  strokeWeight(8);
  rect(20, 20, width - 40, height - 40);
}

// Función para reiniciar el generador
function volverAlInicio() {
  // Detener la música si está sonando
  if (sueltame) sueltame.stop();
  if (sanalejo) sanalejo.stop();
  if (caraluna) caraluna.stop();

  // Resetear variables
  pantalla = 0;
  play = false;
  seleccion = -1;
  elegidoElemento = "";
  elegidoSentimiento = "";
  inputCreado = false;

  // Ocultar botones
  if (botonVolverInicio) {
    botonVolverInicio.hide();
    botonVolverInicio = null;
  }

  // Resetear selectores
  if (selectorElemento) {
    selectorElemento.hide();
    selectorElemento = null;
  }
  if (selectorSentimiento) {
    selectorSentimiento.hide();
    selectorSentimiento = null;
  }

  // Recrear el input para la frase
  inputFrase = null;

  // Resetear botones de continuar
  botonContinuar1 = null;
  botonContinuar2 = null;
  botonContinuar3 = null;
  botonContinuar4 = null;
}

// ILUSTRACIONES POR CANCIÓN
//Los colores de la ilustración dependen de la selección del sentimiento 

//Sueltáme Bogotá, Diamante Eléctrico
function efectoDiamante(paleta) {
  stroke(0);
  strokeWeight(1);

  //espacio
  fill(paleta[3][0], paleta[3][1], paleta[3][2]);
  beginShape();
  vertex(800, 0);
  vertex(800, 600);
  vertex(215, 426);
  vertex(165, 332);
  endShape(CLOSE);

  //monserrate y la otra iglesia
  fill(paleta[1][0], paleta[1][1], paleta[1][2]);
  beginShape();
  vertex(396.5552, 300.4116);
  vertex(395.6797, 292.2017);
  vertex(401.516, 293.0344);
  vertex(401.8932, 288.49);
  vertex(411.1458, 290.0736);
  vertex(411.7295, 295.159);
  vertex(419.3166, 297.6607);
  vertex(421.3593, 307.7069);
  endShape(CLOSE);

  beginShape();
  vertex(710.329, 324.099);
  vertex(704.2843, 318.9624 - 5);
  vertex(710.1173, 317.3954 - 5);
  vertex(708.2891, 312.2588 - 5);
  vertex(712.468, 310.2564 - 5);
  vertex(715.2539, 314.4353 - 5);
  vertex(720.8258, 313.5647 - 5);
  vertex(725.7411, 317.3083);
  endShape(CLOSE);

  //montañas
  fill(paleta[2][0], paleta[2][1], paleta[2][2]);
  beginShape();
  vertex(509.2754, 342.2012);
  vertex(518.3328, 340.251);
  vertex(531.3341, 336.3506);
  vertex(563.5125, 336.6756);
  vertex(578.7891, 329.8499);
  vertex(594.0657, 326.2745);
  vertex(651.9217, 343.1763);
  vertex(606.417, 363.6534);
  vertex(552.1363, 377.6299);
  vertex(500.7809, 339.2759);
  endShape();

  beginShape();
  vertex(224, 301.7752);
  vertex(376.1654, 290.9292);
  vertex(478.7094, 313.6072);
  vertex(545.7574, 372.7672);
  vertex(596.0434, 363.8932);
  vertex(652.116, 341.1448);
  vertex(721.0952, 313.0843);
  vertex(788.3134, 314.5932);
  vertex(800, 340);
  vertex(800, 600);
  vertex(215, 425.0252);
  vertex(173.0494, 329.3832);
  endShape(CLOSE);

  //edificios
  fill(paleta[3][0], paleta[3][1], paleta[3][2]);
  beginShape();
  vertex(207.2548, 428.2922);
  vertex(206.7238, 413.2474);
  vertex(218.2287, 413.4244);
  vertex(217.6977, 410.9464);
  vertex(222.1226, 409.1764);
  vertex(222.8306, 405.6365);
  vertex(241.5924, 404.2205);
  vertex(243.1854, 440.1511);
  vertex(242.6544, 413.7784);
  vertex(257.3452, 412.8934);
  vertex(258.9382, 443.1601);
  vertex(259.6462, 421.7433);
  vertex(280.886, 419.7963);
  vertex(283.541, 449.709);
  vertex(334.5164, 452.541);
  vertex(337.5254, 467.2318);
  vertex(336.6404, 440.8591);
  vertex(382.3059, 439.2661);
  vertex(386.5538, 479.4447);
  vertex(383.3679, 451.833);
  vertex(419.8295, 450.417);
  vertex(421.0685, 492.0115);
  vertex(419.4755, 462.6299);
  vertex(434.1663, 461.2139);
  vertex(432.7503, 455.3729);
  vertex(448.6801, 453.957);
  vertex(450.0961, 473.4267);
  vertex(470.4509, 472.5418);
  vertex(473.1059, 504.9324);
  vertex(472.5749, 427.5842);
  vertex(498.7706, 426.1683);
  vertex(502.6646, 514.6673);
  vertex(499.8326, 455.3729);
  vertex(512.5764, 454.8419);
  vertex(511.3375, 452.187);
  vertex(527.7983, 451.833);
  vertex(533.2852, 522.4552);
  vertex(530.6303, 436.4342);
  vertex(559.1269, 436.6111);
  vertex(563.7289, 532.5441);
  vertex(562.3129, 455.3729);
  vertex(578.9507, 456.7889);
  vertex(582.1367, 505.2864);
  vertex(581.7827, 426.3453);
  vertex(603.3765, 424.9293);
  vertex(606.3854, 545.819);
  vertex(606.2084, 438.2041);
  vertex(621.6073, 444.3991);
  vertex(625.1328, 495.6724);
  vertex(625.1328, 495.6724);
  vertex(625.1328, 430.3974);
  vertex(646.8912, 424.1808);
  vertex(651.3316, 488.5677);
  vertex(649.1114, 387.7689);
  vertex(667.7614, 385.9927);
  vertex(672.2019, 386.4367);
  vertex(689.0757, 380.6641);
  vertex(688.1876, 424.1808);
  vertex(706.8376, 425.0689);
  vertex(705.5054, 571.6045);
  vertex(706, 466.8093);
  vertex(730.3721, 469.4736);
  vertex(728.5959, 556.951);
  vertex(729.928, 442.3867);
  vertex(755.6828, 443.2748);
  vertex(755.3542, 498.3367);
  vertex(755.2387, 450.3796);
  vertex(786.3221, 461.0367);
  vertex(784.5459, 594.251);
  vertex(788.0983, 473.9141);
  vertex(800, 468.1415);
  vertex(800, 600);
  endShape(CLOSE);

  //cuerpo
  fill(paleta[3][0], paleta[3][1], paleta[3][2]);
  beginShape();
  vertex(142.5646, 307.3036);
  vertex(149.4532, 303.4287);
  vertex(163.661, 303.4287);
  vertex(173.9939, 309.0257);
  vertex(176.1466, 333.5664);
  vertex(203.2705, 390.828);
  vertex(212.7423, 408.9106);
  vertex(218.7699, 429.1459);
  vertex(210.1591, 454.1171);
  vertex(189.9238, 466.6027);
  vertex(161.5083, 462.7278);
  vertex(132.6622, 433.4512);
  vertex(145.6865, 420.1766);
  vertex(114.5796, 454.5476);
  vertex(111.1353, 459.7141);
  vertex(94.7749, 459.2835);
  vertex(90.039, 465.7416);
  vertex(81.8587, 467.4637);
  vertex(48.2768, 461.4362);
  vertex(40.9576, 456.7003);
  vertex(57.7486, 445.9368);
  vertex(67.651, 436.465);
  vertex(105.1078, 384.3699);
  vertex(104.2467, 374.037);
  vertex(113.288, 358.9681);
  vertex(135.2455, 351.649);
  vertex(135.2455, 351.649);
  vertex(155.5922, 346.9131);
  vertex(152.5922, 340);
  vertex(145.0089, 339);
  vertex(142.87, 312.7329);
  vertex(147, 305);
  endShape(CLOSE);

  //brazo
  noFill();
  beginShape();
  vertex(105, 386);
  vertex(126, 390);
  vertex(144, 386);
  vertex(170, 375);
  endShape();
  // mano
  beginShape();
  vertex(115, 358);
  vertex(118, 369);
  vertex(132, 368);
  vertex(133, 353);
  vertex(134, 355);
  vertex(138, 355);
  vertex(135, 352);
  endShape();

  beginShape();
  vertex(66, 439);
  vertex(98, 462.8);
  vertex(133, 406);
  endShape();
}

//El Diablo, Sanalejo
function efectoSanAlejo(paleta) {
  stroke(0);
  strokeWeight(1);

  translate(-5, 1.58);

  // Cuernos
  fill(paleta[1][0], paleta[1][1], paleta[1][2]);
  beginShape();
  vertex(436.2748, 233.509 - 50);
  vertex(419.1061, 211.6904 - 50);
  vertex(432.3403, 191.6603 - 50);
  vertex(436.9901, 176.9953 - 50);
  vertex(440.2093, 155.8921 - 50);
  vertex(445.2168, 159.4689 - 50);
  vertex(445.5745, 202.7484 - 50);
  vertex(435.5594, 238.5166 - 20);
  endShape(CLOSE);

  beginShape();
  vertex(358.6579, 237.4435 - 55);
  vertex(371.8921, 214.5519 - 50);
  vertex(364.3808, 198.0985 - 50);
  vertex(357.2271, 178.7837 - 50);
  vertex(352.2196, 157.6805 - 50);
  vertex(345.7813, 162.3304 - 50);
  vertex(344.3506, 210.2597 - 50);
  endShape(CLOSE);

  // Cara color base
  fill(paleta[3][0], paleta[3][1], paleta[3][2]);
  ellipse(width / 2, height / 2 - 100, 90, 122);

  // Ojos
  fill(paleta[1][0], paleta[1][1], paleta[1][2]);
  ellipse(width / 2 - 25, 192, 18, 7);
  ellipse(width / 2 + 25, 192, 18, 7);

  // Nariz
  noFill();
  beginShape();
  vertex(366, 180);
  vertex(388, 183);
  vertex(393, 221);
  vertex(399, 213);
  vertex(403, 224);
  vertex(407, 212);
  vertex(413, 221);
  vertex(413, 185);
  vertex(436, 179);
  endShape();

  // Boca
  fill(paleta[1][0], paleta[1][1], paleta[1][2]);
  beginShape();
  vertex(424.2928, 232.826);
  vertex(413.1986, 229.4857);
  vertex(407.9679, 234.5871);
  vertex(401.6162, 229.8636);
  vertex(390.0338, 238.7439);
  vertex(399.3348, 250.1868);
  vertex(406.2851, 251.4649);
  vertex(415.131, 249.8672);
  vertex(422.6079, 240.8141);
  vertex(409.7603, 243.2637);
  vertex(391.542, 238.8969);
  endShape(CLOSE);

  // Cigarrillo
  fill(paleta[3][0], paleta[3][1], paleta[3][2]);
  rect(409, 235, 40, 5, 10);

  // Cuerpo
  fill(paleta[2][0], paleta[2][1], paleta[2][2]);
  beginShape();
  vertex(379.6417, 310.4661);
  vertex(415.2402, 305.674);
  vertex(422.7706, 315.9428);
  vertex(484.3834, 407.6774);
  vertex(502.8672, 420.0);
  vertex(502.2541, 418.7815);
  vertex(515.8744, 447.3834);
  vertex(509.7131, 474.0823);
  vertex(504.921, 480.2436);
  vertex(475.4838, 490.5124);
  vertex(335.1435, 485.7203);
  vertex(324.8747, 485.7203);
  vertex(293.3838, 482.2973);
  vertex(285.8533, 465.8673);
  vertex(281.7458, 450.1218);
  vertex(289.9608, 425.4767);
  vertex(322.1364, 411.1003);
  vertex(381.0108, 316.6274);
  endShape(CLOSE);

  // Brazos
  fill(paleta[1][0], paleta[1][1], paleta[1][2]);
  beginShape();
  vertex(427.4878, 347.5684);
  vertex(499.7299, 307.8677);
  vertex(501.4452, 310.9553);
  vertex(470.6859, 339.8314);
  vertex(468.8229, 356.5849);
  vertex(513.1095, 400.8392);
  vertex(514.8249, 409.0729);
  vertex(512.4234, 420.7372);
  vertex(502.8175, 428.2847);
  vertex(476.7443, 430.0);
  vertex(461.9923, 417.6496);
  vertex(433.8607, 369.277);
  endShape(CLOSE);

  beginShape();
  vertex(372.8909, 350.4681);
  vertex(308.7491, 309.3156);
  vertex(308.7491, 309.3156);
  vertex(331.8709, 343.1524);
  vertex(338.0743, 359.5068);
  vertex(298.5981, 405.1864);
  vertex(292.9586, 421.5408);
  vertex(304.8015, 430.0);
  vertex(326.2314, 429.436);
  vertex(340.3301, 420.4129);
  vertex(370.2192, 371.3497);
  endShape(CLOSE);

  // Pierna
  fill(paleta[1][0], paleta[1][1], paleta[1][2]);
  beginShape();
  vertex(299.726, 419.8889);
  vertex(333.5627, 420.4528);
  vertex(421.5382, 468.3882);
  vertex(459.8865, 459.929);
  vertex(475.113, 462.1848);
  vertex(481.8804, 475.1556);
  vertex(477.3688, 490.946);
  vertex(353.8647, 486.946);
  vertex(320.592, 461.0569);
  vertex(316.028, 484.1787);
  vertex(290.8831, 482.1324);
  vertex(280, 446.9583);
  vertex(292.3947, 420.4528);
  endShape(CLOSE);

  // Cuello
  fill(paleta[2][0], paleta[2][1], paleta[2][2]);
  ellipse(400, 311, 40, 15);

  // Formas decorativas
  fill(paleta[1][0], paleta[1][1], paleta[1][2]);
  beginShape();
  vertex(266.4857, 142.063);
  vertex(324.5026, 193.3113);
  vertex(350.6102, 268.7333);
  vertex(297.428, 223.2867);
  endShape(CLOSE);

  fill(paleta[3][0], paleta[3][1], paleta[3][2]);
  beginShape();
  vertex(350.6102, 268.7333);
  vertex(260.8492, 247.4604);
  vertex(266.4857, 142.063);
  vertex(297.428, 223.2867);
  endShape(CLOSE);

  fill(paleta[1][0], paleta[1][1], paleta[1][2]);
  beginShape();
  vertex(543.5143, 142.063);
  vertex(485.4974, 193.3113);
  vertex(459.3898, 268.7333);
  vertex(512.572, 223.2867);
  endShape(CLOSE);

  fill(paleta[3][0], paleta[3][1], paleta[3][2]);
  beginShape();
  vertex(459.3898, 268.7333);
  vertex(549.1508, 247.4604);
  vertex(543.5143, 142.063);
  vertex(512.572, 223.2867);
  endShape(CLOSE);
}

//Caraluna, Bacilos
function efectoCaraluna(paleta) {
  stroke(0);
  strokeWeight(1);

  push();
  translate(width / 2, height / 2);

  // Luna principal
  fill(paleta[3][0], paleta[3][1], paleta[3][2]);
  ellipse(0, 0, 200, 200);

  // Edificios alrededor del círculo
  for (let i = 0; i < 360; i += 10) {
    push();
    rotate(i);
    let h = random(25, 120);
    let w = random(20, 40);
    fill(paleta[1][0], paleta[1][1], paleta[1][2]);
    rect(100, -w / 2, h, w);
    pop();
  }

  // Espiral dentro del círculo
  strokeWeight(2);
  noFill();
  beginShape();
  let maxRadio = 90;
  for (let angle = 0; angle < 720; angle += 5) {
    let r = map(angle, 0, 720, 0, maxRadio);
    let x = r * cos(angle);
    let y = r * sin(angle);
    vertex(x, y);
  }
  endShape();
  pop();

  strokeWeight(1);

  // Forma decorativa 
  fill(paleta[3][0], paleta[3][1], paleta[3][2]);
  beginShape();
  vertex(397.025, 452.2015);
  vertex(399.3117, 452.5281);
  vertex(394.4117, 475.7211);
  vertex(392.1251, 470.8212);
  vertex(385.2652, 482.2544);
  vertex(378.0786, 478.9878);
  vertex(382.3252, 459.7147);
  vertex(381.9986, 455.7947);
  vertex(385.5919, 433.255);
  vertex(392.7784, 390.4623);
  vertex(416.6248, 381.969);
  vertex(427.7313, 374.7825);
  vertex(436.2245, 352.2428);
  vertex(436.5512, 328.7231);
  vertex(435.2445, 328.3964);
  vertex(435.2445, 328.3964);
  vertex(423.8114, 323.4965);
  vertex(423.8114, 323.4965);
  vertex(416.6248, 317.2899);
  vertex(419.8914, 306.51);
  vertex(420.5447, 302.9168);
  vertex(418.9114, 295.0769);
  vertex(413.0315, 290.8302);
  vertex(404.2116, 291.8102);
  vertex(399.6383, 296.7102);
  vertex(398.3317, 306.8367);
  vertex(401.2716, 315.9832);
  vertex(401.2716, 315.9832);
  vertex(401.2716, 315.9832);
  vertex(401.2716, 315.9832);
  vertex(395.0651, 326.7631);
  vertex(390.4918, 330.6831);
  vertex(388.5318, 367.2692);
  vertex(395.3917, 383.6024);
  vertex(400.2917, 386.2157);
  vertex(400.2917, 386.2157);
  vertex(400.2917, 386.2157);
  vertex(395.7775, 370.7432);
  vertex(394.9162, 349.4272);
  vertex(397.1948, 335.7971);
  vertex(396.0324, 344.2429);
  vertex(395.455, 351.749);
  vertex(399.9298, 357.523);
  vertex(400.0741, 366.4726);
  vertex(398.4863, 374.7005);
  vertex(380.154, 392.311);
  vertex(382.7523, 416.5616);
  vertex(386.5053, 431.1409);
  vertex(393.1767, 390.0015);
  vertex(418.4064, 381.6292);
  vertex(410.5176, 384.0832);
  vertex(402.2394, 381.9179);
  vertex(408.0133, 380.4745);
  vertex(426.036, 367.3387);
  vertex(426.7787, 340.7785);
  vertex(424.036, 338.0359);
  vertex(438.9039, 387.1145);
  vertex(412.4881, 401.6937);
  vertex(394.0115, 457.8454);
  vertex(395.7437, 450.9166);
  endShape();
}

//EFECTOS POR ELEMENTO

//Efecto lluvia Sombrilla
function dibujarLluvia(paleta) {
  noStroke();

  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(2, 9);
    let h = random(15, 30);
    let alpha = random(30, 120);

    // Gotas
    fill(paleta[2][0], paleta[2][1], paleta[2][2], alpha);
    ellipse(x, y, w, h);
  }
}

//Efecto humo Ajiaco
function dibujarAjiaco(paleta) {
  ////Efecto tipo humo o nube en la parte inferior mediante circulos opacos
  noStroke();
  for (let i = 0; i < 60; i++) {
    let x = random(width);
    let y = height - random(0, 120);
    let w = random(50, 150);
    let h = random(25, 50);
    let alpha = random(6, 16);

    for (let j = 0; j < 2; j++) {
      fill(220, alpha * 4);
      ellipse(x + random(-4, 4), y - j * 4, w - j * 2, h - j * 2);
    }
  }
}

//Efecto espirales filas
function dibujarEspiral(paleta) {
  //Espirales opacas rellenas de color dependiendo de la elección del sentimiento
  
  push();
  noStroke();
  translate(width / 2, height / 2);

  let maxRadius = sqrt(width * width + height * height);
  let circleSize = 12;
  let opacity = 75;
  let step = 8;
  let vueltasFactor = 0.15;

  for (let angle = 0; angle < 5000; angle += step) {
    let r = angle * vueltasFactor;
    if (r > maxRadius) break;

    let x = r * cos(angle);
    let y = r * sin(angle);

    fill(paleta[1][0], paleta[1][1], paleta[1][2], opacity);
    ellipse(x, y, circleSize);
  }
  pop();
}


function mousePressed() {
  // Selección de canciones
  for (let i = 0; i < 3; i++) {
    let y = 250 + i * 40;
    if (mouseX >= 440 && mouseX <= 460 && mouseY >= y + 5 && mouseY <= y + 25) {
      seleccion = i;
    }
  }

  // Botón de inicio en pantalla 0
  if (pantalla === 0) {
    if (
      mouseX > botonX &&
      mouseX < botonX + botonW &&
      mouseY > botonY &&
      mouseY < botonY + botonH
    ) {
      pantalla = 1;
    }
  }
  
  // Pausar/reanudar música en resultado 
  
  if (pantalla === 5) {
    
    // Verificar que no se haga clic en el botón INICIO
    if (!(mouseX >= width - 120 && mouseX <= width - 120 + 60 && 
          mouseY >= height - 30 && mouseY <= height - 30 + 25)) {
      
      // Pausar o reanudar la música
      if (seleccion === 0 && sueltame) {
        if (sueltame.isPlaying()) {
          sueltame.pause();
          musicaPausada = true;
        } else {
          sueltame.play();
          musicaPausada = false;
        }
      } else if (seleccion === 1 && sanalejo) {
        if (sanalejo.isPlaying()) {
          sanalejo.pause();
          musicaPausada = true;
        } else {
          sanalejo.play();
          musicaPausada = false;
        }
      } else if (seleccion === 2 && caraluna) {
        if (caraluna.isPlaying()) {
          caraluna.pause();
          musicaPausada = true;
        } else {
          caraluna.play();
          musicaPausada = false;
        }
      }
    }
  }
}

//Guardar el poster con la letra 'S'
function keyPressed() {
  if (pantalla === 5){
    if (key === 's' || key === 'S') {
      save('mi_poster_bogota_sonica.png');
    }
  }
}