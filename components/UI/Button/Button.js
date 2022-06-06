const Button = ({ title = "Submit", ...props }) => {
  return (
    <button {...props} className="button">
      {title}
    </button>
  );
};

export default Button;
