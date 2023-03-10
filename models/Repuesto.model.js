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
            type: String,
            require:true,
            trim: true
        },
        //crear array para imagenes 
        imgRepuesto: String,
        descriptionRepuesto:{
            type: String,
            require: true,
        },
        nSerieRepuesto: {
            type: String,
            trim: true
        },
        estadoRepuesto:{
            type: String,
            enum: ["Pendiente","Aceptada", "Rechazada"],
            default: "Pendiente"
        },
        valorEstadoRepuesto:{
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