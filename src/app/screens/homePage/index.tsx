import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import Events from "./Events";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import Statistics from "./statistics";
import { useDispatch } from "react-redux";
import type { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import type { Product } from "../../../lib/types/product";
import { useEffect } from "react";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import type { Member } from "../../../lib/types/member";
import "../../../css/home.css";
import MemberService from "../../services/MemberService";

/** redux slice & selector */
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data))

});


export default function HomePage() {
 const { setPopularDishes, setNewDishes,setTopUsers } = actionDispatch(useDispatch());



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
      setPopularDishes(data);
    })
    .catch((err) => console.log(err));

    product
    .getProducts({
      page: 1,
      limit: 4,
      order: "createdAt",
      // productCollection: ProductCollection.DISH,
    })
    .then((data) => {
      setNewDishes(data);
    })
    .catch((err) => console.log(err));
     
    const member = new  MemberService();
    member.getTopUsers()
    .then((data) => setTopUsers(data))
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

