const express = require('express');
const router = express.Router();

//llamo al model mascota
const Mascota = require('../models/mascota')
                

// desde el raiz es '/' res-> respuesta /ahora con variable router
router.get('/', async (req, res) => {
    //res.send('Mi respuesta desde express')
    try {
        const arrayMascotasDB = await Mascota.find()
        console.log(arrayMascotasDB)

        res.render("mascotas", {
            arrayMascotas: arrayMascotasDB
          //  arrayMascotas: [
          //  {id: '1', nombre: 'perro', descripcion: 'desc perro'},
          //  {id: '2', nombre: 'gato', descripcion: 'desc gato'},
          //  ]
        })

    } catch (error) {
        console.log(error)
    }
    
  })
  
  router.get('/crear', (req, res) => {
    res.render('crear')
  })
  
  //enviar para grabar nuevo registro
  router.post('/', async (req, res) => {
    const body = req.body
    try {
        const mascotaDB = new Mascota(body)
        await mascotaDB.save()
        
        res.redirect('/mascotas')

        //Tambien de puede hacer
        //await Mascota.create(body)
        
        
    } catch (error) {
        console.log(error)
    }
})
  
//obtener el id para editar
router.get('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const mascotaDB = await Mascota.findOne({ _id: id }) 
    //console.log(mascotaDB)
    res.render('detalle', {
      mascota: mascotaDB,
      error: false
    })
         

  } catch (error) {
    console.log(error)
    res.render('detalle', {
      error: true,
      mensaje: 'No se encuntra el Id'
    })
  }

})

//delete -BUSCAR EL ID PARA ELIMINAR

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  try {
      const mascotaDB = await Mascota.findByIdAndDelete({ _id: id })
      
      if (mascotaDB) {
          res.json({
              estado: true,
              mensaje: 'eliminado!'
          })
      } else {
          res.json({
              estado: false,
              mensaje: 'fallo eliminar!'
          })
      }

  } catch (error) {
      console.log(error)
  }
})

//Editar
router.put('/:id', async (req, res) => {
  const id = req.params.id
  const body = req.body
  
  try {

      const mascotaDB = await Mascota.findByIdAndUpdate(id, body, { useFindAndModify: false })
      console.log(mascotaDB)

      res.json({
          estado: true,
          mensaje: 'Editado'
      })
      
  } catch (error) {
      console.log(error)
      
      res.json({
          estado: false,
          mensaje: 'Fallamos!!'
      })
  }
})

module.exports = router;

