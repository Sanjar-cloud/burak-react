import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import Events from "./Events";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import Statistics from "./statistics";
import "../../../css/home.css";

import { useDispatch, useSelector } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { retrievePopularDishes } from "./selector";
import type { Product } from "../../../lib/types/product";
import { useEffect } from "react";

/** redux slice & selector */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});
const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes })
);


export default function HomePage() {
 const { setPopularDishes } = actionDispatch(useDispatch());
 const { popularDishes } = useSelector(popularDishesRetriever);

  useEffect(() => {}, []);
  
  return <div className={ "homepage "}>
    <Statistics />
    <PopularDishes />
    <NewDishes /> 
    <Advertisement />
    <ActiveUsers />
    <Events />

  </div>;
} 

