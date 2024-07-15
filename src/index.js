import express from 'express'
import  {sequelize} from "./database/db.js"
import router from './routes/index.js'
import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import multer from 'multer'; // Importa multer
import './models/Project.js'

const {
  PORT
} = process.env;


const app = express();

// Configura CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Cambia esto al origen de tu aplicación Next.js en producción
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json()); 
// Configura multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(upload.array('imagesArray')); // Middleware de multer para manejar los archivos subidos

 app.use( router);

//nos aseguramos de escoger el puerto
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