fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
.then(res => res.json())
.then(data => {
  console.log(data);
});