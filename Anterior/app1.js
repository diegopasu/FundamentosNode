const express = require('express');
const app = express();

const port = 3000;

app.get('/',(req, res) => {
res.send('Mi respuesta con express')
})


app.get('/servicios',(req, res) => {
    res.send('estas en la pagina de sericios')
    })

app.listen(port, () => {

    console.log('Servidor a su servicio en puesto', port)
})