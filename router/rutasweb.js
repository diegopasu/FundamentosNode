const express = require('express');
const router = express.Router();

// desde el raiz es '/' res-> respuesta /ahora con variable router
router.get('/', (req, res) => {
    //res.send('Mi respuesta desde express')
    res.render("index", {titulo : "mi titulo dinamico"})
  })
  
  //otra pagina - servicios// ahora con router
  router.get('/servicios', (req, res) => {
      //res.send('Mi respuesta desde express- Servicios')
      res.render("servicios", {tituloServicio : "mi titulo dinamico servicio"})
  })
  
  
  module.exports = router;

