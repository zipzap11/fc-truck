import React, {
  useContext,
  createContext,
  useReducer,
  useState,
  useEffect,
  useCallback,
} from "react";
import { db } from "../db/firebase";
import UserContext from "./user-context";

const CartContext = createContext({
  items: [],
  amount: 0,
  price: 0,
  isLoading: true,
  addItem: () => {},
  removeItem: () => {},
  clearItem: () => {},
  resetCart: () => {},
});

export const useCart = () => {
  return useContext(CartContext);
};

const findItemIndex = (items, id) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) return i;
  }
  return -1;
};

const totalReducer = (items, type) => {
  if (type === "totalPrice") {
    return items.reduce((acc, curr) => acc + curr.price * curr.amount, 0);
  }
  if (type === "totalAmount") {
    return items.reduce((acc, curr) => acc + curr.amount, 0);
  }
};

const defaultItemsState = {
  items: [],
  totalPrice: 0,
  totalAmount: 0,
};

// reducer
const itemsReducer = (state, action) => {
  if (action.item) {
    if (action.type === "ADD") {
      let items;
      const itemIdx = findItemIndex(state.items, action.item.id);
      if (itemIdx !== -1) {
        items = [...state.items];
        items[itemIdx].amount++;
      } else {
        items = [...state.items, action.item];
      }
      const totalAmount = totalReducer(items, "totalAmount");
      const totalPrice = totalReducer(items, "totalPrice");
      const dataObj = {
        items: items,
        totalAmount: totalAmount,
        totalPrice: totalPrice,
      };
      action.func(dataObj);
      return dataObj;
    } else if (action.type === "REMOVE") {
      const items = [...state.items];
      const itemIdx = findItemIndex(items, action.item.id);
      if (itemIdx !== -1) {
        items[itemIdx].amount -= 1;
      } else {
        console.log("ITEM NOT FOUND");
      }
      if (items[itemIdx].amount <= 0) items.splice(itemIdx, 1);
      const totalPrice = totalReducer(items, "totalPrice");
      const totalAmount = totalReducer(items, "totalAmount");
      const dataObj = {
        items: items,
        totalAmount: totalAmount,
        totalPrice: totalPrice,
      };
      action.func(dataObj);
      return dataObj;
    } else if (action.type === "UPDATE") {
      if (action.item.totalAmount === undefined) {
        return defaultItemsState;
      }
      return action.item;
    } else if (action.type === "CLEAR") {
      const items = [...state.items];
      const itemIndex = findItemIndex(state.items, action.item.id);
      if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
      } else {
      }
      const totalAmount = totalReducer(items, "totalAmount");
      const totalPrice = totalReducer(items, "totalPrice");
      const dataObj = {
        items: items,
        totalAmount: totalAmount,
        totalPrice: totalPrice,
      };
      action.func(dataObj);
      return dataObj;
    } else if (action.type === "RESET") {
      action.func(action.item);
      return action.item;
    }
  }
  console.log("lol");
  return defaultItemsState;
};
// reducer

export const CartProvider = (props) => {
  const [itemsState, dispatchItems] = useReducer(
    itemsReducer,
    defaultItemsState
  );

  // hooks
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const userCtx = useContext(React.useMemo(() => UserContext, []));
  // hooks

  // function
  const getUpdatedData = useCallback(() => {
    if (userCtx.uid) {
      const cartData = db.collection("users-cart").doc(userCtx.uid);
      cartData.onSnapshot((snapshot) => {
        if (snapshot.exists) {
          const updatedCart = snapshot.data();
          const data = {
            items: updatedCart["cart-items"],
            totalAmount: updatedCart["total-amount"],
            totalPrice: updatedCart["total-price"],
          };
          setIsLoading(false);
          dispatchItems({ type: "UPDATE", item: data });
        } else {
          dispatchItems({ type: "UPDATE", item: defaultItemsState });
          setIsLoading(false);
        }
      });
    }
  }, [userCtx.uid]);

  const sendEditedItemToDB = (data) => {
    setIsLoading(true);
    const cartData = db.collection("users-cart").doc(userCtx.uid);
    console.log("ITEMSTATE ON ADDITEM TO DB", data);
    cartData
      .set(
        {
          "cart-items": data.items,
          "total-amount": data.totalAmount,
          "total-price": data.totalPrice,
        },
        { merge: true }
      )
      .then((res) => {
        setError(false);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        getUpdatedData();
        setIsLoading(false);
      });
  };
  // getUpdatedData every render
  useEffect(() => {
    console.log("GET UPDATED DATA USE EFFECT");
    getUpdatedData();
  }, [getUpdatedData]);

  const addItemHandler = (item) => {
    console.log("ITEM :", item);
    dispatchItems({ type: "ADD", item: item, func: sendEditedItemToDB });
  };

  const removeItemHandler = (item) => {
    dispatchItems({ type: "REMOVE", item: item, func: sendEditedItemToDB });
  };

  const clearItemHandler = (item) => {
    dispatchItems({ type: "CLEAR", item: item, func: sendEditedItemToDB });
  };

  const resetCart = () => {
    dispatchItems({
      type: "RESET",
      item: defaultItemsState,
      func: sendEditedItemToDB,
    });
  };
  // function

  // Context Value
  const contextValue = {
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearItem: clearItemHandler,
    resetCart: resetCart,
    items: itemsState.items,
    amount: itemsState.totalAmount,
    price: itemsState.totalPrice,
    isLoading: isLoading,
    error: error,
  };
  // Context Value
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
