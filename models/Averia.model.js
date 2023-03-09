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
            type: String,
            require:true,
            trim: true
        },
        descriptionAveria:{

        },
        imgAveria: String,
        estadoAveria:{
            type: String,
            enum: ["Pendiente", "Finalizada", "Rechazada"],
            default: "Pendiente"
        },
        valorEstadoAveria:{
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
