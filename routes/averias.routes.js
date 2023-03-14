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

//todo--- GET("api/averiasIdTec") => Muetra las averias de un tecnico por su id
router.get("/averiasIdTec", async (req, res, next) => {

const {_id} = req.payload

  try {
    const response = await Averia.find({idUser:_id})
    // console.log(response)
    res.json(response)
  } catch (error) {
    next(error)
  }
});

//todo --- POST("api/averias/create-averia") => Crear averias en la BD
router.post("/create-averia", async (req, res, next) => {

   
  const { maquina, modelo, nSerie, descriptionAveria, imgAveria } = req.body;


  if (!maquina || !modelo || !nSerie || !imgAveria || !descriptionAveria ) {
    res
      .status(401)
      .json({ errorMessage: "Todos los campos deben estar rellenos" });
    return;
  }

  try {
    await Averia.create({
      maquina,
      modelo,
      nSerie,
      imgAveria,
      descriptionAveria,
      idUser: req.payload._id,
    });

    res.json("Averia creada correctamente");
  } catch (error) {
    next(error);
    console.log(error);
  }
});

//todo --- POST("api/averias/create-averia-adm") => Crear averias en la BD por el adm
router.post("/create-averia-adm", async (req, res, next) => {

   
  const { idUser,maquina, modelo, nSerie, descriptionAveria, imgAveria } = req.body;
  console.log(req.body);


  if (!idUser || !maquina || !modelo || !nSerie || !imgAveria || !descriptionAveria ) {
    res
      .status(401)
      .json({ errorMessage: "Todos los campos deben estar rellenos" });
    return;
  }

  try {
    await Averia.create({
      idUser,
      maquina,
      modelo,
      nSerie,
      imgAveria,
      descriptionAveria,
    });

    res.json("Averia creada correctamente");
  } catch (error) {
    next(error);
    console.log(error);
  }
});

//todo-- GET("api/averias/:idAveria") => Enviar los datos de una averia por su id
router.get("/:idAveria", async(req,res,next)=>{

  const {idAveria} = req.params
  console.log(idAveria)

  try {
    const response = await Averia.findById(idAveria)
    console.log(response)
    res.json(response)
    
  } catch (error) {
    next(error)
  }
})

//todo --- PACHT ("api/averias/:idAveria/update") => Actualizar averia por su id
router.patch("/:idAveria/update", async (req, res, next) => {
  const { idAveria } = req.params;
 
  const {
    maquina,
    modelo,
    nSerie,
    descriptionAveria,
    imgAveria,
    estado,
    valorEstado,
  } = req.body;

  try {
    const response = await Averia.findByIdAndUpdate(idAveria, {
      maquina,
      modelo,
      nSerie,
      descriptionAveria,
      imgAveria,
      // estado,
      // valorEstado
    });
    res.json("Averia actualizada correctamente");
  } catch (error) {
    next(error);
  }
});

//todo --- PACHT ("api/averias/:idAveria/updateStatus") => Actualizar estado averia
router.patch("/:idAveria/updateStatus", async (req, res, next) => {
  const { idAveria } = req.params;
  const { finalizada, rechazada } = req.body; //sustituir por valor true o false depende de lo que mande el frontend
  console.log(req.body)
  try {
    if(finalizada){
      await Averia.findByIdAndUpdate(idAveria,{estadoAveria:"Finalizada"});
      res.json("Estado averia finalizado");
    }else if(rechazada){
      await Averia.findByIdAndUpdate(idAveria,{estadoAveria:"Rechazada"});
      res.json("Estado averia rechazada");
    }
  } catch (error) {
    next(error);
  }
});

//todo ---- DELETE("api/averias/:idAveria/delete") => Elimina una averia por su id
router.delete("/:idAveria/delete", async (req, res, next) => {
  const { idAveria } = req.params;
  try {
    await Averia.findByIdAndDelete(idAveria);
    res.json("Averia eliminada correctamente");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
