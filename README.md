# 🐉 Pokemon Workflow Project

## 📁 Project Setup
- Create the repository and share it
- Define the project file structure
- Create the following files:
  - `index.html`
  - `main.js`
  - `pokedex.html`
  - `pokedex.js`

---

## 🎨 Pages Design

### 🏠 Home Page
- Displays all Pokémon
- Shows basic information:
  - Image
  - Name
  - Stats

### 📄 Details Page
- Displays detailed information about a selected Pokémon:
  - Name
  - Types
  - Stats
  - Sprites
  - Abilities

---

## 🌐 Fetch Pokémon Data (FR009 - Maria)
- Fetch Pokémon list in `main.js` from:
  https://pokeapi.co/api/v2/pokemon

- For each Pokémon:
  - Fetch details from its specific endpoint
  - Extract:
    - Image
    - Name
    - Stats
- Display each Pokémon on the page

---

## 🔍 Search Feature (FR010 - Alaa)
- Add a search bar
- Allow search by:
  - Pokémon name
  - Numeric ID
- Display results or feedback using a dialog

---

## 🧱 Pokémon Card (FR011 - Amos)
- Create a function:
  `buildCard(pokemon)`

- Card should include:
  - Pokémon image
  - Pokémon name
  - Stats:
    - HP
    - Attack
    - Defense

- Add a **"Catch them"** button inside each card
- Append the card to the page

---

## 🎯 Catch Feature (FR012 - Amos)
- "Catch them" button functionality:
  - Stores the Pokémon as an object in an array inside `localStorage`

- Steps:
  - Listen for button click in `main.js`
  - Read existing list from `localStorage`
  - Check if Pokémon already exists:
    - If yes → handle accordingly
  - Add/update Pokémon in array
  - Save updated array back to `localStorage`

---

## 📚 Pokédex Page (FR013 - Maria)
- Displays favourite Pokémon from `localStorage`

- In `pokedex.js`:
  - Read data from `localStorage`
  - Parse stored data
  - Check if list exists
  - Loop through stored Pokémon
  - Build and display cards including:
    - Image
    - Name
    - Stats
    - Additional details if needed

---

## 🚀 Notes
- Use clean and reusable functions
- Keep UI simple and readable
- Make sure localStorage handling is robust (avoid duplicates)
