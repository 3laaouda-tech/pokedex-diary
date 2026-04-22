// Maria //
fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
.then(res => res.json())
.then(data => {
  console.log(data);

  data.results.forEach(pokemon => {
   console.log("Name:", pokemon.name);
   console.log("URL:", pokemon.url);

   fetch(pokemon.url)
   .then(res => res.json())
   .then(details => {
    const name = details.name;
    const image = details.sprites.front_default;
    const hitPoints = details.stats[0].base_stat;
    const attack = details.stats[1].base_stat;
    const defense = details.stats[2].base_stat;

    const div = document.createElement("div");

    div.innerHTML = `<h2>${name}</h2>
    <img src="${image}" alt="${name}">
    <p>Hit Point: ${hitPoints}</p>
    <p>Attack: ${attack}</p>
    <p>Defense: ${defense}</p>
    `;
    document.body.appendChild(div);

     console.log("Name:", details.name);
     console.log("Image:", details.sprites.front_default);
   })
   .catch(error => console.error(error));
  });
})
.catch(error => console.error(error)); 