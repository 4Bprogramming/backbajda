import express from 'express'
import  {sequelize} from "./database/db.js"
import router from './routes/index.js'
import * as dotenv from 'dotenv';
dotenv.config();

import './models/Image.js'

const {
  PORT
} = process.env;

const app = express();

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