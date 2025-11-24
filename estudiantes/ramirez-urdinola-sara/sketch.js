//Sara Ramírez
//Bogotá a Piezas
//El generador es de posibles experiencias y de ver a Bogotá siendo limitada por lugares conocidos, permite a la persona jugar con lo que se ha estipulado y observar como modificando ciertas cosas se puede apreciar Bogotá
//La Inteligencia Artifical se uso para solucionar problemas, identificar soluciones y ayudar cuando se quería incluir algo en la parte de sonido respetando lo que se conocía y se desconocía

//Inicio código
//Variables
let estado = 0;
let botonInicio;
let lugares = []; //Arreglo de los lugares
let imagenes = []; //Arreglo para las imagenes
let experiencia;
let sliderVolumen, sliderTexto, sliderIluminacion;
let botonColorTexto, botonRepetirAudio, botonFiltroCalido, botonFiltroFrio;
let botonOtroTexto;
let fondoInicio;
let fuenteTanPearl;
let nombres = [];
let lugarSeleccionado = -1;
let botonNarrativa;
let botonVisual;
let botonSonora;
let textosMonserrate = [];
let textosJardin = [];
let textosMercado = [];
let textosEstadio = [];
let textosParque = [];
let textosPlanetario = [];
let colorTexto = "#FFFFFF";
let mostrarFotoFondo = true;
let textosNarrativos = [];
let indiceTextoNarrativo = 0;
let imagenVisualSeleccionada = -1;
let imagenConfirmada = false;
let botonEscogerImagen;
let audiosVisuales = [];
let audioSeleccionado = null;
let botonPlayPause;
let reproduciendo = false;
let aplicarFiltroCalido = false;
let aplicarFiltroFrio = false;
let narrativaGenerada = null;


//Function
function preload() {
  fondoInicio = loadImage("assets/lugar/fondoInicio.jpg");
  fuenteTanPearl = loadFont("tanpearl.otf");
  seleccionMonserrate = loadImage("assets/lugar/Monserrate.jpg");
  seleccionMercado = loadImage("assets/lugar/mercado.jpg");
  seleccionPlanetario = loadImage("assets/lugar/planetario.jpg");
  seleccionJardin = loadImage("assets/lugar/jardin.jpg");
  seleccionEstadio = loadImage("assets/lugar/estadio.jpg");
  seleccionParque = loadImage("assets/lugar/parque.jpg");
  textosMonserrate1 = loadStrings("assets/textos/Monserrate1.txt");
  textosMonserrate2 = loadStrings("assets/textos/Monserrate2.txt");
  textosMonserrate3 = loadStrings("assets/textos/Monserrate3.txt");
  textosMercado1 = loadStrings("assets/textos/Mercado1.txt");
  textosMercado2 = loadStrings("assets/textos/Mercado2.txt");
  textosMercado3 = loadStrings("assets/textos/Mercado3.txt");
  textosJardin1 = loadStrings("assets/textos/Jardin1.txt");
  textosJardin2 = loadStrings("assets/textos/Jardin2.txt");
  textosJardin3 = loadStrings("assets/textos/Jardin3.txt");
  textosEstadio1 = loadStrings("assets/textos/Estadio1.txt");
  textosEstadio2 = loadStrings("assets/textos/Estadio2.txt");
  textosEstadio3 = loadStrings("assets/textos/Estadio3.txt");
  textosPlanetario1 = loadStrings("assets/textos/Planetario1.txt");
  textosPlanetario2 = loadStrings("assets/textos/Planetario2.txt");
  textosPlanetario3 = loadStrings("assets/textos/Planetario3.txt");
  textosParque1 = loadStrings("assets/textos/Parque1.txt");
  textosParque2 = loadStrings("assets/textos/Parque2.txt");
  textosParque3 = loadStrings("assets/textos/Parque3.txt");
  imgMonserrate1 = loadImage("assets/imagenes/monserrate1.jpg");
  imgMonserrate2 = loadImage("assets/imagenes/monserrate2.jpg");
  imgMercado1 = loadImage("assets/imagenes/mercado1.jpg");
  imgMercado2 = loadImage("assets/imagenes/mercado2.jpg");
  imgPlanetario1 = loadImage("assets/imagenes/planetario1.jpg");
  imgPlanetario2 = loadImage("assets/imagenes/planetario2.jpg");
  imgParque1 = loadImage("assets/imagenes/parque1.jpg");
  imgParque2 = loadImage("assets/imagenes/parque2.jpg");
  imgJardin1 = loadImage("assets/imagenes/jardin1.jpg");
  imgJardin2 = loadImage("assets/imagenes/jardin2.jpg");
  imgEstadio1 = loadImage("assets/imagenes/estadio1.jpg");
  imgEstadio2 = loadImage("assets/imagenes/estadio2.jpg");
  let audioMonserrate1 = loadSound("assets/sonido/monserrate.mp3");
  let audioMonserrate2 = loadSound("assets/sonido/monserrate2.mp3");
  let audioMercado1 = loadSound("assets/sonido/mercado.mp3");
  let audioMercado2 = loadSound("assets/sonido/mercado2.mp3");
  let audioEstadio1 = loadSound("assets/sonido/estadio.mp3");
  let audioEstadio2 = loadSound("assets/sonido/estadio2.mp3");
  let audioJardin1 = loadSound("assets/sonido/jardin.mp3");
  let audioJardin2 = loadSound("assets/sonido/jardin2.mp3");
  let audioParque1 = loadSound("assets/sonido/parque.mp3");
  let audioParque2 = loadSound("assets/sonido/parque2.mp3");
  let audioPlanetario1 = loadSound("assets/sonido/planetario.mp3");
  let audioPlanetario2 = loadSound("assets/sonido/planetario2.mp3");

  //Arreglo imagenes
  imagenes = [
    seleccionMonserrate,
    seleccionMercado,
    seleccionPlanetario,
    seleccionJardin,
    seleccionEstadio,
    seleccionParque,
  ];

  //Arreglo nombres
  nombres = [
    "Monserrate",
    "Mercado de las Pulgas",
    "Planetario de Bogotá",
    "Jardín Botánico",
    "Estadio El Campín",
    "Parque Simón Bolívar",
  ];

  //Arreglo textos

  textosMonserrate = [textosMonserrate1, textosMonserrate2, textosMonserrate3];
  textosMercado = [textosMercado1, textosMercado2, textosMercado3];
  textosPlanetario = [textosPlanetario1, textosPlanetario2, textosPlanetario3];
  textosJardin = [textosJardin1, textosJardin2, textosJardin3];
  textosEstadio = [textosEstadio1, textosEstadio2, textosEstadio3];
  textosParque = [textosParque1, textosParque2, textosParque3];

  textosNarrativos = [
    textosMonserrate,
    textosMercado,
    textosPlanetario,
    textosJardin,
    textosEstadio,
    textosParque,
  ];

  //Arreglo imagenes

  imagenesVisuales = [
    [imgMonserrate1, imgMonserrate2],
    [imgMercado1, imgMercado2],
    [imgPlanetario1, imgPlanetario2],
    [imgJardin1, imgJardin2],
    [imgEstadio1, imgEstadio2],
    [imgParque1, imgParque2],
  ];

  //Arreglo audios
  audiosVisuales = [
    [audioMonserrate1, audioMonserrate2],
    [audioMercado1, audioMercado2],
    [audioPlanetario1, audioPlanetario2],
    [audioJardin1, audioJardin2],
    [audioEstadio1, audioEstadio2],
    [audioParque1, audioParque2],
  ];
}

//Setup
function setup() {
  createCanvas(1100, 800);

  //Botón de inicio
  botonInicio = createButton("Comenecemos");
  fijarEstilo(botonInicio, width/2-160, height / 2 +350);
  
  //estilos estética botón
  botonInicio.size(300, 80);
  botonInicio.style("background-color", "#871E07");
  botonInicio.style("color", "#FFFFFF");
  botonInicio.style("font-size", "32px");
  botonInicio.style("font-family", "Georgia");
  botonInicio.style("border", "none");
  botonInicio.style("border-radius", "20px");
  botonInicio.style("cursor", "pointer");
  botonInicio.mousePressed(() => (estado = 1)); //Cambio de estado

  //Sliders y botones de los distintos estados
  sliderVolumen = createSlider(0, 1, 0.5, 0.1);
      fijarEstilo(sliderVolumen, 20, 320);
  sliderVolumen.style("width", "200px");
  sliderVolumen.hide();

  sliderTexto = createSlider(12, 48, 24, 2);
  fijarEstilo(sliderTexto, 20, 340);
  sliderTexto.hide();

  sliderIluminacion = createSlider(0, 255, 128, 10);
  fijarEstilo(sliderIluminacion, 20, 440);

  sliderIluminacion.position(20, 320);
  sliderIluminacion.hide();

  botonRepetirAudio = createButton("Repetir Audio");
fijarEstilo(botonRepetirAudio, 20, 390);
  botonRepetirAudio.mousePressed(() => {
    if (audioSeleccionado) {
      audioSeleccionado.stop();
      audioSeleccionado.play();
      botonPlayPause.html("Pause");
    }
  });
  botonRepetirAudio.hide();

  botonFiltroCalido = createButton("Filtro Cálido");
  fijarEstilo(botonFiltroCalido, 20, 380);
  botonFiltroCalido.hide();
  botonFiltroCalido.mousePressed(() => {
    aplicarFiltroCalido = true;
    aplicarFiltroFrio = false;
  });
  botonFiltroCalido.hide();

  botonFiltroFrio = createButton("Filtro Frío");
 fijarEstilo(botonFiltroFrio, 20, 430);
  botonFiltroFrio.hide();
  botonFiltroFrio.mousePressed(() => {
    aplicarFiltroFrio = true;
    aplicarFiltroCalido = false;
  });
  botonFiltroFrio.hide();

  botonColorTexto = createButton("Cambiar color texto");
     fijarEstilo(botonColorTexto, 20, 390);
  botonColorTexto.mousePressed(() => {
    colorTexto = colorTexto === "#FFFFFF" ? "#FFD700" : "#FFFFFF";
  });
  botonColorTexto.hide();

  botonOtroTexto = createButton("Otro texto");
 fijarEstilo(botonOtroTexto, 20, 450);
  botonOtroTexto.mousePressed(() => {
    if (lugarSeleccionado >= 0) {
      indiceTextoNarrativo =
        (indiceTextoNarrativo + 1) % textosNarrativos[lugarSeleccionado].length;
    }
  });
  botonOtroTexto.hide();

  botonNarrativa = createButton("Narrativa");
  fijarEstilo(botonNarrativa, 400, 550);
  botonNarrativa.size(300, 60);
  botonNarrativa.style("background-color", "#294f32");
  botonNarrativa.style("color", "#FFFFFF");
  botonNarrativa.style("font-size", "28px");
  botonInicio.style("font-family", "Georgia");
  botonNarrativa.style("border", "none");
  botonNarrativa.style("border-radius", "12px");
  botonNarrativa.style("cursor", "pointer");

  botonNarrativa.mousePressed(() => {
    experiencia = "narrativa";
    estado = 3;
  });
  botonNarrativa.hide();

  botonVisual = createButton("Visual");
    fijarEstilo(botonVisual, 400, 650);
  botonVisual.size(300, 60);
  botonVisual.style("background-color", "#476087");
  botonVisual.style("color", "#FFFFFF");
  botonVisual.style("font-size", "28px");
  botonInicio.style("font-family", "Georgia");
  botonVisual.style("border", "none");
  botonVisual.style("border-radius", "12px");
  botonVisual.style("cursor", "pointer");
  botonInicio.style("font-family", "Georgia");
  botonVisual.mousePressed(() => {
    experiencia = "visual";
    estado = 3;
    imagenVisualSeleccionada = 0;
  });
  botonVisual.hide();

  botonSonora = createButton("Sonora");
     fijarEstilo(botonSonora, 400, 750);
  botonSonora.size(300, 60);
  botonSonora.style("background-color", "#8a4624");
  botonSonora.style("color", "#FFFFFF");
  botonSonora.style("font-size", "28px");
  botonInicio.style("font-family", "Georgia");
  botonSonora.style("border", "none");
  botonSonora.style("border-radius", "12px");
  botonSonora.style("cursor", "pointer");

  botonSonora.mousePressed(() => {
    experiencia = "sonora";
    estado = 3;
  });
  botonSonora.hide();

  botonEscogerImagen = createButton("Escoger imagen");
  fijarEstilo(botonEscogerImagen, 460, 700);
  botonEscogerImagen.size(200, 50);
  botonEscogerImagen.style("background-color", "#294f32");
  botonEscogerImagen.style("color", "#FFFFFF");
  botonEscogerImagen.style("font-size", "20px");
  botonEscogerImagen.style("font-family", "Georgia");
  botonEscogerImagen.style("border", "none");
  botonEscogerImagen.style("border-radius", "12px");
  botonEscogerImagen.style("cursor", "pointer");
  botonEscogerImagen.mousePressed(() => {
    if (imagenVisualSeleccionada >= 0) {
      imagenConfirmada = true;
    }
  });
  botonEscogerImagen.hide();

  botonPlayPause = createButton("Play");
  fijarEstilo(botonPlayPause, 500, 760);
  botonPlayPause.size(100, 40);
  botonPlayPause.mousePressed(togglePlayPause);
  botonPlayPause.hide();
  
  botonDescargar = createButton("Descargar");
fijarEstilo(botonDescargar, 960, 20);
botonDescargar.size(150, 40);
botonDescargar.style("background-color", "#333");
botonDescargar.style("color", "#fff");
botonDescargar.style("border", "none");
botonDescargar.style("border-radius", "8px");
botonDescargar.style("cursor", "pointer");
botonDescargar.hide();

botonDescargar.mousePressed(() => {
  if (estado === 3 && experiencia === "narrativa" && narrativaGenerada) {
    // Descargar narrativa como archivo de texto
    saveStrings([narrativaGenerada], "narrativa.txt");
  } else {
    // Descargar el canvas como imagen
    saveCanvas("mi_experiencia", "png");
  }
});
  
}
 
//Draw
function draw() {
  background(220);

  if (estado === 0) {
    mostrarInicio();
  } else if (estado === 1) {
    mostrarLugares();
  } else if (estado === 2) {
    mostrarOpcionesExperiencia();
  } else if (estado === 3) {
   if (experiencia === "visual") mostrarExperienciaVisual();
    else if (experiencia === "sonora") mostrarExperienciaSonora();
    else if (experiencia === "narrativa") mostrarExperienciaNarrativa();
  }
}

//Funciones personalizadas
//fondo con imagen
function mostrarInicio() {
  background(0);
  image(fondoInicio, 0, 0, width, height);
  fill(0, 0, 0, 100);
  rect(0, 0, width, height);
  //texto introductorio
  textAlign(CENTER, CENTER);
  textFont(fuenteTanPearl);
  textSize(48);
  fill(255);
  text(
    "Bogotá a Piezas\nConoce lugares de Bogotá\nde la forma que prefieras",
    width / 2,
    height / 2 - 100
  );
  botonInicio.show();
  botonDescargar.hide();
}

function mostrarLugares() {
  background(140, 126, 100);
  textAlign(CENTER);
  textSize(48);
  fill(255);
  text("Escoge un lugar de Bogotá", width / 2, 100);

  //Variables para cuadrícula de imagenes
  let imgW = 250;
  let imgH = 180;
  let marginX = 100;
  let marginY = 200;
  let espacioX = 300;
  let espacioY = 250;

  lugares = [];

  //Mostrar las imagenes en 2 filas x 3 columnas
  for (let i = 0; i < imagenes.length; i++) {
    let col = i % 3;
    let fila = i < 3 ? 0 : 1;

    let x = marginX + col * espacioX;
    let y = marginY + fila * espacioY;
    image(imagenes[i], x, y, imgW, imgH);
    textSize(20);
    text(nombres[i], x + imgW / 2, y + imgH + 30);

    // Guardar coordenadas para detección de clic
    lugares.push({ x: x, y: y, w: imgW, h: imgH });
  }
  botonInicio.hide();
}

//Detectar al dar click
function mousePressed() {
  if (estado === 1) {
    for (let i = 0; i < lugares.length; i++) {
      let l = lugares[i];
      if (
        mouseX > l.x &&
        mouseX < l.x + l.w &&
        mouseY > l.y &&
        mouseY < l.y + l.h
      ) {
        lugarSeleccionado = i;
        indiceTextoNarrativo = 0;
        estado = 2;
      }
    }
  }

  if (estado === 3 && experiencia === "visual" && !imagenConfirmada) {
    let imgW = 250,
      imgH = 180;
    let img1X = width / 2 - 300,
      img1Y = height / 2 - 200;
    let img2X = width / 2 + 50,
      img2Y = height / 2 - 200;

    if (
      mouseX > img1X &&
      mouseX < img1X + imgW &&
      mouseY > img1Y &&
      mouseY < img1Y + imgH
    ) {
      imagenVisualSeleccionada = 0;
      console.log("Imagen 1 seleccionada");
    }

    if (
      mouseX > img2X &&
      mouseX < img2X + imgW &&
      mouseY > img2Y &&
      mouseY < img2Y + imgH
    ) {
      imagenVisualSeleccionada = 1;
      console.log("Imagen 2 seleccionada");
    }
  }

  if (estado === 3 && experiencia === "sonora" && !audioSeleccionado) {
    if (
      mouseX > width / 2 - 150 &&
      mouseX < width / 2 - 30 &&
      mouseY > 200 &&
      mouseY < 250
    ) {
      audioSeleccionado = audiosVisuales[lugarSeleccionado][0];
      audioSeleccionado.play();
      botonPlayPause.show();
      botonPlayPause.html("Pause");
    }
    if (
      mouseX > width / 2 + 30 &&
      mouseX < width / 2 + 150 &&
      mouseY > 200 &&
      mouseY < 250
    ) {
      audioSeleccionado = audiosVisuales[lugarSeleccionado][1];
      audioSeleccionado.play();
      botonPlayPause.show();
      botonPlayPause.html("Pause");
    }
  }
}

function mostrarOpcionesExperiencia() {
  if (lugarSeleccionado < 0) return;
  image(imagenes[lugarSeleccionado], 0, 0, width, height);
  fill(0, 0, 0, 100);
  rect(0, 0, width, height);

  textAlign(CENTER, CENTER);
  textFont(fuenteTanPearl);
  textSize(48);
  fill(255);
  text(
    "Escoge la experiencia con\nla que deseas conocer tu elección",
    width / 2,
    150
  );

  botonNarrativa.show();
  botonVisual.show();
  botonSonora.show();
}

function mostrarExperienciaSonora() {
  image(imagenes[lugarSeleccionado], 0, 0, width, height);
  fill(0, 0, 0, 120);
  rect(0, 0, width, height);

  if (!audioSeleccionado) {
    textAlign(CENTER);
    textSize(30);
    fill(255);
    text("Escoge un audio", width / 2, 100);

    fill(200);
    rect(width / 2 - 150, 200, 150, 50);
    rect(width / 2 + 30, 200, 150, 50);
    fill(0);
    text("Audio 1", width / 2 - 75, 230);
    text("Audio 2", width / 2 + 102, 230);

    botonPlayPause.hide();
    sliderVolumen.hide();
    botonRepetirAudio.hide();
  } else {
    // Barra de progreso
    let dur = audioSeleccionado.duration();
    let t = audioSeleccionado.currentTime();

    stroke(255);
    line(100, height / 2, width - 100, height / 2);

    let progreso = map(t, 0, dur, 100, width - 100);
    fill(255, 220, 0);
    noStroke();
    ellipse(progreso, height / 2, 20, 20);

    fill(255);
    textSize(16);
    text(
      nf(t, 2, 1) + " / " + nf(dur, 2, 1) + " seg",
      width / 2,
      height / 2 + 40
    );

    botonPlayPause.show();
  }
  if (botonNarrativa) botonNarrativa.hide();
  if (botonVisual) botonVisual.hide();
  if (botonSonora) botonSonora.hide();
  sliderVolumen.show();
  botonRepetirAudio.show();
  botonDescargar.show();

  if (audioSeleccionado && audioSeleccionado.isPlaying()) {
    audioSeleccionado.setVolume(sliderVolumen.value());
  }

}

function mostrarExperienciaVisual() {
  image(imagenes[lugarSeleccionado], 0, 0, width, height);
  fill(0, 0, 0, 120);
  rect(0, 0, width, height);

  if (botonNarrativa) botonNarrativa.hide();
  if (botonVisual) botonVisual.hide();
  if (botonSonora) botonSonora.hide();

  if (!imagenConfirmada) {
    botonEscogerImagen.show();

    let img1 = imagenesVisuales[lugarSeleccionado][0];
    let img2 = imagenesVisuales[lugarSeleccionado][1];

    let imgW = 250,
      imgH = 180;
    let img1X = width / 2 - 300,
      img1Y = height / 2 - 200;
    let img2X = width / 2 + 50,
      img2Y = height / 2 - 200;

    image(img1, img1X, img1Y, imgW, imgH);
    image(img2, img2X, img2Y, imgW, imgH);

    if (imagenVisualSeleccionada >= 0) {
      noFill();
      stroke(255, 220, 0);
      strokeWeight(4);
      let selX = imagenVisualSeleccionada === 0 ? img1X : img2X;
      let selY = imagenVisualSeleccionada === 0 ? img1Y : img2Y;
      rect(selX - 4, selY - 4, imgW + 8, imgH + 8);
    }

    sliderIluminacion.hide();
    botonFiltroCalido.hide();
    botonFiltroFrio.hide();
  } else {
    let imgElegida =
      imagenesVisuales[lugarSeleccionado][imagenVisualSeleccionada];

    tint(sliderIluminacion.value());

    image(imgElegida, 0, 0, width, height);
    noTint();
    noStroke();
    fill(255);

    if (aplicarFiltroCalido) {
      fill(255, 150, 50, 80); // naranja suave
      rect(0, 0, width, height);
    }
    if (aplicarFiltroFrio) {
      fill(50, 150, 255, 80); // azul suave
      rect(0, 0, width, height);
    }

    sliderIluminacion.show();
    botonFiltroCalido.show();
    botonFiltroFrio.show();
    botonDescargar.show();

    botonEscogerImagen.hide();

    noStroke();
    noTint();
    fill(255);
  }
}

function mostrarExperienciaNarrativa() {
  if (mostrarFotoFondo) {
    image(imagenes[lugarSeleccionado], 0, 0, width, height);
    fill(0, 0, 0, 120);
    rect(0, 0, width, height);
  } else {
    background(50);
  }

  if (botonNarrativa) botonNarrativa.hide();
  if (botonVisual) botonVisual.hide();
  if (botonSonora) botonSonora.hide();

  sliderTexto.show();
  botonColorTexto.show();
  botonOtroTexto.show();
  botonDescargar.show();
  
  // Mostrar texto narrativo según lugar y opción
  textAlign(CENTER, TOP);
  textFont(fuenteTanPearl);
  textSize(sliderTexto.value());
  fill(colorTexto);

  let lineas = textosNarrativos[lugarSeleccionado][indiceTextoNarrativo];
  let yInicial = height / 2 - (lineas.length * sliderTexto.value()) / 2; // centrar verticalmente
  for (let i = 0; i < lineas.length; i++) {
    text(lineas[i], width / 2, yInicial + i * (sliderTexto.value() + 10));
  }
}

function togglePlayPause() {
  if (audioSeleccionado) {
    if (audioSeleccionado.isPlaying()) {
      audioSeleccionado.pause();
      botonPlayPause.html("Play");
    } else {
      audioSeleccionado.play();
      botonPlayPause.html("Pause");
    }
  }
}

function generarNarrativaAleatoria() {
  if (lugarSeleccionado < 0) return;

  let inicio = random(textosNarrativos[lugarSeleccionado][0]);
  let desarrollo = random(textosNarrativos[lugarSeleccionado][1]);
  let cierre = random(textosNarrativos[lugarSeleccionado][2]);

  narrativaGenerada = inicio + " " + desarrollo + " " + cierre;
}

function fijarEstilo(elemento, x, y) {
  elemento.style("position", "absolute");
  elemento.style("top", y + "px");
  elemento.style("left", x + "px");
  elemento.style("margin", "0");
}