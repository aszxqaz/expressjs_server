import cluster from "cluster";
import http from "http";
import { cpus } from "os";
import process from "process";
import axios from "axios";

if (cluster.isPrimary) {
  let count = 0;

  function messageHandler(msg) {
    if (msg) {
      // if (msg.cmd === "inc") {
      //   count += 1;
      //   notifyClusters(count);
      // }
      if (msg.includes("ended")) count++;
      if (count == 4) {
        console.log(`Took ${((Date.now() - startedAt) / 1000).toFixed(2)}`);
        const startedAt2 = Date.now();
        Promise.all(
          new Array(1000).fill(0).map((_) =>
            fetch("https://jsonplaceholder.typicode.com/todos/1")
              .then((response) => response.json())
              .then(() => {
                // process.send(`Fork #${process.env.number}: fetched  `);
              })
          )
        ).then(() => {
          console.log(`Took ${((Date.now() - startedAt2) / 1000).toFixed(2)}`);
        });
      }
    }
  }

  const numCPUs = cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ number: i });
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on("message", messageHandler);
  }
  const startedAt = Date.now();
} else {
  // console.log(process.env)
  // http
  //   .Server((req, res) => {
  //     res.writeHead(200);
  //     res.end(`hello world\n. Num: ${count}`);
  //   })
  //   .listen(process.env.PORT || 3001);
  // console.log(`Fork ${process.env.number} started`);
  Promise.all(
    new Array(250).fill(0).map((_) =>
      fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then(() => {
          process.send(`Fork #${process.env.number}: fetched  `);
        })
    )
  ).then((_) => {
    process.send(`Fork ${process.env.number} ended `);
    process.exit();
  });
}

function notifyClusters(message) {
  for (const id in cluster.workers) {
    cluster.workers[id].send(message);
  }
}
