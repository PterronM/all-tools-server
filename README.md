# ALL TOOLS

## Servidor

## Descripcion

All tools es una app enfocada al mundo de maquinaria industrial. Con dicha app podemos facilitar el trabajo diario de los técnicos y jefes de taller a la hora de comunicarse entre ellos. 
Dicha app permite generar por parte de los técnicos, averias y solicitudes de repuesto, asi como por parte del administrador poder gestionar dichas averias y peticiones, al igual que poder generar nuevas averias y asignarlas al tecnico que corresponda.

## MVP 

- Autorizacion
- Autenticacion
- 3 modelos en la BD
- CRUD


# middleware
- auth.middleware.js
- cloudinary.config.js

# Models

- Avera.model.js
    - const averiaSchema = new mongoose.Schema(
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
        imgAveria: String,

        descriptionAveria:{
            type: String,
            require: true
        },
       
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
- Repuesto.model.js
        - const repuestoSchema = new mongoose.Schema(
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
- User.model.js
        - const userSchema = new mongoose.Schema(
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
      trim: true,
    },
    role:{
        type: String,
        enum: ["Adm", "Tecnico"],
        default: "Tecnico"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);


# Routes
- auth.routes.js
        - POST "/api/auth/signup" => Registrar al usuario en la BD
        - POST "api/auth/login" => Validar credenciales del usuario
        - GET "api/auth/verify" => Verificamos si el usuario esta activo o no
- averias.routes.js
        - GET ("/api/averias") => Muestra todas las averias de la BD
        - GET("api/averiasIdTec") => Muetra las averias de un tecnico por su id
        - POST("api/averias/create-averia") => Crear averias en la BD
        - POST("api/averias/create-averia-adm") => Crear averias en la BD por el adm
        - GET("api/averias/:idAveria") => Enviar los datos de una averia por su id
        - PACHT ("api/averias/:idAveria/update") => Actualizar averia por su id
        - PACHT ("api/averias/:idAveria/updateStatus") => Actualizar estado averia
        - DELETE("api/averias/:idAveria/delete") => Elimina una averia por su id
- index.routes.js
- repuestos.routes.js
        - GET ("/api/repuestos") => Muestra todas los repuestos de la BD
        - GET ("api/repuestos/repuestosIdTec") => Muestra los repuestos de un usuario
        - POST("api/repuestos/create-repuesto") => Crear repuesto en la BD
        - GET("api/repuestos/:idRepuesto") => Envia los datos de una averia por su id
        - PACHT ("api/repuesto/:idRepuesto/update") => Actualizar repuesto por su id
        - PACHT ("api/repuesto/:idRepuesto/updateStatus") => Actualizar estado repuesto
        - DELETE("api/repuesto/:idRepuesto/delete") => Elimina una repuesto por su id
- upload.routes.js
- user.routes.js
        - GET ("/api/user") => Muestra el tipo de user de la Base de Datos
        - GET ("/api/user/:idUser") => Muestra los detalles de los técnicos por su id
        - PATCH ("/api/user/:idUser") => Recibir y actualizar info por su id
        - DELETE ("api/user/:idUser") => Eliminar usuario



### Git
URls for the project repo and deploy
[Link Repo Server](https://github.com/PterronM/all-tools-server)
[Link Repo Client](https://github.com/PterronM/all-tools-client)
[Link Deploy](https://all-tools.netlify.app/)



