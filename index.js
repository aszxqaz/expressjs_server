import { Worker } from "worker_threads";
import loop from "./loop.js";
import express from "express";

const NUMBER = 32;

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
  let start = Date.now();
  const asyncResult = await Promise.all(
    new Array(NUMBER).fill(0).map((_) => setUpWorker())
  ).then((res) => res.reduce((a, b) => a + b));
  let end = Date.now();
  asyncPerf = end - start;
  console.log("async: ", asyncPerf);
  console.log("res: ", asyncResult);

  start = Date.now();
  let syncResult =  0
  for(let i = 0; i < NUMBER; i++) {
    syncResult += loop()
  }
  end = Date.now();
  syncPerf = end - start;
  console.log("sync: ", syncPerf);
  console.log("res: ", syncResult);

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
