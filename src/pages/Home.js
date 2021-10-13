import Div2Page from "../layout/Div2Page";
import { ReactComponent as Truck } from "./assets/home/truck.svg";
import both from "./BothDiv2Page.module.css";
import classes from "./Home.module.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Div2Page a={"abc"}  logo={<Truck className={both.logo} />}>
      <section className={`${both.text} ${classes.text}`}>
        <h2>Event Organizer for all kind of events</h2>
        <p>
          We provide food truck, food & drink and others for all kind of event
          include wedding, birthday,
          <br /> etc
        </p>
        <button>
          <Link to="/contact">Contact Us</Link>
        </button>
      </section>
    </Div2Page>
  );
}

export default Home;
