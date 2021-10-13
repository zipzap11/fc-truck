import contactLogo from "./assets/contact-us/contact.png";
import { ReactComponent as Phone } from "./assets/contact-us/phone.svg";
import { ReactComponent as Mail } from "./assets/contact-us/mail.svg";
import { ReactComponent as Instagram } from "./assets/contact-us/instagram.svg";
import Div2Page from "../layout/Div2Page";
import classes from "./ContactUs.module.css";
import both from "./BothDiv2Page.module.css";

const ContactUs = () => {
  return (
    <Div2Page
      logo={<img src={contactLogo} className={both.logo} alt="contact" />}
    >
      <section className={`${both.text} ${classes.text}`}>
        <h2>Get in touch</h2>
        <ul> 
          <li>
            <div className={classes.wrapper}>
              <Phone />
            </div>
            <p>08123788812</p>
          </li>
          <li>
            <div className={classes.wrapper}>
              <Mail />
            </div>
            <p>FCTruck@gmail.com</p>
          </li>
          <li>
            <div className={classes.wrapper}>
              <Instagram />
            </div>
            <p>FCTruck</p>
          </li>
        </ul>
      </section>
    </Div2Page>
  );
};
export default ContactUs;
