import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import Events from "./Events";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import Statistics from "./statistics";
import "../../../css/home.css";

import { useDispatch } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import { setPopularDishes } from "./slice";
import type { Product } from "../../../lib/types/product";
import { useEffect } from "react";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";

/** redux slice & selector */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});


export default function HomePage() {
 const { setPopularDishes } = actionDispatch(useDispatch());



 useEffect(() => {
  // Backend server data fetch => Data
  const product = new ProductService();
  product
    .getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      productCollection: ProductCollection.DISH,
    })
    .then((data) => {
      console.log("data passed here:", data);
      setPopularDishes(data);
    })
    .catch((err) => console.log(err));
}, []);



  
  return <div className={ "homepage "}>
    <Statistics />
    <PopularDishes />
    <NewDishes /> 
    <Advertisement />
    <ActiveUsers />
    <Events />

  </div>;
} 

