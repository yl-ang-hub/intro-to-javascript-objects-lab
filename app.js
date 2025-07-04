const pokemon = require("./data.js");

const game = {
  party: [],
  gyms: [
    { location: "Pewter City", completed: false, difficulty: 1 },
    { location: "Cerulean City", completed: false, difficulty: 2 },
    { location: "Vermilion City", completed: false, difficulty: 3 },
    { location: "Celadon City", completed: false, difficulty: 4 },
    { location: "Fuchsia City", completed: false, difficulty: 5 },
    { location: "Saffron City", completed: false, difficulty: 6 },
    { location: "Cinnabar Island", completed: false, difficulty: 7 },
    { location: "Viridian City", completed: false, difficulty: 8 },
  ],
  items: [
    { name: "potion", quantity: 4 },
    { name: "pokeball", quantity: 8 },
    { name: "rare candy", quantity: 99 },
  ],
};

// console.dir(pokemon, { maxArrayLength: null });
// console.log(pokemon[59]);

/*
Exercise 3
1. Add a new property to the `game` object. Let's call it "difficulty".
2. Choose a value for "difficulty" that you think fits the game. Ex: "Easy", "Med" or "Hard". How would you assign it?
*/

game.difficulty = "Easy";

/*
Exercise 4
1. Select a starter Pokémon from the `pokemon` array. Remember, a starter Pokémon's `starter` property is true.
2. Add this Pokémon to the `game.party` array. Which array method will you use to add them?
*/

// Treat each Pokemon as an object and randomly select a starter Pokemon as the first member of the party
const starterPokemon = pokemon.filter((eachPokemon) => eachPokemon.starter);
game.party.push(
  starterPokemon[Math.floor(Math.random() * starterPokemon.length)]
);

/*
Exercise 5
1. Choose three more Pokémon from the `pokemon` array and add them to your party.
2. Consider different attributes like 'type' or 'HP' for your selection. Which array method will you use to add them?
*/

const bestPokemon = pokemon.filter((eachPokemon) => {
  if (
    !eachPokemon.starter &&
    eachPokemon.hp > 120 &&
    eachPokemon.type !== game.party[0].type &&
    eachPokemon.type !== "bug"
  ) {
    return eachPokemon;
  }
});
for (let i = 0; i < 3; i++) {
  const j = Math.floor(Math.random() * bestPokemon.length);
  game.party.push(bestPokemon[j]);
  bestPokemon.splice(j, 1);
}

/*
Exercise 6
1. Set the `completed` property to true for gyms with a difficulty below 3.
2. Think about how you'd loop through the `gyms` array to check and update the `completed` property.
*/
for (const gym of game.gyms) {
  if (gym.difficulty < 3) gym.completed = true;
}

/*
Exercise 7
1. Evolve the starter Pokémon you added to your party earlier. Each starter Pokémon evolves into a specific one.
2. How would you replace the current starter Pokémon in your party with its evolved form?

Hint: 
  - Pokemon 1: Bulbasaur evolves into Pokemon 2: Ivysaur
  - Pokemon 4: Charmander evolves into Pokemon 5: Charmeleon
  - Pokemon 7: Squirtle evolves into Pokemon 8: Wartortle
  - Pokemon 25: Pikachu evolves into Pokemon 26: Raichu

More Hints: The existing starter Pokemon will be *replaced* in your party with the Pokemon it evolved into. When working with an array of objects, the splice() array method is ideal for replacing one element with another. 
*/

// since my starter pokemon is random, find the evolved pokemon and replace accordingly
const evolution = {
  Bulbasaur: "Ivysaur",
  Charmander: "Charmeleon",
  Squirtle: "Wartortle",
  Pikachu: "Raichu",
};
const evolvedPokemonName = evolution[game.party[0].name];
const evolvedPokemon = pokemon.find(
  (eachPokemon) => eachPokemon.name === evolvedPokemonName
);
// console.log(game.party);
// console.log(evolvedPokemon);
game.party.splice(0, 1, evolvedPokemon);
// console.log(game.party);

/*
Exercise 8
1. Print the name of each Pokémon in your party.
2. Consider using a loop or an array method to access each Pokémon's name.
*/
game.party.forEach((member) =>
  console.log(`${member.name} is part of my party!`)
);

/*
Exercise 9
1. Can you print out all the starter Pokémon from the `pokemon` array?
2. Think about how you can identify a starter Pokémon and then log their names.
*/

for (const eachPokemon of pokemon) {
  if (eachPokemon.starter) {
    console.log(`${eachPokemon.name} is a starter Pokemon.`);
  }
}

/*
Exercise 10
Create a method called `catchPokemon` and add it to the `game` object. You should not need to edit the original game object directly. This method should:
  - Accept an object as a parameter called `pokemonObj`
  - Add the `pokemonObj` to the `game.party` array.
  - not return anything

After writing this method, call it and pass in a Pokemon object of your choice from the `pokemon` data to catch it.
*/

game.catchPokemon = (pokemonObj) => {
  game.party.push(pokemonObj);
};
// console.log(game);
const randInt = Math.floor(Math.random() * pokemon.length);
game.catchPokemon(pokemon[randInt]);
// console.log(game);

/*
Exercise 11
1. Copy the `catchPokemon` method that you just wrote above, and paste it below. Modify it so that it also decreases the number of pokeballs in your inventory each time you catch a Pokémon.
2. How will you find and update the quantity of pokeballs in the `game.items` array?

Tips:
For this exercise, it's okay to have a negative number of pokeballs.
After updating the method, call it and pass in a Pokemon object of your choice from the `pokemon` data to catch it.
Also, log the `game.items` array to confirm that the pokeball quantity is being decremented.
*/

// console.log(game);
game.catchPokemon = (pokemonObj) => {
  for (const item of game.items) {
    if (item.name === "pokeball" && item.quantity > 0) {
      item.quantity--;
      game.party.push(pokemonObj);
    }
  }
};
game.catchPokemon(pokemon[Math.floor(Math.random() * pokemon.length)]);
// console.log(game);

/*
Exercise 12
1. Similar to Exercise 6, now complete gyms with a difficulty below 6. How will you approach this?
 (change the value of `complete` in the qualifying objects from false to true).
*/

game.gyms.forEach((gym) => {
  if (gym.difficulty < 6) {
    gym.completed = true;
  }
});
// console.log(game);

/*
Exercise 13
1. Create a `gymStatus` method in `game` to tally completed and incomplete gyms.
2. How will you iterate through the `gyms` array and update the tally? Remember to log the final tally.

This method should:
  - Not accept any arguments.
  - Initially create a constant `gymTally`, which is an object that has two 
    properties: `completed` and `incomplete`, both of which are initially set to 0.
  - Iterate through the objects in the `game.gyms` array and update the 
    properties on `gymTally` as follows: 
    - `completed` should count how many gyms in the array have a value of `true` 
      for their `completed` property. 
    - `incomplete` should count how many gyms in the array have a value of 
      `false` for their `completed` property.
  - Log the value of `gymTally`.
  - The method should not return anything.

For example, if five gym objects have a value of `true` on their `completed` property and three gym objects have a value of `false` on their `completed` property, the logged value would be: `{ completed: 5, incomplete: 3 }`.
*/

gymTally = {
  completed: 0,
  incomplete: 0,
};
for (const gym of game.gyms) {
  if (gym.completed) {
    gymTally.completed += 1;
  } else {
    gymTally.incomplete += 1;
  }
}
game.gymStatus = gymTally;
// console.log(game);

/*
Exercise 14
1. Add a `partyCount` method to `game` that counts the number of Pokémon in your party.

This method should:
  - Not accept any arguments.
  - Count the number of Pokemon in the party.
  - return the found number of Pokemon in the party.
*/

game.partyCount = () => game.party.length;
// console.log(game.partyCount());

/*
Exercise 15
1. Now, complete gyms with a difficulty below 8. Reflect on how this is similar to or different from the previous gym exercises.
(change the value of `complete` in the qualifying objects from false to true).
*/

// Since used for-of and forEach
for (const i in game.gyms) {
  if (game.gyms[i].difficulty < 8) {
    game.gyms[i].completed = true;
  }
}

/*
Exercise 16
1. Log the entire `game` object to the console. Take a moment to review the changes you've made throughout the exercises.
*/
// console.log(game);

/*
Exercise 17
1. Arrange the Pokémon in `game.party` by their HP. The one with the highest HP should come first.
2. You'll need to use the `.sort()` method. How does the compare function work in sorting numbers?
*/
game.party.sort((x, y) => y.hp - x.hp);
console.log(game.party);

/*
Exercise 18
Add a new property to the `game` object called `collection` and initialize its value to an empty array.

Copy the `catchPokemon` method you wrote in Exercise Twelve and paste it below. Modify it so that:
  - Ensure that no more than six Pokemon can be in the party at any time. 
    Excess Pokemon should be placed in the `game.collection` array.
  - It's up to you how to distribute Pokemon in a situation where more than six 
    would be placed into the `game.party` array.

Again, for this exercise, it's okay to have a negative number of pokeballs.

After updating the method, use it by calling it and passing in a pokemon object of your choice from the `pokemon` data to catch it.

Also, log the `game.items` array to confirm that the pokeball quantity is being decremented.
*/

// Create collection
game.collection = [];

// Track the initial pokemons and num of pokeballs
let initialPokeball = undefined;
game.items.forEach((item) => {
  if (item.name === "pokeball") {
    initialPokeball = item.quantity;
  }
});
const initialParty = game.party.map((eachPokemon) => eachPokemon.name);

// Modify catchPokemon function
game.catchPokemon = (pokemonObj) => {
  for (const item of game.items) {
    if (item.name === "pokeball" && item.quantity > 0) {
      item.quantity--;
      game.party.push(pokemonObj);
    }
  }
  // Push excess pokemons with lowest hp to collection
  while (game.partyCount() > 6) {
    game.party.sort((x, y) => y.hp - x.hp);
    game.collection.push(game.party.pop());
  }
};
const caughtPokemon = pokemon[Math.floor(Math.random() * pokemon.length)];
game.catchPokemon(caughtPokemon);

// Check list of pokemon and num of pokeballs after catching pokemon.
let endPokeball = undefined;
game.items.forEach((item) => {
  if (item.name === "pokeball") {
    endPokeball = item.quantity;
  }
});
const endParty = game.party.map((eachPokemon) => eachPokemon.name);
const endCollection = game.collection.map((eachPokemon) => eachPokemon.name);

console.log(
  `Initially, there are ${initialParty.join(
    ", "
  )} in the party, none in the collection and ${initialPokeball} pokeballs.`
);

console.log(
  `Eventually, there are ${endParty.join(
    ", "
  )} in the party, ${endCollection.join(
    ", "
  )} in the collection and ${endPokeball} pokeballs.`
);

/*
Exercise 19
Copy the `catchPokemon` method that you just wrote above, and paste it below. The time has come to make it so that we cannot catch a Pokemon when we do not have any pokeballs to catch it with. 

Modify the method so that if there are no pokeballs a message will be displayed that there are not enough pokeballs to catch the desired Pokemon.

Also, ensure that the Pokemon isn't added to the `game.party` or the `game.collection`.

Solve Exercise 19 here:
*/
game.catchPokemon = (pokemonObj) => {
  for (const item of game.items) {
    if (item.name === "pokeball" && item.quantity > 0) {
      item.quantity--;
      game.party.push(pokemonObj);
    } else {
      console.log("You don't have anymore pokeball to catch the pokemon!");
    }
  }
  // Push excess pokemons with lowest hp to collection
  while (game.partyCount() > 6) {
    game.party.sort((x, y) => y.hp - x.hp);
    game.collection.push(game.party.pop());
  }
};

/*
Exercise 20
Copy the `catchPokemon` method that you just wrote above, and paste it below. Modify is so that you can just pass in the name of a Pokemon instead of an entire object, and the method will look up the Pokemon from the data set for you.

The string passed in should be allowed to be any case (for example, if the string 'PiKacHU' is passed to the function, it should match to 'Pikachu' in the data set). 

If there is not a match, then return a string noting that the selected Pokemon does not exist. Ensure you do not decrement the pokeball count if an invalid Pokemon name is passed in, and also ensure that the Pokemon isn't added to the `game.party` or the `game.collection`.

Solve Exercise 20 here:
*/

// console.log(game);

game.catchPokemon = (pokemonName) => {
  // Search for pokemon. Alert and stop func if not found.
  let targetPokemon = undefined;
  for (const eachPokemon of pokemon) {
    if (eachPokemon.name.toLowerCase() === pokemonName.toLowerCase()) {
      targetPokemon = eachPokemon;
      break;
    }
  }
  if (!targetPokemon) {
    console.log(
      "Your imaginary pokemon does not exist. Perhaps it might spawn thanks to Darwinism a few milleniums later. Don't try again."
    );
    return;
  }

  // Capture the pokemon with pokeball
  for (const item of game.items) {
    if (item.name === "pokeball" && item.quantity > 0) {
      item.quantity--;
      game.party.push(targetPokemon);
      break;
    } else if (item.name === "pokeball" && item.quantity <= 0) {
      console.log("You don't have anymore pokeball to catch anything!");
      break;
    }
  }

  // Push excess pokemons with lowest hp to collection
  while (game.partyCount() > 6) {
    game.party.sort((x, y) => y.hp - x.hp);
    game.collection.push(game.party.pop());
  }
};

game.catchPokemon("tENtaCruel");

/*
Exercise 21
Dynamically construct an object with the existing `pokemon` data sorted by the different pokemon types. The object will have this structure:
{
  grass: [
    { number: 1, name: 'Bulbasaur', type: 'grass', hp: 45, starter: true },
    { number: 2, name: 'Ivysaur', type: 'grass', hp: 60, starter: false },
    { number: 3, name: 'Venusaur', type: 'grass', hp: 80, starter: false },
    * more grass type Pokemon objects...
  ],
  fire: [
    { number: 4, name: 'Charmander', type: 'fire', hp: 39, starter: true },
    * more fire type Pokemon objects...
  ],
  water: [
    * water type Pokemon objects...
  ],
  * etc... until there is an array for every Pokemon type!
}

Log the object when it's constructed.
*/

const pokemonByType = pokemon.reduce((acc, curr) => {
  const type = curr.type;
  if (acc === undefined || !acc[type]) {
    acc[type] = [];
    acc[type].push(curr);
  } else {
    acc[type].push(curr);
  }
  return acc;
}, {});
console.dir(pokemonByType, { maxArrayLength: null });

// Quick check that all the pokemon accounted for
// Use of destructuring with Object.entries()
let count = 0;
for (const [key, value] of Object.entries(pokemonByType)) {
  console.log(`there are ${value.length} pokemon of the ${key} type.`);
  count += value.length;
}
console.log(count);

console.log(game);
