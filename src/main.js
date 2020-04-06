import data from './data/pokemon/pokemon.js';

import {
  filterByType,
  orderAlphabetically,
  searchByName,
} from './utils.js';

const mainContainer = document.querySelector('.stack');

const resistanceWeaknesses = (pokemon) => {
  let resistanceAndWeaknesses = '';
  let resistanceList = '';
  let weaknessesList = '';

  pokemon.resistant.forEach((elemResistance) => {
    resistanceList += `<img class="resist-weak-img" src="./img/types-pokemon/${elemResistance}.png"/>`;
  });
  pokemon.weaknesses.forEach((elemWeaknesses) => {
    weaknessesList += `<img class="resist-weak-img" src="./img/types-pokemon/${elemWeaknesses}.png"/>`;
  });
  resistanceAndWeaknesses += `
    <div class="res-weak">
      <p class="modal-resistance">RESISTANCE</p>
      <div>${resistanceList}</div>
    </div>
    <div class="res-weak">
      <p class="modal-weakness">WEAKNESSES</p>
      <div>${weaknessesList}</div>
    </div>
  `;
  return resistanceAndWeaknesses;
};

const moveSets = (pokemon) => {
  let damageSets = '';
  let quickMoves = '';
  let specialAttacks = '';

  pokemon['quick-move'].forEach((quickMove) => {
    quickMoves += `<p ${quickMove.name} <span class="moveset">${(quickMove.damage / quickMove['move-duration-seg']).toFixed(1)}</span></p>`;
  });
  pokemon['special-attack'].forEach((specialAttack) => {
    specialAttacks += `<p ${specialAttack.name} <span class="moveset">${(specialAttack.damage / specialAttack['move-duration-seg']).toFixed(1)}</span></p>`;
  });
  damageSets += `
    <div class="movesets">
      <p class="modal-quick-moves">QUICK MOVES</h4>
      ${quickMoves}
    </div>
    <div class="movesets">
      <h4 class="modal-special-attack">SPECIAL ATTACKS</h4>
      ${specialAttacks}
    </div>
    `;
  return damageSets;
};

const showMorePokemonInfo = pokemon => () => {
  const modalBlock = document.createElement('div');
  modalBlock.classList.add('modal-block');
  modalBlock.innerHTML = `
    <div id="modal-section" class="modal-section ocultar mostrar">
      <a class="closePopup" href="#"><span id="close" class="close">x</span></a>
      <section class="modal-pokemon">
        <img src="${pokemon.img}" class="pokemon-big-image">
        <h1 class="pokemon-big-name">${pokemon.name}</h1>
      </section>
      <section class="modal-stats">
        ${resistanceWeaknesses(pokemon)}
      </section>
      <section class="modal-movesets">
        ${moveSets(pokemon)}
        <p class="dps-number">${calculateDPS(pokemon)}</p>
      </section>
    </div>
  `;
  mainContainer.appendChild(modalBlock);
  
  const buttonExit = document.getElementById('close');

  if(buttonExit!=null){
    buttonExit.addEventListener('click', () => {
    modalBlock.classList.add('hide');
    modalBlock.innerHTML = '';
    });
  };
};


const calculateDPS = (pokemon) => {

  console.log(pokemon['special-attack'])
};
 /*const damageByAttack = pokemon.forEach(dps) => {
   damageByAttack = parseFloat(dps);
   const baseDamage = elem['base-damage'];
   const moveSeg = elem['move-duration-seg'];
   return (baseDamage * 1.25) / moveSeg;
   
 });

 console.log(damageByAttack);

 const totalDps = damageByAttack.reduce((dps, dps1) => dps + dps1);
 const promTotalDps = (totalDps / damageByAttack.length).toFixed(1);
 return promTotalDps;
};*/

const showPokemon = (pokemonList) => {
  pokemonList.forEach((pokemon) => {
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('pokemon-card');
    pokemonCard.innerHTML = `
        <p class="pokemon-number">${pokemon.num}</p>
        <div class="pokemon-image"><img src = ${pokemon.img} class="pokemon-pic" alt="pokemon picture"></div>
        <p class= "pokemon-name">${pokemon.name}</p>
        `;
    const handleClick = showMorePokemonInfo(pokemon);
    // helper function does currying transform

    pokemonCard.addEventListener('click', handleClick);
    mainContainer.appendChild(pokemonCard);
  });
};

showPokemon(data.pokemon);

const showByType = document.querySelector('#order-by-type');

showByType.addEventListener('change', () => {
  const chosenType = showByType.value;
  mainContainer.innerHTML = '';
  showPokemon(filterByType(data.pokemon, chosenType));
  if (chosenType === 'all-types') {
    showPokemon(data.pokemon);
  }
});

const orderAlphabeticallySelect = document.querySelector('#order-alphabetically');

orderAlphabeticallySelect.addEventListener('change', () => {
  const selectedOrder = orderAlphabetically.value;
  mainContainer.innerHTML = '';
  showPokemon(orderAlphabetically(data.pokemon, selectedOrder));
});

const image = document.querySelector('.magnifying-glass');

image.addEventListener('click', (clickEvent) => {
  const domEvent = document.createEvent('Event');
  domEvent.initEvent('submit', false, true);
  clickEvent.target.closest('form').dispatchEvent(domEvent);
});

const form = document.querySelector('.search-form');

const chosenName = document.getElementById('search-by-name');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const pokemonName = chosenName.value.toLowerCase();
  mainContainer.innerHTML = '';
  showPokemon(searchByName(data.pokemon, pokemonName));
  if (!mainContainer.innerHTML) {
    mainContainer.innerHTML = `
    <div class="error-message">
      <img src="./img/error.png" alt="error icon" class="error-icon"/>
      <p>Lo sentimos, tu búsqueda no ha generado ningún resultado.</p>
    </div>
    `;
  }
});

const originalState = document.getElementById('logo-image');

originalState.addEventListener('click', () => {
  mainContainer.innerHTML = '';
  showPokemon(data.pokemon);
});

