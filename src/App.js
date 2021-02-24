import "./App.css";
import React, { useState, useEffect } from "react";
import Recipe from "./Recipe";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("pizza");

  useEffect(() => {
    ///when returned recipe data changes, then re-run run the use effect
    getRecipes();
    console.log("EFFECT HAS BEEN RUN");
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`
    ); ///data wont arrrive instantly so need to wait
    const data = await response.json();
    setRecipes(data.hits); //all Recipes are now in the state,
    console.log(data.hits);
  };

  // with the on change, everytime the input changes run update search
  const updateSearch = (e) => {
    setSearch(e.target.value); //search will be updated to the value written in input box
    console.log(search);
  };

  const getSearch = (e) => {
    e.preventDefault(); //stop the page from refreshing and reseting the state
    setQuery(search);
  };

  //prevents page from refreshing on submit
  // const onSubmit = e =>{
  //   e.preventDefault();
  //   getRecipes();
  // }

  return (
    <div className="App">
      <h1>SEARCH FOR A RECIPE OF YOUR CHOICE</h1>

      <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={uuidv4()}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          /> // for each item in recipe get RECIPE COMPONENT and set data values
        ))}
      </div>
    </div>
  );
}

export default App;
