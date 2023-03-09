const router = require("express").Router();
const isAuthenticated = require("../middleware/auth.middleware.js");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth.routes.js");
router.use("/auth", authRoutes);

const userRoutes = require ("./user.routes.js")
router.use("/user", isAuthenticated,userRoutes);

const averiasRoutes = require ("./averias.routes.js")
router.use("/averias", isAuthenticated,averiasRoutes);

const repuestosRoutes = require ("./repuestos.routes.js");
router.use("/repuestos", isAuthenticated,repuestosRoutes);

const uploadRoutes = require("./upload.routes.js");
router.use("/upload", uploadRoutes);



module.exports = router;
