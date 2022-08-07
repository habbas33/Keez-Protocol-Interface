const Input = (props: {
  placeholder?: string;
  value?: string;
  name: string;
  type: string;
  handleChange: any;
  size?: string;
  min?: string;
  max?: string;
}) => {
  const { placeholder, name, type, handleChange, size, min, max, value } =
    props;
  // const half =true;
  return (
    <input
      placeholder={placeholder}
      value={value}
      type={type}
      step="0.1"
      min={min}
      max={max}
      onChange={(e) => handleChange(e, name)}
      className={`my-1 ${
        size ? size : "w-full"
      } block rounded-sm p-2 outline-none text-white border-2 border-[#999999] focus:border-red-400 text-sm text-gray-700 leading-tight`}
    />
  );
};
export default Input;
