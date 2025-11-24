//Diego lópez Serrano
// Mi bogota
// Este programa genera al usuario un letero de bus con su "vida" de rolo o en bogota. el usuario mete su información relacionada con bogotá y este le genera un letrero de bus para aludir a lo nostalgico y callejero de bogotá.
//Uso de ia: al principio hice mi parte de mi programa pero no resulto, bién con ayuda de la Ia y con instrucciones muy detalladas logre llegar a este programa, dandole herramientas vistas y mis ideas. 

// 1. VARIABLES GLOBALES

let sign; // Variable que contendrá la instancia de la clase Sign, responsable de dibujar el letrero.
let state = {
  // Objeto global para almacenar el estado de la aplicación.
  palette: null, // Almacena la paleta de colores activa (generada aleatoriamente).
  data: null, // Almacena los datos introducidos por el usuario desde el formulario.
  controls: {
    // Almacena los valores de los sliders de control del letrero.
    textScale: 1,
    widthScale: 1,
    heightScale: 1,
  },
};

const PALETTE = {
  // Colores predefinidos basados en la estética de los buses bogotanos.
  red: "#D83A2E",
  mustard: "#C8952B",
  cream: "#F2E9DA",
  green: "#133820",
  black: "#1B1B1B",
  blue: "#2D5B93",
};

const BG_CHOICES = ["red", "mustard", "cream", "green", "black", "blue"]; // Opciones de color de fondo para la paleta.

// 2. FUNCTION PRELOAD

function preload() {
  // En este proyecto, las fuentes se cargan directamente vía CSS en el HTML,
  // por lo que la función p5.js 'preload' se deja vacía.
}

// 3. FUNCTION SETUP
function setup() {
  const c = createCanvas(400, 600); // Crea el canvas con dimensiones 400x600 píxeles.
  // Asumiendo que el HTML tiene un div con id="canvas-holder"
  const canvasHolder = document.getElementById("canvas-holder");
  if (canvasHolder) {
    c.parent("canvas-holder"); // Asigna el canvas al contenedor HTML.
  } else {
    // Si no hay 'canvas-holder', p5.js lo adjuntará al body por defecto.
  }
  pixelDensity(2); // Aumenta la densidad de píxeles para una mejor calidad en pantallas Retina (HiDPI).

  noLoop(); // Detiene el ciclo de dibujo automático de p5.js, 'draw()' solo se ejecuta al llamar a 'redraw()'.

  state.palette = buildPalette(); // Inicializa la paleta de colores.
  sign = new Sign(); // Inicializa la instancia del letrero.

  initFormBindings(); // Enlaza los eventos del formulario y botones (ej: Generar, Regenerar colores).
  initControlsBindings(); // Enlaza los eventos de los sliders de control (tamaño, ancho, alto).

  textFont("Plaster"); // Establece la fuente principal.
  checkFontLoad(); // Llama a la función para asegurar que la fuente se cargue antes de dibujar.
}
// 4. FUNCTION DRAW
function draw() {
  // Comprueba si la fuente 'Plaster' ha cargado (mecanismo de seguridad).
  if (document.fonts && !document.fonts.check("1em Plaster")) {
    return; // Si no ha cargado, sale de la función y espera.
  }

  background("#e7ddd0"); // Dibuja el fondo del canvas (color crema/papel).
  push(); // Guarda el estado actual de las transformaciones y estilos de dibujo.

  textFont("Plaster"); // Asegura la fuente antes de dibujar.
  textStyle(NORMAL); // Establece el estilo de texto normal.

  sign.render(state.data, state.palette, state.controls); // Llama al método de la clase Sign para dibujar todo el letrero.
  pop(); // Restaura el estado guardado.
}

// 5. FUNCIONES PERSONALIZADAS

function checkFontLoad() {
  // Función recursiva para verificar la carga de la fuente.
  if (document.fonts && document.fonts.check("1em Plaster")) {
    redraw(); // Si la fuente está lista, fuerza el primer dibujo del canvas.
  } else {
    setTimeout(checkFontLoad, 100); // Si no está lista, vuelve a intentarlo en 100ms.
  }
}

function updateData(formData) {
  state.data = formData; // Actualiza los datos del usuario.
  redraw(); // Fuerza el redibujo para mostrar el nuevo letrero.
}

function regenerateColors() {
  state.palette = buildPalette(); // Genera una nueva paleta aleatoria.
  redraw(); // Fuerza el redibujo para aplicar los nuevos colores.
}

function pickBackgroundKey() {
  // Selecciona una clave de color aleatoria para el fondo.
  return BG_CHOICES[Math.floor(Math.random() * BG_CHOICES.length)];
}

function pickTextKey(avoidKey) {
  // Selecciona una clave de color para el texto que sea diferente al color de fondo ('avoidKey').
  const textChoices = BG_CHOICES.filter((k) => k !== avoidKey);
  return textChoices[Math.floor(Math.random() * textChoices.length)];
}

function buildPalette() {
  // Construye el objeto de paleta principal con colores aleatorios y fijos.
  const bgKey = pickBackgroundKey();
  const textKey = pickTextKey(bgKey);
  return {
    bgKey, // Clave del color de fondo.
    textKey, // Clave del color de texto principal.
    bg: PALETTE[bgKey], // Valor hexadecimal del fondo.
    text: PALETTE[textKey], // Valor hexadecimal del texto principal.
    accent1: PALETTE.red, // Acento fijo (rojo).
    accent2: PALETTE.blue, // Acento fijo (azul).
    accent3: PALETTE.mustard, // Acento fijo (mostaza).
    neutral: PALETTE.cream, // Color neutral fijo (crema).
  };
}
// 6. EVENTOS DEL MOUSE Y TECLADO
function initFormBindings() {
  // Configura los escuchadores de eventos para el formulario y botones.
  const form = document.getElementById("user-form");
  if (!form) return;
  const regen = document.getElementById("regen");
  const clear = document.getElementById("clear");

  function toData() {
    // Extrae y limpia los datos de los campos del formulario.
    const fd = new FormData(form);
    return {
      nombre: (fd.get("nombre") || "").toString().trim(),
      edad: (fd.get("edad") || "").toString().trim(),
      inicio: (fd.get("inicio") || "").toString().trim(),
      lugar: (fd.get("lugar") || "").toString().trim(),
      comida: (fd.get("comida") || "").toString().trim(),
      favorito: (fd.get("favorito") || "").toString().trim(),
      palabra: (fd.get("palabra") || "").toString().trim(),
    };
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Previene el envío estándar del formulario.
    updateData(toData()); // Obtiene los datos y actualiza el letrero.
  });

  if (regen) regen.addEventListener("click", () => regenerateColors()); // Botón regenerar colores.
  if (clear)
    clear.addEventListener("click", () => {
      form.reset();
      updateData({});
    }); // Botón limpiar formulario.
}

function initControlsBindings() {
  // Configura los escuchadores de eventos para los sliders y el botón de descarga.
  const textSize = document.getElementById("text-size");
  const signWidth = document.getElementById("sign-width");
  const signHeight = document.getElementById("sign-height");
  const downloadBtn = document.getElementById("download");

  // Enlaces para los sliders de control, actualizando 'state.controls' y forzando el redibujo.
  if (textSize) {
    textSize.addEventListener("input", () => {
      state.controls.textScale = parseFloat(textSize.value) || 1;
      redraw();
    });
  }

  if (signWidth) {
    signWidth.addEventListener("input", () => {
      state.controls.widthScale = parseFloat(signWidth.value) || 1;
      redraw();
    });
  }

  if (signHeight) {
    signHeight.addEventListener("input", () => {
      state.controls.heightScale = parseFloat(signHeight.value) || 1;
      redraw();
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      saveCanvas("mi-bogota-letrero", "png"); // Función de p5.js para descargar el canvas como imagen PNG.
    });
  }
}

// 7. CLASES
class Sign {
  // Método principal que coordina el dibujo de todo el letrero.
  render(
    data,
    pal,
    controls = { textScale: 1, widthScale: 1, heightScale: 1 }
  ) {
    this._controls = controls || {
      textScale: 1,
      widthScale: 1,
      heightScale: 1,
    };

    textFont("Plaster"); // Asegura la fuente.

    this.drawBackground(pal); // Dibuja la forma base y el color de fondo.
    this.frame(pal); // Dibuja el marco decorativo alrededor de la forma.
    this.ornaments(pal); // (Actualmente vacío, para decoración futura).

    this.ageInCap(data, pal); // Dibuja el número (edad) en el semicírculo superior.
    this.fillWithText(data, pal); // Dibuja el texto del usuario rellenando el espacio.
  }

  // Dibuja la forma del letrero (rectángulo con semicírculo superior).
  drawBackground(pal) {
    const pad = 26; // Relleno exterior.
    const topY = 140; // Coordenada Y donde comienza el rectángulo.
    const cx = width / 2; // Centro X.
    const r = 100; // Radio del semicírculo.

    const controls = this._controls;
    // Cálculo de ancho y posición basados en el slider 'widthScale'.
    const baseRw = width - pad * 2;
    const rw = baseRw * controls.widthScale;
    const rx = (width - rw) / 2;

    // Cálculo de alto y posición basados en el slider 'heightScale'.
    let baseRh = height - pad - topY;
    baseRh *= 0.75;
    const rh = baseRh * controls.heightScale;

    const bottom = topY + rh; // Coordenada Y inferior.

    this._geom = { pad, topY, bottom, cx, r, rx, rw, rh }; // Almacena la geometría para otros métodos.

    noStroke(); // Desactiva el trazo.
    fill(pal.bg); // Usa el color de fondo generado.
    rect(rx, topY, rw, rh, 16); // Dibuja el rectángulo inferior (con bordes redondeados).
    arc(cx, topY, r * 2, r * 2, PI, 0, CHORD); // Dibuja el semicírculo superior (forma de "gorra").
  }

  // Dibuja los marcos decorativos del letrero.
  frame(pal) {
    const { topY, cx, r, rx, rw, rh } = this._geom;
    noFill(); // Desactiva el relleno, solo dibujará el trazo.

    const sw1 = 12; // Grosor del primer trazo.
    stroke(pal.neutral); // Color crema (neutral).
    strokeWeight(sw1);
    rect(rx, topY, rw, rh, 16);
    arc(cx, topY, r * 2, r * 2, PI, 0, CHORD);

    const sw2 = 6; // Grosor del segundo trazo.
    stroke(pal.accent3); // Color mostaza (acento).
    strokeWeight(sw2);
    rect(rx, topY, rw, rh, 16);
    arc(cx, topY, r * 2, r * 2, PI, 0, CHORD);
  }

  ornaments(pal) {
    // Espacio reservado para agregar futuras decoraciones/patrones.
  }

  // Lógica principal para dibujar el texto rellenando el espacio.
  fillWithText(data, pal) {
    if (!data || this._isEmptyData(data)) return; // No dibuja si no hay datos.

    // 1. Preparación de datos y cola de palabras.
    let baseList = this.buildPhrases(data).map((w) => w.toUpperCase()); // Obtiene las frases del usuario en mayúsculas.
    if (!baseList.length) return;

    let queue = []; // Cola de palabras pendientes por dibujar.

    const fillQueue = () => {
      // Función para rellenar la cola mezclando las frases.
      this.shuffleArray(baseList);
      for (let phrase of baseList) {
        let words = phrase.split(/\s+/);
        for (let w of words) queue.push(w); // Divide cada frase en palabras y las añade a la cola.
      }
    };
    fillQueue(); // Llenado inicial de la cola.

    const { topY, bottom } = this._geom;
    const controls = this._controls;
    const size = 26 * controls.textScale; // Tamaño base del texto, escalado por el control.
    const lineH = size * 1.08; // Altura de línea.

    textAlign(LEFT, CENTER); // Alineación a la izquierda y verticalmente centrada.
    textFont("Plaster");
    textSize(size);

    let y = topY + lineH / 2 + 12; // Punto de inicio Y para la primera línea.

    // --- BUCLE DE DIBUJO ---
    while (y <= bottom - lineH / 2 - 12) {
      // Itera mientras haya espacio vertical.

      if (queue.length === 0) fillQueue(); // Si la cola se vacía, se rellena de nuevo (texto infinito).

      const [minX, maxX] = this.xRangeAtY(y, lineH / 2 + 4); // Calcula el límite horizontal disponible en esta coordenada Y.
      const limit = maxX - minX;

      if (limit < size) {
        y += lineH;
        continue;
      } // Si el espacio es muy estrecho, salta a la siguiente línea.

      let lineWords = []; // Palabras que caben en la línea actual.
      let widths = []; // Anchos de las palabras.
      let totalContentW = 0; // Ancho total del contenido de la línea.
      let minGap = size * 0.2; // Espacio mínimo entre palabras.

      // 1. LLENAR LA LÍNEA (Algoritmo "First-Fit")
      while (queue.length > 0) {
        let nextWord = queue[0];
        let w = textWidth(nextWord);

        const currentLineW =
          lineWords.length === 0 ? 0 : totalContentW + minGap;
        const needed = currentLineW + w;

        if (lineWords.length === 0) {
          // Si es la primera palabra y es demasiado grande, la divide y reinserta.
          if (w > limit) {
            let bigWord = queue.shift();
            if (bigWord.length > 1) {
              let mid = Math.floor(bigWord.length / 2);
              let p1 = bigWord.substring(0, mid) + "-";
              let p2 = bigWord.substring(mid);
              queue.unshift(p1, p2); // Reinserta las dos partes.
            } // Si es una sola letra, la acepta de todos modos (o se quedaría atascado).
            continue; // Vuelve a evaluar (con la palabra dividida).
          }
          // Si cabe, la añade como primera palabra.
          lineWords.push(queue.shift());
          widths.push(w);
          totalContentW = w;
        } else if (needed <= limit) {
          // Si cabe con el espacio mínimo, la añade.
          lineWords.push(queue.shift());
          widths.push(w);
          totalContentW = needed;
        } else {
          // No cabe, termina la construcción de la línea.
          break;
        }
      }

      if (!lineWords.length) {
        y += lineH;
        continue;
      } // Si no se pudo poner ninguna palabra (solo pasaría si el límite es demasiado pequeño).

      // 2. LÓGICA DE JUSTIFICACIÓN (Space-distribution)
      const contentWidthSum = widths.reduce((a, b) => a + b, 0); // Suma de anchos de las palabras.
      const spareSpace = limit - contentWidthSum; // Espacio restante a distribuir.
      let justifiedGap = 0;
      let startX = minX;

      if (lineWords.length > 1) {
        // Distribuye el espacio entre las palabras para justificar.
        justifiedGap = spareSpace / (lineWords.length - 1);
      } else {
        // Si es una sola palabra, la centra.
        startX = minX + spareSpace / 2;
      }

      // Colores disponibles para el texto (excluyendo el color de fondo).
      const allowed = [
        pal.text,
        pal.neutral,
        pal.accent1,
        pal.accent2,
        pal.accent3,
      ].filter((c) => c !== pal.bg);

      noStroke();

      let curX = startX;
      for (let i = 0; i < lineWords.length; i++) {
        // Selecciona un color aleatorio entre los permitidos.
        const color = allowed[Math.floor(Math.random() * allowed.length)];
        fill(color);
        text(lineWords[i], curX, y); // Dibuja la palabra.

        curX += widths[i] + justifiedGap; // Avanza X sumando el ancho de la palabra y el espacio justificado.
      }

      y += lineH; // Pasa a la siguiente línea.
    }
  }

  // Calcula el rango horizontal disponible para dibujar texto en una coordenada Y dada.
  xRangeAtY(y, margin) {
    const { topY, cx, r, rx, rw } = this._geom;
    const inset = 12; // Margen interno del marco.
    const rectMinX = rx + margin + inset;
    const rectMaxX = rx + rw - margin - inset;

    if (y >= topY) return [rectMinX, rectMaxX]; // Si está en la parte rectangular, devuelve los límites del rectángulo.

    // Si está en la parte curva (semicírculo):
    const dy = topY - y;
    if (dy > r) return [cx, cx]; // Si está fuera del radio, el espacio es nulo.
    // Teorema de Pitágoras: a^2 + b^2 = c^2, donde 'c' es el radio 'r', 'a' es la distancia vertical 'dy', y 'b' es la mitad del ancho horizontal disponible.
    const half = Math.sqrt(Math.max(0, r * r - dy * dy));
    // Devuelve los límites X, asegurando que no excedan el marco rectangular exterior.
    return [
      Math.max(rectMinX, cx - half + margin),
      Math.min(rectMaxX, cx + half - margin),
    ];
  }

  // Recopila todos los campos de texto del usuario en una lista de frases.
  buildPhrases(data) {
    const phrases = [];
    if (data) {
      const pieces = [
        data.nombre,
        data.inicio,
        data.lugar,
        data.comida,
        data.favorito,
        data.palabra,
      ];

      for (const p of pieces) {
        if (p && p.trim().length > 0) {
          phrases.push(p.trim()); // Añade solo las frases que no están vacías.
        }
      }
    }

    this.shuffleArray(phrases); // Mezcla las frases para una distribución aleatoria.
    return phrases;
  }

  // Algoritmo Fisher-Yates (Knuth) para mezclar arrays de forma aleatoria y eficiente.
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Dibuja la edad o número en el semicírculo superior.
  ageInCap(data, pal) {
    const age = (data && data.edad && data.edad.toString().trim()) || "";
    if (!age) return;
    const { topY, cx, r } = this._geom;
    const maxWidth = r * 2 - 24; // Ancho máximo disponible en el semicírculo.
    let size = 40;

    textFont("Plaster");
    textAlign(CENTER, CENTER);

    // Ajusta el tamaño de la fuente para que el texto quepa en el ancho máximo.
    for (;;) {
      textSize(size);
      if (textWidth(age) <= maxWidth || size <= 12) break;
      size -= 2;
    }

    // Elige un color de acento aleatorio que no sea el color de fondo.
    const options = [
      pal.text,
      pal.accent1,
      pal.accent2,
      pal.accent3,
      pal.neutral,
    ].filter((c) => c !== pal.bg);
    const ageColor =
      options[Math.floor(Math.random() * options.length)] || pal.text;

    fill(ageColor);
    noStroke();
    const y = topY - r / 2 + 6; // Posición Y centrada en el semicírculo.
    text(age, cx, y); // Dibuja la edad.
  }

  // Función de utilidad para verificar si todos los campos de datos están vacíos.
  _isEmptyData(d) {
    const vals = Object.values(d || {}).map((v) => (v || "").toString().trim());
    return vals.every((v) => v.length === 0);
  }
}