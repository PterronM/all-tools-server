const mongoose = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new mongoose.Schema(
  {
    nombre:{
      type: String,
      required: [true, 'El nombre es requerido.'],
      lowercase: true,
      trim: true
    },
    email: {
      type: String,
      required: [true, 'El Email es requerido.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    telefono:{
      type: Number,
      required: [true, 'El teléfono es requerido.'],
      unique: true,
      trim: true,
      default: undefined,
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
