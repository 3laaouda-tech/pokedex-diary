//Maria// 
const caughtIds = JSON.parse(localStorage.getItem("caughtPokemons")) || [];

if (caughtIds.length === 0) {
  document.body.innerHTML = "<h2>Start catching Pokémon!</h2>";
} else {
  const lastId = caughtIds[caughtIds.length - 1];

  fetch(`https://pokeapi.co/api/v2/pokemon/${lastId}`)
    .then(res => res.json())
    .then(details => {
      document.querySelector("h1").textContent = details.name;

      const image = document.querySelector("img");
      image.src = details.sprites.front_default;
      image.alt = details.name;

      const stats = document.querySelectorAll(".p-4 p");

      stats[0].textContent = `HP:${details.stats[0].base_stat}`;
      stats[1].textContent = `Attack:${details.stats[1].base_stat}`;
      stats[2].textContent = `Defense:${details.stats[2].base_stat}`;
      stats[3].textContent = `Speed:${details.stats[5].base_stat}`;

      const typeContainer = document.querySelector(".flex.gap-2");
      typeContainer.innerHTML = "";

      details.types.forEach(t => {
        const span = document.createElement("span");
        span.className = `type-badge type-${t.type.name}`;
        span.textContent = t.type.name;
        typeContainer.appendChild(span);
      });
    })
    .catch(error => console.error("Error loading pokemon:", error));
}