import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {loadIngredients} = props;
  const [enteredTitle, setTitle] = useState("");
  const inputRef= useRef();


  useEffect(()=>{
    const timer = setTimeout(() => {
      if(enteredTitle === inputRef.current.value) {
        const query = enteredTitle.length === 0 ? '' :
        `?orderBy="title"&equalTo="${enteredTitle}"`
        fetch("https://react-hooks-update-9216a.firebaseio.com/ingredients.json" + query)
        .then(response => { return response.json() })
        .then(responseData => {
          const loadedIng = [];
        for(const key in responseData) {
            loadedIng.push({
              id: key,
              title: responseData[key].title,
              amount: responseData[key].amount,
            });
          }
          loadIngredients(loadedIng);
        })
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [enteredTitle, loadIngredients, inputRef])


  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={enteredTitle} onChange={event => setTitle(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
