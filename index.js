import { Worker } from "worker_threads"
import loop from "./loop.js"
import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Choo Choo! Welcome to your Express app 🚅');
})

app.get("/json", (req, res) => {
    res.json({"Choo Choo": "Welcome to your Express app 🚅"});
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    main();

})


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

async function main() {
  let start = Date.now();
  const res = await Promise.all([
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
    setUpWorker(),
  ]).then((res) => res.reduce((a, b) => a + b));
  let end = Date.now();
  console.log("async: ", end - start);
  console.log("res: ", res);

  start = Date.now();
  const res2 = loop() + loop() + loop() + loop() + loop() + loop() + 
               loop() + loop() + loop() + loop() + loop() + loop() +
               loop() + loop() + loop() + loop() + loop() + loop() +
               loop() + loop() + loop() + loop() + loop() + loop()
  end = Date.now();
  console.log("sync: ", end - start);
  console.log("res: ", res2);
}

// 37600

