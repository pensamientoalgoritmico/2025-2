import os
import unicodedata

# Lista de estudiantes
estudiantes = [
    {"last": "Arias", "first": "Isabella"},
    {"last": "Pineda", "first": "Juan Sebastian"},
    {"last": "Rojas", "first": "Daniela Maria"},
    {"last": "Alberto Braeuninger", "first": "Luis"},
    {"last": "Sanchez Montes", "first": "Maria Jose"},
    {"last": "Beltran Ricaurte", "first": "Luisa Maria"},
    {"last": "Cardenas Gomez", "first": "Valery Daniela"},
    {"last": "Hernandez Hernandez", "first": "Sara"},
    {"last": "Cobo", "first": "Isabella"},
    {"last": "Garcia Neira", "first": "Luciana"},
    {"last": "Giraldo Saavedra", "first": "Sofia"},
    {"last": "Gonzalez Molina", "first": "Daniela"},
    {"last": "Lopez Serrano", "first": "Diego"},
    {"last": "Mendez Gomez", "first": "Sara"},
    {"last": "Vivas Sierra", "first": "Valeria"},
    {"last": "Gomez Villa", "first": "Juliana"},
    {"last": "Ramirez Urdinola", "first": "Sara"},
    {"last": "Galvis Gutierrez", "first": "Ana Sofia"},
    {"last": "Patiño Merchan", "first": "Sharick Carolina"},
    {"last": "Rodriguez Avila", "first": "Sofia"},
    {"last": "Rangel Beltran", "first": "Mariana"},
    {"last": "Herreño Rubiano", "first": "Mariana"}
]

# Función para normalizar texto
def normalizar(texto):
    texto = unicodedata.normalize('NFD', texto)
    texto = texto.encode('ascii', 'ignore').decode('utf-8')  # elimina tildes
    texto = texto.replace('ñ', 'n')  # reemplaza ñ
    texto = texto.lower().replace(' ', '-')  # minúsculas y guiones
    return texto

# Crear carpeta principal 'estudiantes'
base_dir = 'estudiantes'
os.makedirs(base_dir, exist_ok=True)

# Crear carpetas para cada estudiante
for est in estudiantes:
    folder_name = f"{normalizar(est['last'])}-{normalizar(est['first'])}"
    path = os.path.join(base_dir, folder_name)
    os.makedirs(path, exist_ok=True)

print(f"Se han creado {len(estudiantes)} carpetas dentro de '{base_dir}'.")