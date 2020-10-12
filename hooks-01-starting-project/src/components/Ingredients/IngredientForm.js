import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {

  // const inputState = useState({title: "", amount: ""});
  const [enteredTitle, setTitle] = useState('');
  const [enteredAmount, setAmount] = useState('');
  const submitHandler = event => {
    event.preventDefault();
    props.addIng({
      title: enteredTitle,
      amount: enteredAmount
    });
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            {/* <input type="text" id="title" 
            value={inputState[0].title}
            onChange={event => {
              const newTitle = event.target.value;
              inputState[1](prevState => ({
                title: newTitle,
                amount: prevState.amount
              }))
            }}/> */}

            <input type="text" id="title" 
              value={enteredTitle}
              onChange={event => setTitle (event.target.value)}/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            {/* <input type="number" id="amount" 
              value={inputState[0].amount}
              onChange={event => {
                    const newAmount = event.target.value;
                      inputState[1](prevState => ({
                        amount: newAmount,
                        title: prevState.title
                      }))
              }}/> */}

            <input type="number" id="amount" 
              value={enteredAmount}
              onChange={event => setAmount(event.target.value)}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
