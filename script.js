// create html elements using dom

document.body.innerHTML = `
<header><h1>POKEMON API</h1></header><br>
<div class="input-container">
<input type="search" class="search-box" placeholder="Search here.."><br><br>
<button class="searchbtn">Search</button>
</div>
<div class="main-container">
<div class="container">     
</div>
`;

//DOM Objects
const displayResult = document.querySelector(".main-container");


//get data from api
const getData = async () => {
   
  try {
    let pokemondata=[];
    let resultData;
    for (let id = 1; id <= 50; id++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    resultData = await response.json();
    //   console.log(resultData);
      displayPokemon(resultData);
      pokemondata.push(resultData);
    }
    return pokemondata;
  } catch (error) {
    console.log(error);
  }
};


//create displayPokemon function

const displayPokemon = (resultData) => {
  let pokeAbility = resultData.abilities;
  let pokeMove = resultData.moves;
  displayResult.innerHTML += `
    <div class="container">
    <div class="card" style="width: 18rem;">
      <img src="${
        resultData.sprites.front_default
      }" class="card-img-top" alt="pokemon front image" />    
      <div class="card-body">
        <h5 class="card-title">${resultData.name}</h5>
        <ul class="list-group list-group-flush">
        <li class="list-group-item">Ability: ${
          pokeAbility[0] && pokeAbility[1]
            ? `${pokeAbility[0].ability.name}, ${pokeAbility[1].ability.name}`
            : "none"
        }</li>
        <li class="list-group-item">Moves: ${pokeMove[0].move.name}, ${
    pokeMove[1].move.name
  }</li>
        <li class="list-group-item">Weight: ${resultData.weight}</li>
      </ul>        
      </div>
    </div>
    </div>
    `;
};

//select the input element for search
const searchInput=document.querySelector(".search-box");
const searchButton=document.querySelector(".searchbtn");

// Logic for search functionality
searchButton.addEventListener("click",async ()=>{
    let pokemondata= await getData();
    console.log(pokemondata);
    let enteredText = searchInput.value;
    let filteredPokemon=[];
    if(enteredText !=" "){
//logic for filter the pokemon data
filteredPokemon=pokemondata.filter((pokemon) =>
pokemon.name.toLocaleLowerCase().includes(enteredText.toLocaleLowerCase()));
    }
    displayPokemon(filteredPokemon);
    console.log(filteredPokemon);
});
getData();
