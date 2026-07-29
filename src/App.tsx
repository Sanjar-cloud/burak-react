import { Switch, Route, useLocation } from "react-router-dom";
// import   HomePage  from './app/screens/homePage';
import   ProductsPage  from './app/screens/productsPage';
import   OrdersPage  from './app/screens/ordersPage';
import   HelpPage from "./app/screens/helpPage";
import   UserPage  from './app/screens/usersPage';
import   HomeNavbar  from './app/components/headers/HomeNavbar';
import   OtherNavbar  from './app/components/headers/OtherNavbar';
import   Footer  from '../src/app/components/footer';
import HomePage from "./app/screens/homePage";
import useBasket from "./app/hooks/useBasket";
import "./css/app.css";
import "../src/css/navbar.css";
import "./css/footer.css";
import { useState } from "react";
import AuthenticationModal from "./app/components/auth";

function App() {
  const location = useLocation();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll, } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(true);

/** handlers **/

const handleSignupClose = () => setSignupOpen(false);
const handleLoginClose = () => setLoginOpen(false);


  return ( 
     <>
       {location.pathname === "/" ? <HomeNavbar 
       cartItems={cartItems}
        onAdd={onAdd} 
        onRemove={onRemove} 
         onDelete={onDelete} 
         onDeleteAll={onDeleteAll} />   : <OtherNavbar
         
          cartItems={cartItems}
          onAdd={onAdd} 
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}  />} 
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

        <AuthenticationModal
         signupOpen={signupOpen}
         loginOpen={loginOpen}
         handleLoginClose={handleLoginClose}
         handleSignupClose={handleSignupClose}
        />
      </>
  );
}

 
export default App

