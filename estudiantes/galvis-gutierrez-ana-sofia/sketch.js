// VARIABLES GLOBALES 
let estado = "intro"; 
let imagenSubida; 
let frasesGeneradas = []; 
let miFuente;
let orientacion = "vertical";
let canvas;

// ======= NUEVO PARA STICKERS =======
let stickers = [];
let stickersColocados = []; // AHORA MULTIPLES STICKERS

// Lista de frases bogotanas
let frasesBogotanas = [
  "Uy no, usted no se avispa",
  "Está re-lejos",
  "Caiga al parche",
  "Severa flor",
  "Eso está re áspero",
  "Pilas pues",
  "La re chimba",
  "Si vé",
  "Qué frío tan hp",
  "No copio",
  "No dé papaya",
  "Bueno, a lo que vinimos",
  "Echar los perros",
  "Qué jartera",
  "Mucha bestia",
  "Le jalaron las orejas",
  "Quibo reina",
  "No mi rey",
  "No sea lámpara",
  "Parchese"
];

let imagenesBogota = [
  "bogota1.jpg",
  "bogota2.jpg",
  "bogota3.jpg",
  "bogota4.jpg"
];

// -------------------------------------
function preload() {
    miFuente = loadFont("cityburn.ttf");
    stickers.push(loadImage("sticker1.png"));
    stickers.push(loadImage("sticker2.png"));
    stickers.push(loadImage("sticker3.png"));
    stickers.push(loadImage("sticker4.png"));
    stickers.push(loadImage("sticker5.png"));
    stickers.push(loadImage("sticker6.png"));
   stickers.push(loadImage("sticker7.png"));
     stickers.push(loadImage("sticker8.png"));
  
  
  loadImage("bogota1.jpg");
  loadImage("bogota2.jpg");
  loadImage("bogota3.jpg");
  

}

// -------------------------------------
function setup() {
    noLoop();

    // Activar clic en las miniaturas para cargar en el lienzo
    selectAll(".ilustraMini").forEach(img => {
        img.mousePressed(() => {
            imagenSubida = loadImage(img.elt.src, () => {
                estado = "poster";
                cambiarPantalla("posterUI");
                redraw();
            });
        });
    });

    inputImagen = select("#inputImagen");
    botonFrases = select("#botonFrases");

    inputImagen.changed(handleFile);
    botonFrases.mousePressed(cambiarFrases);

    select("#btnPoster").mousePressed(() => {
        cambiarPantalla("posterUI");
        estado = "poster";    
    });

    select("#btnIlustraciones").mousePressed(() => cambiarPantalla("ilustraciones"));
    select("#volverIntro1").mousePressed(() => cambiarPantalla("intro"));

    select("#botonVertical").mousePressed(() => crearLienzo("vertical"));
    select("#botonHorizontal").mousePressed(() => crearLienzo("horizontal"));
    select("#btnDescargar").mousePressed(descargarPoster);



    cargarStickersEnPanel();
  cargarImagenesBogota();

}

// -------------------------------------
function cambiarPantalla(p) {
    select("#intro").addClass("oculto");
    select("#posterUI").addClass("oculto");
    select("#ilustraciones").addClass("oculto");
    select("#" + p).removeClass("oculto");
}

// -------------------------------------
function crearLienzo(tipo) {
    orientacion = tipo;

    if (canvas) canvas.remove();

    if (tipo === "vertical") {
        canvas = createCanvas(700, 1000);
    } else {
        canvas = createCanvas(1000, 700);
    }

    canvas.parent(document.querySelector("main"));
    textAlign(CENTER, CENTER);
    rectMode(CENTER);

    loop();
    redraw();
}

// -------------------------------------
function draw() {
    if (estado !== "poster") return;

    background(220, 225, 230);

    if (imagenSubida) {
        image(imagenSubida, 0, 0, width, height);
    }

    if (frasesGeneradas.length === 2) {
        mostrarFrase(frasesGeneradas[0], width * 0.3, height * 0.4, -0.3);
        mostrarFrase(frasesGeneradas[1], width * 0.7, height * 0.7, 0.25);
    }

    // ======= DIBUJAR TODOS LOS STICKERS =======
    stickersColocados.forEach(s => {
        push();
        drawingContext.shadowBlur = 20;
        drawingContext.shadowColor = "rgba(0,0,0,0.4)";
        image(s.imagen, s.x, s.y, s.w, s.h);
        pop();
    });
}

// -------------------------------------
function mostrarFrase(txt, x, y, ang) {
    push();
    translate(x, y);
    rotate(ang);
    textFont(miFuente);
    textSize(50);
    textAlign(CENTER, CENTER);

    let paddingX = 40;
    let paddingY = 30;

    let w = textWidth(txt) + paddingX;
    let h = textAscent() + textDescent() + paddingY;

    noStroke();
    fill(0, 150);
    rect(10, 10, w, h, 25);

    fill(255, 240);
    stroke("#1a3a6b");
    strokeWeight(6);
    rect(0, 0, w, h, 25);

    stroke("#ffd600");
    strokeWeight(3);
    noFill();
    rect(0, 0, w - 10, h - 10, 25);

    fill(0);
    noStroke();
    text(txt, 0, 0);
    pop();
}
function cargarImagenesBogota() {
    let cont = select("#galeriaBogota");

    imagenesBogota.forEach(src => {
        let mini = createImg(src, "");
        mini.class("ilustraMini");
        mini.parent(cont);

        mini.mousePressed(() => {
            imagenSubida = loadImage(src, () => {
                estado = "poster";
                cambiarPantalla("posterUI");
              botonFrases.removeAttribute("disabled");

  
                redraw();
            });
        });
    });
}


// -------------------------------------
function handleFile() {
    let file = inputImagen.elt.files[0];
    if (!file) return;

    if (file.type.includes("image")) {
        let reader = new FileReader();

        reader.onload = e => {
            imagenSubida = loadImage(e.target.result, () => {
                estado = "poster";
                botonFrases.removeAttribute("disabled");
                redraw();
            });
        };

        reader.readAsDataURL(file);
    }
}

// -------------------------------------
function cambiarFrases() {
    frasesGeneradas = [];
    let f1 = random(frasesBogotanas);
    let f2 = random(frasesBogotanas);

    while (f2 === f1) {
        f2 = random(frasesBogotanas);
    }

    frasesGeneradas.push(f1, f2);

    redraw();
}

// -------------------------------------
function cargarStickersEnPanel() {
    let panel = select("#stickerCarousel");

    stickers.forEach((img, index) => {
        let div = createDiv();
        div.class("stickerOption");
        div.parent(panel);

        let imagenHTML = createImg(img.canvas.toDataURL(), "");
        imagenHTML.parent(div);
        imagenHTML.style("width", "70px");

        // AL HACER CLIC AGREGA UN NUEVO STICKER AL LIENZO
        div.mousePressed(() => {
            stickersColocados.push({
                imagen: stickers[index],
                x: width / 2 - 75,
                y: height / 2 - 75,
                w: 150,
                h: 150,
                moviendo: false
            });
            redraw();
        });
    });
}

// -------------------------------------
function descargarPoster() {
    saveCanvas(canvas, "poster_bogotano", "png");
}

// -------------------------------------
// MOVIMIENTO INDIVIDUAL DE STICKERS
function mousePressed() {
    for (let i = stickersColocados.length - 1; i >= 0; i--) {
        let s = stickersColocados[i];

        if (
            mouseX > s.x && mouseX < s.x + s.w &&
            mouseY > s.y && mouseY < s.y + s.h
        ) {
            s.moviendo = true;

            // traer al frente al sticker clickeado
            stickersColocados.push(stickersColocados.splice(i, 1)[0]);

            break;
        }
    }
}

function mouseDragged() {
    stickersColocados.forEach(s => {
        if (s.moviendo) {
            s.x = mouseX - s.w / 2;
            s.y = mouseY - s.h / 2;
            redraw();
        }
    });
}

function mouseReleased() {
    stickersColocados.forEach(s => s.moviendo = false);
}
