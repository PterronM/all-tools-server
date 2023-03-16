const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User.model.js");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middleware/auth.middleware");


//TODO----POST "/api/auth/signup" => Registrar al usuario en la BD
router.post("/signup", async (req, res, next) => {
  // console.log(req.body);

  const { nombre, email, password, telefono } = req.body;

  //** Validar que los campos no esten vacios
  if (!nombre || !email || !password || !telefono) {
    res.status(400).json({ errorMessage: "Todos los campos son obligatorios" });
    return;
  }

  //** Validacion del email
  const EMAIL_REGEX =
    /^[^\.]([a-zA-Z0-9-._]+[^.]@[a-zA-Z0-9]+\.[.a-zA-Z0-9]+)\w+/;
  if (EMAIL_REGEX.test(email) === false) {
    res.status(400).json({
      errorMessage:
        "El email debe tener como minimo 3 caracteres: eje@ejemplo.com",
    });
  }

  //** Validacion del teléfono
  const TLF_REGEX =
    /\+?(\s*\d{0,2})()\1[1234567890]{0,2}\2[1234567890 .-]{9,13}/;
  if (TLF_REGEX.test(telefono) === false) {
    res.status(400).json({ errorMessage: "El teléfono debe tener 9 números." });
    return;
  }

  //** Validar password fuerte
  const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (PASSWORD_REGEX.test(password) === false) {
    res.status(400).json({
      errorMessage:
        "La contraseña debe tener al menos 8 caracteres incluyendo Mayusculas, minusculas, numeros y caracteres especiales",
    });
    return;
  }

  try {
    //** Validar que usuario no este registrado con ese email
    const foundUserEmail = await User.findOne({ email });
    if (foundUserEmail !== null) {
      res.status(400).json({ errorMessage: "Usuario existente" });
      return;
    }

    //Encriptar password
    const salt = await bcrypt.genSalt(10);
    const hastPassword = await bcrypt.hash(password, salt);

    //Creacion del Usuario en la BD
    const user = await User.create({
      nombre,
      email,
      password: hastPassword,
      telefono,
    });
    // console.log(user);
    res.status(200).json("Usuario creado correctamente");
  } catch (error) {
    next(error);
  }
});

//TODO----- POST "api/auth/login" => Validar credenciales del usuario
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;


  if (!email || !password) {
    res.status(400).json({ errorMessage: "Los campos deben estar rellenos" });
    return;
  }



  try {
    //Confirmar que el usuario esta dado de alta en la BD
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(400).json({ errorMessage: "Credenciales incorrectas" });
      return;
    }


    //Comprobar que la contraseña es correcta
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
      );
      
    if (!isPasswordCorrect) {
      res.status(400).json({ errorMessage: "Credenciales incorrectas" });
      return;
    }

    //PAYLOAD => Contenido del token que identifica al usuario
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role
    }

    // Generarmos el token
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET,{
      algorithm:"HS256",
      expiresIn:"7d" 
    })
    res.status(200).json({authToken})

  } catch (error) {
    next(error);
  }
});

//TODO---- GET "api/auth/verify" => Verificamos si el usuario esta activo o no
router.get("/verify", isAuthenticated,(req,res,next)=>{
  // console.log(req.payload)
  res.status(200).json(req.payload)
})

module.exports = router;
