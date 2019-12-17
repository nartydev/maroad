import './index.css';

const MaxWidth = ({ children, ...props }) => (
  <div className="max-width" {...props}>
    {children}
  </div>
);

export default MaxWidth;
