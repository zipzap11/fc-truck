import React, { useEffect, useState } from "react";
import Div1Page from "../../layout/Div1Page";
import both from "../BothDiv1Page.module.css";
import TruckItem from "./TruckItem";
import classes from "./TruckOrder.module.css";
import { rdb } from "../../db/firebase";

const TruckOrder = () => {
  const [truckList, setTruckList] = useState([]);
  useEffect(() => {
    const data = rdb.ref("/truck");
    console.log("DATA", data);
    data.on("value", (snapshot) => {
      let truckListArr = [];
      const truckListObj = snapshot.val();
      for (let key in truckListObj) {
        truckListArr.push(truckListObj[key]);
      }
      console.log("TRUCK LIST", truckListArr, truckListObj);
      setTruckList(truckListArr);
    });
  }, []);

  return (
    <Div1Page>
      <section className={`${both.section} ${classes.section}`}>
        {truckList.map((truck) => (
          <TruckItem key={truck.id} data={truck} />
        ))}
      </section>
    </Div1Page>
  );
};

export default TruckOrder;
