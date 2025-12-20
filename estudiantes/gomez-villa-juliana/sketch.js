//Entrega Final
//Juliana Gómez (202421354)

//Boho Bogotá

//Boho Bogotá es un programa generativo que te invita a crear postales únicas inspiradas en la ciudad. Con un estilo vintage y bohemio, podrás personalizar cada detalle: el sello, el título, la tipografía, el fondo y la ilustración que acompaña tu diseño. Incluso puedes añadir tu nombre para darle un toque personal. Es una experiencia creativa que transforma las esquinas de Bogotá en memorias visuales llenas de nostalgia y calidez.

//Referentes (En formato APA)

//Ideas: Tome ideas de diferentes formatos postales como inspiracion para el diseño de las mias
//1. Ylvi. (2025, 16 noviembre). Imperial Grove Greeting Card. Pinterest. https://co.pinterest.com/pin/790944753349611181/
//2. Mark Gutemberg. (s.f) Thief Island postcard. (2025, 8 noviembre). Pinterest. https://co.pinterest.com/pin/790944753349467666/
//Masura Estudio. (s.f)Clean Aesthetic Travel Postcard Canva Design Template. (2025, 8 noviembre). Pinterest. https://co.pinterest.com/pin/790944753349467165/

//Fondos: Todas las imagenes de los fondos fueron sacados de pinterest
//1. s.a. (2025a, noviembre 8). Abstract orange and brown watercolor background. Pinterest. https://co.pinterest.com/pin/790944753349456853/
//2. Crafts, P. (2025, 8 noviembre). Abstract Wabi-Sabi Watercolor Backdrop - Paper Textured Background. Pinterest. https://co.pinterest.com/pin/790944753349456846/
//3. S, L. (2025, 8 noviembre). Textured Sand Abstract Design. Pinterest. https://co.pinterest.com/pin/790944753349456943/
//4. a brown and white area rug with circles on it. (2025, 7 noviembre). Pinterest. https://co.pinterest.com/pin/790944753349439769/
//5. Abstract art painting #9. (2025, 8 noviembre). Pinterest. https://co.pinterest.com/pin/790944753349456829/
//6. Sabyasachi Wallpaper Texture. (2025, 8 noviembre). Pinterest. https://co.pinterest.com/pin/790944753349456796/
//7. Splash Images. (2025, 8 noviembre). Pinterest. https://co.pinterest.com/pin/790944753349457093/
//8. (2025a, noviembre 7). Zoomed Out Wallpapers. Pinterest. https://co.pinterest.com/pin/790944753349438508/

//Ilustraciones
//Para las ilustraciones le pedi a chat GPT y a Co-pilot que las hicieran. Adjunte fotso realas de sitios con esa estetica bohemio de la cuidad, y le pedi que las convierta en ilustraciones.
//Links de conversaciones
//https://copilot.microsoft.com/chats/bd9J9VXpY7sGa7qhPd8Gb
//https://chatgpt.com/c/68ed7a0d-19a0-8333-8e01-5a9243347e35

//Tipografías
//Todas las tipografias fueron descargadas de Da Fonts

//Hice uso de inteligencia artificial para entender cuertas partes del codigo, en especial para el html y para algunas correcciones en las imagnes y en los textos y como se debrian ver. Tambien lo use oara crear ilustraciones.

//para el fondo
let fondo = [];
let currentIndex = 0;
//Chat
let focusCampo = null;

//PARTE 2: COLORES BASES DE POSTAL

//para colores del layout de la postal
let selectedSet = 0;

//color de la postal y de los detalles de las lienas de text y cuadrado donde aparece el simbolo

let colorSets = [
  { base: [220, 204, 176], detalles: [187, 145, 111] },
  { base: [205, 183, 164], detalles: [145, 95, 60] },
  { base: [235, 220, 200], detalles: [200, 130, 80] },
  { base: [222, 180, 170], detalles: [120, 50, 70] },
  { base: [240, 200, 160], detalles: [140, 70, 40] },
  { base: [168, 180, 165], detalles: [130, 100, 85] },
];

//lets para ilustraciones que van como iagen en la parte de la postal de adelante
let ilustraciones = [];
let ilustracionActual = 0;

//let para escoger entre el titulo
let tituloSelect;
let tituloActual = "Postales del frío";

//Lets para poder escoger fonts del titulo
let fontSelect;
let fuenteActual;
let fuentes = {};

//lets para cambiar lo sellos de abajo de la postal derecha
let selloSelect;
let formaSello = "circular";

//lets de icono del sello
let icono;

//Lets para que la persona pueda escribir en el de y para
let textoDe = "";
let textoPara = "";

//lets de lineas guia par que persona pueda escrbir encima de ellas
let lineTexts = ["", "", "", ""]; //use focus linea para no afcetar el texto de DE Y PARA
let focusLinea = null; // Let de posiciones de las líneas guía para el texto
let posx = 1010;
let x2 = 1250;
let yinicio = 290;
let espaciolinea = 38;
let numlineas = 4;

//Lets para poder cambiar los dibujos que van en el cuadrado de arriba de la postal derecha
let dibujoSelect;
let dibujoActual = "cafe";

//Let global de texto de postales de bogota
let claireFont;

//Let de font del texto que acompaña las frases
let Cheekfont;

//Let de las frases que acompañan cada titulo
let frasesPorTitulo = {
  "Postales del frío": "El viento guarda \nmemorias en cada \nesquina helada",
  "Retratos Entre Paraguas":
    "Sombras y colores\n se cruzan bajo\n la lluvia compartida",
  "Ecos De Ladrillos":
    "Las paredes susurran\n historias que nunca\n se derrumban",
  "Archivo Melancólico":
    "Cada hoja guarda un\n recuerdo que se \nniega a desaparecer",
  "Bitácora De La Lluvia":
    "Las gotas escriben\n diarios invisibles\n sobre la ciudad",
  "Atlas Sentimental": "Un mapa de emociones\n que guía\ncorazones perdidos",
  "Generador De Nostalgias": "Cada instante revive\n lo que\n parecía olvidado",
  "Memorias En Loop": "El pasado regresa\n como un \neco interminable",
  "Entre Tinto & Lluvia":
    "El café caliente\n acompaña las tardes mojadas \nde la ciudad",
  "Bajo El Paraguas": "Refugio pequeño\n donde caben \nmundos enteros",
  "De Café A Café": "Las conversaciones\n viajan de \ntaza en taza",
  "Ladrillos Que Hablan": "Cada muro guarda\n voces que aún \nresuenan",
};

//prelouad de cambio de fondo
function preload() {
  for (let i = 1; i <= 8; i++) {
    fondo.push(loadImage(`fondos/fon ${i}.jpg`));
  }

  //preloud de ilustraciones
  for (let a = 1; a <= 7; a++) {
    ilustraciones.push(loadImage(`ilustraciones/ilus ${a}.png`));
  }

  //fonts del titulo en el preload
  fuentes.VASQUZ = loadFont("Fonts/VASQUZ.otf");
  fuentes.Viora = loadFont("Fonts/Viora.ttf");
  fuentes.Wornas = loadFont("Fonts/Wornas-1.otf");

  //fonts de texto

  fuentes.Bagisko = loadFont("Fonts/BAGISKO ITALIC.ttf");

  //font de postales de bogota
  claireFont = loadFont("Fonts/ClaireAmoreth-Regular.otf");

  //Font del texto que acompaña los titulos
  Cheekfont = loadFont("Fonts/CheekboneDemoRegular.ttf");

  icono = loadImage("iconos/umbrella.png");
}

function setup() {
  //createCanvas (800, 900);

  //FONDO EN EL SETUP
  // let cnv = createCanvas(windowWidth, windowHeight).parent("canvasContainer");
  let cnv = createCanvas(1520, 552).parent("canvasContainer");

  let downloadBtn = document.getElementById("downloadCanvas");
  downloadBtn.addEventListener("click", () => {
    saveCanvas("BohoBogotaPostal", "png");
  });

  //cnv.position(0, 50);
  imageMode(CORNER);
  //image(fondo[currentIndex], 0, 0, 1330, 480);

  let btn = select("#changeImage");
  btn.mousePressed(() => {
    currentIndex = (currentIndex + 1) % fondo.length;
    //image(fondo[currentIndex], 0, 0, 800, 900);
  });

  //COLORES BASES POSTAL
  // Selector para cambiar los colores del layout de la postal
  let selector = select("#colorSelect");
  selector.changed(() => {
    selectedSet = int(selector.value());
  });

  //ILUSTRACIONES DE POSTAL FRONTAL
  //Todas las ilustraciones fuerin hechas con inteligencia artificial y su fuente y referente esta abajo junto con el prompt de chat.
  let btnIlus = select("#changeIlustracion");
  btnIlus.mousePressed(() => {
    ilustracionActual = (ilustracionActual + 1) % ilustraciones.length;
  });

  // PARA ESCOGER EL COLOR DEL TITULO
  tituloSelect = document.getElementById("tituloSelect");
  tituloActual = tituloSelect.value;
  tituloSelect.addEventListener("change", () => {
    tituloActual = tituloSelect.value;
  });

  fontSelect = document.getElementById("fontSelect");
  fuenteActual = fuentes.VASQUZ;

  fontSelect.addEventListener("change", () => {
    let seleccion = fontSelect.value;
    fuenteActual = fuentes[seleccion];
  });

  //PARA UNIR EL CON EL HTML DE LA ELECCIÓN DE SELLOS
  selloSelect = document.getElementById("selloSelect");
  selloSelect.addEventListener("change", () => {
    formaSello = selloSelect.value;
  });

  //para unir el botn de escoger dibujo con el html
  dibujoSelect = document.getElementById("dibujoSelect");
  dibujoSelect.addEventListener("change", () => {
    dibujoActual = dibujoSelect.value;
  });
}

function draw() {
  imageMode(CORNER);

  //FONDO EN EL DRAW
  image(fondo[currentIndex], 0, 0, width, height);

  //COLORES DEL LAYOUT DE LA POSTAL

  // Colores de la postal
  let base = colorSets[selectedSet].base;
  let detalles = colorSets[selectedSet].detalles;

  noStroke();
  fill(...base);
  rect(30, 40, 620, 400, 8);

  fill(...base);
  rect(670, 40, 620, 400, 8);

  // Líneas guía
  stroke(...detalles);
  strokeWeight(2);
  let posx = 1010;
  let x2 = 1250;
  let yinicio = 290;
  let espaciolinea = 38;
  let numlineas = 4;

  for (let a = 0; a < numlineas; a++) {
    let y = yinicio + a * espaciolinea;
    line(posx, y, x2, y);
  }

  //Cuadrado de postal de la derecha
  noFill();
  strokeWeight(2);
  stroke(...detalles);
  rect(1180, 50, 70, 80);

  //Iluminación de las ilustraciones de la postal
  imageMode(CENTER);
  image(ilustraciones[ilustracionActual], 340, 240, 600, 380);

  // Titulo para escoger
  //espaxio en algnas parablas y subir la otra
  //Me toco dividir el texto en dos lineas para que las palabras largas no se cruzen
  textFont(fuenteActual);
  textSize(60);
  textAlign(LEFT, TOP);
  fill(...detalles);
  noStroke();

  //el codigo de split me lo dio copilot
  let palabras = tituloActual.trim().split(" ");
  if (palabras.length > 1) {
    let linea1 = palabras.slice(0, -1).join(" ");
    let linea2 = palabras[palabras.length - 1];

    text(linea1, 680, 50);
    text(linea2, 680, 105);
  } else {
    text(tituloActual, 680, 50);
  }

  // Dibujar sello en el centro
  //posision del sello
  dibujarSello(725, 390, detalles);

  //Texto de Para y De
  noStroke();
  fill(...detalles);
  textFont(fuenteActual);
  textSize(20);
  textAlign(LEFT, CENTER);

  // "De:"
  text("De:", posx, yinicio - 100);
  //uso de if para   que cuando la persona escriba pueda escrbir en el epsacio de escribe aca
  if (textoDe === "" && focusCampo !== "de") {
    text("Escribe acá", posx + 40, yinicio - 100);
  } else {
    text(textoDe, posx + 40, yinicio - 100);
  }

  // "Para:"
  text("Para:", posx, yinicio - 60);
  //uso de if para   que cuando la persona escriba pueda escrbir en el epsacio de escribe aca
  if (textoPara === "" && focusCampo !== "para") {
    text("Escribe acá", posx + 60, yinicio - 60);
  } else {
    text(textoPara, posx + 60, yinicio - 60);
  }

  noStroke();
  fill(...detalles);
  textFont(fuenteActual);
  textSize(20);
  textAlign(LEFT, CENTER);

  if (lineTexts.every((t) => t === "") && focusLinea === null) {
    text("Escribe acá", posx, yinicio - 15);
  }

  for (let i = 0; i < numlineas; i++) {
    let y;
    if (i === 0) {
      y = yinicio - 15;
    } else {
      y = yinicio + i * espaciolinea - 5;
    }
    text(lineTexts[i], posx, y);
  }

  //Info de donde est aubicado mi rect de la portal derecha, arriba a la derecha
  //rect(1180, 50, 70, 80);

  //para que el dibujo aparezca dentro dle cuadro
  push();
  translate(1215, 90);
  dibujarIcono(dibujoActual, detalles);
  pop();

  textFont(claireFont);
  textSize(25);
  fill(...detalles);
  noStroke();
  //textAlign(CENTER, TOP);

  text("Postales de Bogotá", 790, 380);

  //Frases que acompañan cada titulo
  textFont(fuenteActual);
  textSize(25);
  fill(...detalles);
  noStroke();
  textAlign(LEFT, TOP);

  text(frasesPorTitulo[tituloActual], 680, 200);
}

//function de mouse pressed para el texto de de y para
function mousePressed() {
  let posx = 1010;
  let yinicio = 290;

  if (
    mouseX > posx &&
    mouseX < posx + 250 &&
    mouseY > yinicio - 100 &&
    mouseY < yinicio - 80
  ) {
    focusCampo = "de";
  } else if (
    mouseX > posx + 13 &&
    mouseX < posx + 250 &&
    mouseY > yinicio - 80 &&
    mouseY < yinicio - 50
  ) {
    focusCampo = "para";
  }

  //para las lienas en moupressed
  else {
    for (let i = 0; i < numlineas; i++) {
      let y = yinicio + i * espaciolinea;
      if (mouseX > posx && mouseX < x2 && mouseY > y - 18 && mouseY < y + 6) {
        focusLinea = i;
        focusCampo = null;
      }
    }
  }
}

//funcion key typed para texto tambien
function keyTyped() {
  if (focusCampo === "de") {
    textoDe += key;
  } else if (focusCampo === "para") {
    textoPara += key;
  } else if (focusLinea !== null) {
    lineTexts[focusLinea] += key;

    //opcion par que baje de reglon
    let ancho = textWidth(lineTexts[focusLinea]);
    if (posx + ancho > x2 - 12 && focusLinea < lineTexts.length - 1) {
      focusLinea++;
    }
  }
}

// Funcion para que pueda borrar letras
function keyPressed() {
  if (keyCode === BACKSPACE) {
    if (focusCampo === "de" && textoDe.length > 0) {
      textoDe = textoDe.slice(0, -1);
    } else if (focusCampo === "para" && textoPara.length > 0) {
      textoPara = textoPara.slice(0, -1);
    } else if (focusLinea !== null && lineTexts[focusLinea].length > 0) {
      lineTexts[focusLinea] = lineTexts[focusLinea].slice(0, -1);
    }
  }
}

//Function para el sello

function dibujarSello(x, y, detalles) {
  push();
  translate(x, y);
  stroke(...detalles);
  strokeWeight(2);
  noFill();

  switch (formaSello) {
    //se puede cambiar la froma dle sello
    //la tipografai sel sello cambia en base a la tipografia que elija la persona

    //sello uno circlar
    case "circular":
      ellipse(-0, -5, 90, 90);
      ellipse(-0, -5, 82, 82);
      break;
    case "ovalado":
      ellipse(10, 10, 100, 60);
      ellipse(10, 10, 92, 52);
      break;

    case "rectangulo":
      rectMode(CENTER);
      rect(10, 10, 100, 60, 5);
      rect(10, 10, 92, 52, 5);
      break;
  }
  //texto de bogota en el sello
  noStroke();
  fill(...detalles);
  textFont(fuenteActual);
  textAlign(CENTER, CENTER);
  textSize(19);

  //Use otro switch como le sugierio chat para que al cambiar la figur el texto siga estando en elcentro sin probelma
  switch (formaSello) {
    case "circular":
      text("BOGOTÁ", -0, -5);
      break;
    case "ovalado":
      text("BOGOTÁ", 10, 10);
      break;

    case "rectangulo":
      text("BOGOTÁ", 10, 10);
      break;
  }

  // Línea debajo de bogota en cada sello
  stroke(...detalles);
  strokeWeight(1.5);

  switch (formaSello) {
    case "circular":
      line(-35, 8, 35, 8);
      break;
    case "ovalado":
      line(-25, 22, 46, 22);
      break;

    case "rectangulo":
      line(-25, 22, 46, 22);
      break;
  }
  //icono
  //imageMode(CENTER);
  //image(icono, 0, -25, 40, 40);

  pop();
}

function dibujarIcono(tipo, detalles) {
  stroke(...detalles);
  strokeWeight(5);
  noFill();

  //libro
  switch (tipo) {
    case "libro":
      push();
      scale(0.9); // ajusta al tamaño del cuadro

      //paginas de afuera dle libro la cubiarta
      fill(...detalles);
      noStroke();
      rectMode(CENTER);
      rect(-12, 0, 22, 50, 3);
      rect(12, 0, 22, 50, 3);

      // Páginas centrales
      fill(255); // blanco para contraste
      rect(0, 0, 35, 40, 2);

      // Líneas de texto simuladas
      stroke(...detalles);
      strokeWeight(1);
      for (let y = -14; y <= 14; y += 6) {
        line(-14, y, 14, y);
      }

      // Marcador central
      //stroke(...detalles);
      //strokeWeight(2);
      //line(0, -13, 0, 18); // línea vertical
      //fill(...detalles);
      //triangle(-3, 18, 3, 18, 0, 24); // punta del marcador

      pop();
      break;

    // Edificio de ladrillo

    case "edificio":
      push();
      rectMode(CORNER);

      // Cuerpo del edificio
      noStroke();
      fill(...detalles);
      rect(-15, -20, 30, 60);

      // Techo con arco
      noStroke();
      fill(detalles[0] - 40, detalles[1] - 40, detalles[2] - 40);
      arc(0, -20, 32, 35, PI, TWO_PI, CHORD);

      // Ventanas (simples y alineadas)
      fill(255);
      noStroke();
      let winW = 8;
      let winH = 12;
      let spacingY = 18;
      let startY = -15;
      for (let row = 0; row < 3; row++) {
        rect(-12, startY + row * spacingY, winW, winH, 2);
        rect(4, startY + row * spacingY, winW, winH, 2);
      }

      pop();
      break;

    //La casa
    case "casa":
      push();
      rectMode(CORNER);

      //Base de la casa
      noStroke();
      fill(...detalles);
      rect(-25, 0, 50, 40);

      //Techo traingular
      noStroke();
      fill(detalles[0] - 40, detalles[1] - 40, detalles[2] - 40);
      triangle(-30, 0, 30, 0, 0, -35);

      //puerta
      fill(255, 240, 210);
      rect(-8, 18, 16, 22, 2);

      //ventanas

      fill(255, 240, 210);
      rect(-20, 5, 12, 12, 2);
      rect(8, 5, 12, 12, 2);

      pop();
      break;

    // PARAGUAS
    case "paraguas":
      push();
      rectMode(CORNER);

      translate(0, -8);

      // Colores del paraguas
      let paraguasColor = color(...detalles); // rojo vintage u otro según detalles
      let mangoColor = color(
        detalles[0] - 40,
        detalles[1] - 40,
        detalles[2] - 40
      );

      // Mango del paraguas
      stroke(mangoColor);
      strokeWeight(4);
      line(0, 0, 0, 30);
      noFill();
      strokeWeight(4);
      arc(6, 28, 12, 12, 0, PI / 1.2);

      // parte de arriba
      noStroke();
      fill(paraguasColor);
      arc(0, 0, 60, 45, PI, TWO_PI, CHORD);

      pop();
      break;

    //Cafe

    case "cafe":
      push();
      rectMode(CORNER);

      // Taza
      fill(...detalles);
      noStroke();
      arc(0, 0, 55, 75, 0, PI);

      // Arc del posillo
      noFill();
      stroke(...detalles);
      strokeWeight(4);
      arc(20, 17, 23, 15, -HALF_PI, HALF_PI);

      // Humo saliendo
      stroke(180);
      strokeWeight(2);
      noFill();
      for (let i = 0; i < 3; i++) {
        for (let i = 0; i < 3; i++) {
          beginShape();
          vertex(-12 + i * 12, -1); // bajado un poco
          bezierVertex(-25 + i * 12, -17, 8 + i * 12, -23, -5 + i * 12, -35);
          endShape();
        }

        pop();
        break;
      }
  }
}

//Funcion de fucntion resize para que pueda ajustarsev a la pantalla completa
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }
