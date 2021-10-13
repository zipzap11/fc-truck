const Div1Page = (props) => {
  return (
    <main
      style={{
        width: "88%",
        margin: "0 auto",
        marginBottom: "12vh",
        paddingTop: "15vh",
        ...props.style,
      }}
    >
      {props.children}
    </main>
  );
};

export default Div1Page;
