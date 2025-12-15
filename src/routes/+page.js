const data = await fetch(`https://groep7-backend-megaknight-ewi7.onrender.com/teachers`);

console.log(await data.json());

export { };
