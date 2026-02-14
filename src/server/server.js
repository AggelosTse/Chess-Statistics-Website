import express from "express";
import { nextPhase } from "../services/utils.js";

const app = express();

app.use(express.json());

const port = 3000;

app.post("/statistics", async function (req, res) {
  const name = req.body.name;
  const mainOption = req.body.main;
  const subOption = req.body.sub;

  const results = await nextPhase(name, mainOption, subOption);
  res.json(results);
});

app.listen(port);
