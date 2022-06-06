const Input = ({ label = "naziv", ...props }) => {
  return (
    <>
      <label>{label}</label>
      <input className="input" {...props} />
    </>
  );
};

export default Input;
