// Sara Méndez Gómez
// Nombre del programa: Opciones gastronómicas: Bogotá en restaurantes
// Descripción: Generador de opciones gastronómicas en bogotá: recomienda restaurantes según la categoría de comida y los gustos de cada persona. Además, te permite guardar imagenes y las recomendaciones.
// Referentes/ para qué se usó la IA: Se usó p5.js como base para la visualización interactiva. Se usó Copilot para ordenar el código;para la lista de restaurantes en Bogotá; para generar recomendaciones a partir de las respuestas del usuario; para generar el random; también ayudo a estructurar el generador.

// VARIABLES GLOBALES:

// Lista de categorías de comida que el usuario puede elegir
let categorias = [
  "sushi",
  "italiana",
  "carnes",
  "típica",
  "vegana",
  "hamburguesas",
];

// Arreglo con los restaurantes de cada categoría (Cada fila corresponde a una categoría):
let restaurantes = [
  ["Viva la Vida Sushi", "Nigiri Septima", "Rollo Andino", "Sake Chapinero"], // sushi
  ["Trastevere 72", "Pasta del Parque", "Nonna Centro", "Via Norte"], // italiana
  ["Parrilla Andes", "Brasa 80", "Corte Capital", "Asadero Sur"], // carnes
  [
    "La Puerta Falsa",
    "Ajiaco de la Candelaria",
    "Bandeja Quinta",
    "Sancocho Local",
  ], // típica
  ["Casa Lelyte", "Huerta Urbana", "Planta Viva", "Vegana del Parque"], // vegana
  ["Burger Norte", "Carne y Pan", "La Cuadra Burger", "Doble Queso 85"], // hamburguesas
];

// Colores para cada categoría:
let catR = [74, 235, 200, 252, 60, 230];
let catG = [190, 196, 80, 209, 170, 170];
let catB = [255, 120, 70, 22, 100, 90];

// Ancho del panel derecho:
let panelW = 320;

// Listas con todos los restaurantes:
// restNombres: guarda el nombre del restaurante
// restCat: guarda la categoría de cada restaurante
let restNombres = [];
let restCat = [];

// categoría seleccionada actualmente (-1 significa que no hay ninguna todavía)
let categoriaActiva = -1;

// estilo del ícono de comida (1, 2 o 3 -> esto es para cambiar el dibujo)
let estiloIcono = 1;

// restaurante recomendado (sale al final del panel/abajo)
let recomendacion = "";

// Posición y velocidad del ícono animado (los dibujitos de la comida)
let iconX, iconY;
let velX, velY;

// Tamaño base del los dibujos:
let tamBase = 80;

// Modo claro/oscuro del fondo (false = oscuro, true = claro)
let modoClaro = false;

// Texto con los gustos que escribe la persona con el teclado
let textoGustos = "";

// Coordenadas y tamaños de los botones del panel derecho
let botonGenX, botonGenY, botonGenW, botonGenH;
let botonImgX, botonImgY, botonImgW, botonImgH;
let botonTxtX, botonTxtY, botonTxtW, botonTxtH;

// No use function preload

// FUNCTION SETUP:

function setup() {
  createCanvas(900, 910); // tamaño del canvas
  rectMode(CENTER); // para que el 0,0 sea en el centro
  noStroke();
  textSize(14);

  // Aquí "aplasto" la matriz de restaurantes:
  // restNombres = ["Viva la Vida Sushi", "Nigiri Septima", ...]
  // restCat = [0, 0, 0, 0, 1, 1, 1, ...] donde el número dice la categoría
  let c = 0;
  while (c < categorias.length) {
    let lista = restaurantes[c]; // la lista de una categoría
    let i = 0;
    while (i < lista.length) {
      let idx = restNombres.length; // posición donde voy a guardar el nuevo
      restNombres[idx] = lista[i];
      restCat[idx] = c; // guardo la categoría correspondiente
      i = i + 1;
    }
    c = c + 1;
  }

  // Al inicio la velocidad es 0, luego con actualizarIcono se modifica
  velX = 0;
  velY = 0;
}

// FUNCTION DRAW:

function draw() {
  let ciudadW = width - panelW;

  // Background (cambia según modo claro/oscuro)
  if (modoClaro) {
    background(245, 242, 236); // beige claro
  } else {
    background(6, 8, 14); // azul muy oscuro
  }

  // Fondo del área izquierda donde va el ícono/dibujitos de comida
  if (modoClaro) {
    fill(255);
  } else {
    fill(12, 16, 24);
  }
  rect(ciudadW / 2, height / 2, ciudadW, height);

  // Título del lado izquierdo
  if (modoClaro) {
    fill(20);
  } else {
    fill(230);
  }
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  textSize(22);
  text("La diversidad y variedad de Bogotá en restaurantes:", 20, 20);

  // Si ya hay una categoría seleccionada entonces se mueve y dibuja el ícono animado
  if (categoriaActiva !== -1) {
    actualizarIcono(ciudadW);
    dibujarIcono();
  }

  // Línea vertical -> esta separa la parte izquierda-derecha
  if (modoClaro) {
    stroke(220);
  } else {
    stroke(40);
  }
  strokeWeight(2);
  line(ciudadW, 0, ciudadW, height);
  noStroke();

  // Dibujar todo el panel derecho (botones, texto, lista, etc.)
  dibujarPanel(ciudadW);
}

// FUNCIONES PERSONALIZADAS:

// MOVIMIENTO DEL ICONO/dibujos
function actualizarIcono(ciudadW) {
  // Si la velocidad es cero, entonces le doy una velocidad inicial aleatoria
  if (velX === 0 && velY === 0) {
    velX = random(-2, 2);
    velY = random(-2, 2);
  }

  // Actualizo la posición sumando la velocidad
  iconX = iconX + velX;
  iconY = iconY + velY;

  // Aqui se definen los márgenes para que el ícono no se pegue a los bordes
  let margen = 60;
  let minX = margen;
  let maxX = ciudadW - margen;
  let minY = margen;
  let maxY = height - margen;

  // Si se sale por la izquierda/derecha entonces rebota
  if (iconX < minX || iconX > maxX) {
    velX = velX * -1;
  }
  // Si se sale por arriba/abajo, entonces también rebota
  if (iconY < minY || iconY > maxY) {
    velY = velY * -1;
  }
}

// DIBUJO DEL ICONO SEGÚN CATEGORÍA:
function dibujarIcono() {
  let cat = categoriaActiva;
  let r = catR[cat];
  let g = catG[cat];
  let b = catB[cat];
  let t = tamBase;

  // Según la categoría se dibuja la comida y hay 3 variaciones por cada tipo de comida:
  // SUSHI
  if (cat === 0) {
    if (estiloIcono === 1) {
      // sushi redondo en un bloque
      fill(r, g, b);
      rect(iconX, iconY, t * 1.2, t * 0.55, t * 0.25);
      fill(250);
      circle(iconX, iconY, t * 0.45);
      fill(240, 100, 80);
      circle(iconX, iconY, t * 0.22);
    } else if (estiloIcono === 2) {
      // dos piezas de sushi lado a lado
      fill(r, g, b);
      rect(iconX - t * 0.4, iconY, t * 0.9, t * 0.5, t * 0.25);
      rect(iconX + t * 0.4, iconY, t * 0.9, t * 0.5, t * 0.25);
      fill(250);
      circle(iconX - t * 0.4, iconY, t * 0.38);
      circle(iconX + t * 0.4, iconY, t * 0.38);
    } else {
      // sushi con palitos
      fill(r, g, b);
      rect(iconX, iconY, t * 1.1, t * 0.5, t * 0.2);
      fill(250);
      circle(iconX, iconY, t * 0.4);
      stroke(200, 180, 140);
      strokeWeight(5);
      line(iconX - t * 0.8, iconY - t * 0.8, iconX + t * 0.2, iconY + t * 0.1);
      line(iconX - t * 0.7, iconY - t * 0.9, iconX + t * 0.3, iconY);
      noStroke();
    }

    // ITALIANA
  } else if (cat === 1) {
    if (estiloIcono === 1) {
      // plato con salsa y pasta
      fill(230);
      circle(iconX, iconY, t * 1.4);
      fill(r, g, b);
      circle(iconX, iconY, t * 1.0);
      fill(255, 240, 190);
      circle(iconX, iconY, t * 0.7);
    } else if (estiloIcono === 2) {
      // plato de espagueti con punticos rojos (salsa/tomate)
      fill(230);
      circle(iconX, iconY, t * 1.6);
      fill(r, g, b);
      circle(iconX, iconY, t * 1.2);
      fill(255, 240, 190);
      circle(iconX, iconY, t * 0.85);
      noFill();
      stroke(245, 220, 150);
      strokeWeight(4);
      let radio = t * 0.38;
      let ang = 0;
      while (ang < TWO_PI) {
        let x1 = iconX + cos(ang) * (radio - 5);
        let y1 = iconY + sin(ang) * (radio - 5);
        let x2 = iconX + cos(ang + 0.6) * (radio + 6);
        let y2 = iconY + sin(ang + 0.6) * (radio + 6);
        line(x1, y1, x2, y2);
        ang = ang + 0.9;
      }
      noStroke();
      // tomates encima
      fill(210, 70, 50);
      circle(iconX + t * 0.1, iconY - t * 0.05, t * 0.18);
      circle(iconX - t * 0.18, iconY + t * 0.03, t * 0.16);
      circle(iconX + t * 0.05, iconY + t * 0.18, t * 0.14);
    } else {
      // pasta simple con un puntico rojo:
      fill(230);
      circle(iconX, iconY, t * 1.5);
      fill(r, g, b);
      circle(iconX, iconY, t * 1.05);
      fill(255, 240, 190);
      circle(iconX, iconY, t * 0.75);
      fill(250, 230, 170);
      circle(iconX + t * 0.18, iconY - t * 0.1, t * 0.22);
      circle(iconX - t * 0.18, iconY + t * 0.05, t * 0.22);
      circle(iconX, iconY + t * 0.15, t * 0.22);
      fill(220, 60, 60);
      circle(iconX, iconY - t * 0.05, t * 0.25);
    }

    // CARNES
  } else if (cat === 2) {
    if (estiloIcono === 1) {
      // pedazo de carne solo
      fill(r, g, b);
      rect(iconX, iconY, t * 1.4, t * 0.8, t * 0.4);
      fill(255, 220, 220);
      circle(iconX + t * 0.3, iconY - t * 0.1, t * 0.27);
    } else if (estiloIcono === 2) {
      // parrilla con  carne
      fill(60);
      rect(iconX, iconY, t * 1.8, t * 1.1, t * 0.2);
      stroke(120);
      strokeWeight(3);
      let gx = iconX - t * 0.8;
      while (gx <= iconX + t * 0.8) {
        line(gx, iconY - t * 0.5, gx, iconY + t * 0.5);
        gx = gx + t * 0.25;
      }
      noStroke();
      fill(180, 70, 50);
      rect(iconX - t * 0.2, iconY, t * 0.7, t * 0.4, t * 0.2);
      rect(iconX + t * 0.4, iconY - t * 0.1, t * 0.5, t * 0.3, t * 0.2);
    } else {
      // chuzo de carne:
      stroke(180, 150, 100);
      strokeWeight(5);
      line(iconX - t * 0.9, iconY, iconX + t * 0.9, iconY);
      noStroke();
      let paso = t * 0.45;
      let baseX = iconX - t * 0.6;
      let n = 0;
      while (n < 4) {
        if (n % 2 === 0) {
          fill(180, 70, 50);
        } else {
          fill(240, 200, 120);
        }
        circle(baseX + n * paso, iconY, t * 0.35);
        n = n + 1;
      }
    }

    // TÍPICA (bandera de Colombia)
  } else if (cat === 3) {
    let ancho = t * 1.7;
    let alto = t * 0.9;
    if (estiloIcono === 1) {
      // bandera simple
      fill(252, 209, 22);
      rect(iconX, iconY - alto / 3, ancho, alto / 3);
      fill(0, 56, 147);
      rect(iconX, iconY, ancho, alto / 3);
      fill(206, 17, 38);
      rect(iconX, iconY + alto / 3, ancho, alto / 3);
    } else if (estiloIcono === 2) {
      // bandera con palito
      fill(90);
      rect(iconX - ancho * 0.65, iconY, t * 0.12, t * 1.6);
      fill(252, 209, 22);
      rect(iconX, iconY - alto / 3, ancho, alto / 3);
      fill(0, 56, 147);
      rect(iconX, iconY, ancho, alto / 3);
      fill(206, 17, 38);
      rect(iconX, iconY + alto / 3, ancho, alto / 3);
    } else {
      // bandera girada/inclinación
      push();
      translate(iconX, iconY);
      rotate(-0.15);
      fill(252, 209, 22);
      rect(0, -alto / 3, ancho, alto / 3);
      fill(0, 56, 147);
      rect(0, 0, ancho, alto / 3);
      fill(206, 17, 38);
      rect(0, alto / 3, ancho, alto / 3);
      pop();
    }

    // VEGANA (dibuje hojas verdes)
  } else if (cat === 4) {
    if (estiloIcono === 1) {
      // dos hojas juntas
      fill(60, 160, 90);
      ellipse(iconX - t * 0.2, iconY, t * 0.9, t * 1.4);
      ellipse(iconX + t * 0.2, iconY, t * 0.9, t * 1.4);
      stroke(30, 70, 40);
      strokeWeight(2);
      line(iconX - t * 0.2, iconY - t * 0.6, iconX - t * 0.2, iconY + t * 0.6);
      line(iconX + t * 0.2, iconY - t * 0.6, iconX + t * 0.2, iconY + t * 0.6);
      noStroke();
    } else if (estiloIcono === 2) {
      // hoja grande vertical (dos unidas)
      fill(70, 170, 100);
      ellipse(iconX, iconY - t * 0.2, t * 0.9, t * 1.5);
      ellipse(iconX, iconY + t * 0.2, t * 0.9, t * 1.5);
      stroke(30, 70, 40);
      strokeWeight(2);
      line(iconX, iconY - t * 0.9, iconX, iconY + t * 0.9);
      noStroke();
    } else {
      // dos hojas al lado (una mas abajo que la otra)
      fill(70, 170, 100);
      ellipse(iconX - t * 0.25, iconY - t * 0.1, t * 0.9, t * 1.4);
      ellipse(iconX + t * 0.25, iconY + t * 0.1, t * 0.9, t * 1.4);
      stroke(30, 70, 40);
      strokeWeight(2);
      line(
        iconX - t * 0.25,
        iconY - t * 0.8,
        iconX - t * 0.25,
        iconY + t * 0.8
      );
      line(
        iconX + t * 0.25,
        iconY - t * 0.8,
        iconX + t * 0.25,
        iconY + t * 0.8
      );
      noStroke();
    }

    // HAMBURGUESAS
  } else if (cat === 5) {
    if (estiloIcono === 1) {
      // hamburguesa simple (solo con carne):
      fill(r, g, b);
      rect(iconX, iconY - t * 0.32, t * 1.6, t * 0.45, t * 0.3);
      fill(130, 80, 60);
      rect(iconX, iconY + t * 0.1, t * 1.6, t * 0.22);
      fill(r, g, b);
      rect(iconX, iconY + t * 0.32, t * 1.6, t * 0.35, t * 0.2);
    } else if (estiloIcono === 2) {
      // hamburgesa con queso
      fill(r, g, b);
      rect(iconX, iconY - t * 0.32, t * 1.6, t * 0.45, t * 0.3);
      fill(250, 230, 140);
      rect(iconX, iconY - t * 0.1, t * 1.6, t * 0.18);
      fill(130, 80, 60);
      rect(iconX, iconY + t * 0.1, t * 1.6, t * 0.22);
      fill(r, g, b);
      rect(iconX, iconY + t * 0.32, t * 1.6, t * 0.35, t * 0.2);
    } else {
      // hamburguesa con lechuga, tomate y carne:
      fill(r, g, b);
      rect(iconX, iconY - t * 0.32, t * 1.6, t * 0.45, t * 0.3);
      fill(110, 190, 110);
      rect(iconX, iconY - t * 0.05, t * 1.6, t * 0.14);
      fill(210, 60, 60);
      rect(iconX, iconY + t * 0.05, t * 1.6, t * 0.08);
      fill(130, 80, 60);
      rect(iconX, iconY + t * 0.16, t * 1.6, t * 0.22);
      fill(r, g, b);
      rect(iconX, iconY + t * 0.32, t * 1.6, t * 0.35, t * 0.2);
    }
  }
}

// PANEL DERECHA
function dibujarPanel(ciudadW) {
  // Esto para definir los colores según el modo (si claro u oscuro)
  let colPanelR, colPanelG, colPanelB;
  let colTexto, colTextoSuave, colBotonNormal;

  if (modoClaro) {
    colPanelR = 252;
    colPanelG = 248;
    colPanelB = 242;
    colTexto = 30;
    colTextoSuave = 100;
    colBotonNormal = 235;
  } else {
    colPanelR = 15;
    colPanelG = 19;
    colPanelB = 30;
    colTexto = 245;
    colTextoSuave = 200;
    colBotonNormal = 40;
  }

  // Fondo del panel derecho
  fill(colPanelR, colPanelG, colPanelB);
  rect(ciudadW + panelW / 2, height / 2, panelW, height);

  let panelX = ciudadW;
  let centroPanelX = panelX + panelW / 2;

  // Título del panel
  fill(colTexto);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  textSize(22);
  text("¿Qué quieres comer hoy?", centroPanelX, 60);

  // Subtítulo/instrucciones
  textStyle(NORMAL);
  textSize(14);
  text("Elige una categoría de comida:", centroPanelX, 100);
  textAlign(LEFT, TOP);

  // Botones de categoría (sushi/italiana/carnes/Típica, etc.)
  let btnW = panelW - 60;
  let btnH = 32;
  let inicioY = 160;
  let espacio = 45;

  let i = 0;
  while (i < categorias.length) {
    let cy = inicioY + i * espacio;

    // Si la categoría está activa, el botón es naranja/amarillo
    if (categoriaActiva === i) {
      fill(246, 190, 90);
    } else {
      fill(colBotonNormal);
    }
    rect(centroPanelX, cy, btnW, btnH, 8);

    fill(modoClaro ? 20 : 240);
    let etiqueta = categorias[i];
    let primera = etiqueta[0].toUpperCase();
    let resto = "";
    let j = 1;
    while (j < etiqueta.length) {
      resto = resto + etiqueta[j];
      j = j + 1;
    }
    text(primera + resto, centroPanelX - btnW / 2 + 12, cy - 8);

    i = i + 1;
  }

  // Botón para cambiar de claro a ocuro:
  let yModo = 160 + categorias.length * espacio + 10;
  fill(colBotonNormal);
  rect(centroPanelX, yModo, btnW, 28, 6);
  fill(modoClaro ? 20 : 240);
  let etiquetaModo = modoClaro ? "Modo oscuro" : "Modo claro";
  text(etiquetaModo, centroPanelX - btnW / 2 + 12, yModo - 9);

  // Instrucciones de teclado
  fill(colTextoSuave);
  let yInstr1 = yModo + 30;
  let yInstr2 = yModo + 50;
  let yInstr3 = yModo + 70;
  let yInstr4 = yModo + 90;

  text("1/2/3: variaciones del ícono", panelX + 40, yInstr1);
  text("4: nueva recomendación", panelX + 40, yInstr2);
  text("5: generar según gustos", panelX + 40, yInstr3);

  //LISTA De RESTAURANTES:
  fill(colTexto);
  let labelCat = "ninguna";
  if (categoriaActiva !== -1) {
    labelCat = categorias[categoriaActiva];
  }
  let yRestTitulo = yInstr4 + 30;
  text("Restaurantes (" + labelCat + "):", panelX + 40, yRestTitulo);

  let yLista = yRestTitulo + 20;

  // Esto para mostrar la lista de restaurantes de la categoría que se escoja (ej. si se escoge italiano entonces salen restaurantes SOLO de esta categoría y asi sucesivamente con el resto):
  if (categoriaActiva !== -1) {
    let k = 0;
    while (k < restNombres.length) {
      if (restCat[k] === categoriaActiva) {
        text("- " + restNombres[k], panelX + 40, yLista);
        yLista = yLista + 16;
      }
      k = k + 1;
    }
  }

  //TEXTO para que LA PERSONA ESCRIBA SUS GUSTOS/PLATOS FAVORITOS:
  let yLabel = yLista + 20;
  fill(colTextoSuave);
  text("Escribe tus platos favoritos:", panelX + 40, yLabel);

  // Caja donde va el texto de gustos
  let yCaja = yLabel + 24;
  fill(modoClaro ? 255 : 25);
  rect(centroPanelX, yCaja + 10, btnW, 32, 6);
  fill(modoClaro ? 20 : 230);
  text(textoGustos, panelX + 50, yCaja);

  // Botón para generar recomendación según el texto de gustos (o sea segun los gustos de la persona):
  botonGenX = centroPanelX;
  botonGenY = yCaja + 45;
  botonGenW = btnW;
  botonGenH = 26;

  fill(colBotonNormal);
  rect(botonGenX, botonGenY, botonGenW, botonGenH, 6);
  fill(modoClaro ? 20 : 240);
  text(
    "Generar según tus gustos",
    botonGenX - botonGenW / 2 + 10,
    botonGenY - 9
  );

  // Botones para guardar imagen y texto (de las recomendaciones):
  botonImgX = centroPanelX;
  botonImgY = botonGenY + 36;
  botonImgW = btnW;
  botonImgH = 26;

  botonTxtX = centroPanelX;
  botonTxtY = botonImgY + 32;
  botonTxtW = btnW;
  botonTxtH = 26;

  fill(colBotonNormal);
  rect(botonImgX, botonImgY, botonImgW, botonImgH, 6);
  fill(modoClaro ? 20 : 240);
  text("Guardar imagen", botonImgX - botonImgW / 2 + 10, botonImgY - 9);

  fill(colBotonNormal);
  rect(botonTxtX, botonTxtY, botonTxtW, botonTxtH, 6);
  fill(modoClaro ? 20 : 240);
  text(
    "Guardar recomendaciones",
    botonTxtX - botonTxtW / 2 + 10,
    botonTxtY - 9
  );

  //RECOMENDACIÓN AL FINAL:
  // Si ya tengo una recomendación, la muestro al final del panel
  if (recomendacion !== "") {
    let yRecom = botonTxtY + 35;
    if (yRecom > height - 60) {
      yRecom = height - 60;
    }
    fill(246, 190, 90);
    text("Hoy podrías ir a:", panelX + 40, yRecom);
    fill(colTexto);
    text(recomendacion, panelX + 40, yRecom + 18);
  }
}

// RANDOM ENTERO SIN int()
// Función que devuelve un entero aleatorio entre 0 y max-1
function enteroAleatorio(max) {
  let r = random(max);
  let i = 0;
  let elegido = 0;
  while (i < max) {
    if (r >= i && r < i + 1) {
      elegido = i;
    }
    i = i + 1;
  }
  return elegido;
}

// Busca si "palabra" aparece dentro de "frase"
function contiene(frase, palabra) {
  let i = 0;
  while (i <= frase.length - palabra.length) {
    let j = 0;
    let igual = true;
    while (j < palabra.length) {
      if (frase[i + j] !== palabra[j]) {
        igual = false;
      }
      j = j + 1;
    }
    if (igual) {
      return true;
    }
    i = i + 1;
  }
  return false;
}

// lee textoGustos y elige categoría + recomendación
function generarDesdeGustos() {
  // Si el texto está vacío, nentonces no se hace nada
  if (textoGustos === "") {
    return;
  }
  let t = textoGustos.toLowerCase();

  // Puntos por categoría [sushi, italiana, carnes, típica, vegana, hamburguesas]
  let puntos = [0, 0, 0, 0, 0, 0];

  // Por cada palabra clave que encuentro en el texto, le sumo puntos a la categoría correspondiente.

  // sushi
  if (contiene(t, "sushi")) {
    puntos[0] = puntos[0] + 3;
  }
  if (contiene(t, "japon")) {
    puntos[0] = puntos[0] + 1;
  }

  // italiana
  if (contiene(t, "pasta")) {
    puntos[1] = puntos[1] + 3;
  }
  if (contiene(t, "pizza")) {
    puntos[1] = puntos[1] + 2;
  }
  if (contiene(t, "italiana")) {
    puntos[1] = puntos[1] + 1;
  }
  if (contiene(t, "lasagna")) {
    puntos[1] = puntos[1] + 2;
  }
  if (contiene(t, "lasaña")) {
    puntos[1] = puntos[1] + 2;
  }

  // carnes
  if (contiene(t, "carne")) {
    puntos[2] = puntos[2] + 3;
  }
  if (contiene(t, "parrilla")) {
    puntos[2] = puntos[2] + 2;
  }
  if (contiene(t, "asado")) {
    puntos[2] = puntos[2] + 1;
  }

  // típica
  if (contiene(t, "ajiaco")) {
    puntos[3] = puntos[3] + 3;
  }
  if (contiene(t, "bandeja")) {
    puntos[3] = puntos[3] + 2;
  }
  if (contiene(t, "sancocho")) {
    puntos[3] = puntos[3] + 2;
  }
  if (contiene(t, "tipica")) {
    puntos[3] = puntos[3] + 1;
  }
  if (contiene(t, "típica")) {
    puntos[3] = puntos[3] + 1;
  }

  // vegana
  if (contiene(t, "vegana")) {
    puntos[4] = puntos[4] + 3;
  }
  if (contiene(t, "ensalada")) {
    puntos[4] = puntos[4] + 2;
  }
  if (contiene(t, "vegetal")) {
    puntos[4] = puntos[4] + 1;
  }

  // hamburguesas
  if (contiene(t, "hamburguesa")) {
    puntos[5] = puntos[5] + 3;
  }
  if (contiene(t, "hamburguesas")) {
    puntos[5] = puntos[5] + 3;
  }
  if (contiene(t, "burger")) {
    puntos[5] = puntos[5] + 2;
  }

  // Ahora se busca qué categoría tuvo más puntos
  let mejor = 0;
  let mejorScore = puntos[0];
  let i = 1;
  while (i < puntos.length) {
    if (puntos[i] > mejorScore) {
      mejorScore = puntos[i];
      mejor = i;
    }
    i = i + 1;
  }

  // Si ninguna categoría tiene puntos, entonces de elije una al azar
  if (mejorScore === 0) {
    mejor = enteroAleatorio(categorias.length);
  }

  // Ahora se actualiza la categoría activa con la que quedó mejor
  categoriaActiva = mejor;

  // Busco todos los restaurantes de esa categoría y elijo uno al azar
  let indices = [];
  i = 0;
  while (i < restNombres.length) {
    if (restCat[i] === categoriaActiva) {
      let p = indices.length;
      indices[p] = i;
    }
    i = i + 1;
  }
  if (indices.length > 0) {
    let aleatorio = enteroAleatorio(indices.length);
    let idxReal = indices[aleatorio];
    recomendacion = restNombres[idxReal];
  }
}

// GUARDAR RECOMENDACIONES A .TXT (para que la persona quede con sus recomendaciones)
function guardarRecomendaciones() {
  // Si no hay categoría activa, no guardo nada
  if (categoriaActiva === -1) {
    return;
  }

  // Creo un arreglo de líneas de texto para el archivo .txt
  let lineas = [];
  let p = 0;

  lineas[p] = "Tus platos favoritos: " + textoGustos;
  p = p + 1;
  lineas[p] = "Categoría elegida: " + categorias[categoriaActiva];
  p = p + 1;

  if (recomendacion !== "") {
    lineas[p] = "Recomendación principal: " + recomendacion;
    p = p + 1;
  }

  lineas[p] = "Otros restaurantes de esta categoría:";
  p = p + 1;

  // Agrego todos los restaurantes de la categoría activa
  let i = 0;
  while (i < restNombres.length) {
    if (restCat[i] === categoriaActiva) {
      lineas[p] = "- " + restNombres[i];
      p = p + 1;
    }
    i = i + 1;
  }

  // Guardo el archivo de texto con el nombre "recomendaciones_bogota.txt"
  saveStrings(lineas, "recomendaciones_bogota.txt");
}

// EVENTOS DEL MOUSE Y DEL TECLADO

function mousePressed() {
  // Calculo desde dónde se empieza el panel/lado derecho
  let ciudadW = width - panelW;
  let panelX = ciudadW;
  let centroPanelX = panelX + panelW / 2;

  // Solo se reacciona al click si el mouse está sobre el panel derecho
  if (mouseX > panelX) {
    let btnW = panelW - 60;
    let btnH = 32;
    let inicioY = 160;
    let espacio = 45;

    // Revisar si el click cayó sobre alguno de los botones de categoría
    let i = 0;
    while (i < categorias.length) {
      let cy = inicioY + i * espacio;
      let izq = centroPanelX - btnW / 2;
      let der = centroPanelX + btnW / 2;
      let arr = cy - btnH / 2;
      let aba = cy + btnH / 2;

      if (mouseX > izq && mouseX < der && mouseY > arr && mouseY < aba) {
        // Si sí, entonces de cambia la categoría activa y se resetea la recomendación
        categoriaActiva = i;
        recomendacion = "";
        let ciudadW2 = width - panelW;
        iconX = ciudadW2 / 2;
        iconY = height / 2;
        velX = random(-2, 2);
        velY = random(-2, 2);
      }
      i = i + 1;
    }

    // Si el click fue sobre el botón de modo claro/oscuro
    let yModo = 160 + categorias.length * espacio + 10;
    let btnW2 = panelW - 60;
    let izqM = centroPanelX - btnW2 / 2;
    let derM = centroPanelX + btnW2 / 2;
    let arrM = yModo - 14;
    let abaM = yModo + 14;

    if (mouseX > izqM && mouseX < derM && mouseY > arrM && mouseY < abaM) {
      // Cambio el modo
      modoClaro = !modoClaro;
    }

    // Si el click fue sobre el botón "Generar según gustos"
    if (
      mouseX > botonGenX - botonGenW / 2 &&
      mouseX < botonGenX + botonGenW / 2 &&
      mouseY > botonGenY - botonGenH / 2 &&
      mouseY < botonGenY + botonGenH / 2
    ) {
      generarDesdeGustos();
    }

    // Si el click fue sobre el botón "Guardar imagen"
    if (
      mouseX > botonImgX - botonImgW / 2 &&
      mouseX < botonImgX + botonImgW / 2 &&
      mouseY > botonImgY - botonImgH / 2 &&
      mouseY < botonImgY + botonImgH / 2
    ) {
      saveCanvas("mapa_antojos", "png");
    }

    //Si el click fue sobre el botón "Guardar recomendaciones"
    if (
      mouseX > botonTxtX - botonTxtW / 2 &&
      mouseX < botonTxtX + botonTxtW / 2 &&
      mouseY > botonTxtY - botonTxtH / 2 &&
      mouseY < botonTxtY + botonTxtH / 2
    ) {
      guardarRecomendaciones();
    }
  }
}

function keyPressed() {
  // Si la tecla es BACKSPACE se borra el carácter del texto de gustos
  if (keyCode === BACKSPACE) {
    if (textoGustos.length > 0) {
      let nueva = "";
      let i = 0;
      while (i < textoGustos.length - 1) {
        nueva = nueva + textoGustos[i];
        i = i + 1;
      }
      textoGustos = nueva;
    }
    return;
  }

  // Teclas 1, 2, 3: cambian el estilo del ícono
  if (key === "1") {
    estiloIcono = 1;
    return;
  }
  if (key === "2") {
    estiloIcono = 2;
    return;
  }
  if (key === "3") {
    estiloIcono = 3;
    return;
  }

  // Tecla 4: nueva recomendación aleatoria dentro de la categoría activa
  if (key === "4" && categoriaActiva !== -1) {
    let indices = [];
    let i = 0;
    while (i < restNombres.length) {
      if (restCat[i] === categoriaActiva) {
        let p = indices.length;
        indices[p] = i;
      }
      i = i + 1;
    }
    if (indices.length > 0) {
      let aleatorio = enteroAleatorio(indices.length);
      let idxReal = indices[aleatorio];
      recomendacion = restNombres[idxReal];
    }
    return;
  }

  // Tecla 5: generar recomendación según el texto que escribió la persona
  if (key === "5") {
    generarDesdeGustos();
    return;
  }

  // Cualquier letra se agrega al texto de gustos
  if (key.length === 1) {
    textoGustos = textoGustos + key;
  }
}
