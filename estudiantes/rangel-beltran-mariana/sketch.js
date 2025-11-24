//Plantilla para la entrega final
//Mariana Rangel 
//Bogotá a Bogotá
//El proyecto propone un sistema generativo que permite crear y modificar personajes ilustrados que reflejen la diversidad de moda y estilos en bogotá. 
//Los usuarios pueden cambiar el estilo, los colores, la ropa, los peinados y los accesorios, generando combinaciones únicas que celebran la pluralidad visual de la ciudad
//Hice el uso de IA para definir cambios de colores dependiendo del estilo y para estructurarlos 


// ==================== VARIABLES GLOBALES ====================
let colorRopa, colorPiel, colorFondo;
let nombreInput, botonColor, botonTamano, botonAccesorios, botonFondo, botonReset;
let selectorEstilo;
let nombre = "";

let estiloActual = "punk";
let mostrarAccesorios = true;
let tamanoPersonaje = 1; // 1 = normal/grande, 0.75 = pequeño

// Atributos del personaje
let peloColor, peloForma;
let accesorioColor;

// Paletas "raw" (RGB arrays) 
const paletasRaw = {
  punk: [
    [10, 10, 10],    
    [200, 10, 10],   
    [140, 10, 120]   
  ],
  "gótico": [
    [10, 10, 10],    
    [60, 60, 60],    
    [120, 120, 120]  
  ],
  "hip-hop": [
    [240, 200, 20],  
    [255, 255, 255], 
    [10, 20, 80]     
  ],
  vintage: [
    [200, 180, 150], 
    [160, 130, 100], 
    [140, 110, 80]  
  ],
  alternativo: [
    [0, 200, 180],   
    [255, 0, 255],   
    [0, 180, 255],   
    [255, 120, 0]    
  ]
};

// paletas convertidas a color() — se llenarán en setup
let paletas = {};


// ==================== SETUP ====================
function setup() {
  // NO EDITAR ESTA LÍNEA: crea canvas pantalla completa y lo centra
  createCanvas(windowWidth, windowHeight).parent("canvasContainer");

  rectMode(CENTER);
  angleMode(DEGREES);
  noSmooth();

  // Convertir paletasRaw a colores p5
  for (let k in paletasRaw) {
    paletas[k] = paletasRaw[k].map(rgb => color(rgb[0], rgb[1], rgb[2]));
  }

  // valores iniciales neutrales
  colorRopa = color(30);
  colorPiel = color(235, 200, 170);
  colorFondo = color(28);

  // Input nombre
  nombreInput = createInput();
  nombreInput.attribute("placeholder", "Escribe un nombre");
  nombreInput.parent("controls");

  // Selector de estilo
  selectorEstilo = createSelect();
  selectorEstilo.option("punk");
  selectorEstilo.option("gótico");
  selectorEstilo.option("hip-hop");
  selectorEstilo.option("vintage");
  selectorEstilo.option("alternativo");
  selectorEstilo.changed(cambiarEstilo);
  selectorEstilo.parent("controls");

  // Botones
  botonColor = createButton("Cambiar color de ropa");
  botonColor.mousePressed(cambiarColor);
  botonColor.parent("controls");

  botonAccesorios = createButton("Mostrar/ocultar accesorios");
  botonAccesorios.mousePressed(() => (mostrarAccesorios = !mostrarAccesorios));
  botonAccesorios.parent("controls");

  botonTamano = createButton("Tamaño personaje (Grande/Pequeño)");
  botonTamano.mousePressed(cambiarTamano);
  botonTamano.parent("controls");

  botonFondo = createButton("Cambiar fondo");
  botonFondo.mousePressed(cambiarFondo);
  botonFondo.parent("controls");

  botonReset = createButton("Restablecer personaje");
  botonReset.mousePressed(resetPersonaje);
  botonReset.parent("controls");

  aplicarEstilo("punk");
}


// ==================== AJUSTE DE PANTALLA ====================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


// ==================== DRAW ====================
function draw() {
  background(colorFondo);

  fill(255);
  textAlign(CENTER);
  textSize(18);
  text("Estilo: " + estiloActual, width / 2, 30);

  if (nombre !== "") {
    textSize(16);
    text("Nombre: " + nombre, width / 2, 50);
  }

  drawPersonaje();
}


// ==================== DIBUJAR PERSONAJE ====================
function drawPersonaje() {
  push();
  translate(width / 2, height / 2 + 40);
  scale(tamanoPersonaje);

  // sombra
  noStroke();
  fill(0, 70);
  ellipse(0, 210, 220, 40);

  // pantalones
  let pantalones = lerpColor(colorRopa, color(0), 0.14);
  fill(pantalones);
  rect(0, 130, 140, 160, 20);

  // pliegues
  stroke(10, 10, 10, 90);
  strokeWeight(1.2);
  line(-20, 60, -20, 190);
  line(20, 60, 20, 190);
  noStroke();

  // zapatos
  fill(22);
  rect(-35, 200, 70, 24, 8);
  rect(35, 200, 70, 24, 8);

  // torso
  fill(colorRopa);
  rect(0, -10, 180, 180, 28);

  // sombra lateral
  fill(red(colorRopa) * 0.7, green(colorRopa) * 0.7, blue(colorRopa) * 0.7, 230);
  rect(40, -10, 34, 160, 18);

  // cuello
  fill(colorPiel);
  rect(0, -96, 44, 34, 6);

  // cabeza
  let sombraPiel = color(red(colorPiel) * 0.84, green(colorPiel) * 0.84, blue(colorPiel) * 0.84);
  fill(sombraPiel);
  ellipse(10, -148, 94, 110);
  fill(colorPiel);
  ellipse(-6, -148, 94, 110);

  // orejas
  fill(colorPiel);
  ellipse(-50, -140, 16, 22);
  ellipse(50, -140, 16, 22);

  drawPelo();
  drawRostroRealista();

  // brazos
  fill(colorRopa);
  rect(-98, 8, 42, 140, 20);
  rect(98, 8, 42, 140, 20);

  fill(colorPiel);
  ellipse(-98, 80, 36, 32);
  ellipse(98, 80, 36, 32);

  if (mostrarAccesorios) drawAccesorios();

  pop();
}


// ==================== ROSTRO ====================
function drawRostroRealista() {
  fill(30);
  ellipse(-18, -156, 12, 13);
  ellipse(18, -156, 12, 13);

  fill(255);
  ellipse(-16, -158, 4, 4);
  ellipse(20, -158, 4, 4);

  stroke(20);
  strokeWeight(3);
  line(-30, -168, -6, -165);
  line(6, -165, 30, -168);
  noStroke();

  stroke(30);
  strokeWeight(1.2);
  line(0, -150, -2, -144);
  noStroke();

  fill(40);
  arc(0, -136, 34, 14, 0, 180);

  if (estiloActual === "gótico") {
    push();
    noStroke();
    fill(20, 20, 20, 210);
    ellipse(-18, -162, 18, 10);
    ellipse(18, -162, 18, 10);
    ellipse(-18, -152, 18, 6);
    ellipse(18, -152, 18, 6);
    fill(30);
    rect(0, -128, 22, 6, 4);
    pop();
  }
}


// ==================== PELO ====================
function drawPelo() {
  noStroke();
  let brillo = color(min(red(peloColor) + 60, 255), min(green(peloColor) + 60, 255), min(blue(peloColor) + 60, 255));

  if (peloForma === "cresta") {
    push();
    translate(0, -200);
    for (let i = -40; i <= 40; i += 12) {
      fill(peloColor);
      beginShape();
      vertex(i - 6, 0);
      vertex(i, -70 + random(-8, 8));
      vertex(i + 6, 0);
      endShape(CLOSE);
      fill(brillo);
      beginShape();
      vertex(i - 3, -6);
      vertex(i, -62 + random(-6, 6));
      vertex(i + 3, -6);
      endShape(CLOSE);
    }
    pop();
  }

  else if (peloForma === "melena-gotica" || peloForma === "largo") {
    push();
    translate(0, -170);
    fill(peloColor);
    ellipse(0, 0, 140, 130);
    rect(-58, -40, 40, 160, 22);
    rect(58, -40, 40, 160, 22);
    fill(brillo);
    ellipse(-10, -10, 70, 60);
    pop();
  }

  else if (peloForma === "rastas") {
    strokeWeight(8);
    stroke(peloColor);
    for (let i = -36; i <= 36; i += 14) {
      let x2 = i + random(-4, 4);
      let y2 = -120 + random(-10, 10);
      line(i, -200, x2, y2);
      stroke(brillo);
      strokeWeight(3);
      line(i + 2, -200, x2 + 2, y2);
    }
    noStroke();
  }

  else if (peloForma === "despeinado") {
    push();
    for (let i = 0; i < 12; i++) {
      fill(peloColor);
      ellipse(random(-48, 48), random(-205, -150), random(26, 56), random(10, 26));
    }
    fill(brillo);
    pop();
  }
}


// ==================== ACCESORIOS ====================
function drawAccesorios() {
  push();
  noStroke();

  if (estiloActual === "punk") {
    fill(accesorioColor);
    ellipse(-45, -180, 10, 10);
    ellipse(45, -180, 10, 10);
    ellipse(0, -150, 6, 6);
    stroke(accesorioColor);
    strokeWeight(3.2);
    noFill();
    arc(0, -70, 160, 64, 0, 180);
    arc(0, -58, 190, 76, 0, 180);
    noStroke();
  }

  if (estiloActual === "gótico") {
    fill(20);
    rect(0, -96, 98, 14, 8);
    fill(accesorioColor);
    ellipse(0, -96, 12, 12);
  }

  if (estiloActual === "hip-hop") {
    fill(accesorioColor);
    rect(0, -60, 200, 24, 12);
    rect(0, -40, 220, 24, 12);
    stroke(accesorioColor);
    strokeWeight(2);
    line(80, 20, 120, 60);
    noStroke();
  }

  if (estiloActual === "vintage") {
    push();
    translate(0, -240);
    fill(lerpColor(colorRopa, color(0), 0.12));
    ellipse(0, 0, 140, 52);
    fill(lerpColor(colorRopa, color(255), 0.25));
    ellipse(20, -8, 14, 9);
    pop();
  }

  if (estiloActual === "alternativo") {
    fill(accesorioColor);
    ellipse(-44, -180, 12, 12);
    ellipse(44, -180, 12, 12);
    fill(lerpColor(accesorioColor, color(0), 0.18));
    rect(-28, 8, 34, 20, 6);
  }

  pop();
}


// ==================== CAMBIAR ESTILO ====================
function cambiarEstilo() {
  aplicarEstilo(selectorEstilo.value());
}

function aplicarEstilo(estilo) {
  estiloActual = estilo;

  if (estilo === "punk") {
    colorPiel = color(240, 210, 185);
    colorRopa = color(10, 10, 10);
    colorFondo = color(30, 6, 6);
    peloColor = color(200, 10, 10);
    peloForma = "cresta";
    accesorioColor = color(220);
  } 
  
  else if (estilo === "gótico") {
    colorPiel = color(235, 220, 205);
    colorRopa = color(10, 10, 10);
    colorFondo = color(8, 8, 12);
    peloColor = color(18, 18, 20);
    peloForma = "melena-gotica";
    accesorioColor = color(150);
  } 
  
  else if (estilo === "hip-hop") {
    colorPiel = color(210, 160, 120);
    colorRopa = color(240, 200, 20);
    colorFondo = color(18, 18, 48);
    peloColor = color(20, 20, 20);
    peloForma = "rastas";
    accesorioColor = color(240, 200, 60);
  } 
  
  else if (estilo === "vintage") {
    colorPiel = color(232, 202, 172);
    colorRopa = color(200, 180, 150);
    colorFondo = color(220, 200, 170);
    peloColor = color(140, 90, 45);
    peloForma = "coleta"; // aunque la forma no esté dibujada, se respeta tu código original
    accesorioColor = color(170, 140, 120);
  } 
  
  else if (estilo === "alternativo") {
    colorPiel = color(235, 195, 170);
    colorRopa = color(0, 200, 180);
    colorFondo = color(60, 0, 80);
    peloColor = color(random(120, 255), 0, random(120, 255));
    peloForma = "despeinado";
    accesorioColor = color(255, 0, 200);
  }
}


// ==================== CAMBIAR COLOR DE ROPA ====================
function cambiarColor() {
  let pal = paletasRaw[estiloActual];
  if (!pal) return;
  let idx = floor(random(pal.length));
  let rgb = pal[idx];
  colorRopa = color(rgb[0], rgb[1], rgb[2]);
}


// ==================== CAMBIAR TAMAÑO ====================
function cambiarTamano() {
  tamanoPersonaje = tamanoPersonaje === 1 ? 0.75 : 1;
}


// ==================== CAMBIAR FONDO ====================
function cambiarFondo() {
  if (estiloActual === "punk")
    colorFondo = color(random([0, 20, 40]), 0, 0);
  else if (estiloActual === "gótico")
    colorFondo = color(random([0, 10, 20]));
  else if (estiloActual === "hip-hop")
    colorFondo = color(random([10, 40, 70]), random([10, 40]), random([40, 100]));
  else if (estiloActual === "vintage")
    colorFondo = color(random([180, 200, 220]), random([160, 180]), random([130, 150]));
  else if (estiloActual === "alternativo")
    colorFondo = color(random([40, 80, 120]), 0, random([80, 160]));
}


// ==================== RESET ====================
function resetPersonaje() {
  aplicarEstilo("punk");
  tamanoPersonaje = 1;
}


// ==================== ENTER PARA NOMBRE ====================
function keyPressed() {
  if (keyCode === ENTER) {
    nombre = nombreInput.value();
  }
}

