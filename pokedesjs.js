const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#ca2507',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#b8051b',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    dark:'#5d615e',
    fairy:'#fa63ac',
    default: '#2A1A1F',
};

const fetchpokemon=() =>{
    const pokename=document.getElementById("pokename");
    let pokein=pokename.value.toLowerCase();
    const url= `https://pokeapi.co/api/v2/pokemon/${pokein}`;
    fetch(url).then((res)=>{
        console.log(res);
        if (res.status !="200"){
        console.log(res);
        pokeimage("./img/mal.jpg")
        renderNotFound()
        }
        else{
    return res.json();
        }

    }).then((data)=>{
        console.log(data);
        let pokeimg=data.sprites.front_shiny;
        pokeimage(pokeimg)
        renderPokemonData(data)
        const { stats, types } = data;
        const pokeimgr=document.getElementById("pokeimg")
        renderPokemonTypes(types);
        renderPokemonStats(stats);
        const colorOne = typeColors[types[0].type.name];
        const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
        pokeimgr.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
        pokeimgr.style.backgroundSize = ' 5px 5px';
        let col=document.getElementById("circu")
        col.style.background=`radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    })
}
//fetchpokemon();
const pokeimage=(url) =>{
    const pokeimg=document.getElementById("pokeimg")
    pokeimg.src= url;
    
}
//pokeimag("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png");



const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}
const renderPokemonData = data => {
    const { stats, types } = data;
    pokeName.textContent = data.name;
    pokeId.textContent = `Nº ${data.id}`;
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}