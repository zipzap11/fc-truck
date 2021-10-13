import React from "react";
import OrderItem from "./OrderItem";
import classes from "./OrderItems.module.css";

const OrderItems = (props) => {
  const createListItemComponent = (items) => {
    return items.map((item) => {
      console.log("data", item);
      return (
        <OrderItem
          rupiahFormat={props.rupiahFormat}
          onAdd={props.onAdd}
          onRemove={props.onRemove}
          onClear={props.onClear}
          key={item.id}
          data={item}
        />
      );
    });
  };
  console.log(props.data);
  return (
    <>
      <div className={classes["order-cart"]}>
        <h2>Trade Confirmation</h2>
        <div className={classes.items}>
          <h3>Item List</h3>
          <ul>{createListItemComponent(props.data)}</ul>
        </div>
      </div>
    </>
  );
};

export default OrderItems;
