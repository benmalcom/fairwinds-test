import './InfoText.scss';

const InfoText = ({ children, ...props }) => {
  return (
    <p className="InfoText" {...props}>
      {children}
    </p>
  );
};

export default InfoText;
