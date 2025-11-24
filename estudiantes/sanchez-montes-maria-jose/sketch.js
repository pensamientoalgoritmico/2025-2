//Sanchez Montes Maria Jose I E10 proyecto final
// VISTIENDO BOGOSTYLE - Sistema de Outfits Bogotanos
//Es un sistema interactivo de recomendación de outfits que combina el clima del día (Frío/Templado/Cálido) con el mood del usuario (Arriesgada/Elegante/Casual) para generar 9 combinaciones visuales únicas con marcas locales bogotanas. Desarrollado en p5.js, incluye animaciones flotantes, transiciones suaves entre pantallas y tooltips interactivos que revelan el nombre de cada marca al pasar el mouse sobre las diferentes zonas del outfit. 

//La IA  fue utilizada como asistente de programación para estructurar el código modular, implementar el sistema de detección de zonas hover, resolver problemas de carga de imágenes y optimizar el flujo de interacción según los requerimientos del diseño visual.

//Referentes:
//Fits-App Outfit Planner https://www.fits-app.com
//Crea Tu Outfit - Generador de Outfit Hombre BOGGI MILANO - https://www.boggi.com/es_MX/crea-tu-estilo/
//Bantoa - Outfit creator - https://www.bantoa.com/es/

// Base de datos
const OUTFITS_MARCAS = {
  // Frio y arresgada
  frioArriesgada: {
    superior: { nombre: "Juanito No Friends", tipo: "Impermeable" },
    inferior: { nombre: "Fella Jeans", tipo: "Jeans" },
    calzado: { nombre: "Aloha Shoes", tipo: "Tenis" },
    accesorio: { nombre: "Lucie", tipo: "Bolso" }
  },
  
  // Frio y casual
  frioCasual: {
    superior: { nombre: "Inti", tipo: "Chaqueta" },
    inferior: { nombre: "Sol y Neptuno", tipo: "Pantalón" },
    calzado: { nombre: "Glam Boutique Center", tipo: "Botas" },
    accesorio: { nombre: "Pyar", tipo: "Bolso" }
  },
  
  // Frio y elegante
  frioElegante: {
    superior: { nombre: "Basement", tipo: "Abrigo" },
    inferior: { nombre: "Glossy", tipo: "Pantalón" },
    calzado: { nombre: "Aloha Shoes", tipo: "Botas" },
    accesorio: { nombre: "Paulina Gutierrez Leather Goods", tipo: "Bolso" }
  },
  
  // Templado y casual
  templadoCasual: {
    superior: { nombre: "Maglione", tipo: "Sweater" },
    inferior: { nombre: "Axspen", tipo: "Jeans" },
    calzado: { nombre: "JloShoes", tipo: "Baletas" },
    accesorio: { nombre: "Ameli", tipo: "Bolso" }
  },
  
  // Templado y arriesgada
  templadoArriesgada: {
    superior: { nombre: "Bad Influencer", tipo: "Cardigan" },
    inferior: { nombre: "Sixxta", tipo: "Pantalón" },
    calzado: { nombre: "Aloha Shoes", tipo: "Tenis" },
    accesorio: { nombre: "Maria Angel Rojas", tipo: "Bolso" }
  },
  
  // Templado y elegante 
  templadoElegante: {
    superior: { nombre: "Zawadzky", tipo: "Caleco" },
    inferior: { nombre: "Zawadzky", tipo: "Jeans" },
    calzado: { nombre: "Divina Castidad", tipo: "Zapatos" },
    accesorio: { nombre: "Divina Castidad", tipo: "Cartera" }
  },
  
  // Calido y casual 
  calidoCasual: {
    superior: { nombre: "Freesia", tipo: "Blusa" },
    inferior: { nombre: "Matilda", tipo: "Falda" },
    calzado: { nombre: "Aluna Shoes", tipo: "Sandalias" },
    accesorio: { nombre: "Zielsac", tipo: "Bolso" }
  },
  
  // Calido y arriesgada
  calidoArriesgada: {
    superior: { nombre: "Mogomatte", tipo: "Top" },
    inferior: { nombre: "Maglione", tipo: "Falda" },
    calzado: { nombre: "Wander Shoes", tipo: "Tennis" },
    accesorio: { nombre: "Jormands", tipo: "Bolso" }
  },
  
  // Calido y elegante
  calidoElegante: {
    superior: { nombre: "Matilda", tipo: "Top" },
    inferior: { nombre: "Matilda", tipo: "Pantalon" },
    calzado: { nombre: "Divina Castidad", tipo: "Zapatos" },
    accesorio: { nombre: "Divina Castidad", tipo: "Cartera" }
  }
};

//Determinar variables
let pantallaActual = 0; // 0: Inicio, 1: Personalización, 2: Resultado
let fuente1, fuente2;// Fuentes personalizadas
let opacidadTransicion = 0;//transición entre pantallas
let transicionActiva = false;

// Controles de la interfaz
let sliderClima;
let selectorMood;
let botonGenerar;
let botonNuevoOutfit;

// Variables del sistema de outfits
let outfitActual = null;
let prendasHover = -1;
let zonaHover = -1; // Para detectar zona del outfit en hover

// imagenes flotantes 
let objetosFlotantes = [];
let imagenesFlotantes = {};

// Imágenes de outfits 
let imagenesOutfits = {};

// PRELOAD - CARGA DE RECURSOS
function preload() {
  //fuentes
  fuente1 = loadFont('assets/fuente1.ttf');
  fuente2 = loadFont('assets/fuente2.ttf');
  
  // imagenes de la primera pantalla
  imagenesFlotantes.cafe = loadImage('assets/cafe.png');
  imagenesFlotantes.camara = loadImage('assets/camara.png');
  imagenesFlotantes.cartera = loadImage('assets/cartera.png');
  imagenesFlotantes.gafas = loadImage('assets/gafas.png');
  imagenesFlotantes.labial = loadImage('assets/labial.png');
  imagenesFlotantes.tarjetero = loadImage('assets/tarjetero.png');
  
  // Carga de outfits - FRÍO
  imagenesOutfits.frioArriesgada = loadImage('assets/outfitfrioarr.png');
  imagenesOutfits.frioCasual = loadImage('assets/outfitfriocasual.png');
  imagenesOutfits.frioElegante = loadImage('assets/outfitfrioele.png');
  
  // Carga de outfits - TEMPLADO
  imagenesOutfits.templadoCasual = loadImage('assets/outfittempcasu.png');
  imagenesOutfits.templadoArriesgada = loadImage('assets/outfittemparr.png');
  imagenesOutfits.templadoElegante = loadImage('assets/outfittempele.png');
  
  // Carga de outfits - CÁLIDO
  imagenesOutfits.calidoCasual = loadImage('assets/outfitcalicasu.png');
  imagenesOutfits.calidoArriesgada = loadImage('assets/outfitcaliarri.png');
  imagenesOutfits.calidoElegante = loadImage('assets/outfitcaliele.png');
}
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  
  inicializarObjetosFlotantes();
  crearControles();
}

function draw() {
  background(245, 240, 230);
  
  //efecto de transición
  if (transicionActiva) {
    opacidadTransicion += 0.05;
    if (opacidadTransicion >= 1) {
      transicionActiva = false;
      opacidadTransicion = 0;
    }
  }
  
  // Dibuja la pantalla correspondiente según el estado actual
  switch(pantallaActual) {
    case 0: dibujarPantallaInicio(); break;
    case 1: dibujarPantallaPersonalizacion(); break;
    case 2: dibujarPantallaResultado(); break;
  }
  
  //transición
  if (transicionActiva) {
    fill(245, 240, 230, opacidadTransicion * 255);
    noStroke();
    rect(0, 0, width, height);
  }
}

// Pantalla 1 I Inicio
function dibujarPantallaInicio() {
  // Dibuja los íconos flotantes con movimiento suave
  for (let obj of objetosFlotantes) {
    obj.yActual = lerp(obj.yActual, obj.yObjetivo, 0.05);
    if (abs(obj.yActual - obj.yObjetivo) < 1) {
      obj.yObjetivo = obj.yInicial + random(-obj.amplitud, obj.amplitud);
    }
    
    push();
    translate(obj.x, obj.yActual);
    rotate(obj.rotacion);
    
    // Sombra 
    fill(0, 0, 0, 15);
    noStroke();
    ellipse(5, 5, obj.tamaño * 0.9, obj.tamaño * 0.9);
    
    //imagen flotante
    if (imagenesFlotantes[obj.nombre]) {
      imageMode(CENTER);
      image(imagenesFlotantes[obj.nombre], 0, 0, obj.tamaño, obj.tamaño);
    } else {
      // si la imagen no carga
      fill(42, 42, 42, 30);
      ellipse(0, 0, obj.tamaño, obj.tamaño);
      fill(42, 42, 42);
      textAlign(CENTER, CENTER);
      textSize(10);
      text(obj.nombre, 0, 0);
    }
    pop();
  }
  // Título
  fill(42, 42, 42);
  textAlign(CENTER, CENTER);
  if (fuente1) textFont(fuente1);
  textSize(72);
  textStyle(BOLD);
  text("Vistiendo Bogostyle", width/2, height/2 - 80);
  
  // Subtítulo
  if (fuente2) textFont(fuente2);
  textSize(18);
  textStyle(NORMAL);
  fill(42, 42, 42, 180);
  text("Outfits bogotanos, estilo local", width/2, height/2 - 20);
}

function inicializarObjetosFlotantes() {
  const nombres = ['cafe', 'camara', 'cartera', 'gafas', 'labial', 'tarjetero'];
  const espacioX = width / (nombres.length + 1);
  objetosFlotantes = [];
  
  for (let i = 0; i < nombres.length; i++) {
    let yPos = random(100, height - 200);
    objetosFlotantes.push({
      x: espacioX * (i + 1),
      yInicial: yPos,
      yActual: yPos,
      yObjetivo: yPos + random(-30, 30),
      tamaño: random(80, 120),
      amplitud: random(30, 60),
      rotacion: random(-0.1, 0.1),
      nombre: nombres[i]
    });
  }
}
//Pantalla 2 I personalizacion
function dibujarPantallaPersonalizacion() {
  fill(42, 42, 42);
  textAlign(CENTER, CENTER);
  if (fuente1) textFont(fuente1);
  textSize(48);
  text("Personaliza tu look", width/2, 120);
  
  if (fuente2) textFont(fuente2);
  textSize(16);
  fill(42, 42, 42, 180);
  text("Ajusta el clima y elige tu mood", width/2, 180);
  
  let valorClima = sliderClima.value();
  let textoClima = valorClima < 33 ? "❄️ Frío" : valorClima < 66 ? "🌤️ Templado" : "☀️ Cálido";
  
  fill(42, 42, 42);
  textSize(20);
  textStyle(BOLD);
  text(textoClima, width/2, 280);
}
// PANTALLA 3: RESULTADO
function dibujarPantallaResultado() {
  if (!outfitActual) return;
  
  // Título
  fill(42, 42, 42);
  textAlign(CENTER, CENTER);
  if (fuente1) textFont(fuente1);
  textSize(42);
  text("Tu Outfit Bogotano", width/2, 80);
  
  // Sugerencia
  if (fuente2) textFont(fuente2);
  textSize(16);
  fill(42, 42, 42, 160);
  text(outfitActual.sugerencia, width/2, 130);
  
  if (outfitActual.imagen && outfitActual.imagenCargada) {
    // Alerta de outfit especial
    fill(255, 243, 176);
    stroke(255, 193, 7);
    strokeWeight(2);
    rect(width/2 - 220, 160, 440, 40, 20);
    
    fill(42, 42, 42);
    noStroke();
    if (fuente2) textFont(fuente2);
    textSize(14);
    textStyle(BOLD);
    text(outfitActual.mensajeEspecial, width/2, 180);
    
    //outfit completo
    push();
    imageMode(CENTER);
    
    //proporción
    let anchoMax = width * 0.8;
    let altoMax = height * 0.5;
    let escala = min(anchoMax / outfitActual.imagen.width, altoMax / outfitActual.imagen.height);
    let anchoImagen = outfitActual.imagen.width * escala;
    let altoImagen = outfitActual.imagen.height * escala;
    
    // Posición de la imagen
    let imgX = width/2;
    let imgY = height/2 + 30;
    let imgLeft = imgX - anchoImagen/2;
    let imgTop = imgY - altoImagen/2;
    
    // Definir zonas interactivas 
    // Zona superior izquierda: SUPERIOR
    // Zona inferior izquierda: INFERIOR  
    // Zona superior derecha: CALZADO
    // Zona inferior derecha: ACCESORIO
    
    let zonas = [
      { x: imgLeft, y: imgTop, w: anchoImagen/2, h: altoImagen/2, index: 0, label: "Superior" },
      { x: imgLeft, y: imgTop + altoImagen/2, w: anchoImagen/2, h: altoImagen/2, index: 1, label: "Inferior" },
      { x: imgLeft + anchoImagen/2, y: imgTop, w: anchoImagen/2, h: altoImagen/2, index: 2, label: "Calzado" },
      { x: imgLeft + anchoImagen/2, y: imgTop + altoImagen/2, w: anchoImagen/2, h: altoImagen/2, index: 3, label: "Accesorio" }
    ];
    
    zonaHover = -1;
    
    //mouseX y mouseY
    for (let i = 0; i < zonas.length; i++) {
      let z = zonas[i];
      if (mouseX > z.x && mouseX < z.x + z.w && mouseY > z.y && mouseY < z.y + z.h) {
        zonaHover = i;
        break;
      }
    }
    // Efecto hover general en la imagen
    let dentroImagen = mouseX > imgLeft && mouseX < imgLeft + anchoImagen &&
                       mouseY > imgTop && mouseY < imgTop + altoImagen;
    
    if (dentroImagen) {
      tint(255, 255);
    } else {
      tint(255, 240);
    }
    
    image(outfitActual.imagen, imgX, imgY, anchoImagen, altoImagen);
    pop();
    
    // Tooltip cuando está en hover sobre una zona específica
    if (zonaHover >= 0) {
      let prenda = outfitActual.prendas[zonaHover];
      let zona = zonas[zonaHover];
      
      push();
      fill(42, 42, 42, 240);
      noStroke();
      rectMode(CENTER);
      if (fuente2) textFont(fuente2);
      
      let anchoTooltip = max(textWidth(prenda.nombre), textWidth(prenda.tipo)) + 40;
      rect(mouseX, mouseY - 40, anchoTooltip, 50, 15);
      
      fill(245, 240, 230);
      textAlign(CENTER, CENTER);
      textSize(13);
      textStyle(BOLD);
      text(prenda.nombre, mouseX, mouseY - 48);
      
      textSize(11);
      textStyle(NORMAL);
      fill(245, 240, 230, 200);
      text(prenda.tipo, mouseX, mouseY - 32);
      pop();
    }
    
  } else {
    // Para otras combinaciones, muestra las tarjetas con emojis
    let posiciones = [
      { x: width/2 - 250, y: height/2 - 50, label: "Superior" },
      { x: width/2 - 250, y: height/2 + 120, label: "Inferior" },
      { x: width/2 + 80, y: height/2 - 50, label: "Calzado" },
      { x: width/2 + 80, y: height/2 + 120, label: "Accesorio" }
    ];
    
    prendasHover = -1;
    
    for (let i = 0; i < 4; i++) {
      let pos = posiciones[i];
      let prenda = outfitActual.prendas[i];
      
      let d = dist(mouseX, mouseY, pos.x + 75, pos.y + 60);
      let esHover = d < 70;
      if (esHover) prendasHover = i;
      
      push();
      if (esHover) translate(0, -5);
      
      // Tarjeta principal
      fill(255);
      stroke(42, 42, 42, esHover ? 255 : 100);
      strokeWeight(esHover ? 3 : 2);
      rect(pos.x, pos.y, 150, 120, 15);
      
      // Espacio para imagen de prenda
      fill(245, 240, 230);
      noStroke();
      rect(pos.x + 10, pos.y + 10, 130, 80, 10);
      
      // Emoji de categoría
      textAlign(CENTER, CENTER);
      textSize(50);
      const emojis = ['👕', '👖', '👟', '👜'];
      text(emojis[i], pos.x + 75, pos.y + 50);
      
      // Texto con categoría
      if (fuente2) textFont(fuente2);
      fill(42, 42, 42);
      textSize(11);
      textStyle(BOLD);
      text(pos.label.toUpperCase(), pos.x + 75, pos.y + 105);
      pop();
      
      // Tooltip con info de la marca
      if (esHover) {
        push();
        fill(42, 42, 42, 240);
        noStroke();
        rectMode(CENTER);
        if (fuente2) textFont(fuente2);
        rect(mouseX, mouseY - 40, textWidth(prenda.nombre) + 30, 30, 15);
        fill(245, 240, 230);
        textAlign(CENTER, CENTER);
        textSize(13);
        textStyle(BOLD);
        text(prenda.nombre, mouseX, mouseY - 40);
        textSize(11);
        textStyle(NORMAL);
        fill(245, 240, 230, 200);
        text(prenda.tipo, mouseX, mouseY - 60);
        pop();
      }
    }
  }
}

// SISTEMA DE CONTROLES
function crearControles() {
  //Botones
  // Botón START
  let botonStart = createButton('START');
  botonStart.class('boton-principal');
  botonStart.position(width/2 - 80, height/2 + 60);
  botonStart.mousePressed(() => cambiarPantalla(1));
  botonStart.id('btn-start');
  
  // Slider de clima
  let labelClima = createElement('label', 'Clima del día');
  labelClima.class('control-label');
  labelClima.position(width/2 - 140, 210);
  labelClima.id('label-clima');
  
  sliderClima = createSlider(0, 100, 50);
  sliderClima.position(width/2 - 140, 250);
  sliderClima.id('slider-clima');
  
  // Selector de mood
  let labelMood = createElement('label', 'Tu mood de hoy');
  labelMood.class('control-label');
  labelMood.position(width/2 - 140, 310);
  labelMood.id('label-mood');
  
  selectorMood = createSelect();
  selectorMood.position(width/2 - 140, 340);
  selectorMood.option('Arriesgada y segura');
  selectorMood.option('Elegante');
  selectorMood.option('Casual pero chic');
  selectorMood.id('selector-mood');
  
  // Botón para generar outfit
  botonGenerar = createButton('GENERAR OUTFIT');
  botonGenerar.class('boton-principal');
  botonGenerar.position(width/2 - 110, 420);
  botonGenerar.mousePressed(generarOutfit);
  botonGenerar.id('btn-generar');
  
  // Botón nuevo outfit (único botón que también vuelve)
  botonNuevoOutfit = createButton('Nuevo Outfit ✨');
  botonNuevoOutfit.class('boton-principal');
  botonNuevoOutfit.position(width/2 - 90, height - 100);
  botonNuevoOutfit.mousePressed(() => cambiarPantalla(1));
  botonNuevoOutfit.id('btn-nuevo');
  
  actualizarVisibilidadControles();
}

function actualizarVisibilidadControles() {
  select('#btn-start').style('display', pantallaActual === 0 ? 'block' : 'none');
  select('#label-clima').style('display', pantallaActual === 1 ? 'block' : 'none');
  select('#slider-clima').style('display', pantallaActual === 1 ? 'block' : 'none');
  select('#label-mood').style('display', pantallaActual === 1 ? 'block' : 'none');
  select('#selector-mood').style('display', pantallaActual === 1 ? 'block' : 'none');
  select('#btn-generar').style('display', pantallaActual === 1 ? 'block' : 'none');
  select('#btn-nuevo').style('display', pantallaActual === 2 ? 'block' : 'none');
}

function cambiarPantalla(nuevaPantalla) {
  pantallaActual = nuevaPantalla;
  transicionActiva = true;
  opacidadTransicion = 0;
  actualizarVisibilidadControles();
}

function generarOutfit() {
  let clima = sliderClima.value();
  let mood = selectorMood.value();
  
  // Determina qué imagen mostrar según clima y mood
  let imagenKey = null;
  let mensajeClima = "";
  let mensajeMood = "";
  
  // Determina el clima y mood
  if (clima < 33) {
    mensajeClima = "Frío";
    if (mood === 'Arriesgada y segura') {
      imagenKey = 'frioArriesgada';
      mensajeMood = "Arriesgada y segura";
    } else if (mood === 'Casual pero chic') {
      imagenKey = 'frioCasual';
      mensajeMood = "Casual pero chic";
    } else if (mood === 'Elegante') {
      imagenKey = 'frioElegante';
      mensajeMood = "Elegante";
    }
  } else if (clima < 66) {
    mensajeClima = "Templado";
    if (mood === 'Arriesgada y segura') {
      imagenKey = 'templadoArriesgada';
      mensajeMood = "Arriesgada y segura";
    } else if (mood === 'Casual pero chic') {
      imagenKey = 'templadoCasual';
      mensajeMood = "Casual pero chic";
    } else if (mood === 'Elegante') {
      imagenKey = 'templadoElegante';
      mensajeMood = "Elegante";
    }
  } else {
    mensajeClima = "Cálido";
    if (mood === 'Arriesgada y segura') {
      imagenKey = 'calidoArriesgada';
      mensajeMood = "Arriesgada y segura";
    } else if (mood === 'Casual pero chic') {
      imagenKey = 'calidoCasual';
      mensajeMood = "Casual pero chic";
    } else if (mood === 'Elegante') {
      imagenKey = 'calidoElegante';
      mensajeMood = "Elegante";
    }
  }
  
  // Obtiene las marcas específicas para este outfit
  let marcasOutfit = OUTFITS_MARCAS[imagenKey];
  
  let prendas = [
    marcasOutfit.superior,
    marcasOutfit.inferior,
    marcasOutfit.calzado,
    marcasOutfit.accesorio
  ];
  
  let outfitData = {
    prendas: prendas,
    sugerencia: generarSugerencia(clima, mood),
    imagen: null,
    imagenCargada: false,
    mensajeEspecial: ""
  };
  
  // Asigna la imagen si existe
  if (imagenKey && imagenesOutfits[imagenKey]) {
    outfitData.imagen = imagenesOutfits[imagenKey];
    outfitData.imagenCargada = true;
    outfitData.mensajeEspecial = `✨ Outfit especial: ${mensajeClima} + ${mensajeMood}`;
  }
  
  outfitActual = outfitData;
  cambiarPantalla(2);
}

function generarSugerencia(clima, mood) {
  let sugerencias = [];
  
  if (clima < 33) {
    sugerencias = [
      "Perfecto para un café en Usaquén ☕",
      "Ideal para pasear por La Candelaria 🏛️",
      "Listo para un día en el Parque 93 🌳"
    ];
  } else if (clima < 66) {
    sugerencias = [
      "Genial para shopping en Zona T 🛍️",
      "Cómodo para brunch en Chapinero 🥐",
      "Ideal para una tarde en Usaquén 🎨"
    ];
  } else {
    sugerencias = [
      "Fresco para explorar Quinta Camacho 🌺",
      "Perfecto para un picnic en Simón Bolívar 🧺",
      "Listo para rooftop en Parque de la 93 🌅"
    ];
  }
  
  return random(sugerencias);
}

// RESPONSIVIDAD
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  inicializarObjetosFlotantes();
  
  select('#btn-start').position(width/2 - 80, height/2 + 60);
  select('#label-clima').position(width/2 - 140, 210);
  select('#slider-clima').position(width/2 - 140, 250);
  select('#label-mood').position(width/2 - 140, 310);
  select('#selector-mood').position(width/2 - 140, 340);
  select('#btn-generar').position(width/2 - 110, 420);
  select('#btn-nuevo').position(width/2 - 90, height - 100);
}