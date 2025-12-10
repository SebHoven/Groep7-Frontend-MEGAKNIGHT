const data = await fetch('http://localhost:3012/teachers');

console.log(await data.json());

export { };
