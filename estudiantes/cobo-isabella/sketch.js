/* Isabella Cobo O. 202420352
THE BOGOTOWN PROJECT: Generador de un póster tipo aviso de “servicios” bogotano.
El usuario puede:
- Escribir un mensaje principal y una firma
- Elegir tipografía y paleta de color
- Arrastrar servicios desde un menú al póster
- Cambiar el tamaño de cada servicio
- Aplicar “ruido” (desgaste) según la edad del aviso

– La IA se utilizó como apoyo técnico para organizar el código, depurar errores y estructurar partes de HTML y CSS que no fueron profundizadas durante el semestre, sin reemplazar el diseño conceptual ni las decisiones creativas del proyecto.

REFERENTES
https://bogota.gov.co/sites/default/files/avisos%20urbanos.jpg
https://www.madeinlatinamerica.co/bufanda-fotocopias-juliana-vargas/p
https://theunsentproject.com/#

*/
// Variables globales
let W = 750;
let H = 1050;
let canvas;

// Referencias a elementos HTML que controlaré desde p5
let inpNombre,
  inpMensaje,
  selTipo,
  selPaleta,
  sldEdad,
  chkRuido,
  btnGuardar,
  contServActivos,
  btnLimpiar;

// Colores
let fondo = "#C6FF00";
let tinta = "#000000";

// Margen interno del póster (dentro del marco)
let margenPoster = 40;

// Lista base de servicios
let serviciosBase = [
  "MINUTOS",
  "RECARGAS",
  "FOTOCOPIAS",
  "EMPANADAS",
  "JUGOS",
  "TINTO",
  "AROMÁTICAS",
];

// El arreglo comienza vacío y se va llenando a medida que el usuario arrastra servicios.
let serviciosEnPoster = [];
let servicioIdCounter = 0;

/*  Estas variables controlan la pantalla inicial de instrucciones que aparece antes de usar la web. "overlay" es la capa que cubre toda la interfaz, "slides" son las diferentes diapositivas explicativas, "prevBtn" y "nextBtn" permiten navegar entre ellas, "startBtn" cierra el onboarding y deja ver la app, "dotsWrap" contiene los punticos de progreso visual, y "slideIndex" indica cuál diapositiva se está mostrando actualmente.*/
let overlay;
let slides = [];
let prevBtn, nextBtn, startBtn, dotsWrap;
let slideIndex = 0;

function setup() {
  // Esta función se ejecuta una vez al inicio. Crea el canvas, configura estilos de dibujo y conecta las variables con los controles HTML.
  canvas = createCanvas(W, H);
  canvas.parent("canvas-holder");

  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  noLoop();
  pixelDensity(2);

  // Acá conecto las variables de p5.dom con los elementos del HTML.
  inpNombre = select("#nombre");
  inpMensaje = select("#mensaje");
  selTipo = select("#tipo");
  selPaleta = select("#paleta");
  sldEdad = select("#edad");
  chkRuido = select("#ruido");
  btnGuardar = select("#guardar");
  contServActivos = select("#servicios-activos");
  btnLimpiar = select("#limpiar-servicios"); // (si luego agregas este botón en el HTML)

  // Slider de desgaste visible solo si hay ruido.
  let lblEdadDom = select('label[for="edad"]');
  let sldEdadDom = select("#edad");

  // Muestra u oculta la etiqueta y el slider de desgaste dependiendo
  // de si el checkbox de ruido (chkRuido) está activado o no.
  function toggleEdadVisibility() {
    let mostrar = chkRuido ? chkRuido.elt.checked : false;
    if (lblEdadDom && sldEdadDom) {
      lblEdadDom.style("display", mostrar ? "block" : "none");
      sldEdadDom.style("display", mostrar ? "block" : "none");
    }
  }
  toggleEdadVisibility();

  // Asigna eventos a los controles de la interfaz: cuando el usuario
  // escribe o cambia algo, se llama a redraw() para actualizar el póster.
  if (inpNombre) inpNombre.input(redraw);
  if (inpMensaje) inpMensaje.input(redraw);
  if (selTipo) selTipo.changed(redraw);
  if (selPaleta) selPaleta.changed(redraw);
  if (sldEdad) sldEdad.input(redraw);

  // Cuando se activa o desactiva el checkbox de ruido:
  // se muestra/oculta el slider de desgaste y se redibuja el póster.
  if (chkRuido) {
    chkRuido.changed(() => {
      toggleEdadVisibility();
      redraw();
    });
  }

  // Si se hace clic en el botón de guardar, se guarda el canvas como una imagen PNG.
  if (btnGuardar) {
    btnGuardar.mousePressed(() => saveCanvas(canvas, "Mi Bogotá", "png"));
  }

  // Inicia la lógica de arrastrar y soltar servicios desde el menú lateral hacia el póster.
  setupDragAndDrop();

  // Inicia el overlay de onboarding con las diapositivas de instrucciones que aparecen al comienzo.
  setupOnboardingOverlay();
}

// Se encarga de dibujar el póster completo en el canvas cada vez que se llama.
function draw() {
  // Color del texto siempre es negro.
  tinta = "#000000";

  // Fondo según la paleta seleccionada.
  if (selPaleta) {
    let p = selPaleta.value();
    if (p === "Verde") fondo = "#C6FF00";
    else if (p === "Rosado") fondo = "#FF3FD7";
    else if (p === "Naranja") fondo = "#FF8A00";
    else if (p === "Amarillo") fondo = "#FFF400";
  }

  // Según la opción elegida en el menú de tipografía, se asigna
  // la fuente correspondiente a la variable fontName.
  let tipo = selTipo ? selTipo.value() : "Typewriter";
  let fontName = "Courier New";

  if (tipo === "Arial") fontName = "Arial";
  if (tipo === "Georgia") fontName = "Georgia";
  if (tipo === "Condensada") fontName = "Arial Narrow";
  if (tipo === "Impact") fontName = "Impact";
  if (tipo === "Typewriter") fontName = "Courier New";

  background(fondo);

  // Aquí dibujé el marco del póster (un rectángulo centrado, más pequeño que el canvas)
  // y se calcula el ancho interno disponible para el texto, restando un margen interior a cada lado.
  noFill();
  stroke(0, 0, 0, 160);
  strokeWeight(3);
  rect(W / 2, H / 2, W * 0.94, H * 0.94, 8);
  let anchoMarco = W * 0.94;
  let anchoUtil = anchoMarco - margenPoster * 2;

  // Aquí construí el titular principal del póster: toma el mensaje del input,
  // usa un texto por defecto si está vacío, lo combina con "BOGOTÁ, ",
  // lo pone en mayúsculas y configura la fuente, estilo y tamaño inicial
  // para poder ajustarlo luego al ancho disponible.
  let msg = inpMensaje ? inpMensaje.value().trim() : "";
  if (msg.length === 0) {
    msg = "TE TENGO UN MENSAJE";
  }
  let titular = ("BOGOTÁ, " + msg).toUpperCase();

  let cajaW = anchoUtil;
  let tamTit = 80;

  textFont(fontName);
  textStyle(BOLD);
  textSize(tamTit);

  while (textWidth(titular) > cajaW && tamTit > 36) {
    tamTit -= 2;
    textSize(tamTit);
  }

  // Dibujo del titular principal
  fill(tinta);
  noStroke();
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(tamTit);
  textFont(fontName);
  text(titular, W * 0.5, H * 0.22, cajaW, H * 0.3);

  // Aquí definí el desgaste del póster. Por defecto 0, pero si el ruido está activado y existe el slider, toma el valor del control y lo convierte en el poster
  let edad = 0;
  if (chkRuido && chkRuido.checked() && sldEdad) {
    edad = int(sldEdad.value());
  }

  // Servicios: acá dibujo cada servicio agregado en una fila centrada, uno debajo de otro...
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textFont(fontName);

  let baseY = H * 0.48;
  let lineH = 60;

  for (let i = 0; i < serviciosEnPoster.length; i++) {
    let s = serviciosEnPoster[i];
    let y = baseY + i * lineH;

    let tam = s.size;
    if (tam < 16) tam = 16;

    textSize(tam);
    // Si el texto es muy largo para el ancho útil, se reduce el tamaño hasta que quepa o llegue al mínimo.
    while (textWidth(s.texto) > anchoUtil && tam > 16) {
      tam -= 1;
      textSize(tam);
    }

    text(s.texto, W * 0.5, y);
  }

  // Firma
  textStyle(NORMAL);
  textSize(26);
  textAlign(RIGHT, BOTTOM);
  textFont(fontName);

  let firma = inpNombre ? inpNombre.value().trim() : "";
  if (firma.length === 0) {
    firma = "firma";
  }

  let xFirma = W / 2 + anchoMarco / 2 - margenPoster * 2;

  text("— " + firma, xFirma, H * 0.94);

  // Textura: si el checkbox de ruido está activo, se dibuja una cantidad de puntos aleatorios
  if (chkRuido && chkRuido.checked()) {
    stroke(0, 0, 0, map(edad, 0, 100, 10, 70));
    let cantidadPuntos = int(map(edad, 0, 100, 600, 6000));
    for (let i = 0; i < cantidadPuntos; i++) {
      point(random(W), random(H));
    }
  }
}

// Funciones personalizadas
function hacerChipDraggable(item) {
  // Vuelve arrastrable un chip de servicio y guarda su texto cuando empieza el drag
  item.elt.setAttribute("draggable", "true");
  item.elt.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", item.elt.dataset.servicio);
  });
}

// Crea un "botón" de servicio en el menú
function crearChipServicio(texto) {
  let menu = select("#servicios-menu");
  if (!menu) return;

  let chip = createSpan(texto);
  chip.addClass("servicio-item");
  chip.attribute("data-servicio", texto);
  chip.parent(menu);
  hacerChipDraggable(chip);
}

// Configura el drag & drop de los servicios sobre el canvas
function setupDragAndDrop() {
  // Selecciono todos los chips de servicio que ya existen en el menú
  let menuItems = selectAll(".servicio-item");
  // A cada chip le activo la posibilidad de ser arrastrado
  for (let i = 0; i < menuItems.length; i++) {
    let item = menuItems[i];
    hacerChipDraggable(item);
  }
  // Obtengo el elemento HTML real del canvas de p5
  let htmlCanvas = canvas.elt;
  // Permito que el canvas acepte cosas arrastradas encima (dragover)
  htmlCanvas.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  // Cuando sueltan un chip sobre el canvas (drop)
  htmlCanvas.addEventListener("drop", (e) => {
    e.preventDefault();
    // Recupero el texto del servicio que se arrastró
    let texto = e.dataTransfer.getData("text/plain");
    if (!texto) return;
    // Si ese servicio ya está en el póster, no lo agrego de nuevo
    let yaExiste = serviciosEnPoster.some((s) => s.texto === texto);
    if (yaExiste) return;
    // Lo agrego al póster y lo elimino del menú
    agregarServicioAlPoster(texto);
    eliminarServicioDelMenu(texto);
  });
}

// Agrega un nuevo servicio al póster y crea su slider
function agregarServicioAlPoster(texto) {
  let nuevo = {
    id: servicioIdCounter++,
    texto: texto,
    size: 48,
  };
  serviciosEnPoster.push(nuevo);
  crearSliderParaServicio(nuevo);
  redraw();
}

// Elimina del menú el botón del servicio cuyo texto coincide
function eliminarServicioDelMenu(texto) {
  let item = select('.servicio-item[data-servicio="' + texto + '"]');
  if (item) {
    item.remove();
  }
}

// Crea un slider de tamaño para un servicio agregado al póster
function crearSliderParaServicio(serv) {
  // Si no existe el contenedor de controles, no hago nada
  if (!contServActivos) return;

  // Contenedor general del control de este servicio
  let wrapper = createDiv();
  wrapper.addClass("servicio-control");
  wrapper.attribute("data-id", serv.id); // guarda el id del servicio

  // Fila de arriba: nombre del servicio y botón X
  let topRow = createDiv();
  topRow.parent(wrapper);
  topRow.style("display", "flex");
  topRow.style("align-items", "center");
  topRow.style("justify-content", "space-between");
  topRow.style("gap", "4px");

  // Texto con el nombre del servicio
  let label = createElement("label", serv.texto);
  label.parent(topRow);

  // Botón X para eliminar el servicio del póster
  let btnX = createButton("✕");
  btnX.addClass("servicio-remove");
  btnX.parent(topRow);
  btnX.mousePressed(() => {
    eliminarServicioDePoster(serv.id);
  });

  // Límites de tamaño para el texto del servicio
  let maxTamServicio = 80;
  let minTamServicio = 20;
  // Slider que controla el tamaño del servicio
  let input = createSlider(minTamServicio, maxTamServicio, serv.size);
  input.parent(wrapper);
  // Cuando se mueve el slider, actualiza el tamaño y redibuja el póster
  input.input(() => {
    serv.size = int(input.value());
    redraw();
  });
  // Se agrega al contenedor de servicios activos
  wrapper.parent(contServActivos);
}

// Elimina un servicio del póster y lo devuelve al menú lateral
function eliminarServicioDePoster(id) {
  // Busco la posición del servicio en el arreglo por su id
  let idx = serviciosEnPoster.findIndex((s) => s.id === id);
  if (idx === -1) return;
  // Quito el servicio del arreglo y lo guardo
  let serv = serviciosEnPoster.splice(idx, 1)[0];
  // Si existe el contenedor de controles, borro también su slider
  if (contServActivos) {
    let control = contServActivos.elt.querySelector('[data-id="' + id + '"]');
    if (control) {
      control.remove();
    }
  }
  // Vuelvo a crear el chip del servicio en el menú lateral
  crearChipServicio(serv.texto);
  // Redibujo el póster sin ese servicio
  redraw();
}

// Configuración de pantalla de instrucciones inicial
function setupOnboardingOverlay() {
  // Busco el contenedor principal del onboarding
  overlay = select("#onboarding");
  if (!overlay) return;
  // Referencias a las diapositivas y a los botones de navegación
  slides = selectAll("#onboarding .slide");
  prevBtn = select("#onboarding .nav.prev");
  nextBtn = select("#onboarding .nav.next");
  startBtn = select("#startBtn");
  dotsWrap = select("#onboarding .overlay-dots");
  // Botón para ir a la diapositiva anterior
  if (prevBtn) {
    prevBtn.mousePressed(() => showSlide(slideIndex - 1));
  }
  // Botón para ir a la diapositiva siguiente
  if (nextBtn) {
    nextBtn.mousePressed(() => showSlide(slideIndex + 1));
  }
  // Botón de "empezar", cierra el overlay
  if (startBtn) {
    startBtn.mousePressed(() => {
      overlay.attribute("aria-hidden", "true");
    });
  }
  // Si el usuario hace clic fuera del contenido, también se cierra el overlay
  overlay.elt.addEventListener("click", (e) => {
    if (e.target === overlay.elt) {
      overlay.attribute("aria-hidden", "true");
    }
  });
  // Muestra la primera diapositiva al inicio
  showSlide(0);
}

// Indica si el overlay de onboarding está visible o no
function overlayVisible() {
  return overlay && overlay.attribute("aria-hidden") !== "true";
}

// Dibujo los punticos de navegación del menú intro
function renderDots() {
  if (!dotsWrap) return;
  // Limpio los dots anteriores
  dotsWrap.elt.innerHTML = "";
  // Crea un punto por cada slide
  for (let i = 0; i < slides.length; i++) {
    let d = createSpan("");
    d.addClass("dot");
    // Marca el punto de la diapositiva actual como activo
    if (i === slideIndex) {
      d.addClass("active");
    }
    d.parent(dotsWrap);
  }
}

// Muestra la diapositiva i del onboarding
function showSlide(i) {
  // Si no hay diapositivas, no hago nada
  if (!slides || slides.length === 0) return;
  // Aseguro que i no se salga del rango (0 hasta última slide)
  slideIndex = constrain(i, 0, slides.length - 1);
  // Activo solo la slide actual y apago las demás
  for (let j = 0; j < slides.length; j++) {
    if (j === slideIndex) {
      slides[j].addClass("active");
    } else {
      slides[j].removeClass("active");
    }
  }
  // Bloqueo el botón "anterior" en la primera slide
  if (prevBtn) {
    prevBtn.elt.disabled = slideIndex === 0;
  }
  // Bloqueo el botón "siguiente" en la última slide
  if (nextBtn) {
    nextBtn.elt.disabled = slideIndex === slides.length - 1;
  }
  // Solo muestro el botón "empezar" en la última slide
  if (startBtn) {
    startBtn.elt.hidden = slideIndex !== slides.length - 1;
  }
  // Actualizo los punticos de abajo
  renderDots();
}

// Navegación por teclado para el onboarding
function keyPressed() {
  // Si el overlay no está visible, no hago nada
  if (!overlayVisible()) return;
  // Flecha derecha: pasa a la siguiente diapositiva
  if (keyCode === RIGHT_ARROW) {
    showSlide(slideIndex + 1);
    // Flecha izquierda: vuelve a la diapositiva anterior
  } else if (keyCode === LEFT_ARROW) {
    showSlide(slideIndex - 1);
    // Tecla ESC: cierra el overlay
  } else if (keyCode === ESCAPE) {
    overlay.attribute("aria-hidden", "true");
  }
}
