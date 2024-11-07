interface ILoader {
  color?: string;
}

const Loader = ({ color }: ILoader) => {
  const cstyle = {
    borderColor: `${color} ${color} ${color} transparent`,
  };

  return <div style={cstyle} className="loader"></div>;
};

export default Loader;
