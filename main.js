// Maria //
fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
  .then(res => res.json())
  .then(data => {
    const pokemonRequest = data.results.map(pokemon => 
      fetch(pokemon.url).then(res => res.json()));

    return Promise.all(pokemonRequest);
})
  .then(pokemons => {
    const pokemonList = pokemons.map(details => {

    return {
      name: details.name,
      image: details.sprites.front_default,
      hitPoints: details.stats[0].base_stat,
      attack: details.stats[1].base_stat,
      defense: details.stats[2].base_stat,
  };
});

console.log(pokemonList);
pokemonList.forEach(pokemon => {
    const div = document.createElement("div");

    div.innerHTML =`<h2>${pokemon.name}</h2>
      <img src="${pokemon.image}" alt="${pokemon.name}">
      <p>Hit Point: ${pokemon.hitPoints}</p>
      <p>Attack: ${pokemon.attack}</p>
      <p>Defense: ${pokemon.defense}</p>`;

    document.body.appendChild(div);

  });
})
  .catch(error => console.error(error)); 