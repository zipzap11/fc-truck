import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AboutUs from "./pages/AboutUs";
import Product from "./pages/Product";
import TruckOrder from "./pages/TruckOrder/TruckOrder";
import SetupProfile from "./pages/Profile/SetupProfile";
import Profile from "./pages/Profile/Profile";
import Loading from "./components/Loading";
import { useAuth } from "./store/auth-context";
import { useContext } from "react";
import UserContext from "./store/user-context";
import OrderCart from "./pages/Cart/OrderCart";
import Div1Page from "./layout/Div1Page";
import History from "./pages/History/History";
import { auth } from "./db/firebase";

function App() {
  const userCtx = useContext(UserContext);
  const authCtx = useAuth();
  const { isLoading: loading } = useAuth();
  const isLoading = loading && !userCtx.name;
  let isLoggedIn = false;
  if (auth.currentUser) {
    isLoggedIn = true;
  }
  return (
    <>
      <div className="App">
        <Navbar onLogout={authCtx.logout} />
        {!isLoading && (
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route component={Loading} path="/loading" />
            <Route path="/contact" exact>
              <ContactUs />
            </Route>
            <Route path="/about" exact>
              <AboutUs />
            </Route>
            {!isLoggedIn && (
              <Route path="/sign-in" exact>
                <SignIn />
              </Route>
            )}
            {!isLoggedIn && (
              <Route path="/sign-up" exact>
                <SignUp />
              </Route>
            )}
            <Route path="/product" exact>
              <Product />
            </Route>
            <Route path="/truck-order" exact>
              <TruckOrder />
            </Route>
            {isLoggedIn && (
              <Route path="/profile-setup" exact>
                <SetupProfile />
              </Route>
            )}
            {isLoggedIn && (
              <Route path="/profile" exact>
                <Profile />
              </Route>
            )}
            {isLoggedIn && (
              <Route path="/orders" exact>
                <OrderCart />
              </Route>
            )}
            {isLoggedIn && (
              <Route path="/history" exact>
                <History />
              </Route>
            )}
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        )}
        {isLoading && (
          <Div1Page
            style={{
              height: "70vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </Div1Page>
        )}
        <Footer />
      </div>
    </>
  );
}

export default App;
