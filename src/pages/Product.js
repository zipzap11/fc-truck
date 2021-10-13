import Card from "../components/Card";
import truck from "./assets/products/foodtruck.png";
import foodDrink from "./assets/products/food&drink.png";
import snacks from "./assets/products/snacks.png";
import eventOrganizer from "./assets/products/event-organizer.png";
import Div1Page from "../layout/Div1Page";
import both from "./BothDiv1Page.module.css";
import classes from "./Product.module.css";
import { Link } from "react-router-dom";

const products = [
  {
    name: "Food Truck",
    image: truck,
    path: "/truck-order",
  },
  {
    name: "Food & Drink",
    image: foodDrink,
    path: "/",
  },
  {
    name: "Snacks",
    image: snacks,
    path: "/",
  },
  {
    name: "Event-Oragnizer",
    image: eventOrganizer,
    path: "/",
  },
];

function createCard(data) {
  return (
    <Link key={data.name} to={data.path}>
      <Card className={classes.card}>
        <div className={classes.wrapper}>
          <img src={data.image} alt="product" />
        </div>
        <p>{data.name}</p>
      </Card>
    </Link>
  );
}

const Product = () => {
  return (
    <Div1Page>
      <section className={`${both.section} ${classes.section}`}>
        <h2>Product</h2>
        <p>Browse Our Catalog</p>
        <div className={classes.items}>
          {products.map((product) => createCard(product))}
        </div>
      </section>
    </Div1Page>
  );
};

export default Product;
