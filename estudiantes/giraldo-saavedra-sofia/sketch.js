// Parte 1
// Plantilla para la entrega final
// -------------------------------

// Nombre: Sofia
// Proyecto: Bogotá Café Generator
// Descripción breve: Programa interactivo que mezcla sliders de ingredientes, frases poéticas y exporta una postal.
// Referentes: generadores editoriales, poesía visual, interfaces interactivas
// Uso de IA: apoyo en depuración de código, organización de estados y expansión del banco de frases poéticas.

// -------------------------------
// Variables globales
// -------------------------------
let estado = "introduccion"; 
let ilustraciones = [];      
let fondoImg;                
let fuenteAstrale, fuenteChopsticks; 
let frase = "";              
let nombreCafe = "";         
let aguaSlider, espressoSlider, lecheSlider; 
let modoPostal = "ver";      

// -------------------------------
// PRELOAD: carga imágenes y fuentes antes de iniciar
// -------------------------------
function preload() {
  ilustraciones[0] = loadImage("capuccino.png");
  ilustraciones[1] = loadImage("Mochaccino.png");
  ilustraciones[2] = loadImage("expresso.png");
  ilustraciones[3] = loadImage("latte.png");
  ilustraciones[4] = loadImage("latte frio.png");
  ilustraciones[5] = loadImage("Americano.png");

  fuenteAstrale = loadFont("Astrale Couture.ttf");
  fuenteChopsticks = loadFont("Chopsticks.ttf");
  fondoImg = loadImage("paisaje.png");
}

// -------------------------------
// Estilo visual para sliders
// -------------------------------
function estilizarSlider(slider, fondo, thumb) {
  slider.style("width", "180px");
  slider.style("background", fondo);
  slider.style("accent-color", thumb);
  slider.style("border", "none");
  slider.style("height", "6px");
  slider.style("border-radius", "4px");
  slider.style("margin-bottom", "12px");
}

// -------------------------------
// SETUP: crea canvas y sliders
// -------------------------------
function setup() {
  createCanvas(600, 600).parent("canvasContainer"); 
  noLoop(); 

 // Slider de agua
aguaSlider = createSlider(0, 200, 60);
aguaSlider.parent("canvasContainer"); // ← clave: lo mete dentro del contenedor
estilizarSlider(aguaSlider, "rgb(230,240,255)", "rgb(100,150,255)");
aguaSlider.position(40, 110);
aguaSlider.hide();
aguaSlider.input(() => { actualizarFrase(); redraw(); });

// Slider de espresso
espressoSlider = createSlider(0, 120, 40);
espressoSlider.parent("canvasContainer");
estilizarSlider(espressoSlider, "rgb(240,220,210)", "rgb(92,59,30)");
espressoSlider.position(40, 185);
espressoSlider.hide();
espressoSlider.input(() => { actualizarFrase(); redraw(); });

// Slider de leche
lecheSlider = createSlider(0, 200, 80);
lecheSlider.parent("canvasContainer");
estilizarSlider(lecheSlider, "rgb(255,245,230)", "rgb(230,200,161)");
lecheSlider.position(40, 245);
lecheSlider.hide();
lecheSlider.input(() => { actualizarFrase(); redraw(); });

actualizarFrase(); 
redraw();

}

// -------------------------------
// DRAW: muestra contenido según el estado
// -------------------------------
function draw() {
  background(255);
  textWrap(WORD);

  // INTRODUCCIÓN
  if (estado === "introduccion") {
    image(fondoImg, 0, 0, width, height);
    textFont(fuenteAstrale);
    textSize(26);
    fill(92, 59, 30);
    text("Bienvenido al Bogotá Café Generador", 40, 80, 520);
    textSize(18);
    fill(60, 60, 60);
    text("Un nuevo sabor para ti", 40, 120, 520);

    fill(74, 144, 226);
    rect(220, 480, 160, 40, 10);
    fill(255);
    textFont(fuenteAstrale);
    textSize(18);
    text("Entrar al menú", 240, 505);
  }

  // BIENVENIDA
  else if (estado === "bienvenida") {
    image(fondoImg, 0, 0, width, height);
    textFont(fuenteAstrale);
    textSize(24);
    fill(92, 59, 30);
    text("Sabores que te recuerdan a tu hogar", 40, 80, 520);

    for (let i = 0; i < ilustraciones.length; i++) {
      let x = 60 + (i % 3) * 150;
      let y = i < 3 ? 160 : 280;
      image(ilustraciones[i], x, y, 100, 100);
    }

    fill(92, 59, 30);
    rect(60, 480, 160, 40, 10);
    fill(255);
    textFont(fuenteAstrale);
    textSize(18);
    text("Café sorpresa", 75, 505);

    fill(74, 144, 226);
    rect(280, 480, 160, 40, 10);
    fill(255);
    text("Comenzar", 320, 505);
  }

  // GENERADOR
  else if (estado === "generador") {
    image(fondoImg, 0, 0, width, height);
    textFont(fuenteAstrale);
    textSize(24);
    fill(92, 59, 30);
    text("Sabores que te recuerdan a tu hogar", 40, 80, 520);

    textFont(fuenteChopsticks);
    textSize(16);
    fill(100, 150, 255); text("Agua", 40, 125);
    fill(92, 59, 30);    text("Espresso", 40, 185);
    fill(230, 200, 161); text("Leche", 40, 245);

    textFont(fuenteAstrale);
    textSize(18);
    fill(240, 230, 220);
    text(frase, 40, 320, 520);

    textSize(20);
    fill(255,255,255);
    text("El café aún espera tu toque", 40, 360, 520);

    dibujarVaso(380, 360, 120, 200);

    fill(30, 70, 90);
    rect(60, 520, 160, 40, 10);
    fill(255);
    textFont(fuenteAstrale);
    textSize(16);
    text("Regresar al menú", 75, 545);

    fill(74, 144, 226);
    rect(280, 520, 160, 40, 10);
    fill(255);
    text("Crear postal", 315, 545);
  }

  // POSTAL
  else if (estado === "postal") {
    image(fondoImg, 0, 0, width, height);

    textFont(fuenteAstrale);
    textSize(28);
    fill(92, 59, 30);
    text("Postcard", 240, 80);

    textFont(fuenteAstrale);
    textSize(22);
    fill(92, 59, 30);
    text("Sabores que te recuerdan a tu hogar", 40, 120, 520);

    textSize(18);
    fill(60, 60, 60);
    text(frase, 40, 160, 520);

    textSize(16);
    fill(80, 50, 20);
    text("Tu café: " + nombreCafe, 40, 200, 520);

    dibujarVaso(380, 260, 120, 200);

    if (modoPostal === "ver") {
      fill(74, 144, 226);
      rect(280, 520, 160, 40, 10);
      fill(255);
      textFont(fuenteAstrale);
      textSize(16);
      text("Descargar postal", 295, 545);

      fill(30, 70, 90);
      rect(60, 520, 160, 40, 10);
      fill(255);
      text("Volver al inicio", 85, 545);
    }
  }
}
// Parte 2
// Dibuja el vaso con capas de ingredientes
// -------------------------------
function dibujarVaso(vasoX, vasoY, vasoAncho, vasoAlto) {
  stroke(120, 120, 120, 100);
  strokeWeight(1.5);
  noFill();
  rect(vasoX, vasoY - vasoAlto, vasoAncho, vasoAlto, 20);

  let nivel = 0;
  let agua = aguaSlider.value();
  let leche = lecheSlider.value();
  let espresso = espressoSlider.value();

  // Agua
  let aguaAltura = map(agua, 0, 500, 0, vasoAlto);
  fill(100, 150, 255, 150);
  rect(vasoX, vasoY - nivel - aguaAltura, vasoAncho, aguaAltura, 10);
  nivel += aguaAltura;

  // Leche
  let lecheAltura = map(leche, 0, 500, 0, vasoAlto);
  fill(255, 240, 200, 200);
  rect(vasoX, vasoY - nivel - lecheAltura, vasoAncho, lecheAltura, 10);
  nivel += lecheAltura;

  // Espresso
  let espressoAltura = map(espresso, 0, 500, 0, vasoAlto);
  fill(92, 59, 30, 220);
  rect(vasoX, vasoY - nivel - espressoAltura, vasoAncho, espressoAltura, 10);

  // Espuma decorativa
  fill(240, 230, 220, 160);
  for (let x = vasoX + 10; x < vasoX + vasoAncho - 10; x += 18) {
    ellipse(x, vasoY - nivel - espressoAltura + 8, random(10, 16), random(6, 10));
  }
}

// -------------------------------
// Interacciones con el mouse
// -------------------------------
function mousePressed() {
  if (estado === "introduccion") {
    if (mouseX > 220 && mouseX < 380 && mouseY > 480 && mouseY < 520) {
      estado = "bienvenida";
      redraw();
    }
  }

  else if (estado === "bienvenida") {
    if (mouseX > 60 && mouseX < 220 && mouseY > 480 && mouseY < 520) {
      aguaSlider.value(random(50, 150));
      espressoSlider.value(random(30, 100));
      lecheSlider.value(random(50, 150));
      actualizarFrase();
      estado = "postal";
      redraw();
    }

    if (mouseX > 280 && mouseX < 440 && mouseY > 480 && mouseY < 520) {
      estado = "generador";
      aguaSlider.show();
      espressoSlider.show();
      lecheSlider.show();
      redraw();
    }
  }

  else if (estado === "generador") {
    if (mouseX > 60 && mouseX < 220 && mouseY > 520 && mouseY < 560) {
      estado = "bienvenida";
      aguaSlider.hide();
      espressoSlider.hide();
      lecheSlider.hide();
      redraw();
    }

    if (mouseX > 280 && mouseX < 440 && mouseY > 520 && mouseY < 560) {
      estado = "postal";
      aguaSlider.hide();
      espressoSlider.hide();
      lecheSlider.hide();
      actualizarFrase();
      redraw();
    }
  }

  else if (estado === "postal") {
    if (modoPostal === "ver" && mouseX > 280 && mouseX < 440 && mouseY > 520 && mouseY < 560) {
      modoPostal = "guardar";
      redraw();
      saveCanvas("mi_postal_cafe", "png");
      modoPostal = "ver";
      redraw();
    }

    if (modoPostal === "ver" && mouseX > 60 && mouseX < 220 && mouseY > 520 && mouseY < 560) {
      estado = "introduccion";
      redraw();
    }
  }
}

// -------------------------------
// Genera frase poética y nombre de café
// -------------------------------
function actualizarFrase() {
  const agua = aguaSlider.value();
  const espresso = espressoSlider.value();
  const leche = lecheSlider.value();

  if (leche > espresso && leche > agua) {
    frase = random([
      "Suave como la neblina en Monserrate",
      "Dulce como la mañana bogotana",
      "Ligero como un abrazo de espuma",
      "Una nube de leche cubre la ciudad",
      "Blanco como la bruma sobre los cerros",
      "Tierno como la luz de Usaquén",
      "Espuma que acaricia la Séptima",
      "Leche que calma la tarde bogotana",
      "Cálido como un abrazo en Chapinero",
      "Suave como un domingo en el parque"
    ]);
  } else if (espresso > leche && espresso > agua) {
    frase = random([
      "Intenso como la lluvia en Chapinero",
      "Fuerte como el corazón de la ciudad",
      "Oscuro como la noche en la Candelaria",
      "Profundo como un secreto en San Victorino",
      "Amargo como la memoria del centro",
      "Espresso que late como la ciudad",
      "Sombras que despiertan en Chapinero",
      "Denso como la historia en La Candelaria",
      "Fuerte como un paso en la Séptima",
      "Oscuro como la madrugada en Kennedy"
    ]);
  } else if (agua > espresso && agua > leche) {
    frase = random([
      "Ligero como el río que cruza los cerros",
      "Claro como el cielo después de la tormenta",
      "Fresco como la brisa en Usaquén",
      "Transparente como la mañana en Suba",
      "Agua que limpia la memoria de la ciudad",
      "Ligero como un paseo por la Séptima",
      "Refrescante como la lluvia en los cerros",
      "Claro como un día en el parque Simón Bolívar",
      "Fresco como la brisa en el centro",
      "Agua que fluye como la vida bogotana"
    ]);
  } else {
    frase = random([
      "Equilibrado como la brisa en la Séptima",
      "Armonioso como un café compartido",
      "Sereno como la tarde en el parque",
      "Balanceado como la ciudad al amanecer",
      "Calmo como un domingo en Usaquén",
      "Armonía que se siente en cada sorbo",
      "Equilibrio como la vida bogotana",
      "Sereno como la neblina sobre Monserrate",
      "Armonioso como un encuentro en Chapinero",
      "Equilibrado como la mezcla de sabores en el café"
    ]);
  }

  const nombres = [
    "Bruma de Monserrate",
    "Chapinerazo",
    "Latte de la Séptima",
    "Tintico del Parque",
    "Espuma de Usaquén",
    "Niebla de la Candelaria",
    "Amanecer en Suba",
    "Cortado en San Victorino",
    "Río de los Cerros",
    "Equilibrio en la Séptima",
    "Surco de Usaquén"
  ];
  nombreCafe = random(nombres);
}

