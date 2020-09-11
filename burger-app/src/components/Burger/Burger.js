import React from 'react';
import classes from "./Burger.module.css";
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';
const Burger = (props) => {
    let transformedIngedrients = Object.keys(props.ingredients)
        .map(igRef => {
            return [...Array(props.ingredients[igRef])].map((_, i) => {
                return <BurgerIngredient key={igRef+i} type={igRef}/>
            });
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []);
        if (transformedIngedrients.length === 0) {
            transformedIngedrients = <p>Please add some ingredients</p>;
        }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngedrients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    )
}
export default Burger;