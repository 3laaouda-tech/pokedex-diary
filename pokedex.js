function loadPokedex(){
    const container = document.querySelector(".dex-grid");
    container.innerHTML = "";

    // read localStorage of caught Pokemons
    const caughtList = JSON.parse(localStorage.getItem("caughtPokemons") || "[]");

    if (caughtList.length === 0) {
        container.innerHTML = "<p class='text-center text-gray-500'>No Pokémons caught yet. Select a Pokemon </p>";
        return;
    }

    caughtList.forEach((pokemon, index) => {
        const card = document.createElement("div");
        card.className = "dex-card";

        card.innerHTML = `
      <div class="dex-card__img">
        <img src="${pokemon.sprite}" alt="${pokemon.name}" style="width:180px; height:200px;">
      </div>
      <div class="dex-card__body">
            <div class="dex-card__number">#${String(pokemon.id).padStart(4, "0")}</div>
            <div class="dex-card__name">${pokemon.name}</div>

            <div class="flex gap-1 my-1">
            ${pokemon.types.map(type => `<span class="type-badge type-${type}">${type}</span>`).join("")}
            </div>

            <div class="stats mt-2 text-sm text-gray-300">
                <p> HP: ${pokemon.stats.hp}</p>
                <p> Attack: ${pokemon.stats.attack}</p>
                <p> Defense: ${pokemon.stats.defense}</p>
                <p> Speed: ${pokemon.stats.speed}</p>
            </div>
        </div>
        `;
        container.appendChild(card);
    });
}