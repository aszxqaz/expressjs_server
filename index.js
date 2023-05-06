import cluster from "cluster";
import http from "http";
import { cpus } from "os";
import process from "process";

if (cluster.isPrimary) {
  // Keep track of http requests
  let numReqs = 0;
  let count = 0;
  setInterval(() => {
    console.log(`count = ${count}`);
  }, 1000);

  // Count requests
  function messageHandler(msg) {
    if (msg.cmd) {
      if (msg.cmd === "inc") {
        count += 1;
        notifyClusters(count)
      }
    }
  }

  // Start workers and listen for messages containing notifyRequest
  const numCPUs = cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on("message", messageHandler);
  }
} else {
  process.send({ cmd: "inc" });
  let count = 0;

  process.on('message', msg => {
    count = msg
  })

  // Worker processes have a http server.
  http
    .Server((req, res) => {
      res.writeHead(200);
      res.end(`hello world\n. Num: ${count}`);
    })
    .listen(process.env.PORT || 3001);
}

function notifyClusters(message) {
  for (const id in cluster.workers) {
    cluster.workers[id].send(message);
  }
}
