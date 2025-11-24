// Sofia Rodriguez Avila 202422879
// Bogota en loop
//Bogota en Loop es un programa generativo que te permite acomodar un poster a tu propia interpretacion de Bogota. Yo personalmente veo a Bogota como una ciudad muy caotica, donde siempre en todos lados esta pasando algo y donde todo mundo tiene una vision diferente de las cosas, pero sin ser juzgado. Es por eso que este programa generativo tiene como objetivo que ,apartir de inputs y botones con posibilidades limitadas, cada persona pueda crear su vision de bogota, con la posibilidad de cambiar lugares, colores, frases y demas, todo perteneciente a Bogota.

//variable globales
let buttonSave;

let colorPicker;

let frases = [];

let fraseActual = 0;

let fuentes = [];
let fuenteActual = 0;

let canciones = [];
let nombresCanciones = [];
let cancionActual = 0;

let externalImages = [];
let drawFunctions = [];
let currentVisual = 0;

let buttonVisual, buttonColorFrase, buttonColorSolo;

let spray;
let graffitiLayer;
let buttonReset;

let posX=380
let posY=2
//todos los archivos que use
function preload() {
  //imagenes q voy a usar
  externalImages.push(loadImage("assets/bus.png"));
  externalImages.push(loadImage("assets/poker.png"));
  externalImages.push(loadImage("assets/bandeja.png"));
  externalImages.push(loadImage("assets/busc.png"));
  externalImages.push(loadImage("assets/pielroja.png"));
  externalImages.push(loadImage("assets/chiva.png"));
  externalImages.push(loadImage("assets/muñeco.png"));
  externalImages.push(loadImage("assets/talcual.png"));
  externalImages.push(loadImage("assets/transmi.png"));
  externalImages.push(loadImage("assets/casas.png"));
  externalImages.push(loadImage("assets/iglesia.png"));
  externalImages.push(loadImage("assets/chocorramo.png"));
  //canciones
  canciones.push(loadSound("assets/Ay_que_dolor.mp3"));
  nombresCanciones.push("Ay que dolor");
  canciones.push(loadSound("assets/cancion2.mp3"));
  nombresCanciones.push("El hombre caiman ");
  canciones.push(loadSound("assets/cancion3.mp3"));
  nombresCanciones.push("Florecita Rockera");
  canciones.push(loadSound("assets/cancion4.mp3"));
  nombresCanciones.push("Mi generacion");
  canciones.push(loadSound("assets/cancion5.mp3"));
  nombresCanciones.push("Noicanicula");
  canciones.push(loadSound("assets/cancion6.mp3"));
  nombresCanciones.push("Rock n Love");
  canciones.push(loadSound("assets/cancion7.mp3"));
  nombresCanciones.push("Besos Usados");
  canciones.push(loadSound("assets/cancion8.mp3"));
  nombresCanciones.push("Mr Trance");
  canciones.push(loadSound("assets/cancion9.mp3"));
  nombresCanciones.push("Orgullo Rolo");
  canciones.push(loadSound("assets/cancion10.mp3"));
  nombresCanciones.push("Siempre volvere");

  //imagen del spray
  sprayImg = loadImage("assets/spray.png");

  //fonts que voy a usar
  fuentes.push(loadFont("assets/drip.ttf"));
  fuentes.push(loadFont("assets/bassy.ttf"));
  fuentes.push(loadFont("assets/go.ttf"));
}

function setup() {
 // Solo cambiar el tamaño del canvas si desea
  createCanvas(800, 1100).parent("canvasContainer");
  // Frases
  frases = [
    "Sea Feliz (No joda al projimo)",
    "Pongale cuidado parce",
    "Bogota es un estado mental",
    "Parchese",
    "Ser rolo es una tragicomedia diaria",
    "Este parcero disque tin",
    "Usted no sabe quien soy yo guevon",
    "Buenas Veci",
    "Usted si es sapo",
    "Sumerce",
    "Que chimba MK",
    "El arte está en el aire.",
    "Tu historia tiene banda sonora.",
    "La musica pinta emociones.",
    "Bogota como ciudad gotica",
  ];
  // Color picker
  colorPicker = createColorPicker("#ff0000"); // color inicial
  colorPicker.position(posX+190, posY+80);

  // Botón para cambiar color y frase
  buttonColorFrase = createButton("NUEVA FRASE");
  buttonColorFrase.position(posX, posY);
  buttonColorFrase.mousePressed(cambiarFrase);
  // estilo placa amarilla
  buttonColorFrase.style("background-color", "#FFD700");
  buttonColorFrase.style("color", "black");
  buttonColorFrase.style("font-family", "Impact, Arial Black, sans-serif");
  buttonColorFrase.style("font-size", "20px");
  buttonColorFrase.style("text-transform", "uppercase");
  buttonColorFrase.style("border", "4px solid black");
  buttonColorFrase.style("border-radius", "6px");
  buttonColorFrase.style("padding", "10px 20px");
  //Boton para descargar poster
  buttonSave = createButton("DESCARGAR");
  buttonSave.position(posX+170, posY);
  buttonSave.mousePressed(() => {
    saveCanvas("poster_final", "jpg"); // guarda como poster_final.png
  });
  estiloPlaca(buttonSave);

  // Botón para cambiar visual
  buttonVisual = createButton("VISUAL NUEVO");
  buttonVisual.position(posX, posY+60);
  buttonVisual.mousePressed(cambiarVisual);
  // estilo placa amarilla
  buttonVisual.style("background-color", "#FFD700");
  buttonVisual.style("color", "black");
  buttonVisual.style("font-family", "Impact, Arial Black, sans-serif");
  buttonVisual.style("font-size", "20px");
  buttonVisual.style("text-transform", "uppercase");
  buttonVisual.style("border", "4px solid black");
  buttonVisual.style("border-radius", "6px");
  buttonVisual.style("padding", "10px 20px");
  buttonReset = createButton("REINICIAR SPRAY");
  buttonReset.position(posX, posY+120);
  buttonReset.mousePressed(limpiarSpray);

  // estilo tipo placa
  buttonReset.style("background-color", "#FFD700");
  buttonReset.style("color", "black");
  buttonReset.style("font-family", "Impact, Arial Black, sans-serif");
  buttonReset.style("font-size", "20px");
  buttonReset.style("text-transform", "uppercase");
  buttonReset.style("border", "4px solid black");
  buttonReset.style("border-radius", "6px");
  buttonReset.style("padding", "10px 20px");

  // capa transparente para hacer el graffiti
  graffitiLayer = createGraphics(800, 1100);
  graffitiLayer.clear();
}

function draw() {
  background(colorPicker.color());

  //arreglos de la frase
  textAlign(CENTER, TOP);
  // dentro de draw()
  textAlign(CENTER, TOP);
  fill(255);

  //disminui el tamaño de una fuente especifica
  if (fuenteActual === 2) {
    textSize(40); // go.ttf más grande
  } else {
    textSize(60);
  }

  fill(255);
  textFont(fuentes[fuenteActual]);
  text(frases[fraseActual], width / 2, 200);
  // Visual actual
  if (currentVisual < drawFunctions.length) {
    drawFunctions[currentVisual]();
  } else {
    let imgIndex = currentVisual - drawFunctions.length;
    let img = externalImages[imgIndex];
    if (img) {
      imageMode(CENTER);
      if (
        imgIndex === 2 ||
        imgIndex === 8 ||
        imgIndex === 9 ||
        imgIndex === 10
      ) {
        // bandeja paisa
        image(img, width / 2, height / 2 + 100, 850, 850);
      } else {
        image(img, width / 2, height / 2 + 100, 550, 550);
      }
    }
  }
  let cancion = canciones[cancionActual];
  if (cancion.isLoaded()) {
    // fondo gris
    fill(100);
    rect(width / 2 - 200, height - 100, 400, 20);
    // progreso amarillo
    let progreso = map(cancion.currentTime(), 0, cancion.duration(), 0, 400);
    fill(255, 215, 0);
    rect(width / 2 - 200, height - 100, progreso, 20);

    // nombre de la canción
    stroke(0);
    strokeWeight(2);
    fill(255);
    textSize(35);
    textAlign(CENTER, CENTER);
    text(nombresCanciones[cancionActual], width / 2, height - 130);
    // texto encima de la barra
    fill(255);
    stroke(0); // blanco
    textSize(18);
    textFont("cursive");
    textAlign(CENTER, CENTER);
    text("Presiona M", width / 2, height - 90);
  }
  //no se si esta bien
  if (mouseIsPressed) {
   //spray
    for (let r = 15; r > 0; r -= 3) {
      graffitiLayer.noStroke();
      graffitiLayer.fill(0, map(r, 30, 0, 20, 150));
      graffitiLayer.ellipse(mouseX, mouseY, r * 2, r * 2);
    }

    // tamaño de los puntos del spray
    for (let i = 0; i < 15; i++) {
      let x = mouseX + random(-25, 25);
      let y = mouseY + random(-25, 25);
      let s = random(2, 6);
      graffitiLayer.fill(0, random(50, 120));
      graffitiLayer.ellipse(x, y, s, s);
    }
  }
//movi capa transparente sobre la cual hice el graffitti por que me salia corrida
  push();
  translate(400, 550); 
  image(graffitiLayer, 0, 0);
  pop();
  // spray se mueve con el mouse
  imageMode(CENTER);
  image(sprayImg, mouseX, mouseY, 300, 300);
}

// Función para cambiar solo el color
function changeColor() {
  let r = int(random(256));
  let g = int(random(256));
  let b = int(random(256));
  colorPicker.value(color(r, g, b));
}
function cambiarFrase() {
  let nuevaFrase;
  do {
    nuevaFrase = int(random(frases.length));
  } while (nuevaFrase === fraseActual);

  fraseActual = nuevaFrase;
  fuenteActual = (fuenteActual + 1) % fuentes.length;
}
function cambiarVisual() {
  let totalVisuales = drawFunctions.length + externalImages.length;
  if (totalVisuales === 0) return;

  let nuevoVisual;
  do {
    nuevoVisual = int(random(totalVisuales));
  } while (nuevoVisual === currentVisual);

  currentVisual = nuevoVisual;
}
function limpiarSpray() {
  graffitiLayer.clear(); // borra todo lo pintado
}
function keyPressed() {
  let cancion = canciones[cancionActual];

  // ENTER: reproducir o detener
  if (keyCode === ENTER) {
    if (cancion.isPlaying()) {
      cancion.stop();
    } else {
      cancion.play();
    }
  }

  // FLECHA DERECHA: adelantar 5 segundos
  if (keyCode === RIGHT_ARROW) {
    if (cancion.isLoaded()) {
      let nuevaPos = min(cancion.currentTime() + 5, cancion.duration());
      cancion.jump(nuevaPos);
    }
  }

  // FLECHA IZQUIERDA: retroceder 5 segundos
  if (keyCode === LEFT_ARROW) {
    if (cancion.isLoaded()) {
      let nuevaPos = max(cancion.currentTime() - 5, 0);
      cancion.jump(nuevaPos);
    }
  }
  // TECLA M: cambiar canción aleatoriamente
  if (key === "m" || key === "M") {
    cancion.stop();

    let nuevaCancion;
    do {
      nuevaCancion = int(random(canciones.length));
    } while (nuevaCancion === cancionActual);

    cancionActual = nuevaCancion;
    canciones[cancionActual].play();
  }
}
function estiloPlaca(btn) {
  btn.style("background-color", "#FFD700"); // amarillo intenso
  btn.style("color", "black");
  btn.style("font-family", "Impact, Arial Black, sans-serif");
  btn.style("font-size", "20px");
  btn.style("text-transform", "uppercase");
  btn.style("border", "4px solid black");
  btn.style("border-radius", "6px");
  btn.style("padding", "10px 20px");
  btn.style("letter-spacing", "2px");
}
