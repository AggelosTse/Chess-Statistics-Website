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
  try {
    const name = req.body.username;
    const mainOption = req.body.main;
    const subOption = req.body.sub;

    if (!name || !mainOption || !subOption) {
      throw new Error("missing input");
    }
    const results = await nextPhase(name, mainOption, subOption);
    res.status(200).json(results);


  } catch (error) {
    console.error(error);

    if(error.message === "missing input"){
      res.status(401).json({
        type: "Failure",
        message: "Some input is missing"
      })}
    else if(error.message === "invalid name"){
      res.status(401).json({
        type: "Failure",
        message: "Chess.com Name is invalid"
      })
    }
    else if(error.message === "games list"){
      res.status(401).json({
        type: "Failure",
        message: "Failed to convert games into list"
      })
    }
    else {
      res.status(401).json({
        type: "Failure",
        message: "Unexpected error occured"
      })
    }
    }
  }
);

app.listen(port);

