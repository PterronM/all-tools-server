const router = require("express").Router();
const e = require("express");
const User = require("../models/User.model");

//todo -----GET ("/api/user") => Muestra todos los usuarios "Tecnicos" de la base de datos
router.get("/", async (req, res, next) => {
  try {
    const response = await User.find().select("role");
    console.log(response);
    res.json(response);
  } catch (error) {}
});

//todo ---- GET ("/api/user/:idUser") => Muestra los detalles de los técnicos por su id
router.get("/:idUser", async (req, res, next) => {
  console.log(req.params);
  const { idUser } = req.params;
  try {
    const response = await User.findById(idUser);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

//todo----- PATCH ("/api/user/:idUser") => Recibir y actualizar info por su id
router.patch("/:idUser", async (req, res, next) => {
  const { idUser } = req.params;
  const { nombre, email, telefono } = req.body;

  try {
    await User.findByIdAndUpdate(idUser, {
      nombre,
      email,
      telefono,
    });
    res.json("Documento actualizado");
  } catch (error) {
    next(error);
  }
});

//todo ---- DELETE ("api/user/:idUser") =>
router.delete("/:idUser", async (req, res, next) => {
    const { idUser } = req.params;
  
    try {
      await User.findByIdAndDelete(idUser);
      res.json("Usuario eliminado");
    } catch (error) {}
  });

module.exports = router;
