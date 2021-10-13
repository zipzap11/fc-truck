import React, { memo, useContext } from "react";
import Div1Page from "../../layout/Div1Page";
import classes from "./OrderCart.module.css";
import OrderItems from "./OrderItems";
import OrderForm from "./OrderForm";
import { useCart } from "../../store/cart-context";
import { Link } from "react-router-dom";
import UserContext from "../../store/user-context";

const OrderCart = () => {
  const cartCtx = useCart();
  const userCtx = useContext(UserContext);

  const rupiahFormat = (price, amount = 1) => {
    let result = price * amount;
    result = result.toString().split("").reverse().join("");
    result = result.match(/\d{1,3}/g);
    result = result.join(".").split("").reverse().join("");
    return result;
  };

  if (cartCtx.isLoading) {
    console.log("isLoading", cartCtx.isLoading);
    return (
      <Div1Page>
        <section className={classes.loading}>
          <p style={{ paddingTop: "5rem" }}>Loading your order...</p>
        </section>
      </Div1Page>
    );
  }

  return (
    <Div1Page>
      <section className={classes.container}>
        {cartCtx.items.length > 0 && !cartCtx.isLoading && (
          <OrderItems
            data={cartCtx.items}
            rupiahFormat={rupiahFormat}
            onAdd={cartCtx.addItem}
            onRemove={cartCtx.removeItem}
            onClear={cartCtx.clearItem}
          />
        )}
        {cartCtx.items.length <= 0 && !cartCtx.isLoading && (
          <div className={classes.noitem}>
            <p>Nothing here. Start adding some...</p>
            <Link to="/product">Go to Product</Link>
          </div>
        )}
        <OrderForm
          uid={userCtx.uid}
          data={cartCtx.items}
          amount={cartCtx.amount}
          total={cartCtx.price}
          rupiahFormat={rupiahFormat}
        />
      </section>
    </Div1Page>
  );
};
const OrderCartMemo = memo(OrderCart);
export default OrderCartMemo;
