function normalizeText(text) {
  return text
    .normalize("NFD") // separa caracteres con tildes
    .replace(/[\u0300-\u036f]/g, "") // elimina tildes
    .replace(/ñ/g, "n") // reemplaza ñ por n
    .toLowerCase()
    .replace(/\s+/g, "-"); // espacios por guiones
}

fetch("estudiantes.json")
  .then((response) => response.json())
  .then((data) => {
    const lista = document.getElementById("lista-estudiantes");
    data.forEach((est) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      const folderName = `${normalizeText(est.last)}-${normalizeText(
        est.first
      )}`;
      link.href = `estudiantes/${folderName}/index.html`;
      link.textContent = `${est.first} ${est.last}`;
      li.appendChild(link);
      lista.appendChild(li);
    });
  });
