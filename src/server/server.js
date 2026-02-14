import express from "express";
import { nextPhase } from "../services/utils.js";

import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../public")));

const port = 3000;


app.post("/statistics", async function (req, res) {
  try{

  
  const name = req.body.name;
  const mainOption = req.body.main;
  const subOption = req.body.sub;

  if(!name || !mainOption || !subOption){
    throw new Error("missing input");
  }
  const results = await nextPhase(name, mainOption, subOption);
  res.json(results);

  }catch(error){
      
  }
});

app.listen(port);
