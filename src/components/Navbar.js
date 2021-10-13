import classes from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "./assets/fclogo.svg";
import Avatar from "./assets/avatar.png";
import { useState, useContext } from "react";
import { useAuth } from "../store/auth-context";
import { useCart } from "../store/cart-context";
import UserContext from "../store/user-context";

const Navbar = () => {
  const { currentUser: isLoggedIn } = useAuth();
  const userCtx = useContext(UserContext);
  const cartCtx = useCart();
  const authCtx = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [onMouse, setOnMouse] = useState(false);
  const navOpenHandler = () => {
    setIsNavOpen(!isNavOpen);
  };

  const showDropDownMenu = () => {
    setOnMouse(true);
  };
  const hideDropDownMenu = () => {
    setOnMouse(false);
  };

  return (
    <header className={classes.head}>
      <div className={classes.logo}>{<Logo />}</div>
      <nav
        className={
          isNavOpen ? `${classes.nav} ${classes.active}` : `${classes.nav}`
        }
      >
        <Link to="/">Home</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/product">Products</Link>
        <Link to="/about">About Us</Link>
      </nav>
      <div className={classes.overlay}></div>
      {!isLoggedIn && (
        <div className={classes.btn}>
          <Link to="/sign-in">Sign In</Link>
        </div>
      )}
      {isLoggedIn && (
        <div
          onMouseOver={showDropDownMenu}
          onMouseLeave={hideDropDownMenu}
          className={classes["avatar-wrapper"]}
        >
          {userCtx.name && !userCtx.profilePicture && (
            <img className={classes.avatar} src={Avatar} alt="avatar" />
          )}
          {userCtx.name && userCtx.profilePicture && (
            <img
              className={classes.avatar}
              src={userCtx.profilePicture}
              alt="avatar"
            />
          )}
          {/* {userCtx.name && <span>{userCtx.name}</span>} */}
          {userCtx.name && (
            <span className={classes.badge}>{cartCtx.amount}</span>
          )}
          {onMouse && (
            <div className={classes.dropdown}>
              <Link className={classes["dropdown-item"]} to="/profile">
                Profile
              </Link>
              <Link className={classes["dropdown-item"]} to="/orders">
                Orders
              </Link>
              <Link className={classes["dropdown-item"]} to="/history">
                History
              </Link>
              <span
                className={classes["dropdown-item"]}
                onClick={authCtx.logout}
              >
                Logout
              </span>
            </div>
          )}
        </div>
      )}
      <span className={classes.icon}>
        <i
          className={`fas fa-${isNavOpen ? "times" : "bars"}`}
          onClick={navOpenHandler}
        ></i>
      </span>
    </header>
  );
};

export default Navbar;
