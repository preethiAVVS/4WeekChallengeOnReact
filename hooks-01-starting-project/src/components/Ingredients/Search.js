import React, { useState, useEffect, useRef } from 'react';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../hooks/http';
import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {loadIngredients} = props;
  const [enteredTitle, setTitle] = useState("");
  const inputRef= useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();


  useEffect(()=>{
    const timer = setTimeout(() => {
      if(enteredTitle === inputRef.current.value) {
        const query = enteredTitle.length === 0 ? '' :
        `?orderBy="title"&equalTo="${enteredTitle}"`

        sendRequest(
          'https://react-hooks-update-9216a.firebaseio.com/ingredients.json' + query,
          'GET'
        );
        // fetch("https://react-hooks-update-9216a.firebaseio.com/ingredients.json" + query)
        // .then(response => { return response.json() })
        // .then(responseData => {
        //   const loadedIng = [];
        // for(const key in responseData) {
        //     loadedIng.push({
        //       id: key,
        //       title: responseData[key].title,
        //       amount: responseData[key].amount,
        //     });
        //   }
        //   loadIngredients(loadedIng);
        // })
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [enteredTitle, inputRef, sendRequest])

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount
        });
      }
      loadIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, loadIngredients]);


  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input ref={inputRef} type="text" value={enteredTitle} onChange={event => setTitle(event.target.value)}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
