import { Switch, Route, useLocation } from "react-router-dom";
import   ProductsPage  from './app/screens/productsPage';
import   OrdersPage  from './app/screens/ordersPage';
import   HelpPage from "./app/screens/helpPage";
import   UserPage  from './app/screens/usersPage';
import   HomeNavbar  from './app/components/headers/HomeNavbar';
import   OtherNavbar  from './app/components/headers/OtherNavbar';
import   Footer  from '../src/app/components/footer';
import   HomePage from "./app/screens/homePage";
import   useBasket from "./app/hooks/useBasket";
import { useState } from "react";
import AuthenticationModal from "./app/components/auth";
import { sweetErrorHandling, sweetTopSuccessAlert } from "./lib/sweetAlert";
import MemberService from "./app/services/MemberService";
import { Messages } from "./lib/config";
import "./css/app.css";
import "../src/css/navbar.css";
import "./css/footer.css";
import { useGlobals } from "./app/hooks/useGlobals";


function App() {
  const location = useLocation();
  const { setAuthMember } = useGlobals();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll, } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

/** handlers **/

  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseLogout = () => setAnchorEl(null);
  const handleLogoutRequest = async () => {
     try {
      const member = new MemberService();
      await member.logout();

      await sweetTopSuccessAlert("succes", 700);
      setAuthMember(null); 
    } catch (err) {
      console.log(err);
      sweetErrorHandling(Messages.error1);
    }
 };




  return ( 
     <>
       {location.pathname === "/" ?
        <HomeNavbar 
       cartItems={cartItems}
        onAdd={onAdd} 
        onRemove={onRemove} 
         onDelete={onDelete} 
         onDeleteAll={onDeleteAll}
         setSignupOpen={setSignupOpen}
         setLoginOpen={setLoginOpen}
         anchorEl={anchorEl}
         handleLogoutClick={handleLogoutClick}
         handleCloseLogout={handleCloseLogout}
         handleLogoutRequest={handleLogoutRequest}

          />  
          
          : <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd} 
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll} 
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
           />} 
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

