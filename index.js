import { exec, spawn,  } from "child_process";

for(let i = 0; i < 20; i++) {
  const a = exec('node woopy.js', {
    // signal: ab.signal,
  })
  
  let count = 0
  
  a.stdout.on('data', (data) => {
    console.log(`Child process #${i}:\n${data}`)
  })

}