import React from 'react'
import './Recipe.css';


function Recipe({title,image,calories,ingredients}) {
    return (
        <div className = "recipe">
        <h1>{title}</h1>
         <ol>
        {ingredients.map(ingredient => 
            (<li>{ingredient.text}</li>
            ))}
          </ol>
          <h1>{calories}</h1>
          <img src = {image} alt=""></img>
        </div>
    )
}

export default Recipe
