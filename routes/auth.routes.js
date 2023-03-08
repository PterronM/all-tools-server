const router = require("express").Router();
const bcrypt = require('bcryptjs');
const e = require("express");
// const User = require("../models/User.model.js");
// const jwt = require("jsonwebtoken");
// const isAuthenticated = require("../../middleware/auth.middleware.js");

router.post("/signup", async(req,res,next)=>{

    const {nombre,email,password,telefono} = req.body

    //Validar que los campos no esten vacios
    if(!nombre || !email || !password || !telefono){
        res.status(400).json({errorMessage: "Todos los campos son obligatorios"})
        return;
    }

    //Validacion del email
    const EMAIL_REGEX = /^[^\.]([a-zA-Z0-9-._]+[^.]@[a-zA-Z0-9]+\.[.a-zA-Z0-9]+)\w+/;
    if(EMAIL_REGEX.test(email) === false){
        res.status(400).json({errorMessage: "El email debe tener como minimo 3 caracteres: eje@ejemplo.com"})
    }


    //Validacion del teléfono
    const TLF_REGEX = /\+?(\s*\d{0,2})()\1[1234567890]{0,2}\2[1234567890 .-]{9,13}/;
    if(TLF_REGEX.test(telefono) === false){
      res.status(400).json({errorMessage: "El teléfono debe tener 9 números."});
      return;
    }
    


})

module.exports = router;