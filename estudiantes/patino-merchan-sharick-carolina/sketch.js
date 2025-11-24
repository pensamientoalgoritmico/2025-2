//Sharick Carolina Patiño Merchán 
// RITMOS DE CIUDAD: Un generador que traduce las multiples miradas de Bogotá 
//Es un programa donde puedes recorrer las diversas localidades de bogotá conocer sobre ellas y en el momento que quieras terminar el recorrido utilizas el boton de la esquina inferior derecha alli te lleva a una selección de localidades y te genera los posters respectivos de las mismas acompañados de las frases finales, este es el frame que se puede descargar al hacer clic, se descarga como imagen. 
// La Ia me ayudo con la creación de textos para los parrafoas de las localidades yo le daba las caracteristicas y contrastes que queria se hicieran visibles y le pedi que los organizara todos con la misma estructura, muy fiel a mi manera de redactar. 
//Para el tema de las ilustraciones hice una preseleccioón de 18 imagenes que despues con ayuda de IA y un prompt con mi solicitud especifica de caracteristicas pude ilustrar  
//Al final tambien le empece a pedir ayuda a la IA para solucionar los errores de carga de archivos que despues de cierta extensión de lineas me empezo a molestar pero no encontramos la solución adecuada, me arrojo que debia abrirlo desde una aplicación. 

//Inicio código
//Definir datos fijos 
let fondoColor; // Variable para guardar el color del fondo
let titulos; //Variable para la tipografia de los titulos 
let parrafos; //Variable para la tipografia de los parrafos 
let estado = "bienvenida";
let inputBox, botonEnviar;
let opinionUsuario = "";
let mostrarOpinion = false;
let desplazamientoTexto = 0;
let mostrarTexto = true;
let localidadActiva = "";
let textoLocalidad = "";
let colorLocalidad;
let mostrarTerminar = true;
let mostrarConfirmacion = false;
let btn = { x: 0, y: 0, s: 60 }; 
let estadoEncuesta = false;
let localidadesElegidas = [];
let estadoFinal = false;
let imagenesLocalidades = {};
let textoAntonioNarino = [
  "Antonio Nariño es una localidad que respira entre la tradición y la modernidad,",
  "un territorio donde lo antiguo y lo nuevo se cruzan en cada esquina.",
  "Sus barrios más antiguos conservan la memoria de la ciudad que se levantaba con casas bajas,",
  "calles tranquilas y vida comunitaria, mientras sus avenidas comerciales y espacios culturales",
  "anuncian el pulso contemporáneo de una Bogotá que se transforma sin pausa.",
  "Para algunos, Antonio Nariño es rutina, un lugar donde la vida cotidiana se sostiene en el comercio local,",
  "en los mercados y en la cercanía de los vecinos; para otros, es encuentro y creación,",
  "un espacio donde la cultura, el arte y la organización comunitaria se convierten en fuerza transformadora.",
  "Aquí conviven la nostalgia de lo sencillo con la vitalidad de lo nuevo,",
  "la calma de lo tradicional con la energía de lo urbano.",
  "Es barrio y ciudad, memoria y presente,",
  "un territorio que recuerda que la identidad se construye en lo íntimo y lo cotidiano."
];
let textoBarriosUnidos = [
  "Barrios Unidos es un territorio que vibra entre la memoria obrera y la modernidad comercial.",
  "En sus calles todavía se escuchan los ecos de talleres, fábricas y oficios que marcaron la identidad productiva de la ciudad;",
  "un lugar donde la vida cotidiana se sostenía en el trabajo manual y la organización comunitaria.",
  "Pero con el tiempo, la localidad se ha transformado en un espacio de consumo y entretenimiento:",
  "centros comerciales, restaurantes y espacios culturales conviven con los barrios tradicionales,",
  "generando una combinación entre lo íntimo y lo masivo.",
  "Para algunos, Barrios Unidos es tradición, un lugar que conserva la fuerza de la clase trabajadora y sus formas de resistencia;",
  "para otros, es modernidad, un territorio que se abre a nuevas dinámicas de ocio y comercio.",
  "Aquí conviven la nostalgia de los oficios con la vitalidad de la vida urbana contemporánea,",
  "la memoria de lo obrero con la energía de lo nuevo.",
  "Es trabajo y comunidad, esfuerzo y celebración,",
  "un espacio que se reinventa sin perder su raíz."
];
let textoBosa = [
  "Bosa es raíz y expansión, un territorio que todavía conserva el aire de pueblo antiguo",
  "mientras se transforma en ciudad acelerada.",
  "En su centro histórico, la plaza y las calles estrechas evocan la memoria de las comunidades indígenas y campesinas",
  "que dieron origen a su identidad, un lugar donde las fiestas tradicionales y las ferias artesanales aún sostienen la vida colectiva.",
  "Pero alrededor, la urbanización avanza con fuerza:",
  "conjuntos residenciales, avenidas comerciales y barrios populares que crecen sin pausa,",
  "revelando la urgencia de una ciudad que se expande hacia el sur.",
  "Para algunos, Bosa es memoria, un espacio que guarda la raíz cultural y comunitaria;",
  "para otros, es presente desbordado, un territorio que se enfrenta a los retos de la densidad, la movilidad y el comercio informal.",
  "Es tradición y transformación,",
  "un territorio que se reinventa en medio de la tensión entre lo que fue y lo que está llegando."
];
let textoChapinero = [
  "Chapinero es una localidad que vibra entre la intimidad y la disidencia,",
  "un territorio donde lo cotidiano se entrelaza con lo extraordinario.",
  "Sus calles guardan la memoria de una Bogotá que se tejía entre talleres, templos y pasajes secretos,",
  "mientras sus cafés, librerías y espacios culturales anuncian una ciudad que se reinventa en cada esquina.",
  "Para algunos, Chapinero es rutina, un lugar donde la vida se sostiene en el comercio,",
  "en los oficios y en la cercanía de los afectos;",
  "para otros, es refugio y creación, un espacio donde el arte, la fe y la fiesta",
  "se convierten en formas de resistencia.",
  "Aquí conviven la calma de lo íntimo con la energía de lo público,",
  "la historia con el deseo, lo tradicional con lo inesperado.",
  "Es memoria y posibilidad,",
  "un territorio que recuerda que la identidad también se construye en el cruce, en el gesto, en el encuentro."
];
let textoCiudadBolivar = [
  "Ciudad Bolívar se extiende como un conjunto de ladrillos que resaltan entre la montaña,",
  "un territorio que desde lejos parece precariedad, pero que de cerca revela potencia creativa y comunitaria.",
  "Sus barrios autoconstruidos narran la historia de quienes llegaron desde distintas regiones del país",
  "buscando un lugar en la ciudad, levantando casas con sus propias manos y tejiendo comunidad en medio de la carencia.",
  "Para algunos, es símbolo de desigualdad y abandono estatal,",
  "un paisaje que evidencia las brechas sociales más profundas de Bogotá;",
  "para otros, es un laboratorio de resistencia,",
  "un espacio donde colectivos juveniles, artistas y líderes comunitarios transforman la vulnerabilidad en fuerza.",
  "Los murales que cubren las fachadas hablan de dignidad y esperanza,",
  "los miradores muestran la ciudad entera desde lo alto,",
  "y las calles vibran con la energía de quienes inventan nuevas formas de habitar.",
  "Ciudad Bolívar es fragilidad y orgullo,",
  "un territorio que se mira distinto según el ángulo desde el que se observe,",
  "y que recuerda que la ciudad también se construye desde sus límites."
];
let textoEngativa = [
  "Engativá es una localidad que se despliega entre lo residencial y lo comunitario,",
  "un territorio donde la vida cotidiana se convierte en tejido compartido.",
  "En sus avenidas amplias y conjuntos modernos se siente la expansión urbana,",
  "la promesa de una ciudad que crece hacia el occidente;",
  "pero en sus barrios tradicionales y parques vecinales persiste la memoria de lo cercano,",
  "de las fiestas barriales, de los encuentros en la esquina y de los mercados que sostienen la vida diaria.",
  "Para algunos, Engativá es rutina, un lugar de tránsito y descanso,",
  "donde la ciudad se experimenta en lo doméstico;",
  "para otros, es un espacio de encuentro, de organización comunitaria, de celebración de lo común.",
  "Aquí conviven la modernidad de las avenidas con la intimidad de los barrios,",
  "la velocidad del crecimiento con la calma de los parques, la expansión con la raíz.",
  "Es un territorio que se mueve entre lo privado y lo público,",
  "entre lo nuevo y lo tradicional, mostrando que Bogotá también se construye desde la cotidianidad compartida."
];
let textoFontibon = [
  "Fontibón es un territorio que respira entre la fuerza industrial y la memoria comunitaria.",
  "En sus avenidas se levantan fábricas, bodegas y centros de producción que muestran la economía de la ciudad,",
  "un paisaje de trabajo constante y movimiento de mercancías.",
  "Pero al mismo tiempo, en su plaza colonial y en sus barrios tradicionales se conserva la calma de un pueblo antiguo,",
  "con historias que se transmiten en las ferias, en las celebraciones religiosas y en la vida cotidiana",
  "de quienes aún reconocen sus raíces.",
  "Para algunos, Fontibón es el rostro de la productividad,",
  "un espacio donde la ciudad se conecta con el mundo a través de su cercanía al aeropuerto y su vocación industrial;",
  "para otros, es un lugar de pertenencia, de memoria compartida,",
  "donde la tradición se mezcla con la modernidad sin perder su carácter comunitario.",
  "Es industria y patrimonio, velocidad y pausa,",
  "un territorio que muestra cómo se sostiene la tensión entre el trabajo y la memoria."
];
let textoKennedy = [
  "Kennedy es una ciudad dentro de la ciudad,",
  "un territorio que late con la fuerza de la multitud.",
  "Sus avenidas comerciales llenas de tránsito, vendedores y música,",
  "sus parques y plazas se convierten en escenarios de encuentro comunitario.",
  "Para algunos, es caos, un lugar donde la vida parece desbordarse en exceso;",
  "para otros, es vitalidad pura, un espacio donde la comunidad se reconoce en la fiesta,",
  "en las ferias, en el ambiente y en la energía de lo colectivo.",
  "Aquí conviven barrios obreros con centros de comercio,",
  "fábricas con espacios culturales, rutina con celebración.",
  "Kennedy es exceso y comunidad, ruido y creatividad,",
  "un territorio que nunca se detiene y que siempre tiene algo que mostrar.",
  "Es el pulso de lo popular, la fuerza de lo cotidiano."
];
let textoMartires = [
  "Los Mártires es una localidad atravesada por la memoria de la lucha y el comercio popular.",
  "Sus plazas y calles guardan las huellas de los movimientos obreros y sindicales que marcaron la historia de Bogotá,",
  "espacios donde la resistencia se convirtió en símbolo y donde la ciudad aprendió a reconocerse en la voz de quienes exigían justicia.",
  "Ahora es un territorio de tránsito constante:",
  "buses, vendedores ambulantes, mercados y estaciones que le dan un ritmo incesante,",
  "un movimiento que nunca se detiene.",
  "Para algunos, Los Mártires es un lugar de memoria,",
  "un espacio solemne que recuerda las batallas sociales y políticas;",
  "para otros, es pura cotidianidad, un lugar donde se compra, se vende y se vive el día a día sin pausa.",
  "Aquí conviven la solemnidad de los monumentos con la improvisación de las calles,",
  "la ciudad que recuerda con la ciudad que se reinventa.",
  "Es memoria y movimiento, resistencia y comercio,",
  "un territorio que vibra en la tensión entre lo que fue y lo que sigue siendo."
];
let textoPuenteAranda = [
  "Puente Aranda es una localidad que vibra en la tensión entre la máquina y la vida cotidiana.",
  "Sus avenidas están marcadas por fábricas, bodegas y talleres que le dan un matiz industrial,",
  "un pulso de producción constante que conecta a Bogotá con su vocación obrera y manufacturera.",
  "Pero entre esas estructuras de hierro y ladrillo también laten barrios residenciales,",
  "parques vecinales y espacios comunitarios donde la ciudad se experimenta en lo íntimo:",
  "niños jugando, vecinos conversando, mercados improvisados que sostienen la vida diaria.",
  "Para algunos, Puente Aranda es el engranaje de la ciudad,",
  "un territorio de trabajo y productividad;",
  "para otros, es barrio y comunidad,",
  "un lugar donde la rutina se convierte en encuentro y donde la industria convive con la memoria de lo doméstico.",
  "Aquí se cruzan la velocidad de las máquinas con la pausa de los parques,",
  "la lógica del capital con la fuerza de lo colectivo.",
  "Es industria y barrio, producción y descanso,",
  "un territorio que reconoce la tensión entre lo mecánico y lo humano."
];
let textoRafaelUribeUribe = [
  "Rafael Uribe Uribe es una localidad que vibra con la energía de lo popular y la fuerza de lo creativo.",
  "Sus calles estrechas y sus barrios densos son escenario de la vida cotidiana:",
  "comercio local, mercados improvisados, vecinos que se reconocen en la esquina y niños que juegan en medio del bullicio.",
  "Pero junto a esa rutina aparece una dimensión transformadora:",
  "proyectos culturales, colectivos juveniles y espacios deportivos que convierten la cotidianidad en resistencia y creación.",
  "Para algunos, es un territorio marcado por la lucha diaria, por la precariedad y el esfuerzo constante;",
  "para otros, es un laboratorio de comunidad,",
  "un lugar donde la música, el arte y el deporte se convierten en herramientas de esperanza.",
  "Aquí conviven la urgencia de lo popular con la vitalidad de lo creativo,",
  "la rutina con la imaginación, la necesidad con la fiesta.",
  "Rafael Uribe Uribe es barrio y movimiento, esfuerzo y transformación,",
  "un territorio que recuerda que la ciudad también se construye desde la energía de quienes inventan nuevas formas de habitarla."
];
let textoSanCristobal = [
  "San Cristóbal es una localidad que vibra en la tensión entre la montaña y el barrio,",
  "entre la naturaleza y la ciudad.",
  "Sus cerros y quebradas recuerdan que Bogotá nació entre el paisaje andino,",
  "un territorio donde el aire frío y la vegetación aún marcan la vida cotidiana.",
  "Pero en sus límites también se levantan calles estrechas y comunidades",
  "que han aprendido a habitar la pendiente, construyendo casas que parecen sostenerse",
  "en equilibrio sobre la montaña.",
  "Para algunos, San Cristóbal es paisaje,",
  "un lugar donde la ciudad se abre hacia lo rural y lo natural;",
  "para otros, es barrio popular,",
  "un espacio de resistencia y cotidianidad que se sostiene en la fuerza comunitaria.",
  "Aquí conviven el silencio de los cerros con el bullicio de las calles,",
  "la calma de lo natural con la urgencia de lo urbano.",
  "Es montaña y ciudad, raíz y expansión,",
  "un territorio que recuerda que Bogotá también se construye desde la frontera entre lo natural y lo humano."
];
let textoSantaFe = [
  "Santa Fe es una localidad que se mueve entre lo solemne y lo cotidiano,",
  "entre lo institucional y lo popular.",
  "En sus avenidas se levantan hospitales, ministerios y edificios administrativos",
  "que marcan el pulso del poder y la burocracia,",
  "pero a pocos pasos aparecen barrios tradicionales, calles estrechas y mercados",
  "donde la vida se sostiene en lo cercano.",
  "Para algunos, es el centro oficial de la ciudad,",
  "un espacio de decisiones y estructuras;",
  "para otros, es un lugar de tránsito, de comercio popular,",
  "de encuentros que suceden sin planificación.",
  "Aquí conviven lo institucional con lo residencial,",
  "la rigidez de los edificios con la improvisación de las calles,",
  "la ciudad que se piensa desde arriba con la ciudad que se vive desde abajo.",
  "Santa Fe es contraste y superposición,",
  "un territorio que recuerda que Bogotá no se define solo por sus símbolos de poder,",
  "sino también por la energía de quienes la habitan día a día."
];
let textoSuba = [
  "Suba es una localidad que se despliega como un mosaico de contrastes,",
  "un territorio donde la ciudad se expande y se fragmenta al mismo tiempo.",
  "En sus cerros y reservas naturales todavía se siente la respiración del campo",
  "y se escucha el movimiento de los árboles,",
  "pero en sus avenidas y conjuntos residenciales se impone el ritmo acelerado de la urbanización.",
  "Para algunos, Suba es periferia, un borde que se mira desde el centro con distancia;",
  "para otros, es el corazón de la vida cotidiana,",
  "un espacio donde la comunidad se organiza en barrios populares, mercados y plazas que sostienen la ciudad desde abajo.",
  "Aquí conviven la memoria campesina con la modernidad de los centros comerciales,",
  "los caminos de tierra con las ciclorutas,",
  "la calma de los miradores con el bullicio de las avenidas.",
  "Es campo y ciudad, tradición y modernidad, expansión y resistencia,",
  "un territorio que se abre con una mezcla de paisajes que nunca terminan de encajar del todo,",
  "pero que juntos sostienen la pluralidad de Bogotá."
];
let textoUsaquen = [
  "Usaquén es un territorio que respira en dos ambientes:",
  "el de pueblo y el de metrópolis.",
  "En su plaza central todavía se siente la calma de las campanas coloniales",
  "y el ritmo pausado de las ferias artesanales,",
  "donde la memoria se conserva en las manos de quienes venden tejidos, dulces o antigüedades.",
  "Pero a pocos pasos, la ciudad se acelera:",
  "restaurantes de alta gama, bares modernos y centros comerciales representan un ritmo distinto,",
  "el de la sofisticación y el consumo.",
  "Para algunos, Usaquén es nostalgia,",
  "un lugar donde la historia se preserva en las calles empedradas y las fachadas antiguas;",
  "para otros, es modernidad,",
  "un espacio de encuentro que se abre a la noche y a la diversidad de sabores y experiencias.",
  "Es tradición y contemporaneidad, calma y movimiento,",
  "un territorio que se reinventa sin perder su raíz,",
  "donde lo íntimo del barrio se cruza con lo amplio de la ciudad."
];
let textoTunjuelito = [
  "Tunjuelito es una localidad que vibra entre lo obrero, lo cultural y lo festivo.",
  "En sus calles se levantan fábricas y talleres que recuerdan la fuerza productiva de Bogotá,",
  "marcada por el trabajo y la disciplina.",
  "Pero junto a esa dimensión industrial, aparecen espacios culturales, deportivos y comunitarios",
  "que transforman la rutina en celebración:",
  "bibliotecas, canchas, festivales y encuentros que convierten la vida diaria en un acto colectivo.",
  "Para algunos, Tunjuelito es esfuerzo y trabajo,",
  "un territorio que sostiene la ciudad desde lo obrero;",
  "para otros, es alegría y fiesta,",
  "un lugar donde la comunidad se reconoce en la música, en el deporte y en la creación compartida.",
  "Aquí conviven la seriedad del oficio con la vitalidad del encuentro,",
  "la rutina con la improvisación, la producción con la celebración.",
  "Es barrio y fábrica, disciplina y fiesta,",
  "un territorio que recuerda que la ciudad también se construye desde la energía popular."
];
let textoUsme = [
  "Usme es la frontera viva entre el campo y la ciudad,",
  "un territorio donde la raíz campesina se entrelaza con la expansión urbana.",
  "En sus veredas todavía se cultiva la tierra, se cuidan los animales",
  "y se transmiten saberes ancestrales que recuerdan que Bogotá también es rural,",
  "que su alimento y su memoria nacen de allí.",
  "Pero al mismo tiempo, los barrios en crecimiento avanzan sobre esas montañas,",
  "levantando casas y avenidas que anuncian la llegada de la ciudad al borde de lo natural.",
  "Para algunos, Usme es paisaje y tradición,",
  "un lugar donde la vida se sostiene en la calma del campo;",
  "para otros, es periferia en transformación,",
  "un espacio que enfrenta los retos de la urbanización acelerada, la movilidad y la densidad.",
  "Aquí conviven la voz de los campesinos con la energía de los nuevos habitantes,",
  "la memoria de lo rural con la urgencia de lo urbano.",
  "Es raíz y expansión, calma y movimiento."
];
let textoTeusaquillo = [
  "Teusaquillo es una localidad que respira entre la elegancia republicana y la pulsión cultural contemporánea,",
  "un territorio donde la arquitectura, la memoria y el movimiento se entrelazan.",
  "Sus barrios conservan el trazo de una Bogotá que soñaba con jardines, alamedas y casas de ladrillo,",
  "mientras sus avenidas, universidades y espacios públicos anuncian una ciudad que debate, crea y se transforma.",
  "Para algunos, Teusaquillo es pausa,",
  "un lugar donde la vida se camina entre árboles, cafés y libros;",
  "para otros, es agitación y encuentro,",
  "un espacio donde el arte, la protesta y la imaginación se hacen cuerpo colectivo.",
  "Aquí conviven la calma de lo patrimonial con la energía de lo emergente,",
  "el recuerdo con la invención.",
  "Es barrio y campus, parque y asamblea,",
  "un territorio que recuerda que la ciudad también se piensa, se cuida y se reinventa."
];



function preload() { //Nos ayudamos del preload para asegurarnos de que los archivos externos se esten cargando correctamente 
titulos=loadFont('Titulos.otf'); //Cargar la tipografia indicada 
parrafos=loadFont('Parrafos.ttf'); //Cargar la tipografia indicada 
function preload() {
  titulos = loadFont('Titulos.otf');
  parrafos = loadFont('Parrafos.ttf');
  imagenesLocalidades["Usaquén"] = loadImage("Usaquén.png");
  imagenesLocalidades["Suba"] = loadImage("Suba.png");
  imagenesLocalidades["Engativá"] = loadImage("Engativá.png");
  imagenesLocalidades["Fontibón"] = loadImage("Fontibón.png");
  imagenesLocalidades["Teusaquillo"] = loadImage("Teusaquillo.png");
  imagenesLocalidades["Barrios Unidos"] = loadImage("Barrios Unidos.png");
  imagenesLocalidades["Chapinero"] = loadImage("Chapinero.png");
  imagenesLocalidades["Santa Fe"] = loadImage("Santa Fe.png"); // solo una vez
  imagenesLocalidades["Mártires"] = loadImage("Mártires.png");
  imagenesLocalidades["Puente Aranda"] = loadImage("Puente Aranda.png");
  imagenesLocalidades["Kennedy"] = loadImage("Kennedy.png");
  imagenesLocalidades["Bosa"] = loadImage("Bosa.png");
  imagenesLocalidades["Ciudad Bolívar"] = loadImage("Ciudad Bolívar.png");
  imagenesLocalidades["Tunjuelito"] = loadImage("Tunjuelito.png");
  imagenesLocalidades["Rafael Uribe Uribe"] = loadImage("Rafael Uribe Uribe.png");
  imagenesLocalidades["San Cristóbal"] = loadImage("San Cristóbal.png");
  imagenesLocalidades["Usme"] = loadImage("Usme.png");
  imagenesLocalidades["Antonio Nariño"] = loadImage("Antonio Nariño.png");
}
}

function setup() {
  // NO EDITAR LA SIGUIENTE LINEA, HACE QUE SEA PANTALLA COMPLETA Y LO CENTRA EN WEB
  createCanvas(windowWidth, windowHeight).parent("canvasContainer");
fondoColor = color("#d7d0bc"); // Establece el color de fondo a Gris evocando el color más constante en el que se desarrollan las actividades en la ciudad (Cotidianidad)

inputBox = createInput();
inputBox.position(width / 2 - 150, height / 2+50);
inputBox.size(300);

botonEnviar = createButton("Enviar");
botonEnviar.position(width / 2 - 35, height / 2 + 100);
botonEnviar.mousePressed(() => {
    opinionUsuario = inputBox.value();
    inputBox.hide();
    botonEnviar.hide();
    mostrarOpinion = true;
    estado = "mapa";
  });
}

function draw() {
 background(fondoColor); // Aplica el color actual del fondo

// Configuración de escala y centrado
let escala = 1.3;
let translateX = width / 2 - 330;
let translateY = height / 2 - 300;
desplazamientoTexto -= 1; // velocidad negativa = hacia la izquierda

if (estado === "bienvenida") {
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(28);
    textFont(titulos);
    text("Bienvenidx a Ritmos de Ciudad", width/2, height/2 - 150);
    textSize(22);
    textFont(parrafos);
    text("Antes de comenzar quiero que me digas brevemente\n¿Cómo definirías Bogotá? ¿Para ti qué hace a Bogotá Bogotá?", width / 2, height / 2- 50);
} 
else if (estado === "mapa") {
push();
  translate(translateX, translateY);
  scale(escala);
// Transformar coordenadas del mouse
let mouseTX = (mouseX - translateX) / escala;
let mouseTY = (mouseY - translateY) / escala;
   
//CREACIÓN MAPA LOCALIDADES
  stroke("#3C3C3C");//Reborde de las localidades 
  strokeWeight(1);
  fill("#B84A37"); //El color de las localidades es el "rojo ladrillo" que caracteriza la arquitectura y edificaciones a lo largo y ancho de la ciudad

// Crear Usaquén
//***(Los siguientes pasos o elementos se llevaran a cabo con cada localidad lo que varia son sus valores)

  if (mouseTX > 20 && mouseTX < 290 && mouseTY > 30 && mouseTY < 140) { //Define un limite para el tamaño de la localidad que será el area donde se llevara a cabo la condición 
  push(); // Guarda el estado actual antes de introducir el cambio (Funciona como parentesis)
  translate(150, 80); //Mueve el punto de origen a un "centro" aproximado
  scale(1.05); //Agranda la figura para generar el efecto de expansón que desencadena la interacción por parte del usuario
  translate(-150, -80); //Regresa la figura a su "punto de origen"
}
  beginShape();//Inicia el dibujo de la localidad
//Cada vertice es el punto que define el contorno de la figura
  vertex(287, 80);
  vertex(263, 132);
  vertex(22, 99);
  vertex(22, 64);
  vertex(33, 57);
  vertex(47, 57);
  vertex(56, 68);
  vertex(76, 34);
  vertex(91, 34);
  vertex(102, 51);
  vertex(126, 29);
  vertex(161, 29);
  vertex(166, 52);
  vertex(272, 62);
  endShape(CLOSE); //Cierra la localidad conectando el primer punto con este ultimo
// Si el mouse estaba dentro del área, se termina la transformación visual
if (mouseTX > 20 && mouseTX < 290 && mouseTY > 30 && mouseTY < 140) 
pop(); //Restaura el estado original en el que venia el programa antes del cambio (Es el cierre del parentesis)

// Crear Suba
if (mouseTX > 40 && mouseTX < 250 && mouseTY > 100 && mouseTY < 290) {
    push();
    translate(150, 200);
    scale(1.05);
    translate(-150, -200);
  }
  beginShape();
  vertex(45, 108);
  vertex(44, 142);
  vertex(58, 162);
  vertex(84, 162);
  vertex(40, 196);
  vertex(68, 210);
  vertex(75, 210);
  vertex(113, 239);
  vertex(115, 269);
  vertex(124, 283);
  vertex(129, 283);
  vertex(133, 263);
  vertex(215, 196);
  vertex(249, 196);
  vertex(249, 137);
  endShape(CLOSE);
if (mouseTX > 40 && mouseTX < 250 && mouseTY > 100 && mouseTY < 290) pop();

  // Crear Engativá
if (mouseTX > 130 && mouseTX < 340 && mouseTY > 180 && mouseTY < 330) {
    push();
    translate(230, 250);
    scale(1.05);
    translate(-230, -250);
  }
  beginShape();
  vertex(267, 185);
  vertex(249, 204);
  vertex(216, 200);
  vertex(138, 265);
  vertex(138, 278);
  vertex(160, 288);
  vertex(158, 300);
  vertex(192, 327);
  vertex(255, 256);
  vertex(267, 268);
  vertex(334, 231);
  endShape(CLOSE);
if (mouseTX > 130 && mouseTX < 340 && mouseTY > 180 && mouseTY < 330) pop();

// Crear Fontibón
if (mouseTX > 190 && mouseTX < 380 && mouseTY > 260 && mouseTY < 390) {
    push();
    translate(290, 310);
    scale(1.05);
    translate(-290, -310);
  }
  beginShape();
  vertex(378, 216);
  vertex(267, 278);
  vertex(254, 269);
  vertex(197, 333);
  vertex(225, 371);
  vertex(274, 371);
  vertex(280, 382);
  vertex(301, 382);
  vertex(327, 327);
  vertex(313, 306);
  vertex(378, 265);
  vertex(363, 245);
  vertex(385, 229);
  endShape(CLOSE);
if (mouseTX > 190 && mouseTX < 380 && mouseTY > 260 && mouseTY < 390) pop();

// Crear Teusaquillo
if (mouseTX > 300 && mouseTX < 420 && mouseTY > 150 && mouseTY < 230) {
    push();
    translate(360, 190);
    scale(1.05);
    translate(-360, -190);
  }
  beginShape();
  vertex(355, 154);
  vertex(354, 174);
  vertex(309, 200);
  vertex(344, 226);
  vertex(414, 192);
  vertex(414, 162);
  endShape(CLOSE);
if (mouseTX > 300 && mouseTX < 420 && mouseTY > 150 && mouseTY < 230) pop();

// Crear Barrios Unidos
if (mouseTX > 250 && mouseTX < 350 && mouseTY > 140 && mouseTY < 200) {
    push();
    translate(300, 170);
    scale(1.05);
    translate(-300, -170);
  }
  beginShape();
  vertex(257, 139);
  vertex(257, 176);
  vertex(273, 176);
  vertex(302, 196);
  vertex(344, 173);
  vertex(344, 152);
  endShape(CLOSE);
if (mouseTX > 250 && mouseTX < 350 && mouseTY > 140 && mouseTY < 200) pop();

// Crear Chapinero
if (mouseTX > 260 && mouseTX < 420 && mouseTY > 90 && mouseTY < 160) {
    push();
    translate(340, 120);
    scale(1.05);
    translate(-340, -120);
  }
  beginShape();
  vertex(270, 133);
  vertex(282, 99);
  vertex(285, 95);
  vertex(318, 95);
  vertex(318, 105);
  vertex(347, 114);
  vertex(354, 108);
  vertex(363, 108);
  vertex(366, 119);
  vertex(388, 121);
  vertex(400, 132);
  vertex(406, 125);
  vertex(414, 126);
  vertex(414, 157);
  endShape(CLOSE);
if (mouseTX > 260 && mouseTX < 420 && mouseTY > 90 && mouseTY < 160) pop();

// Crear Santa Fe
if (mouseTX > 410 && mouseTX < 540 && mouseTY > 120 && mouseTY < 180) {
    push();
    translate(470, 160);
    scale(1.05);
    translate(-470, -160);
  }
  beginShape();
  vertex(420, 133);
  vertex(420, 166);
  vertex(437, 162);
  vertex(503, 197);
  vertex(533, 174);
  vertex(533, 158);
  vertex(518, 151);
  vertex(507, 157);
  vertex(507, 169);
  vertex(493, 180);
  vertex(489, 155);
  vertex(466, 154);
  vertex(464, 146);
  endShape(CLOSE);
if (mouseTX > 410 && mouseTX < 540 && mouseTY > 120 && mouseTY < 180) pop();

//  Crear Mártires
if (mouseTX > 420 && mouseTX < 510 && mouseTY > 160 && mouseTY < 230) {
    push();
    translate(460, 200);
    scale(1.05);
    translate(-460, -200);
  }
  beginShape();
  vertex(438, 168);
  vertex(420, 174);
  vertex(420, 184);
  vertex(427, 185);
  vertex(473, 226);
  vertex(500, 201);
  endShape(CLOSE);
if (mouseTX > 420 && mouseTX < 510 && mouseTY > 160 && mouseTY < 230) pop();

// Crear Puente Aranda
if (mouseTX > 380 && mouseTX < 500 && mouseTY > 190 && mouseTY < 300) {
    push();
    translate(440, 250);
    scale(1.05);
    translate(-440, -250);
  }
  beginShape();
  vertex(424, 192);
  vertex(388, 213);
  vertex(392, 230);
  vertex(373, 247);
  vertex(385, 261);
  vertex(429, 275);
  vertex(454, 269);
  vertex(455, 279);
  vertex(489, 293);
  vertex(487, 246);
  endShape(CLOSE);
if (mouseTX > 380 && mouseTX < 500 && mouseTY > 190 && mouseTY < 300) pop();

// Crear Kennedy
if (mouseTX > 330 && mouseTX < 500 && mouseTY > 260 && mouseTY < 410) {
    push();
    translate(410, 330);
    scale(1.05);
    translate(-410, -330);
  }
  beginShape();
  vertex(385, 266);
  vertex(337, 297);
  vertex(355, 310);
  vertex(361, 306);
  vertex(382, 316);
  vertex(390, 343);
  vertex(376, 351);
  vertex(387, 366);
  vertex(368, 377);
  vertex(390, 390);
  vertex(410, 390);
  vertex(430, 370);
  vertex(450, 360);
  vertex(470, 340);
  vertex(480, 320);
  vertex(490, 300);
  endShape(CLOSE);
if (mouseTX > 330 && mouseTX < 500 && mouseTY > 260 && mouseTY < 410) pop();

// Crear Bosa
if (mouseTX > 300 && mouseTX < 450 && mouseTY > 370 && mouseTY < 480) {
  push();
  translate(457, 397); // centro geométrico calculado
  scale(1.05);
  translate(-457, -397);
}
 beginShape();
 vertex(489, 335); 
 vertex(474, 349); 
 vertex(474, 362); 
 vertex(478, 367); 
 vertex(478, 382); 
 vertex(450, 400); 
 vertex(450, 416); 
 vertex(438, 422); 
 vertex(431, 416); 
 vertex(429, 392); 
 vertex(415, 388); 
 vertex(396, 392); 
 vertex(414, 444); 
 vertex(478, 444); 
 vertex(490, 407); 
 vertex(486, 398);
 endShape(CLOSE);
if (mouseTX > 300 && mouseTX < 450 && mouseTY > 370 && mouseTY < 480) pop();

// Crear Ciudad Bolívar
if (mouseTX > 500 && mouseTX < 700 && mouseTY > 270 && mouseTY < 410) {
  push();
  translate(600, 330);
  scale(1.05);
  translate(-600, -330);
}
 beginShape();
 vertex(646, 276);
 vertex(620, 283);
 vertex(619, 291);
 vertex(518, 335);
 vertex(518, 353);
 vertex(492, 355);
 vertex(490, 392);
 vertex(503, 401);
 vertex(505, 390);
 vertex(501, 386);
 vertex(509, 378);
 vertex(542, 378);
 vertex(546, 367);
 vertex(557, 368);
 vertex(557, 350);
 vertex(547, 344);
 vertex(547, 336);
 vertex(565, 336);
 vertex(570, 341);
 vertex(600, 341);
 vertex(593, 352);
 vertex(604, 363);
 vertex(632, 354);
 vertex(632, 344);
 vertex(646, 344);
 vertex(655, 336);
 vertex(655, 318);
 vertex(628, 301);
 vertex(628, 293);
 endShape(CLOSE);
if (mouseTX > 500 && mouseTX < 700 && mouseTY > 270 && mouseTY < 410) pop();

// Crear Tunjuelito
if (mouseTX > 490 && mouseTX < 620 && mouseTY > 270 && mouseTY < 360) {
  push();
  translate(560, 310);
  scale(1.05);
  translate(-560, -310);
}
 beginShape();
 vertex(507, 274);
 vertex(496, 283);
 vertex(493, 348);
 vertex(510, 351);
 vertex(510, 332);
 vertex(612, 286);
 vertex(612, 274);
 vertex(590, 271);
 vertex(567, 282);
 vertex(553, 282);
 vertex(522, 293);
 endShape(CLOSE);
if (mouseTX > 490 && mouseTX < 620 && mouseTY > 270 && mouseTY < 360) pop();

// Crear Rafael Uribe U. 
if (mouseTX > 510 && mouseTX < 620 && mouseTY > 240 && mouseTY < 290) {
  push();
  translate(570, 265);
  scale(1.05);
  translate(-570, -265);
}
 beginShape();
 vertex(542, 220);
 vertex(514, 246);
 vertex(514, 271);
 vertex(521, 284);
 vertex(553, 274);
 vertex(564, 279);
 vertex(585, 266);
 vertex(615, 268);
 vertex(612, 263);
 vertex(586, 260);
 vertex(585, 254);
 vertex(573, 246);
 vertex(563, 247);
 vertex(563, 236);
 endShape(CLOSE);
if (mouseTX > 510 && mouseTX < 620 && mouseTY > 240 && mouseTY < 290) pop();

// Crear Antonio Nariño
if (mouseTX > 480 && mouseTX < 540 && mouseTY > 200 && mouseTY < 280) {
  push();
  translate(510, 240);
  scale(1.05);
  translate(-510, -240);
}
 beginShape();
 vertex(507, 200);
 vertex(478, 229);
 vertex(495, 245);
 vertex(498, 276);
 vertex(507, 266);
 vertex(507, 241);
 vertex(535, 220);
 endShape(CLOSE);
if (mouseTX > 480 && mouseTX < 540 && mouseTY > 200 && mouseTY < 280) pop();

// Crear San Cristóbal
if (mouseTX > 510 && mouseTX < 680 && mouseTY > 150 && mouseTY < 240) {
  push();
  translate(600, 200);
  scale(1.05);
  translate(-600, -200);
}
 beginShape();
 vertex(563, 151);
 vertex(543, 160);
 vertex(543, 175);
 vertex(514, 197);
 vertex(573, 234);
 vertex(588, 224);
 vertex(621, 226);
 vertex(631, 212);
 vertex(662, 212);
 vertex(678, 197);
 vertex(655, 180);
 vertex(615, 179);
 vertex(586, 151);
endShape(CLOSE);
if (mouseTX > 510 && mouseTX < 680 && mouseTY > 150 && mouseTY < 240) pop();

//Crear Usme
if (mouseTX > 580 && mouseTX < 760 && mouseTY > 180 && mouseTY < 290) {
  push();
  translate(670, 240);
  scale(1.05);
  translate(-670, -240);
}
 beginShape();
 vertex(579, 236);
 vertex(590, 250);
 vertex(622, 256);
 vertex(628, 266);
 vertex(653, 269);
 vertex(653, 276);
 vertex(675, 284);
 vertex(681, 276);
 vertex(719, 281);
 vertex(730, 259);
 vertex(756, 266);
 vertex(758, 228);
 vertex(734, 226);
 vertex(734, 181);
 vertex(714, 181);
 vertex(714, 190);
 vertex(707, 190);
 vertex(705, 200);
 vertex(680, 200);
 vertex(670, 216);
 vertex(637, 216); 
 vertex(624, 232);
 vertex(588, 232);
 vertex(579, 236);
 endShape(CLOSE);
if (mouseTX > 580 && mouseTX < 760 && mouseTY > 180 && mouseTY < 290) pop(); 
pop();

// Colocar el título del proyecto en la esquina superior derecha
textFont(titulos);
fill("#383838"); // Color para la letra 
textSize(38); // Tamaño grande para la tipografía (Pendiente de agregar***)
textAlign(RIGHT, TOP); // Alineara la derecha y arriba (Borde superior derecho)
text("RITMOS DE CIUDAD", width - 250, 100); // Posición con margen derecho y superior
if (mostrarOpinion) {
  desplazamientoTexto -= 1;
  let texto = opinionUsuario + " ";

  textFont(titulos);
  textSize(20);
  textStyle(BOLD);

  // CINTAS
  fill("#FFD700"); stroke(0); strokeWeight(4);
  rect(0, height/4 - 30, width, 60);
  noStroke(); fill(0);
  for (let x = desplazamientoTexto; x < width + 400; x += textWidth(texto)) text(texto, x, height/4);

  fill("#FFD700"); stroke(0); strokeWeight(4);
  rect(0, height/2 - 30, width, 60);
  noStroke(); fill(0);
  for (let x = desplazamientoTexto; x < width + 400; x += textWidth(texto)) text(texto, x, height/2);

  fill("#FFD700"); stroke(0); strokeWeight(4);
  rect(0, (3*height)/4 - 30, width, 60);
  noStroke(); fill(0);
  for (let x = desplazamientoTexto; x < width + 400; x += textWidth(texto)) text(texto, x, (3*height)/4);

  let mensajeW = 400;
  let mensajeH = 120;
  let mensajeX = width / 2 - mensajeW / 2;
  let mensajeY = height / 2 - mensajeH / 2;

  stroke(0); strokeWeight(2);
  fill("#FFD700");
  rect(mensajeX, mensajeY, mensajeW, mensajeH, 10);

  noStroke(); fill(0);
  textFont(parrafos); textSize(16); textAlign(CENTER, CENTER);
  text("¿Estás listx para cambiar esta perspectiva?", width / 2, mensajeY + 40);

  // BOTÓN “Sí, comencemos”
  fill(0);
  rect(width / 2 - 60, mensajeY + 70, 120, 30, 5);
  fill("#FFD700");
  text("Sí, comencemos", width / 2, mensajeY + 85);
}

if (!mostrarOpinion) {
  textFont(parrafos);
  textSize(22);
  textAlign(LEFT, BOTTOM);
  fill(0);
  text("Explora la ciudad seleccionando las localidades que desees", 30, height - 30);

 // Botón terminar ⎋
  if (mostrarTerminar && !mostrarConfirmacion) {
    btn.s = 60;
    btn.x = width - btn.s - 20;
    btn.y = height - btn.s - 20;
    fill(0); noStroke();
    ellipse(btn.x + btn.s/2, btn.y + btn.s/2, btn.s, btn.s);
    fill(255); textAlign(CENTER, CENTER); textSize(26);
    text("⎋", btn.x + btn.s/2, btn.y + btn.s/2);
  }

 // Recuadro de texto por localidad
  if (mostrarTexto && localidadActiva !== "") {
let lado = min(width, height) * 0.8;
let xCaja = 40;
let yCaja = (height - lado) / 2;

fill(colorLocalidad);
stroke(0);
strokeWeight(1.5);
rect(xCaja, yCaja, lado, lado, 12);

// Botón X
let tamBoton = 32;
let xBoton = xCaja + lado - tamBoton - 12;
let yBoton = yCaja + 12;
fill(0, 100);
noStroke();
ellipse(xBoton + tamBoton / 2, yBoton + tamBoton / 2, tamBoton, tamBoton);
fill(255);
textSize(18);
textAlign(CENTER, CENTER);
text("X", xBoton + tamBoton / 2, yBoton + tamBoton / 2);

 // Variable que guarda el texto a mostrar
let textoLocalidad = "";

// Dentro de draw(), antes de dibujar el texto:
if (localidadActiva === "Antonio Nariño") {
  textoLocalidad = textoAntonioNarino.join(" ");
}
if (localidadActiva === "Barrios Unidos") {
  textoLocalidad = textoBarriosUnidos.join(" ");
}
if (localidadActiva === "Bosa") {
  textoLocalidad = textoBosa.join(" ");
}
if (localidadActiva === "Chapinero") {
  textoLocalidad = textoChapinero.join(" ");
}
if (localidadActiva === "Ciudad Bolívar") {
  textoLocalidad = textoCiudadBolivar.join(" ");
}
if (localidadActiva === "Engativá") {
  textoLocalidad = textoEngativa.join(" ");
}
if (localidadActiva === "Fontibón") {
  textoLocalidad = textoFontibon.join(" ");
}
if (localidadActiva === "Kennedy") {
  textoLocalidad = textoKennedy.join(" ");
}
if (localidadActiva === "Mártires") {
  textoLocalidad = textoMartires.join(" ");
}
if (localidadActiva === "Puente Aranda") {
  textoLocalidad = textoPuenteAranda.join(" ");
}
if (localidadActiva === "Rafael Uribe Uribe") {
  textoLocalidad = textoRafaelUribeUribe.join(" ");
}
if (localidadActiva === "San Cristóbal") {
  textoLocalidad = textoSanCristobal.join(" ");
}
if (localidadActiva === "Santa Fe") {
  textoLocalidad = textoSantaFe.join(" ");
}
if (localidadActiva === "Suba") {
  textoLocalidad = textoSuba.join(" ");
}
if (localidadActiva === "Tunjuelito") {
  textoLocalidad = textoTunjuelito.join(" ");
}
if (localidadActiva === "Teusaquillo") {
  textoLocalidad = textoTeusaquillo.join(" ");
}
if (localidadActiva === "Usaquén") {
  textoLocalidad = textoUsaquen.join(" ");
}
if (localidadActiva === "Usme") {
  textoLocalidad = textoUsme.join(" ");
}

// Texto
fill(0);
noStroke();
textAlign(CENTER, CENTER);
textFont(parrafos);
textSize(20);
textLeading(24);
text(textoLocalidad, xCaja + 20, yCaja + 20, lado - 40, lado - 40);
}
  }
//Revisar confirmación 
if (mostrarConfirmacion) {
  let ancho = 440;
  let alto = 180;
  let x = width / 2 - ancho / 2;
  let y = height / 2 - alto / 2;

  // Recuadro amarillo
  fill(255, 220, 0);
  stroke(0);
  strokeWeight(1);
  rect(x, y, ancho, alto, 12);

  // Pregunta
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);
  textFont(parrafos);
  textSize(18);
  text("¿ESTÁS SEGURX DE TERMINAR TU RECORRIDO?", width / 2, y + 50);

  // Botón “Sí, segurx” (estilo negro con texto dorado)
  fill(0);
  rect(width / 2 - 100, y + 100, 120, 36, 8);
  fill(255, 220, 0);
  textSize(16);
  text("Sí, segurx", width / 2 - 40, y + 118);

  // Botón “No, espera” (estilo blanco con texto negro)
  fill(255);
  stroke(0);
  strokeWeight(1);
  rect(width / 2 + 40, y + 100, 120, 36, 8);
  noStroke();
  fill(0);
  text("No, espera", width / 2 + 100, y + 118);

if (estadoEncuesta) {
  background(fondoColor);

  textAlign(CENTER, CENTER);
  textFont(titulos);
  textSize(22);
  fill(0);
  text("Selecciona tus 3 localidades favoritas", width / 2, 80);

  let nombresLocalidades = [
    "Usaquén", "Suba", "Engativá", "Fontibón", "Teusaquillo", "Barrios Unidos",
    "Chapinero", "Santa Fe", "Mártires", "Puente Aranda", "Kennedy", "Bosa",
    "Ciudad Bolívar", "Tunjuelito", "Rafael Uribe Uribe", "San Cristóbal",
    "Santa Fe", "Usme"
  ];

  let columnas = 3;
  let filas = ceil(nombresLocalidades.length / columnas);
  let botonW = 180;
  let botonH = 40;
  let espacioX = (width - columnas * botonW) / (columnas + 1);
  let espacioY = 60;

  for (let i = 0; i < nombresLocalidades.length; i++) {
    let col = i % columnas;
    let fil = floor(i / columnas);
    let x = espacioX + col * (botonW + espacioX);
    let y = 140 + fil * (botonH + espacioY);

    // Si ya fue elegida, la pintamos diferente
    if (localidadesElegidas.includes(nombresLocalidades[i])) {
      fill(0);
      rect(x, y, botonW, botonH, 8);
      fill(255, 220, 0);
    } else {
      fill(255);
      stroke(0);
      strokeWeight(1);
      rect(x, y, botonW, botonH, 8);
      noStroke();
      fill(0);
    }

    textFont(parrafos);
    textSize(16);
    text(nombresLocalidades[i], x + botonW / 2, y + botonH / 2);
  }

if (estadoFinal) {
  background(fondoColor);

  // Título arriba
  textAlign(CENTER, CENTER);
  textFont(titulos);
  textSize(28);
  fill(0);
  text("RITMOS DE CIUDAD", width / 2, 60);

  // Texto central
  textFont(titulos);
  textSize(20);
  text("El contraste de localidades que has escogido es:", width / 2, 120);

  // Mostrar imágenes, nombres y frases
 for (let i = 0; i < localidadesElegidas.length; i++) {
  let nombre = localidadesElegidas[i];
  let x = 100 + i * (width / 3);
  let y = height / 2 - 100;

  // Mostrar la imagen desde el diccionario
  image(imagenesLocalidades[nombre], x, y, 200, 200);

  // Mostrar el nombre debajo
  textFont(titulos);
  textSize(18);
  fill(0);
  text(nombre, x + 100, y + 220);
}
}  
}
}
}
}


function mousePressed() {
  // 1) Fase cintas: botón “Sí, comencemos” (cuando mostrarOpinion es true)
  if (mostrarOpinion) {
    let mensajeW = 400;
    let mensajeH = 120;
    let mensajeX = width / 2 - mensajeW / 2;
    let mensajeY = height / 2 - mensajeH / 2;

    let botonX = width / 2 - 60;
    let botonY = mensajeY + 70;
    let botonW = 120;
    let botonH = 30;

    if (mouseX > botonX && mouseX < botonX + botonW &&
        mouseY > botonY && mouseY < botonY + botonH) {
      mostrarOpinion = false;   // cierra cintas y mensaje
     
    }
    return; 
  }

  // 2) Detectar botón ⎋ (si está visible y no hay confirmación)
  if (mostrarTerminar && !mostrarConfirmacion) {
    if (mouseX > btn.x && mouseX < btn.x + btn.s &&
        mouseY > btn.y && mouseY < btn.y + btn.s) {
      mostrarConfirmacion = true;
      return;
    }
  }

  // 3) Detectar botón X del recuadro de localidad
  if (mostrarTexto && localidadActiva !== "") {
    let lado = min(width, height) * 0.8;
    let xCaja = 40;
    let yCaja = (height - lado) / 2;
    let tamBoton = 32;
    let xBoton = xCaja + lado - tamBoton - 12;
    let yBoton = yCaja + 12;

    let d = dist(mouseX, mouseY, xBoton + tamBoton / 2, yBoton + tamBoton / 2);
    if (d < tamBoton / 2) {
      mostrarTexto = false;
      return;
    }
  }

  // 4) Confirmación: Sí / No
if (mostrarConfirmacion) {
  let ancho = 440;
  let alto = 180;
  let x = width / 2 - ancho / 2;
  let y = height / 2 - alto / 2;

  // Botón “Sí, segurx”
  if (
    mouseX > width / 2 - 100 && mouseX < width / 2 + 20 &&
    mouseY > y + 100 && mouseY < y + 136
  ) {
    mostrarConfirmacion = false;
    estadoEncuesta = true;
    localidadesElegidas = [];
    return;
  }

  // Botón “No, espera”
  if (
    mouseX > width / 2 + 40 && mouseX < width / 2 + 160 &&
    mouseY > y + 100 && mouseY < y + 136
  ) {
    mostrarConfirmacion = false;
    return;
  }
}

  // 5) Selección de localidades 
  let escala = 1.3;
  let translateX = width / 2 - 330;
  let translateY = height / 2 - 300;
  let mouseTX = (mouseX - translateX) / escala;
  let mouseTY = (mouseY - translateY) / escala;
   mostrarTerminar = true; 

  //Suba
  if (mouseTX > 40 && mouseTX < 250 && mouseTY > 100 && mouseTY < 290) {
    localidadActiva = "Suba";
    colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
     mostrarTexto = true;
  }
  
// Engativá
if (mouseTX > 130 && mouseTX < 340 && mouseTY > 180 && mouseTY < 330) {
  localidadActiva = "Engativá";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
   mostrarTexto = true;
}

// Fontibón
if (mouseTX > 190 && mouseTX < 380 && mouseTY > 260 && mouseTY < 390) {
  localidadActiva = "Fontibón";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
   mostrarTexto = true;
}

// Teusaquillo
if (mouseTX > 300 && mouseTX < 420 && mouseTY > 150 && mouseTY < 230) {
  localidadActiva = "Teusaquillo";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
   mostrarTexto = true;
}

// Barrios Unidos
if (mouseTX > 250 && mouseTX < 350 && mouseTY > 140 && mouseTY < 200) {
  localidadActiva = "Barrios Unidos";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
   mostrarTexto = true;
}

// Chapinero
if (mouseTX > 260 && mouseTX < 420 && mouseTY > 90 && mouseTY < 160) {
  localidadActiva = "Chapinero";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
   mostrarTexto = true;
}

// Santa Fe
if (mouseTX > 410 && mouseTX < 540 && mouseTY > 120 && mouseTY < 180) {
  localidadActiva = "Santa Fe";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
   mostrarTexto = true;
}

// Mártires
if (mouseTX > 420 && mouseTX < 510 && mouseTY > 160 && mouseTY < 230) {
  localidadActiva = "Mártires";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
   mostrarTexto = true;
}

// Puente Aranda
if (mouseTX > 380 && mouseTX < 500 && mouseTY > 190 && mouseTY < 300) {
  localidadActiva = "Puente Aranda";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
   mostrarTexto = true;
}

// Kennedy
if (mouseTX > 330 && mouseTX < 500 && mouseTY > 260 && mouseTY < 410) {
  localidadActiva = "Kennedy";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
   mostrarTexto = true;
}

// Bosa
if (mouseTX > 300 && mouseTX < 450 && mouseTY > 370 && mouseTY < 480) {
  localidadActiva = "Bosa";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
   mostrarTexto = true;
}

// Ciudad Bolívar
if (mouseTX > 500 && mouseTX < 700 && mouseTY > 270 && mouseTY < 410) {
  localidadActiva = "Ciudad Bolívar";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
   mostrarTexto = true;
}

// Tunjuelito
if (mouseTX > 490 && mouseTX < 620 && mouseTY > 270 && mouseTY < 360) {
  localidadActiva = "Tunjuelito";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
   mostrarTexto = true;
}

// Rafael Uribe Uribe
if (mouseTX > 510 && mouseTX < 620 && mouseTY > 240 && mouseTY < 290) {
  localidadActiva = "Rafael Uribe Uribe";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
   mostrarTexto = true;
}

// Antonio Nariño
if (mouseTX > 480 && mouseTX < 540 && mouseTY > 200 && mouseTY < 280) {
  localidadActiva = "Antonio Nariño";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
   mostrarTexto = true;
}

// San Cristóbal
if (mouseTX > 510 && mouseTX < 680 && mouseTY > 150 && mouseTY < 240) {
  localidadActiva = "San Cristóbal";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
  mostrarTexto = true;
}

// Usme
if (mouseTX > 580 && mouseTX < 760 && mouseTY > 180 && mouseTY < 290) {
  localidadActiva = "Usme";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
   mostrarTexto = true;
}

//Usaquen 
if (mouseTX > 20 && mouseTX < 290 && mouseTY > 30 && mouseTY < 140){
  localidadActiva = "Usaquén";
  colorLocalidad = color(random(180, 255), random(180, 255), random(180, 255));
   mostrarTexto = true;
}
if (estadoEncuesta) {
  let nombresLocalidades = [
    "Usaquén", "Suba", "Engativá", "Fontibón", "Teusaquillo", "Barrios Unidos","Chapinero", "Santa Fe", "Mártires", "Puente Aranda", "Kennedy", "Bosa","Ciudad Bolívar", "Tunjuelito", "Rafael Uribe Uribe", "San Cristóbal", "Usme", "Antonio Nariño"
  ];

  let columnas = 3;
  let botonW = 180;
  let botonH = 40;
  let espacioX = (width - columnas * botonW) / (columnas + 1);
  let espacioY = 60;

  for (let i = 0; i < nombresLocalidades.length; i++) {
    let col = i % columnas;
    let fil = floor(i / columnas);
    let x = espacioX + col * (botonW + espacioX);
    let y = 140 + fil * (botonH + espacioY);

    if (
      mouseX > x && mouseX < x + botonW &&
      mouseY > y && mouseY < y + botonH &&
      !localidadesElegidas.includes(nombresLocalidades[i]) &&
      localidadesElegidas.length < 3
    ) {
      localidadesElegidas.push(nombresLocalidades[i]);
      break;
    }

  if (localidadesElegidas.length === 3) {
    estadoEncuesta = false;
    estadoFinal = true;
  }
}


  for (let i = 0; i < nombresLocalidades.length; i++) {
    let col = i % columnas;
    let fil = floor(i / columnas);
    let x = espacioX + col * (botonW + espacioX);
    let y = 140 + fil * (botonH + espacioY);

    if (
      mouseX > x && mouseX < x + botonW &&
      mouseY > y && mouseY < y + botonH &&
      !localidadesElegidas.includes(nombresLocalidades[i])
    ) {
      localidadesElegidas.push(nombresLocalidades[i]);
      break;
     }
  }
}


//Ajustar el tamaño cuando cambia el tamaño de la pantalla
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
 }
 }