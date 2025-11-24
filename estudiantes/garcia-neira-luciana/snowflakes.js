
//clase snowflake para rectangulo amarillo y simulñacion de clima. Esta referencia viene de la reference de p5.js con el nombre snowflakes y fue modificada para que las particulas dejen de caer cuando el boton pasa de modo lluvia a modo aire. 


class Snowflake {
  constructor(p5Instance, bandXOffset = 0) { // <-- NUEVO: bandXOffset para desplazar la banda en X
    this.p = p5Instance || null;

    // Helpers: usan instancia p si existe; si no, el global de p5
    const rand = this.p ? this.p.random : random;
    const h    = this.p ? this.p.height : height;
    const w    = this.p ? this.p.width  : width;
    const col  = this.p ? this.p.color  : color;

    // --- CONFIG DE BANDA ---
    this.bandW  = 255;   // ancho de la banda amarilla
    this.margin = 10;    // margen para no tocar bordes

    // <-- NUEVO: desplazamiento X de la banda (0 para izquierda; 1400 para derecha)
    this.bandXOffset = bandXOffset;

    // --- ESTADO INICIAL ---
    // Reparte Y para que no arranquen todos pegados arriba:
    // (si prefieres que aparezcan ya dentro del canvas, usa rand(0, h))
    this.posY = rand(-h, 0);

    // Centro horizontal aleatorio dentro de la banda, con margen
    this.centerX = rand(this.margin, this.bandW - this.margin);

    // Calcula el radio máximo para no salir de la banda según el centro
    const maxRadiusLeft  = this.centerX - this.margin;
    const maxRadiusRight = (this.bandW - this.margin) - this.centerX;
    const maxRadius      = Math.min(maxRadiusLeft, maxRadiusRight);

    // Radio mínimo > 0 para que no queden fijados en el centro
    const minRadius = 5;
    this.radius = rand(minRadius, Math.max(minRadius, maxRadius));

    // Fase/velocidad angular (diversidad por copo)
    this.initialAngle  = rand(0, 360);
    this.angularSpeed  = rand(20, 50);   // grados/seg; cada copo distinto

    // Tamaño y color
    this.size  = rand(2, 5);
    this.color = col('#FBF3E9');         // crema

    // Flotación para modo aire
    this.floatPhase = rand(0, 360);
    this.floatAmp   = rand(0.6, 1.5);    // amplitud vertical suave
    this.floatRate  = rand(40, 70);      // velocidad de flotación
  }

  update(time, isRaining) {
    const pSin    = this.p ? this.p.sin    : sin;
    const pHeight = this.p ? this.p.height : height;

    // Movimiento horizontal SÓLO dentro de la banda (orbita alrededor de centerX)
    const angle = this.initialAngle + this.angularSpeed * time;
    this.posX = this.centerX + this.radius * pSin(angle);

    if (isRaining) {
      // Caída según tamaño
      const ySpeed = 8 / this.size;
      this.posY += ySpeed;

      // Reiniciar arriba al salir por abajo
      if (this.posY > pHeight) {
        this.resetTop();
      }
    } else {
      // Modo aire: flotación vertical suave (no cae)
      this.posY += pSin(this.floatPhase + time * this.floatRate) * (this.floatAmp / this.size);
    }
  }

  display() {
    const pNoStroke = this.p ? this.p.noStroke : noStroke;
    const pFill     = this.p ? this.p.fill     : fill;
    const pEllipse  = this.p ? this.p.ellipse  : ellipse;

    // (Seguridad) Si por redondeos saliera de la banda, no lo dibujes
    if (this.posX < 0 || this.posX > this.bandW) return;

    // <-- NUEVO: dibujar sumando el desplazamiento horizontal de la banda
    const drawX = this.bandXOffset + this.posX;

    pNoStroke();
    pFill(this.color);
    pEllipse(drawX, this.posY, this.size);
  }

  // Reinicia estado al volver a entrar desde arriba
  resetTop() {
    const rand = this.p ? this.p.random : random;
    const h    = this.p ? this.p.height : height;

    // Nueva Y arriba
    this.posY = rand(-50, 0);

    // Nuevo centro X aleatorio dentro de la banda
    this.centerX = rand(this.margin, this.bandW - this.margin);

    // Recalcula amplitud para no tocar bordes
    const maxRadiusLeft  = this.centerX - this.margin;
    const maxRadiusRight = (this.bandW - this.margin) - this.centerX;
    const maxRadius      = Math.min(maxRadiusLeft, maxRadiusRight);
    const minRadius      = 5;
    this.radius = rand(minRadius, Math.max(minRadius, maxRadius));

    // Nueva fase para que cambie la órbita
    this.initialAngle = rand(0, 360);
    // (Opcional) también puedes variar angularSpeed:
    this.angularSpeed = rand(20, 50);
  }
}
window.Snowflake = Snowflake;



//clase florecita para mini generador. La florecita cambia el tamaño de sus petalos basada en el input de texto del usuario 


class Flor {
  constructor(x, y, w, h, p5Instance) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.p5 = p5Instance;

    this.petaloCount = 10;
    this.petalWidth = 40;
    this.petalHeight = 80;
    this.centerSize = 90;
    this.currentLength = 90;

    this.input = createInput('');
    this.input.size(100);
    this.input.attribute('placeholder', '1 o 2');
    this.input.style('color', '#5CE1E6'); // AZUL
    this.input.style('text-align', 'center');
    this.input.style('border', '2px solid #E2A9F1'); // MORADO
    this.input.style('border-radius', '8px');
    this.input.style('padding', '6px 8px');
    this.input.style('background', 'transparent');
    this.input.style('font-family', 'Horizon, sans-serif');

    this.positionInput();
    this.input.changed(() => {
      this.recomputeLength();
      if (this.p5 && this.p5.redraw) this.p5.redraw();
    });

    this.recomputeLength();
  }

  positionInput() {
    const cnvRect = this.p5.canvas.getBoundingClientRect();
    const pageX = cnvRect.left + window.scrollX;
    const pageY = cnvRect.top + window.scrollY;
    const cx = this.x + this.w / 2;
    const cy = this.y + this.h / 2;
    this.input.position(pageX + cx - 50, pageY + cy - 16);
  }

  recomputeLength() {
    const val = (this.input.value() || '').trim();
    if (val === '1') {
      this.currentLength = random(40, 70);
    } else if (val === '2') {
      this.currentLength = random(110, 150);
    } else {
      this.currentLength = 90;
    }
  }

  dibujar() {
    push();
    translate(this.x + this.w / 2, this.y + this.h / 2);
    fill('#FBF3E9'); // CREMA
    noStroke();

    const L = this.currentLength;

    for (let i = 0; i < this.petaloCount; i++) {
      const ang = (360 / this.petaloCount) * i;
      push();
      rotate(ang);
      translate(L, 0); // mover pétalo hacia afuera
      rotate(90); // girar el pétalo para que siga la dirección radial
      ellipse(0, 0, this.petalWidth, this.petalHeight);
      pop();
    }

    // Centro
    ellipse(0, 0, this.centerSize, this.centerSize);
    pop();

    this.positionInput();
  }
}
