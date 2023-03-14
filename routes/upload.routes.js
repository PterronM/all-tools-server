const router = require("express").Router();
const uploader = require("../middleware/cloudinary.config.js");

// POST "/api/upload"
// router.post("/", uploader.arry("imgAveria"), (req, res, next) => { -- Subir varias fotos
router.post("/", uploader.single("imgAveria"), (req, res, next) => {
  console.log("file is: ", req.file);

  if (!req.file) {
    next("No file uploaded!");
    return;
  }
  res.json({ imgAveria: req.file.path })

  // get the URL of the uploaded file and send it as a response.
  // 'imageUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ imgAveria: req.file.path });
});

module.exports = router;