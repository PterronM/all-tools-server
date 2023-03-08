const mongoose = require("mongoose");


const averiaSchema = new mongoose.Schema(
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
        imgAveria: String,
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


const Averia = mongoose.model("Averia", averiaSchema);

module.exports = Averia;
