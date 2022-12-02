import './Button.scss';

const Button = ({ children, ...props }) => {
  return (
    <button className="ButtonDefault" {...props}>
      {children}
    </button>
  );
};

export default Button;
