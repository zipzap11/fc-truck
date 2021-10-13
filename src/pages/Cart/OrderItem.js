import React from "react";
import classes from "./OrderItem.module.css";

const OrderItem = (props) => {
  const item = props.data;
  console.log("DATA ON ORDER ITEM :", item);

  const addItemHandler = () => {
    const data = { ...item };
    console.log("on add", data);
    props.onAdd(data);
  };

  const removeItemHandler = () => {
    const data = { ...item };
    console.log("on remove", data);
    props.onRemove(data);
  };

  const clearItemHandler = () => {
    const data = { ...item };
    console.log("on clear", data);
    props.onClear(data);
  };

  return (
    <li className={classes.item}>
      <div className={classes.wrapper}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={classes["item-detail"]}>
        <h4>{item.name}</h4>
        <p>
          RP. {props.rupiahFormat(item.price)},00
          <span>({item.amount}x)</span>
        </p>
        <p>Pengiriman : {item.ongkir}</p>
      </div>
      <div className={classes.actions}>
        <button onClick={addItemHandler}>+</button>
        <button>
          <i onClick={clearItemHandler} className="far fa-trash-alt"></i>
        </button>
        <button onClick={removeItemHandler}>-</button>
      </div>
    </li>
  );
};

export default OrderItem;
