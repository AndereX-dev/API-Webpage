const pokemonCount = 151
let pokedex = {}

window.onload = async function() {
    getPokemon(1)
    for(let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i)

        let pokemon = document.createElement("div")
        pokemon.id = i
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase()
        pokemon.classList.add("pokemon-name")
        pokemon.addEventListener("click", updatePokemon)
        document.getElementById("pokemon-list").append(pokemon)
    }
    console.log(pokedex)
}

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString()

    let res = await fetch(url)
    let pokemon = await res.json()
    //console.log(pokemon)

    let pokemonName = pokemon["name"]
    let pokemonType = pokemon["types"]
    let pokemonImg = pokemon["sprites"]["fron_default"]

    res = await fetch(pokemon["species"]["url"])
    let pokemonDesc = await res.json()
    //console.log(pokemonDesc)
    pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"]

    pokedex [num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc" : pokemonDesc}
}

function updatePokemon() {
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"]
    //clear previous type
    let typesDiv = document.getElementById("pokemon-types")
    while (typesDiv.firstChild) {
        typesDiv.firstChild.remove()
    }
    //update type
    let types = pokedex[this.id]["types"]
    for(let i = 0; i < types.length; i++) {
        let type = document.createElement("span")
        type.innerText = types[i]["type"]["name"].toUpperCase()
        type.classList.add("type-box")
        type.classList.add(types[i]["type"]["name"])
        typesDiv.append(type)

    }

    document.getElementById("pokemon-desc").innerText = pokedex[this.id]["desc"]
}