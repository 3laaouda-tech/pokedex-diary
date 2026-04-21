fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
.then(res => res.json())
.then(data => {
  console.log(data);

  data.results.forEach(pokemon => {
   console.log(pokemon.name);
   console.log(pokemon.url);

   fetch(pokemon.url)
   .then(res => res.json())
   .then(details => {
     console.log(details);
   });
  });
})
.catch(error => console.log(error));