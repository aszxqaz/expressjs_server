export default function loop() {
  let a = 0;
  for (var i = 0; i < 1000000000; i++) {
    a += Math.random();
  }
  return a;
}