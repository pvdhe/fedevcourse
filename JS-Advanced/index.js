'use strict';

const cakeRecipes = require("./cake-recipes.json");
const readline = require("node:readline/promises");

// Your functions here

// 1. Return a list of unique authors using forEach.
const getAllAuthors = (recipes) => {
  const authors = [];

  recipes.forEach((recipe) => {
    if (!authors.includes(recipe.Author)) {
      authors.push(recipe.Author);
    }
  });

  return authors;
};

// 2. Log the list of recipe authors to the console.
console.log(getAllAuthors(cakeRecipes));

// 3. Log each recipe name using object destructuring, or report when the list is empty.
const logRecipeNames = (recipes) => {
  if (recipes.length === 0) {
    console.log("No recipes found.");
    return;
  }

  recipes.forEach(({ Name }) => console.log(Name));
};

logRecipeNames(cakeRecipes);

// 4. Return all recipes written by the given author using filter.
const getRecipesByAuthor = (recipes, author) => {
  return recipes.filter((recipe) => recipe.Author === author);
};

// 5. Log the names of recipes by Good Food using the recipe-name function.
logRecipeNames(getRecipesByAuthor(cakeRecipes, "Good Food"));

// 6. Return recipes with an ingredient that contains the given search text.
const getRecipesByIngredient = (recipes, ingredient) => {
  return recipes.filter((recipe) =>
    recipe.Ingredients.some((recipeIngredient) =>
      recipeIngredient.toLowerCase().includes(ingredient.toLowerCase())
    )
  );
};

// 7. Log the names of recipes containing the given ingredient.
logRecipeNames(getRecipesByIngredient(cakeRecipes, "140g caster sugar"));

// 8. Return the first recipe whose name includes the given search text.
const getRecipeByName = (recipes, name) => {
  return recipes.find((recipe) => recipe.Name.includes(name));
};

// 9. Log the recipe matching the selected name.
console.log(getRecipeByName(cakeRecipes, "Baby buttermilk pancakes with sticky bananas & Brazils"));

// 10. Return all ingredients from the recipes in a single array using reduce.
const getAllIngredients = (recipes) => {
  return recipes.reduce((allIngredients, { Ingredients }) => {
    return allIngredients.concat(Ingredients);
  }, []);
};

// 11. Log ingredients from Caroline Hire's recipes as a shorter example list.
console.log(getAllIngredients(getRecipesByAuthor(cakeRecipes, "Caroline Hire")));

// 15. Store ingredients saved from recipes selected in the menu.
let savedIngredients = [];

// Part 2

const displayMenu = async (ask) => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = await ask("Enter a number (1-5) or 0 to exit: ");
  const normalizedChoice = choice.trim();
  // Reject partial numeric input so only a complete menu option is accepted.
  return /^[0-5]$/.test(normalizedChoice) ? Number(normalizedChoice) : Number.NaN;
};

const runRecipeManagementSystem = async () => {
  const input = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answers = input[Symbol.asyncIterator]();
  const ask = async (question) => {
    process.stdout.write(question);
    const { value, done } = await answers.next();
    if (done) {
      throw new Error("Input ended before a response was received.");
    }
    return value;
  };

  let choice;

  try {
    do {
      choice = await displayMenu(ask);

      switch (choice) {
        case 1:
          // 12. Show all unique authors when option 1 is selected.
          console.log(getAllAuthors(cakeRecipes));
          break;
        case 2: {
          // 13. Prompt for an author and show the names of their recipes.
          const author = await ask("Enter an author name: ");
          logRecipeNames(getRecipesByAuthor(cakeRecipes, author));
          break;
        }
        case 3: {
          // 14. Prompt for an ingredient and show the names of matching recipes.
          const ingredient = await ask("Enter an ingredient: ");
          logRecipeNames(getRecipesByIngredient(cakeRecipes, ingredient));
          break;
        }
        case 4: {
          // 16. Show a matching recipe and optionally save its ingredients.
          const name = await ask("Enter a recipe name: ");
          const recipe = getRecipeByName(cakeRecipes, name);

          if (!recipe) {
            console.log("No recipe found.");
            break;
          }

          console.log(recipe);

          let saveChoice;
          do {
            saveChoice = (await ask("Save this recipe's ingredients? (y/n): "))
              .trim()
              .toLowerCase();
            if (saveChoice !== "y" && saveChoice !== "n") {
              console.log("Please enter y or n.");
            }
          } while (saveChoice !== "y" && saveChoice !== "n");

          if (saveChoice === "y") {
            savedIngredients = [...savedIngredients, ...recipe.Ingredients];
            console.log("Ingredients saved.");
          }
          break;
        }
        case 5:
          // 17. Show ingredients saved from all selected recipes.
          if (savedIngredients.length === 0) {
            console.log("No ingredients have been saved.");
          } else {
            console.log(savedIngredients);
          }
          break;
        case 0:
          console.log("Exiting...");
          break;
        default:
          console.log("Invalid input. Please enter a number between 0 and 5.");
      }
    } while (choice !== 0);
  } finally {
    input.close();
  }
};

runRecipeManagementSystem().catch((error) => {
  console.error("Recipe Management System failed:", error);
  process.exitCode = 1;
});