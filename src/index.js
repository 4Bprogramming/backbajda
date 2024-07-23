import express from 'express'
import  {sequelize} from "./database/db.js"
import router from './routes/index.js'
import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import multer from 'multer'; // Importa multer
import './models/Project.js'
import Project from './models/Project.js';
import DBIMAGE from './models/DBIMAGE.js';

const {
  PORT
} = process.env;


const app = express();

// Configura CORS
const corsOptions = {
  origin: 'https://bajdanext.vercel.app', // Cambia esto al origen de tu aplicación Next.js en producción
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
//Configura multer
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // limita el tamaño de archivo a 10MB
});

app.use((req, res, next) => {
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'imagesArray', maxCount: 10 },
  ])(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }
    next();
  });
});
 app.use( router);

// Define las asociaciones entre modelos
Project.hasMany(DBIMAGE, { foreignKey: 'projectId', as: 'images' });
DBIMAGE.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

// Sincroniza la base de datos y escucha en el puerto especificado
async function intro() {
    try {
      await sequelize.sync({force: false});
      app.listen(PORT, () => {
        console.log(`"Listening on port ${PORT}`);
      });
    } catch (error) {
      console.log(error, "it is not working");
    }
  }
  
  intro()