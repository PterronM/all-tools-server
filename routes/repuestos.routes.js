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

//! IMPLANTAR CLOUDINARY
//todo --- POST("api/repuestos/create-repuesto") => Crear repuesto en la BD
router.post("/create-repuesto", async (req, res, next) => {
  // const { maquina, modelo, nSerie,nSerieRepuesto,imgRepuesto } = req.body;
  const { maquina, modelo, nSerie, nSerieRepuesto, descriptionRepuesto } =
    req.body;

  // if (!maquina || !modelo || !nSerie || !nSerieRepuesto || !imgRepuesto) {
  if (
    !maquina ||
    !modelo ||
    !nSerie ||
    !nSerieRepuesto ||
    !descriptionRepuesto
  ) {
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
    await Repuesto.create({
      maquina,
      modelo,
      nSerie,
      nSerieRepuesto,
      descriptionRepuesto,
      // imgRepuesto: req.file.path
    });

    res.json("Repuesto creado correctamente");
  } catch (error) {
    next(error);
  }
});

//todo --- PACHT ("api/repuesto/:idRepuesto/update") => Actualizar repuesto por su id
router.patch("/:idRepuesto/update", async (req, res, next) => {
  const { idRepuesto } = req.params;

  // if (!maquina || !modelo || !nSerie || !nSerieRepuesto || !imgRepuesto) {
  const { maquina, modelo, nSerie, nSerieRepuesto, descriptionRepuesto } =
    req.body;

  try {
    const response = await Repuesto.findByIdAndUpdate(idRepuesto, {
      maquina,
      modelo,
      nSerie,
      nSerieRepuesto,
      descriptionRepuesto,
    });
    res.json("Repuesto actualizado correctamente");
  } catch (error) {
    next(error);
  }
});

//todo --- PACHT ("api/repuesto/:idRepuesto/updateStatus") => Actualizar estado repuesto
router.patch("/:idRepuesto/updateStatus", async (req, res, next) => {
  const { idRepuesto } = req.params;
  const { aceptar, rechazar } = req.body;//sustituir por true o false del frontend

  try {
    if (aceptar) {
      await Repuesto.findByIdAndUpdate(idRepuesto, {
        estadoRepuesto: "Aceptada",
      });
    } else if (rechazar) {
      await Repuesto.findByIdAndUpdate(idRepuesto, {
        estadoRepuesto: "Rechazado",
      });
    }
    res.json("Estado actualizado");
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