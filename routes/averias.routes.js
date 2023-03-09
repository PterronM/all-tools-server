const router = require("express").Router();
const e = require("express");
const Averia = require("../models/Averia.model.js");

//todo ----- GET ("/api/averias") => Muestra todas las averias de la BD
router.get("/", async (req, res, next) => {
  try {
    const response = await Averia.find();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//! IMPLANTAR CLOUDINARY
//todo --- POST("api/averias/create-averia") => Crear averias en la BD
router.post("/create-averia", async (req, res, next) => {
  const { maquina, modelo, nSerie, descriptionAveria,imgAveria } = req.body;

  // if(!maquina || !modelo || !nSerie || !imgAveria){
  if (!maquina || !modelo || !nSerie || !descriptionAveria) {
    res
      .status(401)
      .json({ errorMessage: "Todos los campos deben estar rellenos" });
    return;
  }

  // if (req.file === undefined) {
  //     res.status(401).json({errorMessage: "Por favor, instroduzca una imagen para su producto"});
  //     return;
  //   }

  try {
    await Averia.create({
      maquina,
      modelo,
      nSerie,
      descriptionAveria,
      // imgAveria: req.file.path
    });

    res.json("Averia creada correctamente");
  } catch (error) {
    next(error);
  }
});

//todo --- PACHT ("api/averias/:idAveria/update") => Actualizar averia por su id
router.patch("/:idAveria/update", async(req,res,next)=>{

    const {idAveria} = req.params
    const {maquina,modelo,nSerie,descriptionAveria,estado,valorEstado} = req.body

    try {
        const response = await Averia.findByIdAndUpdate(idAveria,{
            maquina,
            modelo,
            nSerie,
            descriptionAveria,
            // estado,
            // valorEstado
        })
        res.json("Averia actualizada correctamente")
        
    } catch (error) {
        next(error)
    }


})

//todo --- PACHT ("api/averias/:idAveria/updateStatus") => Actualizar estado averia
router.patch("/:idAveria/updateStatus", async(req,res,next)=>{
  
  const {idAveria} = req.params
  const {finalizar,eliminar} = req.body; //sustituir por valor true o false depende de lo que mande el frontend

  try {
    if(finalizar){
      await Averia.findByIdAndUpdate(idAveria, {
        estadoAveria: "Finalizada"
      });
      res.json("Estado averia actualizado")
    }else if(eliminar){
      await Averia.findByIdAndDelete(idAveria);
      res.json("Averia eliminada")
    }
  } catch (error) {
    next(error)
  }
})

//todo ---- DELETE("api/averias/:idAveria/delete") => Elimina una averia por su id
router.delete("/:idAveria/delete", async(req,res,next)=>{

    const {idAveria} = req.params
    try {
        await Averia.findByIdAndDelete(idAveria)
        res.json("Averia eliminada correctamente")
        
    } catch (error) {
        next(error)
    }

})


module.exports = router;
