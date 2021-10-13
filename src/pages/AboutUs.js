import Div2Page from "../layout/Div2Page";
import aboutLogo from "./assets/about-us/about.png";
import both from "./BothDiv2Page.module.css";
import classes from "./AboutUs.module.css";

const AboutUs = () => {
  return (
    <Div2Page logo={<img src={aboutLogo} alt="about" className={both.logo} />}>
      <section className={`${both.text} ${classes.text}`}>
        <h2>About Us</h2>
        <article>
          F&C Truck adalah perusahaan yang mengumpulkan berbagai macam Event
          Orgainzer, Food Truck untuk disewakan. Tujuan kami kedepannya yaitu
          bekerja sama dengan berbagai macam vendor dan memperluas jangkauan
          daerah pelayanan kami. Visi yaitu dapat membantu menyelenggarakan
          event di seluruh Indonesia.
        </article>
      </section>
    </Div2Page>
  );
};

export default AboutUs;
