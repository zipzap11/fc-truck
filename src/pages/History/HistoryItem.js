import React from "react";
import classes from "./HistoryItem.module.css";

const HistoryItem = (props) => {
  const rupiahFormat = (price, amount = 1) => {
    let result = price * amount;
    result = result.toString().split("").reverse().join("");
    result = result.match(/\d{1,3}/g);
    result = result.join(".").split("").reverse().join("");
    console.log("REssssULT RUPIAH :", result);
    return result;
  };

  const itemData = props.data;
  console.log("ITEMDATA ???", itemData);
  console.log("ITEM DATA > ITEMS ???", itemData.items);
  return (
    <li className={classes.item}>
      <div className={classes.left}>
        <h3>Item List</h3>
        <ol>
          {itemData.items.map((item) => {
            return (
              <li key={item.id}>
                <p>
                  {item.name} ({item.amount}x)
                </p>
                <p>Rp. {rupiahFormat(item.price * item.amount)},00</p>
              </li>
            );
          })}
        </ol>
      </div>
      <div className={classes.right}>
        <h3>Details</h3>
        <p>Date : {itemData.date}</p>
        <p>Address : {itemData.address}</p>
        <p>Payment Method : {itemData.payment}</p>
        <p>Price : Rp. {rupiahFormat(itemData.price)},00</p>
      </div>
    </li>
  );
};

export default HistoryItem;
