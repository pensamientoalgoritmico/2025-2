//Luisa Beltran 202417075

//Nombre Proyecto: Bogotá en tus manos 

// Doy la idea de que Bogotá puede estar al alcance del usuario. Una llave es algo que lo puede personalizar cada persona; la llave, aunque no se piense mucho en la vida, es lo que te lleva a tu hogar, es lo que te representa como persona en tu hogar y tu hogar es donde vives y con eso ya formas parte de Bogotá. Esa llave eres tú y tu representación en la ciudad; por eso es que la llave representa "en tus manos", porque esa llave la llevas contigo siempre y solo la puedes representar tú como a ti te gusta y nadie más tendrá esa llave porque es solo tuya.

// Estoy creando un generador de pertenencia a Bogotá por medio de que la persona puede personalizar su llave: se trata de que al inicio va a salir una caja que diga "haz click para entrar a Bogotá", donde atrás se ve un GIF de la ciudad. Después, al hacer click, se va a abrir el mapa que hice de las localidades de Bogotá y, al tocar una localidad, uno abre esa localidad y van a salir dentro de esa localidad 6 llaves. Cada llave debe poder tener una interacción, que se le pueda poner nombre, se le pueda cambiar de color, el tamaño, cambiar la cabeza de la llave y ponerle algún patrón (la idea es que uno pueda crear su propia llave, simulando que en esa localidad una llave representa mi casa y la llave representa mi pertenencia). Se puede volver atrás al mapa o hacer click en guardar la llave, donde al final te lleva a otra pantalla que diga "¡Felicidades!". Esta llave representa tu pertenencia en Bogotá; nadie más va a tener una igual, es solo tuya..."


// voy aqui a estar controlando la pantalla actual
let estado = "inicio"; //VOLVER A PONER INICIO
let localidadSeleccionada = null; // guarda la localidad clicada
let llaveSeleccionada = null; // para guardar la llave clicada
let llavesPorLocalidad = {}; // aquí estarán las llaves de cada localidad

// Variables para los inputs y sonido
let inputNombre, sliderTamaño, colorPicker, selectForma, selectPatron;

let gif_loadImg;

// Los Centros de cada localidad y el radio para detectar click de entrar a una localidad para agarrar los centros me guie usando el console de ver mi mouse donde toco me sale mi "y" y mi "x" y despues con la distancia fui guiandome para tener el radio 
let centros = {
  Usaquén: { x: 134, y: 96, r: 80 },
  Chapinero: { x: 334, y: 133, r: 80 },
  "Barrios Unidos": { x: 290, y: 200, r: 40 },
  Teusaquillo: { x: 360, y: 230, r: 38 },
  "Santa Fe": { x: 467, y: 198, r: 30 },
  Candelaria: { x: 492, y: 159, r: 38 },
  Mártires: { x: 448, y: 230, r: 30 },
  "Antonio Nariño": { x: 492, y: 271, r: 28 },
  "Rafael Uribe": { x: 535, y: 308, r: 38 },
  "San Cristóbal": { x: 572, y: 228, r: 38 },
  Usme: { x: 677, y: 291, r: 40 },
  Sumapaz: { x: 752, y: 228, r: 38 },
  "Ciudad Bolívar": { x: 579, y: 432, r: 50 },
  Tunjuelito: { x: 519, y: 364, r: 38 },
  "Puente Aranda": { x: 421, y: 293, r: 40 },
  Bosa: { x: 432, y: 526, r: 70 },
  Kennedy: { x: 420, y: 394, r: 45 },
  Fontibón: { x: 268, y: 386, r: 48 },
  Engativá: { x: 217, y: 293, r: 70 },
  Suba: { x: 140, y: 220, r: 100 },
};

//funcion de poder agregar mi GIF al inicio de entrada del generador mi inspiracion fue un referente de p5
function preload (){
gif_loadImg = loadImage("assets/bogota.gif");
}

// el canva
function setup() {
  createCanvas(800, 600).parent("canvasContainer");
}

// el orden de como funciona mi generador pera este draw me guie de entraas y ejemplos pasados para guiarme como hacerlo
function draw() {
  if (estado === "inicio") {
    pantallaInicio();
  } else if (estado === "mapa") {
    pantallaMapa();
    print(mouseX, mouseY);
  } else if (estado === "localidad") {
    pantallaLocalidad();
  } else if (estado === "personalizar") {
    pantallaPersonalizar();
  } else if (estado == "guardar llave") {
    pantallaGuardar();
  }
}

// Pantalla inicio
function pantallaInicio() {
  // antes era azul hasta que le pusimos un GIF
  //background(0, 102, 204); // azul
  rectMode(CORNER);
  // GIF que sea la imagen
  image(gif_loadImg, 50, 50);
  fill(255, 204, 0);
  stroke(255, 0, 0);
  strokeWeight(1);
  rect(width / 2 - 180, height / 2 - 70, 360, 140, 20);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(28);
  textFont("bree serif"); // TU FUENTE ORIGINAL
  text("Haz click para entrar a Bogotá", width / 2, height / 2);
}

// Pantalla mapa
//las coordenadas de como dibuje el mapa las hice con illustrator
function pantallaMapa() {
  background(200);
  drawUsaquen();
  drawChapinero();
  drawBarriosUnidos();
  drawTeusaquillo();
  drawSantaFe();
  drawCandelaria();
  drawMartires();
  drawAntonioNarino();
  drawRafaelUribe();
  drawSanCristobal();
  drawUsme();
  drawSumapaz();
  drawCiudadBolivar();
  drawTunjuelito();
  drawPuenteAranda();
  drawBosa();
  drawKennedy();
  drawFontibon();
  drawEngativa();
  drawSuba();
  // el texto de señalizacion de que hacer que esta en el mapa
  fill(148, 240, 100);
  rectMode(CENTER);
  rect(534, 48, 535, 50, 10);
  fill(0);
  text("Haz click en alguna localidad o en la que vivas para personalizar tu llave", 530, 48);
  rectMode(CORNER);
}

// Pantalla localidad aqui va casi que todo lo que pasa cuadno uno le da click a una localidad, donde aparecen 6 llavespara elegir y uno decide cual personalizar y entra y la va personalizando y despues guardarla
function pantallaLocalidad() {
  background(220);
  textAlign(CENTER, CENTER);
  textSize(32);
  textFont("bree serif");
  // texto de señalizacion para no perderse que hacer
  text(
    "Bienvenido a " + localidadSeleccionada + ", selecciona una llave",
    width / 2,
    50
  );

  if (!llavesPorLocalidad[localidadSeleccionada]) {
    llavesPorLocalidad[localidadSeleccionada] = generarLlaves(6);
  }

  for (let llave of llavesPorLocalidad[localidadSeleccionada]) {
    let llaveColor = llave.color || color(255);
    dibujarLlave(llave.x, llave.y, llave.tamaño, llaveColor);
  }

  // box de cuadno uno estan dentro de una localidad haya la posibilidad de volver al mapa y ver de nuevo
  fill(255, 204, 0);
  rect(width / 2 - 80, height - 100, 160, 50, 10);
  fill(0);
  textSize(20);
  text("Volver al mapa", width / 2, height - 75);
}

// aqui ya entramos a la personalizacion de la llave
function pantallaPersonalizar() {
  background(240);
  textAlign(CENTER, CENTER);
  textSize(28);
  textFont("bree serif");
  text("Personaliza tu llave", width / 2, 50);

  // seleccion de la llave y personnalizarla
  let llaveColor = llaveSeleccionada.color || color(0);
  // coordendas para dibujar la llave
  dibujarLlave(
    width / 2 - 110,
    height / 2 - 2,
    llaveSeleccionada.tamaño * 2,
    llaveColor,
    selectForma.value(),
    selectPatron.value()
  );

  // Mostrar el nombre sobre la llave y que se pueda cambiar a otro no,bre
  if (llaveSeleccionada.nombre) {
    fill(0);
    textAlign(LEFT);
    textSize(llaveSeleccionada.tamaño / 3);
    text(
      llaveSeleccionada.nombre,
      width / 2 - 90 + llaveSeleccionada.tamaño / 1.15,
      height / 2
    );
    textAlign(CENTER);
  }

  // Botón volver a la localidad y poder seleccionar alguna otra llave, ademas se puede. ver que si alguien personalizo alguna llave dentro de la localidad y donde se ven las llaves cambia completamente el tamaño o el color
  fill(255, 204, 0);
  rect(width / 3 - 80, height - 60, 160, 50, 10);
  fill(0);
  textSize(20);
  text("Volver", width / 3, height - 35);

  // el Botón para poder guardar llave

  fill(255, 204, 0);
  rect(width / 2 + 70, height - 60, 160, 50, 10);
  fill(0);
  textSize(20);
  text("Guarda tu llave", width / 2 + 150, height - 35);

  // Poder actualizar propiedades con los nuevos controles
  llaveSeleccionada.tamaño = sliderTamaño.value();
  llaveSeleccionada.color = colorPicker.color();
  llaveSeleccionada.nombre = inputNombre.value();
}

// funcion de entrar a la pantalla donde puedes guardar la llave, es muy importante ya que se siente la alegria de encontrar por algun tan unico y creativo tu pertenencia en la ciudad de bogota, esa llave es solo tuya y nadie mas la tendra eso la hace unica y unica en pertenencia
function pantallaGuardar() {
  background(240);
  // el texto que le pondre me toco dividirlo en dos para que entrara en todo el canva
  textAlign(CENTER, CENTER);
  textSize(25);
  textFont("bree serif");
  text(
    "¡Felicidades! Esta llave representa tu pertenencia en Bogotá, ",
    width / 2,
    60
  );

  textAlign(CENTER, CENTER);
  textSize(25);
  textFont("bree serif");
  text(" nadie mas va a tener una igual, es solo tuya...", width / 2, 95);

  //que salga la llave que usamos dentro de la funcion de guardar con todo lo que se personalizo
  let llaveColor = llaveSeleccionada.color || color(255);
  // coordendas para dibujar la llave
  dibujarLlave(
    width / 2 - 110,
    height / 2 - -2,
    llaveSeleccionada.tamaño * 2,
    llaveColor,
    selectForma.value(),
    selectPatron.value()
  );

  // Mostrar el nombre sobre la llave
  if (llaveSeleccionada.nombre) {
    fill(0);
    textAlign(LEFT);
    textSize(llaveSeleccionada.tamaño / 3);
    text(
      llaveSeleccionada.nombre,
      width / 2 - 90 + llaveSeleccionada.tamaño / 1.15,
      height / 2
    );
    textAlign(CENTER);
  }

  // va haber boton dibujado para volver por si paso algo y aun no se quiere personalizar la llave
  fill(255, 204, 0);
  rect(width / 3 - 80, height - 60, 160, 50, 10);
  fill(0);
  textSize(20);
  text("Volver", width / 3, height - 35);

  // y el Botón dibujado de oprimir guardar llave que a uno lo lleva directamente a descargas

  fill(255, 204, 0);
  rect(width / 2 + 70, height - 60, 160, 50, 10);
  fill(0);
  textSize(20);
  text("Capturar pantalla", width / 2 + 150, height - 35);
}

// LAS interacciones con el mouse en todo el generador, le pedi a copilot que me explicara paso a paso como hacerlo y me guie tambien de entregas viendolas y entendiendo
function mousePressed() {
  // mouse en el incio a mapa
  if (estado === "inicio") {
    if (
      mouseX > width / 2 - 180 &&
      mouseX < width / 2 + 180 &&
      mouseY > height / 2 - 70 &&
      mouseY < height / 2 + 70
    ) {
      estado = "mapa";
    }
    // del mapa a la localidad
  } else if (estado === "mapa") {
    for (let nombre in centros) {
      let c = centros[nombre];
      let d = dist(mouseX, mouseY, c.x, c.y);
      if (d < c.r) {
        localidadSeleccionada = nombre;
        estado = "localidad";
      }
    }
    // de la localidad a la pantalla de personalizar
  } else if (estado === "localidad") {
    for (let llave of llavesPorLocalidad[localidadSeleccionada]) {
      let d = dist(mouseX, mouseY, llave.x, llave.y);
      if (d < llave.tamaño) {
        llaveSeleccionada = llave;
        estado = "personalizar";
        crearInputsPersonalizacion();
      }
    }
    // Botón volver al mapa desde localidad
    if (
      mouseX > width / 2 - 80 &&
      mouseX < width / 2 + 80 &&
      mouseY > height - 100 &&
      mouseY < height - 50
    ) {
      estado = "mapa";
      localidadSeleccionada = null;
    }
  }
  //// Botón volver a la localidad desde la personali
  else if (estado === "personalizar") {
    if (
      mouseX > width / 3 - 80 &&
      mouseX < width / 3 + 80 &&
      mouseY > height - 60 &&
      mouseY < height - 10
    ) {
      // Eliminar todos los inputs cuadno se esta en localidad
      estado = "localidad";

      if (inputNombre) inputNombre.remove();
      if (sliderTamaño) sliderTamaño.remove();
      if (colorPicker) colorPicker.remove();
      if (selectForma) selectForma.remove();
      if (selectPatron) selectPatron.remove();
    }
    if (
      mouseX > width / 2 + 80 &&
      mouseX < width / 2 + 80 + 160 &&
      mouseY > height - 60 &&
      mouseY < height - 10
    ) {
      // Eliminar todos los inputs en cuando sale el guardar la llave
      if (inputNombre) inputNombre.remove();
      estado = "guardar llave";

      if (sliderTamaño) sliderTamaño.remove();
      if (colorPicker) colorPicker.remove();
      if (selectForma) selectForma.remove();
      if (selectPatron) selectPatron.remove();
    }
  } else if (estado === "guardar llave") {
    // el botón que se le da click para poder guardar la llave
    if (
      mouseX > width / 3 - 80 &&
      mouseX < width / 3 + 80 &&
      mouseY > height - 60 &&
      mouseY < height - 10
    ) {
      estado = "personalizar";
      crearInputsPersonalizacion();
    }
    if (
      mouseX > width / 2 + 80 &&
      mouseX < width / 2 + 80 + 160 &&
      mouseY > height - 60 &&
      mouseY < height - 10
    ) {
      saveCanvas();
    }
  }
}
// Los Inputs que son los BOTONES QUE VAN DE LADO DE LA LLAVE PERSONALIZADA ESTO LO HICE CON LA ENTREGA DE IMPUTS los codigos
function crearInputsPersonalizacion() {
  // el poder poner nombre de la llave
  inputNombre = createInput("Nombre de tu llave");
  inputNombre.position(width * 0.25, height - 180);

  // el de tamaño de la llave
  sliderTamaño = createSlider(30, 100, llaveSeleccionada.tamaño);
  sliderTamaño.position(width * 0.25, height - 250);
  // color seleccion
  colorPicker = createColorPicker("#ffffff");
  colorPicker.position(width * 0.25, height - 220);

  // forma de la "cabeza" de la llave
  selectForma = createSelect();
  selectForma.position(width * 0.25, height - 150);
  selectForma.option("Circular");
  selectForma.option("Cuadrada");
  selectForma.option("Hexagonal");

  // el Patrón que va en la "cabeza" de la llave
  selectPatron = createSelect();
  selectPatron.position(width * 0.25, height - 120);
  selectPatron.option("Sólido");
  selectPatron.option("Rayas");
  selectPatron.option("Puntos");
}

// Generar llaves dentro de la localidad que se vean 3 arriba. y 3 abajo como el dibujo de lo que va el orden en la pantalla
function generarLlaves(cantidad) {
  let llaves = [];
  let filaArribaY = 120;
  let filaAbajoY = height - 150;
  let separacionX = 220;
  let inicioX = 100;
  for (let i = 0; i < cantidad; i++) {
    let x = inicioX + (i % (cantidad / 2)) * separacionX + random(-30, 30);
    let y =
      i < cantidad / 2
        ? filaArribaY + random(-20, 20)
        : filaAbajoY + random(-20, 20);
    llaves.push({ x: x, y: y, tamaño: random(40, 60) });
  }
  return llaves;
}

// la funcion de dibujar las llaves dentro de la pantalla personalizar si fue con la ayuda de primero pedirle a copilot de entender y despues que me ayudara, aqui me demore 5 horas porque ni copilot ni nada entendia bien como lograr que el patron saliera bien con la figura de la cabeza y que se ajustara a la figura que fuera, fue demasiado dificil, pense que no lo iba a lograr hasta que despues de casi 100 intentos de desroganziar completamente mi codigo lo logramos entre Copilot y yo, yo entendi lo que hacia el entonces iba cambiando coordenadas,tamaños etc, paraque lo pudieramos lograr alfinal.

function dibujarLlave(
  x,
  y,
  tamaño,
  llaveColor,
  forma = "Circular",
  patron = "Sólido"
) {
  push();
  translate(x, y);
  stroke(0);
  strokeWeight(2);

  // el dibuja la cabeza
  fill(llaveColor);
  if (forma === "Circular") {
    ellipse(0, 0, tamaño);
  } else if (forma === "Cuadrada") {
    rectMode(CENTER);
    rect(0, 0, tamaño, tamaño);
  } else if (forma === "Hexagonal") {
    beginShape();
    for (let i = 0; i < 6; i++) {
      let ang = (TWO_PI / 6) * i;
      vertex((cos(ang) * tamaño) / 2, (sin(ang) * tamaño) / 2);
    }
    endShape(CLOSE);
  }

  // el color de contraste para el patrón cuadno se ponia un color mas oscuro o uno miuy claro que no se veia bien el patron entonces que se pidera cambiar el color bien para que todo contrastara
  let contraste =
    red(llaveColor) + green(llaveColor) + blue(llaveColor) > 382
      ? color(0)
      : color(255);

  // El crear los patrones dentro de la cabeza, entendi lo que hacia copilot y iba cambiando coordenadas o numeros para que se ajustara bien a mi pantalla porque coplito hace un aproximado
  if (patron === "Rayas") {
    stroke(contraste);
    for (let i = -tamaño / 2; i < tamaño / 2; i += 6) {
      let yInicio = null;
      let yFin = null;
      for (let j = -tamaño / 2; j < tamaño / 2; j++) {
        if (estaDentro(i, j, tamaño, forma)) {
          if (yInicio === null) yInicio = j;
          yFin = j;
        }
      }
      if (yInicio !== null && yFin !== null) {
        line(i, yInicio, i, yFin); // solo la parte dentro
      }
    }
  } else if (patron === "Puntos") {
    stroke(contraste);
    for (let i = -tamaño / 2; i < tamaño / 2; i += 8) {
      for (let j = -tamaño / 2; j < tamaño / 2; j += 8) {
        if (estaDentro(i, j, tamaño, forma)) {
          point(i, j);
        }
      }
    }
  }

  // el cuerpo de la llave si lo personalice yo con lo que copilot me dijo que hiciera
  stroke(0);
  fill(llaveColor);
  let largo = tamaño * 1.5;
  rectMode(CORNER);
  rect(tamaño / 2, -tamaño / 6, largo, tamaño / 3);
  rect(tamaño / 2 + largo, -tamaño / 6, tamaño / 4, tamaño / 6);
  rect(tamaño / 2 + largo + tamaño / 4, -tamaño / 6, tamaño / 4, tamaño / 6);

  pop();
}

// Despues de muchos fallos, no entendia porque los puntos no se ponian dentro de la forma que se personalizaba, entonces copilot me sugerio agregar esto. Que es verificar si el punto está dentro de la forma
function estaDentro(px, py, tamaño, forma) {
  if (forma === "Circular") {
    return dist(px, py, 0, 0) <= tamaño / 2;
  } else if (forma === "Cuadrada") {
    return abs(px) <= tamaño / 2 && abs(py) <= tamaño / 2;
  } else if (forma === "Hexagonal") {
    // Aproximación simple: círculo inscrito
    return dist(px, py, 0, 0) <= (tamaño / 2) * 0.9;
  }
  return false;
}

// LAS LOCALIDADESSSS
// AQUI ME DEMORE HACEIDNO UNO POR UNO LOS VERTICES DE CADA LOCALIDAD me guie de illustrator las coordenadas y las fui metiendo una por una en p5

function drawUsaquen() {
  let centroX = 145;
  let centroY = 85;
  //USE CREANDO CIRUCLOS PARA BUSCAR EL CENTRO Y PODER EL DIST
  // fill(255,0,0);
  ellipseMode(CENTER);
  // ellipse(centroX, centroY, 250,100);
  // AQUI EMPECE CON que cuando se hace click en la localidad con el mouse se pone como mas transparente y se. abre PERO ME FALTA PONERSELO A TODAS LAS LOCALIDADES Y QUE QUEDE BIEN LA DISTANCIA DEL MOUSE

  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 120 ? 100 : 255;

  fill(255, 204, 0, transparencia);
  stroke(0);
  beginShape();
  vertex(18.13, 110.71);
  vertex(19.27, 75.82);
  vertex(28.23, 70.55);
  vertex(52.78, 72.84);
  vertex(57.14, 39.1);
  vertex(60.82, 35.66);
  vertex(65.64, 33.13);
  vertex(73.21, 40.02);
  vertex(81.24, 40.25);
  vertex(90.88, 49.43);
  vertex(103.51, 52.41);
  vertex(113.61, 34.28);
  vertex(121.64, 33.13);
  vertex(122.79, 42.54);
  vertex(126.46, 48.05);
  vertex(132.88, 41.17);
  vertex(135.41, 33.13);
  vertex(142.98, 31.76);
  vertex(155.15, 31.53);
  vertex(155.15, 48.74);
  vertex(178.56, 56.77);
  vertex(206.79, 62.51);
  vertex(211.38, 53.1);
  vertex(220.79, 53.1);
  vertex(226.07, 64.35);
  vertex(266.46, 66.87);
  vertex(266.46, 83.86);
  vertex(277.94, 84.78);
  vertex(285.51, 92.35);
  vertex(285.51, 98.55);
  vertex(270.59, 103.14);
  vertex(264.63, 113.78);
  vertex(265.09, 125.86);
  vertex(260.73, 135.96);
  vertex(253.84, 151.79);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("Usaquén", centroX, centroY);
}

// Chapinero
function drawChapinero() {
  let centroX = 334;
  let centroY = 145;
  //fill(255, 0, 0);
  // ellipse(centroX, centroY, 130, 60);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 50 ? 100 : 255;
  fill(255, 102, 102, transparencia);
  stroke(0);
  beginShape();
  vertex(272.07, 137.62);
  vertex(273.26, 114.52);
  vertex(286.148, 106.104);
  vertex(305.04, 107.61);
  vertex(311.55, 115.51);
  vertex(320.63, 117.88);
  vertex(333.86, 127.75);
  vertex(351.62, 126.37);
  vertex(362.48, 138.01);
  vertex(375.9, 141.37);
  vertex(385.96, 149.66);
  vertex(403.33, 149.06);
  vertex(403.33, 181.63);
  vertex(264.38, 153.6);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(14);
  text("Chapinero", 330, 150);
}

// Barrios Unidos
function drawBarriosUnidos() {
  let centroX = 295;
  let centroY = 200;
  // fill(255, 0, 0);
  // ellipse(centroX, centroY, 80, 60);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 70 ? 100 : 255;

  fill(0, 153, 204, transparencia);
  stroke(0);
  beginShape();
  vertex(251.03, 163.33);
  vertex(335.93, 177.52);
  vertex(337.55, 200.09);
  vertex(333.86, 208.54);
  vertex(296.24, 232.44);
  vertex(288.43, 229.04);
  vertex(264.38, 207.57);
  vertex(251.03, 206.92);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(10);
  text("Barrios Unidos", 290, 200);
}

// Teusaquillo no me funciona
function drawTeusaquillo() {
  let centroX = 363;
  let centroY = 226;
  //fill(255, 0, 0);
  // ellipse(centroX, centroY, 80, 60);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 70 ? 100 : 255;

  stroke(0);
  fill(0, 102, 204, transparencia);
  stroke(0);
  beginShape();
  vertex(345.36, 179.92);
  vertex(403.81, 190.0);
  vertex(403.33, 226.43);
  vertex(335.6, 271.0);
  vertex(296.24, 238.83);
  vertex(340.81, 209.52);
  vertex(345.36, 197.73);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(10);
  text("Teusaquillo", 360, 230);
}

// Santa Fe
function drawSantaFe() {
  let centroX = 467;
  let centroY = 198;
  //fill(255, 0, 0);
  //  ellipse(centroX, centroY, 100, 30);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 30 ? 100 : 255;

  fill(255, 102, 102, transparencia);
  stroke(0);
  beginShape();
  vertex(413.41, 155.19);
  vertex(427.5, 167.64);
  vertex(454.96, 170.93);
  vertex(458.62, 178.07);
  vertex(477.66, 183.01);
  vertex(477.66, 199.12);
  vertex(484.61, 211.75);
  vertex(489.37, 211.75);
  vertex(492.85, 203.7);
  vertex(493.58, 186.31);
  vertex(499.44, 180.63);
  vertex(507.49, 177.7);
  vertex(523.23, 185.94);
  vertex(523.23, 201.32);
  vertex(494.13, 230.42);
  vertex(487.91, 230.42);
  vertex(431.71, 189.05);
  vertex(423.47, 189.24);
  vertex(413.41, 193.26);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(10);
  text("Santa Fe", 455, 190);
}

// Candelaria
function drawCandelaria() {
  let centroX = 492;
  let centroY = 159;
  //  fill(255, 0, 0);
  //ellipse(centroX, centroY, 80, 28);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 50 ? 100 : 255;

  fill(255, 204, 0, transparencia);
  stroke(0);
  beginShape();
  vertex(472.16, 149.7);
  vertex(518.29, 149.7);
  vertex(518.29, 168.73);
  vertex(489.19, 177.15);
  vertex(487.54, 205.34);
  vertex(479.85, 177.52);
  vertex(460.08, 173.86);
  vertex(460.08, 159.03);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(10);
  text("Candelaria", 490, 160);
}

// Mártires
function drawMartires() {
  let centroX = 448;
  let centroY = 230;
  //  fill(255, 0, 0);
  // ellipse(centroX, centroY, 50, 40);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 30 ? 100 : 255;

  fill(255, 102, 102, transparencia);
  stroke(0);
  beginShape();
  vertex(428.29, 197.73);
  vertex(486.14, 241.37);
  vertex(463.61, 267.15);
  vertex(422, 223.1);
  vertex(411.45, 217.82);
  vertex(411.45, 207.27);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(10);
  text("Mártires", 450, 230);
}

// Antonio Nariño
function drawAntonioNarino() {
  let centroX = 492;
  let centroY = 271;
  // fill(255, 0, 0);
  // ellipse(centroX, centroY, 45, 38);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 28 ? 100 : 255;
  fill(255, 204, 0, transparencia);
  stroke(0);
  beginShape();
  vertex(497.71, 238.83);
  vertex(521.68, 259.33);
  vertex(496.7, 289.78);
  vertex(495.07, 320.02);
  vertex(487.16, 332.81);
  vertex(486.48, 292.56);
  vertex(468.89, 273.13);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(7);
  text("Antonio Nariño", 495, 265);
}

// Rafael Uribe
function drawRafaelUribe() {
  let centroX = 535;
  let centroY = 308;
  // fill(255, 0, 0);
  // ellipse(centroX, centroY, 60, 40);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 38 ? 100 : 255;
  fill(255, 102, 102, transparencia);
  stroke(0);
  beginShape();
  vertex(530.68, 264.46);
  vertex(549.63, 277.43);
  vertex(551.63, 296.04);
  vertex(565.59, 296.71);
  vertex(573.24, 304.36);
  vertex(573.24, 313.33);
  vertex(599.83, 314.66);
  vertex(602.16, 319.32);
  vertex(576.23, 319.65);
  vertex(551.29, 333.61);
  vertex(542.65, 330.62);
  vertex(533.34, 333.61);
  vertex(512.73, 344.91);
  vertex(503.09, 323.97);
  vertex(506.81, 305.68);
  vertex(506.81, 291.48);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(10);
  text("Rafael Uribe", 540, 310);
}

// San Cristóbal
function drawSanCristobal() {
  let centroX = 572;
  let centroY = 228;
  // fill(255, 0, 0);
  // ellipse(centroX, centroY, 70, 50);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 38 ? 100 : 255;

  fill(255, 102, 102, transparencia);
  stroke(0);
  beginShape();
  vertex(506.81, 230.42);
  vertex(532.62, 205.34);
  vertex(533.73, 189.17);
  vertex(561.3, 176.15);
  vertex(567.26, 176.15);
  vertex(580.49, 185.42);
  vertex(568.8, 190.71);
  vertex(573.21, 197.11);
  vertex(574.1, 215.86);
  vertex(600.35, 216.08);
  vertex(602.55, 209.46);
  vertex(641.38, 212.11);
  vertex(662.78, 233.51);
  vertex(648.66, 250.28);
  vertex(620.87, 251.38);
  vertex(608.95, 266.16);
  vertex(572.33, 267.71);
  vertex(562.18, 281.82);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(14);
  text("San Cristóbal", 590, 230);
}

// Usme
function drawUsme() {
  let centroX = 677;
  let centroY = 291;
  //  fill(255, 0, 0);
  // ellipse(centroX, centroY, 90, 70);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 40 ? 100 : 255;
  fill(0, 102, 204, transparencia);
  stroke(0);
  beginShape();
  vertex(720.27, 215.36);
  vertex(720.27, 246.73);
  vertex(708.79, 245.18);
  vertex(705.7, 238.55);
  vertex(694.87, 254.68);
  vertex(694.43, 262.41);
  vertex(717.18, 261.97);
  vertex(729.11, 270.58);
  vertex(754.95, 269.7);
  vertex(754.95, 284.94);
  vertex(746.78, 292.23);
  vertex(745.01, 315.86);
  vertex(721.82, 311.66);
  vertex(714.75, 313.21);
  vertex(707.24, 329.56);
  vertex(706.36, 339.05);
  vertex(669.91, 333.53);
  vertex(662.51, 342.15);
  vertex(644.73, 330.88);
  vertex(640.76, 321.6);
  vertex(612.26, 320.72);
  vertex(610.27, 305.92);
  vertex(582.89, 304.15);
  vertex(570.07, 286.7);
  vertex(579.13, 276.99);
  vertex(608.07, 278.97);
  vertex(622.86, 269.26);
  vertex(623.75, 260.42);
  vertex(654.45, 260.42);
  vertex(668.81, 237.89);
  vertex(688.02, 237.89);
  vertex(695.53, 223.31);
  vertex(703.27, 216.69);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Usme", 690, 280);
}

// Sumapaz
function drawSumapaz() {
  let centroX = 752;
  let centroY = 228;
  // fill(255, 0, 0);
  //ellipse(centroX, centroY, 50, 60);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 38 ? 100 : 255;

  fill(255, 204, 0, transparencia);
  stroke(0);
  beginShape();
  vertex(728.66, 208.4);
  vertex(769, 201.5);
  vertex(769, 220.81);
  vertex(780.38, 220.47);
  vertex(783.5, 240.81);
  vertex(770.04, 240.81);
  vertex(769.35, 256.67);
  vertex(725.9, 256.67);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(10);
  text("Sumapaz", 755, 230);
}

// Ciudad Bolívar
function drawCiudadBolivar() {
  let centroX = 579;
  let centroY = 432;
  // fill(255, 0, 0);
  // ellipse(centroX, centroY, 120, 132);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 50 ? 100 : 255;
  fill(255, 102, 102, transparencia);
  stroke(0);
  beginShape();
  vertex(632.74, 330.95);
  vertex(634.41, 336.94);
  vertex(618.12, 357.28);
  vertex(642.05, 384.14);
  vertex(637.64, 391.02);
  vertex(642.05, 399.1);
  vertex(634.74, 411.74);
  vertex(620.11, 414.06);
  vertex(602.16, 413.07);
  vertex(601.5, 417.25);
  vertex(609.47, 423.04);
  vertex(613.46, 432.68);
  vertex(600.5, 432.68);
  vertex(592.85, 439);
  vertex(582.88, 425.04);
  vertex(581.91, 405.26);
  vertex(562.1, 408.75);
  vertex(539.93, 405.51);
  vertex(535, 414.73);
  vertex(544.64, 423.04);
  vertex(544.98, 437);
  vertex(552.62, 447.64);
  vertex(541.65, 458.28);
  vertex(535.34, 444.98);
  vertex(528.69, 456.62);
  vertex(503.09, 452.24);
  vertex(495.44, 471.58);
  vertex(492.78, 483.88);
  vertex(486.13, 483.88);
  vertex(482.14, 475.57);
  vertex(482.14, 432.68);
  vertex(506.81, 432.68);
  vertex(509.07, 405.42);
  vertex(609.8, 347.57);
  vertex(609.8, 339.93);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(12);
  text("Ciudad Bolívar", 580, 395);
}

// Tunjuelito
function drawTunjuelito() {
  let centroX = 519;
  let centroY = 364;
  // fill(255, 0, 0);
  //ellipse(centroX, centroY, 70, 34);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 38 ? 100 : 255;
  fill(0, 153, 204, transparencia);
  stroke(0);
  beginShape();
  vertex(497.77, 334.28);
  vertex(504.75, 349.57);
  vertex(513.39, 351.56);
  vertex(539.32, 339.93);
  vertex(549.63, 342.92);
  vertex(557.61, 342.92);
  vertex(578.89, 327.29);
  vertex(618.12, 330.29);
  vertex(604.49, 332.95);
  vertex(602.16, 342.15);
  vertex(501.09, 399.1);
  vertex(500.43, 423.04);
  vertex(484.14, 423.04);
  vertex(487.46, 344.91);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(12);
  text("Tunjuelito", 538, 360);
}

// Puente Aranda
function drawPuenteAranda() {
  let centroX = 421;
  let centroY = 293;
  //  fill(255, 0, 0);
  //ellipse(centroX, centroY, 85, 50);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 40 ? 100 : 255;
  fill(255, 204, 0, transparencia);
  stroke(0);
  beginShape();
  vertex(378.77, 254.16);
  vertex(409.62, 232.44);
  vertex(416.32, 232.44);
  vertex(475.82, 294.2);
  vertex(478.63, 355.85);
  vertex(448.79, 337.98);
  vertex(441.89, 322.76);
  vertex(417.13, 330.07);
  vertex(373.29, 308.15);
  vertex(365.57, 292.92);
  vertex(383.23, 275.87);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(14);
  text("Puente Aranda", 420, 300);
}

// Bosa
function drawBosa() {
  let centroX = 432;
  let centroY = 526;
  //fill(255, 0, 0);
  //ellipse(centroX, centroY, 85, 43);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 40 ? 100 : 255;
  fill(0, 102, 204, transparencia);
  stroke(0);
  beginShape();
  vertex(476.11, 404.95);
  vertex(473.91, 476.96);
  vertex(478.63, 491.74);
  vertex(477.75, 503.75);
  vertex(466.99, 540.79);
  vertex(403.81, 540.79);
  vertex(398.13, 510.61);
  vertex(391.84, 510.29);
  vertex(386.98, 516.06);
  vertex(378, 520.35);
  vertex(374.91, 513.73);
  vertex(373.6, 510.92);
  vertex(394.67, 498.66);
  vertex(389.32, 475.07);
  vertex(419.19, 471.93);
  vertex(420.27, 491.04);
  vertex(429.57, 510.92);
  vertex(441.36, 503.75);
  vertex(441.21, 487.65);
  vertex(467.62, 463.12);
  vertex(467.41, 444.31);
  vertex(464.16, 434.19);
  vertex(469.07, 417.43);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(14);
  text("Bosa", 430, 520);
}

// Kennedy
function drawKennedy() {
  let centroX = 419;
  let centroY = 394;
  // fill(255, 0, 0);
  // ellipse(centroX, centroY, 100, 80);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 40 ? 100 : 255;
  fill(0, 153, 204, transparencia);
  stroke(0);
  beginShape();
  vertex(377.87, 322.89);
  vertex(417.21, 341.09);
  vertex(434.83, 334.04);
  vertex(440.7, 342.85);
  vertex(478.63, 366.34);
  vertex(477.4, 395.7);
  vertex(463.9, 407.42);
  vertex(456.62, 437.34);
  vertex(461.55, 448.55);
  vertex(463.02, 459.71);
  vertex(435.12, 479.09);
  vertex(432.77, 487.02);
  vertex(432.42, 497.88);
  vertex(432.19, 503.75);
  vertex(425.73, 493.18);
  vertex(425.73, 477.91);
  vertex(430.13, 472.04);
  vertex(424.55, 465.58);
  vertex(411.63, 464.99);
  vertex(401.95, 447.96);
  vertex(371.41, 465.58);
  vertex(359.37, 456.19);
  vertex(373.17, 444.73);
  vertex(365.57, 430.35);
  vertex(381.1, 413.32);
  vertex(378.46, 388.36);
  vertex(372.29, 379.26);
  vertex(362.31, 378.38);
  vertex(348.51, 372.21);
  vertex(337.44, 367.53);
  vertex(328.98, 359.29);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Kennedy", 420, 400);
}

// Fontibón
function drawFontibon() {
  let centroX = 268;
  let centroY = 386;
  //  fill(255, 0, 0);
  // ellipse(centroX, centroY, 100, 80);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 45 ? 100 : 255;
  fill(0, 102, 204, transparencia);
  stroke(0);
  beginShape();
  vertex(246.8, 324.34);
  vertex(257.86, 333.78);
  vertex(370.41, 258.96);
  vertex(373.6, 271);
  vertex(351.54, 291.48);
  vertex(369.43, 315.56);
  vertex(315.76, 362.08);
  vertex(310.55, 371.84);
  vertex(314.46, 388.1);
  vertex(318.36, 415.1);
  vertex(304.05, 429.09);
  vertex(302.42, 443.72);
  vertex(277.7, 462.59);
  vertex(257.21, 441.45);
  vertex(241.27, 450.23);
  vertex(215.9, 439.5);
  vertex(215.57, 430.71);
  vertex(209.39, 425.18);
  vertex(206.79, 408.27);
  vertex(196.7, 408.27);
  vertex(194.43, 390.7);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Fontibón", 270, 380);
}

// Engativá
function drawEngativa() {
  let centroX = 217;
  let centroY = 293;
  //  fill(255, 0, 0);
  // ellipse(centroX, centroY, 120, 80);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 45 ? 100 : 255;
  fill(255, 102, 102, transparencia);
  stroke(0);
  beginShape();
  vertex(259.16, 218.95);
  vertex(328.98, 275.23);
  vertex(257.86, 321.09);
  vertex(245.5, 311.01);
  vertex(185.64, 388.75);
  vertex(181.42, 408.59);
  vertex(166.45, 418.35);
  vertex(168.73, 395.91);
  vertex(153.44, 366.96);
  vertex(155.72, 352.97);
  vertex(162.22, 345.81);
  vertex(158, 331.5);
  vertex(129.37, 332.8);
  vertex(131.32, 317.84);
  vertex(210.37, 240.75);
  vertex(241.59, 238.79);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(16);
  text("Engativá", 220, 295);
}

// Suba
function drawSuba() {
  let centroX = 126;
  let centroY = 205;
  //fill(255, 0, 0);
  // ellipse(centroX, centroY, 170, 140);
  let d = dist(mouseX, mouseY, centroX, centroY);
  let transparencia = d < 45 ? 100 : 255;
  fill(0, 102, 204, transparencia);
  stroke(0);
  beginShape();
  vertex(39.59, 121.37);
  vertex(242.24, 158.12);
  vertex(241.59, 210.82);
  vertex(253.63, 216.02);
  vertex(237.69, 228.71);
  vertex(206.14, 230.66);
  vertex(127.42, 313.28);
  vertex(117.33, 336.05);
  vertex(108.55, 315.24);
  vertex(108.55, 284.44);
  vertex(68.87, 254.08);
  vertex(57.16, 258.96);
  vertex(35.36, 232.44);
  vertex(71.79, 204.96);
  vertex(111.48, 203.34);
  vertex(126.77, 192.93);
  vertex(111.15, 181.63);
  vertex(65.29, 179.92);
  vertex(50.98, 177.64);
  vertex(39.59, 163.33);
  endShape(CLOSE);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(18);
  text("Suba", 140, 220);
}
