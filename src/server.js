import 'dotenv/config';
import express from "express";
import pino from "pino-http";
import cors from "cors";
import { getEnvVar } from './utils/getEnvVar.js';
import { Contact } from './db/models/contact.js';

// , defaultValue, 3000
const PORT = Number(getEnvVar('PORT'));

export function setupServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
        const data = await Contact.find();
    res.json({
         status: 200,
        message: "Successfully found contacts!",
        data: data,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const {contactId} = req.params;
    const contactById = await Contact.findById(contactId);
 
      if(contactById === null){
        return res.status(404).json({
          status: 404,
          message: 'Contact not found',
        });
      }

      console.log("Contact: ", contactById);
      res.status(200).json({
        data: contactById,
      });

      
  });

  app.use((req, res) => {
    res.status(404).json({
      message: "Not found",
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}


