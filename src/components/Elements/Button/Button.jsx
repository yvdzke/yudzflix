const Button = (props) => {
  const { type = "button", varian, children, onClick = props;
  return (
    <button type={type} className={varian} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
