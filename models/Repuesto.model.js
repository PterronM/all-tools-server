const mongoose = require("mongoose");


const repuestoSchema = new mongoose.Schema(
    {
        maquina:{
            type: String,
            required: true,
            trim: true
        },
        modelo:{
            type: String,
            require: true,
            trim: true
        },
        nSerie:{
            type: Number,
            require:true,
            trim: true
        },
        nSerieRepuesto: {
            type: String,
            trim: true
        },
        imgRepuesto: String,
        estado:{
            type: String,
            enum: ["Pendiente", "Aceptada", "Rechazada"],
            default: "Pendiente"
        },
        valorEstado:{
            type: Boolean,
            default: false
        },
        idUser:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true,
    }
);


const Repuesto = mongoose.model("Repuesto", repuestoSchema);

module.exports = Repuesto;