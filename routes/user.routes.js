const router = require("express").Router();
const e = require("express");
const isAuthenticated = require("../middleware/auth.middleware");
const User = require("../models/User.model");


//todo -----GET ("/api/user") => Muestra el tipo de user de la Base de Datos
router.get("/", async (req, res, next) => {
  const {idUser} = req.payload
  try {
    // const response = await User.findById(idUser);
    const response = await User.findById(idUser)
    console.log(response);
    res.json(response);
  } catch (error) {
    next(error)
  }
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
router.patch("/:idUser/update", async (req, res, next) => {
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
router.delete("/:idUser/delete", async (req, res, next) => {
    const { idUser } = req.params;
  
    try {
      await User.findByIdAndDelete(idUser);
      res.json("Usuario eliminado");
    } catch (error) {}
  });

module.exports = router;
