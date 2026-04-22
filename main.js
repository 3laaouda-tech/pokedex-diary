// Maria //
fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
  .then(res => res.json())
  .then(data => {
    return Promise.all(
      data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
    );
  })
  .then(pokemons => {
    const grid = document.querySelector(".dex-grid");
    grid.innerHTML = "";

    pokemons.forEach(details => {
      const types = details.types
        .map(t => `<span class="type-badge type-${t.type.name}">${t.type.name}</span>`)
        .join("");

      const card = document.createElement("a");
      card.href = "details.html";
      card.className = "dex-card";

      card.innerHTML = `
        <div class="dex-card__img">
          <img src="${details.sprites.front_default}" alt="${details.name}">
        </div>
        <div class="dex-card__body">
          <div class="dex-card__number">#${details.id}</div>
          <div class="dex-card__name">${details.name}</div>
          <div class="flex gap-1">${types}</div>
        </div>`;

      grid.appendChild(card);
    });
  })
  .catch(error => console.error(error));