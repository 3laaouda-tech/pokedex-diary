

const pokeDetailsInfo = [];

async function fetchPokemon() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=25");

    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon data");
    }

    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      throw new Error("Invalid data format: 'results' is missing or not an array");
    }

    // use promise.all to wait for all fetches to complete
    const pokemonObjects = await Promise.all(

      data.results.map(async pokemon => {
        const pokeResponse = await fetch(pokemon.url)
        if (!pokeResponse.ok) {
          throw new Error(`Failed to fetch details for ${pokemon.name}`);
        }

        const pokeDetails = await pokeResponse.json();

        // build abilities array
        const abilities = pokeDetails.abilities.map((a) => a.ability.name);

        //build stats object
        const stats = {};
        pokeDetails.stats.forEach(stat => {
          stats[stat.stat.name] = stat.base_stat;
        });

        //build type array 
        const types = pokeDetails.types.map((t) => t.type.name);

        return {
          name: pokeDetails.name,
          url: pokemon.url,
          id: pokeDetails.id,
          height: pokeDetails.height,
          weight: pokeDetails.weight,
          sprite: pokeDetails.sprites.front_default,
          abilities: abilities,
          stats: stats,
          types: types,
          notes: "",
        };

      })
    );

    // push all objects into pokemonDetailsInfo array
    pokeDetailsInfo.push(...pokemonObjects);
    //console.log("PokeDetailsInfo: ", pokeDetailsInfo);
    //buildCards(pokeDetailsInfo);

  } catch (error) {
    console.error(error);
  }
}

function buildCards(arr) {
  const container = document.querySelector(".dex-grid");
  container.innerHTML = ""; // Clear existing content

  arr.forEach(pokemon => {

    // create card element
    const card = document.createElement("a");
    card.href = "details.html";
    card.className = "dex-card";

    // display image
    const divImg = document.createElement("div");
    divImg.className = "dex-card__img";
    const img = document.createElement("img");
    img.src = pokemon.sprite;
    img.alt = pokemon.name;
    img.style.width = "180px";
    img.style.height = "200px";
    divImg.appendChild(img);

    const divBody = document.createElement("div");
    divBody.className = "dex-card__body";

    // display Pokemon number, name, and badge types
    const divNumber = document.createElement("div");
    divNumber.className = "dex-card__number";
    divNumber.textContent = `#${String(pokemon.id).padStart(4, '0')}`;

    const divName = document.createElement("div");
    divName.className = "dex-card__name";
    divName.textContent = pokemon.name;

    const divTypes = document.createElement("div");
    divTypes.className = "flex gap-1";
    pokemon.types.forEach(type => {
      const span = document.createElement("span");
      span.className = `type-badge type-${type}`;
      span.textContent = type;
      divTypes.appendChild(span);
    });

    divBody.appendChild(divNumber);
    divBody.appendChild(divName);
    divBody.appendChild(divTypes);

    card.appendChild(divImg);
    card.appendChild(divBody);

    container.appendChild(card);
  });
}

async function init() {
  await fetchPokemon();
  //console.log(pokeDetailsInfo); 
  buildCards(pokeDetailsInfo);
}

init();