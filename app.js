const express = require('express');
const bodyParser = require('body-parser')
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

require('dotenv').config()

const port = process.env.PORT || 3000;

// conexion a base de datos
const mongoose = require('mongoose');

const dbName = 'veterinaria';
const user = 'prueba_vet';
const pass='qhhf21aJOlOeImRq';

const uri = `mongodb+srv://${user}:${pass}@cluster0.jx7v5.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
)
 .then(()=> console.log('conectado a mongodb')) 
 .catch(e => console.log('error de conexión', e))

//motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public"))

//rutas web
app.use('/', require('./router/rutasweb')) ;
app.use('/mascotas', require('./router/mascotas'));



  app.use((req, res, nex) =>  {
     res.status(404).render("404", {
         titulo: "404",
         decripcion: "titulo del sitio web"
    })    
  })
  
// que escuche en el puerto
app.listen(port, () => {
  console.log('Ejemplo de la app listening at http://localhost:${port}')
})
