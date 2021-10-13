import classes from "./div2Page.module.css";

const Div2Page = (props) => {
  return (
    <main className={classes.main}>
      <div className={classes.textSection}>{props.children}</div>
      <div className={classes.logoSection}>{props.logo}</div>
    </main>
  );
};

export default Div2Page;
