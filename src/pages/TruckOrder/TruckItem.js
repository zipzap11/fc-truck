import React, { useState } from "react";
import Card from "../../components/Card";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import { useCart } from "../../store/cart-context";
import classes from "./TruckItem.module.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../db/firebase";

const TruckItem = (props) => {
  // hooks
  const data = props.data;
  const cartCtx = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();
  // hooks
  const isLoggedIn = auth.currentUser;

  // handler function
  const openModalHandler = () => {
    setIsModalOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  const orderClickHandler = () => {
    if (isLoggedIn) {
      openModalHandler();
      const addedItem = {
        id: data.id,
        name: data.name,
        amount: 1,
        price: rupiahSplitter(data.price),
        priceStr: data.price,
        image: data.image,
      };
      console.log("ADDED ITEMS : ", addedItem);
      cartCtx.addItem(addedItem);
    } else {
      history.replace("/sign-in");
    }
  };

  // handler function end

  // utility function
  const rupiahSplitter = (value) => {
    return parseInt(value.replace(/\./g, ""));
  };
  // utility function end

  // sub component
  const OrderModal = () => {
    return (
      <Modal onClick={closeModalHandler}>
        {cartCtx.isLoading && <Loading className={classes.loader} />}
        {!cartCtx.isLoading && !cartCtx.error && (
          <div className={classes.success}>
            <p>Successfully add your order !</p>
            <div>
              <button className={classes.close} onClick={closeModalHandler}>
                Close
              </button>
              <Link className={classes.goto} to="/orders">
                Go to Order page <i className="fas fa-angle-double-right"></i>
              </Link>
            </div>
          </div>
        )}
        {!cartCtx.isLoading && cartCtx.error && (
          <div className={classes.failed}>
            <p>Something went wrong, try again!</p>
            <button className={classes.close} onClick={closeModalHandler}>
              Close
            </button>
          </div>
        )}
      </Modal>
    );
  };

  return (
    <React.Fragment>
      {isModalOpen && <OrderModal />}
      <Card key={data.name} className={classes.card}>
        <div className={classes.wrapper}>
          <img src={data.image} alt={data.name} />
        </div>
        <div className={classes.detail}>
          <h3>{data.name}</h3>
          <p className={classes.price}>Rp. {data.price},00</p>
          <p>{data.description}</p>
          <button onClick={orderClickHandler}>Order</button>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default TruckItem;
