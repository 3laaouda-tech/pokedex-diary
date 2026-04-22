// Maria //
fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
  .then(res => res.json())
  .then(data => {
    return Promise.all(
      data.results.map(pokemon =>
        fetch(pokemon.url).then(res => res.json())
      )
    );
  })
  .then(pokemons => {

    const PokeDetailsInfo = pokemons.map(details => {
      return {
        name: details.name,
        id: details.id,
        height: details.height,
        weight: details.weight,
        abilities: details.abilities.map(a => a.ability.name),
        stats: {
          hp: details.stats[0].base_stat,
          attack: details.stats[1].base_stat,
          defense: details.stats[2].base_stat,
          specialAttack: details.stats[3].base_stat,
          specialDefense: details.stats[4].base_stat,
          speed: details.stats[5].base_stat,
        },
        types: details.types.map(t => t.type.name),
        sprite: details.sprites.front_default,
        notes: "",
      };
    });

    console.log(PokeDetailsInfo);

    const grid = document.querySelector(".dex-grid");
    grid.innerHTML = "";

    PokeDetailsInfo.forEach(pokemon => {
      const types = pokemon.types
        .map(t => `<span class="type-badge type-${t}">${t}</span>`)
        .join("");

      const card = document.createElement("a");
      card.href = "details.html";
      card.className = "dex-card";

      card.innerHTML = `
        <div class="dex-card__img">
          <img src="${pokemon.sprite}" alt="${pokemon.name}">
        </div>
        <div class="dex-card__body">
          <div class="dex-card__number">#${pokemon.id}</div>
          <div class="dex-card__name">${pokemon.name}</div>
          <div class="flex gap-1">${types}</div>
        </div>`;

      grid.appendChild(card);
    });
  })
  .catch(error => console.error(error));