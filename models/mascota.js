//documentos de dicha colección: models->mascota.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mascotaSchema = new Schema({
    nombre:  String,
    descripcion: String
  });
  
  // Crear el modelo
  const Mascota = mongoose.model('Mascota', mascotaSchema);
  
  module.exports = Mascota;
  