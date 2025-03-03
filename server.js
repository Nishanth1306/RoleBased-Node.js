  import express from "express";
  import pkg from 'pg';
  import dotenv from 'dotenv';
  dotenv.config
  const { Client } = pkg;
  import userRoutes from "./routes/userRoutes.js";
  import adminRoutes from "./routes/adminRoutes.js";
  import cors from 'cors';

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], 
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  

  app.use(express.json());

  app.use("/user", userRoutes);

  app.use("/admin",adminRoutes);

  app.get("/", (req, res) => {
      res.status(200).send("hello World");

  });
  const client = new Client({
    user : process.env.USER,     
    host: process.env.HOST,    
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT
  });


  client.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error(' Connection error:', err.stack));



  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
