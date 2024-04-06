//importar express

const express = require("express");

//instanciar express
const app = express();

//levantar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});

app.use(express.static("assets")); //middelware uso general - carpeta pública

const usuarios = [
  "Juan",
  "Jocelyn",
  "Astrid",
  "Maria",
  "Ignacia",
  "Javier",
  "Brian",
];

//Creación de la primera ruta
app.get("/abracadabra/usuarios", (req, res) => {
  res.send({ usuarios });
});

//Creación del middleware de la segunda ruta
app.use("/abracadabra/juego/:usuario", (req, res, next) => {
  usuarios.includes(req.params.usuario) ? next() : res.redirect("/who.jpeg");
});

app.get("/abracadabra/juego/:usuario", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//solucionando este codigo
app.get("/abracadabra/conejo/:n", (req, res) => {
  let random = Math.floor(Math.random() * 4) + 1;
  if (random == req.params.n) {
    res.sendFile(__dirname + "/conejito.jpg");
  } else {
    res.sendFile(__dirname + "/voldemort.jpg");
  }
});

//Ruta genérica de que la página no existe
app.get("*", (req, res) => {
  res.status(404).send("Página no encontrada  :(");
});

