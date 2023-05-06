const startedAt = Date.now();
Promise.all(
  new Array(1000).fill(0).map((_) =>
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then(() => {
        // process.send(`Fork #${process.env.number}: fetched  `);
      })
  )
).then(() => {
  console.log(`Took ${((Date.now() - startedAt) / 1000).toFixed(2)}`);
});
