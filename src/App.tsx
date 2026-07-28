import { Switch, Route, useLocation } from "react-router-dom";
// import   HomePage  from './app/screens/homePage';
import   ProductsPage  from './app/screens/productsPage';
import   OrdersPage  from './app/screens/ordersPage';
import   HelpPage from "./app/screens/helpPage";
import   UserPage  from './app/screens/usersPage';
import   HomeNavbar  from './app/components/headers/HomeNavbar';
import   OtherNavbar  from './app/components/headers/OtherNavbar';
import   Footer  from '../src/app/components/footer';
import "./css/app.css";
import "../src/css/navbar.css";
import "./css/footer.css";
import HomePage from "./app/screens/homePage";
import type { CartItem } from "./lib/types/search";
import { useState } from "react";

function App() {
  const location = useLocation();
   
  const cartJson: string | null = localStorage.getItem("cartData");
  const currentCart = cartJson ? JSON.parse(cartJson) : [];
  const [cartItems, setCartItems] = useState<CartItem[]>(currentCart);

/** handlers **/

  const onAdd = (input: CartItem) => {
  const exist: any = cartItems.find(
    (item: CartItem) => item._id === input._id
  );
  if (exist) {
    const cartUpdate = cartItems.map((item: CartItem) =>
      item._id === input._id
        ? { ...exist, quantity: exist.quantity + 1 }
        : item
    );
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  } else {
    const cartUpdate = [...cartItems, { ...input }];
    setCartItems(cartUpdate);
    localStorage.setItem("cartData", JSON.stringify(cartUpdate));
  }
  };



  return ( 
     <>
       {location.pathname === "/" ? <HomeNavbar cartItems={cartItems} /> : <OtherNavbar cartItems={cartItems} />} 
        <Switch>
          <Route path="/products">
            <ProductsPage onAdd={onAdd}/>
          </Route>
          <Route path="/orders">
            <OrdersPage />
          </Route>
           <Route path="/member-page">
            <UserPage />
          </Route> 
           <Route path="/help">
            <HelpPage />
          </Route> 
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        <Footer  />
      </>
  );
}

 
export default App

