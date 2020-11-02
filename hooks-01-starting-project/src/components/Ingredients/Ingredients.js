import React, { useCallback, useEffect, useState, useReducer, useMemo } from 'react';
import useHttp from './../hooks/http';
import IngredientForm from './IngredientForm';
import Search from './Search';
import ErrorModal from "../UI/ErrorModal";
import IngredientList from "./IngredientList";

const ingredientsReducer = (currentIng, action) => {
  switch(action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIng, action.ingredient];
    case 'DELETE':
      return currentIng.filter(ing => ing.id !== action.id);
    default:
      throw new Error('should not reach this block');
  }
}
const httpReducer = (currentHttpState, action) => {
  switch(action.type) {
    case 'SEND':
      return {isLoading: true, error: null};
    case 'RESPONSE':
      return {...currentHttpState, isLoading: false};
    case 'ERROR':
      return {isLoading: false, error: action.errorData};
    case 'CLEAR':
      return {...currentHttpState, error: null};
    default:
      throw new Error('should not reach this block');
  }
}
const Ingredients = () => {
  const [enteredIngrdient, dispatch] = useReducer(ingredientsReducer,[]);
 // const [httpState, dispatchHttp] = useReducer(httpReducer, { isLoading: false, error: null});

  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifer,
    clear
  } = useHttp();

  useEffect(() => {
    if (!isLoading && !error && reqIdentifer === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqIdentifer === 'ADD_INGREDIENT') {
      dispatch({
        type: 'ADD',
        ingredient: { id: data.name, ...reqExtra }
      });
    }
  }, [data, reqExtra, reqIdentifer, isLoading, error]);

 // const [enteredIngrdient, setIngredients] = useState([]);
  //const [isLoading, setLoading] = useState(false);
  //const [error, setError] = useState();


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

  const addIngredienthandler = useCallback((ingredient) => {
  //  setLoading(true);
  // dispatchHttp({type: 'SEND'});
  //   fetch("https://react-hooks-update-9216a.firebaseio.com/ingredients.json", {
  //     method: "POST",
  //     body: JSON.stringify(ingredient),
  //     headers: { 'Content-Type': 'application/json' }
  //   }).then(response => { console.log(response); 
  //   //  setLoading(false); 
  //   dispatchHttp({type: 'RESPONSE'});
  //     return response.json() }).then(responseData => {
  //     // setIngredients(prevIngredient => [...prevIngredient, {
  //     //   id: responseData.name, ...ingredient
  //     // }]);
  //     dispatch({type: 'ADD', ingredient: ingredient});
  //   })
  sendRequest(
    'https://react-hooks-update-9216a.firebaseio.com/ingredients.json',
    'POST',
    JSON.stringify(ingredient),
    ingredient,
    'ADD_INGREDIENT'
  );
  }, [sendRequest]);


  const filterIngredients = useCallback((ingredients) => {
  //  setIngredients(ingredients);
  dispatch({type: 'SET', ingredients: ingredients});
  }, []);
  

  const removeIngredientHandler = useCallback(ingredientId => {
  //  setLoading(true);
  // dispatchHttp({type: 'SEND'});
  //   fetch(`https://react-hooks-update-9216a.firebaseio.com/ingredients/${ingredientId}.json`, {
  //     method: "DELETE",
  //     headers: { 'Content-Type': 'application/json' }
  //   }).then(response => {
  //     dispatchHttp({type: 'RESPONSE'});
  //  //   setLoading(false);
  //     dispatch({type: 'DELETE', id: ingredientId});
  //     // setIngredients(prevIngredients =>
  //     //   prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
  //     // );
    // })
    // .catch(error => {
    //   dispatchHttp({type: 'ERROR', errorData: "something went wrong !!!"});
    // //  setError("something went wrong !!!")
    // })
    sendRequest(
      `https://react-hooks-update-9216a.firebaseio.com/ingredients/${ingredientId}.json`,
      'DELETE',
      null,
      ingredientId,
      'REMOVE_INGREDIENT'
    );
  }, [sendRequest]);

 // const clearError = useCallback(() => {
  //  dispatchHttp({type: 'CLEAR'});
 //   setError(null);
   // setLoading(false);
//  }, [])

  const ingList = useMemo(() => {
    return <IngredientList ingredients={enteredIngrdient} onRemoveItem={removeIngredientHandler}></IngredientList>
  }, [enteredIngrdient, removeIngredientHandler]);


  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm addIng={addIngredienthandler} isloading={isLoading} />

      <section>
        <Search loadIngredients={filterIngredients} />
        {ingList}
        {/* <IngredientList ingredients={enteredIngrdient} onRemoveItem={removeIngredientHandler}></IngredientList> */}
        {/* Need to add list here! */}
      </section>
    </div>
  );
}

export default Ingredients;
