const caughtIds = JSON.parse(localStorage.getItem("caughtPokemons")) || [];
const main = document.querySelector("main");
if (caughtIds.length === 0) {
  main.innerHTML = "<h2>Start catching Pokémon!</h2>";
} else {
    main.innerHTML = '';
    caughtIds.forEach(pokeId => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
      .then(res => res.json())
      .then(details => {
        console.log(details);
        const pokemonName = details.name;
        const pokemonSprite = details.sprites.other.home.front_default;
        const pokemonTypes = details.types.map(t => t.type.name).join(", ");

        const pokemonTypesHtml = details.types
          .map(t => `<span class="type-badge type-${t.type.name}">${t.type.name}</span>`)
          .join("");

        let pokemonCard = document.createElement("div");
        pokemonCard.className = "caught-pokemon-card w-100";
        pokemonCard.innerHTML = `
          

          <div class="space-y-4">
          <h1>${pokemonName}</h1>
        <div class="card p-6 flex items-center justify-center">
        
            <img src="${pokemonSprite}" alt="${pokemonName}">
        </div>
    </div>
    <div class="space-y-6">
        
        <div class="card p-4 space-y-2">
            <p><span class="text-gray-400">Height:</span> ${details.height}"</p>
            <p><span class="text-gray-400">Weight:</span> ${details.weight} lbs</p>
        </div>
        <div>
            <h3 class="mb-2 font-bold">Type</h3>
            <div class="flex gap-2">
                ${pokemonTypesHtml}
            </div>
        </div>
        <div class="card">
            <div class="flex">
                <div class="tab">Stats</div>
            </div>
            <div class="p-4 text-sm space-y-2">
                
                <p><span class="text-gray-400">HP:</span> ${details.stats[0].base_stat}"</p>
                <p><span class="text-gray-400">Attack:</span> ${details.stats[1].base_stat}"</p>
                <p><span class="text-gray-400">Defense:</span> ${details.stats[2].base_stat}"</p>
                <p><span class="text-gray-400">Speed:</span> ${details.stats[5].base_stat}"</p>
            </div>
        </div>
    </div>


        `;  
        main.appendChild(pokemonCard);
      })
      .catch(error => console.error("Error loading pokemon:", error));
    });
}