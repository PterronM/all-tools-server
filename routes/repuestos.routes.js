const router = require("express").Router();
const e = require("express");
const Repuesto = require("../models/Repuesto.model.js");

//todo ----- GET ("/api/repuestos") => Muestra todas los repuestos de la BD
router.get("/", async (req, res, next) => {
  try {
    const response = await Repuesto.find();
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//todo --GET ("api/repuestos/repuestosIdTec") => Muestra los repuestos de un usuario
router.get("/repuestosIdTec", async(req,res,next)=>{

  const {_id} = req.payload
  
  try {
    const response = await Repuesto.find({idUser:_id})
    res.json(response)
  } catch (error) {
    next(error)
  }
})

//todo --- POST("api/repuestos/create-repuesto") => Crear repuesto en la BD
router.post("/create-repuesto", async (req, res, next) => {
  
  const { maquina, modelo, nSerie, imgRepuesto,descriptionRepuesto, nSerieRepuesto} =
    req.body;

  // if (!maquina || !modelo || !nSerie || !nSerieRepuesto || !imgRepuesto) {
  if (
    !maquina ||
    !modelo ||
    !nSerie ||
    // !imgRepuesto ||
    !descriptionRepuesto ||
    !nSerieRepuesto
  ) {
    res
      .status(401)
      .json({ errorMessage: "Todos los campos deben estar rellenos" });
    return;
  }

  try {
    await Repuesto.create({
      maquina,
      modelo,
      nSerie,
      imgRepuesto,
      descriptionRepuesto,
      nSerieRepuesto,
      idUser: req.payload._id

    });

    res.json("Repuesto creado correctamente");
  } catch (error) {
    next(error);
  }
});

//todo-- GET("api/repuestos/:idRepuesto") => Envia los datos de una averia por su id
router.get("/:idRepuesto", async(req,res,next)=>{

  const {idRepuesto} = req.params
  try {
    const response = await Repuesto.findById(idRepuesto)
    res.json(response)
    
  } catch (error) {
    next (error)
  }

  
})

//todo --- PACHT ("api/repuesto/:idRepuesto/update") => Actualizar repuesto por su id
router.patch("/:idRepuesto/update", async (req, res, next) => {
  const { idRepuesto } = req.params;

  // if (!maquina || !modelo || !nSerie || !nSerieRepuesto || !imgRepuesto) {
  const { maquina, modelo, nSerie, imgRepuesto,descriptionRepuesto, nSerieRepuesto} =
    req.body;

  try {
    await Repuesto.findByIdAndUpdate(idRepuesto, {
      maquina,
      modelo,
      nSerie,
      imgRepuesto,
      descriptionRepuesto,
      nSerieRepuesto,
    });
    res.json("Repuesto actualizado correctamente");
  } catch (error) {
    next(error);
  }
});

//todo --- PACHT ("api/repuesto/:idRepuesto/updateStatus") => Actualizar estado repuesto
router.patch("/:idRepuesto/updateStatus", async (req, res, next) => {
  const { idRepuesto } = req.params;
  const { aceptada, rechazada } = req.body;//sustituir por true o false del frontend

  try {
     if(aceptada){
      await Repuesto.findByIdAndUpdate(idRepuesto,{estadoRepuesto:"Aceptada"});
      res.json("Estado repuesto actualizado");
    }else if(rechazada){
      await Repuesto.findByIdAndUpdate(idRepuesto,{estadoRepuesto:"Rechazada"});
      res.json("Estado repuesto rechazada");
    }
  } catch (error) {
    next(error);
  }
});

//todo ---- DELETE("api/repuesto/:idRepuesto/delete") => Elimina una repuesto por su id
router.delete("/:idRepuesto/delete", async (req, res, next) => {
  const { idRepuesto } = req.params;
  try {
    await Repuesto.findByIdAndDelete(idRepuesto);
    res.json("Repuesto eliminada correctamente");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
