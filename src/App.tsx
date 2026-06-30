import { Switch, Route, useLocation } from "react-router-dom";
import   HomePage  from './app/screens/homePage';
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

function App() {
  const location = useLocation();
   console.log("location:", location); 


  return ( 
     <>
       {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />} 
        <Switch>
          <Route path="/products">
            <ProductsPage />
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

