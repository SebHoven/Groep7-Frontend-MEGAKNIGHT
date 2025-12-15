const data = await fetch(`${import.meta.env.PUBLIC_API_URL}/teachers`);

console.log(await data.json());

export { };
