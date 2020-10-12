import React, { useCallback, useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from "./IngredientList";

const Ingredients = () => {
  const [enteredIngrdient, setIngredients] = useState([]);

  // useEffect(()=>{
  //   fetch("https://react-hooks-update-9216a.firebaseio.com/ingredients.json").then(response => { return response.json() }).then(responseData => {
  //     const loadedIng = [];
  //   for(const key in responseData) {
  //       loadedIng.push({
  //         id: responseData.name,
  //         title: responseData[key].title,
  //         amount: responseData[key].amount,
  //       });
  //     }
  //     setIngredients(loadedIng);
  //   })
  // }, [])

  const addIngredienthandler = (ingredient) => {
    fetch("https://react-hooks-update-9216a.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => { console.log(response); return response.json() }).then(responseData => {
      setIngredients(prevIngredient => [...prevIngredient, {
        id: responseData.name, ...ingredient
      }]);
    })

  }
  const filterIngredients = useCallback((ingredients) => {
    setIngredients(ingredients);
  }, [setIngredients]);
  

  const removeIngredientHandler = ingredientId => {
    fetch(`https://react-hooks-update-9216a.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      setIngredients(prevIngredients =>
        prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
      );
    })
   
  };


  return (
    <div className="App">
      <IngredientForm addIng={addIngredienthandler} />

      <section>
        <Search loadIngredients={filterIngredients} />
        <IngredientList ingredients={enteredIngrdient} onRemoveItem={removeIngredientHandler}></IngredientList>
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
