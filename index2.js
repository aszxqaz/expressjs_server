import { Worker } from "worker_threads";
import {createHash} from 'crypto'
import loop from "./loop.js";
import express from "express";
import { hashSync } from "bcrypt";

const NUMBER = 5;

function setUpWorker() {
  return new Promise((res, rej) => {
    const worker = new Worker("./worker.js");
    worker.on("message", (msg) => {
      res(msg);
    });
    worker.on("error", (err) => {
      rej(err);
    });
  });
}

let syncPerf = 0;
let asyncPerf = 0;
let syncResult = 0;
let asyncResult = 0;

async function main() {
  const start = Date.now();
  let syncResult = '';
  for (let i = 0; i < NUMBER; i++) {
    syncResult += hashSync('sdfsdfsdfdsvsdf', 20);
  }
  const end = Date.now();
  syncPerf = end - start;
  console.log(`sync performance: ${(syncPerf / 1000).toFixed(2)} sec`);

  const app = express();

  app.get("/", (req, res) => {
    res.send(
      `asyncPerf: ${asyncPerf}; asyncRes: ${asyncResult}; syncPerf: ${syncPerf}; syncResult: ${syncResult}`
    );
  });

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
