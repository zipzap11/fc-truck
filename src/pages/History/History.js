import React, { useContext, useEffect, useState } from "react";
import Div1Page from "../../layout/Div1Page";
import classes from "./History.module.css";
import { db } from "../../db/firebase";
import UserContext from "../../store/user-context";
import HistoryItem from "./HistoryItem";
const HIstory = () => {
  const userCtx = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [historyData, setHistoryData] = useState();
  useEffect(() => {
    if (userCtx.uid) {
      setIsLoading(true);
      db.collection("orders")
        .doc(userCtx.uid)
        .get()
        .then((snapshot) => {
          console.log(snapshot);
          let data;
          if (snapshot.exists) {
            data = Object.values(snapshot.data());
            data = data.sort((a, b) => b.stampId - a.stampId);
            setHistoryData(data);
          }
          setIsLoading(false);
        });
    }
  }, [userCtx.uid]);
  console.log("ISLOADING ??", isLoading);
  console.log("HISTORY DATA ??", historyData);
  const createHistoryItem = (data) => {
    return <HistoryItem key={data.stampId} data={data} />;
  };

  return (
    <Div1Page>
      <section className={classes.history}>
        <h2>Order History</h2>
        {historyData && !isLoading && (
          <ul>{historyData.map((data) => createHistoryItem(data))}</ul>
        )}
        {!historyData && !isLoading && <p>No Order yet !</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </Div1Page>
  );
};

export default HIstory;
